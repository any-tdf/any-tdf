<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingBorderElementClass, resolveLoadingClipRotatePulseCss, resolveLoadingOneColorClassState, resolveLoadingOneColorBaseStyle, resolveLoadingOneColorBorderBaseStyle, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingClipRotatePulseCss({ scope: 'stdf_loading_1_14' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_14">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		<div
			class={resolveLoadingBorderElementClass({ kind: 'clipPulseRing', colorClass: loadingClassState.borderClass })}
			style={resolveLoadingOneColorBorderBaseStyle({ customColor, speed })}
		></div>
		<div
			class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'absolute left-1/4 top-1/4 loading2', size: 'half' })}
			style={resolveLoadingOneColorBaseStyle({ customColor, speed })}
		></div>
	</div>
</div>
