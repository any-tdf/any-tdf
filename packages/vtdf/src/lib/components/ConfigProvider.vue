<script setup lang="ts">
import { computed, watch } from 'vue';
import { resolveConfigProviderModeClass } from '@any-tdf/common/derived';
import { defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import { defaultConfig, provideConfig, type VTDFMode } from './adapter/config';
import type { LangProps } from '../lang';
import type { SwitchThemeInput } from '../theme';

const props = withDefaults(
	defineProps<{
		locale?: LangProps;
		theme?: SwitchThemeInput;
		mode?: VTDFMode;
		iconPath?: string;
		builtInIconLibrary?: BuiltInIconLibrary;
		syncTheme?: boolean;
	}>(),
	{
		locale: () => defaultConfig.locale,
		theme: 'ANYTDF',
		mode: 'primary',
		iconPath: defaultConfig.iconPath,
		builtInIconLibrary: defaultBuiltInIconLibrary,
		syncTheme: true
	}
);

const config = provideConfig({
	locale: props.locale,
	theme: props.theme,
	mode: props.mode,
	iconPath: props.iconPath,
	builtInIconLibrary: props.builtInIconLibrary,
	syncTheme: props.syncTheme
});

watch(
	() => [props.locale, props.theme, props.mode, props.iconPath, props.builtInIconLibrary, props.syncTheme] as const,
	([locale, theme, mode, iconPath, builtInIconLibrary, syncTheme]) => {
		config.locale = locale;
		config.theme = theme;
		config.mode = mode;
		config.iconPath = iconPath;
		config.builtInIconLibrary = builtInIconLibrary;
		config.syncTheme = syncTheme;
	},
	{ immediate: true }
);

// 公共派生层只处理模式 class，配置注入仍留在组件层。
// Shared derived layer only resolves mode classes; config injection stays in the component layer.
const modeClass = computed(() => resolveConfigProviderModeClass(props.mode));
</script>

<template>
	<div :class="modeClass">
		<slot />
	</div>
</template>
