import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
	createSiteLanguageUrl,
	getSiteNavigationState,
	normalizeSiteLanguage,
	normalizeSiteThemeMode,
	resolveSiteLanguage,
	resolveSiteThemeMode
} from '../src/site';
import { defaultThemeName, normalizeThemeName } from '../src/theme';

type PackageJson = {
	private?: boolean;
	version?: string;
	repository?: { url?: string; directory?: string };
	files?: string[];
	exports?: Record<string, unknown>;
	publishConfig?: unknown;
	scripts?: Record<string, string>;
	dependencies?: Record<string, string>;
};

const packageRoot = resolve(import.meta.dir, '..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf-8')) as PackageJson;

describe('@any-tdf/site-common workspace metadata', () => {
	test('is private and has no npm release configuration', () => {
		expect(packageJson.private).toBeTrue();
		expect(packageJson.version).toBeUndefined();
		expect(packageJson.files).toBeUndefined();
		expect(packageJson.publishConfig).toBeUndefined();
		expect(packageJson.scripts?.prepublishOnly).toBeUndefined();
		expect(packageJson.scripts?.['release:check']).toBeUndefined();
		expect(packageJson.dependencies?.['@any-tdf/common']).toBe('workspace:*');
		expect(existsSync(resolve(packageRoot, '.github/workflows/publish-site-common.yml'))).toBeFalse();
	});

	test('keeps repository metadata, documentation, and required exports', () => {
		expect(packageJson.repository?.url).toBe('git+https://github.com/any-tdf/any-tdf.git');
		expect(packageJson.repository?.directory).toBe('apps/site-common');
		expect(existsSync(resolve(packageRoot, 'README.md'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, '../../LICENSE'))).toBeTrue();
		expect(existsSync(resolve(packageRoot, 'LICENSE'))).toBeFalse();
		for (const entry of ['./outline', './site', './styles']) expect(Object.hasOwn(packageJson.exports ?? {}, entry)).toBeTrue();
	});

	test('maps elevated site surfaces to the active theme', () => {
		const styles = readFileSync(resolve(packageRoot, 'assets/styles.css'), 'utf-8');
		expect(styles).toContain('--site-bg-elevated: var(--color-bg-surface);');
		expect(styles).toContain('--site-bg-elevated: var(--color-bg-surface-dark);');
	});

});

describe('shared Site state', () => {
	test('normalizes language and theme settings', () => {
		expect(normalizeSiteLanguage('zh_CN')).toBe('zh_CN');
		expect(normalizeSiteLanguage('fr_FR')).toBeNull();
		expect(resolveSiteLanguage(undefined, undefined, 'en-US')).toBe('en_US');
		expect(normalizeSiteThemeMode('unknown')).toBe('auto');
		expect(resolveSiteThemeMode('auto', true)).toBe('dark');
		expect(normalizeThemeName('STDF')).toBe(defaultThemeName);
	});

	test('builds navigation state and language URLs', () => {
		expect(getSiteNavigationState('/components').isComponents).toBeTrue();
		expect(getSiteNavigationState('/generator').isGenerator).toBeTrue();
		expect(createSiteLanguageUrl('https://stdf.dev/guide?lang=zh_CN', 'zh_CN')).toBe('https://stdf.dev/guide?lang=en_US');
	});
});
