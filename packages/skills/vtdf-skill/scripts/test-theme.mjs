import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const generatorPath = path.join(packageRoot, 'vtdf/scripts/generate-theme.mjs');
const failures = [];

const runGenerator = (...args) =>
	execFileSync(process.execPath, [generatorPath, ...args], {
		cwd: packageRoot,
		encoding: 'utf-8'
	});

const assert = (condition, message) => {
	if (!condition) {
		failures.push(message);
	}
};

const assertCleanOutput = (name, output) => {
	assert(output.includes('@plugin "vtdf/theme/plugin"') || output.includes('"plugin":'), `${name} must use vtdf/theme/plugin`);
	assert(!output.includes('@plugin "vtdf/theme" {'), `${name} must not use stale vtdf/theme plugin path`);
	assert(!/\b(undefined|NaN)\b/.test(output), `${name} must not output undefined or NaN`);
};

const presetJson = runGenerator('--preset', 'ANYTDF', '--format', 'json');
const preset = JSON.parse(presetJson);
assert(preset.theme.name === 'ANYTDF', 'ANYTDF preset must resolve to the ANYTDF theme');
assert(preset.plugin.includes('@plugin "vtdf/theme/plugin"'), 'ANYTDF preset plugin output must use vtdf/theme/plugin');
assert(preset.cssTheme.includes('@theme {'), 'ANYTDF preset JSON must include @theme output');
assert(!presetJson.includes('"name": "STDF"'), 'ANYTDF preset JSON must not expose stale STDF theme name');
assertCleanOutput('ANYTDF preset JSON', presetJson);

const legacyAlias = runGenerator('--preset', 'VTDF', '--format', 'plugin');
assert(legacyAlias.includes('name: "ANYTDF";'), 'VTDF alias must resolve to the current ANYTDF theme name');
assertCleanOutput('VTDF alias plugin', legacyAlias);

const randomPlugin = runGenerator('--random', '--seed', '1', '--name', 'MyTheme', '--format', 'plugin');
assert(randomPlugin.includes('name: "MyTheme";'), 'Random theme output must use the requested theme name');
assertCleanOutput('Random theme plugin', randomPlugin);

const customTheme = runGenerator('--primary', 'oklch(0.52 0.24 35)', '--dark', 'oklch(0.72 0.18 250)', '--format', 'both');
assert(customTheme.includes('@theme {'), 'Custom theme output must include @theme when using --format both');
assert(customTheme.includes('color-primary: oklch(0.52 0.24 35);'), 'Custom theme output must preserve the primary color');
assert(customTheme.includes('color-dark: oklch(0.72 0.18 250);'), 'Custom theme output must preserve the dark color');
assertCleanOutput('Custom theme output', customTheme);

if (failures.length > 0) {
	failures.forEach((failure) => console.error(failure));
	process.exit(1);
}

console.log('vtdf-skill theme generator tests passed.');
