import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

type CheckResult = {
	name: string;
	ok: boolean;
	details: string[];
};

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const rtdfPagesRoot = join(workspaceRoot, 'apps/rtdf-demo/src/pages');
const rtdfCssPath = join(packageRoot, 'src/index.css');
const rtdfPublicRoot = join(packageRoot, 'public');

const componentNameMap = new Map([
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

const titleAliases = new Map([
	['使用 Snippet', '使用 children'],
	['Using Snippet', 'Using children'],
	['详情使用 Snippet', '详情使用 detailChild'],
	['Detail with Snippet', 'Detail with Child'],
	['内容使用 Snippet', '内容使用 contentChild'],
	['Content with Snippet', 'Content with contentChild'],
	['Basic Usage', 'Basic usage'],
	['Loading', 'Loading toast'],
	['删除确认（含 Loading）', '删除确认（含 Loading ）'],
	['Match no radius corner Cell', 'Match no radius Cell'],
	['Simulate request', 'Simulate network request'],
	['Close Automatic Scrolling to Last Selected Item', 'Close automatic scrolling to the last selected item'],
	['Fixed Duration', 'Fixed display time'],
	['Customize the unselectable date', 'Customize the unsalented date'],
	['Form submission flow', 'Form submit flow'],
	['Block Style + LetterNumber', 'Block Style + Letter Number Mode'],
	['Click mask to close', 'Click the mask to close'],
	['Manual close', 'Non-automatic closing']
]);

const snippetEquivalentMap = new Map<string, Record<string, string[]>>([
	['accordion', { children: ['children'] }],
	['avatarGroup', { top: ['top'] }],
	['badge', { detailChild: ['detailChild'] }],
	['card', { header: ['header'], footer: ['footer'] }],
	['cell', { detailChild: ['detailChild'], leftChild: ['leftChild'], rightChild: ['rightChild'] }],
	['checkbox', { checkboxChild: ['checkboxChild'] }],
	['countDown', { children: ['children'] }],
	['dialog', { contentChild: ['contentChild'], primaryChild: ['primaryChild'] }],
	['grids', { falseChild: ['falseChild'], trueChild: ['trueChild'] }],
	['imageList', { uploadChild: ['uploadChild'] }],
	['imagePreview', { children: ['children'], indexChild: ['indexChild'] }],
	['indexBar', { children: ['children'] }],
	['input', { label1Child: ['label1Child'], label4Child: ['label4Child'], label5Child: ['label5Child'] }],
	['list', { itemChild: ['itemChild'] }],
	['modal', { contentChild: ['contentChild'] }],
	['navBar', { titleChild: ['titleChild'], rightChild: ['rightChild'], leftChild: ['leftChild'] }],
	['noticeBar', { leftChild: ['leftChild'], rightChild: ['rightChild'] }],
	['radio', { radioChild: ['radioChild'] }],
	['slider', { children: ['children'] }],
	['switch', { falseChild: ['falseChild'], trueChild: ['trueChild'] }],
	['tabs', { children: ['children'] }],
	['tag', { detailChild: ['detailChild'] }],
	['tooltip', { contentSnippet: ['contentRender', 'contentSnippet', 'contentReactNode'] }]
]);

const listComponents = () => {
	return readdirSync(stdfRoutesRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();
};

const read = (filePath: string) => readFileSync(filePath, 'utf8');

const stripSvelteScripts = (source: string) => source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

const walkFiles = (dir: string, filter: (filePath: string) => boolean) => {
	const files: string[] = [];
	const walk = (currentDir: string) => {
		readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
			const itemPath = join(currentDir, entry.name);
			if (entry.isDirectory()) {
				walk(itemPath);
				return;
			}
			if (entry.isFile() && filter(itemPath)) files.push(itemPath);
		});
	};
	walk(dir);
	return files.sort();
};

const pascalCase = (name: string) => {
	return componentNameMap.get(name) || `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractCellTitles = (source: string) => {
	return [...source.matchAll(/<Cell[\s\S]*?title=(?:"([^"]+)"|'([^']+)'|\{\s*["']([^"']+)["']\s*\})/g)].map(
		(match) => match[1] || match[2] || match[3]
	);
};

const normalizeTitle = (title: string) => {
	const aliased = titleAliases.get(title) || title;
	if (/[\u4e00-\u9fff]/.test(aliased)) {
		return aliased.replace(/Snippet|children|contentChild|Child|自定义组件/g, '自定义内容').replace(/\s+/g, '');
	}
	const normalized = aliased
		.replace(/Snippet|children|contentChild|\bChild\b/g, 'custom content')
		.replace(/Content Uses/g, 'Content usage')
		.toLowerCase();
	return normalized
		.replace('customize the unselectable date', 'customize the unsalented date')
		.replace('form submission flow', 'form submit flow')
		.replace('block style + letternumber', 'block style + letter number mode')
		.replace('click mask to close', 'click the mask to close')
		.replace('manual close', 'non-automatic closing')
		.replace('children', 'custom content')
		.replace('no selected days displayed', 'no showed days have been displayed')
		.replace('get input', 'get value')
		.replace('content usage custom content and scrolls', 'content uses custom content and scrolls')
		.replace('success toast', 'success message');
};

const countTag = (source: string, tagName: string) => {
	const regex = new RegExp(`<${tagName}(?=[\\s>/])`, 'g');
	return [...source.matchAll(regex)].length;
};

const extractMainComponentProps = (source: string, tagName: string) => {
	const props = new Set<string>();
	for (const attrs of extractTagAttributes(source, tagName)) {
		scanAttributeNames(attrs).forEach((name) => {
			const normalized = normalizePropName(name);
			if (normalized) props.add(normalized);
		});
	}
	return props;
};

const extractSnippetNames = (source: string) => {
	return [...new Set([...source.matchAll(/\{#snippet\s+([A-Za-z0-9_$]+)/g)].map((match) => match[1]))];
};

const extractCssClasses = (source: string, prefix: string) => {
	const classPattern = new RegExp(`\\b${prefix}[A-Za-z0-9_-]+\\b`, 'g');
	return new Set([...source.matchAll(classPattern)].map((match) => match[0]));
};

const sourceHasEquivalentSnippet = (source: string, tagName: string, candidate: string) => {
	if (candidate === 'children') {
		return new RegExp(`<${tagName}(?=[\\s>])[\\s\\S]*?</${tagName}>`).test(source) || /\bchildren\s*=/.test(source);
	}
	return new RegExp(`\\b${escapeRegExp(candidate)}\\b`).test(source);
};

const extractTagAttributes = (source: string, tagName: string) => {
	const attrsList: string[] = [];
	const opener = `<${tagName}`;
	let searchIndex = 0;
	while (searchIndex < source.length) {
		const start = source.indexOf(opener, searchIndex);
		if (start === -1) break;
		const nextChar = source[start + opener.length];
		if (nextChar && !/[\s>/]/.test(nextChar)) {
			searchIndex = start + opener.length;
			continue;
		}
		let index = start + opener.length;
		const attrsStart = index;
		let braceDepth = 0;
		while (index < source.length) {
			const char = source[index];
			if (braceDepth === 0 && (char === '"' || char === "'" || char === '`')) {
				index += 1;
				while (index < source.length) {
					if (source[index] === '\\') {
						index += 2;
						continue;
					}
					if (source[index] === char) {
						index += 1;
						break;
					}
					index += 1;
				}
				continue;
			}
			if (char === '{') braceDepth += 1;
			if (char === '}') braceDepth = Math.max(0, braceDepth - 1);
			if (char === '>' && braceDepth === 0) break;
			index += 1;
		}
		attrsList.push(source.slice(attrsStart, index));
		searchIndex = index + 1;
	}
	return attrsList;
};

const scanAttributeNames = (attrs: string) => {
	const names: string[] = [];
	let index = 0;
	const skipWhitespace = () => {
		while (/\s/.test(attrs[index] || '')) index += 1;
	};
	const skipQuoted = (quote: string) => {
		index += 1;
		while (index < attrs.length) {
			if (attrs[index] === '\\') {
				index += 2;
				continue;
			}
			if (attrs[index] === quote) {
				index += 1;
				break;
			}
			index += 1;
		}
	};
	const skipBraced = () => {
		let depth = 0;
		while (index < attrs.length) {
			const char = attrs[index];
			if (char === '{') depth += 1;
			if (char === '}') {
				depth -= 1;
				index += 1;
				if (depth <= 0) break;
				continue;
			}
			index += 1;
		}
	};
	while (index < attrs.length) {
		skipWhitespace();
		if (attrs[index] === '/' || index >= attrs.length) break;
		if (attrs[index] === '{') {
			skipBraced();
			continue;
		}
		const start = index;
		while (/[A-Za-z0-9_:.-]/.test(attrs[index] || '')) index += 1;
		const name = attrs.slice(start, index);
		if (name) names.push(name);
		skipWhitespace();
		if (attrs[index] === '=') {
			index += 1;
			skipWhitespace();
			if (attrs[index] === '"' || attrs[index] === "'" || attrs[index] === '`') {
				skipQuoted(attrs[index]);
			} else if (attrs[index] === '{') {
				skipBraced();
			} else {
				while (index < attrs.length && !/\s/.test(attrs[index])) index += 1;
			}
		}
	}
	return names;
};

const normalizePropName = (name: string) => {
	const withoutDirective = name.replace(/^bind:/, '').replace(/^on:/, 'on');
	if (withoutDirective.startsWith('class:')) return undefined;
	if (['class', 'className', 'style', 'ref', 'key', 'this'].includes(withoutDirective)) return undefined;
	const aliasMap = new Map([
		['child', 'children'],
		['contentChild', 'children'],
		['primaryChild', 'primary'],
		['secondaryChild', 'secondary'],
		['itemChild', 'children'],
		['onclick', 'onclick'],
		['onClick', 'onclick'],
		['onclose', 'onclose'],
		['onClose', 'onclose'],
		['onchange', 'onchange'],
		['onChange', 'onchange'],
		['onconfirm', 'onconfirm'],
		['onConfirm', 'onconfirm'],
		['oncancel', 'oncancel'],
		['onCancel', 'oncancel']
	]);
	const aliased = aliasMap.get(withoutDirective) || withoutDirective;
	return /^on[A-Za-z]/.test(aliased) ? aliased.toLowerCase() : aliased;
};

const checkDemoShell = (components: string[]) => {
	const shellPatterns = [
		'min-h-screen bg-gray-50 dark:bg-gray-900',
		'<h1 className=',
		'<p className="px-4 text-gray-600 dark:text-gray-400"'
	];
	const found: string[] = [];
	components.forEach((component) => {
		(['zh_CN', 'en_US'] as const).forEach((lang) => {
			const filePath = join(rtdfPagesRoot, component, `${lang}.tsx`);
			if (!existsSync(filePath)) return;
			const source = read(filePath);
			shellPatterns.forEach((pattern) => {
				if (source.includes(pattern)) found.push(`${component}/${lang}: ${pattern}`);
			});
		});
	});
	return {
		name: 'demo page shell',
		ok: found.length === 0,
		details: [
			`checked ${components.length * 2} RTDF demo files`,
			...(found.length ? [`found standalone shell patterns: ${found.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkCellTitles = (components: string[]) => {
	const mismatches: string[] = [];
	components.forEach((component) => {
		(['zh_CN', 'en_US'] as const).forEach((lang) => {
			const stdfPath = join(stdfRoutesRoot, component, lang, '+page.svelte');
			const rtdfPath = join(rtdfPagesRoot, component, `${lang}.tsx`);
			if (!existsSync(stdfPath) || !existsSync(rtdfPath)) return;
			const stdfTitles = extractCellTitles(read(stdfPath)).map(normalizeTitle);
			const rtdfTitles = extractCellTitles(read(rtdfPath)).map(normalizeTitle);
			if (stdfTitles.length !== rtdfTitles.length) {
				mismatches.push(`${component}/${lang}: Cell count STDF ${stdfTitles.length}, RTDF ${rtdfTitles.length}`);
				return;
			}
			const firstMismatch = stdfTitles.find((title, index) => title !== rtdfTitles[index]);
			if (firstMismatch) {
				const index = stdfTitles.indexOf(firstMismatch);
				mismatches.push(`${component}/${lang}: Cell ${index + 1} STDF "${firstMismatch}", RTDF "${rtdfTitles[index]}"`);
			}
		});
	});
	return {
		name: 'demo Cell title sequence',
		ok: mismatches.length === 0,
		details: [`checked ${components.length * 2} locale demo files`, ...(mismatches.length ? [`mismatches: ${mismatches.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkMainComponentCounts = (components: string[]) => {
	const mismatches: string[] = [];
	components.forEach((component) => {
		const tagName = pascalCase(component);
		(['zh_CN', 'en_US'] as const).forEach((lang) => {
			const stdfPath = join(stdfRoutesRoot, component, lang, '+page.svelte');
			const rtdfPath = join(rtdfPagesRoot, component, `${lang}.tsx`);
			if (!existsSync(stdfPath) || !existsSync(rtdfPath)) return;
			const stdfCount = countTag(stripSvelteScripts(read(stdfPath)), tagName);
			const rtdfCount = countTag(read(rtdfPath), tagName);
			if (stdfCount > 0 && rtdfCount < stdfCount) {
				mismatches.push(`${component}/${lang}: <${tagName}> STDF ${stdfCount}, RTDF ${rtdfCount}`);
			}
		});
	});
	return {
		name: 'main component demo counts',
		ok: mismatches.length === 0,
		details: [`checked ${components.length * 2} locale demo files`, ...(mismatches.length ? [`mismatches: ${mismatches.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkMainComponentProps = (components: string[]) => {
	const mismatches: string[] = [];
	const ignoredProps = new Set([
		'children',
		'rightChild',
		'checkedChild',
		'uncheckedChild',
		'loadingChild',
		'errorChild',
		'controlChild',
		'iconChild',
		'toast',
		'dialog',
		'modal',
		'loading'
	]);
	components.forEach((component) => {
		const tagName = pascalCase(component);
		(['zh_CN', 'en_US'] as const).forEach((lang) => {
			const stdfPath = join(stdfRoutesRoot, component, lang, '+page.svelte');
			const rtdfPath = join(rtdfPagesRoot, component, `${lang}.tsx`);
			if (!existsSync(stdfPath) || !existsSync(rtdfPath)) return;
			const stdfProps = extractMainComponentProps(stripSvelteScripts(read(stdfPath)), tagName);
			const rtdfProps = extractMainComponentProps(read(rtdfPath), tagName);
			const missing = [...stdfProps].filter((prop) => !ignoredProps.has(prop) && !rtdfProps.has(prop));
			if (missing.length > 0) {
				mismatches.push(`${component}/${lang}: <${tagName}> missing props ${missing.join(', ')}`);
			}
		});
	});
	return {
		name: 'main component demo props',
		ok: mismatches.length === 0,
		details: [`checked ${components.length * 2} locale demo files`, ...(mismatches.length ? [`mismatches: ${mismatches.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkDemoHelpers = () => {
	const css = read(rtdfCssPath);
	const definedClasses = extractCssClasses(css, 'rtdf-demo-');
	const pageFiles = walkFiles(rtdfPagesRoot, (filePath) => /\.tsx$/.test(filePath));
	const usedClasses = new Set(pageFiles.flatMap((filePath) => [...extractCssClasses(read(filePath), 'rtdf-demo-')]));
	const missing = [...usedClasses].filter((className) => !definedClasses.has(className)).sort();
	return {
		name: 'demo helper class definitions',
		ok: missing.length === 0,
		details: [
			`demo helper classes: used ${usedClasses.size}, defined ${definedClasses.size}`,
			...(missing.length ? [`missing definitions: ${missing.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkFontAssets = () => {
	const css = read(rtdfCssPath);
	const pageFiles = walkFiles(rtdfPagesRoot, (filePath) => /\.tsx$/.test(filePath));
	const usesTrueno = pageFiles.some((filePath) => read(filePath).includes('font-Trueno'));
	const missing: string[] = [];
	if (usesTrueno && !existsSync(join(rtdfPublicRoot, 'fonts/Trueno.otf'))) missing.push('public/fonts/Trueno.otf');
	if (usesTrueno && !css.includes('@font-face')) missing.push('src/index.css @font-face');
	if (usesTrueno && !css.includes('/fonts/Trueno.otf')) missing.push('src/index.css /fonts/Trueno.otf');
	return {
		name: 'demo font assets',
		ok: missing.length === 0,
		details: [`font-Trueno usage: ${usesTrueno ? 'yes' : 'no'}`, ...(missing.length ? [`missing: ${missing.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkSnippetCoverage = (components: string[]) => {
	const mismatches: string[] = [];
	components.forEach((component) => {
		const tagName = pascalCase(component);
		(['zh_CN', 'en_US'] as const).forEach((lang) => {
			const stdfPath = join(stdfRoutesRoot, component, lang, '+page.svelte');
			const rtdfPath = join(rtdfPagesRoot, component, `${lang}.tsx`);
			if (!existsSync(stdfPath) || !existsSync(rtdfPath)) return;
			const snippets = extractSnippetNames(read(stdfPath));
			if (snippets.length === 0) return;
			const rtdfSource = read(rtdfPath);
			const equivalents = snippetEquivalentMap.get(component) || {};
			const missing = snippets.filter((snippet) => {
				const candidates = equivalents[snippet] || [snippet];
				return !candidates.some((candidate) => sourceHasEquivalentSnippet(rtdfSource, tagName, candidate));
			});
			if (missing.length > 0) {
				mismatches.push(`${component}/${lang}: missing snippet equivalents ${missing.join(', ')}`);
			}
		});
	});
	return {
		name: 'snippet render prop coverage',
		ok: mismatches.length === 0,
		details: [`checked ${components.length * 2} locale demo files`, ...(mismatches.length ? [`mismatches: ${mismatches.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const components = listComponents();
const results = [
	checkDemoShell(components),
	checkCellTitles(components),
	checkMainComponentCounts(components),
	checkMainComponentProps(components),
	checkDemoHelpers(),
	checkFontAssets(),
	checkSnippetCoverage(components)
];

let failed = false;
for (const result of results) {
	const status = result.ok ? 'PASS' : 'FAIL';
	console.log(`\n${status} ${result.name}`);
	result.details.forEach((detail) => console.log(`  ${detail}`));
	if (!result.ok) failed = true;
}

if (failed) {
	console.error('\nDemo verification failed.');
	process.exit(1);
}

console.log(`\nDemo verification passed for ${results.length} checks.`);
