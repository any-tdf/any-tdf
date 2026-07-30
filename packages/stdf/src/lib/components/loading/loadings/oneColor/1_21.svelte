<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingFourShapePositionCss, resolveLoadingOneColorClassState, resolveLoadingOneColorShapeStyle, resolveLoadingShapeContainerStyle, resolveLoadingShapePieceClass } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), theme = false, inverse = false }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingFourShapePositionCss({ scope: 'stdf_loading_1_21', containerDurationBase: 1.2, mode: 'quarters', shapeDurationBase: 0.6 });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_21">
	<div class={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })} style={resolveLoadingShapeContainerStyle({ variant: '1_21', speed })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 0, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 1, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 2, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed })}
		></div>
	</div>
</div>
