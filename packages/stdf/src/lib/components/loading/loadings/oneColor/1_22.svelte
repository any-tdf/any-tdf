<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingCircularStretchCss, resolveLoadingOneColorClassState, resolveLoadingOneColorColorStyle, resolveLoadingOrbitCarStyle, resolveLoadingOrbitContainerStyle, resolveLoadingStretchSvgClass } from '@any-tdf/common/derived/loading';
	import { loadingOneColor22Svg } from '@any-tdf/common/svg/loading';
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingCircularStretchCss({ scope: 'stdf_loading_1_22' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_22">
	<div class={resolveLoadingLayoutClass({ kind: 'center', size })} style={resolveLoadingOrbitContainerStyle({ speed })}>
		<svg
			class={resolveLoadingStretchSvgClass(loadingClassState.textClass)}
			viewBox={loadingOneColor22Svg.viewBox}
			style={resolveLoadingOneColorColorStyle({ customColor })}
		>
			<circle
				class={loadingOneColor22Svg.trackCircle.className}
				stroke={loadingOneColor22Svg.trackCircle.stroke}
				cx={loadingOneColor22Svg.trackCircle.cx}
				cy={loadingOneColor22Svg.trackCircle.cy}
				r={loadingOneColor22Svg.trackCircle.r}
				fill={loadingOneColor22Svg.trackCircle.fill}
			/>
			<circle
				class={loadingOneColor22Svg.carCircle.className}
				style={resolveLoadingOrbitCarStyle({ speed })}
				stroke={loadingOneColor22Svg.carCircle.stroke}
				cx={loadingOneColor22Svg.carCircle.cx}
				cy={loadingOneColor22Svg.carCircle.cy}
				r={loadingOneColor22Svg.carCircle.r}
				fill={loadingOneColor22Svg.carCircle.fill}
			/>
		</svg>
	</div>
</div>
