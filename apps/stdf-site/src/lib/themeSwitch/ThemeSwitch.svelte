<script lang="ts">
	import { switchTheme, themes } from 'stdf/theme';
	import { currentColorStore } from '../../store.js';
	import { themeLabels } from '../../data/homeData.js';

	// 横排还是竖排
	export let vertical = false;

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const selectColorFunc = (e: MouseEvent, themeName: string) => {
		// 阻止冒泡
		e.stopPropagation();
		currentColorStore.set(themeName);
		localStorage.setItem('theme_color', themeName);
		switchTheme(themeName);
	};
</script>

<div
	class="{vertical
		? 'theme-switch-grid max-h-60 gap-1 overflow-y-auto sm:max-h-none'
		: 'flex flex-row flex-wrap gap-2'} my-2"
>
	{#each themes as item (item)}
		<button
			class="theme-switch-option flex items-center gap-1.5 border px-2 py-1 {$currentColorStore === item.name
				? 'border-primary dark:border-dark'
				: 'border-black/10 hover:border-primary/30 dark:border-white/10 dark:hover:border-dark/30'} cursor-pointer rounded-sm transition-colors"
			on:click={(e) => selectColorFunc(e, item.name)}
		>
			<!-- 双色展示：左侧浅背景+亮色，右侧深背景+暗色 -->
			<div class="flex h-4 w-6 shrink-0 overflow-hidden rounded-sm">
				<div class="flex w-1/2 items-center justify-center bg-gray-100">
					<div class="size-2.5 rounded-full" style="background: {item['color-primary']}"></div>
				</div>
				<div class="flex w-1/2 items-center justify-center bg-gray-800">
					<div class="size-2.5 rounded-full" style="background: {item['color-dark']}"></div>
				</div>
			</div>
			<div class="flex-1 truncate whitespace-nowrap text-left text-xs font-normal">{isZh ? themeLabels[item.name] || item.name : item.name}</div>
		</button>
	{/each}
</div>
