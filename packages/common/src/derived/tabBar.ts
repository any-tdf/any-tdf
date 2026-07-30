import { joinClasses } from './helpers.js';

export type ResolveTabBarIndicatorMetricsOptions = {
	tabWidth?: number;
	labelCount?: number;
	active?: number;
	lineW?: number;
};

export type ResolveTabBarButtonClassOptions = {
	active?: boolean;
	love?: boolean;
	tabInjClass?: string;
	activeTabInjClass?: string;
};

export type TabBarIconLike = {
	name?: string;
	size?: number | string;
};

export type TabBarLabelLike<TIcon extends TabBarIconLike = TabBarIconLike> = {
	text?: unknown;
	icon?: TIcon;
	activeIcon?: TIcon;
};

export type ResolveTabBarIconOptions<TIcon extends TabBarIconLike = TabBarIconLike> = {
	label: TabBarLabelLike<TIcon>;
	active?: boolean;
	love?: boolean;
};

export type ResolveTabBarItemDerivedOptions<TIcon extends TabBarIconLike = TabBarIconLike> = {
	label: TabBarLabelLike<TIcon>;
	index: number;
	active?: number;
	love?: boolean;
	tabInjClass?: string;
	activeTabInjClass?: string;
};

export type ResolveTabBarItemDerivedListOptions<TIcon extends TabBarIconLike = TabBarIconLike> = {
	labels?: readonly TabBarLabelLike<TIcon>[];
	active?: number;
	love?: boolean;
	tabInjClass?: string;
	activeTabInjClass?: string;
};

export type ResolveTabBarDerivedOptions<TIcon extends TabBarIconLike = TabBarIconLike> = ResolveTabBarItemDerivedListOptions<TIcon> & {
	tabWidth?: number;
	line?: boolean;
	lineW?: number;
	injClass?: string;
	activeInjClass?: string;
};

export type TabBarStatePropsLike<TIcon extends TabBarIconLike = TabBarIconLike> = Partial<
	Omit<ResolveTabBarDerivedOptions<TIcon>, 'active' | 'tabWidth'>
>;

export type ResolveTabBarStateOptionsParams<TIcon extends TabBarIconLike = TabBarIconLike> = {
	active?: number;
	props: TabBarStatePropsLike<TIcon>;
	tabWidth?: number;
};

export type TabBarRootStyleValue = {
	paddingBottom: string;
};

export type ResolveTabBarClickActionOptions = {
	index: number;
};

export type TabBarMeasuredClientWidthLike =
	| {
			clientWidth?: number | null;
	  }
	| null
	| undefined;

export type TabBarClickAction = {
	nextActive: number;
	shouldEmit: true;
};

const getSafeLabelCount = (labelCount = 0) => Math.max(labelCount, 1);
const getSafeLineW = (lineW = 4) => (lineW === 0 ? 1 : lineW);

export const resolveTabBarRootClass = (injClass = '') => joinClasses(['relative bg-white dark:bg-gray-800', injClass]);

export const resolveTabBarListClass = (): string => 'flex justify-between';

export const resolveTabBarIndicatorClass = (activeInjClass = '') =>
	joinClasses(['bg-primary dark:bg-dark absolute bottom-px mx-auto h-0.5 rounded-full transition-all', activeInjClass]);

// 输入组件层测得的容器节点，返回 TabBar 可复用的安全宽度。
// Normalize a component-measured container node into a reusable TabBar safe width.
export const resolveTabBarMeasuredClientWidth = (node?: TabBarMeasuredClientWidthLike): number => node?.clientWidth ?? 0;

// 输入 TabBar 点击索引，返回组件层可消费的 active 更新结果。
// Consume a clicked TabBar index and return the active update result for component usage.
export const resolveTabBarClickAction = ({ index }: ResolveTabBarClickActionOptions): TabBarClickAction => ({
	nextActive: index,
	shouldEmit: true
});

// 输入 TabBar 当前状态和测量宽度，返回框架无关的指示器尺寸。
// Consume current TabBar state and measured width, then return framework-agnostic indicator metrics.
export const resolveTabBarIndicatorMetrics = ({
	tabWidth = 0,
	labelCount = 0,
	active = 0,
	lineW = 4
}: ResolveTabBarIndicatorMetricsOptions = {}) => {
	const labelsLength = getSafeLabelCount(labelCount);
	const itemWidth = tabWidth / labelsLength;
	const activeWidth = itemWidth / getSafeLineW(lineW);
	const width = lineW < 1 ? itemWidth : Math.max(activeWidth, 2);
	const left = lineW < 1 ? active * itemWidth : active * itemWidth + itemWidth / 2 - activeWidth / 2;
	return {
		itemWidth,
		activeWidth,
		width,
		left
	};
};

export const resolveTabBarIndicatorStyleValue = (options: ResolveTabBarIndicatorMetricsOptions = {}) => {
	const metrics = resolveTabBarIndicatorMetrics(options);
	return {
		width: `${metrics.width}px`,
		left: `${metrics.left}px`
	};
};

export const resolveTabBarIndicatorStyleString = (options: ResolveTabBarIndicatorMetricsOptions = {}) => {
	const metrics = resolveTabBarIndicatorMetrics(options);
	return `width: ${metrics.width}px;left: ${metrics.left}px;`;
};

export const resolveTabBarRootStyleValue = (): TabBarRootStyleValue => ({
	paddingBottom: 'env(safe-area-inset-bottom)'
});

export const resolveTabBarRootStyleString = () => 'padding-bottom: env(safe-area-inset-bottom);';

export const resolveTabBarButtonClass = ({
	active = false,
	love = false,
	tabInjClass = '',
	activeTabInjClass = ''
}: ResolveTabBarButtonClassOptions = {}) =>
	joinClasses([
		'flex flex-1 flex-col items-center justify-center py-1 text-center active:opacity-80',
		active ? 'text-primary dark:text-dark' : 'text-black/80 dark:text-white/90',
		love ? 'text-lg' : 'text-sm',
		tabInjClass,
		active ? activeTabInjClass : ''
	]);

export const resolveTabBarIconWrapClass = (hasText = false) => (hasText ? '' : 'py-2');

export const resolveTabBarTextClass = ({ hasIcon = false, active = false }: { hasIcon?: boolean; active?: boolean } = {}) =>
	joinClasses([hasIcon ? 'mt-0.5' : 'py-1 text-lg', active && !hasIcon ? 'font-bold' : '']);

export const resolveTabBarIconSize = (size: TabBarIconLike['size'], love = false): number => {
	const baseSize = typeof size === 'number' ? size : 24;
	return baseSize * (love ? 1.2 : 1);
};

export const resolveTabBarIconProps = <TIcon extends TabBarIconLike>({
	label,
	active = false,
	love = false
}: ResolveTabBarIconOptions<TIcon>) => {
	if (!label.icon) return undefined;
	const icon = active && label.activeIcon ? { ...label.icon, ...label.activeIcon } : label.icon;
	return {
		...icon,
		size: resolveTabBarIconSize(icon.size, love)
	};
};

export const resolveTabBarIconPair = <TIcon extends TabBarIconLike>({
	label,
	active = false,
	love = false
}: ResolveTabBarIconOptions<TIcon>) => ({
	activeIcon: label.icon
		? {
				...label.icon,
				...label.activeIcon,
				name: label.activeIcon ? label.activeIcon.name : label.icon.name,
				size: resolveTabBarIconSize(label.activeIcon?.size ?? label.icon.size, love)
			}
		: undefined,
	inactiveIcon: label.icon
		? {
				...label.icon,
				name: label.icon.name,
				size: resolveTabBarIconSize(label.icon.size, love)
			}
		: undefined,
	activeHidden: !active,
	activeClass: active ? '' : 'hidden',
	inactiveClass: active ? 'hidden' : '',
	inactiveHidden: active
});

// 输入单个 TabBar 标签状态，返回框架无关的按钮、文本和图标派生数据。
// Convert one TabBar label state into framework-agnostic button, text and icon derived data.
export const resolveTabBarItemDerived = <TIcon extends TabBarIconLike>({
	label,
	index,
	active = 0,
	love = false,
	tabInjClass = '',
	activeTabInjClass = ''
}: ResolveTabBarItemDerivedOptions<TIcon>) => {
	const isActive = index === active;
	const hasIcon = Boolean(label.icon);
	const hasText = Boolean(label.text);

	return {
		label,
		index,
		active: isActive,
		hasIcon,
		hasText,
		buttonClass: resolveTabBarButtonClass({ active: isActive, love, tabInjClass, activeTabInjClass }),
		iconWrapClass: resolveTabBarIconWrapClass(hasText),
		textClass: resolveTabBarTextClass({ hasIcon, active: isActive }),
		iconProps: resolveTabBarIconProps({ label, active: isActive, love }),
		iconPair: resolveTabBarIconPair({ label, active: isActive, love })
	};
};

// 输入 TabBar 标签列表和当前状态，返回每个按钮可直接绑定的框架无关派生数据。
// Receive TabBar labels and current state, then return framework-agnostic derived data for each button.
export const resolveTabBarItemDerivedList = <TIcon extends TabBarIconLike = TabBarIconLike>({
	labels = [],
	active = 0,
	love = false,
	tabInjClass = '',
	activeTabInjClass = ''
}: ResolveTabBarItemDerivedListOptions<TIcon> = {}) =>
	labels.map((label, index) => resolveTabBarItemDerived({ label, index, active, love, tabInjClass, activeTabInjClass }));

// 输入组件 props、当前 active 和测量宽度，返回框架无关的 TabBar 派生入参。
// Receive component props, current active state and measured width, then return framework-agnostic TabBar derivation options.
export const resolveTabBarStateOptions = <TIcon extends TabBarIconLike = TabBarIconLike>({
	active,
	props,
	tabWidth
}: ResolveTabBarStateOptionsParams<TIcon>): ResolveTabBarDerivedOptions<TIcon> => ({
	active,
	activeInjClass: props.activeInjClass,
	activeTabInjClass: props.activeTabInjClass,
	injClass: props.injClass,
	labels: props.labels,
	line: props.line,
	lineW: props.lineW,
	love: props.love,
	tabInjClass: props.tabInjClass,
	tabWidth
});

// 输入 TabBar 当前状态和组件测量宽度，返回组件层可直接绑定的框架无关派生结果。
// Receive current TabBar state and measured width, then return framework-agnostic derived values ready for component binding.
export const resolveTabBarDerived = <TIcon extends TabBarIconLike = TabBarIconLike>({
	labels = [],
	active = 0,
	tabWidth = 0,
	line = false,
	lineW = 4,
	love = false,
	injClass = '',
	tabInjClass = '',
	activeTabInjClass = '',
	activeInjClass = ''
}: ResolveTabBarDerivedOptions<TIcon> = {}) => ({
	rootClass: resolveTabBarRootClass(injClass),
	listClass: resolveTabBarListClass(),
	rootStyleValue: resolveTabBarRootStyleValue(),
	rootStyleString: resolveTabBarRootStyleString(),
	showIndicator: Boolean(line),
	indicatorClass: resolveTabBarIndicatorClass(activeInjClass),
	indicatorStyleValue: resolveTabBarIndicatorStyleValue({ tabWidth, labelCount: labels.length, active, lineW }),
	indicatorStyleString: resolveTabBarIndicatorStyleString({ tabWidth, labelCount: labels.length, active, lineW }),
	items: resolveTabBarItemDerivedList({ labels, active, love, tabInjClass, activeTabInjClass })
});
