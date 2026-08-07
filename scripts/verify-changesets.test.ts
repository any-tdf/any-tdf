import { describe, expect, test } from 'bun:test';
import { findAlphaChangesetReleases, parseChangesetReleases } from './verify-changesets.mjs';

describe('Changeset release policy', () => {
	test('parses quoted and unquoted package releases', () => {
		expect(
			parseChangesetReleases(`---
'@any-tdf/common': minor
stdf: patch
---

Summary.
`),
		).toEqual([
			{ name: '@any-tdf/common', type: 'minor' },
			{ name: 'stdf', type: 'patch' }
		]);
	});

	test('rejects alpha packages while allowing stable packages', () => {
		const changesets = [
			{
				filename: '.changeset/example.md',
				releases: [
					{ name: 'stdf', type: 'minor' },
					{ name: '@any-tdf/vite-plugin-md-ts', type: 'patch' }
				]
			}
		];
		const versionsByName = new Map([
			['stdf', '3.0.0-alpha.3'],
			['@any-tdf/vite-plugin-md-ts', '0.0.2']
		]);

		expect(findAlphaChangesetReleases(changesets, versionsByName)).toEqual([
			{
				filename: '.changeset/example.md',
				name: 'stdf',
				version: '3.0.0-alpha.3'
			}
		]);
	});
});
