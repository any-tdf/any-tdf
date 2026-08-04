import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import ts from 'typescript6';

type CheckResult = {
	name: string;
	ok: boolean;
	details: string[];
};

type TypeMemberMap = Map<string, Set<string>>;

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoot = workspaceRoot;
const rtdfRoot = workspaceRoot;

const componentDirExcludes = new Set(['utils']);
const rtdfComponentDirExcludes = new Set(['utils']);
const internalComponentNames = new Set(['scrollRadio']);
const frameworkSpecificProps = new Set([
	'child',
	'children',
	'contentChild',
	'primaryChild',
	'secondaryChild',
	'rightChild',
	'itemChild',
	'checkedChild',
	'uncheckedChild',
	'loadingChild',
	'errorChild',
	'controlChild',
	'swipeHintIcon'
]);

const allowedExtraRtdfProps = new Set(['className', 'contentRender', 'contentReactNode', 'contentSnippet', 'ariaLabel']);

const docsPropAliasMap = new Map([
	['child', 'children'],
	['contentChild', 'children'],
	['primaryChild', 'primary'],
	['secondaryChild', 'secondary'],
	['rightChild', 'rightChild'],
	['itemChild', 'children'],
	['checkedChild', 'checkedChild'],
	['uncheckedChild', 'uncheckedChild'],
	['loadingChild', 'loadingChild'],
	['errorChild', 'errorChild'],
	['controlChild', 'controlChild']
]);

const normalizeName = (name: string) => name.replace(/[-_]([a-z])/g, (_, value: string) => value.toUpperCase());
const tailwindArbitraryClassPattern =
	/\b(?:w|h|min-w|min-h|max-w|max-h|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y|text|bg|border|rounded|top|right|bottom|left|inset|translate-x|translate-y|shadow|opacity|scale|rotate)-\[[^\]]+\]/g;

const listDirs = (dir: string, excludes = new Set<string>()) => {
	return readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !excludes.has(entry.name))
		.map((entry) => entry.name)
		.sort();
};

const listDocComponents = (dir: string) => {
	return listDirs(dir).filter((name) => existsSync(join(dir, name, 'api.md')) && existsSync(join(dir, name, 'api_en.md')));
};

const getPropertyName = (name: ts.PropertyName) => {
	if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
	return undefined;
};

const collectMembersFromTypeNode = (node: ts.TypeNode, declarations: TypeMemberMap, visiting = new Set<string>()) => {
	const fields = new Set<string>();
	if (ts.isTypeLiteralNode(node)) {
		node.members.forEach((member) => {
			if (ts.isPropertySignature(member) || ts.isMethodSignature(member)) {
				const fieldName = getPropertyName(member.name);
				if (fieldName) fields.add(fieldName);
			}
		});
		return fields;
	}
	if (ts.isIntersectionTypeNode(node)) {
		node.types.forEach((item) => {
			collectMembersFromTypeNode(item, declarations, visiting).forEach((field) => fields.add(field));
		});
		return fields;
	}
	if (ts.isParenthesizedTypeNode(node)) {
		return collectMembersFromTypeNode(node.type, declarations, visiting);
	}
	if (ts.isTypeReferenceNode(node)) {
		const typeName = node.typeName.getText();
		if (!visiting.has(typeName) && declarations.has(typeName)) {
			visiting.add(typeName);
			declarations.get(typeName)?.forEach((field) => fields.add(field));
			visiting.delete(typeName);
		}
	}
	return fields;
};

const extractTypeMembers = (filePath: string) => {
	const source = ts.createSourceFile(filePath, readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
	const rawDeclarations = new Map<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>();
	const declarations: TypeMemberMap = new Map();

	source.forEachChild((node) => {
		if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
			rawDeclarations.set(node.name.text, node);
			declarations.set(node.name.text, new Set());
		}
	});

	const resolveDeclaration = (name: string, visiting = new Set<string>()) => {
		if (visiting.has(name)) return declarations.get(name) || new Set<string>();
		visiting.add(name);
		const node = rawDeclarations.get(name);
		const fields = new Set<string>();
		if (node && ts.isInterfaceDeclaration(node)) {
			node.heritageClauses?.forEach((clause) => {
				clause.types.forEach((heritage) => {
					resolveDeclaration(heritage.expression.getText(), visiting).forEach((field) => fields.add(field));
				});
			});
			node.members.forEach((member) => {
				if (ts.isPropertySignature(member) || ts.isMethodSignature(member)) {
					const fieldName = getPropertyName(member.name);
					if (fieldName) fields.add(fieldName);
				}
			});
		}
		if (node && ts.isTypeAliasDeclaration(node)) {
			collectMembersFromTypeNode(node.type, declarations, visiting).forEach((field) => fields.add(field));
		}
		declarations.set(name, fields);
		visiting.delete(name);
		return fields;
	};

	for (const name of rawDeclarations.keys()) resolveDeclaration(name);
	return new Map([...declarations.entries()].filter(([name]) => name.endsWith('Props')));
};

const extractApiNames = (filePath: string) => {
	const names = new Set<string>();
	const markdown = readFileSync(filePath, 'utf8');
	markdown.split('\n').forEach((line) => {
		const trimmed = line.trim();
		if (!trimmed.startsWith('|')) return;
		if (/^\|\s*-+/.test(trimmed)) return;
		const cells = trimmed
			.split('|')
			.slice(1, -1)
			.map((cell) => cell.trim());
		const name = cells[0]?.replace(/`/g, '');
		if (!name || ['名称', 'Name', '参数', 'Parameter'].includes(name)) return;
		if (name.startsWith('**') && name.endsWith('**')) return;
		if (/^(OKLCH|RGB|HEX)$/i.test(name)) return;
		names.add(name);
	});
	return names;
};

const walkFiles = (dir: string, filter: (filePath: string) => boolean) => {
	const files: string[] = [];
	const walk = (currentDir: string) => {
		readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
			if (entry.name === 'dist' || entry.name === 'demo-dist' || entry.name === 'node_modules' || entry.name === '.svelte-kit') return;
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

const mergeTypeMaps = (...maps: TypeMemberMap[]) => {
	const merged: TypeMemberMap = new Map();
	maps.forEach((map) => {
		map.forEach((fields, name) => {
			if (!merged.has(name)) merged.set(name, new Set());
			fields.forEach((field) => merged.get(name)?.add(field));
		});
	});
	return merged;
};

const extractNamedExports = (filePath: string) => {
	const source = ts.createSourceFile(filePath, readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
	const exports = new Set<string>();

	source.forEachChild((node) => {
		if (!ts.isExportDeclaration(node) || !node.exportClause || !ts.isNamedExports(node.exportClause)) return;
		node.exportClause.elements.forEach((element) => {
			exports.add(element.name.text);
		});
	});

	return exports;
};

const compareSets = (name: string, expected: string[], actual: string[]) => {
	const actualSet = new Set(actual);
	const missing = expected.filter((item) => !actualSet.has(item));
	const extra = actual.filter((item) => !expected.includes(item));
	return {
		name,
		ok: missing.length === 0,
		details: [
			`${name}: expected ${expected.length}, actual ${actual.length}`,
			...(missing.length > 0 ? [`missing: ${missing.join(', ')}`] : []),
			...(extra.length > 0 ? [`extra: ${extra.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkComponents = () => {
	const stdfComponents = listDirs(join(stdfRoot, 'packages/stdf/src/lib/components'), componentDirExcludes).filter(
		(name) => !internalComponentNames.has(name)
	);
	const rtdfComponents = listDirs(join(rtdfRoot, 'packages/rtdf/src/lib/components'), rtdfComponentDirExcludes)
		.map(normalizeName)
		.filter((name) => !internalComponentNames.has(name));
	return compareSets('components', stdfComponents, rtdfComponents);
};

const checkDemoPages = () => {
	const stdfPages = listDirs(join(stdfRoot, 'apps/stdf-demo/src/routes')).filter((name) => name !== 'components');
	const rtdfPages = listDirs(join(rtdfRoot, 'apps/rtdf-demo/src/pages')).filter((name) => name !== 'components' && name !== 'home');
	const baseCheck = compareSets('demo pages', stdfPages, rtdfPages);
	const missingLangFiles = rtdfPages.flatMap((page) => {
		return ['zh_CN.tsx', 'en_US.tsx']
			.filter((file) => !existsSync(join(rtdfRoot, 'apps/rtdf-demo/src/pages', page, file)))
			.map((file) => `${page}/${file}`);
	});
	return {
		name: 'demo pages',
		ok: baseCheck.ok && missingLangFiles.length === 0,
		details: [...baseCheck.details, ...(missingLangFiles.length > 0 ? [`missing lang files: ${missingLangFiles.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkApiDocs = () => {
	const stdfDocsDir = join(stdfRoot, 'content/stdf/components');
	const rtdfDocsDir = join(rtdfRoot, 'content/rtdf/components');
	const stdfDocs = listDocComponents(stdfDocsDir);
	const rtdfDocs = listDocComponents(rtdfDocsDir);
	const baseCheck = compareSets('api doc components', stdfDocs, rtdfDocs);
	const missingRows: string[] = [];

	stdfDocs.forEach((component) => {
		(['api.md', 'api_en.md'] as const).forEach((fileName) => {
			const stdfNames = extractApiNames(join(stdfDocsDir, component, fileName));
			const rtdfNames = extractApiNames(join(rtdfDocsDir, component, fileName));
			stdfNames.forEach((name) => {
				const alias = docsPropAliasMap.get(name);
				if (!rtdfNames.has(name) && (!alias || !rtdfNames.has(alias))) {
					missingRows.push(`${component}/${fileName}: ${name}`);
				}
			});
		});
	});

	return {
		name: 'api docs',
		ok: baseCheck.ok && missingRows.length === 0,
		details: [...baseCheck.details, ...(missingRows.length > 0 ? [`missing rows: ${missingRows.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkPublicExports = () => {
	const stdfExports = extractNamedExports(join(stdfRoot, 'packages/stdf/src/lib/index.ts'));
	const rtdfExports = new Set([
		...extractNamedExports(join(rtdfRoot, 'packages/rtdf/src/lib/components/index.ts')),
		...extractNamedExports(join(rtdfRoot, 'packages/rtdf/src/lib/theme/index.ts')),
		...extractNamedExports(join(rtdfRoot, 'packages/rtdf/src/lib/lang/index.ts'))
	]);
	const intentionallyDifferentExports = new Set<string>();
	const missing = [...stdfExports].filter((name) => !intentionallyDifferentExports.has(name) && !rtdfExports.has(name));

	return {
		name: 'public exports',
		ok: missing.length === 0,
		details: [
			`public exports: STDF ${stdfExports.size}, RTDF ${rtdfExports.size}`,
			...(missing.length > 0 ? [`missing exports: ${missing.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkTypes = () => {
	const stdfTypes = extractTypeMembers(join(stdfRoot, 'packages/stdf/src/lib/types/index.ts'));
	const rtdfTypes = mergeTypeMaps(
		extractTypeMembers(join(rtdfRoot, 'packages/rtdf/src/lib/types/index.ts')),
		extractTypeMembers(join(rtdfRoot, 'packages/rtdf/src/lib/components/form/types.ts'))
	);
	const equivalentTypeNames = new Map([['SvelteEasingProps', 'RTDFEasingProps']]);
	const missingTypes = [...stdfTypes.keys()].filter((name) => {
		const alias = equivalentTypeNames.get(name);
		return !rtdfTypes.has(name) && (!alias || !rtdfTypes.has(alias));
	});
	const missingFields: string[] = [];

	stdfTypes.forEach((fields, typeName) => {
		const rtdfFields = rtdfTypes.get(typeName);
		if (!rtdfFields) return;
		fields.forEach((field) => {
			if (frameworkSpecificProps.has(field)) return;
			if (field.startsWith('transition') && typeName !== 'PopupProps') return;
			if (rtdfFields.has(field)) return;
			const reactAlias = field.startsWith('on') ? `on${field.slice(2, 3).toUpperCase()}${field.slice(3)}` : undefined;
			if (reactAlias && rtdfFields.has(reactAlias)) return;
			missingFields.push(`${typeName}.${field}`);
		});
	});

	const unexpectedExtraFields: string[] = [];
	rtdfTypes.forEach((fields, typeName) => {
		const stdfFields = stdfTypes.get(typeName);
		if (!stdfFields) return;
		fields.forEach((field) => {
			if (stdfFields.has(field) || frameworkSpecificProps.has(field) || allowedExtraRtdfProps.has(field)) return;
			if (/^on[A-Z]/.test(field) && stdfFields.has(`on${field.slice(2, 3).toLowerCase()}${field.slice(3)}`)) return;
			unexpectedExtraFields.push(`${typeName}.${field}`);
		});
	});

	return {
		name: 'props types',
		ok: missingTypes.length === 0 && missingFields.length === 0,
		details: [
			`props types: STDF ${stdfTypes.size}, RTDF ${rtdfTypes.size}`,
			...(missingTypes.length > 0 ? [`missing types: ${missingTypes.join(', ')}`] : []),
			...(missingFields.length > 0 ? [`missing fields: ${missingFields.join(', ')}`] : []),
			...(unexpectedExtraFields.length > 0 ? [`extra RTDF fields: ${unexpectedExtraFields.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkPackageScripts = () => {
	const scripts = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')).scripts as Record<string, string>;
	const componentPages = listDirs(join(rtdfRoot, 'apps/rtdf-demo/src/pages')).filter((name) => name !== 'components' && name !== 'home');
	const missingScripts = componentPages.flatMap((page) => {
		return [page, `${page}_en`].filter((scriptName) => !scripts[scriptName]);
	});
	return {
		name: 'component scripts',
		ok: missingScripts.length === 0,
		details: [
			`component scripts: pages ${componentPages.length}`,
			...(missingScripts.length > 0 ? [`missing scripts: ${missingScripts.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkEventAliases = () => {
	const rtdfTypes = mergeTypeMaps(
		extractTypeMembers(join(rtdfRoot, 'packages/rtdf/src/lib/types/index.ts')),
		extractTypeMembers(join(rtdfRoot, 'packages/rtdf/src/lib/components/form/types.ts'))
	);
	const missingAliases: string[] = [];
	rtdfTypes.forEach((fields, typeName) => {
		fields.forEach((field) => {
			if (!/^on[a-z]/.test(field)) return;
			if (/^one[A-Z]/.test(field)) return;
			const alias = [...fields].find((item) => item !== field && /^on[A-Z]/.test(item) && item.toLowerCase() === field.toLowerCase());
			if (!alias) missingAliases.push(`${typeName}.${field}`);
		});
	});
	return {
		name: 'event aliases',
		ok: missingAliases.length === 0,
		details: [
			`event aliases: scanned ${rtdfTypes.size} RTDF props types`,
			...(missingAliases.length > 0 ? [`missing aliases: ${missingAliases.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checkTailwindArbitraryClasses = () => {
	const roots = [
		join(rtdfRoot, 'packages/rtdf/src'),
		join(rtdfRoot, 'apps/rtdf-site/src'),
		join(rtdfRoot, 'content/rtdf'),
		join(workspaceRoot, 'packages/common/src'),
		join(stdfRoot, 'packages/stdf/src')
	];
	const matches = roots.flatMap((root) => {
		return walkFiles(root, (filePath) => /\.(css|md|svelte|ts|tsx)$/.test(filePath)).flatMap((filePath) => {
			const content = readFileSync(filePath, 'utf8');
			return [...content.matchAll(tailwindArbitraryClassPattern)].map(
				(match) => `${filePath.replace(`${workspaceRoot}/`, '')}: ${match[0]}`
			);
		});
	});
	return {
		name: 'tailwind arbitrary classes',
		ok: matches.length === 0,
		details: [
			`tailwind arbitrary classes: scanned ${roots.map((root) => basename(root)).join(', ')}`,
			...(matches.length > 0 ? [`matches: ${matches.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const extractCssClasses = (source: string, prefix: string) => {
	const classPattern = new RegExp(`\\.${prefix}[A-Za-z0-9_-]+`, 'g');
	return new Set([...source.matchAll(classPattern)].map((match) => match[0].slice(1)));
};

const checkDemoAssets = () => {
	const cssPath = join(packageRoot, 'src/index.css');
	const fontPath = join(packageRoot, 'public/fonts/Trueno.otf');
	const css = readFileSync(cssPath, 'utf8');
	const missing: string[] = [];
	if (!existsSync(fontPath)) missing.push('public/fonts/Trueno.otf');
	if (!css.includes('@font-face')) missing.push('src/index.css @font-face');
	if (!css.includes('/fonts/Trueno.otf')) missing.push('src/index.css /fonts/Trueno.otf');
	return {
		name: 'demo assets',
		ok: missing.length === 0,
		details: ['checked demo-owned Trueno font asset and CSS face', ...(missing.length > 0 ? [`missing: ${missing.join(', ')}`] : [])]
	} satisfies CheckResult;
};

const checkDemoHelperClasses = () => {
	const stdfCss = readFileSync(join(stdfRoot, 'apps/stdf-demo/src/app.css'), 'utf8');
	const rtdfCss = readFileSync(join(packageRoot, 'src/index.css'), 'utf8');
	const stdfClasses = [...extractCssClasses(stdfCss, 'stdf-demo-')].sort();
	const rtdfClasses = extractCssClasses(rtdfCss, 'rtdf-demo-');
	const expected = stdfClasses.map((className) => className.replace('stdf-demo-', 'rtdf-demo-'));
	const missing = expected.filter((className) => !rtdfClasses.has(className));
	return {
		name: 'demo helper classes',
		ok: missing.length === 0,
		details: [
			`demo helper classes: STDF ${stdfClasses.length}, expected RTDF ${expected.length}, actual RTDF ${rtdfClasses.size}`,
			...(missing.length > 0 ? [`missing: ${missing.join(', ')}`] : [])
		]
	} satisfies CheckResult;
};

const checks = [
	checkComponents(),
	checkDemoPages(),
	checkApiDocs(),
	checkPublicExports(),
	checkTypes(),
	checkEventAliases(),
	checkPackageScripts(),
	checkDemoAssets(),
	checkDemoHelperClasses(),
	checkTailwindArbitraryClasses()
];
const failed = checks.filter((check) => !check.ok);

checks.forEach((check) => {
	console.log(`\n${check.ok ? 'PASS' : 'FAIL'} ${check.name}`);
	check.details.forEach((detail) => console.log(`  ${detail}`));
});

if (failed.length > 0) {
	console.error(`\nParity verification failed: ${failed.map((check) => check.name).join(', ')}`);
	process.exit(1);
}

console.log(`\nParity verification passed for ${checks.length} checks.`);
