import { radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const buttonStateBaseObj = {
	theme: 'bg-primary dark:bg-dark',
	success: 'bg-success',
	warning: 'bg-warning',
	error: 'bg-error',
	info: 'bg-info'
} as const;

export const buttonFillLineClass = 'border border-text-primary dark:border-text-dark !text-text-primary dark:!text-text-dark';
export const buttonFillLineLightClass = 'border border-text-primary/20 dark:border-text-dark/30 !text-text-primary dark:!text-text-dark';
export const buttonFillTextClass = '!text-text-primary dark:!text-text-dark';

export const buttonStateLineObj = {
	theme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
	success: 'border border-success !text-success',
	warning: 'border border-warning !text-warning',
	error: 'border border-error !text-error',
	info: 'border border-info !text-info'
} as const;

export const buttonStateTextObj = {
	theme: '!text-primary dark:!text-dark',
	success: '!text-success',
	warning: '!text-warning',
	error: '!text-error',
	info: '!text-info'
} as const;

export const buttonStateColorLightObj = {
	default: '!bg-black/10 dark:!bg-white/10 !text-black dark:!text-white',
	theme: '!bg-primary/10 dark:!bg-dark/10 !text-primary dark:!text-dark',
	success: '!bg-success/10 !text-success',
	warning: '!bg-warning/10 !text-warning',
	error: '!bg-error/10 !text-error',
	info: '!bg-info/10 !text-info'
} as const;

export const buttonSizeObj = {
	full: 'w-full',
	big: 'w-full',
	md: 'tdf-button-md',
	sm: 'tdf-button-sm',
	auto: 'w-auto'
} as const;

export const buttonBorderObj = {
	solid: 'border-solid',
	dashed: 'border-dashed',
	dotted: 'border-dotted'
} as const;

export const buttonHeightOutObj = {
	'0': 'py-0',
	'1': 'py-1',
	'2': 'py-2',
	'3': 'py-3',
	'4': 'py-4'
} as const;

export const buttonHeightInObj = buttonHeightOutObj;

export const buttonGroupDividerHeightObj = {
	full: 'h-full',
	mid: 'h-3/5',
	short: 'h-1/3'
} as const;

export const buttonGroupStateDividerObj = {
	theme: 'bg-primary/30 dark:bg-dark/30',
	success: 'bg-success/30',
	warning: 'bg-warning/30',
	error: 'bg-error/30',
	info: 'bg-info/30'
} as const;

export type ButtonStateKey = keyof typeof buttonStateBaseObj;
export type ButtonFillKey = 'base' | 'line' | 'lineLight' | 'lineState' | 'text' | 'textState' | 'colorLight' | string;
export type ButtonSizeKey = keyof typeof buttonSizeObj | string;
export type ButtonBorderKey = keyof typeof buttonBorderObj | string;
export type ButtonGroupHeightKey = keyof typeof buttonHeightOutObj | string;
export type ButtonGroupDividerHeightKey = keyof typeof buttonGroupDividerHeightObj | string;

export type ResolveButtonGroupClassesOptions = {
	fill?: ButtonFillKey;
	state?: ButtonStateKey;
	radiusClass?: string;
	size?: ButtonSizeKey;
	border?: ButtonBorderKey;
	dividerHeight?: ButtonGroupDividerHeightKey;
	heightIn?: ButtonGroupHeightKey;
	heightOut?: ButtonGroupHeightKey;
	injClass?: string;
};

export type ResolveButtonGroupDerivedOptions<
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean } = {
		icon?: { name?: unknown } | null;
		iconPosition?: 'left' | 'right' | string;
		disabled?: boolean;
	}
> = ResolveButtonGroupClassesOptions & {
	items?: readonly TItem[];
	radius?: keyof typeof radiusObj | string;
};
export type ButtonGroupStatePropsLike<
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean } = {
		icon?: { name?: unknown } | null;
		iconPosition?: 'left' | 'right' | string;
		disabled?: boolean;
	}
> = Partial<ResolveButtonGroupDerivedOptions<TItem>>;
export type ResolveButtonGroupStateOptionsParams<
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean } = {
		icon?: { name?: unknown } | null;
		iconPosition?: 'left' | 'right' | string;
		disabled?: boolean;
	}
> = {
	props: ButtonGroupStatePropsLike<TItem>;
};

export type ResolveButtonClassesOptions = ResolveButtonGroupClassesOptions & {
	radius?: keyof typeof radiusObj | string;
	love?: boolean;
	disabled?: boolean;
	loading?: unknown;
	disabledLoading?: boolean;
	customSize?: boolean;
	customWidth?: number;
	customHeight?: number;
};

export type ResolveButtonGroupItemClickActionOptions = {
	disabled?: boolean;
};

export type ButtonGroupItemClickAction = {
	shouldClick: boolean;
};

export type ResolveButtonGroupItemStateOptions = {
	icon?: { name?: unknown } | null;
	iconPosition?: 'left' | 'right' | string;
	index?: number;
	total?: number;
};

export type ButtonGroupItemState = {
	showDivider: boolean;
	showLeftIcon: boolean;
	showRightIcon: boolean;
};

export type ButtonGroupItemStateItem<TItem> = ButtonGroupItemState & {
	item: TItem;
};
export type ButtonGroupItemDerived<TItem> = ButtonGroupItemStateItem<TItem> & {
	dividerClass: string;
	dividerWrapClass: string;
	itemClass: string;
};
export type ButtonGroupDerived<TItem> = {
	innerClass: string;
	itemStates: ButtonGroupItemDerived<TItem>[];
	outerClass: string;
	radiusClass: string;
	useItems: boolean;
};

export type ResolveButtonGroupItemStateListOptions<
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string }
> = {
	items: readonly TItem[];
};

export type ResolveButtonIconStateOptions = {
	icon?: { name?: unknown } | null;
	iconPosition?: 'left' | 'right' | string;
	loading?: unknown;
};
export type ResolveButtonContentStateOptions<TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown> = {
	icon?: TIcon | null;
	iconPosition?: 'left' | 'right' | string;
	loading?: TLoading | null;
};

export type ButtonIconState = {
	showLeftIcon: boolean;
	showLoading: boolean;
	showRightIcon: boolean;
};
export type ButtonContentState<TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown> = ButtonIconState & {
	iconProps: TIcon | null;
	loadingProps: TLoading | null;
};
export type ButtonCustomStyleValue = {
	height: string;
	padding: number;
	width: string;
};
export type ResolveButtonDerivedOptions<
	TIcon extends { name?: unknown } = { name?: unknown },
	TLoading = unknown
> = ResolveButtonClassesOptions & ResolveButtonContentStateOptions<TIcon, TLoading>;
export type ButtonStatePropsLike<TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown> = Partial<
	ResolveButtonDerivedOptions<TIcon, TLoading>
>;
export type ResolveButtonStateOptionsParams<TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown> = {
	props: ButtonStatePropsLike<TIcon, TLoading>;
};
export type ButtonDerived<TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown> = {
	buttonClass: string;
	buttonStyleString: string;
	buttonStyleValue: ButtonCustomStyleValue | null;
	contentState: ButtonContentState<TIcon, TLoading>;
	innerDisabled: boolean;
	outerClass: string;
};

// 输入 Button 组件状态，返回框架无关的 class 字符串和纯状态分支。
// Convert Button component state into framework-agnostic class strings and pure state branches.
export const resolveButtonGroupFillStateClass = (options: Pick<ResolveButtonGroupClassesOptions, 'fill' | 'state'> = {}) => {
	const { fill = 'base', state } = options;
	switch (fill) {
		case 'base':
			return buttonStateBaseObj[state || 'theme'];
		case 'line':
			return buttonFillLineClass;
		case 'lineLight':
			return buttonFillLineLightClass;
		case 'lineState':
			return buttonStateLineObj[state || 'theme'];
		case 'text':
			return buttonFillTextClass;
		case 'textState':
			return buttonStateTextObj[state || 'theme'];
		case 'colorLight':
			return state ? buttonStateColorLightObj[state] : buttonStateColorLightObj.default;
		default:
			return buttonStateBaseObj[state || 'theme'];
	}
};

export const resolveButtonGroupDividerColorClass = (options: Pick<ResolveButtonGroupClassesOptions, 'fill' | 'state'> = {}) => {
	const { fill = 'base', state } = options;
	if (fill === 'base') return 'bg-white/30 dark:bg-black/30';
	if (fill === 'line' || fill === 'lineLight' || fill === 'text' || (fill === 'colorLight' && !state)) {
		return 'bg-text-primary/20 dark:bg-text-dark/30';
	}
	return buttonGroupStateDividerObj[state ?? 'theme'];
};

export const resolveButtonGroupTextColorClass = (options: Pick<ResolveButtonGroupClassesOptions, 'fill' | 'state'> = {}) => {
	const { fill = 'base', state } = options;
	if (fill === 'base') return state === 'theme' || !state ? 'text-text-on-primary dark:text-text-on-dark' : 'text-text-on-primary';
	return '';
};

export const resolveButtonRadiusClass = (radius: keyof typeof radiusObj | string = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)';

export const resolveButtonInnerDisabled = ({
	disabled = false,
	loading = null,
	disabledLoading = true
}: Pick<ResolveButtonClassesOptions, 'disabled' | 'loading' | 'disabledLoading'> = {}) => Boolean(disabled || (loading && disabledLoading));

export const resolveButtonGroupBlock = (size: ButtonSizeKey = 'big') => size === 'full' || size === 'big';

export const resolveButtonBlock = ({ size = 'big', customSize = false }: Pick<ResolveButtonClassesOptions, 'size' | 'customSize'> = {}) =>
	resolveButtonGroupBlock(size) && !customSize;

export const resolveButtonInnerSizeClass = ({
	size = 'big',
	customSize = false
}: Pick<ResolveButtonClassesOptions, 'size' | 'customSize'> = {}) => (customSize ? '' : resolveClassMapValue(buttonSizeObj, size, 'big'));

export const resolveButtonGroupOuterClass = (options: Pick<ResolveButtonGroupClassesOptions, 'heightOut' | 'size'> = {}) => {
	const { heightOut = '2', size = 'big' } = options;
	return [
		buttonHeightOutObj[heightOut as keyof typeof buttonHeightOutObj] || buttonHeightOutObj['2'],
		size === 'big' ? 'px-4' : 'px-0',
		resolveButtonGroupBlock(size) ? 'block' : 'inline'
	].join(' ');
};

export const resolveButtonOuterClass = (options: Pick<ResolveButtonClassesOptions, 'heightOut' | 'size' | 'customSize' | 'love'> = {}) => {
	const { heightOut = '2', size = 'big', customSize = false, love = false } = options;
	return joinClasses([
		resolveClassMapValue(buttonHeightOutObj, heightOut, '2'),
		size === 'big' && !customSize ? 'px-4' : 'px-0',
		resolveButtonBlock({ size, customSize }) ? 'block' : 'inline',
		love ? 'text-xl' : ''
	]);
};

export const resolveButtonGroupInnerClass = (options: ResolveButtonGroupClassesOptions = {}) => {
	const { fill = 'base', state, radiusClass = 'rounded-(--radius-form)', size = 'big', border = 'solid', injClass = '' } = options;
	return [
		'inline-flex items-center justify-center overflow-hidden',
		buttonSizeObj[size as keyof typeof buttonSizeObj] || buttonSizeObj.big,
		resolveButtonGroupFillStateClass({ fill, state }),
		resolveButtonGroupTextColorClass({ fill, state }),
		buttonBorderObj[border as keyof typeof buttonBorderObj] || buttonBorderObj.solid,
		radiusClass,
		injClass
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveButtonClass = (options: ResolveButtonClassesOptions = {}) => {
	const {
		fill = 'base',
		state,
		radius = '',
		border = 'solid',
		heightIn = '3',
		injClass = '',
		disabled = false,
		loading = null,
		disabledLoading = true
	} = options;
	const innerDisabled = resolveButtonInnerDisabled({ disabled, loading, disabledLoading });

	return joinClasses([
		'inline-flex items-center justify-center gap-1 truncate',
		!innerDisabled ? 'active:opacity-80' : '',
		resolveClassMapValue(buttonHeightInObj, heightIn, '3'),
		resolveButtonInnerSizeClass(options),
		resolveButtonGroupTextColorClass({ fill, state }),
		resolveClassMapValue(buttonBorderObj, border, 'solid'),
		resolveButtonRadiusClass(radius),
		resolveButtonGroupFillStateClass({ fill, state }),
		injClass,
		innerDisabled ? 'cursor-not-allowed opacity-50' : ''
	]);
};

export const resolveButtonCustomStyleValue = ({
	customSize = false,
	customWidth = 0,
	customHeight = 0
}: Pick<ResolveButtonClassesOptions, 'customSize' | 'customWidth' | 'customHeight'> = {}): ButtonCustomStyleValue | null => {
	if (!customSize) return null;
	return {
		width: `${customWidth}px`,
		height: `${customHeight}px`,
		padding: 0
	};
};

export const resolveButtonCustomStyleString = (
	options: Pick<ResolveButtonClassesOptions, 'customSize' | 'customWidth' | 'customHeight'> = {}
) => {
	const style = resolveButtonCustomStyleValue(options);
	if (!style) return '';
	return `width:${style.width};height:${style.height};padding:${style.padding};`;
};

// 输入 Button 图标和 loading 状态，返回框架无关的展示布尔值。
// Resolve Button icon and loading state into framework-agnostic visibility flags.
export const resolveButtonIconState = ({
	icon = null,
	iconPosition = 'left',
	loading = null
}: ResolveButtonIconStateOptions = {}): ButtonIconState => {
	const hasIcon = Boolean(icon?.name);
	return {
		showLoading: Boolean(loading),
		showLeftIcon: hasIcon && iconPosition === 'left',
		showRightIcon: hasIcon && iconPosition === 'right'
	};
};

// 输入 Button 图标和 loading 状态，返回框架无关的内容展示分支和可绑定 props。
// Receive Button icon and loading state, then return framework-agnostic content branches and bindable props.
export const resolveButtonContentState = <TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown>({
	icon = null,
	iconPosition = 'left',
	loading = null
}: ResolveButtonContentStateOptions<TIcon, TLoading> = {}): ButtonContentState<TIcon, TLoading> => {
	const iconState = resolveButtonIconState({ icon, iconPosition, loading });
	return {
		...iconState,
		loadingProps: iconState.showLoading ? loading : null,
		iconProps: iconState.showLeftIcon || iconState.showRightIcon ? icon : null
	};
};

// 输入组件 props，返回框架无关的 Button 派生入参。
// Receive component props and return framework-agnostic Button derivation options.
export const resolveButtonStateOptions = <TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown>({
	props
}: ResolveButtonStateOptionsParams<TIcon, TLoading>): ResolveButtonDerivedOptions<TIcon, TLoading> => ({
	border: props.border,
	customHeight: props.customHeight,
	customSize: props.customSize,
	customWidth: props.customWidth,
	disabled: props.disabled,
	disabledLoading: props.disabledLoading,
	fill: props.fill,
	heightIn: props.heightIn,
	heightOut: props.heightOut,
	icon: props.icon,
	iconPosition: props.iconPosition,
	injClass: props.injClass,
	loading: props.loading,
	love: props.love,
	radius: props.radius,
	size: props.size,
	state: props.state
});

// 输入 Button 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Button state and return framework-agnostic derived values ready for component binding.
export const resolveButtonDerived = <TIcon extends { name?: unknown } = { name?: unknown }, TLoading = unknown>(
	options: ResolveButtonDerivedOptions<TIcon, TLoading> = {}
): ButtonDerived<TIcon, TLoading> => ({
	innerDisabled: resolveButtonInnerDisabled(options),
	outerClass: resolveButtonOuterClass(options),
	buttonClass: resolveButtonClass(options),
	buttonStyleValue: resolveButtonCustomStyleValue(options),
	buttonStyleString: resolveButtonCustomStyleString(options),
	contentState: resolveButtonContentState({
		icon: options.icon,
		iconPosition: options.iconPosition,
		loading: options.loading
	})
});

export const resolveButtonGroupRadiusClass = resolveButtonRadiusClass;

export const resolveButtonGroupItemClass = (options: { heightIn?: ButtonGroupHeightKey; disabled?: boolean } = {}) => {
	const { heightIn = '3', disabled = false } = options;
	return [
		'flex flex-1 items-center justify-center gap-1',
		buttonHeightInObj[heightIn as keyof typeof buttonHeightInObj] || buttonHeightInObj['3'],
		disabled ? 'cursor-not-allowed opacity-50' : 'active:opacity-80'
	].join(' ');
};

export const resolveButtonGroupDividerClass = (
	options: Pick<ResolveButtonGroupClassesOptions, 'dividerHeight' | 'fill' | 'state'> = {}
) => {
	const { dividerHeight = 'mid', fill = 'base', state } = options;
	return [
		'w-px',
		buttonGroupDividerHeightObj[dividerHeight as keyof typeof buttonGroupDividerHeightObj] || buttonGroupDividerHeightObj.mid,
		resolveButtonGroupDividerColorClass({ fill, state })
	].join(' ');
};

export const resolveButtonGroupDividerWrapClass = (): string => 'flex items-center self-stretch';

export const resolveButtonGroupUseItems = (items?: readonly unknown[]) => Boolean(items && items.length > 0);

// 输入 ButtonGroup item 状态，返回框架无关的图标和分割线展示分支。
// Resolve ButtonGroup item state into framework-agnostic icon and divider display branches.
export const resolveButtonGroupItemState = ({
	icon = null,
	iconPosition = 'left',
	index = 0,
	total = 0
}: ResolveButtonGroupItemStateOptions = {}): ButtonGroupItemState => {
	const hasIcon = Boolean(icon?.name);
	return {
		showDivider: index < total - 1,
		showLeftIcon: hasIcon && iconPosition !== 'right',
		showRightIcon: hasIcon && iconPosition === 'right'
	};
};

// 输入 ButtonGroup items，返回组件层可直接渲染的无框架列表。
// Receive ButtonGroup items and return a framework-agnostic render list for components.
export const resolveButtonGroupItemStateList = <
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string }
>({
	items
}: ResolveButtonGroupItemStateListOptions<TItem>): ButtonGroupItemStateItem<TItem>[] =>
	items.map((item, index) => ({
		item,
		...resolveButtonGroupItemState({ icon: item.icon, iconPosition: item.iconPosition, index, total: items.length })
	}));

export const resolveButtonGroupItemDerivedList = <
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean }
>({
	items = [],
	heightIn = '3',
	dividerHeight = 'mid',
	fill = 'base',
	state
}: ResolveButtonGroupDerivedOptions<TItem> = {}): ButtonGroupItemDerived<TItem>[] =>
	items.map((item, index) => ({
		item,
		...resolveButtonGroupItemState({ icon: item.icon, iconPosition: item.iconPosition, index, total: items.length }),
		itemClass: resolveButtonGroupItemClass({ heightIn, disabled: item.disabled }),
		dividerClass: resolveButtonGroupDividerClass({ dividerHeight, fill, state }),
		dividerWrapClass: resolveButtonGroupDividerWrapClass()
	}));

// 输入组件 props，返回框架无关的 ButtonGroup 派生入参。
// Receive component props and return framework-agnostic ButtonGroup derivation options.
export const resolveButtonGroupStateOptions = <
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean } = {
		icon?: { name?: unknown } | null;
		iconPosition?: 'left' | 'right' | string;
		disabled?: boolean;
	}
>({
	props
}: ResolveButtonGroupStateOptionsParams<TItem>): ResolveButtonGroupDerivedOptions<TItem> => ({
	border: props.border,
	dividerHeight: props.dividerHeight,
	fill: props.fill,
	heightIn: props.heightIn,
	heightOut: props.heightOut,
	injClass: props.injClass,
	items: props.items,
	radius: props.radius,
	size: props.size,
	state: props.state
});

// 输入 ButtonGroup 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current ButtonGroup state and return framework-agnostic derived values ready for component binding.
export const resolveButtonGroupDerived = <
	TItem extends { icon?: { name?: unknown } | null; iconPosition?: 'left' | 'right' | string; disabled?: boolean } = {
		icon?: { name?: unknown } | null;
		iconPosition?: 'left' | 'right' | string;
		disabled?: boolean;
	}
>(
	options: ResolveButtonGroupDerivedOptions<TItem> = {}
): ButtonGroupDerived<TItem> => {
	const { radius = '', items = [], fill = 'base', state, size = 'big', border = 'solid', heightOut = '2', injClass = '' } = options;
	const radiusClass = resolveButtonGroupRadiusClass(radius);
	return {
		radiusClass,
		outerClass: resolveButtonGroupOuterClass({ heightOut, size }),
		innerClass: resolveButtonGroupInnerClass({ fill, state, radiusClass, size, border, injClass }),
		useItems: resolveButtonGroupUseItems(items),
		itemStates: resolveButtonGroupItemDerivedList({ ...options, items })
	};
};

// 输入 ButtonGroup item 状态，返回框架无关的点击动作结果。
// Convert ButtonGroup item state into a framework-agnostic click action result.
export const resolveButtonGroupItemClickAction = ({
	disabled = false
}: ResolveButtonGroupItemClickActionOptions = {}): ButtonGroupItemClickAction => ({
	shouldClick: !disabled
});
