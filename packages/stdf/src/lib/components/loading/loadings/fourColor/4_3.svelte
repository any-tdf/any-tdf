<script lang="ts">
	import { resolveLoadingFourShapePositionCss, resolveLoadingFourColorShapeStyle, resolveLoadingShapeContainerClass, resolveLoadingShapeContainerStyle, resolveLoadingShapePieceClass } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: string[]; speed?: number };

	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();
	const css = resolveLoadingFourShapePositionCss({ scope: 'stdf_loading_4_3', containerDurationBase: 1.2, mode: 'quarters', shapeDurationBase: 0.6 });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_4_3">
	<div class={resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size })} style={resolveLoadingShapeContainerStyle({ variant: '4_3', speed })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 0 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 1 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 2 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 2, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 3, customColor, speed })}
		></div>
	</div>
</div>
