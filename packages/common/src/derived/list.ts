import { gapScaleObj, mxScaleObj, myScaleObj, pxScaleObj, pyScaleObj, radiusObj, stateBgObj, stateTextObj } from './common.js';
import { resolveFocusableTabIndex } from './helpers.js';

export const listGapClass = gapScaleObj;
export const listMxClass = mxScaleObj;
export const listMyClass = myScaleObj;
export const listItemPxClass = pxScaleObj;
export const listItemPyClass = pyScaleObj;
export const listBgColorClass = stateBgObj;
export const listTextColorClass = stateTextObj;

export type ListKey = string | number;
export type ListSwipeHint = 'all' | 'first' | string;
export type ListTransitionKey = 'slideRight' | 'slideUp' | 'fadeScale' | 'stagger' | string | null | undefined;
export type ListScaleKey = keyof typeof gapScaleObj | string;
export type ListStateKey = keyof typeof stateBgObj | string;
export type ListRadiusKey = keyof typeof radiusObj | string;

export type ResolveListSwipeMoveOptions = {
	currentX: number;
	currentY: number;
	startX: number;
	startY: number;
	currentOffset?: number;
	swipeActionWidth?: number;
	swipeMovedDistance?: number;
	itemKey: ListKey;
};

export type ResolveListSwipeStartActionOptions = {
	activeSwipeKey?: ListKey | null;
	batchMode?: boolean;
	clientX: number;
	clientY: number;
	hasSwipeActions?: boolean;
	itemKey: ListKey;
};

export type ListSwipeStartAction = {
	closeKey: ListKey | null;
	isSwiping: boolean;
	shouldCapturePointer: boolean;
	shouldStart: boolean;
	swipeMovedDistance: number;
	swipeMovedKey: ListKey | null;
	swipeStartX: number;
	swipeStartY: number;
};

export type ResolveListSwipeEndActionOptions = {
	activeSwipeKey?: ListKey | null;
	itemKey: ListKey;
	offset?: number;
	swipeActionWidth?: number;
	swipeMovedKey?: ListKey | null;
	swipeOffsets?: Partial<Record<ListKey, number>>;
	swipeThreshold?: number;
};

export type ListSwipeEndAction = {
	isSwiping: boolean;
	nextActiveSwipeKey: ListKey | null;
	nextSwipeClickBlockKey: ListKey | null;
	nextSwipeMovedKey: ListKey | null;
	nextSwipeOffsets: Partial<Record<ListKey, number>>;
	shouldBlockClick: boolean;
};

// 输入 List 生命周期请求，返回组件层可写入的滑动初始态。
// Receive a List lifecycle request and return initial swipe state for the component layer.
export const resolveListInitialSwiping = (): boolean => false;

// 输入外部批量选择模式，返回组件内部可写入的初始模式。
// Normalize external batch mode into an internal writable initial mode.
export const resolveListInitialBatchMode = (batchMode?: boolean | null): boolean => batchMode ?? false;

// 输入外部批量选中项，返回组件内部可写入的选中项数组。
// Normalize external batch selections into an internal writable selection array.
export const resolveListInitialBatchSelected = <TKey extends ListKey = ListKey>(batchSelected?: readonly TKey[] | null): TKey[] => [
	...(batchSelected ?? [])
];

export type ResolveListTransitionOptions = {
	transition?: ListTransitionKey;
	leaving?: boolean;
	prefix?: string;
};

export type ResolveListTransitionStyleOptions = ResolveListTransitionOptions & {
	index?: number;
	transitionDelay?: number;
};

export type ListRenderItem<T> = {
	key: ListKey;
	item: T;
	leaving: boolean;
};

export type ResolveListRenderItemsOptions<T extends Record<string, unknown>> = {
	currentItems?: readonly ListRenderItem<T>[];
	data?: readonly T[];
	keyField?: string;
	transition?: ListTransitionKey;
};

export type ListRenderItemsState<T> = {
	items: ListRenderItem<T>[];
	leavingKeys: ListKey[];
	restoredKeys: ListKey[];
	isSame: boolean;
};

export type ListItemClickIntent = 'ignore' | 'closeSwipe' | 'batchSelect' | 'clickItem';

export type ListItemClickAction = {
	intent: ListItemClickIntent;
	closeKey: ListKey | null;
};

export type ResolveListItemDisabledOptions = {
	batchMode?: boolean;
	clickable?: boolean;
	hasClickHandler?: boolean;
};

export type ResolveListItemKeyboardActionOptions = ResolveListItemDisabledOptions & {
	key: string;
};

export type ListItemKeyboardAction = {
	shouldClick: boolean;
	shouldPreventDefault: boolean;
};

export type ListBatchModeAction = {
	nextBatchMode: boolean;
	nextSelected: ListKey[];
	shouldClearSelected: boolean;
};

export type ListCloseSwipeAction = {
	nextActiveSwipeKey: ListKey | null;
	nextSwipeOffsets: Partial<Record<ListKey, number>>;
};

export type ListTransformStyleValue = {
	transform: string;
};

export type ListWidthStyleValue = {
	width: string;
};

export type ListCssVariableName = `--${string}`;

export type ListTransitionStyleValue = {
	animationDelay: string;
} & Partial<Record<ListCssVariableName, string>>;

export type ListSwipeActionViewState<TAction extends { bgColor?: string } = { bgColor?: string }> = {
	action: TAction;
	buttonClass: string;
	index: number;
	textClass: string;
};

export type ListItemViewState<T extends Record<string, unknown>, TAction extends { bgColor?: string } = { bgColor?: string }> = {
	actionLayerClass: string;
	batchOffset: number;
	batchSelected: boolean;
	batchSelectClass: string;
	batchSelectWidthStyle: ListWidthStyleValue;
	batchSelectWidthStyleString: string;
	arrowClass: string;
	buttonClass: string;
	contentLayerClass: string;
	disabled: boolean;
	index: number;
	itemContentClass: string;
	item: T;
	itemKey: ListKey;
	renderItem: ListRenderItem<T>;
	shellClass: string;
	showBatchSelect: boolean;
	showSwipeActions: boolean;
	showSwipeHint: boolean;
	swipeActions: ListSwipeActionViewState<TAction>[];
	swipeActive: boolean;
	swipeOffset: number;
	swipeHintClass: string;
	tabIndex: 0 | -1;
	transformStyle: ListTransformStyleValue;
	transformStyleString: string;
	transitionClass: string;
	transitionStyle: ListTransitionStyleValue | undefined;
	transitionStyleString: string;
};

export type ResolveListDerivedOptions<T extends Record<string, unknown>, TAction extends { bgColor?: string } = { bgColor?: string }> = {
	batchMode?: boolean;
	batchSelected?: readonly ListKey[];
	batchSelectWidth?: number;
	clickable?: boolean;
	divider?: boolean;
	gap?: ListScaleKey;
	hasClickHandler?: boolean;
	hasSwipeActions?: boolean;
	injClass?: string;
	itemInjClass?: string;
	itemPx?: ListScaleKey;
	itemPy?: ListScaleKey;
	itemRadius?: ListRadiusKey;
	mx?: ListScaleKey;
	my?: ListScaleKey;
	prefix?: string;
	renderItems?: readonly ListRenderItem<T>[];
	staggerVariable?: ListCssVariableName;
	swipeActions?: readonly TAction[];
	swipeHint?: ListSwipeHint;
	swipeOffsets?: Partial<Record<ListKey, number>>;
	transition?: ListTransitionKey;
	transitionDelay?: number;
};

export type ListDerived<T extends Record<string, unknown>, TAction extends { bgColor?: string } = { bgColor?: string }> = {
	arrowIconClass: string;
	batchActionGroupClass: string;
	batchBarClass: string;
	batchCheckedIconClass: string;
	batchTextButtonClass: string;
	batchUncheckedIconClass: string;
	batchSelectWidth: number;
	contentClass: string;
	hasSwipeActions: boolean;
	itemRadiusClass: string;
	items: ListItemViewState<T, TAction>[];
	limitedSwipeActions: TAction[];
	rootClass: string;
	swipeHintIconClass: string;
	swipeActionRadiusClass: string;
	swipeActionWidth: number;
};

export const resolveListItemKey = <T extends Record<string, unknown>>(
	item: T,
	index: number,
	keyField: string | undefined = 'id'
): ListKey => {
	if (keyField && item[keyField] !== undefined) return item[keyField] as ListKey;
	return index;
};

// 输入当前渲染项和下一批数据，返回无框架的列表过渡状态。
// Resolve current render items and next data into framework-agnostic list transition state.
export const resolveListRenderItems = <T extends Record<string, unknown>>({
	currentItems = [],
	data = [],
	keyField = 'id',
	transition
}: ResolveListRenderItemsOptions<T>): ListRenderItemsState<T> => {
	const currentMap = new Map(currentItems.map((item) => [item.key, item]));
	const restoredKeys: ListKey[] = [];
	const nextItems = data.map((item, index) => {
		const key = resolveListItemKey(item, index, keyField);
		const existing = currentMap.get(key);
		if (existing) {
			if (existing.leaving) restoredKeys.push(key);
			return { ...existing, item, leaving: false };
		}
		return { key, item, leaving: false };
	});

	if (!transition) {
		return {
			items: nextItems,
			leavingKeys: [],
			restoredKeys,
			isSame:
				nextItems.length === currentItems.length &&
				nextItems.every((item, index) => {
					const currentItem = currentItems[index];
					return currentItem && item.key === currentItem.key && item.item === currentItem.item && item.leaving === currentItem.leaving;
				})
		};
	}

	const nextKeySet = new Set(nextItems.map((item) => item.key));
	const leavingKeys: ListKey[] = [];
	const merged: ListRenderItem<T>[] = [];
	let nextIndex = 0;

	for (const currentItem of currentItems) {
		if (nextKeySet.has(currentItem.key)) {
			while (nextIndex < nextItems.length && nextItems[nextIndex].key !== currentItem.key) {
				merged.push(nextItems[nextIndex]);
				nextIndex += 1;
			}
			if (nextIndex < nextItems.length) {
				merged.push(nextItems[nextIndex]);
				nextIndex += 1;
			}
			continue;
		}

		const leavingItem = currentItem.leaving ? currentItem : { ...currentItem, leaving: true };
		if (!currentItem.leaving) leavingKeys.push(currentItem.key);
		merged.push(leavingItem);
	}

	while (nextIndex < nextItems.length) {
		merged.push(nextItems[nextIndex]);
		nextIndex += 1;
	}

	return {
		items: merged,
		leavingKeys,
		restoredKeys,
		isSame:
			merged.length === currentItems.length &&
			merged.every((item, index) => {
				const currentItem = currentItems[index];
				return currentItem && item.key === currentItem.key && item.item === currentItem.item && item.leaving === currentItem.leaving;
			})
	};
};

export const resolveListLimitedSwipeActions = <T>(actions: readonly T[] = [], limit = 4) => actions.slice(0, limit);

export const resolveListHasSwipeActions = (actions: readonly unknown[] = []) => actions.length > 0;

export const resolveListSwipeActionWidth = (actionLength: number, itemWidth = 64) => actionLength * itemWidth;

export const resolveListBatchSelectWidth = () => 40;

export const resolveListRadiusClass = (radius: ListRadiusKey | '' = '') => (radius ? radiusObj[radius as keyof typeof radiusObj] : '');

export const resolveListSwipeActionRadiusClass = (radius: ListRadiusKey | '' = '') => {
	const radiusClass = resolveListRadiusClass(radius);
	return radiusClass ? `${radiusClass} rounded-l-none` : '';
};

export const resolveListRootClass = (options: { mx?: ListScaleKey; my?: ListScaleKey; injClass?: string } = {}) => {
	const { mx = '0', my = '0', injClass = '' } = options;
	return [
		'relative',
		listMxClass[mx as keyof typeof listMxClass] || 'mx-0',
		listMyClass[my as keyof typeof listMyClass] || 'my-0',
		injClass
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveListContentClass = (options: { gap?: ListScaleKey; divider?: boolean } = {}) => {
	const { gap = '0', divider = true } = options;
	return [
		'flex flex-col',
		listGapClass[gap as keyof typeof listGapClass] || 'gap-2',
		divider ? 'divide-y divide-black/10 dark:divide-white/10' : ''
	]
		.filter(Boolean)
		.join(' ');
};

export const resolveListItemButtonClass = (
	options: { itemPx?: ListScaleKey; itemPy?: ListScaleKey; itemRadiusClass?: string; itemInjClass?: string } = {}
) => {
	const { itemPx = '0', itemPy = '0', itemRadiusClass = '', itemInjClass = '' } = options;
	return [
		'flex w-full items-start gap-2 text-left',
		listItemPxClass[itemPx as keyof typeof listItemPxClass] || 'px-0',
		listItemPyClass[itemPy as keyof typeof listItemPyClass] || 'py-0',
		itemRadiusClass,
		itemInjClass
	]
		.filter(Boolean)
		.join(' ');
};

// 输入 List 结构状态，返回组件实现可复用的框架无关 class。
// Receive List structure state and return framework-agnostic classes for component implementations.
export const resolveListBatchBarClass = (): string => 'flex items-center justify-between px-4 py-2';

export const resolveListBatchActionGroupClass = (): string => 'flex items-center gap-4';

export const resolveListBatchTextButtonClass = (): string => 'text-primary dark:text-dark text-sm';

export const resolveListBatchSelectClass = (): string =>
	'absolute inset-y-0 left-0 flex items-center justify-center bg-bg-surface dark:bg-bg-surface-dark';

export const resolveListContentLayerClass = (): string => 'relative touch-none transition-transform duration-200';

export const resolveListItemContentClass = (): string => 'min-w-0 flex-1';

export const resolveListArrowClass = (): string => 'shrink-0 self-center text-gray-400 dark:text-gray-500';

export const resolveListArrowIconClass = (): string => '';

export const resolveListSwipeHintClass = (): string => 'absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600';

export const resolveListSwipeHintIconClass = (): string => 'h-3 w-3';

export const resolveListBatchUncheckedIconClass = (): string => 'h-5 w-5 text-gray-400 dark:text-gray-500';

export const resolveListBatchCheckedIconClass = (): string => 'h-5 w-5 text-primary dark:text-dark';

// 输入 List item 交互状态，返回框架无关的禁用判断。
// Convert List item interaction state into a framework-agnostic disabled decision.
export const resolveListItemDisabled = ({
	batchMode = false,
	clickable = true,
	hasClickHandler = true
}: ResolveListItemDisabledOptions = {}): boolean => !batchMode && (!clickable || !hasClickHandler);

// 输入 List item 键盘状态，返回框架无关的点击动作结果。
// Convert List item keyboard state into a framework-agnostic click action result.
export const resolveListItemKeyboardAction = ({ key, ...options }: ResolveListItemKeyboardActionOptions): ListItemKeyboardAction => {
	const shouldClick = !resolveListItemDisabled(options) && (key === 'Enter' || key === ' ');
	return {
		shouldClick,
		shouldPreventDefault: shouldClick
	};
};

export const resolveListItemShellClass = (hasSwipeActions = false) =>
	['relative', hasSwipeActions ? 'overflow-x-clip' : ''].filter(Boolean).join(' ');

export const resolveListSwipeActionLayerClass = (options: { swipeActionRadiusClass?: string; isSwipeActive?: boolean } = {}) => {
	const { swipeActionRadiusClass = '', isSwipeActive = false } = options;
	return ['absolute inset-y-0 right-0 flex overflow-hidden', swipeActionRadiusClass, isSwipeActive ? '' : 'opacity-0 pointer-events-none']
		.filter(Boolean)
		.join(' ');
};

export const resolveListSwipeActive = (swipeOffset = 0): boolean => swipeOffset !== 0;

// 输入列表项 key 和偏移表，返回框架无关的当前滑动偏移。
// Resolve an item key and offset map into the current framework-agnostic swipe offset.
export const resolveListItemSwipeOffset = (swipeOffsets: Partial<Record<ListKey, number>> = {}, itemKey: ListKey): number =>
	swipeOffsets[itemKey] || 0;

// 输入批量模式状态，返回列表项内容层需要叠加的横向偏移。
// Resolve batch mode state into the horizontal offset applied to item content.
export const resolveListBatchOffset = ({
	batchMode = false,
	batchSelectWidth = 0
}: { batchMode?: boolean; batchSelectWidth?: number } = {}): number => (batchMode ? batchSelectWidth : 0);

// 输入滑动能力和批量模式状态，返回是否展示滑动操作层。
// Resolve swipe capability and batch mode state into action-layer visibility.
export const resolveListShowSwipeActions = ({
	hasSwipeActions = false,
	batchMode = false
}: { hasSwipeActions?: boolean; batchMode?: boolean } = {}): boolean => hasSwipeActions && !batchMode;

// 输入滑动提示配置，返回是否展示当前项的滑动提示。
// Resolve swipe hint config into whether the current item should show the swipe hint.
export const resolveListShowSwipeHint = ({
	hasSwipeActions = false,
	batchMode = false,
	swipeHint = 'first',
	index = 0
}: {
	hasSwipeActions?: boolean;
	batchMode?: boolean;
	swipeHint?: ListSwipeHint;
	index?: number;
} = {}): boolean =>
	resolveListShowSwipeActions({ hasSwipeActions, batchMode }) && (swipeHint === 'all' || (swipeHint === 'first' && index === 0));

export const resolveListSwipeActionColorKey = (bgColor?: string) => (bgColor === 'primary' ? 'theme' : bgColor || 'theme');

export const resolveListSwipeActionButtonClass = (bgColor?: string) => {
	const actionColor = resolveListSwipeActionColorKey(bgColor) as keyof typeof listBgColorClass;
	return [
		'flex h-full w-16 flex-col items-center justify-center',
		listBgColorClass[actionColor] || listBgColorClass.theme,
		actionColor === 'theme' ? 'text-text-on-primary dark:text-text-on-dark' : 'text-white'
	].join(' ');
};

export const resolveListSwipeActionTextClass = (): string => 'mt-1 text-xs';

export const resolveListBatchSelected = (selected: readonly ListKey[] = [], key: ListKey) =>
	selected.includes(key) ? selected.filter((item) => item !== key) : [...selected, key];

export const resolveListBatchItemSelected = (selected: readonly ListKey[] = [], key: ListKey) => selected.includes(key);

export const resolveListBatchActionStatus = (status?: ListStateKey): ListStateKey => status || 'theme';

export const resolveListBatchToggleText = ({
	batchMode = false,
	doneText,
	editText
}: {
	batchMode?: boolean;
	doneText: string;
	editText: string;
}): string => (batchMode ? doneText : editText);

// 输入批量模式，返回切换后的选择状态；事件派发留在组件层。
// Receive batch mode and return selection state after toggling; event dispatch stays in the component.
export const resolveListBatchModeAction = ({ batchMode = false }: { batchMode?: boolean } = {}): ListBatchModeAction => {
	const nextBatchMode = !batchMode;
	return {
		nextBatchMode,
		nextSelected: nextBatchMode ? [] : [],
		shouldClearSelected: !nextBatchMode
	};
};

// 输入滑动状态，返回关闭指定 item 后的偏移表和 active key。
// Receive swipe state and return offsets plus active key after closing the item.
export const resolveListCloseSwipeAction = ({
	swipeOffsets = {},
	itemKey,
	activeSwipeKey = null
}: {
	swipeOffsets?: Partial<Record<ListKey, number>>;
	itemKey: ListKey;
	activeSwipeKey?: ListKey | null;
}): ListCloseSwipeAction => ({
	nextSwipeOffsets: { ...swipeOffsets, [itemKey]: 0 },
	nextActiveSwipeKey: activeSwipeKey === itemKey ? null : activeSwipeKey
});

// 输入列表点击上下文，返回组件层要执行的无副作用意图。
// Receive item click context and return the side-effect-free intent for the component layer.
export const resolveListItemClickAction = ({
	activeSwipeKey = null,
	batchMode = false,
	clickable = true,
	itemKey,
	swipeClickBlockKey = null
}: {
	activeSwipeKey?: ListKey | null;
	batchMode?: boolean;
	clickable?: boolean;
	itemKey: ListKey;
	swipeClickBlockKey?: ListKey | null;
}): ListItemClickAction => {
	if (swipeClickBlockKey === itemKey) return { intent: 'ignore', closeKey: null };
	if (activeSwipeKey !== null) return { intent: 'closeSwipe', closeKey: activeSwipeKey };
	if (batchMode) return { intent: 'batchSelect', closeKey: null };
	return { intent: clickable ? 'clickItem' : 'ignore', closeKey: null };
};

// 输入离场 key，返回过滤后的渲染项；timer 归属继续留在组件层。
// Resolve a leaving key into filtered render items; timer ownership stays in the component layer.
export const resolveListItemsAfterLeave = <T>(items: readonly ListRenderItem<T>[] = [], leavingKey: ListKey): ListRenderItem<T>[] =>
	items.filter((item) => item.key !== leavingKey);

export const resolveListSelectAll = <T extends Record<string, unknown>>(
	options: { selected?: readonly ListKey[]; data?: readonly T[]; keyField?: string } = {}
) => {
	const { selected = [], data = [], keyField = 'id' } = options;
	return selected.length === data.length ? [] : data.map((item, index) => resolveListItemKey(item, index, keyField));
};

export const resolveListSwipeOffset = (options: { currentOffset?: number; diffX?: number; swipeActionWidth?: number } = {}) => {
	const { currentOffset = 0, diffX = 0, swipeActionWidth = 0 } = options;
	return Math.max(-swipeActionWidth, Math.min(0, currentOffset + diffX));
};

// 输入滑动开始上下文，返回组件层需要写入的初始滑动状态。
// Resolve swipe-start context into initial swipe state for component bindings.
export const resolveListSwipeStartAction = ({
	activeSwipeKey = null,
	batchMode = false,
	clientX,
	clientY,
	hasSwipeActions = false,
	itemKey
}: ResolveListSwipeStartActionOptions): ListSwipeStartAction => {
	const shouldStart = Boolean(hasSwipeActions && !batchMode);
	return {
		closeKey: shouldStart && activeSwipeKey !== null && activeSwipeKey !== itemKey ? activeSwipeKey : null,
		isSwiping: shouldStart,
		shouldCapturePointer: shouldStart,
		shouldStart,
		swipeMovedDistance: 0,
		swipeMovedKey: null,
		swipeStartX: shouldStart ? clientX : 0,
		swipeStartY: shouldStart ? clientY : 0
	};
};

// 输入滑动坐标状态，返回框架无关的下一步滑动状态。
// Resolve swipe coordinate state into a framework-agnostic next swipe state.
export const resolveListSwipeMoveState = (options: ResolveListSwipeMoveOptions) => {
	const { currentX, currentY, startX, startY, currentOffset = 0, swipeActionWidth = 0, swipeMovedDistance = 0, itemKey } = options;
	const diffX = currentX - startX;
	const diffY = currentY - startY;
	const isVertical = Math.abs(diffY) > Math.abs(diffX);
	const nextMovedDistance = swipeMovedDistance + Math.abs(diffX);

	return {
		ignore: isVertical,
		diffX,
		diffY,
		nextOffset: isVertical ? currentOffset : resolveListSwipeOffset({ currentOffset, diffX, swipeActionWidth }),
		nextMovedDistance,
		nextMovedKey: nextMovedDistance > 4 ? itemKey : null,
		nextStartX: currentX
	};
};

export const resolveListSwipeEndState = (options: {
	offset?: number;
	swipeThreshold?: number;
	swipeActionWidth?: number;
	itemKey: ListKey;
}) => {
	const { offset = 0, swipeThreshold = 30, swipeActionWidth = 0, itemKey } = options;
	const shouldOpen = Math.abs(offset) > swipeThreshold;

	return {
		shouldOpen,
		nextOffset: shouldOpen ? -swipeActionWidth : 0,
		activeSwipeKey: shouldOpen ? itemKey : null
	};
};

// 输入滑动结束上下文，返回打开或关闭后的偏移状态和点击屏蔽状态。
// Resolve swipe-end context into offsets, active key and click-blocking state after open or close.
export const resolveListSwipeEndAction = ({
	activeSwipeKey = null,
	itemKey,
	offset = 0,
	swipeActionWidth = 0,
	swipeMovedKey = null,
	swipeOffsets = {},
	swipeThreshold = 30
}: ResolveListSwipeEndActionOptions): ListSwipeEndAction => {
	const endState = resolveListSwipeEndState({ offset, swipeThreshold, swipeActionWidth, itemKey });
	const closeAction = resolveListCloseSwipeAction({ swipeOffsets, itemKey, activeSwipeKey });
	const shouldBlockClick = swipeMovedKey === itemKey;

	return {
		isSwiping: false,
		nextActiveSwipeKey: endState.shouldOpen ? endState.activeSwipeKey : closeAction.nextActiveSwipeKey,
		nextSwipeClickBlockKey: shouldBlockClick ? itemKey : null,
		nextSwipeMovedKey: null,
		nextSwipeOffsets: endState.shouldOpen ? { ...swipeOffsets, [itemKey]: endState.nextOffset } : closeAction.nextSwipeOffsets,
		shouldBlockClick
	};
};

export const resolveListItemTransform = (options: { swipeOffset?: number; batchOffset?: number } = {}) => {
	const { swipeOffset = 0, batchOffset = 0 } = options;
	return `translateX(${swipeOffset + batchOffset}px)`;
};

// 输入 List item 偏移状态，返回组件层可直接绑定的 transform 样式。
// Resolve List item offset state into transform styles for component binding.
export const resolveListItemTransformStyleValue = (
	options: { swipeOffset?: number; batchOffset?: number } = {}
): ListTransformStyleValue => ({
	transform: resolveListItemTransform(options)
});

export const resolveListItemTransformStyleString = (options: { swipeOffset?: number; batchOffset?: number } = {}) =>
	`transform: ${resolveListItemTransform(options)};`;

export const resolveListWidthStyleValue = (width = 0): ListWidthStyleValue => ({
	width: `${width}px`
});

export const resolveListWidthStyleString = (width = 0) => `width: ${width}px;`;

export const resolveListTransitionClass = (options: ResolveListTransitionOptions = {}) => {
	const { transition, leaving = false, prefix = 'stdf' } = options;
	if (!transition) return 'relative';
	const base = `${prefix}-list`;

	return [
		'relative',
		!leaving ? `${base}-transition` : `${base}-leave`,
		!leaving && transition === 'slideRight' ? `${base}-slide-right` : '',
		!leaving && transition === 'slideUp' ? `${base}-slide-up` : '',
		!leaving && transition === 'fadeScale' ? `${base}-fade-scale` : '',
		!leaving && transition === 'stagger' ? `${base}-stagger` : '',
		leaving && transition === 'slideRight' ? `${base}-leave-slide-right` : '',
		leaving && transition === 'slideUp' ? `${base}-leave-slide-up` : '',
		leaving && transition === 'fadeScale' ? `${base}-leave-fade-scale` : '',
		leaving && transition === 'stagger' ? `${base}-leave-stagger` : ''
	]
		.filter(Boolean)
		.join(' ');
};

// 只返回动画样式数据，CSS 变量写入方式留给组件层。
// Only return animation style data; CSS variable binding stays in the component layer.
export const resolveListTransitionStyle = (options: ResolveListTransitionStyleOptions = {}) => {
	const { transition, leaving = false, index = 0, transitionDelay = 50 } = options;
	if (!transition) {
		return {
			animationDelay: '',
			staggerX: ''
		};
	}

	return {
		animationDelay: leaving ? '0ms' : `${index * transitionDelay}ms`,
		staggerX: index % 2 === 0 ? '-100px' : '100px'
	};
};

// 输入 List 动画状态，返回可直接绑定的普通 style 对象。
// Convert List transition state into a plain style object that components can bind directly.
export const resolveListTransitionStyleValue = (
	options: ResolveListTransitionStyleOptions & { staggerVariable?: ListCssVariableName } = {}
): ListTransitionStyleValue | undefined => {
	const { transition, staggerVariable = '--stdf-list-stagger-x' } = options;
	if (!transition) return undefined;
	const transitionStyle = resolveListTransitionStyle(options);
	return {
		animationDelay: transitionStyle.animationDelay,
		[staggerVariable]: transitionStyle.staggerX
	};
};

export const resolveListTransitionStyleString = (
	options: ResolveListTransitionStyleOptions & { staggerVariable?: ListCssVariableName } = {}
) => {
	const { transition, staggerVariable = '--stdf-list-stagger-x' } = options;
	if (!transition) return '';
	const transitionStyle = resolveListTransitionStyle(options);
	return `animation-delay: ${transitionStyle.animationDelay}; ${staggerVariable}: ${transitionStyle.staggerX};`;
};

// 输入 List 动画前缀，返回框架无关的过渡 CSS 字符串。
// Resolve a List animation prefix into a framework-agnostic transition CSS string.
export const resolveListTransitionCss = ({
	prefix = 'stdf',
	staggerVariable = `--${prefix}-list-stagger-x` as ListCssVariableName
}: { prefix?: string; staggerVariable?: ListCssVariableName } = {}) => {
	const base = `${prefix}-list`;
	return `.${base}-transition {
	animation-duration: 300ms;
	animation-fill-mode: both;
	animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
	will-change: opacity, transform;
}

.${base}-leave {
	animation-duration: 300ms;
	animation-fill-mode: both;
	animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
	will-change: opacity, transform;
}

.${base}-slide-right {
	animation-name: ${base}-slide-right;
}

.${base}-slide-up {
	animation-name: ${base}-slide-up;
}

.${base}-fade-scale {
	animation-name: ${base}-fade-scale;
}

.${base}-stagger {
	animation-name: ${base}-stagger;
}

.${base}-leave-slide-right {
	animation-name: ${base}-slide-right-out;
}

.${base}-leave-slide-up {
	animation-name: ${base}-slide-up-out;
}

.${base}-leave-fade-scale {
	animation-name: ${base}-fade-scale-out;
}

.${base}-leave-stagger {
	animation-name: ${base}-stagger-out;
}

@keyframes ${base}-slide-right {
	from {
		opacity: 0;
		transform: translateX(100px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes ${base}-slide-up {
	from {
		opacity: 0;
		transform: translateY(50px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes ${base}-fade-scale {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes ${base}-stagger {
	from {
		opacity: 0;
		transform: translateX(var(${staggerVariable}));
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes ${base}-slide-right-out {
	from {
		opacity: 1;
		transform: translateX(0);
	}
	to {
		opacity: 0;
		transform: translateX(100px);
	}
}

@keyframes ${base}-slide-up-out {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(50px);
	}
}

@keyframes ${base}-fade-scale-out {
	from {
		opacity: 1;
		transform: scale(1);
	}
	to {
		opacity: 0;
		transform: scale(0.8);
	}
}

@keyframes ${base}-stagger-out {
	from {
		opacity: 1;
		transform: translateX(0);
	}
	to {
		opacity: 0;
		transform: translateX(var(${staggerVariable}));
	}
}`;
};

export const resolveListBatchActionClass = (status: ListStateKey = 'theme') =>
	['text-sm', listTextColorClass[status as keyof typeof listTextColorClass]].filter(Boolean).join(' ');

// 输入 List 当前状态，返回框架无关的 item 渲染派生结果。
// Receive current List state and return framework-agnostic item render state.
export const resolveListDerived = <T extends Record<string, unknown>, TAction extends { bgColor?: string } = { bgColor?: string }>({
	batchMode = false,
	batchSelected = [],
	batchSelectWidth = resolveListBatchSelectWidth(),
	clickable = true,
	divider = true,
	gap = '0',
	hasClickHandler = true,
	hasSwipeActions,
	injClass = '',
	itemInjClass = '',
	itemPx = '0',
	itemPy = '0',
	itemRadius = '',
	mx = '0',
	my = '0',
	prefix = 'stdf',
	renderItems = [],
	staggerVariable,
	swipeActions = [],
	swipeHint = 'first',
	swipeOffsets = {},
	transition,
	transitionDelay = 50
}: ResolveListDerivedOptions<T, TAction> = {}): ListDerived<T, TAction> => {
	const limitedSwipeActions = resolveListLimitedSwipeActions(swipeActions);
	const resolvedHasSwipeActions = hasSwipeActions ?? resolveListHasSwipeActions(limitedSwipeActions);
	const itemRadiusClass = resolveListRadiusClass(itemRadius);
	const swipeActionRadiusClass = resolveListSwipeActionRadiusClass(itemRadius);

	return {
		arrowIconClass: resolveListArrowIconClass(),
		batchActionGroupClass: resolveListBatchActionGroupClass(),
		batchBarClass: resolveListBatchBarClass(),
		batchCheckedIconClass: resolveListBatchCheckedIconClass(),
		batchTextButtonClass: resolveListBatchTextButtonClass(),
		batchUncheckedIconClass: resolveListBatchUncheckedIconClass(),
		batchSelectWidth,
		contentClass: resolveListContentClass({ gap, divider }),
		hasSwipeActions: resolvedHasSwipeActions,
		itemRadiusClass,
		limitedSwipeActions,
		rootClass: resolveListRootClass({ mx, my, injClass }),
		swipeHintIconClass: resolveListSwipeHintIconClass(),
		swipeActionRadiusClass,
		swipeActionWidth: resolveListSwipeActionWidth(limitedSwipeActions.length),
		items: renderItems.map((renderItem, index) => {
			const itemKey = renderItem.key;
			const swipeOffset = resolveListItemSwipeOffset(swipeOffsets, itemKey);
			const batchOffset = resolveListBatchOffset({ batchMode, batchSelectWidth });
			const swipeActive = resolveListSwipeActive(swipeOffset);
			const showSwipeActions = resolveListShowSwipeActions({ hasSwipeActions: resolvedHasSwipeActions, batchMode });
			const disabled = resolveListItemDisabled({ clickable, hasClickHandler, batchMode });
			const transitionOptions = { prefix, transition, leaving: renderItem.leaving };
			const transitionStyleOptions = { transition, leaving: renderItem.leaving, index, transitionDelay, staggerVariable };

			return {
				actionLayerClass: showSwipeActions ? resolveListSwipeActionLayerClass({ swipeActionRadiusClass, isSwipeActive: swipeActive }) : '',
				batchOffset,
				batchSelected: resolveListBatchItemSelected(batchSelected, itemKey),
				batchSelectClass: resolveListBatchSelectClass(),
				batchSelectWidthStyle: resolveListWidthStyleValue(batchSelectWidth),
				batchSelectWidthStyleString: resolveListWidthStyleString(batchSelectWidth),
				arrowClass: resolveListArrowClass(),
				buttonClass: resolveListItemButtonClass({ itemPx, itemPy, itemRadiusClass, itemInjClass }),
				contentLayerClass: resolveListContentLayerClass(),
				disabled,
				index,
				itemContentClass: resolveListItemContentClass(),
				item: renderItem.item,
				itemKey,
				renderItem,
				shellClass: resolveListItemShellClass(resolvedHasSwipeActions),
				showBatchSelect: batchMode,
				showSwipeActions,
				showSwipeHint: resolveListShowSwipeHint({ hasSwipeActions: resolvedHasSwipeActions, batchMode, swipeHint, index }),
				swipeActions: limitedSwipeActions.map((action, actionIndex) => ({
					action,
					buttonClass: resolveListSwipeActionButtonClass(action.bgColor),
					index: actionIndex,
					textClass: resolveListSwipeActionTextClass()
				})),
				swipeActive,
				swipeOffset,
				swipeHintClass: resolveListSwipeHintClass(),
				tabIndex: resolveFocusableTabIndex({ disabled }),
				transformStyle: resolveListItemTransformStyleValue({ swipeOffset, batchOffset }),
				transformStyleString: resolveListItemTransformStyleString({ swipeOffset, batchOffset }),
				transitionClass: resolveListTransitionClass(transitionOptions),
				transitionStyle: resolveListTransitionStyleValue(transitionStyleOptions),
				transitionStyleString: resolveListTransitionStyleString(transitionStyleOptions)
			};
		})
	};
};
