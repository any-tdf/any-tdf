export type SelectionLayout = 'v' | 'h' | 'inline' | string;
export type SelectionTextPosition = 'l' | 'r' | 't' | 'b' | string;

export type ResolveSelectionItemClassOptions = {
	layout?: SelectionLayout;
	textPosition?: SelectionTextPosition;
};

export type ResolveSelectionLabelClassOptions = ResolveSelectionItemClassOptions & {
	icon?: unknown;
};
export type ResolveSelectionItemDerivedOptions = ResolveSelectionLabelClassOptions & {
	checked?: boolean;
};
export type ResolveSelectionItemRenderStateOptions<
	TCheckedIcon = unknown,
	TUncheckedIcon = unknown
> = ResolveSelectionItemDerivedOptions & {
	iconChecked?: TCheckedIcon | 'default' | null;
	icon?: TUncheckedIcon | 'default' | null;
};
export type SelectionItemDerived = {
	itemClass: string;
	leadingLabelClass: string;
	trailingLabelClass: string;
	dividerClass: string;
	checkedIconClass: string;
	uncheckedIconClass: string;
	checkedSvgClass: string;
	uncheckedSvgClass: string;
	showLeadingLabel: boolean;
	showTrailingLabel: boolean;
	showDivider: boolean;
};

export type SelectionIconKind = 'none' | 'default' | 'custom';

export type SelectionIconState<TIcon = unknown> = {
	icon: TIcon | null;
	kind: SelectionIconKind;
};
export type SelectionItemRenderState<TCheckedIcon = unknown, TUncheckedIcon = unknown> = SelectionItemDerived & {
	checkedIconProps: TCheckedIcon | null;
	checkedIconState: SelectionIconState<TCheckedIcon>;
	uncheckedIconProps: TUncheckedIcon | null;
	uncheckedIconState: SelectionIconState<TUncheckedIcon>;
};

// 输入选择类组件的布局状态，返回框架无关的 class。
// Resolve selection component layout state into framework-agnostic classes.
export const resolveSelectionGroupClass = (layout: SelectionLayout = 'v') =>
	layout === 'inline' ? 'flex flex-wrap' : `flex ${layout === 'h' ? 'justify-between' : 'w-full flex-col space-y-2'}`;

export const resolveSelectionItemClass = (options: ResolveSelectionItemClassOptions = {}) => {
	const { layout = 'v', textPosition = 'r' } = options;
	const layoutClass = layout === 'inline' ? 'inline-block' : 'flex';
	const justifyClass = textPosition === 'l' && layout === 'v' ? 'justify-between' : '';
	const directionClass =
		textPosition === 'b' || textPosition === 't' ? 'flex-col items-center' : layout === 'h' ? 'justify-center' : 'items-center';
	return [layoutClass, 'grow active:opacity-80', justifyClass, directionClass].filter(Boolean).join(' ');
};

export const resolveSelectionLeadingLabelClass = (options: ResolveSelectionLabelClassOptions = {}) => {
	const { layout = 'v', textPosition = 'r', icon = 'default' } = options;
	return [textPosition === 'l' && icon !== null ? 'mr-0.5 text-left' : '', layout === 'v' ? 'grow' : ''].filter(Boolean).join(' ');
};

export const resolveSelectionTrailingLabelClass = (options: ResolveSelectionLabelClassOptions = {}) => {
	const { textPosition = 'r', icon = 'default' } = options;
	return textPosition === 'r' && icon !== null ? 'ml-0.5 text-left' : '';
};

export const resolveSelectionLeadingLabelVisible = (textPosition: SelectionTextPosition = 'r') =>
	textPosition === 'l' || textPosition === 't';

export const resolveSelectionTrailingLabelVisible = (textPosition: SelectionTextPosition = 'r') =>
	textPosition === 'r' || textPosition === 'b';

export const resolveSelectionDividerVisible = (layout: SelectionLayout = 'v') => layout === 'v';

export const resolveSelectionCheckedIconClass = (checked = false) => (checked ? '' : 'hidden');

export const resolveSelectionUncheckedIconClass = (checked = false) => (checked ? 'hidden' : '');

export const resolveSelectionDividerClass = (): string => 'mt-1 h-px bg-black/10 dark:bg-white/10';

export const resolveSelectionCheckedSvgClass = (): string => 'text-primary dark:text-dark';

export const resolveSelectionUncheckedSvgClass = (): string => 'opacity-20';

// 输入选择项状态，返回框架无关的可见性和 class 派生结果。
// Resolve selection item state into framework-agnostic visibility and class derivations.
export const resolveSelectionItemDerived = (options: ResolveSelectionItemDerivedOptions = {}): SelectionItemDerived => {
	const { layout = 'v', textPosition = 'r', icon = 'default', checked = false } = options;
	return {
		itemClass: resolveSelectionItemClass({ layout, textPosition }),
		leadingLabelClass: resolveSelectionLeadingLabelClass({ layout, textPosition, icon }),
		trailingLabelClass: resolveSelectionTrailingLabelClass({ textPosition, icon }),
		dividerClass: resolveSelectionDividerClass(),
		checkedIconClass: resolveSelectionCheckedIconClass(checked),
		uncheckedIconClass: resolveSelectionUncheckedIconClass(checked),
		checkedSvgClass: resolveSelectionCheckedSvgClass(),
		uncheckedSvgClass: resolveSelectionUncheckedSvgClass(),
		showLeadingLabel: resolveSelectionLeadingLabelVisible(textPosition),
		showTrailingLabel: resolveSelectionTrailingLabelVisible(textPosition),
		showDivider: resolveSelectionDividerVisible(layout)
	};
};

// 输入选择项图标配置，返回框架无关的图标展示分支。
// Resolve selection item icon config into a framework-agnostic icon display branch.
export const resolveSelectionIconState = <TIcon>(icon: TIcon | 'default' | null = 'default'): SelectionIconState<TIcon> => {
	if (icon === null) return { kind: 'none', icon: null };
	if (icon === 'default') return { kind: 'default', icon: null };
	return { kind: 'custom', icon: icon as TIcon };
};

// 输入选择项图标分支，返回组件层可直接绑定的自定义图标配置。
// Receive a selection icon branch and return custom icon props for component binding.
export const resolveSelectionCustomIconProps = <TIcon>(iconState: SelectionIconState<TIcon>): TIcon | null =>
	iconState.kind === 'custom' ? iconState.icon : null;

// 输入选择项当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current selection item state and return framework-agnostic derived values ready for component binding.
export const resolveSelectionItemRenderState = <TCheckedIcon = unknown, TUncheckedIcon = unknown>({
	icon = 'default',
	iconChecked = 'default',
	...itemOptions
}: ResolveSelectionItemRenderStateOptions<TCheckedIcon, TUncheckedIcon> = {}): SelectionItemRenderState<TCheckedIcon, TUncheckedIcon> => {
	const checkedIconState = resolveSelectionIconState(iconChecked);
	const uncheckedIconState = resolveSelectionIconState(icon);
	return {
		...resolveSelectionItemDerived({ ...itemOptions, icon }),
		checkedIconState,
		uncheckedIconState,
		checkedIconProps: resolveSelectionCustomIconProps(checkedIconState),
		uncheckedIconProps: resolveSelectionCustomIconProps(uncheckedIconState)
	};
};
