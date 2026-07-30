import { durationObj, radiusObj } from './common.js';

export const tabsMxClass = {
	'0': 'mx-0',
	'1': 'mx-1',
	'2': 'mx-2',
	'3': 'mx-3',
	'4': 'mx-4',
	'6': 'mx-6',
	'8': 'mx-8',
	'12': 'mx-12',
	'16': 'mx-16',
	'20': 'mx-20'
} as const;

export type TabLayout = 'h' | 'v' | string;
export type TabsPosition = 't' | 'b' | 'l' | 'r' | string;
export type TabDurationKey = keyof typeof durationObj | string;
export type TabRadiusKey = keyof typeof radiusObj | string;
export type TabMxKey = keyof typeof tabsMxClass | string;

export type TabsPositionState = {
	isBottom: boolean;
	isHorizontal: boolean;
	isLeft: boolean;
	isRight: boolean;
	isTop: boolean;
	isVertical: boolean;
	layout: 'h' | 'v';
};

export type ResolveTabMetricsOptions = {
	width?: number;
	height?: number;
	active?: number;
	labelCount?: number;
	layout?: TabLayout;
	lineType?: boolean;
};

export type ResolveTabOverflowMetricsOptions = {
	width?: number;
	height?: number;
	active?: number;
	labelCount?: number;
	showNum?: number;
};

export type ResolveTabClassOptions = {
	lineType?: boolean;
	layout?: TabLayout;
	radiusClass?: string;
	durationClass?: string;
	mxClass?: string;
	injClass?: string;
	activeInjClass?: string;
	overflow?: boolean;
};

export type ResolveTabButtonClassOptions = {
	layout?: TabLayout;
	love?: boolean;
	radiusClass?: string;
	tabInjClass?: string;
	active?: boolean;
	activeTabInjClass?: string;
	overflow?: boolean;
};

export type ResolveTabClickActionOptions = {
	index: number;
};

export type TabClickAction = {
	nextActive: number;
	shouldEmit: true;
};

export type TabWidthStyleValue = {
	width: string;
};

export type TabIndicatorStyleValue = {
	height: string;
	left: string;
	top?: string;
	width: string;
};

export type TabsTransitionStyleValue = {
	left: string;
	width: string;
};

export type TabsTransitionMetrics = {
	left: number;
	width: number;
};

export type ResolveTabsDerivedOptions = {
	active?: number;
	duration?: TabDurationKey;
	labelCount?: number;
	position?: TabsPosition;
	transition?: boolean;
	width?: number;
};
export type TabsStatePropsLike = Partial<Omit<ResolveTabsDerivedOptions, 'active' | 'labelCount' | 'width'>>;
export type ResolveTabsStateOptionsParams = {
	active?: number;
	labelCount?: number;
	props: TabsStatePropsLike;
	width?: number;
};
export type TabsLabelSource =
	| {
			labels?: { length: number } | null;
	  }
	| null
	| undefined;

export type TabsDerived = {
	positionState: TabsPositionState;
	showTransitionViewport: boolean;
	transitionClass: string;
	transitionMetrics: TabsTransitionMetrics;
	transitionStyleString: string;
	transitionStyleValue: TabsTransitionStyleValue;
	verticalContentClass: string;
	verticalRootClass: string;
	viewportClass: string;
};

export type ResolveTabWidthStyleOptions = {
	width?: number;
};

export type TabsMeasuredClientWidthLike =
	| {
			clientWidth?: number | null;
	  }
	| null
	| undefined;

export type TabMeasuredRectLike =
	| {
			width?: number | null;
			height?: number | null;
	  }
	| null
	| undefined;

export type TabMeasuredSize = {
	width: number;
	height: number;
};

export type TabMeasuredSizeState = {
	tabWidth: number;
	tabHeight: number;
	overflowWidth: number;
	overflowHeight: number;
};

export type ResolveTabMeasuredSizeStateOptions = {
	current?: Partial<TabMeasuredSizeState>;
	tabRect?: TabMeasuredRectLike;
	overflowRect?: TabMeasuredRectLike;
};

export type ResolveTabOverflowIndicatorStyleOptions = {
	activeH?: number;
	activeLeft?: number;
	activeW?: number;
	lineType?: boolean;
};

export type ResolveTabIndicatorStyleOptions = {
	activeH?: number;
	activeLeft?: number;
	activeTop?: number;
	activeW?: number;
	layout?: TabLayout;
	lineType?: boolean;
};

export type ResolveTabDerivedOptions<TLabel = unknown> = {
	labels?: readonly TLabel[];
	active?: number;
	lineType?: boolean;
	radius?: TabRadiusKey | '';
	duration?: TabDurationKey;
	layout?: TabLayout;
	love?: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
	mx?: TabMxKey;
	overflow?: boolean;
	showNum?: number;
	width?: number;
	height?: number;
	overflowWidth?: number;
	overflowHeight?: number;
	showIndexesOffset?: number;
};
export type TabStatePropsLike<TLabel = unknown> = Partial<ResolveTabDerivedOptions<TLabel>>;
export type ResolveTabStateOptionsParams<TLabel = unknown> = {
	props: TabStatePropsLike<TLabel>;
};

export type TabAutoScrollState = {
	offset: number;
	offsetChanged: boolean;
	scrollLeft: number;
	shouldScroll: boolean;
};

export type ResolveTabAutoScrollActionOptions = {
	autoScroll?: boolean;
	hasScrollElement?: boolean;
	scrollState: TabAutoScrollState;
	showOverflow?: boolean;
};

export type TabAutoScrollAction = {
	nextOffset: number;
	scrollLeft: number;
	shouldScroll: boolean;
	shouldUpdateOffset: boolean;
};

export type TabMetricsState = {
	activeH: number;
	activeLeft: number;
	activeTop: number;
	activeW: number;
	lineWidth: number;
	paddedHeight: number;
	paddedWidth: number;
};

export type TabOverflowMetricsState = {
	activeH: number;
	activeLeft: number;
	activeW: number;
	itemW: number;
	lineWidth: number;
	listWidth: number;
};

export type TabItemDerived<TLabel = unknown> = {
	active: boolean;
	buttonClass: string;
	index: number;
	label: TLabel;
	overflowButtonClass: string;
	overflowButtonStyleString: string;
	overflowButtonStyleValue: TabWidthStyleValue;
};
export type ResolveTabButtonRenderStateOptions<TLabel = unknown> = {
	item: Pick<TabItemDerived<TLabel>, 'buttonClass' | 'overflowButtonClass' | 'overflowButtonStyleString' | 'overflowButtonStyleValue'>;
	overflow?: boolean;
};
export type TabButtonRenderState = {
	buttonClass: string;
	styleString: string;
	styleValue?: TabWidthStyleValue;
};

export type TabSectionDerived = {
	indicatorClass: string;
	indicatorStyleString: string;
	indicatorStyleValue: TabIndicatorStyleValue;
	lineStyleString: string;
	lineStyleValue: TabWidthStyleValue;
	lineVisible: boolean;
	listClass: string;
	metrics: TabMetricsState;
	rootClass: string;
};

export type TabOverflowSectionDerived = {
	autoScrollState: TabAutoScrollState;
	indicatorClass: string;
	indicatorStyleString: string;
	indicatorStyleValue: TabIndicatorStyleValue;
	itemW: number;
	lineStyleString: string;
	lineStyleValue: TabWidthStyleValue;
	lineVisible: boolean;
	listClass: string;
	listStyleString: string;
	listStyleValue: TabWidthStyleValue;
	metrics: TabOverflowMetricsState;
	rootClass: string;
	showIndexes: number[];
};

export type TabDerived<TLabel = unknown> = {
	activeIndex: number;
	durationClass: string;
	iconClass: string;
	items: TabItemDerived<TLabel>[];
	labelCount: number;
	lineClass: string;
	mxClass: string;
	normal: TabSectionDerived;
	overflow: TabOverflowSectionDerived;
	radiusClass: string;
	showOverflow: boolean;
	textClass: string;
};

const getSafeLabelCount = (labelCount = 0) => Math.max(labelCount, 1);
const getSafeShowCount = (showNum = 3) => Math.max(showNum + 0.5, 1);
const toPx = (value = 0) => `${value}px`;

// 输入 Tabs 配置，返回组件层统一使用的标签数量。
// Receive Tabs config and return the label count used consistently by component implementations.
export const resolveTabsLabelCount = (tab?: TabsLabelSource): number => tab?.labels?.length ?? 0;

// 输入组件层测得的视口节点，返回 Tabs 可复用的安全宽度。
// Normalize a component-measured viewport node into a reusable Tabs safe width.
export const resolveTabsMeasuredClientWidth = (node?: TabsMeasuredClientWidthLike): number => node?.clientWidth ?? 0;

// 输入组件层测量到的 Tab 矩形，返回框架无关的宽高快照。
// Receive a Tab rect measured by the component layer and return a framework-agnostic size snapshot.
export const resolveTabMeasuredSize = (rect?: TabMeasuredRectLike): TabMeasuredSize | undefined =>
	rect ? { width: rect.width ?? 0, height: rect.height ?? 0 } : undefined;

// 输入当前尺寸和本次 DOM 测量结果，返回组件层可写入的下一份尺寸状态。
// Receive current sizes and the latest DOM measurements, then return the next size state for component bindings.
export const resolveTabMeasuredSizeState = ({
	current = {},
	tabRect,
	overflowRect
}: ResolveTabMeasuredSizeStateOptions = {}): TabMeasuredSizeState => {
	const tabSize = resolveTabMeasuredSize(tabRect);
	const overflowSize = resolveTabMeasuredSize(overflowRect);

	return {
		tabWidth: tabSize?.width ?? current.tabWidth ?? 0,
		tabHeight: tabSize?.height ?? current.tabHeight ?? 0,
		overflowWidth: overflowSize?.width ?? current.overflowWidth ?? 0,
		overflowHeight: overflowSize?.height ?? current.overflowHeight ?? 0
	};
};

export const resolveTabDurationClass = (duration: TabDurationKey = 'base') =>
	durationObj[duration as keyof typeof durationObj] || durationObj.base;

export const resolveTabIconClass = (duration: TabDurationKey = 'base'): string => ['mr-0.5', resolveTabDurationClass(duration)].join(' ');

export const resolveTabTextClass = (duration: TabDurationKey = 'base'): string =>
	['transition-all', resolveTabDurationClass(duration)].join(' ');

export const resolveTabRadiusClass = (radius: TabRadiusKey | '' = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)';

export const resolveTabMxClass = (mx: TabMxKey = '2') => tabsMxClass[mx as keyof typeof tabsMxClass] || tabsMxClass['2'];

// 输入 Tab 点击索引，返回组件层可消费的 active 更新结果。
// Consume a clicked Tab index and return the active update result for component usage.
export const resolveTabClickAction = ({ index }: ResolveTabClickActionOptions): TabClickAction => ({
	nextActive: index,
	shouldEmit: true
});

// 输入 Tabs 点击索引，返回组件层可消费的 active 更新结果。
// Consume a clicked Tabs index and return the active update result for component usage.
export const resolveTabsClickAction = resolveTabClickAction;

// 输入 Tabs 位置配置，返回框架无关的位置标记。
// Resolve Tabs position config into framework-agnostic position flags.
export const resolveTabsPositionState = (position: TabsPosition = 't'): TabsPositionState => {
	const isTop = position === 't';
	const isBottom = position === 'b';
	const isLeft = position === 'l';
	const isRight = position === 'r';
	const isHorizontal = isTop || isBottom;
	return {
		isBottom,
		isHorizontal,
		isLeft,
		isRight,
		isTop,
		isVertical: isLeft || isRight,
		layout: isHorizontal ? 'h' : 'v'
	};
};

export const resolveTabsHorizontal = (position: TabsPosition = 't') => resolveTabsPositionState(position).isHorizontal;

export const resolveTabShowOverflow = (options: { overflow?: boolean; layout?: TabLayout } = {}) => {
	const { overflow = false, layout = 'h' } = options;
	return overflow && layout === 'h';
};

export const resolveTabLineActive = (options: { lineType?: boolean; layout?: TabLayout; overflow?: boolean } = {}) => {
	const { lineType = false, layout = 'h', overflow = false } = options;
	return overflow ? lineType : lineType && layout !== 'v';
};

export const resolveTabLineClass = (): string => 'absolute bottom-0 h-0.5 w-full bg-black/5 dark:bg-white/5';

// 输入 Tab 状态和测量尺寸，返回框架无关的指示器布局数值。
// Resolve Tab state and measured size into framework-agnostic indicator metrics.
export const resolveTabMetrics = (options: ResolveTabMetricsOptions = {}) => {
	const { width = 0, height = 0, active = 0, labelCount = 0, layout = 'h', lineType = false } = options;
	const labelsLength = getSafeLabelCount(labelCount);
	const paddedWidth = width - 4;
	const paddedHeight = height - 4;
	const isHorizontal = layout === 'h';
	const itemWidth = paddedWidth / labelsLength;
	const itemHeight = paddedHeight / labelsLength;

	return {
		paddedWidth,
		paddedHeight,
		activeW: isHorizontal ? itemWidth : paddedWidth,
		activeH: isHorizontal ? paddedHeight : itemHeight,
		activeLeft: isHorizontal ? 2 + active * itemWidth : 2,
		activeTop: isHorizontal ? (lineType ? height - 2 : 2) : 2 + active * itemHeight,
		lineWidth: paddedWidth
	};
};

export const resolveTabOverflowMetrics = (options: ResolveTabOverflowMetricsOptions = {}) => {
	const { width = 0, height = 0, active = 0, labelCount = 0, showNum = 3 } = options;
	const itemW = (width - 4) / getSafeShowCount(showNum);
	const activeH = height - 4;

	return {
		itemW,
		activeW: itemW,
		activeH,
		activeLeft: 2 + active * itemW,
		lineWidth: itemW * labelCount,
		listWidth: itemW * labelCount + 2
	};
};

// 输入 Tab 宽度数值，返回组件层可直接绑定的宽度样式。
// Consume a Tab width number and return width style for component binding.
export const resolveTabWidthStyleValue = ({ width = 0 }: ResolveTabWidthStyleOptions = {}): TabWidthStyleValue => ({
	width: toPx(width)
});

export const resolveTabWidthStyleString = (options: ResolveTabWidthStyleOptions = {}) => {
	const style = resolveTabWidthStyleValue(options);
	return `width: ${style.width};`;
};

// 输入溢出 Tab 指示器状态，返回框架无关的布局样式。
// Resolve overflow Tab indicator state into framework-agnostic layout style.
export const resolveTabOverflowIndicatorStyleValue = (options: ResolveTabOverflowIndicatorStyleOptions = {}): TabIndicatorStyleValue => {
	const { activeW = 0, activeH = 0, activeLeft = 0, lineType = false } = options;
	return {
		width: toPx(activeW),
		height: toPx(lineType ? 2 : activeH),
		left: toPx(activeLeft)
	};
};

export const resolveTabOverflowIndicatorStyleString = (options: ResolveTabOverflowIndicatorStyleOptions = {}) => {
	const style = resolveTabOverflowIndicatorStyleValue(options);
	return `width: ${style.width};height: ${style.height};left: ${style.left};`;
};

// 输入常规 Tab 指示器状态，返回框架无关的布局样式。
// Resolve normal Tab indicator state into framework-agnostic layout style.
export const resolveTabIndicatorStyleValue = (options: ResolveTabIndicatorStyleOptions = {}): TabIndicatorStyleValue => {
	const { activeW = 0, activeH = 0, activeLeft = 0, activeTop = 0, lineType = false, layout = 'h' } = options;
	const isLine = resolveTabLineActive({ lineType, layout });
	return {
		width: toPx(activeW),
		height: toPx(isLine ? 2 : activeH),
		left: toPx(activeLeft),
		top: toPx(activeTop)
	};
};

export const resolveTabIndicatorStyleString = (options: ResolveTabIndicatorStyleOptions = {}) => {
	const style = resolveTabIndicatorStyleValue(options);
	return `width: ${style.width};height: ${style.height};left: ${style.left};top: ${style.top};`;
};

export const resolveTabShowIndexes = (showNum = 3, offset = 0) => {
	const count = Math.max(Math.floor(showNum), 0) + 1;
	return Array.from({ length: count }, (_, index) => index + offset);
};

export const resolveTabAutoScroll = (options: { active?: number; showIndexes?: number[]; itemW?: number; currentOffset?: number } = {}) => {
	const { active = 0, showIndexes = [], itemW = 0, currentOffset = 0 } = options;
	const firstIndex = showIndexes[0];
	const lastIndex = showIndexes[showIndexes.length - 1];
	const shouldScroll = showIndexes.length > 0 && itemW !== 0 && (active >= lastIndex || active <= firstIndex);
	const offset = active - 1;

	return {
		shouldScroll,
		scrollLeft: shouldScroll ? offset * itemW : 0,
		offset: shouldScroll ? offset : currentOffset,
		offsetChanged: shouldScroll && offset !== currentOffset
	};
};

// 输入 Tab 自动滚动状态，返回组件层可执行的滚动动作，DOM scrollLeft 写入留在组件内。
// Receive Tab auto-scroll state and return the scroll action for component bindings while DOM scrollLeft writes stay in the component layer.
export const resolveTabAutoScrollAction = ({
	autoScroll = true,
	hasScrollElement = false,
	scrollState,
	showOverflow = false
}: ResolveTabAutoScrollActionOptions): TabAutoScrollAction => {
	const shouldScroll = Boolean(hasScrollElement && autoScroll && showOverflow && scrollState.shouldScroll);
	return {
		nextOffset: scrollState.offset,
		scrollLeft: scrollState.scrollLeft,
		shouldScroll,
		shouldUpdateOffset: shouldScroll && scrollState.offsetChanged
	};
};

export const resolveTabRootClass = (options: ResolveTabClassOptions = {}) => {
	const {
		lineType = false,
		layout = 'h',
		radiusClass = 'rounded-(--radius-form)',
		mxClass = tabsMxClass['2'],
		injClass = '',
		overflow = false
	} = options;
	const isLine = resolveTabLineActive({ lineType, layout, overflow });
	const baseClass = overflow ? 'no-scrollbar relative overflow-auto scroll-smooth p-0.5' : 'relative p-0.5';
	return [isLine ? '' : 'bg-black/5 dark:bg-white/10', baseClass, radiusClass, mxClass, injClass].filter(Boolean).join(' ');
};

export const resolveTabIndicatorClass = (options: ResolveTabClassOptions = {}) => {
	const {
		lineType = false,
		layout = 'h',
		radiusClass = 'rounded-(--radius-form)',
		durationClass = durationObj.base,
		activeInjClass = '',
		overflow = false
	} = options;
	const isLine = resolveTabLineActive({ lineType, layout, overflow });
	return [
		isLine ? '' : 'dark:shadow-xs shadow-sm dark:shadow-white/10',
		'absolute transition-all',
		durationClass,
		radiusClass,
		isLine ? 'bg-primary dark:bg-dark bottom-0' : 'bg-bg-highlight dark:bg-bg-highlight-dark',
		activeInjClass
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveTabListClass = (layout: TabLayout = 'h') =>
	['relative', layout === 'h' ? 'flex justify-between' : 'whitespace-nowrap px-4'].join(' ');

export const resolveTabOverflowListClass = (): string => 'relative flex whitespace-nowrap';

export const resolveTabButtonClass = (options: ResolveTabButtonClassOptions = {}) => {
	const {
		layout = 'h',
		love = false,
		radiusClass = 'rounded-(--radius-form)',
		tabInjClass = '',
		active = false,
		activeTabInjClass = '',
		overflow = false
	} = options;
	return [
		'flex',
		overflow ? 'shrink-0 py-1' : `flex-1 ${layout === 'h' ? 'py-1' : 'py-2'}`,
		'justify-center overflow-hidden font-medium',
		love ? 'text-lg' : 'text-sm',
		'leading-6',
		radiusClass,
		tabInjClass,
		active ? activeTabInjClass : ''
	]
		.filter(Boolean)
		.join(' ');
};

// 输入 Tab item 派生结果和展示模式，返回组件层可直接绑定的按钮 class 与 style。
// Receive a derived Tab item and display mode, then return bind-ready button classes and styles.
export const resolveTabButtonRenderState = <TLabel = unknown>({
	item,
	overflow = false
}: ResolveTabButtonRenderStateOptions<TLabel>): TabButtonRenderState => ({
	buttonClass: overflow ? item.overflowButtonClass : item.buttonClass,
	styleString: overflow ? item.overflowButtonStyleString : '',
	styleValue: overflow ? item.overflowButtonStyleValue : undefined
});

export const resolveTabsViewportClass = (): string => 'overflow-hidden';

// 输入 Tabs 结构状态，返回组件实现可复用的框架无关 class。
// Receive Tabs structure state and return framework-agnostic classes for component implementations.
export const resolveTabsVerticalRootClass = (): string => 'flex';

export const resolveTabsVerticalContentClass = (): string => 'grow';

export const resolveTabsShowTransitionViewport = ({
	transition = true,
	position = 't'
}: { position?: TabsPosition; transition?: boolean } = {}): boolean => Boolean(transition && resolveTabsHorizontal(position));

// 输入 Tabs 动画时长配置，返回框架无关的内容切换容器 class。
// Receive Tabs animation duration config and return a framework-agnostic transition content class.
export const resolveTabsTransitionClass = (duration: TabDurationKey = 'base'): string =>
	['relative flex transition-all', resolveTabDurationClass(duration)].join(' ');

// 只计算 Tabs 内容切换的宽度和偏移，slot 渲染留在组件层。
// Only calculate Tabs content width and offset; slot rendering stays in the component layer.
export const resolveTabsTransitionMetrics = (options: { labelCount?: number; width?: number; active?: number } = {}) => {
	const { labelCount = 0, width = 0, active = 0 } = options;
	return {
		width: labelCount * width,
		left: -active * width
	};
};

// 输入 Tabs 内容切换数值，返回组件层可直接绑定的样式。
// Resolve Tabs transition metrics into styles that components can bind directly.
export const resolveTabsTransitionStyleValue = (metrics: { width?: number; left?: number } = {}): TabsTransitionStyleValue => ({
	width: toPx(metrics.width),
	left: toPx(metrics.left)
});

export const resolveTabsTransitionStyleString = (metrics: { width?: number; left?: number } = {}) => {
	const style = resolveTabsTransitionStyleValue(metrics);
	return `width: ${style.width};left: ${style.left};`;
};

// 输入组件 props、当前 active 和测量宽度，返回框架无关的 Tabs 派生入参。
// Receive component props, current active state and measured width, then return framework-agnostic Tabs derivation options.
export const resolveTabsStateOptions = ({
	active,
	labelCount,
	props,
	width
}: ResolveTabsStateOptionsParams): ResolveTabsDerivedOptions => ({
	active,
	duration: props.duration,
	labelCount,
	position: props.position,
	transition: props.transition,
	width
});

// 输入 Tabs props 和组件层测量宽度，返回框架无关的位置与内容切换派生结果。
// Receive Tabs props and component-measured width, then return framework-agnostic position and transition derivations.
export const resolveTabsDerived = ({
	active = 0,
	duration = 'base',
	labelCount = 0,
	position = 't',
	transition = true,
	width = 0
}: ResolveTabsDerivedOptions = {}): TabsDerived => {
	const transitionMetrics = resolveTabsTransitionMetrics({ labelCount, width, active });
	return {
		positionState: resolveTabsPositionState(position),
		showTransitionViewport: resolveTabsShowTransitionViewport({ transition, position }),
		transitionClass: resolveTabsTransitionClass(duration),
		transitionMetrics,
		transitionStyleString: resolveTabsTransitionStyleString(transitionMetrics),
		transitionStyleValue: resolveTabsTransitionStyleValue(transitionMetrics),
		verticalContentClass: resolveTabsVerticalContentClass(),
		verticalRootClass: resolveTabsVerticalRootClass(),
		viewportClass: resolveTabsViewportClass()
	};
};

// 输入组件 props 和测量值，返回框架无关的 Tab 派生入参。
// Receive component props and measured values, then return framework-agnostic Tab derivation options.
export const resolveTabStateOptions = <TLabel = unknown>({
	props
}: ResolveTabStateOptionsParams<TLabel>): ResolveTabDerivedOptions<TLabel> => ({
	active: props.active,
	activeInjClass: props.activeInjClass,
	activeTabInjClass: props.activeTabInjClass,
	duration: props.duration,
	height: props.height,
	injClass: props.injClass,
	labels: props.labels,
	layout: props.layout,
	lineType: props.lineType,
	love: props.love,
	mx: props.mx,
	overflow: props.overflow,
	overflowHeight: props.overflowHeight,
	overflowWidth: props.overflowWidth,
	radius: props.radius,
	showIndexesOffset: props.showIndexesOffset,
	showNum: props.showNum,
	tabInjClass: props.tabInjClass,
	width: props.width
});

// 输入 Tab 状态和组件层测量值，返回框架无关的 class、style 与滚动计算结果。
// Receive Tab state and component-layer measurements, then return framework-agnostic classes, styles and scroll calculations.
export const resolveTabDerived = <TLabel = unknown>({
	labels = [],
	active = 0,
	lineType = false,
	radius = '',
	duration = 'base',
	layout = 'h',
	love = false,
	injClass = '',
	tabInjClass = '',
	activeTabInjClass = '',
	activeInjClass = '',
	mx = '2',
	overflow = false,
	showNum = 3,
	width = 0,
	height = 0,
	overflowWidth = width,
	overflowHeight = height,
	showIndexesOffset = 0
}: ResolveTabDerivedOptions<TLabel> = {}): TabDerived<TLabel> => {
	const labelCount = labels.length;
	const durationClass = resolveTabDurationClass(duration);
	const radiusClass = resolveTabRadiusClass(radius);
	const mxClass = resolveTabMxClass(mx);
	const iconClass = resolveTabIconClass(duration);
	const textClass = resolveTabTextClass(duration);
	const showOverflow = resolveTabShowOverflow({ overflow, layout });
	const lineClass = resolveTabLineClass();
	const normalMetrics = resolveTabMetrics({ width, height, active, labelCount, layout, lineType });
	const overflowMetrics = resolveTabOverflowMetrics({ width: overflowWidth, height: overflowHeight, active, labelCount, showNum });
	const normalLineStyleValue = resolveTabWidthStyleValue({ width: normalMetrics.lineWidth });
	const overflowLineStyleValue = resolveTabWidthStyleValue({ width: overflowMetrics.lineWidth });
	const normalIndicatorStyleValue = resolveTabIndicatorStyleValue({
		activeW: normalMetrics.activeW,
		activeH: normalMetrics.activeH,
		activeLeft: normalMetrics.activeLeft,
		activeTop: normalMetrics.activeTop,
		lineType,
		layout
	});
	const overflowIndicatorStyleValue = resolveTabOverflowIndicatorStyleValue({
		activeW: overflowMetrics.activeW,
		activeH: overflowMetrics.activeH,
		activeLeft: overflowMetrics.activeLeft,
		lineType
	});
	const showIndexes = resolveTabShowIndexes(showNum, showIndexesOffset);
	const overflowButtonStyleValue = resolveTabWidthStyleValue({ width: overflowMetrics.itemW });

	return {
		activeIndex: active,
		durationClass,
		iconClass,
		items: labels.map((label, index) => ({
			active: index === active,
			buttonClass: resolveTabButtonClass({ layout, love, radiusClass, tabInjClass, active: index === active, activeTabInjClass }),
			index,
			label,
			overflowButtonClass: resolveTabButtonClass({
				layout,
				love,
				radiusClass,
				tabInjClass,
				active: index === active,
				activeTabInjClass,
				overflow: true
			}),
			overflowButtonStyleString: resolveTabWidthStyleString({ width: overflowMetrics.itemW }),
			overflowButtonStyleValue
		})),
		labelCount,
		lineClass,
		mxClass,
		normal: {
			indicatorClass: resolveTabIndicatorClass({ lineType, layout, radiusClass, durationClass, activeInjClass }),
			indicatorStyleString: resolveTabIndicatorStyleString({
				activeW: normalMetrics.activeW,
				activeH: normalMetrics.activeH,
				activeLeft: normalMetrics.activeLeft,
				activeTop: normalMetrics.activeTop,
				lineType,
				layout
			}),
			indicatorStyleValue: normalIndicatorStyleValue,
			lineStyleString: resolveTabWidthStyleString({ width: normalMetrics.lineWidth }),
			lineStyleValue: normalLineStyleValue,
			lineVisible: resolveTabLineActive({ lineType, layout }),
			listClass: resolveTabListClass(layout),
			metrics: normalMetrics,
			rootClass: resolveTabRootClass({ lineType, layout, radiusClass, mxClass, injClass })
		},
		overflow: {
			autoScrollState: resolveTabAutoScroll({ active, showIndexes, itemW: overflowMetrics.itemW, currentOffset: showIndexesOffset }),
			indicatorClass: resolveTabIndicatorClass({ lineType, layout, radiusClass, durationClass, activeInjClass, overflow: true }),
			indicatorStyleString: resolveTabOverflowIndicatorStyleString({
				activeW: overflowMetrics.activeW,
				activeH: overflowMetrics.activeH,
				activeLeft: overflowMetrics.activeLeft,
				lineType
			}),
			indicatorStyleValue: overflowIndicatorStyleValue,
			itemW: overflowMetrics.itemW,
			lineStyleString: resolveTabWidthStyleString({ width: overflowMetrics.lineWidth }),
			lineStyleValue: overflowLineStyleValue,
			lineVisible: resolveTabLineActive({ lineType, layout, overflow: true }),
			listClass: resolveTabOverflowListClass(),
			listStyleString: resolveTabWidthStyleString({ width: overflowMetrics.listWidth }),
			listStyleValue: resolveTabWidthStyleValue({ width: overflowMetrics.listWidth }),
			metrics: overflowMetrics,
			rootClass: resolveTabRootClass({ lineType, layout, radiusClass, mxClass, injClass, overflow: true }),
			showIndexes
		},
		radiusClass,
		showOverflow,
		textClass
	};
};
