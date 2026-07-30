import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJson = {
	version: string;
	repository?: { url?: string; directory?: string };
	files?: string[];
	exports?: Record<string, unknown>;
	publishConfig?: { tag?: string };
	scripts?: Record<string, string>;
};

const packageRoot = resolve(import.meta.dir, '..');
const repositoryRoot = resolve(packageRoot, '../..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf-8')) as PackageJson;

describe('@any-tdf/common release metadata', () => {
	test('matches the changelog and alpha tag', () => {
		const changelog = readFileSync(resolve(packageRoot, 'CHANGELOG.md'), 'utf-8');
		expect(changelog).toContain(`## ${packageJson.version} -`);
		expect(packageJson.publishConfig?.tag).toBe('alpha');
	});

	test('ships documentation, the root License, and public exports', () => {
		for (const filename of ['README.md', 'CHANGELOG.md']) {
			expect(existsSync(resolve(packageRoot, filename))).toBeTrue();
			expect(packageJson.files).toContain(filename);
		}
		expect(existsSync(resolve(repositoryRoot, 'LICENSE'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, 'LICENSE'))).toBeFalse();
		expect(packageJson.files).toContain('LICENSE');
		for (const entry of ['./derived/*', './svg/*', './theme/runtime', './types']) {
			expect(Object.hasOwn(packageJson.exports ?? {}, entry)).toBeTrue();
		}
	});

	test('uses a standalone release gate', () => {
		expect(packageJson.repository?.url).toBe('git+https://github.com/any-tdf/any-tdf.git');
		expect(packageJson.repository?.directory).toBe('packages/common');
		expect(packageJson.scripts?.prepublishOnly).toBe('bun run release:check');
		expect(packageJson.scripts?.['release:check']).toBe('bun run test && bun run check && bun run package');
	});
});
