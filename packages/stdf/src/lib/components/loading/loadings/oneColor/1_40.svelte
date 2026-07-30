<script lang="ts">
	import { resolveLoadingLayoutClass, loadingDiagonalDotDelayMultipliers, resolveLoadingDiagonalDotStyle, resolveLoadingVerticalJumpCss, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingVerticalJumpCss({ scope: 'stdf_loading_1_40', distance: '120%' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_40">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeFlexCenter', size })}>
		{#each loadingDiagonalDotDelayMultipliers as item, i (i)}
			<div
				class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'dot absolute', size: 'xs' })}
				style={resolveLoadingDiagonalDotStyle({ color: customColor[0], index: i, delayMultiplier: item, speed })}
			></div>
		{/each}
	</div>
</div>
