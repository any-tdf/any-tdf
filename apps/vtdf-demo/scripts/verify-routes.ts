import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const baseUrl = process.env.VTDF_VERIFY_BASE_URL || 'http://127.0.0.1:8886';
const routes = readdirSync(stdfRoutesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();
const languages = ['zh_CN', 'en_US'] as const;
const failed: { url: string; status?: number; reason: string }[] = [];

for (const route of routes) {
	for (const lang of languages) {
		const url = `${baseUrl}/${route}/${lang}?channel=iframe&theme=ANYTDF&darkMode=light&lang=${lang}`;
		const response = await fetch(url).catch((error: Error) => {
			failed.push({ url, reason: error.message });
			return undefined;
		});
		if (!response) continue;
		const html = await response.text();
		if (!response.ok) failed.push({ url, status: response.status, reason: 'HTTP status is not OK' });
		if (!html.includes('<div id="app"')) failed.push({ url, status: response.status, reason: 'Missing Vue app root markup' });
	}
}

const result = { baseUrl, components: routes.length, checked: routes.length * languages.length, failedCount: failed.length, failed };
console.log(JSON.stringify(result, null, 2));
if (failed.length > 0) process.exit(1);
