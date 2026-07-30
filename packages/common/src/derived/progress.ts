import { radiusObj, transitionDurationObj } from './common.js';

export const progressHeightClass = {
	'1': ' h-1',
	'2': ' h-2',
	'3': ' h-3',
	'4': ' h-4'
} as const;

export type ProgressHeight = keyof typeof progressHeightClass | string;
export type ProgressRadius = keyof typeof radiusObj | string;
export type ProgressDuration = keyof typeof transitionDurationObj | string;
export type ProgressPercentPosition = 'inner' | 'right' | 'block' | null | string;
export type ProgressLabelPlacement = 'inner' | 'right' | 'block' | 'none';
export type ProgressWidthStyleValue = {
	width: string;
};
export type ProgressLeftStyleValue = {
	left: string;
};
export type ResolveProgressLabelStateOptions = {
	percent?: number;
	percentPosition?: ProgressPercentPosition;
	hasCustomContent?: boolean;
};
export type ProgressLabelState = {
	placement: ProgressLabelPlacement;
	shouldRender: boolean;
	showInner: boolean;
	showBlock: boolean;
	showRight: boolean;
	showCustomContent: boolean;
	showFallbackText: boolean;
	text: string;
};
export type ResolveProgressDerivedOptions = ResolveProgressLabelStateOptions & {
	duration?: ProgressDuration;
	height?: ProgressHeight;
	inactive?: boolean;
	injClass?: string;
	overflowPercent?: number;
	radius?: ProgressRadius;
	trackInjClass?: string;
};
export type ProgressStatePropsLike = Partial<Omit<ResolveProgressDerivedOptions, 'hasCustomContent'>>;
export type ResolveProgressStateOptionsParams = {
	hasCustomContent?: boolean;
	props: ProgressStatePropsLike;
};
export type ProgressDerived = {
	barClass: string;
	barStyleString: string;
	barStyleValue: ProgressWidthStyleValue;
	blockLabelClass: string;
	blockLabelStyleString: string;
	blockLabelStyleValue: ProgressLeftStyleValue;
	durationClass: string;
	fillClass: string;
	heightClass: string;
	innerTextClass: string;
	labelState: ProgressLabelState;
	radiusClass: string;
	rightLabelClass: string;
	rootClass: string;
	trackClass: string;
};

// 输入 Progress 组件状态，返回框架无关的 class 字符串、样式值和展示文本。
// Convert Progress component state into framework-agnostic classes, style values and display text.
export const resolveProgressHeightClass = ({
	percentPosition = 'right',
	height = '2'
}: {
	percentPosition?: ProgressPercentPosition;
	height?: ProgressHeight;
} = {}) =>
	(percentPosition === 'inner' ? '' : progressHeightClass[height as keyof typeof progressHeightClass] || progressHeightClass['2']).trim();

export const resolveProgressRadiusClass = (radius: ProgressRadius = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

export const resolveProgressDurationClass = (duration: ProgressDuration = '300') =>
	(transitionDurationObj[duration as keyof typeof transitionDurationObj] || transitionDurationObj['300']).trim();

export const resolveProgressFillClass = (inactive = false) => (inactive ? 'bg-primary-300 dark:bg-dark-800' : 'bg-primary dark:bg-dark');

export const resolveProgressRootClass = () => 'flex items-center justify-between space-x-2';

export const resolveProgressRightLabelClass = () => 'text-xs';

export const resolveProgressTrackClass = ({
	heightClass,
	radiusClass,
	trackInjClass = ''
}: {
	heightClass: string;
	radiusClass: string;
	trackInjClass?: string;
}) => ['relative w-full bg-black/10 dark:bg-white/20', heightClass, radiusClass, trackInjClass].filter(Boolean).join(' ');

export const resolveProgressBarClass = ({
	fillClass,
	durationClass,
	heightClass,
	radiusClass,
	injClass = ''
}: {
	fillClass: string;
	durationClass: string;
	heightClass: string;
	radiusClass: string;
	injClass?: string;
}) => [fillClass, 'transition-all', durationClass, heightClass, radiusClass, injClass].filter(Boolean).join(' ');

export const resolveProgressInnerTextClass = ({ percent, overflowPercent = 10 }: { percent: number; overflowPercent?: number }) =>
	[
		'px-1 py-0.5 text-right text-xs whitespace-nowrap',
		percent < overflowPercent ? 'translate-x-full text-text-primary dark:text-text-dark' : 'text-text-on-primary dark:text-text-on-dark'
	]
		.filter(Boolean)
		.join(' ');

export const resolveProgressBlockLabelClass = ({
	fillClass,
	radiusClass,
	injClass = ''
}: {
	fillClass: string;
	radiusClass: string;
	injClass?: string;
}) =>
	[
		'absolute top-1/2',
		fillClass,
		'px-1 py-0.5 text-xs text-text-on-primary transition-all dark:text-text-on-dark duration-300',
		radiusClass,
		'-translate-y-1/2 -translate-x-1/2',
		injClass
	]
		.filter(Boolean)
		.join(' ');

// 动态百分比只返回样式值，具体 style 绑定留在组件内。
// Dynamic percent helpers return style values only; concrete style binding stays in the component.
export const resolveProgressPercentStyleValue = (percent: number) => `${percent}%`;

// 输入 Progress 百分比，返回组件层可直接绑定的宽度和位置样式。
// Convert Progress percent into bind-ready width and position styles for the component layer.
export const resolveProgressBarStyleValue = (percent: number): ProgressWidthStyleValue => ({
	width: resolveProgressPercentStyleValue(percent)
});

export const resolveProgressBarStyleString = (percent: number) => `width:${resolveProgressPercentStyleValue(percent)};`;

export const resolveProgressBlockLabelStyleValue = (percent: number): ProgressLeftStyleValue => ({
	left: resolveProgressPercentStyleValue(percent)
});

export const resolveProgressBlockLabelStyleString = (percent: number) => `left:${resolveProgressPercentStyleValue(percent)};`;

export const formatProgressPercentText = (percent: number) => `${percent}%`;

export const resolveProgressLabelPlacement = (percentPosition: ProgressPercentPosition = 'right'): ProgressLabelPlacement => {
	if (percentPosition === 'inner' || percentPosition === 'block' || percentPosition === 'right') return percentPosition;
	return 'none';
};

// 输入 Progress 标签状态，返回框架无关的展示分支。
// Resolve Progress label state into framework-agnostic display branches.
export const resolveProgressLabelState = ({
	percent = 66,
	percentPosition = 'right',
	hasCustomContent = false
}: ResolveProgressLabelStateOptions = {}): ProgressLabelState => {
	const placement = resolveProgressLabelPlacement(percentPosition);
	const shouldRender = placement !== 'none';

	return {
		placement,
		shouldRender,
		showInner: placement === 'inner',
		showBlock: placement === 'block',
		showRight: placement === 'right',
		showCustomContent: shouldRender && hasCustomContent,
		showFallbackText: shouldRender && !hasCustomContent,
		text: formatProgressPercentText(percent)
	};
};

// 输入组件 props 和内容插槽状态，返回框架无关的 Progress 派生入参。
// Receive component props and content slot state, then return framework-agnostic Progress derivation options.
export const resolveProgressStateOptions = ({
	hasCustomContent,
	props
}: ResolveProgressStateOptionsParams): ResolveProgressDerivedOptions => ({
	duration: props.duration,
	hasCustomContent,
	height: props.height,
	inactive: props.inactive,
	injClass: props.injClass,
	overflowPercent: props.overflowPercent,
	percent: props.percent,
	percentPosition: props.percentPosition,
	radius: props.radius,
	trackInjClass: props.trackInjClass
});

// 输入 Progress 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Progress state and return framework-agnostic derived values ready for component binding.
export const resolveProgressDerived = ({
	percent = 66,
	percentPosition = 'right',
	height = '2',
	radius = '',
	inactive = false,
	overflowPercent = 10,
	duration = '300',
	injClass = '',
	trackInjClass = '',
	hasCustomContent = false
}: ResolveProgressDerivedOptions = {}): ProgressDerived => {
	const heightClass = resolveProgressHeightClass({ percentPosition, height });
	const radiusClass = resolveProgressRadiusClass(radius);
	const durationClass = resolveProgressDurationClass(duration);
	const fillClass = resolveProgressFillClass(inactive);

	return {
		heightClass,
		radiusClass,
		durationClass,
		fillClass,
		trackClass: resolveProgressTrackClass({ heightClass, radiusClass, trackInjClass }),
		barClass: resolveProgressBarClass({ fillClass, durationClass, heightClass, radiusClass, injClass }),
		innerTextClass: resolveProgressInnerTextClass({ percent, overflowPercent }),
		blockLabelClass: resolveProgressBlockLabelClass({ fillClass, radiusClass, injClass }),
		barStyleValue: resolveProgressBarStyleValue(percent),
		barStyleString: resolveProgressBarStyleString(percent),
		blockLabelStyleValue: resolveProgressBlockLabelStyleValue(percent),
		blockLabelStyleString: resolveProgressBlockLabelStyleString(percent),
		rightLabelClass: resolveProgressRightLabelClass(),
		rootClass: resolveProgressRootClass(),
		labelState: resolveProgressLabelState({ percent, percentPosition, hasCustomContent })
	};
};
