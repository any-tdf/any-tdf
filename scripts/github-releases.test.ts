import { describe, expect, test } from 'bun:test';
import { resolve } from 'node:path';
import { createGitHubReleasePlan, createReleaseNotes, extractChangelogEntry, parseReleasePackages } from './github-releases.mjs';

const repositoryRoot = resolve(import.meta.dir, '..');

const workspace = (name: string, version: string, directory: string) => ({
	directory: `/tmp/${directory}`,
	manifestPath: `${directory}/package.json`,
	manifest: {
		name,
		version,
		license: 'MIT',
		repository: { directory }
	}
});

describe('GitHub Release package selection', () => {
	test('deduplicates identical package versions', () => {
		expect(
			parseReleasePackages(
				JSON.stringify([
					{ name: 'stdf', version: '3.0.0' },
					{ name: 'stdf', version: '3.0.0' }
				])
			)
		).toEqual([{ name: 'stdf', version: '3.0.0' }]);
	});

	test('rejects a version that does not match the checked-out Workspace', () => {
		expect(() =>
			createGitHubReleasePlan([workspace('stdf', '3.0.0', 'packages/stdf')], [{ name: 'stdf', version: '3.0.1' }])
		).toThrow('Release version mismatch');
	});

	test('uses the exact npm package coordinate as the Release title and tag', () => {
		const [release] = createGitHubReleasePlan(
			[workspace('@any-tdf/common', '1.0.0', 'packages/common')],
			[{ name: '@any-tdf/common', version: '1.0.0' }]
		);
		expect(release.title).toBe('@any-tdf/common@1.0.0');
		expect(release.tag).toBe('@any-tdf/common@1.0.0');
	});
});

describe('Workflow responsibilities', () => {
	test('keeps versioning, npm publishing, and GitHub Release creation separate', async () => {
		const publishWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/publish-npm.yml')).text();
		const packageWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/publish-npm-package.yml')).text();
		const releaseWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/release.yml')).text();
		const versionWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/version-packages.yml')).text();

		expect(publishWorkflow).toContain('run: bun run publish:npm:changed');
		expect(publishWorkflow).toContain('uses: ./.github/workflows/publish-npm-package.yml');
		expect(publishWorkflow).toContain('uses: ./.github/workflows/release.yml');
		expect(publishWorkflow).toContain("release-key: ${{ format('{0}@{1}', matrix.package.name, matrix.package.version) }}");
		expect(publishWorkflow.match(/NPM_TOKEN: \$\{\{ secrets\.NPM_TOKEN \}\}/g)).toHaveLength(2);
		expect(publishWorkflow).not.toContain('changesets/action');
		expect(packageWorkflow).toContain('secrets:');
		expect(packageWorkflow).toContain('NPM_TOKEN:');
		expect(packageWorkflow).toContain('required: false');
		expect(packageWorkflow).toContain('run: bun run publish:npm -- --package="${{ inputs.package-name }}"');
		expect(versionWorkflow).toContain('uses: changesets/action@v1');
		expect(versionWorkflow).toContain('version: bun run version-packages');
		expect(versionWorkflow).not.toContain('publish: bun run publish:npm');
		expect(releaseWorkflow).toContain('run: bun run release');
		expect(releaseWorkflow).toContain('group: github-releases-${{ github.run_id }}-${{ inputs.release-key }}');
		expect(releaseWorkflow).not.toContain('npm publish');
		expect(releaseWorkflow).not.toContain('changesets/action');
	});

	test('publishes only after CI and preserves the original push comparison base', async () => {
		const ciWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/ci.yml')).text();
		const publishWorkflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/publish-npm.yml')).text();

		expect(ciWorkflow).toContain('BASE_SHA: ${{ github.event.before }}');
		expect(ciWorkflow).toContain('uses: actions/upload-artifact@v4');
		expect(ciWorkflow).toContain('name: npm-publish-metadata');
		expect(publishWorkflow).toContain('workflow_run:');
		expect(publishWorkflow).toContain('- CI');
		expect(publishWorkflow).toContain("github.event.workflow_run.conclusion == 'success'");
		expect(publishWorkflow).toContain("needs.detect.result == 'success'");
		expect(publishWorkflow).toContain("fromJSON(needs.detect.outputs.level0 || '[]')");
		expect(publishWorkflow).toContain("fromJSON(needs.detect.outputs.level1 || '[]')");
		expect(publishWorkflow).toContain("fromJSON(needs.detect.outputs.all || '[]')");
		expect(publishWorkflow).toContain('uses: actions/download-artifact@v4');
		expect(publishWorkflow).toContain('BASE_SHA: ${{ steps.comparison.outputs.base-sha }}');
	});
});

describe('GitHub Release notes', () => {
	test('extracts only the requested changelog version', () => {
		const changelog = `# Changelog

## 2.0.0

- Current change.

## 1.0.0

- Previous change.
`;
		expect(extractChangelogEntry(changelog, '2.0.0')).toBe('- Current change.');
	});

	test('labels common changes as shared component core changes', () => {
		const notes = createReleaseNotes(
			workspace('@any-tdf/common', '1.0.0', 'packages/common'),
			'1.0.0',
			'- Align component state derivation.'
		);
		expect(notes).toContain('**npm package:** `@any-tdf/common`');
		expect(notes).toContain('**Scope:** Shared component core');
		expect(notes).toContain('## Changes for `@any-tdf/common`');
		expect(notes).toContain('used by STDF, RTDF, and VTDF');
	});

	test('labels framework-specific changes separately', () => {
		const notes = createReleaseNotes(
			workspace('rtdf', '3.0.0', 'packages/rtdf'),
			'3.0.0',
			'- Improve the React event adapter.'
		);
		expect(notes).toContain('**npm package:** `rtdf`');
		expect(notes).toContain('**Scope:** React component library');
		expect(notes).toContain('## Changes for `rtdf`');
		expect(notes).toContain('only covers React rendering');
		expect(notes).toContain('@any-tdf/common');
	});

	test('states clearly when a fixed package only synchronizes its version', () => {
		const notes = createReleaseNotes(workspace('vtdf', '3.0.0', 'packages/vtdf'), '3.0.0', '');
		expect(notes).toContain('only synchronizes the `vtdf` package version');
		expect(notes).toContain('no package-specific change entry');
	});

	test('uses English-only generated copy', () => {
		const notes = createReleaseNotes(
			workspace('stdf', '3.0.0', 'packages/stdf'),
			'3.0.0',
			'- Improve the Svelte event adapter.'
		);
		expect(notes).not.toMatch(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u);
	});
});
