import { describe, expect, test } from 'bun:test';
import { resolve } from 'node:path';
import { getCiScopes } from './ci-changed-scopes.mjs';

const repositoryRoot = resolve(import.meta.dir, '..');

describe('CI changed scopes', () => {
	test('keeps documentation-only changes out of Demo routes and npm packaging', () => {
		expect(getCiScopes(['content/vtdf/guide/quick-start.md'])).toEqual({
			routes: false,
			browser: true,
			publish: false
		});
	});

	test('runs every heavy check for shared component changes', () => {
		expect(getCiScopes(['packages/common/src/derived/button.ts'])).toEqual({
			routes: true,
			browser: true,
			publish: true
		});
	});

	test('isolates publishing automation changes', () => {
		expect(getCiScopes(['scripts/publish-packages.mjs'])).toEqual({
			routes: false,
			browser: false,
			publish: true
		});
	});

	test('leaves portal-only changes to affected Workspace checks', () => {
		expect(getCiScopes(['apps/any-tdf-site/src/App.tsx'])).toEqual({
			routes: false,
			browser: false,
			publish: false
		});
	});

	test('forces every heavy check for main branch runs', () => {
		expect(getCiScopes(['README.md'], true)).toEqual({
			routes: true,
			browser: true,
			publish: true
		});
	});

	test('keeps the workflow wired to scoped PR checks and full main checks', async () => {
		const workflow = await Bun.file(resolve(repositoryRoot, '.github/workflows/ci.yml')).text();
		expect(workflow).toContain("CI_FORCE_FULL: ${{ github.event_name == 'push' }}");
		expect(workflow).toContain("if: needs.changes.outputs.routes == 'true'");
		expect(workflow).toContain("if: needs.changes.outputs.browser == 'true'");
		expect(workflow).toContain("if: needs.changes.outputs.publish == 'true'");
	});
});
