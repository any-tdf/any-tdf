<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { ButtonGroupProps } from '../../types/index.js';
	import {
		resolveButtonGroupDerived,
		resolveButtonGroupItemClickAction,
		resolveButtonGroupStateOptions,
	} from '@any-tdf/common/derived/button';

	let {
		items = [],
		fill = 'base',
		state,
		radius = '',
		size = 'big',
		border = 'solid',
		dividerHeight = 'mid',
		heightIn = '3',
		heightOut = '2',
		injClass = '',
		children
	}: ButtonGroupProps = $props();

	// 公共派生层处理 ButtonGroup class 和纯点击决策，回调与 slot 渲染留在组件层。
	// Shared derived layer handles ButtonGroup classes and pure click decisions; callbacks and slot rendering stay in the component layer.
	let buttonGroupState = $derived(
		resolveButtonGroupDerived(
			resolveButtonGroupStateOptions({
				props: { items, fill, state, radius, size, border, dividerHeight, heightIn, heightOut, injClass }
			})
		)
	);

	const clickItemFun = (item: NonNullable<ButtonGroupProps['items']>[number]) => {
		// 公共动作函数只返回点击决策，回调触发留在组件层。
		// Shared action function only returns the click decision; callback execution stays in the component.
		const action = resolveButtonGroupItemClickAction({ disabled: item.disabled });
		if (!action.shouldClick) return;
		item.onclick?.();
	};
</script>

<div class={buttonGroupState.outerClass}>
	<div class={buttonGroupState.innerClass}>
		{#if buttonGroupState.useItems}
			<!-- items 数组模式 -->
			{#each buttonGroupState.itemStates as itemState, index (index)}
				{@const item = itemState.item}
				<button
					class={itemState.itemClass}
					disabled={item.disabled}
					onclick={() => clickItemFun(item)}
				>
					{#if itemState.showLeftIcon}
						<Icon {...item.icon} />
					{/if}
					{#if item.text}
						{item.text}
					{/if}
					{#if itemState.showRightIcon}
						<Icon {...item.icon} />
					{/if}
				</button>
				<!-- 分割线（最后一项后不显示） -->
				{#if itemState.showDivider}
					<div class={itemState.dividerWrapClass}>
						<div class={itemState.dividerClass}></div>
					</div>
				{/if}
			{/each}
		{:else if children}
			<!-- children 自定义模式 -->
			{@render children()}
		{/if}
	</div>
</div>
