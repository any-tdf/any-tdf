import { radiusObj } from './common.js';

export const swiperIndicateAlignObj = {
	left: 'justify-start',
	center: 'justify-center',
	right: 'justify-end'
} as const;

export const swiperPxObj = {
	'0': '',
	'1': 'px-1',
	'2': 'px-2',
	'4': 'px-4',
	'6': 'px-6',
	'8': 'px-8',
	'12': 'px-12',
	'16': 'px-16',
	'24': 'px-24'
} as const;

export const swiperPyObj = {
	'0': '',
	'1': 'py-1',
	'2': 'py-2',
	'4': 'py-4',
	'6': 'py-6',
	'8': 'py-8',
	'12': 'py-12'
} as const;

export type SwiperIndicatorPlacement = 'inner' | 'out';
export type SwiperIndicatorPosition = SwiperIndicatorPlacement | null;
export type SwiperIndicatorStyle = 'point' | 'line' | 'pointLine' | 'longLine' | string;
export type SwiperIndicatorAlign = keyof typeof swiperIndicateAlignObj | string;
export type SwiperSpacingKey = keyof typeof swiperPxObj | string;
export type SwiperRadiusKey = keyof typeof radiusObj | string;
export type SwiperSlideDirection = 'next' | 'previous' | 'none';

export type SwiperLoopRenderItem<T> = {
	item: T;
	sourceIndex: number;
};
export type SwiperRenderableItem = {
	ReactNode?: unknown;
	component?: unknown;
	type?: string;
	url?: string;
};
export type SwiperItemImageSrc<TItem extends SwiperRenderableItem> =
	Extract<TItem, { type: 'img' }> extends { url?: infer TSrc } ? TSrc : string | undefined;
export type SwiperItemComponent<TItem extends SwiperRenderableItem> =
	Extract<TItem, { type: 'component' }> extends { component: infer TComponent } ? TComponent : unknown;
export type SwiperItemReactNode<TItem extends SwiperRenderableItem> =
	Extract<TItem, { type: 'ReactNode' }> extends { ReactNode: infer TReactNode } ? TReactNode : unknown;
export type SwiperItemContentState<TItem extends SwiperRenderableItem = SwiperRenderableItem> =
	| { kind: 'image'; item: TItem; src: SwiperItemImageSrc<TItem> }
	| { kind: 'component'; component: SwiperItemComponent<TItem>; item: TItem }
	| { kind: 'reactNode'; item: TItem; reactNode: SwiperItemReactNode<TItem> }
	| { kind: 'none'; item: TItem };
export type SwiperItemViewState<TItem extends SwiperRenderableItem = SwiperRenderableItem> = SwiperLoopRenderItem<TItem> & {
	contentState: SwiperItemContentState<TItem>;
};

export type SwiperTransformOptions = {
	index: number;
	current: number;
	value: number;
	percent?: number;
	isMove?: boolean;
};

export type ResolveSwiperPointerEndDirectionOptions = {
	endTime: number;
	moveX: number;
	notTriggerLong?: number;
	startTime: number;
	triggerLong?: number;
	triggerSpeed?: number;
	width: number;
};

export type ResolveSwiperSlideStateOptions = {
	active: number;
	currentIndicate: number;
	dataLength: number;
	direction: SwiperSlideDirection;
};

export type ResolveSwiperInitialStateOptions = {
	dataLength: number;
	initActive?: number;
};
export type ResolveSwiperAutoplayGuardActionOptions = {
	autoplay?: boolean;
	dataLength: number;
	duration?: number;
	interval?: number;
};

export type SwiperSlideState = {
	active: number;
	currentIndicate: number;
	direction: SwiperSlideDirection;
	loopResetActive?: number;
	loopResetTranslateXTransition?: boolean;
	moveX: number;
};
export type SwiperInitialStateAction = {
	active: number;
	currentIndicate: number;
	initialState: boolean;
	moveX: number;
	once: boolean;
	translateXTransition: boolean;
};
export type SwiperLongLineResetAction = {
	long: boolean;
	longTransition: boolean;
	resetDelay: number;
	resetLong: boolean;
	resetLongTransition: boolean;
};
export type SwiperAutoplayGuardAction = {
	shouldAutoplay: boolean;
	shouldWarnInvalidTiming: boolean;
};
export type ResolveSwiperLongLineResetActionOptions = {
	autoplay?: boolean;
	duration?: number;
};
export type ResolveSwiperAutoplayTickActionOptions = Omit<ResolveSwiperSlideStateOptions, 'direction'> &
	ResolveSwiperLongLineResetActionOptions;
export type SwiperAutoplayTickAction = SwiperSlideState & {
	initialState: boolean;
	longLine: SwiperLongLineResetAction;
	once: boolean;
	translateXTransition: boolean;
};
export type ResolveSwiperPointerDownActionOptions = {
	clientX: number;
	time: number;
};
export type SwiperPointerDownAction = {
	isMove: boolean;
	startTime: number;
	startX: number;
	translateXTransition: boolean;
};
export type ResolveSwiperPointerMoveActionOptions = {
	clientX: number;
	isMove?: boolean;
	startX: number;
};
export type SwiperPointerMoveAction = {
	moveX: number;
	shouldCapturePointer: boolean;
	shouldMove: boolean;
	shouldStopAutoplay: boolean;
};
export type ResolveSwiperPointerUpActionOptions = Omit<ResolveSwiperPointerEndDirectionOptions, 'moveX'> &
	Omit<ResolveSwiperSlideStateOptions, 'direction'> &
	ResolveSwiperLongLineResetActionOptions & {
		moveX: number;
	};
export type SwiperPointerUpAction = SwiperSlideState & {
	direction: SwiperSlideDirection;
	isMove: boolean;
	longLine: SwiperLongLineResetAction;
	shouldEmitChange: boolean;
	shouldRestartAutoplay: boolean;
	translateXTransition: boolean;
};

const resolveSwiperMovePercent = (percent = 0, isMove = false) => (isMove ? percent : 0);

// 输入 Swiper 数据长度和初始索引，返回框架无关的初始激活项。
// Consume Swiper data length and initial index, then return framework-agnostic active indexes.
export const resolveSwiperInitialActive = ({ dataLength, initActive = 0 }: ResolveSwiperInitialStateOptions): number =>
	dataLength > 1 ? initActive + 1 : 1;

export const resolveSwiperInitialIndicator = ({ dataLength, initActive = 0 }: ResolveSwiperInitialStateOptions): number =>
	dataLength > 1 ? initActive : 0;

// 输入 Swiper 初始配置，返回组件层可写入的初始状态。
// Receive Swiper initial config and return initial state for the component layer to write.
export const resolveSwiperInitialStateAction = (options: ResolveSwiperInitialStateOptions): SwiperInitialStateAction => ({
	active: resolveSwiperInitialActive(options),
	currentIndicate: resolveSwiperInitialIndicator(options),
	initialState: true,
	moveX: 0,
	once: true,
	translateXTransition: true
});

export const resolveSwiperWidth = ({ containerWidth, fallbackWidth = 0 }: { containerWidth?: number; fallbackWidth?: number }): number =>
	containerWidth === 0 ? fallbackWidth : containerWidth || 0;

export const resolveSwiperPointerMoveDistance = ({ clientX, startX }: { clientX: number; startX: number }): number => clientX - startX;

export const resolveSwiperShouldAutoplay = ({
	autoplay = true,
	dataLength,
	duration = 1000,
	interval = 4
}: ResolveSwiperAutoplayGuardActionOptions): boolean => dataLength >= 2 && autoplay && duration < interval * 1000;

// 输入自动播放参数，返回组件层可执行的启动和提示决策。
// Resolve autoplay options into start and warning decisions for the component layer.
export const resolveSwiperAutoplayGuardAction = (options: ResolveSwiperAutoplayGuardActionOptions): SwiperAutoplayGuardAction => {
	const { duration = 1000, interval = 4 } = options;
	return {
		shouldAutoplay: resolveSwiperShouldAutoplay(options),
		shouldWarnInvalidTiming: duration >= interval * 1000
	};
};

// 输入长线指示器状态参数，返回立即状态和延迟恢复目标。
// Receive long-line indicator state options and return immediate state plus delayed restore target.
export const resolveSwiperLongLineResetAction = ({
	autoplay = true,
	duration = 1000
}: ResolveSwiperLongLineResetActionOptions = {}): SwiperLongLineResetAction => ({
	long: false,
	longTransition: false,
	resetDelay: duration,
	resetLong: autoplay,
	resetLongTransition: true
});

// 输入 Swiper 的当前状态，返回框架无关的 transform 片段。
// Resolve Swiper state into framework-agnostic transform fragments.
export const resolveSwiperTranslateX = ({ index, current, value }: SwiperTransformOptions): string => {
	if (index === current) return '0px';
	if (index < current) return `${value}px`;
	return `${-value}px`;
};

export const resolveSwiperTranslateZ = ({ index, current, value, percent = 0, isMove = false }: SwiperTransformOptions): string => {
	const movePercent = resolveSwiperMovePercent(percent, isMove);
	return index === current ? `${0 - Math.abs(value * movePercent)}px` : `${-value + Math.abs(value * movePercent)}px`;
};

export const resolveSwiperRotate = ({ index, current, value, percent = 0, isMove = false }: SwiperTransformOptions): string => {
	const movePercent = resolveSwiperMovePercent(percent, isMove);
	if (index === current) return `${-value * movePercent}deg`;
	if (index < current) return `${value - value * movePercent}deg`;
	return `${-value - value * movePercent}deg`;
};

export const resolveSwiperZIndex = (index: number, current: number, length: number): number => {
	if (index === current) return index + 2;
	if (index < current) return -(length - index - 1) + length;
	return 2 * current - index + 2;
};

export type ResolveSwiperTransformStringOptions = {
	index: number;
	current: number;
	translateX: number;
	translateZ: number;
	rotateX: number;
	rotateY: number;
	rotateZ: number;
	percent?: number;
	isMove?: boolean;
};

export type ResolveSwiperItemStyleValueOptions = ResolveSwiperTransformStringOptions & {
	width: number;
	height: number;
	moveX?: number;
	duration?: number;
	dataLength: number;
};

export type ResolveSwiperContainerStyleOptions = {
	height: number;
	width: number;
};

export type SwiperContainerStyleValue = {
	height: string;
	perspective: string;
	width: string;
};

export type SwiperTransitionDurationStyleValue = {
	transitionDuration: string;
};

export type SwiperItemStyleValue = {
	height: string;
	left: string;
	transform: string;
	transitionDuration: string;
	width: string;
	zIndex: number;
};

export type SwiperRenderItemViewState<TItem extends SwiperRenderableItem = SwiperRenderableItem> = SwiperItemViewState<TItem> & {
	active: boolean;
	className: string;
	index: number;
	style: SwiperItemStyleValue;
	styleString: string;
};

export type SwiperIndicatorItemViewState = {
	className: string;
	index: number;
	isActive: boolean;
	longLineClass: string;
	longLineStyle: SwiperTransitionDurationStyleValue;
	longLineStyleString: string;
	showLongLine: boolean;
	style: SwiperTransitionDurationStyleValue;
	styleString: string;
};

export type SwiperIndicatorViewState = {
	className: string;
	items: SwiperIndicatorItemViewState[];
	placement: SwiperIndicatorPlacement;
};

export type ResolveSwiperDerivedOptions<TItem extends SwiperRenderableItem = SwiperRenderableItem> = {
	active?: number;
	activeInjClass?: string;
	currentIndicate?: number;
	data?: readonly TItem[];
	duration?: number;
	height: number;
	indicateActiveColor?: string;
	indicateAlign?: SwiperIndicatorAlign;
	indicateColor?: string;
	indicateInjClass?: string;
	indicatePosition?: SwiperIndicatorPosition;
	indicateRadius?: SwiperRadiusKey;
	indicateStyle?: SwiperIndicatorStyle;
	innerInjClass?: string;
	interval?: number;
	isMove?: boolean;
	long?: boolean;
	longTransition?: boolean;
	moveX?: number;
	notActiveInjClass?: string;
	once?: boolean;
	px?: SwiperSpacingKey;
	py?: SwiperSpacingKey;
	radius?: SwiperRadiusKey;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
	translateX?: number;
	translateXTransition?: boolean;
	translateZ?: number;
	width: number;
};

export type SwiperDerived<TItem extends SwiperRenderableItem = SwiperRenderableItem> = {
	containerClass: string;
	containerStyle: SwiperContainerStyleValue;
	containerStyleString: string;
	contentClass: string;
	height: number;
	imageClass: string;
	indicators: Record<SwiperIndicatorPlacement, SwiperIndicatorViewState>;
	itemButtonClass: string;
	items: SwiperRenderItemViewState<TItem>[];
	longLineDuration: number;
	longLineStyle: SwiperTransitionDurationStyleValue;
	longLineStyleString: string;
	movePercent: number;
	radiusClass: string;
	rootClass: string;
	transitionDurationStyle: SwiperTransitionDurationStyleValue;
	transitionDurationStyleString: string;
	width: number;
};

// 只组合 transform 字符串，不读取 DOM 宽度或手势事件。
// Only compose the transform string without reading DOM width or gesture events.
export const resolveSwiperTransformString = (options: ResolveSwiperTransformStringOptions): string => {
	const { index, current, translateX, translateZ, rotateX, rotateY, rotateZ, percent = 0, isMove = false } = options;
	const state = { index, current, percent, isMove };

	return [
		`translateX(${resolveSwiperTranslateX({ ...state, value: translateX })})`,
		`translateZ(${resolveSwiperTranslateZ({ ...state, value: translateZ })})`,
		`rotateX(${resolveSwiperRotate({ ...state, value: rotateX })})`,
		`rotateY(${resolveSwiperRotate({ ...state, value: rotateY })})`,
		`rotateZ(${resolveSwiperRotate({ ...state, value: rotateZ })})`
	].join(' ');
};

// 输入 Swiper 容器尺寸，返回组件层可直接绑定的容器样式。
// Resolve Swiper container size into styles for component binding.
export const resolveSwiperContainerStyleValue = ({ width, height }: ResolveSwiperContainerStyleOptions): SwiperContainerStyleValue => ({
	width: `${width}px`,
	height: `${height}px`,
	perspective: `${width}px`
});

export const resolveSwiperContainerStyleString = (options: ResolveSwiperContainerStyleOptions): string => {
	const style = resolveSwiperContainerStyleValue(options);
	return `width:${style.width};height:${style.height};perspective:${style.perspective};`;
};

// 输入 Swiper 项状态，返回可直接绑定的无框架 style 对象。
// Convert Swiper item state into a framework-agnostic style object for binding.
export const resolveSwiperItemStyleValue = (options: ResolveSwiperItemStyleValueOptions): SwiperItemStyleValue => {
	const { index, current, width, height, moveX = 0, duration = 300, dataLength } = options;
	return {
		width: `${width}px`,
		height: `${height}px`,
		left: `${width * (index - current) + moveX}px`,
		transitionDuration: `${duration}ms`,
		zIndex: resolveSwiperZIndex(index, current, dataLength),
		transform: resolveSwiperTransformString(options)
	};
};

export const resolveSwiperItemStyleString = (options: ResolveSwiperItemStyleValueOptions): string => {
	const style = resolveSwiperItemStyleValue(options);
	return `width:${style.width};height:${style.height};left:${style.left};transition-duration:${style.transitionDuration};z-index:${style.zIndex};transform:${style.transform};`;
};

export const resolveSwiperTransitionDurationStyleValue = (duration = 0): SwiperTransitionDurationStyleValue => ({
	transitionDuration: `${duration}ms`
});

export const resolveSwiperTransitionDurationStyleString = (duration = 0): string => `transition-duration: ${duration}ms;`;

// 输入轮播原始数据，返回无限轮播渲染使用的框架无关数据。
// Resolve raw carousel data into framework-agnostic loop render data.
export const resolveSwiperLoopItems = <T>(data: readonly T[] = []): T[] => {
	if (data.length > 1) return [data[data.length - 1], ...data, data[0], data[1]];
	if (data.length === 1) return [data[0], data[0], data[0]];
	return [];
};

export const resolveSwiperLoopRenderItems = <T>(data: readonly T[] = []): SwiperLoopRenderItem<T>[] => {
	if (data.length > 1) {
		return [
			{ item: data[data.length - 1], sourceIndex: data.length - 1 },
			...data.map((item, sourceIndex) => ({ item, sourceIndex })),
			{ item: data[0], sourceIndex: 0 },
			{ item: data[1], sourceIndex: 1 }
		];
	}

	if (data.length === 1) {
		return [
			{ item: data[0], sourceIndex: 0 },
			{ item: data[0], sourceIndex: 0 },
			{ item: data[0], sourceIndex: 0 }
		];
	}

	return [];
};

// 输入 Swiper item，返回框架无关的内容展示分支。
// Receive a Swiper item and return a framework-agnostic content branch.
export const resolveSwiperItemContentState = <TItem extends SwiperRenderableItem>(item: TItem): SwiperItemContentState<TItem> => {
	if (item.type === 'img') return { kind: 'image', item, src: item.url as SwiperItemImageSrc<TItem> };
	if (item.type === 'component') return { kind: 'component', item, component: item.component as SwiperItemComponent<TItem> };
	if (item.type === 'ReactNode') return { kind: 'reactNode', item, reactNode: item.ReactNode as SwiperItemReactNode<TItem> };
	return { kind: 'none', item };
};

// 输入 Swiper 原始数据，返回组件层可直接渲染的框架无关 item 视图列表。
// Receive raw Swiper data and return a framework-agnostic item view list for component rendering.
export const resolveSwiperItemViewStateList = <TItem extends SwiperRenderableItem>(
	data: readonly TItem[] = []
): SwiperItemViewState<TItem>[] =>
	resolveSwiperLoopRenderItems(data).map((renderItem) => ({
		...renderItem,
		contentState: resolveSwiperItemContentState(renderItem.item)
	}));

export const resolveSwiperHeight = (width: number, aspectRatio: readonly [number, number] = [16, 9]) =>
	width === 0 ? 0 : (width * aspectRatio[1]) / aspectRatio[0];

export const resolveSwiperDragPercent = (moveX: number, width: number) => (width === 0 ? 0 : moveX / width);

// 输入拖动距离和时间，返回组件层可执行的切换方向。
// Resolve drag distance and timing into a slide direction for component state updates.
export const resolveSwiperPointerEndDirection = ({
	endTime,
	moveX,
	notTriggerLong = 10,
	startTime,
	triggerLong = 30,
	triggerSpeed = 0.5,
	width
}: ResolveSwiperPointerEndDirectionOptions): SwiperSlideDirection => {
	const moveXABS = Math.abs(moveX);
	const timeLong = endTime - startTime;
	const speed = timeLong === 0 ? 0 : moveXABS / timeLong;
	const triggerDistance = width * (triggerLong / 100);
	const notTriggerDistance = width * (notTriggerLong / 100);

	if (moveX <= -triggerDistance) return 'next';
	if (moveX >= triggerDistance) return 'previous';
	if (moveXABS > notTriggerDistance && moveXABS < triggerDistance && speed >= triggerSpeed) {
		return moveX < 0 ? 'next' : 'previous';
	}
	return 'none';
};

// 输入当前索引和切换方向，返回循环轮播需要应用的状态和延迟重置目标。
// Resolve current indexes and slide direction into loop-carousel state and delayed reset target.
export const resolveSwiperSlideState = ({
	active,
	currentIndicate,
	dataLength,
	direction
}: ResolveSwiperSlideStateOptions): SwiperSlideState => {
	if (direction === 'next') {
		const nextActive = active + 1;
		const nextCurrentIndicate = nextActive === dataLength - 2 ? 0 : currentIndicate + 1;
		return {
			direction,
			active: nextActive,
			currentIndicate: nextCurrentIndicate,
			loopResetActive: nextActive === dataLength - 2 ? 1 : undefined,
			loopResetTranslateXTransition: nextActive === dataLength - 2 ? false : undefined,
			moveX: 0
		};
	}

	if (direction === 'previous') {
		const nextActive = active - 1;
		const nextCurrentIndicate = nextActive === 0 ? dataLength - 4 : currentIndicate - 1;
		return {
			direction,
			active: nextActive,
			currentIndicate: nextCurrentIndicate,
			loopResetActive: nextActive === 0 ? dataLength - 3 : undefined,
			loopResetTranslateXTransition: nextActive === 0 ? false : undefined,
			moveX: 0
		};
	}

	return { direction, active, currentIndicate, moveX: 0 };
};

// 输入循环重置动作的 transition 标记，返回组件层可直接写入的布尔值。
// Normalize loop-reset transition flag into a boolean the component layer can write directly.
export const resolveSwiperLoopResetTransition = (loopResetTranslateXTransition?: boolean): boolean =>
	Boolean(loopResetTranslateXTransition);

// 输入自动轮播当前状态，返回本轮 tick 后的框架无关状态。
// Receive current autoplay state and return framework-agnostic state after this tick.
export const resolveSwiperAutoplayTickAction = (options: ResolveSwiperAutoplayTickActionOptions): SwiperAutoplayTickAction => {
	const slideState = resolveSwiperSlideState({ ...options, direction: 'next' });
	return {
		...slideState,
		initialState: false,
		longLine: resolveSwiperLongLineResetAction(options),
		once: false,
		translateXTransition: slideState.loopResetActive === undefined
	};
};

// 输入指针按下坐标和时间，返回组件层可写入的手势开始状态。
// Receive pointer-down position and time, then return gesture-start state for the component layer.
export const resolveSwiperPointerDownAction = ({ clientX, time }: ResolveSwiperPointerDownActionOptions): SwiperPointerDownAction => ({
	isMove: true,
	startTime: time,
	startX: clientX,
	translateXTransition: false
});

// 输入指针移动状态，返回组件层可执行的移动动作，pointer capture 和定时器停止仍由组件层完成。
// Receive pointer-move state and return the move action for component bindings while pointer capture and timer stopping stay in the component layer.
export const resolveSwiperPointerMoveAction = ({
	clientX,
	isMove = false,
	startX
}: ResolveSwiperPointerMoveActionOptions): SwiperPointerMoveAction => {
	const shouldMove = Boolean(isMove);
	return {
		moveX: shouldMove ? resolveSwiperPointerMoveDistance({ clientX, startX }) : 0,
		shouldCapturePointer: shouldMove,
		shouldMove,
		shouldStopAutoplay: shouldMove
	};
};

// 输入指针结束状态，返回切换、长线和自动播放恢复决策。
// Receive pointer-end state and return slide, long-line and autoplay-restart decisions.
export const resolveSwiperPointerUpAction = (options: ResolveSwiperPointerUpActionOptions): SwiperPointerUpAction => {
	const direction = resolveSwiperPointerEndDirection(options);
	const slideState = resolveSwiperSlideState({ ...options, direction });
	return {
		...slideState,
		direction,
		isMove: false,
		longLine: resolveSwiperLongLineResetAction(options),
		shouldEmitChange: !options.autoplay,
		shouldRestartAutoplay: Boolean(options.autoplay),
		translateXTransition: true
	};
};

export const resolveSwiperRadiusClass = (radius: SwiperRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-box)';

export const resolveSwiperIndicatorRadiusClass = (radius: SwiperRadiusKey = '') =>
	radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-small)';

export const resolveSwiperSpacingClass = (spacing: SwiperSpacingKey = '0', axis: 'x' | 'y' = 'x') => {
	const map = axis === 'x' ? swiperPxObj : swiperPyObj;
	return map[spacing as keyof typeof map] || '';
};

export const resolveSwiperIndicateAlignClass = (align: SwiperIndicatorAlign = 'center') =>
	swiperIndicateAlignObj[align as keyof typeof swiperIndicateAlignObj] || swiperIndicateAlignObj.center;

export type ResolveSwiperItemClassOptions = {
	px?: SwiperSpacingKey;
	py?: SwiperSpacingKey;
	translateXTransition?: boolean;
	active?: boolean;
	activeInjClass?: string;
	notActiveInjClass?: string;
};

export const resolveSwiperItemClass = (options: ResolveSwiperItemClassOptions = {}) => {
	const { px = '0', py = '0', translateXTransition = true, active = false, activeInjClass = '', notActiveInjClass = '' } = options;
	return [
		'absolute',
		resolveSwiperSpacingClass(px, 'x'),
		resolveSwiperSpacingClass(py, 'y'),
		translateXTransition ? 'transition-all' : 'transition-none',
		active ? activeInjClass : notActiveInjClass
	]
		.filter(Boolean)
		.join(' ');
};

// 输入 Swiper 内容圆角和注入 class，返回框架无关的内容容器 class。
// Receive Swiper content radius and injected classes, then return a framework-agnostic content wrapper class.
export const resolveSwiperContentClass = ({
	radiusClass = '',
	innerInjClass = ''
}: { innerInjClass?: string; radiusClass?: string } = {}): string =>
	['h-full w-full', radiusClass, innerInjClass].filter(Boolean).join(' ');

export const resolveSwiperImageClass = (options: { innerInjClass?: string; radiusClass?: string } = {}): string =>
	['h-full w-full object-cover', options.radiusClass || '', options.innerInjClass || ''].filter(Boolean).join(' ');

// 输入 Swiper 结构状态，返回组件实现可复用的框架无关 class。
// Receive Swiper structure state and return framework-agnostic classes for component implementations.
export const resolveSwiperRootClass = (): string => 'cursor-move touch-none';

export const resolveSwiperContainerClass = (): string => 'relative overflow-hidden';

export const resolveSwiperItemButtonClass = (): string => 'h-full w-full';

export type ResolveSwiperIndicatorContainerClassOptions = {
	placement: SwiperIndicatorPlacement;
	dataLength: number;
	indicatePosition?: SwiperIndicatorPosition;
	indicateAlign?: SwiperIndicatorAlign;
	indicateInjClass?: string;
};

export const resolveSwiperIndicatorContainerClass = (options: ResolveSwiperIndicatorContainerClassOptions) => {
	const { placement, dataLength, indicatePosition = 'inner', indicateAlign = 'center', indicateInjClass = '' } = options;
	const isHidden =
		dataLength < 2 || indicatePosition === null || (placement === 'inner' ? indicatePosition === 'out' : indicatePosition === 'inner');
	const baseClass =
		placement === 'inner'
			? 'absolute bottom-0 z-50 flex w-full space-x-2 bg-linear-to-b from-black/0 to-black/40 px-4 pb-2 pt-4'
			: 'flex w-full space-x-2 px-4 py-3';
	return [isHidden ? 'hidden' : '', baseClass, indicateInjClass, resolveSwiperIndicateAlignClass(indicateAlign)].filter(Boolean).join(' ');
};

export type ResolveSwiperIndicatorItemClassOptions = {
	placement: SwiperIndicatorPlacement;
	style?: SwiperIndicatorStyle;
	isActive?: boolean;
	indicateColor?: string;
	indicateActiveColor?: string;
	radiusClass?: string;
};

// 输入指示器状态，返回框架无关的 class，不处理 DOM 渲染分支。
// Resolve indicator state into shared classes without handling DOM render branches.
export const resolveSwiperIndicatorItemClass = (options: ResolveSwiperIndicatorItemClassOptions) => {
	const {
		placement,
		style = 'pointLine',
		isActive = false,
		indicateColor = '',
		indicateActiveColor = '',
		radiusClass = 'rounded-(--radius-small)'
	} = options;
	const activeDefault = placement === 'inner' ? 'bg-white' : 'bg-primary dark:bg-dark';
	const inactiveDefault = placement === 'inner' ? 'bg-white/40' : 'bg-black/20 dark:bg-white/40';
	const pointLineInactiveDefault = placement === 'inner' ? 'bg-white' : 'bg-primary dark:bg-dark';
	const longLineActiveDefault = placement === 'inner' ? 'bg-white/40' : 'bg-black/5 dark:bg-white/10';
	let styleClass: string;

	switch (style) {
		case 'point':
			styleClass = isActive
				? `w-1.5 h-1.5 ${indicateActiveColor === '' ? activeDefault : indicateActiveColor}`
				: `w-1.5 h-1.5 ${indicateColor === '' ? inactiveDefault : indicateColor}`;
			break;
		case 'line':
			styleClass = isActive
				? `w-6 h-1 ${indicateActiveColor === '' ? activeDefault : indicateActiveColor}`
				: `w-6 h-1 ${indicateColor === '' ? inactiveDefault : indicateColor}`;
			break;
		case 'longLine':
			styleClass = isActive
				? `w-16 h-1 ${indicateColor === '' ? longLineActiveDefault : indicateColor}`
				: `w-1 h-1 ${indicateColor === '' ? inactiveDefault : indicateColor}`;
			break;
		case 'pointLine':
		default:
			styleClass = isActive
				? `w-6 h-1 ${indicateActiveColor === '' ? activeDefault : indicateActiveColor}`
				: `w-1 h-1 ${indicateColor === '' ? pointLineInactiveDefault : indicateColor}`;
			break;
	}

	return [styleClass, radiusClass, 'transition-all'].filter(Boolean).join(' ');
};

export type ResolveSwiperLongLineClassOptions = {
	placement: SwiperIndicatorPlacement;
	long?: boolean;
	isActive?: boolean;
	radiusClass?: string;
	indicateActiveColor?: string;
};

export const resolveSwiperLongLineClass = (options: ResolveSwiperLongLineClassOptions) => {
	const { placement, long = false, isActive = false, radiusClass = 'rounded-(--radius-small)', indicateActiveColor = '' } = options;
	const activeDefault = placement === 'inner' ? 'bg-white' : 'bg-primary dark:bg-dark';
	return [
		'absolute h-1 transition-all',
		long ? 'ease-linear' : '',
		radiusClass,
		long && isActive ? 'w-16' : 'w-1',
		indicateActiveColor === '' ? activeDefault : indicateActiveColor
	]
		.filter(Boolean)
		.join(' ');
};

// 只计算长条指示器动画时长，定时器启动和清理留在组件内。
// Only calculate long-line indicator duration; timer lifecycle stays in the component.
export const resolveSwiperLongLineDuration = (
	options: { longTransition?: boolean; currentIndicate?: number; once?: boolean; interval?: number; duration?: number } = {}
) => {
	const { longTransition = true, currentIndicate = 0, once = true, interval = 4, duration = 1000 } = options;
	return longTransition ? (currentIndicate === 0 && once ? interval * 1000 : interval * 1000 - duration) : duration;
};

const resolveSwiperIndicatorViewState = (options: {
	currentIndicate: number;
	dataLength: number;
	duration: number;
	indicateActiveColor?: string;
	indicateAlign?: SwiperIndicatorAlign;
	indicateColor?: string;
	indicateInjClass?: string;
	indicatePosition?: SwiperIndicatorPosition;
	indicateRadiusClass: string;
	indicateStyle?: SwiperIndicatorStyle;
	long?: boolean;
	longLineDuration: number;
	placement: SwiperIndicatorPlacement;
}): SwiperIndicatorViewState => {
	const className = resolveSwiperIndicatorContainerClass({
		placement: options.placement,
		dataLength: options.dataLength,
		indicatePosition: options.indicatePosition,
		indicateAlign: options.indicateAlign,
		indicateInjClass: options.indicateInjClass
	});
	const style = resolveSwiperTransitionDurationStyleValue(options.duration);
	const styleString = resolveSwiperTransitionDurationStyleString(options.duration);
	const longLineStyle = resolveSwiperTransitionDurationStyleValue(options.longLineDuration);
	const longLineStyleString = resolveSwiperTransitionDurationStyleString(options.longLineDuration);

	return {
		className,
		placement: options.placement,
		items: Array.from({ length: options.dataLength }, (_, index) => {
			const isActive = options.currentIndicate === index;
			return {
				index,
				isActive,
				className: resolveSwiperIndicatorItemClass({
					placement: options.placement,
					style: options.indicateStyle,
					isActive,
					indicateColor: options.indicateColor,
					indicateActiveColor: options.indicateActiveColor,
					radiusClass: options.indicateRadiusClass
				}),
				style,
				styleString,
				showLongLine: options.indicateStyle === 'longLine',
				longLineClass: resolveSwiperLongLineClass({
					placement: options.placement,
					long: options.long,
					isActive,
					radiusClass: options.indicateRadiusClass,
					indicateActiveColor: options.indicateActiveColor
				}),
				longLineStyle,
				longLineStyleString
			};
		})
	};
};

// 输入 Swiper 渲染状态，返回组件层可直接渲染的框架无关派生结果。
// Receive Swiper render state and return framework-agnostic derived results for component rendering.
export const resolveSwiperDerived = <TItem extends SwiperRenderableItem = SwiperRenderableItem>({
	data = [],
	width,
	height,
	active = 0,
	currentIndicate = 0,
	moveX = 0,
	duration = 1000,
	translateX = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	isMove = false,
	px = '0',
	py = '0',
	translateXTransition = true,
	activeInjClass = '',
	notActiveInjClass = '',
	radius = '',
	innerInjClass = '',
	indicateRadius = '',
	indicateStyle = 'pointLine',
	indicatePosition = 'inner',
	indicateAlign = 'center',
	indicateInjClass = '',
	indicateColor = '',
	indicateActiveColor = '',
	long = false,
	longTransition = true,
	once = true,
	interval = 4
}: ResolveSwiperDerivedOptions<TItem>): SwiperDerived<TItem> => {
	const movePercent = resolveSwiperDragPercent(moveX, width);
	const radiusClass = resolveSwiperRadiusClass(radius);
	const indicateRadiusClass = resolveSwiperIndicatorRadiusClass(indicateRadius);
	const items = resolveSwiperItemViewStateList(data);
	const longLineDuration = resolveSwiperLongLineDuration({ longTransition, currentIndicate, once, interval, duration });
	const indicatorOptions = {
		currentIndicate,
		dataLength: data.length,
		duration,
		indicateActiveColor,
		indicateAlign,
		indicateColor,
		indicateInjClass,
		indicatePosition,
		indicateRadiusClass,
		indicateStyle,
		long,
		longLineDuration
	};

	return {
		width,
		height,
		movePercent,
		radiusClass,
		rootClass: resolveSwiperRootClass(),
		containerClass: resolveSwiperContainerClass(),
		itemButtonClass: resolveSwiperItemButtonClass(),
		imageClass: resolveSwiperImageClass({ radiusClass, innerInjClass }),
		contentClass: resolveSwiperContentClass({ radiusClass, innerInjClass }),
		containerStyle: resolveSwiperContainerStyleValue({ width, height }),
		containerStyleString: resolveSwiperContainerStyleString({ width, height }),
		transitionDurationStyle: resolveSwiperTransitionDurationStyleValue(duration),
		transitionDurationStyleString: resolveSwiperTransitionDurationStyleString(duration),
		longLineDuration,
		longLineStyle: resolveSwiperTransitionDurationStyleValue(longLineDuration),
		longLineStyleString: resolveSwiperTransitionDurationStyleString(longLineDuration),
		items: items.map((item, index) => ({
			...item,
			index,
			active: index === active,
			className: resolveSwiperItemClass({ px, py, translateXTransition, active: index === active, activeInjClass, notActiveInjClass }),
			style: resolveSwiperItemStyleValue({
				index,
				current: active,
				width,
				height,
				moveX,
				duration,
				dataLength: items.length,
				translateX,
				translateZ,
				rotateX,
				rotateY,
				rotateZ,
				percent: movePercent,
				isMove
			}),
			styleString: resolveSwiperItemStyleString({
				index,
				current: active,
				width,
				height,
				moveX,
				duration,
				dataLength: items.length,
				translateX,
				translateZ,
				rotateX,
				rotateY,
				rotateZ,
				percent: movePercent,
				isMove
			})
		})),
		indicators: {
			inner: resolveSwiperIndicatorViewState({ ...indicatorOptions, placement: 'inner' }),
			out: resolveSwiperIndicatorViewState({ ...indicatorOptions, placement: 'out' })
		}
	};
};
