<script lang="ts">
	import { resolveLoadingLayoutClass, loadingDualRingDelayDivisors, resolveLoadingColorDurationDelayStyle, resolveLoadingMidpointPulseCss, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingMidpointPulseCss({ scope: 'stdf_loading_1_50' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_50">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingDualRingDelayDivisors as item (item)}
			<div
				class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'dot absolute left-0 top-0', size: 'full' })}
				style={resolveLoadingColorDurationDelayStyle({ color: customColor[0], durationBase: 2, speed, delayDivisor: item })}
			></div>
		{/each}
	</div>
</div>
