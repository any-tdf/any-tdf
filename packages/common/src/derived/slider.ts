import { stepNumberFun } from '../utils/index.js';
import { radiusObj } from './common.js';

export type SliderMoveTarget = 'none' | 'one' | 'start' | 'end';
export type SliderStepLabel = string | number;
export type SliderRadiusKey = keyof typeof radiusObj | '';

export const sliderStepMarkerSize = 8;
export const sliderGap = 2;

// 输入外部 Slider 单值，返回组件内部可写入的初始单值。
// Normalize an external Slider value into an internal writable initial single value.
export const resolveSliderInitialValue = (value?: number | null, defaultValue = 40): number => value ?? defaultValue;

// 输入外部 Slider 起始值，返回组件内部可写入的初始起始值。
// Normalize an external Slider start value into an internal writable initial start value.
export const resolveSliderInitialStartValue = (value?: number | null, defaultValue = 20): number => value ?? defaultValue;

// 输入外部 Slider 结束值，返回组件内部可写入的初始结束值。
// Normalize an external Slider end value into an internal writable initial end value.
export const resolveSliderInitialEndValue = (value?: number | null, defaultValue = 60): number => value ?? defaultValue;

export type ResolveSliderRangeOptions = {
	minRange?: number;
	maxRange?: number;
	step?: number;
};

export type ResolveSliderPositionOptions = ResolveSliderRangeOptions & {
	value: number;
	lineWidth: number;
};

export type ResolveSliderValueOptions = ResolveSliderRangeOptions & {
	position: number;
	lineWidth: number;
	includeMinRange?: boolean;
};

export type ResolveSliderStepLabelOptions = ResolveSliderRangeOptions & {
	value: number;
	stepLabels?: SliderStepLabel[];
};

export type ResolveSliderChangePayloadOptions = ResolveSliderRangeOptions & {
	value: number;
	valueRange?: [number, number];
	stepLabels?: SliderStepLabel[];
};

export type SliderChangePayload = {
	value: number;
	valueRange?: [number, number];
	label?: SliderStepLabel;
	labelRange?: [SliderStepLabel, SliderStepLabel];
};

export type ResolveSliderSingleStartOptions = ResolveSliderRangeOptions & {
	clientX: number;
	lineStartX: number;
	lineWidth: number;
	includeMinRange?: boolean;
};

export type ResolveSliderSingleMoveOptions = ResolveSliderRangeOptions & {
	clientX: number;
	lineStartX: number;
	lineEndX: number;
	lineWidth: number;
};

export type ResolveSliderRangeStartOptions = ResolveSliderRangeOptions & {
	clientX: number;
	lineStartX: number;
	lineWidth: number;
	currentStartX: number;
	currentEndX: number;
	startValue: number;
	endValue: number;
};

export type ResolveSliderRangeMoveOptions = ResolveSliderRangeOptions & {
	clientX: number;
	lineStartX: number;
	lineEndX: number;
	lineWidth: number;
	blockWidth: number;
	currentMove: SliderMoveTarget;
	currentStartX: number;
	currentEndX: number;
};

export type ResolveSliderEndPositionOptions = ResolveSliderRangeOptions & {
	isRange?: boolean;
	lineWidth: number;
	value: number;
	startValue: number;
	endValue: number;
};

export type ResolveSliderPositionSyncActionOptions = ResolveSliderRangeOptions & {
	isDown?: boolean;
	lineWidth: number;
	value: number;
	startValue: number;
	endValue: number;
};

export type SliderPositionSyncAction = {
	currentEndX: number;
	currentStartX: number;
	currentX: number;
	shouldSync: boolean;
};

export type SliderRectLike = {
	left: number;
	right: number;
	width: number;
};

export type ResolveSliderMeasuredLayoutStateOptions = ResolveSliderRangeOptions & {
	blockWidth?: number;
	isRange?: boolean;
	lineRect: SliderRectLike;
	value: number;
	startValue: number;
	endValue: number;
};

export type ResolveSliderMeasuredBlockWidthOptions = {
	fallbackWidth?: number;
	isRange?: boolean;
	measuredWidth?: number | null;
};

export type SliderMeasuredLayoutState = {
	blockWidth: number;
	currentEndX: number;
	currentStartX: number;
	currentX: number;
	lineEndX: number;
	lineStartX: number;
	lineWidth: number;
};

export type ResolveSliderSegmentOptions = {
	segmentStart: number;
	segmentEnd: number;
	progressPercent: number;
	rangeStartPercent?: number;
	rangeEndPercent?: number;
};

export type ResolveSliderTrackOptions = {
	currentX: number;
	currentStartX?: number;
	currentEndX?: number;
	sliderSize: number;
	sliderGap?: number;
};

export type ResolveSliderAbsoluteStepMarkerStyleOptions = {
	position: number;
	size?: number;
};

export type SliderBreakStepMarkerStyleValue = {
	flexShrink: number;
	height: number;
	width: number;
};

export type SliderAbsoluteStepMarkerStyleValue = {
	height: number;
	left: string;
	width: number;
};

export type SliderSegmentStyleValue = {
	left?: string;
	width: string;
};

export type SliderVisibleSegmentStyleValue = {
	style: SliderSegmentStyleValue;
	visible: boolean;
};

export type SliderVisibleSegmentStyleString = {
	style: string;
	visible: boolean;
};

export type SliderTrackStyleValue = {
	transform?: string;
	width: string;
};

export type SliderTransformStyleValue = {
	transform: string;
};

export type SliderTipTransitionParams = {
	duration: number;
	y: number;
};

export type ResolveSliderBlockTransformStyleOptions = {
	position?: number;
};

export type ResolveSliderPointerStartActionOptions = {
	disabled?: boolean;
	readonly?: boolean;
};

export type SliderPointerStartAction = {
	shouldStart: boolean;
};

export type ResolveSliderPointerMoveActionOptions = ResolveSliderPointerStartActionOptions & {
	isDown?: boolean;
};

export type SliderPointerMoveAction = {
	shouldMove: boolean;
};

export type SliderBreakStepItemState = {
	active: boolean;
	index: number;
	position: number;
	showSegment: boolean;
	markerClass: string;
	markerStyle: SliderBreakStepMarkerStyleValue;
	markerStyleString: string;
	segmentClass: string;
	progressMarkerClass: string;
	progressSegmentClass: string;
	rangeSegmentVisible: boolean;
	rangeSegmentStyle: SliderSegmentStyleValue;
	rangeSegmentStyleString: string;
	progressSegmentStyle: SliderSegmentStyleValue;
	progressSegmentStyleString: string;
};

export type SliderContinuousStepItemState = {
	active: boolean;
	activeClass: string;
	index: number;
	position: number;
	markerClass: string;
	markerStyle: SliderAbsoluteStepMarkerStyleValue;
	markerStyleString: string;
};

export type SliderTipState = {
	anchorClass: string;
	arrowClass: string;
	bubbleClass: string;
	label: SliderStepLabel;
	positionedClass: string;
	visible: boolean;
};

export type ResolveSliderDerivedOptions = ResolveSliderRangeOptions & {
	currentMove?: SliderMoveTarget;
	currentStartX?: number;
	currentEndX?: number;
	currentX?: number;
	disabled?: boolean;
	endValue?: number;
	isDown?: boolean;
	isRange?: boolean;
	lineBlock?: boolean;
	radius?: SliderRadiusKey;
	showSteps?: boolean;
	showTip?: 'always' | 'touch' | 'never';
	startValue?: number;
	stepLabels?: SliderStepLabel[];
	stepsStyle?: 'block' | 'break';
	value?: number;
};
export type SliderStatePropsLike = Partial<
	Omit<
		ResolveSliderDerivedOptions,
		'currentEndX' | 'currentMove' | 'currentStartX' | 'currentX' | 'isDown' | 'value' | 'startValue' | 'endValue'
	>
>;
export type ResolveSliderStateOptionsParams = {
	currentEndX?: number;
	currentMove?: SliderMoveTarget;
	currentStartX?: number;
	currentX?: number;
	endValue?: number;
	isDown?: boolean;
	props: SliderStatePropsLike;
	startValue?: number;
	value?: number;
};

export type SliderDerived = {
	activeStepMarkerClass: string;
	blockClass: string;
	blockLayerClass: string;
	breakMarkerClass: string;
	breakProgressOverlayClass: string;
	breakProgressSegmentClass: string;
	breakRootClass: string;
	breakSegmentClass: string;
	breakStepItems: SliderBreakStepItemState[];
	continuousStepItems: SliderContinuousStepItemState[];
	continuousTrackClass: string;
	progressClass: string;
	progressPercent: number;
	lineClass: string;
	rangeEndPercent: number;
	rangeStartPercent: number;
	rangeTrackStyle: SliderTrackStyleValue;
	rangeTrackStyleString: string;
	rootClass: string;
	segmentProgressClass: string;
	segmentRangeClass: string;
	showBreakSteps: boolean;
	showContinuousSteps: boolean;
	singleTrackStyle: SliderTrackStyleValue;
	singleTrackStyleString: string;
	sliderSize: number;
	startBlockStyle: SliderTransformStyleValue;
	startBlockStyleString: string;
	endBlockStyle: SliderTransformStyleValue;
	endBlockStyleString: string;
	singleBlockStyle: SliderTransformStyleValue;
	singleBlockStyleString: string;
	stepMarkerClass: string;
	stepMarkerSize: number;
	stepPositions: number[];
	tipInParams: SliderTipTransitionParams;
	tipOutParams: SliderTipTransitionParams;
	tips: {
		start: SliderTipState;
		end: SliderTipState;
		single: SliderTipState;
	};
	trackClass: string;
};

// 输入组件 props、当前值和拖动状态，返回 Slider 派生层统一入参。
// Receive component props, current values and drag state, then return normalized Slider derivation options.
export const resolveSliderStateOptions = ({
	currentEndX,
	currentMove,
	currentStartX,
	currentX,
	endValue,
	isDown,
	props,
	startValue,
	value
}: ResolveSliderStateOptionsParams): ResolveSliderDerivedOptions => ({
	value,
	startValue,
	endValue,
	minRange: props.minRange,
	maxRange: props.maxRange,
	step: props.step,
	stepLabels: props.stepLabels,
	isRange: props.isRange,
	showTip: props.showTip,
	showSteps: props.showSteps,
	stepsStyle: props.stepsStyle,
	radius: props.radius,
	lineBlock: props.lineBlock,
	disabled: props.disabled,
	isDown,
	currentMove,
	currentX,
	currentStartX,
	currentEndX
});

const resolveRangeSize = (minRange = 0, maxRange = 100) => maxRange - minRange;

// 输入 Slider 的 props 和内部数值状态，返回框架无关的派生计算结果。
// Resolve Slider props and numeric state into framework-agnostic derived values.
export const resolveSliderStepCount = (options: ResolveSliderRangeOptions = {}) => {
	const { minRange = 0, maxRange = 100, step = 1 } = options;
	return Math.floor(resolveRangeSize(minRange, maxRange) / step) + 1;
};

export const resolveSliderStepPositions = (options: ResolveSliderRangeOptions = {}) => {
	const { minRange = 0, maxRange = 100, step = 1 } = options;
	const stepCount = resolveSliderStepCount(options);
	const rangeSize = resolveRangeSize(minRange, maxRange);
	return Array.from({ length: stepCount }, (_, index) => ((index * step) / rangeSize) * 100);
};

export const resolveSliderStepLabel = (options: ResolveSliderStepLabelOptions) => {
	const { value, minRange = 0, step = 1, stepLabels = [] } = options;
	if (stepLabels.length === 0) return value;
	const index = Math.round((value - minRange) / step);
	return stepLabels[index] ?? value;
};

// 输入 Slider 当前值，返回事件层可直接透传的纯数据。
// Convert Slider values into plain payload data that event layers can pass through.
export const resolveSliderChangePayload = (options: ResolveSliderChangePayloadOptions): SliderChangePayload => {
	const { value, valueRange, minRange = 0, step = 1, stepLabels = [] } = options;
	if (valueRange) {
		return {
			value: 0,
			valueRange,
			labelRange: [
				resolveSliderStepLabel({ value: valueRange[0], minRange, step, stepLabels }),
				resolveSliderStepLabel({ value: valueRange[1], minRange, step, stepLabels })
			]
		};
	}

	return {
		value,
		label: resolveSliderStepLabel({ value, minRange, step, stepLabels })
	};
};

export const resolveSliderValuePercent = (options: ResolveSliderRangeOptions & { value: number }) => {
	const { value, minRange = 0, maxRange = 100 } = options;
	return ((value - minRange) / resolveRangeSize(minRange, maxRange)) * 100;
};

export const resolveSliderPositionFromValue = (options: ResolveSliderPositionOptions) => {
	const { value, minRange = 0, maxRange = 100, lineWidth } = options;
	return ((value - minRange) / resolveRangeSize(minRange, maxRange)) * lineWidth;
};

export const resolveSliderValueFromPosition = (options: ResolveSliderValueOptions) => {
	const { position, lineWidth, minRange = 0, maxRange = 100, step = 1, includeMinRange = true } = options;
	const rawValue = (position / lineWidth) * resolveRangeSize(minRange, maxRange);
	return stepNumberFun(includeMinRange ? minRange + rawValue : rawValue, step);
};

export const resolveSliderSize = (lineBlock = false) => (lineBlock ? 24 : 20);

export const resolveSliderProgressClass = (radius: SliderRadiusKey = '') => (radius ? radiusObj[radius] : 'rounded-(--radius-small)');

export const resolveSliderRootClass = (disabled = false) => `flex h-7 px-2.5${disabled ? ' opacity-50' : ''}`;

const withSliderProgressClass = (baseClass: string, progressClass = '') => [baseClass, progressClass].filter(Boolean).join(' ');

// 输入 Slider 结构状态，返回组件实现可复用的框架无关 class。
// Receive Slider structure state and return framework-agnostic classes for component implementations.
export const resolveSliderLineClass = (): string => 'relative flex flex-1 cursor-move touch-none flex-col justify-center';

export const resolveSliderBreakRootClass = (): string => 'relative flex h-1 w-full items-center justify-between';

export const resolveSliderBreakProgressOverlayClass = (): string =>
	'pointer-events-none absolute inset-0 flex items-center justify-between';

export const resolveSliderBreakMarkerClass = (progressClass = ''): string =>
	withSliderProgressClass('z-10 bg-text-primary/20 dark:bg-text-dark/30', progressClass);

export const resolveSliderBreakSegmentClass = (progressClass = ''): string =>
	withSliderProgressClass('relative mx-0.5 h-1 flex-1 bg-text-primary/10 dark:bg-text-dark/20', progressClass);

export const resolveSliderBreakProgressMarkerClass = (options: {
	isRange?: boolean;
	position: number;
	progressClass?: string;
	progressPercent: number;
	rangeEndPercent?: number;
	rangeStartPercent?: number;
}): string => withSliderProgressClass(withSliderProgressClass('z-20', options.progressClass), resolveSliderStepActiveBgClass(options));

export const resolveSliderBreakProgressSegmentClass = (progressClass = ''): string =>
	withSliderProgressClass('relative mx-0.5 h-1 flex-1 overflow-hidden', progressClass);

export const resolveSliderSegmentRangeClass = (progressClass = ''): string =>
	withSliderProgressClass('absolute h-full bg-primary dark:bg-dark', progressClass);

export const resolveSliderSegmentProgressClass = (progressClass = ''): string =>
	withSliderProgressClass('h-full bg-primary dark:bg-dark', progressClass);

export const resolveSliderContinuousTrackClass = (progressClass = ''): string =>
	withSliderProgressClass('relative h-1 w-full bg-text-primary/10 dark:bg-text-dark/20', progressClass);

export const resolveSliderStepMarkerClass = (progressClass = ''): string =>
	withSliderProgressClass('absolute top-1/2 -translate-y-1/2 bg-text-primary/20 dark:bg-text-dark/30', progressClass);

export const resolveSliderActiveStepMarkerClass = (progressClass = ''): string =>
	withSliderProgressClass('absolute top-1/2 -translate-y-1/2 bg-primary dark:bg-dark', progressClass);

export const resolveSliderTrackClass = (progressClass = ''): string =>
	withSliderProgressClass('h-1 bg-primary dark:bg-dark', progressClass);

export const resolveSliderBlockLayerClass = (): string => 'pointer-events-none absolute inset-0 flex h-7 flex-col justify-center';

// 输入 Slider 指针开始状态，返回组件层是否应进入拖拽计算。
// Resolve Slider pointer-start state into whether the component layer should enter drag math.
export const resolveSliderPointerStartAction = ({
	disabled = false,
	readonly = false
}: ResolveSliderPointerStartActionOptions = {}): SliderPointerStartAction => ({
	shouldStart: !disabled && !readonly
});

// 输入 Slider 指针移动状态，返回组件层是否应继续拖拽计算。
// Resolve Slider pointer-move state into whether the component layer should continue drag math.
export const resolveSliderPointerMoveAction = ({
	disabled = false,
	readonly = false,
	isDown = false
}: ResolveSliderPointerMoveActionOptions = {}): SliderPointerMoveAction => ({
	shouldMove: !disabled && !readonly && isDown
});

// 输入档位进度状态，返回框架无关的 active 背景 class。
// Resolve step progress state into framework-agnostic active background classes.
export const resolveSliderStepActiveBgClass = (options: {
	position: number;
	progressPercent: number;
	rangeStartPercent?: number;
	rangeEndPercent?: number;
	isRange?: boolean;
}) => (resolveSliderStepActive(options) ? 'bg-primary dark:bg-dark' : 'bg-transparent');

export const resolveSliderBlockClass = (options: { lineBlock?: boolean; radius?: SliderRadiusKey; isDown?: boolean } = {}) => {
	const { lineBlock = false, radius = '', isDown = false } = options;
	const baseClass = lineBlock
		? 'border-primary dark:border-dark h-6 w-6 border bg-bg-base dark:bg-bg-base-dark'
		: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4';
	const transitionClass = isDown ? '' : ' transition-transform duration-300 ease-out';
	return `${baseClass} ${resolveSliderProgressClass(radius)}${transitionClass}`;
};

export const resolveSliderTipClass = (radius: SliderRadiusKey = '') =>
	`whitespace-nowrap bg-text-primary/90 py-1 text-xs text-text-dark dark:bg-text-dark dark:text-text-primary px-2${radius === 'none' ? ' rounded-none' : ' rounded-sm'}`;

// 输入 Slider 提示气泡状态，返回组件层可直接绑定的定位与箭头 class。
// Resolve Slider tip state into positioning and arrow classes for component binding.
export const resolveSliderTipAnchorClass = () => 'absolute -top-9 left-1/2';

export const resolveSliderTipBubbleClass = (radius: SliderRadiusKey = '') => `${resolveSliderTipClass(radius)} -translate-x-1/2`;

export const resolveSliderPositionedTipClass = (radius: SliderRadiusKey = '') =>
	`absolute -top-9 left-1/2 ${resolveSliderTipBubbleClass(radius)}`;

export const resolveSliderTipArrowClass = () =>
	'absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-t-4 border-transparent border-t-text-primary/90 dark:border-t-text-dark';

export const resolveSliderTipVisible = (options: {
	showTip?: 'always' | 'touch' | 'never';
	currentMove: SliderMoveTarget;
	target: SliderMoveTarget;
}) => {
	const { showTip = 'touch', currentMove, target } = options;
	return showTip === 'always' || (currentMove === target && showTip !== 'never');
};

// 输入 Slider 提示气泡状态，返回框架无关的过渡参数。
// Resolve Slider tip state into framework-agnostic transition params.
export const resolveSliderTipInParams = (): SliderTipTransitionParams => ({
	y: 8,
	duration: 500
});

export const resolveSliderTipOutParams = (): SliderTipTransitionParams => ({
	y: 8,
	duration: 300
});

export const resolveSliderSingleStartState = (options: ResolveSliderSingleStartOptions) => {
	const { clientX, lineStartX, lineWidth, minRange = 0, maxRange = 100, step = 1, includeMinRange = false } = options;
	const currentX = clientX - lineStartX;
	return {
		currentMove: 'one' as const,
		currentX,
		value: resolveSliderValueFromPosition({ position: currentX, lineWidth, minRange, maxRange, step, includeMinRange })
	};
};

export const resolveSliderSingleMoveState = (options: ResolveSliderSingleMoveOptions) => {
	const { clientX, lineStartX, lineEndX, lineWidth, minRange = 0, maxRange = 100, step = 1 } = options;
	const currentX = clientX <= lineStartX ? 0 : clientX >= lineEndX ? lineEndX - lineStartX : clientX - lineStartX;
	return {
		currentX,
		value: resolveSliderValueFromPosition({ position: currentX, lineWidth, minRange, maxRange, step })
	};
};

export const resolveSliderRangeValues = (
	options: ResolveSliderRangeOptions & { currentStartX: number; currentEndX: number; lineWidth: number }
) => {
	const { currentStartX, currentEndX, lineWidth, minRange = 0, maxRange = 100, step = 1 } = options;
	return {
		startValue: resolveSliderValueFromPosition({ position: currentStartX, lineWidth, minRange, maxRange, step }),
		endValue: resolveSliderValueFromPosition({ position: currentEndX, lineWidth, minRange, maxRange, step })
	};
};

export const resolveSliderRangeStartState = (options: ResolveSliderRangeStartOptions) => {
	const {
		clientX,
		lineStartX,
		lineWidth,
		currentStartX,
		currentEndX,
		startValue,
		endValue,
		minRange = 0,
		maxRange = 100,
		step = 1
	} = options;
	const pointerX = clientX - lineStartX;
	const moveStart =
		startValue === endValue
			? pointerX <= currentStartX
			: Math.abs(clientX - currentStartX - lineStartX) < Math.abs(clientX - currentEndX - lineStartX);
	const nextStartX = moveStart ? pointerX : currentStartX;
	const nextEndX = moveStart ? currentEndX : pointerX;
	const values = resolveSliderRangeValues({ currentStartX: nextStartX, currentEndX: nextEndX, lineWidth, minRange, maxRange, step });

	return {
		currentMove: moveStart ? ('start' as const) : ('end' as const),
		currentStartX: nextStartX,
		currentEndX: nextEndX,
		...values
	};
};

export const resolveSliderRangeMoveState = (options: ResolveSliderRangeMoveOptions) => {
	const {
		clientX,
		lineStartX,
		lineEndX,
		lineWidth,
		blockWidth,
		currentMove,
		currentStartX,
		currentEndX,
		minRange = 0,
		maxRange = 100,
		step = 1
	} = options;
	let nextStartX = currentStartX;
	let nextEndX = currentEndX;

	if (currentMove === 'start') {
		if (clientX <= lineStartX) {
			nextStartX = 0;
		} else if (clientX >= currentEndX + blockWidth / 2) {
			nextStartX = currentEndX;
		} else {
			nextStartX = clientX - lineStartX;
		}
	} else if (clientX <= currentStartX + blockWidth / 2) {
		nextEndX = currentStartX;
	} else if (clientX >= lineEndX) {
		nextEndX = lineEndX - lineStartX;
	} else {
		nextEndX = clientX - lineStartX;
		nextEndX = nextEndX < currentStartX ? currentStartX : nextEndX;
	}

	const values = resolveSliderRangeValues({ currentStartX: nextStartX, currentEndX: nextEndX, lineWidth, minRange, maxRange, step });
	return {
		currentStartX: nextStartX,
		currentEndX: nextEndX,
		...values
	};
};

export const resolveSliderEndPositions = (options: ResolveSliderEndPositionOptions) => {
	const { isRange = false, lineWidth, value, startValue, endValue, minRange = 0, maxRange = 100 } = options;
	return {
		currentX: isRange ? undefined : resolveSliderPositionFromValue({ value, minRange, maxRange, lineWidth }),
		currentStartX: isRange ? resolveSliderPositionFromValue({ value: startValue, minRange, maxRange, lineWidth }) : undefined,
		currentEndX: isRange ? resolveSliderPositionFromValue({ value: endValue, minRange, maxRange, lineWidth }) : undefined,
		currentMove: 'none' as const,
		isDown: false
	};
};

// 输入 Slider 当前值和拖拽状态，返回组件层是否需要同步滑块位置。
// Receive Slider values and drag state, then tell the component layer whether positions should sync.
export const resolveSliderPositionSyncAction = ({
	isDown = false,
	lineWidth,
	value,
	startValue,
	endValue,
	minRange = 0,
	maxRange = 100
}: ResolveSliderPositionSyncActionOptions): SliderPositionSyncAction => ({
	currentX: resolveSliderPositionFromValue({ value, minRange, maxRange, lineWidth }),
	currentStartX: resolveSliderPositionFromValue({ value: startValue, minRange, maxRange, lineWidth }),
	currentEndX: resolveSliderPositionFromValue({ value: endValue, minRange, maxRange, lineWidth }),
	shouldSync: !isDown
});

// 输入组件层测量到的滑块宽度，返回区间模式定位可使用的宽度。
// Normalize component-measured slider block width into the size used by range positioning.
export const resolveSliderMeasuredBlockWidth = ({
	fallbackWidth = 0,
	isRange = false,
	measuredWidth
}: ResolveSliderMeasuredBlockWidthOptions = {}): number => {
	if (!isRange) return 0;
	return measuredWidth ?? fallbackWidth;
};

// 输入组件层测量到的 Slider 几何数据，返回无框架的位置状态。
// Receive component-measured Slider geometry and return framework-agnostic position state.
export const resolveSliderMeasuredLayoutState = ({
	blockWidth = 0,
	isRange = false,
	lineRect,
	value,
	startValue,
	endValue,
	minRange = 0,
	maxRange = 100
}: ResolveSliderMeasuredLayoutStateOptions): SliderMeasuredLayoutState => ({
	blockWidth: isRange ? blockWidth : 0,
	currentX: resolveSliderPositionFromValue({ value, minRange, maxRange, lineWidth: lineRect.width }),
	currentStartX: resolveSliderPositionFromValue({ value: startValue, minRange, maxRange, lineWidth: lineRect.width }),
	currentEndX: resolveSliderPositionFromValue({ value: endValue, minRange, maxRange, lineWidth: lineRect.width }),
	lineEndX: lineRect.right,
	lineStartX: lineRect.left,
	lineWidth: lineRect.width
});

export const resolveSliderSegmentRangeStyle = (options: ResolveSliderSegmentOptions) => {
	const { segmentStart, segmentEnd, rangeStartPercent = 0, rangeEndPercent = 0 } = options;
	const segmentRangeStart = Math.max(0, ((rangeStartPercent - segmentStart) / (segmentEnd - segmentStart)) * 100);
	const segmentRangeEnd = Math.min(100, ((rangeEndPercent - segmentStart) / (segmentEnd - segmentStart)) * 100);
	return {
		visible: segmentRangeEnd > 0 && segmentRangeStart < 100,
		left: Math.max(0, segmentRangeStart),
		width: Math.max(0, segmentRangeEnd - segmentRangeStart)
	};
};

export const resolveSliderSegmentProgressWidth = (options: ResolveSliderSegmentOptions) => {
	const { segmentStart, segmentEnd, progressPercent } = options;
	return Math.min(100, Math.max(0, ((progressPercent - segmentStart) / (segmentEnd - segmentStart)) * 100));
};

// 输入 Slider 档位线段状态，返回组件层可直接绑定的百分比样式。
// Resolve Slider segment state into percentage styles for component binding.
export const resolveSliderSegmentRangeStyleValue = (options: ResolveSliderSegmentOptions): SliderVisibleSegmentStyleValue => {
	const segment = resolveSliderSegmentRangeStyle(options);
	return {
		visible: segment.visible,
		style: {
			left: `${segment.left}%`,
			width: `${segment.width}%`
		}
	};
};

export const resolveSliderSegmentRangeStyleString = (options: ResolveSliderSegmentOptions): SliderVisibleSegmentStyleString => {
	const segment = resolveSliderSegmentRangeStyle(options);
	return {
		visible: segment.visible,
		style: `left: ${segment.left}%; width: ${segment.width}%;`
	};
};

export const resolveSliderSegmentProgressStyleValue = (options: ResolveSliderSegmentOptions): SliderSegmentStyleValue => ({
	width: `${resolveSliderSegmentProgressWidth(options)}%`
});

export const resolveSliderSegmentProgressStyleString = (options: ResolveSliderSegmentOptions): string =>
	`width: ${resolveSliderSegmentProgressWidth(options)}%;`;

// 输入档位尺寸，返回 break 模式下组件层可直接绑定的标记 style。
// Receive step marker size and return marker style for break mode in the component layer.
export const resolveSliderBreakStepMarkerStyleValue = (size = sliderStepMarkerSize): SliderBreakStepMarkerStyleValue => ({
	flexShrink: 0,
	height: size,
	width: size
});

export const resolveSliderBreakStepMarkerStyleString = (size = sliderStepMarkerSize): string =>
	`width: ${size}px; height: ${size}px; flex-shrink: 0;`;

// 输入档位位置和尺寸，返回普通模式下组件层可直接绑定的绝对定位 style。
// Receive step position and size, then return absolute marker style for the component layer.
export const resolveSliderAbsoluteStepMarkerStyleValue = ({
	position,
	size = sliderStepMarkerSize
}: ResolveSliderAbsoluteStepMarkerStyleOptions): SliderAbsoluteStepMarkerStyleValue => ({
	height: size,
	left: `calc(${position}% - ${size / 2}px)`,
	width: size
});

export const resolveSliderAbsoluteStepMarkerStyleString = ({
	position,
	size = sliderStepMarkerSize
}: ResolveSliderAbsoluteStepMarkerStyleOptions): string => `left: calc(${position}% - ${size / 2}px); width: ${size}px; height: ${size}px;`;

export const resolveSliderRangeTrackStyle = (options: ResolveSliderTrackOptions) => {
	const { currentStartX = 0, currentEndX = 0, sliderSize, sliderGap: gap = sliderGap } = options;
	const start = currentStartX + sliderSize / 2 + gap;
	const end = currentEndX - sliderSize / 2 - gap;
	return {
		start,
		width: Math.max(0, end - start)
	};
};

// 输入 Slider 轨道数值，返回组件层可直接绑定的位移和宽度样式。
// Resolve Slider track numbers into transform and width styles for component binding.
export const resolveSliderRangeTrackStyleValue = (options: ResolveSliderTrackOptions): SliderTrackStyleValue => {
	const track = resolveSliderRangeTrackStyle(options);
	return {
		width: `${track.width}px`,
		transform: `translateX(${track.start}px)`
	};
};

export const resolveSliderRangeTrackStyleString = (options: ResolveSliderTrackOptions): string => {
	const style = resolveSliderRangeTrackStyleValue(options);
	return `width:${style.width};transform: ${style.transform};`;
};

export const resolveSliderSingleTrackWidth = (options: ResolveSliderTrackOptions) => {
	const { currentX, sliderSize, sliderGap: gap = sliderGap } = options;
	return Math.max(0, currentX - sliderSize / 2 - gap);
};

export const resolveSliderSingleTrackStyleValue = (options: ResolveSliderTrackOptions): SliderTrackStyleValue => ({
	width: `${resolveSliderSingleTrackWidth(options)}px`
});

export const resolveSliderSingleTrackStyleString = (options: ResolveSliderTrackOptions): string =>
	`width:${resolveSliderSingleTrackWidth(options)}px`;

export const resolveSliderBlockTransformStyleValue = ({
	position = 0
}: ResolveSliderBlockTransformStyleOptions = {}): SliderTransformStyleValue => ({
	transform: `translateX(calc(${position}px - 50%))`
});

export const resolveSliderBlockTransformStyleString = (options: ResolveSliderBlockTransformStyleOptions = {}): string =>
	`transform: ${resolveSliderBlockTransformStyleValue(options).transform};`;

export const resolveSliderStepActive = (options: {
	position: number;
	progressPercent: number;
	rangeStartPercent?: number;
	rangeEndPercent?: number;
	isRange?: boolean;
}) => {
	const { position, progressPercent, rangeStartPercent = 0, rangeEndPercent = 0, isRange = false } = options;
	return isRange ? position >= rangeStartPercent && position <= rangeEndPercent : position <= progressPercent;
};

// 输入 Slider 属性和位置状态，返回框架无关的渲染派生结果。
// Receive Slider props and position state, then return framework-agnostic render state.
export const resolveSliderDerived = ({
	currentMove = 'none',
	currentStartX = 0,
	currentEndX = 0,
	currentX = 0,
	disabled = false,
	endValue = 60,
	isDown = false,
	isRange = false,
	lineBlock = false,
	maxRange = 100,
	minRange = 0,
	radius = '',
	showSteps = false,
	showTip = 'touch',
	startValue = 20,
	step = 1,
	stepLabels = [],
	stepsStyle = 'block',
	value = 40
}: ResolveSliderDerivedOptions = {}): SliderDerived => {
	const sliderSize = resolveSliderSize(lineBlock);
	const stepMarkerSize = sliderStepMarkerSize;
	const stepPositions = resolveSliderStepPositions({ minRange, maxRange, step });
	const progressClass = resolveSliderProgressClass(radius);
	const progressPercent = resolveSliderValuePercent({ value, minRange, maxRange });
	const rangeStartPercent = resolveSliderValuePercent({ value: startValue, minRange, maxRange });
	const rangeEndPercent = resolveSliderValuePercent({ value: endValue, minRange, maxRange });
	const breakMarkerClass = resolveSliderBreakMarkerClass(progressClass);
	const breakSegmentClass = resolveSliderBreakSegmentClass(progressClass);
	const breakProgressSegmentClass = resolveSliderBreakProgressSegmentClass(progressClass);
	const segmentRangeClass = resolveSliderSegmentRangeClass(progressClass);
	const segmentProgressClass = resolveSliderSegmentProgressClass(progressClass);
	const continuousTrackClass = resolveSliderContinuousTrackClass(progressClass);
	const stepMarkerClass = resolveSliderStepMarkerClass(progressClass);
	const activeStepMarkerClass = resolveSliderActiveStepMarkerClass(progressClass);
	const trackClass = resolveSliderTrackClass(progressClass);
	const blockClass = resolveSliderBlockClass({ lineBlock, radius, isDown });
	const tipAnchorClass = resolveSliderTipAnchorClass();
	const tipBubbleClass = resolveSliderTipBubbleClass(radius);
	const positionedTipClass = resolveSliderPositionedTipClass(radius);
	const tipArrowClass = resolveSliderTipArrowClass();
	const markerStyle = resolveSliderBreakStepMarkerStyleValue(stepMarkerSize);
	const markerStyleString = resolveSliderBreakStepMarkerStyleString(stepMarkerSize);

	const buildTipState = (target: SliderMoveTarget, labelValue: number): SliderTipState => ({
		anchorClass: tipAnchorClass,
		arrowClass: tipArrowClass,
		bubbleClass: tipBubbleClass,
		label: resolveSliderStepLabel({ value: labelValue, minRange, step, stepLabels }),
		positionedClass: positionedTipClass,
		visible: resolveSliderTipVisible({ showTip, currentMove, target })
	});

	return {
		activeStepMarkerClass,
		blockClass,
		blockLayerClass: resolveSliderBlockLayerClass(),
		breakMarkerClass,
		breakProgressOverlayClass: resolveSliderBreakProgressOverlayClass(),
		breakProgressSegmentClass,
		breakRootClass: resolveSliderBreakRootClass(),
		breakSegmentClass,
		breakStepItems: stepPositions.map((position, index) => {
			const showSegment = index < stepPositions.length - 1;
			const segmentStart = position;
			const segmentEnd = stepPositions[index + 1] ?? position;
			const active = resolveSliderStepActive({ position, progressPercent, rangeStartPercent, rangeEndPercent, isRange });
			const rangeSegment = showSegment
				? resolveSliderSegmentRangeStyleValue({ segmentStart, segmentEnd, progressPercent, rangeStartPercent, rangeEndPercent })
				: { visible: false, style: { left: '0%', width: '0%' } };
			const rangeSegmentString = showSegment
				? resolveSliderSegmentRangeStyleString({ segmentStart, segmentEnd, progressPercent, rangeStartPercent, rangeEndPercent })
				: { visible: false, style: 'left: 0%; width: 0%;' };
			const progressSegmentStyle = showSegment
				? resolveSliderSegmentProgressStyleValue({ segmentStart, segmentEnd, progressPercent, rangeStartPercent, rangeEndPercent })
				: { width: '0%' };
			const progressSegmentStyleString = showSegment
				? resolveSliderSegmentProgressStyleString({ segmentStart, segmentEnd, progressPercent, rangeStartPercent, rangeEndPercent })
				: 'width: 0%;';
			return {
				active,
				index,
				position,
				showSegment,
				markerClass: breakMarkerClass,
				markerStyle,
				markerStyleString,
				segmentClass: breakSegmentClass,
				progressMarkerClass: resolveSliderBreakProgressMarkerClass({
					position,
					progressPercent,
					rangeStartPercent,
					rangeEndPercent,
					isRange,
					progressClass
				}),
				progressSegmentClass: breakProgressSegmentClass,
				rangeSegmentVisible: rangeSegment.visible,
				rangeSegmentStyle: rangeSegment.style,
				rangeSegmentStyleString: rangeSegmentString.style,
				progressSegmentStyle,
				progressSegmentStyleString
			};
		}),
		continuousStepItems: stepPositions.map((position, index) => {
			const active = resolveSliderStepActive({ position, progressPercent, rangeStartPercent, rangeEndPercent, isRange });
			return {
				active,
				activeClass: activeStepMarkerClass,
				index,
				position,
				markerClass: stepMarkerClass,
				markerStyle: resolveSliderAbsoluteStepMarkerStyleValue({ position, size: stepMarkerSize }),
				markerStyleString: resolveSliderAbsoluteStepMarkerStyleString({ position, size: stepMarkerSize })
			};
		}),
		continuousTrackClass,
		progressClass,
		progressPercent,
		lineClass: resolveSliderLineClass(),
		rangeEndPercent,
		rangeStartPercent,
		rangeTrackStyle: resolveSliderRangeTrackStyleValue({ currentX, currentStartX, currentEndX, sliderSize, sliderGap }),
		rangeTrackStyleString: resolveSliderRangeTrackStyleString({ currentX, currentStartX, currentEndX, sliderSize, sliderGap }),
		rootClass: resolveSliderRootClass(disabled),
		segmentProgressClass,
		segmentRangeClass,
		showBreakSteps: showSteps && stepsStyle === 'break',
		showContinuousSteps: showSteps && stepsStyle !== 'break',
		singleTrackStyle: resolveSliderSingleTrackStyleValue({ currentX, sliderSize, sliderGap }),
		singleTrackStyleString: resolveSliderSingleTrackStyleString({ currentX, sliderSize, sliderGap }),
		sliderSize,
		startBlockStyle: resolveSliderBlockTransformStyleValue({ position: currentStartX }),
		startBlockStyleString: resolveSliderBlockTransformStyleString({ position: currentStartX }),
		endBlockStyle: resolveSliderBlockTransformStyleValue({ position: currentEndX }),
		endBlockStyleString: resolveSliderBlockTransformStyleString({ position: currentEndX }),
		singleBlockStyle: resolveSliderBlockTransformStyleValue({ position: currentX }),
		singleBlockStyleString: resolveSliderBlockTransformStyleString({ position: currentX }),
		stepMarkerClass,
		stepMarkerSize,
		stepPositions,
		tipInParams: resolveSliderTipInParams(),
		tipOutParams: resolveSliderTipOutParams(),
		tips: {
			start: buildTipState('start', startValue),
			end: buildTipState('end', endValue),
			single: buildTipState('one', value)
		},
		trackClass
	};
};
