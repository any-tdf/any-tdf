<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { easingFunctions } from '@any-tdf/vue-motion/easing';
import { useTransition } from '@any-tdf/vue-motion';
import { isBrowser } from '@any-tdf/common/utils';
import {
	resolveActionPopoverActionClickFlow,
	resolveActionPopoverCancelAction,
	resolveActionPopoverCloseAction,
	resolveActionPopoverDerived,
	resolveActionPopoverHideForViewportAction,
	resolveActionPopoverIconProps,
	resolveActionPopoverInlineCloseCompleteAction,
	resolveActionPopoverInlinePositionState,
	resolveActionPopoverInitialVisible,
	resolveActionPopoverMeasuredDimension,
	resolveActionPopoverRenderAction,
	resolveActionPopoverRestoreFromViewportAction,
	resolveActionPopoverRingCloseCompleteAction,
	resolveActionPopoverRingPositionState,
	resolveActionPopoverShouldBindGlobalListeners,
	resolveActionPopoverStateOptions,
	resolveActionPopoverTriggerElement,
	resolveActionPopoverTriggerInViewport,
	resolveActionPopoverViewportAction
} from '@any-tdf/common/derived/actionPopover';
import { resolveActionSheetCancelText } from '@any-tdf/common/derived/actionSheet';
import { resolveViewportDimension, resolveViewportFallbackDimension } from '@any-tdf/common/derived/helpers';
import type { ActionPopoverProps, ActionProps, RingActionProps } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';

const props = withDefaults(defineProps<ActionPopoverProps & {}>(), {
	title: '',
	titleAlign: 'center',
	actions: () => [],
	showCancel: false,
	cancelText: undefined,
	actionClosable: true,
	align: 'center',
	inverse: false,
	layout: 'v',
	gridColumns: 3,
	triggerRef: null,
	inlineAlign: 'center',
	inlineDirection: 'auto',
	inlineOffset: 8,
	inlineShadow: 'md',
	inlineRadius: '',
	ringActions: () => [],
	ringRadius: 0,
	ringItemSize: 44,
	ringShape: 'auto'
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	cancel: [];
	clickAction: [index: number, action: ActionProps | RingActionProps];
	close: [];
}>();

const config = useConfig();
const innerVisible = ref(resolveActionPopoverInitialVisible(props.visible));
const shouldRender = ref(resolveActionPopoverInitialVisible(props.visible));
const positionReady = ref(false);
const inlinePosition = ref({ top: 0, left: 0 });
const actualDirection = ref<'up' | 'down'>('down');
const ringPosition = ref({ x: 0, y: 0 });
const computedRingShape = ref<'full' | 'half' | 'quarter'>('quarter');
const ringStartAngle = ref(0);
const ringAnimate = ref(false);
const hiddenByViewport = ref(false);
const panelRef = ref<HTMLDivElement | null>(null);
const positionFrame = ref<number | null>(null);
const ringAnimationFrame = ref<number | null>(null);
const ringCloseTimer = ref<ReturnType<typeof setTimeout> | null>(null);

const actionPopoverLang = computed(() => config.locale?.actionSheet || zh_CN.actionSheet);
const cancelText = computed(() => resolveActionSheetCancelText(props.cancelText, actionPopoverLang.value));

type VueTriggerRefLike = HTMLElement | { current?: HTMLElement | null } | { value?: HTMLElement | null } | null | undefined;

const resolveTriggerElement = (): HTMLElement | null => {
	const triggerRef = props.triggerRef as VueTriggerRefLike;
	if (isBrowser && triggerRef instanceof HTMLElement) return triggerRef;
	if (triggerRef && typeof triggerRef === 'object' && 'value' in triggerRef) return triggerRef.value ?? null;
	return resolveActionPopoverTriggerElement<HTMLElement>(triggerRef as HTMLElement | { current?: HTMLElement | null } | null | undefined);
};

// 公共派生层只处理 ActionPopover class、style 和过渡参数，DOM 读取与事件留在组件内。
// Shared derived layer only handles ActionPopover classes, styles and transition params; DOM reads and events stay in the component.
const actionPopoverDerived = computed(() =>
	resolveActionPopoverDerived<ActionProps, RingActionProps>(
		resolveActionPopoverStateOptions<ActionProps, RingActionProps>({
			props: {
				actions: props.actions,
				align: props.align,
				gridColumns: props.gridColumns,
				inlineAlign: props.inlineAlign,
				inlineRadius: props.inlineRadius,
				inlineShadow: props.inlineShadow,
				inverse: props.inverse,
				layout: props.layout,
				ringActions: props.ringActions,
				ringItemSize: props.ringItemSize,
				ringRadius: props.ringRadius,
				showCancel: props.showCancel,
				title: props.title,
				titleAlign: props.titleAlign,
				visible: props.visible
			},
			actualDirection: actualDirection.value,
			computedRingShape: computedRingShape.value,
			hiddenByViewport: hiddenByViewport.value,
			inlinePosition: inlinePosition.value,
			innerVisible: innerVisible.value,
			positionReady: positionReady.value,
			ringAnimate: ringAnimate.value,
			ringPosition: ringPosition.value,
			ringStartAngle: ringStartAngle.value
		})
	)
);
const visible = computed(() => actionPopoverDerived.value.visible);
const inlineVisible = computed(() => actionPopoverDerived.value.inlineVisible);

const inlineTransition = useTransition(
	() => inlineVisible.value,
	() => ({
		transition: 'scale',
		inParams: {
			...actionPopoverDerived.value.inlineInParams,
			easing: easingFunctions.cubicOut
		},
		outParams: {
			...actionPopoverDerived.value.inlineOutParams,
			easing: easingFunctions.cubicOut
		},
		onOutroEnd: () => {
			if (props.layout === 'ring') return;
			const action = resolveActionPopoverInlineCloseCompleteAction();
			positionReady.value = action.nextPositionReady;
			shouldRender.value = action.nextShouldRender;
		}
	})
);

const setInlinePanelRef = (node: unknown) => {
	const panelNode = node instanceof HTMLDivElement ? node : null;
	panelRef.value = panelNode;
	inlineTransition.ref.value = panelNode;
	if (panelNode && visible.value && shouldRender.value && props.layout !== 'ring' && !positionReady.value) {
		schedulePosition();
	}
};

const clearFrames = () => {
	if (positionFrame.value !== null) {
		cancelAnimationFrame(positionFrame.value);
		positionFrame.value = null;
	}
	if (ringAnimationFrame.value !== null) {
		cancelAnimationFrame(ringAnimationFrame.value);
		ringAnimationFrame.value = null;
	}
	if (ringCloseTimer.value) {
		clearTimeout(ringCloseTimer.value);
		ringCloseTimer.value = null;
	}
};

const emitVisible = (nextVisible: boolean) => {
	hiddenByViewport.value = false;
	innerVisible.value = nextVisible;
	emit('update:visible', nextVisible);
};

const setViewportHidden = (nextHidden: boolean) => {
	hiddenByViewport.value = nextHidden;
};

const emitClose = () => {
	emit('close');
};

const emitCancel = () => {
	emit('cancel');
};

const emitClickAction = (index: number, item: ActionProps | RingActionProps) => {
	emit('clickAction', index, item);
};

const closePanel = () => {
	const action = resolveActionPopoverCloseAction();
	if (action.shouldClose) emitVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

const calculateRingLayout = () => {
	const triggerElement = resolveTriggerElement();
	if (!triggerElement || props.layout !== 'ring') return false;
	const triggerRect = triggerElement.getBoundingClientRect();
	if (!triggerRect.width || !triggerRect.height) return false;
	const viewportWidth = resolveViewportDimension({ value: window.innerWidth });
	const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
	// 公共位置派生只消费测量结果，DOM 读取保留在组件内。
	// Shared position derivation consumes measurements only; DOM reads stay in the component.
	const positionState = resolveActionPopoverRingPositionState({
		triggerRect,
		viewportWidth,
		viewportHeight,
		itemCount: props.ringActions.length,
		ringShape: props.ringShape
	});
	ringPosition.value = positionState.ringPosition;
	computedRingShape.value = positionState.computedRingShape;
	ringStartAngle.value = positionState.ringStartAngle;
	return true;
};

const calculateInlinePosition = () => {
	const triggerElement = resolveTriggerElement();
	if (!triggerElement || !panelRef.value) return false;
	const triggerRect = triggerElement.getBoundingClientRect();
	const panelRect = panelRef.value.getBoundingClientRect();
	const panelWidth = resolveActionPopoverMeasuredDimension({
		measured: panelRef.value.offsetWidth,
		fallback: panelRect.width
	});
	const panelHeight = resolveActionPopoverMeasuredDimension({
		measured: panelRef.value.offsetHeight,
		fallback: panelRect.height
	});
	if (!triggerRect.width || !triggerRect.height || !panelWidth || !panelHeight) return false;
	const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
	const viewportWidth = resolveViewportDimension({ value: window.innerWidth });

	const positionState = resolveActionPopoverInlinePositionState({
		triggerRect,
		panelWidth,
		panelHeight,
		viewportWidth,
		viewportHeight,
		inlineAlign: props.inlineAlign,
		inlineDirection: props.inlineDirection,
		inlineOffset: props.inlineOffset
	});
	actualDirection.value = positionState.actualDirection;
	inlinePosition.value = positionState.inlinePosition;
	return true;
};

const updatePosition = () => {
	if (props.layout === 'ring') return calculateRingLayout();
	return calculateInlinePosition();
};

const isTriggerInViewport = () => {
	const triggerElement = resolveTriggerElement();
	if (!triggerElement) return false;
	const triggerRect = triggerElement.getBoundingClientRect();
	const viewportWidth = resolveViewportFallbackDimension({
		value: window.innerWidth,
		fallback: document.documentElement.clientWidth
	});
	const viewportHeight = resolveViewportFallbackDimension({
		value: window.innerHeight,
		fallback: document.documentElement.clientHeight
	});
	return resolveActionPopoverTriggerInViewport({ triggerRect, viewportWidth, viewportHeight });
};

const hideForViewport = () => {
	const action = resolveActionPopoverHideForViewportAction({
		visible: visible.value,
		hiddenByViewport: hiddenByViewport.value
	});
	if (!action.shouldChange) return;
	setViewportHidden(action.nextHiddenByViewport);
};

const restoreFromViewport = () => {
	const action = resolveActionPopoverRestoreFromViewportAction({
		hiddenByViewport: hiddenByViewport.value,
		triggerInViewport: isTriggerInViewport()
	});
	if (!action.shouldChange) return;
	setViewportHidden(action.nextHiddenByViewport);
};

const schedulePosition = async () => {
	if (!isBrowser) return;
	clearFrames();
	await nextTick();
	const runPosition = (attempt = 0) => {
		positionFrame.value = requestAnimationFrame(() => {
			positionFrame.value = null;
			const nextReady = props.layout === 'ring' ? calculateRingLayout() : calculateInlinePosition();
			if (!nextReady) {
				if (attempt < 4) runPosition(attempt + 1);
				return;
			}
			positionReady.value = true;
			if (props.layout === 'ring') {
				ringAnimationFrame.value = requestAnimationFrame(() => {
					ringAnimationFrame.value = null;
					ringAnimate.value = true;
				});
			}
		});
	};
	runPosition();
};

const handleClickOutside = (event: MouseEvent) => {
	if (!visible.value) return;
	const target = event.target as Node;
	const triggerElement = resolveTriggerElement();
	if (panelRef.value && !panelRef.value.contains(target) && triggerElement && !triggerElement.contains(target)) {
		closePanel();
	}
};

const handleCancel = () => {
	// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
	// Shared action function only returns state and callback decisions; the component writes state and fires events.
	const action = resolveActionPopoverCancelAction();
	emitVisible(action.nextVisible);
	if (action.shouldCancel) emitCancel();
	if (action.shouldClose) emitClose();
};

const handleActionClick = (index: number, item: ActionProps) => {
	const action = resolveActionPopoverActionClickFlow({
		action: item,
		actionClosable: props.actionClosable,
		index
	});
	if (!action.shouldSelect) return;
	emitClickAction(action.index, action.action);
	if (action.closeAction.shouldClose) {
		emitVisible(action.closeAction.nextVisible);
		if (action.closeAction.shouldEmitClose) emitClose();
	}
};

const handleRingActionClick = (index: number, item: RingActionProps) => {
	const action = resolveActionPopoverActionClickFlow({
		action: item,
		actionClosable: props.actionClosable,
		index
	});
	if (!action.shouldSelect) return;
	emitClickAction(action.index, action.action);
	if (action.closeAction.shouldClose) {
		emitVisible(action.closeAction.nextVisible);
		if (action.closeAction.shouldEmitClose) emitClose();
	}
};

watch(
	() => props.visible,
	(nextVisible) => {
		if (nextVisible !== undefined) {
			hiddenByViewport.value = false;
			innerVisible.value = resolveActionPopoverInitialVisible(nextVisible);
		}
	}
);

watch(
	visible,
	(nextVisible, _previousVisible, onCleanup) => {
		clearFrames();
		// 公共 action 只决定渲染生命周期，timer 和响应式写入留在组件层。
		// Shared action only decides the render lifecycle; timers and reactive writes stay in the component layer.
		const renderAction = resolveActionPopoverRenderAction({
			visible: nextVisible,
			layout: props.layout,
			shouldRender: shouldRender.value,
			positionReady: positionReady.value
		});
		if (renderAction.kind === 'keepInlineOutro') {
			return;
		}
		shouldRender.value = renderAction.nextShouldRender;
		ringAnimate.value = renderAction.nextRingAnimate;
		positionReady.value = renderAction.nextPositionReady;
		if (renderAction.shouldSchedulePosition) {
			schedulePosition();
			return;
		}
		if (renderAction.shouldScheduleRingClose) {
			ringCloseTimer.value = setTimeout(() => {
				const completeAction = resolveActionPopoverRingCloseCompleteAction();
				positionReady.value = completeAction.nextPositionReady;
				shouldRender.value = completeAction.nextShouldRender;
			}, renderAction.ringCloseDelayMs);
			onCleanup(() => {
				if (ringCloseTimer.value) {
					clearTimeout(ringCloseTimer.value);
					ringCloseTimer.value = null;
				}
			});
		}
	},
	{ immediate: true }
);

watch(
	() =>
		[
			props.layout,
			props.triggerRef,
			props.inlineAlign,
			props.inlineDirection,
			props.inlineOffset,
			props.ringActions.length,
			props.ringShape
		] as const,
	() => {
		if (visible.value && shouldRender.value) {
			schedulePosition();
		}
	}
);

watch(
	() => [visible.value, hiddenByViewport.value],
	([nextVisible, viewportHidden], _previous, onCleanup) => {
		if (!isBrowser) return;
		if (
			!resolveActionPopoverShouldBindGlobalListeners({
				visible: nextVisible,
				hiddenByViewport: viewportHidden
			})
		)
			return;
		let frameId = 0;
		const updateOrHide = () => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				const viewportAction = resolveActionPopoverViewportAction({
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
		const clickTimer = nextVisible ? setTimeout(() => document.addEventListener('click', handleClickOutside), 0) : null;
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
	clearFrames();
	if (!isBrowser) return;
	document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
	<div
		v-if="shouldRender && layout === 'ring' && positionReady"
		ref="panelRef"
		:class="actionPopoverDerived.ringPanelClass"
		:style="actionPopoverDerived.ringPanelStyleString"
	>
		<button
			v-for="(ringItem, index) in actionPopoverDerived.ringItemDerivedList"
			:key="`ring-${index}`"
			type="button"
			:class="ringItem.buttonClass"
			:style="ringItem.styleString"
			:disabled="ringItem.disabled"
			@click="handleRingActionClick(index, ringItem.item)"
		>
			<Icon v-bind="ringItem.item.icon" :state="ringItem.iconState" :inj-class="ringItem.iconInjClass" />
		</button>
	</div>

	<div
		v-else-if="shouldRender && layout !== 'ring' && inlineTransition.shouldRender.value"
		:ref="setInlinePanelRef"
		:class="actionPopoverDerived.inlinePanelClass"
		:style="actionPopoverDerived.inlinePanelStyleString"
	>
		<div v-if="actionPopoverDerived.showTitle" :class="actionPopoverDerived.titleClass">
			{{ title }}
		</div>
		<div :class="actionPopoverDerived.actionContainerClass">
			<template v-for="(actionViewState, index) in actionPopoverDerived.actionViewStates" :key="`${actionViewState.item.content}-${index}`">
				<button
					type="button"
					:class="actionViewState.buttonClass"
					:disabled="actionViewState.disabled"
					@click="handleActionClick(index, actionViewState.item)"
				>
					<Icon
						v-if="actionViewState.showIcon"
						v-bind="resolveActionPopoverIconProps(actionViewState.item.icon)"
						:state="actionViewState.iconState"
						:inj-class="actionViewState.iconInjClass"
					/>
					<div v-else-if="actionViewState.showImage" :class="actionViewState.imageClass">
						<img :class="actionViewState.imageInnerClass" :src="actionViewState.item.imgSrc" alt="" />
					</div>
					<div :class="actionViewState.contentClass">
						{{ actionViewState.item.content }}
						<div v-if="actionViewState.showDesc" :class="actionViewState.descClass">
							{{ actionViewState.item.desc }}
						</div>
					</div>
				</button>
				<div v-if="actionViewState.showDivider" :class="actionViewState.dividerClass" />
			</template>
		</div>
		<template v-if="actionPopoverDerived.showCancel">
			<div :class="actionPopoverDerived.cancelDividerClass" />
			<button type="button" :class="actionPopoverDerived.cancelButtonClass" @click="handleCancel">
				{{ cancelText }}
			</button>
		</template>
	</div>
</template>
