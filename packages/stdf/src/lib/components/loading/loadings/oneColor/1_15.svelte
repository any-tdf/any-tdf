<script lang="ts">
	import { resolveLoadingLayoutClass, loadingElasticDotLeftPercents, resolveLoadingElasticDotsCss, resolveLoadingElasticDotClass, resolveLoadingElasticDotStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingElasticDotsCss({ scope: 'stdf_loading_1_15' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_15">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingElasticDotLeftPercents as left, index (left)}
			<div
				class={resolveLoadingElasticDotClass({ bgClass: loadingClassState.bgClass, index })}
				style={resolveLoadingElasticDotStyle({ color: customColor[0], index, speed })}
			></div>
		{/each}
	</div>
</div>
