<script lang="ts">
	import { resolveLoadingTimedStyle, resolveLoadingHorizontalShuttleCss, resolveLoadingLayoutClass, resolveLoadingOneColorClassState, resolveLoadingOneColorBackgroundColorStyle, resolveLoadingTrackBarClass, resolveLoadingTrackOverlayClass, resolveLoadingTrackShellStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingHorizontalShuttleCss({ scope: 'stdf_loading_1_35' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_35">
	<div class={resolveLoadingLayoutClass({ kind: 'flexColumn', size })}>
		<div class={resolveLoadingLayoutClass({ kind: 'trackShell', size })} style={resolveLoadingTrackShellStyle()}>
			<div class={resolveLoadingTrackOverlayClass(loadingClassState.bgClass)} style={resolveLoadingOneColorBackgroundColorStyle({ customColor })}></div>
			<div
				class={resolveLoadingTrackBarClass(loadingClassState.bgClass)}
				style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 2, speed, includeDelay: false })}
			></div>
		</div>
	</div>
</div>
