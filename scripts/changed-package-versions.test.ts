import { describe, expect, test } from 'bun:test';
import { collectVersionChanges, createPublishTiers } from './changed-package-versions.mjs';

const workspace = (name: string, version: string, dependencies: Record<string, string> = {}) => ({
	directory: `/tmp/${name.replaceAll('/', '-')}`,
	manifestPath: `packages/${name.replaceAll('@any-tdf/', '')}/package.json`,
	manifest: { name, version, dependencies }
});

describe('changed npm package versions', () => {
	test('selects only public Workspaces whose version field changed', async () => {
		const workspaces = [
			workspace('@any-tdf/common', '1.1.0'),
			workspace('stdf', '3.0.0', { '@any-tdf/common': 'workspace:^' }),
			{ ...workspace('@any-tdf/site-common', '0.0.0'), manifest: { name: '@any-tdf/site-common', version: '0.0.0', private: true } }
		];
		const previousVersions = new Map([
			['packages/common/package.json', '1.0.0'],
			['packages/stdf/package.json', '3.0.0']
		]);
		const changes = await collectVersionChanges(workspaces, async (manifestPath) => ({
			version: previousVersions.get(manifestPath)
		}));

		expect(changes).toEqual([
			{ name: '@any-tdf/common', version: '1.1.0', manifestPath: 'packages/common/package.json' }
		]);
	});

	test('places changed dependencies before their consumers', () => {
		const workspaces = [
			workspace('@any-tdf/common', '1.1.0'),
			workspace('@any-tdf/react-motion', '2.0.0'),
			workspace('rtdf', '3.0.1', {
				'@any-tdf/common': 'workspace:^',
				'@any-tdf/react-motion': 'workspace:^'
			}),
			workspace('stdf', '3.0.1', { '@any-tdf/common': 'workspace:^' })
		];
		const changes = workspaces.map(({ manifest, manifestPath }) => ({
			name: manifest.name,
			version: manifest.version,
			manifestPath
		}));
		const tiers = createPublishTiers(workspaces, changes);

		expect(tiers.level0.map(({ name }) => name)).toEqual(['@any-tdf/common', '@any-tdf/react-motion']);
		expect(tiers.level1.map(({ name }) => name)).toEqual(['rtdf', 'stdf']);
	});

	test('allows one framework package to publish alone when its dependencies did not change', () => {
		const workspaces = [
			workspace('@any-tdf/common', '1.1.0'),
			workspace('vtdf', '3.0.1', { '@any-tdf/common': 'workspace:^' })
		];
		const changes = [{ name: 'vtdf', version: '3.0.1', manifestPath: 'packages/vtdf/package.json' }];
		const tiers = createPublishTiers(workspaces, changes);

		expect(tiers.level0).toEqual(changes);
		expect(tiers.level1).toEqual([]);
	});
});
