<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import type { AlertProps } from '../types';
import { isBrowser } from '@any-tdf/common/utils';
import {
	resolveAlertCloseFlow,
	resolveAlertDerived,
	resolveAlertInitialClosingBySelf,
	resolveAlertInitialRendered,
	resolveAlertInitialVisible,
	resolveAlertOutroEndAction,
	resolveAlertRenderedState,
	resolveAlertShouldAutoClose,
	resolveAlertStateOptions
} from '@any-tdf/common/derived/alert';
import { resolveMapValue } from '@any-tdf/common/derived/helpers';
import { closePlainSvg } from '@any-tdf/common/svg/common';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import Card from './Card.vue';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<AlertProps & {}>(), {
	visible: false,
	title: '',
	message: '',
	duration: 3000,
	position: 'top',
	py: '20',
	type: null,
	showIcon: true,
	icon: () => ({}),
	closable: true,
	inverse: true,
	card: () => ({}),
	transitionType: 'fly',
	transitionParams: () => ({}),
	outDuration: 300,
	easeType: 'cubicOut',
	easeOutType: 'cubicOut',
	zIndex: 1000,
	clickable: true,
	injClass: ''
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	close: [];
}>();

const innerVisible = ref(resolveAlertInitialVisible(props.visible));
const rendered = ref(resolveAlertInitialRendered(props.visible));
const slots = useSlots();
let closingBySelf = resolveAlertInitialClosingBySelf();
let timer: ReturnType<typeof setTimeout> | null = null;

// 公共派生层处理 Alert 的 class、过渡参数和纯状态判断，事件留在组件内。
// Shared derivations cover Alert classes, transition params and pure state decisions; events stay here.
const alertState = computed(() =>
	resolveAlertDerived(
		resolveAlertStateOptions({
			easeIn: resolveMapValue(easingFunctions, props.easeType, 'cubicOut'),
			easeOut: resolveMapValue(easingFunctions, props.easeOutType, 'cubicOut'),
			hasCustomContent: Boolean(slots.default),
			props: {
				...props,
				cardRadius: props.card.radius,
				transitionParams: props.transitionParams as Record<string, unknown>
			}
		})
	)
);

const emitClose = () => {
	emit('close');
};

const requestClose = () => {
	// 公共 close flow 只返回关闭和立即收尾意图，事件触发和过渡结束仍留在组件内。
	// Shared close flow only returns close and immediate-completion intent; event dispatch and transition end stay in the component.
	const flow = resolveAlertCloseFlow({
		visible: innerVisible.value,
		closingBySelf,
		currentRendered: rendered.value,
		transitionType: props.transitionType,
		outDuration: props.outDuration
	});
	if (!flow.shouldClose) return;
	closingBySelf = flow.nextClosingBySelf;
	innerVisible.value = flow.nextVisible;
	emit('update:visible', false);
	if (flow.shouldEmitClose) {
		rendered.value = flow.nextRendered;
		emitClose();
	}
};

const handleOutroEnd = () => {
	const action = resolveAlertOutroEndAction({
		visible: innerVisible.value,
		emitClose: closingBySelf
	});
	if (!action.shouldComplete) return;
	rendered.value = action.nextRendered;
	if (action.shouldEmitClose) emitClose();
	closingBySelf = action.nextClosingBySelf;
};

watch(
	() => props.visible,
	(visible) => {
		const nextVisible = resolveAlertInitialVisible(visible);
		innerVisible.value = nextVisible;
		if (nextVisible) {
			rendered.value = resolveAlertRenderedState({
				visible: nextVisible,
				currentRendered: rendered.value,
				transitionType: props.transitionType,
				outDuration: props.outDuration
			});
			const action = resolveAlertOutroEndAction({ visible: nextVisible, emitClose: false });
			closingBySelf = action.nextClosingBySelf;
		}
	},
	{ immediate: true }
);

watch(
	() => [innerVisible.value, props.duration] as const,
	([visible, duration]) => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		// 公共 action 只判断是否需要自动关闭，timer 调度和关闭事件留在组件层。
		// Shared action only decides whether auto close is needed; timer scheduling and close events stay in the component layer.
		if (isBrowser && resolveAlertShouldAutoClose({ visible, duration })) {
			timer = setTimeout(requestClose, duration);
		}
	},
	{ immediate: true }
);
</script>

<template>
	<MotionTransition
		v-if="rendered"
		:visible="innerVisible"
		:transition="transitionType"
		:in-params="alertState.inParams"
		:out-params="alertState.outParams"
		:class="alertState.containerClass"
		:style="alertState.containerStyleValue"
		@outro-end="handleOutroEnd"
	>
		<div :class="alertState.contentClass">
			<Card shadow="lg" mx="0" my="0" :bg="alertState.cardBg" v-bind="card">
				<div :class="alertState.bodyClass">
					<div
						v-if="alertState.contentState.showTypeIcon && alertState.contentState.typeIcon"
						:class="alertState.contentState.typeIcon.wrapperClass"
					>
						<!-- 公共 SVG 只提供状态图形，Alert 的可见性、事件和过渡仍保留在组件内。 -->
						<!-- Shared SVG only provides status shapes; visibility, events, and transitions stay in Alert. -->
						<SvgIcon :svg="alertState.contentState.typeIcon.svg" width="24" height="24" />
					</div>
					<div v-else-if="alertState.contentState.showCustomIcon" :class="alertState.customIconClass">
						<Icon :size="24" v-bind="icon" />
					</div>

					<div :class="alertState.textContentClass">
						<slot v-if="alertState.contentState.showCustomContent" />
						<template v-else>
							<div v-if="alertState.contentState.showTitle" :class="alertState.titleClass">
								{{ title }}
							</div>
							<div v-if="alertState.contentState.showMessage" :class="alertState.messageClass">
								{{ message }}
							</div>
						</template>
					</div>

					<button
						v-if="alertState.contentState.showClose"
						type="button"
						:class="alertState.closeButtonClass"
						aria-label="Close"
						@click="requestClose"
					>
						<SvgIcon :svg="closePlainSvg" width="18" height="18" />
					</button>
				</div>
			</Card>
		</div>
	</MotionTransition>
</template>
