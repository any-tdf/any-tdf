<script lang="ts">
	import { resolveLoadingBorderElementClass, resolveLoadingTwoColorClassState, resolveLoadingTwoColorSolidBorderStyle, resolveLoadingTwoColorTransparentBorderDurationStyle } from '@any-tdf/common/derived/loading';

	type Props = { inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingTwoColorClassState({ inverse }));
</script>

<div
	class={resolveLoadingBorderElementClass({ kind: 'nestedSpinnerOuter', size, colorClass: loadingClassState.innerBorderClass })}
	style={resolveLoadingTwoColorTransparentBorderDurationStyle({ color: customColor[1], speed })}
>
	<div class={resolveLoadingBorderElementClass({ kind: 'nestedSpinnerInner', colorClass: loadingClassState.outerBorderClass })} style={resolveLoadingTwoColorSolidBorderStyle(customColor[0])}></div>
</div>
