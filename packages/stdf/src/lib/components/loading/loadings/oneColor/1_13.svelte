<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingBorderElementClass, resolveLoadingClippedRingRotateCss, resolveLoadingClippedInnerRingStyle, resolveLoadingOneColorClassState, resolveLoadingOneColorBorderSlowStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingClippedRingRotateCss({ scope: 'stdf_loading_1_13' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_13">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenterBox', size })}>
		<div
			class={resolveLoadingBorderElementClass({ kind: 'clippedOuterRing', size, colorClass: loadingClassState.borderClass })}
			style={resolveLoadingOneColorBorderSlowStyle({ customColor, speed })}
		></div>
		<div
			class={resolveLoadingBorderElementClass({ kind: 'clippedInnerRing', colorClass: loadingClassState.borderClass })}
			style={resolveLoadingClippedInnerRingStyle({ color: customColor[0], speed })}
		></div>
	</div>
</div>
