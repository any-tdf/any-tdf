import type { LangProps } from '../../lang';
import type { SwitchThemeInput } from '../../theme/runtime';
import { defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import { createContext, useContext, useEffect } from 'react';
import { zh_CN } from '../../lang';
import { switchMode, switchTheme } from '../../theme/runtime';
import { feedbackState } from '../feedback/state';

export interface ConfigProviderProps {
	locale?: LangProps;
	theme?: SwitchThemeInput;
	mode?: 'primary' | 'dark';
	iconPath?: string;
	builtInIconLibrary?: BuiltInIconLibrary;
	syncTheme?: boolean;
	children?: React.ReactNode;
}

const defaultTheme = 'ANYTDF';
const defaultMode = 'primary';
const defaultConfig: ConfigProviderProps = {
	locale: zh_CN,
	theme: defaultTheme,
	mode: defaultMode,
	builtInIconLibrary: defaultBuiltInIconLibrary,
	syncTheme: true
};

export const ConfigContext = createContext<ConfigProviderProps>(defaultConfig);

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
	locale = zh_CN,
	theme = defaultTheme,
	mode = defaultMode,
	iconPath,
	builtInIconLibrary = defaultBuiltInIconLibrary,
	syncTheme = true,
	children
}) => {
	useEffect(() => {
		feedbackState.setLang(locale);
	}, [locale]);

	useEffect(() => {
		if (syncTheme && theme !== undefined) switchTheme(theme);
	}, [syncTheme, theme]);

	useEffect(() => {
		if (syncTheme && mode) switchMode(mode);
	}, [mode, syncTheme]);

	return (
		<ConfigContext.Provider value={{ locale, theme, mode, iconPath, builtInIconLibrary, syncTheme }}>{children}</ConfigContext.Provider>
	);
};
