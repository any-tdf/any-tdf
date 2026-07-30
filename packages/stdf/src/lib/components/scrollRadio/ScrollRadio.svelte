<script lang="ts">
	import { onMount } from 'svelte';
	import { resolveHiddenScrollbarCss } from '@any-tdf/common/derived/helpers';
	import {
		resolveScrollRadioDerived,
		resolveScrollRadioScrollAction,
		resolveScrollRadioStateOptions,
	} from '@any-tdf/common/derived/scrollRadio';

	type Props = {
		data?: Record<string, string>[];
		showRow?: 3 | 5 | 7;
		initIndex?: number;
		labelKey?: string;
		autoScrollToLast?: boolean;
		useAnimation?: boolean;
		lastSelectedIndex?: number;
		align?: 'center' | 'left' | 'right';
		onscrollEnd?: (index: number, isTouch: boolean) => void;
		onscrolling?: (index: number) => void;
	};
	let {
		data = [],
		showRow = 5,
		initIndex = 0,
		labelKey = 'label',
		autoScrollToLast = true,
		useAnimation = true,
		lastSelectedIndex = 0,
		align = 'center',
		onscrollEnd,
		onscrolling
	}: Props = $props();

	// 是否触摸
	// Whether to touch
	let isTouch = $state(false);

	// 公共派生层处理 ScrollRadio 的列表布局和滚动数学，DOM 监听留在组件层。
	// Shared derived layer handles ScrollRadio list layout and scroll math; DOM listeners stay in the component layer.
	let scrollRadioState = $derived(
		resolveScrollRadioDerived(
			resolveScrollRadioStateOptions({
				props: { data, labelKey, showRow, autoScrollToLast, useAnimation, initIndex, align },
				lastSelectedIndex
			})
		)
	);
	const css = resolveHiddenScrollbarCss({ selector: '.picker-contents' });

	// 滚动元素
	// Scroll element
	let scrollElement = $state<HTMLDivElement | null>(null);

	// 当前选中项索引
	// Current selected item index
	let currentIndex = 0;
	onMount(() => {
		if (scrollElement) {
			// 监听 scrollElement 的滚动事件，同时考虑节流，滚动结束时，计算当前最中间的元素的索引
			// Listen to the scroll event of scrollElement, and consider throttling at the same time. The index of the element in the middle is calculated when the scroll ends
			let scrollTimer: ReturnType<typeof setTimeout>;
			scrollElement.addEventListener('scroll', (e: Event) => {
				// 滚动过程中实时计算当前索引
				// Calculate current index in real-time during scrolling
				const scrollTop = (e.target as HTMLElement)?.scrollTop;
				const scrollAction = resolveScrollRadioScrollAction({ scrollTop, itemHeight: scrollRadioState.itemHeight, isTouch });
				onscrolling?.(scrollAction.scrollingIndex);

				if (scrollTimer) clearTimeout(scrollTimer);
				scrollTimer = setTimeout(() => {
					currentIndex = scrollAction.scrollEndIndex;
					onscrollEnd?.(currentIndex, scrollAction.wasTouch);
				});
			});
		}
	});
	$effect(() => {
		if (scrollElement) {
			scrollElement.scrollTop = scrollRadioState.scrollTop;
		}
	});
</script>

<svelte:head>
	<style>
		{css}
	</style>
</svelte:head>

<div class={scrollRadioState.rootClass} style={scrollRadioState.wrapperStyleString}>
	<div
		class={scrollRadioState.scrollClass}
		style={scrollRadioState.wrapperStyleString}
		bind:this={scrollElement}
		onscroll={() => {
			isTouch = true;
		}}
	>
		{#each scrollRadioState.paddedData as item, index (index)}
			<div class={scrollRadioState.itemClass} style={scrollRadioState.itemStyleString}>
				<div class={scrollRadioState.labelClass}>{item[labelKey]}</div>
			</div>
		{/each}
		<div
			class={scrollRadioState.maskLayerClass}
			style={scrollRadioState.wrapperStyleString}
		>
			<div
				class={scrollRadioState.topMaskClass}
				style={scrollRadioState.maskStyleString}
			></div>
			<div class={scrollRadioState.highlightClass} style={scrollRadioState.itemStyleString}></div>
			<div
				class={scrollRadioState.bottomMaskClass}
				style={scrollRadioState.maskStyleString}
			></div>
		</div>
	</div>
</div>
