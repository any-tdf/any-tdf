import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const stdfRoot = path.resolve(packageRoot, '../..');
const anyRoot = path.resolve(stdfRoot, '..');

const requiredFiles = [
	'package.json',
	'README.md',
	'skill/SKILL.md',
	'skill/agents/openai.yaml',
	'skill/data/themes.json',
	'skill/scripts/generate-theme.mjs',
	'skill/references/project.md',
	'skill/references/components.md',
	'skill/references/theme.md',
	'skill/references/color.md',
	'skill/references/icons.md',
	'skill/references/i18n.md',
	'skill/references/scaffold.md'
];

const failures = [];

const readExportedArray = (source, marker) => {
	const start = source.indexOf(marker);
	if (start === -1) {
		return null;
	}
	const arrayStart = source.indexOf('[', start);
	const arrayEnd = source.indexOf('\n];', arrayStart) + 2;
	if (arrayStart === -1 || arrayEnd === 1) {
		return null;
	}
	const arrayText = source.slice(arrayStart, arrayEnd);
	return new Function(`return ${arrayText};`)();
};

const parseComponentRows = (components) =>
	components
		.split('\n')
		.map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
		.map((cells) => {
			const nav = cells[2]?.match(/^`([^`]+)`$/)?.[1];
			const fileNav = cells[3]?.match(/^`references\/components\/([^`]+)\.md`$/)?.[1];
			return nav && fileNav ? { nav, fileNav } : null;
		})
		.filter(Boolean);

requiredFiles.forEach((file) => {
	const fullPath = path.join(packageRoot, file);
	if (!existsSync(fullPath)) {
		failures.push(`Missing ${file}`);
	}
});

const skillPath = path.join(packageRoot, 'skill/SKILL.md');
if (existsSync(skillPath)) {
	const skill = readFileSync(skillPath, 'utf-8');
	if (!skill.startsWith('---\nname: stdf\n')) {
		failures.push('SKILL.md frontmatter must start with name: stdf');
	}
	if (!/description: .+STDF/.test(skill)) {
		failures.push('SKILL.md frontmatter must include a STDF description');
	}
}

const agentPath = path.join(packageRoot, 'skill/agents/openai.yaml');
if (existsSync(agentPath)) {
	const agent = readFileSync(agentPath, 'utf-8');
	if (!agent.includes('interface:') || !agent.includes('default_prompt:') || !agent.includes('$stdf')) {
		failures.push('skill/agents/openai.yaml must define interface.default_prompt mentioning $stdf');
	}
}

const componentsPath = path.join(packageRoot, 'skill/references/components.md');
if (existsSync(componentsPath)) {
	const components = readFileSync(componentsPath, 'utf-8');
	const match = components.match(/component-count: (\d+)/);
	const tableRows = components.split('\n').filter((line) => line.startsWith('| ') && !line.includes('---')).length - 1;
	if (!match) {
		failures.push('components.md must include component-count metadata');
	} else if (Number(match[1]) !== tableRows) {
		failures.push(`components.md component-count is ${match[1]} but table has ${tableRows}`);
	} else {
		const detailDir = path.join(packageRoot, 'skill/references/components');
		const detailFiles = existsSync(detailDir) ? readdirSync(detailDir).filter((file) => file.endsWith('.md')).length : 0;
		if (detailFiles !== Number(match[1])) {
			failures.push(`component detail file count is ${detailFiles} but component-count is ${match[1]}`);
		}
	}

	const menuPath = path.join(anyRoot, 'apps/site-common/src/stdf-data/menuList.ts');
	if (existsSync(menuPath)) {
		const menuList = readExportedArray(readFileSync(menuPath, 'utf-8'), 'export const menuList: MenuList[] = ');
		if (!menuList) {
			failures.push('Unable to parse showcase menu list');
		} else {
			const sourceRows = menuList.flatMap((group) => group.childs.map((child) => child.nav));
			const componentRows = parseComponentRows(components);
			const sourceSet = new Set(sourceRows);
			const componentSet = new Set(componentRows.map((row) => row.nav));

			if (match && Number(match[1]) !== sourceRows.length) {
				failures.push(`components.md component-count is ${match[1]} but showcase menu has ${sourceRows.length}`);
			}
			sourceRows.forEach((nav) => {
				if (!componentSet.has(nav)) {
					failures.push(`components.md missing source component ${nav}`);
				}
				if (!existsSync(path.join(packageRoot, 'skill/references/components', `${nav}.md`))) {
					failures.push(`missing component detail file for ${nav}`);
				}
			});
			componentRows.forEach((row) => {
				if (row.nav !== row.fileNav) {
					failures.push(`component row ${row.nav} points to ${row.fileNav}.md`);
				}
				if (!sourceSet.has(row.nav)) {
					failures.push(`components.md includes unknown component ${row.nav}`);
				}
			});
		}
	}
}

const themesPath = path.join(packageRoot, 'skill/data/themes.json');
if (existsSync(themesPath)) {
	const themes = JSON.parse(readFileSync(themesPath, 'utf-8'));
	if (themes.length !== 42) {
		failures.push(`themes.json must include 42 themes, found ${themes.length}`);
	}
	if (!themes.some((theme) => theme.name === 'ANYTDF')) {
		failures.push('themes.json must include default theme ANYTDF');
	}
	if (themes.some((theme) => theme.name === 'STDF')) {
		failures.push('themes.json must not include stale default theme STDF');
	}

	const themeSourcePath = path.join(anyRoot, 'packages/common/src/theme/plugin.ts');
	if (existsSync(themeSourcePath)) {
		const sourceThemes = readExportedArray(readFileSync(themeSourcePath, 'utf-8'), 'const builtInThemes: ThemeConfig[] = [');
		if (!sourceThemes) {
			failures.push('Unable to parse common built-in themes');
		} else {
			const sourceNames = sourceThemes.map((theme) => theme.name);
			const dataNames = themes.map((theme) => theme.name);
			if (sourceNames.join('\n') !== dataNames.join('\n')) {
				failures.push('themes.json theme names must match common/src/theme/plugin.ts');
			}
		}
	}
}

const walkFiles = (dir) => {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return walkFiles(fullPath);
		}
		return [fullPath];
	});
};

walkFiles(packageRoot)
	.filter((file) => /\.(md|mjs|json|yaml)$/.test(file))
	.forEach((file) => {
		const content = readFileSync(file, 'utf-8');
		if (content.includes('\uFFFD')) {
			failures.push(`Mojibake replacement character found in ${path.relative(packageRoot, file)}`);
		}
	});

[skillPath, ...walkFiles(path.join(packageRoot, 'skill/references')).filter((file) => file.endsWith('.md'))].forEach((file) => {
	if (!existsSync(file)) {
		return;
	}
	const content = readFileSync(file, 'utf-8');
	if (/\p{Script=Han}/u.test(content)) {
		failures.push(`AI skill docs must be English-only, found Han characters in ${path.relative(packageRoot, file)}`);
	}
	if (/docs\/mds|packages\/stdf\/src|_Source:|Repository Pointers|Route Examples|Source Files/.test(content)) {
		failures.push(`AI skill docs must be self-contained, found repository pointer in ${path.relative(packageRoot, file)}`);
	}
});

if (failures.length > 0) {
	failures.forEach((failure) => console.error(failure));
	process.exit(1);
}

console.log('stdf-skill validation passed.');
