import commonThemePlugin from '@any-tdf/common/theme';
import {
	RTDFTheme,
	darkMode,
	generateColorScale,
	getMode,
	getTheme,
	resolveThemeBuiltInIconLibrary,
	switchMode,
	switchTheme,
	themes
} from './runtime';

const rtdfThemePlugin = commonThemePlugin;

export {
	darkMode,
	generateColorScale,
	getMode,
	getTheme,
	resolveThemeBuiltInIconLibrary,
	switchMode,
	switchTheme,
	RTDFTheme,
	themes,
	rtdfThemePlugin
};
export type { PrimaryAndDarkColor, SwitchThemeInput, ThemeConfig, ThemeOptions, ThemeProps } from '@any-tdf/common/theme';

export default commonThemePlugin;
