import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

type CheckResult = {
	name: string;
	ok: boolean;
	detail: string;
	missing?: string[];
	extra?: string[];
};

type MenuGroup = { childs: Array<{ nav: string }> };

const workspaceRoot = resolve(import.meta.dir, '../../..');
const siteRoot = join(workspaceRoot, 'apps/stdf-site');
const componentDocsRoot = join(workspaceRoot, 'content/stdf/components');
const guideDocsRoot = join(workspaceRoot, 'content/stdf/guide');

const listDirs = (dir: string) =>
	readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

const readExportedArray = (source: string, marker: string) => {
	const start = source.indexOf(marker);
	const arrayStart = source.indexOf('[', start);
	const arrayEnd = source.indexOf('\n];', arrayStart) + 2;
	return new Function(`return ${source.slice(arrayStart, arrayEnd)};`)() as MenuGroup[];
};

const difference = (left: string[], right: string[]) => {
	const rightSet = new Set(right);
	return left.filter((item) => !rightSet.has(item));
};

const check = (name: string, detail: string, missing: string[] = [], extra: string[] = []): CheckResult => ({
	name,
	ok: missing.length === 0,
	detail,
	missing,
	extra
});

const menuSource = readFileSync(join(workspaceRoot, 'apps/site-common/src/stdf-data/menuList.ts'), 'utf8');
const siteMenuSource = readFileSync(join(siteRoot, 'src/data/menuList.ts'), 'utf8');
const expectedComponents = readExportedArray(menuSource, 'export const menuList: MenuList[] = ')
	.flatMap((group) => group.childs.map((child) => child.nav))
	.sort();
const siteComponents = siteMenuSource.includes('@any-tdf/site-common/data')
	? expectedComponents
	: readExportedArray(siteMenuSource, 'export const menuList: MenuList[] = ')
			.flatMap((group) => group.childs.map((child) => child.nav))
			.sort();
const routeComponents = listDirs(join(workspaceRoot, 'apps/stdf-demo/src/routes')).filter((route) => route !== 'components');

const componentDocMissing = expectedComponents.flatMap((component) => {
	const docs = ['guide.md', 'guide_en.md', 'api.md', 'api_en.md', 'FAQ.md', 'FAQ_en.md', 'version.md', 'version_en.md'];
	return docs.filter((doc) => !existsSync(join(componentDocsRoot, component, doc))).map((doc) => `${component}/${doc}`);
});

const requiredGuideDocs = ['quickStart', 'theme', 'icon', 'internation', 'upgrade', 'skill'];
const guideDocMissing = requiredGuideDocs.flatMap((doc) => {
	const missing: string[] = [];
	if (!existsSync(join(guideDocsRoot, `${doc}.md`))) missing.push(`${doc}.md`);
	if (!existsSync(join(guideDocsRoot, `${doc}_en.md`))) missing.push(`${doc}_en.md`);
	return missing;
});

const componentPageSource = readFileSync(join(siteRoot, 'src/routes/components/+page.svelte'), 'utf8');
const componentPageMissing = [
	'../../../../../apps/stdf-demo/src/routes/',
	"from 'stdf'",
	'<Component',
	'<Guide',
	'<Api',
	'<FAQ',
	'<Version',
	'<iframe'
].filter((pattern) => !componentPageSource.includes(pattern));

const techStackSource = readFileSync(join(siteRoot, 'src/lib/home/TechStack.svelte'), 'utf8');
const headerSource = readFileSync(join(siteRoot, 'src/lib/header/Header.svelte'), 'utf8');
const logoPageSource = readFileSync(join(siteRoot, 'src/routes/guide/logo/+page.svelte'), 'utf8');
const sharedStylesSource = readFileSync(join(workspaceRoot, 'apps/site-common/assets/styles.css'), 'utf8');
const svelteLogoPath = join(siteRoot, 'static/frameworks/svelte.svg');
const svelteLogoIssues = [
	...(techStackSource.includes('src="/frameworks/svelte.svg"') ? [] : ['official Svelte logo reference']),
	...(techStackSource.includes('M10.354 21.125') ? ['remove custom Svelte logo geometry'] : []),
	...(!existsSync(svelteLogoPath)
		? ['missing svelte.svg']
		: createHash('sha256').update(readFileSync(svelteLogoPath)).digest('hex') ===
			  'e6a22ffd1efcfeb19eb63ea5f04c794f6b89349080f14158252cdf06db16c98a'
		? []
		: ['modified svelte.svg'])
];

const requiredSiteFiles = [
	'src/routes/+page.svelte',
	'src/routes/components/+page.svelte',
	'src/routes/generator/+page.svelte',
	'src/routes/guide/+layout.svelte',
	'src/routes/guide/+page.svelte',
	'src/routes/guide/create/+page.svelte',
	'src/routes/guide/color/+page.svelte',
	'src/lib/header/Header.svelte',
	'src/lib/menu/Menu.svelte',
	'src/lib/themeSwitch/ThemeSwitch.svelte',
	'src/data/homeData.ts',
	'src/data/menuList.ts'
];

const results: CheckResult[] = [
	check(
		'component menu parity',
		`site-common ${expectedComponents.length}, site ${siteComponents.length}`,
		difference(expectedComponents, siteComponents),
		difference(siteComponents, expectedComponents)
	),
	check(
		'demo route parity',
		`site-common ${expectedComponents.length}, package routes ${routeComponents.length}`,
		difference(expectedComponents, routeComponents),
		difference(routeComponents, expectedComponents)
	),
	check('component markdown docs', `checked ${expectedComponents.length} components`, componentDocMissing),
	check('guide markdown docs', `checked ${requiredGuideDocs.length} guide docs`, guideDocMissing),
	check('components page source', 'checked raw demo loader, docs tabs, and iframe', componentPageMissing),
	check('Svelte brand asset', 'checked official svelte.dev logo asset', svelteLogoIssues),
	check(
		'STDF logo motion scope',
		'checked animated header mark, static guide mark, and reduced-motion styles',
		[
			'class="site-brand-mark tdf-logo-animated"',
			'data-logo-animated',
			'tdf-stdf-logo-lightning',
			'data-logo-layer="stdf-mark"'
		]
			.filter((pattern) => !headerSource.includes(pattern))
			.concat(['data-logo-static', 'data-logo-layer="stdf-mark"'].filter((pattern) => !logoPageSource.includes(pattern)))
			.concat(logoPageSource.includes('tdf-logo-animated') ? ['remove guide logo animation wrapper'] : [])
			.concat(
				['.tdf-logo-animated .tdf-stdf-logo-lightning', '@keyframes tdf-stdf-logo-lightning', '@media (prefers-reduced-motion: reduce)'].filter(
					(pattern) => !sharedStylesSource.includes(pattern)
				)
			)
	),
	check(
		'site files',
		`checked ${requiredSiteFiles.length} files`,
		requiredSiteFiles.filter((file) => !existsSync(join(siteRoot, file)))
	)
];

let failed = false;
for (const result of results) {
	const status = result.ok ? 'PASS' : 'FAIL';
	console.log(`\n${status} ${result.name}`);
	console.log(`  ${result.detail}`);
	if (result.missing?.length) {
		console.log(`  missing: ${result.missing.join(', ')}`);
		failed = true;
	}
	if (result.extra?.length) {
		console.log(`  extra: ${result.extra.join(', ')}`);
	}
}

if (failed) {
	console.error('\nSTDF site verification failed.');
	process.exit(1);
}

console.log(`\nSTDF site verification passed for ${results.length} checks.`);
