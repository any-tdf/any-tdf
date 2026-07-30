<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { TabProps } from '../../types/index.js';
	import { resolveHiddenScrollbarCss } from '@any-tdf/common/derived/helpers';
	import {
		resolveTabAutoScrollAction,
		resolveTabClickAction,
		resolveTabDerived,
		resolveTabStateOptions
	} from '@any-tdf/common/derived/tabs';

	let {
		labels = [],
		active = $bindable(0),
		lineType = false,
		radius = '',
		duration = 'base',
		layout = 'h',
		love = false,
		injClass = '',
		tabInjClass = '',
		activeTabInjClass = '',
		activeInjClass = '',
		mx = '2',
		overflow = false,
		showNum = 3,
		autoScroll = true,
		onclickTab
	}: TabProps = $props();

	const clickTabFun = (i: number) => {
		// 公共动作函数只返回 active 更新结果，组件层负责状态写入和事件触发。
		// Shared action function only returns the active update result; the component writes state and fires events.
		const action = resolveTabClickAction({ index: i });
		active = action.nextActive;
		if (action.shouldEmit) onclickTab?.(action.nextActive);
	};
	let tabW = $state(0);
	let tabH = $state(0);

	// 溢出模式下的变量
	// variables in overflow mode
	let ofTabW = $state(0);
	let ofTabH = $state(0);
	let ofDom = $state<HTMLDivElement | null>(null);
	let showIndexsOffset = $state(0);
	// 公共派生层统一 Tab 的 class、style、指标和滚动数学，DOM 测量与滚动执行留在组件层。
	// Shared derivation centralizes Tab classes, styles, metrics and scroll math; DOM reads and scroll execution stay in the component layer.
	let tabState = $derived(
		resolveTabDerived(resolveTabStateOptions({
			props: { active, activeInjClass, activeTabInjClass, duration, height: tabH, injClass, labels, layout, lineType, love, mx, overflow, overflowHeight: ofTabH, overflowWidth: ofTabW, radius, showIndexesOffset: showIndexsOffset, showNum, tabInjClass, width: tabW }
		}))
	);
	const css = resolveHiddenScrollbarCss({ selector: '.no-scrollbar' });
	// 监听 active 变化，当 active 变化时，如果 active 不在可视区域内，则滚动 ofDom，使 active 显示在中间
	// listen to the change of active, when active changes, if active is not in the visible area, scroll ofDom to make active display in the middle
	$effect(() => {
		const action = resolveTabAutoScrollAction({ autoScroll, hasScrollElement: Boolean(ofDom), showOverflow: tabState.showOverflow, scrollState: tabState.overflow.autoScrollState });
		if (action.shouldScroll && ofDom) {
			ofDom.scrollLeft = action.scrollLeft;
			if (action.shouldUpdateOffset) {
				showIndexsOffset = action.nextOffset;
			}
		}
	});
</script>

<svelte:head>
	<style>
		{css}
	</style>
</svelte:head>

{#if tabState.showOverflow}
	<div
		bind:clientWidth={ofTabW}
		bind:clientHeight={ofTabH}
		bind:this={ofDom}
		class={tabState.overflow.rootClass}
	>
		{#if tabState.overflow.lineVisible}
			<div class={tabState.lineClass} style={tabState.overflow.lineStyleString}></div>
		{/if}
		<div
			class={tabState.overflow.indicatorClass}
			style={tabState.overflow.indicatorStyleString}
		></div>
		<div class={tabState.overflow.listClass} style={tabState.overflow.listStyleString}>
			{#each tabState.items as itemState (itemState.index)}
				<button
					class={itemState.overflowButtonClass}
					style={itemState.overflowButtonStyleString}
					onclick={() => clickTabFun(itemState.index)}
				>
					{#if itemState.label.icon}
						<div class={tabState.iconClass}>
							<Icon {...itemState.label.icon} />
						</div>
					{/if}
					{#if itemState.label.text}
						<div class={tabState.textClass}>{itemState.label.text}</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{:else}
	<div
		bind:clientWidth={tabW}
		bind:clientHeight={tabH}
		class={tabState.normal.rootClass}
	>
		{#if tabState.normal.lineVisible}
			<div class={tabState.lineClass} style={tabState.normal.lineStyleString}></div>
		{/if}
		<div
			class={tabState.normal.indicatorClass}
			style={tabState.normal.indicatorStyleString}
		></div>
		<div class={tabState.normal.listClass}>
			{#each tabState.items as itemState (itemState.index)}
				<button
					class={itemState.buttonClass}
					onclick={() => clickTabFun(itemState.index)}
				>
					{#if itemState.label.icon}
						<div class={tabState.iconClass}>
							<Icon {...itemState.label.icon} />
						</div>
					{/if}
					{#if itemState.label.text}
						<div class={tabState.textClass}>{itemState.label.text}</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/if}
