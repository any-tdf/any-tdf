import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
	resolveCountDownDerived,
	resolveCountDownPauseAction,
	resolveCountDownResetAction,
	resolveCountDownShouldAutoStart,
	resolveCountDownShouldResumeTick,
	resolveCountDownStartAction,
	resolveCountDownStateOptions,
	resolveCountDownTickAction,
	resolveCountDownTimePropAction
} from '@any-tdf/common/derived/countDown';
import type { CountDownProps, TimeData } from '../../types';

export interface CountDownRef {
	start: () => void;
	pause: () => void;
	reset: (newTime?: number) => void;
}

const CountDown = forwardRef<CountDownRef, CountDownProps>(
	({ time = 0, format = 'HH:mm:ss', autoStart = true, millisecond = false, injClass = '', children, onFinish, onChange }, ref) => {
		const [remain, setRemain] = useState(time);
		const [counting, setCounting] = useState(false);
		const endTimeRef = useRef(0);
		const rafIdRef = useRef<number | null>(null);
		const prevTimeRef = useRef(time);

		const emitChange = (timeData: TimeData) => {
			onChange?.(timeData);
		};

		const emitFinish = () => {
			onFinish?.();
		};

		const tick = () => {
			// 公共 action 只返回下一次 tick 的动作，动画帧和回调留在组件内。
			// Shared action only returns the next tick action; animation frames and callbacks stay in the component.
			const action = resolveCountDownTickAction({
				endTime: endTimeRef.current,
				now: Date.now(),
				previousRemain: remain,
				millisecond
			});
			setRemain(action.nextRemain);
			if (action.shouldChange) {
				emitChange(action.timeData);
			}
			if (action.shouldContinue) {
				rafIdRef.current = requestAnimationFrame(tick);
			} else {
				setCounting(action.nextCounting);
				emitFinish();
			}
		};

		const start = () => {
			const action = resolveCountDownStartAction({ counting, remain, now: Date.now() });
			if (!action.shouldStart) return;
			setCounting(action.nextCounting);
			endTimeRef.current = action.endTime;
			rafIdRef.current = requestAnimationFrame(tick);
		};

		const pause = () => {
			const action = resolveCountDownPauseAction({
				counting,
				endTime: endTimeRef.current,
				now: Date.now()
			});
			if (!action.shouldPause) return;
			setCounting(action.nextCounting);
			if (action.shouldCancelTick && rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			setRemain(action.nextRemain);
		};

		const reset = (newTime?: number) => {
			pause();
			const action = resolveCountDownResetAction({ newTime, time });
			setRemain(action.nextRemain);
			emitChange(action.timeData);
		};

		useImperativeHandle(ref, () => ({ start, pause, reset }), [remain, time, counting]);

		useEffect(() => {
			if (resolveCountDownShouldAutoStart({ autoStart, time })) start();
		}, []);

		useEffect(() => {
			const handleVisibility = () => {
				if (
					resolveCountDownShouldResumeTick({
						hidden: document.hidden,
						counting,
						rafId: rafIdRef.current
					})
				) {
					rafIdRef.current = requestAnimationFrame(tick);
				}
			};
			document.addEventListener('visibilitychange', handleVisibility);
			return () => document.removeEventListener('visibilitychange', handleVisibility);
		}, [counting]);

		useEffect(() => {
			const action = resolveCountDownTimePropAction({
				nextTime: time,
				previousTime: prevTimeRef.current,
				counting
			});
			prevTimeRef.current = action.nextPreviousTime;
			if (action.shouldSyncRemain) {
				setRemain(action.nextRemain);
			}
		}, [time, counting]);

		useEffect(
			() => () => {
				if (rafIdRef.current !== null) {
					cancelAnimationFrame(rafIdRef.current);
				}
			},
			[]
		);

		// 输入组件状态，返回框架无关的文本、时间拆分和 class 派生结果。
		// Receive component state and return framework-agnostic text, time parts and class derivations.
		const countDownState = resolveCountDownDerived(
			resolveCountDownStateOptions({
				props: { format, injClass },
				remain
			})
		);

		return (
			<span className={countDownState.rootClass}>
				{typeof children === 'function'
					? (children as (data: TimeData) => React.ReactNode)(countDownState.timeData)
					: children || countDownState.displayText}
			</span>
		);
	}
);

CountDown.displayName = 'CountDown';

export default CountDown;
