import { radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue, resolveRandomBase36Suffix } from './helpers.js';
import type { IconProps, ImageListItemProps, ImageListStatus, LoadingProps } from '../types/index.js';

export const imageListGapObj = {
	'0': 'gap-0',
	'1': 'gap-1',
	'2': 'gap-2',
	'3': 'gap-3',
	'4': 'gap-4'
} as const;

export const imageListColumnsObj = {
	3: 'grid-cols-3',
	4: 'grid-cols-4',
	5: 'grid-cols-5'
} as const;

export type ImageListColumnKey = keyof typeof imageListColumnsObj | number | string;
export type ImageListGapKey = keyof typeof imageListGapObj | string;
export type ImageListRadiusKey = keyof typeof radiusObj | string;

export type ImageListPreviewItemLike = {
	id?: unknown;
	thumbnail?: string;
	url?: string;
	message?: string;
};
export type ImageListItemViewLike = ImageListPreviewItemLike & {
	status?: ImageListStatus;
};

export type ImageListFileLike = {
	size: number;
};
export type ImageListIconLike = { name?: unknown; size?: unknown };
export type ImageListLoadingLike = { height?: unknown; inverse?: unknown; width?: unknown };
export type ImageListDefaultIconProps<TIcon extends ImageListIconLike = Partial<IconProps>> = Omit<TIcon, 'name' | 'size'> & {
	name: string | TIcon['name'];
	size: number | TIcon['size'];
};
export type ImageListDefaultLoadingProps<TLoading extends ImageListLoadingLike = Partial<LoadingProps>> = Omit<
	TLoading,
	'height' | 'inverse' | 'width'
> & {
	height: '8' | TLoading['height'];
	inverse: boolean | TLoading['inverse'];
	width: '8' | TLoading['width'];
};
export type ImageListStatusState = {
	isError: boolean;
	isPending: boolean;
	isSuccess: boolean;
	isUploading: boolean;
	showOverlay: boolean;
	status?: ImageListStatus;
};
export type ImageListStatusTexts = {
	pendingText: string;
	uploadFailedText: string;
};

export type ImageListAspectRatioStyleValue = {
	aspectRatio: string;
};
export type ImageListImageState = {
	alt: string;
	showImage: boolean;
	src: string;
};
export type ImageListItemViewState<TItem extends ImageListItemViewLike = ImageListItemViewLike> = {
	imageState: ImageListImageState;
	index: number;
	item: TItem;
	previewAction: ImageListPreviewAction;
	statusMessage: string;
	statusState: ImageListStatusState;
};

export type ResolveImageListClassesOptions = {
	columns?: ImageListColumnKey;
	gap?: ImageListGapKey;
	radius?: ImageListRadiusKey;
	disabled?: boolean;
	injClass?: string;
	itemInjClass?: string;
};

export type ResolveImageListFileSelectionOptions<TFile extends ImageListFileLike> = {
	files: readonly TFile[];
	currentLength: number;
	max: number;
	maxSize: number;
};
export type ImageListFileSelection<TFile extends ImageListFileLike> = {
	exceeded: boolean;
	filesToAdd: TFile[];
	oversizedFiles: TFile[];
	remainingSlots: number;
	validFiles: TFile[];
};
export type ResolveImageListAddFilesFlowOptions<TFile extends ImageListFileLike> = ResolveImageListMutationActionOptions &
	ResolveImageListFileSelectionOptions<TFile>;
export type ResolveImageListItemIdOptions = {
	timestamp: number;
	random: number;
};
export type ResolveImageListItemFromFileOptions<TFile extends File = File> = {
	file: TFile;
	id: string | number;
	url: string;
};
export type ResolveImageListMutationActionOptions = {
	disabled?: boolean;
	readonly?: boolean;
};
export type ImageListMutationAction = {
	shouldMutate: boolean;
};
export type ResolveImageListAddFilesActionOptions = ResolveImageListMutationActionOptions & {
	filesLength?: number;
};
export type ImageListAddFilesAction = {
	shouldAddFiles: boolean;
};
export type ImageListAddFilesFlow<TFile extends ImageListFileLike> = ImageListFileSelection<TFile> & ImageListAddFilesAction;
export type ResolveImageListPreviewActionOptions = {
	disabled?: boolean;
	previewable?: boolean;
	url?: unknown;
};
export type ImageListPreviewAction = {
	shouldPreview: boolean;
};
export type ResolveImageListPreviewOpenActionOptions<TItem extends ImageListPreviewItemLike = ImageListPreviewItemLike> = {
	itemId: unknown;
	items: readonly TItem[];
	shouldPreview?: boolean;
};
export type ImageListPreviewOpenAction = {
	nextPreviewIndex: number;
	nextPreviewVisible: boolean;
	shouldOpen: boolean;
};
export type ResolveImageListPreviewFlowOptions<TItem extends ImageListPreviewItemLike = ImageListPreviewItemLike> =
	ResolveImageListPreviewActionOptions & {
		itemId: unknown;
		items: readonly TItem[];
	};
export type ImageListPreviewFlow = ImageListPreviewAction &
	ImageListPreviewOpenAction & {
		shouldEmitPreview: boolean;
	};
export type ImageListPreviewCloseAction = {
	nextPreviewVisible: false;
	shouldClose: true;
};
export type ResolveImageListPreviewKeyboardActionOptions = ResolveImageListPreviewActionOptions & {
	key: string;
};
export type ImageListPreviewKeyboardAction = {
	shouldPreview: boolean;
	shouldPreventDefault: boolean;
};
export type ResolveImageListPreviewKeyboardFlowOptions<TItem extends ImageListPreviewItemLike = ImageListPreviewItemLike> =
	ResolveImageListPreviewKeyboardActionOptions & {
		itemId: unknown;
		items: readonly TItem[];
	};
export type ImageListPreviewKeyboardFlow = ImageListPreviewKeyboardAction &
	ImageListPreviewOpenAction & {
		shouldEmitPreview: boolean;
	};
export type ResolveImageListRevokeUrlActionOptions = {
	file?: unknown;
	url?: unknown;
};
export type ImageListRevokeUrlAction = {
	shouldRevokeUrl: boolean;
};
export type ResolveImageListDeleteFlowOptions<
	TItem extends ImageListPreviewItemLike & { file?: unknown } = ImageListPreviewItemLike & { file?: unknown }
> = ResolveImageListMutationActionOptions & {
	index: number;
	item: TItem;
	items: readonly TItem[];
};
export type ImageListDeleteFlow<
	TItem extends ImageListPreviewItemLike & { file?: unknown } = ImageListPreviewItemLike & { file?: unknown }
> = {
	nextItems: TItem[];
	shouldDelete: boolean;
	shouldEmitDelete: boolean;
	shouldMutate: boolean;
	shouldRevokeUrl: boolean;
};
export type ResolveImageListItemViewStateListOptions<TItem extends ImageListItemViewLike = ImageListItemViewLike> = ImageListStatusTexts & {
	disabled?: boolean;
	fallbackAlt?: string;
	items?: readonly TItem[];
	previewable?: boolean;
	useItemIdAsFallbackAlt?: boolean;
};
export type ResolveImageListDerivedOptions<
	TItem extends ImageListItemViewLike = ImageListItemViewLike,
	TIcon extends ImageListIconLike = Partial<IconProps>,
	TDeleteIcon extends ImageListIconLike = Partial<IconProps>,
	TLoading extends ImageListLoadingLike = Partial<LoadingProps>
> = ResolveImageListClassesOptions &
	Partial<ImageListStatusTexts> & {
		aspectRatio?: readonly [number, number];
		deleteIcon?: TDeleteIcon;
		fallbackAlt?: string;
		icon?: TIcon;
		items?: readonly TItem[];
		loading?: TLoading;
		max?: number;
		previewable?: boolean;
		readonly?: boolean;
		useItemIdAsFallbackAlt?: boolean;
	};
export type ImageListDerived<
	TItem extends ImageListItemViewLike = ImageListItemViewLike,
	TIcon extends ImageListIconLike = Partial<IconProps>,
	TDeleteIcon extends ImageListIconLike = Partial<IconProps>,
	TLoading extends ImageListLoadingLike = Partial<LoadingProps>
> = {
	aspectRatioStyleString: string;
	aspectRatioStyleValue: ImageListAspectRatioStyleValue;
	deleteButtonClass: string;
	imageClass: string;
	itemClass: string;
	itemViewStates: ImageListItemViewState<TItem>[];
	mergedDeleteIcon: ImageListDefaultIconProps<TDeleteIcon>;
	mergedIcon: ImageListDefaultIconProps<TIcon>;
	mergedLoading: ImageListDefaultLoadingProps<TLoading>;
	pendingMessageClass: string;
	previewButtonClass: string;
	previewContainerClass: string;
	previewImages: Array<{ alt: string; url: string }>;
	retryButtonClass: string;
	retryIconClass: string;
	retryMessageClass: string;
	rootClass: string;
	showUploadButton: boolean;
	statusOverlayClass: string;
	uploadClass: string;
	uploadTextClass: string;
};

// 输入 ImageList 组件状态，返回框架无关的 class 字符串和纯状态分支。
// Convert ImageList component state into framework-agnostic class strings and pure state branches.
export const resolveImageListColumnsClass = (columns: ImageListColumnKey = 4) => resolveClassMapValue(imageListColumnsObj, columns, 4);

// 输入外部 ImageList 项，返回组件内部可写入的项数组。
// Normalize external ImageList items into an internal writable item array.
export const resolveImageListInitialItems = <TItem>(items?: readonly TItem[] | null): TItem[] => [...(items ?? [])];

// 输入外部上传文案，返回组件可直接渲染的上传文案。
// Normalize external upload text into render-ready upload text.
export const resolveImageListUploadText = (text?: string | null): string => text ?? '';

export const resolveImageListGapClass = (gap: ImageListGapKey = '2') => resolveClassMapValue(imageListGapObj, gap, '2');

export const resolveImageListRadiusClass = (radius: ImageListRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] || '' : 'rounded-(--radius-btn)';

export const resolveImageListRootClass = (options: Pick<ResolveImageListClassesOptions, 'columns' | 'gap' | 'injClass'> = {}) =>
	joinClasses(['grid', resolveImageListColumnsClass(options.columns), resolveImageListGapClass(options.gap), options.injClass]);

export const resolveImageListItemClass = (options: Pick<ResolveImageListClassesOptions, 'radius' | 'itemInjClass'> = {}) =>
	joinClasses(['relative overflow-hidden', resolveImageListRadiusClass(options.radius), options.itemInjClass]);

export const resolveImageListUploadClass = (options: Pick<ResolveImageListClassesOptions, 'radius' | 'disabled'> = {}) =>
	joinClasses([
		'flex flex-col items-center justify-center bg-black/5 dark:bg-white/5',
		resolveImageListRadiusClass(options.radius),
		options.disabled ? 'cursor-not-allowed opacity-50' : 'active:bg-black/10 dark:active:bg-white/10'
	]);

export const resolveImageListImageClass = (): string => 'h-full w-full object-cover';

export const resolveImageListPreviewButtonClass = (): string => 'h-full w-full';

export const resolveImageListPreviewContainerClass = (): string => 'relative h-full w-full';

export const resolveImageListStatusOverlayClass = (): string =>
	'absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-xs text-white';

export const resolveImageListDeleteButtonClass = (): string =>
	'absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white';

export const resolveImageListRetryButtonClass = (): string => 'flex flex-col items-center text-white';

export const resolveImageListRetryIconClass = (): string => '';

export const resolveImageListRetryMessageClass = (): string => 'mt-1 text-xs';

export const resolveImageListPendingMessageClass = (): string => 'text-xs text-white';

export const resolveImageListUploadTextClass = (): string => 'mt-1 text-xs text-black/50 dark:text-white/50';

export const resolveImageListAspectRatioValue = (aspectRatio: readonly [number, number] = [1, 1]) =>
	`${aspectRatio[0]} / ${aspectRatio[1]}`;

// 输入 ImageList 宽高比配置，返回组件层可直接绑定的比例样式。
// Resolve ImageList aspect-ratio config into a style object that components can bind directly.
export const resolveImageListAspectRatioStyleValue = (aspectRatio: readonly [number, number] = [1, 1]): ImageListAspectRatioStyleValue => ({
	aspectRatio: resolveImageListAspectRatioValue(aspectRatio)
});

export const resolveImageListAspectRatioStyleString = (aspectRatio: readonly [number, number] = [1, 1]) => {
	const style = resolveImageListAspectRatioStyleValue(aspectRatio);
	return `aspect-ratio: ${style.aspectRatio};`;
};

export const resolveImageListShowUploadButton = ({
	readonly = false,
	valueLength = 0,
	max = 9
}: {
	readonly?: boolean;
	valueLength?: number;
	max?: number;
}) => !readonly && valueLength < max;

export const resolveImageListCanMutate = ({ disabled = false, readonly = false }: { disabled?: boolean; readonly?: boolean }) =>
	!disabled && !readonly;

// 输入 ImageList 可变更状态，返回框架无关的变更动作结果。
// Convert ImageList mutation state into a framework-agnostic mutation action result.
export const resolveImageListMutationAction = (options: ResolveImageListMutationActionOptions = {}): ImageListMutationAction => ({
	shouldMutate: resolveImageListCanMutate(options)
});

// 输入 ImageList 文件添加状态，返回框架无关的添加动作结果。
// Convert ImageList add-files state into a framework-agnostic add action result.
export const resolveImageListAddFilesAction = ({
	filesLength = 0,
	...options
}: ResolveImageListAddFilesActionOptions = {}): ImageListAddFilesAction => ({
	shouldAddFiles: resolveImageListCanMutate(options) && filesLength > 0
});

// 输入 ImageList 预览状态，返回框架无关的预览动作结果。
// Convert ImageList preview state into a framework-agnostic preview action result.
export const resolveImageListPreviewAction = ({
	disabled = false,
	previewable = true,
	url
}: ResolveImageListPreviewActionOptions = {}): ImageListPreviewAction => ({
	shouldPreview: !disabled && previewable && Boolean(url)
});

// 输入 ImageList 预览键盘状态，返回框架无关的键盘动作结果。
// Convert ImageList preview keyboard state into a framework-agnostic keyboard action result.
export const resolveImageListPreviewKeyboardAction = ({
	key,
	...options
}: ResolveImageListPreviewKeyboardActionOptions): ImageListPreviewKeyboardAction => {
	const isActivationKey = key === 'Enter' || key === ' ';
	const previewAction = resolveImageListPreviewAction(options);
	const shouldPreview = isActivationKey && previewAction.shouldPreview;
	return {
		shouldPreview,
		shouldPreventDefault: shouldPreview
	};
};

// 输入 ImageList 项的 URL 状态，返回框架无关的释放动作结果，真实 URL API 调用保留在组件层。
// Convert ImageList item URL state into a framework-agnostic revoke action result; the actual URL API call stays in the component.
export const resolveImageListRevokeUrlAction = ({ file, url }: ResolveImageListRevokeUrlActionOptions = {}): ImageListRevokeUrlAction => ({
	shouldRevokeUrl: Boolean(url && file)
});

export const resolveImageListPreviewImages = <TItem extends ImageListPreviewItemLike>(items: readonly TItem[], emptyAlt = '') =>
	items.filter((item) => item.url).map((item) => ({ url: item.url || '', alt: item.message || emptyAlt }));

export const resolveImageListPreviewIndex = <TItem extends ImageListPreviewItemLike>(items: readonly TItem[], targetId: unknown) =>
	Math.max(
		items.filter((item) => item.url).findIndex((item) => item.id === targetId),
		0
	);

export const resolveImageListPreviewCurrent = (current: number): number => Math.max(current, 0);

// 输入预览请求和图片项列表，返回组件层可写入的预览打开状态。
// Receive a preview request and image items, then return preview-open state for the component layer.
export const resolveImageListPreviewOpenAction = <TItem extends ImageListPreviewItemLike>({
	items,
	itemId,
	shouldPreview = true
}: ResolveImageListPreviewOpenActionOptions<TItem>): ImageListPreviewOpenAction => ({
	nextPreviewIndex: shouldPreview ? resolveImageListPreviewIndex(items, itemId) : 0,
	nextPreviewVisible: shouldPreview,
	shouldOpen: shouldPreview
});

// 输入预览请求、图片项列表和交互状态，返回组件层可直接消费的完整预览流程。
// Receive preview request, image items and interaction state, then return a complete preview flow for component consumption.
export const resolveImageListPreviewFlow = <TItem extends ImageListPreviewItemLike>({
	items,
	itemId,
	...options
}: ResolveImageListPreviewFlowOptions<TItem>): ImageListPreviewFlow => {
	const previewAction = resolveImageListPreviewAction(options);
	const openAction = resolveImageListPreviewOpenAction({ items, itemId, shouldPreview: previewAction.shouldPreview });
	return {
		...previewAction,
		...openAction,
		shouldEmitPreview: openAction.shouldOpen
	};
};

// 输入键盘状态和预览上下文，返回框架无关的预览键盘流程。
// Receive keyboard state and preview context, then return a framework-agnostic preview keyboard flow.
export const resolveImageListPreviewKeyboardFlow = <TItem extends ImageListPreviewItemLike>({
	items,
	itemId,
	key,
	...options
}: ResolveImageListPreviewKeyboardFlowOptions<TItem>): ImageListPreviewKeyboardFlow => {
	const keyboardAction = resolveImageListPreviewKeyboardAction({ key, ...options });
	const openAction = resolveImageListPreviewOpenAction({ items, itemId, shouldPreview: keyboardAction.shouldPreview });
	return {
		...keyboardAction,
		...openAction,
		shouldEmitPreview: openAction.shouldOpen
	};
};

// 输入预览关闭请求，返回组件层可写入的预览关闭状态。
// Receive a preview close request and return preview-close state for the component layer.
export const resolveImageListPreviewCloseAction = (): ImageListPreviewCloseAction => ({
	nextPreviewVisible: false,
	shouldClose: true
});

// 输入图片项和兜底文案，返回组件层可绑定的图片字段。
// Resolve an image item and fallback copy into image fields for component binding.
export const resolveImageListImageState = <TItem extends ImageListPreviewItemLike>(item: TItem, fallbackAlt = '') => ({
	showImage: Boolean(item.url),
	src: item.thumbnail || item.url || '',
	alt: item.message || fallbackAlt
});

// 输入组件层读取到的时间和随机数，返回框架无关的临时项 id。
// Receive component-provided time and random value, then return a framework-agnostic temporary item id.
export const resolveImageListItemId = ({ timestamp, random }: ResolveImageListItemIdOptions): string =>
	`${timestamp}-${resolveRandomBase36Suffix({ random, end: 9 })}`;

// 输入组件层创建的 URL 和文件对象，返回框架无关的上传项。
// Receive a component-created URL and file object, then return a framework-agnostic upload item.
export const resolveImageListItemFromFile = <TFile extends File = File>({
	id,
	file,
	url
}: ResolveImageListItemFromFileOptions<TFile>): ImageListItemProps => ({
	id,
	file,
	url,
	status: 'pending'
});

export const resolveImageListDefaultIconProps = <TIcon extends ImageListIconLike = Partial<IconProps>>(
	icon: TIcon = {} as TIcon
): ImageListDefaultIconProps<TIcon> =>
	({
		name: 'ri-add-line',
		size: 28,
		...icon
	}) as ImageListDefaultIconProps<TIcon>;

export const resolveImageListDefaultDeleteIconProps = <TIcon extends ImageListIconLike = Partial<IconProps>>(
	deleteIcon: TIcon = {} as TIcon
): ImageListDefaultIconProps<TIcon> =>
	({
		name: 'ri-close-line',
		size: 14,
		...deleteIcon
	}) as ImageListDefaultIconProps<TIcon>;

export const resolveImageListDefaultLoadingProps = <TLoading extends ImageListLoadingLike = Partial<LoadingProps>>(
	loading: TLoading = {} as TLoading
): ImageListDefaultLoadingProps<TLoading> =>
	({
		height: '8',
		width: '8',
		inverse: true,
		...loading
	}) as ImageListDefaultLoadingProps<TLoading>;

// 输入图片项状态，返回组件层可直接渲染的状态分支。
// Resolve image item status into render-ready state branches for the component layer.
export const resolveImageListStatusState = (status?: ImageListStatus): ImageListStatusState => ({
	status,
	isError: status === 'error',
	isPending: status === 'pending',
	isSuccess: status === 'success',
	isUploading: status === 'uploading',
	showOverlay: Boolean(status && status !== 'success')
});

// 输入上传项状态和语言文案，返回框架无关的状态提示。
// Resolve upload item state and locale copy into a framework-agnostic status message.
export const resolveImageListStatusMessage = ({
	message = '',
	status,
	pendingText,
	uploadFailedText
}: {
	message?: string;
	status?: ImageListStatus;
} & ImageListStatusTexts): string => {
	if (message) return message;
	if (status === 'error') return uploadFailedText;
	if (status === 'pending') return pendingText;
	return '';
};

// 输入图片项列表和组件状态，返回组件层可直接渲染的框架无关视图列表。
// Receive image items and component state, then return a framework-agnostic view list for component rendering.
export const resolveImageListItemViewStateList = <TItem extends ImageListItemViewLike = ImageListItemViewLike>({
	disabled = false,
	fallbackAlt = '',
	items = [],
	pendingText,
	previewable = true,
	uploadFailedText,
	useItemIdAsFallbackAlt = false
}: ResolveImageListItemViewStateListOptions<TItem>): ImageListItemViewState<TItem>[] =>
	items.map((item, index) => {
		const itemFallbackAlt = useItemIdAsFallbackAlt ? String(item.id) : fallbackAlt;
		return {
			imageState: resolveImageListImageState(item, itemFallbackAlt),
			index,
			item,
			previewAction: resolveImageListPreviewAction({ disabled, previewable, url: item.url }),
			statusMessage: resolveImageListStatusMessage({
				message: item.message,
				status: item.status,
				pendingText,
				uploadFailedText
			}),
			statusState: resolveImageListStatusState(item.status)
		};
	});

export const appendImageListItems = <TItem>(items: readonly TItem[], nextItems: readonly TItem[]): TItem[] => [...items, ...nextItems];

export const removeImageListItemAt = <TItem>(items: readonly TItem[], index: number): TItem[] =>
	items.filter((_, itemIndex) => itemIndex !== index);

// 输入删除请求、当前项列表和组件状态，返回下一份列表与副作用意图，真实 URL 释放和事件派发保留在组件层。
// Receive delete request, current items and component state, then return next items plus side-effect intent; actual URL revoke and emits stay in the component.
export const resolveImageListDeleteFlow = <TItem extends ImageListPreviewItemLike & { file?: unknown }>({
	disabled = false,
	readonly = false,
	index,
	item,
	items
}: ResolveImageListDeleteFlowOptions<TItem>): ImageListDeleteFlow<TItem> => {
	const mutationAction = resolveImageListMutationAction({ disabled, readonly });
	const shouldDelete = mutationAction.shouldMutate;
	const revokeAction = resolveImageListRevokeUrlAction({ url: item.url, file: item.file });
	return {
		nextItems: shouldDelete ? removeImageListItemAt(items, index) : [...items],
		shouldDelete,
		shouldEmitDelete: shouldDelete,
		shouldMutate: mutationAction.shouldMutate,
		shouldRevokeUrl: shouldDelete && revokeAction.shouldRevokeUrl
	};
};

// 文件筛选只处理数量和大小判断，URL 创建与事件派发留在组件层。
// File selection only handles count and size checks; URL creation and event emits stay in component layers.
export const resolveImageListFileSelection = <TFile extends ImageListFileLike>({
	files,
	currentLength,
	max,
	maxSize
}: ResolveImageListFileSelectionOptions<TFile>): ImageListFileSelection<TFile> => {
	const remainingSlots = max - currentLength;
	const exceeded = files.length > remainingSlots;
	const filesToAdd = exceeded ? files.slice(0, remainingSlots) : [...files];
	const oversizedFiles = filesToAdd.filter((file) => file.size / 1024 / 1024 > maxSize);
	const validFiles = filesToAdd.filter((file) => file.size / 1024 / 1024 <= maxSize);

	return {
		remainingSlots,
		exceeded,
		filesToAdd,
		validFiles,
		oversizedFiles
	};
};

// 输入文件添加请求和当前组件状态，返回文件筛选结果与是否继续添加的纯流程。
// Receive an add-files request and current component state, then return file selection plus whether adding should continue.
export const resolveImageListAddFilesFlow = <TFile extends ImageListFileLike>({
	disabled = false,
	readonly = false,
	files,
	currentLength,
	max,
	maxSize
}: ResolveImageListAddFilesFlowOptions<TFile>): ImageListAddFilesFlow<TFile> => {
	const action = resolveImageListAddFilesAction({ disabled, readonly, filesLength: files.length });
	const selection = resolveImageListFileSelection({ files, currentLength, max, maxSize });
	return {
		...selection,
		...action
	};
};

// 输入 ImageList props 和语言文案，返回框架无关的渲染派生结果。
// Receive ImageList props and locale copy, then return framework-agnostic render derivations.
export const resolveImageListDerived = <
	TItem extends ImageListItemViewLike = ImageListItemViewLike,
	TIcon extends ImageListIconLike = Partial<IconProps>,
	TDeleteIcon extends ImageListIconLike = Partial<IconProps>,
	TLoading extends ImageListLoadingLike = Partial<LoadingProps>
>({
	aspectRatio = [1, 1],
	columns = 4,
	deleteIcon = {} as TDeleteIcon,
	disabled = false,
	fallbackAlt = '',
	gap = '2',
	icon = {} as TIcon,
	injClass = '',
	itemInjClass = '',
	items = [],
	loading = {} as TLoading,
	max = 9,
	pendingText = '',
	previewable = true,
	radius = '',
	readonly = false,
	uploadFailedText = '',
	useItemIdAsFallbackAlt = false
}: ResolveImageListDerivedOptions<TItem, TIcon, TDeleteIcon, TLoading> = {}): ImageListDerived<TItem, TIcon, TDeleteIcon, TLoading> => ({
	aspectRatioStyleString: resolveImageListAspectRatioStyleString(aspectRatio),
	aspectRatioStyleValue: resolveImageListAspectRatioStyleValue(aspectRatio),
	deleteButtonClass: resolveImageListDeleteButtonClass(),
	imageClass: resolveImageListImageClass(),
	itemClass: resolveImageListItemClass({ radius, itemInjClass }),
	itemViewStates: resolveImageListItemViewStateList({
		items,
		previewable,
		disabled,
		fallbackAlt,
		useItemIdAsFallbackAlt,
		pendingText,
		uploadFailedText
	}),
	mergedDeleteIcon: resolveImageListDefaultDeleteIconProps(deleteIcon),
	mergedIcon: resolveImageListDefaultIconProps(icon),
	mergedLoading: resolveImageListDefaultLoadingProps(loading),
	pendingMessageClass: resolveImageListPendingMessageClass(),
	previewButtonClass: resolveImageListPreviewButtonClass(),
	previewContainerClass: resolveImageListPreviewContainerClass(),
	previewImages: resolveImageListPreviewImages(items, fallbackAlt),
	retryButtonClass: resolveImageListRetryButtonClass(),
	retryIconClass: resolveImageListRetryIconClass(),
	retryMessageClass: resolveImageListRetryMessageClass(),
	rootClass: resolveImageListRootClass({ columns, gap, injClass }),
	showUploadButton: resolveImageListShowUploadButton({ readonly, valueLength: items.length, max }),
	statusOverlayClass: resolveImageListStatusOverlayClass(),
	uploadClass: resolveImageListUploadClass({ radius, disabled }),
	uploadTextClass: resolveImageListUploadTextClass()
});
