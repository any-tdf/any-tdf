<script lang="ts">
	import { resolveLoadingLayoutClass, loadingEightRadialDelayMultipliers, resolveLoadingRadialDotPulseCss, resolveLoadingRadialDotRowClass, resolveLoadingRadialEightTransformStyle, resolveLoadingRoundDotClass, resolveLoadingTimedStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingRadialDotPulseCss({ scope: 'stdf_loading_1_28' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_28">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeFlexCenter', size })}>
		{#each loadingEightRadialDelayMultipliers as item, i (i)}
			<div class={resolveLoadingRadialDotRowClass()} style={resolveLoadingRadialEightTransformStyle(i)}>
				<div
					class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, className: 'dot', size: 'sm' })}
					style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 1, speed, delayMultiplier: item })}
				></div>
			</div>
		{/each}
	</div>
</div>
