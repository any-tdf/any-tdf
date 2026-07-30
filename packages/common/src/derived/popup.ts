import { radiusBottomObj, radiusLeftObj, radiusObj, radiusRightObj, radiusTopObj } from './common.js';
import { joinClasses, resolveClassMapValue, resolveHiddenScrollbarCss } from './helpers.js';

export const popupAutoRadiusPositionObj = {
	bottom: 'top',
	top: 'bottom',
	left: 'right',
	right: 'left',
	center: 'all'
} as const;

export const popupDefaultRadiusObj = {
	all: 'rounded-(--radius-box)',
	top: 'rounded-t-(--radius-box)',
	bottom: 'rounded-b-(--radius-box)',
	left: 'rounded-l-(--radius-box)',
	right: 'rounded-r-(--radius-box)',
	none: ''
} as const;

export const popupPositionClassObj = {
	bottom: ' flex-col justify-end',
	top: ' flex-col justify-start',
	left: ' justify-start',
	right: ' justify-end',
	center: ' flex-col justify-center'
} as const;

export const popupTransitionSizeClass = {
	bottom: 'w-full',
	top: 'w-full',
	left: 'h-full',
	right: 'h-full',
	center: 'w-full'
} as const;

export const popupTransitionPxClass = {
	'0': ' px-0',
	'1': ' px-1',
	'2': ' px-2',
	'3': ' px-3',
	'4': ' px-4',
	'5': ' px-5',
	'6': ' px-6',
	'8': ' px-8',
	'10': ' px-10',
	'12': ' px-12',
	'16': ' px-16',
	'20': ' px-20'
} as const;

export const popupTransitionPyClass = {
	'0': ' py-0',
	'1': ' py-1',
	'2': ' py-2',
	'3': ' py-3',
	'4': ' py-4',
	'5': ' py-5',
	'6': ' py-6',
	'8': ' py-8',
	'10': ' py-10',
	'12': ' py-12',
	'16': ' py-16',
	'24': ' py-24',
	'32': ' py-32',
	'48': ' py-48',
	'64': ' py-64'
} as const;

export type PopupPosition = keyof typeof popupPositionClassObj;
export type PopupRadiusPosition = keyof typeof popupDefaultRadiusObj | 'auto';
export type PopupRadius = keyof typeof radiusObj | '';

export type ResolvePopupRadiusClassOptions = {
	position?: PopupPosition | string;
	radiusPosition?: PopupRadiusPosition | string;
	radius?: PopupRadius | string;
};

export type ResolvePopupTransitionDistanceOptions = {
	position?: PopupPosition | string;
	size?: number;
	transitionDistance?: number;
	viewportWidth?: number;
	viewportHeight?: number;
};

export type ResolvePopupMotionParamsOptions = ResolvePopupTransitionDistanceOptions & {
	duration: number;
	easing?: (time: number) => number;
};
export type ResolvePopupTransitionParamsOptions = ResolvePopupMotionParamsOptions;

export type PopupMotionParams = {
	duration: number;
	easing?: (time: number) => number;
	opacity: 1;
	x?: number;
	y?: number;
};

export type PopupSizeStyleValue = {
	width?: string;
	height?: string;
};

export type PopupWrapperStyleValue = {
	zIndex: string | number;
	height: string;
};

export type PopupViewportSize = {
	height: number;
	width: number;
};

export type ResolvePopupViewportSizeOptions = Partial<PopupViewportSize>;

export type ResolvePopupRenderStateOptions = {
	visible?: boolean;
	outDuration?: number;
	currentRender?: boolean;
};

export type ResolvePopupMaskClickActionOptions = {
	maskClosable?: boolean;
};

export type PopupMaskClickAction = {
	shouldClose: boolean;
};

export type ResolvePopupCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
	visible?: boolean;
};

export type PopupCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type ResolvePopupMaskClickFlowOptions = ResolvePopupMaskClickActionOptions & ResolvePopupCloseActionOptions;

export type PopupMaskClickFlow = PopupMaskClickAction & {
	closeAction: PopupCloseAction;
};

export type PopupRenderEndAction = {
	nextShouldRender: false;
};

export type ResolvePopupDerivedOptions = ResolvePopupRadiusClassOptions & {
	zIndex?: string | number;
	innerHeight?: number;
	transparent?: boolean;
	hideScrollbar?: boolean;
};

export type ResolvePopupTransitionDerivedOptions = Omit<ResolvePopupTransitionParamsOptions, 'duration'> & {
	px?: string;
	py?: string;
	duration?: number;
	outDuration?: number;
	outEasing?: (time: number) => number;
};

export type PopupStatePropsLike = Partial<Omit<ResolvePopupDerivedOptions, 'innerHeight'>>;
export type ResolvePopupStateOptionsParams = {
	innerHeight?: number;
	props: PopupStatePropsLike;
};

export type PopupTransitionStatePropsLike = Partial<Omit<ResolvePopupTransitionDerivedOptions, 'viewportHeight' | 'viewportWidth'>>;
export type ResolvePopupTransitionStateOptionsParams = {
	props: PopupTransitionStatePropsLike;
	viewportHeight?: number;
	viewportWidth?: number;
};

// 输入 Popup 状态，返回框架无关的实际圆角方位。
// Resolve Popup state into the framework-agnostic effective radius side.
export const resolvePopupActualRadiusPosition = ({
	position = 'bottom',
	radiusPosition = 'auto'
}: ResolvePopupRadiusClassOptions): keyof typeof popupDefaultRadiusObj => {
	if (radiusPosition === 'auto') {
		return popupAutoRadiusPositionObj[position as keyof typeof popupAutoRadiusPositionObj] || 'top';
	}
	return (radiusPosition as keyof typeof popupDefaultRadiusObj) || 'none';
};

// 输入 Popup 状态，返回组件层可直接绑定的圆角 class。
// Resolve Popup state into radius classes that component layers can bind directly.
export const resolvePopupRadiusClass = (options: ResolvePopupRadiusClassOptions = {}): string => {
	const { radius = '' } = options;
	const actualRadiusPosition = resolvePopupActualRadiusPosition(options);

	if (!radius) return popupDefaultRadiusObj[actualRadiusPosition] || '';

	if (actualRadiusPosition === 'all') return radiusObj[radius as keyof typeof radiusObj] || '';
	if (actualRadiusPosition === 'top') return radiusTopObj[radius as keyof typeof radiusTopObj] || '';
	if (actualRadiusPosition === 'bottom') return radiusBottomObj[radius as keyof typeof radiusBottomObj] || '';
	if (actualRadiusPosition === 'left') return radiusLeftObj[radius as keyof typeof radiusLeftObj] || '';
	if (actualRadiusPosition === 'right') return radiusRightObj[radius as keyof typeof radiusRightObj] || '';
	return '';
};

export const resolvePopupWrapperClass = (position: PopupPosition | string = 'bottom'): string =>
	`fixed inset-0 h-screen w-screen flex${resolveClassMapValue(popupPositionClassObj, position, 'bottom')} pointer-events-none px-0`;

// 输入 Popup 层级和视口高度，返回组件层可直接绑定的外层样式。
// Convert Popup z-index and viewport height into bind-ready wrapper styles for the component layer.
export const resolvePopupWrapperStyleValue = ({
	zIndex = 600,
	innerHeight = 0
}: { zIndex?: string | number; innerHeight?: number } = {}): PopupWrapperStyleValue => ({
	zIndex,
	height: `${innerHeight}px`
});

export const resolvePopupWrapperStyleString = ({
	zIndex = 600,
	innerHeight = 0
}: { zIndex?: string | number; innerHeight?: number } = {}) => `z-index:${zIndex};height:${innerHeight}px`;

// 输入组件层读取到的视口数值，返回统一的 Popup 视口尺寸对象。
// Receive viewport numbers read by the component layer and return a normalized Popup viewport size object.
export const resolvePopupViewportSize = ({ height = 0, width = 0 }: ResolvePopupViewportSizeOptions = {}): PopupViewportSize => ({
	height,
	width
});

export const resolvePopupTransitionClass = ({
	position = 'bottom',
	px = '0',
	py = '0'
}: { position?: PopupPosition | string; px?: string; py?: string } = {}): string =>
	`${resolveClassMapValue(popupTransitionSizeClass, position, 'bottom')}${resolveClassMapValue(popupTransitionPxClass, px, '0')}${resolveClassMapValue(popupTransitionPyClass, py, '0')} pointer-events-auto`;

export const resolvePopupPanelClass = ({
	transparent = false,
	radiusClass = '',
	hideScrollbar = false
}: { transparent?: boolean; radiusClass?: string; hideScrollbar?: boolean } = {}): string =>
	joinClasses([
		'w-full h-full overflow-y-auto',
		transparent ? 'bg-transparent' : 'bg-bg-overlay dark:bg-bg-overlay-dark',
		radiusClass,
		hideScrollbar && 'popup-container'
	]);

export const resolvePopupTransitionName = (position: PopupPosition | string = 'bottom'): 'scale' | 'fly' =>
	position === 'center' ? 'scale' : 'fly';

// 动态位移只接收视口数值，不读取 window 或 DOM。
// Dynamic motion only receives viewport values and never reads window or DOM.
export const resolvePopupTransitionDistance = ({
	position = 'bottom',
	size = 40,
	transitionDistance = 0,
	viewportWidth = 0,
	viewportHeight = 0
}: ResolvePopupTransitionDistanceOptions = {}): number => {
	if (size === 0) return transitionDistance;
	return position === 'left' || position === 'right' ? (viewportWidth * size) / 100 : (viewportHeight * size) / 100;
};

export const resolvePopupMotionParams = ({
	position = 'bottom',
	size = 40,
	transitionDistance = 0,
	viewportWidth = 0,
	viewportHeight = 0,
	duration,
	easing
}: ResolvePopupMotionParamsOptions): PopupMotionParams => {
	const distance = resolvePopupTransitionDistance({ position, size, transitionDistance, viewportWidth, viewportHeight });
	const params: PopupMotionParams = { duration, easing, opacity: 1, x: 0, y: 0 };
	if (position === 'bottom') params.y = distance;
	if (position === 'top') params.y = -distance;
	if (position === 'left') params.x = -distance;
	if (position === 'right') params.x = distance;
	return params;
};

// 输入 Popup 过渡状态，返回组件层可交给动画系统的参数；动画绑定留在组件层。
// Receive Popup transition state and return params for the component animation system; animation binding stays in the component layer.
export const resolvePopupTransitionParams = (options: ResolvePopupTransitionParamsOptions): PopupMotionParams => {
	if (options.position === 'center') {
		return {
			duration: options.duration,
			easing: options.easing,
			opacity: 1
		};
	}
	return resolvePopupMotionParams(options);
};

export const resolvePopupSizeStyleValue = ({
	position = 'bottom',
	size = 40
}: { position?: PopupPosition | string; size?: number } = {}): PopupSizeStyleValue => {
	const value = size === 0 ? 'auto' : `${size}%`;
	return position === 'left' || position === 'right' ? { width: value } : { height: value };
};

export const resolvePopupSizeStyleString = (options: { position?: PopupPosition | string; size?: number } = {}): string => {
	const style = resolvePopupSizeStyleValue(options);
	if (style.width) return `width:${style.width}`;
	return `height:${style.height}`;
};

// 输入可见状态和出场时长，返回组件层是否保留渲染节点。
// Resolve visibility and outro duration into whether the component layer should keep the node rendered.
export const resolvePopupRenderState = ({
	visible = false,
	outDuration = 240,
	currentRender = false
}: ResolvePopupRenderStateOptions = {}): boolean => {
	if (visible) return true;
	if (outDuration <= 0) return false;
	return currentRender;
};

// 输入 Popup 当前可见状态，返回组件层可写入的关闭动作。
// Receive the current Popup visibility and return a close action for the component layer.
export const resolvePopupCloseAction = ({
	emitClose = true,
	shouldClose = true,
	visible = true
}: ResolvePopupCloseActionOptions = {}): PopupCloseAction => {
	const nextShouldClose = Boolean(visible && shouldClose);

	return {
		nextVisible: false,
		shouldClose: nextShouldClose,
		shouldEmitClose: nextShouldClose && emitClose
	};
};

// 输入出场动画完成信号，返回组件层可写入的渲染结束状态。
// Receive outro completion and return the render-end state for the component layer.
export const resolvePopupRenderEndAction = (): PopupRenderEndAction => ({
	nextShouldRender: false
});

// 输入 Popup 遮罩点击状态，返回组件层需要执行的关闭决策。
// Resolve Popup mask click state into the close decision for the component layer.
export const resolvePopupMaskClickAction = ({ maskClosable = true }: ResolvePopupMaskClickActionOptions = {}): PopupMaskClickAction => ({
	shouldClose: maskClosable
});

// 输入 Popup 遮罩点击状态，返回遮罩决策和对应关闭动作，不派发事件。
// Receive Popup mask-click state and return the mask decision plus close action without emitting events.
export const resolvePopupMaskClickFlow = ({
	maskClosable = true,
	visible = true,
	emitClose = true
}: ResolvePopupMaskClickFlowOptions = {}): PopupMaskClickFlow => {
	const maskAction = resolvePopupMaskClickAction({ maskClosable });
	return {
		...maskAction,
		closeAction: resolvePopupCloseAction({ visible, emitClose, shouldClose: maskAction.shouldClose })
	};
};

// 输入 Popup 滚动条隐藏需求，返回框架无关的 CSS 字符串。
// Resolve Popup scrollbar hiding needs into a framework-agnostic CSS string.
export const resolvePopupScrollbarCss = (): string => resolveHiddenScrollbarCss({ selector: '.popup-container' });

// 输入组件 props 和视口高度，返回框架无关的 Popup 派生入参。
// Receive component props and viewport height, then return framework-agnostic Popup derivation options.
export const resolvePopupStateOptions = ({ innerHeight, props }: ResolvePopupStateOptionsParams): ResolvePopupDerivedOptions => ({
	hideScrollbar: props.hideScrollbar,
	innerHeight,
	position: props.position,
	radius: props.radius,
	radiusPosition: props.radiusPosition,
	transparent: props.transparent,
	zIndex: props.zIndex
});

// 输入过渡 props 和视口尺寸，返回框架无关的 Popup 过渡派生入参。
// Receive transition props and viewport size, then return framework-agnostic Popup transition derivation options.
export const resolvePopupTransitionStateOptions = ({
	props,
	viewportHeight,
	viewportWidth
}: ResolvePopupTransitionStateOptionsParams): ResolvePopupTransitionDerivedOptions => ({
	duration: props.duration,
	easing: props.easing,
	outDuration: props.outDuration,
	outEasing: props.outEasing,
	position: props.position,
	px: props.px,
	py: props.py,
	size: props.size,
	transitionDistance: props.transitionDistance,
	viewportHeight,
	viewportWidth
});

// 输入 Popup 当前状态和组件测量值，返回组件层可直接绑定的框架无关派生结果。
// Receive current Popup state and component measurements, then return framework-agnostic derived values ready for component binding.
export const resolvePopupDerived = (options: ResolvePopupDerivedOptions = {}) => {
	const {
		position = 'bottom',
		radiusPosition = 'auto',
		radius = '',
		zIndex = 600,
		innerHeight = 0,
		transparent = false,
		hideScrollbar = false
	} = options;
	const radiusClass = resolvePopupRadiusClass({ position, radiusPosition, radius });

	return {
		radiusClass,
		wrapperClass: resolvePopupWrapperClass(position),
		wrapperStyleValue: resolvePopupWrapperStyleValue({ zIndex, innerHeight }),
		wrapperStyleString: resolvePopupWrapperStyleString({ zIndex, innerHeight }),
		panelClass: resolvePopupPanelClass({ transparent, radiusClass, hideScrollbar }),
		css: resolvePopupScrollbarCss()
	};
};

// 输入 Popup 过渡状态和组件测量值，返回组件层可交给动画系统的纯参数。
// Receive Popup transition state and component measurements, then return pure params for animation bindings.
export const resolvePopupTransitionDerived = ({
	position = 'bottom',
	size = 40,
	transitionDistance = 0,
	viewportWidth = 0,
	viewportHeight = 0,
	px = '0',
	py = '0',
	duration = 450,
	outDuration = 240,
	easing,
	outEasing
}: ResolvePopupTransitionDerivedOptions = {}) => ({
	sizeStyleValue: resolvePopupSizeStyleValue({ position, size }),
	sizeStyleString: resolvePopupSizeStyleString({ position, size }),
	transitionClass: resolvePopupTransitionClass({ position, px, py }),
	transitionName: resolvePopupTransitionName(position),
	inParams: resolvePopupTransitionParams({ position, size, transitionDistance, viewportHeight, viewportWidth, duration, easing }),
	outParams: resolvePopupTransitionParams({
		position,
		size,
		transitionDistance,
		viewportHeight,
		viewportWidth,
		duration: outDuration,
		easing: outEasing
	})
});
