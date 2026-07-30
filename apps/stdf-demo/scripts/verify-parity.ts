import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const routesRoot = join(packageRoot, 'src/routes');
const componentsRoot = join(workspaceRoot, 'packages/stdf/src/lib/components');
const docsRoot = join(workspaceRoot, 'content/stdf/components');
const menuPath = join(workspaceRoot, 'apps/site-common/src/stdf-data/menuList.ts');
const exportsPath = join(workspaceRoot, 'packages/stdf/src/lib/index.ts');

const pascalNames = new Map([
	['actionPopover', 'ActionPopover'],
	['actionSheet', 'ActionSheet'],
	['asyncPicker', 'AsyncPicker'],
	['avatarGroup', 'AvatarGroup'],
	['bottomSheet', 'BottomSheet'],
	['buttonGroup', 'ButtonGroup'],
	['charRoll', 'CharRoll'],
	['codeInput', 'CodeInput'],
	['colorPicker', 'ColorPicker'],
	['countDown', 'CountDown'],
	['fullKeyboard', 'FullKeyboard'],
	['imageList', 'ImageList'],
	['imagePreview', 'ImagePreview'],
	['indexBar', 'IndexBar'],
	['infiniteScroll', 'InfiniteScroll'],
	['navBar', 'NavBar'],
	['noticeBar', 'NoticeBar'],
	['numKeyboard', 'NumKeyboard'],
	['progressLoop', 'ProgressLoop'],
	['pullRefresh', 'PullRefresh'],
	['tabBar', 'TabBar'],
	['timePicker', 'TimePicker']
]);

type MenuGroup = { childs: Array<{ nav: string; title_en: string }> };

const readExportedArray = (source: string, marker: string) => {
	const start = source.indexOf(marker);
	const arrayStart = source.indexOf('[', start);
	const arrayEnd = source.indexOf('\n];', arrayStart) + 2;
	return new Function(`return ${source.slice(arrayStart, arrayEnd)};`)() as MenuGroup[];
};

const menu = readExportedArray(readFileSync(menuPath, 'utf8'), 'export const menuList: MenuList[] = ');
const expectedRoutes = menu.flatMap((group) => group.childs.map((child) => child.nav)).sort();
const actualRoutes = readdirSync(routesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();
const exportsSource = readFileSync(exportsPath, 'utf8');

const missing: string[] = [];
const extra = actualRoutes.filter((route) => !expectedRoutes.includes(route));

for (const route of expectedRoutes) {
	const componentName = pascalNames.get(route) || `${route.charAt(0).toUpperCase()}${route.slice(1)}`;
	const componentFile = join(componentsRoot, route, `${componentName}.svelte`);
	const exportNeedle = `./components/${route}/${componentName}.svelte`;
	if (!actualRoutes.includes(route)) missing.push(`route:${route}`);
	if (!existsSync(join(routesRoot, route, 'zh_CN/+page.svelte'))) missing.push(`route:${route}:zh_CN`);
	if (!existsSync(join(routesRoot, route, 'en_US/+page.svelte'))) missing.push(`route:${route}:en_US`);
	if (!existsSync(componentFile)) missing.push(`component:${route}/${componentName}.svelte`);
	if (!exportsSource.includes(exportNeedle)) missing.push(`export:${componentName}`);

	for (const doc of ['guide.md', 'guide_en.md', 'api.md', 'api_en.md', 'FAQ.md', 'FAQ_en.md', 'version.md', 'version_en.md']) {
		if (!existsSync(join(docsRoot, route, doc))) missing.push(`doc:${route}/${doc}`);
	}
}

const result = {
	expected: expectedRoutes.length,
	routes: actualRoutes.length,
	missing,
	extra,
	ok: missing.length === 0 && extra.length === 0
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
