import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export const noticeBarDurationClass = {
	'100': ' duration-100',
	'300': ' duration-300',
	'500': ' duration-500',
	'700': ' duration-700',
	'1000': ' duration-1000'
} as const;

export const noticeBarCloseDelayMs = 200;

export type NoticeBarDuration = keyof typeof noticeBarDurationClass | number | string;
export type NoticeBarRadiusKey = keyof typeof radiusObj | '';
export type NoticeBarRightAction = {
	closeDelayMs: number;
	shouldClose: boolean;
};
export type NoticeBarVisibilityState = {
	isShow: boolean;
	isShowClose: boolean;
};
export type NoticeBarCloseRequestAction = NoticeBarVisibilityState & {
	closeDelayMs: number;
	shouldScheduleClose: boolean;
};
export type NoticeBarRightIconKind = 'arrow' | 'close' | 'custom' | 'none';
export type NoticeBarRightIconState = {
	kind: NoticeBarRightIconKind;
};
export type NoticeBarLeftIconKind = 'child' | 'icon' | 'none' | 'volume';
export type NoticeBarLeftIconState<TIconProps = unknown> =
	| {
			kind: 'child' | 'none' | 'volume';
	  }
	| {
			iconProps: TIconProps;
			kind: 'icon';
	  };

export type ResolveNoticeBarRootClassOptions = {
	rightIcon?: unknown;
	isShow?: boolean;
	injClass?: string;
	radius?: NoticeBarRadiusKey;
};

export type ResolveNoticeBarNextLeftOptions = {
	left: number;
	speed: number;
	frameMs: number;
	boxWidth: number;
};
export type ResolveNoticeBarHorizontalStepActionOptions = {
	left: number;
	speed: number;
	time: number;
	startTime: number;
	boxWidth: number;
	firstFrameZero?: boolean;
};
export type NoticeBarHorizontalStepAction = {
	frameMs: number;
	nextStartTime: number;
	nextLeft: number;
};
export type ResolveNoticeBarAnimationSetupActionOptions = {
	boxWidth?: number;
	outBoxHeight?: number;
	outBoxWidth?: number;
	shouldAnimate?: boolean;
	space?: number;
	speed?: number;
	textList?: string[];
	vertical?: boolean;
};
export type NoticeBarAnimationSetupAction = {
	currentIndex: number;
	isTransition: boolean;
	left: number;
	newTextListState: string[] | null;
	outBoxHeight: number;
	outBoxWidth: number;
	shouldRun: boolean;
	shouldStartHorizontal: boolean;
	shouldStartVertical: boolean;
	shouldUseStaticText: boolean;
};
export type NoticeBarVerticalStepAction = {
	nextIndex: number;
	nextTransition: boolean;
	shouldScheduleReset: boolean;
	resetIndex: number;
	resetTransition: boolean;
};

export type NoticeBarHeightStyleValue = {
	height: string;
};

export type NoticeBarVerticalItemStyleValue = {
	top: string;
	width: string;
};

export type NoticeBarHorizontalTrackStyleValue = {
	left: string;
};

export type NoticeBarHorizontalItemStyleValue = {
	marginRight: string;
};

export type NoticeBarMeasuredRectLike =
	| {
			height?: number | null;
			width?: number | null;
	  }
	| null
	| undefined;

export type NoticeBarMeasuredRect = {
	height: number;
	width: number;
};

export type ResolveNoticeBarVerticalItemClassOptions = {
	isTransition?: boolean;
	duration?: NoticeBarDuration;
};
export type ResolveNoticeBarRightIconStateOptions = {
	hasCustomChild?: boolean;
	rightIcon?: unknown;
};
export type ResolveNoticeBarLeftIconStateOptions<TIconProps = unknown> = {
	hasCustomChild?: boolean;
	leftIcon?: TIconProps | 'volume' | null | false;
};

export type NoticeBarTextListValidation = {
	isEmpty: boolean;
	isInvalidType: boolean;
	shouldAnimate: boolean;
};

export type ResolveNoticeBarDerivedOptions<TIconProps = unknown> = ResolveNoticeBarRootClassOptions &
	ResolveNoticeBarRightIconStateOptions &
	ResolveNoticeBarLeftIconStateOptions<TIconProps> & {
		currentIndex?: number;
		duration?: NoticeBarDuration;
		hasLeftChild?: boolean;
		isTransition?: boolean;
		left?: number;
		newTextListState?: string[] | null;
		outBoxHeight?: number;
		outBoxWidth?: number;
		space?: number;
		textList?: string[];
	};

export type NoticeBarStatePropsLike<TIconProps = unknown> = Partial<
	Omit<
		ResolveNoticeBarDerivedOptions<TIconProps>,
		| 'currentIndex'
		| 'hasCustomChild'
		| 'hasLeftChild'
		| 'isShow'
		| 'isTransition'
		| 'left'
		| 'newTextListState'
		| 'outBoxHeight'
		| 'outBoxWidth'
	>
>;

export type ResolveNoticeBarStateOptionsParams<TIconProps = unknown> = {
	currentIndex?: number;
	hasCustomChild?: boolean;
	hasLeftChild?: boolean;
	isShow?: boolean;
	isTransition?: boolean;
	left?: number;
	newTextListState?: string[] | null;
	outBoxHeight?: number;
	outBoxWidth?: number;
	props: NoticeBarStatePropsLike<TIconProps>;
};

export type NoticeBarVerticalItemViewState = {
	index: number;
	text: string;
	className: string;
	style: NoticeBarVerticalItemStyleValue;
	styleString: string;
};

export type NoticeBarHorizontalItemViewState = {
	index: number;
	text: string;
	className: string;
	style: NoticeBarHorizontalItemStyleValue;
	styleString: string;
};

export type NoticeBarDerived<TIconProps = unknown> = {
	rootClass: string;
	horizontalItemClass: string;
	horizontalTrackClass: string;
	horizontalViewportClass: string;
	iconClass: string;
	arrowIconClass: string;
	leftIconClass: string;
	leftIconState: NoticeBarLeftIconState<TIconProps>;
	rightButtonClass: string;
	rightIconState: NoticeBarRightIconState;
	verticalInnerClass: string;
	verticalViewportClass: string;
	textListValidation: NoticeBarTextListValidation;
	textListVertical: string[];
	newTextList: string[];
	heightStyle: NoticeBarHeightStyleValue;
	heightStyleString: string;
	horizontalTrackStyle: NoticeBarHorizontalTrackStyleValue;
	horizontalTrackStyleString: string;
	verticalItems: NoticeBarVerticalItemViewState[];
	horizontalItems: NoticeBarHorizontalItemViewState[];
};

// 输入 NoticeBar 状态，返回框架无关的派生 class 和滚动数值。
// Resolve NoticeBar state into framework-agnostic classes and scroll values.
// 输入组件层测得的矩形，返回 NoticeBar 可复用的安全尺寸。
// Normalize a component-measured rect into reusable NoticeBar safe dimensions.
export const resolveNoticeBarMeasuredRect = (rect?: NoticeBarMeasuredRectLike): NoticeBarMeasuredRect => ({
	height: rect?.height ?? 0,
	width: rect?.width ?? 0
});

// 输入归一化后的测量尺寸，返回组件层是否需要同步尺寸状态。
// Receive normalized measured dimensions and return whether the component layer should sync size state.
export const resolveNoticeBarMeasuredRectVisible = ({ height = 0, width = 0 }: Partial<NoticeBarMeasuredRect> = {}): boolean =>
	Boolean(width || height);

export const resolveNoticeBarDurationClass = (duration: NoticeBarDuration = 500) =>
	noticeBarDurationClass[String(duration) as keyof typeof noticeBarDurationClass] || noticeBarDurationClass['500'];

export const resolveNoticeBarRadiusClass = (radius: NoticeBarRadiusKey = '') => (radius ? radiusObj[radius] : 'rounded-(--radius-box)');

export const resolveNoticeBarRootClass = (options: ResolveNoticeBarRootClassOptions = {}) => {
	const { rightIcon = 'close', isShow = true, injClass = '', radius = '' } = options;
	return joinClasses([
		'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark flex items-center justify-between text-sm p-2 transition-all duration-300',
		rightIcon ? 'pr-0' : 'pr-2',
		isShow ? '' : 'scale-0',
		injClass,
		resolveNoticeBarRadiusClass(radius)
	]);
};

export const resolveNoticeBarLeftIconClass = (leftIcon?: unknown) => (leftIcon ? 'mr-1' : '');

export const resolveNoticeBarRightButtonClass = (rightIcon?: unknown) => (rightIcon ? 'pl-2 pr-4' : '');

export const resolveNoticeBarVerticalViewportClass = () => 'grow h-5';

export const resolveNoticeBarVerticalInnerClass = () => 'relative overflow-hidden';

export const resolveNoticeBarHorizontalViewportClass = () => 'relative grow overflow-hidden h-5';

export const resolveNoticeBarHorizontalTrackClass = () => 'absolute whitespace-nowrap';

export const resolveNoticeBarHorizontalItemClass = () => 'inline-block';

export const resolveNoticeBarIconClass = (): string => 'mx-auto block';

export const resolveNoticeBarArrowIconClass = (): string => '';

// 输入左侧图标状态，返回组件层可渲染的无框架图标状态。
// Receive left-icon state and return framework-agnostic icon state for component rendering.
export const resolveNoticeBarLeftIconState = <TIconProps = unknown>({
	hasCustomChild = false,
	leftIcon = 'volume'
}: ResolveNoticeBarLeftIconStateOptions<TIconProps> = {}): NoticeBarLeftIconState<TIconProps> => {
	if (hasCustomChild) return { kind: 'child' };
	if (!leftIcon) return { kind: 'none' };
	if (leftIcon === 'volume') return { kind: 'volume' };
	if (typeof leftIcon === 'object') return { iconProps: leftIcon, kind: 'icon' };
	return { kind: 'none' };
};

// 输入右侧图标状态，返回组件层可渲染的无框架图标状态。
// Receive right-icon state and return framework-agnostic icon state for component rendering.
export const resolveNoticeBarRightIconState = ({
	hasCustomChild = false,
	rightIcon
}: ResolveNoticeBarRightIconStateOptions = {}): NoticeBarRightIconState => {
	if (hasCustomChild) return { kind: 'custom' };
	if (!rightIcon) return { kind: 'none' };
	if (rightIcon === 'close') return { kind: 'close' };
	if (rightIcon === 'arrow') return { kind: 'arrow' };
	return { kind: 'none' };
};

// 输入右侧图标状态，返回组件层可执行的无副作用操作结果。
// Receive right-icon state and return a side-effect-free action result for component execution.
export const resolveNoticeBarRightAction = (rightIcon?: unknown): NoticeBarRightAction => ({
	shouldClose: rightIcon === 'close',
	closeDelayMs: noticeBarCloseDelayMs
});

// 输入右侧点击状态，返回组件层可写入的可见性和延迟卸载决策。
// Receive right-click state and return visibility plus delayed-unmount decisions for the component layer.
export const resolveNoticeBarCloseRequestAction = (rightIcon?: unknown): NoticeBarCloseRequestAction => {
	const action = resolveNoticeBarRightAction(rightIcon);
	return {
		closeDelayMs: action.closeDelayMs,
		isShow: action.shouldClose ? false : true,
		isShowClose: true,
		shouldScheduleClose: action.shouldClose
	};
};

// 输入延迟关闭后的状态，返回组件层可写入的卸载可见性。
// Receive post-delay close state and return the unmount visibility that the component layer can write.
export const resolveNoticeBarCloseDelayState = (): NoticeBarVisibilityState => ({
	isShow: false,
	isShowClose: false
});

// 输入垂直滚动状态，返回框架无关的 item class。
// Resolve vertical scroll state into framework-agnostic item classes.
export const resolveNoticeBarVerticalItemClass = ({ isTransition = true, duration = 500 }: ResolveNoticeBarVerticalItemClassOptions = {}) =>
	joinClasses(['absolute truncate', isTransition ? 'transition-all' : 'transition-none', resolveNoticeBarDurationClass(duration).trim()]);

// 输入 NoticeBar 文本列表，返回框架无关的校验状态；日志和流程控制留在组件层。
// Resolve NoticeBar text list into framework-agnostic validation state; logging and flow control stay in the component layer.
export const resolveNoticeBarTextListValidation = (textList: unknown): NoticeBarTextListValidation => {
	const isArray = Array.isArray(textList);
	return {
		isInvalidType: !isArray,
		isEmpty: isArray && textList.length === 0,
		shouldAnimate: isArray && textList.length > 0
	};
};

export const resolveNoticeBarVerticalTextList = (textList: string[] = []) =>
	textList.length === 0 ? [] : [...textList, textList[0] as string];

export const resolveNoticeBarLoopTextList = (textList: string[] = [], stateList: string[] | null = null) =>
	stateList || (textList.length ? [...textList, ...textList] : []);

export const shouldUseNoticeBarStaticTextList = (options: { boxWidth: number; outBoxWidth: number; space: number }) => {
	const { boxWidth, outBoxWidth, space } = options;
	return boxWidth / 2 - space < outBoxWidth;
};

// 输入组件层测量值和配置，返回 NoticeBar 动画启动状态。
// Receive component-measured values and config, then return NoticeBar animation setup state.
export const resolveNoticeBarAnimationSetupAction = ({
	boxWidth = 0,
	outBoxHeight = 0,
	outBoxWidth = 0,
	shouldAnimate = false,
	space = 100,
	speed = 30,
	textList = [],
	vertical = false
}: ResolveNoticeBarAnimationSetupActionOptions = {}): NoticeBarAnimationSetupAction => {
	const shouldUseStaticText = shouldAnimate && !vertical && shouldUseNoticeBarStaticTextList({ boxWidth, outBoxWidth, space });
	const shouldRun = shouldAnimate && !shouldUseStaticText;
	return {
		currentIndex: 0,
		isTransition: true,
		left: shouldUseStaticText ? 0 : speed,
		newTextListState: shouldUseStaticText ? textList : null,
		outBoxHeight,
		outBoxWidth,
		shouldRun,
		shouldStartHorizontal: shouldRun && !vertical,
		shouldStartVertical: shouldRun && vertical && resolveNoticeBarVerticalTextList(textList).length > 1,
		shouldUseStaticText
	};
};

export const resolveNoticeBarNextLeft = (options: ResolveNoticeBarNextLeftOptions) => {
	const { left, speed, frameMs, boxWidth } = options;
	const nextLeft = left - (speed * frameMs) / 1000;
	return nextLeft < -boxWidth / 2 ? 0 : nextLeft;
};

// 输入横向滚动帧状态，返回下一帧偏移；动画帧调度保留在组件层。
// Receive horizontal scroll frame state and return the next offset; animation frame scheduling stays in the component.
export const resolveNoticeBarHorizontalStepAction = ({
	left,
	speed,
	time,
	startTime,
	boxWidth,
	firstFrameZero = false
}: ResolveNoticeBarHorizontalStepActionOptions): NoticeBarHorizontalStepAction => {
	const frameMs = firstFrameZero && startTime === 0 ? 0 : time - startTime;
	return {
		frameMs,
		nextStartTime: time,
		nextLeft: resolveNoticeBarNextLeft({ left, speed, frameMs, boxWidth })
	};
};

export const resolveNoticeBarNextVerticalIndex = (options: { currentIndex: number; textLength: number }) => {
	const { currentIndex, textLength } = options;
	const nextIndex = currentIndex + 1;
	return {
		nextIndex,
		shouldReset: nextIndex === textLength - 1
	};
};

// 输入垂直滚动状态，返回索引和重置动作描述；定时器由组件执行。
// Receive vertical scroll state and return index and reset action details; timers are executed by the component.
export const resolveNoticeBarVerticalStepAction = (options: { currentIndex: number; textLength: number }): NoticeBarVerticalStepAction => {
	const nextState = resolveNoticeBarNextVerticalIndex(options);
	return {
		nextIndex: nextState.nextIndex,
		nextTransition: true,
		shouldScheduleReset: nextState.shouldReset,
		resetIndex: 0,
		resetTransition: false
	};
};

export const resolveNoticeBarVerticalItemStyle = (options: {
	currentIndex: number;
	itemIndex: number;
	outBoxHeight: number;
	outBoxWidth: number;
}) => {
	const { currentIndex, itemIndex, outBoxHeight, outBoxWidth } = options;
	return {
		top: -(currentIndex - itemIndex) * outBoxHeight,
		width: outBoxWidth
	};
};

// 输入 NoticeBar 高度数值，返回组件层可直接绑定的高度样式。
// Convert NoticeBar height into bind-ready style values for the component layer.
export const resolveNoticeBarHeightStyleValue = (height = 0): NoticeBarHeightStyleValue => ({
	height: `${height}px`
});

export const resolveNoticeBarHeightStyleString = (height = 0) => `height:${height}px;`;

// 输入 NoticeBar 垂直滚动状态，返回组件层可直接绑定的 item 位置样式。
// Convert vertical NoticeBar state into bind-ready item position styles.
export const resolveNoticeBarVerticalItemStyleValue = (options: {
	currentIndex: number;
	itemIndex: number;
	outBoxHeight: number;
	outBoxWidth: number;
}): NoticeBarVerticalItemStyleValue => {
	const itemStyle = resolveNoticeBarVerticalItemStyle(options);
	return {
		top: `${itemStyle.top}px`,
		width: `${itemStyle.width}px`
	};
};

export const resolveNoticeBarVerticalItemStyleString = (options: {
	currentIndex: number;
	itemIndex: number;
	outBoxHeight: number;
	outBoxWidth: number;
}) => {
	const itemStyle = resolveNoticeBarVerticalItemStyle(options);
	return `top:${itemStyle.top}px;width:${itemStyle.width}px`;
};

// 输入 NoticeBar 横向滚动偏移，返回组件层可直接绑定的轨道样式。
// Convert horizontal NoticeBar offset into bind-ready track styles.
export const resolveNoticeBarHorizontalTrackStyleValue = (left = 0): NoticeBarHorizontalTrackStyleValue => ({
	left: `${left}px`
});

export const resolveNoticeBarHorizontalTrackStyleString = (left = 0) => `left:${left}px`;

// 输入 NoticeBar 横向 item 间距，返回组件层可直接绑定的间距样式。
// Convert horizontal NoticeBar spacing into bind-ready item spacing styles.
export const resolveNoticeBarHorizontalItemStyleValue = (space = 0): NoticeBarHorizontalItemStyleValue => ({
	marginRight: `${space}px`
});

export const resolveNoticeBarHorizontalItemStyleString = (space = 0) => `margin-right:${space}px`;

// 输入组件 props、滚动状态和插槽状态，返回框架无关的 NoticeBar 派生入参。
// Receive component props, scroll state and slot state, then return framework-agnostic NoticeBar derivation options.
export const resolveNoticeBarStateOptions = <TIconProps = unknown>({
	currentIndex,
	hasCustomChild,
	hasLeftChild,
	isShow,
	isTransition,
	left,
	newTextListState,
	outBoxHeight,
	outBoxWidth,
	props
}: ResolveNoticeBarStateOptionsParams<TIconProps>): ResolveNoticeBarDerivedOptions<TIconProps> => ({
	currentIndex,
	duration: props.duration,
	hasCustomChild,
	hasLeftChild,
	injClass: props.injClass,
	isShow,
	isTransition,
	left,
	leftIcon: props.leftIcon,
	newTextListState,
	outBoxHeight,
	outBoxWidth,
	radius: props.radius,
	rightIcon: props.rightIcon,
	space: props.space,
	textList: props.textList
});

// 输入 NoticeBar 组件状态，返回组件层可直接渲染的框架无关派生结果。
// Receive NoticeBar component state and return framework-agnostic derived results for component rendering.
export const resolveNoticeBarDerived = <TIconProps = unknown>({
	rightIcon = 'close',
	isShow = true,
	injClass = '',
	radius = '',
	hasCustomChild = false,
	hasLeftChild = false,
	leftIcon = 'volume',
	textList = [],
	newTextListState = null,
	currentIndex = 0,
	isTransition = true,
	duration = 500,
	outBoxHeight = 0,
	outBoxWidth = 0,
	left = 0,
	space = 0
}: ResolveNoticeBarDerivedOptions<TIconProps> = {}): NoticeBarDerived<TIconProps> => {
	const textListValidation = resolveNoticeBarTextListValidation(textList);
	const textListVertical = resolveNoticeBarVerticalTextList(textList);
	const newTextList = resolveNoticeBarLoopTextList(textList, newTextListState);

	return {
		rootClass: resolveNoticeBarRootClass({ rightIcon, isShow, injClass, radius }),
		horizontalItemClass: resolveNoticeBarHorizontalItemClass(),
		horizontalTrackClass: resolveNoticeBarHorizontalTrackClass(),
		horizontalViewportClass: resolveNoticeBarHorizontalViewportClass(),
		iconClass: resolveNoticeBarIconClass(),
		arrowIconClass: resolveNoticeBarArrowIconClass(),
		leftIconClass: resolveNoticeBarLeftIconClass(leftIcon),
		leftIconState: resolveNoticeBarLeftIconState({ hasCustomChild: hasLeftChild, leftIcon }),
		rightButtonClass: resolveNoticeBarRightButtonClass(rightIcon),
		rightIconState: resolveNoticeBarRightIconState({ hasCustomChild, rightIcon }),
		verticalInnerClass: resolveNoticeBarVerticalInnerClass(),
		verticalViewportClass: resolveNoticeBarVerticalViewportClass(),
		textListValidation,
		textListVertical,
		newTextList,
		heightStyle: resolveNoticeBarHeightStyleValue(outBoxHeight),
		heightStyleString: resolveNoticeBarHeightStyleString(outBoxHeight),
		horizontalTrackStyle: resolveNoticeBarHorizontalTrackStyleValue(left),
		horizontalTrackStyleString: resolveNoticeBarHorizontalTrackStyleString(left),
		verticalItems: textListVertical.map((text, index) => ({
			index,
			text,
			className: resolveNoticeBarVerticalItemClass({ isTransition, duration }),
			style: resolveNoticeBarVerticalItemStyleValue({ currentIndex, itemIndex: index, outBoxHeight, outBoxWidth }),
			styleString: resolveNoticeBarVerticalItemStyleString({ currentIndex, itemIndex: index, outBoxHeight, outBoxWidth })
		})),
		horizontalItems: newTextList.map((text, index) => ({
			index,
			text,
			className: resolveNoticeBarHorizontalItemClass(),
			style: resolveNoticeBarHorizontalItemStyleValue(space),
			styleString: resolveNoticeBarHorizontalItemStyleString(space)
		}))
	};
};
