import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ActionPopoverProps, ActionProps, RingActionProps } from '../../types';
import Icon from '../icon';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import { useTransition } from '../utils/transition';
import { easingFunctions } from '../utils/easing';
import {
	resolveActionPopoverActionClickFlow,
	resolveActionPopoverCancelAction,
	resolveActionPopoverCloseAction,
	resolveActionPopoverDerived,
	resolveActionPopoverHideForViewportAction,
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
import type { ActionPopoverTriggerRefLike } from '@any-tdf/common/derived/actionPopover';
import { resolveActionSheetCancelText } from '@any-tdf/common/derived/actionSheet';
import { resolveViewportDimension, resolveViewportFallbackDimension } from '@any-tdf/common/derived/helpers';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const maxPositionAttempts = 4;

const ActionPopover: React.FC<ActionPopoverProps> = ({
	visible: visibleProp,
	title = '',
	titleAlign = 'center',
	actions = [],
	showCancel = false,
	cancelText: cancelTextProp,
	actionClosable = true,
	align = 'center',
	inverse = false,
	layout = 'v',
	gridColumns = 3,
	triggerRef = null,
	inlineAlign = 'center',
	inlineDirection = 'auto',
	inlineOffset = 8,
	inlineShadow = 'md',
	inlineRadius = '',
	ringActions = [],
	ringRadius = 0,
	ringItemSize = 44,
	ringShape = 'auto',
	onCancel,
	onClickAction,
	onClose
}) => {
	const { locale } = useConfig();
	const actionPopoverLang = locale?.actionSheet || zh_CN.actionSheet;
	const cancelText = resolveActionSheetCancelText(cancelTextProp, actionPopoverLang);
	const [innerVisible, setInnerVisible] = useState(() => resolveActionPopoverInitialVisible(visibleProp));
	const [inlinePosition, setInlinePosition] = useState({ top: 0, left: 0 });
	const [positionReady, setPositionReady] = useState(false);
	const [actualDirection, setActualDirection] = useState<'up' | 'down'>('down');
	const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
	const [computedRingShape, setComputedRingShape] = useState<'full' | 'half' | 'quarter'>('quarter');
	const [ringStartAngle, setRingStartAngle] = useState(0);
	const [ringAnimate, setRingAnimate] = useState(false);
	const [hiddenByViewport, setHiddenByViewport] = useState(false);
	const [shouldRender, setShouldRender] = useState(() => resolveActionPopoverInitialVisible(visibleProp));
	const panelRef = useRef<HTMLDivElement | null>(null);
	const positionFrameRef = useRef<number | null>(null);
	const ringAnimationFrameRef = useRef<number | null>(null);
	const visibleRef = useRef(false);
	const hiddenByViewportRef = useRef(false);

	// 公共派生层只处理 ActionPopover class、style 和过渡参数，DOM 读取与事件留在组件内。
	// Shared derived layer only handles ActionPopover classes, styles and transition params; DOM reads and events stay in the component.
	const actionPopoverDerived = useMemo(
		() =>
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
						visible: visibleProp
					},
					actualDirection,
					computedRingShape,
					hiddenByViewport,
					inlinePosition,
					innerVisible,
					positionReady,
					ringAnimate,
					ringPosition,
					ringStartAngle
				})
			),
		[
			actions,
			actualDirection,
			align,
			computedRingShape,
			gridColumns,
			hiddenByViewport,
			inlineAlign,
			inlinePosition,
			inlineRadius,
			inlineShadow,
			innerVisible,
			inverse,
			layout,
			positionReady,
			ringActions,
			ringAnimate,
			ringItemSize,
			ringPosition,
			ringRadius,
			ringStartAngle,
			showCancel,
			title,
			titleAlign,
			visibleProp
		]
	);
	const visible = actionPopoverDerived.visible;
	const getTriggerElement = useCallback(
		() => resolveActionPopoverTriggerElement<HTMLElement>(triggerRef as ActionPopoverTriggerRefLike<HTMLElement>),
		[triggerRef]
	);

	useEffect(() => {
		setInnerVisible(resolveActionPopoverInitialVisible(visibleProp));
		hiddenByViewportRef.current = false;
		setHiddenByViewport(false);
	}, [visibleProp]);

	useEffect(() => {
		visibleRef.current = visible;
	}, [visible]);

	useEffect(() => {
		hiddenByViewportRef.current = hiddenByViewport;
	}, [hiddenByViewport]);

	const clearPositionFrames = useCallback(() => {
		if (positionFrameRef.current !== null) {
			cancelAnimationFrame(positionFrameRef.current);
			positionFrameRef.current = null;
		}
		if (ringAnimationFrameRef.current !== null) {
			cancelAnimationFrame(ringAnimationFrameRef.current);
			ringAnimationFrameRef.current = null;
		}
	}, []);

	useEffect(() => {
		return clearPositionFrames;
	}, [clearPositionFrames]);

	const calculateRingLayout = useCallback(() => {
		const triggerElement = getTriggerElement();
		if (!triggerElement || layout !== 'ring') return false;
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
			itemCount: ringActions.length,
			ringShape
		});
		setRingPosition(positionState.ringPosition);
		setComputedRingShape(positionState.computedRingShape);
		setRingStartAngle(positionState.ringStartAngle);
		return true;
	}, [getTriggerElement, layout, ringActions.length, ringShape]);

	const calculateInlinePosition = useCallback(() => {
		const triggerElement = getTriggerElement();
		if (!triggerElement || !panelRef.current) return false;
		const triggerRect = triggerElement.getBoundingClientRect();
		const panelRect = panelRef.current.getBoundingClientRect();
		const panelWidth = resolveActionPopoverMeasuredDimension({
			measured: panelRef.current.offsetWidth,
			fallback: panelRect.width
		});
		const panelHeight = resolveActionPopoverMeasuredDimension({
			measured: panelRef.current.offsetHeight,
			fallback: panelRect.height
		});
		const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
		const viewportWidth = resolveViewportDimension({ value: window.innerWidth });

		const positionState = resolveActionPopoverInlinePositionState({
			triggerRect,
			panelWidth,
			panelHeight,
			viewportWidth,
			viewportHeight,
			inlineAlign,
			inlineDirection,
			inlineOffset
		});
		setActualDirection(positionState.actualDirection);
		setInlinePosition(positionState.inlinePosition);
		return true;
	}, [getTriggerElement, inlineAlign, inlineDirection, inlineOffset]);

	const updatePosition = useCallback(() => {
		if (layout === 'ring') return calculateRingLayout();
		return calculateInlinePosition();
	}, [calculateInlinePosition, calculateRingLayout, layout]);

	const schedulePosition = useCallback(
		(attempt = 0) => {
			clearPositionFrames();
			const runPosition = (nextAttempt = attempt) => {
				positionFrameRef.current = requestAnimationFrame(() => {
					positionFrameRef.current = null;
					const nextPositionReady = layout === 'ring' ? calculateRingLayout() : calculateInlinePosition();
					if (!nextPositionReady) {
						if (nextAttempt < maxPositionAttempts) runPosition(nextAttempt + 1);
						return;
					}
					setPositionReady(true);
				});
			};
			runPosition();
		},
		[calculateInlinePosition, calculateRingLayout, clearPositionFrames, layout]
	);

	const isTriggerInViewport = useCallback(() => {
		const triggerElement = getTriggerElement();
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
	}, [getTriggerElement]);

	const setViewportHidden = useCallback((nextHidden: boolean) => {
		hiddenByViewportRef.current = nextHidden;
		setHiddenByViewport(nextHidden);
	}, []);

	const hideForViewport = useCallback(() => {
		const action = resolveActionPopoverHideForViewportAction({
			visible: visibleRef.current,
			hiddenByViewport: hiddenByViewportRef.current
		});
		if (!action.shouldChange) return;
		setViewportHidden(action.nextHiddenByViewport);
	}, [setViewportHidden]);

	const restoreFromViewport = useCallback(() => {
		const action = resolveActionPopoverRestoreFromViewportAction({
			hiddenByViewport: hiddenByViewportRef.current,
			triggerInViewport: isTriggerInViewport()
		});
		if (!action.shouldChange) return;
		setViewportHidden(action.nextHiddenByViewport);
	}, [isTriggerInViewport, setViewportHidden]);

	const emitClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const emitCancel = () => {
		onCancel?.();
	};

	const emitClickAction = (index: number, item: ActionProps | RingActionProps) => {
		onClickAction?.(index, item);
	};

	const closePanel = useCallback(() => {
		const action = resolveActionPopoverCloseAction();
		if (action.shouldClose) {
			setViewportHidden(false);
			setInnerVisible(action.nextVisible);
		}
		if (action.shouldEmitClose) emitClose();
	}, [emitClose, setViewportHidden]);

	const handleInlineOutroEnd = useCallback(() => {
		const action = resolveActionPopoverInlineCloseCompleteAction();
		setPositionReady(action.nextPositionReady);
		setShouldRender(action.nextShouldRender);
	}, []);

	const inlineTransitionOptions = useMemo(
		() => ({
			transition: 'scale' as const,
			inParams: {
				...actionPopoverDerived.inlineInParams,
				easing: easingFunctions.cubicOut
			},
			outParams: {
				...actionPopoverDerived.inlineOutParams,
				easing: easingFunctions.cubicOut
			},
			onOutroEnd: handleInlineOutroEnd
		}),
		[actionPopoverDerived.inlineInParams, actionPopoverDerived.inlineOutParams, handleInlineOutroEnd]
	);

	const inlineTransition = useTransition<HTMLDivElement>(actionPopoverDerived.inlineVisible && positionReady, inlineTransitionOptions);

	const setInlinePanelRef = useCallback(
		(node: HTMLDivElement | null) => {
			panelRef.current = node;
			(inlineTransition.ref as { current: HTMLDivElement | null }).current = node;
		},
		[inlineTransition.ref]
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!visible) return;
			const target = event.target as Node;
			const triggerElement = getTriggerElement();
			if (panelRef.current && !panelRef.current.contains(target) && triggerElement && !triggerElement.contains(target)) {
				closePanel();
			}
		},
		[closePanel, getTriggerElement, visible]
	);

	const handleCancel = () => {
		// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
		// Shared action function only returns state and callback decisions; the component writes state and fires events.
		const action = resolveActionPopoverCancelAction();
		setViewportHidden(false);
		setInnerVisible(action.nextVisible);
		if (action.shouldCancel) emitCancel();
		if (action.shouldClose) emitClose();
	};

	const handleActionClick = (index: number, item: ActionProps) => {
		const action = resolveActionPopoverActionClickFlow({ action: item, actionClosable, index });
		if (!action.shouldSelect) return;
		emitClickAction(action.index, action.action);
		if (action.closeAction.shouldClose) {
			setViewportHidden(false);
			setInnerVisible(action.closeAction.nextVisible);
			if (action.closeAction.shouldEmitClose) emitClose();
		}
	};

	const handleRingActionClick = (index: number, item: RingActionProps) => {
		const action = resolveActionPopoverActionClickFlow({ action: item, actionClosable, index });
		if (!action.shouldSelect) return;
		emitClickAction(action.index, action.action);
		if (action.closeAction.shouldClose) {
			setViewportHidden(false);
			setInnerVisible(action.closeAction.nextVisible);
			if (action.closeAction.shouldEmitClose) emitClose();
		}
	};

	useIsomorphicLayoutEffect(() => {
		clearPositionFrames();
		// 公共 action 只决定渲染生命周期，timer 和状态写入留在组件层。
		// Shared action only decides the render lifecycle; timers and state writes stay in the component layer.
		const renderAction = resolveActionPopoverRenderAction({
			visible,
			layout,
			shouldRender,
			positionReady
		});
		if (renderAction.kind === 'keepInlineOutro') {
			return;
		}
		setShouldRender(renderAction.nextShouldRender);
		setRingAnimate(renderAction.nextRingAnimate);
		setPositionReady(renderAction.nextPositionReady);
		if (renderAction.shouldScheduleRingClose) {
			const timer = setTimeout(() => {
				const completeAction = resolveActionPopoverRingCloseCompleteAction();
				setPositionReady(completeAction.nextPositionReady);
				setShouldRender(completeAction.nextShouldRender);
			}, renderAction.ringCloseDelayMs);
			return () => clearTimeout(timer);
		}
	}, [clearPositionFrames, layout, shouldRender, visible]);

	useIsomorphicLayoutEffect(() => {
		if (!visible || !shouldRender) return;
		schedulePosition();
		return clearPositionFrames;
	}, [clearPositionFrames, schedulePosition, shouldRender, visible]);

	useIsomorphicLayoutEffect(() => {
		if (!visible || !shouldRender || layout !== 'ring' || !positionReady || ringAnimate) return;
		const panelNode = panelRef.current;
		if (!panelNode) return;
		panelNode.getBoundingClientRect();
		ringAnimationFrameRef.current = requestAnimationFrame(() => {
			ringAnimationFrameRef.current = null;
			setRingAnimate(true);
		});
		return () => {
			if (ringAnimationFrameRef.current !== null) {
				cancelAnimationFrame(ringAnimationFrameRef.current);
				ringAnimationFrameRef.current = null;
			}
		};
	}, [layout, positionReady, ringAnimate, shouldRender, visible]);

	useEffect(() => {
		if (!resolveActionPopoverShouldBindGlobalListeners({ visible, hiddenByViewport })) return;
		let frameId = 0;
		const updateOrHide = () => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				const viewportAction = resolveActionPopoverViewportAction({
					triggerInViewport: isTriggerInViewport(),
					hiddenByViewport: hiddenByViewportRef.current
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
		const clickTimer = visible
			? setTimeout(() => {
					document.addEventListener('click', handleClickOutside);
				}, 0)
			: null;
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
	}, [handleClickOutside, hiddenByViewport, hideForViewport, isTriggerInViewport, restoreFromViewport, updatePosition, visible]);

	if (!shouldRender) return null;

	if (layout === 'ring') {
		if (!positionReady) return null;
		return (
			<div ref={panelRef} className={actionPopoverDerived.ringPanelClass} style={actionPopoverDerived.ringPanelStyleValue}>
				{actionPopoverDerived.ringItemDerivedList.map((itemDerived, index) => {
					return (
						<button
							key={`ring-${index}`}
							type="button"
							className={itemDerived.buttonClass}
							style={itemDerived.style}
							disabled={itemDerived.disabled}
							onClick={() => handleRingActionClick(index, itemDerived.item)}
						>
							<Icon {...itemDerived.item.icon} state={itemDerived.iconState} injClass={itemDerived.iconInjClass} />
						</button>
					);
				})}
			</div>
		);
	}

	return (
		<div ref={setInlinePanelRef} className={actionPopoverDerived.inlinePanelClass} style={actionPopoverDerived.inlinePanelStyleValue}>
			{actionPopoverDerived.showTitle ? <div className={actionPopoverDerived.titleClass}>{title}</div> : null}
			<div className={actionPopoverDerived.actionContainerClass}>
				{actionPopoverDerived.actionViewStates.map((actionViewState, index) => {
					const item = actionViewState.item;
					return (
						<div key={`${item.content}-${index}`}>
							<button
								type="button"
								className={actionViewState.buttonClass}
								disabled={actionViewState.disabled}
								onClick={() => handleActionClick(index, item)}
							>
								{actionViewState.showIcon && item.icon ? (
									<Icon {...item.icon} state={actionViewState.iconState} injClass={actionViewState.iconInjClass} />
								) : actionViewState.showImage ? (
									<div className={actionViewState.imageClass}>
										<img className={actionViewState.imageInnerClass} src={item.imgSrc} alt="" />
									</div>
								) : null}
								<div className={actionViewState.contentClass}>
									{item.content}
									{actionViewState.showDesc ? <div className={actionViewState.descClass}>{item.desc}</div> : null}
								</div>
							</button>
							{actionViewState.showDivider ? <div className={actionViewState.dividerClass} /> : null}
						</div>
					);
				})}
			</div>
			{actionPopoverDerived.showCancel ? (
				<>
					<div className={actionPopoverDerived.cancelDividerClass} />
					<button type="button" className={actionPopoverDerived.cancelButtonClass} onClick={handleCancel}>
						{cancelText}
					</button>
				</>
			) : null}
		</div>
	);
};

export default ActionPopover;
