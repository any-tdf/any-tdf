<script setup lang="ts">
import { computed, defineComponent, h, isVNode, onBeforeUnmount, onMounted, ref, watch, type Component, type PropType } from 'vue';
import {
	resolveSwiperAutoplayGuardAction,
	resolveSwiperAutoplayTickAction,
	resolveSwiperDerived,
	resolveSwiperHeight,
	resolveSwiperInitialActive,
	resolveSwiperInitialIndicator,
	resolveSwiperInitialStateAction,
	resolveSwiperLoopResetTransition,
	resolveSwiperLongLineResetAction,
	resolveSwiperPointerDownAction,
	resolveSwiperPointerMoveAction,
	resolveSwiperPointerUpAction,
	resolveSwiperWidth
} from '@any-tdf/common/derived/swiper';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import type { SwiperImgProps, SwiperProps, VueNode } from '../types';

type SwiperRenderable = VueNode | Component | (() => VueNode);
type SwiperVueComponentProps = {
	type: 'component';
	component: SwiperRenderable;
};
type SwiperVueNodeProps = {
	type: 'ReactNode';
	ReactNode: SwiperRenderable;
};
type SwiperItem = SwiperImgProps | SwiperVueComponentProps | SwiperVueNodeProps;
type SwiperVueProps = Omit<SwiperProps, 'data' | 'indicateRadius' | 'radius'> & {
	data?: SwiperItem[];
	indicateRadius?: NonNullable<SwiperProps['indicateRadius']> | '';
	radius?: NonNullable<SwiperProps['radius']> | '';
};

const RenderNode = defineComponent({
	name: 'RenderNode',
	props: {
		node: {
			type: null as unknown as PropType<SwiperRenderable>,
			default: null
		}
	},
	setup: (renderProps) => () => {
		const node = renderProps.node;

		if (typeof node === 'function') {
			return (node as () => VueNode)();
		}

		if (isVNode(node) || node == null || typeof node !== 'object') {
			return node ?? null;
		}

		return h(node as Component);
	}
});

const props = withDefaults(defineProps<SwiperVueProps>(), {
	data: () => [],
	interval: 4,
	duration: 1000,
	autoplay: true,
	lazyplay: true,
	initActive: 0,
	indicatePosition: 'inner',
	indicateAlign: 'center',
	indicateStyle: 'pointLine',
	indicateRadius: '',
	indicateInjClass: '',
	indicateColor: '',
	indicateActiveColor: '',
	aspectRatio: () => [16, 9],
	containerWidth: 0,
	px: '0',
	py: '0',
	translateX: 0,
	translateZ: 0,
	rotateX: 0,
	rotateY: 0,
	rotateZ: 0,
	activeInjClass: '',
	notActiveInjClass: '',
	radius: '',
	triggerLong: 30,
	notTriggerLong: 10,
	triggerSpeed: 0.5,
	innerInjClass: ''
});

const emit = defineEmits<{
	(event: 'change', current: number): void;
	(event: 'click', current: number): void;
}>();

const swiperDom = ref<HTMLDivElement | null>(null);
const bodyWidth = ref(
	resolveViewportDimension({
		value: typeof document === 'undefined' ? undefined : document.body.clientWidth
	})
);
const active = ref(resolveSwiperInitialActive({ dataLength: props.data.length, initActive: props.initActive }));
const currentIndicate = ref(resolveSwiperInitialIndicator({ dataLength: props.data.length, initActive: props.initActive }));
const longTransition = ref(true);
const long = ref(false);
const once = ref(true);
const translateXTransition = ref(true);
const initialState = ref(true);
const startX = ref(0);
const moveX = ref(0);
const startTime = ref(0);
const isMove = ref(false);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const timeouts: ReturnType<typeof setTimeout>[] = [];
let observer: IntersectionObserver | null = null;

const width = computed(() => resolveSwiperWidth({ containerWidth: props.containerWidth, fallbackWidth: bodyWidth.value }));
const height = computed(() => resolveSwiperHeight(width.value, props.aspectRatio));
// 公共派生层处理 Swiper 渲染数据、item 样式和指示器状态，手势与定时器留在组件层。
// Shared derived layer handles Swiper render data, item styles and indicator state; gestures and timers stay in the component layer.
const swiperState = computed(() =>
	resolveSwiperDerived<SwiperItem>({
		data: props.data,
		width: width.value,
		height: height.value,
		active: active.value,
		currentIndicate: currentIndicate.value,
		moveX: moveX.value,
		duration: props.duration,
		translateX: props.translateX,
		translateZ: props.translateZ,
		rotateX: props.rotateX,
		rotateY: props.rotateY,
		rotateZ: props.rotateZ,
		isMove: isMove.value,
		px: props.px,
		py: props.py,
		translateXTransition: translateXTransition.value,
		activeInjClass: props.activeInjClass,
		notActiveInjClass: props.notActiveInjClass,
		radius: props.radius,
		innerInjClass: props.innerInjClass,
		indicateRadius: props.indicateRadius,
		indicateStyle: props.indicateStyle,
		indicatePosition: props.indicatePosition,
		indicateAlign: props.indicateAlign,
		indicateInjClass: props.indicateInjClass,
		indicateColor: props.indicateColor,
		indicateActiveColor: props.indicateActiveColor,
		long: long.value,
		longTransition: longTransition.value,
		once: once.value,
		interval: props.interval
	})
);

const addTimeout = (handler: () => void, delay: number) => {
	const timeout = setTimeout(handler, delay);
	timeouts.push(timeout);
};

const clearIntervalTimer = () => {
	if (intervalId.value) {
		clearInterval(intervalId.value);
		intervalId.value = null;
	}
};

const emitChange = (current: number) => {
	emit('change', current);
};

const emitClick = () => {
	emit('click', currentIndicate.value);
};

const resetLongLine = () => {
	const action = resolveSwiperLongLineResetAction({
		autoplay: props.autoplay,
		duration: props.duration
	});
	long.value = action.long;
	longTransition.value = action.longTransition;
	addTimeout(() => {
		long.value = action.resetLong;
		longTransition.value = action.resetLongTransition;
	}, action.resetDelay);
};

const playNext = () => {
	const action = resolveSwiperAutoplayTickAction({
		active: active.value,
		currentIndicate: currentIndicate.value,
		dataLength: swiperState.value.items.length,
		autoplay: props.autoplay,
		duration: props.duration
	});
	once.value = action.once;
	initialState.value = action.initialState;
	active.value = action.active;
	currentIndicate.value = action.currentIndicate;
	long.value = action.longLine.long;
	longTransition.value = action.longLine.longTransition;
	addTimeout(() => {
		long.value = action.longLine.resetLong;
		longTransition.value = action.longLine.resetLongTransition;
	}, action.longLine.resetDelay);

	if (action.loopResetActive !== undefined) {
		addTimeout(() => {
			active.value = action.loopResetActive as number;
			translateXTransition.value = resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition);
		}, props.duration);
	} else {
		translateXTransition.value = action.translateXTransition;
	}

	emitChange(currentIndicate.value);
};

const startIntervalTimer = () => {
	clearIntervalTimer();
	intervalId.value = setInterval(playNext, props.interval * 1000);
};

const handlePointerDown = (event: PointerEvent) => {
	if (props.data.length < 2) return;
	event.preventDefault();
	const action = resolveSwiperPointerDownAction({ clientX: event.clientX, time: Date.now() });
	isMove.value = action.isMove;
	startTime.value = action.startTime;
	translateXTransition.value = action.translateXTransition;
	startX.value = action.startX;
};

const handlePointerMove = (event: PointerEvent) => {
	const action = resolveSwiperPointerMoveAction({
		isMove: isMove.value,
		clientX: event.clientX,
		startX: startX.value
	});
	if (!action.shouldMove) return;
	if (action.shouldCapturePointer) {
		swiperDom.value?.setPointerCapture(event.pointerId);
	}
	if (action.shouldStopAutoplay) {
		clearIntervalTimer();
	}
	moveX.value = action.moveX;
};

const handlePointerUp = () => {
	if (!isMove.value) return;

	const endTime = Date.now();
	const moveXValue = moveX.value;

	// 公共派生负责拖动阈值和循环索引计算，定时器和 ref 赋值留在组件内。
	// Shared derivation resolves drag thresholds and loop indexes; timers and ref assignment stay in the component.
	const action = resolveSwiperPointerUpAction({
		active: active.value,
		currentIndicate: currentIndicate.value,
		dataLength: swiperState.value.items.length,
		moveX: moveXValue,
		width: width.value,
		startTime: startTime.value,
		endTime,
		triggerLong: props.triggerLong,
		notTriggerLong: props.notTriggerLong,
		triggerSpeed: props.triggerSpeed,
		autoplay: props.autoplay,
		duration: props.duration
	});
	isMove.value = action.isMove;
	translateXTransition.value = action.translateXTransition;
	long.value = action.longLine.long;
	longTransition.value = action.longLine.longTransition;
	addTimeout(() => {
		long.value = action.longLine.resetLong;
		longTransition.value = action.longLine.resetLongTransition;
	}, action.longLine.resetDelay);
	moveX.value = action.moveX;
	active.value = action.active;
	currentIndicate.value = action.currentIndicate;
	if (action.loopResetActive !== undefined) {
		addTimeout(() => {
			active.value = action.loopResetActive as number;
			translateXTransition.value = resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition);
		}, props.duration);
	}

	if (action.shouldRestartAutoplay) {
		startIntervalTimer();
	} else if (action.shouldEmitChange) {
		emitChange(currentIndicate.value);
	}
};

const syncBodyWidth = () => {
	bodyWidth.value = resolveViewportDimension({
		value: typeof document === 'undefined' ? undefined : document.body.clientWidth
	});
};

const startAutoplay = () => {
	clearIntervalTimer();

	const autoplayGuard = resolveSwiperAutoplayGuardAction({
		autoplay: props.autoplay,
		dataLength: props.data.length,
		duration: props.duration,
		interval: props.interval
	});
	if (!autoplayGuard.shouldAutoplay) {
		return;
	}

	resetLongLine();

	if (!props.lazyplay) {
		startIntervalTimer();
		return;
	}

	if (observer) {
		observer.disconnect();
		observer = null;
	}

	if (!swiperDom.value) return;

	observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (props.autoplay) {
					startIntervalTimer();
				}
			} else {
				clearIntervalTimer();
			}
		});
	});
	observer.observe(swiperDom.value);
};

watch(
	() => [props.data.length, props.initActive],
	() => {
		const action = resolveSwiperInitialStateAction({
			dataLength: props.data.length,
			initActive: props.initActive
		});
		active.value = action.active;
		currentIndicate.value = action.currentIndicate;
		initialState.value = action.initialState;
		translateXTransition.value = action.translateXTransition;
		once.value = action.once;
		moveX.value = action.moveX;
	}
);

watch(() => [props.autoplay, props.lazyplay, props.interval, props.duration, props.data.length], startAutoplay);

onMounted(() => {
	syncBodyWidth();
	window.addEventListener('resize', syncBodyWidth);
	startAutoplay();
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', syncBodyWidth);
	clearIntervalTimer();
	observer?.disconnect();
	timeouts.forEach((timeout) => clearTimeout(timeout));
});
</script>

<template>
	<div
		ref="swiperDom"
		:class="swiperState.rootClass"
		@pointerdown="handlePointerDown"
		@pointermove="handlePointerMove"
		@pointerup="handlePointerUp"
		@pointercancel="handlePointerUp"
	>
		<div :class="swiperState.containerClass" :style="swiperState.containerStyle">
			<div
				v-for="renderItem in swiperState.items"
				:key="`swiper-${renderItem.index}`"
				:class="renderItem.className"
				:style="renderItem.style"
			>
				<slot :item="renderItem.item" :index="renderItem.sourceIndex" :active="currentIndicate === renderItem.sourceIndex">
					<button v-if="renderItem.contentState.kind === 'image'" type="button" :class="swiperState.itemButtonClass" @click="emitClick">
						<img :class="swiperState.imageClass" :src="renderItem.contentState.src" alt="" />
					</button>
					<div v-else-if="renderItem.contentState.kind === 'component'" :class="swiperState.contentClass">
						<RenderNode :node="renderItem.contentState.component" />
					</div>
					<div v-else-if="renderItem.contentState.kind === 'reactNode'" :class="swiperState.contentClass">
						<RenderNode :node="renderItem.contentState.reactNode" />
					</div>
				</slot>
			</div>

			<div :class="swiperState.indicators.inner.className">
				<div
					v-for="indicator in swiperState.indicators.inner.items"
					:key="`indicator-inner-${indicator.index}`"
					:class="indicator.className"
					:style="indicator.style"
				>
					<div v-if="indicator.showLongLine" :class="indicator.longLineClass" :style="indicator.longLineStyle" />
				</div>
			</div>
		</div>

		<div :class="swiperState.indicators.out.className">
			<div
				v-for="indicator in swiperState.indicators.out.items"
				:key="`indicator-out-${indicator.index}`"
				:class="indicator.className"
				:style="indicator.style"
			>
				<div v-if="indicator.showLongLine" :class="indicator.longLineClass" :style="indicator.longLineStyle" />
			</div>
		</div>
	</div>
</template>
