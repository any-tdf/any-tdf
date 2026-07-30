<script lang="ts">
	import { resolveLoadingLayoutClass, loadingTwoDotIndexes, resolveLoadingSquareSwapCss, resolveLoadingSquareSwapDotClass, resolveLoadingOneColorClassState, resolveLoadingOneColorSlowStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingSquareSwapCss({ scope: 'stdf_loading_1_6' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_6">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingTwoDotIndexes as dotIndex (dotIndex)}
			<div
				class={resolveLoadingSquareSwapDotClass({ bgClass: loadingClassState.bgClass, index: dotIndex })}
				style={resolveLoadingOneColorSlowStyle({ customColor, speed })}
			></div>
		{/each}
	</div>
</div>
