<script lang="ts">
	import { resolveLoadingStrokeTravelCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorStrokeBaseStyle, resolveLoadingOneColorStrokeStyle, resolveLoadingSvgStrokeClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor24Svg } from '@any-tdf/common/svg/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStrokeTravelCss({ scope: 'stdf_loading_1_24', includeTransition: true });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_24">
	<div class={resolveLoadingLayoutClass({ kind: 'center' })}>
		<svg class={resolveLoadingLayoutClass({ kind: 'svgOrigin', size })} x="0px" y="0px" viewBox={loadingOneColor24Svg.viewBox} preserveAspectRatio="xMidYMid meet">
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'opacity-10', strokeClass: loadingClassState.strokeClass })}
				fill="none"
				style={resolveLoadingOneColorStrokeStyle({ customColor })}
				stroke-width={loadingOneColor24Svg.path.strokeWidth}
				pathLength={loadingOneColor24Svg.path.pathLength}
				d={loadingOneColor24Svg.path.d}
			>
			</path>
			<path
				class={resolveLoadingSvgStrokeClass({ className: 'car', strokeClass: loadingClassState.strokeClass })}
				fill="none"
				style={resolveLoadingOneColorStrokeBaseStyle({ customColor, speed })}
				stroke-width={loadingOneColor24Svg.path.strokeWidth}
				pathLength={loadingOneColor24Svg.path.pathLength}
				d={loadingOneColor24Svg.path.d}
			>
			</path>
		</svg>
	</div>
</div>
