<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NoticeBarProps } from '../../types/index.js';
	import {
		resolveNoticeBarAnimationSetupAction,
		resolveNoticeBarCloseDelayState,
		resolveNoticeBarCloseRequestAction,
		resolveNoticeBarDerived,
		resolveNoticeBarHorizontalStepAction,
		resolveNoticeBarMeasuredRect,
		resolveNoticeBarStateOptions,
		resolveNoticeBarVerticalStepAction,
	} from '@any-tdf/common/derived/noticeBar';
	import { arrowRightSvg, closeSvg, volumeSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	let {
		textList = [],
		leftIcon = 'volume',
		rightIcon = 'close',
		space = 100,
		speed = 30,
		vertical = false,
		duration = 500,
		interval = 4,
		injClass = '',
		radius = '',
		leftChild,
		rightChild,
		onclickRight
	}: NoticeBarProps = $props();

	let left = $state(0);
	$effect(() => {
		left = speed;
	});
	let boxDom = $state<HTMLDivElement | null>(null);
	let outBoxDom = $state<HTMLDivElement | null>(null);
	let boxWidth = $state(0);
	let outBoxWidth = $state(0);
	let outBoxHeight = $state(0);
	let requestAnimationFrameFlag = $state<number | undefined>(undefined);
	let startTime = 0;
	let fps = 0;

	//垂直滚动时的处理
	//Processing when scrolling vertically
	let times: ReturnType<typeof setInterval>;
	let currentIndex = $state(0);
	let isTransition = $state(true);
	let newTextListState = $state<string[] | null>(null);
	let isShow = $state(true);
	let isShowClose = $state(true);

	// 公共派生层处理 NoticeBar 的 class、图标状态、文本列表和滚动 item，计时器与 DOM 测量留在组件层。
	// Shared derived layer handles NoticeBar classes, icon state, text lists and scroll items; timers and DOM reads stay in the component layer.
	let noticeBarState = $derived(
		resolveNoticeBarDerived(
			resolveNoticeBarStateOptions({
				props: { textList, duration, space, rightIcon, leftIcon, injClass, radius },
				newTextListState,
				currentIndex,
				isTransition,
				outBoxHeight,
				outBoxWidth,
				left,
				isShow,
				hasLeftChild: Boolean(leftChild),
				hasCustomChild: Boolean(rightChild)
			})
		)
	);

	// 如果 textList 不是数组给出中英文报错
	// If textList is not an array, give Chinese and English error
	$effect(() => {
		if (noticeBarState.textListValidation.isInvalidType) {
			console.error('[STDF NoticeBar error]textList 必须是数组。(textList must be an array.)');
		}

		// 如果 textList 为空数组给出中英文报错
		// If textList is an empty array, give Chinese and English error
		if (noticeBarState.textListValidation.isEmpty) {
			console.error('[STDF NoticeBar error]textList must not be empty.');
		}
	});

	const stepFun = (time: number) => {
		// 公共 action 只计算帧偏移，动画帧调度留在组件内。
		// Shared action only calculates frame offset; animation frame scheduling stays in the component.
		const action = resolveNoticeBarHorizontalStepAction({ left, speed, time, startTime, boxWidth });
		fps = action.frameMs;
		startTime = action.nextStartTime;
		left = action.nextLeft;
		requestAnimationFrameFlag = requestAnimationFrame(stepFun);
	};
	onMount(() => {
		if (!vertical) {
			boxWidth = resolveNoticeBarMeasuredRect(boxDom?.getBoundingClientRect()).width;
		}
		const outBoxSize = resolveNoticeBarMeasuredRect(outBoxDom?.getBoundingClientRect());
		outBoxWidth = outBoxSize.width;
		outBoxHeight = outBoxSize.height;
		// 公共 setup action 只决定启动分支，DOM 测量和 timer 执行留在组件层。
		// Shared setup action only decides the startup branch; DOM measurement and timers stay in the component layer.
		const setupAction = resolveNoticeBarAnimationSetupAction({
			boxWidth,
			outBoxWidth,
			outBoxHeight,
			shouldAnimate: noticeBarState.textListValidation.shouldAnimate,
			space,
			speed,
			textList,
			vertical
		});
		newTextListState = setupAction.newTextListState;
		left = setupAction.left;
		currentIndex = setupAction.currentIndex;
		isTransition = setupAction.isTransition;
		if (!setupAction.shouldRun) {
			return;
		}
		if (setupAction.shouldStartHorizontal) {
			requestAnimationFrameFlag = requestAnimationFrame(stepFun);
		}
		if (setupAction.shouldStartVertical) {
			times = setInterval(() => {
				const action = resolveNoticeBarVerticalStepAction({ currentIndex, textLength: noticeBarState.textListVertical.length });
				currentIndex = action.nextIndex;
				if (action.shouldScheduleReset) {
					setTimeout(() => {
						currentIndex = action.resetIndex;
						isTransition = action.resetTransition;
					}, duration);
				} else {
					isTransition = action.nextTransition;
				}
			}, interval * 1000);
		}
		return () => {
			if (vertical && times !== null) {
				clearInterval(times);
			} else if (requestAnimationFrameFlag) {
				cancelAnimationFrame(requestAnimationFrameFlag);
			}
		};
	});
	const clickFun = () => {
		// 公共 action 返回关闭状态和延迟卸载决策，组件层只负责写状态和安排 timer。
		// Shared action returns close visibility and delayed-unmount decisions; the component layer only writes state and schedules the timer.
		const action = resolveNoticeBarCloseRequestAction(rightIcon);
		isShow = action.isShow;
		isShowClose = action.isShowClose;
		if (action.shouldScheduleClose) {
			setTimeout(() => {
				const delayState = resolveNoticeBarCloseDelayState();
				isShow = delayState.isShow;
				isShowClose = delayState.isShowClose;
			}, action.closeDelayMs);
		}
		onclickRight?.();
	};
</script>

{#if isShowClose}
	<div
		class={noticeBarState.rootClass}
	>
		<div class={noticeBarState.leftIconClass}>
			{#if noticeBarState.leftIconState.kind === 'child'}
				{@render leftChild?.()}
			{:else if noticeBarState.leftIconState.kind === 'volume'}
				<!-- 公共 SVG 数据在 common 中维护，组件层只负责渲染。 / Shared SVG data lives in common, the component layer only renders it. -->
				<SvgIcon svg={volumeSvg} width="20" height="20" class={noticeBarState.iconClass} />
			{:else if noticeBarState.leftIconState.kind === 'icon'}
				<Icon {...noticeBarState.leftIconState.iconProps} />
			{:else}{/if}
		</div>
		{#if vertical}
			<div class={noticeBarState.verticalViewportClass} bind:this={outBoxDom}>
				<div class={noticeBarState.verticalInnerClass} style={noticeBarState.heightStyleString}>
					{#each noticeBarState.verticalItems as item (item.index)}
						<div
							class={item.className}
							style={item.styleString}
						>
							{item.text}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class={noticeBarState.horizontalViewportClass} bind:this={outBoxDom}>
				<div class={noticeBarState.horizontalTrackClass} style={noticeBarState.horizontalTrackStyleString} bind:this={boxDom}>
					{#each noticeBarState.horizontalItems as item (item.index)}
						<div class={item.className} style={item.styleString}>{item.text}</div>
					{/each}
				</div>
			</div>
		{/if}
		<button class={noticeBarState.rightButtonClass} onclick={clickFun}>
			{#if noticeBarState.rightIconState.kind === 'custom'}
				{@render rightChild?.()}
			{:else if noticeBarState.rightIconState.kind === 'close'}
				<SvgIcon svg={closeSvg} width="20" height="20" class={noticeBarState.iconClass} />
			{:else if noticeBarState.rightIconState.kind === 'arrow'}
				<SvgIcon svg={arrowRightSvg} width="20" height="20" class={noticeBarState.arrowIconClass} />
			{/if}
		</button>
	</div>
{/if}
