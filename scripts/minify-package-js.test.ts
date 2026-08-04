import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { minifyPackageJavaScript } from './minify-package-js.mjs';

const temporaryDirectories: string[] = [];

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe('package JavaScript minification', () => {
	test('preserves ESM exports while reducing emitted code', async () => {
		const directory = await mkdtemp(join(tmpdir(), 'any-tdf-minify-'));
		temporaryDirectories.push(directory);
		await mkdir(join(directory, 'nested'));
		await writeFile(
			join(directory, 'nested/index.js'),
			[
				'export const addNumbers = (firstNumber, secondNumber) => {',
				'\tconst calculatedResult = firstNumber + secondNumber;',
				'\treturn calculatedResult;',
				'};',
				''
			].join('\n'),
			'utf8'
		);
		await writeFile(join(directory, 'empty.js'), 'export {};\n', 'utf8');

		const result = await minifyPackageJavaScript(directory);
		const outputPath = join(directory, 'nested/index.js');
		const output = await readFile(outputPath, 'utf8');
		const module = await import(`${pathToFileURL(outputPath).href}?test=${Date.now()}`);

		expect(result.files).toBe(2);
		expect(result.minifiedBytes).toBeLessThan(result.originalBytes);
		expect(output.endsWith('\n')).toBeTrue();
		expect(module.addNumbers(2, 3)).toBe(5);
	});
});
