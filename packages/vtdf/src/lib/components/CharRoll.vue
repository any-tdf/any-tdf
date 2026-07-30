<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import type { CharRollProps } from '../types';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import {
	formatCharRollValue,
	resolveCharRollDerived,
	resolveCharRollDisplayState,
	resolveCharRollEasingFunction,
	resolveCharRollFrameAction,
	resolveCharRollInitialInitialized,
	resolveCharRollPauseAction,
	resolveCharRollResetAction,
	resolveCharRollStartAction,
	resolveCharRollStateOptions,
	resolveCharRollValueChangeAction
} from '@any-tdf/common/derived/charRoll';

const props = withDefaults(defineProps<CharRollProps & {}>(), {
	value: '',
	duration: 1000,
	delay: 0,
	stagger: 50,
	direction: 'up',
	height: 40,
	separator: false,
	prefix: '',
	suffix: '',
	preset: 'number',
	loops: 1,
	autoStart: true,
	loop: false,
	loopInterval: 3000,
	easing: 'cubicOut',
	radius: 'sm',
	bg: 'none',
	gap: '1',
	fontSize: 'xl',
	fontWeight: 'bold',
	injClass: '',
	charClass: ''
});

const emit = defineEmits<{
	start: [];
	complete: [];
	change: [value: string];
}>();

const slots = useSlots();
const displayChars = ref<string[]>([]);
const animationProgress = ref<number[]>([]);
const startIndexes = ref<number[]>([]);
const targetIndexes = ref<number[]>([]);
const charStarted = ref<boolean[]>([]);
const isAnimating = ref(false);
const renderTick = ref(0);
const initialized = ref(resolveCharRollInitialInitialized());
const prevValue = ref('');
let rafId: number | null = null;
let loopTimer: ReturnType<typeof setTimeout> | null = null;

// 输入组件状态，返回框架无关的字符展示、class 和 style 派生结果。
// Receive component state and return framework-agnostic character display, class and style derivations.
const charRollState = computed(() =>
	resolveCharRollDerived(
		resolveCharRollStateOptions({
			animationProgress: animationProgress.value,
			charStarted: charStarted.value,
			displayChars: displayChars.value,
			isAnimating: isAnimating.value,
			props,
			startIndexes: startIndexes.value,
			targetIndexes: targetIndexes.value
		})
	)
);

const updateDisplayChars = () => {
	const nextState = resolveCharRollDisplayState({
		value: props.value,
		decimal: props.decimal,
		separator: props.separator,
		prefix: props.prefix,
		suffix: props.suffix,
		charSetArray: charRollState.value.charSetArray,
		previousDisplayChars: displayChars.value,
		previousAnimationProgress: animationProgress.value,
		previousStartIndexes: startIndexes.value,
		previousTargetIndexes: targetIndexes.value,
		autoStart: props.autoStart,
		direction: props.direction,
		loops: props.loops
	});

	displayChars.value = nextState.displayChars;
	targetIndexes.value = nextState.targetIndexes;
	startIndexes.value = nextState.startIndexes;
	animationProgress.value = nextState.animationProgress;
	charStarted.value = nextState.charStarted;
	renderTick.value += 1;
};

const clearLoopTimer = () => {
	if (loopTimer !== null) {
		clearTimeout(loopTimer);
		loopTimer = null;
	}
};

const reset = () => {
	const action = resolveCharRollResetAction({
		displayChars: displayChars.value,
		rafActive: rafId !== null
	});
	if (action.shouldCancelFrame && rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
	clearLoopTimer();
	isAnimating.value = action.nextAnimating;
	animationProgress.value = action.animationProgress;
	charStarted.value = action.charStarted;
	renderTick.value += 1;
};

const emitStart = () => {
	emit('start');
};

const emitComplete = () => {
	emit('complete');
};

const emitChange = (value: string) => {
	emit('change', value);
};

const start = () => {
	const startAction = resolveCharRollStartAction({
		isAnimating: isAnimating.value,
		now: Date.now()
	});
	if (!startAction.shouldStart) return;
	reset();
	isAnimating.value = startAction.nextAnimating;
	emitStart();

	const startTime = startAction.startTime;
	const easingFn = resolveCharRollEasingFunction(easingFunctions, props.easing);
	const charCount = displayChars.value.length;

	const animate = () => {
		// 公共 action 只返回帧状态，动画帧和循环定时器留在组件内。
		// Shared action only returns frame state; animation frames and loop timers stay in the component.
		const action = resolveCharRollFrameAction({
			charCount,
			delay: props.delay,
			decimal: props.decimal,
			displayChars: displayChars.value,
			duration: props.duration,
			easing: easingFn,
			loop: props.loop,
			loopInterval: props.loopInterval,
			now: Date.now(),
			separator: props.separator,
			stagger: props.stagger,
			startTime,
			targetIndexes: targetIndexes.value,
			value: props.value
		});
		animationProgress.value = action.animationProgress;
		charStarted.value = action.charStarted;

		renderTick.value += 1;

		if (action.shouldComplete) {
			isAnimating.value = action.nextAnimating;
			rafId = null;
			startIndexes.value = action.completeStartIndexes;
			charStarted.value = action.completeCharStarted;
			emitComplete();
			emitChange(action.changeValue);

			if (action.shouldScheduleLoop) {
				loopTimer = setTimeout(() => {
					reset();
					start();
				}, action.loopDelayMs);
			}
			return;
		}

		rafId = requestAnimationFrame(animate);
	};

	rafId = requestAnimationFrame(animate);
};

const pause = () => {
	const action = resolveCharRollPauseAction({
		displayChars: displayChars.value,
		animationProgress: animationProgress.value,
		startIndexes: startIndexes.value,
		targetIndexes: targetIndexes.value,
		charSetArray: charRollState.value.charSetArray,
		direction: props.direction,
		loops: props.loops,
		rafActive: rafId !== null
	});
	if (action.shouldCancelFrame && rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
	isAnimating.value = action.nextAnimating;

	startIndexes.value = action.startIndexes;
	animationProgress.value = action.animationProgress;
	renderTick.value += 1;
};

onMounted(() => {
	prevValue.value = formatCharRollValue({
		value: props.value,
		decimal: props.decimal,
		separator: props.separator
	});
	updateDisplayChars();
	if (props.autoStart) {
		start();
	} else {
		startIndexes.value = [...targetIndexes.value];
	}
	initialized.value = true;
});

watch(
	() => [props.value, props.prefix, props.suffix, props.separator, props.decimal, props.charSet, props.preset] as const,
	() => {
		const action = resolveCharRollValueChangeAction({
			value: props.value,
			decimal: props.decimal,
			separator: props.separator,
			initialized: initialized.value,
			previousValue: prevValue.value,
			autoStart: props.autoStart
		});
		if (!action.shouldUpdateDisplay) return;
		prevValue.value = action.nextPreviousValue;
		updateDisplayChars();
		if (action.shouldRestart) {
			reset();
			start();
		}
	}
);

onBeforeUnmount(() => {
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
	}
	clearLoopTimer();
});

defineExpose({ start, pause, reset });
</script>

<template>
	<div :class="charRollState.rootClass" :data-roll-tick="renderTick">
		<div
			v-for="item in charRollState.displayItems"
			:key="item.index"
			:class="charRollState.charClassName"
			:style="charRollState.charHeightStyleString"
		>
			<template v-if="slots.default">
				<slot :char="item.meta.displayChar" :index="item.index" />
			</template>
			<div v-else-if="item.meta.inCharSet && item.meta.hasStarted" :class="charRollState.scrollListClass" :style="item.scrollStyleString">
				<div
					v-for="renderIndex in item.renderIndexes"
					:key="renderIndex"
					:class="charRollState.rollItemClass"
					:style="item.rollItemStyleString"
				>
					{{ item.meta.charSetArray[renderIndex % item.meta.charSetArray.length] }}
				</div>
			</div>
			<div v-else :class="charRollState.directClass" :style="item.directStyleString">
				{{ item.meta.displayChar }}
			</div>
		</div>
	</div>
</template>
