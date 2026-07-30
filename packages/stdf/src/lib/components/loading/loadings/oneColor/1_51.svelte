<script lang="ts">
	import { loadingQuarterDelayMultipliers, resolveLoadingColorDurationDelayStyle, resolveLoadingLayoutClass, resolveLoadingPulseScaleCss, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingPulseScaleCss({ scope: 'stdf_loading_1_51' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class={resolveLoadingLayoutClass({ className: 'stdf_loading_1_51', kind: 'relativeCenter', size })}>
	{#each loadingQuarterDelayMultipliers as item (item)}
		<div
			class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'dot absolute left-0 top-0', size: 'full' })}
			style={resolveLoadingColorDurationDelayStyle({ color: customColor[0], durationBase: 2, speed, delayMultiplier: item })}
		></div>
	{/each}
</div>
