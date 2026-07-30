import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export const tooltipStateObj = {
	theme: 'bg-primary dark:bg-dark text-white dark:text-black',
	success: 'bg-success text-white',
	warning: 'bg-warning text-white',
	error: 'bg-error text-white',
	info: 'bg-info text-white',
	black: 'bg-black/90 text-white dark:bg-white/90 dark:text-black'
} as const;

export const tooltipArrowStateObj = {
	top: {
		theme: 'border-t-primary dark:border-t-dark',
		success: 'border-t-success',
		warning: 'border-t-warning',
		error: 'border-t-error',
		info: 'border-t-info',
		black: 'border-t-black/90 dark:border-t-white/90'
	},
	bottom: {
		theme: 'border-b-primary dark:border-b-dark',
		success: 'border-b-success',
		warning: 'border-b-warning',
		error: 'border-b-error',
		info: 'border-b-info',
		black: 'border-b-black/90 dark:border-b-white/90'
	},
	left: {
		theme: 'border-l-primary dark:border-l-dark',
		success: 'border-l-success',
		warning: 'border-l-warning',
		error: 'border-l-error',
		info: 'border-l-info',
		black: 'border-l-black/90 dark:border-l-white/90'
	},
	right: {
		theme: 'border-r-primary dark:border-r-dark',
		success: 'border-r-success',
		warning: 'border-r-warning',
		error: 'border-r-error',
		info: 'border-r-info',
		black: 'border-r-black/90 dark:border-r-white/90'
	}
} as const;

export const tooltipArrowPositionObj = {
	top: 'top-full left-1/2 -translate-x-1/2 border-transparent',
	bottom: 'bottom-full left-1/2 -translate-x-1/2 border-transparent',
	left: 'left-full top-1/2 -translate-y-1/2 border-transparent',
	right: 'right-full top-1/2 -translate-y-1/2 border-transparent'
} as const;

export const tooltipFlyConfigObj = {
	top: { y: 4 },
	bottom: { y: -4 },
	left: { x: 4 },
	right: { x: -4 }
} as const;

export type TooltipPosition = keyof typeof tooltipArrowPositionObj;
export type TooltipState = keyof typeof tooltipStateObj;
export type TooltipRadiusKey = keyof typeof radiusObj | string;

export type TooltipRectLike = {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
};

export type ResolveTooltipPositionOptions = {
	position?: TooltipPosition;
	triggerRect: TooltipRectLike;
	tooltipRect: Pick<TooltipRectLike, 'width' | 'height'>;
	viewportWidth: number;
	viewportHeight: number;
	gap?: number;
	padding?: number;
};

export type ResolveTooltipVisibilityOptions = {
	visible?: boolean;
	hiddenByViewport?: boolean;
};

export type ResolveTooltipVisibleSyncActionOptions = {
	visible?: boolean;
};

export type TooltipVisibleSyncAction = {
	nextHiddenByViewport: false;
	nextVisible: boolean;
};

export type ResolveTooltipRestoreOptions = {
	hiddenByViewport?: boolean;
	disabled?: boolean;
	triggerInViewport?: boolean;
};

export type ResolveTooltipShowActionOptions = {
	disabled?: boolean;
	hiddenByViewport?: boolean;
};

export type TooltipShowAction = {
	nextHiddenByViewport: boolean;
	shouldShow: boolean;
};

export type TooltipVisibilityCommitAction = {
	nextHiddenByViewport: boolean;
	nextVisible: boolean;
	shouldChange: boolean;
	shouldEmitHide: boolean;
	shouldEmitShow: boolean;
};

export type ResolveTooltipDelayActionOptions = {
	delay?: number;
};

export type TooltipDelayAction = {
	shouldDelay: boolean;
	delayMs: number;
};
export type ResolveTooltipShowFlowOptions = ResolveTooltipShowActionOptions & ResolveTooltipDelayActionOptions;
export type TooltipShowFlow = TooltipShowAction &
	TooltipDelayAction & {
		commitAction: TooltipVisibilityCommitAction;
	};
export type ResolveTooltipHideFlowOptions = ResolveTooltipDelayActionOptions;
export type TooltipHideFlow = TooltipDelayAction & {
	commitAction: TooltipVisibilityCommitAction;
	nextHiddenByViewport: boolean;
};

export type TooltipToggleAction = 'show' | 'hide';
export type TooltipViewportAction = 'hideForViewport' | 'restoreFromViewport' | 'updatePosition';

export type ResolveTooltipViewportActionOptions = {
	hiddenByViewport?: boolean;
	triggerInViewport?: boolean;
};

export type TooltipPanelStyleValue = {
	top: string;
	left: string;
	maxWidth: string;
	zIndex: number | string;
};

export type TooltipTransitionParams = {
	duration: number;
	x?: number;
	y?: number;
};

export type ResolveTooltipDerivedOptions = {
	disabled?: boolean;
	injClass?: string;
	left?: number;
	maxWidth?: number;
	position?: TooltipPosition;
	radius?: TooltipRadiusKey;
	state?: TooltipState | string;
	top?: number;
	zIndex?: number | string;
};

export type TooltipStatePropsLike = Partial<Omit<ResolveTooltipDerivedOptions, 'left' | 'top'>>;

export type ResolveTooltipStateOptionsParams = {
	left?: number;
	props: TooltipStatePropsLike;
	top?: number;
};

// 输入 Tooltip 组件状态，返回框架无关的 class 字符串和定位结果。
// Convert Tooltip component state into framework-agnostic class strings and placement results.
export const resolveTooltipRadiusClass = (radius: TooltipRadiusKey = 'sm') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

// 输入 Tooltip 结构状态，返回触发器外层框架无关 class。
// Resolve Tooltip structure state into the framework-agnostic trigger wrapper class.
export const resolveTooltipWrapperClass = (): string => 'inline-block';

export const resolveTooltipTriggerClass = (disabled = false) => (disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer');

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveTooltipInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入外部 visible 值，返回组件层可写入的可见性同步状态。
// Receive an external visible value and return visibility sync state for the component layer.
export const resolveTooltipVisibleSyncAction = ({ visible }: ResolveTooltipVisibleSyncActionOptions = {}): TooltipVisibleSyncAction => ({
	nextHiddenByViewport: false,
	nextVisible: resolveTooltipInitialVisible(visible)
});

// 输入当前可见状态，返回点击触发时应该执行的动作。
// Resolve the current visibility into the action that a trigger click should run.
export const resolveTooltipToggleAction = (visible = false): TooltipToggleAction => (visible ? 'hide' : 'show');

// 输入 Tooltip disabled 状态，返回组件层是否应进入显示流程。
// Resolve Tooltip disabled state into whether the component layer should enter the show flow.
export const resolveTooltipShowAction = ({
	disabled = false,
	hiddenByViewport = false
}: ResolveTooltipShowActionOptions = {}): TooltipShowAction => {
	const shouldShow = !disabled;
	return {
		nextHiddenByViewport: shouldShow ? false : hiddenByViewport,
		shouldShow
	};
};

// 输入 Tooltip 显示提交状态，返回组件层可写入的显示动作。
// Receive Tooltip show-commit state and return a show action that the component layer can write.
export const resolveTooltipShowCommitAction = (): TooltipVisibilityCommitAction => ({
	nextHiddenByViewport: false,
	nextVisible: true,
	shouldChange: true,
	shouldEmitHide: false,
	shouldEmitShow: true
});

// 输入 Tooltip 隐藏提交状态，返回组件层可写入的隐藏动作。
// Receive Tooltip hide-commit state and return a hide action that the component layer can write.
export const resolveTooltipHideCommitAction = (): TooltipVisibilityCommitAction => ({
	nextHiddenByViewport: false,
	nextVisible: false,
	shouldChange: true,
	shouldEmitHide: true,
	shouldEmitShow: false
});

// 输入 Tooltip 延迟时间，返回组件层是否应使用 timer。
// Resolve Tooltip delay into whether the component layer should use a timer.
export const resolveTooltipDelayAction = ({ delay = 0 }: ResolveTooltipDelayActionOptions = {}): TooltipDelayAction => ({
	shouldDelay: delay > 0,
	delayMs: delay
});

// 输入 Tooltip 显示请求，返回组件层可调度的显示流程。
// Receive a Tooltip show request and return a show flow that component layers can schedule.
export const resolveTooltipShowFlow = ({ delay = 0, ...options }: ResolveTooltipShowFlowOptions = {}): TooltipShowFlow => ({
	...resolveTooltipShowAction(options),
	...resolveTooltipDelayAction({ delay }),
	commitAction: resolveTooltipShowCommitAction()
});

// 输入 Tooltip 隐藏请求，返回组件层可调度的隐藏流程。
// Receive a Tooltip hide request and return a hide flow that component layers can schedule.
export const resolveTooltipHideFlow = ({ delay = 0 }: ResolveTooltipHideFlowOptions = {}): TooltipHideFlow => {
	const commitAction = resolveTooltipHideCommitAction();
	return {
		...resolveTooltipDelayAction({ delay }),
		nextHiddenByViewport: commitAction.nextHiddenByViewport,
		commitAction
	};
};

// 输入可见状态和视口隐藏状态，返回组件层是否需要绑定全局监听。
// Resolve visibility and viewport-hidden state into whether global listeners should be bound.
export const resolveTooltipShouldBindGlobalListeners = ({
	visible = false,
	hiddenByViewport = false
}: ResolveTooltipVisibilityOptions = {}): boolean => visible || hiddenByViewport;

// 输入可见状态和视口隐藏状态，返回视口检测时是否需要隐藏。
// Resolve visibility and viewport-hidden state into whether viewport checks should hide the tooltip.
export const resolveTooltipShouldHideForViewport = ({
	visible = false,
	hiddenByViewport = false
}: ResolveTooltipVisibilityOptions = {}): boolean => visible && !hiddenByViewport;

// 输入视口隐藏状态、禁用状态和触发器可见性，返回是否允许恢复显示。
// Resolve viewport-hidden, disabled and trigger visibility state into whether the tooltip may be restored.
export const resolveTooltipShouldRestoreFromViewport = ({
	hiddenByViewport = false,
	disabled = false,
	triggerInViewport = false
}: ResolveTooltipRestoreOptions = {}): boolean => hiddenByViewport && !disabled && triggerInViewport;

// 输入视口检测隐藏状态，返回组件层可写入的隐藏动作。
// Receive viewport-hide state and return a hide action that the component layer can write.
export const resolveTooltipHideForViewportAction = ({
	visible = false,
	hiddenByViewport = false
}: ResolveTooltipVisibilityOptions = {}): TooltipVisibilityCommitAction => {
	const shouldChange = resolveTooltipShouldHideForViewport({ visible, hiddenByViewport });
	return {
		nextHiddenByViewport: shouldChange ? true : hiddenByViewport,
		nextVisible: shouldChange ? false : visible,
		shouldChange,
		shouldEmitHide: shouldChange,
		shouldEmitShow: false
	};
};

// 输入视口恢复状态，返回组件层可写入的恢复显示动作。
// Receive viewport-restore state and return a restore action that the component layer can write.
export const resolveTooltipRestoreFromViewportAction = ({
	hiddenByViewport = false,
	disabled = false,
	triggerInViewport = false,
	visible = false
}: ResolveTooltipRestoreOptions & { visible?: boolean } = {}): TooltipVisibilityCommitAction => {
	const shouldChange = resolveTooltipShouldRestoreFromViewport({ hiddenByViewport, disabled, triggerInViewport });
	return {
		nextHiddenByViewport: shouldChange ? false : hiddenByViewport,
		nextVisible: shouldChange ? true : visible,
		shouldChange,
		shouldEmitHide: false,
		shouldEmitShow: shouldChange
	};
};

// 输入视口检测状态，返回组件层需要执行的下一步动作。
// Receive viewport detection state and return the next action for the component layer.
export const resolveTooltipViewportAction = ({
	hiddenByViewport = false,
	triggerInViewport = false
}: ResolveTooltipViewportActionOptions = {}): TooltipViewportAction => {
	if (!triggerInViewport) return 'hideForViewport';
	if (hiddenByViewport) return 'restoreFromViewport';
	return 'updatePosition';
};

export const resolveTooltipPanelClass = ({
	radiusClass,
	state = 'black',
	injClass = ''
}: {
	radiusClass: string;
	state?: TooltipState | string;
	injClass?: string;
}) => joinClasses(['fixed', radiusClass, 'px-2 py-1.5 text-xs', tooltipStateObj[state as TooltipState], injClass]);

export const resolveTooltipArrowClass = ({
	position = 'top',
	state = 'black'
}: {
	position?: TooltipPosition;
	state?: TooltipState | string;
}) => joinClasses(['absolute h-0 w-0 border-4', tooltipArrowPositionObj[position], tooltipArrowStateObj[position][state as TooltipState]]);

// 输入 Tooltip 方位，返回框架无关的入场过渡参数。
// Resolve Tooltip placement into framework-agnostic intro transition params.
export const resolveTooltipInParams = (position: TooltipPosition = 'top'): TooltipTransitionParams => ({
	...tooltipFlyConfigObj[position],
	duration: 200
});

export const resolveTooltipOutParams = (): TooltipTransitionParams => ({
	duration: 150
});

export const resolveTooltipPosition = ({
	position = 'top',
	triggerRect,
	tooltipRect,
	viewportWidth,
	viewportHeight,
	gap = 8,
	padding = 4
}: ResolveTooltipPositionOptions) => {
	let top = 0;
	let left = 0;

	if (position === 'top') {
		top = triggerRect.top - tooltipRect.height - gap;
		left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
	} else if (position === 'bottom') {
		top = triggerRect.bottom + gap;
		left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
	} else if (position === 'left') {
		top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
		left = triggerRect.left - tooltipRect.width - gap;
	} else {
		top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
		left = triggerRect.right + gap;
	}

	if (left < padding) left = padding;
	if (left + tooltipRect.width > viewportWidth - padding) {
		left = viewportWidth - tooltipRect.width - padding;
	}
	if (top < padding) top = padding;
	if (top + tooltipRect.height > viewportHeight - padding) {
		top = viewportHeight - tooltipRect.height - padding;
	}

	return { top, left };
};

// 输入 Tooltip 定位状态，返回组件层可直接绑定的面板样式。
// Convert Tooltip placement state into bind-ready panel styles for the component layer.
export const resolveTooltipPanelStyleValue = ({
	top = 0,
	left = 0,
	maxWidth = 200,
	zIndex = 800
}: {
	top?: number;
	left?: number;
	maxWidth?: number;
	zIndex?: number | string;
} = {}): TooltipPanelStyleValue => ({
	top: `${top}px`,
	left: `${left}px`,
	maxWidth: `${maxWidth}px`,
	zIndex
});

export const resolveTooltipPanelStyleString = (
	options: { top?: number; left?: number; maxWidth?: number; zIndex?: number | string } = {}
) => {
	const style = resolveTooltipPanelStyleValue(options);
	return `top: ${style.top}; left: ${style.left}; max-width: ${style.maxWidth}; z-index: ${style.zIndex};`;
};

export const resolveTooltipTriggerInViewport = ({
	triggerRect,
	viewportWidth,
	viewportHeight
}: {
	triggerRect: TooltipRectLike;
	viewportWidth: number;
	viewportHeight: number;
}) =>
	triggerRect.width > 0 &&
	triggerRect.height > 0 &&
	triggerRect.bottom > 0 &&
	triggerRect.right > 0 &&
	triggerRect.top < viewportHeight &&
	triggerRect.left < viewportWidth;

// 输入组件 props 和已计算坐标，返回框架无关的 Tooltip 派生入参。
// Receive component props and calculated coordinates, then return framework-agnostic Tooltip derivation options.
export const resolveTooltipStateOptions = ({ left, props, top }: ResolveTooltipStateOptionsParams): ResolveTooltipDerivedOptions => ({
	disabled: props.disabled,
	injClass: props.injClass,
	left,
	maxWidth: props.maxWidth,
	position: props.position,
	radius: props.radius,
	state: props.state,
	top,
	zIndex: props.zIndex
});

// 输入 Tooltip 当前状态和已计算坐标，返回组件层可直接绑定的框架无关派生结果。
// Receive current Tooltip state and calculated coordinates, then return framework-agnostic derived values ready for component binding.
export const resolveTooltipDerived = ({
	disabled = false,
	injClass = '',
	left = 0,
	maxWidth = 200,
	position = 'top',
	radius = 'sm',
	state = 'black',
	top = 0,
	zIndex = 800
}: ResolveTooltipDerivedOptions = {}) => {
	const radiusClass = resolveTooltipRadiusClass(radius);

	return {
		radiusClass,
		wrapperClass: resolveTooltipWrapperClass(),
		triggerClass: resolveTooltipTriggerClass(disabled),
		panelClass: resolveTooltipPanelClass({ radiusClass, state, injClass }),
		arrowClass: resolveTooltipArrowClass({ position, state }),
		inParams: resolveTooltipInParams(position),
		outParams: resolveTooltipOutParams(),
		panelStyleValue: resolveTooltipPanelStyleValue({ top, left, maxWidth, zIndex }),
		panelStyleString: resolveTooltipPanelStyleString({ top, left, maxWidth, zIndex })
	};
};
