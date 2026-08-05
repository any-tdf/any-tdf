import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, '..');
const supportedTargets = new Set(['stdf', 'rtdf', 'vtdf']);

const parseArgs = () => {
	const args = process.argv.slice(2);
	const options = { check: false, target: null };

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];
		if (arg === '--check') {
			options.check = true;
		} else if (arg === '--target') {
			options.target = args[index + 1];
			index += 1;
		} else {
			throw new Error(`Unknown argument: ${arg}`);
		}
	}

	if (!options.target || (!supportedTargets.has(options.target) && options.target !== 'all')) {
		throw new Error('--target must be stdf, rtdf, vtdf, or all.');
	}

	return options;
};

const readThemes = () => {
	const sourcePath = path.join(repositoryRoot, 'packages/common/src/theme/plugin.ts');
	const source = readFileSync(sourcePath, 'utf-8');
	const marker = 'const builtInThemes: ThemeConfig[] = [';
	const start = source.indexOf(marker);
	const arrayStart = source.indexOf('[', start);
	const arrayEnd = source.indexOf('\n];', arrayStart) + 2;

	if (start === -1 || arrayStart === -1 || arrayEnd === 1) {
		throw new Error(`Unable to parse built-in themes: ${sourcePath}`);
	}

	return new Function(`return ${source.slice(arrayStart, arrayEnd)};`)();
};

const writeTarget = ({ check, expected, target }) => {
	const outputPath = path.join(repositoryRoot, 'packages/skills', `${target}-skill`, target, 'data/themes.json');
	if (check) {
		if (!existsSync(outputPath) || readFileSync(outputPath, 'utf-8') !== expected) {
			throw new Error(`${target.toUpperCase()} skill theme data is out of date: ${outputPath}`);
		}
		console.log(`${target.toUpperCase()} skill theme data is up to date.`);
		return;
	}

	writeFileSync(outputPath, expected, 'utf-8');
	console.log(`Generated ${target.toUpperCase()} skill theme data.`);
};

const options = parseArgs();
const themes = readThemes();
const expected = `${JSON.stringify(themes, null, '\t')}\n`;
const targets = options.target === 'all' ? Array.from(supportedTargets) : [options.target];
targets.forEach((target) => writeTarget({ check: options.check, expected, target }));
