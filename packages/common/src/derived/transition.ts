export type TransitionEasingFunction = (progress: number) => number;

export type ResolveTransitionProgressOptions = {
	elapsed: number;
	duration: number;
};

export type ResolveTransitionDurationWithDelayOptions = {
	duration?: number;
	delay?: number;
};

export type ResolveFlyTransitionFrameOptions = {
	baseTransform?: string;
	easing?: TransitionEasingFunction;
	opacity?: number;
	progress: number;
	targetOpacity?: number;
	x?: number;
	y?: number;
};

export type FlyTransitionFrame = {
	easedProgress: number;
	opacity: string;
	transform: string;
};

export type ResolveFlyOutFrameOptions = {
	easing?: TransitionEasingFunction;
	progress: number;
	y?: number;
};

export type FlyOutFrame = {
	easedProgress: number;
	opacity: string;
	transform: string;
};

export type ResolveTransitionTickProgressOptions = {
	mode: 'in' | 'out';
	progress: number;
};

const linearTransitionEasing: TransitionEasingFunction = (progress) => progress;

// 输入组件层计时状态，返回框架无关的动画进度。
// Receive component-layer timing state and return framework-agnostic animation progress.
export const resolveTransitionProgress = ({ elapsed, duration }: ResolveTransitionProgressOptions): number => {
	if (duration <= 0) return 1;
	return Math.min(Math.max(elapsed / duration, 0), 1);
};

// 输入动画时长和延迟配置，返回可交给组件层调度器使用的总时长。
// Receive animation duration and delay config, then return total duration for component schedulers.
export const resolveTransitionDurationWithDelay = ({ duration = 400, delay = 0 }: ResolveTransitionDurationWithDelayOptions = {}): number =>
	duration + delay;

// 输入组件层读取到的 transform，返回可拼接的基础 transform。
// Normalize a component-read transform into a base transform that can be composed.
export const normalizeTransitionBaseTransform = (transform?: string): string => (!transform || transform === 'none' ? '' : transform);

// 输入 fly 动画状态，返回框架无关的 transform 和 opacity 帧。
// Receive fly animation state and return a framework-agnostic transform and opacity frame.
export const resolveFlyTransitionFrame = ({
	baseTransform = '',
	easing = linearTransitionEasing,
	opacity = 0,
	progress,
	targetOpacity = 1,
	x = 0,
	y = 0
}: ResolveFlyTransitionFrameOptions): FlyTransitionFrame => {
	const easedProgress = easing(progress);
	const currentX = x * (1 - easedProgress);
	const currentY = y * (1 - easedProgress);
	const translateTransform = `translate(${currentX}px, ${currentY}px)`;
	const opacityDelta = targetOpacity * (1 - opacity);
	const opacityProgress = 1 - easedProgress;
	return {
		easedProgress,
		opacity: String(targetOpacity - opacityDelta * opacityProgress),
		transform: baseTransform ? `${baseTransform} ${translateTransform}` : translateTransform
	};
};

// 输入退出动画状态，返回框架无关的 transform 和 opacity 帧。
// Receive fly-out animation state and return a framework-agnostic transform and opacity frame.
export const resolveFlyOutFrame = ({ easing = linearTransitionEasing, progress, y = 0 }: ResolveFlyOutFrameOptions): FlyOutFrame => {
	const easedProgress = easing(progress);
	return {
		easedProgress,
		opacity: String(1 - easedProgress),
		transform: `translateY(${y * easedProgress}px)`
	};
};

// 输入动画方向和进度，返回组件层 tick 函数需要消费的进度。
// Receive animation direction and progress, then return progress for the component-layer tick function.
export const resolveTransitionTickProgress = ({ mode, progress }: ResolveTransitionTickProgressOptions): number =>
	mode === 'in' ? progress : 1 - progress;
