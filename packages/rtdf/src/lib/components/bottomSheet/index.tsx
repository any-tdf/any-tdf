import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { BottomSheetProps } from '../../types';
import Mask from '../mask';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import { throttleWithRAF } from '@any-tdf/common/utils';
import { fly, runAnimationConfig, type AnimationController } from '@any-tdf/react-motion/transition';
import {
	bottomSheetDefaultScrollTopHeight,
	resolveBottomSheetActionStartTop,
	resolveBottomSheetCloseAction,
	resolveBottomSheetDerived,
	resolveBottomSheetInitialVisible,
	resolveBottomSheetMaskClickFlow,
	resolveBottomSheetMeasuredScrollTopHeight,
	resolveBottomSheetMoveDistance,
	resolveBottomSheetRenderEndAction,
	resolveBottomSheetRenderState,
	resolveBottomSheetStateOptions,
	resolveBottomSheetTouchCancelAction,
	resolveBottomSheetTouchEndFlow,
	resolveBottomSheetTouchStartAction,
	resolveBottomSheetVisibleChangeAction,
	type BottomSheetTransitionParams
} from '@any-tdf/common/derived/bottomSheet';
import { arrowLeftSvg, closeSvg, downSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const BottomSheet: React.FC<BottomSheetProps> = ({
	visible: visibleProp = false,
	title,
	titleAlign = 'left',
	showBackIcon = false,
	closeContent = 'downIcon',
	showDivider = true,
	duration = 450,
	outDuration = 240,
	mask = {},
	maskClosable = false,
	zIndex = 600,
	stayHeightList: propStayHeightList,
	stayHeightIndex = 1,
	closeHeight = 0,
	radius = '',
	iconRadius = '',
	children,
	onHeightChange,
	onClickMask,
	onClose,
	onBack
}) => {
	const { locale } = useConfig();
	const bottomSheetLang = locale?.bottomSheet || zh_CN.bottomSheet;

	const [isTouch, setIsTouch] = useState(false);
	const [, setIsClosing] = useState(false);
	const [internalVisible, setInternalVisible] = useState(() => resolveBottomSheetInitialVisible(visibleProp));
	const visible = internalVisible;
	const [shouldRender, setShouldRender] = useState(() => resolveBottomSheetRenderState({ visible: visibleProp }));
	const [startTop, setStartTop] = useState<number | undefined>(undefined);
	const [moveDistance, setMoveDistance] = useState(0);
	const [scrollTopHeight, setScrollTopHeight] = useState(bottomSheetDefaultScrollTopHeight);

	// 公共派生层统一 BottomSheet 的高度、class、style、标题和校验结果，组件层只保留 DOM 测量、事件和动画调度。
	// Common derivation unifies BottomSheet height, class, style, title and validation results; the component layer only keeps DOM measurement, events and animation scheduling.
	const viewportHeight = resolveViewportDimension({
		value: typeof window !== 'undefined' ? window.innerHeight : undefined
	});
	const bottomSheetState = useMemo(
		() =>
			resolveBottomSheetDerived(
				resolveBottomSheetStateOptions({
					currentRender: shouldRender,
					defaults: bottomSheetLang,
					props: {
						closeContent,
						closeHeight,
						duration,
						iconRadius,
						outDuration,
						radius,
						stayHeightIndex,
						stayHeightList: propStayHeightList,
						title,
						titleAlign,
						zIndex
					},
					isTouch,
					moveDistance,
					scrollTopHeight,
					startTop,
					viewportHeight,
					visible
				})
			),
		[
			bottomSheetLang,
			closeContent,
			closeHeight,
			duration,
			iconRadius,
			isTouch,
			moveDistance,
			outDuration,
			propStayHeightList,
			radius,
			scrollTopHeight,
			shouldRender,
			startTop,
			stayHeightIndex,
			title,
			titleAlign,
			viewportHeight,
			visible,
			zIndex
		]
	);

	const startYRef = useRef(0);
	const currentYRef = useRef(0);
	const startTopRef = useRef(0);
	const moveDistanceRef = useRef(moveDistance);
	const isTouchRef = useRef(isTouch);
	const scrollTopDom = useRef<HTMLDivElement>(null);
	const sheetRef = useRef<HTMLDivElement>(null);
	const prevVisibleRef = useRef(false);
	const animationRef = useRef<AnimationController | null>(null);
	const startAnimationRef = useRef<number | null>(null);
	const pendingInAnimationRef = useRef<BottomSheetTransitionParams | null>(null);

	useEffect(() => {
		setInternalVisible(resolveBottomSheetInitialVisible(visibleProp));
	}, [visibleProp]);

	useEffect(() => {
		startTopRef.current = bottomSheetState.startTop;
	}, [bottomSheetState.startTop]);

	useEffect(() => {
		moveDistanceRef.current = moveDistance;
	}, [moveDistance]);

	useEffect(() => {
		isTouchRef.current = isTouch;
	}, [isTouch]);

	const runFlyAnimation = useCallback((mode: 'in' | 'out', params: BottomSheetTransitionParams) => {
		if (!sheetRef.current) return;
		animationRef.current?.cancel();

		const node = sheetRef.current;
		const config = fly(node, params);
		animationRef.current = runAnimationConfig(node, config, mode === 'in' ? 1 : 0, {
			fromT: mode === 'in' ? 0 : 1,
			direction: mode
		});
	}, []);

	const scheduleFlyAnimation = useCallback(
		(mode: 'in' | 'out', params: BottomSheetTransitionParams, attempt = 0) => {
			startAnimationRef.current = requestAnimationFrame(() => {
				startAnimationRef.current = null;
				if (!sheetRef.current && attempt < 2) {
					scheduleFlyAnimation(mode, params, attempt + 1);
					return;
				}
				runFlyAnimation(mode, params);
			});
		},
		[runFlyAnimation]
	);

	useEffect(() => {
		return () => {
			if (startAnimationRef.current !== null) {
				cancelAnimationFrame(startAnimationRef.current);
				startAnimationRef.current = null;
			}
			if (animationRef.current !== null) {
				animationRef.current.cancel();
				animationRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (bottomSheetState.validationState.invalidStayHeightList) {
			console.error('[RTDF BottomSheet] stayHeightList must be an array of integers between 0 and 100.');
		}
		if (bottomSheetState.validationState.nonAscendingStayHeightList) {
			console.error('[RTDF BottomSheet] stayHeightList must be strictly ascending.');
		}
		if (bottomSheetState.validationState.stayHeightIndexOutOfRange) {
			console.warn('[RTDF BottomSheet] stayHeightIndex exceeds list length. Using last value.');
		}
		if (bottomSheetState.validationState.closeHeightTooLarge) {
			console.warn('[RTDF BottomSheet] closeHeight is larger than the smallest stay height and will be ignored.');
		}
	}, [bottomSheetState.validationState]);

	useIsomorphicLayoutEffect(() => {
		const wasVisible = prevVisibleRef.current;
		prevVisibleRef.current = visible;
		if (startAnimationRef.current !== null) {
			cancelAnimationFrame(startAnimationRef.current);
			startAnimationRef.current = null;
		}

		// 公共 action 只决定渲染生命周期，动画调度和 React 状态写入留在组件层。
		// Shared action only decides the render lifecycle; animation scheduling and React state writes stay in the component layer.
		const action = resolveBottomSheetVisibleChangeAction({
			visible,
			wasVisible,
			shouldRender,
			baseStartTop: bottomSheetState.baseStartTop,
			startTop: startTopRef.current,
			moveDistance: moveDistanceRef.current,
			outDuration
		});
		if (!action.shouldApplyState) return;

		setShouldRender(action.nextShouldRender);
		setIsClosing(action.nextIsClosing);
		setIsTouch(action.nextIsTouch);
		setStartTop(action.nextStartTop);
		setMoveDistance(action.nextMoveDistance);
		startTopRef.current = resolveBottomSheetActionStartTop(action.nextStartTop);
		moveDistanceRef.current = action.nextMoveDistance;

		if (action.shouldRunInAnimation) {
			if (sheetRef.current) {
				scheduleFlyAnimation('in', bottomSheetState.inParams);
			} else {
				pendingInAnimationRef.current = bottomSheetState.inParams;
			}
			return;
		}

		if (action.shouldRunOutAnimation) {
			pendingInAnimationRef.current = null;
			scheduleFlyAnimation('out', bottomSheetState.outParams);
		}

		if (action.shouldScheduleRenderEnd) {
			const timer = setTimeout(() => {
				const endAction = resolveBottomSheetRenderEndAction();
				setIsClosing(endAction.nextIsClosing);
				setShouldRender(endAction.nextShouldRender);
			}, action.renderEndDelayMs);
			return () => clearTimeout(timer);
		}
	}, [
		visible,
		bottomSheetState.baseStartTop,
		bottomSheetState.transitionDistance,
		bottomSheetState.inParams,
		bottomSheetState.outParams,
		duration,
		outDuration,
		shouldRender,
		scheduleFlyAnimation
	]);

	useIsomorphicLayoutEffect(() => {
		if (!visible || !shouldRender || !pendingInAnimationRef.current) return;
		const params = pendingInAnimationRef.current;
		pendingInAnimationRef.current = null;
		scheduleFlyAnimation('in', params);
	}, [visible, shouldRender, scheduleFlyAnimation]);

	useEffect(() => {
		if (visible && scrollTopDom.current) {
			setScrollTopHeight(resolveBottomSheetMeasuredScrollTopHeight(scrollTopDom.current));
		}
	}, [visible]);

	const handleTouchStart = (event: React.PointerEvent<HTMLDivElement>) => {
		// 公共 action 只返回拖拽开始状态，事件读取保留在组件层。
		// Shared action only returns drag-start state; event reads stay in the component layer.
		const action = resolveBottomSheetTouchStartAction({
			clientY: event.clientY,
			currentTop: bottomSheetState.currentTop
		});
		setMoveDistance(action.moveDistance);
		setStartTop(action.startTop);
		startTopRef.current = action.startTop;
		startYRef.current = action.startY;
		currentYRef.current = action.currentY;
		isTouchRef.current = action.isTouch;
		setIsTouch(action.isTouch);
	};

	const handleTouchMove = (event: PointerEvent) => {
		if (!isTouchRef.current) return;
		scrollTopDom.current?.setPointerCapture(event.pointerId);
		currentYRef.current = event.clientY;
		const nextDistance = resolveBottomSheetMoveDistance({
			currentY: event.clientY,
			startY: startYRef.current,
			viewportHeight: resolveViewportDimension({ value: window.innerHeight }),
			startTop: startTopRef.current,
			maxHeight: bottomSheetState.maxHeight
		});
		moveDistanceRef.current = nextDistance;
		setMoveDistance(nextDistance);
	};

	const handleTouchMoveThrottled = useMemo(() => throttleWithRAF(handleTouchMove), [bottomSheetState.maxHeight]);

	const handleTouchMoveReact = (event: React.PointerEvent<HTMLDivElement>) => {
		handleTouchMoveThrottled(event.nativeEvent);
	};

	const handleTouchEnd = () => {
		const endTop = startTopRef.current + moveDistanceRef.current;
		// 公共 action 只返回吸附高度和关闭决策，事件派发和 visible 写入留在组件层。
		// Shared action only returns snapped height and close decisions; event emits and visible writes stay in the component layer.
		const action = resolveBottomSheetTouchEndFlow({
			stayHeightList: bottomSheetState.resolvedStayHeightList,
			currentTop: endTop,
			currentY: currentYRef.current,
			viewportHeight: resolveViewportDimension({ value: window.innerHeight }),
			closeHeight,
			visible
		});
		isTouchRef.current = action.isTouch;
		setIsTouch(action.isTouch);
		setStartTop(action.startTop);
		startTopRef.current = action.startTop;
		setMoveDistance(action.moveDistance);
		moveDistanceRef.current = action.moveDistance;
		onHeightChange?.(action.height);
		if (!action.closeAction.shouldClose) return;
		setInternalVisible(action.closeAction.nextVisible);
		if (action.closeAction.shouldEmitClose) onClose?.();
	};

	const handleTouchCancel = () => {
		const action = resolveBottomSheetTouchCancelAction();
		isTouchRef.current = action.isTouch;
		setIsTouch(action.isTouch);
	};

	const handleMaskClick = () => {
		mask.onClickMask?.();
		onClickMask?.();
		// 公共流程只返回遮罩点击和关闭决策，事件派发留在组件层。
		// Shared flow only returns mask-click and close decisions; event dispatch stays in the component layer.
		const action = resolveBottomSheetMaskClickFlow({ maskClosable, visible });
		if (!action.closeAction.shouldClose) return;
		setInternalVisible(action.closeAction.nextVisible);
		if (action.closeAction.shouldEmitClose) onClose?.();
	};

	const handleCloseClick = () => {
		// 公共 close action 只返回可见状态和回调决策，事件调用留在组件层。
		// Shared close action only returns visibility and callback decisions; event calls stay in the component layer.
		const action = resolveBottomSheetCloseAction({ visible });
		if (!action.shouldClose) return;
		setInternalVisible(action.nextVisible);
		if (action.shouldEmitClose) onClose?.();
	};

	const handleBackClick = () => {
		onBack?.();
	};

	if (!shouldRender) {
		return null;
	}

	return (
		<>
			<Mask visible={visible} duration={duration} outDuration={outDuration} {...mask} onClickMask={handleMaskClick} />

			<div className={bottomSheetState.layerClass} style={bottomSheetState.layerStyleValue}>
				<div ref={sheetRef} className={bottomSheetState.panelClass} style={bottomSheetState.panelStyleValue}>
					<div
						ref={scrollTopDom}
						onPointerDown={handleTouchStart}
						onPointerMove={handleTouchMoveReact}
						onPointerUp={handleTouchEnd}
						onPointerCancel={handleTouchCancel}
						className={bottomSheetState.dragHandleClass}
					>
						<div className={bottomSheetState.dragIndicatorClass}></div>
						<div className={bottomSheetState.headerRowClass}>
							{showBackIcon ? (
								<button type="button" className={bottomSheetState.iconButtonClass} onClick={handleBackClick}>
									{/* 公共 BottomSheet 图标 SVG 数据在 common 中维护。 / Shared BottomSheet SVG data lives in common. */}
									<SvgIcon svg={arrowLeftSvg} width={16} height={16} className={bottomSheetState.iconSvgClass} />
								</button>
							) : null}
							<div className={bottomSheetState.headerTitleClass}>{bottomSheetState.finalTitle}</div>
							{bottomSheetState.closeContentState.kind === 'closeIcon' ? (
								<button
									type="button"
									className={bottomSheetState.iconButtonClass}
									aria-label={bottomSheetState.closeContentState.ariaLabel}
									onClick={handleCloseClick}
								>
									<SvgIcon svg={closeSvg} width={16} height={16} className={bottomSheetState.iconSvgClass} />
								</button>
							) : bottomSheetState.closeContentState.kind === 'downIcon' ? (
								<button
									type="button"
									className={bottomSheetState.iconButtonClass}
									aria-label={bottomSheetState.closeContentState.ariaLabel}
									onClick={handleCloseClick}
								>
									<SvgIcon svg={downSvg} width={16} height={16} className={bottomSheetState.iconSvgClass} />
								</button>
							) : bottomSheetState.closeContentState.kind === 'text' ? (
								<button type="button" className={bottomSheetState.closeTextButtonClass} onClick={handleCloseClick}>
									{bottomSheetState.closeContentState.text}
								</button>
							) : null}
						</div>
					</div>
					{showDivider ? <div className={bottomSheetState.dividerClass}></div> : null}
					<div className={bottomSheetState.contentScrollClass} style={bottomSheetState.contentStyleValue}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default BottomSheet;
