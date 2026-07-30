<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingFourShapeTranslateCss, resolveLoadingFourShapeTranslateStyle, resolveLoadingOneColorClassState, resolveLoadingShapePieceClass } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), theme = false, inverse = false }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingFourShapeTranslateCss({ scope: 'stdf_loading_1_18' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_18">
	<div class={resolveLoadingLayoutClass({ kind: 'rotatedCorner', size })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 0, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingFourShapeTranslateStyle({ customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 1, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingFourShapeTranslateStyle({ customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingFourShapeTranslateStyle({ customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 3, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingFourShapeTranslateStyle({ customColor, speed })}
		></div>
	</div>
</div>
