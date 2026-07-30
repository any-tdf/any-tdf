<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { AccordionProps } from '../../types/index.js';
	import Icon from '../icon/Icon.svelte';
	import SvgIcon from '../utils/SvgIcon.svelte';
	import {
		resolveAccordionDerived,
		resolveAccordionStateOptions,
		resolveAccordionToggleAction
	} from '@any-tdf/common/derived/accordion';
	import { accordionArrowRightSvg, accordionPlusSvg } from '@any-tdf/common/svg/common';

	let {
		items = [],
		activeIndex = $bindable<number | number[] | undefined>(undefined),
		multiple = false,
		radius = 'md',
		border = 'solid',
		divider = true,
		expandIcon = 'arrow',
		iconPosition = 'right',
		transitionDuration = 300,
		injClass = '',
		titleClass = '',
		contentClass = '',
		children,
		onchange
	}: AccordionProps = $props();

	// 输入组件状态，返回框架无关的展开视图、class 和动画参数派生结果。
	// Receive component state and return framework-agnostic expanded views, classes and motion params.
	const accordionState = $derived(resolveAccordionDerived(resolveAccordionStateOptions({
		activeIndex,
		props: { border, contentClass, divider, expandIcon, iconPosition, injClass, items, multiple, radius, titleClass, transitionDuration }
	})));

	// 切换展开/折叠
	// Toggle expand/collapse
	const toggle = (index: number) => {
		const item = items[index];
		const action = resolveAccordionToggleAction({ activeIndex, index, multiple, disabled: item?.disabled });
		if (!action.shouldToggle) return;
		activeIndex = action.nextActive;
		onchange?.(action.nextActive);
	};
</script>

<div class={accordionState.rootClass}>
	{#each accordionState.itemViewStates as itemViewState (itemViewState.index)}
		{@const item = itemViewState.item}
		{@const index = itemViewState.index}
		{@const iconState = itemViewState.iconState}
		<div class={itemViewState.dividerClass}>
			<!-- 标题区域 Title area -->
			<button
				type="button"
				class={itemViewState.buttonClass}
				onclick={() => toggle(index)}
				disabled={item.disabled}
			>
				<div class={itemViewState.titleClass}>
					{#if item.icon}
						<Icon {...item.icon} />
					{/if}
					<span class={accordionState.titleTextClass}>{item.title}</span>
				</div>
				{#if iconState.shouldRender}
					<span class={iconState.wrapClass}>
						<!-- 公共 SVG 数据在 common，框架渲染留在组件内。 -->
						<!-- Shared SVG data lives in common, while framework rendering stays here. -->
						{#if iconState.kind === 'arrow'}
							<SvgIcon svg={accordionArrowRightSvg} class={iconState.iconClass} />
						{:else if iconState.kind === 'plus'}
							<SvgIcon svg={accordionPlusSvg} class={iconState.iconClass} />
						{/if}
					</span>
				{/if}
			</button>

			<!-- 内容区域 Content area -->
			{#if itemViewState.expanded}
				<div class={accordionState.panelClass} transition:slide={accordionState.slideParams}>
					<div class={accordionState.contentClass}>
						{#if children}
							{@render children(item, index)}
						{:else if item.content}
							{item.content}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
