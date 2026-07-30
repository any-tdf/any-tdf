<script lang="ts">
	import { resolveLoadingAlphaBorderDurationStyle, resolveLoadingBorderElementClass, resolveLoadingDoubleRotateCss, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';

	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), theme = false, inverse = false }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingDoubleRotateCss({ scope: 'stdf_loading_1_20' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_20">
	<div
		class={resolveLoadingBorderElementClass({ kind: 'doubleSpinnerRing', size, colorClass: loadingClassState.doubleSpinBorderClass })}
		style={resolveLoadingAlphaBorderDurationStyle({ color: customColor[0], durationBase: 2, speed, fullBorder: true })}
	></div>
</div>
