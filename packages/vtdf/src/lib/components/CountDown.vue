<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
	resolveCountDownDerived,
	resolveCountDownPauseAction,
	resolveCountDownResetAction,
	resolveCountDownShouldAutoStart,
	resolveCountDownShouldResumeTick,
	resolveCountDownStartAction,
	resolveCountDownStateOptions,
	resolveCountDownTickAction,
	resolveCountDownTimePropAction
} from '@any-tdf/common/derived/countDown';
import type { CountDownProps, TimeData } from '../types';

const props = withDefaults(defineProps<CountDownProps & {}>(), {
	time: 0,
	format: 'HH:mm:ss',
	autoStart: true,
	millisecond: false,
	injClass: ''
});

const emit = defineEmits<{
	change: [timeData: TimeData];
	finish: [];
}>();

const remain = ref(props.time);
const counting = ref(false);
const endTime = ref(0);
const rafId = ref<number | null>(null);
const previousTime = ref(props.time);

// 输入组件状态，返回框架无关的文本、时间拆分和 class 派生结果。
// Receive component state and return framework-agnostic text, time parts and class derivations.
const countDownState = computed(() =>
	resolveCountDownDerived(
		resolveCountDownStateOptions({
			props: {
				format: props.format,
				injClass: props.injClass
			},
			remain: remain.value
		})
	)
);

const emitChange = (data: TimeData) => {
	emit('change', data);
};

const emitFinish = () => {
	emit('finish');
};

const cancelTick = () => {
	if (rafId.value !== null) {
		cancelAnimationFrame(rafId.value);
		rafId.value = null;
	}
};

const tick = () => {
	// 公共 action 只返回下一次 tick 的动作，动画帧和回调留在组件内。
	// Shared action only returns the next tick action; animation frames and callbacks stay in the component.
	const action = resolveCountDownTickAction({
		endTime: endTime.value,
		now: Date.now(),
		previousRemain: remain.value,
		millisecond: props.millisecond
	});
	remain.value = action.nextRemain;
	if (action.shouldChange) {
		emitChange(action.timeData);
	}
	if (action.shouldContinue) {
		rafId.value = requestAnimationFrame(tick);
		return;
	}
	counting.value = action.nextCounting;
	rafId.value = null;
	emitFinish();
};

const start = () => {
	const action = resolveCountDownStartAction({
		counting: counting.value,
		remain: remain.value,
		now: Date.now()
	});
	if (!action.shouldStart) return;
	counting.value = action.nextCounting;
	endTime.value = action.endTime;
	rafId.value = requestAnimationFrame(tick);
};

const pause = () => {
	const action = resolveCountDownPauseAction({
		counting: counting.value,
		endTime: endTime.value,
		now: Date.now()
	});
	if (!action.shouldPause) return;
	counting.value = action.nextCounting;
	if (action.shouldCancelTick) {
		cancelTick();
	}
	remain.value = action.nextRemain;
};

const reset = (newTime?: number) => {
	pause();
	const action = resolveCountDownResetAction({ newTime, time: props.time });
	remain.value = action.nextRemain;
	emitChange(action.timeData);
};

const handleVisibility = () => {
	if (
		resolveCountDownShouldResumeTick({
			hidden: document.hidden,
			counting: counting.value,
			rafId: rafId.value
		})
	) {
		rafId.value = requestAnimationFrame(tick);
	}
};

watch(
	() => props.time,
	(nextTime) => {
		const action = resolveCountDownTimePropAction({
			nextTime,
			previousTime: previousTime.value,
			counting: counting.value
		});
		previousTime.value = action.nextPreviousTime;
		if (action.shouldSyncRemain) {
			remain.value = action.nextRemain;
		}
	}
);

onMounted(() => {
	if (resolveCountDownShouldAutoStart({ autoStart: props.autoStart, time: props.time })) {
		start();
	}
	document.addEventListener('visibilitychange', handleVisibility);
});

onBeforeUnmount(() => {
	cancelTick();
	document.removeEventListener('visibilitychange', handleVisibility);
});

defineExpose({
	start,
	pause,
	reset
});
</script>

<template>
	<span :class="countDownState.rootClass">
		<slot :time-data="countDownState.timeData" v-bind="countDownState.timeData">{{ countDownState.displayText }}</slot>
	</span>
</template>
