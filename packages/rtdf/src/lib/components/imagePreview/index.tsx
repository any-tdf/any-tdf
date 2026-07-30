import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ImagePreviewItemProps, ImagePreviewProps } from '../../types';
import { zh_CN, type LangProps } from '../../lang';
import { useConfig } from '../config-provider';
import Mask from '../mask';
import Icon from '../icon';
import Loading from '../loading';
import { Transition as MotionTransition } from '../utils/transition';
import {
	resolveImagePreviewBodyOverflowStyle,
	resolveImagePreviewCloseAction,
	resolveImagePreviewDerived,
	resolveImagePreviewInitialRendered,
	resolveImagePreviewInitialVisible,
	resolveImagePreviewLoadStatusAction,
	resolveImagePreviewOutroEndAction,
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
import { SvgIcon } from '../utils/SvgIcon';

type PointerData = {
	clientX: number;
	clientY: number;
};

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
	const {
		visible: visibleProp,
		images = [],
		current: currentProp = 0,
		loop = true,
		swipeDuration = 300,
		minScale = 0.5,
		maxScale = 3,
		closePosition = 'tr',
		showNavigation = true,
		navigationPosition = 'center',
		maskClosable = false,
		showIndex = true,
		indicatorType = 'number',
		zIndex = 1000,
		duration = 300,
		outDuration = 200,
		mask = {},
		icon = {},
		showRotation = false,
		rotationIcon = {},
		children,
		loadingChild,
		errorChild,
		indexChild,
		onChange,
		onClose,
		onScale,
		onRotate
	} = props;

	const { locale } = useConfig();
	const imagePreviewLang = (locale?.imagePreview || zh_CN.imagePreview) as NonNullable<LangProps['imagePreview']>;
	const [innerVisible, setInnerVisible] = useState(() => resolveImagePreviewInitialVisible(visibleProp));
	const visible = innerVisible;
	const [rendered, setRendered] = useState(() => resolveImagePreviewInitialRendered(visibleProp));

	const [innerCurrent, setInnerCurrent] = useState(currentProp);
	const currentIndex = innerCurrent;

	const [loadStatus, setLoadStatus] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({});
	const [rotationStatus, setRotationStatus] = useState<Record<number, number>>({});
	const [isResettingRotation, setIsResettingRotation] = useState(false);
	const [currentScale, setCurrentScale] = useState(1);
	const [translateX, setTranslateX] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const [isMoving, setIsMoving] = useState(false);
	const [isSwiping, setIsSwiping] = useState(false);
	const [swipeOffset, setSwipeOffset] = useState(0);
	const [isPinching, setIsPinching] = useState(false);

	const activePointers = useRef<Map<number, PointerData>>(new Map());
	const startXRef = useRef(0);
	const startYRef = useRef(0);
	const swipeStartXRef = useRef(0);
	const pinchStartDistanceRef = useRef(0);
	const pinchStartScaleRef = useRef(1);
	const hasMovedRef = useRef(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// 公共派生层统一 ImagePreview 的展示数据、style、控制区状态和图标参数，事件与 DOM 副作用留在组件层。
	// Shared derivation centralizes ImagePreview display data, styles, control state and icon params; events and DOM side effects stay in the component layer.
	const imagePreviewState = useMemo(
		() =>
			resolveImagePreviewDerived<
				ImagePreviewItemProps,
				NonNullable<ImagePreviewProps['icon']>,
				NonNullable<ImagePreviewProps['rotationIcon']>
			>(
				resolveImagePreviewStateOptions<
					ImagePreviewItemProps,
					NonNullable<ImagePreviewProps['icon']>,
					NonNullable<ImagePreviewProps['rotationIcon']>
				>({
					props: {
						images,
						closePosition,
						zIndex,
						duration,
						outDuration,
						icon,
						rotationIcon,
						loop,
						navigationPosition,
						showIndex,
						showNavigation,
						swipeDuration
					},
					currentIndex,
					currentScale,
					translateX,
					translateY,
					rotationStatus,
					loadStatus,
					loadingContentVisible: Boolean(loadingChild),
					errorContentVisible: Boolean(errorChild),
					isMoving,
					isPinching,
					isResettingRotation,
					isSwiping,
					swipeOffset
				})
			),
		[
			closePosition,
			currentIndex,
			currentScale,
			duration,
			errorChild,
			icon,
			images,
			isMoving,
			isPinching,
			isResettingRotation,
			isSwiping,
			loadStatus,
			loadingChild,
			loop,
			navigationPosition,
			outDuration,
			rotationIcon,
			rotationStatus,
			showIndex,
			showNavigation,
			swipeDuration,
			swipeOffset,
			translateX,
			translateY,
			zIndex
		]
	);

	useEffect(() => {
		setInnerVisible(resolveImagePreviewInitialVisible(visibleProp));
	}, [visibleProp]);

	useEffect(() => {
		setRendered((currentRendered) => resolveImagePreviewRenderedState({ visible, outDuration, currentRendered }));
	}, [outDuration, visible]);

	useEffect(() => {
		setInnerCurrent(currentProp);
	}, [currentProp]);

	useEffect(() => {
		setLoadStatus({});
		setRotationStatus({});
	}, [images]);

	useEffect(() => {
		if (visible) {
			const action = resolveImagePreviewVisibleResetAction();
			setCurrentScale(action.currentScale);
			setTranslateX(action.translateX);
			setTranslateY(action.translateY);
			setSwipeOffset(action.swipeOffset);
			setIsSwiping(action.pointerFlags.isSwiping);
			setIsMoving(action.pointerFlags.isMoving);
			setIsPinching(action.pointerFlags.isPinching);
			if (typeof document !== 'undefined') {
				// DOM 写入保留在组件内，公共函数只返回要写入的值。
				// Keep DOM writes in component code; the shared helper only returns the value to apply.
				document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible });
			}
			return () => {
				if (typeof document !== 'undefined') {
					document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible: false });
				}
			};
		}
		if (typeof document !== 'undefined') {
			document.body.style.overflow = resolveImagePreviewBodyOverflowStyle({ visible });
		}
	}, [visible]);

	const resetTransform = () => {
		const action = resolveImagePreviewTransformResetAction();
		setCurrentScale(action.currentScale);
		setTranslateX(action.translateX);
		setTranslateY(action.translateY);
	};
	const emitChange = (index: number) => {
		onChange?.(index);
	};
	const emitClose = () => {
		onClose?.();
	};
	const emitScale = (scale: number) => {
		onScale?.(scale);
	};
	const emitRotate = (rotation: 0 | 90 | 180 | 270) => {
		onRotate?.(rotation);
	};

	const close = () => {
		// 公共 action 只返回关闭状态和变换重置值，事件触发留在组件内。
		// Shared action only returns close state and transform reset values; event dispatch stays in the component.
		const action = resolveImagePreviewCloseAction({ visible: innerVisible });
		if (!action.shouldClose) return;
		setInnerVisible(action.nextVisible);
		setCurrentScale(action.currentScale);
		setTranslateX(action.translateX);
		setTranslateY(action.translateY);
		if (action.shouldEmitClose) emitClose();
	};

	const switchImage = (index: number) => {
		if (imagePreviewState.total === 0) return;
		const action = resolveImagePreviewSwitchAction({
			currentIndex,
			requestedIndex: index,
			total: imagePreviewState.total,
			loop
		});
		if (!action.shouldChange) return;
		setInnerCurrent(action.nextIndex);
		emitChange(action.nextIndex);
		setCurrentScale(action.currentScale);
		setTranslateX(action.translateX);
		setTranslateY(action.translateY);
	};

	const prev = () => switchImage(currentIndex - 1);
	const next = () => switchImage(currentIndex + 1);

	const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		containerRef.current?.setPointerCapture(event.pointerId);
		activePointers.current.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

		// 公共手势派生只返回下一步状态，pointer capture 和 setState 留在组件内。
		// Shared gesture derivation only returns next state; pointer capture and setState stay in the component.
		const pointerState = resolveImagePreviewPointerDownState({
			currentScale,
			pointers: resolveImagePreviewPointerList(activePointers.current.values())
		});
		hasMovedRef.current = pointerState.hasMoved;
		setIsPinching(pointerState.isPinching);
		setIsSwiping(pointerState.isSwiping);
		setIsMoving(pointerState.isMoving);
		if (pointerState.startX !== undefined) startXRef.current = pointerState.startX;
		if (pointerState.startY !== undefined) startYRef.current = pointerState.startY;
		if (pointerState.swipeStartX !== undefined) swipeStartXRef.current = pointerState.swipeStartX;
		if (pointerState.swipeOffset !== undefined) setSwipeOffset(pointerState.swipeOffset);
		if (pointerState.pinchStartDistance !== undefined) pinchStartDistanceRef.current = pointerState.pinchStartDistance;
		if (pointerState.pinchStartScale !== undefined) pinchStartScaleRef.current = pointerState.pinchStartScale;
	};

	const applyPointerMoveState = (
		pointerState: ReturnType<typeof resolveImagePreviewPointerMoveState>,
		event: React.PointerEvent<HTMLDivElement>
	) => {
		if (pointerState.hasMoved) hasMovedRef.current = true;
		if (pointerState.nextScale !== undefined) {
			setCurrentScale(pointerState.nextScale);
			emitScale(pointerState.nextScale);
		}
		if (pointerState.swipeOffset !== undefined) setSwipeOffset(pointerState.swipeOffset);
		if (pointerState.translateDeltaX !== undefined) setTranslateX((prevValue) => prevValue + pointerState.translateDeltaX!);
		if (pointerState.translateDeltaY !== undefined) setTranslateY((prevValue) => prevValue + pointerState.translateDeltaY!);
		if (pointerState.nextStartX !== undefined) startXRef.current = pointerState.nextStartX;
		if (pointerState.nextStartY !== undefined) startYRef.current = pointerState.nextStartY;
		if (pointerState.preventDefault) event.preventDefault();
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!activePointers.current.has(event.pointerId)) return;
		activePointers.current.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

		const pointerState = resolveImagePreviewPointerMoveState({
			pointers: resolveImagePreviewPointerList(activePointers.current.values()),
			point: { clientX: event.clientX, clientY: event.clientY },
			currentScale,
			isPinching,
			isSwiping,
			isMoving,
			pinchStartDistance: pinchStartDistanceRef.current,
			pinchStartScale: pinchStartScaleRef.current,
			minScale,
			maxScale,
			startX: startXRef.current,
			startY: startYRef.current,
			swipeStartX: swipeStartXRef.current
		});
		applyPointerMoveState(pointerState, event);
	};

	const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
		containerRef.current?.releasePointerCapture(event.pointerId);
		activePointers.current.delete(event.pointerId);

		const pointerState = resolveImagePreviewPointerUpState({
			pointers: resolveImagePreviewPointerList(activePointers.current.values()),
			currentScale,
			isSwiping,
			swipeOffset,
			viewportWidth: resolveViewportDimension({
				value: typeof window !== 'undefined' ? window.innerWidth : undefined
			}),
			hasMoved: hasMovedRef.current,
			maskClosable
		});
		const pointerAction = resolveImagePreviewPointerUpAction({
			pointerCount: activePointers.current.size,
			pointerState
		});

		if (pointerAction.kind === 'continueTracking') {
			const pointerFlags = pointerAction.pointerFlags;
			setIsPinching(pointerFlags.isPinching);
			setIsSwiping(pointerFlags.isSwiping);
			setIsMoving(pointerFlags.isMoving);
			if (pointerAction.startX !== undefined) startXRef.current = pointerAction.startX;
			if (pointerAction.startY !== undefined) startYRef.current = pointerAction.startY;
			if (pointerAction.swipeStartX !== undefined) swipeStartXRef.current = pointerAction.swipeStartX;
			return;
		}

		if (pointerAction.kind !== 'settled') return;

		// 公共动作决策负责纯分支判断，组件层负责状态写入和回调。
		// Shared action decision handles pure branching while the component layer writes state and emits callbacks.
		const pointerFlags = pointerAction.pointerFlags;
		setIsPinching(pointerFlags.isPinching);
		setIsMoving(pointerFlags.isMoving);

		if (pointerAction.shouldResetSwipeOffset) {
			setIsSwiping(pointerFlags.isSwiping);
			if (pointerAction.shouldSwitchPrev) {
				prev();
			} else if (pointerAction.shouldSwitchNext) {
				next();
			}
			setSwipeOffset(0);
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
		setLoadStatus(
			(prev) =>
				resolveImagePreviewLoadStatusAction({ index, loadStatus: prev, status: 'loaded' }).nextLoadStatus as Record<
					number,
					'loading' | 'loaded' | 'error'
				>
		);
	};

	const handleImageError = (index: number) => {
		setLoadStatus(
			(prev) =>
				resolveImagePreviewLoadStatusAction({ index, loadStatus: prev, status: 'error' }).nextLoadStatus as Record<
					number,
					'loading' | 'loaded' | 'error'
				>
		);
	};

	const handleRotate = () => {
		const action = resolveImagePreviewRotateAction({ currentIndex, rotationStatus });
		setRotationStatus(action.nextRotationStatus);
		emitRotate(action.normalizedRotation);

		if (action.shouldResetRotation) {
			const idx = action.resetIndex;
			setTimeout(() => {
				setIsResettingRotation(resolveImagePreviewRotationAnimationAction({ phase: 'start' }).nextIsResettingRotation);
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setRotationStatus((prev) => resolveImagePreviewRotationResetAction({ index: idx, rotationStatus: prev }).nextRotationStatus);
						setTimeout(() => {
							setIsResettingRotation(resolveImagePreviewRotationAnimationAction({ phase: 'end' }).nextIsResettingRotation);
						}, 20);
					});
				});
			}, 200);
		}
	};

	const handleOutroEnd = useCallback(() => {
		const action = resolveImagePreviewOutroEndAction();
		setRendered(action.nextRendered);
	}, []);

	if (!rendered) return null;

	return (
		<>
			<Mask visible={visible} opacity="0.9" duration={duration} outDuration={outDuration} {...mask} zIndex={zIndex} />
			<MotionTransition
				visible={visible}
				transition="fade"
				inParams={imagePreviewState.inParams}
				outParams={imagePreviewState.outParams}
				className={imagePreviewState.overlayClass}
				style={imagePreviewState.overlayStyleValue}
				onOutroEnd={handleOutroEnd}
			>
				<div
					ref={containerRef}
					className={imagePreviewState.containerClass}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerCancel={handlePointerUp}
				>
					<div className={imagePreviewState.slideClass} style={imagePreviewState.slideStyleValue}>
						{imagePreviewState.imageDisplayItems.map(({ item: img, index, displayState, alt, imageStyleValue }) => {
							return (
								<div key={`${img.url}-${index}`} className={imagePreviewState.itemClass}>
									{displayState.showLoading ? (
										<div className={imagePreviewState.loadingClass}>
											{displayState.showCustomLoading ? loadingChild?.() : <Loading height="12" width="12" theme />}
										</div>
									) : null}
									{displayState.showError ? (
										<div className={imagePreviewState.errorClass}>
											{displayState.showCustomError ? (
												errorChild?.()
											) : (
												<>
													{/* 公共图片占位 SVG 数据在 common 中维护。 / Shared image placeholder SVG data lives in common. */}
													<SvgIcon svg={imageLineSvg} width={48} height={48} className={imagePreviewState.errorIconClass} />
													<span className={imagePreviewState.errorTextClass}>{imagePreviewLang.loadFailedText}</span>
												</>
											)}
										</div>
									) : displayState.showImage ? (
										<img
											src={img.url}
											alt={alt}
											className={imagePreviewState.imageClass}
											style={imageStyleValue}
											draggable={false}
											onLoad={() => handleImageLoad(index)}
											onError={() => handleImageError(index)}
										/>
									) : null}
								</div>
							);
						})}
					</div>

					{children ? (
						<div className={imagePreviewState.customContentClass}>
							{typeof children === 'function'
								? (children as (item: ImagePreviewItemProps, index: number) => React.ReactNode)(
										imagePreviewState.currentImage,
										currentIndex
									)
								: children}
						</div>
					) : null}
				</div>

				<MotionTransition
					visible={true}
					transition="scale"
					inParams={imagePreviewState.controlScaleParams}
					className={imagePreviewState.controlPanelClass}
				>
					{showRotation ? (
						<button type="button" className={imagePreviewState.controlButtonClass} onClick={handleRotate} aria-label="Rotate">
							{/* 公共 ImagePreview 旋转 SVG 数据在 common 中维护。 / Shared ImagePreview rotate SVG data lives in common. */}
							<SvgIcon
								svg={imageRotateSvg}
								width={imagePreviewState.mergedRotationIcon.size}
								height={imagePreviewState.mergedRotationIcon.size}
							/>
						</button>
					) : null}
					<button type="button" className={imagePreviewState.controlButtonClass} onClick={close}>
						<Icon {...imagePreviewState.mergedIcon} />
					</button>
				</MotionTransition>

				{imagePreviewState.controlState.showCenterNavigation ? (
					<>
						{imagePreviewState.controlState.showCenterPrev ? (
							<MotionTransition
								visible={true}
								as="button"
								transition="scale"
								inParams={imagePreviewState.controlScaleParams}
								type="button"
								className={imagePreviewState.centerPrevButtonClass}
								onClick={prev}
								aria-label="Previous"
							>
								{/* 公共 ImagePreview 导航 SVG 数据在 common 中维护。 / Shared ImagePreview navigation SVG data lives in common. */}
								<SvgIcon svg={arrowLeftSvg} width={24} height={24} />
							</MotionTransition>
						) : null}
						{imagePreviewState.controlState.showCenterNext ? (
							<MotionTransition
								visible={true}
								as="button"
								transition="scale"
								inParams={imagePreviewState.controlScaleParams}
								type="button"
								className={imagePreviewState.centerNextButtonClass}
								onClick={next}
								aria-label="Next"
							>
								<SvgIcon svg={arrowRightSvg} width={24} height={24} />
							</MotionTransition>
						) : null}
					</>
				) : null}

				{imagePreviewState.controlState.showBottomBar ? (
					<div className={imagePreviewState.bottomBarClass}>
						{imagePreviewState.controlState.showBottomPrev ? (
							<MotionTransition
								visible={true}
								as="button"
								transition="scale"
								inParams={imagePreviewState.controlScaleParams}
								type="button"
								className={imagePreviewState.controlButtonClass}
								onClick={prev}
								aria-label="Previous"
							>
								<SvgIcon svg={arrowLeftSvg} width={24} height={24} />
							</MotionTransition>
						) : null}

						{imagePreviewState.controlState.showIndex ? (
							indexChild ? (
								indexChild(currentIndex + 1, imagePreviewState.total)
							) : indicatorType === 'dot' ? (
								<div className={imagePreviewState.dotListClass}>
									{imagePreviewState.dotItems.map((dotItem) => (
										<button
											type="button"
											key={`dot-${dotItem.index}`}
											className={dotItem.className}
											onClick={() => switchImage(dotItem.index)}
											aria-label={`Go to image ${dotItem.index + 1}`}
										></button>
									))}
								</div>
							) : (
								<span className={imagePreviewState.indexNumberClass}>
									{currentIndex + 1} / {imagePreviewState.total}
								</span>
							)
						) : null}

						{imagePreviewState.controlState.showBottomNext ? (
							<MotionTransition
								visible={true}
								as="button"
								transition="scale"
								inParams={imagePreviewState.controlScaleParams}
								type="button"
								className={imagePreviewState.controlButtonClass}
								onClick={next}
								aria-label="Next"
							>
								<SvgIcon svg={arrowRightSvg} width={24} height={24} />
							</MotionTransition>
						) : null}
					</div>
				) : null}
			</MotionTransition>
		</>
	);
};

export default ImagePreview;
