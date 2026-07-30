<script lang="ts">
	import { resolveLoadingAlphaBorderDurationStyle, resolveLoadingBorderElementClass, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';

	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
</script>

<div
	class={resolveLoadingBorderElementClass({ kind: 'alphaSpinnerRing', size, colorClass: loadingClassState.spinBorderClass })}
	style={resolveLoadingAlphaBorderDurationStyle({ color: customColor[0], durationBase: 1, speed })}
></div>
