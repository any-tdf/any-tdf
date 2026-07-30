export const loadingHeightClass = {
	'2': 'h-2',
	'4': 'h-4',
	'6': 'h-6',
	'8': 'h-8',
	'12': 'h-12',
	'16': 'h-16',
	'20': 'h-20',
	'28': 'h-28',
	'36': 'h-36',
	'48': 'h-48',
	'56': 'h-56',
	'64': 'h-64',
	'72': 'h-72',
	'80': 'h-80',
	'96': 'h-96',
	full: 'h-full'
} as const;

export const loadingWidthClass = {
	'2': 'w-2',
	'4': 'w-4',
	'6': 'w-6',
	'8': 'w-8',
	'12': 'w-12',
	'16': 'w-16',
	'20': 'w-20',
	'28': 'w-28',
	'36': 'w-36',
	'48': 'w-48',
	'56': 'w-56',
	'64': 'w-64',
	'72': 'w-72',
	'80': 'w-80',
	'96': 'w-96',
	full: 'w-full'
} as const;

export type ResolveLoadingSizeClassOptions = {
	readonly height: keyof typeof loadingHeightClass | string;
	readonly width: keyof typeof loadingWidthClass | string;
};
export type ResolveLoadingDerivedOptions = ResolveLoadingSizeClassOptions & {
	readonly type?: string;
};
export type LoadingStatePropsLike = Partial<ResolveLoadingDerivedOptions>;
export type ResolveLoadingStateOptionsParams = {
	readonly props: LoadingStatePropsLike;
};
export type LoadingDerived = {
	readonly componentName: string;
	readonly sizeClass: string;
	readonly type: string;
};
export type LoadingTreeNodeLike = {
	readonly children?: ArrayLike<unknown> | null;
};
export type LoadingAnimationPlayState = 'paused' | 'running';
export type LoadingRectLike = {
	readonly bottom: number;
	readonly height: number;
	readonly left: number;
	readonly right: number;
	readonly top: number;
	readonly width: number;
};
export type ResolveLoadingIntersectionStateOptions = {
	readonly rect: LoadingRectLike;
	readonly viewportHeight: number;
	readonly viewportWidth: number;
};
export type ResolveLoadingTwoColorClassStateOptions = {
	readonly inverse?: boolean;
};
export type ResolveLoadingOneColorClassStateOptions = {
	readonly inverse?: boolean;
	readonly theme?: boolean;
};
export type LoadingOneColorClassState = {
	readonly bgClass: string;
	readonly borderClass: string;
	readonly doubleSpinBorderClass: string;
	readonly spinBorderClass: string;
	readonly splitRingClass: string;
	readonly strokeClass: string;
	readonly textClass: string;
};
export type LoadingTwoColorClassState = {
	readonly bgClass: string;
	readonly innerBorderClass: string;
	readonly outerBorderClass: string;
	readonly secondaryBgClass: string;
	readonly spinBorderClass: string;
};

// 输入 Loading 尺寸状态，返回框架无关的容器尺寸 class。
// Receive Loading size state and return framework-agnostic container size classes.
export const resolveLoadingSizeClass = ({ height, width }: ResolveLoadingSizeClassOptions): string =>
	`${loadingHeightClass[height as keyof typeof loadingHeightClass]} ${loadingWidthClass[width as keyof typeof loadingWidthClass]}`;

export const resolveLoadingComponentName = (type = '1_0'): string => `Loading${type}`;

// 输入组件 props，返回框架无关的 Loading 派生入参。
// Receive component props and return framework-agnostic Loading derivation options.
export const resolveLoadingStateOptions = ({ props }: ResolveLoadingStateOptionsParams): ResolveLoadingDerivedOptions => ({
	height: props.height ?? '8',
	type: props.type,
	width: props.width ?? '8'
});

// 输入 Loading props 状态，返回组件层可直接绑定的框架无关派生结果。
// Receive Loading prop state and return framework-agnostic derived values ready for component binding.
export const resolveLoadingDerived = ({ height, width, type = '1_0' }: ResolveLoadingDerivedOptions): LoadingDerived => ({
	componentName: resolveLoadingComponentName(type),
	sizeClass: resolveLoadingSizeClass({ height, width }),
	type
});

// 输入树形节点，返回所有后代节点；组件层决定这些节点来自 DOM 还是其他结构。
// Receive a tree-like node and return all descendants; the component layer decides whether nodes come from DOM or another structure.
export const resolveLoadingDescendants = <TNode extends LoadingTreeNodeLike>(node: TNode | null | undefined): TNode[] => {
	const descendants: TNode[] = [];
	const children = node?.children;
	if (!children?.length) return descendants;

	for (let index = 0; index < children.length; index += 1) {
		const child = children[index] as TNode;
		descendants.push(child);
		descendants.push(...resolveLoadingDescendants(child));
	}

	return descendants;
};

// 输入树形节点，返回需要同步动画状态的节点；包含节点自身和所有后代节点。
// Receive a tree-like node and return animation targets; includes the node itself and all descendants.
export const resolveLoadingAnimationTargets = <TNode extends LoadingTreeNodeLike>(node: TNode | null | undefined): TNode[] =>
	node ? [node, ...resolveLoadingDescendants(node)] : [];

// 输入可见性结果，返回组件层写入动画样式的值。
// Receive visibility result and return the animation style value written by the component layer.
export const resolveLoadingAnimationPlayState = (isIntersecting = false): LoadingAnimationPlayState =>
	isIntersecting ? 'running' : 'paused';

// 输入节点和视口尺寸，返回节点是否与视口相交。
// Receive node rect and viewport size, then return whether the node intersects with the viewport.
export const resolveLoadingIntersectionState = ({ rect, viewportHeight, viewportWidth }: ResolveLoadingIntersectionStateOptions): boolean =>
	rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < viewportHeight && rect.left < viewportWidth;

export const loadingToneColorClass = {
	text: {
		normal: 'text-black dark:text-white',
		theme: 'text-primary dark:text-dark',
		inverse: 'text-white dark:text-black',
		inverseTheme: 'text-dark dark:text-primary'
	},
	bg: {
		normal: 'bg-black dark:bg-white',
		theme: 'bg-primary dark:bg-dark',
		inverse: 'bg-white dark:bg-black',
		inverseTheme: 'bg-dark dark:bg-primary'
	},
	border: {
		normal: 'border-black dark:border-white',
		theme: 'border-primary dark:border-dark',
		inverse: 'border-white dark:border-black',
		inverseTheme: 'border-dark dark:border-primary'
	},
	stroke: {
		normal: 'stroke-black dark:stroke-white',
		theme: 'stroke-primary dark:stroke-dark',
		inverse: 'stroke-white dark:stroke-black',
		inverseTheme: 'stroke-dark dark:stroke-primary'
	}
} as const;

export const loadingSpinBorderClass = {
	normal: 'border-black/5 border-l-black/100 dark:border-white/5 dark:border-l-white/100',
	theme: 'border-primary/5 border-l-primary/100 dark:border-dark/5 dark:border-l-dark/100',
	inverse: 'border-white/5 border-l-white/100 dark:border-black/5 dark:border-l-black/100',
	inverseTheme: 'border-dark/5 border-l-dark/100 dark:border-primary/5 dark:border-l-primary/100'
} as const;

export const loadingSpinDoubleBorderClass = {
	normal: 'border-black/5 dark:border-white/5 border-l-black/100 dark:border-l-white/100 border-r-black/100 dark:border-r-white/100',
	theme: 'border-primary/5 dark:border-dark/5 border-l-primary/100 dark:border-l-dark/100 border-r-primary/100 dark:border-r-dark/100',
	inverse: 'border-white/5 border-l-white/100 dark:border-black/5 dark:border-l-black/100 border-r-white/100 dark:border-r-black/100',
	inverseTheme:
		'border-dark/5 border-l-dark/100 dark:border-primary/5 dark:border-l-primary/100 border-r-dark/100 dark:border-r-primary/100'
} as const;

export const loadingTwoColorOuterBorderClass = {
	normal: 'border-black/10 dark:border-white/10',
	inverse: 'border-white/10 dark:border-black/10'
} as const;

export const loadingTwoColorInnerBorderClass = {
	normal: 'border-transparent dark:border-transparent border-l-primary dark:border-l-dark',
	inverse: 'border-transparent dark:border-transparent border-l-dark dark:border-l-primary'
} as const;

export const loadingTwoColorBgClass = {
	normal: 'bg-primary dark:bg-dark',
	inverse: 'bg-dark dark:bg-primary',
	secondary: 'bg-black/50 dark:bg-white/50',
	inverseSecondary: 'bg-white/50 dark:bg-black/50'
} as const;

export const loadingFourColorDefaults = ['#DA1414', '#11BB8D', '#7356BF', '#FFC043'] as const;

// Loading 变体只导出纯布局数据，不包含 DOM 或动画事件。
// Loading variants expose only pure layout data, never DOM or animation events.
export const loadingRadialDotDelayMultipliers = [0, -0.125, -0.25, -0.375, -0.5, -0.625, -0.75, -0.875] as const;
export const loadingPulseLineIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export const loadingCornerDotIndexes = [0, 1, 2] as const;
export const loadingOrbitSliceIndexes = [0, 1, 2, 3, 4, 5] as const;
export const loadingThreeDotIndexes = [0, 1, 2] as const;
export const loadingTwoDotIndexes = [0, 1] as const;
export const loadingFourDotIndexes = [0, 1, 2, 3] as const;
export const loadingFiveDotIndexes = [0, 1, 2, 3, 4] as const;
export const loadingClimbingDotStepIndexes = [0, 1, 2] as const;
export const loadingElasticDotLeftPercents = ['0', '25%', '50%', '75%', '100%'] as const;
export const loadingExploreLineDelayMultipliers = [0, -0.5] as const;
export const loadingHalfFlowSections = ['leading', 'trailing'] as const;
export const loadingSixDotDelayMultipliers = [0, -0.835, -0.668, -0.501, -0.334, -0.167] as const;
export const loadingEightRadialDelayMultipliers = [0, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125] as const;
export const loadingCubeDelayMultipliers = [0, -0.36, -0.2] as const;
export const loadingBarDelayMultipliers = [-0.45, -0.3, -0.15, 0] as const;
export const loadingWobbleRotations = [120, -120, 0] as const;
export const loadingSlideDotDelayMultipliers = [0, -0.2, -0.4, -0.6, -0.8] as const;
export const loadingThreeDotDelayMultipliers = [-0.375, -0.25, -0.125] as const;
export const loadingDualRingDelayDivisors = [0, -2] as const;
export const loadingQuarterDelayMultipliers = [0, -0.25, -0.5, -0.75] as const;
export const loadingDiagonalDotPositions = [
	[24, -35],
	[16, -6],
	[8, 23],
	[-1, 51],
	[38, -17.5],
	[30, 10],
	[22, 39],
	[14, 67],
	[53, -0.8],
	[44.5, 27],
	[36, 55.7],
	[28.7, 84.3],
	[66.8, 15],
	[58.8, 43],
	[50, 72],
	[42, 100]
] as const;
export const loadingDiagonalDotDelayMultipliers = [
	-0.48, -0.4, -0.32, -0.24, -0.4, -0.32, -0.24, -0.16, -0.32, -0.24, -0.16, -0.08, -0.24, -0.16, -0.08, -0
] as const;
export const loadingLeapFrogOffsets = [0, 0.4, 0.8] as const;
export const loadingSwingDotOpacities = [1, 0.9, 0.6, 0.4] as const;
export const loadingRotatingLineFrames = [
	[-0.375, 1],
	[-0.375, 0.8],
	[-0.3, 0.6],
	[-0.225, 0.4],
	[-0.15, 0.2],
	[-0.075, 0.1]
] as const;

export type LoadingTone = keyof typeof loadingToneColorClass;

export type LoadingStyleValue = string | number | boolean | null | undefined;

export type LoadingDurationStyleOptions = {
	webkit?: boolean;
	clampAtBase?: boolean;
	divisor?: number;
	multiplier?: number;
};

export type LoadingColorDurationStyleOptions = LoadingDurationStyleOptions & {
	color?: LoadingStyleValue;
	colorProperty?: string;
	durationBase: number;
	speed?: number;
};

export type LoadingIndexedDotStyleOptions = LoadingColorDurationStyleOptions & {
	index: number;
	delayOffsetMs?: number;
	delayStepMs?: number;
};

export type LoadingOneColorVariantStyleOptions = {
	customColor?: LoadingColorList;
	speed?: number;
};

export type LoadingOneColorIndexedVariantStyleOptions = LoadingOneColorVariantStyleOptions & {
	index: number;
};

export type LoadingShapeVariant = '1_19' | '1_21' | '2_3' | '2_4' | '2_5' | '4_1' | '4_2' | '4_3';
export type LoadingShapePieceClassVariant = 'cornerThird' | 'roundThird' | 'roundHalf';
export type LoadingShapeContainerClassKind = 'loadingRelative' | 'rotatedCorner';
export type LoadingLayoutClassKind =
	| 'center'
	| 'containerRelativeFlexCenter'
	| 'containerRelativeFlexColumn'
	| 'containerRelativeInlineBlock'
	| 'flexBetween'
	| 'flexCenter'
	| 'flexCenterJustified'
	| 'flexColumn'
	| 'flexColumnCenter'
	| 'flexColumnItemsCenter'
	| 'flexEndBetween'
	| 'loadingFlexBetween'
	| 'loadingRelative'
	| 'loadingRelativeBox'
	| 'relativeCenter'
	| 'relativeCenterBox'
	| 'relativeFlexCenter'
	| 'relativeRotatedFlexCenter'
	| 'relativeTranslateNegativeHalf'
	| 'rotatedCorner'
	| 'trackShell'
	| 'svgFull'
	| 'svgFullSized'
	| 'svgOrigin'
	| 'svgOriginWillChange';
export type LoadingRoundDotSize = 'sm' | 'md';
export type LoadingRoundedElementSize =
	| 'none'
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'third'
	| 'half'
	| 'quarter'
	| 'full'
	| 'zeroFullWidth'
	| 'stream';
export type ResolveLoadingRoundedElementClassOptions = {
	readonly bgClass?: string;
	readonly className?: string;
	readonly size?: LoadingRoundedElementSize;
};
export type ResolveLoadingBallScaleDotClassOptions = {
	readonly bgClass?: string;
	readonly size?: string;
};
export type ResolveLoadingIndexedRoundedDotClassOptions = {
	readonly bgClass?: string;
	readonly index: number;
};
export type LoadingBorderElementKind =
	| 'alphaSpinnerRing'
	| 'borderCapEnd'
	| 'borderCapStart'
	| 'clipPulseRing'
	| 'clippedInnerRing'
	| 'clippedOuterRing'
	| 'doubleSpinnerRing'
	| 'nestedSpinnerInner'
	| 'nestedSpinnerOuter'
	| 'splitSpinnerRing'
	| 'topSpinnerRing';
export type ResolveLoadingBorderElementClassOptions = {
	readonly className?: string;
	readonly colorClass?: string;
	readonly kind: LoadingBorderElementKind;
	readonly size?: string;
};
export type ResolveLoadingSvgStrokeClassOptions = {
	readonly className?: string;
	readonly strokeClass?: string;
};
export type ResolveLoadingRoundDotClassOptions = {
	readonly bgClass?: string;
	readonly className?: string;
	readonly size?: LoadingRoundDotSize;
};
export type LoadingExploreLineKind = 'center' | 'trail';
export type ResolveLoadingExploreLineClassOptions = {
	readonly bgClass?: string;
	readonly kind: LoadingExploreLineKind;
};
export type ResolveLoadingClimbingDotStepRootClassOptions = {
	readonly bgClass?: string;
	readonly stepIndex: number;
};
export type ResolveLoadingShapePieceClassOptions = {
	readonly bgClass?: string;
	readonly index: number;
	readonly variant: LoadingShapePieceClassVariant;
};
export type ResolveLoadingShapeContainerClassOptions = {
	readonly kind: LoadingShapeContainerClassKind;
	readonly size?: string;
};
export type ResolveLoadingLayoutClassOptions = {
	readonly className?: string;
	readonly kind: LoadingLayoutClassKind;
	readonly size?: string;
};

export type LoadingShapeVariantStyleOptions = LoadingOneColorVariantStyleOptions & {
	variant: LoadingShapeVariant;
};

export type LoadingIndexedShapeVariantStyleOptions = LoadingShapeVariantStyleOptions & {
	index: number;
};

export type LoadingColorDurationDelayStyleOptions = LoadingColorDurationStyleOptions & {
	delayDivisor?: number;
	delayMultiplier?: number;
};

export type LoadingColorList = Array<string | undefined>;
export type LoadingRotatingLineFrame = (typeof loadingRotatingLineFrames)[number];
export type LoadingHalfFlowSection = (typeof loadingHalfFlowSections)[number];

export type LoadingFourColorStyleOptions = LoadingDurationStyleOptions & {
	customColor: LoadingColorList;
	durationBase: number;
	index: number;
	speed?: number;
};

export type LoadingBorderDurationStyleOptions = LoadingDurationStyleOptions & {
	customColor: LoadingColorList;
	durationBase: number;
	speed?: number;
};

export type LoadingBorderTransparentDurationStyleOptions = LoadingDurationStyleOptions & {
	color?: LoadingStyleValue;
	durationBase: number;
	prefixStyle?: string;
	speed?: number;
	transparentSides?: string[];
};

export type LoadingAlphaBorderDurationStyleOptions = LoadingDurationStyleOptions & {
	color?: LoadingStyleValue;
	durationBase: number;
	fullBorder?: boolean;
	speed?: number;
};

export type LoadingTimedStyleOptions = LoadingDurationStyleOptions & {
	color?: LoadingStyleValue;
	colorProperty?: string;
	delayBase?: number;
	delayDivisor?: number;
	delayMultiplier?: number;
	delaySpeed?: number;
	durationBase: number;
	includeDelay?: boolean;
	includeDuration?: boolean;
	prefixStyle?: string;
	speed?: number;
	suffixStyle?: string;
};

export type LoadingDotChaseScaleStyleOptions = {
	readonly color?: LoadingStyleValue;
	readonly index: number;
	readonly speed?: number;
};
export type LoadingColorSpeedStyleOptions = {
	readonly color?: LoadingStyleValue;
	readonly speed?: number;
};

export type LoadingScopedCssOptions = {
	scope?: string;
};

export type LoadingFourShapeTranslateCssOptions = LoadingScopedCssOptions & {
	shapeDurationBase?: number;
};

export type LoadingFourShapePositionMode = 'thirds' | 'quarters';

export type LoadingFourShapePositionCssOptions = LoadingScopedCssOptions & {
	containerDurationBase?: number;
	mode?: LoadingFourShapePositionMode;
	shapeDurationBase?: number;
};

export type LoadingHorizontalShuttleCssOptions = LoadingScopedCssOptions & {
	distance?: string;
};

export type LoadingVerticalJumpCssOptions = LoadingScopedCssOptions & {
	distance?: string;
};

export type LoadingLineRotateCssOptions = LoadingScopedCssOptions & {
	alternate?: boolean;
};

export type LoadingClassTargetCssOptions = LoadingScopedCssOptions & {
	targetClass?: string;
};

export type LoadingStrokeTravelCssOptions = LoadingScopedCssOptions & {
	dasharray?: string;
	endOffset?: number;
	includeFillNone?: boolean;
	includeLineCap?: boolean;
	includeTransition?: boolean;
};

export type ResolveLoadingHalfFlowPieceRootClassOptions = {
	readonly bgClass?: string;
	readonly section: LoadingHalfFlowSection;
};

// 输入动画状态，返回框架无关的秒数字符串。
// Accept animation state and return a framework-agnostic seconds string.
export const resolveLoadingDurationSecond = (
	base: number,
	speed = 1,
	options: Pick<LoadingDurationStyleOptions, 'clampAtBase' | 'divisor' | 'multiplier'> = {}
) => {
	const { clampAtBase = false, divisor = 1, multiplier = 1 } = options;
	const duration = ((clampAtBase && speed < 1 ? base : base / speed) * multiplier) / divisor;
	return `${duration}s`;
};

// 输入动画状态，返回框架无关的 animation-duration style 字符串。
// Accept animation state and return a framework-agnostic animation-duration style string.
export const resolveLoadingAnimationDurationStyle = (base: number, speed = 1, options: LoadingDurationStyleOptions = {}) => {
	const { webkit = true } = options;
	const duration = resolveLoadingDurationSecond(base, speed, options);
	return `animation-duration: ${duration};${webkit ? `-webkit-animation-duration: ${duration};` : ''}`;
};

// 输入颜色状态，返回框架无关的 style 字符串。
// Accept color state and return a framework-agnostic style string.
export const resolveLoadingColorStyle = (property: string, color: LoadingStyleValue) => `${property}: ${color};`;

export const resolveLoadingStyleString = (styles: Array<readonly [string, LoadingStyleValue]>) =>
	styles.map(([property, value]) => `${property}: ${value};`).join('');

// 输入索引状态，返回框架无关的动画延迟毫秒值。
// Accept index state and return a framework-agnostic animation delay in milliseconds.
export const resolveLoadingIndexDelayMs = (index: number, stepMs: number, offsetMs = 0) => index * stepMs + offsetMs;

// 输入颜色列表状态，返回框架无关的多色默认值。
// Accept color list state and return a framework-agnostic multi-color fallback.
export const resolveLoadingFourColor = (customColor: LoadingColorList, index: number) =>
	customColor[index] || loadingFourColorDefaults[index] || '';

// 输入点状动画状态，返回框架无关的 style 字符串。
// Accept dot animation state and return a framework-agnostic style string.
export const resolveLoadingColorDurationStyle = ({
	color,
	colorProperty = 'background',
	durationBase,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingColorDurationStyleOptions) =>
	`${resolveLoadingColorStyle(colorProperty, color)}${resolveLoadingAnimationDurationStyle(durationBase, speed, {
		webkit,
		clampAtBase
	})}`;

// 输入点状动画状态，返回包含 delay 的框架无关 style 字符串。
// Accept dot animation state and return a framework-agnostic style string with delay.
export const resolveLoadingColorDurationDelayStyle = ({
	color,
	colorProperty = 'background-color',
	durationBase,
	speed = 1,
	delayDivisor,
	delayMultiplier,
	webkit = false,
	clampAtBase = false
}: LoadingColorDurationDelayStyleOptions) => {
	const duration = resolveLoadingDurationSecond(durationBase, speed, { clampAtBase });
	const delay = resolveLoadingDurationSecond(durationBase, speed, {
		clampAtBase,
		divisor: delayDivisor,
		multiplier: delayMultiplier
	});
	return `${resolveLoadingColorStyle(colorProperty, color)}animation-duration: ${duration};animation-delay: ${delay};${webkit ? `-webkit-animation-duration: ${duration};` : ''}`;
};

// 输入时间参数状态，返回框架无关的 duration / delay style 字符串。
// Accept timing state and return a framework-agnostic duration / delay style string.
export const resolveLoadingTimedStyle = ({
	color,
	colorProperty,
	delayBase,
	durationBase,
	speed = 1,
	delayDivisor = 1,
	delayMultiplier = 1,
	delaySpeed,
	includeDelay = true,
	includeDuration = true,
	prefixStyle = '',
	suffixStyle = '',
	webkit = false,
	clampAtBase = false
}: LoadingTimedStyleOptions) => {
	const duration = resolveLoadingDurationSecond(durationBase, speed, { clampAtBase });
	const delay = resolveLoadingDurationSecond(delayBase ?? durationBase, delaySpeed ?? speed, {
		clampAtBase,
		divisor: delayDivisor,
		multiplier: delayMultiplier
	});
	const colorStyle = colorProperty ? resolveLoadingColorStyle(colorProperty, color) : '';
	const durationStyle = includeDuration
		? `animation-duration: ${duration};${webkit ? `-webkit-animation-duration: ${duration};` : ''}`
		: '';
	const delayStyle = includeDelay ? `animation-delay: ${delay};` : '';
	return `${prefixStyle}${colorStyle}${durationStyle}${delayStyle}${suffixStyle}`;
};

// 输入 dot-chase-scale 点状态，返回框架无关的动画 style 字符串。
// Receive dot-chase-scale dot state and return a framework-agnostic animation style string.
export const resolveLoadingDotChaseScaleStyle = ({ color, index, speed = 1 }: LoadingDotChaseScaleStyleOptions): string =>
	resolveLoadingTimedStyle({
		prefixStyle: `animation-delay: ${-0.5 * index}s, ${-0.5 * (index + 1)}s;top:calc(5);`,
		color,
		colorProperty: 'background',
		durationBase: 2.5,
		speed,
		includeDelay: false,
		webkit: true
	});

// 输入 clipped ring 内圈状态，返回框架无关的反向旋转 style 字符串。
// Receive clipped-ring inner state and return a framework-agnostic reverse-rotation style string.
export const resolveLoadingClippedInnerRingStyle = ({ color, speed = 1 }: LoadingColorSpeedStyleOptions = {}): string =>
	resolveLoadingTimedStyle({
		prefixStyle: 'animation-direction: reverse;',
		color,
		colorProperty: 'border-color',
		durationBase: 1.5,
		speed,
		includeDelay: false,
		webkit: true
	});

// 输入 paired-pendulum 点状态，返回框架无关的摆动原点和时长 style 字符串。
// Receive paired-pendulum dot state and return framework-agnostic transform-origin and duration styles.
export const resolveLoadingPairedPendulumDotStyle = (speed = 1): string =>
	resolveLoadingTimedStyle({
		prefixStyle: 'transform-origin: center top;',
		durationBase: 1.5,
		speed,
		includeDelay: false
	});

// 输入 Loading 变体作用域，返回框架无关的 ball-scale 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic ball-scale animation CSS.
export const resolveLoadingBallScaleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_ball-scale` : 'ball-scale';
	const selector = scope ? `.${scope} div` : 'div';
	return `${selector} {
	animation: ${animationName} infinite linear 1s;
}

@keyframes ${animationName} {
	0% {
		transform: scale(0.1);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的横向 zoom 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic horizontal zoom animation CSS.
export const resolveLoadingHorizontalZoomCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_zoom` : 'zoom';
	const selector = scope ? `.${scope} .container` : '.container';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
}

@keyframes ${animationName} {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 pulse-scale 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic pulse-scale animation CSS.
export const resolveLoadingPulseScaleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_pulse` : 'pulse';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} linear infinite;
}

@keyframes ${animationName} {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的线条 pulse 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic line pulse animation CSS.
export const resolveLoadingLinePulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_pulse` : 'pulse';
	const selector = scope ? `.${scope} .line` : '.line';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
	transition: background-color 0.3s ease;
	transform-origin: center bottom;
}

@keyframes ${animationName} {
	0%,
	80%,
	100% {
		transform: scaleY(0.75);
		opacity: 0;
	}
	20% {
		transform: scaleY(1);
		opacity: 1;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的径向点 pulse 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic radial dot pulse animation CSS.
export const resolveLoadingRadialDotPulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_pulse` : 'pulse';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: scale(0);
		opacity: 0.5;
	}
	50% {
		transform: scale(1);
		opacity: 1;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的三点缩放动画 CSS。
// Resolve a Loading variant scope into framework-agnostic three-dot scale animation CSS.
export const resolveLoadingThreeDotPulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_pulse` : 'pulse';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite both;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: scale(0);
	}

	50% {
		transform: scale(1);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的中点 pulse 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic midpoint pulse animation CSS.
export const resolveLoadingMidpointPulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_pulse` : 'pulse';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} linear infinite;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: scale(0);
		opacity: 1;
	}
	50% {
		transform: scale(1);
		opacity: 0.25;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的柱状缩放动画 CSS。
// Resolve a Loading variant scope into framework-agnostic bar-grow animation CSS.
export const resolveLoadingBarGrowCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_grow` : 'grow';
	const selector = scope ? `.${scope} .bar` : '.bar';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: scaleY(0.3);
	}

	50% {
		transform: scaleY(1);
	}
}`;
};

// 输入 Loading 变体作用域和位移距离，返回框架无关的横向往返动画 CSS。
// Resolve a Loading variant scope and distance into framework-agnostic horizontal shuttle animation CSS.
export const resolveLoadingHorizontalShuttleCss = ({ scope = '', distance = '95%' }: LoadingHorizontalShuttleCssOptions = {}): string => {
	const animationName = scope ? `${scope}_zoom` : 'zoom';
	const selector = scope ? `.${scope} .container` : '.container';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: translateX(-${distance});
	}
	50% {
		transform: translateX(${distance});
	}
}`;
};

// 输入 Loading 变体作用域和位移距离，返回框架无关的竖向跳动动画 CSS。
// Resolve a Loading variant scope and distance into framework-agnostic vertical jump animation CSS.
export const resolveLoadingVerticalJumpCss = ({ scope = '', distance = '100%' }: LoadingVerticalJumpCssOptions = {}): string => {
	const animationName = scope ? `${scope}_jump` : 'jump';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite;
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: translateY(${distance});
	}

	50% {
		transform: translateY(-${distance});
	}
}`;
};

// 输入 Loading 变体作用域和方向模式，返回框架无关的线条旋转动画 CSS。
// Resolve a Loading variant scope and direction mode into framework-agnostic line rotate animation CSS.
export const resolveLoadingLineRotateCss = ({ scope = '', alternate = false }: LoadingLineRotateCssOptions = {}): string => {
	const animationName = scope ? `${scope}_rotate` : 'rotate';
	const selector = scope ? `.${scope} .line` : '.line';
	return `${selector} {
	animation: ${animationName} ease-in-out infinite${alternate ? ' alternate' : ''};
}
@keyframes ${animationName} {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(180deg);
	}
}`;
};

const loadingOrbitalScaleFrames = [
	['0%', 'calc(32px * 0.25)', '0.73684', '0.65'],
	['5%', 'calc(32px * 0.235)', '0.684208', '0.58'],
	['10%', 'calc(32px * 0.182)', '0.631576', '0.51'],
	['15%', 'calc(32px * 0.129)', '0.578944', '0.44'],
	['20%', 'calc(32px * 0.076)', '0.526312', '0.37'],
	['25%', '0%', '0.47368', '0.3'],
	['30%', 'calc(32px * -0.076)', '0.526312', '0.37'],
	['35%', 'calc(32px * -0.129)', '0.578944', '0.44'],
	['40%', 'calc(32px * -0.182)', '0.631576', '0.51'],
	['45%', 'calc(32px * -0.235)', '0.684208', '0.58'],
	['50%', 'calc(32px * -0.25)', '0.73684', '0.65'],
	['55%', 'calc(32px * -0.235)', '0.789472', '0.72'],
	['60%', 'calc(32px * -0.182)', '0.842104', '0.79'],
	['65%', 'calc(32px * -0.129)', '0.894736', '0.86'],
	['70%', 'calc(32px * -0.076)', '0.947368', '0.93'],
	['75%', '0%', '1', '1'],
	['80%', 'calc(32px * 0.076)', '0.947368', '0.93'],
	['85%', 'calc(32px * 0.129)', '0.894736', '0.86'],
	['90%', 'calc(32px * 0.182)', '0.842104', '0.79'],
	['95%', 'calc(32px * 0.235)', '0.789472', '0.72'],
	['100%', 'calc(32px * 0.25)', '0.73684', '0.65']
] as const;

// 输入 Loading 变体作用域和目标 class，返回框架无关的轨道缩放动画 CSS。
// Resolve a Loading variant scope and target class into framework-agnostic orbital scale animation CSS.
export const resolveLoadingOrbitalScaleCss = ({ scope = '', targetClass = 'slice' }: LoadingClassTargetCssOptions = {}): string => {
	const animationName = scope ? `${scope}_orbit` : 'orbit';
	const selector = scope ? `.${scope} .${targetClass}` : `.${targetClass}`;
	const keyframes = loadingOrbitalScaleFrames
		.map(
			([percent, translateX, scale, opacity]) => `	${percent} {
		transform: translateX(${translateX}) scale(${scale});
		opacity: ${opacity};
	}`
		)
		.join('\n');

	return `${selector} {
	animation: ${animationName} linear infinite;
}

@keyframes ${animationName} {
${keyframes}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的钟摆双端动画 CSS。
// Resolve a Loading variant scope into framework-agnostic paired pendulum animation CSS.
export const resolveLoadingPairedPendulumCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_swing` : 'swing';
	const secondAnimationName = scope ? `${scope}_swing2` : 'swing2';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.dot1 {
	animation: ${animationName} linear infinite;
}
${selectorPrefix}.dot2 {
	animation: ${secondAnimationName} linear infinite;
}

@keyframes ${animationName} {
	0% {
		transform: rotate(0deg);
		animation-timing-function: ease-out;
	}

	25% {
		transform: rotate(70deg);
		animation-timing-function: ease-in;
	}

	50% {
		transform: rotate(0deg);
		animation-timing-function: linear;
	}
}

@keyframes ${secondAnimationName} {
	0% {
		transform: rotate(0deg);
		animation-timing-function: linear;
	}

	50% {
		transform: rotate(0deg);
		animation-timing-function: ease-out;
	}

	75% {
		transform: rotate(-70deg);
		animation-timing-function: ease-in;
	}
}`;
};

// 输入钟摆点状态，返回组件实现可直接绑定的框架无关 class。
// Receive paired pendulum dot state and return framework-agnostic classes ready for component binding.
export const resolveLoadingPairedPendulumDotClass = (index: number): string =>
	`dot relative flex h-full w-1/4 items-center${index === 0 ? ' dot1' : ''}${index === 3 ? ' dot2' : ''}`;

// 输入主题背景 class，返回钟摆内条的框架无关 class。
// Receive theme background class and return framework-agnostic classes for the paired pendulum bar.
export const resolveLoadingPairedPendulumBarClass = (bgClass = ''): string => `h-1/4 w-full rounded-full${bgClass}`;

// 输入 Loading 变体作用域，返回框架无关的半圈摆动动画 CSS。
// Resolve a Loading variant scope into framework-agnostic half-turn swing animation CSS.
export const resolveLoadingHalfTurnSwingCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_swing` : 'swing';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} linear infinite;
}

@keyframes ${animationName} {
	0% {
		transform: rotate(0deg);
	}

	15% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(180deg);
	}

	65% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(0deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 leap-frog 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic leap-frog animation CSS.
export const resolveLoadingLeapFrogCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_leapFrog` : 'leapFrog';
	const selector = scope ? `.${scope} .dot` : '.dot';
	return `${selector} {
	animation: ${animationName} ease infinite;
}

@keyframes ${animationName} {
	0% {
		transform: translateX(0) rotate(0deg);
	}

	33.333% {
		transform: translateX(0) rotate(180deg);
	}

	66.666% {
		transform: translateX(calc(32px * -0.38)) rotate(180deg);
	}

	99.999% {
		transform: translateX(calc(32px * -0.78)) rotate(180deg);
	}

	100% {
		transform: translateX(0) rotate(0deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 stream 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic stream animation CSS.
export const resolveLoadingStreamCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_stream` : 'stream';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.dot {
	animation: ${animationName} linear infinite both;
}

${selectorPrefix}.stream-track {
	transform: translateX(-10%);
}

@keyframes ${animationName} {
	0%,
	100% {
		transform: translateX(0) scale(0);
	}

	50% {
		transform: translateX(16px) scale(1);
	}

	99.999% {
		transform: translateX(32px) scale(0);
	}
}`;
};

// 输入 Loading 变体作用域和描边参数，返回框架无关的描边 travel 动画 CSS。
// Resolve a Loading variant scope and stroke parameters into framework-agnostic stroke travel animation CSS.
export const resolveLoadingStrokeTravelCss = ({
	scope = '',
	dasharray = '15, 85',
	endOffset = -100,
	includeFillNone = false,
	includeLineCap = true,
	includeTransition = false
}: LoadingStrokeTravelCssOptions = {}): string => {
	const animationName = scope ? `${scope}_travel` : 'travel';
	const selector = scope ? `.${scope} .car` : '.car';
	return `${selector} {
	${includeFillNone ? 'fill: none;\n\t' : ''}stroke-dasharray: ${dasharray};
	stroke-dashoffset: 0;
	${includeLineCap ? 'stroke-linecap: round;\n\t' : ''}animation: ${animationName} linear infinite;
	will-change: stroke-dasharray, stroke-dashoffset;${includeTransition ? '\n\ttransition: stroke 0.5s ease;' : ''}
}

@keyframes ${animationName} {
	0% {
		stroke-dashoffset: 0;
	}

	100% {
		stroke-dashoffset: ${endOffset};
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的描边 travel + fade 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic stroke travel and fade animation CSS.
export const resolveLoadingStrokeTravelFadeCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const travelName = scope ? `${scope}_travel` : 'travel';
	const fadeName = scope ? `${scope}_fade` : 'fade';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.car {
	stroke-dasharray: 100;
	stroke-dashoffset: 0;
	stroke-linecap: round;
	stroke-linejoin: round;
	animation: ${travelName} ease-in-out infinite,
		${fadeName} ease-out infinite;
	will-change: stroke-dasharray, stroke-dashoffset;
}
${selectorPrefix}.track {
	stroke-linecap: round;
	stroke-linejoin: round;
}

@keyframes ${travelName} {
	0% {
		stroke-dashoffset: 100;
	}

	75% {
		stroke-dashoffset: 0;
	}
}

@keyframes ${fadeName} {
	0% {
		opacity: 0;
	}

	20%,
	55% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的角点移动动画 CSS。
// Resolve a Loading variant scope into framework-agnostic corner travel animation CSS.
export const resolveLoadingCornerTravelCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_loading` : 'loading';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1.5s linear infinite;
}

@keyframes ${animationName} {
	0% {
		transform: translate(200%, 200%);
	}
	25% {
		transform: translate(0, 200%);
	}
	50% {
		transform: translate(0, 0);
	}
	75% {
		transform: translate(200%, 0);
	}
	100% {
		transform: translate(200%, 200%);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的点缩放淡入动画 CSS。
// Resolve a Loading variant scope into framework-agnostic dot fade-scale animation CSS.
export const resolveLoadingDotFadeScaleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_loading` : 'loading';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1s infinite linear;
}

@keyframes ${animationName} {
	50% {
		opacity: 0.2;
		transform: scale(0.75);
	}
	100% {
		opacity: 1;
		transform: scale(1.2);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的圆环裁切旋转动画 CSS。
// Resolve a Loading variant scope into framework-agnostic clipped ring rotate animation CSS.
export const resolveLoadingClippedRingRotateCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_ball-clip-rotate-multiple-rotate` : 'ball-clip-rotate-multiple-rotate';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1.5s ease-in-out infinite;
}

@keyframes ${animationName} {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	50% {
		transform: translate(-50%, -50%) rotate(180deg);
	}

	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的下落点动画 CSS。
// Resolve a Loading variant scope into framework-agnostic falling dot animation CSS.
export const resolveLoadingFallingDotCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_ball-fall` : 'ball-fall';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1s ease-in-out infinite;
}

@keyframes ${animationName} {
	0% {
		opacity: 0;
		transform: translateY(-145%);
	}

	10% {
		opacity: 0.5;
	}

	20% {
		opacity: 1;
		transform: translateY(0);
	}

	80% {
		opacity: 1;
		transform: translateY(0);
	}

	90% {
		opacity: 0.5;
	}

	100% {
		opacity: 0;
		transform: translateY(145%);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的点脉冲动画 CSS。
// Resolve a Loading variant scope into framework-agnostic dot pulse animation CSS.
export const resolveLoadingDotPulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_ball-pulse` : 'ball-pulse';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1s ease infinite;
}

@keyframes ${animationName} {
	0%,
	60%,
	100% {
		opacity: 1;
		transform: scale(1);
	}

	30% {
		opacity: 0.1;
		transform: scale(0.1);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的双点方形换位动画 CSS。
// Resolve a Loading variant scope into framework-agnostic two-dot square swap animation CSS.
export const resolveLoadingSquareSwapCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const firstName = scope ? `${scope}_loading1` : 'loading1';
	const secondName = scope ? `${scope}_loading2` : 'loading2';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.loading1 {
	animation: ${firstName} 1.5s infinite;
}
${selectorPrefix}.loading2 {
	animation: ${secondName} 1.5s infinite;
}

@keyframes ${firstName} {
	0% {
		transform: translate(200%, 200%);
	}
	25% {
		transform: translate(0, 200%);
	}
	50% {
		transform: translate(0, 0);
	}
	75% {
		transform: translate(200%, 0);
	}
	100% {
		transform: translate(200%, 200%);
	}
}

@keyframes ${secondName} {
	0% {
		transform: translate(0, 0);
	}
	25% {
		transform: translate(200%, 0);
	}
	50% {
		transform: translate(200%, 200%);
	}
	75% {
		transform: translate(0, 200%);
	}
	100% {
		transform: translate(0, 0);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的双点弹性缩放动画 CSS。
// Resolve a Loading variant scope into framework-agnostic two-dot elastic scale animation CSS.
export const resolveLoadingTwoDotElasticCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_loading` : 'loading';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.loading1 {
	animation: ${animationName} infinite 1s -0.4s cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
${selectorPrefix}.loading2 {
	animation: ${animationName} infinite 1s cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

@keyframes ${animationName} {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	50% {
		transform: scale(0.1);
		opacity: 0.6;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的爬梯点动画 CSS。
// Resolve a Loading variant scope into framework-agnostic climbing-dot animation CSS.
export const resolveLoadingClimbingDotCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const jumpName = scope ? `${scope}_ball-climbing-dot-jump` : 'ball-climbing-dot-jump';
	const stepsName = scope ? `${scope}_ball-climbing-dot-steps` : 'ball-climbing-dot-steps';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.loading {
	width: 42px;
	height: 32px;
}
${selectorPrefix}.ball {
	bottom: 32%;
	left: 18%;
	width: 14px;
	height: 14px;
	transform-origin: center bottom;
	animation: ${jumpName} 0.6s ease-in-out infinite;
}
${selectorPrefix}.steps {
	width: 14px;
	height: 2px;
	transform: translate(60%, 0);
	animation: ${stepsName} 1.8s linear infinite;
}
${selectorPrefix}.step1 {
	animation-delay: 0ms;
}
${selectorPrefix}.step2 {
	animation-delay: -600ms;
}
${selectorPrefix}.step3 {
	animation-delay: -1200ms;
}

@keyframes ${jumpName} {
	0% {
		transform: scale(1, 0.8);
	}

	20% {
		transform: scale(0.8, 1.1);
	}

	40% {
		transform: scale(1, 1);
	}

	50% {
		bottom: 125%;
	}

	46% {
		transform: scale(1, 1);
	}

	80% {
		transform: scale(0.8, 1.1);
	}

	90% {
		transform: scale(0.8, 1.1);
	}

	100% {
		transform: scale(1, 0.8);
	}
}

@keyframes ${stepsName} {
	0% {
		top: 0;
		right: 0;
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		top: 100%;
		right: 100%;
		opacity: 0;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的五点弹性轨迹动画 CSS。
// Resolve a Loading variant scope into framework-agnostic five-dot elastic path animation CSS.
export const resolveLoadingElasticDotsCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const selectorPrefix = scope ? `.${scope} ` : '';
	const selectors = loadingElasticDotLeftPercents
		.map(
			(_, index) => `${selectorPrefix}.loading${index + 1} {
	animation: ${scope ? `${scope}_ball-elastic-dots-anim${index + 1}` : `ball-elastic-dots-anim${index + 1}`} 1s infinite;
}`
		)
		.join('\n');
	const middleLefts = ['-50%', '0%', '50%', '100%', '150%'];
	const keyframes = loadingElasticDotLeftPercents
		.map(
			(left, index) => `@keyframes ${scope ? `${scope}_ball-elastic-dots-anim${index + 1}` : `ball-elastic-dots-anim${index + 1}`} {
	0%,
	100% {
		left: ${left};
		transform: translateX(-50%) translateY(-50%) scale(1);
	}

	50% {
		left: ${middleLefts[index]};
		transform: translateX(-50%) translateY(-50%) scale(0.67);
	}
}`
		)
		.join('\n\n');

	return `${selectors}

${keyframes}`;
};

// 输入 Loading 变体作用域，返回框架无关的轨道旋转动画 CSS。
// Resolve a Loading variant scope into framework-agnostic orbit spin animation CSS.
export const resolveLoadingOrbitSpinCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const rotateName = scope ? `${scope}_rotate` : 'rotate';
	const smoothRotateName = scope ? `${scope}_smoothRotate` : 'smoothRotate';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.container {
	animation: ${smoothRotateName} linear infinite;
}
${selectorPrefix}.dot {
	animation: ${rotateName} ease-in-out infinite;
}

@keyframes ${rotateName} {
	0% {
		transform: rotate(0deg);
	}
	65%,
	100% {
		transform: rotate(360deg);
	}
}

@keyframes ${smoothRotateName} {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的径向振荡动画 CSS。
// Resolve a Loading variant scope into framework-agnostic radial oscillate animation CSS.
export const resolveLoadingRadialOscillateCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const rotateName = scope ? `${scope}_rotate` : 'rotate';
	const oscillateName = scope ? `${scope}_oscillate` : 'oscillate';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.container {
	animation: ${rotateName} linear infinite;
}
${selectorPrefix}.dot {
	animation: ${oscillateName} ease-in-out infinite alternate;
}

@keyframes ${oscillateName} {
	0% {
		transform: translateX(12px) scale(0);
		opacity: 0.25;
	}

	100% {
		transform: translateX(0) scale(1);
		opacity: 1;
	}
}

@keyframes ${rotateName} {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 cube 跳动变形动画 CSS。
// Resolve a Loading variant scope into framework-agnostic cube jump and morph animation CSS.
export const resolveLoadingCubeMorphCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const jumpName = scope ? `${scope}_jump` : 'jump';
	const morphName = scope ? `${scope}_morph` : 'morph';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.cube {
	animation: ${jumpName} ease-in-out infinite;
}
${selectorPrefix}.cube__inner {
	animation: ${morphName} ease-in-out infinite;
}

@keyframes ${jumpName} {
	0% {
		transform: translateY(0px);
	}

	30% {
		transform: translateY(0px);
		animation-timing-function: ease-out;
	}

	50% {
		transform: translateY(-200%);
		animation-timing-function: ease-in;
	}

	75% {
		transform: translateY(0px);
		animation-timing-function: ease-in;
	}
}

@keyframes ${morphName} {
	0% {
		transform: scaleY(1);
	}

	10% {
		transform: scaleY(1);
	}

	20%,
	25% {
		transform: scaleY(0.8) scaleX(1.3);
		animation-timing-function: ease-in-out;
	}

	30% {
		transform: scaleY(1.15) scaleX(0.9);
		animation-timing-function: ease-in-out;
	}

	40% {
		transform: scaleY(1);
	}

	70%,
	85%,
	100% {
		transform: scaleY(1);
	}

	75% {
		transform: scaleY(0.8) scaleX(1.2);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的探索线动画 CSS。
// Resolve a Loading variant scope into framework-agnostic exploring-line animation CSS.
export const resolveLoadingExploreLineCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const centerLineName = scope ? `${scope}_center-line` : 'center-line';
	const exploreName = scope ? `${scope}_explore` : 'explore';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.line1 {
	animation: ${centerLineName} ease infinite;
}
${selectorPrefix}.line2 {
	animation: ${exploreName} ease infinite;
}

@keyframes ${centerLineName} {
	0%,
	25%,
	50%,
	75%,
	100% {
		transform: scaleX(1) scaleY(1);
	}
	12.5%,
	62.5% {
		transform: scaleX(8) scaleY(1);
	}
	37.5%,
	87.5% {
		transform: scaleX(1) scaleY(8);
	}
}

@keyframes ${exploreName} {
	0%,
	100% {
		transform: scaleX(1) scaleY(1) translate(0%, 0%);
		transform-origin: top left;
		top: 0;
		left: 0;
	}

	12.5% {
		transform: scaleX(8) scaleY(1) translate(0%, 0%);
		transform-origin: top left;
		top: 0;
		left: 0;
	}

	12.50001% {
		transform: scaleX(8) scaleY(1) translate(0%, 0%);
		transform-origin: top right;
		top: 0;
		left: initial;
		right: 0;
	}

	25% {
		transform: scaleX(1) scaleY(1) translate(0%, 0%);
		transform-origin: top right;
		top: 0;
		left: initial;
		right: 0;
	}

	37.5% {
		transform: scaleX(1) scaleY(8) translate(0%, 0%);
		transform-origin: top right;
		top: 0;
		left: initial;
		right: 0;
	}

	37.5001% {
		transform: scaleX(1) scaleY(8) translate(0%, 0%);
		transform-origin: bottom right;
		top: initial;
		bottom: 0;
		left: initial;
		right: 0;
	}

	50% {
		transform: scaleX(1) scaleY(1) translate(0%, 0%);
		transform-origin: bottom right;
		top: initial;
		bottom: 0;
		left: initial;
		right: 0;
	}

	62.5% {
		transform: scaleX(8) scaleY(1) translate(0%, 0%);
		transform-origin: bottom right;
		top: initial;
		bottom: 0;
		left: initial;
		right: 0;
	}

	62.5001% {
		transform: scaleX(8) scaleY(1) translate(0%, 0%);
		transform-origin: bottom left;
		top: initial;
		bottom: 0;
		left: 0;
	}

	75% {
		transform: scaleX(1) scaleY(1) translate(0%, 0%);
		transform-origin: bottom left;
		top: initial;
		bottom: 0;
		left: 0;
	}

	87.5% {
		transform: scaleX(1) scaleY(8) translate(0%, 0%);
		transform-origin: bottom left;
		top: initial;
		bottom: 0;
		left: 0;
	}

	87.5001% {
		transform: scaleX(1) scaleY(8) translate(0%, 0%);
		transform-origin: top left;
		top: 0;
		left: 0;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 half-flow 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic half-flow animation CSS.
export const resolveLoadingHalfFlowCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const flowName = scope ? `${scope}_flow` : 'flow';
	const rotateName = scope ? `${scope}_rotate` : 'rotate';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.container {
	animation: ${rotateName} ease-in-out infinite;
}
${selectorPrefix}.loading-half-wrap {
	height: 13.92px;
	width: 13.92px;
	border-radius: 9999px;
}
${selectorPrefix}.half1,
${selectorPrefix}.half2 {
	animation: ${flowName} linear infinite both;
	border-radius: 0 0 1.6px 0;
	transform: rotate(45deg) translate(-3%, 50%) scaleX(1.2);
}

@keyframes ${flowName} {
	0% {
		transform: rotate(45deg) translate(-3%, 50%) scaleX(1.2);
	}
	30% {
		transform: rotate(45deg) translate(115%, 50%) scaleX(1.2);
	}

	30.001%,
	50% {
		transform: rotate(0deg) translate(-85%, -85%) scaleX(1);
	}

	80%,
	100% {
		transform: rotate(0deg) translate(0%, 0%) scaleX(1);
	}
}

@keyframes ${rotateName} {
	0%,
	30% {
		transform: rotate(45deg);
	}

	50%,
	80% {
		transform: rotate(225deg);
	}

	100% {
		transform: rotate(405deg);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的 wobble 动画 CSS。
// Resolve a Loading variant scope into framework-agnostic wobble animation CSS.
export const resolveLoadingWobbleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const spinName = scope ? `${scope}_spin` : 'spin';
	const wobbleName = scope ? `${scope}_wobble` : 'wobble';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.container {
	animation: ${spinName} infinite linear;
}
${selectorPrefix}.dot {
	animation: ${wobbleName} infinite ease-in-out;
}

@keyframes ${spinName} {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes ${wobbleName} {
	0%,
	100% {
		transform: translateY(0%);
	}
	50% {
		transform: translateY(65%);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的旋转缩放动画 CSS。
// Resolve a Loading variant scope into framework-agnostic rotate-scale animation CSS.
export const resolveLoadingRotateScaleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_loading` : 'loading';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 1s cubic-bezier(0.7, -0.13, 0.22, 0.86) infinite;
}

@keyframes ${animationName} {
	0% {
		transform: rotate(0deg) scale(1);
	}
	50% {
		transform: rotate(180deg) scale(0.6);
	}
	100% {
		transform: rotate(360deg) scale(1);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的点追逐缩放动画 CSS。
// Resolve a Loading variant scope into framework-agnostic dot chase scale animation CSS.
export const resolveLoadingDotChaseScaleCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const moveName = scope ? `${scope}_loading1` : 'loading1';
	const scaleName = scope ? `${scope}_loading2` : 'loading2';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${moveName} 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1),
		${scaleName} 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1);
}

@keyframes ${moveName} {
	50% {
		left: 100%;
	}
}

@keyframes ${scaleName} {
	50% {
		transform: scale(0.3, 0.3);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的裁切旋转加脉冲动画 CSS。
// Resolve a Loading variant scope into framework-agnostic clip-rotate plus pulse animation CSS.
export const resolveLoadingClipRotatePulseCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const rotateName = scope ? `${scope}_ball-clip-rotate-multiple-rotate` : 'ball-clip-rotate-multiple-rotate';
	const pulseName = scope ? `${scope}_ball-clip-rotate-pulse-scale` : 'ball-clip-rotate-pulse-scale';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.loading1 {
	animation: ${rotateName} 1s ease-in-out infinite;
}
${selectorPrefix}.loading2 {
	animation: ${pulseName} 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}

@keyframes ${rotateName} {
	0% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes ${pulseName} {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}

	30% {
		opacity: 0.3;
		transform: scale(0.15);
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的圆环旋转拉伸动画 CSS。
// Resolve a Loading variant scope into framework-agnostic circular stretch animation CSS.
export const resolveLoadingCircularStretchCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const rotateName = scope ? `${scope}_rotate` : 'rotate';
	const stretchName = scope ? `${scope}_stretch` : 'stretch';
	const selectorPrefix = scope ? `.${scope} ` : '';
	return `${selectorPrefix}.container {
	animation: ${rotateName} 2s linear infinite;
}
${selectorPrefix}.car {
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	stroke-linecap: round;
	animation: ${stretchName} 1.5s ease-in-out infinite;
	will-change: stroke-dasharray, stroke-dashoffset;
	transition: stroke 0.5s ease;
}
${selectorPrefix}.track {
	transition: stroke 0.5s ease;
}

@keyframes ${rotateName} {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes ${stretchName} {
	0% {
		stroke-dasharray: 0, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 75, 150;
		stroke-dashoffset: -25;
	}
	100% {
		stroke-dashoffset: -100;
	}
}`;
};

// 输入 Loading 变体作用域，返回框架无关的双圈旋转动画 CSS。
// Resolve a Loading variant scope into framework-agnostic double-rotate animation CSS.
export const resolveLoadingDoubleRotateCss = ({ scope = '' }: LoadingScopedCssOptions = {}): string => {
	const animationName = scope ? `${scope}_loading-animation` : 'loading-animation';
	const selector = scope ? `.${scope} .loading` : '.loading';
	return `${selector} {
	animation: ${animationName} 2s ease-in-out infinite alternate;
}

@keyframes ${animationName} {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(720deg);
	}
}`;
};

const resolveLoadingShapeAnimationName = (scope: string, index: number) =>
	scope ? `${scope}_animationShape${index}` : `animationShape${index}`;

// 输入 Loading 变体作用域，返回框架无关的四角平移动画 CSS。
// Resolve a Loading variant scope into framework-agnostic four-corner translate animation CSS.
export const resolveLoadingFourShapeTranslateCss = ({
	scope = '',
	shapeDurationBase = 0.5
}: LoadingFourShapeTranslateCssOptions = {}): string => {
	const selectorPrefix = scope ? `.${scope} ` : '';
	const shapeSelectors = [1, 2, 3, 4]
		.map(
			(index) => `${selectorPrefix}.shape${index} {
	animation: ${resolveLoadingShapeAnimationName(scope, index)} ${shapeDurationBase}s ease infinite alternate;
}`
		)
		.join('\n');
	const shapeTransforms = ['translate(16px, 16px)', 'translate(-16px, 16px)', 'translate(-16px, -16px)', 'translate(16px, -16px)'];
	const keyframes = shapeTransforms
		.map(
			(transform, index) => `@keyframes ${resolveLoadingShapeAnimationName(scope, index + 1)} {
	0% {
		transform: translate(0, 0);
	}

	100% {
		transform: ${transform};
	}
}`
		)
		.join('\n\n');

	return `${shapeSelectors}

${keyframes}`;
};

const loadingFourShapePositionFrames: Record<
	LoadingFourShapePositionMode,
	readonly [readonly [string, string], readonly [string, string]][]
> = {
	thirds: [
		[
			['0', '0'],
			['66.6666666667%', '66.6666666667%']
		],
		[
			['0', '66.6666666667%'],
			['66.6666666667%', '0']
		],
		[
			['66.6666666667%', '66.6666666667%'],
			['0', '0']
		],
		[
			['66.6666666667%', '0'],
			['0', '66.6666666667%']
		]
	],
	quarters: [
		[
			['0', '0'],
			['-10%', '-10%']
		],
		[
			['0', '50%'],
			['-10%', '60%']
		],
		[
			['50%', '50%'],
			['60%', '60%']
		],
		[
			['50%', '0'],
			['60%', '-10%']
		]
	]
};

// 输入 Loading 变体作用域和移动模式，返回框架无关的四个 shape 位置动画 CSS。
// Resolve Loading variant scope and movement mode into framework-agnostic four-shape position animation CSS.
export const resolveLoadingFourShapePositionCss = ({
	scope = '',
	containerDurationBase = 1.6,
	mode = 'thirds',
	shapeDurationBase = 0.8
}: LoadingFourShapePositionCssOptions = {}): string => {
	const selectorPrefix = scope ? `.${scope} ` : '';
	const containerAnimationName = scope ? `${scope}_animationContainer` : 'animationContainer';
	const shapeSelectors = [1, 2, 3, 4]
		.map(
			(index) => `${selectorPrefix}.shape${index} {
	animation: ${resolveLoadingShapeAnimationName(scope, index)} ${shapeDurationBase}s ease infinite alternate;
}`
		)
		.join('\n');
	const keyframes = loadingFourShapePositionFrames[mode]
		.map(
			([from, to], index) => `@keyframes ${resolveLoadingShapeAnimationName(scope, index + 1)} {
	0% {
		top: ${from[0]};
		left: ${from[1]};
	}
	100% {
		top: ${to[0]};
		left: ${to[1]};
	}
}`
		)
		.join('\n\n');

	return `${selectorPrefix}.loading {
	animation: ${containerAnimationName} ${containerDurationBase}s ease infinite;
}
${shapeSelectors}

@keyframes ${containerAnimationName} {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

${keyframes}`;
};

// 输入 Loading 线条索引，返回框架无关的旋转 style 字符串。
// Resolve a Loading line index into a framework-agnostic rotation style string.
export const resolveLoadingPulseLineTransformStyle = (index: number, lineCount = loadingPulseLineIndexes.length): string =>
	`transform: rotate(calc(360deg / -${lineCount}*${index}));`;

// 输入脉冲线条行状态，返回组件实现可直接绑定的框架无关 class。
// Receive pulse-line row state and return framework-agnostic classes ready for component binding.
export const resolveLoadingPulseLineRowClass = (): string => 'absolute left-1/2 flex h-8 w-0.75 flex-col gap-5 rounded-full bg-transparent';

// 输入 Loading 径向点索引，返回框架无关的旋转 style 字符串。
// Resolve a Loading radial-dot index into a framework-agnostic rotation style string.
export const resolveLoadingRadialEightTransformStyle = (index: number): string => `transform: rotate(calc(360deg / 8 * ${index})); `;

// 输入径向点行状态，返回组件实现可直接绑定的框架无关 class。
// Receive radial-dot row state and return framework-agnostic classes ready for component binding.
export const resolveLoadingRadialDotRowClass = (): string => 'absolute left-0 right-0 flex';

// 输入 Loading 摆动角度，返回框架无关的定位和旋转 style 字符串。
// Resolve a Loading wobble rotation into framework-agnostic positioning and rotation styles.
export const resolveLoadingWobbleRotationStyle = (rotation: number): string => `transform: rotate(${rotation}deg);left: 37.5%;width:25%;`;

// 输入 Loading 点动画状态，返回框架无关的变体样式。
// Accept Loading dot animation state and return framework-agnostic variant styles.
export const resolveLoadingRadialLineStyle = (index: number, speed = 1) =>
	resolveLoadingTimedStyle({
		prefixStyle: `transform: rotate(${index * 45}deg); `,
		durationBase: 0.3,
		speed,
		includeDelay: false
	});

export const resolveLoadingRadialDotStyle = ({
	color,
	delayMultiplier,
	speed = 1
}: {
	color?: LoadingStyleValue;
	delayMultiplier: number;
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		prefixStyle: 'transform: translateX(12px); ',
		color,
		colorProperty: 'background-color',
		durationBase: 0.9,
		speed,
		delayMultiplier
	});

export const resolveLoadingHalfFlowStyle = ({
	color,
	delayMultiplier = 0,
	speed = 1
}: {
	color?: LoadingStyleValue;
	delayMultiplier?: number;
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 3.5,
		speed,
		delayMultiplier,
		includeDelay: delayMultiplier !== 0
	});

export const resolveLoadingOrbitSpinContainerStyle = (speed = 1) =>
	resolveLoadingTimedStyle({
		durationBase: 2,
		speed,
		includeDelay: false
	});

export const resolveLoadingOrbitSpinDotStyle = ({ delayMultiplier, speed = 1 }: { delayMultiplier: number; speed?: number }) =>
	resolveLoadingTimedStyle({
		durationBase: 2,
		speed,
		delayMultiplier,
		delayDivisor: 2
	});

export const resolveLoadingOrbitSpinInnerStyle = ({
	color,
	delayMultiplier,
	speed = 1
}: {
	color?: LoadingStyleValue;
	delayMultiplier: number;
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 2,
		speed,
		delayMultiplier,
		delayDivisor: 2,
		includeDuration: false
	});

// 输入 orbit-spin 点容器状态，返回组件实现可直接绑定的框架无关 class。
// Receive orbit-spin dot container state and return framework-agnostic classes ready for component binding.
export const resolveLoadingOrbitSpinDotClass = (): string => 'dot absolute left-0 right-0 flex';

export const resolveLoadingOrbitSliceStyle = ({
	color,
	index,
	phase = 'leading',
	speed = 1
}: {
	color?: LoadingStyleValue;
	index: number;
	phase?: 'leading' | 'trailing';
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		prefixStyle: 'left: calc(50% - 32px / 12);width: calc(100% / 6);',
		color,
		colorProperty: 'background-color',
		durationBase: 2.5,
		speed,
		delayMultiplier: phase === 'trailing' ? -0.5 - index / 6 : -index / 6
	});

// 输入 orbit-slice 行状态，返回框架无关的行容器 class。
// Receive orbit-slice row state and return framework-agnostic row container classes.
export const resolveLoadingOrbitSliceRowClass = (): string => 'relative w-full';

// 输入 orbit-slice 行状态，返回框架无关的行容器 style 字符串。
// Receive orbit-slice row state and return a framework-agnostic row container style string.
export const resolveLoadingOrbitSliceRowStyle = (): string => 'height: calc(32px / 6);';

// 输入 orbit-slice 配色状态，返回框架无关的 slice class。
// Receive orbit-slice color state and return framework-agnostic slice classes.
export const resolveLoadingOrbitSliceClass = (bgClass = ''): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: 'slice absolute top-0 h-full shrink-0', size: 'none' });

// 输入垂直跳动点行状态，返回组件实现可直接绑定的框架无关 class。
// Receive vertical-jump dot row state and return framework-agnostic classes ready for component binding.
export const resolveLoadingVerticalJumpRowClass = (): string => 'flex items-center justify-between';

// 输入三点脉冲行状态，返回组件实现可直接绑定的框架无关 class。
// Receive three-dot pulse row state and return framework-agnostic classes ready for component binding.
export const resolveLoadingThreeDotPulseRowClass = (): string => 'relative flex items-center justify-between';

// 输入 leap-frog 轨道状态，返回组件实现可直接绑定的框架无关 class。
// Receive leap-frog track state and return framework-agnostic classes ready for component binding.
export const resolveLoadingLeapFrogTrackClass = (): string => 'dot absolute left-0 top-0 flex h-full w-full items-center';

// 输入半圈摆动线条状态，返回组件实现可直接绑定的框架无关 class。
// Receive half-turn swing line state and return framework-agnostic classes ready for component binding.
export const resolveLoadingSwingLineClass = (): string => 'dot absolute left-0 flex h-full w-full flex-col items-center';

export const resolveLoadingDiagonalDotStyle = ({
	color,
	index,
	delayMultiplier,
	speed = 1
}: {
	color?: LoadingStyleValue;
	index: number;
	delayMultiplier: number;
	speed?: number;
}) => {
	const [bottom, right] = loadingDiagonalDotPositions[index]!;
	return resolveLoadingTimedStyle({
		prefixStyle: `bottom: calc(${bottom}% + 1.6px);right: calc(${right}% + 1.6px);`,
		color,
		colorProperty: 'background-color',
		durationBase: 1.5,
		speed,
		delayMultiplier
	});
};

export const resolveLoadingWobbleDotStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	resolveLoadingTimedStyle({
		prefixStyle: 'padding-bottom: 100%;',
		color,
		colorProperty: 'background-color',
		durationBase: 1.5,
		speed,
		includeDelay: false
	});

export const resolveLoadingCubeStyle = ({ delayMultiplier, speed = 1 }: { delayMultiplier: number; speed?: number }) =>
	resolveLoadingTimedStyle({
		durationBase: 1.75,
		speed,
		delayMultiplier
	});

export const resolveLoadingCubeInnerStyle = ({
	color,
	delayMultiplier,
	speed = 1
}: {
	color?: LoadingStyleValue;
	delayMultiplier: number;
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 1.75,
		speed,
		delayMultiplier
	});

export const resolveLoadingExploreCenterLineStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 4,
		speed,
		includeDelay: false,
		suffixStyle: 'top: calc(50% - 2px); left: calc(50% - 2px);'
	});

export const resolveLoadingExploreLineStyle = ({
	color,
	delayMultiplier = 0,
	speed = 1
}: {
	color?: LoadingStyleValue;
	delayMultiplier?: number;
	speed?: number;
}) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 4,
		speed,
		delayMultiplier,
		includeDelay: delayMultiplier !== 0
	});

export const resolveLoadingHalfFlowContainerStyle = (speed = 1) =>
	resolveLoadingTimedStyle({
		durationBase: 3.5,
		speed,
		includeDelay: false
	});

export const resolveLoadingHalfFlowWrapStyle = (section: LoadingHalfFlowSection): string =>
	section === 'leading'
		? 'top: 8.25%; left: 8.25%; border-radius: 50% 50% calc(32px / 15);'
		: 'bottom: 8.25%; right: 8.25%; transform: rotate(180deg); align-self: flex-end; border-radius: 50% 50% calc(32px / 15);';

export const resolveLoadingHalfFlowPieceClass = (section: LoadingHalfFlowSection): string => (section === 'leading' ? 'half1' : 'half2');

// 输入半圆流动分段状态，返回组件实现可直接绑定的框架无关 class。
// Receive half-flow section state and return framework-agnostic classes ready for component binding.
export const resolveLoadingHalfFlowPieceRootClass = ({ section, bgClass = '' }: ResolveLoadingHalfFlowPieceRootClassOptions): string =>
	[
		resolveLoadingHalfFlowPieceClass(section),
		'relative h-full w-full origin-bottom-right',
		section === 'trailing' ? 'z-10' : '',
		bgClass.trim()
	]
		.filter(Boolean)
		.join(' ');

// 输入主题背景 class，返回半圆流动底色层的框架无关 class。
// Receive theme background class and return framework-agnostic classes for the half-flow overlay layer.
export const resolveLoadingHalfFlowOverlayClass = (bgClass = ''): string =>
	['absolute left-0 top-0 h-full w-full rounded-full opacity-10', bgClass.trim()].filter(Boolean).join(' ');

export const resolveLoadingHalfFlowPieceStyle = ({
	color,
	section,
	speed = 1
}: {
	color?: LoadingStyleValue;
	section: LoadingHalfFlowSection;
	speed?: number;
}) =>
	resolveLoadingHalfFlowStyle({
		color,
		delayMultiplier: section === 'trailing' ? -0.5 : 0,
		speed
	});

export const resolveLoadingWobbleContainerStyle = (speed = 1) =>
	resolveLoadingTimedStyle({
		durationBase: 1.5,
		speed,
		includeDelay: false
	});

export const resolveLoadingLeapFrogStyle = ({ offset, index, speed = 1 }: { offset: number; index: number; speed?: number }) =>
	resolveLoadingTimedStyle({
		prefixStyle: `transform: translateX(${32 * offset}px);`,
		durationBase: 2.5,
		speed,
		delayDivisor: -1.5 * index
	});

export const resolveLoadingSwingLineStyle = (index: number, speed = 1) =>
	resolveLoadingTimedStyle({
		durationBase: 1.6,
		speed,
		delayMultiplier: -(0.4 - index * 0.09)
	});

export const resolveLoadingSwingDotStyle = ({ color, index, opacity }: { color?: LoadingStyleValue; index: number; opacity: number }) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 0,
		includeDelay: false,
		includeDuration: false,
		suffixStyle: `opacity: ${opacity};transform: scale(${1 - 0.1 * index});`
	});

export const resolveLoadingBorderCapStyle = ({ color, rotate }: { color?: LoadingStyleValue; rotate: number }) =>
	`transform: rotate(${rotate}deg);border-color: ${color};border-right-color:transparent;border-left-color:transparent;`;

export const resolveLoadingCornerDotStyle = ({ color, index, speed = 1 }: { color?: LoadingStyleValue; index: number; speed?: number }) =>
	`animation-delay: ${index - 2}s;${resolveLoadingColorDurationStyle({
		color,
		durationBase: 1.5,
		speed,
		webkit: true
	})}`;

export const resolveLoadingClimbingDotBallStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	resolveLoadingColorDurationStyle({
		color,
		durationBase: 0.6,
		speed,
		clampAtBase: true
	});

export const resolveLoadingClimbingDotStepStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	resolveLoadingColorDurationStyle({
		color,
		durationBase: 1.8,
		speed,
		clampAtBase: true
	});

// 输入步骤索引，返回框架无关的爬梯步骤 class。
// Accept a step index and return a framework-agnostic climbing-dot step class.
export const resolveLoadingClimbingDotStepClass = (index: number): string => `step${index + 1}`;

// 输入点位索引和动画状态，返回框架无关的弹性点 style 字符串。
// Accept a dot index and animation state, then return a framework-agnostic elastic-dot style string.
export const resolveLoadingElasticDotStyle = ({ color, index, speed = 1 }: { color?: LoadingStyleValue; index: number; speed?: number }) =>
	resolveLoadingTimedStyle({
		prefixStyle: `left:${loadingElasticDotLeftPercents[index]};`,
		color,
		colorProperty: 'background',
		durationBase: 1,
		speed,
		includeDelay: false,
		webkit: true
	});

export const resolveLoadingTwoColorSolidBorderStyle = (color?: LoadingStyleValue) => `border-color:${color};`;

export const resolveLoadingTwoColorTransparentBorderStyle = (color?: LoadingStyleValue) =>
	`border-color:${color && 'transparent'};border-left-color:${color}`;

export const resolveLoadingTwoColorSolidBorderDurationStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	`${resolveLoadingTwoColorSolidBorderStyle(color)}${resolveLoadingAnimationDurationStyle(1, speed)}`;

export const resolveLoadingTwoColorTransparentBorderDurationStyle = ({ color, speed = 1 }: { color?: LoadingStyleValue; speed?: number }) =>
	`${resolveLoadingTwoColorTransparentBorderStyle(color)};${resolveLoadingAnimationDurationStyle(1, speed)}`;

export const resolveLoadingRotatingLineStyle = ({
	color,
	frame,
	speed = 1,
	top
}: {
	color?: LoadingStyleValue;
	frame: LoadingRotatingLineFrame;
	speed?: number;
	top: string;
}) =>
	resolveLoadingTimedStyle({
		color,
		colorProperty: 'background-color',
		durationBase: 0.9,
		speed,
		delayMultiplier: frame[0],
		suffixStyle: `top: ${top};opacity: ${frame[1]};`
	});

// 输入多色动画状态，返回框架无关的 style 字符串。
// Accept multi-color animation state and return a framework-agnostic style string.
export const resolveLoadingFourColorDurationStyle = ({
	customColor,
	durationBase,
	index,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingFourColorStyleOptions) =>
	resolveLoadingColorDurationStyle({
		color: resolveLoadingFourColor(customColor, index),
		durationBase,
		speed,
		webkit,
		clampAtBase
	});

// 输入边框动画状态，返回框架无关的多色 border style 字符串。
// Accept border animation state and return a framework-agnostic multi-color border style string.
export const resolveLoadingFourColorBorderDurationStyle = ({
	customColor,
	durationBase,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingBorderDurationStyleOptions) =>
	`border-color: ${resolveLoadingFourColor(customColor, 0)} ${resolveLoadingFourColor(customColor, 1)} ${resolveLoadingFourColor(customColor, 2)} ${resolveLoadingFourColor(customColor, 3)};${resolveLoadingAnimationDurationStyle(
		durationBase,
		speed,
		{
			webkit,
			clampAtBase
		}
	)}`;

// 输入双色边框动画状态，返回框架无关的 border style 字符串。
// Accept two-color border animation state and return a framework-agnostic border style string.
export const resolveLoadingTwoColorBorderDurationStyle = ({
	customColor,
	durationBase,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingBorderDurationStyleOptions) =>
	`border-color: ${customColor[0] || ''} ${customColor[1] || ''} ${customColor[0] || ''} ${customColor[1] || ''};${resolveLoadingAnimationDurationStyle(
		durationBase,
		speed,
		{
			webkit,
			clampAtBase
		}
	)}`;

// 输入边框透明边状态，返回框架无关的 border style 字符串。
// Accept transparent border side state and return a framework-agnostic border style string.
export const resolveLoadingBorderTransparentDurationStyle = ({
	color,
	durationBase,
	prefixStyle = '',
	speed = 1,
	transparentSides = [],
	webkit = true,
	clampAtBase = false
}: LoadingBorderTransparentDurationStyleOptions) =>
	`${prefixStyle}${resolveLoadingColorStyle('border-color', color)}${transparentSides.map((side) => `${side}:transparent;`).join('')}${resolveLoadingAnimationDurationStyle(
		durationBase,
		speed,
		{
			webkit,
			clampAtBase
		}
	)}`;

// 输入带透明度后缀的颜色状态，返回框架无关的 border style 字符串。
// Accept alpha-suffix color state and return a framework-agnostic border style string.
export const resolveLoadingAlphaBorderDurationStyle = ({
	color,
	durationBase,
	fullBorder = false,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingAlphaBorderDurationStyleOptions) => {
	const weakColor = `${color}0D`;
	const strongColor = `${color}FF`;
	const colorStyle = fullBorder
		? `border-color: ${weakColor} ${strongColor} ${weakColor} ${strongColor};`
		: `border-color:${weakColor};border-left-color:${strongColor};`;
	return `${colorStyle}${resolveLoadingAnimationDurationStyle(durationBase, speed, { webkit, clampAtBase })}`;
};

// 输入序列点状动画状态，返回框架无关的 style 字符串。
// Accept indexed dot animation state and return a framework-agnostic style string.
export const resolveLoadingIndexedDotStyle = ({
	index,
	delayOffsetMs = 0,
	delayStepMs = 100,
	color,
	colorProperty = 'background',
	durationBase,
	speed = 1,
	webkit = true,
	clampAtBase = false
}: LoadingIndexedDotStyleOptions) =>
	`animation-delay: ${resolveLoadingIndexDelayMs(index, delayStepMs, delayOffsetMs)}ms;${resolveLoadingColorDurationStyle({
		color,
		colorProperty,
		durationBase,
		speed,
		webkit,
		clampAtBase
	})}`;

// 输入三点动画状态，返回组件层直接绑定的点位 style。
// Receive three-dot animation state and return bind-ready dot styles for the component layer.
export const resolveLoadingThreeDotIndexedStyle = ({ index, customColor = [], speed = 1 }: LoadingOneColorIndexedVariantStyleOptions) =>
	resolveLoadingIndexedDotStyle({ index, delayOffsetMs: -300, color: customColor[0], durationBase: 1, speed });

// 输入四块位移动画状态，返回组件层直接绑定的形状 style。
// Receive four-shape translate animation state and return bind-ready shape styles for the component layer.
export const resolveLoadingFourShapeTranslateStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 0.5, speed });

export const loadingShapeContainerDurationBase = {
	'1_19': 1.6,
	'1_21': 1.2,
	'2_3': 0.5,
	'2_4': 1.6,
	'2_5': 1.2,
	'4_1': 0.5,
	'4_2': 1.6,
	'4_3': 1.2
} as const;

export const loadingShapeItemDurationBase = {
	'1_19': 0.8,
	'1_21': 0.6,
	'2_3': 0.5,
	'2_4': 0.8,
	'2_5': 0.6,
	'4_1': 0.5,
	'4_2': 0.8,
	'4_3': 0.6
} as const;

export const loadingShapePieceBaseClasses = {
	cornerThird: ['left-0 top-0 h-1/3 w-1/3', 'right-0 top-0 h-1/3 w-1/3', 'bottom-0 right-0 h-1/3 w-1/3', 'bottom-0 left-0 h-1/3 w-1/3'],
	roundThird: ['h-1/3 w-1/3 rounded-full', 'h-1/3 w-1/3 rounded-full', 'h-1/3 w-1/3 rounded-full', 'h-1/3 w-1/3 rounded-full'],
	roundHalf: ['h-1/2 w-1/2 rounded-tl-full', 'h-1/2 w-1/2 rounded-tr-full', 'h-1/2 w-1/2 rounded-br-full', 'h-1/2 w-1/2 rounded-bl-full']
} as const;

export const loadingRoundDotSizeClasses = {
	sm: 'h-1.5 w-1.5',
	md: 'h-2 w-2'
} as const;

export const loadingRoundedElementSizeClasses = {
	none: '',
	xs: 'h-1 w-1',
	sm: 'h-1.5 w-1.5',
	md: 'h-2 w-2',
	lg: 'h-3 w-3',
	xl: 'h-4 w-4',
	third: 'h-1/3 w-1/3',
	half: 'h-1/2 w-1/2',
	quarter: 'h-1/4 w-1/4',
	full: 'h-full w-full',
	zeroFullWidth: 'h-0 w-full',
	stream: 'h-full w-1/5'
} as const;

// 输入边框元素角色和主题 class，返回框架无关的边框元素 class。
// Receive a border-element role and theme class, then return framework-agnostic border-element classes.
export const resolveLoadingBorderElementClass = ({
	className = '',
	colorClass = '',
	kind,
	size = ''
}: ResolveLoadingBorderElementClassOptions): string => {
	const baseClass = className.trim();
	const color = colorClass.trim();
	const safeSize = size.trim();

	const classMap = {
		alphaSpinnerRing: [baseClass, safeSize, 'm-auto animate-spin rounded-full border-2', color],
		borderCapEnd: [
			baseClass,
			'absolute bottom-0 right-0',
			color,
			'border-l-1.25 border-r-1.25 border-t-1.25 border-l-transparent border-r-transparent dark:border-l-transparent dark:border-r-transparent'
		],
		borderCapStart: [
			baseClass,
			'absolute',
			color,
			'border-l-1.25 border-r-1.25 border-t-1.25 border-l-transparent border-r-transparent dark:border-l-transparent dark:border-r-transparent'
		],
		clipPulseRing: [
			baseClass,
			'absolute h-full w-full border-2 !border-l-transparent !border-r-transparent rounded-full',
			color,
			'loading1'
		],
		clippedInnerRing: [
			baseClass,
			'absolute left-1/2 top-1/2 m-auto h-1/2 w-1/2 border-2 !border-b-transparent !border-t-transparent rounded-full',
			color,
			'loading'
		],
		clippedOuterRing: [
			baseClass,
			'absolute left-1/2 top-1/2',
			safeSize,
			'm-auto border-2 !border-l-transparent !border-r-transparent rounded-full',
			color,
			'loading'
		],
		doubleSpinnerRing: [baseClass, safeSize, 'loading m-auto rounded-full border-4', color],
		nestedSpinnerInner: [baseClass, 'h-full w-full border-2 rounded-full', color],
		nestedSpinnerOuter: [baseClass, safeSize, 'm-auto rounded-full border-2 p-0.5 animate-spin', color],
		splitSpinnerRing: [
			baseClass,
			safeSize,
			'm-auto border-2 rounded-full',
			color,
			'animate-spin border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent'
		],
		topSpinnerRing: [
			baseClass,
			safeSize,
			'm-auto border-2',
			color,
			'animate-spin rounded-full border-t-transparent dark:border-t-transparent'
		]
	} satisfies Record<LoadingBorderElementKind, string[]>;

	return classMap[kind].filter(Boolean).join(' ');
};

// 输入圆角元素尺寸和配色 class，返回框架无关的圆角元素 class。
// Receive rounded-element size and color class, then return framework-agnostic rounded-element classes.
export const resolveLoadingRoundedElementClass = ({
	bgClass = '',
	className = '',
	size = 'md'
}: ResolveLoadingRoundedElementClassOptions = {}): string =>
	[className.trim(), loadingRoundedElementSizeClasses[size], 'rounded-full', bgClass.trim()].filter(Boolean).join(' ');

// 输入 ball-scale 圆点状态，返回组件实现可直接绑定的框架无关 class。
// Receive ball-scale dot state and return framework-agnostic classes ready for component binding.
export const resolveLoadingBallScaleDotClass = ({ bgClass = '', size = '' }: ResolveLoadingBallScaleDotClassOptions = {}): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: `${size} m-auto`, size: 'none' });

// 输入序号点状态，返回 square-swap 动画点的框架无关 class。
// Receive indexed dot state and return framework-agnostic square-swap dot classes.
export const resolveLoadingSquareSwapDotClass = ({ bgClass = '', index }: ResolveLoadingIndexedRoundedDotClassOptions): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: `absolute loading${index + 1}`, size: 'third' });

// 输入序号点状态，返回 two-dot-elastic 动画点的框架无关 class。
// Receive indexed dot state and return framework-agnostic two-dot-elastic dot classes.
export const resolveLoadingTwoDotElasticDotClass = ({ bgClass = '', index }: ResolveLoadingIndexedRoundedDotClassOptions): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: `flex-1 loading${index + 1}`, size: 'half' });

// 输入序号点状态，返回 elastic-dots 动画点的框架无关 class。
// Receive indexed dot state and return framework-agnostic elastic-dots dot classes.
export const resolveLoadingElasticDotClass = ({ bgClass = '', index }: ResolveLoadingIndexedRoundedDotClassOptions): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: `absolute loading${index + 1} top-1/2`, size: 'quarter' });

// 输入 dot-chase-scale 配色状态，返回框架无关的动画点 class。
// Receive dot-chase-scale color state and return framework-agnostic animation dot classes.
export const resolveLoadingDotChaseScaleDotClass = (bgClass = ''): string =>
	resolveLoadingRoundedElementClass({ bgClass, className: 'absolute -left-1/2 top-1/4 loading opacity-60', size: 'xl' });

// 输入圆点尺寸和配色 class，返回框架无关的圆点 class。
// Receive round-dot size and color class, then return framework-agnostic round-dot classes.
export const resolveLoadingRoundDotClass = ({
	bgClass = '',
	className = '',
	size = 'md'
}: ResolveLoadingRoundDotClassOptions = {}): string => resolveLoadingRoundedElementClass({ bgClass, className, size });

// 输入 SVG 描边 class 和主题描边 class，返回框架无关的 SVG class。
// Receive SVG stroke class and theme stroke class, then return framework-agnostic SVG classes.
export const resolveLoadingSvgStrokeClass = ({ className = '', strokeClass = '' }: ResolveLoadingSvgStrokeClassOptions = {}): string =>
	[className.trim(), strokeClass.trim()].filter(Boolean).join(' ');

// 输入主题文字 class，返回框架无关的旋转 SVG class。
// Receive a theme text class and return framework-agnostic spinning SVG classes.
export const resolveLoadingSpinnerSvgClass = (textClass = ''): string => ['animate-spin', textClass.trim()].filter(Boolean).join(' ');

// 输入主题文字 class，返回框架无关的拉伸 SVG class。
// Receive a theme text class and return framework-agnostic stretch SVG classes.
export const resolveLoadingStretchSvgClass = (textClass = ''): string =>
	['container overflow-visible will-change-transform origin-center', textClass.trim()].filter(Boolean).join(' ');

// 输入轨道配色 class，返回框架无关的轨道遮罩 class。
// Receive track color class and return framework-agnostic track overlay classes.
export const resolveLoadingTrackOverlayClass = (bgClass = ''): string =>
	['absolute h-full w-full opacity-10', bgClass.trim()].filter(Boolean).join(' ');

// 输入轨道配色 class，返回框架无关的轨道主体 class。
// Receive track color class and return framework-agnostic track body classes.
export const resolveLoadingTrackBarClass = (bgClass = ''): string =>
	['container h-full w-full rounded-full', bgClass.trim()].filter(Boolean).join(' ');

// 输入线条配色 class，返回框架无关的旋转线 class。
// Receive line color class and return framework-agnostic rotating-line classes.
export const resolveLoadingRotatingLineClass = (bgClass = ''): string =>
	['line absolute left-0 h-1 w-full rounded-full', bgClass.trim()].filter(Boolean).join(' ');

// 输入线条配色 class，返回框架无关的脉冲线 class。
// Receive line color class and return framework-agnostic pulse-line classes.
export const resolveLoadingPulseLineClass = (bgClass = ''): string => ['h-1/5 rounded-full line', bgClass.trim()].filter(Boolean).join(' ');

// 输入爬升点索引和配色 class，返回框架无关的 step class。
// Receive climbing-dot index and color class, then return framework-agnostic step classes.
export const resolveLoadingClimbingDotStepRootClass = ({
	bgClass = '',
	stepIndex
}: ResolveLoadingClimbingDotStepRootClassOptions): string =>
	['absolute top-0 right-0', bgClass.trim(), 'steps', resolveLoadingClimbingDotStepClass(stepIndex)].filter(Boolean).join(' ');

// 输入配色 class，返回框架无关的 cube 内层 class。
// Receive a color class and return framework-agnostic cube-inner classes.
export const resolveLoadingCubeInnerClass = (bgClass = ''): string =>
	['cube__inner h-2 w-2 rounded-xs', bgClass.trim()].filter(Boolean).join(' ');

// 输入 Loading cube 项状态，返回框架无关的 cube 外层 class。
// Receive Loading cube item state and return framework-agnostic cube wrapper classes.
export const resolveLoadingCubeRootClass = (): string => 'cube h-2 w-2';

// 输入 Loading half-flow 项状态，返回框架无关的裁剪容器 class。
// Receive Loading half-flow item state and return framework-agnostic clipping wrapper classes.
export const resolveLoadingHalfFlowWrapClass = (): string =>
	'loading-half-wrap isolation absolute flex items-center justify-center overflow-hidden';

// 输入 Loading wobble 旋转项状态，返回框架无关的旋转容器 class。
// Receive Loading wobble rotation item state and return framework-agnostic rotation wrapper classes.
export const resolveLoadingWobbleRotationClass = (): string => 'absolute h-full';

// 输入 Loading stream 轨道状态，返回框架无关的轨道 class。
// Receive Loading stream track state and return framework-agnostic track classes.
export const resolveLoadingStreamTrackClass = (): string => 'stream-track relative flex h-1/5 w-full items-center justify-between';

// 输入配色 class，返回框架无关的柱状条 class。
// Receive a color class and return framework-agnostic bar item classes.
export const resolveLoadingBarItemClass = (bgClass = ''): string => ['bar h-full w-0.75', bgClass.trim()].filter(Boolean).join(' ');

// 输入探索线类型和配色 class，返回框架无关的探索线 class。
// Receive explore-line type and color class, then return framework-agnostic explore-line classes.
export const resolveLoadingExploreLineClass = ({ bgClass = '', kind }: ResolveLoadingExploreLineClassOptions): string =>
	[kind === 'center' ? 'line1' : 'line2', 'absolute w-1 h-1', bgClass.trim()].filter(Boolean).join(' ');

// 输入 shape 点位和配色 class，返回框架无关的形状块 class。
// Receive shape index and color class, then return framework-agnostic shape-piece classes.
export const resolveLoadingShapePieceClass = ({ variant, index, bgClass = '' }: ResolveLoadingShapePieceClassOptions): string => {
	const safeIndex = Math.max(0, Math.min(index, 3));
	return [`shape${safeIndex + 1}`, 'absolute', loadingShapePieceBaseClasses[variant][safeIndex], bgClass.trim()].filter(Boolean).join(' ');
};

// 输入 shape 容器角色和尺寸，返回框架无关的 shape 容器 class。
// Receive a shape-container role and size, then return framework-agnostic shape-container classes.
export const resolveLoadingShapeContainerClass = ({ kind, size = '' }: ResolveLoadingShapeContainerClassOptions): string => {
	const safeSize = size.trim();
	const classMap = {
		loadingRelative: [safeSize, 'loading relative m-auto'],
		rotatedCorner: [safeSize, 'relative m-auto rotate-45']
	} satisfies Record<LoadingShapeContainerClassKind, string[]>;

	return classMap[kind].filter(Boolean).join(' ');
};

// 输入 Loading 布局角色和尺寸，返回框架无关的容器 class。
// Receive a Loading layout role and size, then return framework-agnostic container classes.
export const resolveLoadingLayoutClass = ({ className = '', kind, size = '' }: ResolveLoadingLayoutClassOptions): string => {
	const baseClass = className.trim();
	const safeSize = size.trim();
	const classMap = {
		center: [baseClass, safeSize, 'm-auto'],
		containerRelativeFlexCenter: [baseClass, safeSize, 'container relative m-auto flex items-center'],
		containerRelativeFlexColumn: [baseClass, safeSize, 'container relative m-auto flex flex-col'],
		containerRelativeInlineBlock: [baseClass, safeSize, 'container relative m-auto inline-block'],
		flexBetween: [baseClass, safeSize, 'm-auto flex items-center justify-between'],
		flexCenter: [baseClass, safeSize, 'm-auto flex items-center'],
		flexCenterJustified: [baseClass, safeSize, 'm-auto flex items-center justify-center'],
		flexColumn: [baseClass, safeSize, 'flex flex-col justify-center'],
		flexColumnCenter: [baseClass, safeSize, 'm-auto flex flex-col justify-center'],
		flexColumnItemsCenter: [baseClass, safeSize, 'm-auto flex flex-col items-center justify-center'],
		flexEndBetween: [baseClass, safeSize, 'm-auto flex items-end justify-between'],
		loadingFlexBetween: [baseClass, safeSize, 'loading m-auto flex items-center justify-between'],
		loadingRelative: [baseClass, safeSize, 'loading relative m-auto'],
		loadingRelativeBox: [baseClass, safeSize, 'loading relative m-auto box-border'],
		relativeCenter: [baseClass, safeSize, 'relative m-auto'],
		relativeCenterBox: [baseClass, safeSize, 'relative m-auto box-border'],
		relativeFlexCenter: [baseClass, safeSize, 'relative m-auto flex items-center'],
		relativeRotatedFlexCenter: [baseClass, safeSize, 'relative m-auto flex -rotate-90 items-center'],
		relativeTranslateNegativeHalf: [baseClass, safeSize, 'relative m-auto -translate-x-0.5'],
		rotatedCorner: [baseClass, safeSize, 'relative m-auto rotate-45'],
		trackShell: [baseClass, safeSize, 'relative m-auto overflow-hidden rounded-full'],
		svgFull: [baseClass, 'h-full w-full origin-center overflow-visible'],
		svgFullSized: [baseClass, safeSize, 'm-auto h-full w-full origin-center overflow-visible'],
		svgOrigin: [baseClass, safeSize, 'origin-center overflow-visible'],
		svgOriginWillChange: [baseClass, safeSize, 'origin-center overflow-visible will-change-transform']
	} satisfies Record<LoadingLayoutClassKind, string[]>;

	return classMap[kind].filter(Boolean).join(' ');
};

// 输入轨道高度配置，返回框架无关的轨道容器 style。
// Receive track height config and return framework-agnostic track container styles.
export const resolveLoadingTrackShellStyle = (height = '4px'): string => `height:${height}`;

// 输入变体标识，返回 shape 容器动画时长 style；变体时长规则保留在公共层。
// Receive a variant id and return the shape-container duration style; variant timing rules stay in the shared layer.
export const resolveLoadingShapeContainerStyle = ({ variant, speed = 1 }: Pick<LoadingShapeVariantStyleOptions, 'variant' | 'speed'>) =>
	resolveLoadingAnimationDurationStyle(loadingShapeContainerDurationBase[variant], speed);

// 输入一色 shape 变体状态，返回子形状 style。
// Receive one-color shape variant state and return child-shape styles.
export const resolveLoadingOneColorShapeStyle = ({ variant, customColor = [], speed = 1 }: LoadingShapeVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: loadingShapeItemDurationBase[variant], speed });

// 输入双色 shape 变体状态，返回交替颜色的子形状 style。
// Receive two-color shape variant state and return alternating child-shape styles.
export const resolveLoadingTwoColorShapeStyle = ({ variant, index, customColor = [], speed = 1 }: LoadingIndexedShapeVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[index % 2], durationBase: loadingShapeItemDurationBase[variant], speed });

// 输入四色 shape 变体状态，返回指定点位的子形状 style。
// Receive four-color shape variant state and return child-shape styles for the requested index.
export const resolveLoadingFourColorShapeStyle = ({
	variant,
	index,
	customColor = [],
	speed = 1
}: LoadingIndexedShapeVariantStyleOptions) =>
	resolveLoadingFourColorDurationStyle({ customColor, index, durationBase: loadingShapeItemDurationBase[variant], speed });

// 输入 Loading 变体配色状态，返回组件层直接绑定的基础 style preset。
// Receive Loading variant color state and return bind-ready base style presets for component implementations.
export const resolveLoadingOneColorBackgroundStyle = ({ customColor = [] }: Pick<LoadingOneColorVariantStyleOptions, 'customColor'>) =>
	resolveLoadingColorStyle('background', customColor[0]);

export const resolveLoadingOneColorBackgroundColorStyle = ({ customColor = [] }: Pick<LoadingOneColorVariantStyleOptions, 'customColor'>) =>
	resolveLoadingColorStyle('background-color', customColor[0]);

export const resolveLoadingOneColorColorStyle = ({ customColor = [] }: Pick<LoadingOneColorVariantStyleOptions, 'customColor'>) =>
	resolveLoadingColorStyle('color', customColor[0]);

export const resolveLoadingOneColorStrokeStyle = ({ customColor = [] }: Pick<LoadingOneColorVariantStyleOptions, 'customColor'>) =>
	resolveLoadingColorStyle('stroke', customColor[0]);

export const resolveLoadingOneColorSvgSpinStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], colorProperty: 'color', durationBase: 1, speed });

export const resolveLoadingOneColorBaseStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1, speed });

export const resolveLoadingOneColorSlowStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1.5, speed });

export const resolveLoadingOneColorBorderBaseStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1, speed, colorProperty: 'border-color' });

export const resolveLoadingOneColorBorderSlowStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1.5, speed, colorProperty: 'border-color' });

export const resolveLoadingOneColorStrokeBaseStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1, speed, colorProperty: 'stroke' });

export const resolveLoadingOneColorStrokeTravelStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], colorProperty: 'stroke', durationBase: 1.2, speed });

export const resolveLoadingOneColorStrokeSlowStyle = ({ customColor = [], speed = 1 }: LoadingOneColorVariantStyleOptions) =>
	resolveLoadingColorDurationStyle({ color: customColor[0], durationBase: 1.5, speed, colorProperty: 'stroke' });

export const resolveLoadingOrbitContainerStyle = ({ speed = 1 }: Pick<LoadingOneColorVariantStyleOptions, 'speed'>) =>
	resolveLoadingAnimationDurationStyle(2, speed);

export const resolveLoadingOrbitCarStyle = ({ speed = 1 }: Pick<LoadingOneColorVariantStyleOptions, 'speed'>) =>
	resolveLoadingAnimationDurationStyle(1.5, speed);

export const resolveLoadingBaseAnimationStyle = ({ speed = 1 }: Pick<LoadingOneColorVariantStyleOptions, 'speed'>) =>
	resolveLoadingAnimationDurationStyle(1, speed);

export const getLoadingToneColorClass = (tone: LoadingTone, options: { theme?: boolean; inverse?: boolean; leading?: boolean } = {}) => {
	const { theme = false, inverse = false, leading = true } = options;
	const key = inverse ? (theme ? 'inverseTheme' : 'inverse') : theme ? 'theme' : 'normal';
	const className = loadingToneColorClass[tone][key];
	return leading ? ` ${className}` : className;
};

// 输入 Loading 配色状态，返回框架无关的分割环颜色 class。
// Resolve Loading color state into framework-agnostic split-ring color classes.
export const getLoadingSplitRingColorClass = (options: { theme?: boolean; inverse?: boolean; leading?: boolean } = {}) => {
	const { theme = false, inverse = false, leading = true } = options;
	const className = inverse
		? theme
			? 'border-dark dark:border-primary'
			: 'border-white dark:border-black'
		: theme
			? 'text-primary dark:text-dark'
			: 'text-black dark:text-white';
	return leading ? ` ${className}` : className;
};

export const getLoadingSpinBorderClass = (options: { theme?: boolean; inverse?: boolean; double?: boolean; leading?: boolean } = {}) => {
	const { theme = false, inverse = false, double = false, leading = true } = options;
	const key = inverse ? (theme ? 'inverseTheme' : 'inverse') : theme ? 'theme' : 'normal';
	const className = (double ? loadingSpinDoubleBorderClass : loadingSpinBorderClass)[key];
	return leading ? ` ${className}` : className;
};

export const getLoadingTwoColorOuterBorderClass = (options: { inverse?: boolean; leading?: boolean } = {}) => {
	const { inverse = false, leading = true } = options;
	const className = loadingTwoColorOuterBorderClass[inverse ? 'inverse' : 'normal'];
	return leading ? ` ${className}` : className;
};

export const getLoadingTwoColorInnerBorderClass = (options: { inverse?: boolean; leading?: boolean } = {}) => {
	const { inverse = false, leading = true } = options;
	const className = loadingTwoColorInnerBorderClass[inverse ? 'inverse' : 'normal'];
	return leading ? ` ${className}` : className;
};

export const getLoadingTwoColorBgClass = (options: { inverse?: boolean; secondary?: boolean; leading?: boolean } = {}) => {
	const { inverse = false, secondary = false, leading = false } = options;
	const key = inverse ? (secondary ? 'inverseSecondary' : 'inverse') : secondary ? 'secondary' : 'normal';
	const className = loadingTwoColorBgClass[key];
	return leading ? ` ${className}` : className;
};

// 输入一色 Loading 配色状态，返回组件层可直接拼接的框架无关 class 片段。
// Receive one-color Loading color state and return framework-agnostic class fragments for component composition.
export const resolveLoadingOneColorClassState = ({
	theme = false,
	inverse = false
}: ResolveLoadingOneColorClassStateOptions = {}): LoadingOneColorClassState => ({
	bgClass: getLoadingToneColorClass('bg', { theme, inverse }),
	borderClass: getLoadingToneColorClass('border', { theme, inverse }),
	doubleSpinBorderClass: getLoadingSpinBorderClass({ theme, inverse, double: true }),
	spinBorderClass: getLoadingSpinBorderClass({ theme, inverse }),
	splitRingClass: getLoadingSplitRingColorClass({ theme, inverse }),
	strokeClass: getLoadingToneColorClass('stroke', { theme, inverse }),
	textClass: getLoadingToneColorClass('text', { theme, inverse })
});

// 输入两色 Loading 配色状态，返回组件层可直接拼接的框架无关 class 片段。
// Receive two-color Loading color state and return framework-agnostic class fragments for component composition.
export const resolveLoadingTwoColorClassState = ({
	inverse = false
}: ResolveLoadingTwoColorClassStateOptions = {}): LoadingTwoColorClassState => ({
	bgClass: getLoadingTwoColorBgClass({ inverse }),
	innerBorderClass: getLoadingTwoColorInnerBorderClass({ inverse }),
	outerBorderClass: getLoadingTwoColorOuterBorderClass({ inverse }),
	secondaryBgClass: getLoadingTwoColorBgClass({ inverse, secondary: true }),
	spinBorderClass: getLoadingSpinBorderClass({ inverse, double: true, leading: false })
});
