<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { isBrowser } from '@any-tdf/common/utils';
import type { ToastProps } from '../types';
import {
	resolveToastDerived,
	resolveToastInitialRendered,
	resolveToastOutroEndAction,
	resolveToastStateOptions,
	resolveToastVisibilityFlow
} from '@any-tdf/common/derived/toast';
import { resolveMapValue, resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import Icon from './Icon.vue';
import Loading from './Loading.vue';
import Mask from './Mask.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<ToastProps & {}>(), {
	message: '',
	visible: false,
	duration: 2000,
	position: 'center',
	py: '0',
	radius: '',
	transitionType: 'scale',
	transitionParams: () => ({}),
	outDuration: 0,
	easeType: 'cubicOut',
	easeOutType: 'cubicOut',
	zIndex: 1000,
	type: null,
	mask: () => ({}),
	loading: () => ({}),
	icon: () => ({}),
	clickable: false,
	dynamicFixed: true
});

const emit = defineEmits<{
	'update:visible': [value: boolean];
	close: [];
}>();

const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);
const rendered = ref(resolveToastInitialRendered(props.visible));
let timer: ReturnType<typeof setTimeout> | null = null;

// 公共派生层处理 Toast 的 class、过渡参数和纯渲染状态，计时器与 DOM 监听留在组件内。
// Shared derivations cover Toast classes, transition params and pure render state; timers and DOM listeners stay here.
const toastState = computed(() =>
	resolveToastDerived(
		resolveToastStateOptions({
			easeIn: resolveMapValue(easingFunctions, props.easeType, 'cubicOut'),
			easeOut: resolveMapValue(easingFunctions, props.easeOutType, 'cubicOut'),
			innerHeight: innerHeight.value,
			props: { ...props, transitionParams: props.transitionParams as Record<string, unknown> }
		})
	)
);

const closeToast = () => {
	emit('update:visible', false);
	emit('close');
};

const clearCloseTimer = () => {
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
};

const handleResize = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

watch(
	() => [props.visible, props.duration] as const,
	([visible, duration]) => {
		clearCloseTimer();
		// 公共 visibility flow 返回 rendered 同步结果和自动关闭计划，状态写入与 timer 留在组件内。
		// Shared visibility flow returns rendered sync results and auto-close planning; state writes and timers stay in the component.
		const flow = resolveToastVisibilityFlow({
			visible,
			currentRendered: rendered.value,
			transitionType: props.transitionType,
			outDuration: props.outDuration,
			duration
		});
		if (flow.shouldUpdateRendered) {
			rendered.value = flow.nextRendered;
		}
		if (isBrowser && flow.shouldScheduleClose) {
			timer = setTimeout(() => {
				if (flow.shouldEmitClose) closeToast();
			}, flow.delayMs);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	if (isBrowser && props.dynamicFixed) {
		window.addEventListener('resize', handleResize);
	}
});

onBeforeUnmount(() => {
	clearCloseTimer();
	if (!isBrowser) return;
	window.removeEventListener('resize', handleResize);
});
</script>

<template>
	<template v-if="rendered">
		<Mask v-if="visible" v-bind="mask" :visible="visible" :clickable="clickable" opacity="0" :out-duration="outDuration" />

		<div :class="toastState.containerClass" :style="toastState.containerStyleValue">
			<MotionTransition
				:visible="visible"
				:transition="transitionType"
				:in-params="toastState.inParams"
				:out-params="toastState.outParams"
				:class="toastState.transitionClass"
				@outro-end="
					() => {
						const action = resolveToastOutroEndAction({ currentRendered: rendered });
						if (action.shouldUpdateRendered) rendered = action.nextRendered;
					}
				"
			>
				<div :class="toastState.contentClass">
					<slot v-if="$slots.default" />
					<template v-else>
						<div v-if="toastState.iconFrameState.shouldRender" class="mb-2">
							<Loading v-if="toastState.iconFrameState.icon.kind === 'loading'" inverse v-bind="loading" />
							<Icon v-else-if="toastState.iconFrameState.icon.kind === 'icon'" :size="30" v-bind="icon" />
							<SvgIcon
								v-else-if="toastState.iconFrameState.icon.kind === 'svg'"
								:svg="toastState.iconFrameState.icon.svg"
								width="30"
								height="30"
								:class-name="toastState.iconFrameState.icon.className"
							/>
						</div>
						<div>{{ message }}</div>
					</template>
				</div>
			</MotionTransition>
		</div>
	</template>
</template>
