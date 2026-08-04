import { describe, expect, test } from 'bun:test';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import {
	assertInternalDependencyAvailability,
	createPublishPlan,
	createSelectedPublishPlan,
	isConfiguredNodeAuthToken,
	isTrustedPublishingAuthenticationFailure,
	parseArguments,
	publishCandidates,
	sortPublishCandidates,
	validatePackedManifest
} from './publish-packages.mjs';

type Manifest = {
	name: string;
	version: string;
	private?: boolean;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	exports?: Record<string, unknown>;
};

const workspace = (manifest: Manifest) => ({
	directory: `/tmp/${manifest.name.replaceAll('/', '-')}`,
	manifestPath: `${manifest.name}/package.json`,
	manifest
});

const common = workspace({ name: '@any-tdf/common', version: '1.1.0' });
const reactMotion = workspace({ name: '@any-tdf/react-motion', version: '1.0.0' });
const rtdf = workspace({
	name: 'rtdf',
	version: '0.1.0',
	dependencies: {
		'@any-tdf/common': 'workspace:^',
		'@any-tdf/react-motion': 'workspace:^'
	}
});
const workspaces = [rtdf, common, reactMotion];
const workspaceRoot = resolve(import.meta.dir, '..');

type ChangesetRelease = 'major' | 'minor' | 'patch';

const writeJson = (path: string, value: unknown) => writeFile(path, `${JSON.stringify(value, null, '\t')}\n`, 'utf-8');

const applyFixtureChangeset = async (releases: Record<string, ChangesetRelease>) => {
	const fixtureRoot = await mkdtemp(resolve(tmpdir(), 'any-tdf-changesets-'));
	const packageDefinitions = [
		{ directory: 'common', name: '@any-tdf/common', version: '1.1.0' },
		{ directory: 'react-confetti', name: '@any-tdf/react-confetti', version: '1.0.0' },
		{ directory: 'react-motion', name: '@any-tdf/react-motion', version: '1.0.0' },
		{ directory: 'vue-confetti', name: '@any-tdf/vue-confetti', version: '1.0.0' },
		{ directory: 'vue-motion', name: '@any-tdf/vue-motion', version: '1.0.0' },
		{
			directory: 'stdf',
			name: 'stdf',
			version: '3.0.0',
			dependencies: { '@any-tdf/common': 'workspace:^' }
		},
		{
			directory: 'rtdf',
			name: 'rtdf',
			version: '0.1.0',
			dependencies: {
				'@any-tdf/common': 'workspace:^',
				'@any-tdf/react-motion': 'workspace:^'
			}
		},
		{
			directory: 'vtdf',
			name: 'vtdf',
			version: '0.1.0',
			dependencies: {
				'@any-tdf/common': 'workspace:^',
				'@any-tdf/vue-motion': 'workspace:^'
			}
		}
	];

	try {
		await mkdir(resolve(fixtureRoot, '.changeset'), { recursive: true });
		await writeJson(resolve(fixtureRoot, 'package.json'), {
			name: 'release-policy-fixture',
			private: true,
			workspaces: ['packages/*']
		});
		const changesetsConfig = await Bun.file(resolve(workspaceRoot, '.changeset/config.json')).json();
		await writeJson(resolve(fixtureRoot, '.changeset/config.json'), {
			...changesetsConfig,
			changelog: false
		});
		const frontmatter = Object.entries(releases)
			.map(([name, type]) => `"${name}": ${type}`)
			.join('\n');
		await writeFile(
			resolve(fixtureRoot, '.changeset/release-policy.md'),
			`---\n${frontmatter}\n---\n\nVerify the monorepo dependency release policy.\n`,
			'utf-8'
		);

		for (const definition of packageDefinitions) {
			const packageDirectory = resolve(fixtureRoot, 'packages', definition.directory);
			await mkdir(packageDirectory, { recursive: true });
			await writeJson(resolve(packageDirectory, 'package.json'), definition);
		}

		const changesetBinary = resolve(workspaceRoot, 'node_modules/.bin/changeset');
		const process = Bun.spawnSync([changesetBinary, 'version'], {
			cwd: fixtureRoot,
			stdout: 'pipe',
			stderr: 'pipe'
		});
		if (process.exitCode !== 0) {
			throw new Error(`changeset version failed:\n${process.stdout.toString()}\n${process.stderr.toString()}`);
		}

		return new Map(
			await Promise.all(
				packageDefinitions.map(async ({ directory, name }) => [
					name,
					JSON.parse(await readFile(resolve(fixtureRoot, 'packages', directory, 'package.json'), 'utf-8'))
				])
			)
		);
	} finally {
		await rm(fixtureRoot, { recursive: true, force: true });
	}
};

describe('npm Trusted Publishing fallback', () => {
	test('ignores the setup-node authentication placeholder', () => {
		expect(isConfiguredNodeAuthToken('XXXXX-XXXXX')).toBeFalse();
		expect(isConfiguredNodeAuthToken('')).toBeFalse();
		expect(isConfiguredNodeAuthToken('npm_real_token')).toBeTrue();
	});

	test('retries new package creation when npm hides missing permission behind E404', () => {
		expect(
			isTrustedPublishingAuthenticationFailure(
				new Error('npm error code E404\nnpm error 404 package could not be found or you do not have permission to access it.')
			)
		).toBeTrue();
	});

	test('does not treat an unrelated E404 as an authentication failure', () => {
		expect(isTrustedPublishingAuthenticationFailure(new Error('npm error code E404\nmetadata endpoint not found.'))).toBeFalse();
	});
});

describe('npm publish planning', () => {
	test('returns no candidates when every local version is already published', async () => {
		const plan = await createPublishPlan(workspaces, async () => true);
		expect(plan).toEqual([]);
	});

	test('publishes a compatible common update without republishing an existing UI version', async () => {
		const plan = await createPublishPlan(workspaces, async (name) => name !== '@any-tdf/common');
		expect(plan.map(({ manifest }) => manifest.name)).toEqual(['@any-tdf/common']);
	});

	test('plans only the package selected by its changed version', async () => {
		const plan = await createSelectedPublishPlan(workspaces, ['rtdf'], async () => false);
		expect(plan.map(({ manifest }) => manifest.name)).toEqual(['rtdf']);
	});

	test('parses one package selector without selecting the whole monorepo', () => {
		const options = parseArguments(['--package=@any-tdf/common']);
		expect(options.packageNames).toEqual(['@any-tdf/common']);
	});

	test('sorts upstream packages before their UI consumer', () => {
		const plan = sortPublishCandidates(
			workspaces,
			workspaces.map(({ manifest }) => manifest.name)
		);
		expect(plan.map(({ manifest }) => manifest.name)).toEqual(['@any-tdf/common', '@any-tdf/react-motion', 'rtdf']);
	});

	test('fails before publishing when an internal dependency is unavailable', async () => {
		await expect(assertInternalDependencyAvailability(workspaces, [rtdf], async () => false)).rejects.toThrow(
			'neither published nor in this publish batch'
		);
	});

	test('skips a successful upstream version when retrying after a partial failure', async () => {
		const publishedRegistry = new Set<string>();
		const packages = [common, rtdf].map(({ manifest }) => ({ manifest }));
		const firstAttempt = publishCandidates(packages, {
			versionExists: async (name: string, version: string) => publishedRegistry.has(`${name}@${version}`),
			markPublished: (name: string, version: string) => publishedRegistry.add(`${name}@${version}`),
			publish: async ({ manifest }: { manifest: Manifest }) => {
				if (manifest.name === 'rtdf') throw new Error('simulated registry failure');
			}
		});
		await expect(firstAttempt).rejects.toThrow('simulated registry failure');
		expect(publishedRegistry.has('@any-tdf/common@1.1.0')).toBeTrue();

		const retryPlan = await createPublishPlan([common, rtdf], async (name, version) =>
			publishedRegistry.has(`${name}@${version}`)
		);
		expect(retryPlan.map(({ manifest }) => manifest.name)).toEqual(['rtdf']);
	});

	test('skips duplicate versions without creating release metadata', async () => {
		let publishCalls = 0;
		const result = await publishCandidates([{ manifest: common.manifest }], {
			versionExists: async () => true,
			publish: async () => {
				publishCalls += 1;
			}
		});

		expect(publishCalls).toBe(0);
		expect(result.skipped).toEqual(['@any-tdf/common@1.1.0']);
	});
});

describe('packed package validation', () => {
	const files = ['package/package.json', 'package/README.md', 'package/LICENSE', 'package/dist/index.js', 'package/dist/index.d.ts'];

	test('accepts converted dependency ranges and existing export targets', () => {
		expect(() =>
			validatePackedManifest(
				rtdf,
				{
					...rtdf.manifest,
					dependencies: {
						'@any-tdf/common': '^1.1.0',
						'@any-tdf/react-motion': '^1.0.0'
					},
					exports: {
						'.': { types: './dist/index.d.ts', import: './dist/index.js' }
					}
				},
				files
			)
		).not.toThrow();
	});

	test('rejects Workspace protocols in the final TGZ manifest', () => {
		expect(() =>
			validatePackedManifest(
				rtdf,
				{
					...rtdf.manifest,
					dependencies: { '@any-tdf/common': 'workspace:^' }
				},
				files
			)
		).toThrow('unpublished dependency specifier');
	});

	test('accepts bin targets that exist in the archive', () => {
		expect(() =>
			validatePackedManifest(
				rtdf,
				{
					...rtdf.manifest,
					dependencies: {
						'@any-tdf/common': '^1.1.0',
						'@any-tdf/react-motion': '^1.0.0'
					},
					bin: { 'create-any-tdf': 'dist/index.js', rtdf: './dist/index.js' }
				},
				files
			)
		).not.toThrow();
	});

	test('rejects bin targets missing from the archive', () => {
		expect(() =>
			validatePackedManifest(
				rtdf,
				{
					...rtdf.manifest,
					bin: { rtdf: './dist/cli.js' }
				},
				files
			)
		).toThrow('bin target is missing from the archive: ./dist/cli.js');
		expect(() =>
			validatePackedManifest(
				rtdf,
				{
					...rtdf.manifest,
					bin: 'dist/cli.js'
				},
				files
			)
		).toThrow('bin target is missing from the archive: dist/cli.js');
	});
});

describe('npm publish scope', () => {
	test('keeps repository Skills private and outside npm publishing pipelines', async () => {
		const skillNames = ['rtdf-skill', 'stdf-skill', 'vtdf-skill'];
		const [rootManifest, turboConfig, changesetConfig, publishWorkflow, ...skillManifests] = await Promise.all([
			Bun.file(resolve(workspaceRoot, 'package.json')).json(),
			Bun.file(resolve(workspaceRoot, 'turbo.json')).json(),
			Bun.file(resolve(workspaceRoot, '.changeset/config.json')).json(),
			Bun.file(resolve(workspaceRoot, '.github/workflows/publish-npm.yml')).text(),
			...skillNames.map((name) => Bun.file(resolve(workspaceRoot, `packages/skills/${name}/package.json`)).json())
		]);
		expect(turboConfig.tasks['release:check'].dependsOn).toEqual(['^release:check']);
		expect(rootManifest.scripts['publish:npm:check:packages']).toContain('--concurrency=1');

		for (const [index, manifest] of skillManifests.entries()) {
			const skillName = skillNames[index];
			expect(manifest.private).toBeTrue();
			expect(manifest.publishConfig).toBeUndefined();
			expect(manifest.scripts.prepublishOnly).toBeUndefined();
			expect(rootManifest.scripts['publish:npm:check:packages']).not.toContain(skillName);
			expect(changesetConfig.fixed.flat()).not.toContain(skillName);
			expect(publishWorkflow).not.toContain(`packages/skills/${skillName}/package.json`);
		}
	});
});

describe('Changesets dependency policy', () => {
	test('keeps corresponding npm packages synchronized while stdf follows its independent release line', async () => {
		const config = await Bun.file(resolve(workspaceRoot, '.changeset/config.json')).json();
		const frameworkManifests = await Promise.all(
			['stdf', 'rtdf', 'vtdf'].map((name) => Bun.file(resolve(workspaceRoot, `packages/${name}/package.json`)).json())
		);

		expect(config.updateInternalDependencies).toBe('patch');
		expect(config.bumpVersionsWithWorkspaceProtocolOnly).toBeTrue();
		expect(config.fixed).toContainEqual(['@any-tdf/react-confetti', '@any-tdf/vue-confetti']);
		expect(config.fixed).toContainEqual(['@any-tdf/react-motion', '@any-tdf/vue-motion']);
		expect(config.fixed).toContainEqual(['rtdf', 'vtdf']);
		expect(config.fixed.some((group: string[]) => group.includes('stdf'))).toBeFalse();
		for (const manifest of frameworkManifests) {
			expect(manifest.dependencies['@any-tdf/common']).toBe('workspace:^');
		}
	});

	test('publishes only common when its new version remains in the current caret range', async () => {
		const manifests = await applyFixtureChangeset({ '@any-tdf/common': 'minor' });

		expect(manifests.get('@any-tdf/common').version).toBe('1.2.0');
		expect(manifests.get('stdf').version).toBe('3.0.0');
		for (const name of ['rtdf', 'vtdf']) expect(manifests.get(name).version).toBe('0.1.0');
	});

	test('patches each release line when common leaves the current caret range', async () => {
		const manifests = await applyFixtureChangeset({ '@any-tdf/common': 'major' });

		expect(manifests.get('@any-tdf/common').version).toBe('2.0.0');
		expect(manifests.get('stdf').version).toBe('3.0.1');
		for (const name of ['rtdf', 'vtdf']) expect(manifests.get(name).version).toBe('0.1.1');
	});

	test('patches the motion pair and React/Vue frameworks when react motion leaves the RTDF range', async () => {
		const manifests = await applyFixtureChangeset({ '@any-tdf/react-motion': 'major' });

		expect(manifests.get('@any-tdf/react-motion').version).toBe('2.0.0');
		expect(manifests.get('@any-tdf/vue-motion').version).toBe('2.0.0');
		expect(manifests.get('stdf').version).toBe('3.0.0');
		for (const name of ['rtdf', 'vtdf']) expect(manifests.get(name).version).toBe('0.1.1');
	});
});
