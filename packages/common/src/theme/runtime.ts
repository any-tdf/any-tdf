import ANYTDFTheme from './anytdf.js';
import { generateColorScale, themes } from './plugin.js';
import { darkMode, getMode, getTheme, resolveThemeBuiltInIconLibrary, switchMode, switchTheme } from './switchTheme.js';
import type { ThemeConfig } from './plugin.js';
import type { PrimaryAndDarkColor, SwitchThemeInput, ThemeProps } from './switchTheme.js';

export { switchTheme, switchMode, darkMode, getTheme, getMode, resolveThemeBuiltInIconLibrary, ANYTDFTheme, themes, generateColorScale };
export type { PrimaryAndDarkColor, SwitchThemeInput, ThemeProps, ThemeConfig };
