import { textAlignObj } from './common.js';
import { joinClasses } from './helpers.js';

export const scrollRadioItemHeightObj = {
	'3': 4,
	'5': 3,
	'7': 2
} as const;

export type ScrollRadioShowRows = 3 | 5 | 7;
export type ScrollRadioShowRow = ScrollRadioShowRows | string | number;
export type ScrollRadioAlign = keyof typeof textAlignObj | string;
export type ScrollRadioHeightStyleValue = {
	height: string;
};
export type ResolveScrollRadioScrollActionOptions = {
	itemHeight: number;
	isTouch?: boolean;
	scrollTop: number;
};
export type ScrollRadioScrollAction = {
	scrollEndIndex: number;
	scrollingIndex: number;
	wasTouch: boolean;
};
export type ResolveScrollRadioDerivedOptions<TItem extends Record<string, string> = Record<string, string>> = {
	data?: readonly TItem[];
	showRow?: ScrollRadioShowRow;
	labelKey?: string;
	autoScrollToLast?: boolean;
	useAnimation?: boolean;
	lastSelectedIndex?: number;
	initIndex?: number;
	align?: ScrollRadioAlign;
	injClass?: string;
};
export type ScrollRadioStatePropsLike<TItem extends Record<string, string> = Record<string, string>> = Partial<
	Omit<ResolveScrollRadioDerivedOptions<TItem>, 'lastSelectedIndex'>
>;
export type ResolveScrollRadioStateOptionsParams<TItem extends Record<string, string> = Record<string, string>> = {
	lastSelectedIndex?: number;
	props: ScrollRadioStatePropsLike<TItem>;
};
export type ScrollRadioDerived<TItem extends Record<string, string> = Record<string, string>> = {
	showRows: ScrollRadioShowRows;
	itemHeight: number;
	paddedData: TItem[];
	scrollTop: number;
	wrapperStyle: ScrollRadioHeightStyleValue;
	wrapperStyleString: string;
	itemStyle: ScrollRadioHeightStyleValue;
	itemStyleString: string;
	maskStyle: ScrollRadioHeightStyleValue;
	maskStyleString: string;
	rootClass: string;
	scrollClass: string;
	itemClass: string;
	labelClass: string;
	maskLayerClass: string;
	topMaskClass: string;
	highlightClass: string;
	bottomMaskClass: string;
};

// 输入 ScrollRadio 状态，返回框架无关的列表布局和滚动计算。
// Convert ScrollRadio state into framework-agnostic list layout and scroll math.
export const resolveScrollRadioShowRows = (showRow: ScrollRadioShowRow = 5): ScrollRadioShowRows => {
	const row = Number(showRow);
	return row === 3 || row === 5 || row === 7 ? row : 5;
};

export const resolveScrollRadioItemHeight = (showRow: ScrollRadioShowRow = 5) =>
	scrollRadioItemHeightObj[String(resolveScrollRadioShowRows(showRow)) as keyof typeof scrollRadioItemHeightObj];

export const resolveScrollRadioPaddingCount = (showRow: ScrollRadioShowRow = 5) => Math.floor(resolveScrollRadioShowRows(showRow) / 2);

export const resolveScrollRadioPaddedData = <TItem extends Record<string, string>>(
	data: readonly TItem[] = [],
	labelKey = 'label',
	showRow: ScrollRadioShowRow = 5
): TItem[] => {
	const emptyObj = { [labelKey]: '' } as TItem;
	const padding = Array.from({ length: resolveScrollRadioPaddingCount(showRow) }, () => ({ ...emptyObj }));
	return [...padding, ...data, ...padding];
};

export const resolveScrollRadioScrollTop = ({
	autoScrollToLast = true,
	lastSelectedIndex = 0,
	initIndex = 0,
	itemHeight = 3
}: {
	autoScrollToLast?: boolean;
	lastSelectedIndex?: number;
	initIndex?: number;
	itemHeight?: number;
}) => (autoScrollToLast ? lastSelectedIndex : initIndex) * itemHeight * 16;

export const resolveScrollRadioIndexFromScrollTop = (scrollTop: number, itemHeight: number) => Math.round(scrollTop / (itemHeight * 16));

// 输入滚动位置和键高，返回组件层可派发的滚动索引状态。
// Convert scroll position and item height into scroll index state for component events.
export const resolveScrollRadioScrollAction = ({
	scrollTop,
	itemHeight,
	isTouch = false
}: ResolveScrollRadioScrollActionOptions): ScrollRadioScrollAction => {
	const index = resolveScrollRadioIndexFromScrollTop(scrollTop, itemHeight);
	return {
		scrollEndIndex: index,
		scrollingIndex: index,
		wasTouch: isTouch
	};
};

export const resolveScrollRadioWrapperHeight = (itemHeight: number, showRows: number) => `${itemHeight * showRows}rem`;

export const resolveScrollRadioItemHeightValue = (itemHeight: number) => `${itemHeight}rem`;

export const resolveScrollRadioMaskHeight = (itemHeight: number, showRows: number) => `${itemHeight * ((showRows - 1) / 2)}rem`;

// 输入 ScrollRadio 高度参数，返回组件层可直接绑定的高度样式。
// Convert ScrollRadio height inputs into bind-ready height styles for the component layer.
export const resolveScrollRadioWrapperHeightStyleValue = (itemHeight: number, showRows: number): ScrollRadioHeightStyleValue => ({
	height: resolveScrollRadioWrapperHeight(itemHeight, showRows)
});

export const resolveScrollRadioWrapperHeightStyleString = (itemHeight: number, showRows: number) =>
	`height:${resolveScrollRadioWrapperHeight(itemHeight, showRows)};`;

export const resolveScrollRadioItemHeightStyleValue = (itemHeight: number): ScrollRadioHeightStyleValue => ({
	height: resolveScrollRadioItemHeightValue(itemHeight)
});

export const resolveScrollRadioItemHeightStyleString = (itemHeight: number) => `height:${resolveScrollRadioItemHeightValue(itemHeight)};`;

export const resolveScrollRadioMaskHeightStyleValue = (itemHeight: number, showRows: number): ScrollRadioHeightStyleValue => ({
	height: resolveScrollRadioMaskHeight(itemHeight, showRows)
});

export const resolveScrollRadioMaskHeightStyleString = (itemHeight: number, showRows: number) =>
	`height:${resolveScrollRadioMaskHeight(itemHeight, showRows)};`;

export const resolveScrollRadioAlignClass = (align: ScrollRadioAlign = 'center') =>
	textAlignObj[align as keyof typeof textAlignObj] || textAlignObj.center;

export const resolveScrollRadioScrollClass = ({ useAnimation = true, injClass = '' }: { useAnimation?: boolean; injClass?: string } = {}) =>
	joinClasses(['picker-contents snap-y overflow-auto', useAnimation ? 'scroll-smooth' : 'scroll-auto', injClass]);

export const resolveScrollRadioItemClass = (align: ScrollRadioAlign = 'center') =>
	joinClasses([resolveScrollRadioAlignClass(align), 'flex snap-center flex-col justify-center px-2']);

export const resolveScrollRadioRootClass = () => 'picker-contents relative overflow-auto';

export const resolveScrollRadioLabelClass = () => 'truncate';

export const resolveScrollRadioMaskLayerClass = () =>
	'pointer-events-none absolute inset-0 w-full border-b border-t border-bg-surface dark:border-bg-surface-dark';

export const resolveScrollRadioTopMaskClass = () =>
	'border-b border-black/10 bg-linear-to-b from-bg-surface to-bg-surface/60 dark:border-white/20 dark:from-bg-surface-dark dark:to-bg-surface-dark/60';

export const resolveScrollRadioHighlightClass = () => 'bg-primary/10 dark:bg-dark/10';

export const resolveScrollRadioBottomMaskClass = () =>
	'border-t border-black/10 bg-linear-to-t from-bg-surface to-bg-surface/60 dark:border-white/20 dark:from-bg-surface-dark dark:to-bg-surface-dark/60';

// 输入组件 props 和最近选中索引，返回框架无关的 ScrollRadio 派生入参。
// Receive component props and last selected index, then return framework-agnostic ScrollRadio derivation options.
export const resolveScrollRadioStateOptions = <TItem extends Record<string, string> = Record<string, string>>({
	lastSelectedIndex,
	props
}: ResolveScrollRadioStateOptionsParams<TItem>): ResolveScrollRadioDerivedOptions<TItem> => ({
	align: props.align,
	autoScrollToLast: props.autoScrollToLast,
	data: props.data,
	initIndex: props.initIndex,
	injClass: props.injClass,
	labelKey: props.labelKey,
	lastSelectedIndex,
	showRow: props.showRow,
	useAnimation: props.useAnimation
});

// 输入 ScrollRadio 属性和状态，返回组件层可直接消费的框架无关派生结果。
// Receive ScrollRadio props and state, then return framework-agnostic derived values for component bindings.
export const resolveScrollRadioDerived = <TItem extends Record<string, string> = Record<string, string>>({
	data = [],
	showRow = 5,
	labelKey = 'label',
	autoScrollToLast = true,
	useAnimation = true,
	lastSelectedIndex = 0,
	initIndex = 0,
	align = 'center',
	injClass = ''
}: ResolveScrollRadioDerivedOptions<TItem> = {}): ScrollRadioDerived<TItem> => {
	const showRows = resolveScrollRadioShowRows(showRow);
	const itemHeight = resolveScrollRadioItemHeight(showRows);
	const paddedData = resolveScrollRadioPaddedData(data, labelKey, showRows);

	return {
		showRows,
		itemHeight,
		paddedData,
		scrollTop: resolveScrollRadioScrollTop({ autoScrollToLast, lastSelectedIndex, initIndex, itemHeight }),
		wrapperStyle: resolveScrollRadioWrapperHeightStyleValue(itemHeight, showRows),
		wrapperStyleString: resolveScrollRadioWrapperHeightStyleString(itemHeight, showRows),
		itemStyle: resolveScrollRadioItemHeightStyleValue(itemHeight),
		itemStyleString: resolveScrollRadioItemHeightStyleString(itemHeight),
		maskStyle: resolveScrollRadioMaskHeightStyleValue(itemHeight, showRows),
		maskStyleString: resolveScrollRadioMaskHeightStyleString(itemHeight, showRows),
		rootClass: resolveScrollRadioRootClass(),
		scrollClass: resolveScrollRadioScrollClass({ useAnimation, injClass }),
		itemClass: resolveScrollRadioItemClass(align),
		labelClass: resolveScrollRadioLabelClass(),
		maskLayerClass: resolveScrollRadioMaskLayerClass(),
		topMaskClass: resolveScrollRadioTopMaskClass(),
		highlightClass: resolveScrollRadioHighlightClass(),
		bottomMaskClass: resolveScrollRadioBottomMaskClass()
	};
};
