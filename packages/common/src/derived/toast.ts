import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';
import { resolveToastSvgByType, toastSvgByType, type BuiltInIconLibrary } from '../svg/common.js';
import type { SvgData } from '../svg/types.js';

export const toastPositionClass = {
	center: ' justify-center',
	top: ' justify-start',
	bottom: ' justify-end'
} as const;

export const toastPyClass = {
	'0': ' py-0',
	'10': ' py-10',
	'20': ' py-20',
	'40': ' py-40',
	'60': ' py-60',
	'80': ' py-80'
} as const;

export type ToastRadiusKey = keyof typeof radiusObj | string;
export type ToastPositionKey = keyof typeof toastPositionClass | string;
export type ToastPyKey = keyof typeof toastPyClass | string;
export type ToastSvgType = keyof typeof toastSvgByType;
export type ToastIconClassMap = Partial<Record<ToastSvgType, string>>;
export type ToastTypeIconDerived = {
	className: string;
	svg: SvgData;
	type: ToastSvgType;
};
export type ToastIconState = (ToastTypeIconDerived & { kind: 'svg' }) | { kind: 'loading' } | { kind: 'icon' } | { kind: 'none' };
export type ToastIconFrameState = {
	icon: ToastIconState;
	shouldRender: boolean;
};
export type ResolveToastTransitionParamsOptions = {
	transitionType?: string | null;
	transitionParams?: Record<string, unknown>;
	duration?: number;
	easing?: unknown;
};
export type ResolveToastContainerStyleOptions = {
	zIndex?: number;
	dynamicFixed?: boolean;
	innerHeight?: number;
	staticHeight?: string;
};

export type ResolveToastRenderedStateOptions = {
	visible?: boolean;
	currentRendered?: boolean;
	transitionType?: string | null;
	outDuration?: number;
};
export type ResolveToastAutoCloseActionOptions = {
	visible?: boolean;
	duration?: number;
};
export type ToastAutoCloseAction = {
	delayMs: number;
	nextVisible: boolean;
	shouldEmitClose: boolean;
	shouldScheduleClose: boolean;
};
export type ToastRenderAction = {
	nextRendered: boolean;
	shouldUpdateRendered: boolean;
};
export type ResolveToastVisibilityFlowOptions = ResolveToastRenderedStateOptions & ResolveToastAutoCloseActionOptions;
export type ToastVisibilityFlow = ToastRenderAction & ToastAutoCloseAction;
export type ResolveToastDerivedOptions = ResolveToastContainerStyleOptions &
	Omit<ResolveToastTransitionParamsOptions, 'duration' | 'easing'> & {
		clickable?: boolean;
		easeIn?: unknown;
		easeOut?: unknown;
		builtInIconLibrary?: BuiltInIconLibrary;
		iconClassMap?: ToastIconClassMap;
		inDuration?: number;
		outDuration?: number;
		position?: ToastPositionKey;
		py?: ToastPyKey;
		radius?: ToastRadiusKey;
		type?: unknown;
	};
export type ToastStatePropsLike = Partial<Omit<ResolveToastDerivedOptions, 'easeIn' | 'easeOut' | 'innerHeight'>>;
export type ResolveToastStateOptionsParams = {
	easeIn?: unknown;
	easeOut?: unknown;
	innerHeight?: number;
	props: ToastStatePropsLike;
};
export type ToastDerived = {
	containerClass: string;
	containerStyleString: string;
	containerStyleValue: ReturnType<typeof resolveToastContainerStyleValue>;
	contentClass: string;
	iconFrameState: ToastIconFrameState;
	inParams: Record<string, unknown>;
	outParams: Record<string, unknown>;
	transitionClass: string;
};

export const toastIconClassByType = {
	success: 'text-success mx-auto block',
	error: 'text-error mx-auto block',
	warning: 'text-warning mx-auto block',
	info: 'text-info mx-auto block'
} as const;

// 输入 Toast 组件状态，返回框架无关的 class 字符串。
// Convert Toast component state into framework-agnostic class strings.
export const resolveToastRadiusClass = (radius: ToastRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

// 输入外部可见值，返回组件内部初始渲染状态。
// Normalize an external visible value into the component's initial rendered state.
export const resolveToastInitialRendered = (visible?: boolean): boolean => Boolean(visible);

export const resolveToastContentClass = ({ radius = '', injClass = '' }: { radius?: ToastRadiusKey; injClass?: string } = {}) =>
	joinClasses([
		'inline-block bg-text-primary/90 text-center dark:bg-text-dark/90 p-4',
		resolveToastRadiusClass(radius),
		'text-text-dark dark:text-text-primary',
		injClass
	]);

export const resolveToastContainerClass = ({
	position = 'center',
	py = '0',
	clickable = false
}: { position?: ToastPositionKey; py?: ToastPyKey; clickable?: boolean } = {}) =>
	joinClasses([
		'fixed inset-0 flex h-screen w-screen flex-col',
		toastPositionClass[position as keyof typeof toastPositionClass] || toastPositionClass.center,
		position === 'center' ? '' : toastPyClass[py as keyof typeof toastPyClass] || toastPyClass['20'],
		clickable ? '' : 'pointer-events-none'
	]);

export const resolveToastTransitionClass = (): string => 'flex justify-center px-10';

// 输入 Toast 组件状态，返回框架无关的容器 style。
// Convert Toast component state into framework-agnostic container style.
export const resolveToastContainerStyleValue = ({
	zIndex = 1000,
	dynamicFixed = true,
	innerHeight = 0,
	staticHeight = '100vh'
}: ResolveToastContainerStyleOptions = {}) => ({
	zIndex,
	height: dynamicFixed ? `${innerHeight}px` : staticHeight
});

export const resolveToastContainerStyleString = (options: ResolveToastContainerStyleOptions = {}) => {
	const style = resolveToastContainerStyleValue(options);
	return `z-index:${style.zIndex};height:${style.height};`;
};

// 输入 Toast 运行状态，返回组件层是否需要启动自动关闭计时器。
// Receive Toast runtime state and tell the component layer whether to start the auto-close timer.
export const resolveToastShouldAutoClose = ({ visible = false, duration = 2000 }: { visible?: boolean; duration?: number } = {}) =>
	visible && duration !== 0;

// 输入 Toast 可见状态和持续时间，返回组件层可执行的自动关闭动作。
// Receive Toast visibility and duration, then return an auto-close action for the component layer.
export const resolveToastAutoCloseAction = ({
	visible = false,
	duration = 2000
}: ResolveToastAutoCloseActionOptions = {}): ToastAutoCloseAction => {
	const shouldScheduleClose = resolveToastShouldAutoClose({ visible, duration });
	return {
		delayMs: duration,
		nextVisible: shouldScheduleClose ? false : visible,
		shouldEmitClose: shouldScheduleClose,
		shouldScheduleClose
	};
};

export const resolveToastShouldUnmountImmediately = ({
	transitionType = 'scale',
	outDuration = 0
}: { transitionType?: string | null; outDuration?: number } = {}) => !transitionType || outDuration <= 0;

// 输入可见状态和过渡配置，返回组件层是否保留渲染节点。
// Resolve visibility and transition config into whether the component layer should keep the node rendered.
export const resolveToastRenderedState = ({
	visible = false,
	currentRendered = false,
	transitionType = 'scale',
	outDuration = 0
}: ResolveToastRenderedStateOptions = {}): boolean => {
	if (visible) return true;
	if (currentRendered && resolveToastShouldUnmountImmediately({ transitionType, outDuration })) return false;
	return currentRendered;
};

// 输入 Toast 可见状态和过渡配置，返回组件层可写入的渲染同步动作。
// Receive Toast visibility and transition config, then return a render-sync action for the component layer.
export const resolveToastRenderAction = (options: ResolveToastRenderedStateOptions = {}): ToastRenderAction => {
	const { currentRendered = false } = options;
	const nextRendered = resolveToastRenderedState(options);
	return {
		nextRendered,
		shouldUpdateRendered: nextRendered !== currentRendered
	};
};

// 输入 Toast 可见状态，返回组件层可同步的渲染保留和自动关闭计划。
// Receive Toast visibility state and return render retention plus auto-close planning for component layers.
export const resolveToastVisibilityFlow = (options: ResolveToastVisibilityFlowOptions = {}): ToastVisibilityFlow => ({
	...resolveToastRenderAction(options),
	...resolveToastAutoCloseAction(options)
});

// 输入 Toast 出场完成状态，返回组件层可写入的渲染结束动作。
// Receive Toast outro-complete state and return a render-end action for the component layer.
export const resolveToastOutroEndAction = ({ currentRendered = false }: { currentRendered?: boolean } = {}): ToastRenderAction => ({
	nextRendered: false,
	shouldUpdateRendered: currentRendered
});

export const isToastSvgType = (type: unknown): type is ToastSvgType => typeof type === 'string' && type in toastSvgByType;

// 输入 Toast 类型，返回框架无关的 SVG 数据和 class。
// Resolve a Toast type into framework-agnostic SVG data and class.
export const resolveToastTypeIcon = (
	type: unknown,
	classMap: ToastIconClassMap = toastIconClassByType,
	builtInIconLibrary?: BuiltInIconLibrary
): ToastTypeIconDerived | null => {
	if (!isToastSvgType(type)) return null;
	return {
		type,
		svg: resolveToastSvgByType(builtInIconLibrary)[type],
		className: classMap[type] || toastIconClassByType[type]
	};
};

// 输入 Toast 类型，返回组件层渲染图标所需的框架无关状态。
// Resolve a Toast type into framework-agnostic icon state for component rendering.
export const resolveToastIconState = (
	type: unknown,
	classMap: ToastIconClassMap = toastIconClassByType,
	builtInIconLibrary?: BuiltInIconLibrary
): ToastIconState => {
	const svgIcon = resolveToastTypeIcon(type, classMap, builtInIconLibrary);
	if (svgIcon) return { ...svgIcon, kind: 'svg' };
	if (type === 'loading') return { kind: 'loading' };
	if (type === 'icon') return { kind: 'icon' };
	return { kind: 'none' };
};

// 输入 Toast 类型，返回图标外框是否展示和框架无关图标状态。
// Resolve Toast type into icon-frame visibility and framework-agnostic icon state.
export const resolveToastIconFrameState = (
	type: unknown,
	classMap: ToastIconClassMap = toastIconClassByType,
	builtInIconLibrary?: BuiltInIconLibrary
): ToastIconFrameState => ({
	icon: resolveToastIconState(type, classMap, builtInIconLibrary),
	shouldRender: type !== null
});

// 输入 Toast 过渡配置，返回框架无关的过渡参数对象。
// Consume Toast transition config and return framework-agnostic transition params.
export const resolveToastTransitionParams = ({
	transitionType = 'scale',
	transitionParams = {},
	duration = 300,
	easing
}: ResolveToastTransitionParamsOptions = {}) => {
	const params: Record<string, unknown> = { duration, easing, ...transitionParams };
	if (transitionType === 'fly' && params.y === undefined && params.x === undefined) {
		params.y = -100;
	}
	return params;
};

// 输入组件 props、视口高度和缓动函数，返回框架无关的 Toast 派生入参。
// Receive component props, viewport height and easing functions, then return framework-agnostic Toast derivation options.
export const resolveToastStateOptions = ({
	easeIn,
	easeOut,
	innerHeight,
	props
}: ResolveToastStateOptionsParams): ResolveToastDerivedOptions => ({
	builtInIconLibrary: props.builtInIconLibrary,
	clickable: props.clickable,
	dynamicFixed: props.dynamicFixed,
	easeIn,
	easeOut,
	iconClassMap: props.iconClassMap,
	inDuration: props.inDuration,
	innerHeight,
	outDuration: props.outDuration,
	position: props.position,
	py: props.py,
	radius: props.radius,
	staticHeight: props.staticHeight,
	transitionParams: props.transitionParams,
	transitionType: props.transitionType,
	type: props.type,
	zIndex: props.zIndex
});

// 输入 Toast 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Toast state and return framework-agnostic derived values ready for component binding.
export const resolveToastDerived = ({
	builtInIconLibrary,
	clickable = false,
	dynamicFixed = true,
	easeIn,
	easeOut,
	iconClassMap,
	inDuration = 300,
	innerHeight = 0,
	outDuration = 0,
	position = 'center',
	py = '0',
	radius = '',
	staticHeight = '100vh',
	transitionParams = {},
	transitionType = 'scale',
	type = null,
	zIndex = 1000
}: ResolveToastDerivedOptions = {}): ToastDerived => ({
	containerClass: resolveToastContainerClass({ position, py, clickable }),
	containerStyleValue: resolveToastContainerStyleValue({ zIndex, dynamicFixed, innerHeight, staticHeight }),
	containerStyleString: resolveToastContainerStyleString({ zIndex, dynamicFixed, innerHeight, staticHeight }),
	contentClass: resolveToastContentClass({ radius }),
	iconFrameState: resolveToastIconFrameState(type, iconClassMap, builtInIconLibrary),
	inParams: resolveToastTransitionParams({ transitionType, transitionParams, duration: inDuration, easing: easeIn }),
	outParams: resolveToastTransitionParams({ transitionType, transitionParams, duration: outDuration, easing: easeOut }),
	transitionClass: resolveToastTransitionClass()
});
