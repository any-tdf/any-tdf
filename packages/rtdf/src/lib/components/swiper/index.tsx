import type { SwiperProps, SwiperImgProps, SwiperComponentProps, SwiperReactNodeProps } from '../../types';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	resolveSwiperAutoplayGuardAction,
	resolveSwiperAutoplayTickAction,
	resolveSwiperDerived,
	resolveSwiperHeight,
	resolveSwiperInitialActive,
	resolveSwiperInitialIndicator,
	resolveSwiperInitialStateAction,
	resolveSwiperLoopResetTransition,
	resolveSwiperLongLineResetAction,
	resolveSwiperPointerDownAction,
	resolveSwiperPointerMoveAction,
	resolveSwiperPointerUpAction,
	resolveSwiperWidth
} from '@any-tdf/common/derived/swiper';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

const Swiper = forwardRef<HTMLDivElement, SwiperProps>(
	(
		{
			data = [],
			interval = 4,
			duration = 1000,
			autoplay = true,
			lazyplay = true,
			initActive = 0,
			indicatePosition = 'inner',
			indicateAlign = 'center',
			indicateStyle = 'pointLine',
			indicateRadius = '',
			indicateInjClass = '',
			indicateColor = '',
			indicateActiveColor = '',
			aspectRatio = [16, 9],
			containerWidth = 0,
			px = '0',
			py = '0',
			translateX = 0,
			translateZ = 0,
			rotateX = 0,
			rotateY = 0,
			rotateZ = 0,
			activeInjClass = '',
			notActiveInjClass = '',
			radius = '',
			innerInjClass = '',
			triggerLong = 30,
			notTriggerLong = 10,
			triggerSpeed = 0.5,
			onChange,
			onClick
		},
		ref
	) => {
		const swiperDomRef = useRef<HTMLDivElement | null>(null);
		const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
		const timeoutRef = useRef<number[]>([]);

		const startXRef = useRef(0);
		const startTimeRef = useRef(0);
		const moveXRef = useRef(0);
		const activeRef = useRef(0);
		const currentIndicateRef = useRef(0);
		const initialStateRef = useRef(true);
		const autoplayRef = useRef(autoplay);

		const [active, setActive] = useState(resolveSwiperInitialActive({ dataLength: data.length, initActive }));
		const [currentIndicate, setCurrentIndicate] = useState(resolveSwiperInitialIndicator({ dataLength: data.length, initActive }));
		const [longTransition, setLongTransition] = useState(true);
		const [long, setLong] = useState(false);
		const [once, setOnce] = useState(true);
		const [translateXTransition, setTranslateXTransition] = useState(true);
		const [initialState, setInitialState] = useState(true);
		const [moveX, setMoveX] = useState(0);
		const [isMove, setIsMove] = useState(false);

		autoplayRef.current = autoplay;

		const width = resolveSwiperWidth({
			containerWidth,
			fallbackWidth: resolveViewportDimension({
				value: typeof document !== 'undefined' ? document.body.clientWidth : undefined
			})
		});
		const height = resolveSwiperHeight(width, aspectRatio);
		// 公共派生层处理 Swiper 渲染数据、item 样式和指示器状态，手势与定时器留在组件层。
		// Shared derived layer handles Swiper render data, item styles and indicator state; gestures and timers stay in the component layer.
		const swiperState = useMemo(
			() =>
				resolveSwiperDerived<SwiperImgProps | SwiperComponentProps | SwiperReactNodeProps>({
					data,
					width,
					height,
					active,
					currentIndicate,
					moveX,
					duration,
					translateX,
					translateZ,
					rotateX,
					rotateY,
					rotateZ,
					isMove,
					px,
					py,
					translateXTransition,
					activeInjClass,
					notActiveInjClass,
					radius,
					innerInjClass,
					indicateRadius,
					indicateStyle,
					indicatePosition,
					indicateAlign,
					indicateInjClass,
					indicateColor,
					indicateActiveColor,
					long,
					longTransition,
					once,
					interval
				}),
			[
				data,
				width,
				height,
				active,
				currentIndicate,
				moveX,
				duration,
				translateX,
				translateZ,
				rotateX,
				rotateY,
				rotateZ,
				isMove,
				px,
				py,
				translateXTransition,
				activeInjClass,
				notActiveInjClass,
				radius,
				innerInjClass,
				indicateRadius,
				indicateStyle,
				indicatePosition,
				indicateAlign,
				indicateInjClass,
				indicateColor,
				indicateActiveColor,
				long,
				longTransition,
				once,
				interval
			]
		);

		const clearIntervalRef = useCallback(() => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}, []);

		const setActiveValue = useCallback((value: number) => {
			activeRef.current = value;
			setActive(value);
		}, []);

		const setCurrentIndicateValue = useCallback((value: number) => {
			currentIndicateRef.current = value;
			setCurrentIndicate(value);
		}, []);

		const setInitialStateValue = useCallback((value: boolean) => {
			initialStateRef.current = value;
			setInitialState(value);
		}, []);

		const setMoveXValue = useCallback((value: number) => {
			moveXRef.current = value;
			setMoveX(value);
		}, []);

		const addTimeout = useCallback((handler: () => void, delay: number) => {
			const id = window.setTimeout(handler, delay);
			timeoutRef.current.push(id);
		}, []);

		const applyLongLineReset = useCallback(
			(action = resolveSwiperLongLineResetAction({ autoplay: autoplayRef.current, duration })) => {
				setLong(action.long);
				setLongTransition(action.longTransition);
				addTimeout(() => {
					setLong(action.resetLong);
					setLongTransition(action.resetLongTransition);
				}, action.resetDelay);
			},
			[addTimeout, duration]
		);

		const handleClick = useCallback(() => {
			onClick?.(currentIndicateRef.current);
		}, [onClick]);

		const handleInterval = useCallback(() => {
			const action = resolveSwiperAutoplayTickAction({
				active: activeRef.current,
				currentIndicate: currentIndicateRef.current,
				dataLength: swiperState.items.length,
				autoplay: autoplayRef.current,
				duration
			});
			setOnce(action.once);
			setInitialStateValue(action.initialState);
			setActiveValue(action.active);
			setCurrentIndicateValue(action.currentIndicate);
			applyLongLineReset(action.longLine);
			if (action.loopResetActive !== undefined) {
				addTimeout(() => {
					setActiveValue(action.loopResetActive as number);
					setTranslateXTransition(resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition));
				}, duration);
			} else {
				setTranslateXTransition(action.translateXTransition);
			}
			onChange?.(currentIndicateRef.current);
		}, [
			addTimeout,
			applyLongLineReset,
			swiperState.items.length,
			duration,
			onChange,
			setActiveValue,
			setCurrentIndicateValue,
			setInitialStateValue
		]);

		const intervalTimeFun = useCallback(() => {
			clearIntervalRef();
			intervalRef.current = setInterval(() => {
				handleInterval();
			}, interval * 1000);
		}, [clearIntervalRef, handleInterval, interval]);

		useEffect(() => {
			activeRef.current = active;
		}, [active]);

		useEffect(() => {
			currentIndicateRef.current = currentIndicate;
		}, [currentIndicate]);

		useEffect(() => {
			moveXRef.current = moveX;
		}, [moveX]);

		useEffect(() => {
			initialStateRef.current = initialState;
		}, [initialState]);

		useEffect(() => {
			const action = resolveSwiperInitialStateAction({ dataLength: data.length, initActive });
			setActiveValue(action.active);
			setCurrentIndicateValue(action.currentIndicate);
			setInitialStateValue(action.initialState);
			setTranslateXTransition(action.translateXTransition);
			setOnce(action.once);
			setMoveXValue(action.moveX);
		}, [data.length, initActive, setActiveValue, setCurrentIndicateValue, setInitialStateValue, setMoveXValue]);

		useEffect(() => {
			const autoplayGuard = resolveSwiperAutoplayGuardAction({
				autoplay,
				dataLength: data.length,
				duration,
				interval
			});
			if (!autoplayGuard.shouldAutoplay) {
				if (autoplayGuard.shouldWarnInvalidTiming) {
					console.warn('[RTDF Swiper warning] interval must be greater than duration.');
				}
				clearIntervalRef();
				return undefined;
			}

			applyLongLineReset(resolveSwiperLongLineResetAction({ autoplay: autoplayRef.current, duration: 0 }));

			if (!lazyplay) {
				intervalTimeFun();
				return () => clearIntervalRef();
			}

			const node = swiperDomRef.current;
			if (!node) return undefined;

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (autoplayRef.current) {
							intervalTimeFun();
						}
					} else {
						clearIntervalRef();
					}
				});
			});

			observer.observe(node);

			return () => {
				observer.disconnect();
				clearIntervalRef();
			};
		}, [applyLongLineReset, autoplay, clearIntervalRef, data.length, duration, interval, intervalTimeFun, lazyplay]);

		useEffect(() => {
			return () => {
				clearIntervalRef();
				timeoutRef.current.forEach((id) => clearTimeout(id));
				timeoutRef.current = [];
			};
		}, [clearIntervalRef]);

		const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
			event.preventDefault();
			const action = resolveSwiperPointerDownAction({ clientX: event.clientX, time: Date.now() });
			setIsMove(action.isMove);
			startTimeRef.current = action.startTime;
			setTranslateXTransition(action.translateXTransition);
			startXRef.current = action.startX;
		}, []);

		const handlePointerMove = useCallback(
			(event: React.PointerEvent<HTMLDivElement>) => {
				const action = resolveSwiperPointerMoveAction({
					isMove,
					clientX: event.clientX,
					startX: startXRef.current
				});
				if (!action.shouldMove) return;
				if (action.shouldCapturePointer && swiperDomRef.current) {
					swiperDomRef.current.setPointerCapture(event.pointerId);
				}
				if (action.shouldStopAutoplay) {
					clearIntervalRef();
				}
				setMoveXValue(action.moveX);
			},
			[clearIntervalRef, isMove, setMoveXValue]
		);

		const handlePointerUp = useCallback(() => {
			const endTime = Date.now();
			const moveXValue = moveXRef.current;

			// 公共派生负责拖动阈值和循环索引计算，定时器和 setState 留在组件内。
			// Shared derivation resolves drag thresholds and loop indexes; timers and setState stay in the component.
			const action = resolveSwiperPointerUpAction({
				active: activeRef.current,
				currentIndicate: currentIndicateRef.current,
				dataLength: swiperState.items.length,
				moveX: moveXValue,
				width,
				startTime: startTimeRef.current,
				endTime,
				triggerLong,
				notTriggerLong,
				triggerSpeed,
				autoplay: autoplayRef.current,
				duration
			});
			setIsMove(action.isMove);
			setTranslateXTransition(action.translateXTransition);
			applyLongLineReset(action.longLine);
			setMoveXValue(action.moveX);
			setActiveValue(action.active);
			setCurrentIndicateValue(action.currentIndicate);
			if (action.loopResetActive !== undefined) {
				addTimeout(() => {
					setActiveValue(action.loopResetActive as number);
					setTranslateXTransition(resolveSwiperLoopResetTransition(action.loopResetTranslateXTransition));
				}, duration);
			}

			if (action.shouldRestartAutoplay) {
				intervalTimeFun();
			} else if (action.shouldEmitChange) {
				onChange?.(currentIndicateRef.current);
			}
		}, [
			addTimeout,
			applyLongLineReset,
			swiperState.items.length,
			duration,
			intervalTimeFun,
			onChange,
			setActiveValue,
			setCurrentIndicateValue,
			setMoveXValue,
			notTriggerLong,
			triggerLong,
			triggerSpeed,
			width
		]);

		const setRefs = useCallback(
			(node: HTMLDivElement | null) => {
				swiperDomRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			},
			[ref]
		);

		return (
			<div
				ref={setRefs}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				className={swiperState.rootClass}
			>
				<div className={swiperState.containerClass} style={swiperState.containerStyle}>
					{swiperState.items.map((renderItem) => {
						const itemContentState = renderItem.contentState;
						return (
							<div key={`swiper-${renderItem.index}`} className={renderItem.className} style={renderItem.style}>
								{itemContentState.kind === 'image' ? (
									<button type="button" onClick={handleClick} className={swiperState.itemButtonClass}>
										<img className={swiperState.imageClass} src={itemContentState.src} alt="" />
									</button>
								) : itemContentState.kind === 'reactNode' ? (
									<div className={swiperState.contentClass}>{itemContentState.reactNode}</div>
								) : itemContentState.kind === 'component' ? (
									<div className={swiperState.contentClass}>
										{typeof itemContentState.component === 'function' ? itemContentState.component() : itemContentState.component}
									</div>
								) : null}
							</div>
						);
					})}

					<div className={swiperState.indicators.inner.className}>
						{swiperState.indicators.inner.items.map((indicator) => (
							<div key={`indicator-inner-${indicator.index}`} className={indicator.className} style={indicator.style}>
								{indicator.showLongLine ? <div className={indicator.longLineClass} style={indicator.longLineStyle} /> : null}
							</div>
						))}
					</div>
				</div>

				<div className={swiperState.indicators.out.className}>
					{swiperState.indicators.out.items.map((indicator) => (
						<div key={`indicator-out-${indicator.index}`} className={indicator.className} style={indicator.style}>
							{indicator.showLongLine ? <div className={indicator.longLineClass} style={indicator.longLineStyle} /> : null}
						</div>
					))}
				</div>
			</div>
		);
	}
);

Swiper.displayName = 'Swiper';

export default Swiper;
