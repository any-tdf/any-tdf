import anytdfThemePlugin, {
	ANYTDFTheme as STDFTheme,
	darkMode,
	generateColorScale,
	getMode,
	getTheme,
	switchMode,
	switchTheme,
	themes
} from '@any-tdf/common/theme';

const stdfThemePlugin = anytdfThemePlugin;

export { darkMode, generateColorScale, getMode, getTheme, switchMode, switchTheme, STDFTheme, stdfThemePlugin, themes };
export type { PrimaryAndDarkColor, SwitchThemeInput, ThemeConfig, ThemeOptions, ThemeProps } from '@any-tdf/common/theme';
export default anytdfThemePlugin;
