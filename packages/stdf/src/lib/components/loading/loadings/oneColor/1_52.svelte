<script lang="ts">
	import { resolveLoadingLayoutClass, loadingRotatingLineFrames, resolveLoadingLineRotateCss, resolveLoadingRotatingLineClass, resolveLoadingRotatingLineStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
	const css = resolveLoadingLineRotateCss({ scope: 'stdf_loading_1_52', alternate: true });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_52">
	<div class={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
		{#each loadingRotatingLineFrames as item, i (i)}
			<div
				class={resolveLoadingRotatingLineClass(loadingClassState.bgClass)}
				style={resolveLoadingRotatingLineStyle({ color: customColor[0], frame: item, speed, top: 'calc(50% - 2px)' })}
			></div>
		{/each}
	</div>
</div>
