import type { IconProps } from '../types/index.js';
import { actionSheetAlignObj, actionSheetImgRadiusObj, actionSheetStateObj, actionSheetTitleAlignObj } from './actionSheet.js';
import { joinClasses } from './helpers.js';

export const actionPopoverAlignObj = actionSheetAlignObj;
export const actionPopoverImgRadiusObj = actionSheetImgRadiusObj;
export const actionPopoverStateObj = actionSheetStateObj;
export const actionPopoverTitleAlignObj = actionSheetTitleAlignObj;

export const actionPopoverShadowObj = {
	none: 'shadow-none',
	xs: 'shadow-xs dark:shadow-white/5',
	sm: 'shadow-sm dark:shadow-white/5',
	md: 'shadow-md dark:shadow-white/10',
	lg: 'shadow-lg dark:shadow-white/10',
	xl: 'shadow-xl dark:shadow-white/10',
	'2xl': 'shadow-2xl dark:shadow-white/20'
} as const;

export const actionPopoverRadiusObj = {
	none: 'rounded-none',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	'4xl': 'rounded-4xl',
	full: 'rounded-full',
	'': 'rounded-(--radius-box)'
} as const;

export const actionPopoverGridColumnsObj = {
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-4'
} as const;

export const actionPopoverRingInDuration = 250;
export const actionPopoverRingOutDuration = 150;
export const actionPopoverRingEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';

export type ActionPopoverRingShape = 'auto' | 'full' | 'half' | 'quarter';
export type ActionPopoverComputedRingShape = Exclude<ActionPopoverRingShape, 'auto'>;
export type ActionPopoverDirection = 'up' | 'down';
export type ActionPopoverInlineAlign = 'left' | 'center' | 'right';
export type ActionPopoverInlineDirection = ActionPopoverDirection | 'auto';
export type ActionPopoverLayout = 'v' | 'h' | 'grid' | 'ring';
export type ActionPopoverInlineRadius = keyof typeof actionPopoverRadiusObj;
export type ActionPopoverInlineShadow = keyof typeof actionPopoverShadowObj;
export type ActionPopoverGridColumns = keyof typeof actionPopoverGridColumnsObj;
export type ActionPopoverAlign = keyof typeof actionPopoverAlignObj;
export type ActionPopoverTitleAlign = keyof typeof actionPopoverTitleAlignObj;
export type ActionPopoverImageRadius = keyof typeof actionPopoverImgRadiusObj;
export type ActionPopoverState = keyof typeof actionPopoverStateObj;

export type ActionPopoverRect = {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
};

export type ResolveActionPopoverRingLayoutOptions = {
	triggerRect: ActionPopoverRect;
	viewportWidth: number;
	viewportHeight: number;
	itemCount: number;
	ringShape?: ActionPopoverRingShape;
};

export type ResolveActionPopoverRingItemPositionOptions = {
	index: number;
	itemCount: number;
	ringShape: ActionPopoverComputedRingShape;
	startAngle: number;
	ringRadius?: number;
	ringItemSize?: number;
};

export type ResolveActionPopoverInlinePositionOptions = {
	triggerRect: ActionPopoverRect;
	panelWidth: number;
	panelHeight: number;
	viewportWidth: number;
	viewportHeight: number;
	inlineAlign?: ActionPopoverInlineAlign;
	inlineDirection?: ActionPopoverInlineDirection;
	inlineOffset?: number;
};

export type ResolveActionPopoverRingPositionStateOptions = ResolveActionPopoverRingLayoutOptions;

export type ResolveActionPopoverInlinePositionStateOptions = ResolveActionPopoverInlinePositionOptions;

export type ResolveActionPopoverMeasuredDimensionOptions = {
	measured?: number | null;
	fallback?: number | null;
};

export type ActionPopoverTriggerRefLike<TElement> =
	| TElement
	| {
			current?: TElement | null;
	  }
	| null
	| undefined;

export type ActionPopoverRingPositionState = {
	type: 'ring';
	ringPosition: {
		x: number;
		y: number;
	};
	computedRingShape: ActionPopoverComputedRingShape;
	ringStartAngle: number;
};

export type ActionPopoverInlinePositionState = {
	type: 'inline';
	inlinePosition: {
		top: number;
		left: number;
	};
	actualDirection: ActionPopoverDirection;
};

export type ActionPopoverIconStateItem = {
	icon?: {
		injClass?: string;
		state?: IconProps['state'];
	} | null;
	style?: IconProps['state'] | 'normal';
};

export type ActionPopoverIconClassLike = ActionPopoverIconStateItem['icon'];
export type ActionPopoverIconPropsFallback = Record<string, never>;

export type ActionPopoverActionDisabledItem = {
	disabled?: boolean;
};

export type ResolveActionPopoverActionContainerClassOptions = {
	layout?: ActionPopoverLayout;
	gridColumns?: number;
	inverse?: boolean;
};

export type ResolveActionPopoverActionLayoutClassOptions = {
	layout?: ActionPopoverLayout;
	inverse?: boolean;
};

export type ResolveActionPopoverActionButtonClassOptions = {
	disabled?: boolean;
	align?: ActionPopoverAlign;
	layout?: ActionPopoverLayout;
	inverse?: boolean;
};

export type ResolveActionPopoverActionContentClassOptions = {
	style?: ActionPopoverState | string;
	desc?: unknown;
};

export type ResolveActionPopoverPanelClassOptions = {
	inverse?: boolean;
	inlineRadius?: ActionPopoverInlineRadius | string;
	inlineShadow?: ActionPopoverInlineShadow | string;
};

export type ResolveActionPopoverRingButtonClassOptions = {
	inverse?: boolean;
	inlineShadow?: ActionPopoverInlineShadow | string;
	disabled?: boolean;
};

export type ResolveActionPopoverTitleClassOptions = {
	inverse?: boolean;
	titleAlign?: ActionPopoverTitleAlign;
};

export type ResolveActionPopoverCancelButtonClassOptions = {
	inverse?: boolean;
	align?: ActionPopoverAlign;
};

export type ResolveActionPopoverImageClassOptions = {
	imgRadius?: ActionPopoverImageRadius | string;
};

export type ResolveActionPopoverActionViewStateOptions = {
	item?: ActionPopoverIconStateItem &
		ActionPopoverActionDisabledItem & {
			desc?: unknown;
			imgRadius?: ActionPopoverImageRadius | string;
			showImg?: unknown;
		};
	align?: ActionPopoverAlign;
	layout?: ActionPopoverLayout;
	inverse?: boolean;
	index?: number;
	total?: number;
};

export type ActionPopoverActionViewState = {
	buttonClass: string;
	contentClass: string;
	descClass: string;
	dividerClass: string;
	disabled: boolean;
	iconInjClass: string;
	iconState: IconProps['state'] | undefined;
	imageClass: string;
	imageInnerClass: string;
	showDesc: boolean;
	showDivider: boolean;
	showIcon: boolean;
	showImage: boolean;
};

export type ActionPopoverActionViewStateItem<TItem> = ActionPopoverActionViewState & {
	item: TItem;
};

export type ResolveActionPopoverActionViewStateListOptions<TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem> = {
	items: readonly TItem[];
	align?: ActionPopoverAlign;
	layout?: ActionPopoverLayout;
	inverse?: boolean;
};

export type ResolveActionPopoverInlinePanelStyleOptions = {
	left: number;
	positionReady?: boolean;
	top: number;
	transformOrigin: string;
};

export type ActionPopoverInlinePanelStyleValue = {
	left: number;
	top: number;
	transformOrigin: string;
	visibility: 'visible' | 'hidden';
};

export type ActionPopoverRingPanelStyleValue = {
	left: number;
	top: number;
	transform: string;
};

export type ActionPopoverRingItemPosition = {
	x: number;
	y: number;
};

export type ActionPopoverRingItemStyleValue = {
	height: number;
	left: number;
	opacity: number;
	top: number;
	transform: string;
	transitionDuration?: string;
	transitionTimingFunction?: string;
	width: number;
};

export type ResolveActionPopoverRingPanelStyleOptions = {
	x?: number;
	y?: number;
};

export type ResolveActionPopoverRingItemStyleOptions = {
	position: ActionPopoverRingItemPosition;
	ringItemSize?: number;
	animate?: boolean;
	disabled?: boolean;
	transitionDurationMs?: number;
	transitionTimingFunction?: string;
};

export type ResolveActionPopoverVisibleOptions = {
	hiddenByViewport?: boolean;
	innerVisible?: boolean;
	visible?: boolean;
};

export type ResolveActionPopoverVisibilityOptions = {
	hiddenByViewport?: boolean;
	visible?: boolean;
};

export type ResolveActionPopoverViewportActionOptions = {
	hiddenByViewport?: boolean;
	triggerInViewport?: boolean;
};

export type ActionPopoverViewportAction = 'hideForViewport' | 'restoreFromViewport' | 'updatePosition';

export type ActionPopoverViewportCommitAction = {
	nextHiddenByViewport: boolean;
	shouldChange: boolean;
};

export type ResolveActionPopoverRenderActionOptions = {
	layout?: ActionPopoverLayout;
	positionReady?: boolean;
	shouldRender?: boolean;
	visible?: boolean;
};

export type ActionPopoverRenderActionKind = 'open' | 'ringCloseDelay' | 'keepInlineOutro' | 'closed';

export type ActionPopoverRenderAction = {
	kind: ActionPopoverRenderActionKind;
	nextPositionReady: boolean;
	nextRingAnimate: boolean;
	nextShouldRender: boolean;
	ringCloseDelayMs: number;
	shouldSchedulePosition: boolean;
	shouldScheduleRingClose: boolean;
};

export type ActionPopoverRingCloseCompleteAction = {
	nextPositionReady: false;
	nextShouldRender: false;
};

export type ActionPopoverInlineCloseCompleteAction = {
	nextPositionReady: false;
	nextShouldRender: false;
};

export type ActionPopoverCancelAction = {
	nextVisible: false;
	shouldCancel: true;
	shouldClose: true;
};

export type ResolveActionPopoverCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};

export type ActionPopoverCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type ResolveActionPopoverActionClickActionOptions<TAction extends ActionPopoverActionDisabledItem> = {
	action: TAction;
	actionClosable?: boolean;
	index: number;
};

export type ActionPopoverActionClickAction<TAction> = {
	action: TAction;
	index: number;
	nextVisible: false;
	shouldClose: boolean;
	shouldSelect: boolean;
};

export type ActionPopoverActionClickFlow<TAction> = ActionPopoverActionClickAction<TAction> & {
	closeAction: ActionPopoverCloseAction;
};

export type ResolveActionPopoverRingItemDerivedOptions<TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem> = {
	item: TItem;
	index: number;
	itemCount: number;
	ringShape: ActionPopoverComputedRingShape;
	startAngle: number;
	ringRadius?: number;
	ringItemSize?: number;
	inverse?: boolean;
	inlineShadow?: ActionPopoverInlineShadow | string;
	animate?: boolean;
	transitionDurationMs?: number;
	transitionTimingFunction?: string;
};

export type ActionPopoverRingItemDerived = {
	buttonClass: string;
	disabled: boolean;
	iconInjClass: string;
	iconState?: IconProps['state'];
	position: ActionPopoverRingItemPosition;
	style: ActionPopoverRingItemStyleValue;
	styleString: string;
};

export type ActionPopoverRingItemDerivedItem<TItem> = ActionPopoverRingItemDerived & {
	item: TItem;
};

export type ResolveActionPopoverRingItemDerivedListOptions<TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem> = {
	items: readonly TItem[];
	ringShape: ActionPopoverComputedRingShape;
	startAngle: number;
	ringRadius?: number;
	ringItemSize?: number;
	inverse?: boolean;
	inlineShadow?: ActionPopoverInlineShadow | string;
	animate?: boolean;
	transitionDurationMs?: number;
	transitionTimingFunction?: string;
};

export type ActionPopoverTransitionBaseParams = {
	duration: number;
	opacity: number;
	start: number;
};

export type ActionPopoverRingFlyParams = {
	duration: number;
	opacity: number;
	x: number;
	y: number;
};

export type ActionPopoverInlinePositionValue = {
	left: number;
	top: number;
};

export type ResolveActionPopoverDerivedOptions<
	TAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem,
	TRingAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem
> = {
	actions?: readonly TAction[];
	actualDirection?: ActionPopoverDirection;
	align?: ActionPopoverAlign;
	computedRingShape?: ActionPopoverComputedRingShape;
	gridColumns?: number;
	inlineAlign?: ActionPopoverInlineAlign;
	inlinePosition?: ActionPopoverInlinePositionValue;
	inlineRadius?: ActionPopoverInlineRadius | string;
	inlineShadow?: ActionPopoverInlineShadow | string;
	innerVisible?: boolean;
	inverse?: boolean;
	layout?: ActionPopoverLayout;
	hiddenByViewport?: boolean;
	positionReady?: boolean;
	ringActions?: readonly TRingAction[];
	ringAnimate?: boolean;
	ringItemSize?: number;
	ringPosition?: ActionPopoverRingPositionState['ringPosition'];
	ringRadius?: number;
	ringStartAngle?: number;
	showCancel?: boolean;
	title?: string;
	titleAlign?: ActionPopoverTitleAlign;
	visible?: boolean;
};

export type ActionPopoverStatePropsLike<
	TAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem,
	TRingAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem
> = Partial<
	Omit<
		ResolveActionPopoverDerivedOptions<TAction, TRingAction>,
		| 'actualDirection'
		| 'computedRingShape'
		| 'inlinePosition'
		| 'hiddenByViewport'
		| 'innerVisible'
		| 'positionReady'
		| 'ringAnimate'
		| 'ringPosition'
		| 'ringStartAngle'
	>
>;

export type ResolveActionPopoverStateOptionsParams<
	TAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem,
	TRingAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem
> = {
	actualDirection?: ActionPopoverDirection;
	computedRingShape?: ActionPopoverComputedRingShape;
	hiddenByViewport?: boolean;
	inlinePosition?: ActionPopoverInlinePositionValue;
	innerVisible?: boolean;
	positionReady?: boolean;
	props: ActionPopoverStatePropsLike<TAction, TRingAction>;
	ringAnimate?: boolean;
	ringPosition?: ActionPopoverRingPositionState['ringPosition'];
	ringStartAngle?: number;
};

export type ActionPopoverRingRenderItem<TItem> = ActionPopoverRingItemDerivedItem<TItem> & {
	inParams: ActionPopoverRingFlyParams;
	outParams: ActionPopoverRingFlyParams;
};

export type ActionPopoverDerived<TAction, TRingAction> = {
	actionContainerClass: string;
	actionViewStates: ActionPopoverActionViewStateItem<TAction>[];
	cancelButtonClass: string;
	cancelDividerClass: string;
	inlineInParams: ActionPopoverTransitionBaseParams;
	inlineOutParams: ActionPopoverTransitionBaseParams;
	inlinePanelClass: string;
	inlinePanelStyleString: string;
	inlinePanelStyleValue: ActionPopoverInlinePanelStyleValue;
	inlineVisible: boolean;
	ringItemDerivedList: ActionPopoverRingRenderItem<TRingAction>[];
	ringPanelClass: string;
	ringPanelStyleString: string;
	ringPanelStyleValue: ActionPopoverRingPanelStyleValue;
	ringTransitionDuration: number;
	ringVisible: boolean;
	showCancel: boolean;
	showTitle: boolean;
	titleClass: string;
	transformOrigin: string;
	visible: boolean;
};

const resolveActionPopoverRingShape = (itemCount: number, ringShape: ActionPopoverRingShape = 'auto'): ActionPopoverComputedRingShape => {
	if (ringShape !== 'auto') return ringShape;
	if (itemCount <= 3) return 'quarter';
	if (itemCount <= 5) return 'half';
	return 'full';
};

// 输入 DOM 测量结果和环形配置，返回框架无关的环形布局参数。
// Resolve measured DOM rects and ring config into framework-agnostic ring layout data.
export const resolveActionPopoverRingLayout = ({
	triggerRect,
	viewportWidth,
	viewportHeight,
	itemCount,
	ringShape = 'auto'
}: ResolveActionPopoverRingLayoutOptions) => {
	const triggerCenterX = triggerRect.left + triggerRect.width / 2;
	const triggerCenterY = triggerRect.top + triggerRect.height / 2;
	const isLeft = triggerCenterX < viewportWidth / 2;
	const isTop = triggerCenterY < viewportHeight / 2;
	const computedRingShape = resolveActionPopoverRingShape(itemCount, ringShape);
	let startAngle = 0;

	if (computedRingShape === 'quarter') {
		if (isTop && isLeft) startAngle = 0;
		else if (isTop && !isLeft) startAngle = 90;
		else if (!isTop && !isLeft) startAngle = 180;
		else startAngle = 270;
	} else if (computedRingShape === 'half') {
		startAngle = isTop ? 0 : 180;
	}

	return {
		ringPosition: { x: triggerCenterX, y: triggerCenterY },
		computedRingShape,
		ringStartAngle: startAngle
	};
};

export const resolveActionPopoverRingItemPosition = ({
	index,
	itemCount,
	ringShape,
	startAngle,
	ringRadius = 0,
	ringItemSize = 44
}: ResolveActionPopoverRingItemPositionOptions) => {
	const radius = ringRadius || Math.max(60, ringItemSize * 1.5);
	const angleSpan = ringShape === 'quarter' ? 90 : ringShape === 'half' ? 180 : 360;
	const angleStep = itemCount > 1 ? angleSpan / (itemCount - 1 + (ringShape === 'full' ? 1 : 0)) : 0;
	const angle = startAngle + index * angleStep;
	const radian = (angle * Math.PI) / 180;
	return {
		x: Math.cos(radian) * radius,
		y: Math.sin(radian) * radius
	};
};

// 只处理 inline 位置计算，不读取 window 或元素引用。
// Only calculate inline position without reading window or element refs.
export const resolveActionPopoverInlinePosition = ({
	triggerRect,
	panelWidth,
	panelHeight,
	viewportWidth,
	viewportHeight,
	inlineAlign = 'center',
	inlineDirection = 'auto',
	inlineOffset = 8
}: ResolveActionPopoverInlinePositionOptions) => {
	let actualDirection: ActionPopoverDirection;
	if (inlineDirection === 'auto') {
		const triggerCenter = triggerRect.top + triggerRect.height / 2;
		actualDirection = triggerCenter > viewportHeight / 2 ? 'up' : 'down';
	} else {
		actualDirection = inlineDirection;
	}

	let top = actualDirection === 'down' ? triggerRect.bottom + inlineOffset : triggerRect.top - panelHeight;
	if (actualDirection === 'down' && top + panelHeight > viewportHeight - 8) {
		actualDirection = 'up';
		top = triggerRect.top - panelHeight;
	} else if (actualDirection === 'up' && top < 8) {
		actualDirection = 'down';
		top = triggerRect.bottom + inlineOffset;
	}

	let left = triggerRect.left + (triggerRect.width - panelWidth) / 2;
	if (inlineAlign === 'left') {
		left = triggerRect.left;
	} else if (inlineAlign === 'right') {
		left = triggerRect.right - panelWidth;
	}

	left = Math.max(8, Math.min(left, viewportWidth - panelWidth - 8));
	return { top, left, actualDirection };
};

// 输入组件层测量到的主尺寸和备用尺寸，返回定位计算可使用的尺寸。
// Normalize component-measured primary and fallback dimensions into a positioning size.
export const resolveActionPopoverMeasuredDimension = ({ measured, fallback }: ResolveActionPopoverMeasuredDimensionOptions = {}): number =>
	measured || fallback || 0;

// 输入触发元素或 ref-like 对象，返回组件层可读取布局的元素。
// Receive a trigger element or ref-like object and return the element that component code can measure.
export const resolveActionPopoverTriggerElement = <TElement>(triggerRef?: ActionPopoverTriggerRefLike<TElement>): TElement | null => {
	if (!triggerRef) return null;
	if (typeof triggerRef === 'object' && 'current' in triggerRef) return triggerRef.current ?? null;
	return triggerRef as TElement;
};

// 输入测量后的布局数据，返回组件层可直接写入状态的环形位置派生。
// Resolve measured layout data into ring position state that components can assign directly.
export const resolveActionPopoverRingPositionState = (
	options: ResolveActionPopoverRingPositionStateOptions
): ActionPopoverRingPositionState => ({
	type: 'ring',
	...resolveActionPopoverRingLayout(options)
});

// 输入测量后的布局数据，返回组件层可直接写入状态的 inline 位置派生。
// Resolve measured layout data into inline position state that components can assign directly.
export const resolveActionPopoverInlinePositionState = (
	options: ResolveActionPopoverInlinePositionStateOptions
): ActionPopoverInlinePositionState => {
	const { top, left, actualDirection } = resolveActionPopoverInlinePosition(options);
	return {
		type: 'inline',
		inlinePosition: { top, left },
		actualDirection
	};
};

export const resolveActionPopoverTransformOrigin = (direction: ActionPopoverDirection, align: ActionPopoverInlineAlign): string =>
	`${direction === 'down' ? 'top' : 'bottom'} ${align}`;

export const resolveActionPopoverIconState = (item: ActionPopoverIconStateItem): IconProps['state'] | undefined =>
	item.icon?.state || (item.style && item.style !== 'normal' ? item.style : undefined);

// 输入图标配置，返回组件层可直接绑定的注入 class。
// Normalize icon config into a bind-ready injected class for the component layer.
export const resolveActionPopoverIconInjClass = (icon?: ActionPopoverIconClassLike): string => icon?.injClass || '';

// 输入操作项图标配置，返回组件层可安全展开绑定的 props 对象。
// Normalize action icon config into a props object that component layers can safely spread or bind.
export const resolveActionPopoverIconProps = <TIcon extends object>(icon?: TIcon | null): TIcon | ActionPopoverIconPropsFallback =>
	icon ?? {};

// 输入操作项状态，返回组件层可直接使用的禁用标记。
// Resolve action item state into a disabled flag for component usage.
export const resolveActionPopoverActionDisabled = (item: ActionPopoverActionDisabledItem = {}): boolean => Boolean(item.disabled);

// 输入取消动作，返回框架无关的关闭与回调决策。
// Resolve a cancel action into framework-agnostic close and callback decisions.
export const resolveActionPopoverCancelAction = (): ActionPopoverCancelAction => ({
	nextVisible: false,
	shouldCancel: true,
	shouldClose: true
});

// 输入 ActionPopover 关闭请求，返回组件层可写入的关闭动作。
// Receive an ActionPopover close request and return a close action for the component layer.
export const resolveActionPopoverCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveActionPopoverCloseActionOptions = {}): ActionPopoverCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入操作项和关闭策略，返回组件层可消费的点击动作结果。
// Consume an action item and close policy, then return the click action result for component usage.
export const resolveActionPopoverActionClickAction = <TAction extends ActionPopoverActionDisabledItem>({
	action,
	actionClosable = true,
	index
}: ResolveActionPopoverActionClickActionOptions<TAction>): ActionPopoverActionClickAction<TAction> => {
	const shouldSelect = !resolveActionPopoverActionDisabled(action);
	return {
		action,
		index,
		nextVisible: false,
		shouldClose: shouldSelect && actionClosable,
		shouldSelect
	};
};

// 输入操作项点击状态，返回选择动作和对应关闭动作，不执行事件回调。
// Receive action-click state and return selection plus close actions without executing callbacks.
export const resolveActionPopoverActionClickFlow = <TAction extends ActionPopoverActionDisabledItem>(
	options: ResolveActionPopoverActionClickActionOptions<TAction>
): ActionPopoverActionClickFlow<TAction> => {
	const action = resolveActionPopoverActionClickAction(options);
	return {
		...action,
		closeAction: resolveActionPopoverCloseAction({ shouldClose: action.shouldClose })
	};
};

// 输入受控可见值、内部状态和视口隐藏状态，返回组件层实际可见状态。
// Resolve controlled visible value, internal state and viewport-hidden state into the effective component visibility.
export const resolveActionPopoverVisible = ({
	visible,
	innerVisible = false,
	hiddenByViewport = false
}: ResolveActionPopoverVisibleOptions = {}): boolean => !hiddenByViewport && (visible === undefined ? innerVisible : Boolean(visible));

export const resolveActionPopoverInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入可见状态和视口隐藏状态，返回组件层是否需要绑定全局监听。
// Resolve visibility and viewport-hidden state into whether global listeners should be bound.
export const resolveActionPopoverShouldBindGlobalListeners = ({
	visible = false,
	hiddenByViewport = false
}: ResolveActionPopoverVisibilityOptions = {}): boolean => visible || hiddenByViewport;

// 输入可见状态和视口隐藏状态，返回视口检测时是否需要隐藏。
// Resolve visibility and viewport-hidden state into whether viewport checks should hide the popover.
export const resolveActionPopoverShouldHideForViewport = ({
	visible = false,
	hiddenByViewport = false
}: ResolveActionPopoverVisibilityOptions = {}): boolean => visible && !hiddenByViewport;

// 输入视口隐藏状态和触发器可见性，返回是否允许恢复显示。
// Resolve viewport-hidden and trigger visibility state into whether the popover may be restored.
export const resolveActionPopoverShouldRestoreFromViewport = ({
	hiddenByViewport = false,
	triggerInViewport = false
}: ResolveActionPopoverViewportActionOptions = {}): boolean => hiddenByViewport && triggerInViewport;

// 输入视口检测隐藏状态，返回组件层可写入的隐藏动作。
// Receive viewport-hide state and return a hide action that the component layer can write.
export const resolveActionPopoverHideForViewportAction = ({
	visible = false,
	hiddenByViewport = false
}: ResolveActionPopoverVisibilityOptions = {}): ActionPopoverViewportCommitAction => {
	const shouldChange = resolveActionPopoverShouldHideForViewport({ visible, hiddenByViewport });
	return {
		nextHiddenByViewport: shouldChange ? true : hiddenByViewport,
		shouldChange
	};
};

// 输入视口恢复状态，返回组件层可写入的恢复显示动作。
// Receive viewport-restore state and return a restore action that the component layer can write.
export const resolveActionPopoverRestoreFromViewportAction = (
	options: ResolveActionPopoverViewportActionOptions = {}
): ActionPopoverViewportCommitAction => {
	const shouldChange = resolveActionPopoverShouldRestoreFromViewport(options);
	return {
		nextHiddenByViewport: shouldChange ? false : Boolean(options.hiddenByViewport),
		shouldChange
	};
};

// 输入视口检测状态，返回组件层需要执行的下一步动作。
// Receive viewport detection state and return the next action for the component layer.
export const resolveActionPopoverViewportAction = ({
	hiddenByViewport = false,
	triggerInViewport = false
}: ResolveActionPopoverViewportActionOptions = {}): ActionPopoverViewportAction => {
	if (!triggerInViewport) return 'hideForViewport';
	if (hiddenByViewport) return 'restoreFromViewport';
	return 'updatePosition';
};

export const resolveActionPopoverTriggerInViewport = ({
	triggerRect,
	viewportWidth,
	viewportHeight
}: {
	triggerRect: ActionPopoverRect;
	viewportWidth: number;
	viewportHeight: number;
}) =>
	triggerRect.width > 0 &&
	triggerRect.height > 0 &&
	triggerRect.bottom > 0 &&
	triggerRect.right > 0 &&
	triggerRect.top < viewportHeight &&
	triggerRect.left < viewportWidth;

// 输入可见性和布局状态，返回框架无关的渲染生命周期动作。
// Receive visibility and layout state, then return a framework-agnostic render lifecycle action.
export const resolveActionPopoverRenderAction = ({
	layout = 'v',
	positionReady = false,
	shouldRender = false,
	visible = false
}: ResolveActionPopoverRenderActionOptions = {}): ActionPopoverRenderAction => {
	if (visible) {
		return {
			kind: 'open',
			nextPositionReady: false,
			nextRingAnimate: false,
			nextShouldRender: true,
			ringCloseDelayMs: actionPopoverRingOutDuration,
			shouldSchedulePosition: true,
			shouldScheduleRingClose: false
		};
	}

	if (layout === 'ring' && shouldRender) {
		return {
			kind: 'ringCloseDelay',
			nextPositionReady: positionReady,
			nextRingAnimate: false,
			nextShouldRender: true,
			ringCloseDelayMs: actionPopoverRingOutDuration,
			shouldSchedulePosition: false,
			shouldScheduleRingClose: true
		};
	}

	if (layout !== 'ring' && shouldRender && positionReady) {
		return {
			kind: 'keepInlineOutro',
			nextPositionReady: positionReady,
			nextRingAnimate: false,
			nextShouldRender: shouldRender,
			ringCloseDelayMs: actionPopoverRingOutDuration,
			shouldSchedulePosition: false,
			shouldScheduleRingClose: false
		};
	}

	return {
		kind: 'closed',
		nextPositionReady: false,
		nextRingAnimate: false,
		nextShouldRender: false,
		ringCloseDelayMs: actionPopoverRingOutDuration,
		shouldSchedulePosition: false,
		shouldScheduleRingClose: false
	};
};

// 输入环形关闭延迟结束信号，返回组件层可写入的收尾状态。
// Receive the ring close-delay completion signal and return final state for the component layer.
export const resolveActionPopoverRingCloseCompleteAction = (): ActionPopoverRingCloseCompleteAction => ({
	nextPositionReady: false,
	nextShouldRender: false
});

// 输入 inline 关闭过渡结束信号，返回组件层可写入的收尾状态。
// Receive the inline close-transition completion signal and return final state for the component layer.
export const resolveActionPopoverInlineCloseCompleteAction = (): ActionPopoverInlineCloseCompleteAction => ({
	nextPositionReady: false,
	nextShouldRender: false
});

export const resolveActionPopoverRingTransform = (x: number, y: number, animate: boolean): string =>
	animate ? 'translate(-50%, -50%)' : `translate(-50%, -50%) translate(${-x}px, ${-y}px)`;

// 输入环形面板中心点，返回组件层可直接绑定的定位样式。
// Resolve the ring panel center into positioning styles that components can bind directly.
export const resolveActionPopoverRingPanelStyleValue = ({
	x = 0,
	y = 0
}: ResolveActionPopoverRingPanelStyleOptions = {}): ActionPopoverRingPanelStyleValue => ({
	top: y,
	left: x,
	transform: 'translate(-50%, -50%)'
});

export const resolveActionPopoverRingPanelStyleString = (options: ResolveActionPopoverRingPanelStyleOptions = {}) => {
	const style = resolveActionPopoverRingPanelStyleValue(options);
	return `top: ${style.top}px; left: ${style.left}px; transform: ${style.transform};`;
};

// 输入环形操作项位置和动画状态，返回框架无关的按钮定位样式。
// Resolve ring action position and animation state into framework-agnostic button styles.
export const resolveActionPopoverRingItemStyleValue = ({
	position,
	ringItemSize = 44,
	animate = true,
	disabled = false,
	transitionDurationMs,
	transitionTimingFunction
}: ResolveActionPopoverRingItemStyleOptions): ActionPopoverRingItemStyleValue => {
	const style: ActionPopoverRingItemStyleValue = {
		width: ringItemSize,
		height: ringItemSize,
		left: position.x,
		opacity: animate ? (disabled ? 0.4 : 1) : 0,
		top: position.y,
		transform: resolveActionPopoverRingTransform(position.x, position.y, animate)
	};
	if (transitionDurationMs !== undefined) {
		style.transitionDuration = `${transitionDurationMs}ms`;
	}
	if (transitionTimingFunction) {
		style.transitionTimingFunction = transitionTimingFunction;
	}
	return style;
};

export const resolveActionPopoverRingItemStyleString = (options: ResolveActionPopoverRingItemStyleOptions): string => {
	const style = resolveActionPopoverRingItemStyleValue(options);
	return [
		`width: ${style.width}px`,
		`height: ${style.height}px`,
		`left: ${style.left}px`,
		`opacity: ${style.opacity}`,
		`top: ${style.top}px`,
		`transform: ${style.transform}`,
		style.transitionDuration ? `transition-duration: ${style.transitionDuration}` : '',
		style.transitionTimingFunction ? `transition-timing-function: ${style.transitionTimingFunction}` : ''
	]
		.filter(Boolean)
		.join('; ');
};

// 输入环形操作项状态，返回组件层渲染需要的纯派生结果。
// Resolve a ring action item into pure render data for the component layer.
export const resolveActionPopoverRingItemDerived = <TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem>({
	item,
	index,
	itemCount,
	ringShape,
	startAngle,
	ringRadius,
	ringItemSize,
	inverse,
	inlineShadow,
	animate,
	transitionDurationMs,
	transitionTimingFunction
}: ResolveActionPopoverRingItemDerivedOptions<TItem>): ActionPopoverRingItemDerived => {
	const position = resolveActionPopoverRingItemPosition({ index, itemCount, ringShape, startAngle, ringRadius, ringItemSize });
	const disabled = resolveActionPopoverActionDisabled(item);
	const style = resolveActionPopoverRingItemStyleValue({
		position,
		ringItemSize,
		animate,
		disabled,
		transitionDurationMs,
		transitionTimingFunction
	});
	return {
		position,
		disabled,
		iconInjClass: resolveActionPopoverIconInjClass(item.icon),
		iconState: resolveActionPopoverIconState(item),
		buttonClass: resolveActionPopoverRingButtonClass({ inverse, inlineShadow, disabled }),
		style,
		styleString: resolveActionPopoverRingItemStyleString({
			position,
			ringItemSize,
			animate,
			disabled,
			transitionDurationMs,
			transitionTimingFunction
		})
	};
};

// 输入环形操作项列表和环形状态，返回组件层可直接渲染的无框架列表。
// Receive ring action items and ring state, then return a framework-agnostic render list for components.
export const resolveActionPopoverRingItemDerivedList = <TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem>({
	items,
	ringShape,
	startAngle,
	ringRadius,
	ringItemSize,
	inverse,
	inlineShadow,
	animate,
	transitionDurationMs,
	transitionTimingFunction
}: ResolveActionPopoverRingItemDerivedListOptions<TItem>): ActionPopoverRingItemDerivedItem<TItem>[] =>
	items.map((item, index) => ({
		item,
		...resolveActionPopoverRingItemDerived({
			item,
			index,
			itemCount: items.length,
			ringShape,
			startAngle,
			ringRadius,
			ringItemSize,
			inverse,
			inlineShadow,
			animate,
			transitionDurationMs,
			transitionTimingFunction
		})
	}));

export const resolveActionPopoverRingTransitionDuration = (animate = false): number =>
	animate ? actionPopoverRingInDuration : actionPopoverRingOutDuration;

// 输入环形操作项位置和阶段，返回无框架的飞入飞出动画参数。
// Receive ring item position and phase, then return framework-agnostic fly transition params.
export const resolveActionPopoverRingFlyParams = ({
	position,
	phase = 'in'
}: {
	position: ActionPopoverRingItemPosition;
	phase?: 'in' | 'out';
}): ActionPopoverRingFlyParams => ({
	duration: phase === 'in' ? actionPopoverRingInDuration : actionPopoverRingOutDuration,
	x: -position.x,
	y: -position.y,
	opacity: 0
});

export const resolveActionPopoverInlineInParams = (): ActionPopoverTransitionBaseParams => ({
	duration: 200,
	start: 0.5,
	opacity: 0
});

export const resolveActionPopoverInlineOutParams = (): ActionPopoverTransitionBaseParams => ({
	duration: 150,
	start: 0.5,
	opacity: 0
});

// 输入 inline 面板状态，返回框架无关的定位 style。
// Consume inline panel state and return framework-agnostic positioning styles.
export const resolveActionPopoverInlinePanelStyleValue = ({
	top,
	left,
	transformOrigin,
	positionReady = false
}: ResolveActionPopoverInlinePanelStyleOptions): ActionPopoverInlinePanelStyleValue => ({
	top,
	left,
	transformOrigin,
	visibility: positionReady ? 'visible' : 'hidden'
});

export const resolveActionPopoverInlinePanelStyleString = (options: ResolveActionPopoverInlinePanelStyleOptions): string => {
	const style = resolveActionPopoverInlinePanelStyleValue(options);
	return `top: ${style.top}px; left: ${style.left}px; transform-origin: ${style.transformOrigin}; visibility: ${style.visibility};`;
};

// 输入组件状态，返回框架无关的配色 class。
// Consume component state and return framework-agnostic color classes.
export const resolveActionPopoverThemeClasses = (inverse = false) => ({
	panel: inverse
		? 'bg-bg-surface-dark dark:bg-bg-surface border-white/10 dark:border-black/5 text-text-dark dark:text-text-primary'
		: 'bg-bg-surface dark:bg-bg-surface-dark border-black/5 dark:border-white/10',
	title: inverse
		? 'text-text-dark/60 dark:text-text-primary/60 border-white/10 dark:border-black/5'
		: 'text-black/50 dark:text-white/50 border-black/5 dark:border-white/5',
	desc: inverse ? 'text-text-dark/60 dark:text-text-primary/60' : 'text-black/50 dark:text-white/40',
	divider: inverse ? 'bg-white/10 dark:bg-black/10' : 'bg-black/5 dark:bg-white/5',
	divide: inverse ? 'divide-white/10 dark:divide-black/10' : 'divide-black/5 dark:divide-white/5',
	active: inverse ? 'active:bg-text-dark/10 dark:active:bg-text-primary/10' : 'active:bg-black/5 dark:active:bg-white/5',
	itemBg: inverse ? 'bg-bg-surface-dark dark:bg-bg-surface' : 'bg-bg-surface dark:bg-bg-surface-dark'
});

export const resolveActionPopoverShadowClass = (inlineShadow: ActionPopoverInlineShadow | string = 'md') =>
	actionPopoverShadowObj[inlineShadow as ActionPopoverInlineShadow] || actionPopoverShadowObj.md;

export const resolveActionPopoverInlineRadiusClass = (inlineRadius: ActionPopoverInlineRadius | string = '') =>
	inlineRadius ? actionPopoverRadiusObj[inlineRadius as ActionPopoverInlineRadius] || 'rounded-(--radius-box)' : 'rounded-(--radius-box)';

export const resolveActionPopoverPanelClass = ({
	inverse = false,
	inlineRadius = '',
	inlineShadow = 'md'
}: ResolveActionPopoverPanelClassOptions) =>
	joinClasses([
		'fixed z-50 inline-block overflow-hidden border',
		resolveActionPopoverThemeClasses(inverse).panel,
		resolveActionPopoverInlineRadiusClass(inlineRadius),
		resolveActionPopoverShadowClass(inlineShadow)
	]);

// 输入环形面板结构状态，返回框架无关的固定定位 class。
// Consume ring panel structure state and return the framework-agnostic fixed-position class.
export const resolveActionPopoverRingPanelClass = (): string => 'fixed z-50';

export const resolveActionPopoverTitleClass = ({ inverse = false, titleAlign = 'left' }: ResolveActionPopoverTitleClassOptions) =>
	joinClasses([
		'flex h-10 flex-col justify-center whitespace-nowrap border-b px-4 text-xs',
		resolveActionPopoverThemeClasses(inverse).title,
		actionPopoverTitleAlignObj[titleAlign] || actionPopoverTitleAlignObj.left
	]);

export const resolveActionPopoverActionContainerClass = ({
	layout = 'v',
	gridColumns = 3,
	inverse = false
}: ResolveActionPopoverActionContainerClassOptions) => {
	const themeClasses = resolveActionPopoverThemeClasses(inverse);
	if (layout === 'grid') {
		return joinClasses([
			'grid',
			actionPopoverGridColumnsObj[gridColumns as ActionPopoverGridColumns] || actionPopoverGridColumnsObj[3],
			'gap-px',
			themeClasses.divider
		]);
	}
	if (layout === 'h') {
		return joinClasses(['flex items-stretch divide-x', themeClasses.divide]);
	}
	return '';
};

export const resolveActionPopoverActionLayoutClass = ({ layout = 'v', inverse = false }: ResolveActionPopoverActionLayoutClassOptions) => {
	if (layout === 'grid') return joinClasses(['w-full', resolveActionPopoverThemeClasses(inverse).itemBg]);
	if (layout === 'h') return 'flex-1';
	return '';
};

export const resolveActionPopoverActionButtonClass = ({
	disabled = false,
	align = 'center',
	layout = 'v',
	inverse = false
}: ResolveActionPopoverActionButtonClassOptions) =>
	joinClasses([
		'flex items-center gap-2 whitespace-nowrap px-4 transition-all',
		disabled ? 'cursor-not-allowed opacity-40' : resolveActionPopoverThemeClasses(inverse).active,
		actionPopoverAlignObj[align] || actionPopoverAlignObj.center,
		resolveActionPopoverActionLayoutClass({ layout, inverse })
	]);

export const resolveActionPopoverActionContentClass = ({ style = 'normal', desc = '' }: ResolveActionPopoverActionContentClassOptions) =>
	joinClasses([
		actionPopoverStateObj[style as ActionPopoverState] || actionPopoverStateObj.normal,
		'flex flex-col justify-center',
		desc ? 'h-10' : 'h-12'
	]);

// 输入 ActionPopover 反色状态，返回框架无关的描述文字 class。
// Receive ActionPopover inverse state and return a framework-agnostic description class.
export const resolveActionPopoverDescClass = (inverse = false): string =>
	joinClasses(['text-xs', resolveActionPopoverThemeClasses(inverse).desc]);

export const resolveActionPopoverImageClass = ({ imgRadius }: ResolveActionPopoverImageClassOptions) =>
	joinClasses([
		'h-6 w-6 overflow-hidden',
		(imgRadius && actionPopoverImgRadiusObj[imgRadius as ActionPopoverImageRadius]) || 'rounded-full'
	]);

export const resolveActionPopoverImageInnerClass = (): string => 'h-full w-full object-cover';

// 输入 ActionPopover 普通操作项状态，返回框架无关的展示分支和派生 class。
// Resolve a regular ActionPopover action into framework-agnostic display branches and derived classes.
export const resolveActionPopoverActionViewState = ({
	item = {},
	align = 'center',
	layout = 'v',
	inverse = false,
	index = 0,
	total = 0
}: ResolveActionPopoverActionViewStateOptions = {}): ActionPopoverActionViewState => {
	const disabled = resolveActionPopoverActionDisabled(item);
	const showIcon = Boolean(item.icon);

	return {
		buttonClass: resolveActionPopoverActionButtonClass({ disabled, align, layout, inverse }),
		contentClass: resolveActionPopoverActionContentClass({ style: item.style, desc: item.desc }),
		descClass: resolveActionPopoverDescClass(inverse),
		dividerClass: resolveActionPopoverVerticalDividerClass(inverse),
		disabled,
		iconInjClass: resolveActionPopoverIconInjClass(item.icon),
		iconState: resolveActionPopoverIconState(item),
		imageClass: resolveActionPopoverImageClass({ imgRadius: item.imgRadius }),
		imageInnerClass: resolveActionPopoverImageInnerClass(),
		showDesc: Boolean(item.desc),
		showDivider: layout === 'v' && index !== total - 1,
		showIcon,
		showImage: !showIcon && Boolean(item.showImg)
	};
};

// 输入普通操作项列表，返回组件层可直接渲染的无框架列表。
// Receive regular action items and return a framework-agnostic render list for components.
export const resolveActionPopoverActionViewStateList = <TItem extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem>({
	items,
	align = 'center',
	layout = 'v',
	inverse = false
}: ResolveActionPopoverActionViewStateListOptions<TItem>): ActionPopoverActionViewStateItem<TItem>[] =>
	items.map((item, index) => ({
		item,
		...resolveActionPopoverActionViewState({ item, align, layout, inverse, index, total: items.length })
	}));

export const resolveActionPopoverVerticalDividerClass = (inverse = false) =>
	joinClasses(['mx-2 h-px', resolveActionPopoverThemeClasses(inverse).divider]);

export const resolveActionPopoverCancelDividerClass = (inverse = false) =>
	joinClasses(['h-px', resolveActionPopoverThemeClasses(inverse).divider]);

export const resolveActionPopoverCancelButtonClass = ({
	inverse = false,
	align = 'center'
}: ResolveActionPopoverCancelButtonClassOptions) =>
	joinClasses([
		'flex h-12 items-center whitespace-nowrap px-4 transition-all',
		resolveActionPopoverThemeClasses(inverse).active,
		actionPopoverAlignObj[align] || actionPopoverAlignObj.center
	]);

export const resolveActionPopoverRingButtonClass = ({
	inverse = false,
	inlineShadow = 'md',
	disabled = false
}: ResolveActionPopoverRingButtonClassOptions) =>
	joinClasses([
		'absolute flex items-center justify-center rounded-full border transition-all',
		resolveActionPopoverThemeClasses(inverse).panel,
		resolveActionPopoverShadowClass(inlineShadow),
		disabled ? 'cursor-not-allowed opacity-40' : resolveActionPopoverThemeClasses(inverse).active
	]);

// 输入组件 props 和内部状态快照，返回框架无关的 ActionPopover 派生入参。
// Receive component props and internal state snapshots, then return framework-agnostic ActionPopover derivation options.
export const resolveActionPopoverStateOptions = <
	TAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem,
	TRingAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem
>({
	actualDirection,
	computedRingShape,
	hiddenByViewport,
	inlinePosition,
	innerVisible,
	positionReady,
	props,
	ringAnimate,
	ringPosition,
	ringStartAngle
}: ResolveActionPopoverStateOptionsParams<TAction, TRingAction>): ResolveActionPopoverDerivedOptions<TAction, TRingAction> => ({
	actions: props.actions,
	actualDirection,
	align: props.align,
	computedRingShape,
	gridColumns: props.gridColumns,
	hiddenByViewport,
	inlineAlign: props.inlineAlign,
	inlinePosition,
	inlineRadius: props.inlineRadius,
	inlineShadow: props.inlineShadow,
	innerVisible,
	inverse: props.inverse,
	layout: props.layout,
	positionReady,
	ringActions: props.ringActions,
	ringAnimate,
	ringItemSize: props.ringItemSize,
	ringPosition,
	ringRadius: props.ringRadius,
	ringStartAngle,
	showCancel: props.showCancel,
	title: props.title,
	titleAlign: props.titleAlign,
	visible: props.visible
});

// 输入 ActionPopover 的 props 和组件层状态，返回框架无关的渲染派生结果。
// Receive ActionPopover props and component-layer state, then return framework-agnostic render derivations.
export const resolveActionPopoverDerived = <
	TAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem,
	TRingAction extends ActionPopoverIconStateItem & ActionPopoverActionDisabledItem
>({
	actions = [],
	actualDirection = 'down',
	align = 'center',
	computedRingShape = 'quarter',
	gridColumns = 3,
	inlineAlign = 'center',
	inlinePosition = { top: 0, left: 0 },
	inlineRadius = '',
	inlineShadow = 'md',
	innerVisible,
	inverse = false,
	layout = 'v',
	hiddenByViewport = false,
	positionReady = false,
	ringActions = [],
	ringAnimate = true,
	ringItemSize = 44,
	ringPosition = { x: 0, y: 0 },
	ringRadius,
	ringStartAngle = 0,
	showCancel = false,
	title = '',
	titleAlign = 'center',
	visible: visibleOption
}: ResolveActionPopoverDerivedOptions<TAction, TRingAction>): ActionPopoverDerived<TAction, TRingAction> => {
	const visible = resolveActionPopoverVisible({ visible: visibleOption, innerVisible, hiddenByViewport });
	const transformOrigin = resolveActionPopoverTransformOrigin(actualDirection, inlineAlign);
	const inlinePanelStyleValue = resolveActionPopoverInlinePanelStyleValue({
		top: inlinePosition.top,
		left: inlinePosition.left,
		transformOrigin,
		positionReady
	});
	const ringTransitionDuration = resolveActionPopoverRingTransitionDuration(ringAnimate);
	const ringItemDerivedList = resolveActionPopoverRingItemDerivedList({
		items: ringActions,
		ringShape: computedRingShape,
		startAngle: ringStartAngle,
		ringRadius,
		ringItemSize,
		inverse,
		inlineShadow,
		animate: ringAnimate,
		transitionDurationMs: ringTransitionDuration,
		transitionTimingFunction: actionPopoverRingEasing
	}).map((itemDerived) => ({
		...itemDerived,
		inParams: resolveActionPopoverRingFlyParams({ position: itemDerived.position, phase: 'in' }),
		outParams: resolveActionPopoverRingFlyParams({ position: itemDerived.position, phase: 'out' })
	}));

	return {
		visible,
		inlineVisible: layout !== 'ring' && visible,
		ringVisible: layout === 'ring' && visible,
		showTitle: Boolean(title),
		showCancel: Boolean(showCancel),
		titleClass: resolveActionPopoverTitleClass({ inverse, titleAlign }),
		cancelDividerClass: resolveActionPopoverCancelDividerClass(inverse),
		cancelButtonClass: resolveActionPopoverCancelButtonClass({ inverse, align }),
		actionContainerClass: resolveActionPopoverActionContainerClass({ layout, gridColumns, inverse }),
		actionViewStates: resolveActionPopoverActionViewStateList({ items: actions, align, layout, inverse }),
		inlinePanelClass: resolveActionPopoverPanelClass({ inverse, inlineRadius, inlineShadow }),
		inlineInParams: resolveActionPopoverInlineInParams(),
		inlineOutParams: resolveActionPopoverInlineOutParams(),
		transformOrigin,
		inlinePanelStyleValue,
		inlinePanelStyleString: resolveActionPopoverInlinePanelStyleString({
			top: inlinePosition.top,
			left: inlinePosition.left,
			transformOrigin,
			positionReady
		}),
		ringPanelClass: resolveActionPopoverRingPanelClass(),
		ringPanelStyleValue: resolveActionPopoverRingPanelStyleValue(ringPosition),
		ringPanelStyleString: resolveActionPopoverRingPanelStyleString(ringPosition),
		ringTransitionDuration,
		ringItemDerivedList
	};
};
