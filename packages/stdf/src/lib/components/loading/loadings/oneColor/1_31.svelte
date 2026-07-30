<script lang="ts">
	import { resolveLoadingLayoutClass, loadingBarDelayMultipliers, resolveLoadingBarGrowCss, resolveLoadingTimedStyle, resolveLoadingOneColorClassState, resolveLoadingBarItemClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingBarGrowCss({ scope: 'stdf_loading_1_31' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_31">
	<div class={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
		{#each loadingBarDelayMultipliers as item (item)}
			<div
				class={resolveLoadingBarItemClass(loadingClassState.bgClass)}
				style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 1, speed, delayBase: 1, delaySpeed: 1, delayMultiplier: item })}
			></div>
		{/each}
	</div>
</div>
