<script lang="ts">
	import CheckboxItem from './CheckboxItem.svelte';
	import type { CheckboxProps } from '../../types/index.js';
	import { resolveCheckboxClickAction, resolveCheckboxDerived, resolveCheckboxStateOptions } from '@any-tdf/common/derived/checkbox';

	let {
		data = [],
		layout = 'v',
		checkeds = $bindable([]),
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		checkboxChild,
		onchange
	}: CheckboxProps = $props();

	// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
	// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
	let checkboxState = $derived(
		resolveCheckboxDerived(
			resolveCheckboxStateOptions({
				props: { data, layout },
				checkeds
			})
		)
	);

	const clickItemFn = (name: string) => {
		// 公共动作函数只返回下一组选中值，组件层负责状态写入和事件触发。
		// Shared action function only returns next checked values; the component writes state and fires events.
		const action = resolveCheckboxClickAction({ checkeds, name });
		checkeds = action.nextCheckeds;
		if (action.shouldEmit) onchange?.(action.nextCheckeds);
	};
</script>

<div class={checkboxState.groupClass}>
	{#each checkboxState.itemStates as itemState, index (index)}
		{@const item = itemState.item}
		{#if checkboxChild}
			{@render checkboxChild({ item })}
		{:else}
			<CheckboxItem {layout} {...item} {textPosition} {icon} {iconChecked} checked={itemState.checked} onclick={clickItemFn}>
				{item.label}
			</CheckboxItem>
		{/if}
	{/each}
</div>
