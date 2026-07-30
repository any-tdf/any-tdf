<script setup lang="ts">
import { computed } from 'vue';
import { switchTheme, themes } from 'vtdf/theme';
import { themeLabels } from '../data/homeData';
import { appState } from '../store/appStore';

defineProps<{
	/** 横排还是竖排 */
	vertical?: boolean;
}>();

const isZh = computed(() => appState.lang === 'zh_CN');

const selectColorFunc = (event: MouseEvent, themeName: string) => {
	// 阻止冒泡
	event.stopPropagation();
	appState.currentColor = themeName;
	localStorage.setItem('theme_color', themeName);
	switchTheme(themeName);
};
</script>

<template>
	<div :class="[vertical ? 'theme-switch-grid max-h-60 gap-1 overflow-y-auto sm:max-h-none' : 'flex flex-row flex-wrap gap-2', 'my-2']">
		<button
			v-for="item in themes"
			:key="item.name"
			:class="[
				'theme-switch-option flex cursor-pointer items-center gap-1.5 rounded-sm border px-2 py-1 transition-colors',
				appState.currentColor === item.name
					? 'border-primary dark:border-dark'
					: 'border-black/10 hover:border-primary/30 dark:border-white/10 dark:hover:border-dark/30'
			]"
			type="button"
			@click="selectColorFunc($event, item.name)"
		>
			<!-- 双色展示：左侧浅背景+亮色，右侧深背景+暗色 -->
			<div class="flex h-4 w-6 shrink-0 overflow-hidden rounded-sm">
				<div class="flex w-1/2 items-center justify-center bg-gray-100">
					<div class="size-2.5 rounded-full" :style="{ background: item['color-primary'] }"></div>
				</div>
				<div class="flex w-1/2 items-center justify-center bg-gray-800">
					<div class="size-2.5 rounded-full" :style="{ background: item['color-dark'] }"></div>
				</div>
			</div>
			<div class="flex-1 truncate whitespace-nowrap text-left text-xs font-normal">
				{{ isZh ? themeLabels[item.name] || item.name : item.name }}
			</div>
		</button>
	</div>
</template>
