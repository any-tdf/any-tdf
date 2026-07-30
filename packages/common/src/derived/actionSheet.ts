export const actionSheetTitleAlignObj = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right'
} as const;

export const actionSheetStateObj = {
	normal: ' ',
	theme: ' text-primary dark:text-dark ',
	success: ' text-success ',
	warning: ' text-warning ',
	error: ' text-error ',
	info: ' text-info '
} as const;

export const actionSheetImgRadiusObj = {
	none: 'rounded-none',
	xs: 'rounded-xs',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	'4xl': 'rounded-4xl',
	full: 'rounded-full'
} as const;

export const actionSheetAlignObj = {
	left: 'justify-start pl-4',
	center: 'justify-center',
	right: 'justify-end pr-4'
} as const;

export type ActionSheetAlignKey = keyof typeof actionSheetAlignObj | string;
export type ActionSheetStateKey = keyof typeof actionSheetStateObj | string;
export type ActionSheetIconState = Exclude<keyof typeof actionSheetStateObj, 'normal'>;
export type ActionSheetTitleAlignKey = keyof typeof actionSheetTitleAlignObj | string;
export type ActionSheetImgRadiusKey = keyof typeof actionSheetImgRadiusObj | string;
export type ActionSheetActionLike = {
	desc?: unknown;
	disabled?: boolean;
	style?: ActionSheetStateKey;
	imgRadius?: ActionSheetImgRadiusKey;
	showImg?: unknown;
	icon?: { injClass?: string; state?: ActionSheetIconState } | null;
};
export type ActionSheetIconPropsFallback = Record<string, never>;

export type ActionSheetTextDefaults = {
	cancelText: string;
};

export type ActionSheetCancelAction = {
	nextVisible: false;
	shouldCancel: true;
	shouldClose: true;
};

export type ResolveActionSheetCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};

export type ActionSheetCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type ResolveActionSheetActionClickActionOptions<TAction extends Pick<ActionSheetActionLike, 'disabled'>> = {
	action: TAction;
	actionClosable?: boolean;
	index: number;
};

export type ActionSheetActionClickAction<TAction> = {
	action: TAction;
	index: number;
	nextVisible: false;
	shouldClose: boolean;
	shouldSelect: boolean;
};

export type ActionSheetActionClickFlow<TAction> = ActionSheetActionClickAction<TAction> & {
	closeAction: ActionSheetCloseAction;
};

export type ResolveActionSheetActionViewStateOptions = {
	action?: ActionSheetActionLike;
	align?: ActionSheetAlignKey;
	index?: number;
	total?: number;
};

export type ActionSheetActionViewState = {
	buttonClass: string;
	contentClass: string;
	descClass: string;
	dividerClass: string;
	disabled: boolean;
	iconInjClass: string;
	iconState: ActionSheetIconState | undefined;
	imageClass: string;
	imageInnerClass: string;
	imgRadiusClass: string;
	showDesc: boolean;
	showDivider: boolean;
	showIcon: boolean;
	showImage: boolean;
};

export type ActionSheetActionViewStateItem<TAction> = ActionSheetActionViewState & {
	action: TAction;
};

export type ResolveActionSheetActionViewStateListOptions<TAction extends ActionSheetActionLike> = {
	actions: readonly TAction[];
	align?: ActionSheetAlignKey;
};

export type ResolveActionSheetDerivedOptions<TAction extends ActionSheetActionLike> = {
	actions?: readonly TAction[];
	align?: ActionSheetAlignKey;
	cancelText?: string;
	showCancel?: boolean;
	title?: string;
	titleAlign?: ActionSheetTitleAlignKey;
	defaults: ActionSheetTextDefaults;
};
export type ActionSheetStatePropsLike<TAction extends ActionSheetActionLike> = Partial<
	Omit<ResolveActionSheetDerivedOptions<TAction>, 'defaults'>
>;
export type ResolveActionSheetStateOptionsParams<TAction extends ActionSheetActionLike> = {
	defaults: ActionSheetTextDefaults;
	props: ActionSheetStatePropsLike<TAction>;
};

export type ActionSheetDerived<TAction> = {
	actionViewStates: ActionSheetActionViewStateItem<TAction>[];
	cancelButtonClass: string;
	cancelGapClass: string;
	cancelText: string;
	showCancel: boolean;
	showTitle: boolean;
	titleClass: string;
	transitionDistance: number;
};

export const actionSheetBaseHeights = {
	title: 40,
	cancel: 56,
	action: 56,
	actionWithDesc: 60,
	divider: 1
} as const;

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveActionSheetInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入组件取消文案 prop 和默认文案，返回框架无关的最终文案。
// Consume the component cancel text prop and default text, then return framework-agnostic final text.
export const resolveActionSheetCancelText = (cancelText: string | undefined, defaults: ActionSheetTextDefaults): string =>
	cancelText ?? defaults.cancelText;

// 输入 ActionSheet 的数据状态，返回框架无关的 Popup 位移距离。
// Resolve ActionSheet data state into framework-agnostic Popup transition distance.
export const resolveActionSheetTransitionDistance = (
	options: { title?: string; showCancel?: boolean; actions?: readonly ActionSheetActionLike[] } = {}
) => {
	const { title = '', showCancel = false, actions = [] } = options;
	return (
		(title ? actionSheetBaseHeights.title : 0) +
		(showCancel ? actionSheetBaseHeights.cancel : 0) +
		actions.reduce((total, item) => total + (item.desc ? actionSheetBaseHeights.actionWithDesc : actionSheetBaseHeights.action), 0) +
		(actions.length - 1) * actionSheetBaseHeights.divider
	);
};

export const resolveActionSheetTitleClass = (titleAlign: ActionSheetTitleAlignKey = 'center') =>
	[
		'flex h-10 flex-col justify-center truncate border-b border-black/5 text-xs text-black/50 dark:border-white/5 dark:text-white/50',
		actionSheetTitleAlignObj[titleAlign as keyof typeof actionSheetTitleAlignObj] || actionSheetTitleAlignObj.left
	]
		.filter(Boolean)
		.join(' ');

export const resolveActionSheetAlignClass = (align: ActionSheetAlignKey = 'center') =>
	actionSheetAlignObj[align as keyof typeof actionSheetAlignObj] || actionSheetAlignObj.center;

export const resolveActionSheetActionButtonClass = (options: { disabled?: boolean; align?: ActionSheetAlignKey } = {}) => {
	const { disabled = false, align = 'center' } = options;
	return [
		'flex w-full items-center gap-2 transition-all',
		disabled ? 'cursor-not-allowed opacity-40' : 'active:scale-90',
		resolveActionSheetAlignClass(align)
	].join(' ');
};

// 输入操作项状态，返回组件层可直接使用的禁用标记。
// Resolve action item state into a disabled flag for component usage.
export const resolveActionSheetActionDisabled = (action: Pick<ActionSheetActionLike, 'disabled'> = {}): boolean => Boolean(action.disabled);

// 输入操作项图标配置，返回组件层可安全展开绑定的 props 对象。
// Normalize action icon config into a props object that component layers can safely spread or bind.
export const resolveActionSheetIconProps = <TIcon extends object>(icon?: TIcon | null): TIcon | ActionSheetIconPropsFallback => icon ?? {};

// 输入取消动作，返回框架无关的关闭与回调决策。
// Resolve a cancel action into framework-agnostic close and callback decisions.
export const resolveActionSheetCancelAction = (): ActionSheetCancelAction => ({
	nextVisible: false,
	shouldCancel: true,
	shouldClose: true
});

// 输入 ActionSheet 关闭请求，返回组件层可写入的关闭动作。
// Receive an ActionSheet close request and return a close action for the component layer.
export const resolveActionSheetCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveActionSheetCloseActionOptions = {}): ActionSheetCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入操作项和关闭策略，返回组件层可消费的点击动作结果。
// Consume an action item and close policy, then return the click action result for component usage.
export const resolveActionSheetActionClickAction = <TAction extends Pick<ActionSheetActionLike, 'disabled'>>({
	action,
	actionClosable = true,
	index
}: ResolveActionSheetActionClickActionOptions<TAction>): ActionSheetActionClickAction<TAction> => {
	const shouldSelect = !resolveActionSheetActionDisabled(action);
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
export const resolveActionSheetActionClickFlow = <TAction extends Pick<ActionSheetActionLike, 'disabled'>>(
	options: ResolveActionSheetActionClickActionOptions<TAction>
): ActionSheetActionClickFlow<TAction> => {
	const action = resolveActionSheetActionClickAction(options);
	return {
		...action,
		closeAction: resolveActionSheetCloseAction({ shouldClose: action.shouldClose })
	};
};

export const resolveActionSheetCancelButtonClass = (align: ActionSheetAlignKey = 'center') =>
	['flex h-12 w-full items-center transition-all active:scale-90', resolveActionSheetAlignClass(align)].join(' ');

export const resolveActionSheetStateClass = (state: ActionSheetStateKey = 'normal') =>
	actionSheetStateObj[state as keyof typeof actionSheetStateObj] || actionSheetStateObj.normal;

export const resolveActionSheetActionContentClass = (action: ActionSheetActionLike = {}) =>
	[
		'flex flex-col justify-center truncate text-center font-bold',
		resolveActionSheetStateClass(action.style || 'normal'),
		action.desc ? 'h-10' : 'h-14'
	]
		.filter(Boolean)
		.join(' ');

export const resolveActionSheetImgRadiusClass = (radius: ActionSheetImgRadiusKey | undefined) =>
	(radius ? actionSheetImgRadiusObj[radius as keyof typeof actionSheetImgRadiusObj] : '') || 'rounded-full';

// 输入 ActionSheet 图片圆角配置，返回框架无关的图片容器 class。
// Receive ActionSheet image radius config and return a framework-agnostic image wrapper class.
export const resolveActionSheetImageClass = (radius: ActionSheetImgRadiusKey | undefined): string =>
	['h-6 w-6 overflow-hidden', resolveActionSheetImgRadiusClass(radius)].join(' ');

export const resolveActionSheetImageInnerClass = (): string => 'h-full w-full object-cover';

export const resolveActionSheetDescClass = (): string => 'truncate pb-1 text-center text-xs text-black/50 dark:text-white/40';

export const resolveActionSheetDividerClass = (): string => 'h-px w-full bg-black/5 dark:bg-white/5';

export const resolveActionSheetCancelGapClass = (): string => 'h-2 bg-black/5 dark:bg-white/5';

export const resolveActionSheetIconState = (action: ActionSheetActionLike = {}): ActionSheetIconState | undefined => {
	const actionState = action.style || 'normal';
	if (action.icon?.state) return action.icon.state;
	return actionState !== 'normal' && actionState in actionSheetStateObj ? (actionState as ActionSheetIconState) : undefined;
};

// 输入 ActionSheet 操作项状态，返回框架无关的展示分支和派生 class。
// Resolve ActionSheet action state into framework-agnostic display branches and derived classes.
export const resolveActionSheetActionViewState = ({
	action = {},
	align = 'center',
	index = 0,
	total = 0
}: ResolveActionSheetActionViewStateOptions = {}): ActionSheetActionViewState => {
	const disabled = resolveActionSheetActionDisabled(action);
	const showIcon = Boolean(action.icon);

	return {
		buttonClass: resolveActionSheetActionButtonClass({ disabled, align }),
		contentClass: resolveActionSheetActionContentClass(action),
		descClass: resolveActionSheetDescClass(),
		dividerClass: resolveActionSheetDividerClass(),
		disabled,
		iconInjClass: action.icon?.injClass || '',
		iconState: resolveActionSheetIconState(action),
		imageClass: resolveActionSheetImageClass(action.imgRadius),
		imageInnerClass: resolveActionSheetImageInnerClass(),
		imgRadiusClass: resolveActionSheetImgRadiusClass(action.imgRadius),
		showDesc: Boolean(action.desc),
		showDivider: index !== total - 1,
		showIcon,
		showImage: !showIcon && Boolean(action.showImg)
	};
};

// 输入 ActionSheet 操作项列表，返回组件层可直接渲染的无框架列表。
// Receive ActionSheet actions and return a framework-agnostic render list for components.
export const resolveActionSheetActionViewStateList = <TAction extends ActionSheetActionLike>({
	actions,
	align = 'center'
}: ResolveActionSheetActionViewStateListOptions<TAction>): ActionSheetActionViewStateItem<TAction>[] =>
	actions.map((action, index) => ({
		action,
		...resolveActionSheetActionViewState({ action, align, index, total: actions.length })
	}));

// 输入组件 props 和默认文案，返回框架无关的 ActionSheet 派生入参。
// Receive component props and default text, then return framework-agnostic ActionSheet derivation options.
export const resolveActionSheetStateOptions = <TAction extends ActionSheetActionLike>({
	defaults,
	props
}: ResolveActionSheetStateOptionsParams<TAction>): ResolveActionSheetDerivedOptions<TAction> => ({
	actions: props.actions,
	align: props.align,
	cancelText: props.cancelText,
	defaults,
	showCancel: props.showCancel,
	title: props.title,
	titleAlign: props.titleAlign
});

// 输入 ActionSheet props，返回框架无关的渲染派生结果。
// Receive ActionSheet props and return framework-agnostic render derivation.
export const resolveActionSheetDerived = <TAction extends ActionSheetActionLike>({
	actions = [],
	align = 'center',
	cancelText,
	showCancel = false,
	title = '',
	titleAlign = 'center',
	defaults
}: ResolveActionSheetDerivedOptions<TAction>): ActionSheetDerived<TAction> => ({
	actionViewStates: resolveActionSheetActionViewStateList({ actions, align }),
	cancelButtonClass: resolveActionSheetCancelButtonClass(align),
	cancelGapClass: resolveActionSheetCancelGapClass(),
	cancelText: resolveActionSheetCancelText(cancelText, defaults),
	showCancel,
	showTitle: Boolean(title),
	titleClass: resolveActionSheetTitleClass(titleAlign),
	transitionDistance: resolveActionSheetTransitionDistance({ title, showCancel, actions })
});
