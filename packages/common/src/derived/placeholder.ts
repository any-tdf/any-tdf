import { radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const placeholderPyObj = {
	'0': ' py-0',
	'1': ' py-1',
	'2': ' py-2',
	'3': ' py-3',
	'4': ' py-4',
	'8': ' py-8'
} as const;

export const placeholderShadowObj = {
	none: ' shadow-none',
	xs: ' shadow-xs dark:shadow-white/5',
	sm: 'shadow-sm dark:shadow-white/10',
	md: ' shadow-md dark:shadow-white/10',
	lg: ' shadow-lg dark:shadow-white/10',
	xl: ' shadow-xl dark:shadow-white/10',
	'2xl': ' shadow-2xl dark:shadow-white/20'
} as const;

export const placeholderHeightObj = {
	full: ' h-full',
	'1': ' h-1',
	'2': ' h-2',
	'4': ' h-4',
	'8': ' h-8',
	'16': ' h-16',
	'24': ' h-24',
	'32': ' h-32',
	'48': ' h-48',
	'64': ' h-64',
	'96': ' h-96'
} as const;

export type PlaceholderPyKey = keyof typeof placeholderPyObj | string;
export type PlaceholderHeightKey = keyof typeof placeholderHeightObj | string;
export type PlaceholderRadiusKey = keyof typeof radiusObj | string;
export type PlaceholderShadowKey = keyof typeof placeholderShadowObj | string;

export type ResolvePlaceholderClassesOptions = {
	py?: PlaceholderPyKey;
	height?: PlaceholderHeightKey;
	radius?: PlaceholderRadiusKey;
	shadow?: PlaceholderShadowKey;
	injClass?: string;
};
export type PlaceholderStatePropsLike = Partial<ResolvePlaceholderClassesOptions>;
export type ResolvePlaceholderStateOptionsParams = {
	props: PlaceholderStatePropsLike;
};
export type PlaceholderDerived = {
	rootClass: string;
};

// 输入 Placeholder 组件状态，返回框架无关的 class 字符串。
// Convert Placeholder component state into framework-agnostic class strings.
export const resolvePlaceholderPyClass = (py: PlaceholderPyKey = '4') => resolveClassMapValue(placeholderPyObj, py, '4');

export const resolvePlaceholderHeightClass = (height: PlaceholderHeightKey = 'full') =>
	resolveClassMapValue(placeholderHeightObj, height, 'full');

export const resolvePlaceholderRadiusClass = (radius: PlaceholderRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

export const resolvePlaceholderShadowClass = (shadow: PlaceholderShadowKey = 'none') =>
	resolveClassMapValue(placeholderShadowObj, shadow, 'none');

export const resolvePlaceholderRootClass = (options: ResolvePlaceholderClassesOptions = {}) =>
	joinClasses([
		'flex flex-col justify-center bg-black/5 dark:bg-white/5 text-center',
		resolvePlaceholderHeightClass(options.height),
		resolvePlaceholderPyClass(options.py),
		resolvePlaceholderRadiusClass(options.radius),
		resolvePlaceholderShadowClass(options.shadow),
		options.injClass
	]);

// 输入组件 props，返回框架无关的 Placeholder 派生入参。
// Receive component props and return framework-agnostic Placeholder derivation options.
export const resolvePlaceholderStateOptions = ({ props }: ResolvePlaceholderStateOptionsParams): ResolvePlaceholderClassesOptions => ({
	height: props.height,
	injClass: props.injClass,
	py: props.py,
	radius: props.radius,
	shadow: props.shadow
});

// 输入 Placeholder 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Placeholder state and return framework-agnostic derived values ready for component binding.
export const resolvePlaceholderDerived = (options: ResolvePlaceholderClassesOptions = {}): PlaceholderDerived => ({
	rootClass: resolvePlaceholderRootClass(options)
});
