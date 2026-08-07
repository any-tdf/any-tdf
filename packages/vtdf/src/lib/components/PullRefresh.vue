<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, watch } from 'vue';
import type { PullRefreshChangeDetail, PullRefreshProps, PullRefreshStatus } from '../types';
import Loading from './Loading.vue';
import { useConfig } from './adapter/config';
import { zh_CN } from '../lang';
import { getScrollElement, getScrollMetrics } from './adapter/scroll';
import {
	pullRefreshDefaultTexts,
	resolvePullRefreshCanStart,
	resolvePullRefreshChangeDetail,
	resolvePullRefreshCompletionAction,
	resolvePullRefreshDerived,
	resolvePullRefreshDistance,
	resolvePullRefreshGestureIntent,
	resolvePullRefreshGestureLock,
	resolvePullRefreshReleaseAction,
	type PullRefreshGestureLock
} from '@any-tdf/common/derived/pullRefresh';

const props = withDefaults(defineProps<PullRefreshProps>(), {
	refreshing: false,
	disabled: false,
	headHeight: 50,
	threshold: 60,
	pullFactor: 1,
	maxDistance: 0,
	successDuration: 500,
	animationDuration: 300,
	pullingText: undefined,
	canReleaseText: undefined,
	refreshingText: undefined,
	successText: undefined,
	loadingIcon: undefined,
	scrollTarget: null,
	injClass: '',
	headClass: '',
	contentClass: ''
});

const emit = defineEmits<{
	refresh: [];
	change: [detail: PullRefreshChangeDetail];
}>();

const config = useConfig();
const slots = useSlots();
const rootRef = ref<HTMLDivElement | null>(null);
const defaultLoadingIcon: NonNullable<PullRefreshProps['loadingIcon']> = {
	type: '1_0',
	height: '4',
	width: '4',
	theme: true
};
const distance = ref(0);
const status = ref<PullRefreshStatus>('normal');
const wasRefreshing = ref(props.refreshing);
let startX = 0;
let startY = 0;
let canPull = false;
let gestureLock: PullRefreshGestureLock = 'none';
let mouseDragging = false;
let successTimer: ReturnType<typeof setTimeout> | null = null;

const textState = computed(() => {
	const lang = config.locale.pullRefresh || zh_CN.pullRefresh || pullRefreshDefaultTexts;
	return {
		pullingText: props.pullingText ?? lang.pullingText,
		canReleaseText: props.canReleaseText ?? lang.canReleaseText,
		refreshingText: props.refreshingText ?? lang.refreshingText,
		successText: props.successText ?? lang.successText
	};
});

const pullRefreshState = computed(() =>
	resolvePullRefreshDerived({
		animationDuration: props.animationDuration,
		canReleaseText: textState.value.canReleaseText,
		contentClass: props.contentClass,
		disabled: props.disabled,
		distance: distance.value,
		headClass: props.headClass,
		headHeight: props.headHeight,
		injClass: props.injClass,
		pullingText: textState.value.pullingText,
		refreshing: props.refreshing,
		refreshingText: textState.value.refreshingText,
		status: status.value,
		successText: textState.value.successText,
		threshold: props.threshold
	})
);

const detail = computed(() =>
	resolvePullRefreshChangeDetail({
		status: pullRefreshState.value.status,
		distance: pullRefreshState.value.distance,
		threshold: props.threshold
	})
);
const loadingIconState = computed(() => (props.loadingIcon === null ? null : { ...defaultLoadingIcon, ...props.loadingIcon }));
const currentSlot = computed(() => {
	if (pullRefreshState.value.status === 'success') return slots.successChild;
	if (pullRefreshState.value.status === 'refreshing') return slots.refreshingChild;
	if (pullRefreshState.value.status === 'canRelease') return slots.canReleaseChild;
	if (pullRefreshState.value.status === 'pulling') return slots.pullingChild;
	return slots.normalChild;
});

const emitChange = (nextStatus: PullRefreshStatus, nextDistance: number) => {
	emit(
		'change',
		resolvePullRefreshChangeDetail({
			status: nextStatus,
			distance: nextDistance,
			threshold: props.threshold
		})
	);
};

const clearSuccessTimer = () => {
	if (!successTimer) return;
	clearTimeout(successTimer);
	successTimer = null;
};

watch(
	() => props.refreshing,
	(value) => {
		if (value) {
			clearSuccessTimer();
			wasRefreshing.value = true;
			distance.value = props.headHeight;
			status.value = 'refreshing';
			emitChange('refreshing', props.headHeight);
			return;
		}
		if (wasRefreshing.value) {
			wasRefreshing.value = false;
			const action = resolvePullRefreshCompletionAction({
				headHeight: props.headHeight,
				showSuccess: Boolean(textState.value.successText)
			});
			distance.value = action.nextDistance;
			status.value = action.nextStatus;
			emitChange(action.nextStatus, action.nextDistance);
			clearSuccessTimer();
			successTimer = setTimeout(() => {
				distance.value = 0;
				status.value = 'normal';
				emitChange('normal', 0);
			}, props.successDuration);
		}
	}
);

const startGesture = (clientX: number, clientY: number) => {
	const scrollElement = getScrollElement(props.scrollTarget, rootRef.value);
	canPull = resolvePullRefreshCanStart({
		disabled: props.disabled,
		refreshing: props.refreshing,
		scrollTop: getScrollMetrics(scrollElement).scrollTop
	});
	gestureLock = 'none';
	startX = clientX;
	startY = clientY;
};

const moveGesture = (clientX: number, clientY: number, preventDefault: () => void) => {
	if (!canPull) return;
	const intent = resolvePullRefreshGestureIntent({ currentX: clientX, currentY: clientY, startX, startY });
	gestureLock = resolvePullRefreshGestureLock({ current: gestureLock, deltaX: intent.deltaX, deltaY: intent.deltaY });
	if (gestureLock !== 'vertical') return;
	if (intent.deltaY <= 0) {
		// 回拖超过起点时取消下拉，并把滚动交还给原生容器
		// Dragging back past the start point cancels the pull and hands scrolling back to the native container
		if (distance.value !== 0 || status.value !== 'normal') {
			distance.value = 0;
			status.value = 'normal';
			emitChange('normal', 0);
		}
		return;
	}
	preventDefault();
	const nextDistance = resolvePullRefreshDistance({
		deltaY: intent.deltaY,
		pullFactor: props.pullFactor,
		threshold: props.threshold,
		maxDistance: props.maxDistance
	});
	const nextStatus: PullRefreshStatus = nextDistance <= 0 ? 'normal' : nextDistance >= props.threshold ? 'canRelease' : 'pulling';
	if (nextDistance === distance.value && nextStatus === status.value) return;
	distance.value = nextDistance;
	status.value = nextStatus;
	emitChange(nextStatus, nextDistance);
};

const endGesture = () => {
	if (!canPull) return;
	canPull = false;
	gestureLock = 'none';
	const action = resolvePullRefreshReleaseAction({
		disabled: props.disabled,
		distance: distance.value,
		headHeight: props.headHeight,
		refreshing: props.refreshing,
		threshold: props.threshold
	});
	distance.value = action.nextDistance;
	status.value = action.nextStatus;
	emitChange(action.nextStatus, action.nextDistance);
	if (action.shouldRefresh) emit('refresh');
};

const handleTouchStart = (event: TouchEvent) => {
	const touch = event.touches[0];
	startGesture(touch.clientX, touch.clientY);
};

const handleTouchMove = (event: TouchEvent) => {
	const touch = event.touches[0];
	moveGesture(touch.clientX, touch.clientY, () => {
		if (event.cancelable) event.preventDefault();
	});
};

const handleMouseMove = (event: MouseEvent) => {
	if (!mouseDragging) return;
	if ((event.buttons & 1) !== 1) {
		handleMouseUp();
		return;
	}
	moveGesture(event.clientX, event.clientY, () => event.preventDefault());
};

const removeMouseListeners = () => {
	mouseDragging = false;
	window.removeEventListener('mousemove', handleMouseMove);
	window.removeEventListener('mouseup', handleMouseUp);
};

function handleMouseUp() {
	if (!mouseDragging) return;
	removeMouseListeners();
	endGesture();
}

const handleMouseDown = (event: MouseEvent) => {
	if (event.button !== 0) return;
	startGesture(event.clientX, event.clientY);
	if (!canPull) return;
	mouseDragging = true;
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', handleMouseUp);
};

onBeforeUnmount(() => {
	clearSuccessTimer();
	if (mouseDragging) removeMouseListeners();
});
</script>

<template>
	<div
		ref="rootRef"
		:class="pullRefreshState.rootClass"
		@touchstart="handleTouchStart"
		@touchmove="handleTouchMove"
		@touchend="endGesture"
		@touchcancel="endGesture"
		@mousedown="handleMouseDown"
	>
		<div :class="pullRefreshState.trackClass">
			<div :class="pullRefreshState.headClass" :style="pullRefreshState.headStyleValue" aria-live="polite">
				<slot
					v-if="currentSlot"
					:name="pullRefreshState.status === 'canRelease' ? 'canReleaseChild' : `${pullRefreshState.status}Child`"
					v-bind="detail"
				/>
				<div v-else class="inline-flex items-center gap-2">
					<Loading v-if="pullRefreshState.status === 'refreshing' && loadingIconState" v-bind="loadingIconState" />
					<span>{{ pullRefreshState.defaultText }}</span>
				</div>
			</div>
			<div :class="pullRefreshState.contentClass" :style="pullRefreshState.contentStyleValue">
				<slot />
			</div>
		</div>
	</div>
</template>
