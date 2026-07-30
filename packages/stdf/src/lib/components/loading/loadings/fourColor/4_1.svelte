<script lang="ts">
	import { resolveLoadingFourShapeTranslateCss, resolveLoadingFourColorShapeStyle, resolveLoadingShapeContainerClass, resolveLoadingShapePieceClass } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: string[]; speed?: number };

	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();
	const css = resolveLoadingFourShapeTranslateCss({ scope: 'stdf_loading_4_1' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_4_1">
	<div class={resolveLoadingShapeContainerClass({ kind: 'rotatedCorner', size })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 0 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 1 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 2, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 3 })}
			style={resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 3, customColor, speed })}
		></div>
	</div>
</div>
