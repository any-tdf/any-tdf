<script lang="ts">
	import { resolveLoadingLayoutClass, loadingSlideDotDelayMultipliers, resolveLoadingStreamCss, resolveLoadingStreamTrackClass, resolveLoadingTimedStyle, resolveLoadingOneColorClassState, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingStreamCss({ scope: 'stdf_loading_1_46' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_46">
	<div class={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
		<div class={resolveLoadingStreamTrackClass()}>
			{#each loadingSlideDotDelayMultipliers as item (item)}
				<div
					class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'dot absolute', size: 'stream' })}
					style={resolveLoadingTimedStyle({ color: customColor[0], colorProperty: 'background-color', durationBase: 2.5, speed, delayMultiplier: item })}
				></div>
			{/each}
		</div>
	</div>
</div>
