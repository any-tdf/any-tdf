import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export const badgeLeafRadiusObj = {
	leftLeaf: ' rounded-full rounded-br-none',
	rightLeaf: ' rounded-full rounded-bl-none'
} as const;

export type BadgeRadiusClassKey = keyof typeof radiusObj | 'leaf' | '';

export type ResolveBadgeClassesOptions = {
	text?: string;
	radius?: BadgeRadiusClassKey;
	isLeft?: boolean;
	injClass?: string;
};

export type ResolveBadgeStylesOptions = {
	isShow?: boolean;
	isLeft?: boolean;
	offsetY?: number;
	offsetX?: number;
};

export type BadgeTransformStyleValue = {
	transform: string;
};

export type ResolveBadgeDerivedOptions = ResolveBadgeClassesOptions &
	ResolveBadgeStylesOptions & {
		isInner?: boolean;
	};

export type BadgeStatePropsLike = Partial<ResolveBadgeDerivedOptions>;

export type ResolveBadgeStateOptionsParams = {
	props: BadgeStatePropsLike;
};

export type BadgeDerived = {
	classes: ReturnType<typeof resolveBadgeClasses>;
	styles: ReturnType<typeof resolveBadgeStyles>;
	innerStyleValue: BadgeTransformStyleValue;
	innerStyleString: string;
	outerStyleValue: BadgeTransformStyleValue;
	outerStyleString: string;
	isInner: boolean;
};

// 输入 Badge 的 props 状态，返回框架无关的 class 组合。
// Resolve Badge props state into framework-agnostic class combinations.
export const resolveBadgeClasses = (options: ResolveBadgeClassesOptions = {}) => {
	const { text = '', radius = '', isLeft = false, injClass = '' } = options;
	const radiusClass =
		radius === 'leaf'
			? (isLeft ? badgeLeafRadiusObj.leftLeaf : badgeLeafRadiusObj.rightLeaf).trim()
			: radius
				? radiusObj[radius]
				: 'rounded-(--radius-small)';
	const sizeClass = text === '' ? 'h-3 w-3' : '';
	const topClass = text === '' ? '-top-1.5' : '-top-2';
	const sideClass = isLeft ? 'left-0' : 'right-0';
	const baseClass = joinClasses([
		'whitespace-nowrap px-1 text-xs text-white',
		radiusClass,
		sizeClass,
		'bg-error text-center leading-4 transition-all',
		injClass
	]);

	return {
		radiusClass,
		sizeClass,
		topClass,
		sideClass,
		wrapperClass: 'relative',
		innerClass: baseClass,
		outerClass: ['absolute', topClass, sideClass, baseClass].join(' ')
	};
};

// 只拼接 transform 字符串，不读取 DOM 或框架状态。
// Only build transform strings without reading DOM or framework state.
export const resolveBadgeStyles = (options: ResolveBadgeStylesOptions = {}) => {
	const { isShow = true, isLeft = false, offsetY = 0, offsetX = 0 } = options;
	const scaleStyle = isShow ? 'scale(1)' : 'scale(0)';
	const transformStyle = `translateX(calc(${isLeft ? '-' : ''}50% ${isLeft ? '+' : '-'} ${offsetX}px)) translateY(${offsetY}px) ${scaleStyle}`;

	return {
		scaleStyle,
		transformStyle
	};
};

// 输入 Badge 状态，返回组件层可直接绑定的 transform 样式。
// Convert Badge state into bind-ready transform styles for the component layer.
export const resolveBadgeInnerStyleValue = (options: ResolveBadgeStylesOptions = {}): BadgeTransformStyleValue => ({
	transform: resolveBadgeStyles(options).scaleStyle
});

export const resolveBadgeInnerStyleString = (options: ResolveBadgeStylesOptions = {}) =>
	`transform: ${resolveBadgeStyles(options).scaleStyle}`;

export const resolveBadgeOuterStyleValue = (options: ResolveBadgeStylesOptions = {}): BadgeTransformStyleValue => ({
	transform: resolveBadgeStyles(options).transformStyle
});

export const resolveBadgeOuterStyleString = (options: ResolveBadgeStylesOptions = {}) =>
	`transform: ${resolveBadgeStyles(options).transformStyle}`;

// 输入组件 props，返回框架无关的 Badge 派生入参。
// Receive component props and return framework-agnostic Badge derivation options.
export const resolveBadgeStateOptions = ({ props }: ResolveBadgeStateOptionsParams): ResolveBadgeDerivedOptions => ({
	injClass: props.injClass,
	isInner: props.isInner,
	isLeft: props.isLeft,
	isShow: props.isShow,
	offsetX: props.offsetX,
	offsetY: props.offsetY,
	radius: props.radius,
	text: props.text
});

// 输入 Badge 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Badge state and return framework-agnostic derived values ready for component binding.
export const resolveBadgeDerived = (options: ResolveBadgeDerivedOptions = {}): BadgeDerived => {
	const classes = resolveBadgeClasses(options);
	const styles = resolveBadgeStyles(options);
	const innerStyleValue = { transform: styles.scaleStyle };
	const outerStyleValue = { transform: styles.transformStyle };

	return {
		classes,
		styles,
		innerStyleValue,
		innerStyleString: `transform: ${styles.scaleStyle}`,
		outerStyleValue,
		outerStyleString: `transform: ${styles.transformStyle}`,
		isInner: Boolean(options.isInner)
	};
};
