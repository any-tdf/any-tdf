import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dir, '..');
const routesRoot = join(packageRoot, 'src/routes');

const routeNames = readdirSync(routesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();

const failed: Array<{ route: string; lang: string; reason: string }> = [];
const languages = ['zh_CN', 'en_US'] as const;

const classAttributePattern = /\bclass(?:Name)?=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;
const hasTailwindArbitraryClass = (source: string) => {
	for (const match of source.matchAll(classAttributePattern)) {
		const classText = match[1] || match[2] || match[3] || '';
		if (/\[[^\]\n]*(?:px|rem|#[0-9a-fA-F]{3,8})[^\]\n]*\]/.test(classText)) return true;
	}
	return false;
};

for (const route of routeNames) {
	for (const lang of languages) {
		const file = join(routesRoot, route, lang, '+page.svelte');
		const source = readFileSync(file, 'utf8');
		if (source.includes('\uFFFD')) failed.push({ route, lang, reason: 'contains mojibake replacement character' });
		if (!/from ['"]stdf(?:\/[^'"]+)?['"]/.test(source)) {
			failed.push({ route, lang, reason: 'demo does not import the public STDF package entry' });
		}
		if (!source.includes('<') || source.length < 120) failed.push({ route, lang, reason: 'demo source is unexpectedly small' });
		if (hasTailwindArbitraryClass(source)) {
			failed.push({ route, lang, reason: 'demo contains Tailwind arbitrary size or color class' });
		}
	}
}

const result = {
	components: routeNames.length,
	checked: routeNames.length * languages.length,
	failedCount: failed.length,
	failed
};

console.log(JSON.stringify(result, null, 2));
if (failed.length > 0) process.exit(1);
