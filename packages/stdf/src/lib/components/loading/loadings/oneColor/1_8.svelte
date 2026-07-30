<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingRoundDotClass, resolveLoadingRotateScaleCss, resolveLoadingOneColorClassState, resolveLoadingBaseAnimationStyle, resolveLoadingOneColorBackgroundStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingRotateScaleCss({ scope: 'stdf_loading_1_8' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_8">
	<div
		class={resolveLoadingLayoutClass({ kind: 'loadingFlexBetween', size })}
		style={resolveLoadingBaseAnimationStyle({ speed })}
	>
		<div class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })} style={resolveLoadingOneColorBackgroundStyle({ customColor })}></div>
		<div class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })} style={resolveLoadingOneColorBackgroundStyle({ customColor })}></div>
		<div class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })} style={resolveLoadingOneColorBackgroundStyle({ customColor })}></div>
	</div>
</div>
