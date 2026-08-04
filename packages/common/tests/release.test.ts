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
const releaseTag = packageJson.version.includes('-') ? packageJson.version.split('-')[1].split('.')[0] : 'latest';

describe('@any-tdf/common release metadata', () => {
	test('matches the changelog outside alpha releases', () => {
		if (releaseTag === 'alpha') return;
		const changelog = readFileSync(resolve(packageRoot, 'CHANGELOG.md'), 'utf-8');
		expect(changelog).toContain(`## ${packageJson.version} -`);
	});

	test('uses the expected npm dist-tag', () => {
		expect(packageJson.publishConfig?.tag ?? 'latest').toBe(releaseTag);
	});

	test('ships documentation, the root License, and public exports', () => {
		for (const filename of ['README.md', 'CHANGELOG.md']) {
			expect(existsSync(resolve(packageRoot, filename))).toBeTrue();
			expect(packageJson.files).toContain(filename);
		}
		expect(existsSync(resolve(repositoryRoot, 'LICENSE'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, 'LICENSE'))).toBeFalse();
		expect(packageJson.files).toContain('LICENSE');
		for (const entry of ['./derived/*', './svg/*', './theme/runtime', './types', './source.css']) {
			expect(Object.hasOwn(packageJson.exports ?? {}, entry)).toBeTrue();
		}
		expect(packageJson.files).toContain('source.css');
		expect(readFileSync(resolve(packageRoot, 'source.css'), 'utf-8')).toContain("@source './dist';");
	});

	test('uses a standalone release gate', () => {
		expect(packageJson.repository?.url).toBe('git+https://github.com/any-tdf/any-tdf.git');
		expect(packageJson.repository?.directory).toBe('packages/common');
		expect(packageJson.scripts?.prepublishOnly).toBe('bun run release:check');
		expect(packageJson.scripts?.['release:check']).toBe('bun run test && bun run check && bun run package');
	});
});
