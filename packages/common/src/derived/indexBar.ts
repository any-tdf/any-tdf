import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export type IndexBarRadiusKey = keyof typeof radiusObj | string;
export type ResolveIndexBarMeasuredHeightsStateOptions = {
	currentHeights?: readonly number[];
	measuredHeights?: readonly number[];
};
export type IndexBarMeasuredHeightsState = {
	groupHeights: number[];
	longSumList: number[];
	shouldUpdate: boolean;
};
export type ResolveIndexBarMeasuredBarHeightStateOptions = {
	currentBarHeight?: number;
	measuredBarHeight?: number;
};
export type IndexBarMeasuredClientHeightLike =
	| {
			clientHeight?: number | null;
	  }
	| null
	| undefined;
export type IndexBarMeasuredBarHeightState = {
	barHeight: number;
	shouldUpdate: boolean;
};
export type IndexBarBodyStyleValue = {
	height: string;
};
export type IndexBarBarStyleValue = {
	minHeight: string;
	top: string;
};
export type IndexBarBubbleTransitionParams = {
	duration: number;
	x: number;
};
export type ResolveIndexBarBodyStyleOptions = {
	height?: number;
};
export type ResolveIndexBarBarStyleOptions = {
	barHeight?: number;
	height?: number;
	top?: number;
};
export type ResolveIndexBarDerivedOptions<TGroup> = ResolveIndexBarBarStyleOptions & {
	current?: number;
	currentTouch?: number;
	data?: readonly TGroup[];
	radius?: IndexBarRadiusKey;
	scrollAlign?: boolean;
	titleInjClass?: string;
	textInjClass?: string;
};
export type IndexBarGroupViewState<TGroup> = {
	group: TGroup;
	index: number;
	groupClass: string;
	titleClass: string;
	childClass: string;
	dividerClass: string;
};
export type IndexBarBarItemViewState<TGroup> = {
	group: TGroup;
	index: number;
	wrapperClass: string;
	itemClass: string;
	bubbleClass: string;
	bubbleVisible: boolean;
};
export type ResolveIndexBarTouchSelectActionOptions = {
	barToTop: number;
	clientY: number;
	dataLength: number;
	itemHeight: number;
};
export type IndexBarTouchSelectAction = {
	currentIndex: number;
	currentTouch: number;
	isDown: boolean;
	scrollIndex: number;
};
export type IndexBarTouchEndAction = {
	currentTouch: number;
	isDown: boolean;
};
export type IndexBarTouchState = {
	currentTouch: number;
	isDown: boolean;
};
export type ResolveIndexBarScrollActionOptions = {
	longSumList: readonly number[];
	scrollTop: number;
};
export type IndexBarScrollAction = {
	currentIndex: number;
	shouldUpdate: boolean;
};
export type IndexBarDerived<TGroup> = {
	radiusClass: string;
	itemHeight: number;
	barToTop: number;
	bodyClass: string;
	bodyStyle: IndexBarBodyStyleValue;
	bodyStyleString: string;
	barClass: string;
	barStyle: IndexBarBarStyleValue;
	barStyleString: string;
	bubbleTransitionParams: IndexBarBubbleTransitionParams;
	groups: IndexBarGroupViewState<TGroup>[];
	barItems: IndexBarBarItemViewState<TGroup>[];
};

const areIndexBarHeightsEqual = (currentHeights: readonly number[], measuredHeights: readonly number[]) =>
	currentHeights.length === measuredHeights.length && currentHeights.every((height, index) => height === measuredHeights[index]);

export const resolveIndexBarRadiusClass = (radius: IndexBarRadiusKey | '' = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

// 输入组件层测得的节点，返回 IndexBar 可复用的安全高度。
// Normalize a component-measured node into a reusable IndexBar safe height.
export const resolveIndexBarMeasuredClientHeight = (node?: IndexBarMeasuredClientHeightLike): number => node?.clientHeight ?? 0;

// 输入组件层测得的节点列表，返回 IndexBar 可复用的安全高度列表。
// Normalize component-measured nodes into reusable IndexBar safe heights.
export const resolveIndexBarMeasuredClientHeights = (nodes: readonly IndexBarMeasuredClientHeightLike[] = []): number[] =>
	nodes.map((node) => resolveIndexBarMeasuredClientHeight(node));

export const resolveIndexBarItemHeight = (barHeight: number, dataLength: number) => (dataLength > 0 ? barHeight / dataLength : 0);

export const resolveIndexBarTop = (options: { top?: number; height?: number; barHeight?: number } = {}) => {
	const { top = 0, height = 100, barHeight = 0 } = options;
	return top + (height - barHeight) / 2;
};

export const resolveIndexBarMinHeight = (height = 100) => height / 4;

// 输入 IndexBar 尺寸状态，返回组件层可直接绑定的内容区域样式。
// Resolve IndexBar size state into body styles for component binding.
export const resolveIndexBarBodyStyleValue = ({ height = 100 }: ResolveIndexBarBodyStyleOptions = {}): IndexBarBodyStyleValue => ({
	height: `${height}px`
});

export const resolveIndexBarBodyStyleString = (options: ResolveIndexBarBodyStyleOptions = {}) => {
	const style = resolveIndexBarBodyStyleValue(options);
	return `height:${style.height};`;
};

// 输入 IndexBar 位置和测量高度，返回框架无关的索引条样式。
// Resolve IndexBar position and measured height into framework-agnostic bar styles.
export const resolveIndexBarBarStyleValue = (options: ResolveIndexBarBarStyleOptions = {}): IndexBarBarStyleValue => ({
	top: `${resolveIndexBarTop(options)}px`,
	minHeight: `${resolveIndexBarMinHeight(options.height)}px`
});

export const resolveIndexBarBarStyleString = (options: ResolveIndexBarBarStyleOptions = {}) => {
	const style = resolveIndexBarBarStyleValue(options);
	return `top:${style.top};min-height:${style.minHeight};`;
};

// 输入 IndexBar 数据项，返回框架无关的分组高度列表。
// Convert IndexBar data items into a framework-agnostic group height list.
export const resolveIndexBarGroupHeights = <T extends { height?: number }>(data: readonly T[] = []) =>
	data.map((item) => item?.height ?? 0);

export const resolveIndexBarLongSumList = (heights: readonly number[] = []) => {
	const sums: number[] = [];
	for (let index = 0; index < heights.length + 1; index += 1) {
		sums.push(heights.slice(0, index).reduce((sum, itemHeight) => sum + itemHeight, 0));
	}
	return sums;
};

// 输入组件层测量到的分组高度，返回无副作用的高度和累计高度状态。
// Receive component-measured group heights and return side-effect-free height and sum state.
export const resolveIndexBarMeasuredHeightsState = ({
	currentHeights = [],
	measuredHeights = []
}: ResolveIndexBarMeasuredHeightsStateOptions = {}): IndexBarMeasuredHeightsState => {
	const groupHeights = [...measuredHeights];
	return {
		groupHeights,
		longSumList: resolveIndexBarLongSumList(groupHeights),
		shouldUpdate: !areIndexBarHeightsEqual(currentHeights, groupHeights)
	};
};

// 输入组件层测量到的索引条高度，返回是否需要同步到组件状态。
// Receive the measured index bar height and return whether component state should sync.
export const resolveIndexBarMeasuredBarHeightState = ({
	currentBarHeight = 0,
	measuredBarHeight = 0
}: ResolveIndexBarMeasuredBarHeightStateOptions = {}): IndexBarMeasuredBarHeightState => ({
	barHeight: measuredBarHeight,
	shouldUpdate: currentBarHeight !== measuredBarHeight
});

// 输入触摸位置和 bar 几何信息，返回框架无关的索引结果。
// Resolve touch position and bar geometry into a framework-agnostic index result.
export const resolveIndexBarTouchIndex = (options: { clientY: number; barToTop: number; itemHeight: number; dataLength: number }) => {
	const { clientY, barToTop, itemHeight, dataLength } = options;
	if (itemHeight <= 0 || dataLength <= 0) return 0;
	const rawIndex = Math.floor((clientY - barToTop) / itemHeight);
	return Math.max(0, Math.min(rawIndex, dataLength - 1));
};

export const resolveIndexBarScrollTop = (
	options: { index?: number; longSumList?: readonly number[]; heights?: readonly number[] } = {}
) => {
	const { index = 0, longSumList = [], heights = [] } = options;
	return longSumList[index] ?? heights.slice(0, index).reduce((sum, itemHeight) => sum + itemHeight, 0);
};

export const resolveIndexBarCurrentFromScroll = (options: { scrollTop: number; longSumList: readonly number[] }) => {
	const { scrollTop, longSumList } = options;
	for (let index = 0; index < longSumList.length; index += 1) {
		if (scrollTop >= longSumList[index] && scrollTop < longSumList[index + 1]) return index;
	}
	return -1;
};

export const resolveIndexBarBodyClass = (scrollAlign = true) => ['overflow-y-auto', scrollAlign ? 'snap-y' : ''].filter(Boolean).join(' ');

// 输入 IndexBar 内容项 class 配置，返回框架无关的标题和子项 class。
// Receive IndexBar content class config and return framework-agnostic title and child classes.
export const resolveIndexBarTitleClass = (injClass = '') => joinClasses(['text-primary dark:text-dark text-sm', injClass]);

export const resolveIndexBarChildClass = (injClass = '') => joinClasses(['w-full py-2 text-left', injClass]);

// 输入 IndexBar 结构状态，返回组件实现可复用的框架无关 class。
// Receive IndexBar structure state and return framework-agnostic classes for component implementations.
export const resolveIndexBarGroupClass = (): string => 'snap-start px-4 pt-8';

export const resolveIndexBarDividerClass = (): string => 'h-px bg-black/5 dark:bg-white/5';

export const resolveIndexBarItemWrapperClass = (): string => 'relative flex flex-1 flex-col justify-center';

export const resolveIndexBarBarClass = (radiusClass = 'rounded-(--radius-small)') =>
	['fixed right-5 flex w-7 cursor-move touch-none select-none flex-col justify-around bg-black/5 p-1 dark:bg-white/5', radiusClass]
		.filter(Boolean)
		.join(' ');

export const resolveIndexBarItemClass = (options: { active?: boolean; radiusClass?: string } = {}) => {
	const { active = false, radiusClass = 'rounded-(--radius-small)' } = options;
	return [
		'h-5 w-5 text-center text-xs leading-5 transition-all',
		active ? 'bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark' : 'text-gray-600 dark:text-gray-400',
		radiusClass
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveIndexBarBubbleClass = (radiusClass = 'rounded-(--radius-small)') =>
	[
		'border-primary text-primary dark:border-dark dark:text-dark absolute -left-24 top-1/2 h-14 w-14 -translate-y-2/4 border text-center text-3xl leading-14',
		radiusClass
	]
		.filter(Boolean)
		.join(' ');

// 输入 IndexBar 气泡状态，返回框架无关的过渡参数。
// Resolve IndexBar bubble state into framework-agnostic transition params.
export const resolveIndexBarBubbleTransitionParams = (): IndexBarBubbleTransitionParams => ({
	x: 38,
	duration: 300
});

export const resolveIndexBarContentTooShort = (options: { height?: number; barHeight?: number } = {}) => {
	const { height = 100, barHeight = 0 } = options;
	return height < barHeight;
};

// 输入 IndexBar 生命周期请求，返回组件层可写入的触摸初始态。
// Receive an IndexBar lifecycle request and return initial touch state for the component layer.
export const resolveIndexBarInitialTouchState = (): IndexBarTouchState => ({
	currentTouch: -1,
	isDown: false
});

// 输入触摸选择状态，返回组件层可直接写入的索引和滚动目标。
// Resolve touch selection state into index and scroll targets for component bindings.
export const resolveIndexBarTouchSelectAction = (options: ResolveIndexBarTouchSelectActionOptions): IndexBarTouchSelectAction => {
	const nextIndex = resolveIndexBarTouchIndex(options);
	return {
		currentIndex: nextIndex,
		currentTouch: nextIndex,
		isDown: true,
		scrollIndex: nextIndex
	};
};

// 输入触摸结束请求，返回组件层可写入的结束状态。
// Resolve a touch-end request into end state for component bindings.
export const resolveIndexBarTouchEndAction = (): IndexBarTouchEndAction => ({
	currentTouch: -1,
	isDown: false
});

// 输入内容滚动位置，返回是否需要更新当前索引。
// Resolve body scroll position into whether the current index should update.
export const resolveIndexBarScrollAction = ({ scrollTop, longSumList }: ResolveIndexBarScrollActionOptions): IndexBarScrollAction => {
	const currentIndex = resolveIndexBarCurrentFromScroll({ scrollTop, longSumList });
	return {
		currentIndex,
		shouldUpdate: currentIndex >= 0
	};
};

// 输入 IndexBar 组件状态，返回组件层可直接渲染的框架无关派生结果。
// Receive IndexBar component state and return framework-agnostic derived results for component rendering.
export const resolveIndexBarDerived = <TGroup>({
	data = [],
	current = 0,
	currentTouch = -1,
	radius = '',
	scrollAlign = true,
	titleInjClass = '',
	textInjClass = '',
	top = 0,
	height = 100,
	barHeight = 0
}: ResolveIndexBarDerivedOptions<TGroup> = {}): IndexBarDerived<TGroup> => {
	const radiusClass = resolveIndexBarRadiusClass(radius);
	const titleClass = resolveIndexBarTitleClass(titleInjClass);
	const childClass = resolveIndexBarChildClass(textInjClass);

	return {
		radiusClass,
		itemHeight: resolveIndexBarItemHeight(barHeight, data.length),
		barToTop: resolveIndexBarTop({ top, height, barHeight }),
		bodyClass: resolveIndexBarBodyClass(scrollAlign),
		bodyStyle: resolveIndexBarBodyStyleValue({ height }),
		bodyStyleString: resolveIndexBarBodyStyleString({ height }),
		barClass: resolveIndexBarBarClass(radiusClass),
		barStyle: resolveIndexBarBarStyleValue({ top, height, barHeight }),
		barStyleString: resolveIndexBarBarStyleString({ top, height, barHeight }),
		bubbleTransitionParams: resolveIndexBarBubbleTransitionParams(),
		groups: data.map((group, index) => ({
			group,
			index,
			groupClass: resolveIndexBarGroupClass(),
			titleClass,
			childClass,
			dividerClass: resolveIndexBarDividerClass()
		})),
		barItems: data.map((group, index) => ({
			group,
			index,
			wrapperClass: resolveIndexBarItemWrapperClass(),
			itemClass: resolveIndexBarItemClass({ active: current === index, radiusClass }),
			bubbleClass: resolveIndexBarBubbleClass(radiusClass),
			bubbleVisible: currentTouch === index
		}))
	};
};
