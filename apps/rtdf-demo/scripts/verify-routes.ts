import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dir, '..');
const pagesRoot = join(packageRoot, 'src/pages');
const baseUrl = process.env.RTDF_VERIFY_BASE_URL || 'http://127.0.0.1:4173';
const skipPages = new Set(['components', 'home']);
const languages = ['zh_CN', 'en_US'] as const;

const pages = readdirSync(pagesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !skipPages.has(entry.name))
	.map((entry) => entry.name)
	.sort();

const failed: { url: string; status?: number; reason: string }[] = [];
const assetUrls = new Set<string>();

const collectAssetUrls = (html: string) => {
	for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
		const value = match[1];
		if (!value || value.startsWith('http') || value.startsWith('data:')) continue;
		if (!/\.(?:js|css|svg|png|jpg|jpeg|webp|gif|woff2?)($|\?)/.test(value)) continue;
		assetUrls.add(new URL(value, baseUrl).toString());
	}
};

for (const page of pages) {
	for (const lang of languages) {
		const url = `${baseUrl}/${page}/${lang}?channel=iframe&theme=ANYTDF&darkMode=light&lang=${lang}`;
		const response = await fetch(url).catch((error: Error) => {
			failed.push({ url, reason: error.message });
			return undefined;
		});
		if (!response) continue;
		const html = await response.text();
		if (!response.ok) {
			failed.push({ url, status: response.status, reason: 'HTTP status is not OK' });
			continue;
		}
		if (!html.includes('<div id="root"></div>')) {
			failed.push({ url, status: response.status, reason: 'Missing React root markup' });
		}
		collectAssetUrls(html);
	}
}

for (const url of assetUrls) {
	const response = await fetch(url).catch((error: Error) => {
		failed.push({ url, reason: error.message });
		return undefined;
	});
	if (!response) continue;
	if (!response.ok) {
		failed.push({ url, status: response.status, reason: 'Asset HTTP status is not OK' });
	}
}

const checked = pages.length * languages.length;
console.log(
	JSON.stringify({ baseUrl, components: pages.length, checked, assets: assetUrls.size, failedCount: failed.length, failed }, null, 2)
);

if (failed.length > 0) process.exit(1);
