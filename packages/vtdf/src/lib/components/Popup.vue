<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { PopupProps } from '../types';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import {
	resolvePopupDerived,
	resolvePopupMaskClickFlow,
	resolvePopupRenderEndAction,
	resolvePopupRenderState,
	resolvePopupStateOptions,
	resolvePopupTransitionDerived,
	resolvePopupTransitionStateOptions,
	resolvePopupViewportSize
} from '@any-tdf/common/derived/popup';
import { resolveMapValue } from '@any-tdf/common/derived/helpers';
import Mask from './Mask.vue';

const props = withDefaults(defineProps<PopupProps & {}>(), {
	visible: false,
	size: 40,
	position: 'bottom',
	duration: 450,
	outDuration: 240,
	easeType: 'cubicOut',
	easeOutType: 'cubicOut',
	px: '0',
	py: '0',
	mask: () => ({}),
	maskClosable: true,
	radiusPosition: 'auto',
	radius: '',
	transitionDistance: 0,
	transparent: false,
	zIndex: 600,
	dynamicFixed: true,
	hideScrollbar: false
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	close: [];
	clickMask: [];
}>();

const getViewportSize = () =>
	typeof window === 'undefined'
		? resolvePopupViewportSize()
		: resolvePopupViewportSize({ height: window.innerHeight, width: window.innerWidth });
const initialViewportSize = getViewportSize();
const innerHeight = ref(initialViewportSize.height);
const innerWidth = ref(initialViewportSize.width);
const shouldRender = ref(resolvePopupRenderState({ visible: props.visible }));

// 公共派生层只处理 Popup 状态推导，事件、窗口读取和动画绑定留在组件内。
// The shared derived layer only handles Popup state derivation; events, window reads and animation bindings stay in the component.
const popupState = computed(() =>
	resolvePopupDerived(
		resolvePopupStateOptions({
			innerHeight: innerHeight.value,
			props: {
				position: props.position,
				radiusPosition: props.radiusPosition,
				radius: props.radius,
				zIndex: props.zIndex,
				transparent: props.transparent,
				hideScrollbar: props.hideScrollbar
			}
		})
	)
);
const transitionState = computed(() =>
	resolvePopupTransitionDerived(
		resolvePopupTransitionStateOptions({
			props: {
				position: props.position,
				size: props.size,
				transitionDistance: props.transitionDistance,
				px: props.px,
				py: props.py,
				duration: props.duration,
				outDuration: props.outDuration,
				easing: resolveMapValue(easingFunctions, props.easeType, 'cubicOut'),
				outEasing: resolveMapValue(easingFunctions, props.easeOutType, 'cubicOut')
			},
			viewportHeight: innerHeight.value,
			viewportWidth: innerWidth.value
		})
	)
);

const clickMask = () => {
	emit('clickMask');
	// 公共流程只返回遮罩点击和关闭决策，事件派发和 v-model 更新留在组件层。
	// Shared flow only returns mask-click and close decisions; event dispatch and v-model updates stay in the component layer.
	const action = resolvePopupMaskClickFlow({
		maskClosable: props.maskClosable,
		visible: props.visible
	});
	if (!action.closeAction.shouldClose) return;
	emit('update:visible', action.closeAction.nextVisible);
	if (action.closeAction.shouldEmitClose) emit('close');
};

const handleResize = () => {
	const viewportSize = getViewportSize();
	innerHeight.value = viewportSize.height;
	innerWidth.value = viewportSize.width;
};

watch(
	() => props.visible,
	(visible) => {
		const nextRender = resolvePopupRenderState({
			visible,
			outDuration: props.outDuration,
			currentRender: shouldRender.value
		});
		if (visible) {
			shouldRender.value = nextRender;
			handleResize();
			return;
		}
		shouldRender.value = nextRender;
	},
	{ immediate: true }
);

const handleOutroEnd = () => {
	const action = resolvePopupRenderEndAction();
	shouldRender.value = action.nextShouldRender;
};

onMounted(() => {
	if (props.dynamicFixed) {
		window.addEventListener('resize', handleResize);
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<template>
	<component :is="'style'" v-html="popupState.css" />
	<Mask :visible="visible" :duration="duration" :out-duration="outDuration" v-bind="mask" @click-mask="clickMask" />

	<div v-if="shouldRender" :class="popupState.wrapperClass" :style="popupState.wrapperStyleValue">
		<MotionTransition
			:visible="visible"
			:transition="transitionState.transitionName"
			:in-params="transitionState.inParams"
			:out-params="transitionState.outParams"
			:class="transitionState.transitionClass"
			:style="transitionState.sizeStyleValue"
			@outro-end="handleOutroEnd"
		>
			<div :class="popupState.panelClass">
				<slot />
			</div>
		</MotionTransition>
	</div>
</template>
