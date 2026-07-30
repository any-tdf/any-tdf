export const charRollPresetCharSets = {
	number: '0123456789',
	letter: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	letterUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	letterLower: 'abcdefghijklmnopqrstuvwxyz',
	alphanumeric: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	hex: '0123456789abcdef',
	hexUpper: '0123456789ABCDEF',
	binary: '01',
	octal: '01234567'
} as const;

export const charRollRadiusClass = {
	none: 'rounded-none',
	xs: 'rounded-xs',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	'4xl': 'rounded-4xl',
	full: 'rounded-full',
	'': ''
} as const;

export const charRollBgClass = {
	none: '',
	surface: 'bg-bg-surface dark:bg-bg-surface-dark',
	gray: 'bg-gray-100 dark:bg-gray-800',
	theme: 'bg-primary/10 dark:bg-dark/10'
} as const;

export const charRollGapClass = {
	'0': 'gap-0',
	'1': 'gap-1',
	'2': 'gap-2',
	'3': 'gap-3',
	'4': 'gap-4'
} as const;

export const charRollFontSizeClass = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl'
} as const;

export const charRollFontWeightClass = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold'
} as const;

export type CharRollPresetKey = keyof typeof charRollPresetCharSets;
export type CharRollDirection = 'up' | 'down';
export type CharRollEasingFunction = (progress: number) => number;
export type CharRollEasingMap = Record<string, CharRollEasingFunction | undefined>;
export type CharRollStyleValue = Record<string, string | number>;

export type ResolveCharRollClassOptions = {
	bg?: keyof typeof charRollBgClass | string;
	charClass?: string;
	fontSize?: keyof typeof charRollFontSizeClass | string;
	fontWeight?: keyof typeof charRollFontWeightClass | string;
	gap?: keyof typeof charRollGapClass | string;
	injClass?: string;
	radius?: keyof typeof charRollRadiusClass | string;
};

export type ResolveCharRollDisplayStateOptions = FormatCharRollValueOptions & {
	autoStart?: boolean;
	charSetArray: string[];
	direction?: CharRollDirection;
	loops?: number;
	prefix?: string;
	previousAnimationProgress?: readonly number[];
	previousDisplayChars?: readonly string[];
	previousStartIndexes?: readonly number[];
	previousTargetIndexes?: readonly number[];
	suffix?: string;
};

export type CharRollDisplayState = {
	animationProgress: number[];
	charStarted: boolean[];
	displayChars: string[];
	formattedValue: string;
	startIndexes: number[];
	targetIndexes: number[];
};

export type ResolveCharRollFrameStateOptions = {
	charCount: number;
	duration: number;
	easing: (progress: number) => number;
	elapsed: number;
	stagger: number;
};

export type CharRollFrameState = {
	allComplete: boolean;
	animationProgress: number[];
	charStarted: boolean[];
};

export type CharRollStartAction = {
	shouldStart: boolean;
	nextAnimating: boolean;
	startTime: number;
};

export type ResolveCharRollFrameActionOptions = {
	charCount: number;
	delay: number;
	displayChars: readonly string[];
	duration: number;
	easing: (progress: number) => number;
	loop?: boolean;
	loopInterval?: number;
	now: number;
	separator?: boolean;
	stagger: number;
	startTime: number;
	targetIndexes: readonly number[];
	value: string | number;
	decimal?: number;
};

export type CharRollFrameAction = CharRollFrameState & {
	changeValue: string;
	completeCharStarted: boolean[];
	completeStartIndexes: number[];
	elapsed: number;
	loopDelayMs: number;
	nextAnimating: boolean;
	shouldComplete: boolean;
	shouldContinue: boolean;
	shouldScheduleLoop: boolean;
};

export type CharRollResetAction = ReturnType<typeof resolveCharRollResetState> & {
	nextAnimating: boolean;
	shouldCancelFrame: boolean;
};

export type ResolveCharRollPauseActionOptions = {
	animationProgress: readonly number[];
	charSetArray: string[];
	direction?: CharRollDirection;
	displayChars: readonly string[];
	loops?: number;
	rafActive?: boolean;
	startIndexes: readonly number[];
	targetIndexes: readonly number[];
};

export type CharRollPauseAction = {
	animationProgress: number[];
	nextAnimating: boolean;
	shouldCancelFrame: boolean;
	startIndexes: number[];
};

export type ResolveCharRollValueChangeActionOptions = FormatCharRollValueOptions & {
	initialized: boolean;
	previousValue: string;
	autoStart?: boolean;
};

export type CharRollValueChangeAction = {
	formattedValue: string;
	nextPreviousValue: string;
	shouldRestart: boolean;
	shouldUpdateDisplay: boolean;
};

export type ResolveCharRollDisplayMetaOptions = {
	animationProgress?: readonly number[];
	char: string;
	charSetArray: string[];
	charStarted?: readonly boolean[];
	direction?: CharRollDirection;
	height: number;
	index: number;
	isAnimating?: boolean;
	loops?: number;
	startIndexes?: readonly number[];
	targetIndexes?: readonly number[];
};

export type CharRollDisplayMeta = {
	charSetArray: string[];
	displayChar: string;
	hasStarted: boolean;
	inCharSet: boolean;
	minWidth: number;
	progress: number;
	renderCount: number;
	scrollOffset: number;
	standbyChar: string;
};

export type ResolveCharRollDisplayItemsOptions = Omit<ResolveCharRollDisplayMetaOptions, 'char' | 'index'> & {
	displayChars?: readonly string[];
};

export type CharRollDisplayItem = {
	char: string;
	index: number;
	meta: CharRollDisplayMeta;
	renderIndexes: number[];
	charHeightStyle: CharRollStyleValue;
	charHeightStyleString: string;
	directStyle: CharRollStyleValue;
	directStyleString: string;
	rollItemStyle: CharRollStyleValue;
	rollItemStyleString: string;
	scrollStyle: CharRollStyleValue;
	scrollStyleString: string;
};

export type ResolveCharRollDerivedOptions = ResolveCharRollClassOptions &
	Omit<ResolveCharRollDisplayItemsOptions, 'charSetArray' | 'height'> & {
		charSet?: string;
		height?: number;
		preset?: CharRollPresetKey;
	};
export type CharRollStatePropsLike = Partial<ResolveCharRollDerivedOptions>;
export type ResolveCharRollStateOptionsParams = {
	animationProgress?: readonly number[];
	charStarted?: readonly boolean[];
	displayChars?: readonly string[];
	isAnimating?: boolean;
	props: CharRollStatePropsLike;
	startIndexes?: readonly number[];
	targetIndexes?: readonly number[];
};

export type CharRollDerived = {
	charClassName: string;
	charHeightStyleString: string;
	charHeightStyleValue: CharRollStyleValue;
	charSetArray: string[];
	charSetValue: string;
	directClass: string;
	displayItems: CharRollDisplayItem[];
	rollItemClass: string;
	rootClass: string;
	scrollListClass: string;
};

// 输入 CharRoll 生命周期请求，返回组件层可写入的初始化标记。
// Receive a CharRoll lifecycle request and return the initial initialized marker for the component layer.
export const resolveCharRollInitialInitialized = (): boolean => false;

// 输入渲染数量，返回组件层可直接迭代的稳定索引。
// Resolve render count into stable indexes that components can iterate directly.
export const resolveCharRollRenderIndexes = (renderCount: number): number[] =>
	Array.from({ length: Math.max(renderCount, 0) }, (_, index) => index);

export const resolveCharRollScrollListClass = (): string => 'flex flex-col items-center justify-center transition-none';

export const resolveCharRollRollItemClass = (): string => 'flex items-center justify-center';

export const resolveCharRollDirectClass = (): string => 'flex items-center justify-center';

// 输入组件 props，返回框架无关的 CharRoll 派生入参。
// Receive component props and return framework-agnostic CharRoll derivation options.
export const resolveCharRollStateOptions = ({
	animationProgress,
	charStarted,
	displayChars,
	isAnimating,
	props,
	startIndexes,
	targetIndexes
}: ResolveCharRollStateOptionsParams): ResolveCharRollDerivedOptions => ({
	animationProgress,
	bg: props.bg,
	charClass: props.charClass,
	charSet: props.charSet,
	charStarted,
	direction: props.direction,
	displayChars,
	fontSize: props.fontSize,
	fontWeight: props.fontWeight,
	gap: props.gap,
	height: props.height,
	injClass: props.injClass,
	isAnimating,
	loops: props.loops,
	preset: props.preset,
	radius: props.radius,
	startIndexes,
	targetIndexes
});

export const resolveCharRollCharSet = (preset: CharRollPresetKey = 'number', charSet = ''): string =>
	charSet || charRollPresetCharSets[preset] || charRollPresetCharSets.number;

export const getCharRollCharSetArray = (charSet: string): string[] => Array.from(charSet);

// 输入缓动函数字典和名称，返回组件动画可直接调用的纯函数。
// Resolve an easing function map and name into a callable animation function.
export const resolveCharRollEasingFunction = (easingFunctions: CharRollEasingMap, easingType = 'cubicOut'): CharRollEasingFunction => {
	return easingFunctions[easingType] || easingFunctions.cubicOut || ((progress) => progress);
};

export type FormatCharRollValueOptions = {
	value: string | number;
	decimal?: number;
	separator?: boolean;
};

// 输入 CharRoll 值和格式参数，返回无框架的展示字符串。
// Resolve CharRoll value and format options into a framework-agnostic display string.
export const formatCharRollValue = ({ value, decimal, separator = false }: FormatCharRollValueOptions): string => {
	if (typeof value !== 'number') return String(value);

	let formattedValue = decimal !== undefined ? value.toFixed(decimal) : String(value);
	if (separator) {
		const parts = formattedValue.split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		formattedValue = parts.join('.');
	}

	return formattedValue;
};

export const resolveCharRollRootClass = ({
	gap = '1',
	fontSize = 'xl',
	fontWeight = 'bold',
	injClass = ''
}: ResolveCharRollClassOptions = {}) =>
	[
		'inline-flex items-center',
		charRollGapClass[gap as keyof typeof charRollGapClass] || charRollGapClass['1'],
		charRollFontSizeClass[fontSize as keyof typeof charRollFontSizeClass] || charRollFontSizeClass.xl,
		charRollFontWeightClass[fontWeight as keyof typeof charRollFontWeightClass] || charRollFontWeightClass.bold,
		injClass
	]
		.filter(Boolean)
		.join(' ');

export const resolveCharRollCharClass = ({ radius = 'sm', bg = 'none', charClass = '' }: ResolveCharRollClassOptions = {}) =>
	[
		'relative overflow-hidden',
		charRollRadiusClass[radius as keyof typeof charRollRadiusClass] || '',
		charRollBgClass[bg as keyof typeof charRollBgClass] || '',
		charClass
	]
		.filter(Boolean)
		.join(' ');

export const getCharRollCharIndex = (charSetArray: string[], char: string): number => {
	const index = charSetArray.indexOf(char);
	return index >= 0 ? index : 0;
};

export const isCharRollCharInSet = (charSetArray: string[], char: string): boolean => charSetArray.includes(char);

export const getCharRollAutoStartIndex = (targetIndex: number, charIndex: number, charSetLength: number): number => {
	if (charSetLength <= 1) return targetIndex;
	const offset = (charIndex % (charSetLength - 1)) + 1;
	return (targetIndex + offset) % charSetLength;
};

export type CharRollDistanceOptions = {
	startIndex: number;
	targetIndex: number;
	charSetLength: number;
	direction?: CharRollDirection;
	loops?: number;
};

export const getCharRollScrollDistance = ({
	startIndex,
	targetIndex,
	charSetLength,
	direction = 'up',
	loops = 1
}: CharRollDistanceOptions): number => {
	let scrollDistance = targetIndex - startIndex;
	if (direction === 'up') {
		if (scrollDistance <= 0) scrollDistance += charSetLength;
		scrollDistance += charSetLength * Math.max(0, loops - 1);
		return scrollDistance;
	}

	if (scrollDistance >= 0) scrollDistance -= charSetLength;
	scrollDistance -= charSetLength * Math.max(0, loops - 1);
	return scrollDistance;
};

export type CharRollCurrentOptions = {
	char: string;
	charSetArray: string[];
	startIndex: number;
	targetIndex: number;
	progress: number;
	direction?: CharRollDirection;
	loops?: number;
};

export const getCharRollCurrentDisplayIndex = (options: CharRollCurrentOptions): number => {
	const { char, charSetArray, startIndex, targetIndex, progress, direction = 'up', loops = 1 } = options;
	if (!isCharRollCharInSet(charSetArray, char)) return 0;

	const charSetLength = charSetArray.length;
	const scrollDistance = getCharRollScrollDistance({ startIndex, targetIndex, charSetLength, direction, loops });
	const currentScroll = progress * scrollDistance;
	return (startIndex + (Math.round(currentScroll) % charSetLength) + charSetLength) % charSetLength;
};

export type CharRollScrollOffsetOptions = CharRollCurrentOptions & {
	height: number;
};

// 只计算滚动偏移，不读取动画帧或 DOM 节点。
// Only calculate scroll offset without reading animation frames or DOM nodes.
export const getCharRollScrollOffset = (options: CharRollScrollOffsetOptions): number => {
	const { char, charSetArray, startIndex, targetIndex, progress, direction = 'up', loops = 1, height } = options;
	if (!isCharRollCharInSet(charSetArray, char)) return 0;

	const charSetLength = charSetArray.length;
	const scrollDistance = getCharRollScrollDistance({ startIndex, targetIndex, charSetLength, direction, loops });
	const currentScroll = startIndex + progress * scrollDistance;
	const loopsCount = Math.max(1, loops);
	const baseOffset = charSetLength * loopsCount;

	return -(baseOffset + currentScroll) * height;
};

export const getCharRollCurrentChar = (options: CharRollCurrentOptions): string => {
	const { char, charSetArray, startIndex, targetIndex, progress, direction = 'up', loops = 1 } = options;
	if (!isCharRollCharInSet(charSetArray, char)) return char;

	const charSetLength = charSetArray.length;
	const scrollDistance = getCharRollScrollDistance({ startIndex, targetIndex, charSetLength, direction, loops });
	const currentScroll = progress * scrollDistance;
	const currentIndex = (((startIndex + Math.floor(currentScroll)) % charSetLength) + charSetLength) % charSetLength;

	return charSetArray[currentIndex];
};

export const getCharRollRenderCount = (charSetLength: number, loops = 1): number => {
	const loopsCount = Math.max(1, loops);
	return charSetLength * (loopsCount * 2 + 1) + 1;
};

export const resolveCharRollMinWidth = (displayChar: string, height: number): number => {
	if (displayChar === ',' || displayChar === '.') return height * 0.3;
	if (displayChar === ' ') return height * 0.4;
	return height * 0.6;
};

// 输入 CharRoll 状态，返回下一轮展示字符、目标索引和起始索引。
// Resolve CharRoll state into next display chars, target indexes and start indexes.
export const resolveCharRollDisplayState = ({
	value,
	decimal,
	separator = false,
	prefix = '',
	suffix = '',
	charSetArray,
	previousDisplayChars = [],
	previousAnimationProgress = [],
	previousStartIndexes = [],
	previousTargetIndexes = [],
	autoStart = true,
	direction = 'up',
	loops = 1
}: ResolveCharRollDisplayStateOptions): CharRollDisplayState => {
	const formattedValue = formatCharRollValue({ value, decimal, separator });
	const displayChars = Array.from(`${prefix}${formattedValue}${suffix}`);
	const targetIndexes = displayChars.map((char) => getCharRollCharIndex(charSetArray, char));
	const startIndexes = displayChars.map((char, index) => {
		if (index < previousDisplayChars.length && previousAnimationProgress[index] !== undefined) {
			return getCharRollCurrentDisplayIndex({
				char: previousDisplayChars[index],
				charSetArray,
				startIndex: previousStartIndexes[index] || 0,
				targetIndex: previousTargetIndexes[index] || 0,
				progress: previousAnimationProgress[index] || 0,
				direction,
				loops
			});
		}
		if (autoStart && isCharRollCharInSet(charSetArray, char)) {
			return getCharRollAutoStartIndex(targetIndexes[index] ?? 0, index, charSetArray.length);
		}
		return targetIndexes[index];
	});

	return {
		animationProgress: displayChars.map(() => 0),
		charStarted: displayChars.map(() => false),
		displayChars,
		formattedValue,
		startIndexes,
		targetIndexes
	};
};

export const resolveCharRollResetState = (displayChars: readonly string[]) => ({
	animationProgress: displayChars.map(() => 0),
	charStarted: displayChars.map(() => false)
});

export const resolveCharRollCompleteState = ({
	displayChars,
	targetIndexes
}: {
	displayChars: readonly string[];
	targetIndexes: readonly number[];
}) => ({
	charStarted: displayChars.map(() => true),
	startIndexes: [...targetIndexes]
});

export const resolveCharRollPauseStartIndexes = ({
	displayChars,
	animationProgress,
	startIndexes,
	targetIndexes,
	charSetArray,
	direction = 'up',
	loops = 1
}: {
	animationProgress: readonly number[];
	charSetArray: string[];
	direction?: CharRollDirection;
	displayChars: readonly string[];
	loops?: number;
	startIndexes: readonly number[];
	targetIndexes: readonly number[];
}) =>
	animationProgress.map((progress, index) => {
		const char = displayChars[index];
		if (!isCharRollCharInSet(charSetArray, char)) return startIndexes[index] ?? 0;
		return getCharRollCurrentDisplayIndex({
			char,
			charSetArray,
			startIndex: startIndexes[index] || 0,
			targetIndex: targetIndexes[index] || 0,
			progress: progress || 0,
			direction,
			loops
		});
	});

// 输入开始前状态，返回是否可以启动动画；实际事件和动画帧由组件处理。
// Receive state before start and return whether animation can start; events and frames stay in the component.
export const resolveCharRollStartAction = ({ isAnimating, now }: { isAnimating: boolean; now: number }): CharRollStartAction => ({
	shouldStart: !isAnimating,
	nextAnimating: !isAnimating,
	startTime: now
});

// 输入当前帧状态，返回动画进度和完成动作；不调度 requestAnimationFrame。
// Receive current frame state and return progress plus completion action; does not schedule requestAnimationFrame.
export const resolveCharRollFrameAction = ({
	charCount,
	delay,
	decimal,
	displayChars,
	duration,
	easing,
	loop = false,
	loopInterval = 3000,
	now,
	separator = false,
	stagger,
	startTime,
	targetIndexes,
	value
}: ResolveCharRollFrameActionOptions): CharRollFrameAction => {
	const elapsed = now - startTime - delay;
	const frameState = resolveCharRollFrameState({ charCount, elapsed, stagger, duration, easing });
	const completeState = frameState.allComplete
		? resolveCharRollCompleteState({ displayChars, targetIndexes })
		: { charStarted: [], startIndexes: [] };

	return {
		...frameState,
		changeValue: frameState.allComplete ? formatCharRollValue({ value, decimal, separator }) : '',
		completeCharStarted: completeState.charStarted,
		completeStartIndexes: completeState.startIndexes,
		elapsed,
		loopDelayMs: loopInterval,
		nextAnimating: !frameState.allComplete,
		shouldComplete: frameState.allComplete,
		shouldContinue: !frameState.allComplete,
		shouldScheduleLoop: frameState.allComplete && loop && loopInterval > 0
	};
};

// 输入重置状态，返回重置后的动画数组；取消动画帧由组件执行。
// Receive reset state and return reset animation arrays; canceling animation frames stays in the component.
export const resolveCharRollResetAction = ({
	displayChars,
	rafActive = false
}: {
	displayChars: readonly string[];
	rafActive?: boolean;
}): CharRollResetAction => ({
	...resolveCharRollResetState(displayChars),
	nextAnimating: false,
	shouldCancelFrame: rafActive
});

// 输入暂停状态，返回继续所需的起始索引和重置进度。
// Receive pause state and return start indexes plus reset progress for resuming.
export const resolveCharRollPauseAction = ({
	animationProgress,
	charSetArray,
	direction = 'up',
	displayChars,
	loops = 1,
	rafActive = false,
	startIndexes,
	targetIndexes
}: ResolveCharRollPauseActionOptions): CharRollPauseAction => ({
	animationProgress: resolveCharRollResetState(displayChars).animationProgress,
	nextAnimating: false,
	shouldCancelFrame: rafActive,
	startIndexes: resolveCharRollPauseStartIndexes({
		displayChars,
		animationProgress,
		startIndexes,
		targetIndexes,
		charSetArray,
		direction,
		loops
	})
});

// 输入外部值变化状态，返回是否需要更新字符和重启动画。
// Receive external value change state and return whether to update chars and restart animation.
export const resolveCharRollValueChangeAction = ({
	value,
	decimal,
	separator = false,
	initialized,
	previousValue,
	autoStart = true
}: ResolveCharRollValueChangeActionOptions): CharRollValueChangeAction => {
	const formattedValue = formatCharRollValue({ value, decimal, separator });
	const shouldUpdateDisplay = initialized && formattedValue !== previousValue;
	return {
		formattedValue,
		nextPreviousValue: shouldUpdateDisplay ? formattedValue : previousValue,
		shouldRestart: shouldUpdateDisplay && autoStart,
		shouldUpdateDisplay
	};
};

// 只计算单帧动画进度，不调度 requestAnimationFrame。
// Only calculate one animation frame progress without scheduling requestAnimationFrame.
export const resolveCharRollFrameState = ({
	charCount,
	elapsed,
	stagger,
	duration,
	easing
}: ResolveCharRollFrameStateOptions): CharRollFrameState => {
	let allComplete = true;
	const animationProgress: number[] = [];
	const charStarted: boolean[] = [];

	for (let index = 0; index < charCount; index += 1) {
		const charElapsed = elapsed - index * stagger;
		if (charElapsed < 0) {
			animationProgress[index] = 0;
			charStarted[index] = false;
			allComplete = false;
		} else if (charElapsed >= duration) {
			animationProgress[index] = 1;
			charStarted[index] = true;
		} else {
			animationProgress[index] = easing(charElapsed / duration);
			charStarted[index] = true;
			allComplete = false;
		}
	}

	return { allComplete, animationProgress, charStarted };
};

export const resolveCharRollDisplayMeta = ({
	char,
	index,
	charSetArray,
	animationProgress = [],
	startIndexes = [],
	targetIndexes = [],
	charStarted = [],
	isAnimating = false,
	direction = 'up',
	loops = 1,
	height
}: ResolveCharRollDisplayMetaOptions): CharRollDisplayMeta => {
	const inCharSet = isCharRollCharInSet(charSetArray, char);
	const progress = animationProgress[index] || 0;
	const hasStarted = !isAnimating || (charStarted[index] ?? false);
	const startIndex = startIndexes[index] ?? targetIndexes[index] ?? 0;
	const standbyChar = inCharSet && charSetArray.length > 0 ? charSetArray[startIndex % charSetArray.length] : char;
	const displayChar = hasStarted
		? inCharSet
			? getCharRollCurrentChar({
					char,
					charSetArray,
					startIndex,
					targetIndex: targetIndexes[index] ?? 0,
					progress,
					direction,
					loops
				})
			: char
		: standbyChar;

	return {
		charSetArray,
		displayChar,
		hasStarted,
		inCharSet,
		minWidth: resolveCharRollMinWidth(displayChar, height),
		progress,
		renderCount: getCharRollRenderCount(charSetArray.length, loops),
		scrollOffset: getCharRollScrollOffset({
			char,
			charSetArray,
			startIndex,
			targetIndex: targetIndexes[index] ?? 0,
			progress,
			direction,
			loops,
			height
		}),
		standbyChar
	};
};

export const resolveCharRollHeightStyleValue = (height: number): CharRollStyleValue => ({ height });

export const resolveCharRollRollItemStyleValue = (height: number): CharRollStyleValue => ({ height, minWidth: height * 0.6 });

export const resolveCharRollDirectStyleValue = ({ height, minWidth }: { height: number; minWidth: number }): CharRollStyleValue => ({
	height,
	minWidth
});

export const resolveCharRollScrollStyleValue = (scrollOffset: number): CharRollStyleValue => ({
	transform: `translateY(${scrollOffset}px)`
});

export const resolveCharRollHeightStyleString = (height: number) => `height: ${height}px;`;

export const resolveCharRollRollItemStyleString = (height: number) => `height: ${height}px; min-width: ${height * 0.6}px;`;

export const resolveCharRollDirectStyleString = ({ height, minWidth }: { height: number; minWidth: number }) =>
	`height: ${height}px; min-width: ${minWidth}px;`;

export const resolveCharRollScrollStyleString = (scrollOffset: number) => `transform: translateY(${scrollOffset}px);`;

// 输入 CharRoll 展示状态，返回组件层可直接渲染的框架无关展示列表。
// Receive CharRoll display state and return framework-agnostic display items for component rendering.
export const resolveCharRollDisplayItems = ({
	displayChars = [],
	charSetArray,
	animationProgress = [],
	startIndexes = [],
	targetIndexes = [],
	charStarted = [],
	isAnimating = false,
	direction = 'up',
	loops = 1,
	height
}: ResolveCharRollDisplayItemsOptions): CharRollDisplayItem[] =>
	displayChars.map((char, index) => {
		const meta = resolveCharRollDisplayMeta({
			char,
			index,
			charSetArray,
			animationProgress,
			startIndexes,
			targetIndexes,
			charStarted,
			isAnimating,
			direction,
			loops,
			height
		});

		return {
			char,
			index,
			meta,
			renderIndexes: resolveCharRollRenderIndexes(meta.renderCount),
			charHeightStyle: resolveCharRollHeightStyleValue(height),
			charHeightStyleString: resolveCharRollHeightStyleString(height),
			directStyle: resolveCharRollDirectStyleValue({ height, minWidth: meta.minWidth }),
			directStyleString: resolveCharRollDirectStyleString({ height, minWidth: meta.minWidth }),
			rollItemStyle: resolveCharRollRollItemStyleValue(height),
			rollItemStyleString: resolveCharRollRollItemStyleString(height),
			scrollStyle: resolveCharRollScrollStyleValue(meta.scrollOffset),
			scrollStyleString: resolveCharRollScrollStyleString(meta.scrollOffset)
		};
	});

// 输入 CharRoll props 和动画状态，返回框架无关的渲染派生结果。
// Receive CharRoll props and animation state, then return framework-agnostic render derivations.
export const resolveCharRollDerived = ({
	animationProgress = [],
	bg = 'none',
	charClass = '',
	charSet = '',
	charStarted = [],
	direction = 'up',
	displayChars = [],
	fontSize = 'xl',
	fontWeight = 'bold',
	gap = '1',
	height = 40,
	injClass = '',
	isAnimating = false,
	loops = 1,
	preset = 'number',
	radius = 'sm',
	startIndexes = [],
	targetIndexes = []
}: ResolveCharRollDerivedOptions): CharRollDerived => {
	const charSetValue = resolveCharRollCharSet(preset, charSet);
	const charSetArray = getCharRollCharSetArray(charSetValue);
	return {
		charClassName: resolveCharRollCharClass({ radius, bg, charClass }),
		charHeightStyleString: resolveCharRollHeightStyleString(height),
		charHeightStyleValue: resolveCharRollHeightStyleValue(height),
		charSetArray,
		charSetValue,
		directClass: resolveCharRollDirectClass(),
		displayItems: resolveCharRollDisplayItems({
			displayChars,
			charSetArray,
			animationProgress,
			startIndexes,
			targetIndexes,
			charStarted,
			isAnimating,
			direction,
			loops,
			height
		}),
		rollItemClass: resolveCharRollRollItemClass(),
		rootClass: resolveCharRollRootClass({ gap, fontSize, fontWeight, injClass }),
		scrollListClass: resolveCharRollScrollListClass()
	};
};
