import { joinClasses } from './helpers.js';

export const imagePreviewClosePositionClass = {
	tl: 'top-4 left-4',
	tr: 'top-4 right-4',
	bl: 'bottom-4 left-4',
	br: 'bottom-4 right-4'
} as const;

export type ImagePreviewDerivedClosePosition = keyof typeof imagePreviewClosePositionClass;
export type ImagePreviewRotationValue = 0 | 90 | 180 | 270;
export type ImagePreviewItemLike = {
	url: string;
	alt?: string;
	[key: string]: unknown;
};

export type ImagePreviewPointLike = {
	clientX: number;
	clientY: number;
};

export type ImagePreviewSlideStyleValue = {
	transform: string;
	transitionDuration: string;
};

export type ImagePreviewImageStyleValue = {
	transform: string;
	transition: string;
};

export type ImagePreviewOverlayStyleValue = {
	zIndex: number;
};

export type ImagePreviewDurationParams = {
	duration: number;
};

export type ImagePreviewScaleParams = ImagePreviewDurationParams & {
	delay: number;
};

export type ImagePreviewSwipeDirection = 'prev' | 'next' | 'none';
export type ImagePreviewLoadStatus = 'loading' | 'loaded' | 'error' | string | undefined;

export type ResolveImagePreviewNextIndexOptions = {
	currentIndex: number;
	loop?: boolean;
	requestedIndex: number;
	total: number;
};

export type ResolveImagePreviewSlideStyleOptions = {
	currentIndex: number;
	isSwiping?: boolean;
	swipeDuration?: number;
	swipeOffset?: number;
};

export type ResolveImagePreviewImageStyleOptions = {
	currentIndex: number;
	currentScale?: number;
	index: number;
	isMoving?: boolean;
	isPinching?: boolean;
	isResettingRotation?: boolean;
	rotation?: number;
	translateX?: number;
	translateY?: number;
};

export type ResolveImagePreviewSwipeDirectionOptions = {
	swipeOffset: number;
	thresholdRatio?: number;
	viewportWidth: number;
};

export type ResolveImagePreviewPointerDownStateOptions = {
	currentScale: number;
	pointers: readonly ImagePreviewPointLike[];
};

export type ImagePreviewPointerDownState = {
	hasMoved: boolean;
	isMoving: boolean;
	isPinching: boolean;
	isSwiping: boolean;
	pinchStartDistance?: number;
	pinchStartScale?: number;
	startX?: number;
	startY?: number;
	swipeOffset?: number;
	swipeStartX?: number;
};

export type ResolveImagePreviewPointerMoveStateOptions = {
	currentScale: number;
	isMoving?: boolean;
	isPinching?: boolean;
	isSwiping?: boolean;
	maxScale?: number;
	minScale?: number;
	pinchStartDistance: number;
	pinchStartScale: number;
	pointers: readonly ImagePreviewPointLike[];
	point: ImagePreviewPointLike;
	startX: number;
	startY: number;
	swipeStartX: number;
};

export type ImagePreviewPointerMoveState = {
	hasMoved: boolean;
	nextScale?: number;
	nextStartX?: number;
	nextStartY?: number;
	preventDefault: boolean;
	swipeOffset?: number;
	translateDeltaX?: number;
	translateDeltaY?: number;
};

export type ResolveImagePreviewPointerUpStateOptions = {
	currentScale: number;
	hasMoved?: boolean;
	isSwiping?: boolean;
	maskClosable?: boolean;
	pointers: readonly ImagePreviewPointLike[];
	swipeOffset: number;
	viewportWidth: number;
};

export type ImagePreviewPointerUpState = {
	isMoving?: boolean;
	isPinching?: boolean;
	isSwiping?: boolean;
	resetSwipeOffset?: boolean;
	shouldClose?: boolean;
	shouldResetScale?: boolean;
	startX?: number;
	startY?: number;
	swipeDirection?: ImagePreviewSwipeDirection;
	swipeStartX?: number;
};

export type ImagePreviewPointerUpActionKind = 'continueTracking' | 'settled' | 'ignored';
export type ImagePreviewPointerUpAction = {
	kind: ImagePreviewPointerUpActionKind;
	pointerFlags: ImagePreviewPointerFlags;
	shouldClose: boolean;
	shouldResetScale: boolean;
	shouldResetSwipeOffset: boolean;
	shouldSwitchNext: boolean;
	shouldSwitchPrev: boolean;
	startX?: number;
	startY?: number;
	swipeStartX?: number;
};
export type ResolveImagePreviewPointerUpActionOptions = {
	pointerCount: number;
	pointerState: ImagePreviewPointerUpState;
};

export type ImagePreviewPointerFlags = {
	isMoving: boolean;
	isPinching: boolean;
	isSwiping: boolean;
};

export type ResolveImagePreviewRenderedStateOptions = {
	visible?: boolean;
	outDuration?: number;
	currentRendered?: boolean;
};
export type ResolveImagePreviewBodyOverflowStyleOptions = {
	visible?: boolean;
};
export type ImagePreviewTransformResetAction = {
	currentScale: number;
	translateX: number;
	translateY: number;
};
export type ImagePreviewVisibleResetAction = ImagePreviewTransformResetAction & {
	pointerFlags: ImagePreviewPointerFlags;
	swipeOffset: 0;
};
export type ResolveImagePreviewRotationAnimationActionOptions = {
	phase: 'start' | 'end';
};
export type ImagePreviewRotationAnimationAction = {
	nextIsResettingRotation: boolean;
};
export type ImagePreviewOutroEndAction = {
	nextRendered: false;
};
export type ResolveImagePreviewCloseActionOptions = {
	visible?: boolean;
};
export type ImagePreviewCloseAction = ImagePreviewTransformResetAction & {
	nextVisible: boolean;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};
export type ResolveImagePreviewSwitchActionOptions = ResolveImagePreviewNextIndexOptions;
export type ImagePreviewSwitchAction = ImagePreviewTransformResetAction & {
	nextIndex: number;
	shouldChange: boolean;
};
export type ResolveImagePreviewLoadStatusActionOptions<TStatus extends ImagePreviewLoadStatus = ImagePreviewLoadStatus> = {
	index: number;
	loadStatus: Record<number, TStatus>;
	status: TStatus;
};
export type ImagePreviewLoadStatusAction<TStatus extends ImagePreviewLoadStatus = ImagePreviewLoadStatus> = {
	nextLoadStatus: Record<number, TStatus>;
};
export type ResolveImagePreviewRotateActionOptions = {
	currentIndex: number;
	rotationStatus: Record<number, number>;
};
export type ImagePreviewRotateAction = {
	nextRotation: number;
	nextRotationStatus: Record<number, number>;
	normalizedRotation: ImagePreviewRotationValue;
	resetIndex: number;
	resetRotation: number;
	shouldResetRotation: boolean;
};
export type ResolveImagePreviewRotationResetActionOptions = {
	index: number;
	rotationStatus: Record<number, number>;
};
export type ImagePreviewRotationResetAction = {
	nextRotationStatus: Record<number, number>;
};
export type ResolveImagePreviewItemDisplayStateOptions = {
	hasErrorContent?: boolean;
	hasLoadingContent?: boolean;
	status?: ImagePreviewLoadStatus;
};
export type ImagePreviewItemDisplayState = {
	showCustomError: boolean;
	showCustomLoading: boolean;
	showDefaultError: boolean;
	showDefaultLoading: boolean;
	showError: boolean;
	showImage: boolean;
	showLoading: boolean;
};
export type ResolveImagePreviewItemDisplayStateListOptions<TItem extends ImagePreviewItemLike = ImagePreviewItemLike> = {
	hasErrorContent?: boolean;
	hasLoadingContent?: boolean;
	items?: readonly TItem[];
	loadStatus?: Record<number, ImagePreviewLoadStatus>;
};
export type ImagePreviewItemDisplayStateItem<TItem extends ImagePreviewItemLike = ImagePreviewItemLike> = {
	displayState: ImagePreviewItemDisplayState;
	index: number;
	item: TItem;
};
export type ResolveImagePreviewControlStateOptions = {
	currentIndex?: number;
	loop?: boolean;
	navigationPosition?: 'center' | 'bottom' | string;
	showIndex?: boolean;
	showNavigation?: boolean;
	total?: number;
};
export type ImagePreviewControlState = {
	showBottomBar: boolean;
	showBottomNext: boolean;
	showBottomPrev: boolean;
	showCenterNavigation: boolean;
	showCenterNext: boolean;
	showCenterPrev: boolean;
	showIndex: boolean;
};
export type ResolveImagePreviewDerivedOptions<
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
> = {
	closeIconDefaults?: TIcon;
	closePosition?: ImagePreviewDerivedClosePosition | string;
	currentIndex?: number;
	currentScale?: number;
	duration?: number;
	errorContentVisible?: boolean;
	icon?: TIcon;
	images?: readonly (string | TItem)[];
	isMoving?: boolean;
	isPinching?: boolean;
	isResettingRotation?: boolean;
	isSwiping?: boolean;
	loadStatus?: Record<number, ImagePreviewLoadStatus>;
	loadingContentVisible?: boolean;
	loop?: boolean;
	navigationPosition?: 'center' | 'bottom' | string;
	outDuration?: number;
	rotationIcon?: TRotationIcon;
	rotationIconDefaults?: TRotationIcon;
	rotationStatus?: Record<number, number>;
	showIndex?: boolean;
	showNavigation?: boolean;
	swipeDuration?: number;
	swipeOffset?: number;
	translateX?: number;
	translateY?: number;
	zIndex?: number;
};
export type ImagePreviewStatePropsLike<
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
> = Partial<
	Omit<
		ResolveImagePreviewDerivedOptions<TItem, TIcon, TRotationIcon>,
		| 'currentIndex'
		| 'currentScale'
		| 'errorContentVisible'
		| 'isMoving'
		| 'isPinching'
		| 'isResettingRotation'
		| 'isSwiping'
		| 'loadStatus'
		| 'loadingContentVisible'
		| 'rotationStatus'
		| 'swipeOffset'
		| 'translateX'
		| 'translateY'
	>
>;
export type ResolveImagePreviewStateOptionsParams<
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
> = {
	currentIndex?: number;
	currentScale?: number;
	errorContentVisible?: boolean;
	isMoving?: boolean;
	isPinching?: boolean;
	isResettingRotation?: boolean;
	isSwiping?: boolean;
	loadStatus?: Record<number, ImagePreviewLoadStatus>;
	loadingContentVisible?: boolean;
	props: ImagePreviewStatePropsLike<TItem, TIcon, TRotationIcon>;
	rotationStatus?: Record<number, number>;
	swipeOffset?: number;
	translateX?: number;
	translateY?: number;
};
export type ImagePreviewDisplayItemDerived<TItem extends ImagePreviewItemLike = ImagePreviewItemLike> =
	ImagePreviewItemDisplayStateItem<TItem> & {
		alt: string;
		imageStyleString: string;
		imageStyleValue: ImagePreviewImageStyleValue;
		rotation: number;
	};
export type ImagePreviewDotItemDerived = {
	className: string;
	index: number;
};
export type ImagePreviewDerived<
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
> = {
	bottomBarClass: string;
	centerNextButtonClass: string;
	centerPrevButtonClass: string;
	containerClass: string;
	controlButtonClass: string;
	controlPanelClass: string;
	controlScaleParams: ImagePreviewScaleParams;
	controlState: ImagePreviewControlState;
	customContentClass: string;
	currentImage: TItem;
	currentRotation: number;
	dotListClass: string;
	dotItems: ImagePreviewDotItemDerived[];
	errorClass: string;
	errorIconClass: string;
	errorTextClass: string;
	imageClass: string;
	imageDisplayItems: ImagePreviewDisplayItemDerived<TItem>[];
	inParams: ImagePreviewDurationParams;
	indexNumberClass: string;
	itemClass: string;
	loadingClass: string;
	mergedIcon: TIcon;
	mergedRotationIcon: TRotationIcon;
	normalizedImages: TItem[];
	outParams: ImagePreviewDurationParams;
	overlayClass: string;
	overlayStyleString: string;
	overlayStyleValue: ImagePreviewOverlayStyleValue;
	slideClass: string;
	slideStyleString: string;
	slideStyleValue: ImagePreviewSlideStyleValue;
	total: number;
};

// 输入 ImagePreview 状态，返回框架无关的数据和 transform 派生。
// Resolve ImagePreview state into framework-agnostic data and transform derivations.
export const resolveImagePreviewClosePositionClass = (closePosition: ImagePreviewDerivedClosePosition | string = 'tr') =>
	imagePreviewClosePositionClass[closePosition as ImagePreviewDerivedClosePosition] || imagePreviewClosePositionClass.tr;

// 输入 ImagePreview 关闭按钮位置，返回框架无关的控制按钮容器 class。
// Receive the ImagePreview close position and return a framework-agnostic control panel class.
export const resolveImagePreviewControlPanelClass = (closePosition: ImagePreviewDerivedClosePosition | string = 'tr'): string =>
	joinClasses(['absolute', resolveImagePreviewClosePositionClass(closePosition), 'flex gap-2']);

export const resolveImagePreviewControlButtonClass = (): string => 'rounded-full bg-black/30 p-2 text-white active:bg-black/50';

export const resolveImagePreviewCenterPrevButtonClass = (): string =>
	joinClasses(['absolute left-4 top-1/2 -translate-y-1/2', resolveImagePreviewControlButtonClass()]);

export const resolveImagePreviewCenterNextButtonClass = (): string =>
	joinClasses(['absolute right-4 top-1/2 -translate-y-1/2', resolveImagePreviewControlButtonClass()]);

export const resolveImagePreviewBottomBarClass = (): string =>
	'absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-4';

export const resolveImagePreviewIndexNumberClass = (): string => 'rounded-full bg-black/30 px-3 py-1 text-sm text-white';

// 输入 ImagePreview 结构状态，返回组件实现可复用的框架无关 class。
// Receive ImagePreview structure state and return framework-agnostic classes for component implementations.
export const resolveImagePreviewOverlayClass = (): string => 'fixed inset-0 flex items-center justify-center';

export const resolveImagePreviewContainerClass = (): string => 'relative h-full w-full overflow-hidden touch-none';

export const resolveImagePreviewSlideClass = (): string => 'flex h-full transition-transform';

export const resolveImagePreviewItemClass = (): string => 'flex h-full w-full shrink-0 items-center justify-center';

export const resolveImagePreviewLoadingClass = (): string => 'absolute inset-0 flex items-center justify-center';

export const resolveImagePreviewErrorClass = (): string => 'flex flex-col items-center justify-center text-white/60';

export const resolveImagePreviewErrorIconClass = (): string => '';

export const resolveImagePreviewErrorTextClass = (): string => 'mt-2 text-sm';

export const resolveImagePreviewImageClass = (): string => 'max-h-full max-w-full select-none object-contain';

export const resolveImagePreviewCustomContentClass = (): string => 'absolute bottom-20 left-0 right-0 px-4';

export const resolveImagePreviewDotListClass = (): string => 'flex gap-2';

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveImagePreviewInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入外部可见值，返回组件内部初始渲染状态。
// Normalize an external visible value into the component's initial rendered state.
export const resolveImagePreviewInitialRendered = (visible?: boolean): boolean => Boolean(visible);

// 输入可见状态和出场时长，返回组件层是否保留渲染节点。
// Resolve visibility and outro duration into whether the component layer should keep the node rendered.
export const resolveImagePreviewRenderedState = ({
	visible = false,
	outDuration = 200,
	currentRendered = false
}: ResolveImagePreviewRenderedStateOptions = {}): boolean => {
	if (visible) return true;
	if (outDuration <= 0) return false;
	return currentRendered;
};

// 输入 ImagePreview 可见状态，返回组件代码要写入 body 的 overflow 值。
// Receive ImagePreview visibility and return the body overflow value for component code to write.
export const resolveImagePreviewBodyOverflowStyle = ({ visible = false }: ResolveImagePreviewBodyOverflowStyleOptions = {}): string =>
	visible ? 'hidden' : '';

// 输入 ImagePreview 基础层级，返回预览内容层的框架无关层级样式。
// Receive the ImagePreview base z-index and return framework-agnostic overlay layer styles.
export const resolveImagePreviewOverlayStyleValue = (zIndex = 1000): ImagePreviewOverlayStyleValue => ({
	zIndex: zIndex + 1
});

export const resolveImagePreviewOverlayStyleString = (zIndex = 1000): string => `z-index: ${zIndex + 1}`;

// 输入 ImagePreview 动画时长，返回组件层可直接绑定的入场参数。
// Resolve ImagePreview duration into framework-agnostic intro params for component binding.
export const resolveImagePreviewInParams = (duration = 300): ImagePreviewDurationParams => ({
	duration
});

// 输入 ImagePreview 出场时长，返回组件层可直接绑定的出场参数。
// Resolve ImagePreview outro duration into framework-agnostic outro params for component binding.
export const resolveImagePreviewOutParams = (outDuration = 200): ImagePreviewDurationParams => ({
	duration: outDuration
});

// 输入控制区动画默认值，返回框架无关的缩放入场参数。
// Resolve control animation defaults into framework-agnostic scale intro params.
export const resolveImagePreviewControlScaleParams = (): ImagePreviewScaleParams => ({
	duration: 200,
	delay: 100
});

export const normalizeImagePreviewImages = <TItem extends ImagePreviewItemLike = ImagePreviewItemLike>(
	images: readonly (string | TItem)[] = []
): TItem[] => images.map((image) => (typeof image === 'string' ? ({ url: image } as TItem) : image));

export const resolveImagePreviewCurrentImage = <TItem extends ImagePreviewItemLike = ImagePreviewItemLike>(
	images: readonly TItem[] = [],
	currentIndex = 0
): TItem => (images[currentIndex] || { url: '' }) as TItem;

export const resolveImagePreviewMergedIcon = <TIcon extends Record<string, unknown>>(icon: TIcon | undefined, defaults: TIcon): TIcon => ({
	...defaults,
	...icon
});

// 输入组件层维护的触点集合，返回手势计算使用的普通数组。
// Convert component-owned pointer collections into a plain array for gesture math.
export const resolveImagePreviewPointerList = <TPoint extends ImagePreviewPointLike>(pointers: Iterable<TPoint>): TPoint[] =>
	Array.from(pointers);

export const resolveImagePreviewNextIndex = ({ currentIndex, requestedIndex, total, loop = true }: ResolveImagePreviewNextIndexOptions) => {
	if (total <= 0) return currentIndex;
	if (loop) {
		if (requestedIndex < 0) return total - 1;
		if (requestedIndex >= total) return 0;
		return requestedIndex;
	}
	return Math.min(Math.max(requestedIndex, 0), total - 1);
};

// 输入变换状态重置请求，返回组件层可写入的默认变换值。
// Receive a transform reset request and return default transform values for the component layer.
export const resolveImagePreviewTransformResetAction = (): ImagePreviewTransformResetAction => ({
	currentScale: 1,
	translateX: 0,
	translateY: 0
});

// 输入 ImagePreview 打开或重置请求，返回组件层可写入的变换和手势复位状态。
// Receive an ImagePreview open or reset request and return transform plus gesture reset state for the component layer.
export const resolveImagePreviewVisibleResetAction = (): ImagePreviewVisibleResetAction => ({
	...resolveImagePreviewTransformResetAction(),
	pointerFlags: resolveImagePreviewPointerFlags(),
	swipeOffset: 0
});

// 输入旋转复位动画阶段，返回组件层可写入的动画开关状态。
// Receive a rotation-reset animation phase and return animation toggle state for the component layer.
export const resolveImagePreviewRotationAnimationAction = ({
	phase
}: ResolveImagePreviewRotationAnimationActionOptions): ImagePreviewRotationAnimationAction => ({
	nextIsResettingRotation: phase === 'start'
});

// 输入 ImagePreview 退场结束信号，返回组件层可写入的渲染收尾状态。
// Receive the ImagePreview outro-end signal and return final render state for the component layer.
export const resolveImagePreviewOutroEndAction = (): ImagePreviewOutroEndAction => ({
	nextRendered: false
});

// 输入 ImagePreview 关闭状态，返回组件层可写入的可见状态和变换重置值。
// Receive ImagePreview close state and return visibility plus transform reset values for the component layer.
export const resolveImagePreviewCloseAction = ({ visible = true }: ResolveImagePreviewCloseActionOptions = {}): ImagePreviewCloseAction => {
	const shouldClose = Boolean(visible);
	return {
		...resolveImagePreviewTransformResetAction(),
		nextVisible: false,
		shouldClose,
		shouldEmitClose: shouldClose
	};
};

// 输入切图请求，返回下一索引和变换重置值，不触发事件。
// Receive an image switch request and return the next index plus transform reset values without firing events.
export const resolveImagePreviewSwitchAction = (options: ResolveImagePreviewSwitchActionOptions): ImagePreviewSwitchAction => {
	const nextIndex = resolveImagePreviewNextIndex(options);
	return {
		...resolveImagePreviewTransformResetAction(),
		nextIndex,
		shouldChange: nextIndex !== options.currentIndex
	};
};

// 输入图片加载状态，返回不可变的下一份状态表。
// Receive image load state and return the next immutable status map.
export const resolveImagePreviewLoadStatusAction = <TStatus extends ImagePreviewLoadStatus = ImagePreviewLoadStatus>({
	index,
	loadStatus,
	status
}: ResolveImagePreviewLoadStatusActionOptions<TStatus>): ImagePreviewLoadStatusAction<TStatus> => ({
	nextLoadStatus: {
		...loadStatus,
		[index]: status
	}
});

export const resolveImagePreviewDistance = (first: ImagePreviewPointLike, second: ImagePreviewPointLike) => {
	const dx = first.clientX - second.clientX;
	const dy = first.clientY - second.clientY;
	return Math.sqrt(dx * dx + dy * dy);
};

export const resolveImagePreviewClampedScale = ({
	currentDistance,
	pinchStartDistance,
	pinchStartScale,
	minScale = 0.5,
	maxScale = 3
}: {
	currentDistance: number;
	pinchStartDistance: number;
	pinchStartScale: number;
	minScale?: number;
	maxScale?: number;
}) => Math.max(minScale, Math.min(maxScale, pinchStartScale * (currentDistance / pinchStartDistance)));

export const resolveImagePreviewHasMoved = ({ deltaX, deltaY, threshold = 5 }: { deltaX: number; deltaY: number; threshold?: number }) =>
	Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold;

export const resolveImagePreviewNormalizedRotation = (rotation: number): ImagePreviewRotationValue =>
	(rotation % 360) as ImagePreviewRotationValue;

export const resolveImagePreviewRotation = (rotation?: number): number => rotation || 0;

export const resolveImagePreviewShouldResetRotation = (rotation: number) => rotation % 360 === 0;

export const resolveImagePreviewShouldResetScale = (scale: number, resetScale = 1) => scale < resetScale;

export const resolveImagePreviewLoadingVisible = (status: ImagePreviewLoadStatus): boolean => status !== 'loaded' && status !== 'error';

export const resolveImagePreviewErrorVisible = (status: ImagePreviewLoadStatus): boolean => status === 'error';

export const resolveImagePreviewAlt = (alt?: string): string => alt || '';

// 输入单张图片加载状态，返回框架无关的展示分支。
// Resolve one image load state into framework-agnostic display branches.
export const resolveImagePreviewItemDisplayState = ({
	hasErrorContent = false,
	hasLoadingContent = false,
	status
}: ResolveImagePreviewItemDisplayStateOptions = {}): ImagePreviewItemDisplayState => {
	const showLoading = resolveImagePreviewLoadingVisible(status);
	const showError = resolveImagePreviewErrorVisible(status);
	return {
		showCustomError: showError && hasErrorContent,
		showCustomLoading: showLoading && hasLoadingContent,
		showDefaultError: showError && !hasErrorContent,
		showDefaultLoading: showLoading && !hasLoadingContent,
		showError,
		showImage: !showError,
		showLoading
	};
};

// 输入图片列表和加载状态，返回组件层可直接渲染的框架无关列表。
// Receive images and load states, then return a framework-agnostic list for component rendering.
export const resolveImagePreviewItemDisplayStateList = <TItem extends ImagePreviewItemLike = ImagePreviewItemLike>({
	hasErrorContent = false,
	hasLoadingContent = false,
	items = [],
	loadStatus = {}
}: ResolveImagePreviewItemDisplayStateListOptions<TItem> = {}): ImagePreviewItemDisplayStateItem<TItem>[] =>
	items.map((item, index) => ({
		displayState: resolveImagePreviewItemDisplayState({
			status: loadStatus[index],
			hasLoadingContent,
			hasErrorContent
		}),
		index,
		item
	}));

// 输入导航配置，返回框架无关的控制区展示分支。
// Resolve navigation config into framework-agnostic control display branches.
export const resolveImagePreviewControlState = ({
	currentIndex = 0,
	loop = true,
	navigationPosition = 'center',
	showIndex = true,
	showNavigation = true,
	total = 0
}: ResolveImagePreviewControlStateOptions = {}): ImagePreviewControlState => {
	const hasMultiple = total > 1;
	const canPrev = loop || currentIndex > 0;
	const canNext = loop || currentIndex < total - 1;
	const showCenterNavigation = Boolean(showNavigation && navigationPosition === 'center' && hasMultiple);
	const showBottomNavigation = Boolean(showNavigation && navigationPosition === 'bottom' && hasMultiple);
	const showResolvedIndex = Boolean(showIndex && hasMultiple);
	return {
		showBottomBar: showResolvedIndex || showBottomNavigation,
		showBottomNext: showBottomNavigation && canNext,
		showBottomPrev: showBottomNavigation && canPrev,
		showCenterNavigation,
		showCenterNext: showCenterNavigation && canNext,
		showCenterPrev: showCenterNavigation && canPrev,
		showIndex: showResolvedIndex
	};
};

// 输入当前旋转状态，返回下一角度和是否需要延迟归零的决策。
// Receive current rotation state and return the next angle plus delayed reset decision.
export const resolveImagePreviewRotateAction = ({
	currentIndex,
	rotationStatus
}: ResolveImagePreviewRotateActionOptions): ImagePreviewRotateAction => {
	const nextRotation = resolveImagePreviewRotation(rotationStatus[currentIndex]) + 90;
	return {
		nextRotation,
		nextRotationStatus: {
			...rotationStatus,
			[currentIndex]: nextRotation
		},
		normalizedRotation: resolveImagePreviewNormalizedRotation(nextRotation),
		resetIndex: currentIndex,
		resetRotation: 0,
		shouldResetRotation: resolveImagePreviewShouldResetRotation(nextRotation)
	};
};

export const resolveImagePreviewRotationResetAction = ({
	index,
	rotationStatus
}: ResolveImagePreviewRotationResetActionOptions): ImagePreviewRotationResetAction => ({
	nextRotationStatus: {
		...rotationStatus,
		[index]: 0
	}
});

// 输入指示器状态，返回框架无关的 dot class。
// Consume indicator state and return framework-agnostic dot classes.
export const resolveImagePreviewDotClass = ({ index, currentIndex }: { currentIndex: number; index: number }) =>
	joinClasses(['h-2 rounded-full transition-all', index === currentIndex ? 'w-4 bg-white' : 'w-2 bg-white/50']);

export const resolveImagePreviewSwipeDirection = ({
	swipeOffset,
	viewportWidth,
	thresholdRatio = 0.2
}: ResolveImagePreviewSwipeDirectionOptions): ImagePreviewSwipeDirection => {
	const threshold = viewportWidth * thresholdRatio;
	if (swipeOffset > threshold) return 'prev';
	if (swipeOffset < -threshold) return 'next';
	return 'none';
};

// 输入当前触点和缩放状态，返回组件层可应用的手势开始状态。
// Resolve current pointers and scale into gesture-start state for component bindings.
export const resolveImagePreviewPointerDownState = ({
	currentScale,
	pointers
}: ResolveImagePreviewPointerDownStateOptions): ImagePreviewPointerDownState => {
	if (pointers.length === 2) {
		return {
			hasMoved: false,
			isPinching: true,
			isSwiping: false,
			isMoving: false,
			pinchStartDistance: resolveImagePreviewDistance(pointers[0], pointers[1]),
			pinchStartScale: currentScale
		};
	}

	if (pointers.length === 1) {
		const point = pointers[0];
		const isSwiping = currentScale === 1;
		return {
			hasMoved: false,
			isPinching: false,
			isSwiping,
			isMoving: !isSwiping,
			startX: point.clientX,
			startY: point.clientY,
			swipeStartX: isSwiping ? point.clientX : undefined,
			swipeOffset: isSwiping ? 0 : undefined
		};
	}

	return {
		hasMoved: false,
		isPinching: false,
		isSwiping: false,
		isMoving: false
	};
};

// 输入移动中的触点状态，返回缩放、滑动或拖动的下一步纯计算结果。
// Resolve moving pointer state into the next pure pinch, swipe or drag result.
export const resolveImagePreviewPointerMoveState = ({
	currentScale,
	isMoving = false,
	isPinching = false,
	isSwiping = false,
	maxScale = 3,
	minScale = 0.5,
	pinchStartDistance,
	pinchStartScale,
	pointers,
	point,
	startX,
	startY,
	swipeStartX
}: ResolveImagePreviewPointerMoveStateOptions): ImagePreviewPointerMoveState => {
	if (pointers.length === 2 && isPinching) {
		const currentDistance = resolveImagePreviewDistance(pointers[0], pointers[1]);
		return {
			hasMoved: true,
			nextScale: resolveImagePreviewClampedScale({ currentDistance, pinchStartDistance, pinchStartScale, minScale, maxScale }),
			preventDefault: false
		};
	}

	if (pointers.length !== 1) {
		return { hasMoved: false, preventDefault: false };
	}

	const deltaX = point.clientX - startX;
	const deltaY = point.clientY - startY;
	const hasMoved = resolveImagePreviewHasMoved({ deltaX, deltaY });

	if (isSwiping && currentScale === 1) {
		return {
			hasMoved,
			preventDefault: true,
			swipeOffset: point.clientX - swipeStartX
		};
	}

	if (isMoving && currentScale > 1) {
		return {
			hasMoved,
			nextStartX: point.clientX,
			nextStartY: point.clientY,
			preventDefault: true,
			translateDeltaX: deltaX,
			translateDeltaY: deltaY
		};
	}

	return { hasMoved, preventDefault: false };
};

// 输入抬起后的剩余触点状态，返回切图、关闭和边界重置判断。
// Resolve remaining pointer state into switch, close and boundary reset decisions.
export const resolveImagePreviewPointerUpState = ({
	currentScale,
	hasMoved = false,
	isSwiping = false,
	maskClosable = true,
	pointers,
	swipeOffset,
	viewportWidth
}: ResolveImagePreviewPointerUpStateOptions): ImagePreviewPointerUpState => {
	if (pointers.length === 1) {
		const point = pointers[0];
		const nextIsSwiping = currentScale === 1;
		return {
			isPinching: false,
			isSwiping: nextIsSwiping,
			isMoving: !nextIsSwiping,
			startX: point.clientX,
			startY: point.clientY,
			swipeStartX: nextIsSwiping ? point.clientX : undefined
		};
	}

	if (pointers.length !== 0) return {};

	return {
		isPinching: false,
		isMoving: false,
		isSwiping: false,
		resetSwipeOffset: isSwiping,
		shouldClose: !hasMoved && maskClosable && currentScale === 1,
		shouldResetScale: resolveImagePreviewShouldResetScale(currentScale),
		swipeDirection: isSwiping ? resolveImagePreviewSwipeDirection({ swipeOffset, viewportWidth }) : 'none'
	};
};

// 输入 pointer 派生状态，返回组件层可直接写入的确定布尔标记。
// Normalize pointer-derived state into definite boolean flags for component assignment.
export const resolveImagePreviewPointerFlags = (state: Partial<ImagePreviewPointerFlags> = {}): ImagePreviewPointerFlags => ({
	isMoving: Boolean(state.isMoving),
	isPinching: Boolean(state.isPinching),
	isSwiping: Boolean(state.isSwiping)
});

// 输入 pointer 抬起后的纯状态，返回组件层下一步动作，DOM 释放和事件触发继续留在组件内。
// Resolve pure pointer-up state into the next component action while DOM release and event emission stay in the component layer.
export const resolveImagePreviewPointerUpAction = ({
	pointerCount,
	pointerState
}: ResolveImagePreviewPointerUpActionOptions): ImagePreviewPointerUpAction => {
	const pointerFlags = resolveImagePreviewPointerFlags(pointerState);
	const baseAction = {
		pointerFlags,
		shouldClose: false,
		shouldResetScale: false,
		shouldResetSwipeOffset: false,
		shouldSwitchNext: false,
		shouldSwitchPrev: false
	};

	if (pointerCount === 1) {
		return {
			...baseAction,
			kind: 'continueTracking',
			startX: pointerState.startX,
			startY: pointerState.startY,
			swipeStartX: pointerState.swipeStartX
		};
	}

	if (pointerCount !== 0) {
		return {
			...baseAction,
			kind: 'ignored'
		};
	}

	const shouldResetSwipeOffset = Boolean(pointerState.resetSwipeOffset);
	return {
		...baseAction,
		kind: 'settled',
		shouldClose: Boolean(pointerState.shouldClose),
		shouldResetScale: Boolean(pointerState.shouldResetScale),
		shouldResetSwipeOffset,
		shouldSwitchNext: shouldResetSwipeOffset && pointerState.swipeDirection === 'next',
		shouldSwitchPrev: shouldResetSwipeOffset && pointerState.swipeDirection === 'prev'
	};
};

export const resolveImagePreviewSlideStyleValue = ({
	currentIndex,
	swipeOffset = 0,
	isSwiping = false,
	swipeDuration = 300
}: ResolveImagePreviewSlideStyleOptions): ImagePreviewSlideStyleValue => ({
	transform: `translateX(calc(${-currentIndex * 100}% + ${swipeOffset}px))`,
	transitionDuration: isSwiping ? '0ms' : `${swipeDuration}ms`
});

export const resolveImagePreviewSlideStyleString = (options: ResolveImagePreviewSlideStyleOptions) => {
	const style = resolveImagePreviewSlideStyleValue(options);
	return `transform: ${style.transform}; transition-duration: ${style.transitionDuration}`;
};

export const resolveImagePreviewImageStyleValue = ({
	index,
	currentIndex,
	currentScale = 1,
	translateX = 0,
	translateY = 0,
	rotation = 0,
	isMoving = false,
	isPinching = false,
	isResettingRotation = false
}: ResolveImagePreviewImageStyleOptions): ImagePreviewImageStyleValue => {
	const isActive = index === currentIndex;
	const transform = isActive
		? `scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px) rotate(-${rotation}deg)`
		: `rotate(-${rotation}deg)`;
	const transition = isActive
		? isMoving || isPinching || isResettingRotation
			? 'none'
			: 'transform 0.2s'
		: isResettingRotation
			? 'none'
			: 'transform 0.2s';
	return { transform, transition };
};

export const resolveImagePreviewImageStyleString = (options: ResolveImagePreviewImageStyleOptions) => {
	const style = resolveImagePreviewImageStyleValue(options);
	return `transform: ${style.transform}; transition: ${style.transition}`;
};

// 输入组件 props 和内部状态快照，返回框架无关的 ImagePreview 派生入参。
// Receive component props and internal state snapshots, then return framework-agnostic ImagePreview derivation options.
export const resolveImagePreviewStateOptions = <
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
>({
	currentIndex,
	currentScale,
	errorContentVisible,
	isMoving,
	isPinching,
	isResettingRotation,
	isSwiping,
	loadStatus,
	loadingContentVisible,
	props,
	rotationStatus,
	swipeOffset,
	translateX,
	translateY
}: ResolveImagePreviewStateOptionsParams<TItem, TIcon, TRotationIcon>): ResolveImagePreviewDerivedOptions<TItem, TIcon, TRotationIcon> => ({
	closeIconDefaults: props.closeIconDefaults,
	closePosition: props.closePosition,
	currentIndex,
	currentScale,
	duration: props.duration,
	errorContentVisible,
	icon: props.icon,
	images: props.images,
	isMoving,
	isPinching,
	isResettingRotation,
	isSwiping,
	loadStatus,
	loadingContentVisible,
	loop: props.loop,
	navigationPosition: props.navigationPosition,
	outDuration: props.outDuration,
	rotationIcon: props.rotationIcon,
	rotationIconDefaults: props.rotationIconDefaults,
	rotationStatus,
	showIndex: props.showIndex,
	showNavigation: props.showNavigation,
	swipeDuration: props.swipeDuration,
	swipeOffset,
	translateX,
	translateY,
	zIndex: props.zIndex
});

// 输入 ImagePreview 的 props 和内部状态，返回框架无关的展示、样式和控制区派生结果。
// Receive ImagePreview props and internal state, then return framework-agnostic display, style and control derivations.
export const resolveImagePreviewDerived = <
	TItem extends ImagePreviewItemLike = ImagePreviewItemLike,
	TIcon extends Record<string, unknown> = Record<string, unknown>,
	TRotationIcon extends Record<string, unknown> = Record<string, unknown>
>({
	closeIconDefaults = { name: 'ri-close-line', size: 24 } as unknown as TIcon,
	closePosition = 'tr',
	currentIndex = 0,
	currentScale = 1,
	duration = 300,
	errorContentVisible = false,
	icon = {} as TIcon,
	images = [],
	isMoving = false,
	isPinching = false,
	isResettingRotation = false,
	isSwiping = false,
	loadStatus = {},
	loadingContentVisible = false,
	loop = true,
	navigationPosition = 'center',
	outDuration = 200,
	rotationIcon = {} as TRotationIcon,
	rotationIconDefaults = { size: 24 } as unknown as TRotationIcon,
	rotationStatus = {},
	showIndex = true,
	showNavigation = true,
	swipeDuration = 300,
	swipeOffset = 0,
	translateX = 0,
	translateY = 0,
	zIndex = 1000
}: ResolveImagePreviewDerivedOptions<TItem, TIcon, TRotationIcon> = {}): ImagePreviewDerived<TItem, TIcon, TRotationIcon> => {
	const normalizedImages = normalizeImagePreviewImages<TItem>(images);
	const total = normalizedImages.length;
	const currentImage = resolveImagePreviewCurrentImage<TItem>(normalizedImages, currentIndex);
	const imageDisplayItems = resolveImagePreviewItemDisplayStateList<TItem>({
		items: normalizedImages,
		loadStatus,
		hasLoadingContent: loadingContentVisible,
		hasErrorContent: errorContentVisible
	}).map((displayItem) => {
		const rotation = resolveImagePreviewRotation(rotationStatus[displayItem.index]);
		const imageStyleValue = resolveImagePreviewImageStyleValue({
			index: displayItem.index,
			currentIndex,
			currentScale,
			translateX,
			translateY,
			rotation,
			isMoving,
			isPinching,
			isResettingRotation
		});

		return {
			...displayItem,
			alt: resolveImagePreviewAlt(displayItem.item.alt),
			imageStyleString: resolveImagePreviewImageStyleString({
				index: displayItem.index,
				currentIndex,
				currentScale,
				translateX,
				translateY,
				rotation,
				isMoving,
				isPinching,
				isResettingRotation
			}),
			imageStyleValue,
			rotation
		};
	});

	return {
		bottomBarClass: resolveImagePreviewBottomBarClass(),
		centerNextButtonClass: resolveImagePreviewCenterNextButtonClass(),
		centerPrevButtonClass: resolveImagePreviewCenterPrevButtonClass(),
		containerClass: resolveImagePreviewContainerClass(),
		controlButtonClass: resolveImagePreviewControlButtonClass(),
		controlPanelClass: resolveImagePreviewControlPanelClass(closePosition),
		controlScaleParams: resolveImagePreviewControlScaleParams(),
		controlState: resolveImagePreviewControlState({ currentIndex, loop, navigationPosition, showIndex, showNavigation, total }),
		customContentClass: resolveImagePreviewCustomContentClass(),
		currentImage,
		currentRotation: resolveImagePreviewRotation(rotationStatus[currentIndex]),
		dotListClass: resolveImagePreviewDotListClass(),
		dotItems: normalizedImages.map((_, index) => ({
			className: resolveImagePreviewDotClass({ index, currentIndex }),
			index
		})),
		errorClass: resolveImagePreviewErrorClass(),
		errorIconClass: resolveImagePreviewErrorIconClass(),
		errorTextClass: resolveImagePreviewErrorTextClass(),
		imageClass: resolveImagePreviewImageClass(),
		imageDisplayItems,
		inParams: resolveImagePreviewInParams(duration),
		indexNumberClass: resolveImagePreviewIndexNumberClass(),
		itemClass: resolveImagePreviewItemClass(),
		loadingClass: resolveImagePreviewLoadingClass(),
		mergedIcon: resolveImagePreviewMergedIcon(icon, closeIconDefaults),
		mergedRotationIcon: resolveImagePreviewMergedIcon(rotationIcon, rotationIconDefaults),
		normalizedImages,
		outParams: resolveImagePreviewOutParams(outDuration),
		overlayClass: resolveImagePreviewOverlayClass(),
		overlayStyleString: resolveImagePreviewOverlayStyleString(zIndex),
		overlayStyleValue: resolveImagePreviewOverlayStyleValue(zIndex),
		slideClass: resolveImagePreviewSlideClass(),
		slideStyleString: resolveImagePreviewSlideStyleString({ currentIndex, swipeOffset, isSwiping, swipeDuration }),
		slideStyleValue: resolveImagePreviewSlideStyleValue({ currentIndex, swipeOffset, isSwiping, swipeDuration }),
		total
	};
};
