<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingFourShapePositionCss, resolveLoadingTwoColorClassState, resolveLoadingShapeContainerStyle, resolveLoadingShapePieceClass, resolveLoadingTwoColorShapeStyle } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false } = $props();

	const loadingClassState = $derived(resolveLoadingTwoColorClassState({ inverse }));
	const css = resolveLoadingFourShapePositionCss({ scope: 'stdf_loading_2_5', containerDurationBase: 1.2, mode: 'quarters', shapeDurationBase: 0.6 });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_2_5">
	<div class={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })} style={resolveLoadingShapeContainerStyle({ variant: '2_5', speed })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 0, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 1, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 2, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 1, customColor, speed })}
		></div>
	</div>
</div>
