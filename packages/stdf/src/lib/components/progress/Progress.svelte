<script lang="ts">
	import type { ProgressProps } from '../../types/index.js';
	import { resolveProgressDerived, resolveProgressStateOptions } from '@any-tdf/common/derived/progress';

	let {
		percent = 66,
		percentPosition = 'right',
		height = '2',
		radius = '',
		inactive = false,
		overflowPercent = 10,
		duration = '300',
		injClass = '',
		trackInjClass = '',
		children
	}: ProgressProps = $props();

	// 公共派生层只处理 Progress 的 class 字符串、样式值和展示文本，slot 渲染留在组件内。
	// Shared derived layer only handles Progress classes, style values and display text; slot rendering stays in the component.
	let progressState = $derived(
		resolveProgressDerived(
			resolveProgressStateOptions({
				props: { percent, percentPosition, height, radius, inactive, overflowPercent, duration, injClass, trackInjClass },
				hasCustomContent: Boolean(children)
			})
		)
	);
</script>

<div class={progressState.rootClass}>
	<div class={progressState.trackClass}>
		<div
			class={progressState.barClass}
			style={progressState.barStyleString}
		>
			{#if progressState.labelState.showInner}
				<div class={progressState.innerTextClass}>
					{#if progressState.labelState.showCustomContent}
						{@render children?.()}
					{:else if progressState.labelState.showFallbackText}
						{progressState.labelState.text}
					{/if}
				</div>
			{/if}
		</div>
		{#if progressState.labelState.showBlock}
			<div
				class={progressState.blockLabelClass}
				style={progressState.blockLabelStyleString}
			>
				{#if progressState.labelState.showCustomContent}
					{@render children?.()}
				{:else if progressState.labelState.showFallbackText}
					{progressState.labelState.text}
				{/if}
			</div>
		{/if}
	</div>
	{#if progressState.labelState.showRight}
		{#if progressState.labelState.showCustomContent}
			{@render children?.()}
		{:else if progressState.labelState.showFallbackText}
			<div class={progressState.rightLabelClass}>{progressState.labelState.text}</div>
		{/if}
	{/if}
</div>
