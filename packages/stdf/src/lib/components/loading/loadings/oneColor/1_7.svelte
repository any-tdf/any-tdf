<script lang="ts">
	import { resolveLoadingLayoutClass, loadingTwoDotIndexes, resolveLoadingTwoDotElasticCss, resolveLoadingTwoDotElasticDotClass, resolveLoadingOneColorClassState, resolveLoadingOneColorBaseStyle } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingTwoDotElasticCss({ scope: 'stdf_loading_1_7' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_7">
	<div class={resolveLoadingLayoutClass({ kind: 'flexCenter', size })}>
		{#each loadingTwoDotIndexes as dotIndex (dotIndex)}
			<div
				class={resolveLoadingTwoDotElasticDotClass({ bgClass: loadingClassState.bgClass, index: dotIndex })}
				style={resolveLoadingOneColorBaseStyle({ customColor, speed })}
			></div>
		{/each}
	</div>
</div>
