import { beforeEach, describe, expect, test } from 'bun:test';
import { ANYTDFTheme, resolveThemeBuiltInIconLibrary, switchTheme, themes } from '../src/theme';

type TestDocumentElement = {
	attrs: Map<string, string>;
	style: CSSStyleDeclaration;
	getAttribute: (name: string) => string | null;
	setAttribute: (name: string, value: string) => void;
};

const createStyle = () => {
	const values = new Map<string, string>();
	return {
		get length() {
			return values.size;
		},
		getPropertyValue: (name: string) => values.get(name) || '',
		item: (index: number) => Array.from(values.keys())[index] || '',
		removeProperty: (name: string) => {
			const value = values.get(name) || '';
			values.delete(name);
			return value;
		},
		setProperty: (name: string, value: string) => {
			values.set(name, value);
		}
	} as CSSStyleDeclaration;
};

const createDocumentElement = (): TestDocumentElement => {
	const attrs = new Map<string, string>();
	return {
		attrs,
		style: createStyle(),
		getAttribute: (name: string) => attrs.get(name) || null,
		setAttribute: (name: string, value: string) => {
			attrs.set(name, value);
		}
	};
};

const setTestDocument = () => {
	const documentElement = createDocumentElement();
	(globalThis as { document: Document }).document = { documentElement } as unknown as Document;
	return documentElement;
};

describe('switchTheme', () => {
	let documentElement: TestDocumentElement;

	beforeEach(() => {
		documentElement = setTestDocument();
	});

	test('clears inline radius variables before switching to a CSS plugin theme', () => {
		switchTheme('Nintendo');
		expect(documentElement.style.getPropertyValue('--radius-box')).toBe('2rem');
		expect(documentElement.style.getPropertyValue('--radius-form')).toBe('calc(infinity * 1px)');

		switchTheme('CustomRadius');
		expect(documentElement.getAttribute('data-theme')).toBe('CustomRadius');
		expect(documentElement.style.getPropertyValue('--radius-box')).toBe('');
		expect(documentElement.style.getPropertyValue('--radius-form')).toBe('');
		expect(documentElement.style.getPropertyValue('--radius-small')).toBe('');
	});

	test('does not keep stale radius values when applying legacy theme props', () => {
		switchTheme('Nintendo');
		expect(documentElement.style.getPropertyValue('--radius-box')).toBe('2rem');

		switchTheme(ANYTDFTheme);
		expect(documentElement.getAttribute('data-theme')).toBe('ANYTDF');
		expect(documentElement.style.getPropertyValue('--radius-box')).toBe('');
		expect(documentElement.style.getPropertyValue('--color-bg-base')).toBe('');
		expect(documentElement.style.getPropertyValue('--color-primary')).toBe(ANYTDFTheme.color.primary.default);
	});
});

describe('built-in theme icon libraries', () => {
	test('configures a supported icon library for every built-in theme', () => {
		const supportedLibraries = new Set(['remix', 'lucide', 'phosphor', 'tabler', 'iconoir', 'reicon']);

		expect(themes).toHaveLength(42);
		expect(themes.every((theme) => supportedLibraries.has(theme['built-in-icon-library'] || ''))).toBe(true);
		expect(resolveThemeBuiltInIconLibrary('ANYTDF')).toBe('remix');
	});
});
