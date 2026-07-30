<script lang="ts">
	import type { DividerProps } from '../../types/index.js';
	import { resolveDividerDerived, resolveDividerStateOptions } from '@any-tdf/common/derived/divider';

	let {
		layout = 'h',
		px = '0',
		py = '4',
		text = '',
		align = 'center',
		line = 'solid',
		mx = '1',
		weight = '1',
		injClass = ''
	}: DividerProps = $props();

	// 公共派生层处理 Divider 的 class 和渲染分支，组件层只负责模板绑定。
	// Shared derived layer handles Divider classes and render branches; the component layer only binds templates.
	const dividerState = $derived(resolveDividerDerived(resolveDividerStateOptions({ props: { layout, px, py, text, align, line, mx, weight, injClass } })));
</script>

{#if dividerState.isVertical}
	<div
		class={dividerState.verticalClass}
	></div>
{:else}
	<div class={dividerState.horizontalClass}>
		{#if dividerState.lineVisibility.showLeadingLine}
			<div class={dividerState.lineClass}></div>
		{/if}
		{#if dividerState.lineVisibility.showText}
			<div class={dividerState.textClass}>{text}</div>
		{/if}
		{#if dividerState.lineVisibility.showTrailingLine}
			<div class={dividerState.lineClass}></div>
		{/if}
	</div>
{/if}
