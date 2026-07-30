<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorSvgSpinStyle, resolveLoadingSpinnerSvgClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor0Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
</script>

<div class={resolveLoadingLayoutClass({ kind: 'center', size })}>
	<svg
		viewBox={loadingOneColor0Svg.viewBox}
		class={resolveLoadingSpinnerSvgClass(loadingClassState.textClass)}
		style={resolveLoadingOneColorSvgSpinStyle({ customColor, speed })}
	>
		<circle
			cx={loadingOneColor0Svg.trackCircle.cx}
			cy={loadingOneColor0Svg.trackCircle.cy}
			r={loadingOneColor0Svg.trackCircle.r}
			stroke-width={loadingOneColor0Svg.trackCircle.strokeWidth}
			fill={loadingOneColor0Svg.trackCircle.fill}
			class={loadingOneColor0Svg.trackCircle.className}
			stroke={loadingOneColor0Svg.trackCircle.stroke}
		/>
		<circle
			cx={loadingOneColor0Svg.carCircle.cx}
			cy={loadingOneColor0Svg.carCircle.cy}
			r={loadingOneColor0Svg.carCircle.r}
			stroke-width={loadingOneColor0Svg.carCircle.strokeWidth}
			class={loadingOneColor0Svg.carCircle.className}
			stroke={loadingOneColor0Svg.carCircle.stroke}
			fill={loadingOneColor0Svg.carCircle.fill}
			stroke-dashoffset={loadingOneColor0Svg.carCircle.strokeDashoffset}
			stroke-dasharray={loadingOneColor0Svg.carCircle.strokeDasharray}
			stroke-linecap={loadingOneColor0Svg.carCircle.strokeLinecap}
		/>
	</svg>
</div>
