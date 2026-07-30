import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TooltipProps } from '../../types';
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
import { useTransition } from '../utils/transition';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Tooltip: React.FC<TooltipProps> = ({
	content = '',
	position = 'top',
	visible: visibleProp,
	delay = 0,
	hideDelay = 0,
	arrow = true,
	radius = 'sm',
	state: colorState = 'black',
	maxWidth = 200,
	zIndex = 800,
	disabled = false,
	injClass = '',
	contentClass = '',
	children,
	contentSnippet,
	onShow,
	onHide
}) => {
	const [innerVisible, setInnerVisible] = useState(() => resolveTooltipInitialVisible(visibleProp));
	const [hiddenByViewport, setHiddenByViewport] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const visibleRef = useRef(false);
	const hiddenByViewportRef = useRef(false);

	const visible = innerVisible;
	// 公共派生层只处理 Tooltip 状态推导，DOM 读取、timer 与监听留在组件内。
	// The shared derived layer handles Tooltip state derivation; DOM reads, timers and listeners stay in the component.
	const tooltipState = useMemo(
		() =>
			resolveTooltipDerived(
				resolveTooltipStateOptions({
					props: { disabled, injClass, maxWidth, position, radius, state: colorState, zIndex },
					left: coords.left,
					top: coords.top
				})
			),
		[colorState, coords.left, coords.top, disabled, injClass, maxWidth, position, radius, zIndex]
	);
	const tooltipTransition = useTransition<HTMLDivElement>(visible, {
		inTransition: 'fly',
		outTransition: 'fade',
		inParams: tooltipState.inParams,
		outParams: tooltipState.outParams
	});

	useEffect(() => {
		const action = resolveTooltipVisibleSyncAction({ visible: visibleProp });
		visibleRef.current = action.nextVisible;
		hiddenByViewportRef.current = action.nextHiddenByViewport;
		setInnerVisible(action.nextVisible);
		setHiddenByViewport(action.nextHiddenByViewport);
	}, [visibleProp]);

	useEffect(() => {
		visibleRef.current = visible;
	}, [visible]);

	const emitShow = useCallback(() => {
		onShow?.();
	}, [onShow]);
	const emitHide = useCallback(() => {
		onHide?.();
	}, [onHide]);

	const customContent = contentSnippet;
	const hasCustomContent = customContent !== undefined && customContent !== null;

	const updatePosition = useCallback(() => {
		if (!triggerRef.current || !tooltipRef.current) return;
		const triggerRect = triggerRef.current.getBoundingClientRect();
		const tooltipRect = tooltipRef.current.getBoundingClientRect();
		const nextPosition = resolveTooltipPosition({
			position,
			triggerRect,
			tooltipRect,
			viewportWidth: resolveViewportDimension({ value: window.innerWidth }),
			viewportHeight: resolveViewportDimension({ value: window.innerHeight })
		});
		const { top, left } = nextPosition;

		setCoords((current) => (current.top === top && current.left === left ? current : { top, left }));
	}, [position]);

	const isTriggerInViewport = useCallback(() => {
		if (!triggerRef.current) return false;
		const triggerRect = triggerRef.current.getBoundingClientRect();
		const viewportWidth = resolveViewportFallbackDimension({
			value: window.innerWidth,
			fallback: document.documentElement.clientWidth
		});
		const viewportHeight = resolveViewportFallbackDimension({
			value: window.innerHeight,
			fallback: document.documentElement.clientHeight
		});
		return resolveTooltipTriggerInViewport({ triggerRect, viewportWidth, viewportHeight });
	}, []);

	const setViewportHidden = useCallback((nextHidden: boolean) => {
		hiddenByViewportRef.current = nextHidden;
		setHiddenByViewport(nextHidden);
	}, []);

	const applyVisibilityAction = useCallback(
		(action: TooltipVisibilityCommitAction) => {
			if (!action.shouldChange) return;
			visibleRef.current = action.nextVisible;
			setViewportHidden(action.nextHiddenByViewport);
			setInnerVisible(action.nextVisible);
			if (action.shouldEmitShow) emitShow();
			if (action.shouldEmitHide) emitHide();
		},
		[emitHide, emitShow, setViewportHidden]
	);

	const hideForViewport = useCallback(() => {
		if (showTimer.current) {
			clearTimeout(showTimer.current);
			showTimer.current = null;
		}
		if (hideTimer.current) {
			clearTimeout(hideTimer.current);
			hideTimer.current = null;
		}
		applyVisibilityAction(
			resolveTooltipHideForViewportAction({
				visible: visibleRef.current,
				hiddenByViewport: hiddenByViewportRef.current
			})
		);
	}, [applyVisibilityAction]);

	const restoreFromViewport = useCallback(() => {
		applyVisibilityAction(
			resolveTooltipRestoreFromViewportAction({
				hiddenByViewport: hiddenByViewportRef.current,
				disabled,
				triggerInViewport: isTriggerInViewport(),
				visible: visibleRef.current
			})
		);
	}, [applyVisibilityAction, disabled, isTriggerInViewport]);

	const show = useCallback(() => {
		// 公共 flow 统一推导显示动作，timer 和事件派发留在组件层。
		// The shared flow derives the show action; timers and events stay in the component layer.
		const flow = resolveTooltipShowFlow({
			disabled,
			hiddenByViewport: hiddenByViewportRef.current,
			delay
		});
		if (!flow.shouldShow) return;
		setViewportHidden(flow.nextHiddenByViewport);
		if (hideTimer.current) {
			clearTimeout(hideTimer.current);
			hideTimer.current = null;
		}
		if (flow.shouldDelay) {
			showTimer.current = setTimeout(() => {
				applyVisibilityAction(flow.commitAction);
			}, flow.delayMs);
		} else {
			applyVisibilityAction(flow.commitAction);
		}
	}, [applyVisibilityAction, delay, disabled, setViewportHidden]);

	const hide = useCallback(() => {
		// 公共 flow 统一推导隐藏动作，timer 和事件派发留在组件层。
		// The shared flow derives the hide action; timers and events stay in the component layer.
		const flow = resolveTooltipHideFlow({ delay: hideDelay });
		setViewportHidden(flow.nextHiddenByViewport);
		if (showTimer.current) {
			clearTimeout(showTimer.current);
			showTimer.current = null;
		}
		if (flow.shouldDelay) {
			hideTimer.current = setTimeout(() => {
				applyVisibilityAction(flow.commitAction);
			}, flow.delayMs);
		} else {
			applyVisibilityAction(flow.commitAction);
		}
	}, [applyVisibilityAction, hideDelay, setViewportHidden]);

	const toggle = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation();
			if (resolveTooltipToggleAction(visible) === 'hide') {
				hide();
			} else {
				show();
			}
		},
		[hide, show, visible]
	);

	const setTooltipNode = useCallback(
		(node: HTMLDivElement | null) => {
			tooltipRef.current = node;
			tooltipTransition.ref.current = node;
		},
		[tooltipTransition.ref]
	);

	useEffect(() => {
		if (!resolveTooltipShouldBindGlobalListeners({ visible, hiddenByViewport })) return;
		const handleClickOutside = () => hide();
		let frameId = 0;
		const updateOrHide = () => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(() => {
				const viewportAction = resolveTooltipViewportAction({
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
	}, [hiddenByViewport, hide, hideForViewport, isTriggerInViewport, restoreFromViewport, updatePosition, visible]);

	useIsomorphicLayoutEffect(() => {
		if (!tooltipTransition.shouldRender) return;
		updatePosition();
	}, [content, contentClass, contentSnippet, maxWidth, tooltipTransition.shouldRender, updatePosition]);

	return (
		<>
			<div ref={triggerRef} className={tooltipState.wrapperClass}>
				<div className={tooltipState.triggerClass} onClick={toggle}>
					{children}
				</div>
			</div>

			{tooltipTransition.shouldRender ? (
				<div
					ref={setTooltipNode}
					className={tooltipState.panelClass}
					style={tooltipState.panelStyleValue}
					onClick={(event) => event.stopPropagation()}
				>
					{hasCustomContent ? (
						<div className={contentClass}>{typeof customContent === 'function' ? customContent() : customContent}</div>
					) : (
						<div className={contentClass}>{content}</div>
					)}
					{arrow ? <div className={tooltipState.arrowClass} /> : null}
				</div>
			) : null}
		</>
	);
};

export default Tooltip;
