import { switchTheme, switchMode, darkMode, getTheme, getMode, resolveThemeBuiltInIconLibrary } from './switchTheme.js';
import ANYTDFTheme from './anytdf.js';
import anytdfThemePlugin, { themes, generateColorScale } from './plugin.js';
import type { ThemeConfig, ThemeOptions } from './plugin.js';
import type { PrimaryAndDarkColor, SwitchThemeInput, ThemeProps } from './switchTheme.js';

export {
	switchTheme,
	switchMode,
	darkMode,
	getTheme,
	getMode,
	resolveThemeBuiltInIconLibrary,
	ANYTDFTheme,
	anytdfThemePlugin,
	themes,
	generateColorScale
};
export type { PrimaryAndDarkColor, SwitchThemeInput, ThemeProps, ThemeConfig, ThemeOptions };
export default anytdfThemePlugin;
