<script lang="ts">
	import { resolveLoadingStrokeTravelCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorStrokeSlowStyle, resolveLoadingOneColorStrokeStyle, resolveLoadingSvgStrokeClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor37Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStrokeTravelCss({ scope: 'stdf_loading_1_37' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_37">
	<div class={resolveLoadingLayoutClass({ kind: 'center', size })}>
		<svg
			class={resolveLoadingLayoutClass({ kind: 'svgFull' })}
			x="0px"
			y="0px"
			viewBox={loadingOneColor37Svg.viewBox}
			height={loadingOneColor37Svg.height}
			width={loadingOneColor37Svg.width}
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'opacity-10', strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeStyle({ customColor })}
				fill="none"
				stroke-width={loadingOneColor37Svg.path.strokeWidth}
				pathLength={loadingOneColor37Svg.path.pathLength}
				d={loadingOneColor37Svg.path.d}
			>
			</path>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'car', strokeClass: loadingClassState.strokeClass })}
				style={resolveLoadingOneColorStrokeSlowStyle({ customColor, speed })}
				fill="none"
				stroke-width={loadingOneColor37Svg.path.strokeWidth}
				pathLength={loadingOneColor37Svg.path.pathLength}
				d={loadingOneColor37Svg.path.d}
			>
			</path>
		</svg>
	</div>
</div>
