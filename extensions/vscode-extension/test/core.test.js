const { describe, expect, test } = require('bun:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
	findNearestPackageInfo,
	normalizeVersion,
	parseApiMarkdown,
	splitMarkdownTableRow,
	createCompletionEntries,
	createComponentMaps,
	filterCompletionEntries,
	getApiContent,
	getTagCompletionContext,
	isStringLikeType,
	createHoverContent,
	normalizeComponentName
} = require('../src/core');
const menuList = require('../src/menuList');

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'stdf-vscode-extension-'));

const writeJson = (filePath, value) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
};

describe('package detection', () => {
	test('finds a nested STDF package from a Svelte file', async () => {
		const root = createTempDir();
		const filePath = path.join(root, 'app/src/lib/ButtonDemo.svelte');
		writeJson(path.join(root, 'app/package.json'), { dependencies: { stdf: '^3.0.0' } });
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '');

		const info = await findNearestPackageInfo({ filePath, languageId: 'svelte' });
		expect(info.targetKey).toBe('stdf');
		expect(info.currentVersion).toBe('3.0.0');
	});

	test('continues upward when the nearest package has no target dependency', async () => {
		const root = createTempDir();
		const filePath = path.join(root, 'workspace/packages/demo/src/App.tsx');
		writeJson(path.join(root, 'workspace/package.json'), { devDependencies: { rtdf: '0.0.1-alpha.0' } });
		writeJson(path.join(root, 'workspace/packages/demo/package.json'), { dependencies: { react: '^19.0.0' } });
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '');

		const info = await findNearestPackageInfo({ filePath, languageId: 'typescriptreact' });
		expect(info.targetKey).toBe('rtdf');
		expect(info.currentVersion).toBe('0.0.1-alpha.0');
	});

	test('detects VTDF from package name', async () => {
		const root = createTempDir();
		const filePath = path.join(root, 'packages/vtdf/src/App.vue');
		writeJson(path.join(root, 'packages/vtdf/package.json'), { name: 'vtdf', version: '0.0.0' });
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '');

		const info = await findNearestPackageInfo({ filePath, languageId: 'vue' });
		expect(info.targetKey).toBe('vtdf');
		expect(info.currentVersion).toBe('0.0.0');
	});

	test('returns null without a matching component library', async () => {
		const root = createTempDir();
		const filePath = path.join(root, 'src/App.vue');
		writeJson(path.join(root, 'package.json'), { dependencies: { vue: '^3.5.0' } });
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '');

		const info = await findNearestPackageInfo({ filePath, languageId: 'vue' });
		expect(info).toBeNull();
	});

	test('preserves non-semver dependency protocols', () => {
		expect(normalizeVersion('workspace:*')).toBe('workspace:*');
		expect(normalizeVersion('file:../stdf')).toBe('file:../stdf');
		expect(normalizeVersion('npm:stdf@^3.1.0')).toBe('3.1.0');
	});
});

describe('markdown parsing', () => {
	test('splits escaped table pipes', () => {
		expect(splitMarkdownTableRow("| fill | `'base'\\|'line'` | 说明 |")).toEqual(['fill', "`'base'|'line'`", '说明']);
	});

	test('parses props and events from API markdown', () => {
		const markdown = `## Button Props

| 名称 | 类型 | 默认值 | 必传 | 说明 |
| --- | --- | --- | --- | --- |
| fill | \`'base'\\|'line'\` | \`'base'\` | N | 填充模式。 |
| icon | [\`Icon\`](/components?nav=icon)\\|\`null\` | \`null\` | N | 图标参数。 |

## Button Events

| 名称 | 类型 | 参数 | 描述 |
| --- | --- | --- | --- |
| onClick | \`() => void\` | - | 点击触发。 |`;
		const items = parseApiMarkdown(markdown);
		expect(items).toHaveLength(3);
		expect(items[0]).toMatchObject({ kind: 'prop', name: 'fill', type: "'base'|'line'" });
		expect(items[1]).toMatchObject({ kind: 'prop', name: 'icon', type: 'Icon|null' });
		expect(items[2]).toMatchObject({ kind: 'event', name: 'onClick' });
	});

	test('recognizes English table header variants', () => {
		const markdown = `## CodeInput Props

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| value | string | - | N | Current value. |

## CodeInput Events

| Event | Type | Params | Description |
| --- | --- | --- | --- |
| onChange | () => void | - | Value changed. |`;
		const items = parseApiMarkdown(markdown, { componentName: 'CodeInput' });
		expect(items.map((item) => item.name)).toEqual(['value', 'onChange']);
	});

	test('only parses tables belonging to the requested component', () => {
		const markdown = `## Steps Props

| Name | Type | Description |
| --- | --- | --- |
| current | number | Current step. |

## Step Props

| Name | Type | Description |
| --- | --- | --- |
| title | string | Step title. |`;
		const items = parseApiMarkdown(markdown, { componentName: 'Steps' });
		expect(items.map((item) => item.name)).toEqual(['current']);
	});
});

describe('completion context', () => {
	test('detects single-line component attributes', () => {
		expect(getTagCompletionContext('<Button fi')).toEqual({ componentName: 'Button', attributePrefix: 'fi' });
	});

	test('detects multi-line component attributes', () => {
		expect(getTagCompletionContext('<Button\n  on')).toEqual({ componentName: 'Button', attributePrefix: 'on' });
	});

	test('normalizes Vue kebab-case and namespaced component names', () => {
		expect(getTagCompletionContext('<cell-group ')).toEqual({ componentName: 'CellGroup', attributePrefix: '' });
		expect(getTagCompletionContext('<TDF.Button #')).toEqual({ componentName: 'Button', attributePrefix: '#' });
		expect(normalizeComponentName('TDF.TabContent')).toBe('TabContent');
	});

	test('ignores closing tags and completed tags', () => {
		expect(getTagCompletionContext('</Button ')).toBeNull();
		expect(getTagCompletionContext('<Button fill="base">')).toBeNull();
	});

	test('ignores attribute values and expressions', () => {
		expect(getTagCompletionContext('<Button fill="ba')).toBeNull();
		expect(getTagCompletionContext("<Button fill='ba")).toBeNull();
		expect(getTagCompletionContext('<Button fill={va')).toBeNull();
		expect(getTagCompletionContext('<Button fill=')).toBeNull();
	});

	test('ignores comments', () => {
		expect(getTagCompletionContext('<!-- <Button ')).toBeNull();
		expect(getTagCompletionContext('/* <Button ')).toBeNull();
		expect(getTagCompletionContext('// <Button ')).toBeNull();
	});
});

describe('completion entries', () => {
	const apiItems = parseApiMarkdown(`## Button Props

| 名称 | 类型 | 默认值 | 必传 | 说明 |
| --- | --- | --- | --- | --- |
| fill | \`'base'\\|'line'\` | \`'base'\` | N | 填充模式。 |
| visible | \`boolean\` | \`false\` | N | 是否显示。 |

## Button Events

| 名称 | 类型 | 参数 | 描述 |
| --- | --- | --- | --- |
| onClick | \`() => void\` | - | 点击触发。 |
| onclick | \`() => void\` | - | 点击触发。 |
| click | \`() => void\` | - | 点击触发。 |
| update:value | \`(value: string) => void\` | value | 更新值。 |

## Button Children

| 名称 | 类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | - | 子内容。 |
| default | Vue Slot | - | 默认插槽。 |`);

	test('creates RTDF JSX snippets', () => {
		const entries = createCompletionEntries({ targetKey: 'rtdf', apiItems });
		expect(entries.find((item) => item.label === 'fill').insertText).toBe('fill={$0}');
		expect(entries.find((item) => item.label === 'onClick').insertText).toBe('onClick={() => {$0}}');
		expect(entries.find((item) => item.label === 'children').insertText).toBe('children={$0}');
		expect(filterCompletionEntries(entries, 'on').some((item) => item.label === 'onClick')).toBe(true);
	});

	test('localizes completion documentation', () => {
		const entries = createCompletionEntries({ targetKey: 'rtdf', apiItems, isZh: false });
		const fill = entries.find((item) => item.label === 'fill');
		expect(fill.documentation).toContain('Type:');
		expect(fill.documentation).toContain('Default:');
		expect(fill.documentation).not.toContain('类型');
	});

	test('creates STDF Svelte snippets', () => {
		const entries = createCompletionEntries({ targetKey: 'stdf', apiItems });
		expect(entries.find((item) => item.label === 'fill').insertText).toBe('fill={$0}');
		expect(entries.find((item) => item.label === 'onclick').insertText).toBe('onclick={() => {$0}}');
		expect(entries.find((item) => item.label === 'children').insertText).toBe('children={$0}');
	});

	test('creates VTDF Vue template snippets', () => {
		const entries = createCompletionEntries({ targetKey: 'vtdf', apiItems });
		expect(entries.find((item) => item.label === 'fill').insertText).toBe('fill="$0"');
		expect(entries.find((item) => item.label === ':visible').insertText).toBe(':visible="$0"');
		expect(entries.find((item) => item.label === '@click').insertText).toBe('@click="$0"');
		expect(entries.find((item) => item.label === '@update:value').insertText).toBe('@update:value="$0"');
		expect(entries.find((item) => item.label === '#default').insertText).toBe('#default="$0"');
	});

	test('classifies string-like Vue prop types', () => {
		expect(isStringLikeType("'base'|'line'")).toBe(true);
		expect(isStringLikeType('string|null')).toBe(true);
		expect(isStringLikeType('boolean')).toBe(false);
		expect(isStringLikeType('string|boolean')).toBe(false);
		expect(isStringLikeType('')).toBe(false);
	});
});

describe('hover content', () => {
	test('escapes package versions as untrusted Markdown text', () => {
		const markdown = createHoverContent({
			targetKey: 'stdf',
			currentVersion: '[open](command:workbench.action.openSettings)',
			latestVersion: '3.1.0',
			component: { name: 'Button', nav: 'button' },
			apiContent: 'Button API',
			isZh: false
		});
		expect(markdown).toContain('\\[open\\]\\(command:workbench\\.action\\.openSettings\\)');
	});
});

describe('generated component API data', () => {
	const componentMaps = createComponentMaps(menuList);
	const expectedCounts = { stdf: 67, rtdf: 68, vtdf: 68 };

	for (const targetKey of ['stdf', 'rtdf', 'vtdf']) {
		test(`${targetKey} maps every public component to an existing source file`, () => {
			const components = [...componentMaps[targetKey].values()];
			expect(components).toHaveLength(expectedCounts[targetKey]);

			for (const component of components) {
				const sourcePath = path.resolve(__dirname, '../../..', component.source);
				expect(fs.existsSync(sourcePath), `${targetKey} ${component.name}: ${sourcePath}`).toBe(true);
			}
		});

		test(`${targetKey} exposes isolated Chinese and English completion data`, async () => {
			const components = [...componentMaps[targetKey].values()];

			for (const isZh of [true, false]) {
				for (const component of components) {
					const apiContent = await getApiContent({ targetKey, component, isZh });
					const apiItems = parseApiMarkdown(apiContent, { componentName: component.apiName || component.name });
					const entries = createCompletionEntries({ targetKey, apiItems, isZh });
					if (component.name === 'Feedback') {
						expect(entries, `${targetKey} ${component.name}`).toHaveLength(0);
					} else {
						expect(entries.length, `${targetKey} ${component.name} ${isZh ? 'zh' : 'en'}`).toBeGreaterThan(0);
					}
					for (const entry of entries) {
						expect(entry.sourceName).not.toMatch(/[\s()[\]{}]/);
					}
				}
			}
		});
	}
});

describe('extension manifest', () => {
	test('preserves the existing Marketplace identity for automatic upgrades', () => {
		const manifest = require('../package.json');
		expect(`${manifest.publisher}.${manifest.name}`).toBe('STDF.stdf-vscode-extension');
		expect(manifest.displayName).toBe('Any TDF for VS Code');
		expect(Number(manifest.version.split('.')[0])).toBeGreaterThanOrEqual(1);
		expect(manifest.contributes.configuration.properties['STDF.English'].deprecationMessage).toContain(
			'AnyTDF.English'
		);
	});

	test('declares external Svelte and Vue language extensions', () => {
		const manifest = require('../package.json');
		expect(manifest.extensionPack).toEqual(['Vue.volar', 'svelte.svelte-vscode']);
		expect(manifest.extensionDependencies).toBeUndefined();
		expect(manifest.categories).toContain('Extension Packs');
		expect(manifest.devDependencies['@types/vscode']).toBe('1.80.0');
		expect(manifest.engines.vscode).toBe('^1.80.0');
	});
});
