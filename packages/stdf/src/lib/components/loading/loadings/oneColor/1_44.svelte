<script lang="ts">
	import { resolveLoadingLayoutClass, loadingLeapFrogOffsets, resolveLoadingLeapFrogCss, resolveLoadingLeapFrogStyle, resolveLoadingLeapFrogTrackClass, resolveLoadingOneColorClassState, resolveLoadingOneColorBackgroundColorStyle, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingLeapFrogCss({ scope: 'stdf_loading_1_44' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_44">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingLeapFrogOffsets as item, i (i)}
			<div
				class={resolveLoadingLeapFrogTrackClass()}
				style={resolveLoadingLeapFrogStyle({ offset: item, index: i, speed })}
			>
				<div class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass })} style={resolveLoadingOneColorBackgroundColorStyle({ customColor })}></div>
			</div>
		{/each}
	</div>
</div>
