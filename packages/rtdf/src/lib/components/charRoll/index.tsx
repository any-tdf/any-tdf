import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { CharRollProps } from '../../types';
import { easingFunctions } from '../utils/easing';
import {
	formatCharRollValue,
	resolveCharRollDerived,
	resolveCharRollDisplayState,
	resolveCharRollEasingFunction,
	resolveCharRollFrameAction,
	resolveCharRollInitialInitialized,
	resolveCharRollPauseAction,
	resolveCharRollResetAction,
	resolveCharRollStartAction,
	resolveCharRollStateOptions,
	resolveCharRollValueChangeAction
} from '@any-tdf/common/derived/charRoll';

export interface CharRollRef {
	start: () => void;
	pause: () => void;
	reset: () => void;
}

const CharRoll = forwardRef<CharRollRef, CharRollProps>(
	(
		{
			value = '',
			duration = 1000,
			delay = 0,
			stagger = 50,
			direction = 'up',
			height = 40,
			separator = false,
			decimal,
			prefix = '',
			suffix = '',
			charSet,
			preset = 'number',
			loops = 1,
			autoStart = true,
			loop = false,
			loopInterval = 3000,
			easing: easingType = 'cubicOut',
			radius = 'sm',
			bg = 'none',
			gap = '1',
			fontSize = 'xl',
			fontWeight = 'bold',
			injClass = '',
			charClass = '',
			children,
			onStart,
			onComplete,
			onChange
		},
		ref
	) => {
		const displayCharsRef = useRef<string[]>([]);
		const animationProgressRef = useRef<number[]>([]);
		const startIndexesRef = useRef<number[]>([]);
		const targetIndexesRef = useRef<number[]>([]);
		const charStartedRef = useRef<boolean[]>([]);
		const isAnimatingRef = useRef(false);
		const rafIdRef = useRef<number | null>(null);
		const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
		const prevValueRef = useRef('');
		const initializedRef = useRef(resolveCharRollInitialInitialized());
		const [, forceRender] = useState(0);
		const [isAnimating, setIsAnimating] = useState(false);

		// 输入组件状态，返回框架无关的字符展示、class 和 style 派生结果。
		// Receive component state and return framework-agnostic character display, class and style derivations.
		const charRollState = resolveCharRollDerived(
			resolveCharRollStateOptions({
				animationProgress: animationProgressRef.current,
				charStarted: charStartedRef.current,
				displayChars: displayCharsRef.current,
				isAnimating,
				props: {
					bg,
					charClass,
					charSet,
					direction,
					fontSize,
					fontWeight,
					gap,
					height,
					injClass,
					loops,
					preset,
					radius
				},
				startIndexes: startIndexesRef.current,
				targetIndexes: targetIndexesRef.current
			})
		);

		const emitStart = () => {
			onStart?.();
		};

		const emitComplete = () => {
			onComplete?.();
		};

		const emitChange = (nextValue: string) => {
			onChange?.(nextValue);
		};

		const updateDisplayChars = () => {
			const nextState = resolveCharRollDisplayState({
				value,
				decimal,
				separator,
				prefix,
				suffix,
				charSetArray: charRollState.charSetArray,
				previousDisplayChars: displayCharsRef.current,
				previousAnimationProgress: animationProgressRef.current,
				previousStartIndexes: startIndexesRef.current,
				previousTargetIndexes: targetIndexesRef.current,
				autoStart,
				direction,
				loops
			});

			displayCharsRef.current = nextState.displayChars;
			targetIndexesRef.current = nextState.targetIndexes;
			startIndexesRef.current = nextState.startIndexes;
			animationProgressRef.current = nextState.animationProgress;
			charStartedRef.current = nextState.charStarted;
			forceRender((v) => v + 1);
		};

		const reset = () => {
			const action = resolveCharRollResetAction({
				displayChars: displayCharsRef.current,
				rafActive: rafIdRef.current !== null
			});
			if (action.shouldCancelFrame && rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			isAnimatingRef.current = action.nextAnimating;
			setIsAnimating(action.nextAnimating);
			animationProgressRef.current = action.animationProgress;
			charStartedRef.current = action.charStarted;
		};

		const start = () => {
			const startAction = resolveCharRollStartAction({
				isAnimating: isAnimatingRef.current,
				now: Date.now()
			});
			if (!startAction.shouldStart) return;
			reset();
			isAnimatingRef.current = startAction.nextAnimating;
			setIsAnimating(startAction.nextAnimating);
			emitStart();
			const startTime = startAction.startTime;
			const easingFn = resolveCharRollEasingFunction(easingFunctions, easingType);
			const charCount = displayCharsRef.current.length;

			const animate = () => {
				// 公共 action 只返回帧状态，动画帧和循环定时器留在组件内。
				// Shared action only returns frame state; animation frames and loop timers stay in the component.
				const action = resolveCharRollFrameAction({
					charCount,
					delay,
					decimal,
					displayChars: displayCharsRef.current,
					duration,
					easing: easingFn,
					loop,
					loopInterval,
					now: Date.now(),
					separator,
					stagger,
					startTime,
					targetIndexes: targetIndexesRef.current,
					value
				});
				animationProgressRef.current = action.animationProgress;
				charStartedRef.current = action.charStarted;

				forceRender((v) => v + 1);

				if (action.shouldComplete) {
					isAnimatingRef.current = action.nextAnimating;
					setIsAnimating(action.nextAnimating);
					rafIdRef.current = null;
					startIndexesRef.current = action.completeStartIndexes;
					charStartedRef.current = action.completeCharStarted;
					emitComplete();
					emitChange(action.changeValue);

					if (action.shouldScheduleLoop) {
						loopTimerRef.current = setTimeout(() => {
							reset();
							start();
						}, action.loopDelayMs);
					}
				} else {
					rafIdRef.current = requestAnimationFrame(animate);
				}
			};

			rafIdRef.current = requestAnimationFrame(animate);
		};

		const pause = () => {
			const action = resolveCharRollPauseAction({
				displayChars: displayCharsRef.current,
				animationProgress: animationProgressRef.current,
				startIndexes: startIndexesRef.current,
				targetIndexes: targetIndexesRef.current,
				charSetArray: charRollState.charSetArray,
				direction,
				loops,
				rafActive: rafIdRef.current !== null
			});
			if (action.shouldCancelFrame && rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			isAnimatingRef.current = action.nextAnimating;
			setIsAnimating(action.nextAnimating);
			startIndexesRef.current = action.startIndexes;
			animationProgressRef.current = action.animationProgress;
			forceRender((v) => v + 1);
		};

		useImperativeHandle(ref, () => ({ start, pause, reset }));

		useEffect(() => {
			prevValueRef.current = formatCharRollValue({ value, decimal, separator });
			updateDisplayChars();
			if (autoStart) {
				start();
			} else {
				startIndexesRef.current = [...targetIndexesRef.current];
			}
			initializedRef.current = true;
		}, []);

		useEffect(() => {
			const action = resolveCharRollValueChangeAction({
				value,
				decimal,
				separator,
				initialized: initializedRef.current,
				previousValue: prevValueRef.current,
				autoStart
			});
			if (action.shouldUpdateDisplay) {
				prevValueRef.current = action.nextPreviousValue;
				updateDisplayChars();
				if (action.shouldRestart) {
					reset();
					start();
				}
			}
		}, [value, prefix, suffix, separator, decimal, charSet, preset]);

		useEffect(
			() => () => {
				if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
				if (loopTimerRef.current !== null) clearTimeout(loopTimerRef.current);
			},
			[]
		);

		return (
			<div className={charRollState.rootClass}>
				{charRollState.displayItems.map((item) => {
					return (
						<div key={`${item.char}-${item.index}`} className={charRollState.charClassName} style={charRollState.charHeightStyleValue}>
							{children ? (
								(children as (char: string, index: number) => React.ReactNode)(item.meta.displayChar, item.index)
							) : item.meta.inCharSet && item.meta.hasStarted ? (
								<div className={charRollState.scrollListClass} style={item.scrollStyle}>
									{item.renderIndexes.map((renderIndex) => (
										<div key={`roll-${renderIndex}`} className={charRollState.rollItemClass} style={item.rollItemStyle}>
											{item.meta.charSetArray[renderIndex % item.meta.charSetArray.length]}
										</div>
									))}
								</div>
							) : (
								<div className={charRollState.directClass} style={item.directStyle}>
									{item.meta.displayChar}
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	}
);

CharRoll.displayName = 'CharRoll';

export default CharRoll;
