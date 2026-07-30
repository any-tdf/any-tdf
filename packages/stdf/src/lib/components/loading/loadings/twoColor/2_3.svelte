<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingFourShapeTranslateCss, resolveLoadingShapePieceClass, resolveLoadingTwoColorClassState, resolveLoadingTwoColorShapeStyle } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false }: Props = $props();

	const loadingClassState = $derived(resolveLoadingTwoColorClassState({ inverse }));
	const css = resolveLoadingFourShapeTranslateCss({ scope: 'stdf_loading_2_3' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_2_3">
	<div class={resolveLoadingLayoutClass({ kind: 'rotatedCorner', size })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 0, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 1, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 3, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 1, customColor, speed })}
		></div>
	</div>
</div>
