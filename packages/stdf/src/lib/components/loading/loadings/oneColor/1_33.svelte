<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOneColorClassState, loadingHalfFlowSections, resolveLoadingHalfFlowContainerStyle, resolveLoadingHalfFlowCss, resolveLoadingHalfFlowOverlayClass, resolveLoadingHalfFlowPieceRootClass, resolveLoadingHalfFlowPieceStyle, resolveLoadingHalfFlowWrapClass, resolveLoadingHalfFlowWrapStyle, resolveLoadingOneColorBackgroundColorStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingHalfFlowCss({ scope: 'stdf_loading_1_33' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_33">
	<div class={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexColumn', size })} style={resolveLoadingHalfFlowContainerStyle(speed)}>
		{#each loadingHalfFlowSections as section (section)}
			<div
				class={resolveLoadingHalfFlowWrapClass()}
				style={resolveLoadingHalfFlowWrapStyle(section)}
			>
				<div class={resolveLoadingHalfFlowOverlayClass(loadingClassState.bgClass)} style={resolveLoadingOneColorBackgroundColorStyle({ customColor })}></div>
				<div
					class={resolveLoadingHalfFlowPieceRootClass({ section, bgClass: loadingClassState.bgClass })}
					style={resolveLoadingHalfFlowPieceStyle({ color: customColor[0], section, speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
