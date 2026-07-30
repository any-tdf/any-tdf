import { transitionDurationObj } from './common.js';
import { resolveRandomBase36Suffix } from './helpers.js';

export const progressLoopDefaultGradientId = 'gradient_ProgressLoop';

export type ProgressLoopDuration = keyof typeof transitionDurationObj | string;
export type ProgressLoopGradient = readonly string[] | null | undefined;
export type ProgressLoopGradientStops = {
	startColor: string;
	endColor: string;
};
export type ProgressLoopGradientStopStyleValue = {
	stopColor: string;
};
export type ProgressLoopGradientStopStyles = {
	startStyle: ProgressLoopGradientStopStyleValue;
	endStyle: ProgressLoopGradientStopStyleValue;
	startStyleString: string;
	endStyleString: string;
};

export type ResolveProgressLoopDerivedOptions = {
	butt?: boolean;
	duration?: ProgressLoopDuration;
	gradient?: ProgressLoopGradient;
	gradientId?: string;
	gradientIdSuffix?: string;
	injClass?: string;
	percent?: number;
	reverse?: boolean;
	strokeWidth?: number;
	trackInjClass?: string;
};

export type ProgressLoopStatePropsLike = Partial<Omit<ResolveProgressLoopDerivedOptions, 'gradientId' | 'gradientIdSuffix'>>;

export type ResolveProgressLoopStateOptionsParams = {
	gradientId?: string;
	gradientIdSuffix?: string;
	props: ProgressLoopStatePropsLike;
};
export type ResolveProgressLoopGradientIdSuffixOptions = {
	random?: number;
};

export type ProgressLoopDerived = {
	barClass: string;
	circleLength: number;
	dashOffset: number;
	durationClass: string;
	gradientId: string;
	gradientStopStyles: ProgressLoopGradientStopStyles | null;
	gradientStops: ProgressLoopGradientStops | null;
	hasGradient: boolean;
	lineCap: 'butt' | 'round';
	percentTextClass: string;
	percentText: string;
	radius: number;
	rootClass: string;
	labelClass: string;
	strokeValue: string | undefined;
	svgClass: string;
	trackClass: string;
};

// 输入 ProgressLoop 组件状态，返回框架无关的 SVG 数学、class 字符串和展示文本。
// Convert ProgressLoop component state into framework-agnostic SVG math, class strings and display text.
export const resolveProgressLoopRadius = (strokeWidth: number) => 12 - strokeWidth / 2;

export const resolveProgressLoopCircleLength = (radius: number) => 2 * Math.PI * radius;

export const resolveProgressLoopDashOffset = ({ percent, circleLength }: { percent: number; circleLength: number }) =>
	circleLength - (percent / 100) * circleLength || 0;

export const resolveProgressLoopHasGradient = (gradient: ProgressLoopGradient) => Array.isArray(gradient) && gradient.length === 2;

export const resolveProgressLoopGradientStops = (gradient: ProgressLoopGradient): ProgressLoopGradientStops | null => {
	if (!resolveProgressLoopHasGradient(gradient) || !gradient) return null;

	return {
		startColor: gradient[1],
		endColor: gradient[0]
	};
};

// 输入 ProgressLoop 渐变颜色，返回组件层可绑定的 SVG stop 样式。
// Resolve ProgressLoop gradient color into SVG stop styles for component binding.
export const resolveProgressLoopGradientStopStyleValue = (color = ''): ProgressLoopGradientStopStyleValue => ({ stopColor: color });

export const resolveProgressLoopGradientStopStyleString = (color = '') => `stop-color: ${color};`;

export const resolveProgressLoopGradientStopStyles = (
	gradientStops: ProgressLoopGradientStops | null
): ProgressLoopGradientStopStyles | null => {
	if (!gradientStops) return null;
	return {
		startStyle: resolveProgressLoopGradientStopStyleValue(gradientStops.startColor),
		endStyle: resolveProgressLoopGradientStopStyleValue(gradientStops.endColor),
		startStyleString: resolveProgressLoopGradientStopStyleString(gradientStops.startColor),
		endStyleString: resolveProgressLoopGradientStopStyleString(gradientStops.endColor)
	};
};

// 输入组件层生成的后缀，返回框架无关的 gradient id。
// Receive a component-provided suffix and return a framework-agnostic gradient id.
export const resolveProgressLoopGradientId = (suffix = '') =>
	suffix ? `${progressLoopDefaultGradientId}_${suffix}` : progressLoopDefaultGradientId;

// 输入组件运行时随机源，返回 ProgressLoop 渐变 ID 后缀。
// Receive the component runtime random source and return the ProgressLoop gradient ID suffix.
export const resolveProgressLoopGradientIdSuffix = ({ random = 0 }: ResolveProgressLoopGradientIdSuffixOptions = {}): string =>
	resolveRandomBase36Suffix({ random });

export const resolveProgressLoopSvgClass = (reverse = false) => ['-rotate-90', reverse ? '-scale-y-100' : ''].filter(Boolean).join(' ');

export const resolveProgressLoopTrackClass = (trackInjClass = '') =>
	['stroke-black/5 dark:stroke-white/5', trackInjClass].filter(Boolean).join(' ');

export const resolveProgressLoopDurationClass = (duration: ProgressLoopDuration = '300') =>
	(transitionDurationObj[duration as keyof typeof transitionDurationObj] || transitionDurationObj['300']).trim();

export const resolveProgressLoopRootClass = () => 'relative';

export const resolveProgressLoopLabelClass = () => 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

export const resolveProgressLoopPercentTextClass = () => 'text-xs';

export const resolveProgressLoopBarClass = ({
	hasGradient,
	durationClass,
	injClass = ''
}: {
	hasGradient: boolean;
	durationClass: string;
	injClass?: string;
}) => [hasGradient ? '' : 'stroke-primary dark:stroke-dark', 'transition-all', durationClass, injClass].filter(Boolean).join(' ');

export const resolveProgressLoopLineCap = (butt = false) => (butt ? 'butt' : 'round');

// 动态 stroke 只返回 SVG 属性值，具体属性绑定留在组件内。
// Dynamic stroke helpers return SVG attribute values only; concrete attribute binding stays in the component.
export const resolveProgressLoopStrokeValue = ({ hasGradient, gradientId }: { hasGradient: boolean; gradientId: string }) =>
	hasGradient ? `url(#${gradientId})` : undefined;

export const formatProgressLoopPercentText = (percent: number) => `${percent}%`;

// 输入组件 props 和 SVG id 状态，返回框架无关的 ProgressLoop 派生入参。
// Receive component props and SVG id state, then return framework-agnostic ProgressLoop derivation options.
export const resolveProgressLoopStateOptions = ({
	gradientId,
	gradientIdSuffix,
	props
}: ResolveProgressLoopStateOptionsParams): ResolveProgressLoopDerivedOptions => ({
	butt: props.butt,
	duration: props.duration,
	gradient: props.gradient,
	gradientId,
	gradientIdSuffix,
	injClass: props.injClass,
	percent: props.percent,
	reverse: props.reverse,
	strokeWidth: props.strokeWidth,
	trackInjClass: props.trackInjClass
});

// 输入 ProgressLoop props 和组件层生成的 SVG id，返回框架无关的渲染派生结果。
// Receive ProgressLoop props and a component-provided SVG id, then return framework-agnostic render derivations.
export const resolveProgressLoopDerived = ({
	butt = false,
	duration = '300',
	gradient = null,
	gradientId,
	gradientIdSuffix = '',
	injClass = '',
	percent = 66,
	reverse = false,
	strokeWidth = 2,
	trackInjClass = ''
}: ResolveProgressLoopDerivedOptions = {}): ProgressLoopDerived => {
	const radius = resolveProgressLoopRadius(strokeWidth);
	const circleLength = resolveProgressLoopCircleLength(radius);
	const hasGradient = resolveProgressLoopHasGradient(gradient);
	const resolvedGradientId = gradientId || resolveProgressLoopGradientId(gradientIdSuffix);
	const durationClass = resolveProgressLoopDurationClass(duration);
	const gradientStops = resolveProgressLoopGradientStops(gradient);
	return {
		barClass: resolveProgressLoopBarClass({ hasGradient, durationClass, injClass }),
		circleLength,
		dashOffset: resolveProgressLoopDashOffset({ percent, circleLength }),
		durationClass,
		gradientId: resolvedGradientId,
		gradientStopStyles: resolveProgressLoopGradientStopStyles(gradientStops),
		gradientStops,
		hasGradient,
		lineCap: resolveProgressLoopLineCap(butt),
		labelClass: resolveProgressLoopLabelClass(),
		percentTextClass: resolveProgressLoopPercentTextClass(),
		percentText: formatProgressLoopPercentText(percent),
		radius,
		rootClass: resolveProgressLoopRootClass(),
		strokeValue: resolveProgressLoopStrokeValue({ hasGradient, gradientId: resolvedGradientId }),
		svgClass: resolveProgressLoopSvgClass(reverse),
		trackClass: resolveProgressLoopTrackClass(trackInjClass)
	};
};
