<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingFourShapePositionCss, resolveLoadingTwoColorClassState, resolveLoadingShapeContainerStyle, resolveLoadingShapePieceClass, resolveLoadingTwoColorShapeStyle } from '@any-tdf/common/derived/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false } = $props();

	const loadingClassState = $derived(resolveLoadingTwoColorClassState({ inverse }));
	const css = resolveLoadingFourShapePositionCss({ scope: 'stdf_loading_2_4' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_2_4">
	<div class={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })} style={resolveLoadingShapeContainerStyle({ variant: '2_4', speed })}>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 0, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 1, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 1, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 2, bgClass: loadingClassState.bgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 0, customColor, speed })}
		></div>
		<div
			class={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 3, bgClass: loadingClassState.secondaryBgClass })}
			style={resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 1, customColor, speed })}
		></div>
	</div>
</div>
