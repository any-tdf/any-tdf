export type AsyncPickerRecord = Record<string, unknown>;

export type ResolveAsyncPickerMetricsOptions = {
	showRow?: number;
	showSelected?: boolean;
	height?: number;
	viewportHeight?: number;
	usePopup?: boolean;
};

export type ResolveAsyncPickerNavigationTextOptions = {
	firstLevel?: boolean;
	lastLevel?: boolean;
	cancelText?: string;
	prevText?: string;
	confirmText?: string;
	nextText?: string;
};

export type AsyncPickerTexts = {
	cancelText: string;
	confirmText: string;
	title: string;
	nextText: string;
	prevText: string;
	selectedText: string;
};

export type AsyncPickerTextDefaults = {
	defaultCancel: string;
	defaultConfirm: string;
	defaultTitle: string;
	defaultNext: string;
	defaultPrev: string;
	defaultSelected: string;
};

export type ResolveAsyncPickerTextsOptions = Partial<AsyncPickerTexts> & {
	defaults: AsyncPickerTextDefaults;
};

export type ResolveAsyncPickerBackStateOptions<TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	items: TItem[];
	indexs: number[];
};

export type ResolveAsyncPickerSelectStateOptions<TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	items: TItem[];
	indexs: number[];
	data: TItem[];
	currentIndex?: number;
};

export type ResolveAsyncPickerLeftActionOptions<TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	firstLevel?: boolean;
	isLoading?: boolean;
	items: TItem[];
	indexs: number[];
};

export type ResolveAsyncPickerRightActionOptions<TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	lastLevel?: boolean;
	isLoading?: boolean;
	items: TItem[];
	indexs: number[];
	data: TItem[];
	currentIndex?: number;
};

export type AsyncPickerLeftAction<TItem extends AsyncPickerRecord = AsyncPickerRecord> =
	| { type: 'none' }
	| { type: 'cancel' }
	| { type: 'prev'; items: TItem[]; indexs: number[] };

export type AsyncPickerRightAction<TItem extends AsyncPickerRecord = AsyncPickerRecord> =
	| { type: 'none' }
	| { type: 'next'; currentIndex: number; selectedItem: TItem | undefined; items: TItem[]; indexs: number[] }
	| { type: 'confirm'; currentIndex: number; selectedItem: TItem | undefined; items: TItem[]; indexs: number[] };

export type AsyncPickerLeftButtonFlow<TItem extends AsyncPickerRecord = AsyncPickerRecord> =
	| { type: 'none' }
	| { type: 'cancel'; closeAction: AsyncPickerCloseAction }
	| { type: 'prev'; items: TItem[]; indexs: number[]; resetState: AsyncPickerSelectionResetState<TItem> };

export type AsyncPickerRightButtonFlow<TItem extends AsyncPickerRecord = AsyncPickerRecord> =
	| { type: 'none' }
	| {
			type: 'next';
			currentIndex: number;
			selectedItem: TItem | undefined;
			items: TItem[];
			indexs: number[];
			resetState: AsyncPickerSelectionResetState<TItem>;
	  }
	| {
			type: 'confirm';
			currentIndex: number;
			selectedItem: TItem | undefined;
			items: TItem[];
			indexs: number[];
			resetState: AsyncPickerSelectionResetState<TItem>;
			closeAction: AsyncPickerCloseAction;
	  };

export type AsyncPickerSelectionResetState<TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	currentIndex: number;
	data: TItem[];
};

export type ResolveAsyncPickerCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};

export type AsyncPickerCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type ResolveAsyncPickerSelectedFlyParamsOptions = {
	viewportWidth?: number;
	duration?: number;
};
export type AsyncPickerPopupConfig<TPopup> = {
	popupProps: TPopup | Record<string, never>;
};
export type AsyncPickerHeightStyleValue = {
	height: number;
};
export type AsyncPickerMotionParams = {
	x: number;
	duration: number;
};
export type AsyncPickerMetrics = {
	inlineHeight: number;
	loadingHeight: number;
	popupBodyHeight: number;
	rowHeight: number;
	transitionDistance: number;
};
export type ResolveAsyncPickerDerivedOptions<
	TPopup = unknown,
	TItem extends AsyncPickerRecord = AsyncPickerRecord
> = Partial<AsyncPickerTexts> & {
	currentIndex?: number;
	data?: TItem[];
	defaults: AsyncPickerTextDefaults;
	firstLevel?: boolean;
	height?: number;
	indexs?: number[];
	items?: TItem[];
	lastLevel?: boolean;
	popup?: TPopup | null;
	selectedFlyInDuration?: number;
	selectedFlyOutDuration?: number;
	showRow?: number;
	showSelected?: boolean;
	viewportHeight?: number;
	viewportWidth?: number;
};
export type AsyncPickerStatePropsLike<TPopup = unknown, TItem extends AsyncPickerRecord = AsyncPickerRecord> = Partial<
	Omit<
		ResolveAsyncPickerDerivedOptions<TPopup, TItem>,
		'currentIndex' | 'data' | 'defaults' | 'firstLevel' | 'indexs' | 'items' | 'lastLevel' | 'viewportHeight' | 'viewportWidth'
	>
>;
export type ResolveAsyncPickerStateOptionsParams<TPopup = unknown, TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	currentIndex?: number;
	data?: TItem[];
	defaults: AsyncPickerTextDefaults;
	firstLevel?: boolean;
	indexs?: number[];
	items?: TItem[];
	lastLevel?: boolean;
	props: AsyncPickerStatePropsLike<TPopup, TItem>;
	viewportHeight?: number;
	viewportWidth?: number;
};
export type AsyncPickerDerived<TPopup = unknown, TItem extends AsyncPickerRecord = AsyncPickerRecord> = {
	bodyClass: string;
	buttonLoadingClass: string;
	contentClipClass: string;
	headerClass: string;
	inlineContentStyleString: string;
	inlineContentStyleValue: AsyncPickerHeightStyleValue | undefined;
	inlineHeightStyleString: string;
	inlineHeightStyleValue: AsyncPickerHeightStyleValue;
	isLoading: boolean;
	leftAction: AsyncPickerLeftAction<TItem>;
	leftButtonClass: string;
	leftButtonText: string;
	loadingClass: string;
	loadingHeightStyleString: string;
	loadingHeightStyleValue: AsyncPickerHeightStyleValue;
	metrics: AsyncPickerMetrics;
	popupConfig: AsyncPickerPopupConfig<TPopup>;
	rightAction: AsyncPickerRightAction<TItem>;
	rightButtonClass: string;
	rightButtonText: string;
	selectedItemClass: string;
	selectedLabelClass: string;
	selectedWrapClass: string;
	selectedFlyInParams: AsyncPickerMotionParams;
	selectedFlyOutParams: AsyncPickerMotionParams;
	texts: AsyncPickerTexts;
	usePopup: boolean;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveAsyncPickerInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入 AsyncPicker 当前可见状态，返回组件层可写入的关闭动作。
// Receive the current AsyncPicker visibility and return a close action for the component layer.
export const resolveAsyncPickerCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveAsyncPickerCloseActionOptions = {}): AsyncPickerCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入 AsyncPicker 层级切换请求，返回组件层可写入的选择复位状态。
// Receive an AsyncPicker level-change request and return selection reset state for component code to apply.
export const resolveAsyncPickerSelectionResetState = <
	TItem extends AsyncPickerRecord = AsyncPickerRecord
>(): AsyncPickerSelectionResetState<TItem> => ({
	currentIndex: 0,
	data: []
});

export const resolveAsyncPickerUsePopup = (popup: unknown) => popup !== null;

// 输入 AsyncPicker 的 Popup 配置，返回组件层可直接消费的透传对象。
// Receive AsyncPicker Popup config and return pass-through props for the component layer.
export const resolveAsyncPickerPopupConfig = <TPopup>(popup: TPopup | null | undefined): AsyncPickerPopupConfig<TPopup> => ({
	popupProps: popup ? popup : {}
});

// 输入组件 props、当前选择状态和环境数值，返回 AsyncPicker 派生层统一入参。
// Receive component props, current selection state and environment values, then return normalized AsyncPicker derivation options.
export const resolveAsyncPickerStateOptions = <TPopup = unknown, TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	currentIndex,
	data,
	defaults,
	firstLevel,
	indexs,
	items,
	lastLevel,
	props,
	viewportHeight,
	viewportWidth
}: ResolveAsyncPickerStateOptionsParams<TPopup, TItem>): ResolveAsyncPickerDerivedOptions<TPopup, TItem> => ({
	cancelText: props.cancelText,
	confirmText: props.confirmText,
	currentIndex,
	data,
	defaults,
	firstLevel,
	height: props.height,
	indexs,
	items,
	lastLevel,
	nextText: props.nextText,
	popup: props.popup,
	prevText: props.prevText,
	selectedFlyInDuration: props.selectedFlyInDuration,
	selectedFlyOutDuration: props.selectedFlyOutDuration,
	selectedText: props.selectedText,
	showRow: props.showRow,
	showSelected: props.showSelected,
	title: props.title,
	viewportHeight,
	viewportWidth
});

export const resolveAsyncPickerLoading = (data: unknown[] = []) => data.length === 0;

export const resolveAsyncPickerRowHeight = (showRow = 5) => (showRow === 3 ? 64 : showRow === 5 ? 48 : 32);

// 输入组件文案 props 和默认文案，返回框架无关的最终文案。
// Consume component text props and default text, then return framework-agnostic final text.
export const resolveAsyncPickerTexts = ({
	cancelText,
	confirmText,
	title,
	nextText,
	prevText,
	selectedText,
	defaults
}: ResolveAsyncPickerTextsOptions): AsyncPickerTexts => ({
	cancelText: cancelText ?? defaults.defaultCancel,
	confirmText: confirmText ?? defaults.defaultConfirm,
	title: title ?? defaults.defaultTitle,
	nextText: nextText ?? defaults.defaultNext,
	prevText: prevText ?? defaults.defaultPrev,
	selectedText: selectedText ?? defaults.defaultSelected
});

// 输入 AsyncPicker 状态和视口高度，返回框架无关的尺寸派生值。
// Consume AsyncPicker state and viewport height, then return framework-agnostic size values.
export const resolveAsyncPickerMetrics = ({
	showRow = 5,
	showSelected = false,
	height = 30,
	viewportHeight = 0,
	usePopup = true
}: ResolveAsyncPickerMetricsOptions = {}) => {
	const rowHeight = resolveAsyncPickerRowHeight(showRow);
	const popupBodyHeight = rowHeight * showRow;
	const inlineHeight = (viewportHeight * height) / 100;
	return {
		rowHeight,
		popupBodyHeight,
		inlineHeight,
		loadingHeight: usePopup ? popupBodyHeight : inlineHeight,
		transitionDistance: popupBodyHeight + 41 + (showSelected ? 32 : 0)
	};
};

export const resolveAsyncPickerHeightStyleValue = (height: number) => ({ height });

export const resolveAsyncPickerHeightStyleString = (height: number) => `height:${height}px`;

// 输入弹层状态和内联高度，返回内容容器可直接绑定的高度样式。
// Receive popup state and inline height, then return bind-ready content height styles.
export const resolveAsyncPickerInlineContentStyleValue = ({ usePopup = true, height = 0 }: { usePopup?: boolean; height?: number } = {}):
	| AsyncPickerHeightStyleValue
	| undefined => (usePopup ? undefined : resolveAsyncPickerHeightStyleValue(height));

export const resolveAsyncPickerInlineContentStyleString = ({
	usePopup = true,
	height = 0
}: { usePopup?: boolean; height?: number } = {}): string => (usePopup ? '' : resolveAsyncPickerHeightStyleString(height));

export const resolveAsyncPickerHeaderClass = () =>
	'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark';

export const resolveAsyncPickerLeftButtonClass = () => 'h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60';

export const resolveAsyncPickerRightButtonClass = () => 'text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10';

export const resolveAsyncPickerButtonLoadingClass = () => 'p-3';

export const resolveAsyncPickerSelectedWrapClass = () => 'flex w-full gap-3 overflow-x-hidden bg-bg-surface px-4 dark:bg-bg-surface-dark';

export const resolveAsyncPickerSelectedLabelClass = () => 'h-8 flex-none text-center text-sm leading-8 text-black/60 dark:text-white/60';

export const resolveAsyncPickerSelectedItemClass = () => 'h-8 flex-1 truncate px-1 text-center text-sm leading-8';

export const resolveAsyncPickerBodyClass = () => 'bg-bg-surface dark:bg-bg-surface-dark';

export const resolveAsyncPickerContentClipClass = () => 'truncate';

export const resolveAsyncPickerLoadingClass = () => 'flex items-center justify-center';

export const resolveAsyncPickerLeftText = ({
	firstLevel = true,
	cancelText = '',
	prevText = ''
}: ResolveAsyncPickerNavigationTextOptions = {}) => (firstLevel ? cancelText : prevText);

export const resolveAsyncPickerRightText = ({
	lastLevel = false,
	confirmText = '',
	nextText = ''
}: ResolveAsyncPickerNavigationTextOptions = {}) => (lastLevel ? confirmText : nextText);

// 输入视口宽度和时长，返回已选路径动画参数。
// Receive viewport width and duration, then return selected-path motion params.
export const resolveAsyncPickerSelectedFlyParams = ({
	viewportWidth = 0,
	duration = 500
}: ResolveAsyncPickerSelectedFlyParamsOptions = {}) => ({
	x: viewportWidth,
	duration
});

// 只计算选中路径变化，事件派发和异步加载仍由组件层维护。
// Only calculate selected path changes; event dispatch and async loading stay in the component layer.
export const resolveAsyncPickerBackState = <TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	items,
	indexs
}: ResolveAsyncPickerBackStateOptions<TItem>) => ({
	items: items.slice(0, items.length - 1),
	indexs: indexs.slice(0, -1)
});

export const resolveAsyncPickerSelectState = <TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	items,
	indexs,
	data,
	currentIndex = 0
}: ResolveAsyncPickerSelectStateOptions<TItem>) => {
	const selectedItem = data[currentIndex];
	return {
		selectedItem,
		items: selectedItem ? [...items, selectedItem] : [...items],
		indexs: [...indexs, currentIndex]
	};
};

// 输入按钮相关状态，返回左侧按钮的纯动作描述。
// Receive button state and return the left-button action description without side effects.
export const resolveAsyncPickerLeftAction = <TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	firstLevel = true,
	isLoading = false,
	items,
	indexs
}: ResolveAsyncPickerLeftActionOptions<TItem>): AsyncPickerLeftAction<TItem> => {
	if (isLoading) return { type: 'none' };
	if (firstLevel) return { type: 'cancel' };
	return { type: 'prev', ...resolveAsyncPickerBackState({ items, indexs }) };
};

// 输入按钮相关状态，返回右侧按钮的纯动作描述。
// Receive button state and return the right-button action description without side effects.
export const resolveAsyncPickerRightAction = <TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	lastLevel = false,
	isLoading = false,
	items,
	indexs,
	data,
	currentIndex = 0
}: ResolveAsyncPickerRightActionOptions<TItem>): AsyncPickerRightAction<TItem> => {
	if (isLoading) return { type: 'none' };
	const nextState = resolveAsyncPickerSelectState({ items, indexs, data, currentIndex });
	return { type: lastLevel ? 'confirm' : 'next', currentIndex, ...nextState };
};

// 输入左侧按钮动作，返回组件层可执行的状态补丁和关闭决策。
// Receive a left-button action and return state patches plus close decisions for component code.
export const resolveAsyncPickerLeftButtonFlow = <TItem extends AsyncPickerRecord = AsyncPickerRecord>(
	action: AsyncPickerLeftAction<TItem>
): AsyncPickerLeftButtonFlow<TItem> => {
	if (action.type === 'none') return { type: 'none' };
	if (action.type === 'cancel') {
		return {
			type: 'cancel',
			closeAction: resolveAsyncPickerCloseAction({ emitClose: false })
		};
	}
	return {
		type: 'prev',
		items: action.items,
		indexs: action.indexs,
		resetState: resolveAsyncPickerSelectionResetState<TItem>()
	};
};

// 输入右侧按钮动作，返回组件层可执行的状态补丁和确认 / 下一级决策。
// Receive a right-button action and return state patches plus confirm or next-step decisions for component code.
export const resolveAsyncPickerRightButtonFlow = <TItem extends AsyncPickerRecord = AsyncPickerRecord>(
	action: AsyncPickerRightAction<TItem>
): AsyncPickerRightButtonFlow<TItem> => {
	if (action.type === 'none') return { type: 'none' };
	const resetState = resolveAsyncPickerSelectionResetState<TItem>();
	if (action.type === 'confirm') {
		return {
			type: 'confirm',
			currentIndex: action.currentIndex,
			selectedItem: action.selectedItem,
			items: action.items,
			indexs: action.indexs,
			resetState,
			closeAction: resolveAsyncPickerCloseAction()
		};
	}
	return {
		type: 'next',
		currentIndex: action.currentIndex,
		selectedItem: action.selectedItem,
		items: action.items,
		indexs: action.indexs,
		resetState
	};
};

// 输入 AsyncPicker 的 props 和组件层状态，返回框架无关的渲染派生与纯动作描述。
// Receive AsyncPicker props and component-layer state, then return framework-agnostic render derivations and side-effect-free actions.
export const resolveAsyncPickerDerived = <TPopup = unknown, TItem extends AsyncPickerRecord = AsyncPickerRecord>({
	cancelText,
	confirmText,
	currentIndex = 0,
	data = [],
	defaults,
	firstLevel = true,
	height = 30,
	indexs = [],
	items = [],
	lastLevel = false,
	nextText,
	popup = {} as TPopup,
	prevText,
	selectedFlyInDuration = 500,
	selectedFlyOutDuration = 300,
	selectedText,
	showRow = 5,
	showSelected = false,
	title,
	viewportHeight = 0,
	viewportWidth = 0
}: ResolveAsyncPickerDerivedOptions<TPopup, TItem>): AsyncPickerDerived<TPopup, TItem> => {
	const texts = resolveAsyncPickerTexts({ cancelText, confirmText, title, nextText, prevText, selectedText, defaults });
	const usePopup = resolveAsyncPickerUsePopup(popup);
	const isLoading = resolveAsyncPickerLoading(data);
	const metrics = resolveAsyncPickerMetrics({ showRow, showSelected, height, viewportHeight, usePopup });

	return {
		bodyClass: resolveAsyncPickerBodyClass(),
		buttonLoadingClass: resolveAsyncPickerButtonLoadingClass(),
		contentClipClass: resolveAsyncPickerContentClipClass(),
		headerClass: resolveAsyncPickerHeaderClass(),
		inlineContentStyleString: resolveAsyncPickerInlineContentStyleString({ usePopup, height: metrics.inlineHeight }),
		inlineContentStyleValue: resolveAsyncPickerInlineContentStyleValue({ usePopup, height: metrics.inlineHeight }),
		inlineHeightStyleString: resolveAsyncPickerHeightStyleString(metrics.inlineHeight),
		inlineHeightStyleValue: resolveAsyncPickerHeightStyleValue(metrics.inlineHeight),
		isLoading,
		leftAction: resolveAsyncPickerLeftAction({ firstLevel, isLoading, items, indexs }),
		leftButtonClass: resolveAsyncPickerLeftButtonClass(),
		leftButtonText: resolveAsyncPickerLeftText({ firstLevel, cancelText: texts.cancelText, prevText: texts.prevText }),
		loadingClass: resolveAsyncPickerLoadingClass(),
		loadingHeightStyleString: resolveAsyncPickerHeightStyleString(metrics.loadingHeight),
		loadingHeightStyleValue: resolveAsyncPickerHeightStyleValue(metrics.loadingHeight),
		metrics,
		popupConfig: resolveAsyncPickerPopupConfig<TPopup>(popup),
		rightAction: resolveAsyncPickerRightAction({ lastLevel, isLoading, items, indexs, data, currentIndex }),
		rightButtonClass: resolveAsyncPickerRightButtonClass(),
		rightButtonText: resolveAsyncPickerRightText({ lastLevel, confirmText: texts.confirmText, nextText: texts.nextText }),
		selectedItemClass: resolveAsyncPickerSelectedItemClass(),
		selectedLabelClass: resolveAsyncPickerSelectedLabelClass(),
		selectedWrapClass: resolveAsyncPickerSelectedWrapClass(),
		selectedFlyInParams: resolveAsyncPickerSelectedFlyParams({ viewportWidth, duration: selectedFlyInDuration }),
		selectedFlyOutParams: resolveAsyncPickerSelectedFlyParams({ viewportWidth, duration: selectedFlyOutDuration }),
		texts,
		usePopup
	};
};
