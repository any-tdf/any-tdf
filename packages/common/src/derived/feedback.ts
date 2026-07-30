export type FeedbackStackPosition = 'top' | 'bottom' | 'center' | string;

export type ResolveFeedbackStackStyleOptions = {
	index?: number;
	position?: FeedbackStackPosition;
	baseGap?: number;
	gap?: number;
};
export type FeedbackQueueItem = {
	id: string;
};
export type ResolveFeedbackQueueShowActionOptions<TOptions extends FeedbackMessageOption, TItem extends FeedbackQueueItem> = {
	id: string;
	options: TOptions | string;
	queue: readonly TItem[];
	visible?: boolean;
};
export type FeedbackQueueShowAction<TItem extends FeedbackQueueItem> = {
	item: TItem;
	nextQueue: TItem[];
};
export type ResolveFeedbackQueueHideActionOptions<TItem extends FeedbackQueueItem> = {
	id?: string;
	queue: readonly TItem[];
};
export type FeedbackQueueHideAction<TItem extends FeedbackQueueItem> = {
	nextQueue: TItem[];
	shouldUpdate: boolean;
};
export type FeedbackPositionQueueItem = {
	position?: FeedbackStackPosition;
};
export type FeedbackQueueStyleValue = Partial<Record<'marginBottom' | 'marginTop', number>>;
export type FeedbackQueueViewItem<TItem extends FeedbackPositionQueueItem & FeedbackQueueItem> = {
	index: number;
	item: TItem;
	key: string;
	styleString: string;
	styleValue: FeedbackQueueStyleValue;
	zIndex: number;
};
export type ResolveFeedbackQueueItemStyleOptions<TItem extends FeedbackPositionQueueItem> = Omit<
	ResolveFeedbackStackStyleOptions,
	'position'
> & {
	item: TItem;
};
export type FeedbackDialogDefaults = {
	primaryText: string;
	secondaryText: string;
	title: string;
};
export type FeedbackModalDefaults = {
	btnText: string;
	title: string;
};
export type FeedbackDialogConfirmOptions = {
	content: string;
	defaults: FeedbackDialogDefaults;
	emptyTitleFallback?: boolean;
	title?: string;
};
export type FeedbackModalInfoOptions = {
	content: string;
	defaults: FeedbackModalDefaults;
	emptyTitleFallback?: boolean;
	title?: string;
};
export type FeedbackLoadingState<TProps extends object> = {
	message: string;
	props: Partial<TProps>;
};
export type FeedbackVisibilityResetState = {
	dialogVisible: boolean;
	loadingVisible: boolean;
	modalVisible: boolean;
};
export type FeedbackLoadingVisibilityAction<TProps extends object> = FeedbackLoadingState<TProps> & {
	nextVisible: boolean;
};
export type FeedbackLoadingRenderSizeProps = {
	height?: string;
	width?: string;
};
export type FeedbackMessageOption = {
	message?: string;
};
export type FeedbackDialogCallbackProps = {
	onPrimary?: unknown;
	onSecondary?: unknown;
	onClose?: unknown;
};
export type FeedbackModalCallbackProps = {
	onClose?: unknown;
};
export type SplitFeedbackDialogCallbacksResult<TProps extends FeedbackDialogCallbackProps> = {
	dialogProps: Omit<TProps, keyof FeedbackDialogCallbackProps>;
	dialogOnPrimary: TProps['onPrimary'] | undefined;
	dialogOnSecondary: TProps['onSecondary'] | undefined;
	dialogOnClose: TProps['onClose'] | undefined;
};
export type SplitFeedbackModalCallbacksResult<TProps extends FeedbackModalCallbackProps> = {
	modalProps: Omit<TProps, keyof FeedbackModalCallbackProps>;
	modalOnClose: TProps['onClose'] | undefined;
};
export type FeedbackTypedShortcutOptions<TOptions extends object, TType extends string = string> = {
	duration?: number;
	message: string;
	options?: TOptions;
	type: TType;
};
export type FeedbackDialogResultActionKind = 'close' | 'primary' | 'secondary';
export type FeedbackModalResultActionKind = 'close' | 'confirm';
export type FeedbackResultAction<TResult extends string> = {
	nextVisible: false;
	result: TResult;
	shouldResolve: true;
};

// 输入组件服务维护的计数与时间戳，返回框架无关的反馈 ID。
// Receive the counter and timestamp owned by the component service, then return a framework-agnostic feedback ID.
export const resolveFeedbackId = ({ counter, timestamp }: { counter: number; timestamp: number }): string =>
	`feedback_${counter}_${timestamp}`;

// 输入反馈服务生命周期请求，返回组件层可写入的初始可见态。
// Receive a feedback service lifecycle request and return initial visibility for the component layer.
export const resolveFeedbackInitialVisible = (): boolean => false;

// 输入反馈服务重置请求，返回组件层可写入的可见状态集合。
// Receive a feedback service reset request and return visibility state for the component layer.
export const resolveFeedbackResetVisibilityState = (): FeedbackVisibilityResetState => ({
	dialogVisible: false,
	loadingVisible: false,
	modalVisible: false
});

// 输入反馈队列和队列项，返回框架无关的新队列。
// Receive a feedback queue and item, then return a framework-agnostic next queue.
export const appendFeedbackQueueItem = <T>(queue: readonly T[], item: T): T[] => [...queue, item];

export const removeFeedbackQueueItemById = <T extends FeedbackQueueItem>(queue: readonly T[], id: string): T[] =>
	queue.filter((item) => item.id !== id);

export const popFeedbackQueueItem = <T>(queue: readonly T[]): T[] => queue.slice(0, -1);

export const resolveFeedbackQueueAfterHide = <T extends FeedbackQueueItem>(queue: readonly T[], id?: string): T[] =>
	id ? removeFeedbackQueueItemById(queue, id) : popFeedbackQueueItem(queue);

// 输入反馈展示请求，返回组件层可写入的新队列和队列项。
// Receive a feedback show request and return the next queue plus queue item for the component layer.
export const resolveFeedbackQueueShowAction = <
	TOptions extends FeedbackMessageOption,
	TItem extends FeedbackQueueItem = TOptions & FeedbackQueueItem & { visible: boolean }
>({
	id,
	options,
	queue,
	visible = true
}: ResolveFeedbackQueueShowActionOptions<TOptions, TItem>): FeedbackQueueShowAction<TItem> => {
	const props = resolveFeedbackMessageOptions<TOptions>(options);
	const item = { ...props, id, visible } as unknown as TItem;
	return {
		item,
		nextQueue: appendFeedbackQueueItem(queue, item)
	};
};

// 输入反馈隐藏请求，返回组件层可写入的新队列和是否需要更新。
// Receive a feedback hide request and return the next queue plus whether the component layer should update.
export const resolveFeedbackQueueHideAction = <TItem extends FeedbackQueueItem>({
	id,
	queue
}: ResolveFeedbackQueueHideActionOptions<TItem>): FeedbackQueueHideAction<TItem> => ({
	nextQueue: resolveFeedbackQueueAfterHide(queue, id),
	shouldUpdate: Boolean(id) || queue.length > 0
});

export const resolveFeedbackStackOffset = ({ index = 0, baseGap = 60, gap = 8 }: ResolveFeedbackStackStyleOptions = {}) =>
	index * (baseGap + gap);

// 输入反馈队列位置和索引，返回框架无关的堆叠偏移。
// Consume feedback queue position and index, then return framework-agnostic stack offset.
export const resolveFeedbackToastStyleValue = ({
	index = 0,
	position = 'center',
	baseGap = 60,
	gap = 8
}: ResolveFeedbackStackStyleOptions = {}) => {
	const offset = resolveFeedbackStackOffset({ index, baseGap, gap });
	if (position === 'top') return { marginTop: offset };
	if (position === 'bottom') return { marginBottom: offset };
	return {};
};

export const resolveFeedbackAlertStyleValue = ({
	index = 0,
	position = 'top',
	baseGap = 70,
	gap = 8
}: ResolveFeedbackStackStyleOptions = {}) => {
	const offset = resolveFeedbackStackOffset({ index, baseGap, gap });
	if (position === 'bottom') return { marginBottom: offset };
	return { marginTop: offset };
};

export const resolveFeedbackToastStyleString = (options: ResolveFeedbackStackStyleOptions = {}) => {
	const style = resolveFeedbackToastStyleValue(options);
	if ('marginTop' in style) return `margin-top: ${style.marginTop}px`;
	if ('marginBottom' in style) return `margin-bottom: ${style.marginBottom}px`;
	return '';
};

export const resolveFeedbackAlertStyleString = (options: ResolveFeedbackStackStyleOptions = {}) => {
	const style = resolveFeedbackAlertStyleValue(options);
	if ('marginBottom' in style) return `margin-bottom: ${style.marginBottom}px`;
	return `margin-top: ${style.marginTop}px`;
};

// 输入反馈队列项和索引，返回框架无关的 Toast 堆叠 style。
// Receive a feedback queue item and index, then return framework-agnostic Toast stack styles.
export const resolveFeedbackToastItemStyleValue = <TItem extends FeedbackPositionQueueItem>({
	item,
	index = 0,
	baseGap = 60,
	gap = 8
}: ResolveFeedbackQueueItemStyleOptions<TItem>) => resolveFeedbackToastStyleValue({ index, position: item.position, baseGap, gap });

export const resolveFeedbackToastItemStyleString = <TItem extends FeedbackPositionQueueItem>(
	options: ResolveFeedbackQueueItemStyleOptions<TItem>
) => {
	const style = resolveFeedbackToastItemStyleValue(options);
	if ('marginTop' in style) return `margin-top: ${style.marginTop}px`;
	if ('marginBottom' in style) return `margin-bottom: ${style.marginBottom}px`;
	return '';
};

// 输入反馈队列项和索引，返回框架无关的 Alert 堆叠 style。
// Receive a feedback queue item and index, then return framework-agnostic Alert stack styles.
export const resolveFeedbackAlertItemStyleValue = <TItem extends FeedbackPositionQueueItem>({
	item,
	index = 0,
	baseGap = 70,
	gap = 8
}: ResolveFeedbackQueueItemStyleOptions<TItem>) => resolveFeedbackAlertStyleValue({ index, position: item.position, baseGap, gap });

export const resolveFeedbackAlertItemStyleString = <TItem extends FeedbackPositionQueueItem>(
	options: ResolveFeedbackQueueItemStyleOptions<TItem>
) => {
	const style = resolveFeedbackAlertItemStyleValue(options);
	if ('marginBottom' in style) return `margin-bottom: ${style.marginBottom}px`;
	return `margin-top: ${style.marginTop}px`;
};

// 输入 Toast 队列，返回组件层可直接循环渲染的队列项派生。
// Receive a Toast queue and return render-ready queue item derivations for the component layer.
export const resolveFeedbackToastQueueViewItems = <TItem extends FeedbackPositionQueueItem & FeedbackQueueItem>(
	queue: readonly TItem[],
	zIndexBase = 1000
): FeedbackQueueViewItem<TItem>[] =>
	queue.map((item, index) => ({
		index,
		item,
		key: item.id,
		styleString: resolveFeedbackToastItemStyleString({ index, item }),
		styleValue: resolveFeedbackToastItemStyleValue({ index, item }),
		zIndex: zIndexBase + index
	}));

// 输入 Alert 队列，返回组件层可直接循环渲染的队列项派生。
// Receive an Alert queue and return render-ready queue item derivations for the component layer.
export const resolveFeedbackAlertQueueViewItems = <TItem extends FeedbackPositionQueueItem & FeedbackQueueItem>(
	queue: readonly TItem[],
	zIndexBase = 1100
): FeedbackQueueViewItem<TItem>[] =>
	queue.map((item, index) => ({
		index,
		item,
		key: item.id,
		styleString: resolveFeedbackAlertItemStyleString({ index, item }),
		styleValue: resolveFeedbackAlertItemStyleValue({ index, item }),
		zIndex: zIndexBase + index
	}));

// 输入函数式消息参数，返回组件层可直接入队的消息配置。
// Resolve functional message input into queue-ready message options for the component layer.
export const resolveFeedbackMessageOptions = <TOptions extends FeedbackMessageOption>(options: TOptions | string): TOptions =>
	typeof options === 'string' ? ({ message: options } as TOptions) : options;

// 输入快捷方法参数，返回带类型的无副作用消息配置。
// Resolve shortcut arguments into side-effect-free typed message options.
export const resolveFeedbackTypedShortcutOptions = <TOptions extends object, const TType extends string>({
	message,
	type,
	duration,
	options
}: FeedbackTypedShortcutOptions<TOptions, TType>): TOptions & { duration?: number; message: string; type: TType } => {
	const base = duration === undefined ? { message, type } : { message, type, duration };
	return { ...base, ...options } as TOptions & { duration?: number; message: string; type: TType };
};

// 输入反馈弹层结果，返回组件层写入状态和 resolve Promise 的纯动作。
// Receive a feedback overlay result and return the pure action for component state writes and Promise resolution.
export const resolveFeedbackDialogResultAction = <const TResult extends FeedbackDialogResultActionKind>(
	result: TResult
): FeedbackResultAction<TResult> => ({
	nextVisible: false,
	result,
	shouldResolve: true
});

// 输入 Modal 结果，返回组件层写入状态和 resolve Promise 的纯动作。
// Receive a Modal result and return the pure action for component state writes and Promise resolution.
export const resolveFeedbackModalResultAction = <const TResult extends FeedbackModalResultActionKind>(
	result: TResult
): FeedbackResultAction<TResult> => ({
	nextVisible: false,
	result,
	shouldResolve: true
});

const resolveFeedbackTitle = ({
	title,
	fallback,
	emptyTitleFallback = false
}: {
	title?: string;
	fallback: string;
	emptyTitleFallback?: boolean;
}): string => (emptyTitleFallback ? title || fallback : (title ?? fallback));

// 输入函数式 Dialog 参数和语言默认值，返回组件层可直接使用的 Dialog 配置。
// Resolve functional Dialog inputs and locale defaults into Dialog options for the component layer.
export const resolveFeedbackDialogConfirmOptions = ({
	content,
	title,
	defaults,
	emptyTitleFallback = false
}: FeedbackDialogConfirmOptions) => ({
	title: resolveFeedbackTitle({ title, fallback: defaults.title, emptyTitleFallback }),
	content,
	primaryText: defaults.primaryText,
	secondaryText: defaults.secondaryText
});

// 输入函数式 Modal 参数和语言默认值，返回组件层可直接使用的 Modal 配置。
// Resolve functional Modal inputs and locale defaults into Modal options for the component layer.
export const resolveFeedbackModalInfoOptions = ({ content, title, defaults, emptyTitleFallback = false }: FeedbackModalInfoOptions) => ({
	title: resolveFeedbackTitle({ title, fallback: defaults.title, emptyTitleFallback }),
	content,
	btnText: defaults.btnText
});

// 输入 Loading 函数式参数，返回无副作用的 loading props 与 message。
// Resolve functional Loading inputs into side-effect-free loading props and message.
export const resolveFeedbackLoadingState = <TProps extends object>(
	options?: (Partial<TProps> & { message?: string }) | string
): FeedbackLoadingState<TProps> => {
	if (typeof options === 'string') {
		return { props: {}, message: options };
	}
	if (options) {
		const { message, ...props } = options;
		return { props: props as Partial<TProps>, message: message || '' };
	}
	return { props: {}, message: '' };
};

// 输入 Loading 函数式参数，返回组件层可写入的显示动作。
// Receive functional Loading inputs and return a show action for the component layer.
export const resolveFeedbackLoadingShowAction = <TProps extends object>(
	options?: (Partial<TProps> & { message?: string }) | string
): FeedbackLoadingVisibilityAction<TProps> => ({
	...resolveFeedbackLoadingState<TProps>(options),
	nextVisible: true
});

// 输入 Loading 隐藏请求，返回组件层可写入的隐藏动作。
// Receive a Loading hide request and return a hide action for the component layer.
export const resolveFeedbackLoadingHideAction = <TProps extends object>(): FeedbackLoadingVisibilityAction<TProps> => ({
	message: '',
	nextVisible: false,
	props: {}
});

// 输入函数式 Dialog 配置，拆出组件层自己接管的回调字段。
// Split functional Dialog config and remove callback fields owned by the component layer.
export const splitFeedbackDialogCallbacks = <TProps extends FeedbackDialogCallbackProps>(
	dialog?: TProps | null
): SplitFeedbackDialogCallbacksResult<TProps> => {
	if (!dialog) {
		return {
			dialogProps: {} as Omit<TProps, keyof FeedbackDialogCallbackProps>,
			dialogOnPrimary: undefined,
			dialogOnSecondary: undefined,
			dialogOnClose: undefined
		};
	}

	const { onPrimary: dialogOnPrimary, onSecondary: dialogOnSecondary, onClose: dialogOnClose, ...dialogProps } = dialog;
	return {
		dialogProps,
		dialogOnPrimary,
		dialogOnSecondary,
		dialogOnClose
	};
};

// 输入函数式 Modal 配置，拆出组件层自己接管的关闭回调。
// Split functional Modal config and remove the close callback owned by the component layer.
export const splitFeedbackModalCallbacks = <TProps extends FeedbackModalCallbackProps>(
	modal?: TProps | null
): SplitFeedbackModalCallbacksResult<TProps> => {
	if (!modal) {
		return {
			modalProps: {} as Omit<TProps, keyof FeedbackModalCallbackProps>,
			modalOnClose: undefined
		};
	}

	const { onClose: modalOnClose, ...modalProps } = modal;
	return {
		modalProps,
		modalOnClose
	};
};

// 输入 Loading 状态 props，返回框架无关的渲染尺寸。
// Resolve Loading state props into framework-agnostic render sizes.
export const resolveFeedbackLoadingRenderProps = <TProps extends FeedbackLoadingRenderSizeProps>(
	props: TProps,
	defaultSize = '16'
): TProps & { height: string; width: string } => ({
	...props,
	height: props.height || defaultSize,
	width: props.width || defaultSize
});

export const resolveFeedbackLoadingContainerClass = (): string => 'flex h-full flex-col items-center justify-center';

export const resolveFeedbackLoadingMessageClass = (): string => 'mt-3 text-sm text-white dark:text-black';
