import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce, throttleWithRAF } from '@any-tdf/common/utils';
import type { SliderProps } from '../../types';
import { useFlyTransition } from '../utils/transition';
import {
	resolveSliderChangePayload,
	resolveSliderDerived,
	resolveSliderEndPositions,
	resolveSliderInitialEndValue,
	resolveSliderInitialStartValue,
	resolveSliderInitialValue,
	resolveSliderMeasuredBlockWidth,
	resolveSliderMeasuredLayoutState,
	resolveSliderPointerMoveAction,
	resolveSliderPointerStartAction,
	resolveSliderPositionSyncAction,
	resolveSliderRangeMoveState,
	resolveSliderRangeStartState,
	resolveSliderSingleMoveState,
	resolveSliderSingleStartState,
	resolveSliderStateOptions,
	type SliderMoveTarget
} from '@any-tdf/common/derived/slider';

const Slider: React.FC<SliderProps> = ({
	value: propValue = 40,
	step = 1,
	minRange = 0,
	maxRange = 100,
	isRange = false,
	valueRange: _valueRange = [20, 60],
	startValue: propStartValue = 20,
	endValue: propEndValue = 60,
	showTip = 'touch',
	showSteps = false,
	stepsStyle = 'block',
	stepLabels = [],
	radius = '',
	lineBlock = false,
	disabled = false,
	readonly = false,
	children,
	onChange
}) => {
	const [value, setValue] = useState(resolveSliderInitialValue(propValue));
	const [startValue, setStartValue] = useState(resolveSliderInitialStartValue(propStartValue));
	const [endValue, setEndValue] = useState(resolveSliderInitialEndValue(propEndValue));
	const [isDown, setIsDown] = useState(false);

	// 滑动条 dom slider dom
	const lineDom = useRef<HTMLDivElement | null>(null);
	// 滑块 dom block dom
	const blockDom = useRef<HTMLDivElement | null>(null);
	// 滑块宽度 block width
	const [blockWidth, setBlockWidth] = useState(0);
	// 滑块条起始位置 slider start position
	const [lineDomStartX, setLineDomStartX] = useState(0);
	// 滑块条结束位置 slider end position
	const [lineDomEndX, setLineDomEndX] = useState(0);
	// 滑块条宽度 slider width
	const [lineDomWidth, setLineDomWidth] = useState(0);
	// 初始位置 initial position
	const [currentX, setCurrentX] = useState(0);
	// 区间选择时开始位置 start position
	const [currentStartX, setCurrentStartX] = useState(0);
	// 区间选择时结束位置 end position
	const [currentEndX, setCurrentEndX] = useState(0);
	// 当前移动的滑块 current move block
	const [currentMove, setCurrentMove] = useState<SliderMoveTarget>('none');

	// 公共派生层处理 Slider 的渲染状态，框架事件与 DOM 读取留在组件层。
	// Shared derived layer handles Slider render state; framework events and DOM reads stay in the component layer.
	const sliderState = useMemo(
		() =>
			resolveSliderDerived(
				resolveSliderStateOptions({
					value,
					startValue,
					endValue,
					props: {
						minRange,
						maxRange,
						step,
						stepLabels,
						isRange,
						showTip,
						showSteps,
						stepsStyle,
						radius,
						lineBlock,
						disabled
					},
					isDown,
					currentMove,
					currentX,
					currentStartX,
					currentEndX
				})
			),
		[
			value,
			startValue,
			endValue,
			minRange,
			maxRange,
			step,
			stepLabels,
			isRange,
			showTip,
			showSteps,
			stepsStyle,
			radius,
			lineBlock,
			disabled,
			isDown,
			currentMove,
			currentX,
			currentStartX,
			currentEndX
		]
	);

	const handleChange = useCallback(
		(nextValue: number, nextRange?: [number, number]) => {
			const payload = resolveSliderChangePayload({
				value: nextValue,
				valueRange: nextRange,
				minRange,
				step,
				stepLabels
			});
			onChange?.(payload.value, payload.valueRange, payload.label, payload.labelRange);
		},
		[onChange, minRange, step, stepLabels]
	);

	useEffect(() => {
		setValue(resolveSliderInitialValue(propValue));
	}, [propValue]);

	useEffect(() => {
		setStartValue(resolveSliderInitialStartValue(propStartValue));
	}, [propStartValue]);

	useEffect(() => {
		setEndValue(resolveSliderInitialEndValue(propEndValue));
	}, [propEndValue]);

	useEffect(() => {
		// 公共同步动作统一处理“拖拽中不回写位置”的判断，组件层只写入状态。
		// Shared sync action owns the "do not rewrite positions while dragging" decision; the component layer only writes state.
		const action = resolveSliderPositionSyncAction({
			isDown,
			value,
			startValue,
			endValue,
			minRange,
			maxRange,
			lineWidth: lineDomWidth
		});
		if (!action.shouldSync) return;
		setCurrentX(action.currentX);
		setCurrentStartX(action.currentStartX);
		setCurrentEndX(action.currentEndX);
	}, [value, startValue, endValue, minRange, maxRange, lineDomWidth, isDown]);

	const handleResize = useCallback(() => {
		if (!lineDom.current) return;
		const rect = lineDom.current.getBoundingClientRect();
		// 公共 helper 只处理测量后的数字，DOM 读取留在组件层。
		// Shared helper only handles measured numbers; DOM reads stay in the component layer.
		const nextState = resolveSliderMeasuredLayoutState({
			lineRect: rect,
			blockWidth: resolveSliderMeasuredBlockWidth({
				isRange,
				measuredWidth: blockDom.current ? blockDom.current.getBoundingClientRect().width : undefined
			}),
			isRange,
			value,
			startValue,
			endValue,
			minRange,
			maxRange
		});
		setLineDomStartX(nextState.lineStartX);
		setLineDomEndX(nextState.lineEndX);
		setLineDomWidth(nextState.lineWidth);
		setCurrentX(nextState.currentX);
		setCurrentStartX(nextState.currentStartX);
		setCurrentEndX(nextState.currentEndX);
		setBlockWidth(nextState.blockWidth);
	}, [value, minRange, maxRange, startValue, endValue, isRange]);

	useEffect(() => {
		handleResize();
		const onResize = debounce(handleResize, 200);
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [handleResize]);

	const touchLineStart = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			// 公共 action 只判断是否进入拖拽计算，DOM 事件与尺寸读取留在组件层。
			// Shared action only decides whether to enter drag math; DOM events and measurements stay in the component layer.
			const action = resolveSliderPointerStartAction({ disabled, readonly });
			if (!action.shouldStart) return;
			setIsDown(true);
			const clientX = e.clientX;
			if (isRange) {
				const nextState = resolveSliderRangeStartState({
					clientX,
					lineStartX: lineDomStartX,
					lineWidth: lineDomWidth,
					currentStartX,
					currentEndX,
					startValue,
					endValue,
					minRange,
					maxRange,
					step
				});
				setCurrentMove(nextState.currentMove);
				setCurrentStartX(nextState.currentStartX);
				setCurrentEndX(nextState.currentEndX);
				setStartValue(nextState.startValue);
				setEndValue(nextState.endValue);
				handleChange(0, [nextState.startValue, nextState.endValue]);
			} else {
				const nextState = resolveSliderSingleStartState({
					clientX,
					lineStartX: lineDomStartX,
					lineWidth: lineDomWidth,
					minRange,
					maxRange,
					step
				});
				setCurrentMove(nextState.currentMove);
				setCurrentX(nextState.currentX);
				setValue(nextState.value);
				handleChange(nextState.value);
			}
		},
		[
			disabled,
			readonly,
			isRange,
			startValue,
			endValue,
			lineDomStartX,
			currentStartX,
			currentEndX,
			lineDomWidth,
			minRange,
			maxRange,
			step,
			handleChange
		]
	);

	const touchLineMove = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			if (!lineDom.current?.hasPointerCapture(e.pointerId)) {
				lineDom.current?.setPointerCapture(e.pointerId);
			}
			// 公共 action 只判断是否继续拖拽计算，pointer capture 保持在组件层。
			// Shared action only decides whether to continue drag math; pointer capture stays in the component layer.
			const action = resolveSliderPointerMoveAction({ disabled, readonly, isDown });
			if (!action.shouldMove) return;
			const clientX = e.clientX;
			if (isRange) {
				const nextState = resolveSliderRangeMoveState({
					clientX,
					lineStartX: lineDomStartX,
					lineEndX: lineDomEndX,
					lineWidth: lineDomWidth,
					blockWidth,
					currentMove,
					currentStartX,
					currentEndX,
					minRange,
					maxRange,
					step
				});
				setCurrentStartX(nextState.currentStartX);
				setCurrentEndX(nextState.currentEndX);
				setStartValue(nextState.startValue);
				setEndValue(nextState.endValue);
				handleChange(0, [nextState.startValue, nextState.endValue]);
			} else {
				const nextState = resolveSliderSingleMoveState({
					clientX,
					lineStartX: lineDomStartX,
					lineEndX: lineDomEndX,
					lineWidth: lineDomWidth,
					minRange,
					maxRange,
					step
				});
				setCurrentX(nextState.currentX);
				setValue(nextState.value);
				handleChange(nextState.value);
			}
		},
		[
			disabled,
			readonly,
			isDown,
			isRange,
			currentMove,
			lineDomStartX,
			currentStartX,
			currentEndX,
			blockWidth,
			lineDomEndX,
			lineDomWidth,
			minRange,
			maxRange,
			step,
			handleChange
		]
	);

	const touchLineEnd = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			if (lineDom.current?.hasPointerCapture(e.pointerId)) {
				lineDom.current.releasePointerCapture(e.pointerId);
			}
			const nextState = resolveSliderEndPositions({
				isRange,
				lineWidth: lineDomWidth,
				value,
				startValue,
				endValue,
				minRange,
				maxRange
			});
			if (typeof nextState.currentStartX === 'number') setCurrentStartX(nextState.currentStartX);
			if (typeof nextState.currentEndX === 'number') setCurrentEndX(nextState.currentEndX);
			if (typeof nextState.currentX === 'number') setCurrentX(nextState.currentX);
			setCurrentMove(nextState.currentMove);
			setIsDown(nextState.isDown);
		},
		[isRange, startValue, endValue, minRange, maxRange, lineDomWidth, value]
	);

	const throttledMove = useMemo(() => throttleWithRAF(touchLineMove), [touchLineMove]);

	const startTipRef = useFlyTransition(sliderState.tips.start.visible, {
		in: sliderState.tipInParams,
		out: sliderState.tipOutParams
	});
	const endTipRef = useFlyTransition(sliderState.tips.end.visible, {
		in: sliderState.tipInParams,
		out: sliderState.tipOutParams
	});
	const singleTipRef = useFlyTransition(sliderState.tips.single.visible, {
		in: sliderState.tipInParams,
		out: sliderState.tipOutParams
	});

	return (
		<div className={sliderState.rootClass}>
			<div
				ref={lineDom}
				onPointerDown={touchLineStart}
				onPointerMove={throttledMove}
				onPointerUp={touchLineEnd}
				className={sliderState.lineClass}
			>
				{children ? (
					children
				) : sliderState.showBreakSteps ? (
					<div className={sliderState.breakRootClass}>
						{sliderState.breakStepItems.map((stepItem) => (
							<Fragment key={`break-${stepItem.position}`}>
								<div className={stepItem.markerClass} style={stepItem.markerStyle} />
								{stepItem.showSegment ? <div className={stepItem.segmentClass} /> : null}
							</Fragment>
						))}
						<div className={sliderState.breakProgressOverlayClass}>
							{sliderState.breakStepItems.map((stepItem) => {
								return (
									<Fragment key={`break-progress-${stepItem.position}`}>
										<div className={stepItem.progressMarkerClass} style={stepItem.markerStyle} />
										{stepItem.showSegment ? (
											<div className={stepItem.progressSegmentClass}>
												{isRange
													? stepItem.rangeSegmentVisible
														? (() => {
																return <div className={sliderState.segmentRangeClass} style={stepItem.rangeSegmentStyle} />;
															})()
														: null
													: (() => {
															return <div className={sliderState.segmentProgressClass} style={stepItem.progressSegmentStyle} />;
														})()}
											</div>
										) : null}
									</Fragment>
								);
							})}
						</div>
					</div>
				) : (
					<div className={sliderState.continuousTrackClass}>
						{sliderState.showContinuousSteps &&
							sliderState.continuousStepItems.map((stepItem) => (
								<div key={`step-${stepItem.position}`} className={stepItem.markerClass} style={stepItem.markerStyle} />
							))}
						{isRange
							? (() => {
									return (
										<>
											<div className={sliderState.trackClass} style={sliderState.rangeTrackStyle} />
											{sliderState.showContinuousSteps &&
												sliderState.continuousStepItems.map((stepItem) => {
													if (!stepItem.active) return null;
													return (
														<div key={`range-step-${stepItem.position}`} className={stepItem.activeClass} style={stepItem.markerStyle} />
													);
												})}
										</>
									);
								})()
							: (() => {
									return (
										<>
											<div className={sliderState.trackClass} style={sliderState.singleTrackStyle} />
											{sliderState.showContinuousSteps &&
												sliderState.continuousStepItems.map((stepItem) => {
													if (!stepItem.active) return null;
													return (
														<div key={`single-step-${stepItem.position}`} className={stepItem.activeClass} style={stepItem.markerStyle} />
													);
												})}
										</>
									);
								})()}
					</div>
				)}
				{isRange ? (
					<>
						<div className={sliderState.blockLayerClass}>
							<div className={sliderState.blockClass} style={sliderState.startBlockStyle}>
								<div ref={startTipRef} className={sliderState.tips.start.anchorClass}>
									<div className={sliderState.tips.start.bubbleClass}>
										{sliderState.tips.start.label}
										<div className={sliderState.tips.start.arrowClass} />
									</div>
								</div>
							</div>
						</div>
						<div className={sliderState.blockLayerClass}>
							<div ref={blockDom} className={sliderState.blockClass} style={sliderState.endBlockStyle}>
								<div ref={endTipRef} className={sliderState.tips.end.anchorClass}>
									<div className={sliderState.tips.end.bubbleClass}>
										{sliderState.tips.end.label}
										<div className={sliderState.tips.end.arrowClass} />
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className={sliderState.blockLayerClass}>
						<div className={sliderState.blockClass} style={sliderState.singleBlockStyle}>
							<div ref={singleTipRef} className={sliderState.tips.single.anchorClass}>
								<div className={sliderState.tips.single.bubbleClass}>
									{sliderState.tips.single.label}
									<div className={sliderState.tips.single.arrowClass} />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export type { SliderProps } from '../../types';
export default Slider;
