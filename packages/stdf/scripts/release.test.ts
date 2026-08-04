import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJson = {
	name: string;
	version: string;
	repository?: { url?: string };
	files?: string[];
	dependencies?: Record<string, string>;
	exports?: Record<string, unknown>;
	publishConfig?: { tag?: string };
	scripts?: Record<string, string>;
};

const packageRoot = resolve(import.meta.dir, '..');
const repositoryRoot = resolve(packageRoot, '../..');
const packageJsonPath = resolve(packageRoot, 'package.json');
const packageText = readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageText) as PackageJson;
const releaseTag = packageJson.version.includes('-') ? packageJson.version.split('-')[1].split('.')[0] : 'latest';

describe(`${packageJson.name} release metadata`, () => {
	test('matches both changelog versions outside alpha releases', () => {
		if (releaseTag === 'alpha') return;
		for (const filename of ['changelog.md', 'changelog_en.md']) {
			const changelog = readFileSync(resolve(repositoryRoot, 'content', packageJson.name, 'guide', filename), 'utf-8');
			expect(changelog.startsWith(`## ${packageJson.version} `)).toBeTrue();
		}
	});

	test('uses the expected npm dist-tag', () => {
		expect(packageJson.publishConfig?.tag ?? 'latest').toBe(releaseTag);
	});

	test('ships package documentation and stages the root License', () => {
		expect(existsSync(resolve(packageRoot, 'README.md'))).toBeTrue();
		expect(packageJson.files).toContain('README.md');
		expect(existsSync(resolve(repositoryRoot, 'LICENSE'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, 'LICENSE'))).toBeFalse();
		expect(packageJson.files).toContain('LICENSE');
	});

	test('uses published Workspace dependencies for a standalone install', () => {
		expect(packageText).not.toContain('file:../../../');
		expect(packageJson.repository?.url).toStartWith('git+https://');
		expect(packageJson.scripts?.prepublishOnly).toBe('bun run release:check');
		expect(packageJson.scripts?.build).not.toContain('prepare-framework-dist');
		expect(packageJson.dependencies?.['@any-tdf/common']).toBe('workspace:^');
		expect(Object.hasOwn(packageJson.exports ?? {}, './source.css')).toBeTrue();
		expect(packageJson.files).toContain('source.css');
	});
});
