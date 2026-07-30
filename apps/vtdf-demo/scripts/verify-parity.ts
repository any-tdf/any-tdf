import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfComponentsRoot = join(workspaceRoot, 'packages/stdf/src/lib/components');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const vtdfComponentsRoot = join(workspaceRoot, 'packages/vtdf/src/lib/components');
const vtdfRoutesPath = join(packageRoot, 'src/componentRoutes.ts');

const componentDirExcludes = new Set(['utils']);
const internalComponentNames = new Set(['scrollRadio']);

const listDirs = (dir: string, excludes = new Set<string>()) =>
	readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !excludes.has(entry.name))
		.map((entry) => entry.name)
		.sort();

const pascalCase = (name: string) => {
	const map = new Map([
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
		['navBar', 'NavBar'],
		['noticeBar', 'NoticeBar'],
		['numKeyboard', 'NumKeyboard'],
		['progressLoop', 'ProgressLoop'],
		['tabBar', 'TabBar'],
		['timePicker', 'TimePicker']
	]);
	return map.get(name) || `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};

const stdfComponents = listDirs(stdfComponentsRoot, componentDirExcludes).filter((name) => !internalComponentNames.has(name));
const stdfRoutes = listDirs(stdfRoutesRoot).filter((name) => name !== 'components');
const missingComponentFiles = stdfComponents.map(pascalCase).filter((name) => !existsSync(join(vtdfComponentsRoot, `${name}.vue`)));
const routesSource = readFileSync(vtdfRoutesPath, 'utf8');
const missingRoutes = stdfRoutes.filter((name) => !routesSource.includes(`"nav": "${name}"`) && !routesSource.includes(`nav: '${name}'`));

const result = {
	components: { expected: stdfComponents.length, missing: missingComponentFiles },
	routes: { expected: stdfRoutes.length, missing: missingRoutes },
	ok: missingComponentFiles.length === 0 && missingRoutes.length === 0
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
