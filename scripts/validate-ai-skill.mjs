import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, '..');

const configs = {
	stdf: { brand: 'STDF', framework: 'Svelte 5' },
	rtdf: { brand: 'RTDF', framework: 'React' },
	vtdf: { brand: 'VTDF', framework: 'Vue 3' }
};

const parseTarget = () => {
	const args = process.argv.slice(2);
	const targetIndex = args.indexOf('--target');
	const target = targetIndex === -1 ? null : args[targetIndex + 1];
	if (!target || !configs[target]) {
		throw new Error('--target must be stdf, rtdf, or vtdf.');
	}
	return target;
};

const walkFiles = (directory) => {
	if (!existsSync(directory)) {
		return [];
	}
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(directory, entry.name);
		return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
	});
};

const readExportedArray = (source, marker) => {
	const start = source.indexOf(marker);
	const arrayStart = source.indexOf('[', start);
	const arrayEnd = source.indexOf('\n];', arrayStart) + 2;
	if (start === -1 || arrayStart === -1 || arrayEnd === 1) {
		return null;
	}
	return new Function(`return ${source.slice(arrayStart, arrayEnd)};`)();
};

const parseFrontmatter = (content) => {
	const match = content.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match) {
		return null;
	}
	const entries = match[1].split('\n').map((line) => {
		const separator = line.indexOf(':');
		return separator === -1 ? [line, ''] : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
	});
	return { body: content.slice(match[0].length), fields: Object.fromEntries(entries), keys: entries.map(([key]) => key) };
};

const parseComponentRows = (content) =>
	content
		.split('\n')
		.map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
		.map((cells) => {
			const nav = cells[2]?.match(/^`([^`]+)`$/)?.[1];
			const fileNav = cells[3]?.match(/^`references\/components\/([^`]+)\.md`$/)?.[1];
			return nav && fileNav ? { fileNav, nav } : null;
		})
		.filter(Boolean);

const target = parseTarget();
const config = configs[target];
const packageRoot = path.join(repositoryRoot, 'packages/skills', `${target}-skill`);
const skillRoot = path.join(packageRoot, target);
const failures = [];

const requiredFiles = [
	'package.json',
	'README.md',
	`${target}/SKILL.md`,
	`${target}/agents/openai.yaml`,
	`${target}/data/themes.json`,
	`${target}/scripts/generate-theme.mjs`,
	`${target}/references/project.md`,
	`${target}/references/components.md`,
	`${target}/references/theme.md`,
	`${target}/references/color.md`,
	`${target}/references/icons.md`,
	`${target}/references/i18n.md`,
	`${target}/references/scaffold.md`,
	'scripts/test-theme.mjs'
];

requiredFiles.forEach((file) => {
	if (!existsSync(path.join(packageRoot, file))) {
		failures.push(`Missing ${file}`);
	}
});

if (path.basename(skillRoot) !== target) {
	failures.push(`Skill directory must be named ${target}`);
}

const skillPath = path.join(skillRoot, 'SKILL.md');
if (existsSync(skillPath)) {
	const skill = readFileSync(skillPath, 'utf-8');
	const frontmatter = parseFrontmatter(skill);
	if (!frontmatter) {
		failures.push('SKILL.md must contain YAML frontmatter');
	} else {
		if (frontmatter.keys.join(',') !== 'name,description') {
			failures.push('SKILL.md frontmatter must contain only name and description, in that order');
		}
		if (frontmatter.fields.name !== target || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.fields.name)) {
			failures.push(`SKILL.md name must be ${target} and use lowercase hyphen-case`);
		}
		const description = frontmatter.fields.description;
		if (!description || description.length > 1024 || !description.includes(config.brand) || !description.includes(config.framework)) {
			failures.push(`SKILL.md description must be 1-1024 characters and identify ${config.brand} and ${config.framework}`);
		}
		if (!frontmatter.body.trim()) {
			failures.push('SKILL.md must contain instructions after frontmatter');
		}
	}
	if (skill.split('\n').length > 500) {
		failures.push('SKILL.md must stay under 500 lines');
	}

	for (const match of skill.matchAll(/\]\(([^)]+)\)/g)) {
		const reference = match[1];
		if (/^(?:https?:|#)/.test(reference)) {
			continue;
		}
		if (!existsSync(path.resolve(skillRoot, reference))) {
			failures.push(`SKILL.md references missing file ${reference}`);
		}
	}
}

const agentPath = path.join(skillRoot, 'agents/openai.yaml');
if (existsSync(agentPath)) {
	const agent = readFileSync(agentPath, 'utf-8');
	const displayName = agent.match(/display_name: ["']([^"']+)["']/)?.[1];
	const shortDescription = agent.match(/short_description: ["']([^"']+)["']/)?.[1];
	const defaultPrompt = agent.match(/default_prompt: ["']([^"']+)["']/)?.[1];
	if (displayName !== config.brand) {
		failures.push(`agents/openai.yaml display_name must be ${config.brand}`);
	}
	if (!shortDescription || shortDescription.length < 25 || shortDescription.length > 64) {
		failures.push('agents/openai.yaml short_description must be 25-64 characters');
	}
	if (!defaultPrompt?.includes(`$${target}`)) {
		failures.push(`agents/openai.yaml default_prompt must mention $${target}`);
	}
}

const componentsPath = path.join(skillRoot, 'references/components.md');
if (existsSync(componentsPath)) {
	const components = readFileSync(componentsPath, 'utf-8');
	const count = Number(components.match(/component-count: (\d+)/)?.[1]);
	const componentRows = parseComponentRows(components);
	const detailRoot = path.join(skillRoot, 'references/components');
	const detailNames = existsSync(detailRoot) ? readdirSync(detailRoot).filter((file) => file.endsWith('.md')).sort() : [];
	if (!Number.isInteger(count) || count !== componentRows.length || count !== detailNames.length) {
		failures.push(`Component index, metadata, and detail counts must match for ${config.brand}`);
	}

	const menuPath = path.join(repositoryRoot, 'apps/site-common/src/stdf-data/menuList.ts');
	const menuList = readExportedArray(readFileSync(menuPath, 'utf-8'), 'export const menuList: MenuList[] = ');
	const sourceNavs = menuList?.flatMap((group) => group.childs.map((child) => child.nav)) ?? [];
	const indexedNavs = componentRows.map((row) => row.nav);
	if (sourceNavs.join('\n') !== indexedNavs.join('\n')) {
		failures.push('Component index order and entries must match the shared component menu');
	}
	componentRows.forEach(({ fileNav, nav }) => {
		if (fileNav !== nav || !existsSync(path.join(detailRoot, `${nav}.md`))) {
			failures.push(`Component ${nav} must point to its matching detail file`);
		}
	});
	detailNames.forEach((fileName) => {
		const detail = readFileSync(path.join(detailRoot, fileName), 'utf-8');
		if (!detail.includes('generated by scripts/generate-skill-component-references.mjs; do not edit') || !detail.includes('source-docs:')) {
			failures.push(`Component detail ${fileName} must include generated provenance metadata`);
		}
		if (/\]\((?:https:\/\/(?:stdf|rtdf|vtdf)\.dev)?\/components\?nav=/.test(detail)) {
			failures.push(`Component detail ${fileName} must use offline links for bundled components`);
		}
	});
}

const themesPath = path.join(skillRoot, 'data/themes.json');
if (existsSync(themesPath)) {
	const themes = JSON.parse(readFileSync(themesPath, 'utf-8'));
	const themeNames = themes.map((theme) => theme.name);
	const themeSourcePath = path.join(repositoryRoot, 'packages/common/src/theme/plugin.ts');
	const sourceThemes = readExportedArray(readFileSync(themeSourcePath, 'utf-8'), 'const builtInThemes: ThemeConfig[] = ');
	if (!sourceThemes || JSON.stringify(themes) !== JSON.stringify(sourceThemes)) {
		failures.push('themes.json must exactly match the shared built-in theme source');
	}
	if (themes.length === 0 || themeNames[0] !== 'ANYTDF') {
		failures.push('themes.json must begin with ANYTDF');
	}
	if (themeNames.some((name) => ['STDF', 'RTDF', 'VTDF'].includes(name))) {
		failures.push('themes.json must not contain legacy framework theme names');
	}
}

walkFiles(skillRoot)
	.filter((file) => /\.(md|mjs|json|yaml)$/.test(file))
	.forEach((file) => {
		const content = readFileSync(file, 'utf-8');
		const relativePath = path.relative(packageRoot, file);
		if (content.includes('\uFFFD')) {
			failures.push(`Mojibake replacement character found in ${relativePath}`);
		}
		if (/\bskill\/(?:scripts|references|data)\b/.test(content)) {
			failures.push(`Stale source-layout path found in ${relativePath}`);
		}
	});

[skillPath, ...walkFiles(path.join(skillRoot, 'references')).filter((file) => file.endsWith('.md'))].forEach((file) => {
	if (existsSync(file) && /\p{Script=Han}/u.test(readFileSync(file, 'utf-8'))) {
		failures.push(`Bundled AI instructions must be English-only: ${path.relative(packageRoot, file)}`);
	}
});

if (failures.length > 0) {
	failures.forEach((failure) => console.error(failure));
	process.exit(1);
}

console.log(`${target}-skill validation passed.`);
