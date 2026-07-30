<script lang="ts">
	import Tab from './Tab.svelte';
	import type { TabsProps } from '../../types/index.js';
	import { resolveTabsClickAction, resolveTabsDerived, resolveTabsLabelCount, resolveTabsStateOptions } from '@any-tdf/common/derived/tabs';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

	let { tab = {}, duration = 'base', position = 't', active = $bindable(0), transition = true, onchange, children }: TabsProps = $props();
	const clickTabFun = (index: number) => {
		// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
		// Shared action function only returns the active update result; the component writes state and fires events.
		const action = resolveTabsClickAction({ index });
		active = action.nextActive;
		if (action.shouldEmit) onchange?.(action.nextActive);
	};
	let width = $state(resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerWidth }));
	// 输入组件状态，返回框架无关的位置和内容切换派生结果。
	// Receive component state and return framework-agnostic position and transition derivations.
	let tabsState = $derived(
		resolveTabsDerived(
			resolveTabsStateOptions({
				labelCount: resolveTabsLabelCount(tab),
				width,
				active,
				props: { duration, position, transition }
			})
		)
	);
</script>

{#if transition}
	{#if tabsState.positionState.isTop}
		<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
		{#if tabsState.showTransitionViewport}
			<div class={tabsState.viewportClass} bind:clientWidth={width}>
				<div class={tabsState.transitionClass} style={tabsState.transitionStyleString}>
					{#if children}{@render children({ active })}{/if}
				</div>
			</div>
		{:else if children}
			{@render children({ active })}
		{/if}
	{/if}
	{#if tabsState.positionState.isBottom}
		{#if tabsState.showTransitionViewport}
			<div class={tabsState.viewportClass} bind:clientWidth={width}>
				<div class={tabsState.transitionClass} style={tabsState.transitionStyleString}>
					{#if children}{@render children({ active })}{/if}
				</div>
			</div>
		{:else if children}
			{@render children({ active })}
		{/if}
		<Tab {active} {...tab} onclickTab={clickTabFun} />
	{/if}
	{#if tabsState.positionState.isLeft}
		<div class={tabsState.verticalRootClass}>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
			<div class={tabsState.verticalContentClass}>
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
	{/if}
	{#if tabsState.positionState.isRight}
		<div class={tabsState.verticalRootClass}>
			<div class={tabsState.verticalContentClass}>
				{#if children}{@render children({ active })}{/if}
			</div>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
		</div>
	{/if}
{:else}
	{#if tabsState.positionState.isTop}
		<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
		{#if children}{@render children({ active })}{/if}
	{/if}
	{#if tabsState.positionState.isBottom}
		{#if children}{@render children({ active })}{/if}
		<Tab {active} {...tab} onclickTab={clickTabFun} />
	{/if}
	{#if tabsState.positionState.isLeft}
		<div class={tabsState.verticalRootClass}>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
			<div class={tabsState.verticalContentClass}>
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
	{/if}
	{#if tabsState.positionState.isRight}
		<div class={tabsState.verticalRootClass}>
			<div class={tabsState.verticalContentClass}>
				{#if children}{@render children({ active })}{/if}
			</div>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
		</div>
	{/if}
{/if}
