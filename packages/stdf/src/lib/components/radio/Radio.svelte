<script lang="ts">
	import RadioItem from './RadioItem.svelte';
	import type { RadioProps } from '../../types/index.js';
	import { resolveRadioClickAction, resolveRadioDerived, resolveRadioStateOptions } from '@any-tdf/common/derived/radio';

	let {
		data = [],
		value = $bindable(''),
		layout = 'v',
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		radioChild,
		onchange
	}: RadioProps = $props();

	// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
	// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
	let radioState = $derived(
		resolveRadioDerived(
			resolveRadioStateOptions({
				props: { data, layout },
				value
			})
		)
	);

	const clickItemFn = (name: string) => {
		// 公共动作函数只返回下一选中值，组件层负责状态写入和事件触发。
		// Shared action function only returns the next selected value; the component writes state and fires events.
		const action = resolveRadioClickAction({ name });
		value = action.nextValue;
		if (action.shouldEmit) onchange?.(action.nextValue);
	};
</script>

<div class={radioState.groupClass}>
	{#each radioState.itemStates as itemState, index (index)}
		{@const item = itemState.item}
		{#if radioChild}
			{@render radioChild({ item })}
		{:else}
			<RadioItem
				{layout}
				{...item}
				{textPosition}
				{icon}
				{iconChecked}
				checked={itemState.checked}
				onclick={() => clickItemFn(item.name)}
			>
				{item.label}
			</RadioItem>
		{/if}
	{/each}
</div>
