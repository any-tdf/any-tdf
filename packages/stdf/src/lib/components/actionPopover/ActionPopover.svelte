<script lang="ts">
	import { getContext, onDestroy, tick, untrack } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Icon from '../icon/Icon.svelte';
	import type { ActionPopoverProps, ActionProps, RingActionProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
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
		resolveActionPopoverViewportAction,
		resolveActionPopoverVisible,
	} from '@any-tdf/common/derived/actionPopover';
	import { resolveActionSheetCancelText } from '@any-tdf/common/derived/actionSheet';
	import { resolveViewportDimension, resolveViewportFallbackDimension } from '@any-tdf/common/derived/helpers';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const actionPopoverLang: LangProps['actionSheet'] = currentLang.actionSheet;

	let {
		visible = $bindable(false),
		title = '',
		titleAlign = 'center',
		actions = [],
		showCancel = false,
		cancelText,
		actionClosable = true,
		align = 'center',
		inverse = false,
		layout = 'v',
		gridColumns = 3,
		// inline 模式相关属性
		// inline mode related props
		triggerRef = null,
		inlineAlign = 'center',
		inlineDirection = 'auto',
		inlineOffset = 8,
		inlineShadow = 'md',
		inlineRadius = '',
		// 环形布局相关属性
		// ring layout related props
		ringActions = [],
		ringRadius = 0,
		ringItemSize = 44,
		ringShape = 'auto',
		oncancel,
		onclickAction,
		onclose
	}: ActionPopoverProps = $props();

	let finalCancelText = $derived(resolveActionSheetCancelText(cancelText, actionPopoverLang));

	// inline 模式面板引用
	// inline mode panel reference
	let panelRef = $state<HTMLElement | null>(null);

	// 位置是否已计算完成
	// whether position has been calculated
	let positionReady = $state(false);

	// inline 模式位置状态
	// inline mode position state
	let inlinePosition = $state({ top: 0, left: 0 });
	let actualDirection = $state<'up' | 'down'>('down');

	// 环形布局相关计算
	// ring layout related calculations
	let ringPosition = $state({ x: 0, y: 0 });
	let computedRingShape = $state<'full' | 'half' | 'quarter'>('quarter');
	let ringStartAngle = $state(0);
	let ringAnimate = $state(false);
	let hiddenByViewport = $state(false);
	let effectiveVisible = $derived(resolveActionPopoverVisible({ visible, hiddenByViewport }));
	let shouldRender = $state(resolveActionPopoverInitialVisible(visible));
	let positionFrame: number | null = null;
	let ringAnimationFrame: number | null = null;
	let ringCloseTimer: ReturnType<typeof setTimeout> | null = null;

	// 公共派生层只处理 ActionPopover class、style 和过渡参数，DOM 读取与事件留在组件内。
	// Shared derived layer only handles ActionPopover classes, styles and transition params; DOM reads and events stay in the component.
	const actionPopoverDerived = $derived(
		resolveActionPopoverDerived<ActionProps, RingActionProps>(
			resolveActionPopoverStateOptions<ActionProps, RingActionProps>({
				props: {
					actions,
					align,
					gridColumns,
					inlineAlign,
					inlineRadius,
					inlineShadow,
					inverse,
					layout,
					ringActions,
					ringItemSize,
					ringRadius,
					showCancel,
					title,
					titleAlign,
					visible
				},
				actualDirection,
				computedRingShape,
				hiddenByViewport,
				inlinePosition,
				positionReady,
				ringAnimate,
					ringPosition,
					ringStartAngle
				})
			)
	);

	// 根据触发元素位置和操作项数量自动计算环形形状和起始角度
	// auto calculate ring shape and start angle based on trigger position and action count
	const clearFrames = () => {
		if (positionFrame !== null) {
			cancelAnimationFrame(positionFrame);
			positionFrame = null;
		}
		if (ringAnimationFrame !== null) {
			cancelAnimationFrame(ringAnimationFrame);
			ringAnimationFrame = null;
		}
		if (ringCloseTimer) {
			clearTimeout(ringCloseTimer);
			ringCloseTimer = null;
		}
	};

	const calculateRingLayout = () => {
		const triggerElement = resolveActionPopoverTriggerElement(triggerRef);
		if (!triggerElement || layout !== 'ring') return false;

		const triggerRect = triggerElement.getBoundingClientRect();
		const viewportWidth = resolveViewportDimension({ value: window.innerWidth });
		const viewportHeight = resolveViewportDimension({ value: window.innerHeight });

		// 公共位置派生只消费测量结果，DOM 读取保留在组件内。
		// Shared position derivation consumes measurements only; DOM reads stay in the component.
		const positionState = resolveActionPopoverRingPositionState({ triggerRect, viewportWidth, viewportHeight, itemCount: ringActions.length, ringShape });
		ringPosition = positionState.ringPosition;
		computedRingShape = positionState.computedRingShape;
		ringStartAngle = positionState.ringStartAngle;
		return true;
	};

	// 计算 inline 模式位置
	// calculate inline mode position
	const calculateInlinePosition = () => {
		const triggerElement = resolveActionPopoverTriggerElement(triggerRef);
		if (!triggerElement || !panelRef) return false;

		const triggerRect = triggerElement.getBoundingClientRect();
		const panelRect = panelRef.getBoundingClientRect();
		const panelWidth = resolveActionPopoverMeasuredDimension({ measured: panelRef.offsetWidth, fallback: panelRect.width });
		const panelHeight = resolveActionPopoverMeasuredDimension({ measured: panelRef.offsetHeight, fallback: panelRect.height });
		const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
		const viewportWidth = resolveViewportDimension({ value: window.innerWidth });

		const positionState = resolveActionPopoverInlinePositionState({ triggerRect, panelWidth, panelHeight, viewportWidth, viewportHeight, inlineAlign, inlineDirection, inlineOffset });
		actualDirection = positionState.actualDirection;
		inlinePosition = positionState.inlinePosition;
		return true;
	};

	const updatePosition = () => {
		if (layout === 'ring') return calculateRingLayout();
		return calculateInlinePosition();
	};

	const isTriggerInViewport = () => {
		const triggerElement = resolveActionPopoverTriggerElement(triggerRef);
		if (!triggerElement) return false;
		const triggerRect = triggerElement.getBoundingClientRect();
		const viewportWidth = resolveViewportFallbackDimension({ value: window.innerWidth, fallback: document.documentElement.clientWidth });
		const viewportHeight = resolveViewportFallbackDimension({ value: window.innerHeight, fallback: document.documentElement.clientHeight });
		return resolveActionPopoverTriggerInViewport({ triggerRect, viewportWidth, viewportHeight });
	};

	const hideForViewport = () => {
		const action = resolveActionPopoverHideForViewportAction({ visible: effectiveVisible, hiddenByViewport });
		if (!action.shouldChange) return;
		hiddenByViewport = action.nextHiddenByViewport;
	};

	const restoreFromViewport = () => {
		const action = resolveActionPopoverRestoreFromViewportAction({ hiddenByViewport, triggerInViewport: isTriggerInViewport() });
		if (!action.shouldChange) return;
		hiddenByViewport = action.nextHiddenByViewport;
	};

	const schedulePosition = async () => {
		clearFrames();
		await tick();
		positionFrame = requestAnimationFrame(() => {
			positionFrame = null;
			const nextPositionReady = layout === 'ring' ? calculateRingLayout() : calculateInlinePosition();
			if (!nextPositionReady) return;
			positionReady = true;
			if (layout === 'ring') {
				ringAnimationFrame = requestAnimationFrame(() => {
					ringAnimationFrame = null;
					ringAnimate = true;
				});
			}
		});
	};

	// 点击外部关闭
	// click outside to close
	const handleClickOutside = (event: MouseEvent) => {
		if (!effectiveVisible) return;
		const target = event.target as Node;
		const triggerElement = resolveActionPopoverTriggerElement(triggerRef);
		if (panelRef && !panelRef.contains(target) && triggerElement && !triggerElement.contains(target)) {
			const action = resolveActionPopoverCloseAction();
			if (action.shouldClose) {
				hiddenByViewport = false;
				visible = action.nextVisible;
			}
			if (action.shouldEmitClose) onclose?.();
		}
	};

	// 优化事件处理函数
	// optimize event handling function
	const handleCancel = () => {
		// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
		// Shared action function only returns state and callback decisions; the component writes state and fires events.
		const action = resolveActionPopoverCancelAction();
		hiddenByViewport = false;
		visible = action.nextVisible;
		if (action.shouldCancel) oncancel?.();
		if (action.shouldClose) onclose?.();
	};

	// 处理选项点击事件
	// handle option click event
	const handleActionClick = (index: number, item: ActionProps) => {
		const action = resolveActionPopoverActionClickFlow({ action: item, actionClosable, index });
		if (!action.shouldSelect) return;
		onclickAction?.(action.index, action.action);
		if (action.closeAction.shouldClose) {
			const closeAction = action.closeAction;
			hiddenByViewport = false;
			visible = closeAction.nextVisible;
			if (closeAction.shouldEmitClose) onclose?.();
		}
	};

	// 处理环形操作项点击事件
	// handle ring action click event
	const handleRingActionClick = (index: number, item: RingActionProps) => {
		const action = resolveActionPopoverActionClickFlow({ action: item, actionClosable, index });
		if (!action.shouldSelect) return;
		onclickAction?.(action.index, action.action);
		if (action.closeAction.shouldClose) {
			const closeAction = action.closeAction;
			hiddenByViewport = false;
			visible = closeAction.nextVisible;
			if (closeAction.shouldEmitClose) onclose?.();
		}
	};

	const handleInlineOutroEnd = () => {
		if (layout === 'ring') return;
		const action = resolveActionPopoverInlineCloseCompleteAction();
		positionReady = action.nextPositionReady;
		shouldRender = action.nextShouldRender;
	};

	// 监听 visible 变化，更新位置
	// watch visible change, update position
	$effect(() => {
		if (!visible && hiddenByViewport) {
			hiddenByViewport = false;
		}
	});

	$effect(() => {
		const nextVisible = effectiveVisible;
		const nextLayout = layout;
		const currentShouldRender = untrack(() => shouldRender);
		const currentPositionReady = untrack(() => positionReady);
		// 公共 action 只决定渲染生命周期，tick 和动画帧调度留在组件层。
		// Shared action only decides the render lifecycle; tick and animation frame scheduling stay in the component layer.
		const renderAction = resolveActionPopoverRenderAction({ visible: nextVisible, layout: nextLayout, shouldRender: currentShouldRender, positionReady: currentPositionReady });
		if (renderAction.kind === 'keepInlineOutro') return;
		clearFrames();
		shouldRender = renderAction.nextShouldRender;
		ringAnimate = renderAction.nextRingAnimate;
		positionReady = renderAction.nextPositionReady;
		if (renderAction.shouldScheduleRingClose) {
			ringCloseTimer = setTimeout(() => {
				const completeAction = resolveActionPopoverRingCloseCompleteAction();
				positionReady = completeAction.nextPositionReady;
				shouldRender = completeAction.nextShouldRender;
				ringCloseTimer = null;
			}, renderAction.ringCloseDelayMs);
		}
	});

	$effect(() => {
		const positionDeps = [layout, triggerRef, inlineAlign, inlineDirection, inlineOffset, ringActions.length, ringShape];
		if (effectiveVisible && shouldRender) {
			schedulePosition();
		}
		return () => {
			void positionDeps;
		};
	});

	$effect(() => {
		const currentVisible = effectiveVisible;
		const currentHiddenByViewport = hiddenByViewport;
		if (resolveActionPopoverShouldBindGlobalListeners({ visible: currentVisible, hiddenByViewport: currentHiddenByViewport })) {
			const clickTimer = currentVisible
				? setTimeout(() => {
						document.addEventListener('click', handleClickOutside);
					}, 0)
				: null;

			let frameId = 0;
			const updateOrHide = () => {
				cancelAnimationFrame(frameId);
				frameId = requestAnimationFrame(() => {
					const viewportAction = resolveActionPopoverViewportAction({ triggerInViewport: isTriggerInViewport(), hiddenByViewport });
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
			window.addEventListener('scroll', updateOrHide, true);
			window.addEventListener('resize', updateOrHide);
			updateOrHide();

			return () => {
				cancelAnimationFrame(frameId);
				if (clickTimer) clearTimeout(clickTimer);
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('scroll', updateOrHide, true);
				window.removeEventListener('resize', updateOrHide);
			};
		}
	});

	onDestroy(() => {
		clearFrames();
		document.removeEventListener('click', handleClickOutside);
	});
</script>

{#if shouldRender}
	{#if layout === 'ring'}
		<!-- 环形布局 Ring layout -->
		{#if positionReady}
			<div
				bind:this={panelRef}
				class={actionPopoverDerived.ringPanelClass}
				style={actionPopoverDerived.ringPanelStyleString}
			>
				{#each actionPopoverDerived.ringItemDerivedList as itemDerived, index (index)}
					<button
						class={itemDerived.buttonClass}
						style={itemDerived.styleString}
						disabled={itemDerived.disabled}
						onclick={() => handleRingActionClick(index, itemDerived.item)}
					>
						<Icon
							{...itemDerived.item.icon}
							state={itemDerived.iconState}
							injClass={itemDerived.iconInjClass}
						/>
					</button>
				{/each}
			</div>
		{/if}
	{:else if actionPopoverDerived.inlineVisible}
		<!-- 普通布局 Normal layout -->
		<div
			bind:this={panelRef}
			class={actionPopoverDerived.inlinePanelClass}
			style={actionPopoverDerived.inlinePanelStyleString}
			in:scale|global={{ ...actionPopoverDerived.inlineInParams, easing: cubicOut }}
			out:scale|global={{ ...actionPopoverDerived.inlineOutParams, easing: cubicOut }}
			onoutroend={handleInlineOutroEnd}
		>
			{#if actionPopoverDerived.showTitle}
				<div
					class={actionPopoverDerived.titleClass}
				>
					{title}
				</div>
			{/if}
			<div class={actionPopoverDerived.actionContainerClass}>
				{#each actionPopoverDerived.actionViewStates as actionViewState, index (index)}
					{@const item = actionViewState.item}
					{@const itemIcon = resolveActionPopoverIconProps(item.icon)}
					<button
						class={actionViewState.buttonClass}
						disabled={actionViewState.disabled}
						onclick={() => handleActionClick(index, item)}
					>
						{#if actionViewState.showIcon}
							<Icon
								{...itemIcon}
								state={actionViewState.iconState}
								injClass={actionViewState.iconInjClass}
							/>
						{:else if actionViewState.showImage}
							<div class={actionViewState.imageClass}>
								<img class={actionViewState.imageInnerClass} src={item.imgSrc} alt="" />
							</div>
						{/if}
						<div class={actionViewState.contentClass}>
							{item.content}
							{#if actionViewState.showDesc}
								<div class={actionViewState.descClass}>
									{item.desc}
								</div>
							{/if}
						</div>
					</button>
					{#if actionViewState.showDivider}
						<div class={actionViewState.dividerClass}></div>
					{/if}
				{/each}
			</div>
			{#if actionPopoverDerived.showCancel}
				<div class={actionPopoverDerived.cancelDividerClass}></div>
				<button
					class={actionPopoverDerived.cancelButtonClass}
					onclick={handleCancel}
				>
					{finalCancelText}
				</button>
			{/if}
		</div>
	{/if}
{/if}
