import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const workspaceRoot = path.resolve(packageRoot, '../..');
const sourceRoot = path.join(packageRoot, 'docs/component-docs');
const sharedRoot = path.join(sourceRoot, 'shared');
const targetsRoot = path.join(sourceRoot, 'targets');

const targets = {
	stdf: {
		brand: 'STDF',
		brandLower: 'stdf',
		packageName: 'stdf',
		framework: 'Svelte',
		siteUrl: 'https://stdf.dev',
		componentLinkBase: 'https://stdf.dev/components',
		outputRoot: path.join(workspaceRoot, 'content/stdf/components')
	},
	rtdf: {
		brand: 'RTDF',
		brandLower: 'rtdf',
		packageName: 'rtdf',
		framework: 'React',
		siteUrl: 'https://rtdf.dev',
		componentLinkBase: '/components',
		outputRoot: path.join(workspaceRoot, 'content/rtdf/components')
	},
	vtdf: {
		brand: 'VTDF',
		brandLower: 'vtdf',
		packageName: 'vtdf',
		framework: 'Vue 3',
		siteUrl: 'https://vtdf.dev',
		componentLinkBase: '/components',
		outputRoot: path.join(workspaceRoot, 'content/vtdf/components')
	}
};

const usage = `Usage:
  bun run scripts/generate-component-docs.mjs [--target stdf|rtdf|vtdf] [--check]
  bun run scripts/generate-component-docs.mjs --init [--force]

The generator reads apps/site-common/docs/component-docs and writes the current
STDF / RTDF / VTDF component Markdown paths used by the docs sites, VS Code extensions,
and AI Skill bundles.`;

const parseArgs = () => {
	const args = process.argv.slice(2);
	const options = {
		check: false,
		force: false,
		init: false,
		target: null
	};

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];
		if (arg === '--check') {
			options.check = true;
		} else if (arg === '--force') {
			options.force = true;
		} else if (arg === '--init') {
			options.init = true;
		} else if (arg === '--target') {
			const target = args[index + 1];
			if (!target || target.startsWith('--')) {
				throw new Error('--target requires stdf, rtdf, or vtdf.');
			}
			options.target = target;
			index += 1;
		} else if (arg === '--help' || arg === '-h') {
			console.log(usage);
			process.exit(0);
		} else {
			throw new Error(`Unknown argument: ${arg}\n\n${usage}`);
		}
	}

	if (options.target && !targets[options.target]) {
		throw new Error(`Unknown target: ${options.target}`);
	}

	if (options.init && options.check) {
		throw new Error('--init cannot be used with --check.');
	}

	return options;
};

const walkMarkdown = (dir) => {
	if (!existsSync(dir)) return [];
	const entries = readdirSync(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkMarkdown(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.md')) {
			files.push(fullPath);
		}
	}
	return files.sort();
};

const readText = (filePath) => readFileSync(filePath, 'utf-8');

const writeTextIfChanged = (filePath, content) => {
	const current = existsSync(filePath) ? readText(filePath) : null;
	if (current === content) return false;
	mkdirSync(path.dirname(filePath), { recursive: true });
	writeFileSync(filePath, content, 'utf-8');
	return true;
};

const relativeMarkdownFiles = (dir) => walkMarkdown(dir).map((filePath) => path.relative(dir, filePath));

const uniqueSorted = (items) => Array.from(new Set(items)).sort();

const assertOutputRoots = () => {
	for (const [targetName, target] of Object.entries(targets)) {
		if (!existsSync(target.outputRoot)) {
			throw new Error(`Missing ${targetName} docs root: ${target.outputRoot}`);
		}
	}
};

const initSource = ({ force }) => {
	assertOutputRoots();
	if (existsSync(sourceRoot)) {
		if (!force) {
			throw new Error(`Source already exists: ${sourceRoot}\nUse --force to rebuild it from current docs.`);
		}
		rmSync(sharedRoot, { recursive: true, force: true });
		rmSync(targetsRoot, { recursive: true, force: true });
	}

	const stdfFiles = relativeMarkdownFiles(targets.stdf.outputRoot);
	const rtdfFiles = relativeMarkdownFiles(targets.rtdf.outputRoot);
	const allFiles = uniqueSorted([...stdfFiles, ...rtdfFiles]);
	const missing = [];
	let sharedCount = 0;
	let overrideCount = 0;

	for (const relativeFile of allFiles) {
		const stdfPath = path.join(targets.stdf.outputRoot, relativeFile);
		const rtdfPath = path.join(targets.rtdf.outputRoot, relativeFile);
		if (!existsSync(stdfPath) || !existsSync(rtdfPath)) {
			missing.push(relativeFile);
			continue;
		}

		const stdfContent = readText(stdfPath);
		const rtdfContent = readText(rtdfPath);
		if (stdfContent === rtdfContent) {
			writeTextIfChanged(path.join(sharedRoot, relativeFile), stdfContent);
			sharedCount += 1;
		} else {
			writeTextIfChanged(path.join(targetsRoot, 'stdf', relativeFile), stdfContent);
			writeTextIfChanged(path.join(targetsRoot, 'rtdf', relativeFile), rtdfContent);
			overrideCount += 1;
		}
	}

	if (missing.length > 0) {
		throw new Error(`Cannot initialize docs source because target docs differ:\n${missing.join('\n')}`);
	}

	console.log(`Initialized component docs source: ${sharedCount} shared files, ${overrideCount} target override pairs.`);
};

const targetNamesForRun = (targetName) => (targetName ? [targetName] : Object.keys(targets));

const listSourceFiles = (targetName) => {
	const targetRoot = path.join(targetsRoot, targetName);
	return uniqueSorted([...relativeMarkdownFiles(sharedRoot), ...relativeMarkdownFiles(targetRoot)]);
};

const getSourceFilePath = (targetName, relativeFile) => {
	const targetFile = path.join(targetsRoot, targetName, relativeFile);
	if (existsSync(targetFile)) return targetFile;

	const sharedFile = path.join(sharedRoot, relativeFile);
	if (existsSync(sharedFile)) return sharedFile;

	throw new Error(`Missing source for ${targetName}: ${relativeFile}`);
};

const renderTemplate = (content, targetName) => {
	const target = targets[targetName];
	const values = {
		...target,
		target: targetName
	};

	return content
		.replace(/<!--\s*@if\s+target=(stdf|rtdf|vtdf)\s*-->\n?([\s\S]*?)<!--\s*@endif\s*-->/g, (_, conditionTarget, body) => {
			return conditionTarget === targetName ? body : '';
		})
		.replace(/{{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*}}/g, (match, key) => {
			return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
		});
};

const generateTarget = (targetName, { check }) => {
	const target = targets[targetName];
	const sourceFiles = listSourceFiles(targetName);
	const targetFiles = relativeMarkdownFiles(target.outputRoot);
	const expectedSet = new Set(sourceFiles);
	const extraFiles = targetFiles.filter((relativeFile) => !expectedSet.has(relativeFile));
	const changed = [];

	for (const relativeFile of sourceFiles) {
		const sourceFilePath = getSourceFilePath(targetName, relativeFile);
		const expectedContent = renderTemplate(readText(sourceFilePath), targetName);
		const outputPath = path.join(target.outputRoot, relativeFile);
		const currentContent = existsSync(outputPath) ? readText(outputPath) : null;

		if (currentContent !== expectedContent) {
			changed.push(relativeFile);
			if (!check) {
				writeTextIfChanged(outputPath, expectedContent);
			}
		}
	}

	if (check && (changed.length > 0 || extraFiles.length > 0)) {
		const details = [
			changed.length > 0 ? `changed or missing:\n${changed.map((item) => `  - ${item}`).join('\n')}` : '',
			extraFiles.length > 0 ? `extra Markdown files:\n${extraFiles.map((item) => `  - ${item}`).join('\n')}` : ''
		]
			.filter(Boolean)
			.join('\n');
		throw new Error(`${targetName} component docs are out of date.\n${details}`);
	}

	console.log(
		`${targetName}: ${check ? 'checked' : 'generated'} ${sourceFiles.length} files${changed.length > 0 ? `, ${changed.length} updated` : ''}.`
	);
};

const main = () => {
	const options = parseArgs();

	if (options.init) {
		initSource(options);
		return;
	}

	if (!existsSync(sourceRoot)) {
		throw new Error(`Missing component docs source: ${sourceRoot}\nRun bun run scripts/generate-component-docs.mjs --init first.`);
	}

	for (const targetName of targetNamesForRun(options.target)) {
		generateTarget(targetName, options);
	}
};

main();
