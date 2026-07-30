<script lang="ts">
	import { resolveLoadingLayoutClass, loadingThreeDotDelayMultipliers, resolveLoadingColorDurationDelayStyle, resolveLoadingThreeDotPulseCss, resolveLoadingThreeDotPulseRowClass, resolveLoadingOneColorClassState, resolveLoadingRoundDotClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingThreeDotPulseCss({ scope: 'stdf_loading_1_47' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_47">
	<div class={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
		<div class={resolveLoadingThreeDotPulseRowClass()}>
			{#each loadingThreeDotDelayMultipliers as item (item)}
				<div
					class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, className: 'dot' })}
					style={resolveLoadingColorDurationDelayStyle({ color: customColor[0], durationBase: 1.3, speed, delayMultiplier: item })}
				></div>
			{/each}
		</div>
	</div>
</div>
