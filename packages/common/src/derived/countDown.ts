import type { TimeData } from '../types/index.js';
import { joinClasses } from './helpers.js';

export type ResolveCountDownStartActionOptions = {
	counting: boolean;
	remain: number;
	now: number;
};

export type CountDownStartAction = {
	shouldStart: boolean;
	nextCounting: boolean;
	endTime: number;
};

export type ResolveCountDownTickActionOptions = {
	endTime: number;
	now: number;
	previousRemain: number;
	millisecond?: boolean;
};

export type CountDownTickAction = {
	nextRemain: number;
	timeData: TimeData;
	shouldChange: boolean;
	shouldContinue: boolean;
	shouldFinish: boolean;
	nextCounting: boolean;
};

export type ResolveCountDownPauseActionOptions = {
	counting: boolean;
	endTime: number;
	now: number;
};

export type CountDownPauseAction = {
	shouldPause: boolean;
	shouldCancelTick: boolean;
	nextCounting: boolean;
	nextRemain: number;
};

export type ResolveCountDownResetActionOptions = {
	newTime?: number;
	time: number;
};

export type CountDownResetAction = {
	nextRemain: number;
	timeData: TimeData;
};

export type ResolveCountDownTimePropActionOptions = {
	nextTime: number;
	previousTime: number;
	counting: boolean;
};

export type CountDownTimePropAction = {
	nextPreviousTime: number;
	shouldSyncRemain: boolean;
	nextRemain: number;
};

export type ResolveCountDownDerivedOptions = {
	format?: string;
	injClass?: string;
	remain: number;
};

export type CountDownStatePropsLike = Partial<Omit<ResolveCountDownDerivedOptions, 'remain'>>;

export type ResolveCountDownStateOptionsParams = {
	props: CountDownStatePropsLike;
	remain: number;
};

export type CountDownDerived = {
	displayText: string;
	rootClass: string;
	timeData: TimeData;
};

// 输入倒计时剩余毫秒数，返回框架无关的时间拆分结果。
// Convert countdown remaining milliseconds into framework-agnostic time parts.
export const parseCountDownTime = (ms: number): TimeData => {
	const days = Math.floor(ms / (1000 * 60 * 60 * 24));
	const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((ms % (1000 * 60)) / 1000);
	const milliseconds = ms % 1000;

	return { days, hours, minutes, seconds, milliseconds };
};

export const padCountDownZero = (num: number, length = 2): string => String(num).padStart(length, '0');

// 输入计时状态，返回框架无关的时间推进结果。
// Receive timing state and return framework-agnostic timing results.
export const resolveCountDownRemain = ({ endTime, now }: { endTime: number; now: number }): number => Math.max(0, endTime - now);

export const resolveCountDownEndTime = ({ now, remain }: { now: number; remain: number }): number => now + remain;

export const resolveCountDownShouldEmitChange = ({
	millisecond = false,
	nextRemain,
	previousRemain
}: {
	millisecond?: boolean;
	nextRemain: number;
	previousRemain: number;
}): boolean => millisecond || Math.floor(nextRemain / 1000) !== Math.floor(previousRemain / 1000);

export const resolveCountDownResetRemain = ({ newTime, time }: { newTime?: number; time: number }): number =>
	newTime !== undefined ? newTime : time;

// 输入倒计时运行状态，返回框架无关的状态判定。
// Receive countdown runtime state and return framework-agnostic state decisions.
export const resolveCountDownCanStart = ({ counting, remain }: { counting: boolean; remain: number }): boolean => !counting && remain > 0;

export const resolveCountDownShouldAutoStart = ({ autoStart = true, time = 0 }: { autoStart?: boolean; time?: number }): boolean =>
	autoStart && time > 0;

export const resolveCountDownShouldResumeTick = ({
	hidden,
	counting,
	rafId
}: {
	hidden: boolean;
	counting: boolean;
	rafId: number | null;
}): boolean => !hidden && counting && rafId === null;

export const resolveCountDownTimeChanged = ({ nextTime, previousTime }: { nextTime: number; previousTime: number }): boolean =>
	nextTime !== previousTime;

export const resolveCountDownShouldSyncRemain = ({
	nextTime,
	previousTime,
	counting
}: {
	nextTime: number;
	previousTime: number;
	counting: boolean;
}): boolean => resolveCountDownTimeChanged({ nextTime, previousTime }) && !counting;

export const resolveCountDownRootClass = (injClass = '') => joinClasses(['inline-block', injClass]);

// 输入倒计时内部状态，返回开始动作描述；计时器调度由组件持有。
// Receive countdown state and return a start action; timer scheduling stays in the component.
export const resolveCountDownStartAction = ({ counting, remain, now }: ResolveCountDownStartActionOptions): CountDownStartAction => {
	const shouldStart = resolveCountDownCanStart({ counting, remain });
	return {
		shouldStart,
		nextCounting: shouldStart,
		endTime: shouldStart ? resolveCountDownEndTime({ now, remain }) : 0
	};
};

// 输入当前计时状态，返回一次 tick 的纯动作描述。
// Receive current timing state and return a pure tick action.
export const resolveCountDownTickAction = ({
	endTime,
	now,
	previousRemain,
	millisecond = false
}: ResolveCountDownTickActionOptions): CountDownTickAction => {
	const nextRemain = resolveCountDownRemain({ endTime, now });
	const timeData = parseCountDownTime(nextRemain);
	const shouldContinue = nextRemain > 0;

	return {
		nextRemain,
		timeData,
		shouldChange: resolveCountDownShouldEmitChange({ millisecond, nextRemain, previousRemain }),
		shouldContinue,
		shouldFinish: !shouldContinue,
		nextCounting: shouldContinue
	};
};

// 输入暂停前状态，返回暂停动作；取消动画帧仍由组件执行。
// Receive state before pause and return a pause action; canceling animation frames stays in the component.
export const resolveCountDownPauseAction = ({ counting, endTime, now }: ResolveCountDownPauseActionOptions): CountDownPauseAction => ({
	shouldPause: counting,
	shouldCancelTick: counting,
	nextCounting: false,
	nextRemain: counting ? resolveCountDownRemain({ endTime, now }) : 0
});

// 输入重置参数，返回重置后的剩余时间和时间拆分数据。
// Receive reset params and return reset remaining time plus parsed time data.
export const resolveCountDownResetAction = ({ newTime, time }: ResolveCountDownResetActionOptions): CountDownResetAction => {
	const nextRemain = resolveCountDownResetRemain({ newTime, time });
	return {
		nextRemain,
		timeData: parseCountDownTime(nextRemain)
	};
};

// 输入外部 time 变化状态，返回同步 remain 的纯动作。
// Receive external time change state and return a pure remain-sync action.
export const resolveCountDownTimePropAction = ({
	nextTime,
	previousTime,
	counting
}: ResolveCountDownTimePropActionOptions): CountDownTimePropAction => {
	const changed = resolveCountDownTimeChanged({ nextTime, previousTime });
	return {
		nextPreviousTime: changed ? nextTime : previousTime,
		shouldSyncRemain: changed && !counting,
		nextRemain: nextTime
	};
};

// 只处理格式字符串替换，不读取计时器、DOM 或框架状态。
// Only replace format tokens without reading timers, DOM or framework state.
export const formatCountDownTime = (format: string, data: TimeData): string => {
	let result = format;
	const { days, hours, minutes, seconds, milliseconds } = data;

	if (result.includes('DD')) {
		result = result.replace('DD', padCountDownZero(days));
	}

	const totalHours = format.includes('DD') ? hours : days * 24 + hours;

	result = result.replace('HH', padCountDownZero(totalHours));
	result = result.replace('mm', padCountDownZero(minutes));
	result = result.replace('ss', padCountDownZero(seconds));
	result = result.replace('SSS', padCountDownZero(milliseconds, 3));
	result = result.replace('SS', padCountDownZero(Math.floor(milliseconds / 10), 2));
	result = result.replace('S', String(Math.floor(milliseconds / 100)));

	return result;
};

// 输入组件 props 和内部剩余时间，返回框架无关的 CountDown 派生入参。
// Receive component props and internal remaining time, then return framework-agnostic CountDown derivation options.
export const resolveCountDownStateOptions = ({ props, remain }: ResolveCountDownStateOptionsParams): ResolveCountDownDerivedOptions => ({
	format: props.format,
	injClass: props.injClass,
	remain
});

// 输入倒计时展示状态，返回框架无关的文本、时间拆分和 class 派生结果。
// Receive countdown display state and return framework-agnostic text, time parts and class derivations.
export const resolveCountDownDerived = ({
	remain,
	format = 'HH:mm:ss',
	injClass = ''
}: ResolveCountDownDerivedOptions): CountDownDerived => {
	const timeData = parseCountDownTime(remain);
	return {
		displayText: formatCountDownTime(format, timeData),
		rootClass: resolveCountDownRootClass(injClass),
		timeData
	};
};
