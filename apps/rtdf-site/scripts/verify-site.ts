import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

type CheckResult = {
	name: string;
	ok: boolean;
	detail: string;
	missing?: string[];
	extra?: string[];
};

const workspaceRoot = resolve(import.meta.dir, '../../..');
const siteRoot = join(workspaceRoot, 'apps/rtdf-site');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const rtdfPagesRoot = join(workspaceRoot, 'apps/rtdf-demo/src/pages');
const stdfDocsRoot = join(workspaceRoot, 'content/stdf');
const rtdfDocsRoot = join(workspaceRoot, 'content/rtdf');

const listDirs = (dir: string) =>
	readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

const walkFiles = (dir: string): string[] => {
	const entries = readdirSync(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkFiles(fullPath));
		} else if (entry.isFile()) {
			files.push(fullPath);
		}
	}
	return files;
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

const stdfComponentRoutes = listDirs(stdfRoutesRoot).filter((component) => {
	return (
		existsSync(join(stdfRoutesRoot, component, 'zh_CN/+page.svelte')) && existsSync(join(stdfRoutesRoot, component, 'en_US/+page.svelte'))
	);
});

const rtdfComponentRoutes = listDirs(rtdfPagesRoot).filter((component) => {
	return (
		existsSync(join(rtdfPagesRoot, component, 'zh_CN.tsx')) && existsSync(join(rtdfPagesRoot, component, 'en_US.tsx'))
	);
});

const stdfComponentDocFiles = walkFiles(join(stdfDocsRoot, 'components'))
	.map((file) => relative(join(stdfDocsRoot, 'components'), file))
	.sort();
const rtdfComponentDocFiles = walkFiles(join(rtdfDocsRoot, 'components'))
	.map((file) => relative(join(rtdfDocsRoot, 'components'), file))
	.sort();

const stdfGuideRouteRoot = join(workspaceRoot, 'apps/stdf-site/src/routes/guide');
const stdfGuideRoutes = [
	'quick-start',
	...listDirs(stdfGuideRouteRoot).filter((dir) => existsSync(join(stdfGuideRouteRoot, dir, '+page.svelte')))
].sort();
const guideMenuListSource = readFileSync(join(workspaceRoot, 'apps/site-common/src/stdf-data/guideMenuList.ts'), 'utf8');
const rtdfGuideNavs = Array.from(guideMenuListSource.matchAll(/nav:\s*'([^']+)'/g))
	.map((match) => match[1])
	.sort();
const guideLayoutSource = readFileSync(join(siteRoot, 'src/pages/guide/GuideLayout.tsx'), 'utf8');
const logoSource = readFileSync(join(siteRoot, 'src/components/RtdfLogo.tsx'), 'utf8');
const techStackSource = readFileSync(join(siteRoot, 'src/components/home/TechStack.tsx'), 'utf8');
const officialReactAssets = {
	'react-light.svg': 'f06f8906159321315b77af4e86846b95f679d74ec0d681ef92101aa7c1ec8656',
	'react-dark.svg': 'ad13942c43f70b5c43a04edb6e5ad6b12ff6a7c38ad301d38aaa3ed916ec904a'
};
const officialReactAssetIssues = Object.entries(officialReactAssets).flatMap(([filename, expectedHash]) => {
	const assetPath = join(siteRoot, 'static/frameworks', filename);
	if (!existsSync(assetPath)) return [`missing ${filename}`];
	const actualHash = createHash('sha256').update(readFileSync(assetPath)).digest('hex');
	return actualHash === expectedHash ? [] : [`modified ${filename}`];
});

const guideDocMap: Record<string, string> = {
	'quick-start': 'quickStart',
	'icon-plugin': 'iconPlugin',
	md: 'mdPlugin'
};
const customGuidePages = ['color', 'logo', 'shortkey'];
const missingGuideDocs = rtdfGuideNavs
	.filter((nav) => !customGuidePages.includes(nav))
	.flatMap((nav) => {
		const docKey = guideDocMap[nav] || nav;
		const zhPath = join(rtdfDocsRoot, `guide/${docKey}.md`);
		const enPath = join(rtdfDocsRoot, `guide/${docKey}_en.md`);
		const missing: string[] = [];
		if (!existsSync(zhPath)) missing.push(`guide/${docKey}.md`);
		if (!existsSync(enPath)) missing.push(`guide/${docKey}_en.md`);
		return missing;
	});

const missingCustomGuidePages = customGuidePages.filter((nav) => {
	const componentName = `${nav.charAt(0).toUpperCase()}${nav.slice(1).replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}Page.tsx`;
	return !existsSync(join(siteRoot, 'src/pages/guide', componentName));
});
const missingGeneratorPage = existsSync(join(siteRoot, 'src/pages/generator/GeneratorPage.tsx')) ? [] : ['generator/GeneratorPage.tsx'];

const appSource = readFileSync(join(siteRoot, 'src/App.tsx'), 'utf8');
const requiredAppRoutes = ['path="/"', 'path={legacyGeneratorPath}', 'path="/guide/*"', 'path={sitePaths.generator}', 'path="/components"', 'path="*"'];
const missingAppRoutes = requiredAppRoutes.filter((route) => !appSource.includes(route));

const componentsPageSource = readFileSync(join(siteRoot, 'src/pages/components/ComponentsPage.tsx'), 'utf8');
const missingComponentsPageImports = [
	"import.meta.glob('../../../../../apps/rtdf-demo/src/pages/**/zh_CN.tsx'",
	"import.meta.glob('../../../../../apps/rtdf-demo/src/pages/**/en_US.tsx'",
	'<Component',
	'<Api',
	'<Guide',
	'<FAQ',
	'<Version'
].filter((pattern) => !componentsPageSource.includes(pattern));

const componentDocSource = readFileSync(join(siteRoot, 'src/pages/components/mdDocs.ts'), 'utf8');
const missingComponentDocPatterns = ['../../../../../content/rtdf/components/**/*.md', 'loadComponentDoc', 'nav', 'file'].filter(
	(pattern) => !componentDocSource.includes(pattern)
);

const results: CheckResult[] = [
	check(
		'component demo routes',
		`STDF ${stdfComponentRoutes.length}, RTDF ${rtdfComponentRoutes.length}`,
		difference(stdfComponentRoutes, rtdfComponentRoutes),
		difference(rtdfComponentRoutes, stdfComponentRoutes)
	),
	check(
		'component markdown docs',
		`STDF ${stdfComponentDocFiles.length}, RTDF ${rtdfComponentDocFiles.length}`,
		difference(stdfComponentDocFiles, rtdfComponentDocFiles),
		difference(rtdfComponentDocFiles, stdfComponentDocFiles)
	),
	check(
		'guide route menu',
		`STDF ${stdfGuideRoutes.length}, RTDF ${rtdfGuideNavs.length}`,
		difference(stdfGuideRoutes, rtdfGuideNavs),
		difference(rtdfGuideNavs, stdfGuideRoutes)
	),
	check('guide markdown docs', `checked ${rtdfGuideNavs.length - customGuidePages.length} markdown-backed guide routes`, missingGuideDocs),
	check('custom guide pages', `checked ${customGuidePages.length} custom guide pages`, missingCustomGuidePages),
	check('generator page', 'checked standalone generator route page', missingGeneratorPage),
	check('app routes', `checked ${requiredAppRoutes.length} top-level routes`, missingAppRoutes),
	check('components page loaders', 'checked source loaders and doc renderer', missingComponentsPageImports),
	check('component doc loader', 'checked markdown glob and language selection', missingComponentDocPatterns),
	check(
		'RTDF brand mark',
		'checked shared base mark and official React assets',
		[
			'RtdfLogoMark',
			'data-logo-layer="react"',
			'href="/frameworks/react-light.svg"',
			'href="/frameworks/react-dark.svg"'
		]
			.filter((pattern) => !logoSource.includes(pattern))
			.concat(
				['/frameworks/react-light.svg', '/frameworks/react-dark.svg'].filter((pattern) => !techStackSource.includes(pattern))
			)
			.concat(officialReactAssetIssues)
			.concat(logoSource.includes('<ellipse') || logoSource.includes('<circle') ? ['remove custom React geometry'] : [])
			.concat(logoSource.includes('M20 30H40L20 80V50H0L20 0V30Z') ? ['remove legacy lightning overlay'] : [])
	),
	check(
		'guide page renderer',
		'checked custom page branch and markdown renderer',
		['ColorPage', 'LogoPage', 'ShortkeyPage', 'MdPage', 'guideMenuList'].filter((pattern) => !guideLayoutSource.includes(pattern))
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
	console.error('\nRTDF site verification failed.');
	process.exit(1);
}

console.log(`\nRTDF site verification passed for ${results.length} checks.`);
