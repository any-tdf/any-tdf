<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOneColorClassState, loadingExploreLineDelayMultipliers, resolveLoadingExploreCenterLineStyle, resolveLoadingExploreLineClass, resolveLoadingExploreLineCss, resolveLoadingExploreLineStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingExploreLineCss({ scope: 'stdf_loading_1_32' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_32">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		<div
			class={resolveLoadingExploreLineClass({ bgClass: loadingClassState.bgClass, kind: 'center' })}
			style={resolveLoadingExploreCenterLineStyle({ color: customColor[0], speed })}
		></div>
		{#each loadingExploreLineDelayMultipliers as delayMultiplier (delayMultiplier)}
			<div
				class={resolveLoadingExploreLineClass({ bgClass: loadingClassState.bgClass, kind: 'trail' })}
				style={resolveLoadingExploreLineStyle({ color: customColor[0], delayMultiplier, speed })}
			></div>
		{/each}
	</div>
</div>
