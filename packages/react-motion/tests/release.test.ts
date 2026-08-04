import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJson = {
	name: string;
	version: string;
	repository?: { url?: string; directory?: string };
	files?: string[];
	publishConfig?: { access?: string; tag?: string };
	scripts?: Record<string, string>;
};

const packageRoot = resolve(import.meta.dir, '..');
const repositoryRoot = resolve(packageRoot, '../..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf-8')) as PackageJson;
const releaseTag = packageJson.version.includes('-') ? packageJson.version.split('-')[1].split('.')[0] : 'latest';

describe(`${packageJson.name} release metadata`, () => {
	test('uses the expected npm dist-tag', () => {
		expect(packageJson.publishConfig?.access).toBe('public');
		expect(packageJson.publishConfig?.tag ?? 'latest').toBe(releaseTag);
	});

	test('ships documentation and stages the root License', () => {
		expect(existsSync(resolve(packageRoot, 'README.md'))).toBeTrue();
		for (const filename of ['README.md', 'LICENSE', 'CHANGELOG.md']) {
			expect(packageJson.files).toContain(filename);
		}
		expect(existsSync(resolve(repositoryRoot, 'LICENSE'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, 'LICENSE'))).toBeFalse();
	});

	test('uses a standalone release gate', () => {
		expect(packageJson.repository?.url).toBe('git+https://github.com/any-tdf/any-tdf.git');
		expect(packageJson.repository?.directory).toBe(`packages/${packageJson.name.replace('@any-tdf/', '')}`);
		expect(packageJson.scripts?.prepublishOnly).toBe('bun run release:check');
		expect(packageJson.scripts?.['release:check']).toContain('bun run test');
		expect(packageJson.scripts?.['release:check']).toContain('bun run package');
	});
});
