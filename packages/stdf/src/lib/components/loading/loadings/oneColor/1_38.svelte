<script lang="ts">
	import { resolveLoadingStrokeTravelFadeCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorStrokeSlowStyle, resolveLoadingOneColorStrokeStyle, resolveLoadingSvgStrokeClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor38Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStrokeTravelFadeCss({ scope: 'stdf_loading_1_38' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_38">
	<div class={resolveLoadingLayoutClass({ kind: 'center', size })}>
		<svg
			class={resolveLoadingLayoutClass({ kind: 'svgFull' })}
			x="0px"
			y="0px"
			viewBox={loadingOneColor38Svg.viewBox}
			height={loadingOneColor38Svg.height}
			width={loadingOneColor38Svg.width}
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'track opacity-10', strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeStyle({ customColor })}
				stroke-width={loadingOneColor38Svg.path.strokeWidth}
				fill="none"
				pathLength={loadingOneColor38Svg.path.pathLength}
				d={loadingOneColor38Svg.path.d}
			/>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'car', strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeSlowStyle({ customColor, speed })}
				stroke-width={loadingOneColor38Svg.path.strokeWidth}
				fill="none"
				pathLength={loadingOneColor38Svg.path.pathLength}
				d={loadingOneColor38Svg.path.d}
			/>
		</svg>
	</div>
</div>
