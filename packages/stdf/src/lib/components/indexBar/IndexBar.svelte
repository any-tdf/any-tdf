<script lang="ts" generics="T = string">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF } from '@any-tdf/common/utils';
	import {
		resolveIndexBarDerived,
		resolveIndexBarContentTooShort,
		resolveIndexBarInitialTouchState,
		resolveIndexBarMeasuredHeightsState,
		resolveIndexBarScrollAction,
		resolveIndexBarScrollTop,
		resolveIndexBarTouchEndAction,
		resolveIndexBarTouchSelectAction
	} from '@any-tdf/common/derived/indexBar';
	import type { IndexBarProps } from '../../types/index.js';

	let {
		data = [],
		current = $bindable(0),
		top = 0,
		height = 100,
		radius = '',
		scrollAlign = true,
		titleInjClass = '',
		textInjClass = '',
		children,
		onclickChild
	}: IndexBarProps<T> = $props();

	// 用于绑定 bar 的高度
	// Used to bind the height of the bar
	let barHeight = $state(0);

	// 主体内容高度累计，用于监听滑动
	// The cumulative height of the main content is used to listen to the slide
	let longSumList: number[] = [];

	// 当前滑动的索引
	// Current sliding index
	const initialTouchState = resolveIndexBarInitialTouchState();
	let currentTouch = $state(initialTouchState.currentTouch);

	// 主体内容元素
	// Main body content element
	let bodyDom: HTMLElement | null = $state(null);
	let groupDoms = $state<HTMLDivElement[]>([]);
	let groupHeights = $state<number[]>([]);

	// bar 元素
	// bar element
	let barDom: HTMLDivElement | null = $state(null);

	let isDown = initialTouchState.isDown; // 是否按下 is down

	// 公共派生层处理 IndexBar 几何、class、style 和渲染状态，DOM 滚动与事件留在组件层。
	// Shared derived layer handles IndexBar geometry, classes, styles and render state; DOM scrolling and events stay in the component layer.
	let indexBarState = $derived(
		resolveIndexBarDerived<NonNullable<IndexBarProps<T>['data']>[number]>({
			data,
			current,
			currentTouch,
			radius,
			scrollAlign,
			titleInjClass,
			textInjClass,
			top,
			height,
			barHeight
		})
	);

	const scrollToIndex = (index: number) => {
		if (bodyDom) {
			bodyDom.scrollTop = resolveIndexBarScrollTop({ index, longSumList, heights: groupHeights });
		}
	};

	const syncGroupHeights = () => {
		const measuredState = resolveIndexBarMeasuredHeightsState({
			currentHeights: groupHeights,
			measuredHeights: groupDoms.map((node) => node?.clientHeight ?? 0)
		});
		if (measuredState.shouldUpdate) {
			groupHeights = measuredState.groupHeights;
			longSumList = measuredState.longSumList;
		}
	};

	onMount(() => {
		if (bodyDom) {
			bodyDom.scrollTop = 0;
		}
		// 公共 action 只处理测量结果，DOM 读取和滚动写入留在组件层。
		// Shared action only handles measured values; DOM reads and scroll writes stay in the component layer.
		syncGroupHeights();
		const resizeObserver = new ResizeObserver(syncGroupHeights);
		groupDoms.forEach((node) => resizeObserver.observe(node));
		//如果索引内容区域高度不够，中英文报错
		//If the index content area height is not enough, Chinese and English errors
		if (resolveIndexBarContentTooShort({ height, barHeight })) {
			console.error('[STDF IndexBar error]注意：索引内容区域高度不够。(Note: The height of the index content area is not enough.)');
		}
		return () => resizeObserver.disconnect();
	});

	//bar区域滑动开始
	//Bar area sliding start
	const touchBoxStart = (e: PointerEvent) => {
		const action = resolveIndexBarTouchSelectAction({ clientY: e.clientY, barToTop: indexBarState.barToTop, itemHeight: indexBarState.itemHeight, dataLength: data.length });
		isDown = action.isDown;
		currentTouch = action.currentTouch;
		current = action.currentIndex;
		scrollToIndex(action.scrollIndex);
	};

	// bar 区域滑动中
	// bar area sliding in the middle
	const touchBoxMove = (e: PointerEvent) => {
		if (!isDown) {
			return;
		}
		if (barDom) {
			barDom.setPointerCapture(e.pointerId);
		}
		const action = resolveIndexBarTouchSelectAction({ clientY: e.clientY, barToTop: indexBarState.barToTop, itemHeight: indexBarState.itemHeight, dataLength: data.length });
		currentTouch = action.currentTouch;
		current = action.currentIndex;
		scrollToIndex(action.scrollIndex);
	};

	// bar 区域滑动结束
	// bar area sliding end
	const touchBoxEnd = () => {
		const action = resolveIndexBarTouchEndAction();
		currentTouch = action.currentTouch;
		isDown = action.isDown;
	};

	const handleBarKeydown = (event: KeyboardEvent) => {
		let nextIndex = current;
		if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = Math.min(current + 1, data.length - 1);
		if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = Math.max(current - 1, 0);
		if (event.key === 'Home') nextIndex = 0;
		if (event.key === 'End') nextIndex = Math.max(data.length - 1, 0);
		if (nextIndex === current) return;
		event.preventDefault();
		current = nextIndex;
		scrollToIndex(nextIndex);
	};

	//监听主体内容滚动
	//Listen to the main content scroll
	const scrollBody = () => {
		if (!bodyDom) {
			return;
		}
		const action = resolveIndexBarScrollAction({ scrollTop: bodyDom.scrollTop, longSumList });
		if (action.shouldUpdate) current = action.currentIndex;
	};
</script>

<div bind:this={bodyDom} class={indexBarState.bodyClass} onscroll={scrollBody} style={indexBarState.bodyStyleString}>
	{#each indexBarState.groups as groupState (groupState.index)}
		<div class={groupState.groupClass} bind:this={groupDoms[groupState.index]}>
			<div class={groupState.titleClass}>{groupState.group.title}</div>
			{#each groupState.group.child as child, childIndex (childIndex)}
				<button class={groupState.childClass} onclick={() => onclickChild?.(groupState.index, groupState.group, childIndex, child)}>
					{#if children}
						{@render children(child, childIndex, groupState.group, groupState.index)}
					{:else}
						{child}
					{/if}
				</button>
				<div class={groupState.dividerClass}></div>
			{/each}
		</div>
	{/each}
</div>
<div
	role="listbox"
	aria-label="Index navigation"
	tabindex="0"
	onkeydown={handleBarKeydown}
	onpointerdown={touchBoxStart}
	onpointermove={(e) => throttleWithRAF(touchBoxMove)(e)}
	onpointerup={touchBoxEnd}
	bind:clientHeight={barHeight}
	bind:this={barDom}
	class={indexBarState.barClass}
	style={indexBarState.barStyleString}
>
	{#each indexBarState.barItems as item (item.index)}
		<div class={item.wrapperClass} role="option" aria-selected={current === item.index}>
			<div
				class={item.itemClass}
			>
				{item.group.index}
			</div>
			{#if item.bubbleVisible}
				<div
					class={item.bubbleClass}
					transition:fly={indexBarState.bubbleTransitionParams}
				>
					{item.group.index}
				</div>
			{/if}
		</div>
	{/each}
</div>
