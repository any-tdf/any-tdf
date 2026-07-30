<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import {
	bottomSheetDefaultScrollTopHeight,
	resolveBottomSheetCloseAction,
	resolveBottomSheetDerived,
	resolveBottomSheetInitialVisible,
	resolveBottomSheetMaskClickFlow,
	resolveBottomSheetMeasuredScrollTopHeight,
	resolveBottomSheetMoveDistance,
	resolveBottomSheetRenderEndAction,
	resolveBottomSheetRenderState,
	resolveBottomSheetStateOptions,
	resolveBottomSheetTouchEndFlow,
	resolveBottomSheetTouchStartAction,
	resolveBottomSheetVisibleChangeAction
} from '@any-tdf/common/derived/bottomSheet';
import { arrowLeftSvg, closeSvg, downSvg } from '@any-tdf/common/svg/common';
import { throttleWithRAF } from '@any-tdf/common/utils';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import type { BottomSheetProps } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Mask from './Mask.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<BottomSheetProps & {}>(), {
	title: undefined,
	titleAlign: 'left',
	showBackIcon: false,
	closeContent: 'downIcon',
	showDivider: true,
	duration: 450,
	outDuration: 240,
	mask: () => ({}),
	maskClosable: false,
	zIndex: 600,
	stayHeightList: () => [10, 50, 90],
	stayHeightIndex: 1,
	closeHeight: 0,
	radius: '',
	iconRadius: ''
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	heightChange: [height: number];
	clickMask: [];
	close: [];
	back: [];
}>();

const config = useConfig();
const internalVisible = ref(resolveBottomSheetInitialVisible(props.visible));
const shouldRender = ref(resolveBottomSheetRenderState({ visible: resolveBottomSheetInitialVisible(props.visible) }));
const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);
const isTouch = ref(false);
const startTop = ref<number | undefined>(undefined);
const moveDistance = ref(0);
const scrollTopHeight = ref(bottomSheetDefaultScrollTopHeight);
const scrollTopDom = ref<HTMLDivElement | null>(null);

let startY = 0;
let currentY = 0;

// 公共派生层统一 BottomSheet 的高度、class、style、标题和校验结果，组件层只保留 DOM 测量、事件和状态写入。
// Common derivation unifies BottomSheet height, class, style, title and validation results; the component layer only keeps DOM measurement, events and state writes.
const bottomSheetLang = computed(() => config.locale?.bottomSheet || zh_CN.bottomSheet);
const bottomSheetState = computed(() =>
	resolveBottomSheetDerived(
		resolveBottomSheetStateOptions({
			currentRender: shouldRender.value,
			defaults: bottomSheetLang.value,
			props: {
				closeContent: props.closeContent,
				closeHeight: props.closeHeight,
				duration: props.duration,
				iconRadius: props.iconRadius,
				outDuration: props.outDuration,
				radius: props.radius,
				stayHeightIndex: props.stayHeightIndex,
				stayHeightList: props.stayHeightList,
				title: props.title,
				titleAlign: props.titleAlign,
				zIndex: props.zIndex
			},
			isTouch: isTouch.value,
			moveDistance: moveDistance.value,
			scrollTopHeight: scrollTopHeight.value,
			startTop: startTop.value,
			viewportHeight: innerHeight.value,
			visible: internalVisible.value
		})
	)
);

const updateInnerHeight = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

const updateScrollTopHeight = async () => {
	await nextTick();
	scrollTopHeight.value = resolveBottomSheetMeasuredScrollTopHeight(scrollTopDom.value);
};

const emitVisible = (visible: boolean) => {
	internalVisible.value = visible;
	emit('update:visible', visible);
};

const emitClose = () => {
	emit('close');
};

const touchstartFun = (event: PointerEvent) => {
	// 公共 action 只返回拖拽开始状态，事件读取保留在组件层。
	// Shared action only returns drag-start state; event reads stay in the component layer.
	const action = resolveBottomSheetTouchStartAction({
		clientY: event.clientY,
		currentTop: bottomSheetState.value.currentTop
	});
	moveDistance.value = action.moveDistance;
	startTop.value = action.startTop;
	startY = action.startY;
	currentY = action.currentY;
	isTouch.value = action.isTouch;
};

const touchmoveFun = (event: PointerEvent) => {
	if (!isTouch.value) return;
	scrollTopDom.value?.setPointerCapture(event.pointerId);
	currentY = event.clientY;
	moveDistance.value = resolveBottomSheetMoveDistance({
		currentY,
		startY,
		viewportHeight: resolveViewportDimension({ value: window.innerHeight }),
		startTop: bottomSheetState.value.startTop,
		maxHeight: bottomSheetState.value.maxHeight
	});
};

const throttledTouchmoveFun = throttleWithRAF(touchmoveFun);

const touchendFun = () => {
	// 公共 action 只返回吸附高度和关闭决策，事件派发和 v-model 更新留在组件层。
	// Shared action only returns snapped height and close decisions; event emits and v-model updates stay in the component layer.
	const action = resolveBottomSheetTouchEndFlow({
		stayHeightList: bottomSheetState.value.resolvedStayHeightList,
		currentTop: bottomSheetState.value.currentTop,
		currentY,
		viewportHeight: resolveViewportDimension({ value: window.innerHeight }),
		closeHeight: props.closeHeight,
		visible: internalVisible.value
	});
	isTouch.value = action.isTouch;
	startTop.value = action.startTop;
	moveDistance.value = action.moveDistance;
	emit('heightChange', action.height);
	if (!action.closeAction.shouldClose) return;
	emitVisible(action.closeAction.nextVisible);
	if (action.closeAction.shouldEmitClose) emitClose();
};

const clickMaskFn = () => {
	emit('clickMask');
	// 公共流程只返回遮罩点击和关闭决策，事件派发和 v-model 更新留在组件层。
	// Shared flow only returns mask-click and close decisions; event dispatch and v-model updates stay in the component layer.
	const action = resolveBottomSheetMaskClickFlow({
		maskClosable: props.maskClosable,
		visible: internalVisible.value
	});
	if (!action.closeAction.shouldClose) return;
	emitVisible(action.closeAction.nextVisible);
	if (action.closeAction.shouldEmitClose) emitClose();
};

const closeFunc = () => {
	// 公共 close action 只返回可见状态和回调决策，事件调用留在组件层。
	// Shared close action only returns visibility and callback decisions; event calls stay in the component layer.
	const action = resolveBottomSheetCloseAction({ visible: internalVisible.value });
	if (!action.shouldClose) return;
	emitVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

const backFunc = () => {
	emit('back');
};

const handleOutroEnd = () => {
	const action = resolveBottomSheetRenderEndAction();
	shouldRender.value = action.nextShouldRender;
};

watch(
	() => props.visible,
	(visible) => {
		internalVisible.value = resolveBottomSheetInitialVisible(visible);
	}
);

watch(internalVisible, (visible, previousVisible) => {
	// 公共 action 只决定渲染生命周期，动画组件和响应式写入留在组件层。
	// Shared action only decides the render lifecycle; transition component and reactive writes stay in the component layer.
	const action = resolveBottomSheetVisibleChangeAction({
		visible,
		wasVisible: Boolean(previousVisible),
		shouldRender: shouldRender.value,
		baseStartTop: bottomSheetState.value.baseStartTop,
		startTop: startTop.value,
		moveDistance: moveDistance.value,
		outDuration: props.outDuration
	});
	if (!action.shouldApplyState) return;

	shouldRender.value = action.nextShouldRender;
	startTop.value = action.nextStartTop;
	moveDistance.value = action.nextMoveDistance;
	isTouch.value = action.nextIsTouch;
	if (action.kind === 'open') {
		updateInnerHeight();
		updateScrollTopHeight();
	}
});

watch(
	() => bottomSheetState.value.baseStartTop,
	(nextStartTop) => {
		if (internalVisible.value && !isTouch.value) {
			startTop.value = nextStartTop;
			moveDistance.value = 0;
		}
	}
);

onMounted(() => {
	updateInnerHeight();
	window.addEventListener('resize', updateInnerHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateInnerHeight);
});
</script>

<template>
	<Mask :visible="internalVisible" :duration="duration" :out-duration="outDuration" v-bind="mask" @click-mask="clickMaskFn" />

	<div v-if="shouldRender" :class="bottomSheetState.layerClass" :style="bottomSheetState.layerStyleValue">
		<MotionTransition
			:visible="internalVisible"
			transition="fly"
			:in-params="bottomSheetState.inParams"
			:out-params="bottomSheetState.outParams"
			:class="bottomSheetState.panelClass"
			:style="bottomSheetState.panelStyleValue"
			@outro-end="handleOutroEnd"
		>
			<div
				ref="scrollTopDom"
				:class="bottomSheetState.dragHandleClass"
				@pointerdown="touchstartFun"
				@pointermove="throttledTouchmoveFun"
				@pointerup="touchendFun"
				@pointercancel="touchendFun"
			>
				<div :class="bottomSheetState.dragIndicatorClass" />
				<div :class="bottomSheetState.headerRowClass">
					<button v-if="showBackIcon" type="button" :class="bottomSheetState.iconButtonClass" aria-label="back" @click="backFunc">
						<!-- 公共 BottomSheet 图标 SVG 数据在 common 中维护。 / Shared BottomSheet SVG data lives in common. -->
						<SvgIcon :svg="arrowLeftSvg" width="16" height="16" :class-name="bottomSheetState.iconSvgClass" />
					</button>
					<div :class="bottomSheetState.headerTitleClass">{{ bottomSheetState.finalTitle }}</div>
					<button
						v-if="bottomSheetState.closeContentState.kind === 'closeIcon'"
						type="button"
						:class="bottomSheetState.iconButtonClass"
						:aria-label="bottomSheetState.closeContentState.ariaLabel"
						@click="closeFunc"
					>
						<SvgIcon :svg="closeSvg" width="16" height="16" :class-name="bottomSheetState.iconSvgClass" />
					</button>
					<button
						v-else-if="bottomSheetState.closeContentState.kind === 'downIcon'"
						type="button"
						:class="bottomSheetState.iconButtonClass"
						:aria-label="bottomSheetState.closeContentState.ariaLabel"
						@click="closeFunc"
					>
						<SvgIcon :svg="downSvg" width="16" height="16" :class-name="bottomSheetState.iconSvgClass" />
					</button>
					<button
						v-else-if="bottomSheetState.closeContentState.kind === 'text'"
						type="button"
						:class="bottomSheetState.closeTextButtonClass"
						@click="closeFunc"
					>
						{{ bottomSheetState.closeContentState.text }}
					</button>
				</div>
			</div>
			<div v-if="showDivider" :class="bottomSheetState.dividerClass" />
			<div :class="bottomSheetState.contentScrollClass" :style="bottomSheetState.contentStyleValue">
				<slot />
			</div>
		</MotionTransition>
	</div>
</template>
