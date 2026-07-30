<script lang="ts">
	import { resolveLoadingBorderElementClass, resolveLoadingDoubleRotateCss, resolveLoadingTwoColorBorderDurationStyle, resolveLoadingTwoColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false }: Props = $props();

	const loadingClassState = $derived(resolveLoadingTwoColorClassState({ inverse }));
	const css = resolveLoadingDoubleRotateCss({ scope: 'stdf_loading_2_2' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_2_2">
	<div
		class={resolveLoadingBorderElementClass({ kind: 'doubleSpinnerRing', size, colorClass: loadingClassState.spinBorderClass })}
		style={resolveLoadingTwoColorBorderDurationStyle({ customColor, durationBase: 2, speed })}
	></div>
</div>
