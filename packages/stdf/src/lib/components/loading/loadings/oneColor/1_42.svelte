<script lang="ts">
	import { resolveLoadingLayoutClass, loadingWobbleRotations, resolveLoadingWobbleContainerStyle, resolveLoadingWobbleCss, resolveLoadingWobbleDotStyle, resolveLoadingWobbleRotationClass, resolveLoadingWobbleRotationStyle, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingWobbleCss({ scope: 'stdf_loading_1_42' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_42">
	<div class={resolveLoadingLayoutClass({ kind: 'containerRelativeInlineBlock', size })} style={resolveLoadingWobbleContainerStyle(speed)}>
		{#each loadingWobbleRotations as item (item)}
			<div class={resolveLoadingWobbleRotationClass()} style={resolveLoadingWobbleRotationStyle(item)}>
				<div
					class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'dot absolute left-0 top-0', size: 'zeroFullWidth' })}
					style={resolveLoadingWobbleDotStyle({ color: customColor[0], speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
