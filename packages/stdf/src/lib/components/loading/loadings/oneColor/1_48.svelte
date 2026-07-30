<script lang="ts">
	import { resolveLoadingLayoutClass, loadingSwingDotOpacities, resolveLoadingHalfTurnSwingCss, resolveLoadingSwingDotStyle, resolveLoadingSwingLineClass, resolveLoadingSwingLineStyle, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingHalfTurnSwingCss({ scope: 'stdf_loading_1_48' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_48">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeRotatedFlexCenter', size })}>
		{#each loadingSwingDotOpacities as item, i (i)}
			<div
				class={resolveLoadingSwingLineClass()}
				style={resolveLoadingSwingLineStyle(i, speed)}
			>
				<div
					class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, size: 'quarter' })}
					style={resolveLoadingSwingDotStyle({ color: customColor[0], opacity: item, index: i })}
				></div>
			</div>
		{/each}
	</div>
</div>
