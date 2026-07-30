<script lang="ts">
	import { resolveLoadingLayoutClass, loadingCubeDelayMultipliers, resolveLoadingCubeInnerClass, resolveLoadingCubeInnerStyle, resolveLoadingCubeMorphCss, resolveLoadingCubeRootClass, resolveLoadingCubeStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingCubeMorphCss({ scope: 'stdf_loading_1_30' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_30">
	<div class={resolveLoadingLayoutClass({ kind: 'flexEndBetween', size })}>
		{#each loadingCubeDelayMultipliers as delayMultiplier (delayMultiplier)}
			<div class={resolveLoadingCubeRootClass()} style={resolveLoadingCubeStyle({ delayMultiplier, speed })}>
				<div
					class={resolveLoadingCubeInnerClass(loadingClassState.bgClass)}
					style={resolveLoadingCubeInnerStyle({ color: customColor[0], delayMultiplier, speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
