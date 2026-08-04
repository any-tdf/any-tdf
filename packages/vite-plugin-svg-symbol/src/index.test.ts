import { afterEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import svgSymbol, { createSvgSprite } from "./index";

const temporaryDirectories: string[] = [];

afterEach(async () => {
	await Promise.all(
		temporaryDirectories.splice(0).map((directory) =>
			rm(directory, { recursive: true, force: true }),
		),
	);
});

describe("@any-tdf/vite-plugin-svg-symbol", () => {
	test("exposes the expected Vite plugin name", () => {
		expect(svgSymbol().name).toBe("@any-tdf/vite-plugin-svg-symbol");
	});

	test("combines SVG files and normalizes simple colors", async () => {
		const root = await mkdtemp(join(tmpdir(), "any-tdf-svg-symbol-"));
		temporaryDirectories.push(root);
		await mkdir(join(root, "icons"));
		await writeFile(
			join(root, "icons", "sample.svg"),
			'<svg viewBox="0 0 24 24" class="icon" p-id="1"><path fill="#123456" d="M0 0h24v24H0z"/></svg>',
			"utf8",
		);

		createSvgSprite(
			[{ inFile: "icons", outFile: "generated", fileName: "symbols", simple: true }],
			root,
		);

		const content = await readFile(join(root, "generated", "symbols.svg"), "utf8");
		expect(content).toContain("<symbol");
		expect(content).toContain('id="sample"');
		expect(content).toContain("currentColor");
		expect(content).not.toContain('class="icon"');
		expect(content).not.toContain("p-id");
	});

	test("preserves root attributes and hoists reusable definitions", async () => {
		const root = await mkdtemp(join(tmpdir(), "any-tdf-svg-symbol-"));
		temporaryDirectories.push(root);
		await mkdir(join(root, "icons"));
		await writeFile(
			join(root, "icons", 'gradient&icon.svg'),
			'<svg viewBox="0 0 24 24" fill="none" stroke="#123"><defs><linearGradient id="paint"><stop offset="0" style="stop-color:#fff"/></linearGradient></defs><path fill="url(#paint)" d="M0 0h24v24H0z"/></svg>',
			"utf8",
		);

		createSvgSprite(
			[{ inFile: "icons", outFile: "generated", fileName: "symbols", simple: false }],
			root,
		);

		const content = await readFile(join(root, "generated", "symbols.svg"), "utf8");
		expect(content.indexOf("<defs>")).toBeLessThan(content.indexOf("<symbol"));
		expect(content).toContain('id="gradient&amp;icon"');
		expect(content).toContain('viewBox="0 0 24 24"');
		expect(content).toContain('stroke="#123"');
		expect(content).toMatch(/fill="url\(#[^)]+\)"/);
		expect(content).not.toContain("<symbol id=\"gradient&amp;icon\"><defs>");
	});
});
