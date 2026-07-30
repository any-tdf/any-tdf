<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingOneColorClassState, loadingClimbingDotStepIndexes, resolveLoadingClimbingDotBallStyle, resolveLoadingClimbingDotCss, resolveLoadingClimbingDotStepRootClass, resolveLoadingClimbingDotStepStyle, resolveLoadingRoundedElementClass } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));

	const css = resolveLoadingClimbingDotCss({ scope: 'stdf_loading_1_12' });
</script>

<svelte:head>
	{@html `<style>${css}</style>`}
</svelte:head>

<div class="stdf_loading_1_12">
	<div class={resolveLoadingLayoutClass({ kind: 'loadingRelativeBox', size })}>
		<div
			class={resolveLoadingRoundedElementClass({ bgClass: loadingClassState.bgClass, className: 'absolute ball', size: 'none' })}
			style={resolveLoadingClimbingDotBallStyle({ color: customColor[0], speed })}
		></div>
		{#each loadingClimbingDotStepIndexes as stepIndex (stepIndex)}
			<div
				class={resolveLoadingClimbingDotStepRootClass({ stepIndex, bgClass: loadingClassState.bgClass })}
				style={resolveLoadingClimbingDotStepStyle({ color: customColor[0], speed })}
			></div>
		{/each}
	</div>
</div>
