<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import type { CheckboxItemProps } from '../../types/index.js';
	import { checkboxCheckedSvg, checkboxUncheckedSvg } from '@any-tdf/common/svg/common';
	import { resolveSelectionItemRenderState } from '@any-tdf/common/derived/selection';

	let {
		name = '',
		layout = 'v',
		checked = false,
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		children,
		onclick
	}: CheckboxItemProps = $props();

	// 公共派生层只处理选择项可见性和 class，点击事件留在组件层。
	// Shared derivation only handles selection item visibility and classes; click events stay in the component layer.
	let itemState = $derived(resolveSelectionItemRenderState({ layout, textPosition, icon, iconChecked, checked }));

	// 点击选项事件
	// Click option event
	const clickRadioFun = () => {
		onclick?.(name);
	};
</script>

<button
	onclick={() => clickRadioFun()}
	class={itemState.itemClass}
>
	{#if itemState.showLeadingLabel}
		<div class={itemState.leadingLabelClass}>
			{@render children?.()}
			{#if itemState.showDivider}
				<div class={itemState.dividerClass}></div>
			{/if}
		</div>
	{/if}
	<div class={itemState.checkedIconClass}>
		{#if itemState.checkedIconState.kind === 'none'}{:else if itemState.checkedIconState.kind === 'default'}
			<!-- 公共 SVG 数据在 common，选中态和事件仍保留在 CheckboxItem。 -->
			<!-- Shared SVG data lives in common, while checked state and events stay in CheckboxItem. -->
			<SvgIcon svg={checkboxCheckedSvg} width="24" height="24" class={itemState.checkedSvgClass} />
		{:else if itemState.checkedIconProps}
			<Icon {...itemState.checkedIconProps} state="theme" />
		{/if}
	</div>
	<div class={itemState.uncheckedIconClass}>
		{#if itemState.uncheckedIconState.kind === 'none'}{:else if itemState.uncheckedIconState.kind === 'default'}
			<SvgIcon svg={checkboxUncheckedSvg} width="24" height="24" class={itemState.uncheckedSvgClass} />
		{:else if itemState.uncheckedIconProps}
			<Icon opacity={0.2} {...itemState.uncheckedIconProps} />
		{/if}
	</div>
	{#if itemState.showTrailingLabel}
		<div class={itemState.trailingLabelClass}>
			{@render children?.()}
		</div>
	{/if}
</button>
