import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';
import { resolveStatusSvgByType, statusSvgByType, type BuiltInIconLibrary } from '../svg/common.js';
import type { SvgData } from '../svg/types.js';

export const alertPositionClass = {
	top: 'top-0 left-0 right-0',
	bottom: 'bottom-0 left-0 right-0'
} as const;

export const alertPyClass = {
	'0': 'py-0',
	'10': 'py-10',
	'20': 'py-5',
	'40': 'py-10',
	'60': 'py-15',
	'80': 'py-20'
} as const;

export const alertTypeIconClass = {
	success: 'text-success',
	error: 'text-error',
	warning: 'text-warning',
	info: 'text-info'
} as const;

export type AlertRadiusKey = keyof typeof radiusObj | string;
export type AlertPositionKey = keyof typeof alertPositionClass | string;
export type AlertPyKey = keyof typeof alertPyClass | string;
export type AlertSvgType = keyof typeof statusSvgByType;
export type AlertTypeIconDerived = {
	className: string;
	wrapperClass: string;
	svg: SvgData;
	type: AlertSvgType;
};
export type ResolveAlertTransitionParamsOptions = {
	transitionType?: string | null;
	transitionParams?: Record<string, unknown>;
	duration?: number;
	easing?: unknown;
	position?: AlertPositionKey;
};
export type ResolveAlertIconVisibleOptions = {
	builtInIconLibrary?: BuiltInIconLibrary;
	showIcon?: boolean;
	type?: string | null;
	icon?: unknown;
};

export type ResolveAlertContentStateOptions = ResolveAlertIconVisibleOptions & {
	closable?: boolean;
	hasCustomContent?: boolean;
	message?: unknown;
	title?: unknown;
};

export type AlertContentState = {
	showClose: boolean;
	showCustomContent: boolean;
	showCustomIcon: boolean;
	showMessage: boolean;
	showTitle: boolean;
	showTypeIcon: boolean;
	typeIcon: AlertTypeIconDerived | null;
};

export type ResolveAlertRenderedStateOptions = {
	visible?: boolean;
	currentRendered?: boolean;
	transitionType?: string | null;
	outDuration?: number;
};

export type ResolveAlertCloseActionOptions = ResolveAlertRenderedStateOptions & {
	closingBySelf?: boolean;
};

export type ResolveAlertAutoCloseOptions = {
	visible?: boolean;
	duration?: number;
};

export type ResolveAlertOutroEndActionOptions = {
	emitClose?: boolean;
	visible?: boolean;
};

export type AlertContainerStyleValue = {
	zIndex: string | number;
};
export type ResolveAlertDerivedOptions = Omit<ResolveAlertTransitionParamsOptions, 'duration' | 'easing'> &
	ResolveAlertIconVisibleOptions & {
		cardRadius?: AlertRadiusKey;
		clickable?: boolean;
		closable?: boolean;
		easeIn?: unknown;
		easeOut?: unknown;
		hasCustomContent?: boolean;
		inDuration?: number;
		injClass?: string;
		inverse?: boolean;
		message?: unknown;
		outDuration?: number;
		py?: AlertPyKey;
		title?: string;
		zIndex?: string | number;
	};
export type AlertStatePropsLike = Partial<Omit<ResolveAlertDerivedOptions, 'easeIn' | 'easeOut' | 'hasCustomContent'>>;
export type ResolveAlertStateOptionsParams = {
	easeIn?: unknown;
	easeOut?: unknown;
	hasCustomContent?: boolean;
	props: AlertStatePropsLike;
};
export type AlertDerived = {
	bodyClass: string;
	cardBg: 'none' | 'surface';
	closeButtonClass: string;
	containerClass: string;
	containerStyleString: string;
	containerStyleValue: AlertContainerStyleValue;
	contentClass: string;
	contentState: AlertContentState;
	customIconClass: string;
	inParams: Record<string, unknown>;
	messageClass: string;
	outParams: Record<string, unknown>;
	radiusClass: string;
	textContentClass: string;
	titleClass: string;
};

export type AlertCloseAction = {
	nextClosingBySelf: boolean;
	nextRendered: boolean;
	nextVisible: boolean;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type AlertCloseFlow = AlertCloseAction & {
	shouldCompleteImmediately: boolean;
};

export type AlertOutroEndAction = {
	nextClosingBySelf: false;
	nextRendered: false;
	shouldComplete: boolean;
	shouldEmitClose: boolean;
};

// 输入 Alert 组件状态，返回框架无关的 class 字符串。
// Convert Alert component state into framework-agnostic class strings.
export const resolveAlertRadiusClass = (radius: AlertRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveAlertInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入外部可见值，返回组件内部初始渲染状态。
// Normalize an external visible value into the component's initial rendered state.
export const resolveAlertInitialRendered = (visible?: boolean): boolean => Boolean(visible);

// 输入 Alert 内部生命周期请求，返回组件层可写入的初始关闭标记。
// Receive an Alert lifecycle request and return the initial close marker for the component layer.
export const resolveAlertInitialClosingBySelf = (): boolean => false;

export const resolveAlertShouldUnmountImmediately = ({
	transitionType = 'fly',
	outDuration = 300
}: { transitionType?: string | null; outDuration?: number } = {}): boolean => !transitionType || outDuration <= 0;

// 输入可见状态和过渡配置，返回组件层是否保留渲染节点。
// Resolve visibility and transition config into whether the component layer should keep the node rendered.
export const resolveAlertRenderedState = ({
	visible = false,
	currentRendered = false,
	transitionType = 'fly',
	outDuration = 300
}: ResolveAlertRenderedStateOptions = {}): boolean => {
	if (visible) return true;
	if (currentRendered && resolveAlertShouldUnmountImmediately({ transitionType, outDuration })) return false;
	return currentRendered;
};

// 输入 Alert 关闭前状态，返回组件层可写入的关闭动作。
// Receive Alert pre-close state and return a close action that the component layer can write.
export const resolveAlertCloseAction = ({
	visible = false,
	closingBySelf = false,
	currentRendered = true,
	transitionType = 'fly',
	outDuration = 300
}: ResolveAlertCloseActionOptions = {}): AlertCloseAction => {
	const shouldClose = Boolean(visible && !closingBySelf);
	const nextVisible = shouldClose ? false : visible;
	const nextClosingBySelf = shouldClose ? true : closingBySelf;
	const nextRendered = shouldClose
		? resolveAlertRenderedState({ visible: false, currentRendered, transitionType, outDuration })
		: currentRendered;
	return {
		nextClosingBySelf,
		nextRendered,
		nextVisible,
		shouldClose,
		shouldEmitClose: shouldClose && !nextRendered
	};
};

// 输入 Alert 关闭请求，返回组件层可直接同步的关闭流程，立即收尾也保持纯计算。
// Receive an Alert close request and return a close flow for component layers; immediate completion stays pure.
export const resolveAlertCloseFlow = (options: ResolveAlertCloseActionOptions = {}): AlertCloseFlow => {
	const closeAction = resolveAlertCloseAction(options);
	const completeAction = closeAction.shouldEmitClose
		? resolveAlertOutroEndAction({ visible: closeAction.nextVisible, emitClose: false })
		: null;
	return {
		...closeAction,
		nextClosingBySelf: completeAction?.nextClosingBySelf ?? closeAction.nextClosingBySelf,
		shouldCompleteImmediately: Boolean(completeAction?.shouldComplete)
	};
};

// 输入 Alert 可见状态和持续时间，返回组件层是否需要启动自动关闭计时器。
// Resolve Alert visibility and duration into whether the component layer should start an auto-close timer.
export const resolveAlertShouldAutoClose = ({ visible = false, duration = 3000 }: ResolveAlertAutoCloseOptions = {}): boolean =>
	visible && duration > 0;

// 输入 Alert 退场过渡结束状态，返回组件层可写入的收尾动作。
// Receive Alert outro-end state and return a completion action for the component layer.
export const resolveAlertOutroEndAction = ({
	visible = false,
	emitClose = true
}: ResolveAlertOutroEndActionOptions = {}): AlertOutroEndAction => {
	const shouldComplete = !visible;
	return {
		nextClosingBySelf: false,
		nextRendered: false,
		shouldComplete,
		shouldEmitClose: shouldComplete && emitClose
	};
};

export const resolveAlertContainerClass = ({
	position = 'top',
	py = '20',
	clickable = true,
	injClass = ''
}: { position?: AlertPositionKey; py?: AlertPyKey; clickable?: boolean; injClass?: string } = {}) =>
	joinClasses([
		'fixed',
		alertPositionClass[position as keyof typeof alertPositionClass],
		alertPyClass[py as keyof typeof alertPyClass],
		'px-2',
		clickable ? 'pointer-events-none' : '',
		injClass
	]);

// 输入 Alert 层级，返回组件层可直接绑定的容器样式。
// Convert Alert z-index into bind-ready container styles for the component layer.
export const resolveAlertContainerStyleValue = (zIndex: string | number = 1000): AlertContainerStyleValue => ({
	zIndex
});

export const resolveAlertContainerStyleString = (zIndex: string | number = 1000) => `z-index: ${zIndex};`;

export const resolveAlertInverseBgClass = (inverse = true) => (inverse ? 'bg-bg-surface-dark dark:bg-bg-surface' : '');

export const resolveAlertInverseTextClass = (inverse = true) => (inverse ? 'text-text-dark dark:text-text-primary' : '');

export const resolveAlertTextClass = (inverse = true) =>
	inverse ? 'text-text-dark dark:text-text-primary' : 'text-text-primary dark:text-text-dark';

export const resolveAlertSubtleTextClass = (inverse = true) =>
	inverse ? 'text-text-dark/70 dark:text-text-primary/70' : 'text-text-primary/70 dark:text-text-dark/70';

export const resolveAlertMessageClass = ({ inverse = true, title = '' }: { inverse?: boolean; title?: string } = {}) =>
	joinClasses(['text-sm', resolveAlertSubtleTextClass(inverse), title ? 'mt-1' : '']);

// 输入 Alert 标题状态，返回框架无关的标题 class。
// Receive Alert title state and return a framework-agnostic title class.
export const resolveAlertTitleClass = (): string => 'font-medium';

export const resolveAlertCloseClass = (inverse = true) =>
	inverse
		? 'text-text-dark/50 dark:text-text-primary/50 hover:bg-text-dark/5 dark:hover:bg-text-primary/5 active:bg-text-dark/10 dark:active:bg-text-primary/10'
		: 'text-text-primary/50 dark:text-text-dark/50 hover:bg-text-primary/5 dark:hover:bg-text-dark/5 active:bg-text-primary/10 dark:active:bg-text-dark/10';

// 输入 Alert 关闭按钮反色状态，返回框架无关的关闭按钮 class。
// Receive Alert inverse state and return a framework-agnostic close button class.
export const resolveAlertCloseButtonClass = (inverse = true): string =>
	joinClasses(['-m-1 shrink-0 rounded-full p-1 transition-colors', resolveAlertCloseClass(inverse)]);

export const resolveAlertContentClass = ({ inverse = true, radiusClass = '' }: { inverse?: boolean; radiusClass?: string } = {}) =>
	joinClasses(['pointer-events-auto', resolveAlertInverseBgClass(inverse), resolveAlertTextClass(inverse), radiusClass]);

export const resolveAlertBodyClass = (_inverse = true) => 'flex items-start gap-3';

export const resolveAlertCustomIconClass = () => 'shrink-0';

export const resolveAlertTextContentClass = () => 'min-w-0 flex-1';

export const resolveAlertCardBg = (inverse = true): 'none' | 'surface' => (inverse ? 'none' : 'surface');

export const resolveAlertShowTypeIcon = ({ showIcon = true, type = null }: ResolveAlertIconVisibleOptions = {}) =>
	Boolean(showIcon && type);

export const resolveAlertShowCustomIcon = ({ showIcon = true, type = null, icon = {} }: ResolveAlertIconVisibleOptions = {}) =>
	Boolean(showIcon && !type && icon && typeof icon === 'object' && Object.keys(icon).length > 0);

export const isAlertSvgType = (type: unknown): type is AlertSvgType => typeof type === 'string' && type in statusSvgByType;

// 输入 Alert 状态图标色值 class，返回框架无关的图标容器 class。
// Receive Alert status-icon tone class and return a framework-agnostic icon wrapper class.
export const resolveAlertTypeIconWrapperClass = (className = ''): string => joinClasses(['shrink-0', className]);

export const resolveAlertTypeIcon = ({
	builtInIconLibrary,
	showIcon = true,
	type = null
}: Pick<ResolveAlertIconVisibleOptions, 'builtInIconLibrary' | 'showIcon' | 'type'> = {}): AlertTypeIconDerived | null => {
	if (!showIcon || !isAlertSvgType(type)) return null;
	const className = alertTypeIconClass[type];
	return {
		type,
		svg: resolveStatusSvgByType(builtInIconLibrary)[type],
		className,
		wrapperClass: resolveAlertTypeIconWrapperClass(className)
	};
};

// 输入 Alert 内容状态，返回框架无关的展示分支。
// Resolve Alert content state into framework-agnostic display branches.
export const resolveAlertContentState = ({
	builtInIconLibrary,
	showIcon = true,
	type = null,
	icon = {},
	hasCustomContent = false,
	title = '',
	message = '',
	closable = true
}: ResolveAlertContentStateOptions = {}): AlertContentState => {
	const typeIcon = resolveAlertTypeIcon({ builtInIconLibrary, showIcon, type });
	return {
		typeIcon,
		showTypeIcon: Boolean(typeIcon),
		showCustomIcon: !typeIcon && resolveAlertShowCustomIcon({ showIcon, type, icon }),
		showCustomContent: hasCustomContent,
		showTitle: !hasCustomContent && Boolean(title),
		showMessage: !hasCustomContent && Boolean(message),
		showClose: Boolean(closable)
	};
};

// 输入 Alert 过渡配置，返回框架无关的过渡参数对象。
// Consume Alert transition config and return framework-agnostic transition params.
export const resolveAlertTransitionParams = ({
	transitionType = 'fly',
	transitionParams = {},
	duration = 300,
	easing,
	position = 'top'
}: ResolveAlertTransitionParamsOptions = {}) => {
	const params: Record<string, unknown> = { duration, easing, ...transitionParams };
	if (transitionType === 'fly' && params.y === undefined) {
		params.y = position === 'top' ? -100 : 100;
	}
	return params;
};

// 输入组件 props、缓动函数和内容状态，返回框架无关的 Alert 派生入参。
// Receive component props, easing functions and content state, then return framework-agnostic Alert derivation options.
export const resolveAlertStateOptions = ({
	easeIn,
	easeOut,
	hasCustomContent,
	props
}: ResolveAlertStateOptionsParams): ResolveAlertDerivedOptions => ({
	builtInIconLibrary: props.builtInIconLibrary,
	cardRadius: props.cardRadius,
	clickable: props.clickable,
	closable: props.closable,
	easeIn,
	easeOut,
	hasCustomContent,
	icon: props.icon,
	inDuration: props.inDuration,
	injClass: props.injClass,
	inverse: props.inverse,
	message: props.message,
	outDuration: props.outDuration,
	position: props.position,
	py: props.py,
	showIcon: props.showIcon,
	title: props.title,
	transitionParams: props.transitionParams,
	transitionType: props.transitionType,
	type: props.type,
	zIndex: props.zIndex
});

// 输入 Alert 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Alert state and return framework-agnostic derived values ready for component binding.
export const resolveAlertDerived = ({
	builtInIconLibrary,
	cardRadius = '',
	clickable = true,
	closable = true,
	easeIn,
	easeOut,
	hasCustomContent = false,
	icon = {},
	inDuration = 300,
	injClass = '',
	inverse = true,
	message = '',
	outDuration = 300,
	position = 'top',
	py = '20',
	showIcon = true,
	title = '',
	transitionParams = {},
	transitionType = 'fly',
	type = null,
	zIndex = 1000
}: ResolveAlertDerivedOptions = {}): AlertDerived => {
	const radiusClass = resolveAlertRadiusClass(cardRadius);
	return {
		radiusClass,
		bodyClass: resolveAlertBodyClass(inverse),
		containerClass: resolveAlertContainerClass({ position, py, clickable, injClass }),
		containerStyleValue: resolveAlertContainerStyleValue(zIndex),
		containerStyleString: resolveAlertContainerStyleString(zIndex),
		contentClass: resolveAlertContentClass({ inverse, radiusClass }),
		customIconClass: resolveAlertCustomIconClass(),
		messageClass: resolveAlertMessageClass({ inverse, title }),
		textContentClass: resolveAlertTextContentClass(),
		titleClass: resolveAlertTitleClass(),
		closeButtonClass: resolveAlertCloseButtonClass(inverse),
		cardBg: resolveAlertCardBg(inverse),
		contentState: resolveAlertContentState({ builtInIconLibrary, showIcon, type, icon, hasCustomContent, title, message, closable }),
		inParams: resolveAlertTransitionParams({ transitionType, transitionParams, duration: inDuration, easing: easeIn, position }),
		outParams: resolveAlertTransitionParams({ transitionType, transitionParams, duration: outDuration, easing: easeOut, position })
	};
};
