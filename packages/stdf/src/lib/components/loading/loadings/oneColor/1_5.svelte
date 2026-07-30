<script lang="ts">
	import { resolveLoadingBallScaleCss, resolveLoadingBallScaleDotClass, resolveLoadingOneColorClassState, resolveLoadingOneColorBaseStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingBallScaleCss({ scope: 'stdf_loading_1_5' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_5">
	<div
		class={resolveLoadingBallScaleDotClass({ bgClass: loadingClassState.bgClass, size })}
		style={resolveLoadingOneColorBaseStyle({ customColor, speed })}
	></div>
</div>
