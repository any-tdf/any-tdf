import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

type SiteConfig = {
	name: string;
	root: string;
	appFile: string;
	headerFile: string;
	guideLayoutFile: string;
	allowedStyleFile: string;
};

const workspaceRoot = resolve(import.meta.dir, '../../..');
const siteConfigs: SiteConfig[] = [
	{
		name: 'STDF',
		root: join(workspaceRoot, 'apps/stdf-site'),
		appFile: 'src/routes/+layout.svelte',
		headerFile: 'src/lib/header/Header.svelte',
		guideLayoutFile: 'src/routes/guide/+layout.svelte',
		allowedStyleFile: 'src/routes/generator/LandscapeSvg.svelte'
	},
	{
		name: 'RTDF',
		root: join(workspaceRoot, 'apps/rtdf-site'),
		appFile: 'src/App.tsx',
		headerFile: 'src/components/Header.tsx',
		guideLayoutFile: 'src/pages/guide/GuideLayout.tsx',
		allowedStyleFile: 'src/pages/generator/LandscapeSvg.tsx'
	},
	{
		name: 'VTDF',
		root: join(workspaceRoot, 'apps/vtdf-site'),
		appFile: 'src/App.vue',
		headerFile: 'src/components/Header.vue',
		guideLayoutFile: 'src/pages/guide/GuideLayout.vue',
		allowedStyleFile: 'src/pages/generator/GeneratorLandscapeSvg.vue'
	}
];

const walkSourceFiles = (directory: string): string[] => {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) return walkSourceFiles(path);
		return ['.svelte', '.tsx', '.vue'].includes(extname(entry.name)) ? [path] : [];
	});
};

const failures: string[] = [];
const assertSource = (label: string, source: string, required: string[]) => {
	const missing = required.filter((pattern) => !source.includes(pattern));
	if (missing.length > 0) failures.push(`${label}: missing ${missing.join(', ')}`);
};

for (const site of siteConfigs) {
	const appCss = readFileSync(join(site.root, 'src/app.css'), 'utf8');
	assertSource(`${site.name} app.css`, appCss, ["@import '@any-tdf/site-common/styles'"]);

	const appSource = readFileSync(join(site.root, site.appFile), 'utf8');
	assertSource(`${site.name} app shell`, appSource, ['@any-tdf/site-common/site', 'getSiteNavigationState']);

	const headerSource = readFileSync(join(site.root, site.headerFile), 'utf8');
	assertSource(`${site.name} header`, headerSource, [
		'@any-tdf/site-common/site',
		'createSiteLanguageUrl',
		'getSiteNavigationState',
		'siteHeaderIconPaths',
		'sitePaths.generator'
	]);

	const guideLayoutSource = readFileSync(join(site.root, site.guideLayoutFile), 'utf8');
	assertSource(`${site.name} guide route matching`, guideLayoutSource, [
		"pathname.split('/').filter(Boolean)[1] ?? 'quick-start'",
		'item.nav === guideNav'
	]);
	if (guideLayoutSource.includes('path.includes(item.nav)')) {
		failures.push(`${site.name}: guide routes still use partial navigation matching`);
	}

	const unexpectedStyleFiles = walkSourceFiles(join(site.root, 'src'))
		.filter((file) => readFileSync(file, 'utf8').includes('<style'))
		.map((file) => relative(site.root, file))
		.filter((file) => file !== site.allowedStyleFile);
	if (unexpectedStyleFiles.length > 0) {
		failures.push(`${site.name}: component-local styles remain in ${unexpectedStyleFiles.join(', ')}`);
	}
}

const sharedStyles = readFileSync(join(workspaceRoot, 'apps/site-common/assets/styles.css'), 'utf8');
assertSource('site-common styles', sharedStyles, [
	'/* Shared header */',
	'/* Command palette */',
	'/* Package tabs */',
	'.site-code-group-panel > pre',
	'/* Home theme system */',
	'/* Components documentation */',
	'/* Guide layout */',
	'/* Generator page */'
]);

const stdfGuideLayout = readFileSync(join(workspaceRoot, 'apps/stdf-site/src/routes/guide/+layout.svelte'), 'utf8');
assertSource('STDF guide menu', stdfGuideLayout, ["guideMenuList } from '@any-tdf/site-common/data'"]);

const vtdfSource = walkSourceFiles(join(workspaceRoot, 'apps/vtdf-site/src'))
	.map((file) => readFileSync(file, 'utf8'))
	.join('\n');
if (vtdfSource.includes('/guide/generator')) {
	failures.push('VTDF still contains links to /guide/generator');
}

if (failures.length > 0) {
	for (const failure of failures) console.error(`FAIL ${failure}`);
	process.exit(1);
}

console.log(`PASS shared site parity for ${siteConfigs.length} sites`);
