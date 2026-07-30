<script lang="ts">
	import { resolveLoadingLayoutClass, loadingCornerDotIndexes, resolveLoadingCornerDotStyle, resolveLoadingCornerTravelCss, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingCornerTravelCss({ scope: 'stdf_loading_1_9' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_9">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingCornerDotIndexes as i (i)}
			<div
				class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'absolute loading', size: 'third' })}
				style={resolveLoadingCornerDotStyle({ color: customColor[0], index: i, speed })}
			></div>
		{/each}
	</div>
</div>
