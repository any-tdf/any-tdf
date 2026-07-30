<script lang="ts">
	import { resolveLoadingLayoutClass, loadingRadialDotDelayMultipliers, resolveLoadingRadialLineStyle, resolveLoadingRadialDotRowClass, resolveLoadingRadialDotStyle, resolveLoadingRadialOscillateCss, resolveLoadingOneColorClassState, resolveLoadingRoundDotClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingRadialOscillateCss({ scope: 'stdf_loading_1_29' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_29">
	<div class={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size })}>
		{#each loadingRadialDotDelayMultipliers as item, i (i)}
			<div class={resolveLoadingRadialDotRowClass()} style={resolveLoadingRadialLineStyle(i, speed)}>
				<div
					class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, className: 'dot', size: 'sm' })}
					style={resolveLoadingRadialDotStyle({ color: customColor[0], delayMultiplier: item, speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
