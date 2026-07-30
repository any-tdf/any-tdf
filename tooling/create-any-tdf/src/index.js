import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as p from '@clack/prompts';
import { blue, bold, cyan, grey, red } from 'kleur/colors';
import minimist from 'minimist';
import { format } from 'oxfmt';

import { fallbackVersions } from './fallbackVersions.js';
import {
	builtInIconLibraryOptions,
	createDependencyAdder,
	createLanguageOptions,
	createVersionResolver,
	formatBlockForMarker,
	getBuiltInIconLibraryOptions,
	getDependencyVersion,
	replaceFileContent,
	writeJson
} from './shared/index.js';
import * as langAll from './lang.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(currentDir, '..');
const packageJsonPath = path.join(packageRoot, 'package.json');
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const { getLatestManifest, getLatestVersion } = createVersionResolver({
	packageRoot,
	fallbackVersions
});
const addLatestDependency = createDependencyAdder(getLatestVersion);
const createAnyTdfVersion = await getLatestVersion('create-any-tdf');

console.log(`
${grey(`create-any-tdf@${version}`)}
`);

if (createAnyTdfVersion && version !== createAnyTdfVersion) {
	console.log(
		red(`Recommended to use the latest version: ${createAnyTdfVersion}
		`)
	);
}

const spinner = p.spinner();

p.intro('Welcome to use Any TDF!');

let lang = langAll.en_US;

const argv = minimist(process.argv.slice(2));
const argvProjectName = argv._[0];
const argvFramework = argv.framework || argv.f;
const argvTemplate = argv.template || argv.t;
const argvLanguage = argv.language || argv.l;
const argvIconUsage = argv.iconUsage || argv['icon-usage'] || argv.i;
const argvThemeMode = argv.themeMode || argv['theme-mode'] || argv.theme || argv.m;
const argvBuiltInIconLibrary = argv.builtInIconLibrary || argv['built-in-icon-library'] || argv.b;
const argvPackageManager = argv.packageManager || argv['package-manager'] || argv.p;
const argvLocalPackages = argv.localPackages || argv['local-packages'];
const canPrompt = Boolean(process.stdin.isTTY && process.stdout.isTTY);

const languages = createLanguageOptions(langAll);
if (argvLanguage && languages.find((item) => item.value === argvLanguage)) {
	lang = langAll[argvLanguage];
}

const frameworkOptions = [
	{
		value: 'svelte',
		label: 'Svelte / STDF',
		alias: ['stdf'],
		packageName: 'stdf',
		packageSection: 'devDependencies',
		packageTag: 'alpha',
		themeCssPath: 'src/app.css',
		siteUrl: 'https://stdf.dev',
		defaultProjectName: 'stdf-project'
	},
	{
		value: 'react',
		label: 'React / RTDF',
		alias: ['rtdf'],
		packageName: 'rtdf',
		packageSection: 'dependencies',
		packageTag: 'alpha',
		themeCssPath: 'src/index.css',
		siteUrl: 'https://rtdf.dev',
		defaultProjectName: 'rtdf-project'
	},
	{
		value: 'vue',
		label: 'Vue / VTDF',
		alias: ['vtdf'],
		packageName: 'vtdf',
		packageSection: 'dependencies',
		packageTag: 'alpha',
		themeCssPath: 'src/index.css',
		siteUrl: 'https://vtdf.dev',
		defaultProjectName: 'vtdf-project'
	}
];

const frameworkTemplateOptions = {
	svelte: [
		{
			value: 'sktt',
			label: 'SvelteKit & Tailwind CSS & TypeScript',
			template: 'sktt',
			ts: true,
			css: 'tailwind',
			vite: false,
			finish: true
		},
		{
			value: 'skut',
			label: 'SvelteKit & UnoCSS & TypeScript',
			template: 'skut',
			ts: true,
			css: 'unocss',
			vite: false,
			finish: true
		},
		{
			value: 'vstt',
			label: 'Vite & Svelte & Tailwind CSS & TypeScript',
			template: 'vstt',
			ts: true,
			css: 'tailwind',
			vite: true,
			finish: true
		},
		{
			value: 'vsut',
			label: 'Vite & Svelte & UnoCSS & TypeScript',
			template: 'vsut',
			ts: true,
			css: 'unocss',
			vite: true,
			finish: true
		}
	],
	react: [
		{
			value: 'vrtt',
			label: 'Vite & React & Tailwind CSS & TypeScript',
			template: 'vrtt',
			ts: true,
			css: 'tailwind',
			finish: true
		},
		{
			value: 'vrut',
			label: 'Vite & React & UnoCSS & TypeScript',
			template: 'vrut',
			ts: true,
			css: 'unocss',
			finish: true
		}
	],
	vue: [
		{
			value: 'vrtt',
			label: 'Vite & Vue & Tailwind CSS & TypeScript',
			template: 'vrtt',
			ts: true,
			css: 'tailwind',
			finish: true
		},
		{
			value: 'vrut',
			label: 'Vite & Vue & UnoCSS & TypeScript',
			template: 'vrut',
			ts: true,
			css: 'unocss',
			finish: true
		}
	]
};

const packageManagerOptions = [
	{ value: 'bun', label: 'Bun', install: 'bun i', dev: 'bun dev' },
	{ value: 'npm', label: 'NPM', install: 'npm i', dev: 'npm run dev' },
	{ value: 'pnpm', label: 'PNPM', install: 'pnpm i', dev: 'pnpm dev' },
	{ value: 'yarn', label: 'Yarn', install: 'yarn', dev: 'yarn run dev' }
];

const ignoredTemplateNames = new Set([
	'.DS_Store',
	'.svelte-kit',
	'bun.lock',
	'dist',
	'node_modules',
	'tsconfig.app.tsbuildinfo',
	'tsconfig.node.tsbuildinfo',
	'uno.config.d.ts',
	'uno.config.js',
	'vite.config.d.ts',
	'vite.config.js'
]);

const shouldCopyTemplatePath = (sourcePath) => !sourcePath.split(path.sep).some((segment) => ignoredTemplateNames.has(segment));

const restoreTemplateDotfiles = async (projectDir) => {
	const packedGitignorePath = path.join(projectDir, '_gitignore');
	if (fs.existsSync(packedGitignorePath)) {
		await fs.move(packedGitignorePath, path.join(projectDir, '.gitignore'), {
			overwrite: true
		});
	}
};

const getLocalPackagesRoot = () => {
	if (!argvLocalPackages) return null;
	return path.resolve(argvLocalPackages === true ? path.join(packageRoot, '../..') : String(argvLocalPackages));
};

const localPackagesRoot = getLocalPackagesRoot();

const getLocalPackagePath = (packageName) => {
	if (!localPackagesRoot) return null;
	const relativePaths = {
		'@any-tdf/common': 'packages/common',
		'@any-tdf/react-confetti': 'packages/react-confetti',
		'@any-tdf/react-motion': 'packages/react-motion',
		'@any-tdf/vue-confetti': 'packages/vue-confetti',
		'@any-tdf/vue-motion': 'packages/vue-motion',
		rtdf: 'packages/rtdf',
		stdf: 'packages/stdf',
		vtdf: 'packages/vtdf'
	};
	const relativePath = relativePaths[packageName];
	if (!relativePath) return null;
	const packagePath = path.join(localPackagesRoot, relativePath);
	const localManifestPath = path.join(packagePath, 'package.json');
	if (fs.existsSync(localManifestPath)) {
		return packagePath;
	}
	const archivePath = `${packagePath}.tgz`;
	if (fs.existsSync(archivePath)) {
		return archivePath;
	}
	throw new Error(`Local package not found: ${localManifestPath} or ${archivePath}`);
};

const setPackageDependency = (packageJson, section, packageName, versionOrPath) => {
	packageJson[section][packageName] = path.isAbsolute(versionOrPath) ? `file:${versionOrPath}` : getDependencyVersion(versionOrPath);
};

const addLocalFrameworkRuntimeDependencies = (packageJson, frameworkItem) => {
	if (!localPackagesRoot) return;
	const runtimeDependencyMap = {
		react: ['@any-tdf/react-confetti', '@any-tdf/react-motion'],
		svelte: [],
		vue: ['@any-tdf/vue-confetti', '@any-tdf/vue-motion']
	};
	packageJson.dependencies ||= {};
	packageJson.overrides ||= {};
	for (const packageName of runtimeDependencyMap[frameworkItem.value]) {
		const localPackagePath = getLocalPackagePath(packageName);
		setPackageDependency(packageJson, 'dependencies', packageName, localPackagePath);
		packageJson.overrides[packageName] = `file:${localPackagePath}`;
	}
};

const sortPackageDependencies = (packageJson) => {
	for (const section of ['dependencies', 'devDependencies', 'overrides']) {
		if (!packageJson[section]) continue;
		packageJson[section] = Object.fromEntries(Object.entries(packageJson[section]).sort(([left], [right]) => left.localeCompare(right)));
	}
};

const iconUsageOptions = [
	{
		value: 'svg-symbol',
		alias: ['any-tdf-icon'],
		label: '@any-tdf/vite-plugin-svg-symbol',
		hintKey: 'iconSvgSymbolHint'
	},
	{ value: 'iconify', alias: [], label: 'Iconify', hintKey: 'iconIconifyHint' },
	{
		value: 'both',
		alias: [],
		label: '@any-tdf/vite-plugin-svg-symbol & Iconify',
		hintKey: 'iconBothHint'
	},
	{ value: 'none', alias: [], label: 'none', hintKey: 'iconNoneHint' }
];

const themeModeOptions = [
	{ value: 'single', labelKey: 'tms' },
	{ value: 'multi', labelKey: 'tmm' },
	{ value: 'all', labelKey: 'tma' }
];

const getThemeModeOptions = () =>
	themeModeOptions.map((item) => ({
		value: item.value,
		label: lang[item.labelKey]
	}));

const getFramework = (value) => frameworkOptions.find((item) => item.value === value || item.alias.includes(value));

const getIconUsage = (value) => iconUsageOptions.find((item) => item.value === value || item.alias.includes(value));

const getOptionValues = (options) => {
	const values = [];
	for (const item of options) {
		values.push(item.value);
		if (item.alias) values.push(...item.alias);
	}
	return values;
};

const exitInvalid = (message, options) => {
	p.intro(red(message + ' (' + getOptionValues(options).join(', ') + ')'));
	process.exit(1);
};

const getAppPath = (projectDir, frameworkItem, templateItem) => {
	if (frameworkItem.value === 'svelte') {
		return templateItem.vite ? path.join(projectDir, 'src/App.svelte') : path.join(projectDir, 'src/routes/+page.svelte');
	}
	if (frameworkItem.value === 'vue') return path.join(projectDir, 'src/App.vue');
	return path.join(projectDir, 'src/App.tsx');
};

const getSnippetPath = (frameworkItem, fileName) => path.join(packageRoot, 'snippet', frameworkItem.value, fileName);

const getFrameworkMarkerPrefix = (frameworkItem) => {
	if (frameworkItem.value === 'svelte') return 'STDF';
	if (frameworkItem.value === 'vue') return 'VTDF';
	return 'RTDF';
};

const getIconMarker = (frameworkItem) => {
	if (frameworkItem.value === 'react') return '{/* RTDF_ICON_EXAMPLES */}';
	if (frameworkItem.value === 'vue') return '<!-- VTDF_ICON_EXAMPLES -->';
	return '<!-- STDF_ICON_EXAMPLES -->';
};

const getIconSnippetIndent = (frameworkItem) => {
	if (frameworkItem.value === 'react') return '\t\t\t\t';
	if (frameworkItem.value === 'vue') return '\t\t\t';
	return '\t';
};

const generatedFormatOptions = {
	printWidth: 140,
	semi: true,
	singleQuote: true,
	sortPackageJson: true,
	trailingComma: 'none',
	useTabs: true
};

const formatGeneratedFile = async (filePath) => {
	const sourceText = fs.readFileSync(filePath, 'utf-8');
	const result = await format(filePath, sourceText, generatedFormatOptions);
	if (result.errors.length > 0) {
		throw new Error(`Failed to format ${path.relative(path.dirname(filePath), filePath)}: ${result.errors[0].message}`);
	}
	fs.writeFileSync(filePath, result.code, 'utf-8');
};

const formatGeneratedProject = async (projectDir, frameworkItem, templateItem) => {
	const filePaths = [path.join(projectDir, 'package.json'), path.join(projectDir, 'vite.config.ts')];
	if (templateItem.css === 'unocss') filePaths.push(path.join(projectDir, 'uno.config.ts'));
	if (frameworkItem.value !== 'svelte') filePaths.push(getAppPath(projectDir, frameworkItem, templateItem));
	await Promise.all(filePaths.map(formatGeneratedFile));
};

const getIconMarkerReplacement = (frameworkItem, snippet) => {
	const marker = getIconMarker(frameworkItem);
	const indent = getIconSnippetIndent(frameworkItem);
	const nextMarker = `${formatBlockForMarker(snippet, indent)}\n\n${indent}${marker}`;
	return frameworkItem.value === 'react' ? nextMarker : nextMarker;
};

const addTailwindIconify = async (projectDir, packageJson, frameworkItem, templateItem) => {
	await addLatestDependency(packageJson, 'devDependencies', '@iconify/tailwind4');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/bitcoin-icons');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/duo-icons');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/fluent-color');

	const appCssPath = path.join(projectDir, frameworkItem.themeCssPath);
	const appCss = fs.readFileSync(appCssPath, 'utf-8');
	const iconifyBlock = '@plugin "@iconify/tailwind4" {\n\tprefixes: duo-icons, bitcoin-icons, fluent-color;\n}\n\n';
	const nextAppCss = appCss.includes('@plugin "@iconify/tailwind4"') ? appCss : appCss.replace('@theme', `${iconifyBlock}@theme`);
	fs.writeFileSync(appCssPath, nextAppCss, 'utf-8');

	const iconifySnippet = fs.readFileSync(getSnippetPath(frameworkItem, 'iconify.txt'), 'utf-8');
	replaceFileContent(getAppPath(projectDir, frameworkItem, templateItem), [
		[getIconMarker(frameworkItem), getIconMarkerReplacement(frameworkItem, iconifySnippet)]
	]);
};

const addUnoCssIconify = async (projectDir, packageJson, frameworkItem, templateItem) => {
	await addLatestDependency(packageJson, 'devDependencies', '@unocss/preset-icons');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/bitcoin-icons');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/duo-icons');
	await addLatestDependency(packageJson, 'devDependencies', '@iconify-json/fluent-color');

	const prefix = getFrameworkMarkerPrefix(frameworkItem);
	const unoConfigPath = path.join(projectDir, 'uno.config.ts');
	replaceFileContent(unoConfigPath, [
		[`/* ${prefix}_UNOCSS_ICON_IMPORT */`, "import presetIcons from '@unocss/preset-icons';"],
		[
			`\n\t\t/* ${prefix}_UNOCSS_ICON_PRESET */`,
			`,
		presetIcons({
\t\t\textraProperties: {
\t\t\t\tdisplay: 'inline-block',
\t\t\t\t'vertical-align': 'middle',
\t\t\t},
\t\t})`
		],
		[
			`\n\t/* ${prefix}_UNOCSS_ICON_SAFE_LIST */`,
			`,
	'i-duo-icons:cake',
\t'i-duo-icons:brush',
\t'i-bitcoin-icons:miner-filled',
\t'i-bitcoin-icons:magic-wand-outline',
\t'i-fluent-color:building-store-20'`
		]
	]);

	const iconifySnippet = fs.readFileSync(getSnippetPath(frameworkItem, 'iconify-unocss.txt'), 'utf-8');
	replaceFileContent(getAppPath(projectDir, frameworkItem, templateItem), [
		[getIconMarker(frameworkItem), getIconMarkerReplacement(frameworkItem, iconifySnippet)]
	]);
};

const addIconify = async (projectDir, packageJson, frameworkItem, templateItem) => {
	if (templateItem.css === 'unocss') {
		await addUnoCssIconify(projectDir, packageJson, frameworkItem, templateItem);
		return;
	}
	await addTailwindIconify(projectDir, packageJson, frameworkItem, templateItem);
};

const addSvgSymbol = async (projectDir, packageJson, frameworkItem, templateItem) => {
	await addLatestDependency(packageJson, 'devDependencies', '@any-tdf/vite-plugin-svg-symbol');

	const prefix = getFrameworkMarkerPrefix(frameworkItem);
	const outDir = frameworkItem.value === 'svelte' && !templateItem.vite ? 'static' : 'public';
	const viteConfigPath = path.join(projectDir, 'vite.config.ts');
	replaceFileContent(viteConfigPath, [
		[`/* ${prefix}_SVG_SYMBOL_IMPORT */`, "import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';"],
		[
			`\n\t\t/* ${prefix}_SVG_SYMBOL_PLUGIN */`,
			`,
		svgSymbol([
\t\t\t{ inFile: 'src/lib/svgs/Heroicons', outFile: '${outDir}/symbols' },
\t\t\t{ inFile: 'src/lib/svgs/IconPark', outFile: '${outDir}/symbols' },
\t\t\t{ inFile: 'src/lib/svgs/Remix', outFile: '${outDir}/symbols' },
\t\t])`
		]
	]);

	fs.copySync(getSnippetPath(frameworkItem, 'svgs'), path.join(projectDir, 'src/lib/svgs'));

	const svgSymbolSnippet = fs.readFileSync(getSnippetPath(frameworkItem, 'svg-symbol.txt'), 'utf-8');
	replaceFileContent(getAppPath(projectDir, frameworkItem, templateItem), [
		[getIconMarker(frameworkItem), getIconMarkerReplacement(frameworkItem, svgSymbolSnippet)]
	]);
};

const addCommonDependency = async (packageJson, frameworkItem) => {
	const localCommonPath = getLocalPackagePath('@any-tdf/common');
	const commonVersionOrPath = localCommonPath || (await getLatestVersion('@any-tdf/common'));
	if (commonVersionOrPath) {
		setPackageDependency(packageJson, frameworkItem.packageSection, '@any-tdf/common', commonVersionOrPath);
	}
	if (localCommonPath) {
		packageJson.overrides ||= {};
		packageJson.overrides['@any-tdf/common'] = `file:${localCommonPath}`;
	}
};

const updateSvelteThemeCss = (cssContent, mode, templateItem) => {
	if (templateItem.css === 'unocss') return cssContent;

	const pluginRegex = /@plugin "(?:stdf\/theme|@any-tdf\/common\/theme)" \{[\s\S]*?\}\n\n?/;
	const multiPlugin = '@plugin "stdf/theme" {\n\tname: "ANYTDF, Sage, GoldWood";\n}\n\n';
	const allPlugin = '@plugin "stdf/theme" {\n\tall: true;\n}\n\n';
	const insertPlugin = (content, pluginBlock) => {
		if (content.match(pluginRegex)) return content.replace(pluginRegex, pluginBlock);
		return content.replace('@theme', `${pluginBlock}@theme`);
	};

	if (mode === 'single') return cssContent.replace(pluginRegex, '');
	if (mode === 'all') return insertPlugin(cssContent, allPlugin);
	return insertPlugin(cssContent, multiPlugin);
};

const getSvelteThemeBlocks = (mode) => {
	if (mode === 'single') {
		return { importName: 'switchMode', state: '', control: '' };
	}

	if (mode === 'all') {
		return {
			importName: 'switchTheme, switchMode, themes, getTheme',
			state: `const themeNames = themes.map((item) => item.name);
\tlet theme = $state('ANYTDF');
\tlet currentTheme = $state(getTheme());
\tconst randomThemeFun = () => {
\t\tif (themeNames.length === 0) return;
\t\tconst index = Math.floor(Math.random() * themeNames.length);
\t\ttheme = themeNames[index] || 'ANYTDF';
\t};

\t$effect(() => {
\t\tif (theme) {
\t\t\tswitchTheme(theme);
\t\t\tcurrentTheme = getTheme();
\t\t}
\t});`,
			control: `<div class="my-6 flex flex-col gap-3 px-4 text-center">
\t<Button fill="lineState" onclick={randomThemeFun}>{lang === 'zh_CN' ? '随机主题' : 'Random theme'}</Button>
\t<div class="text-xs opacity-70">{lang === 'zh_CN' ? '当前主题' : 'Current theme'}: {currentTheme}</div>
</div>`
		};
	}

	return {
		importName: 'switchTheme, switchMode',
		state: `const themeOptions = [
\t\t{ name: 'ANYTDF', labelZh: 'STDF', labelEn: 'STDF' },
\t\t{ name: 'Sage', labelZh: '草绿粉紫', labelEn: 'Sage' },
\t\t{ name: 'GoldWood', labelZh: '金色森林', labelEn: 'GoldWood' },
\t];
\tconst themeLabels = $derived(themeOptions.map((item) => ({ text: lang === 'zh_CN' ? item.labelZh : item.labelEn })));
\tlet themeIndex = $state(0);

\t$effect(() => {
\t\tconst currentTheme = themeOptions[themeIndex]?.name;
\t\tif (currentTheme) switchTheme(currentTheme);
\t});`,
		control: `<div class="my-6 px-4">
\t<Tabs tab={{ labels: themeLabels }} bind:active={themeIndex} />
</div>`
	};
};

const updateSvelteThemeApp = (appContent, mode) => {
	const themeBlocks = getSvelteThemeBlocks(mode);
	return appContent
		.replace(/import \{ switchMode \} from 'stdf\/theme';/, `import { ${themeBlocks.importName} } from 'stdf/theme';`)
		.replace(
			/(\t\/\/ 日历\n\t\/\/ Calendar\n\tlet visible = \$state\(false\);)/,
			themeBlocks.state ? `$1\n\n\t// 主题\n\t// Theme\n\t${themeBlocks.state}` : '$1'
		)
		.replace('\t<!-- STDF_THEME_CONTROL -->', formatBlockForMarker(themeBlocks.control, '\t'));
};

const updateReactThemeCss = (cssContent, mode, templateItem) => {
	if (templateItem.css === 'unocss') return cssContent;

	const pluginRegex = /@plugin "rtdf\/theme(?:\/plugin)?" \{[\s\S]*?\}\n\n?/;
	const singlePlugin = '@plugin "rtdf/theme/plugin" {\n\tname: "ANYTDF";\n}\n\n';
	const multiPlugin = '@plugin "rtdf/theme/plugin" {\n\tname: "ANYTDF, Sage, GoldWood";\n}\n\n';
	const allPlugin = '@plugin "rtdf/theme/plugin" {\n\tall: true;\n}\n\n';
	const insertPlugin = (content, pluginBlock) => {
		if (content.match(pluginRegex)) return content.replace(pluginRegex, pluginBlock);
		return content.replace('@theme', `${pluginBlock}@theme`);
	};

	if (mode === 'single') return insertPlugin(cssContent, singlePlugin);
	if (mode === 'all') return insertPlugin(cssContent, allPlugin);
	return insertPlugin(cssContent, multiPlugin);
};

const getReactThemeBlocks = (mode) => {
	if (mode === 'single') {
		return { state: "const activeTheme = 'ANYTDF';", control: '' };
	}

	if (mode === 'all') {
		return {
			state: `const themeNames = useMemo(() => themes.map(item => item.name), []);
const [theme, setTheme] = useState('ANYTDF');
const activeTheme = theme;
const randomThemeFun = () => {
\tif (themeNames.length === 0) return;
\tconst nextIndex = Math.floor(Math.random() * themeNames.length);
\tsetTheme(themeNames[nextIndex] || 'ANYTDF');
};`,
			control: `<div className='my-6 flex flex-col gap-3 px-4 text-center'>
\t<Button fill='lineState' onClick={randomThemeFun}>{isZh ? '随机主题' : 'Random theme'}</Button>
\t<div className='text-xs opacity-70'>{isZh ? '当前主题' : 'Current theme'}: {activeTheme}</div>
</div>`
		};
	}

	return {
		state: `const themeOptions = [
\t{ name: 'ANYTDF', labelZh: 'ANYTDF', labelEn: 'ANYTDF' },
\t{ name: 'Sage', labelZh: '草绿粉紫', labelEn: 'Sage' },
\t{ name: 'GoldWood', labelZh: '金色森林', labelEn: 'GoldWood' }
];
const [themeIndex, setThemeIndex] = useState(0);
const themeLabels = useMemo(
\t() => themeOptions.map(item => ({ text: isZh ? item.labelZh : item.labelEn })),
\t[isZh]
);
const activeTheme = themeOptions[themeIndex]?.name || 'ANYTDF';`,
		control: `<div className='my-6 px-4'>
\t<Tabs tab={{ labels: themeLabels }} active={themeIndex} onChange={setThemeIndex} transition={false} />
</div>`
	};
};

const updateReactThemeApp = (appContent, mode) => {
	const themeBlocks = getReactThemeBlocks(mode);
	return appContent
		.replace('/* RTDF_THEME_IMPORT */', mode === 'all' ? "import { themes } from 'rtdf/theme/runtime';" : '')
		.replace('/* RTDF_THEME_STATE */', formatBlockForMarker(themeBlocks.state, '\t'))
		.replace('{/* RTDF_THEME_CONTROL */}', formatBlockForMarker(themeBlocks.control, '\t\t\t\t'));
};

const updateVueThemeCss = (cssContent, mode, templateItem) => {
	if (templateItem.css === 'unocss') return cssContent;

	const pluginRegex = /@plugin "vtdf\/theme(?:\/plugin)?" \{[\s\S]*?\}\n\n?/;
	const singlePlugin = '@plugin "vtdf/theme/plugin" {\n\tname: "ANYTDF";\n}\n\n';
	const multiPlugin = '@plugin "vtdf/theme/plugin" {\n\tname: "ANYTDF, Sage, GoldWood";\n}\n\n';
	const allPlugin = '@plugin "vtdf/theme/plugin" {\n\tall: true;\n}\n\n';
	const insertPlugin = (content, pluginBlock) => {
		if (content.match(pluginRegex)) return content.replace(pluginRegex, pluginBlock);
		return content.replace('@theme', `${pluginBlock}@theme`);
	};

	if (mode === 'single') return insertPlugin(cssContent, singlePlugin);
	if (mode === 'all') return insertPlugin(cssContent, allPlugin);
	return insertPlugin(cssContent, multiPlugin);
};

const getVueThemeBlocks = (mode) => {
	if (mode === 'single') {
		return {
			state: "const activeTheme = computed(() => 'ANYTDF');",
			control: ''
		};
	}

	if (mode === 'all') {
		return {
			state: `const themeNames = themes.map(item => item.name);
const theme = ref('ANYTDF');
const activeTheme = computed(() => theme.value);
const randomThemeFun = () => {
\tif (themeNames.length === 0) return;
\tconst nextIndex = Math.floor(Math.random() * themeNames.length);
\ttheme.value = themeNames[nextIndex] || 'ANYTDF';
};`,
			control: `<div class="my-6 flex flex-col gap-3 px-4 text-center">
\t<Button fill="lineState" @click="randomThemeFun">{{ isZh ? '随机主题' : 'Random theme' }}</Button>
\t<div class="text-xs opacity-70">{{ isZh ? '当前主题' : 'Current theme' }}: {{ activeTheme }}</div>
</div>`
		};
	}

	return {
		state: `const themeOptions = [
\t{ name: 'ANYTDF', labelZh: 'VTDF', labelEn: 'VTDF' },
\t{ name: 'Sage', labelZh: '草绿粉紫', labelEn: 'Sage' },
\t{ name: 'GoldWood', labelZh: '金色森林', labelEn: 'GoldWood' },
];
const themeIndex = ref(0);
const themeLabels = computed(() => themeOptions.map(item => ({ text: isZh.value ? item.labelZh : item.labelEn })));
const activeTheme = computed(() => themeOptions[themeIndex.value]?.name || 'ANYTDF');`,
		control: `<div class="my-6 px-4">
\t<Tab v-model:active="themeIndex" :labels="themeLabels" />
</div>`
	};
};

const updateVueThemeApp = (appContent, mode) => {
	const themeBlocks = getVueThemeBlocks(mode);
	return appContent
		.replace('/* VTDF_THEME_IMPORT */', mode === 'all' ? "import { themes } from 'vtdf/theme';" : '')
		.replace('/* VTDF_THEME_STATE */', formatBlockForMarker(themeBlocks.state, ''))
		.replace('\t\t\t<!-- VTDF_THEME_CONTROL -->', formatBlockForMarker(themeBlocks.control, '\t\t\t'));
};

const updateThemeCss = (cssContent, frameworkItem, templateItem, themeMode) => {
	if (frameworkItem.value === 'svelte') return updateSvelteThemeCss(cssContent, themeMode, templateItem);
	if (frameworkItem.value === 'vue') return updateVueThemeCss(cssContent, themeMode, templateItem);
	return updateReactThemeCss(cssContent, themeMode, templateItem);
};

const updateThemeApp = (appContent, frameworkItem, themeMode) => {
	if (frameworkItem.value === 'svelte') return updateSvelteThemeApp(appContent, themeMode);
	if (frameworkItem.value === 'vue') return updateVueThemeApp(appContent, themeMode);
	return updateReactThemeApp(appContent, themeMode);
};

const updateBuiltInIconLibraryApp = (appContent, frameworkItem, builtInIconLibraryItem) => {
	const markerMap = {
		react: '__RTDF_BUILT_IN_ICON_LIBRARY__',
		svelte: '__STDF_BUILT_IN_ICON_LIBRARY__',
		vue: '__VTDF_BUILT_IN_ICON_LIBRARY__'
	};
	return appContent.replaceAll(markerMap[frameworkItem.value], builtInIconLibraryItem.library);
};

const updateOptionalComponentImports = (appContent, templateItem, iconUsageItem, themeMode) => {
	const usesIconComponent =
		iconUsageItem.value === 'svg-symbol' ||
		iconUsageItem.value === 'both' ||
		(iconUsageItem.value === 'iconify' && templateItem.css === 'tailwind');
	let nextContent = appContent;
	if (!usesIconComponent) nextContent = nextContent.replace(', Icon', '');
	if (themeMode !== 'multi') {
		nextContent = nextContent.replace(', Tabs', '').replace(', Tab }', ' }');
	}
	return nextContent;
};

const finalizeOptionalMarkers = (projectDir, frameworkItem, templateItem) => {
	const appPath = getAppPath(projectDir, frameworkItem, templateItem);
	replaceFileContent(appPath, [[getIconMarker(frameworkItem), '']]);

	const prefix = getFrameworkMarkerPrefix(frameworkItem);
	const viteConfigPath = path.join(projectDir, 'vite.config.ts');
	replaceFileContent(viteConfigPath, [
		[`/* ${prefix}_SVG_SYMBOL_IMPORT */`, ''],
		[`/* ${prefix}_SVG_SYMBOL_PLUGIN */`, '']
	]);

	const unoConfigPath = path.join(projectDir, 'uno.config.ts');
	if (fs.existsSync(unoConfigPath)) {
		replaceFileContent(unoConfigPath, [
			[`/* ${prefix}_UNOCSS_ICON_IMPORT */`, ''],
			[`/* ${prefix}_UNOCSS_ICON_PRESET */`, ''],
			[`/* ${prefix}_UNOCSS_ICON_SAFE_LIST */`, '']
		]);
	}
};

const stripVersionPrefix = (versionValue) => (versionValue ? versionValue.replace(/^\^/, '') : '');

const getVersions = (packageJson, frameworkItem, templateItem) => {
	if (frameworkItem.value === 'svelte') {
		const versions = {
			svelte: stripVersionPrefix(packageJson.devDependencies.svelte),
			stdf: stripVersionPrefix(packageJson.devDependencies.stdf)
		};
		if (templateItem.vite) {
			versions.vite = stripVersionPrefix(packageJson.devDependencies.vite);
		} else {
			versions['@sveltejs/kit'] = stripVersionPrefix(packageJson.devDependencies['@sveltejs/kit']);
		}
		if (templateItem.css === 'tailwind') {
			versions.tailwindcss = stripVersionPrefix(packageJson.devDependencies.tailwindcss);
		} else {
			versions.unocss = stripVersionPrefix(packageJson.devDependencies.unocss);
		}
		return versions;
	}

	if (frameworkItem.value === 'vue') {
		return {
			vue: stripVersionPrefix(packageJson.dependencies.vue),
			vtdf: stripVersionPrefix(packageJson.dependencies.vtdf),
			vite: stripVersionPrefix(packageJson.devDependencies.vite),
			[templateItem.css === 'tailwind' ? 'tailwindcss' : 'unocss']: stripVersionPrefix(
				templateItem.css === 'tailwind' ? packageJson.devDependencies.tailwindcss : packageJson.devDependencies.unocss
			)
		};
	}

	return {
		react: stripVersionPrefix(packageJson.dependencies.react),
		rtdf: stripVersionPrefix(packageJson.dependencies.rtdf),
		vite: stripVersionPrefix(packageJson.devDependencies.vite),
		[templateItem.css === 'tailwind' ? 'tailwindcss' : 'unocss']: stripVersionPrefix(
			templateItem.css === 'tailwind' ? packageJson.devDependencies.tailwindcss : packageJson.devDependencies.unocss
		)
	};
};

const getThemeTip = (frameworkItem, templateItem) => {
	const suffix =
		templateItem.css === 'tailwind'
			? `${frameworkItem.themeCssPath}, reference ${frameworkItem.siteUrl}/guide/theme`
			: `${frameworkItem.themeCssPath} and UnoCSS tokens in uno.config.ts, reference ${frameworkItem.siteUrl}/guide/theme`;

	if (lang === langAll.zh_CN) {
		return templateItem.css === 'tailwind'
			? `提示：请到 ${frameworkItem.themeCssPath} 配置初始主题色，参考 ${frameworkItem.siteUrl}/guide/theme`
			: `提示：请到 ${frameworkItem.themeCssPath} 配置初始主题色，并在 uno.config.ts 同步 UnoCSS token，参考 ${frameworkItem.siteUrl}/guide/theme`;
	}

	if (lang === langAll.zh_TW) {
		return templateItem.css === 'tailwind'
			? `提示：請到 ${frameworkItem.themeCssPath} 配置初始主題色，參考 ${frameworkItem.siteUrl}/guide/theme`
			: `提示：請到 ${frameworkItem.themeCssPath} 配置初始主題色，並在 uno.config.ts 同步 UnoCSS token，參考 ${frameworkItem.siteUrl}/guide/theme`;
	}

	return `Tip: please configure Initial Color System in ${suffix}`;
};

const getThemeGeneratorHint = (frameworkItem) => {
	if (lang === langAll.zh_CN) return `可到 ${frameworkItem.siteUrl}/guide/generator 配置生成自定义主题`;
	if (lang === langAll.zh_TW) return `可到 ${frameworkItem.siteUrl}/guide/generator 配置生成自定義主題`;
	return `You can generate custom themes at ${frameworkItem.siteUrl}/guide/generator`;
};

const runCreateFunc = (...args) => {
	createFunc(...args).catch((err) => {
		spinner.stop();
		console.error(red(`${lang.cferror} -- ${err.message || err}`));
		process.exit(1);
	});
};

const createFunc = async (
	projectName,
	frameworkItem,
	templateItem,
	iconUsageItem,
	packageManagerItem,
	themeModeItem,
	builtInIconLibraryItem
) => {
	const normalizedProjectName = String(projectName);
	const projectDir = path.resolve(normalizedProjectName);
	const packageName = path.basename(projectDir);
	const themeMode = themeModeItem?.value || 'multi';
	const localFrameworkPath = getLocalPackagePath(frameworkItem.packageName);
	const frameworkManifest = localFrameworkPath ? null : await getLatestManifest(frameworkItem.packageName, frameworkItem.packageTag);
	const frameworkVersionOrPath = localFrameworkPath || frameworkManifest?.version;
	if (!frameworkVersionOrPath) {
		throw new Error(
			`${frameworkItem.packageName}@${frameworkItem.packageTag} is not published. Use --local-packages <workspace-root> for local source validation.`
		);
	}
	let packageJson;

	spinner.start('🚀 ' + lang.cfsing);
	try {
		fs.mkdirSync(projectDir, { recursive: true });

		const templatePath = path.join(packageRoot, 'templates', frameworkItem.value, templateItem.template);
		await fs.copy(templatePath, projectDir, { filter: shouldCopyTemplatePath });
		await restoreTemplateDotfiles(projectDir);

		const packageJsonPathInner = path.join(projectDir, 'package.json');
		packageJson = JSON.parse(fs.readFileSync(packageJsonPathInner, 'utf-8'));
		packageJson.name = packageName;
		packageJson[frameworkItem.packageSection] ||= {};
		packageJson.devDependencies ||= {};

		setPackageDependency(packageJson, frameworkItem.packageSection, frameworkItem.packageName, frameworkVersionOrPath);
		await addCommonDependency(packageJson, frameworkItem);
		addLocalFrameworkRuntimeDependencies(packageJson, frameworkItem);

		if (iconUsageItem.value === 'iconify') {
			await addIconify(projectDir, packageJson, frameworkItem, templateItem);
		}
		if (iconUsageItem.value === 'svg-symbol') {
			await addSvgSymbol(projectDir, packageJson, frameworkItem, templateItem);
		}
		if (iconUsageItem.value === 'both') {
			await addIconify(projectDir, packageJson, frameworkItem, templateItem);
			await addSvgSymbol(projectDir, packageJson, frameworkItem, templateItem);
		}

		const appCssPath = path.join(projectDir, frameworkItem.themeCssPath);
		const appCssContent = fs.readFileSync(appCssPath, 'utf-8');
		fs.writeFileSync(appCssPath, updateThemeCss(appCssContent, frameworkItem, templateItem, themeMode), 'utf-8');

		const appPath = getAppPath(projectDir, frameworkItem, templateItem);
		const appContent = fs.readFileSync(appPath, 'utf-8');
		fs.writeFileSync(
			appPath,
			updateOptionalComponentImports(
				updateBuiltInIconLibraryApp(updateThemeApp(appContent, frameworkItem, themeMode), frameworkItem, builtInIconLibraryItem),
				templateItem,
				iconUsageItem,
				themeMode
			),
			'utf-8'
		);

		finalizeOptionalMarkers(projectDir, frameworkItem, templateItem);
		sortPackageDependencies(packageJson);
		writeJson(packageJsonPathInner, packageJson);
		await formatGeneratedProject(projectDir, frameworkItem, templateItem);
	} catch (error) {
		await fs.remove(projectDir);
		throw error;
	}

	spinner.stop();
	p.outro(`🎉🎉🎉 ${packageName} - ${lang.pcsucc}`);

	const versions = getVersions(packageJson, frameworkItem, templateItem);
	let versionsString = '';
	for (const key in versions) {
		versionsString += bold(key) + ': ' + cyan(versions[key]) + ' ';
	}

	console.log(`📦 ${versionsString}
	`);

	console.log(
		`👉 ${bold(lang.tgs)}
    ${blue(`1. cd ${normalizedProjectName}`)}
    ${blue(`2. ${packageManagerItem.install}`)}
    ${blue(`3. ${packageManagerItem.dev}`)}
    `
	);

	console.log(`🎨 ${grey(getThemeTip(frameworkItem, templateItem))}`);
	process.exit(0);
};

const resolveArgFramework = () => {
	if (!argvFramework) return null;
	const itemFramework = getFramework(argvFramework);
	if (!itemFramework) exitInvalid('Please enter the correct framework!', frameworkOptions);
	return itemFramework;
};

const resolveArgTemplate = (frameworkItem) => {
	const templateOptions = frameworkTemplateOptions[frameworkItem.value];
	if (!argvTemplate) return null;
	const itemTemplate = templateOptions.find((item) => item.value === argvTemplate);
	if (!itemTemplate) exitInvalid(lang.pectn, templateOptions);
	return itemTemplate;
};

const resolveArgIconUsage = () => {
	if (!argvIconUsage) return null;
	const itemIconUsage = getIconUsage(argvIconUsage);
	if (!itemIconUsage) exitInvalid(lang.pic, iconUsageOptions);
	return itemIconUsage;
};

const resolveArgThemeMode = () => {
	if (!argvThemeMode) return null;
	const itemThemeMode = themeModeOptions.find((item) => item.value === argvThemeMode);
	if (!itemThemeMode) exitInvalid(lang.ptm, themeModeOptions);
	return itemThemeMode;
};

const resolveArgBuiltInIconLibrary = () => {
	if (!argvBuiltInIconLibrary) return null;
	const itemBuiltInIconLibrary = builtInIconLibraryOptions.find((item) => item.value === argvBuiltInIconLibrary);
	if (!itemBuiltInIconLibrary) exitInvalid('Please enter the correct built-in icon library!', builtInIconLibraryOptions);
	return itemBuiltInIconLibrary;
};

const resolveArgPackageManager = () => {
	if (!argvPackageManager) return null;
	const itemPackageManager = packageManagerOptions.find((item) => item.value === argvPackageManager);
	if (!itemPackageManager) exitInvalid('Please enter the correct package manager!', packageManagerOptions);
	return itemPackageManager;
};

const selectLanguage = async () => {
	if (argvLanguage && languages.find((item) => item.value === argvLanguage)) return;
	if (argvProjectName && !canPrompt) return;

	const languageType = await p.select({
		message: bold('Please select your preferred language'),
		options: languages
	});
	if (p.isCancel(languageType)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	lang = langAll[languageType];
};

const selectFramework = async (itemFramework) => {
	if (itemFramework) return itemFramework;
	if (!canPrompt) exitInvalid('Please enter the correct framework!', frameworkOptions);

	const framework = await p.select({
		message: bold('Please select framework'),
		options: frameworkOptions.map((item) => ({
			value: item.value,
			label: item.label
		}))
	});
	if (p.isCancel(framework)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return getFramework(framework);
};

const selectTemplate = async (frameworkItem, itemTemplate) => {
	if (itemTemplate) return itemTemplate;
	if (argvProjectName) return frameworkTemplateOptions[frameworkItem.value][0];

	const templateOptions = frameworkTemplateOptions[frameworkItem.value];
	const template = await p.select({
		message: bold(lang.psat),
		options: templateOptions.map((item) => ({
			value: item.value,
			label: item.finish ? item.label : `(${lang.hnay}) ${item.label}`,
			disabled: !item.finish
		}))
	});
	if (p.isCancel(template)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return templateOptions.find((item) => item.value === template);
};

const selectIconUsage = async (itemIconUsage) => {
	if (itemIconUsage) return itemIconUsage;
	if (argvProjectName) return iconUsageOptions[0];

	const iconUsage = await p.select({
		message: bold(lang.psai),
		options: iconUsageOptions.map((item) => ({
			value: item.value,
			label: `${item.label} - ${lang[item.hintKey]}`
		}))
	});
	if (p.isCancel(iconUsage)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return getIconUsage(iconUsage);
};

const selectThemeMode = async (frameworkItem, itemThemeMode) => {
	if (itemThemeMode) return itemThemeMode;
	if (argvProjectName) return themeModeOptions.find((item) => item.value === 'multi');

	const themeMode = await p.select({
		message: bold(lang.pstm) + ' - ' + grey(getThemeGeneratorHint(frameworkItem)),
		options: getThemeModeOptions()
	});
	if (p.isCancel(themeMode)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return themeModeOptions.find((item) => item.value === themeMode);
};

const selectBuiltInIconLibrary = async (itemBuiltInIconLibrary) => {
	if (itemBuiltInIconLibrary) return itemBuiltInIconLibrary;
	if (argvProjectName) return builtInIconLibraryOptions[0];

	const builtInIconLibrary = await p.select({
		message: bold('Please select built-in icon library'),
		options: getBuiltInIconLibraryOptions()
	});
	if (p.isCancel(builtInIconLibrary)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return builtInIconLibraryOptions.find((item) => item.value === builtInIconLibrary);
};

const selectProjectName = async (frameworkItem) => {
	if (argvProjectName) return argvProjectName;

	const projectName = await p.text({
		message: bold(lang.pn),
		placeholder: frameworkItem.defaultProjectName,
		validate: (value) => {
			if (!value) return lang.pncbne;
			if (fs.existsSync(path.resolve(String(value)))) return '🚫 ' + value + ' ' + lang.pane;
		}
	});
	if (p.isCancel(projectName)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return projectName;
};

const selectPackageManager = async (itemPackageManager) => {
	if (itemPackageManager) return itemPackageManager;
	if (argvProjectName) return packageManagerOptions[0];

	const packageManager = await p.select({
		message: bold(lang.pm),
		options: packageManagerOptions
	});
	if (p.isCancel(packageManager)) {
		p.cancel(red('⛔ ') + lang.oc);
		process.exit(0);
	}
	return packageManagerOptions.find((item) => item.value === packageManager);
};

await selectLanguage();

const itemFramework = await selectFramework(resolveArgFramework());
const itemTemplate = await selectTemplate(itemFramework, resolveArgTemplate(itemFramework));
const itemIconUsage = await selectIconUsage(resolveArgIconUsage());
const itemThemeMode = await selectThemeMode(itemFramework, resolveArgThemeMode());
const itemBuiltInIconLibrary = await selectBuiltInIconLibrary(resolveArgBuiltInIconLibrary());
const projectName = await selectProjectName(itemFramework);
const packageManager = await selectPackageManager(resolveArgPackageManager());

if (fs.existsSync(path.resolve(String(projectName)))) {
	p.intro(red('🚫 ' + projectName + ' ' + lang.pane));
	process.exit(1);
}

runCreateFunc(projectName, itemFramework, itemTemplate, itemIconUsage, packageManager, itemThemeMode, itemBuiltInIconLibrary);
