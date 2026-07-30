<script lang="ts">
	import { resolveLoadingLayoutClass, loadingThreeDotIndexes, resolveLoadingDotPulseCss, resolveLoadingOneColorClassState, resolveLoadingRoundDotClass, resolveLoadingThreeDotIndexedStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingDotPulseCss({ scope: 'stdf_loading_1_17' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_17">
	<div class={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
		{#each loadingThreeDotIndexes as i (i)}
			<div
				class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, className: 'loading' })}
				style={resolveLoadingThreeDotIndexedStyle({ index: i, customColor, speed })}
			></div>
		{/each}
	</div>
</div>
