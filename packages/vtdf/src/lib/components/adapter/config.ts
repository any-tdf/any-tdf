import { inject, provide, reactive, readonly, watch, type InjectionKey, type Ref } from 'vue';
import { defaultBuiltInIconLibrary, resolveBuiltInSvg, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import { zh_CN, type LangProps } from '../../lang';
import { switchMode, switchTheme, type SwitchThemeInput } from '../../theme';

export type VTDFMode = 'primary' | 'dark';

export interface VTDFConfig {
	locale: LangProps;
	theme: SwitchThemeInput;
	mode: VTDFMode;
	iconPath?: string;
	builtInIconLibrary?: BuiltInIconLibrary;
	syncTheme?: boolean;
}

export const defaultConfig: VTDFConfig = {
	locale: zh_CN,
	theme: 'ANYTDF',
	mode: 'primary',
	iconPath: 'fonts/symbol.svg',
	builtInIconLibrary: defaultBuiltInIconLibrary,
	syncTheme: true
};

const configKey: InjectionKey<VTDFConfig> = Symbol('vtdf-config');

export const provideConfig = (config: VTDFConfig) => {
	const state = reactive(config) as VTDFConfig;
	provide(configKey, state);
	watch(
		() => [state.theme, state.mode] as const,
		([theme, mode]) => {
			if (state.syncTheme === false) return;
			switchTheme(theme);
			switchMode(mode);
		},
		{ immediate: true }
	);
	return state;
};

export const useConfig = () => inject(configKey, defaultConfig);
export const useReadonlyConfig = () => readonly(useConfig()) as Readonly<VTDFConfig>;
export type MaybeConfigRef<T> = T | Ref<T>;

export const useBuiltInSvgResolver = () => {
	const config = useConfig();
	return (key: string) => resolveBuiltInSvg(key, config.builtInIconLibrary);
};
