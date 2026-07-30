<script setup lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref, useSlots, watch, type PropType } from 'vue';
import { isBrowser } from '@any-tdf/common/utils';
import {
	resolveImagePreviewBodyOverflowStyle,
	resolveImagePreviewCloseAction,
	resolveImagePreviewDerived,
	resolveImagePreviewInitialRendered,
	resolveImagePreviewInitialVisible,
	resolveImagePreviewLoadStatusAction,
	resolveImagePreviewPointerDownState,
	resolveImagePreviewPointerList,
	resolveImagePreviewPointerMoveState,
	resolveImagePreviewPointerUpAction,
	resolveImagePreviewPointerUpState,
	resolveImagePreviewRenderedState,
	resolveImagePreviewRotateAction,
	resolveImagePreviewRotationAnimationAction,
	resolveImagePreviewRotationResetAction,
	resolveImagePreviewStateOptions,
	resolveImagePreviewSwitchAction,
	resolveImagePreviewTransformResetAction,
	resolveImagePreviewVisibleResetAction
} from '@any-tdf/common/derived/imagePreview';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { arrowLeftSvg, arrowRightSvg, imageLineSvg, imageRotateSvg } from '@any-tdf/common/svg/common';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import type { ImagePreviewItemProps, ImagePreviewProps, VueNode } from '../types';
import { zh_CN, type LangProps } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import Loading from './Loading.vue';
import Mask from './Mask.vue';
import SvgIcon from './SvgIcon.vue';

type PointerData = {
	clientX: number;
	clientY: number;
};
type RotationValue = 0 | 90 | 180 | 270;
type LoadStatus = 'loading' | 'loaded' | 'error';
type ImagePreviewComponentProps = Omit<ImagePreviewProps, 'children' | 'loadingChild' | 'errorChild' | 'indexChild'> & {
	children?: ((item: ImagePreviewItemProps, index: number) => VueNode) | VueNode;
	loadingChild?: () => VueNode;
	errorChild?: () => VueNode;
	indexChild?: (current: number, total: number) => VueNode;
};

const RenderNode = defineComponent({
	name: 'RenderNode',
	props: {
		node: {
			type: null as unknown as PropType<VueNode>,
			default: null
		}
	},
	setup: (renderProps) => () => renderProps.node ?? null
});

const props = withDefaults(defineProps<ImagePreviewComponentProps>(), {
	visible: false,
	images: () => [],
	current: 0,
	loop: true,
	swipeDuration: 300,
	minScale: 0.5,
	maxScale: 3,
	closePosition: 'tr',
	showNavigation: true,
	navigationPosition: 'center',
	maskClosable: false,
	showIndex: true,
	indicatorType: 'number',
	zIndex: 1000,
	duration: 300,
	outDuration: 200,
	mask: () => ({}),
	icon: () => ({}),
	showRotation: false,
	rotationIcon: () => ({})
});

const emit = defineEmits<{
	(event: 'update:visible', value: boolean): void;
	(event: 'update:current', value: number): void;
	(event: 'change', value: number): void;
	(event: 'close'): void;
	(event: 'scale', value: number): void;
	(event: 'rotate', value: RotationValue): void;
}>();

const config = useConfig();
const slots = useSlots();
const innerVisible = ref(resolveImagePreviewInitialVisible(props.visible));
const rendered = ref(resolveImagePreviewInitialRendered(props.visible));
const currentIndex = ref(props.current);
const loadStatus = ref<Record<number, LoadStatus>>({});
const rotationStatus = ref<Record<number, number>>({});
const isResettingRotation = ref(false);
const currentScale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isMoving = ref(false);
const isSwiping = ref(false);
const swipeOffset = ref(0);
const isPinching = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);
const activePointers = new Map<number, PointerData>();
const startX = ref(0);
const startY = ref(0);
const swipeStartX = ref(0);
const pinchStartDistance = ref(0);
const pinchStartScale = ref(1);
const hasMoved = ref(false);

const imagePreviewLang = computed(() => (config.locale?.imagePreview || zh_CN.imagePreview) as NonNullable<LangProps['imagePreview']>);
// 公共派生层统一 ImagePreview 的展示数据、style、控制区状态和图标参数，事件与 DOM 副作用留在组件层。
// Shared derivation centralizes ImagePreview display data, styles, control state and icon params; events and DOM side effects stay in the component layer.
const imagePreviewState = computed(() =>
	resolveImagePreviewDerived<
		ImagePreviewItemProps,
		NonNullable<ImagePreviewComponentProps['icon']>,
		NonNullable<ImagePreviewComponentProps['rotationIcon']>
	>(
		resolveImagePreviewStateOptions<
			ImagePreviewItemProps,
			NonNullable<ImagePreviewComponentProps['icon']>,
			NonNullable<ImagePreviewComponentProps['rotationIcon']>
		>({
			props: {
				images: props.images,
				closePosition: props.closePosition,
				zIndex: props.zIndex,
				duration: props.duration,
				outDuration: props.outDuration,
				icon: props.icon,
				rotationIcon: props.rotationIcon,
				loop: props.loop,
				navigationPosition: props.navigationPosition,
				showIndex: props.showIndex,
				showNavigation: props.showNavigation,
				swipeDuration: props.swipeDuration
			},
			currentIndex: currentIndex.value,
			currentScale: currentScale.value,
			translateX: translateX.value,
			translateY: translateY.value,
			rotationStatus: rotationStatus.value,
			loadStatus: loadStatus.value,
			loadingContentVisible: Boolean(slots.loading || props.loadingChild),
			errorContentVisible: Boolean(slots.error || props.errorChild),
			isMoving: isMoving.value,
			isPinching: isPinching.value,
			isResettingRotation: isResettingRotation.value,
			isSwiping: isSwiping.value,
			swipeOffset: swipeOffset.value
		})
	)
);

const resetTransform = () => {
	const action = resolveImagePreviewTransformResetAction();
	currentScale.value = action.currentScale;
	translateX.value = action.translateX;
	translateY.value = action.translateY;
};

const emitChange = (index: number) => {
	emit('update:current', index);
	emit('change', index);
};

const emitClose = () => {
	emit('close');
};

const emitScale = (scale: number) => {
	emit('scale', scale);
};

const emitRotate = (rotation: RotationValue) => {
	emit('rotate', rotation);
};

const close = () => {
	// 公共 action 只返回关闭状态和变换重置值，事件触发留在组件内。
	// Shared action only returns close state and transform reset values; event dispatch stays in the component.
	const action = resolveImagePreviewCloseAction({ visible: innerVisible.value });
	if (!action.shouldClose) return;
	innerVisible.value = action.nextVisible;
	emit('update:visible', action.nextVisible);
	currentScale.value = action.currentScale;
	translateX.value = action.translateX;
	translateY.value = action.translateY;
	if (action.shouldEmitClose) emitClose();
};

const switchImage = (index: number) => {
	if (imagePreviewState.value.total === 0) return;
	const action = resolveImagePreviewSwitchAction({
		currentIndex: currentIndex.value,
		requestedIndex: index,
		total: imagePreviewState.value.total,
		loop: props.loop
	});
	if (!action.shouldChange) return;
	currentIndex.value = action.nextIndex;
	currentScale.value = action.currentScale;
	translateX.value = action.translateX;
	translateY.value = action.translateY;
	emitChange(action.nextIndex);
};

const prev = () => switchImage(currentIndex.value - 1);
const next = () => switchImage(currentIndex.value + 1);

const handlePointerDown = (event: PointerEvent) => {
	containerRef.value?.setPointerCapture(event.pointerId);
	activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

	// 公共手势派生只返回下一步状态，pointer capture 和 ref 赋值留在组件内。
	// Shared gesture derivation only returns next state; pointer capture and ref assignment stay in the component.
	const pointerState = resolveImagePreviewPointerDownState({
		currentScale: currentScale.value,
		pointers: resolveImagePreviewPointerList(activePointers.values())
	});
	hasMoved.value = pointerState.hasMoved;
	isPinching.value = pointerState.isPinching;
	isSwiping.value = pointerState.isSwiping;
	isMoving.value = pointerState.isMoving;
	if (pointerState.startX !== undefined) startX.value = pointerState.startX;
	if (pointerState.startY !== undefined) startY.value = pointerState.startY;
	if (pointerState.swipeStartX !== undefined) swipeStartX.value = pointerState.swipeStartX;
	if (pointerState.swipeOffset !== undefined) swipeOffset.value = pointerState.swipeOffset;
	if (pointerState.pinchStartDistance !== undefined) pinchStartDistance.value = pointerState.pinchStartDistance;
	if (pointerState.pinchStartScale !== undefined) pinchStartScale.value = pointerState.pinchStartScale;
};

const applyPointerMoveState = (pointerState: ReturnType<typeof resolveImagePreviewPointerMoveState>, event: PointerEvent) => {
	if (pointerState.hasMoved) hasMoved.value = true;
	if (pointerState.nextScale !== undefined) {
		currentScale.value = pointerState.nextScale;
		emitScale(pointerState.nextScale);
	}
	if (pointerState.swipeOffset !== undefined) swipeOffset.value = pointerState.swipeOffset;
	if (pointerState.translateDeltaX !== undefined) translateX.value += pointerState.translateDeltaX;
	if (pointerState.translateDeltaY !== undefined) translateY.value += pointerState.translateDeltaY;
	if (pointerState.nextStartX !== undefined) startX.value = pointerState.nextStartX;
	if (pointerState.nextStartY !== undefined) startY.value = pointerState.nextStartY;
	if (pointerState.preventDefault) event.preventDefault();
};

const handlePointerMove = (event: PointerEvent) => {
	if (!activePointers.has(event.pointerId)) return;
	activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

	const pointerState = resolveImagePreviewPointerMoveState({
		pointers: resolveImagePreviewPointerList(activePointers.values()),
		point: { clientX: event.clientX, clientY: event.clientY },
		currentScale: currentScale.value,
		isPinching: isPinching.value,
		isSwiping: isSwiping.value,
		isMoving: isMoving.value,
		pinchStartDistance: pinchStartDistance.value,
		pinchStartScale: pinchStartScale.value,
		minScale: props.minScale,
		maxScale: props.maxScale,
		startX: startX.value,
		startY: startY.value,
		swipeStartX: swipeStartX.value
	});
	applyPointerMoveState(pointerState, event);
};

const handlePointerUp = (event: PointerEvent) => {
	const container = containerRef.value;
	if (container?.hasPointerCapture(event.pointerId)) {
		container.releasePointerCapture(event.pointerId);
	}
	activePointers.delete(event.pointerId);

	const pointerState = resolveImagePreviewPointerUpState({
		pointers: resolveImagePreviewPointerList(activePointers.values()),
		currentScale: currentScale.value,
		isSwiping: isSwiping.value,
		swipeOffset: swipeOffset.value,
		viewportWidth: resolveViewportDimension({ value: window.innerWidth }),
		hasMoved: hasMoved.value,
		maskClosable: props.maskClosable
	});
	const pointerAction = resolveImagePreviewPointerUpAction({
		pointerCount: activePointers.size,
		pointerState
	});

	if (pointerAction.kind === 'continueTracking') {
		const pointerFlags = pointerAction.pointerFlags;
		isPinching.value = pointerFlags.isPinching;
		isSwiping.value = pointerFlags.isSwiping;
		isMoving.value = pointerFlags.isMoving;
		if (pointerAction.startX !== undefined) startX.value = pointerAction.startX;
		if (pointerAction.startY !== undefined) startY.value = pointerAction.startY;
		if (pointerAction.swipeStartX !== undefined) swipeStartX.value = pointerAction.swipeStartX;
		return;
	}

	if (pointerAction.kind !== 'settled') return;

	// 公共动作决策负责纯分支判断，组件层负责状态写入和 emit。
	// Shared action decision handles pure branching while the component layer writes state and emits.
	const pointerFlags = pointerAction.pointerFlags;
	isPinching.value = pointerFlags.isPinching;
	isMoving.value = pointerFlags.isMoving;

	if (pointerAction.shouldResetSwipeOffset) {
		isSwiping.value = pointerFlags.isSwiping;
		if (pointerAction.shouldSwitchPrev) {
			prev();
		} else if (pointerAction.shouldSwitchNext) {
			next();
		}
		swipeOffset.value = 0;
	}

	if (pointerAction.shouldClose) {
		close();
		return;
	}

	if (pointerAction.shouldResetScale) {
		resetTransform();
	}
};

const handleImageLoad = (index: number) => {
	loadStatus.value = resolveImagePreviewLoadStatusAction({
		index,
		loadStatus: loadStatus.value,
		status: 'loaded'
	}).nextLoadStatus as Record<number, LoadStatus>;
};

const handleImageError = (index: number) => {
	loadStatus.value = resolveImagePreviewLoadStatusAction({
		index,
		loadStatus: loadStatus.value,
		status: 'error'
	}).nextLoadStatus as Record<number, LoadStatus>;
};

const handleRotate = () => {
	const action = resolveImagePreviewRotateAction({
		currentIndex: currentIndex.value,
		rotationStatus: rotationStatus.value
	});
	rotationStatus.value = action.nextRotationStatus;
	emitRotate(action.normalizedRotation);

	if (action.shouldResetRotation) {
		const index = action.resetIndex;
		setTimeout(() => {
			isResettingRotation.value = resolveImagePreviewRotationAnimationAction({
				phase: 'start'
			}).nextIsResettingRotation;
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					rotationStatus.value = resolveImagePreviewRotationResetAction({
						index,
						rotationStatus: rotationStatus.value
					}).nextRotationStatus;
					setTimeout(() => {
						isResettingRotation.value = resolveImagePreviewRotationAnimationAction({
							phase: 'end'
						}).nextIsResettingRotation;
					}, 20);
				});
			});
		}, 200);
	}
};

const getCustomContent = () => {
	if (typeof props.children === 'function') {
		return props.children(imagePreviewState.value.currentImage, currentIndex.value);
	}
	return props.children;
};

watch(
	() => props.visible,
	(value) => {
		innerVisible.value = resolveImagePreviewInitialVisible(value);
	}
);

watch(
	() => innerVisible.value,
	(value) => {
		rendered.value = resolveImagePreviewRenderedState({
			visible: value,
			outDuration: props.outDuration,
			currentRendered: rendered.value
		});
		if (value) {
			const action = resolveImagePreviewVisibleResetAction();
			currentScale.value = action.currentScale;
			translateX.value = action.translateX;
			translateY.value = action.translateY;
			swipeOffset.value = action.swipeOffset;
			isSwiping.value = action.pointerFlags.isSwiping;
			isMoving.value = action.pointerFlags.isMoving;
			isPinching.value = action.pointerFlags.isPinching;
			// DOM 写入保留在组件内，公共函数只返回要写入的值。
			// Keep DOM writes in component code; the shared helper only returns the value to apply.
			if (isBrowser) document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible: value });
			return;
		}
		if (isBrowser) document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible: value });
	},
	{ immediate: true }
);

watch(
	() => props.current,
	(value) => {
		currentIndex.value = value;
	}
);

watch(
	() => props.images,
	() => {
		loadStatus.value = {};
		rotationStatus.value = {};
	},
	{ deep: true }
);

onBeforeUnmount(() => {
	if (isBrowser) document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible: false });
	activePointers.clear();
});
</script>

<template>
	<template v-if="rendered">
		<Mask :visible="innerVisible" opacity="0.9" :duration="duration" :out-duration="outDuration" v-bind="mask" :z-index="zIndex" />
		<MotionTransition
			:visible="innerVisible"
			transition="fade"
			:in-params="imagePreviewState.inParams"
			:out-params="imagePreviewState.outParams"
			:class="imagePreviewState.overlayClass"
			:style="imagePreviewState.overlayStyleValue"
			@outro-end="rendered = false"
		>
			<div
				ref="containerRef"
				:class="imagePreviewState.containerClass"
				@pointerdown="handlePointerDown"
				@pointermove="handlePointerMove"
				@pointerup="handlePointerUp"
				@pointercancel="handlePointerUp"
			>
				<div :class="imagePreviewState.slideClass" :style="imagePreviewState.slideStyleValue">
					<div
						v-for="imageDisplayItem in imagePreviewState.imageDisplayItems"
						:key="`${imageDisplayItem.item.url}-${imageDisplayItem.index}`"
						:class="imagePreviewState.itemClass"
					>
						<div v-if="imageDisplayItem.displayState.showLoading" :class="imagePreviewState.loadingClass">
							<slot v-if="slots.loading" name="loading" />
							<RenderNode v-else-if="imageDisplayItem.displayState.showCustomLoading" :node="loadingChild?.()" />
							<Loading v-else height="12" width="12" theme />
						</div>

						<div v-if="imageDisplayItem.displayState.showError" :class="imagePreviewState.errorClass">
							<slot v-if="slots.error" name="error" />
							<RenderNode v-else-if="imageDisplayItem.displayState.showCustomError" :node="errorChild?.()" />
							<template v-else>
								<!-- 公共图片占位 SVG 数据在 common 中维护。 / Shared image placeholder SVG data lives in common. -->
								<SvgIcon :svg="imageLineSvg" width="48" height="48" :class-name="imagePreviewState.errorIconClass" />
								<span :class="imagePreviewState.errorTextClass">{{ imagePreviewLang.loadFailedText }}</span>
							</template>
						</div>
						<img
							v-else-if="imageDisplayItem.displayState.showImage"
							:src="imageDisplayItem.item.url"
							:alt="imageDisplayItem.alt"
							:class="imagePreviewState.imageClass"
							:style="imageDisplayItem.imageStyleValue"
							draggable="false"
							@load="handleImageLoad(imageDisplayItem.index)"
							@error="handleImageError(imageDisplayItem.index)"
						/>
					</div>
				</div>

				<div v-if="$slots.default || children" :class="imagePreviewState.customContentClass">
					<slot v-if="$slots.default" :item="imagePreviewState.currentImage" :index="currentIndex" />
					<RenderNode v-else :node="getCustomContent()" />
				</div>
			</div>

			<MotionTransition
				:visible="true"
				transition="scale"
				:in-params="imagePreviewState.controlScaleParams"
				:class="imagePreviewState.controlPanelClass"
			>
				<button v-if="showRotation" type="button" :class="imagePreviewState.controlButtonClass" aria-label="Rotate" @click="handleRotate">
					<!-- 公共 ImagePreview 旋转 SVG 数据在 common 中维护。 / Shared ImagePreview rotate SVG data lives in common. -->
					<SvgIcon
						:svg="imageRotateSvg"
						:width="imagePreviewState.mergedRotationIcon.size"
						:height="imagePreviewState.mergedRotationIcon.size"
					/>
				</button>
				<button type="button" :class="imagePreviewState.controlButtonClass" @click="close">
					<Icon v-bind="imagePreviewState.mergedIcon" />
				</button>
			</MotionTransition>

			<template v-if="imagePreviewState.controlState.showCenterNavigation">
				<MotionTransition
					v-if="imagePreviewState.controlState.showCenterPrev"
					:visible="true"
					as="button"
					type="button"
					transition="scale"
					:in-params="imagePreviewState.controlScaleParams"
					:class="imagePreviewState.centerPrevButtonClass"
					aria-label="Previous"
					@click="prev"
				>
					<!-- 公共 ImagePreview 导航 SVG 数据在 common 中维护。 / Shared ImagePreview navigation SVG data lives in common. -->
					<SvgIcon :svg="arrowLeftSvg" width="24" height="24" />
				</MotionTransition>
				<MotionTransition
					v-if="imagePreviewState.controlState.showCenterNext"
					:visible="true"
					as="button"
					type="button"
					transition="scale"
					:in-params="imagePreviewState.controlScaleParams"
					:class="imagePreviewState.centerNextButtonClass"
					aria-label="Next"
					@click="next"
				>
					<SvgIcon :svg="arrowRightSvg" width="24" height="24" />
				</MotionTransition>
			</template>

			<div v-if="imagePreviewState.controlState.showBottomBar" :class="imagePreviewState.bottomBarClass">
				<MotionTransition
					v-if="imagePreviewState.controlState.showBottomPrev"
					:visible="true"
					as="button"
					type="button"
					transition="scale"
					:in-params="imagePreviewState.controlScaleParams"
					:class="imagePreviewState.controlButtonClass"
					aria-label="Previous"
					@click="prev"
				>
					<SvgIcon :svg="arrowLeftSvg" width="24" height="24" />
				</MotionTransition>

				<template v-if="imagePreviewState.controlState.showIndex">
					<slot v-if="$slots.index" name="index" :current="currentIndex + 1" :total="imagePreviewState.total" />
					<RenderNode v-else-if="indexChild" :node="indexChild(currentIndex + 1, imagePreviewState.total)" />
					<div v-else-if="indicatorType === 'dot'" :class="imagePreviewState.dotListClass">
						<button
							v-for="dotItem in imagePreviewState.dotItems"
							:key="`dot-${dotItem.index}`"
							type="button"
							:class="dotItem.className"
							:aria-label="`Go to image ${dotItem.index + 1}`"
							@click="switchImage(dotItem.index)"
						/>
					</div>
					<span v-else-if="indicatorType === 'number'" :class="imagePreviewState.indexNumberClass">
						{{ currentIndex + 1 }} / {{ imagePreviewState.total }}
					</span>
				</template>

				<MotionTransition
					v-if="imagePreviewState.controlState.showBottomNext"
					:visible="true"
					as="button"
					type="button"
					transition="scale"
					:in-params="imagePreviewState.controlScaleParams"
					:class="imagePreviewState.controlButtonClass"
					aria-label="Next"
					@click="next"
				>
					<SvgIcon :svg="arrowRightSvg" width="24" height="24" />
				</MotionTransition>
			</div>
		</MotionTransition>
	</template>
</template>
