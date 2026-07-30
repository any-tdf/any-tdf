<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOrbitalScaleCss, resolveLoadingTimedStyle, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingOrbitalScaleCss({ scope: 'stdf_loading_1_41', targetClass: 'container' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_41">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		<div
			class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'container absolute left-2.5 top-2.5', size: 'lg' })}
			style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 1.5, speed, includeDelay: false })}
		></div>
		<div
			class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'container absolute left-2.5 top-2.5', size: 'lg' })}
			style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 1.5, speed, delayBase: 0.75 })}
		></div>
	</div>
</div>
