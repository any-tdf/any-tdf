<script lang="ts">
	import { resolveLoadingFourShapePositionCss, resolveLoadingFourColorShapeStyle, resolveLoadingShapeContainerClass, resolveLoadingShapeContainerStyle, resolveLoadingShapePieceClass } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: string[]; speed?: number };

	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();
	const css = resolveLoadingFourShapePositionCss({ scope: 'stdf_loading_4_2' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_4_2">
	<div class={resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size })} style={resolveLoadingShapeContainerStyle({ variant: '4_2', speed })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 0 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 1 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 2 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 2, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 3 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 3, customColor, speed })}
		></div>
	</div>
</div>
