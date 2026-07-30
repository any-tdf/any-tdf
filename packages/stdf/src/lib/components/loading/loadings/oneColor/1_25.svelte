<script lang="ts">
	import { resolveLoadingStrokeTravelCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorStrokeStyle, resolveLoadingOneColorStrokeTravelStyle, resolveLoadingSvgStrokeClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor25Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStrokeTravelCss({ scope: 'stdf_loading_1_25', dasharray: '25, 75', includeLineCap: false, includeTransition: true });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_25">
	<div class={resolveLoadingLayoutClass({ kind: 'center' })}>
		<svg class={resolveLoadingLayoutClass({ kind: 'svgOriginWillChange', size })} viewBox={loadingOneColor25Svg.viewBox}>
			<rect
				class={resolveLoadingSvgStrokeClass({ className: loadingOneColor25Svg.trackRect.className, strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeStyle({ customColor })}
				x={loadingOneColor25Svg.trackRect.x}
				y={loadingOneColor25Svg.trackRect.y}
				fill={loadingOneColor25Svg.trackRect.fill}
				stroke-width={loadingOneColor25Svg.trackRect.strokeWidth}
				width={loadingOneColor25Svg.trackRect.width}
				height={loadingOneColor25Svg.trackRect.height}
			/>
			<rect
				class={resolveLoadingSvgStrokeClass({ className: loadingOneColor25Svg.carRect.className, strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeTravelStyle({ customColor, speed })}
				x={loadingOneColor25Svg.carRect.x}
				y={loadingOneColor25Svg.carRect.y}
				fill={loadingOneColor25Svg.carRect.fill}
				stroke-width={loadingOneColor25Svg.carRect.strokeWidth}
				width={loadingOneColor25Svg.carRect.width}
				height={loadingOneColor25Svg.carRect.height}
				pathLength={loadingOneColor25Svg.carRect.pathLength}
			/>
		</svg>
	</div>
</div>
