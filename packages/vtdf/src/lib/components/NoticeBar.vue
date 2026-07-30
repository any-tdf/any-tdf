<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import type { NoticeBarProps } from '../types';
import {
	resolveNoticeBarAnimationSetupAction,
	resolveNoticeBarCloseDelayState,
	resolveNoticeBarCloseRequestAction,
	resolveNoticeBarDerived,
	resolveNoticeBarHorizontalStepAction,
	resolveNoticeBarMeasuredRect,
	resolveNoticeBarMeasuredRectVisible,
	resolveNoticeBarStateOptions,
	resolveNoticeBarVerticalStepAction
} from '@any-tdf/common/derived/noticeBar';
import { arrowRightSvg, closeSvg, volumeSvg } from '@any-tdf/common/svg/common';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<NoticeBarProps & {}>(), {
	textList: () => [],
	leftIcon: 'volume',
	rightIcon: 'close',
	space: 100,
	speed: 30,
	vertical: false,
	duration: 500,
	interval: 4,
	injClass: '',
	radius: ''
});

const isShow = ref(true);
const isShowClose = ref(true);
const slots = useSlots();
const currentIndex = ref(0);
const isTransition = ref(true);
const outBoxWidth = ref(0);
const outBoxHeight = ref(0);
const left = ref(props.speed);
const newTextListState = ref<string[] | null>(null);
const boxRef = ref<HTMLDivElement | null>(null);
const outBoxRef = ref<HTMLDivElement | null>(null);
let rafId: number | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let resetTimer: ReturnType<typeof setTimeout> | null = null;

// 公共派生层处理 NoticeBar 的 class、图标状态、文本列表和滚动 item，计时器与 DOM 测量留在组件层。
// Shared derived layer handles NoticeBar classes, icon state, text lists and scroll items; timers and DOM reads stay in the component layer.
const noticeBarState = computed(() =>
	resolveNoticeBarDerived(
		resolveNoticeBarStateOptions({
			props: {
				textList: props.textList,
				duration: props.duration,
				space: props.space,
				rightIcon: props.rightIcon,
				leftIcon: props.leftIcon,
				injClass: props.injClass,
				radius: props.radius
			},
			newTextListState: newTextListState.value,
			currentIndex: currentIndex.value,
			isTransition: isTransition.value,
			outBoxHeight: outBoxHeight.value,
			outBoxWidth: outBoxWidth.value,
			left: left.value,
			isShow: isShow.value,
			hasLeftChild: Boolean(slots.leftChild),
			hasCustomChild: Boolean(slots.rightChild)
		})
	)
);

const clearTimers = () => {
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
	if (intervalId !== null) {
		clearInterval(intervalId);
		intervalId = null;
	}
	if (resetTimer !== null) {
		clearTimeout(resetTimer);
		resetTimer = null;
	}
};

const handleRightClick = () => {};

const handleRightAction = () => {
	// 公共 action 返回关闭状态和延迟卸载决策，组件层只负责写状态和安排 timer。
	// Shared action returns close visibility and delayed-unmount decisions; the component layer only writes state and schedules the timer.
	const action = resolveNoticeBarCloseRequestAction(props.rightIcon);
	isShow.value = action.isShow;
	isShowClose.value = action.isShowClose;
	if (action.shouldScheduleClose) {
		setTimeout(() => {
			const delayState = resolveNoticeBarCloseDelayState();
			isShow.value = delayState.isShow;
			isShowClose.value = delayState.isShowClose;
		}, action.closeDelayMs);
	}
	handleRightClick();
};

const runAnimation = async () => {
	clearTimers();
	newTextListState.value = null;
	left.value = props.speed;
	currentIndex.value = 0;
	isTransition.value = true;

	if (!noticeBarState.value.textListValidation.shouldAnimate) return;

	await nextTick();
	const outBoxSize = resolveNoticeBarMeasuredRect(outBoxRef.value?.getBoundingClientRect());
	if (resolveNoticeBarMeasuredRectVisible(outBoxSize)) {
		outBoxWidth.value = outBoxSize.width;
		outBoxHeight.value = outBoxSize.height;
	}
	const boxWidth = resolveNoticeBarMeasuredRect(boxRef.value?.getBoundingClientRect()).width;
	// 公共 setup action 只决定启动分支，DOM 测量和 timer 执行留在组件层。
	// Shared setup action only decides the startup branch; DOM measurement and timers stay in the component layer.
	const setupAction = resolveNoticeBarAnimationSetupAction({
		boxWidth,
		outBoxWidth: outBoxSize.width,
		outBoxHeight: outBoxSize.height,
		shouldAnimate: noticeBarState.value.textListValidation.shouldAnimate,
		space: props.space,
		speed: props.speed,
		textList: props.textList,
		vertical: props.vertical
	});
	outBoxWidth.value = setupAction.outBoxWidth;
	outBoxHeight.value = setupAction.outBoxHeight;
	newTextListState.value = setupAction.newTextListState;
	left.value = setupAction.left;
	currentIndex.value = setupAction.currentIndex;
	isTransition.value = setupAction.isTransition;

	if (!setupAction.shouldRun) return;

	if (setupAction.shouldStartVertical) {
		intervalId = setInterval(() => {
			const action = resolveNoticeBarVerticalStepAction({
				currentIndex: currentIndex.value,
				textLength: noticeBarState.value.textListVertical.length
			});
			isTransition.value = action.nextTransition;
			if (action.shouldScheduleReset) {
				currentIndex.value = action.nextIndex;
				if (resetTimer) clearTimeout(resetTimer);
				resetTimer = setTimeout(() => {
					currentIndex.value = action.resetIndex;
					isTransition.value = action.resetTransition;
				}, props.duration);
				return;
			}
			currentIndex.value = action.nextIndex;
		}, props.interval * 1000);
		return;
	}

	if (!setupAction.shouldStartHorizontal) return;
	let startTime = 0;
	const step = (time: number) => {
		// 公共 action 只计算帧偏移，动画帧调度留在组件内。
		// Shared action only calculates frame offset; animation frame scheduling stays in the component layer.
		const action = resolveNoticeBarHorizontalStepAction({
			left: left.value,
			speed: props.speed,
			time,
			startTime,
			boxWidth,
			firstFrameZero: true
		});
		startTime = action.nextStartTime;
		left.value = action.nextLeft;
		rafId = requestAnimationFrame(step);
	};
	rafId = requestAnimationFrame(step);
};

watch(() => [props.textList, props.vertical, props.space, props.speed, props.interval, props.duration], runAnimation, { deep: true });

onMounted(() => {
	runAnimation();
	window.addEventListener('resize', runAnimation);
});

onBeforeUnmount(() => {
	clearTimers();
	window.removeEventListener('resize', runAnimation);
});
</script>

<template>
	<div v-if="isShowClose" :class="noticeBarState.rootClass">
		<div :class="noticeBarState.leftIconClass">
			<slot v-if="noticeBarState.leftIconState.kind === 'child'" name="leftChild" />
			<!-- 公共 SVG 数据在 common 中维护，组件层只负责渲染。 / Shared SVG data lives in common, the component layer only renders it. -->
			<SvgIcon
				v-else-if="noticeBarState.leftIconState.kind === 'volume'"
				:svg="volumeSvg"
				width="20"
				height="20"
				:class-name="noticeBarState.iconClass"
			/>
			<Icon
				v-else-if="noticeBarState.leftIconState.kind === 'icon'"
				v-bind="noticeBarState.leftIconState.iconProps as Record<string, unknown>"
			/>
		</div>

		<div v-if="vertical" ref="outBoxRef" :class="noticeBarState.verticalViewportClass">
			<div :class="noticeBarState.verticalInnerClass" :style="noticeBarState.heightStyle">
				<div v-for="item in noticeBarState.verticalItems" :key="`${item.text}-${item.index}`" :class="item.className" :style="item.style">
					{{ item.text }}
				</div>
			</div>
		</div>
		<div v-else ref="outBoxRef" :class="noticeBarState.horizontalViewportClass">
			<div ref="boxRef" :class="noticeBarState.horizontalTrackClass" :style="noticeBarState.horizontalTrackStyle">
				<div v-for="item in noticeBarState.horizontalItems" :key="`${item.text}-${item.index}`" :class="item.className" :style="item.style">
					{{ item.text }}
				</div>
			</div>
		</div>

		<button type="button" :class="noticeBarState.rightButtonClass" @click="handleRightAction">
			<slot v-if="noticeBarState.rightIconState.kind === 'custom'" name="rightChild" />
			<SvgIcon
				v-else-if="noticeBarState.rightIconState.kind === 'close'"
				:svg="closeSvg"
				width="20"
				height="20"
				:class-name="noticeBarState.iconClass"
			/>
			<SvgIcon
				v-else-if="noticeBarState.rightIconState.kind === 'arrow'"
				:svg="arrowRightSvg"
				width="20"
				height="20"
				:class-name="noticeBarState.arrowIconClass"
			/>
		</button>
	</div>
</template>
