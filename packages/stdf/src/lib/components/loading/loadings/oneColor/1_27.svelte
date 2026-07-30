<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOneColorClassState, loadingSixDotDelayMultipliers, resolveLoadingOrbitSpinContainerStyle, resolveLoadingOrbitSpinCss, resolveLoadingOrbitSpinDotClass, resolveLoadingOrbitSpinDotStyle, resolveLoadingOrbitSpinInnerStyle, resolveLoadingRoundDotClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingOrbitSpinCss({ scope: 'stdf_loading_1_27' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_27">
	<div class={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size })} style={resolveLoadingOrbitSpinContainerStyle(speed)}>
		{#each loadingSixDotDelayMultipliers as delayMultiplier (delayMultiplier)}
			<div
				class={resolveLoadingOrbitSpinDotClass()}
				style={resolveLoadingOrbitSpinDotStyle({ delayMultiplier, speed })}
			>
				<div
					class={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass, size: 'sm' })}
					style={resolveLoadingOrbitSpinInnerStyle({ color: customColor[0], delayMultiplier, speed })}
				></div>
			</div>
		{/each}
	</div>
</div>
