/**
 * 切换主题
 * 通过修改 data-theme 属性切换预定义的主题
 *
 * Switch theme
 * Switch predefined themes by modifying data-theme attribute
 *
 * @param themeName - 主题名称，对应 CSS 中 @plugin "<framework>/theme" { name: "xxx" } 定义的名称
 *                    Theme name, corresponds to the name defined in @plugin "<framework>/theme" { name: "xxx" } in CSS
 *
 * @example
 * // CSS 中定义主题
 * // Define themes in CSS
 * @plugin "<framework>/theme" {
 *   name: "ANYTDF";
 *   --color-primary: oklch(0.581 0.238 27.862);
 * }
 *
 * // JS 中切换主题
 * // Switch theme in JS
 * import { switchTheme } from '<framework>/theme';
 * switchTheme('ANYTDF');
 */
import { generateColorScale, themes, type ThemeConfig } from './plugin.js';
import { getDocumentElement } from '../utils/platform.js';
import { defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '../svg/common.js';

export interface PrimaryAndDarkColor {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	default: string;
	700: string;
	800: string;
	900: string;
	950: string;
}

export interface ThemeProps {
	name: string;
	builtInIconLibrary?: BuiltInIconLibrary;
	color: {
		primary: PrimaryAndDarkColor;
		dark: PrimaryAndDarkColor;
		primaryBlack: string;
		primaryWhite: string;
		darkBlack: string;
		darkWhite: string;
		functional: {
			success: string;
			warning: string;
			error: string;
			info: string;
		};
		extend: { color: string; alias: string }[];
	};
}

export type SwitchThemeInput = string | ThemeProps | ThemeConfig;

const inlineThemePropertyNames = new Set<string>();

const managedThemePropertyNames = new Set([
	'--color-primary',
	'--color-dark',
	'--color-success',
	'--color-warning',
	'--color-error',
	'--color-info',
	'--color-primaryBlack',
	'--color-primaryWhite',
	'--color-darkBlack',
	'--color-darkWhite'
]);

const managedThemePropertyPrefixes = ['--color-primary-', '--color-dark-', '--color-bg-', '--color-text-', '--color-extend', '--radius-'];

const isManagedThemeProperty = (name: string) =>
	managedThemePropertyNames.has(name) || managedThemePropertyPrefixes.some((prefix) => name.startsWith(prefix));

const clearInlineThemeProperties = () => {
	const root = getDocumentElement();
	if (!root) {
		inlineThemePropertyNames.clear();
		return;
	}

	const style = root.style;
	inlineThemePropertyNames.forEach((name) => {
		style.removeProperty(name);
	});

	for (let index = style.length - 1; index >= 0; index -= 1) {
		const name = style.item(index);
		if (isManagedThemeProperty(name)) style.removeProperty(name);
	}

	inlineThemePropertyNames.clear();
};

const setPropertyFunc = (name: string, value: string) => {
	const root = getDocumentElement();
	if (!root) return;

	inlineThemePropertyNames.add(name);
	root.style.setProperty(name, value);
};

const applyThemeConfig = (theme: ThemeConfig): void => {
	const root = getDocumentElement();
	if (!root) return;

	const primaryScale = generateColorScale(theme['color-primary']);
	const darkScale = generateColorScale(theme['color-dark']);

	Object.entries(primaryScale).forEach(([step, value]) => {
		const key = step === '600' ? '--color-primary' : `--color-primary-${step}`;
		setPropertyFunc(key, value);
	});

	Object.entries(darkScale).forEach(([step, value]) => {
		const key = step === '600' ? '--color-dark' : `--color-dark-${step}`;
		setPropertyFunc(key, value);
	});

	Object.entries(theme).forEach(([key, value]) => {
		if (key === 'name' || key === 'color-primary' || key === 'color-dark' || key === 'built-in-icon-library') return;
		setPropertyFunc(`--${key}`, value);
	});

	root.setAttribute('data-theme', theme.name);
};

const applyThemeProps = (theme: ThemeProps): void => {
	const root = getDocumentElement();
	if (!root) return;

	const { color } = theme;

	Object.entries(color.primary).forEach(([key, value]) => {
		setPropertyFunc(key === 'default' ? '--color-primary' : `--color-primary-${key}`, value);
	});

	Object.entries(color.dark).forEach(([key, value]) => {
		setPropertyFunc(key === 'default' ? '--color-dark' : `--color-dark-${key}`, value);
	});

	setPropertyFunc('--color-success', color.functional.success);
	setPropertyFunc('--color-warning', color.functional.warning);
	setPropertyFunc('--color-error', color.functional.error);
	setPropertyFunc('--color-info', color.functional.info);
	setPropertyFunc('--color-primaryBlack', color.primaryBlack);
	setPropertyFunc('--color-primaryWhite', color.primaryWhite);
	setPropertyFunc('--color-darkBlack', color.darkBlack);
	setPropertyFunc('--color-darkWhite', color.darkWhite);

	color.extend.forEach((item, index) => {
		setPropertyFunc(`--color-extend${index}`, item.color);
		setPropertyFunc(`--color-${item.alias}`, item.color);
	});

	root.setAttribute('data-theme', theme.name);
};

const switchTheme = (theme: SwitchThemeInput): void => {
	const root = getDocumentElement();
	if (!root) return;

	clearInlineThemeProperties();

	if (typeof theme === 'string') {
		const config = themes.find((item) => item.name === theme);
		if (config) {
			applyThemeConfig(config);
			return;
		}
		root.setAttribute('data-theme', theme);
		return;
	}

	if ('color' in theme) {
		applyThemeProps(theme);
		return;
	}

	applyThemeConfig(theme);
};

const resolveThemeBuiltInIconLibrary = (theme: SwitchThemeInput | null | undefined): BuiltInIconLibrary => {
	if (!theme) return defaultBuiltInIconLibrary;
	if (typeof theme === 'string') {
		return themes.find((item) => item.name === theme)?.['built-in-icon-library'] || defaultBuiltInIconLibrary;
	}
	if ('color' in theme) return theme.builtInIconLibrary || defaultBuiltInIconLibrary;
	return theme['built-in-icon-library'] || defaultBuiltInIconLibrary;
};

/**
 * 切换亮暗模式
 * 通过修改 data-mode 属性切换亮色/暗色模式
 *
 * Switch mode
 * Switch primary/dark mode by modifying data-mode attribute
 *
 * @param mode - 模式名称：'primary' | 'dark'
 *               Mode name: 'primary' | 'dark'
 *
 * @example
 * import { switchMode } from '<framework>/theme';
 * switchMode('dark'); // 切换到暗色模式
 * switchMode('primary'); // 切换到亮色模式
 */
const switchMode = (mode: 'primary' | 'dark'): void => {
	getDocumentElement()?.setAttribute('data-mode', mode);
};

const darkMode = (isDark = true): void => {
	switchMode(isDark ? 'dark' : 'primary');
};

/**
 * 获取当前主题
 * Get current theme
 *
 * @returns 当前主题名称 / Current theme name
 */
const getTheme = (): string | null => {
	return getDocumentElement()?.getAttribute('data-theme') ?? null;
};

/**
 * 获取当前模式
 * Get current mode
 *
 * @returns 当前模式 / Current mode
 */
const getMode = (): string | null => {
	return getDocumentElement()?.getAttribute('data-mode') ?? null;
};

export { switchTheme, switchMode, darkMode, getTheme, getMode, resolveThemeBuiltInIconLibrary };
export default switchTheme;
