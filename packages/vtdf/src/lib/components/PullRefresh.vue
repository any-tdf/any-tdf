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
	resolvePullRefreshReleaseAction
} from '@any-tdf/common/derived/pullRefresh';

const props = withDefaults(defineProps<PullRefreshProps>(), {
	refreshing: false,
	disabled: false,
	headHeight: 50,
	threshold: 60,
	pullFactor: 1,
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

const handleTouchStart = (event: TouchEvent) => {
	const touch = event.touches[0];
	const scrollElement = getScrollElement(props.scrollTarget, rootRef.value);
	canPull = resolvePullRefreshCanStart({
		disabled: props.disabled,
		refreshing: props.refreshing,
		scrollTop: getScrollMetrics(scrollElement).scrollTop
	});
	startX = touch.clientX;
	startY = touch.clientY;
};

const handleTouchMove = (event: TouchEvent) => {
	if (!canPull) return;
	const touch = event.touches[0];
	const intent = resolvePullRefreshGestureIntent({
		currentX: touch.clientX,
		currentY: touch.clientY,
		startX,
		startY
	});
	if (intent.isHorizontal || intent.deltaY <= 0 || !intent.isPullDown) return;
	event.preventDefault();
	const nextDistance = resolvePullRefreshDistance({
		deltaY: intent.deltaY,
		pullFactor: props.pullFactor
	});
	const nextStatus: PullRefreshStatus = nextDistance >= props.threshold ? 'canRelease' : 'pulling';
	distance.value = nextDistance;
	status.value = nextStatus;
	emitChange(nextStatus, nextDistance);
};

const handleTouchEnd = () => {
	if (!canPull) return;
	canPull = false;
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

onBeforeUnmount(clearSuccessTimer);
</script>

<template>
	<div
		ref="rootRef"
		:class="pullRefreshState.rootClass"
		@touchstart="handleTouchStart"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
		@touchcancel="handleTouchEnd"
	>
		<div :class="pullRefreshState.trackClass">
			<div :class="pullRefreshState.headClass" :style="pullRefreshState.headStyleValue">
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
