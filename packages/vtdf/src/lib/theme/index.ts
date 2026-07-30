import commonThemePlugin, {
	ANYTDFTheme as VTDFTheme,
	darkMode,
	generateColorScale,
	getMode,
	getTheme,
	switchMode,
	switchTheme,
	themes
} from '@any-tdf/common/theme';

const vtdfThemePlugin = commonThemePlugin;

export { darkMode, generateColorScale, getMode, getTheme, switchMode, switchTheme, VTDFTheme, themes, vtdfThemePlugin };
export type { PrimaryAndDarkColor, SwitchThemeInput, ThemeConfig, ThemeOptions, ThemeProps } from '@any-tdf/common/theme';

export default commonThemePlugin;
