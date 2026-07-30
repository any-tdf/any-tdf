<script lang="ts">
	import { resolveLoadingLayoutClass, loadingFiveDotIndexes, resolveLoadingDotChaseScaleCss, resolveLoadingDotChaseScaleDotClass, resolveLoadingDotChaseScaleStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingDotChaseScaleCss({ scope: 'stdf_loading_1_11' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_11">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingFiveDotIndexes as i (i)}
			<div
				class={resolveLoadingDotChaseScaleDotClass(loadingClassState.bgClass)}
				style={resolveLoadingDotChaseScaleStyle({ color: customColor[0], index: i, speed })}
			></div>
		{/each}
	</div>
</div>
