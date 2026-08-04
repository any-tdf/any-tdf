import { describe, expect, test } from "bun:test";
import md from "./index";

const absolutePath = (path: string) => `${process.cwd()}/${path}`;

describe("@any-tdf/vite-plugin-md-ts", () => {
	test("exposes the expected Vite plugin name", () => {
		expect(md().name).toBe("@any-tdf/vite-plugin-md-ts");
	});

	test("transforms Markdown into an HTML string module", async () => {
		const plugin = md({ marked: {} });
		const filePath = absolutePath("guide.md");
		const result = await plugin.transform("# 标题\n\n- [x] 已完成", filePath);

		expect(result?.code).toContain("export default");
		expect(result?.code).toContain("<h1>");
		expect(result?.code).toContain('type=\\"checkbox\\"');
		expect(result?.map).toEqual({
			version: 3,
			sources: [filePath],
			names: [],
			mappings: "",
		});
	});

	test("returns raw Markdown when marked options are omitted", async () => {
		const plugin = md();
		const result = await plugin.transform("# Raw Markdown", absolutePath("raw.md"));

		expect(result?.code).toContain("# Raw Markdown");
		expect(result?.code).not.toContain("<h1>");
	});

	test("ignores non-Markdown files and excluded paths", async () => {
		const plugin = md({ exclude: ["**/private/**"], marked: {} });

		expect(await plugin.transform("content", absolutePath("index.ts"))).toBeNull();
		expect(
			await plugin.transform("# Secret", absolutePath("private/secret.md")),
		).toBeNull();
	});

	test("supports include patterns and Vite query parameters", async () => {
		const plugin = md({ include: ["**/docs/**/*.md"], marked: {} });

		expect(
			await plugin.transform("# Included", `${absolutePath("docs/guide.md")}?raw`),
		).not.toBeNull();
		expect(
			await plugin.transform("# Ignored", absolutePath("content/guide.md")),
		).toBeNull();
	});
});
