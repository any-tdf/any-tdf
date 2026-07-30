<script lang="ts">
	import { resolveLoadingLayoutClass, loadingOrbitSliceIndexes, resolveLoadingOrbitalScaleCss, resolveLoadingOrbitSliceClass, resolveLoadingOrbitSliceRowClass, resolveLoadingOrbitSliceRowStyle, resolveLoadingOrbitSliceStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingOrbitalScaleCss({ scope: 'stdf_loading_1_39' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_39">
	<div class={resolveLoadingLayoutClass({ kind: 'flexColumnItemsCenter', size })}>
		{#each loadingOrbitSliceIndexes as item (item)}
			<div class={resolveLoadingOrbitSliceRowClass()} style={resolveLoadingOrbitSliceRowStyle()}>
				<div
					class={resolveLoadingOrbitSliceClass(loadingClassState.bgClass)}
					style={resolveLoadingOrbitSliceStyle({ color: customColor[0], index: item, speed })}
				></div>
				<div
					class={resolveLoadingOrbitSliceClass(loadingClassState.bgClass)}
					style={resolveLoadingOrbitSliceStyle({ color: customColor[0], index: item, phase: 'trailing', speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
