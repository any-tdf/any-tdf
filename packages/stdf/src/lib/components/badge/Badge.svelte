<script lang="ts">
	import type { BadgeProps } from '../../types/index.js';
	import { resolveBadgeDerived, resolveBadgeStateOptions } from '@any-tdf/common/derived/badge';

	let {
		text = '',
		radius = '',
		isLeft = false,
		isShow = true,
		offsetY = 0,
		offsetX = 0,
		isInner = false,
		injClass = '',
		children
	}: BadgeProps = $props();

	// 公共派生层只接收 Badge 状态，组件层只负责模板绑定。
	// The shared derived layer receives Badge state; the component layer only binds the template.
	const badgeState = $derived(
		resolveBadgeDerived(
			resolveBadgeStateOptions({
				props: { text, radius, isLeft, isShow, offsetY, offsetX, isInner, injClass }
			})
		)
	);
</script>

{#if badgeState.isInner}
	<div
		class={badgeState.classes.innerClass}
		style={badgeState.innerStyleString}
	>
		{text}
	</div>
{:else}
	<div class={badgeState.classes.wrapperClass}>
		{@render children?.()}
		<div
			class={badgeState.classes.outerClass}
			style={badgeState.outerStyleString}
		>
			{text}
		</div>
	</div>
{/if}
