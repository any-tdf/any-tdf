import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

type CompareEntry = {
	route: string;
	lang: 'zh_CN' | 'en_US';
	stdf: {
		url: string;
		ok: boolean;
		status?: number;
		hasSvelteKit: boolean;
		error?: string;
	};
	vtdf: {
		url: string;
		ok: boolean;
		status?: number;
		hasVueRoot: boolean;
		error?: string;
	};
	match: boolean;
};

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const reportPath = join(packageRoot, 'reports/stdf-vtdf-route-compare.json');
const stdfBaseUrl = process.env.STDF_COMPARE_BASE_URL || 'http://127.0.0.1:8888';
const vtdfBaseUrl = process.env.VTDF_COMPARE_BASE_URL || 'http://127.0.0.1:8886';
const languages = ['zh_CN', 'en_US'] as const;

const routes = readdirSync(stdfRoutesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();

const fetchText = async (url: string) => {
	try {
		const response = await fetch(url);
		return {
			ok: response.ok,
			status: response.status,
			text: await response.text()
		};
	} catch (error) {
		return {
			ok: false,
			status: undefined,
			text: '',
			error: error instanceof Error ? error.message : String(error)
		};
	}
};

const comparisons: CompareEntry[] = [];

for (const route of routes) {
	for (const lang of languages) {
		const query = `channel=iframe&theme=ANYTDF&darkMode=light&lang=${lang}`;
		const stdfUrl = `${stdfBaseUrl}/${route}/${lang}?${query}`;
		const vtdfUrl = `${vtdfBaseUrl}/${route}/${lang}?${query}`;
		const [stdf, vtdf] = await Promise.all([fetchText(stdfUrl), fetchText(vtdfUrl)]);
		const stdfEntry = {
			url: stdfUrl,
			ok: stdf.ok,
			status: stdf.status,
			hasSvelteKit: stdf.text.includes('__sveltekit') || stdf.text.includes('data-sveltekit'),
			error: stdf.error
		};
		const vtdfEntry = {
			url: vtdfUrl,
			ok: vtdf.ok,
			status: vtdf.status,
			hasVueRoot: vtdf.text.includes('<div id="app"'),
			error: vtdf.error
		};
		comparisons.push({
			route,
			lang,
			stdf: stdfEntry,
			vtdf: vtdfEntry,
			match: stdfEntry.ok && vtdfEntry.ok && stdfEntry.hasSvelteKit && vtdfEntry.hasVueRoot
		});
	}
}

const failed = comparisons.filter((entry) => !entry.match);
const result = {
	stdfBaseUrl,
	vtdfBaseUrl,
	components: routes.length,
	checked: comparisons.length,
	failedCount: failed.length,
	failed,
	comparisons
};

mkdirSync(join(packageRoot, 'reports'), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(
	JSON.stringify(
		{ stdfBaseUrl, vtdfBaseUrl, components: routes.length, checked: comparisons.length, failedCount: failed.length, reportPath },
		null,
		2
	)
);

if (failed.length > 0) process.exit(1);
