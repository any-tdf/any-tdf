<script lang="ts">
	import { resolveLoadingStrokeTravelCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorStrokeSlowStyle, resolveLoadingOneColorStrokeStyle, resolveLoadingSvgStrokeClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor36Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStrokeTravelCss({ scope: 'stdf_loading_1_36', endOffset: 100 });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_36">
	<div class={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
		<svg
			class={resolveLoadingLayoutClass({ kind: 'svgFullSized', size })}
			x="0px"
			y="0px"
			viewBox={loadingOneColor36Svg.viewBox}
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'opacity-10', strokeClass: loadingClassState.strokeClass })}
				fill="none"
				style={resolveLoadingOneColorStrokeStyle({ customColor })}
				stroke-width={loadingOneColor36Svg.path.strokeWidth}
				pathLength={loadingOneColor36Svg.path.pathLength}
				d={loadingOneColor36Svg.path.d}
			/>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'car', strokeClass: loadingClassState.strokeClass })}
				fill="none"
				style={resolveLoadingOneColorStrokeSlowStyle({ customColor, speed })}
				stroke-width={loadingOneColor36Svg.path.strokeWidth}
				pathLength={loadingOneColor36Svg.path.pathLength}
				d={loadingOneColor36Svg.path.d}
			/>
		</svg>
	</div>
</div>
