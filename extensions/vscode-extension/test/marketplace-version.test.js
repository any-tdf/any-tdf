const { describe, expect, test } = require('bun:test');
const { parseMarketplaceVersions } = require('../scripts/marketplace-version');

describe('VS Code Marketplace version parsing', () => {
	test('reads object version entries', () => {
		const versions = parseMarketplaceVersions(JSON.stringify({ versions: [{ version: '0.0.1' }, { version: '0.0.2' }] }));
		expect(versions.has('0.0.1')).toBeTrue();
		expect(versions.has('0.0.3')).toBeFalse();
	});

	test('reads a current version and tolerates command prefixes', () => {
		const versions = parseMarketplaceVersions('Marketplace metadata\n{"version":"1.2.3"}\n');
		expect(versions).toEqual(new Set(['1.2.3']));
	});

	test('rejects a non-JSON response so the caller can handle an unpublished extension', () => {
		expect(() => parseMarketplaceVersions('undefined')).toThrow('did not contain JSON');
	});
});
