<script lang="ts">
	import { resolveLoadingBorderElementClass, resolveLoadingDoubleRotateCss, resolveLoadingFourColorBorderDurationStyle } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: string[]; speed?: number };

	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();
	const css = resolveLoadingDoubleRotateCss({ scope: 'stdf_loading_4_0' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_4_0">
	<div
		class={resolveLoadingBorderElementClass({ kind: 'doubleSpinnerRing', size })}
		style={resolveLoadingFourColorBorderDurationStyle({ customColor, durationBase: 2, speed })}
	></div>
</div>
