<script lang="ts">
	import { resolveLoadingLayoutClass, resolveLoadingBorderElementClass, resolveLoadingBorderTransparentDurationStyle, resolveLoadingBorderCapStyle, resolveLoadingOneColorClassState } from '@any-tdf/common/derived/loading';
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const loadingClassState = $derived(resolveLoadingOneColorClassState({ theme, inverse }));
</script>

<div class={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
	<div
		class={resolveLoadingBorderElementClass({ kind: 'splitSpinnerRing', className: 'relative', size: 'h-8 w-8', colorClass: loadingClassState.borderClass })}
		style={resolveLoadingBorderTransparentDurationStyle({ color: customColor[0], durationBase: 1, speed, transparentSides: ['border-top-color', 'border-bottom-color'] })}
	>
		<div
			class={resolveLoadingBorderElementClass({ kind: 'borderCapStart', colorClass: loadingClassState.borderClass })}
			style={resolveLoadingBorderCapStyle({ color: customColor[0], rotate: 225 })}
		></div>
		<div
			class={resolveLoadingBorderElementClass({ kind: 'borderCapEnd', colorClass: loadingClassState.borderClass })}
			style={resolveLoadingBorderCapStyle({ color: customColor[0], rotate: 45 })}
		></div>
	</div>
</div>
