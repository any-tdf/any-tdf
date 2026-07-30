import type { PickerDataChildProps, PickerDatasProps, PickerMultipleItem } from '../types/index.js';

export type PickerRecord = Record<string, string | number | undefined>;
export type PickerLevelData = PickerDataChildProps[] | PickerDatasProps[];
export type PickerAlign = NonNullable<PickerDatasProps['align']>;
export type PickerColumnStyleValue = {
	flex: string | number;
};
export type PickerColumnDerived = {
	data: PickerDatasProps['data'];
	hasData: boolean;
	index: number;
	item: PickerDatasProps;
	lastSelectedIndex: number | undefined;
	rootClass: string;
	styleString: string;
	styleValue: PickerColumnStyleValue;
};

export type ResolvePickerCurrentOptions = {
	datas: PickerDatasProps[] | PickerDataChildProps[];
	currentIndexs: number[];
	isLinkage?: boolean;
	allLevelData?: PickerLevelData[];
	linkageLabelKeys?: string[];
};

export type PickerCurrentSelection = {
	items: PickerRecord[];
	label: string;
};
export type PickerSelectionForEmit<TItem extends PickerRecord = PickerRecord> = {
	items: TItem[];
	label: string;
};
export type PickerMultipleSelectionState = {
	isControlled: boolean;
	selected: PickerMultipleItem[];
};
export type PickerCancelAction = {
	nextVisible: false;
	shouldCancel: true;
	shouldClose: true;
};
export type PickerConfirmAction<TItem extends PickerRecord = PickerRecord> = {
	indexs: number[];
	items: TItem[];
	nextVisible: false;
	shouldClose: true;
	shouldConfirm: true;
};
export type ResolvePickerCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};
export type PickerCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};
export type ResolvePickerMultipleToggleActionOptions = ResolvePickerCurrentOptions & {
	multipleSelected: PickerMultipleItem[];
};
export type ResolvePickerMultipleRemoveActionOptions = {
	index: number;
	multipleSelected: PickerMultipleItem[];
};
export type PickerMultipleAction = {
	nextSelected: PickerMultipleItem[];
	shouldEmit: true;
};

export type PickerTexts = {
	cancelText: string;
	confirmText: string;
	title: string;
};

export type PickerTextDefaults = {
	defaultCancel: string;
	defaultConfirm: string;
	defaultTitle: string;
};

export type ResolvePickerTextsOptions = Partial<PickerTexts> & {
	defaults: PickerTextDefaults;
};
export type PickerPopupConfig<TPopup> = {
	popupProps: TPopup | Record<string, never>;
};
export type PickerHeightStyleValue = {
	height: string;
};
export type ResolvePickerDerivedOptions<TPopup = unknown> = ResolvePickerInitialStateOptions &
	Partial<PickerTexts> & {
		currentScrollingIndexs?: readonly number[];
		defaults: PickerTextDefaults;
		displayDatas?: readonly PickerDatasProps[];
		height?: number;
		innerMultipleSelected?: PickerMultipleItem[];
		lastSelectedIndexs?: readonly number[];
		multiple?: boolean;
		multipleSelected?: PickerMultipleItem[];
		popup?: TPopup | null;
		viewportHeight?: number;
	};
export type PickerStatePropsLike<TPopup = unknown> = Pick<ResolvePickerDerivedOptions<TPopup>, 'datas'> &
	Partial<
		Omit<
			ResolvePickerDerivedOptions<TPopup>,
			| 'currentScrollingIndexs'
			| 'defaults'
			| 'displayDatas'
			| 'innerMultipleSelected'
			| 'lastSelectedIndexs'
			| 'multiple'
			| 'multipleSelected'
			| 'viewportHeight'
		>
	>;
export type ResolvePickerStateOptionsParams<TPopup = unknown> = {
	currentScrollingIndexs?: readonly number[];
	defaults: PickerTextDefaults;
	displayDatas?: readonly PickerDatasProps[];
	innerMultipleSelected?: PickerMultipleItem[];
	lastSelectedIndexs?: readonly number[];
	multiple?: boolean;
	multipleSelected?: PickerMultipleItem[];
	props: PickerStatePropsLike<TPopup>;
	viewportHeight?: number;
};
export type PickerDerived<TPopup = unknown> = {
	allLevelData: PickerLevelData[];
	cancelButtonClass: string;
	columnItems: PickerColumnDerived[];
	contentClass: string;
	contentStyleString: string;
	contentStyleValue: PickerHeightStyleValue | undefined;
	displayDatas: PickerDatasProps[];
	headerClass: string;
	initialState: PickerInitialState;
	inlineHeightStyleString: string;
	inlineHeightStyleValue: PickerHeightStyleValue;
	isCurrentSelected: boolean;
	maxShowRows: number;
	multipleButtonClass: string;
	multipleInactiveIconClass: string;
	multipleSelected: PickerMultipleItem[];
	multipleSelectionState: PickerMultipleSelectionState;
	multipleTagsClass: string;
	popupConfig: PickerPopupConfig<TPopup>;
	confirmButtonClass: string;
	showMultipleTags: boolean;
	showRows: number[];
	texts: PickerTexts;
	transitionDistance: number;
	usePopup: boolean;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolvePickerInitialVisible = (visible?: boolean): boolean => Boolean(visible);

export const resolvePickerUsePopup = (popup: unknown): boolean => popup !== null;

// 输入 Picker 的 Popup 配置，返回组件层可直接消费的透传对象。
// Receive Picker Popup config and return pass-through props for the component layer.
export const resolvePickerPopupConfig = <TPopup>(popup: TPopup | null | undefined): PickerPopupConfig<TPopup> => ({
	popupProps: popup ? popup : {}
});

// 输入组件 props、滚动状态和多选状态，返回 Picker 派生层统一入参。
// Receive component props, scroll state and multiple-selection state, then return normalized Picker derivation options.
export const resolvePickerStateOptions = <TPopup = unknown>({
	currentScrollingIndexs,
	defaults,
	displayDatas,
	innerMultipleSelected,
	lastSelectedIndexs,
	multiple,
	multipleSelected,
	props,
	viewportHeight
}: ResolvePickerStateOptionsParams<TPopup>): ResolvePickerDerivedOptions<TPopup> => ({
	datas: props.datas,
	defaults,
	isLinkage: props.isLinkage,
	childrenKey: props.childrenKey,
	labelKeys: props.labelKeys,
	linkageInitIndexs: props.linkageInitIndexs,
	linkageShowRows: props.linkageShowRows,
	linkageFlexs: props.linkageFlexs,
	linkageAligns: props.linkageAligns,
	cancelText: props.cancelText,
	confirmText: props.confirmText,
	title: props.title,
	height: props.height,
	popup: props.popup,
	viewportHeight,
	displayDatas,
	currentScrollingIndexs,
	lastSelectedIndexs,
	innerMultipleSelected,
	multiple,
	multipleSelected
});

// 输入组件文案 props 和默认文案，返回框架无关的最终文案。
// Consume component text props and default text, then return framework-agnostic final text.
export const resolvePickerTexts = ({ cancelText, confirmText, title, defaults }: ResolvePickerTextsOptions): PickerTexts => ({
	cancelText: cancelText ?? defaults.defaultCancel,
	confirmText: confirmText ?? defaults.defaultConfirm,
	title: title ?? defaults.defaultTitle
});

// 只计算内联模式高度，视口读取留在组件层。
// Only calculate inline mode height; viewport reading stays in the component layer.
export const resolvePickerInlineHeight = ({ viewportHeight = 0, height = 30 }: { viewportHeight?: number; height?: number } = {}): number =>
	(viewportHeight * height) / 100;

export const resolvePickerInlineHeightStyleValue = (options: { viewportHeight?: number; height?: number } = {}) => ({
	height: `${resolvePickerInlineHeight(options)}px`
});

export const resolvePickerInlineHeightStyleString = (options: { viewportHeight?: number; height?: number } = {}) =>
	`height:${resolvePickerInlineHeight(options)}px`;

// 输入弹层状态和内联高度配置，返回内容容器可直接绑定的高度样式。
// Receive popup state and inline height options, then return bind-ready content height styles.
export const resolvePickerContentStyleValue = ({
	usePopup = true,
	viewportHeight = 0,
	height = 30
}: { usePopup?: boolean; viewportHeight?: number; height?: number } = {}): PickerHeightStyleValue | undefined =>
	usePopup ? undefined : resolvePickerInlineHeightStyleValue({ viewportHeight, height });

export const resolvePickerContentStyleString = ({
	usePopup = true,
	viewportHeight = 0,
	height = 30
}: { usePopup?: boolean; viewportHeight?: number; height?: number } = {}): string =>
	usePopup ? '' : resolvePickerInlineHeightStyleString({ viewportHeight, height });

// 输入 Picker 列配置，返回组件层可直接绑定的列宽样式。
// Receive Picker column config and return bind-ready column width styles for the component layer.
export const resolvePickerColumnFlex = (flex?: unknown): string | number =>
	typeof flex === 'string' || typeof flex === 'number' ? flex || 1 : 1;

export const resolvePickerColumnStyleValue = (flex?: unknown): PickerColumnStyleValue => ({
	flex: resolvePickerColumnFlex(flex)
});

export const resolvePickerColumnStyleString = (flex?: unknown): string => `flex:${resolvePickerColumnFlex(flex)}`;

export const resolvePickerHeaderClass = () =>
	'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark';

export const resolvePickerCancelButtonClass = () => 'h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60';

export const resolvePickerConfirmButtonClass = () => 'text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10';

export const resolvePickerMultipleTagsClass = () =>
	'picker-selected-tags flex gap-2 overflow-x-auto bg-bg-surface px-3 py-2 dark:bg-bg-surface-dark';

export const resolvePickerContentClass = () => 'flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark';

export const resolvePickerColumnRootClass = () => 'truncate';

export const resolvePickerMultipleButtonClass = () => 'flex h-full w-12 shrink-0 cursor-pointer items-center justify-center';

export const resolvePickerMultipleInactiveIconClass = () => 'text-gray-400 dark:text-gray-500';

export const getPickerItemLabel = (item: PickerDatasProps | PickerDataChildProps | PickerRecord, labelKey = 'label'): string => {
	const value = (item as Record<string, unknown>)[labelKey] ?? (item as { label?: string }).label ?? '';
	return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
};

// 输入 Picker 当前索引和数据，返回框架无关的当前选中项列表。
// Resolve current Picker selected items from indexes and data without framework state.
export const resolvePickerCurrentItems = (options: ResolvePickerCurrentOptions): PickerRecord[] => {
	const { datas, currentIndexs, isLinkage = false, allLevelData = [], linkageLabelKeys = [] } = options;

	if (isLinkage) {
		return allLevelData.slice(0, currentIndexs.length).map((item, index) => {
			const selectedIndex = currentIndexs[index];
			if (Array.isArray(item) && item[selectedIndex]) {
				const selectedItem = item[selectedIndex] as PickerDataChildProps;
				const labelKey = linkageLabelKeys[index] || 'label';
				return { label: getPickerItemLabel(selectedItem, labelKey) };
			}
			return { label: '' };
		});
	}

	return (datas as PickerDatasProps[]).map((item, index) => {
		const data = item.data;
		if (Array.isArray(data)) {
			return (data[currentIndexs[index]] || {}) as PickerRecord;
		}
		return data as unknown as PickerRecord;
	});
};

// 输入当前索引和数据，返回组件层可直接使用的当前选择项和展示文案。
// Resolve current indexes and data into selection items and display label for component usage.
export const resolvePickerCurrentSelection = (options: ResolvePickerCurrentOptions): PickerCurrentSelection => {
	const items = resolvePickerCurrentItems(options);
	const label = items
		.map((item, index) => {
			if (options.isLinkage) return item.label || '';
			const sourceItem = (options.datas as PickerDatasProps[])[index];
			const labelKey = sourceItem?.labelKey || 'label';
			return item[labelKey] || '';
		})
		.filter(Boolean)
		.join(' / ');
	return { items, label };
};

export const resolvePickerCurrentLabel = (options: ResolvePickerCurrentOptions): string => resolvePickerCurrentSelection(options).label;

// 输入 Picker 当前状态，返回事件层可直接透传的选择结果。
// Convert current Picker state into selection data that event layers can pass through.
export const resolvePickerSelectionForEmit = <TItem extends PickerRecord = PickerRecord>(
	options: ResolvePickerCurrentOptions
): PickerSelectionForEmit<TItem> => {
	const selection = resolvePickerCurrentSelection(options);
	return { ...selection, items: selection.items as TItem[] };
};

// 输入取消动作，返回组件层可消费的关闭与回调决策。
// Resolve a cancel action into close and callback decisions for component usage.
export const resolvePickerCancelAction = (): PickerCancelAction => ({
	nextVisible: false,
	shouldCancel: true,
	shouldClose: true
});

// 输入 Picker 关闭请求，返回组件层可写入的关闭动作。
// Receive a Picker close request and return a close action for the component layer.
export const resolvePickerCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolvePickerCloseActionOptions = {}): PickerCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入当前选择状态，返回组件层可消费的确认动作结果。
// Consume current selection state and return a confirm action result for component usage.
export const resolvePickerConfirmAction = <TItem extends PickerRecord = PickerRecord>(
	options: ResolvePickerCurrentOptions
): PickerConfirmAction<TItem> => {
	const { items } = resolvePickerSelectionForEmit<TItem>(options);
	return {
		indexs: [...options.currentIndexs],
		items,
		nextVisible: false,
		shouldClose: true,
		shouldConfirm: true
	};
};

export type ResolvePickerAllLevelDataOptions = {
	datas: PickerDatasProps[] | PickerDataChildProps[];
	childrenKey?: string;
};

export type ResolvePickerLinkageDatasOptions = {
	datas: PickerDatasProps[] | PickerDataChildProps[];
	childrenKey?: string;
	labelKeys?: string[];
};

export type ResolvePickerInitialStateOptions = ResolvePickerLinkageDatasOptions & {
	isLinkage?: boolean;
	linkageAligns?: PickerAlign[];
	linkageFlexs?: number[];
	linkageInitIndexs?: number[];
	linkageShowRows?: number[];
};

export type PickerInitialState = {
	currentScrollingIndexs: number[];
	datas: PickerDatasProps[];
	lastSelectedIndexs: number[];
	maxShowRows: number;
	scrollEndIndexs: number[];
	showRows: number[];
	transitionDistance: number;
};

export type PickerLinkageColumnUpdate = {
	column: number;
	data: PickerDatasProps['data'];
};

export type PickerLinkageScrollState = {
	allLevelData: PickerLevelData[];
	columnUpdates: PickerLinkageColumnUpdate[];
	currentIndexs: number[];
	datas: PickerDatasProps[];
};

export type ResolvePickerLinkageScrollStateOptions = {
	allLevelData?: PickerLevelData[];
	childrenKey?: string;
	column: number;
	currentIndexs?: number[];
	datas: PickerDatasProps[] | PickerDataChildProps[];
	displayDatas?: PickerDatasProps[];
	index: number;
	labelKeys?: string[];
};

// 输入 Picker 列数据变更，返回框架无关的新列数据。
// Receive Picker column data changes and return framework-agnostic next columns.
export const resolvePickerDatasColumnData = (
	datas: readonly PickerDatasProps[],
	column: number,
	data: PickerDatasProps['data']
): PickerDatasProps[] => datas.map((item, index) => (index === column ? { ...item, data } : item));

// 只根据索引移除多选项，不触发事件或修改组件状态。
// Remove a multiple-selected item by index without emitting events or mutating component state.
export const removePickerMultipleSelectedAt = (multipleSelected: readonly PickerMultipleItem[], index: number): PickerMultipleItem[] =>
	multipleSelected.filter((_, itemIndex) => itemIndex !== index);

// 输入多选删除状态，返回组件层可消费的下一组选中项。
// Consume multiple remove state and return next selected items for component usage.
export const resolvePickerMultipleRemoveAction = ({
	multipleSelected,
	index
}: ResolvePickerMultipleRemoveActionOptions): PickerMultipleAction => ({
	nextSelected: removePickerMultipleSelectedAt(multipleSelected, index),
	shouldEmit: true
});

// 只沿默认首项链路展开层级数据，真实滚动后的层级更新仍由组件事件维护。
// Only expand level data along the default first-item path; components still update levels from scroll events.
export const resolvePickerAllLevelData = ({ datas, childrenKey = 'children' }: ResolvePickerAllLevelDataOptions): PickerLevelData[] => {
	const result: PickerLevelData[] = [];
	const walk = (data: PickerDatasProps[] | PickerDataChildProps[], level: number) => {
		if (!data || data.length === 0) return;
		result[level] = data;
		const firstItem = data[0] as PickerDataChildProps;
		const children = firstItem?.[childrenKey as keyof PickerDataChildProps];
		if (children && Array.isArray(children)) {
			walk(children, level + 1);
		}
	};

	walk(datas, 0);
	return result;
};

// 输入 Picker 原始联动数据，返回组件层可直接绑定的展示列数据。
// Resolve raw Picker linkage data into display columns that components can bind directly.
export const resolvePickerLinkageDatas = ({
	datas,
	childrenKey = 'children',
	labelKeys = []
}: ResolvePickerLinkageDatasOptions): PickerDatasProps[] => {
	const result: PickerDatasProps[] = [];
	const walk = (data: PickerDatasProps[] | PickerDataChildProps[], level: number) => {
		if (!data || data.length === 0) return;

		const nextData = data.map((item) => ({ label: getPickerItemLabel(item, labelKeys[level] || 'label') }));
		result.push({ data: nextData, showRow: 5, labelKey: 'label' });

		const firstItem = data[0] as PickerDataChildProps;
		const children = firstItem?.[childrenKey as keyof PickerDataChildProps];
		if (children && Array.isArray(children)) {
			walk(children, level + 1);
		}
	};

	walk(datas, 0);
	return result;
};

export const resolvePickerTransitionDistance = (maxShowRows: number): number =>
	(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41;

export const resolvePickerMaxShowRows = (showRows: readonly unknown[]): number => {
	const numericShowRows = showRows.filter((item): item is number => typeof item === 'number');
	return numericShowRows.length > 0 ? Math.max(...numericShowRows) : 5;
};

// 输入已初始化的 Picker 列数据，返回框架无关的展示行数列表。
// Consume initialized Picker columns and return framework-agnostic show-row values.
export const resolvePickerShowRows = (datas: readonly PickerDatasProps[]): number[] => datas.map((item) => item.showRow as number);

// 输入多选受控值和内部值，返回组件层可直接使用的多选状态。
// Resolve controlled and internal multiple-selected values into component-ready selection state.
export const resolvePickerMultipleSelectionState = ({
	innerMultipleSelected,
	multipleSelected
}: {
	innerMultipleSelected: PickerMultipleItem[];
	multipleSelected?: PickerMultipleItem[];
}): PickerMultipleSelectionState => {
	const isControlled = multipleSelected !== undefined;
	return {
		isControlled,
		selected: isControlled ? multipleSelected : innerMultipleSelected
	};
};

// 输入 Picker 配置，返回初始化后的列、索引和布局派生值。
// Resolve Picker config into initialized columns, indexes and layout values.
export const resolvePickerInitialState = ({
	datas,
	isLinkage = false,
	childrenKey = 'children',
	labelKeys = [],
	linkageInitIndexs = [],
	linkageShowRows = [],
	linkageFlexs = [],
	linkageAligns = []
}: ResolvePickerInitialStateOptions): PickerInitialState => {
	const workingDatas = isLinkage
		? resolvePickerLinkageDatas({ datas, childrenKey, labelKeys })
		: (datas as PickerDatasProps[]).map((item) => ({ ...item }));

	const processedDatas = workingDatas.map((item, index) => {
		const processedItem: PickerDatasProps = { ...item };
		if (!processedItem.initIndex) processedItem.initIndex = 0;
		if (!processedItem.showRow) processedItem.showRow = 5;
		if (!processedItem.lastSelectedIndex) processedItem.lastSelectedIndex = 0;
		if (!processedItem.flex) processedItem.flex = 1;
		if (!processedItem.align) processedItem.align = 'center';

		if (isLinkage) {
			processedItem.initIndex = linkageInitIndexs[index] || 0;
			if (linkageShowRows[index]) processedItem.showRow = linkageShowRows[index] as 3 | 5 | 7;
			if (linkageFlexs[index]) processedItem.flex = linkageFlexs[index];
			if (linkageAligns[index]) processedItem.align = linkageAligns[index];
			if (!processedItem.lastSelectedIndex) processedItem.lastSelectedIndex = 0;
		}

		return processedItem;
	});

	const scrollEndIndexs = processedDatas.map((item) => item.initIndex as number);
	const showRows = processedDatas.map((item) => item.showRow as number);
	const maxShowRows = resolvePickerMaxShowRows(showRows);

	return {
		currentScrollingIndexs: [...scrollEndIndexs],
		datas: processedDatas,
		lastSelectedIndexs: [...scrollEndIndexs],
		maxShowRows,
		scrollEndIndexs,
		showRows,
		transitionDistance: resolvePickerTransitionDistance(maxShowRows)
	};
};

export const resolvePickerMultipleSelected = ({
	multiple,
	multipleSelected,
	currentIndexs
}: {
	currentIndexs: number[];
	multiple?: boolean;
	multipleSelected: PickerMultipleItem[];
}): boolean => {
	if (!multiple || multipleSelected.length === 0) return false;
	return multipleSelected.some((item) => item.indexs.every((index, itemIndex) => index === currentIndexs[itemIndex]));
};

// 输入联动滚动状态，返回无框架的列数据和层级更新计划。
// Resolve linkage scroll state into framework-agnostic column data and level updates.
export const resolvePickerLinkageScrollState = ({
	allLevelData = [],
	childrenKey = 'children',
	column,
	currentIndexs = [],
	datas,
	displayDatas = [],
	index,
	labelKeys = []
}: ResolvePickerLinkageScrollStateOptions): PickerLinkageScrollState => {
	const nextIndexs = [...currentIndexs];
	nextIndexs[column] = index;
	const nextDatas = displayDatas.map((item, itemIndex) => (itemIndex > column ? { ...item, initIndex: 0 } : item));
	const nextAllLevelData = [...allLevelData];
	const columnUpdates: PickerLinkageColumnUpdate[] = [];

	let currentLevelData: PickerLevelData = [];
	if (column === 0) {
		currentLevelData = datas;
		nextAllLevelData[0] = datas;
	} else {
		const preLevelData = nextAllLevelData[column - 1] as PickerDataChildProps[];
		const children = preLevelData?.[nextIndexs[column - 1]]?.[childrenKey as keyof PickerDataChildProps];
		currentLevelData = children && Array.isArray(children) ? children : [];
		nextAllLevelData[column] = currentLevelData;
	}

	const walk = (currentColumn: number, levelData: PickerLevelData) => {
		const nextColumn = currentColumn + 1;
		if (nextColumn >= nextDatas.length) return;

		const source = levelData.length === 1 ? levelData[0] : levelData[index];
		const nextLevelData = source?.[childrenKey as keyof (PickerDataChildProps | PickerDatasProps)];

		if (nextLevelData && Array.isArray(nextLevelData) && nextLevelData.length > 0) {
			const labelKey = labelKeys[nextColumn] || 'label';
			columnUpdates.push({
				column: nextColumn,
				data: nextLevelData.map((item) => ({ label: getPickerItemLabel(item, labelKey) }))
			});
			nextAllLevelData[nextColumn] = nextLevelData;
			walk(nextColumn, nextLevelData);
			return;
		}

		columnUpdates.push({ column: nextColumn, data: [] });
	};

	walk(column, currentLevelData);

	return {
		allLevelData: nextAllLevelData,
		columnUpdates,
		currentIndexs: nextIndexs,
		datas: nextDatas
	};
};

export const resolvePickerMultipleNextSelected = ({
	currentIndexs,
	items,
	label,
	multipleSelected
}: {
	currentIndexs: number[];
	items: PickerMultipleItem['items'];
	label: string;
	multipleSelected: PickerMultipleItem[];
}): PickerMultipleItem[] => {
	const existingIndex = multipleSelected.findIndex((item) => item.indexs.every((index, itemIndex) => index === currentIndexs[itemIndex]));
	if (existingIndex >= 0) return multipleSelected.filter((_, index) => index !== existingIndex);
	return [...multipleSelected, { indexs: currentIndexs, items, label }];
};

// 输入当前滚动选择和多选状态，返回组件层可消费的下一组选中项。
// Consume current scroll selection and multiple state, then return next selected items for component usage.
export const resolvePickerMultipleToggleAction = (options: ResolvePickerMultipleToggleActionOptions): PickerMultipleAction => {
	const currentIndexs = [...options.currentIndexs];
	const { items, label } = resolvePickerSelectionForEmit<PickerMultipleItem['items'][number]>(options);
	return {
		nextSelected: resolvePickerMultipleNextSelected({ currentIndexs, items, label, multipleSelected: options.multipleSelected }),
		shouldEmit: true
	};
};

const createPickerColumnDerived = (item: PickerDatasProps, index: number, lastSelectedIndexs: readonly number[]): PickerColumnDerived => ({
	data: item.data,
	hasData: Array.isArray(item.data) && item.data.length > 0,
	index,
	item,
	lastSelectedIndex: lastSelectedIndexs[index],
	rootClass: resolvePickerColumnRootClass(),
	styleString: resolvePickerColumnStyleString(item.flex),
	styleValue: resolvePickerColumnStyleValue(item.flex)
});

// 输入 Picker 的 props 和组件层状态，返回框架无关的初始化、列渲染、多选和布局派生。
// Receive Picker props and component-layer state, then return framework-agnostic initialization, column rendering, multiple-selection and layout derivations.
export const resolvePickerDerived = <TPopup = unknown>({
	cancelText,
	childrenKey = 'children',
	confirmText,
	currentScrollingIndexs = [],
	datas,
	defaults,
	displayDatas,
	height = 30,
	innerMultipleSelected = [],
	isLinkage = false,
	labelKeys = [],
	linkageAligns = [],
	linkageFlexs = [],
	linkageInitIndexs = [],
	linkageShowRows = [],
	lastSelectedIndexs,
	multiple = false,
	multipleSelected,
	popup = {} as TPopup,
	title,
	viewportHeight = 0
}: ResolvePickerDerivedOptions<TPopup>): PickerDerived<TPopup> => {
	const initialState = resolvePickerInitialState({
		datas,
		isLinkage,
		childrenKey,
		labelKeys,
		linkageInitIndexs,
		linkageShowRows,
		linkageFlexs,
		linkageAligns
	});
	const allLevelData = isLinkage ? resolvePickerAllLevelData({ datas, childrenKey }) : [];
	const resolvedDisplayDatas = (displayDatas ? displayDatas.map((item) => ({ ...item })) : initialState.datas).map((item) => ({ ...item }));
	const showRows = resolvePickerShowRows(resolvedDisplayDatas);
	const maxShowRows = resolvePickerMaxShowRows(showRows);
	const resolvedMultipleSelectionState = resolvePickerMultipleSelectionState({ multipleSelected, innerMultipleSelected });
	const resolvedMultipleSelected = resolvedMultipleSelectionState.selected;
	const resolvedLastSelectedIndexs = lastSelectedIndexs ?? initialState.lastSelectedIndexs;
	const usePopup = resolvePickerUsePopup(popup);

	return {
		allLevelData,
		cancelButtonClass: resolvePickerCancelButtonClass(),
		columnItems: resolvedDisplayDatas.map((item, index) => createPickerColumnDerived(item, index, resolvedLastSelectedIndexs)),
		contentClass: resolvePickerContentClass(),
		contentStyleString: resolvePickerContentStyleString({ usePopup, viewportHeight, height }),
		contentStyleValue: resolvePickerContentStyleValue({ usePopup, viewportHeight, height }),
		displayDatas: resolvedDisplayDatas,
		headerClass: resolvePickerHeaderClass(),
		initialState,
		inlineHeightStyleString: resolvePickerInlineHeightStyleString({ viewportHeight, height }),
		inlineHeightStyleValue: resolvePickerInlineHeightStyleValue({ viewportHeight, height }),
		isCurrentSelected: resolvePickerMultipleSelected({
			multiple,
			multipleSelected: resolvedMultipleSelected,
			currentIndexs: [...currentScrollingIndexs]
		}),
		maxShowRows,
		multipleButtonClass: resolvePickerMultipleButtonClass(),
		multipleInactiveIconClass: resolvePickerMultipleInactiveIconClass(),
		multipleSelected: resolvedMultipleSelected,
		multipleSelectionState: resolvedMultipleSelectionState,
		multipleTagsClass: resolvePickerMultipleTagsClass(),
		popupConfig: resolvePickerPopupConfig<TPopup>(popup),
		confirmButtonClass: resolvePickerConfirmButtonClass(),
		showMultipleTags: Boolean(multiple && resolvedMultipleSelected.length > 0),
		showRows,
		texts: resolvePickerTexts({ cancelText, confirmText, title, defaults }),
		transitionDistance: resolvePickerTransitionDistance(maxShowRows),
		usePopup
	};
};
