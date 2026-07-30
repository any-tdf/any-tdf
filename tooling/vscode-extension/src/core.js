const fs = require('node:fs/promises');
const path = require('node:path');

const packageFields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

const sourceFileMap = {
	rtdf: {
		calendar: 'Calendar.tsx',
		feedback: 'Feedback.tsx',
		grids: 'grids.tsx',
		numKeyboard: 'NumKeyboard.tsx',
		placeholder: 'placeholder.tsx',
		skeleton: 'skeleton.tsx',
		timePicker: 'TimePicker.tsx'
	}
};

const supplementalComponents = {
	stdf: [
		{ name: 'CellGroup', nav: 'cell', source: 'packages/stdf/src/lib/components/cell/CellGroup.svelte' },
		{ name: 'CheckboxItem', nav: 'checkbox', source: 'packages/stdf/src/lib/components/checkbox/CheckboxItem.svelte' },
		{ name: 'Grid', nav: 'grids', source: 'packages/stdf/src/lib/components/grids/Grid.svelte' },
		{ name: 'RadioItem', nav: 'radio', source: 'packages/stdf/src/lib/components/radio/RadioItem.svelte' },
		{ name: 'Tab', nav: 'tabs', source: 'packages/stdf/src/lib/components/tabs/Tab.svelte' },
		{ name: 'TabContent', nav: 'tabs', source: 'packages/stdf/src/lib/components/tabs/TabContent.svelte' }
	],
	rtdf: [
		{
			name: 'Avatars',
			apiName: 'AvatarGroup',
			nav: 'avatarGroup',
			source: 'packages/rtdf/src/lib/components/avatar/Avatars.tsx'
		},
		{ name: 'CellGroup', nav: 'cell', source: 'packages/rtdf/src/lib/components/cell/group.tsx' },
		{ name: 'CheckboxItem', nav: 'checkbox', source: 'packages/rtdf/src/lib/components/checkbox/CheckboxItem.tsx' },
		{ name: 'Grid', nav: 'grids', source: 'packages/rtdf/src/lib/components/grids/grid.tsx' },
		{ name: 'RadioItem', nav: 'radio', source: 'packages/rtdf/src/lib/components/radio/RadioItem.tsx' },
		{ name: 'Tab', nav: 'tabs', source: 'packages/rtdf/src/lib/components/tabs/tab.tsx' },
		{ name: 'TabContent', nav: 'tabs', source: 'packages/rtdf/src/lib/components/tabs/tabContent.tsx' }
	],
	vtdf: [
		{
			name: 'Avatars',
			apiName: 'AvatarGroup',
			nav: 'avatarGroup',
			source: 'packages/vtdf/src/lib/components/Avatars.vue'
		},
		{ name: 'CellGroup', nav: 'cell', source: 'packages/vtdf/src/lib/components/CellGroup.vue' },
		{ name: 'CheckboxItem', nav: 'checkbox', source: 'packages/vtdf/src/lib/components/CheckboxItem.vue' },
		{ name: 'Grid', nav: 'grids', source: 'packages/vtdf/src/lib/components/Grid.vue' },
		{ name: 'RadioItem', nav: 'radio', source: 'packages/vtdf/src/lib/components/RadioItem.vue' },
		{ name: 'Tab', nav: 'tabs', source: 'packages/vtdf/src/lib/components/Tab.vue' },
		{ name: 'TabContent', nav: 'tabs', source: 'packages/vtdf/src/lib/components/TabContent.vue' }
	]
};

const configProviderApi = {
	stdf: {
		apiZh: `### ConfigProvider

配置 STDF 全局上下文。

| 名称 | 类型 | 默认值 | 必传 | 说明 |
| --- | --- | --- | --- | --- |
| locale | LangProps | zh_CN | N | 语言包。 |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | 内置图标库。 |

## ConfigProvider Snippets

| 名称 | 类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| children | Snippet | - | 子内容。 |`,
		apiEn: `### ConfigProvider

Configure the global STDF context.

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| locale | LangProps | zh_CN | N | Locale object. |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | Built-in icon library. |

## ConfigProvider Snippets

| Name | Type | Params | Description |
| --- | --- | --- | --- |
| children | Snippet | - | Child content. |`,
		source: 'packages/stdf/src/lib/components/configProvider/ConfigProvider.svelte'
	},
	rtdf: {
		apiZh: `### ConfigProvider

配置 RTDF 全局上下文。

| 名称 | 类型 | 默认值 | 必传 | 说明 |
| --- | --- | --- | --- | --- |
| locale | LangProps | zh_CN | N | 语言包。 |
| theme | SwitchThemeInput | ANYTDF | N | 当前主题名称或主题配置。 |
| mode | 'primary'\\|'dark' | primary | N | 亮暗模式。 |
| iconPath | string | - | N | SVG Symbol 文件路径。 |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | 内置图标库。 |
| syncTheme | boolean | true | N | 是否同步主题到运行时。 |
| children | ReactNode | - | N | React 子节点。 |`,
		apiEn: `### ConfigProvider

Configure the global RTDF context.

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| locale | LangProps | zh_CN | N | Locale object. |
| theme | SwitchThemeInput | ANYTDF | N | Current theme name or theme config. |
| mode | 'primary'\\|'dark' | primary | N | Light or dark mode. |
| iconPath | string | - | N | SVG Symbol path. |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | Built-in icon library. |
| syncTheme | boolean | true | N | Whether to sync theme to runtime. |
| children | ReactNode | - | N | React children. |`,
		source: 'packages/rtdf/src/lib/components/config-provider/index.tsx'
	},
	vtdf: {
		apiZh: `### ConfigProvider

配置 VTDF 全局上下文。

| 名称 | 类型 | 默认值 | 必传 | 说明 |
| --- | --- | --- | --- | --- |
| locale | LangProps | defaultConfig.locale | N | 语言包。 |
| theme | SwitchThemeInput | ANYTDF | N | 当前主题名称或主题配置。 |
| mode | 'primary'\\|'dark' | primary | N | 亮暗模式。 |
| iconPath | string | defaultConfig.iconPath | N | SVG Symbol 文件路径。 |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | 内置图标库。 |
| syncTheme | boolean | true | N | 是否同步主题到运行时。 |

## ConfigProvider Children

| 名称 | 类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| default | Vue Slot | - | 子内容。 |`,
		apiEn: `### ConfigProvider

Configure the global VTDF context.

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| locale | LangProps | defaultConfig.locale | N | Locale object. |
| theme | SwitchThemeInput | ANYTDF | N | Current theme name or theme config. |
| mode | 'primary'\\|'dark' | primary | N | Light or dark mode. |
| iconPath | string | defaultConfig.iconPath | N | SVG Symbol path. |
| builtInIconLibrary | BuiltInIconLibrary | defaultBuiltInIconLibrary | N | Built-in icon library. |
| syncTheme | boolean | true | N | Whether to sync theme to runtime. |

## ConfigProvider Children

| Name | Type | Params | Description |
| --- | --- | --- | --- |
| default | Vue Slot | - | Child content. |`,
		source: 'packages/vtdf/src/lib/components/ConfigProvider.vue'
	}
};

const targets = {
	stdf: {
		key: 'stdf',
		label: 'STDF',
		packageName: 'stdf',
		languageIds: ['svelte'],
		site: 'https://stdf.dev',
		repo: 'https://github.com/any-tdf/any-tdf/blob/main'
	},
	rtdf: {
		key: 'rtdf',
		label: 'RTDF',
		packageName: 'rtdf',
		languageIds: ['typescriptreact', 'javascriptreact'],
		site: 'https://rtdf.dev',
		repo: 'https://github.com/any-tdf/any-tdf/blob/main'
	},
	vtdf: {
		key: 'vtdf',
		label: 'VTDF',
		packageName: 'vtdf',
		languageIds: ['vue'],
		site: 'https://vtdf.dev',
		repo: 'https://github.com/any-tdf/any-tdf/blob/main'
	}
};

const supportedLanguageIds = [...new Set(Object.values(targets).flatMap((target) => target.languageIds))];

const getTargetKeysForLanguage = (languageId) =>
	Object.values(targets)
		.filter((target) => target.languageIds.includes(languageId))
		.map((target) => target.key);

const hasPackageDependency = (packageJson, packageName) => {
	if (!packageJson) return false;
	if (packageJson.name === packageName) return true;
	return packageFields.some((field) => Boolean(packageJson[field]?.[packageName]));
};

const getDeclaredVersion = (packageJson, packageName) => {
	if (!packageJson) return '';
	if (packageJson.name === packageName) return packageJson.version || '';
	for (const field of packageFields) {
		if (packageJson[field]?.[packageName]) return packageJson[field][packageName];
	}
	return '';
};

const normalizeVersion = (version) => {
	const value = version || '';
	const match = value.match(/\d+(?:\.\d+){0,2}(?:-[0-9A-Za-z.-]+)?/);
	return match ? match[0] : value;
};

const readPackageJson = async (packageJsonPath) => {
	const content = await fs.readFile(packageJsonPath, 'utf-8').catch(() => null);
	if (!content) return null;
	try {
		return JSON.parse(content);
	} catch {
		return null;
	}
};

const findNearestPackageInfo = async ({ filePath, languageId, readJson = readPackageJson }) => {
	const targetKeys = getTargetKeysForLanguage(languageId);
	if (!filePath || targetKeys.length === 0) return null;

	let dir = path.extname(filePath) ? path.dirname(filePath) : filePath;
	let previous = '';
	while (dir && dir !== previous) {
		const packageJsonPath = path.join(dir, 'package.json');
		const packageJson = await readJson(packageJsonPath);
		if (packageJson) {
			const targetKey = targetKeys.find((key) => hasPackageDependency(packageJson, targets[key].packageName));
			if (targetKey) {
				const target = targets[targetKey];
				const declaredVersion = getDeclaredVersion(packageJson, target.packageName);
				return {
					dir,
					packageJsonPath,
					packageJson,
					targetKey,
					target,
					currentVersion: normalizeVersion(declaredVersion)
				};
			}
		}
		previous = dir;
		dir = path.dirname(dir);
	}

	return null;
};

const pascalToKebab = (value) =>
	value
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/_/g, '-')
		.toLowerCase();

const defaultSourcePath = (targetKey, component) => {
	if (component.source) return component.source;
	if (targetKey === 'stdf') return `packages/stdf/src/lib/components/${component.nav}/${component.name}.svelte`;
	if (targetKey === 'vtdf') return `packages/vtdf/src/lib/components/${component.name}.vue`;

	const fileName = sourceFileMap.rtdf[component.nav] || 'index.tsx';
	return `packages/rtdf/src/lib/components/${component.nav}/${fileName}`;
};

const flattenMenuList = (menuList, targetKey) => {
	const componentMap = new Map();
	for (const group of menuList || []) {
		for (const item of group.childs || []) {
			const component = {
				name: item.title_en,
				nav: item.nav
			};
			component.source = defaultSourcePath(targetKey, component);
			componentMap.set(component.name, component);
		}
	}

	for (const component of supplementalComponents[targetKey] || []) {
		componentMap.set(component.name, { ...component });
	}

	const configProvider = configProviderApi[targetKey];
	componentMap.set('ConfigProvider', {
		name: 'ConfigProvider',
		nav: null,
		source: configProvider.source,
		apiZh: configProvider.apiZh,
		apiEn: configProvider.apiEn
	});

	return componentMap;
};

const createComponentMaps = (menuList) =>
	Object.fromEntries(Object.keys(targets).map((targetKey) => [targetKey, flattenMenuList(menuList, targetKey)]));

const getApiContent = async ({ targetKey, component, isZh, docsRoot = path.join(__dirname, 'docs') }) => {
	if (component.apiZh || component.apiEn) return isZh ? component.apiZh : component.apiEn;
	if (!component.nav) return isZh ? '暂未找到 API 文档。' : 'API docs not found.';

	const apiPath = path.join(docsRoot, targetKey, 'components', component.nav, `api${isZh ? '' : '_en'}.md`);
	return await fs.readFile(apiPath, 'utf-8').catch(() => (isZh ? '暂未找到 API 文档。' : 'API docs not found.'));
};

const createLinks = ({ targetKey, component, isZh }) => {
	const target = targets[targetKey];
	const sourceUrl = `${target.repo}/${defaultSourcePath(targetKey, component)}`;
	if (!component.nav) {
		return `**[${isZh ? '源码' : 'Source code'}](${sourceUrl})**`;
	}

	const lang = isZh ? 'zh_CN' : 'en_US';
	const baseUrl = `${target.site}/components?nav=`;
	return `**[${isZh ? '示例' : 'Demo'}](${baseUrl}${component.nav}&tab=0&lang=${lang}) &nbsp; [API](${baseUrl}${component.nav}&tab=1&lang=${lang}) &nbsp; [${
		isZh ? '指南' : 'Guide'
	}](${baseUrl}${component.nav}&tab=2&lang=${lang}) &nbsp; [${isZh ? '版本' : 'Version'}](${baseUrl}${component.nav}&tab=4&lang=${lang}) &nbsp; [${
		isZh ? '源码' : 'Source code'
	}](${sourceUrl})**`;
};

const createHoverContent = ({ targetKey, currentVersion, latestVersion, component, apiContent, isZh }) => {
	const target = targets[targetKey];
	const currentText = isZh ? `当前：${escapeMarkdownText(currentVersion)}` : `Current: ${escapeMarkdownText(currentVersion)}`;
	const latestText = isZh ? `最新：${escapeMarkdownText(latestVersion)}` : `Latest: ${escapeMarkdownText(latestVersion)}`;
	const versionContent = `${target.label} ${currentText} &nbsp; ${latestText}`;
	const links = createLinks({ targetKey, component, isZh });

	return `${versionContent}

---

${apiContent}

---

${links}

---`;
};

const escapeMarkdownText = (value) => String(value || '').replace(/[\\`*_{}[\]()<>#+.!|~-]/g, '\\$&');

const splitMarkdownTableRow = (row) => {
	let value = row.trim();
	if (value.startsWith('|')) value = value.slice(1);
	if (value.endsWith('|')) value = value.slice(0, -1);

	const cells = [];
	let current = '';
	for (let index = 0; index < value.length; index += 1) {
		const char = value[index];
		const previous = value[index - 1];
		if (char === '|' && previous !== '\\') {
			cells.push(current.trim().replace(/\\\|/g, '|'));
			current = '';
		} else {
			current += char;
		}
	}
	cells.push(current.trim().replace(/\\\|/g, '|'));
	return cells;
};

const isTableSeparator = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);

const stripMarkdown = (value) =>
	(value || '')
		.replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
		.replace(/`/g, '')
		.replace(/<[^>]+>/g, '')
		.trim();

const getHeaderIndex = (headers, candidates) => {
	const normalized = headers.map((header) => stripMarkdown(header).toLowerCase());
	return normalized.findIndex((header) => candidates.includes(header));
};

const getSectionKind = (sectionTitle) => {
	const normalized = sectionTitle.toLowerCase();
	if (normalized.includes('event') || normalized.includes('事件')) return 'event';
	if (normalized.includes('children') || normalized.includes('snippet') || normalized.includes('slot') || normalized.includes('插槽'))
		return 'slot';
	if (normalized.includes('method') || normalized.includes('方法')) return 'method';
	return 'prop';
};

const getSectionComponentName = (sectionTitle) => stripMarkdown(sectionTitle).match(/^([A-Za-z][A-Za-z0-9]*)\b/)?.[1] || '';

const parseApiMarkdown = (markdown, { componentName } = {}) => {
	const lines = (markdown || '').split(/\r?\n/);
	const items = [];
	let sectionTitle = '';
	let sectionKind = 'prop';

	for (let index = 0; index < lines.length; index += 1) {
		const heading = lines[index].match(/^#{2,6}\s+(.+?)\s*$/);
		if (heading) {
			sectionTitle = heading[1];
			sectionKind = getSectionKind(sectionTitle);
			continue;
		}

		const line = lines[index];
		if (!line.trim().startsWith('|')) continue;
		if (!lines[index + 1] || !isTableSeparator(lines[index + 1])) continue;
		if (componentName && getSectionComponentName(sectionTitle).toLowerCase() !== componentName.toLowerCase()) continue;

		const headers = splitMarkdownTableRow(line);
		const nameIndex = getHeaderIndex(headers, [
			'名称',
			'name',
			'prop',
			'property',
			'event',
			'method',
			'method name',
			'slot',
			'snippet',
			'child',
			'children',
			'方法',
			'方法名'
		]);
		if (nameIndex === -1) continue;

		const typeIndex = getHeaderIndex(headers, ['类型', 'type']);
		const defaultIndex = getHeaderIndex(headers, ['默认值', 'default']);
		const requiredIndex = getHeaderIndex(headers, ['必传', 'required']);
		const descriptionIndex = getHeaderIndex(headers, ['说明', '描述', 'description']);
		const paramsIndex = getHeaderIndex(headers, ['参数', 'params']);

		index += 2;
		while (index < lines.length && lines[index].trim().startsWith('|')) {
			const cells = splitMarkdownTableRow(lines[index]);
			const name = stripMarkdown(cells[nameIndex]);
			if (name && name !== '-') {
				items.push({
					sectionTitle,
					kind: sectionKind,
					name,
					type: typeIndex >= 0 ? stripMarkdown(cells[typeIndex]) : '',
					defaultValue: defaultIndex >= 0 ? stripMarkdown(cells[defaultIndex]) : '',
					required: requiredIndex >= 0 ? stripMarkdown(cells[requiredIndex]) : '',
					description: descriptionIndex >= 0 ? stripMarkdown(cells[descriptionIndex]) : '',
					params: paramsIndex >= 0 ? stripMarkdown(cells[paramsIndex]) : ''
				});
			}
			index += 1;
		}
		index -= 1;
	}

	return items;
};

const isStringLikeType = (type) => {
	const members = (type || '')
		.toLowerCase()
		.split('|')
		.map((item) => item.trim())
		.filter(Boolean);
	return (
		members.length > 0 && members.every((item) => item === 'string' || item === 'null' || item === 'undefined' || /^'[^']*'$/.test(item))
	);
};

const createDocumentation = (item, isZh) => {
	const rows = [];
	const separator = isZh ? '：' : ': ';
	if (item.type) rows.push(`${isZh ? '类型' : 'Type'}${separator}${item.type}`);
	if (item.defaultValue) rows.push(`${isZh ? '默认值' : 'Default'}${separator}${item.defaultValue}`);
	if (item.required) rows.push(`${isZh ? '必传' : 'Required'}${separator}${item.required}`);
	if (item.params) rows.push(`${isZh ? '参数' : 'Parameters'}${separator}${item.params}`);
	if (item.description) rows.push(item.description);
	return rows.join('\n\n');
};

const createCompletionEntry = ({ targetKey, item, index, isZh }) => {
	const order = item.kind === 'prop' ? '1' : item.kind === 'event' ? '2' : '3';
	const base = {
		sourceName: item.name,
		kind: item.kind,
		type: item.type,
		detail: `${item.sectionTitle}${item.type ? ` | ${item.type}` : ''}`,
		documentation: createDocumentation(item, isZh),
		sortText: `${order}_${String(index).padStart(4, '0')}_${item.name}`
	};

	if (targetKey === 'rtdf') {
		if (item.kind === 'event') {
			return {
				...base,
				label: item.name,
				filterText: `${item.name} ${item.name.replace(/^on/i, '')}`,
				insertText: `${item.name}={() => {$0}}`
			};
		}
		return {
			...base,
			label: item.name,
			filterText: item.name,
			insertText: `${item.name}={$0}`
		};
	}

	if (targetKey === 'stdf') {
		if (item.kind === 'event') {
			return {
				...base,
				label: item.name,
				filterText: `${item.name} ${item.name.replace(/^on/i, '')}`,
				insertText: `${item.name}={() => {$0}}`
			};
		}
		return {
			...base,
			label: item.name,
			filterText: item.name,
			insertText: `${item.name}={$0}`
		};
	}

	if (item.kind === 'event') {
		const label = `@${item.name}`;
		return {
			...base,
			label,
			filterText: `${label} ${item.name} on${item.name}`,
			insertText: `${label}="$0"`
		};
	}

	if (item.kind === 'slot') {
		const slotName = item.name === 'children' ? 'default' : pascalToKebab(item.name);
		const label = `#${slotName}`;
		return {
			...base,
			label,
			filterText: `${label} ${item.name} slot ${slotName}`,
			insertText: `${label}="$0"`
		};
	}

	const kebabName = pascalToKebab(item.name);
	const label = isStringLikeType(item.type) ? kebabName : `:${kebabName}`;
	return {
		...base,
		label,
		filterText: `${label} ${item.name} ${kebabName}`,
		insertText: `${label}="$0"`
	};
};

const createCompletionEntries = ({ targetKey, apiItems, isZh = true }) => {
	const entries = apiItems
		.filter((item) => item.name && item.kind !== 'method')
		.map((item, index) => createCompletionEntry({ targetKey, item, index, isZh }));
	const entryMap = new Map();
	for (const entry of entries) {
		if (!entryMap.has(entry.label)) entryMap.set(entry.label, entry);
	}
	return [...entryMap.values()];
};

const filterCompletionEntries = (entries, prefix) => {
	const value = (prefix || '').toLowerCase();
	if (!value) return entries;
	return entries.filter((entry) => `${entry.label} ${entry.filterText || ''}`.toLowerCase().includes(value));
};

const kebabToPascal = (value) => value.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase());

const normalizeComponentName = (value) => {
	if (value.includes('.')) return value.split('.').slice(-1)[0];
	if (value.includes('-')) return kebabToPascal(value);
	return value;
};

const isInsideUnclosedPair = (value, open, close) => value.lastIndexOf(open) > value.lastIndexOf(close);

const isTopLevelAttributeContext = (attributeText) => {
	let quote = '';
	let braceDepth = 0;
	let escaped = false;

	for (const char of attributeText) {
		if (escaped) {
			escaped = false;
			continue;
		}
		if (char === '\\') {
			escaped = true;
			continue;
		}
		if (quote) {
			if (char === quote) quote = '';
			continue;
		}
		if (char === '"' || char === "'") {
			quote = char;
			continue;
		}
		if (char === '{') braceDepth += 1;
		if (char === '}') braceDepth = Math.max(braceDepth - 1, 0);
	}

	return !quote && braceDepth === 0;
};

const getTagCompletionContext = (textBeforeCursor) => {
	const lastLt = textBeforeCursor.lastIndexOf('<');
	if (lastLt === -1) return null;
	if (isInsideUnclosedPair(textBeforeCursor, '<!--', '-->') || isInsideUnclosedPair(textBeforeCursor, '/*', '*/')) return null;
	const currentLine = textBeforeCursor.slice(textBeforeCursor.lastIndexOf('\n') + 1);
	const lineCommentIndex = currentLine.indexOf('//');
	if (lineCommentIndex !== -1 && lineCommentIndex < currentLine.lastIndexOf('<')) return null;

	const lastGt = textBeforeCursor.lastIndexOf('>');
	if (lastGt > lastLt) return null;

	const fragment = textBeforeCursor.slice(lastLt);
	if (/^<\s*\//.test(fragment) || /^<\s*[!?]/.test(fragment)) return null;

	const match = fragment.match(/^<\s*([A-Za-z][A-Za-z0-9.-]*)(?=\s|$)([\s\S]*)$/);
	if (!match) return null;

	const attributeText = match[2] || '';
	if (!attributeText || !isTopLevelAttributeContext(attributeText)) return null;
	const prefixMatch = attributeText.match(/(?:^|\s)([:@#A-Za-z][:@#A-Za-z0-9_.-]*)$/);
	if (!prefixMatch && !/\s$/.test(attributeText)) return null;
	return {
		componentName: normalizeComponentName(match[1]),
		attributePrefix: prefixMatch ? prefixMatch[1] : ''
	};
};

module.exports = {
	targets,
	supportedLanguageIds,
	getTargetKeysForLanguage,
	hasPackageDependency,
	normalizeVersion,
	findNearestPackageInfo,
	pascalToKebab,
	flattenMenuList,
	createComponentMaps,
	getApiContent,
	createLinks,
	createHoverContent,
	splitMarkdownTableRow,
	parseApiMarkdown,
	createCompletionEntries,
	filterCompletionEntries,
	getTagCompletionContext,
	isStringLikeType,
	normalizeComponentName
};
