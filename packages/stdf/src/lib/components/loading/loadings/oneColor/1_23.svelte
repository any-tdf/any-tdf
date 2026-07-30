<script lang="ts">
	import { resolveLoadingLayoutClass, loadingPulseLineIndexes, resolveLoadingLinePulseCss, resolveLoadingPulseLineClass, resolveLoadingPulseLineRowClass, resolveLoadingPulseLineTransformStyle, resolveLoadingTimedStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingLinePulseCss({ scope: 'stdf_loading_1_23' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_23">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeTranslateNegativeHalf', size })}>
		{#each loadingPulseLineIndexes as i (i)}
			<div
				class={resolveLoadingPulseLineRowClass()}
				style={resolveLoadingPulseLineTransformStyle(i)}
			>
				<div
					class={resolveLoadingPulseLineClass(loadingClassState.bgClass)}
					style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background', durationBase: 1, speed, delayMultiplier: i, delayDivisor: -12, webkit: true })}
				></div>
			</div>
		{/each}
	</div>
</div>
