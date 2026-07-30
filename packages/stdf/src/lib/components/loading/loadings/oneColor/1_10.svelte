<script lang="ts">
	import { resolveLoadingLayoutClass, loadingThreeDotIndexes, resolveLoadingDotFadeScaleCss, resolveLoadingRoundDotClass, resolveLoadingTimedStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingDotFadeScaleCss({ scope: 'stdf_loading_1_10' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_10">
	<div class={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
		{#each loadingThreeDotIndexes as i (i)}
			<div
				class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, className: 'loading' })}
				style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background', durationBase: 1, speed, delayBase: 1, delaySpeed: 1, delayMultiplier: i === 1 ? -0.3 : 0, webkit: true })}
			></div>
		{/each}
	</div>
</div>
