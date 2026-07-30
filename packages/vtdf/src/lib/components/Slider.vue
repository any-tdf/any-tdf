<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { SliderProps } from '../types';
import {
	resolveSliderChangePayload,
	resolveSliderDerived,
	resolveSliderEndPositions,
	resolveSliderInitialEndValue,
	resolveSliderInitialStartValue,
	resolveSliderInitialValue,
	resolveSliderMeasuredBlockWidth,
	resolveSliderMeasuredLayoutState,
	resolveSliderPointerMoveAction,
	resolveSliderPointerStartAction,
	resolveSliderPositionSyncAction,
	resolveSliderRangeMoveState,
	resolveSliderRangeStartState,
	resolveSliderSingleMoveState,
	resolveSliderSingleStartState,
	resolveSliderStateOptions,
	type SliderMoveTarget
} from '@any-tdf/common/derived/slider';
import { debounce, throttleWithRAF } from '@any-tdf/common/utils';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';

const props = withDefaults(defineProps<SliderProps & {}>(), {
	value: 40,
	step: 1,
	minRange: 0,
	maxRange: 100,
	isRange: false,
	valueRange: () => [20, 60],
	startValue: 20,
	endValue: 60,
	showTip: 'touch',
	showSteps: false,
	stepsStyle: 'block',
	stepLabels: () => [],
	radius: '',
	lineBlock: false,
	disabled: false,
	readonly: false
});

const emit = defineEmits<{
	change: [value: number, valueRange?: [number, number], label?: string | number, labelRange?: [string | number, string | number]];
}>();

const value = ref(resolveSliderInitialValue(props.value));
const startValue = ref(resolveSliderInitialStartValue(props.startValue));
const endValue = ref(resolveSliderInitialEndValue(props.endValue));
const isDown = ref(false);
const lineDom = ref<HTMLDivElement | null>(null);
const blockDom = ref<HTMLDivElement | null>(null);
const blockWidth = ref(0);
const lineDomStartX = ref(0);
const lineDomEndX = ref(0);
const lineDomWidth = ref(0);
const currentX = ref(0);
const currentStartX = ref(0);
const currentEndX = ref(0);
const currentMove = ref<SliderMoveTarget>('none');

// 公共派生层处理 Slider 的渲染状态，框架事件与 DOM 读取留在组件层。
// Shared derived layer handles Slider render state; framework events and DOM reads stay in the component layer.
const sliderState = computed(() =>
	resolveSliderDerived(
		resolveSliderStateOptions({
			value: value.value,
			startValue: startValue.value,
			endValue: endValue.value,
			props: {
				minRange: props.minRange,
				maxRange: props.maxRange,
				step: props.step,
				stepLabels: props.stepLabels,
				isRange: props.isRange,
				showTip: props.showTip,
				showSteps: props.showSteps,
				stepsStyle: props.stepsStyle,
				radius: props.radius,
				lineBlock: props.lineBlock,
				disabled: props.disabled
			},
			isDown: isDown.value,
			currentMove: currentMove.value,
			currentX: currentX.value,
			currentStartX: currentStartX.value,
			currentEndX: currentEndX.value
		})
	)
);

const handleChange = (nextValue: number, nextRange?: [number, number]) => {
	const payload = resolveSliderChangePayload({
		value: nextValue,
		valueRange: nextRange,
		minRange: props.minRange,
		step: props.step,
		stepLabels: props.stepLabels
	});
	emit('change', payload.value, payload.valueRange, payload.label, payload.labelRange);
};

const syncPosition = () => {
	// 公共同步动作统一处理“拖拽中不回写位置”的判断，组件层只写入状态。
	// Shared sync action owns the "do not rewrite positions while dragging" decision; the component layer only writes state.
	const action = resolveSliderPositionSyncAction({
		isDown: isDown.value,
		value: value.value,
		startValue: startValue.value,
		endValue: endValue.value,
		minRange: props.minRange,
		maxRange: props.maxRange,
		lineWidth: lineDomWidth.value
	});
	if (!action.shouldSync) return;
	currentX.value = action.currentX;
	currentStartX.value = action.currentStartX;
	currentEndX.value = action.currentEndX;
};

const handleResize = () => {
	if (!lineDom.value) return;
	const rect = lineDom.value.getBoundingClientRect();
	// 公共 helper 只处理测量后的数字，DOM 读取留在组件层。
	// Shared helper only handles measured numbers; DOM reads stay in the component layer.
	const nextState = resolveSliderMeasuredLayoutState({
		lineRect: rect,
		blockWidth: resolveSliderMeasuredBlockWidth({
			isRange: props.isRange,
			measuredWidth: blockDom.value ? blockDom.value.getBoundingClientRect().width : undefined
		}),
		isRange: props.isRange,
		value: value.value,
		startValue: startValue.value,
		endValue: endValue.value,
		minRange: props.minRange,
		maxRange: props.maxRange
	});
	lineDomStartX.value = nextState.lineStartX;
	lineDomEndX.value = nextState.lineEndX;
	lineDomWidth.value = nextState.lineWidth;
	currentX.value = nextState.currentX;
	currentStartX.value = nextState.currentStartX;
	currentEndX.value = nextState.currentEndX;
	blockWidth.value = nextState.blockWidth;
};

const touchLineStart = (event: PointerEvent) => {
	// 公共 action 只判断是否进入拖拽计算，DOM 事件与尺寸读取留在组件层。
	// Shared action only decides whether to enter drag math; DOM events and measurements stay in the component layer.
	const action = resolveSliderPointerStartAction({
		disabled: props.disabled,
		readonly: props.readonly
	});
	if (!action.shouldStart) return;
	isDown.value = true;
	const clientX = event.clientX;
	if (props.isRange) {
		const nextState = resolveSliderRangeStartState({
			clientX,
			lineStartX: lineDomStartX.value,
			lineWidth: lineDomWidth.value,
			currentStartX: currentStartX.value,
			currentEndX: currentEndX.value,
			startValue: startValue.value,
			endValue: endValue.value,
			minRange: props.minRange,
			maxRange: props.maxRange,
			step: props.step
		});
		currentMove.value = nextState.currentMove;
		currentStartX.value = nextState.currentStartX;
		currentEndX.value = nextState.currentEndX;
		startValue.value = nextState.startValue;
		endValue.value = nextState.endValue;
		handleChange(0, [startValue.value, endValue.value]);
		return;
	}
	const nextState = resolveSliderSingleStartState({
		clientX,
		lineStartX: lineDomStartX.value,
		lineWidth: lineDomWidth.value,
		minRange: props.minRange,
		maxRange: props.maxRange,
		step: props.step,
		includeMinRange: true
	});
	currentMove.value = nextState.currentMove;
	currentX.value = nextState.currentX;
	value.value = nextState.value;
	handleChange(value.value);
};

const touchLineMove = (event: PointerEvent) => {
	if (!lineDom.value?.hasPointerCapture(event.pointerId)) {
		lineDom.value?.setPointerCapture(event.pointerId);
	}
	// 公共 action 只判断是否继续拖拽计算，pointer capture 保持在组件层。
	// Shared action only decides whether to continue drag math; pointer capture stays in the component layer.
	const action = resolveSliderPointerMoveAction({
		disabled: props.disabled,
		readonly: props.readonly,
		isDown: isDown.value
	});
	if (!action.shouldMove) return;
	const clientX = event.clientX;
	if (props.isRange) {
		const nextState = resolveSliderRangeMoveState({
			clientX,
			lineStartX: lineDomStartX.value,
			lineEndX: lineDomEndX.value,
			lineWidth: lineDomWidth.value,
			blockWidth: blockWidth.value,
			currentMove: currentMove.value,
			currentStartX: currentStartX.value,
			currentEndX: currentEndX.value,
			minRange: props.minRange,
			maxRange: props.maxRange,
			step: props.step
		});
		currentStartX.value = nextState.currentStartX;
		currentEndX.value = nextState.currentEndX;
		startValue.value = nextState.startValue;
		endValue.value = nextState.endValue;
		handleChange(0, [startValue.value, endValue.value]);
		return;
	}
	const nextState = resolveSliderSingleMoveState({
		clientX,
		lineStartX: lineDomStartX.value,
		lineEndX: lineDomEndX.value,
		lineWidth: lineDomWidth.value,
		minRange: props.minRange,
		maxRange: props.maxRange,
		step: props.step
	});
	currentX.value = nextState.currentX;
	value.value = nextState.value;
	handleChange(value.value);
};

const touchLineEnd = (event: PointerEvent) => {
	if (lineDom.value?.hasPointerCapture(event.pointerId)) {
		lineDom.value.releasePointerCapture(event.pointerId);
	}
	const nextState = resolveSliderEndPositions({
		isRange: props.isRange,
		lineWidth: lineDomWidth.value,
		value: value.value,
		startValue: startValue.value,
		endValue: endValue.value,
		minRange: props.minRange,
		maxRange: props.maxRange
	});
	if (typeof nextState.currentStartX === 'number') currentStartX.value = nextState.currentStartX;
	if (typeof nextState.currentEndX === 'number') currentEndX.value = nextState.currentEndX;
	if (typeof nextState.currentX === 'number') currentX.value = nextState.currentX;
	currentMove.value = nextState.currentMove;
	isDown.value = nextState.isDown;
};

const throttledTouchLineMove = throttleWithRAF(touchLineMove);
const debouncedResize = debounce(handleResize, 200);

watch(
	() => props.value,
	(nextValue) => {
		value.value = resolveSliderInitialValue(nextValue);
		syncPosition();
	}
);
watch(
	() => props.startValue,
	(nextValue) => {
		startValue.value = resolveSliderInitialStartValue(nextValue);
		syncPosition();
	}
);
watch(
	() => props.endValue,
	(nextValue) => {
		endValue.value = resolveSliderInitialEndValue(nextValue);
		syncPosition();
	}
);
watch([value, startValue, endValue, () => props.minRange, () => props.maxRange, lineDomWidth, isDown], syncPosition);

onMounted(() => {
	handleResize();
	window.addEventListener('resize', debouncedResize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', debouncedResize);
});
</script>

<template>
	<div :class="sliderState.rootClass">
		<div
			ref="lineDom"
			:class="sliderState.lineClass"
			@pointerdown="touchLineStart"
			@pointermove="throttledTouchLineMove"
			@pointerup="touchLineEnd"
		>
			<slot v-if="$slots.default" />
			<div v-else-if="sliderState.showBreakSteps" :class="sliderState.breakRootClass">
				<template v-for="stepItem in sliderState.breakStepItems" :key="`break-${stepItem.position}`">
					<div :class="stepItem.markerClass" :style="stepItem.markerStyleString" />
					<div v-if="stepItem.showSegment" :class="stepItem.segmentClass" />
				</template>
				<div :class="sliderState.breakProgressOverlayClass">
					<template v-for="stepItem in sliderState.breakStepItems" :key="`break-progress-${stepItem.position}`">
						<div :class="stepItem.progressMarkerClass" :style="stepItem.markerStyleString" />
						<div v-if="stepItem.showSegment" :class="stepItem.progressSegmentClass">
							<template v-if="isRange">
								<div v-if="stepItem.rangeSegmentVisible" :class="sliderState.segmentRangeClass" :style="stepItem.rangeSegmentStyle" />
							</template>
							<div v-else :class="sliderState.segmentProgressClass" :style="stepItem.progressSegmentStyle" />
						</div>
					</template>
				</div>
			</div>
			<div v-else :class="sliderState.continuousTrackClass">
				<div
					v-for="stepItem in sliderState.showContinuousSteps ? sliderState.continuousStepItems : []"
					:key="`step-${stepItem.position}`"
					:class="stepItem.markerClass"
					:style="stepItem.markerStyleString"
				/>
				<template v-if="isRange">
					<div :class="sliderState.trackClass" :style="sliderState.rangeTrackStyle" />
					<template
						v-for="stepItem in sliderState.showContinuousSteps ? sliderState.continuousStepItems : []"
						:key="`range-step-${stepItem.position}`"
					>
						<div v-if="stepItem.active" :class="stepItem.activeClass" :style="stepItem.markerStyleString" />
					</template>
				</template>
				<template v-else>
					<div :class="sliderState.trackClass" :style="sliderState.singleTrackStyle" />
					<template
						v-for="stepItem in sliderState.showContinuousSteps ? sliderState.continuousStepItems : []"
						:key="`single-step-${stepItem.position}`"
					>
						<div v-if="stepItem.active" :class="stepItem.activeClass" :style="stepItem.markerStyleString" />
					</template>
				</template>
			</div>

			<template v-if="isRange">
				<div :class="sliderState.blockLayerClass">
					<div :class="sliderState.blockClass" :style="sliderState.startBlockStyle">
						<MotionTransition
							:visible="sliderState.tips.start.visible"
							transition="fly"
							:in-params="sliderState.tipInParams"
							:out-params="sliderState.tipOutParams"
							:class="sliderState.tips.start.anchorClass"
						>
							<div :class="sliderState.tips.start.bubbleClass">
								{{ sliderState.tips.start.label }}
								<div :class="sliderState.tips.start.arrowClass" />
							</div>
						</MotionTransition>
					</div>
				</div>
				<div :class="sliderState.blockLayerClass">
					<div ref="blockDom" :class="sliderState.blockClass" :style="sliderState.endBlockStyle">
						<MotionTransition
							:visible="sliderState.tips.end.visible"
							transition="fly"
							:in-params="sliderState.tipInParams"
							:out-params="sliderState.tipOutParams"
							:class="sliderState.tips.end.anchorClass"
						>
							<div :class="sliderState.tips.end.bubbleClass">
								{{ sliderState.tips.end.label }}
								<div :class="sliderState.tips.end.arrowClass" />
							</div>
						</MotionTransition>
					</div>
				</div>
			</template>
			<div v-else :class="sliderState.blockLayerClass">
				<div :class="sliderState.blockClass" :style="sliderState.singleBlockStyle">
					<MotionTransition
						:visible="sliderState.tips.single.visible"
						transition="fly"
						:in-params="sliderState.tipInParams"
						:out-params="sliderState.tipOutParams"
						:class="sliderState.tips.single.anchorClass"
					>
						<div :class="sliderState.tips.single.bubbleClass">
							{{ sliderState.tips.single.label }}
							<div :class="sliderState.tips.single.arrowClass" />
						</div>
					</MotionTransition>
				</div>
			</div>
		</div>
	</div>
</template>
