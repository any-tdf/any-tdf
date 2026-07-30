<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { TooltipVisibilityCommitAction } from '@any-tdf/common/derived/tooltip';
import {
	resolveTooltipDerived,
	resolveTooltipHideForViewportAction,
	resolveTooltipHideFlow,
	resolveTooltipInitialVisible,
	resolveTooltipPosition,
	resolveTooltipRestoreFromViewportAction,
	resolveTooltipShouldBindGlobalListeners,
	resolveTooltipShowFlow,
	resolveTooltipStateOptions,
	resolveTooltipToggleAction,
	resolveTooltipTriggerInViewport,
	resolveTooltipVisibleSyncAction,
	resolveTooltipViewportAction
} from '@any-tdf/common/derived/tooltip';
import { resolveViewportDimension, resolveViewportFallbackDimension } from '@any-tdf/common/derived/helpers';
import { fade, fly } from '@any-tdf/vue-motion/transition';
import { useTransition } from '@any-tdf/vue-motion';
import type { TooltipProps } from '../types';

const props = withDefaults(defineProps<TooltipProps & {}>(), {
	content: '',
	position: 'top',
	visible: false,
	delay: 0,
	hideDelay: 0,
	arrow: true,
	radius: 'sm',
	state: 'black',
	maxWidth: 200,
	zIndex: 800,
	disabled: false,
	injClass: '',
	contentClass: ''
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	show: [];
	hide: [];
}>();

defineSlots<{
	default?: () => unknown;
	content?: () => unknown;
	contentSnippet?: () => unknown;
}>();

const innerVisible = ref(resolveTooltipInitialVisible(props.visible));
const hiddenByViewport = ref(false);
const tooltipTop = ref(0);
const tooltipLeft = ref(0);
const triggerRef = ref<HTMLDivElement | null>(null);
const tooltipRef = ref<HTMLDivElement | null>(null);
const showTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const hideTimer = ref<ReturnType<typeof setTimeout> | null>(null);

// 公共派生层只处理 Tooltip 状态推导，DOM 读取、timer 与监听留在组件内。
// The shared derived layer handles Tooltip state derivation; DOM reads, timers and listeners stay in the component.
const tooltipState = computed(() =>
	resolveTooltipDerived(
		resolveTooltipStateOptions({
			props: {
				disabled: props.disabled,
				injClass: props.injClass,
				maxWidth: props.maxWidth,
				position: props.position,
				radius: props.radius,
				state: props.state,
				zIndex: props.zIndex
			},
			left: tooltipLeft.value,
			top: tooltipTop.value
		})
	)
);

const tooltipTransition = useTransition<HTMLDivElement>(() => innerVisible.value, {
	inTransition: (node) => fly(node, tooltipState.value.inParams),
	outTransition: (node) => fade(node, tooltipState.value.outParams)
});

const emitVisible = (visible: boolean) => {
	innerVisible.value = visible;
	emit('update:visible', visible);
};

const emitShow = () => {
	emit('show');
};

const emitHide = () => {
	emit('hide');
};

const applyVisibilityAction = (action: TooltipVisibilityCommitAction) => {
	if (!action.shouldChange) return;
	hiddenByViewport.value = action.nextHiddenByViewport;
	emitVisible(action.nextVisible);
	if (action.shouldEmitShow) emitShow();
	if (action.shouldEmitHide) emitHide();
};

const setTooltipNode = (node: unknown) => {
	const tooltipNode = node instanceof HTMLDivElement ? node : null;
	tooltipRef.value = tooltipNode;
	tooltipTransition.ref.value = tooltipNode;
};

const updatePosition = () => {
	if (!triggerRef.value || !tooltipRef.value) return;
	const triggerRect = triggerRef.value.getBoundingClientRect();
	const tooltipRect = tooltipRef.value.getBoundingClientRect();
	const nextPosition = resolveTooltipPosition({
		position: props.position,
		triggerRect,
		tooltipRect,
		viewportWidth: resolveViewportDimension({ value: window.innerWidth }),
		viewportHeight: resolveViewportDimension({ value: window.innerHeight })
	});

	tooltipTop.value = nextPosition.top;
	tooltipLeft.value = nextPosition.left;
};

const isTriggerInViewport = () => {
	if (!triggerRef.value) return false;
	const triggerRect = triggerRef.value.getBoundingClientRect();
	const viewportWidth = resolveViewportFallbackDimension({
		value: window.innerWidth,
		fallback: document.documentElement.clientWidth
	});
	const viewportHeight = resolveViewportFallbackDimension({
		value: window.innerHeight,
		fallback: document.documentElement.clientHeight
	});
	return resolveTooltipTriggerInViewport({ triggerRect, viewportWidth, viewportHeight });
};

const clearShowTimer = () => {
	if (showTimer.value) {
		clearTimeout(showTimer.value);
		showTimer.value = null;
	}
};

const clearHideTimer = () => {
	if (hideTimer.value) {
		clearTimeout(hideTimer.value);
		hideTimer.value = null;
	}
};

const hideForViewport = () => {
	clearShowTimer();
	clearHideTimer();
	applyVisibilityAction(
		resolveTooltipHideForViewportAction({
			visible: innerVisible.value,
			hiddenByViewport: hiddenByViewport.value
		})
	);
};

const restoreFromViewport = () => {
	applyVisibilityAction(
		resolveTooltipRestoreFromViewportAction({
			hiddenByViewport: hiddenByViewport.value,
			disabled: props.disabled,
			triggerInViewport: isTriggerInViewport(),
			visible: innerVisible.value
		})
	);
};

const show = () => {
	// 公共 flow 统一推导显示动作，timer 和事件派发留在组件层。
	// The shared flow derives the show action; timers and events stay in the component layer.
	const flow = resolveTooltipShowFlow({
		disabled: props.disabled,
		hiddenByViewport: hiddenByViewport.value,
		delay: props.delay
	});
	if (!flow.shouldShow) return;
	hiddenByViewport.value = flow.nextHiddenByViewport;
	clearHideTimer();
	if (flow.shouldDelay) {
		showTimer.value = setTimeout(() => {
			applyVisibilityAction(flow.commitAction);
		}, flow.delayMs);
		return;
	}
	applyVisibilityAction(flow.commitAction);
};

const hide = () => {
	// 公共 flow 统一推导隐藏动作，timer 和事件派发留在组件层。
	// The shared flow derives the hide action; timers and events stay in the component layer.
	const flow = resolveTooltipHideFlow({ delay: props.hideDelay });
	hiddenByViewport.value = flow.nextHiddenByViewport;
	clearShowTimer();
	if (flow.shouldDelay) {
		hideTimer.value = setTimeout(() => {
			applyVisibilityAction(flow.commitAction);
		}, flow.delayMs);
		return;
	}
	applyVisibilityAction(flow.commitAction);
};

const toggle = (event: MouseEvent) => {
	event.stopPropagation();
	if (resolveTooltipToggleAction(innerVisible.value) === 'hide') {
		hide();
		return;
	}
	show();
};

const handleClickOutside = () => {
	hide();
};

watch(
	() => props.visible,
	(nextVisible) => {
		const action = resolveTooltipVisibleSyncAction({ visible: nextVisible });
		innerVisible.value = action.nextVisible;
		hiddenByViewport.value = action.nextHiddenByViewport;
	}
);

watch(
	() => tooltipTransition.shouldRender.value,
	async (shouldRender) => {
		if (!shouldRender) return;
		await nextTick();
		updatePosition();
	}
);

watch(
	() => [innerVisible.value, hiddenByViewport.value],
	([visible, viewportHidden], _previous, onCleanup) => {
		if (!resolveTooltipShouldBindGlobalListeners({ visible, hiddenByViewport: viewportHidden })) return;
		let frameId = 0;
		const updateOrHide = () => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				const viewportAction = resolveTooltipViewportAction({
					triggerInViewport: isTriggerInViewport(),
					hiddenByViewport: hiddenByViewport.value
				});
				if (viewportAction === 'hideForViewport') {
					hideForViewport();
					return;
				}
				if (viewportAction === 'restoreFromViewport') {
					restoreFromViewport();
					return;
				}
				updatePosition();
			});
		};
		const clickTimer = visible ? setTimeout(() => document.addEventListener('click', handleClickOutside), 0) : null;
		window.addEventListener('scroll', updateOrHide, true);
		window.addEventListener('resize', updateOrHide);
		updateOrHide();

		onCleanup(() => {
			cancelAnimationFrame(frameId);
			if (clickTimer) clearTimeout(clickTimer);
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', updateOrHide, true);
			window.removeEventListener('resize', updateOrHide);
		});
	}
);

onBeforeUnmount(() => {
	clearShowTimer();
	clearHideTimer();
});
</script>

<template>
	<div ref="triggerRef" :class="tooltipState.wrapperClass">
		<div :class="tooltipState.triggerClass" @click="toggle">
			<slot />
		</div>
	</div>

	<div
		v-if="tooltipTransition.shouldRender.value"
		:ref="setTooltipNode"
		:class="tooltipState.panelClass"
		:style="tooltipState.panelStyleValue"
		@click.stop
	>
		<div :class="contentClass">
			<slot v-if="$slots.content" name="content" />
			<slot v-else name="contentSnippet">{{ content }}</slot>
		</div>
		<div v-if="arrow" :class="tooltipState.arrowClass" />
	</div>
</template>
