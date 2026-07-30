<script lang="ts">
	import { resolveLoadingTimedStyle, resolveLoadingHorizontalZoomCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorBackgroundColorStyle, resolveLoadingTrackBarClass, resolveLoadingTrackOverlayClass, resolveLoadingTrackShellStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingHorizontalZoomCss({ scope: 'stdf_loading_1_34' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class={resolveLoadingLayoutClass({ className: 'stdf_loading_1_34', kind: 'flexColumn', size })}>
	<div class={resolveLoadingLayoutClass({ kind: 'trackShell', size })} style={resolveLoadingTrackShellStyle()}>
		<div class={resolveLoadingTrackOverlayClass(loadingClassState.bgClass)} style={resolveLoadingOneColorBackgroundColorStyle({ customColor })}></div>
		<div
			class={resolveLoadingTrackBarClass(loadingClassState.bgClass)}
			style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 1.5, speed, includeDelay: false })}
		></div>
	</div>
</div>
