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
const siteRoot = join(workspaceRoot, 'apps/vtdf-site');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const vtdfPagesRoot = join(workspaceRoot, 'apps/vtdf-demo/src/pages');
const stdfDocsRoot = join(workspaceRoot, 'content/stdf');
const vtdfDocsRoot = join(workspaceRoot, 'content/vtdf');

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

const vtdfComponentRoutes = listDirs(vtdfPagesRoot).filter((component) => {
	return (
		existsSync(join(vtdfPagesRoot, component, 'zh_CN.vue')) && existsSync(join(vtdfPagesRoot, component, 'en_US.vue'))
	);
});

const stdfComponentDocFiles = walkFiles(join(stdfDocsRoot, 'components'))
	.map((file) => relative(join(stdfDocsRoot, 'components'), file))
	.sort();
const vtdfComponentDocFiles = walkFiles(join(vtdfDocsRoot, 'components'))
	.map((file) => relative(join(vtdfDocsRoot, 'components'), file))
	.sort();

const stdfGuideRouteRoot = join(workspaceRoot, 'apps/stdf-site/src/routes/guide');
const stdfGuideRoutes = [
	'quick-start',
	...listDirs(stdfGuideRouteRoot).filter((dir) => existsSync(join(stdfGuideRouteRoot, dir, '+page.svelte')))
].sort();
// 指南侧边栏数据来自 @any-tdf/site-common 的 guideMenuList（GuideLayout.vue 直接引用，不再本地硬编码）
const guideMenuListSource = readFileSync(join(workspaceRoot, 'apps/site-common/src/stdf-data/guideMenuList.ts'), 'utf8');
const vtdfGuideNavs = Array.from(guideMenuListSource.matchAll(/nav:\s*'([^']+)'/g))
	.map((match) => match[1])
	.sort();
const guidePageSource = readFileSync(join(siteRoot, 'src/pages/guide/GuidePage.vue'), 'utf8');

const guideDocMap: Record<string, string> = {
	'quick-start': 'quickStart',
	'icon-plugin': 'iconPlugin',
	md: 'mdPlugin'
};
// color/logo/shortkey 为 pages/guide 下的自定义页面，generator 为 App 级独立路由页面
const customGuidePages = ['color', 'logo', 'shortkey'];
const missingGuideDocs = vtdfGuideNavs
	.filter((nav) => !customGuidePages.includes(nav))
	.flatMap((nav) => {
		const docKey = guideDocMap[nav] || nav;
		const zhPath = join(vtdfDocsRoot, `guide/${docKey}.md`);
		const enPath = join(vtdfDocsRoot, `guide/${docKey}_en.md`);
		const missing: string[] = [];
		if (!existsSync(zhPath)) missing.push(`guide/${docKey}.md`);
		if (!existsSync(enPath)) missing.push(`guide/${docKey}_en.md`);
		return missing;
	});

const missingCustomGuidePages = customGuidePages.filter((nav) => {
	const componentName = `${nav.charAt(0).toUpperCase()}${nav.slice(1).replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}Page.vue`;
	return !existsSync(join(siteRoot, 'src/pages/guide', componentName));
});
// 主题生成器为 App 级独立路由页面（对应 STDF 的 routes/generator）
const missingGeneratorPage = existsSync(join(siteRoot, 'src/pages/generator/GeneratorPage.vue')) ? [] : ['generator/GeneratorPage.vue'];

const appSource = readFileSync(join(siteRoot, 'src/App.vue'), 'utf8');
const requiredAppRoutes = ["currentPage === 'home'", "currentPage === 'guide'", "currentPage === 'components'", "currentPage === 'generator'", '<NotFound'];
const missingAppRoutes = requiredAppRoutes.filter((route) => !appSource.includes(route));
if (!appSource.includes('legacyGeneratorPath') || !appSource.includes('sitePaths.generator')) {
	missingAppRoutes.push('legacy generator redirect');
}

const componentsPageSource = readFileSync(join(siteRoot, 'src/pages/components/ComponentsPage.vue'), 'utf8');
const missingComponentsPageImports = [
	"import.meta.glob('../../../../../apps/vtdf-demo/src/pages/**/zh_CN.vue'",
	"import.meta.glob('../../../../../apps/vtdf-demo/src/pages/**/en_US.vue'",
	'<Api',
	'<Guide',
	'<FAQ',
	'<Version'
].filter((pattern) => !componentsPageSource.includes(pattern));

const componentDocSource = readFileSync(join(siteRoot, 'src/pages/components/Api.vue'), 'utf8');
const missingComponentDocPatterns = ['../../../../../content/vtdf/components/*/api*.md', 'apiText', 'lang'].filter(
	(pattern) => !componentDocSource.includes(pattern)
);

const techStackSource = readFileSync(join(siteRoot, 'src/components/home/TechStack.vue'), 'utf8');
const headerSource = readFileSync(join(siteRoot, 'src/components/Header.vue'), 'utf8');
const vtdfLogoSource = readFileSync(join(siteRoot, 'src/components/VtdfLogo.vue'), 'utf8');
const logoPageSource = readFileSync(join(siteRoot, 'src/pages/guide/LogoPage.vue'), 'utf8');
const sharedStylesSource = readFileSync(join(workspaceRoot, 'apps/site-common/assets/styles.css'), 'utf8');
const vueLogoPath = join(siteRoot, 'static/frameworks/vue.svg');
const vueLogoIssues = [
	...(techStackSource.includes('src="/frameworks/vue.svg"') ? [] : ['official Vue logo reference']),
	...(techStackSource.includes('M12.001 21.406') ? ['remove custom Vue logo geometry'] : []),
	...(!existsSync(vueLogoPath)
		? ['missing vue.svg']
		: createHash('sha256').update(readFileSync(vueLogoPath)).digest('hex') ===
			  '6f97b1f82a6dafdda0b53c347bdfb0b74cb3bf1d73ce8e40bbbb914115235886'
		? []
		: ['modified vue.svg'])
];

const results: CheckResult[] = [
	check(
		'component demo routes',
		`STDF ${stdfComponentRoutes.length}, VTDF ${vtdfComponentRoutes.length}`,
		difference(stdfComponentRoutes, vtdfComponentRoutes),
		difference(vtdfComponentRoutes, stdfComponentRoutes)
	),
	check(
		'component markdown docs',
		`STDF ${stdfComponentDocFiles.length}, VTDF ${vtdfComponentDocFiles.length}`,
		difference(stdfComponentDocFiles, vtdfComponentDocFiles),
		difference(vtdfComponentDocFiles, stdfComponentDocFiles)
	),
	check(
		'guide route menu',
		`STDF ${stdfGuideRoutes.length}, VTDF ${vtdfGuideNavs.length}`,
		difference(stdfGuideRoutes, vtdfGuideNavs),
		difference(vtdfGuideNavs, stdfGuideRoutes)
	),
	check('guide markdown docs', `checked ${vtdfGuideNavs.length - customGuidePages.length} markdown-backed guide routes`, missingGuideDocs),
	check('custom guide pages', `checked ${customGuidePages.length} custom guide pages`, missingCustomGuidePages),
	check('generator page', 'checked standalone generator route page', missingGeneratorPage),
	check('app routes', `checked ${requiredAppRoutes.length} top-level routes`, missingAppRoutes),
	check('components page loaders', 'checked source loaders and doc renderer', missingComponentsPageImports),
	check('component doc loader', 'checked markdown glob and language selection', missingComponentDocPatterns),
	check('Vue brand asset', 'checked official vuejs.org logo asset', vueLogoIssues),
	check(
		'VTDF brand mark',
		'checked shared base mark and check detail',
		[
			'data-logo-layer="vtdf-mark"',
			'data-logo-shape="check"',
			'tdf-vtdf-logo-check',
			'M11.6447 44.4975L32.858 65.7107L68.2133 30.3553'
		]
			.filter((pattern) => !vtdfLogoSource.includes(pattern))
			.concat(['<VtdfLogo class="size-full"'].filter((pattern) => !headerSource.includes(pattern)))
			.concat(['<VtdfLogo class="size-6"'].filter((pattern) => !techStackSource.includes(pattern)))
			.concat(['construction data-logo-construction'].filter((pattern) => !logoPageSource.includes(pattern)))
			.concat(vtdfLogoSource.includes('M20 30H40L20 80V50H0L20 0V30Z') ? ['remove legacy lightning overlay'] : [])
	),
	check(
		'VTDF logo motion scope',
		'checked animated header check, static guide check, and reduced-motion styles',
		['class="site-brand-mark tdf-logo-animated"', 'data-logo-animated']
			.filter((pattern) => !headerSource.includes(pattern))
			.concat(['data-logo-construction', 'data-logo-static'].filter((pattern) => !logoPageSource.includes(pattern)))
			.concat(logoPageSource.includes('tdf-logo-animated') ? ['remove guide logo animation wrapper'] : [])
			.concat(
				['.tdf-logo-animated .tdf-vtdf-logo-check', '@keyframes tdf-vtdf-logo-draw', '@media (prefers-reduced-motion: reduce)'].filter(
					(pattern) => !sharedStylesSource.includes(pattern)
				)
			)
	),
	check(
		'guide page renderer',
		'checked custom page branch and markdown renderer',
		['ColorPage', 'LogoPage', 'ShortkeyPage', 'guideDocs'].filter((pattern) => !guidePageSource.includes(pattern))
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
	console.error('\nVTDF site verification failed.');
	process.exit(1);
}

console.log(`\nVTDF site verification passed for ${results.length} checks.`);
