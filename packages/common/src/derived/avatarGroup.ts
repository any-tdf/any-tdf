import { radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const avatarGroupLineWidthClass = {
	0: 'ring-0',
	1: 'ring-1',
	2: 'ring-2',
	3: 'ring-3',
	4: 'ring-4',
	8: 'ring-8'
} as const;

export const avatarGroupSizeObj = {
	xs: 'w-6 h-6',
	sm: 'w-10 h-10',
	base: 'w-12 h-12',
	md: 'w-16 h-16',
	lg: 'w-20 h-20',
	xl: 'w-28 h-28',
	'2xl': 'w-32 h-32'
} as const;

export const avatarGroupTextSizeObj = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-lg',
	md: 'text-3xl',
	lg: 'text-4xl',
	xl: 'text-6xl',
	'2xl': 'text-8xl'
} as const;

export type AvatarGroupSizeKey = keyof typeof avatarGroupSizeObj | string;
export type AvatarGroupLineWidthKey = keyof typeof avatarGroupLineWidthClass | number | string;
export type AvatarGroupRadiusKey = keyof typeof radiusObj | string;

export type ResolveAvatarGroupClassesOptions = {
	size?: AvatarGroupSizeKey;
	lineWidth?: AvatarGroupLineWidthKey;
	radius?: AvatarGroupRadiusKey;
	injClass?: string;
};

export type ResolveAvatarGroupKeyboardActionOptions = {
	key: string;
};

export type AvatarGroupKeyboardAction = {
	shouldClick: boolean;
	shouldPreventDefault: boolean;
};

export type AvatarGroupItemStyleValue = {
	transform: string;
	zIndex: number;
};

export type AvatarGroupTopStyleValue = {
	transform?: string;
	zIndex: number;
};

export type AvatarGroupTopKind = 'total' | 'add' | 'none' | 'custom';

export type ResolveAvatarGroupTopStateOptions = {
	top?: unknown;
	total?: number;
};

export type AvatarGroupTopState = {
	kind: AvatarGroupTopKind;
	totalText: string;
};

export type AvatarGroupItemViewState<TItem> = {
	item: TItem;
	index: number;
	style: AvatarGroupItemStyleValue;
	styleString: string;
};

export type ResolveAvatarGroupDerivedOptions<TItem> = ResolveAvatarGroupClassesOptions & {
	data?: readonly TItem[];
	max?: number;
	compact?: number;
	reverse?: boolean;
	top?: unknown;
	total?: number;
};
export type AvatarGroupStatePropsLike<TItem> = Partial<Omit<ResolveAvatarGroupDerivedOptions<TItem>, 'total'>>;
export type ResolveAvatarGroupStateOptionsParams<TItem> = {
	props: AvatarGroupStatePropsLike<TItem>;
	total?: number;
};

export type AvatarGroupDerived<TItem> = {
	items: AvatarGroupItemViewState<TItem>[];
	itemClass: string;
	rootClass: string;
	buttonClass: string;
	totalClass: string;
	addClass: string;
	addIconWrapClass: string;
	addIconClass: string;
	topState: AvatarGroupTopState;
	topStyle: AvatarGroupTopStyleValue;
	topStyleString: string;
};

// 输入 AvatarGroup 组件状态，返回框架无关的 class 字符串。
// Convert AvatarGroup component state into framework-agnostic class strings.
export const resolveAvatarGroupSizeClass = (size: AvatarGroupSizeKey = 'md') => resolveClassMapValue(avatarGroupSizeObj, size, 'md');

export const resolveAvatarGroupTextSizeClass = (size: AvatarGroupSizeKey = 'md') =>
	resolveClassMapValue(avatarGroupTextSizeObj, size, 'md');

export const resolveAvatarGroupLineWidthClass = (lineWidth: AvatarGroupLineWidthKey = 2) =>
	resolveClassMapValue(avatarGroupLineWidthClass, lineWidth, 2);

export const resolveAvatarGroupRadiusClass = (radius: AvatarGroupRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)';

export const resolveAvatarGroupItemClass = (options: ResolveAvatarGroupClassesOptions = {}) =>
	joinClasses([
		'relative',
		resolveAvatarGroupLineWidthClass(options.lineWidth),
		'ring-bg-base dark:ring-bg-base-dark',
		resolveAvatarGroupRadiusClass(options.radius),
		options.injClass
	]);

export const resolveAvatarGroupFallbackClass = (
	options: Pick<ResolveAvatarGroupClassesOptions, 'size' | 'radius'> & { withTextColor?: boolean } = {}
) =>
	joinClasses([
		'bg-primary-200 dark:bg-dark-200 flex flex-col justify-center overflow-hidden text-center',
		options.withTextColor ? 'text-primary-950 dark:text-dark-950' : '',
		resolveAvatarGroupRadiusClass(options.radius),
		resolveAvatarGroupSizeClass(options.size),
		resolveAvatarGroupTextSizeClass(options.size)
	]);

export const resolveAvatarGroupRootClass = (): string => 'w-full overflow-hidden';

export const resolveAvatarGroupButtonClass = (): string => 'flex';

export const resolveAvatarGroupAddIconWrapClass = (): string => 'mx-auto';

export const resolveAvatarGroupAddIconClass = (): string => 'text-primary-950 dark:text-dark-950';

// 只处理 AvatarGroup 的列表截断、层级计算和纯键盘动作，点击事件与 slot 渲染留在组件层。
// Only handle AvatarGroup list slicing, layering math and pure keyboard actions; click events and slot rendering stay in component layers.
export const resolveAvatarGroupVisibleData = <TItem>(data: readonly TItem[] = [], max = 10) => data.slice(0, max);

// 输入 AvatarGroup top 配置，返回框架无关的展示分支。
// Resolve AvatarGroup top config into a framework-agnostic display branch.
export const resolveAvatarGroupTopKind = (top: unknown = 'totle'): AvatarGroupTopKind => {
	if (top === 'totle') return 'total';
	if (top === 'add') return 'add';
	if (top === null) return 'none';
	return 'custom';
};

export const resolveAvatarGroupTotalText = (total = 0): string => `+${total}`;

// 输入 AvatarGroup top 配置和数量，返回组件层渲染所需的纯状态。
// Resolve AvatarGroup top config and count into pure state for component rendering.
export const resolveAvatarGroupTopState = ({ top = 'totle', total = 0 }: ResolveAvatarGroupTopStateOptions = {}): AvatarGroupTopState => {
	const kind = resolveAvatarGroupTopKind(top);
	return {
		kind,
		totalText: kind === 'total' ? resolveAvatarGroupTotalText(total) : ''
	};
};

export const resolveAvatarGroupItemTransform = ({
	compact = 4,
	index = 0,
	reverse = false
}: {
	compact?: number;
	index?: number;
	reverse?: boolean;
}) => `translateX(${-compact * 10 * index - (reverse ? 50 : 0)}%)`;

export const resolveAvatarGroupItemZIndex = ({
	length = 0,
	index = 0,
	reverse = false
}: {
	length?: number;
	index?: number;
	reverse?: boolean;
}) => (reverse ? length - 1 - index : index);

export const resolveAvatarGroupTopTransform = ({ compact = 4, length = 0 }: { compact?: number; length?: number }) =>
	`translateX(-${compact * 10 * length}%)`;

// 输入 AvatarGroup 列表项布局状态，返回组件层可直接绑定的样式。
// Receive AvatarGroup item layout state and return bind-ready styles for the component layer.
export const resolveAvatarGroupItemStyleValue = ({
	compact = 4,
	index = 0,
	length = 0,
	reverse = false
}: { compact?: number; index?: number; length?: number; reverse?: boolean } = {}): AvatarGroupItemStyleValue => ({
	transform: resolveAvatarGroupItemTransform({ compact, index, reverse }),
	zIndex: resolveAvatarGroupItemZIndex({ length, index, reverse })
});

export const resolveAvatarGroupItemStyleString = (
	options: { compact?: number; index?: number; length?: number; reverse?: boolean } = {}
): string => {
	const style = resolveAvatarGroupItemStyleValue(options);
	return `transform: ${style.transform}; z-index: ${style.zIndex}`;
};

// 输入 AvatarGroup 顶层项布局状态，返回组件层可直接绑定的样式。
// Receive AvatarGroup top item layout state and return bind-ready styles for the component layer.
export const resolveAvatarGroupTopStyleValue = ({
	compact = 4,
	length = 0,
	reverse = false
}: { compact?: number; length?: number; reverse?: boolean } = {}): AvatarGroupTopStyleValue => ({
	...(reverse ? {} : { transform: resolveAvatarGroupTopTransform({ compact, length }) }),
	zIndex: length
});

export const resolveAvatarGroupTopStyleString = (options: { compact?: number; length?: number; reverse?: boolean } = {}): string => {
	const style = resolveAvatarGroupTopStyleValue(options);
	return `${style.transform ? `transform: ${style.transform}; ` : ''}z-index: ${style.zIndex}`;
};

// 输入组件 props 和总数状态，返回框架无关的 AvatarGroup 派生入参。
// Receive component props and total state, then return framework-agnostic AvatarGroup derivation options.
export const resolveAvatarGroupStateOptions = <TItem>({
	props,
	total
}: ResolveAvatarGroupStateOptionsParams<TItem>): ResolveAvatarGroupDerivedOptions<TItem> => ({
	compact: props.compact,
	data: props.data,
	injClass: props.injClass,
	lineWidth: props.lineWidth,
	max: props.max,
	radius: props.radius,
	reverse: props.reverse,
	size: props.size,
	top: props.top,
	total
});

// 输入 AvatarGroup 组件状态，返回组件层可直接渲染的框架无关派生结果。
// Receive AvatarGroup component state and return framework-agnostic derived results for component rendering.
export const resolveAvatarGroupDerived = <TItem>(options: ResolveAvatarGroupDerivedOptions<TItem> = {}): AvatarGroupDerived<TItem> => {
	const data = options.data ?? [];
	const visibleData = resolveAvatarGroupVisibleData(data, options.max);
	const length = visibleData.length;
	const layoutOptions = { compact: options.compact, length, reverse: options.reverse };

	return {
		items: visibleData.map((item, index) => ({
			item,
			index,
			style: resolveAvatarGroupItemStyleValue({ ...layoutOptions, index }),
			styleString: resolveAvatarGroupItemStyleString({ ...layoutOptions, index })
		})),
		itemClass: resolveAvatarGroupItemClass(options),
		rootClass: resolveAvatarGroupRootClass(),
		buttonClass: resolveAvatarGroupButtonClass(),
		totalClass: resolveAvatarGroupFallbackClass({ size: options.size, radius: options.radius, withTextColor: true }),
		addClass: resolveAvatarGroupFallbackClass({ size: options.size, radius: options.radius }),
		addIconWrapClass: resolveAvatarGroupAddIconWrapClass(),
		addIconClass: resolveAvatarGroupAddIconClass(),
		topState: resolveAvatarGroupTopState({ top: options.top, total: options.total ?? data.length }),
		topStyle: resolveAvatarGroupTopStyleValue(layoutOptions),
		topStyleString: resolveAvatarGroupTopStyleString(layoutOptions)
	};
};

// 输入 AvatarGroup 键盘状态，返回框架无关的点击动作结果。
// Convert AvatarGroup keyboard state into a framework-agnostic click action result.
export const resolveAvatarGroupKeyboardAction = ({ key }: ResolveAvatarGroupKeyboardActionOptions): AvatarGroupKeyboardAction => {
	const shouldClick = key === 'Enter' || key === ' ';
	return {
		shouldClick,
		shouldPreventDefault: shouldClick
	};
};
