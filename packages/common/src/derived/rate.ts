export const rateSpaceObj = {
	'0': ' gap-0',
	'1': ' gap-1',
	'2': ' gap-2',
	'3': ' gap-3',
	'4': ' gap-4',
	'8': ' gap-8'
} as const;

export const rateOpacityObj = {
	'0.05': ' opacity-5',
	'0.1': ' opacity-10',
	'0.2': ' opacity-20',
	'0.3': ' opacity-30',
	'0.4': ' opacity-40',
	'0.5': ' opacity-50',
	'0.6': ' opacity-60',
	'0.7': ' opacity-70',
	'0.8': ' opacity-80',
	'0.9': ' opacity-90',
	'1': ' opacity-100'
} as const;

// 输入 Rate 象限状态，返回框架无关的固定象限顺序。
// Resolve Rate quadrant state into a framework-agnostic fixed quadrant order.
export const rateQuadrantIndexes = [0, 1, 2, 3] as const;

// 输入外部 Rate 值，返回组件内部可写入的初始值。
// Normalize an external Rate value into an internal writable initial value.
export const resolveRateInitialValue = (value?: number | null, defaultValue = 4): number => value ?? defaultValue;

export type RateActiveOptions = {
	readonly index: number;
	readonly value: number;
	readonly half?: boolean;
	readonly vertical?: boolean;
	readonly quadrant?: number;
};

export type RateNextValueOptions = {
	readonly index: number;
	readonly value: number;
	readonly half?: boolean;
	readonly zero?: boolean;
};

export type ResolveRateClickActionOptions = RateNextValueOptions & {
	readonly disabled?: boolean;
	readonly readonly?: boolean;
	readonly resetScaleDelay?: number;
};

export type RateClickAction = {
	readonly clickIndex: number;
	readonly isScale: boolean;
	readonly nextValue: number;
	readonly resetIsScale: boolean;
	readonly resetScaleDelay: number;
	readonly shouldChange: boolean;
};

export type RateAnimation = 'active' | 'current' | string | null;

export type ResolveRateRootClassOptions = {
	readonly disabled?: boolean;
	readonly space?: keyof typeof rateSpaceObj | string;
};

export type ResolveRateScaleClassOptions = {
	readonly animation?: RateAnimation;
	readonly clickIndex: number;
	readonly index: number;
	readonly isScale?: boolean;
};

export type ResolveRateButtonClassOptions = ResolveRateScaleClassOptions & {
	readonly disabled?: boolean;
};

export type ResolveRateQuadrantClassOptions = RateActiveOptions & {
	readonly opacity?: keyof typeof rateOpacityObj | string;
};

export type ResolveRateStarTransformOptions = {
	readonly height: number;
	readonly quadrant: number;
	readonly width: number;
};

export type ResolveRateSizeStyleOptions = {
	readonly height: number;
	readonly width: number;
};

export type RateSizeStyleValue = {
	readonly height: string;
	readonly width: string;
};

export type RateStarTransformStyleValue = {
	readonly transform: string;
};

export type RateValidationErrorKey = 'error1' | 'error2' | 'error3' | 'error4' | 'error5';

export type ResolveRateValidationErrorsOptions = {
	readonly half?: boolean;
	readonly height: number;
	readonly minSize?: number;
	readonly total: number;
	readonly value: number;
	readonly width: number;
};

export type ResolveRateDerivedOptions = ResolveRateValidationErrorsOptions &
	ResolveRateRootClassOptions &
	Partial<Pick<ResolveRateButtonClassOptions, 'animation' | 'clickIndex' | 'isScale'>> & {
		readonly opacity?: keyof typeof rateOpacityObj | string;
		readonly vertical?: boolean;
	};

export type RateStatePropsLike = Partial<Omit<ResolveRateDerivedOptions, 'clickIndex' | 'isScale' | 'value'>>;

export type ResolveRateStateOptionsParams = {
	readonly clickIndex?: number;
	readonly isScale?: boolean;
	readonly props: RateStatePropsLike;
	readonly value: number;
};

export type RateQuadrantItem = {
	readonly className: string;
	readonly quadrant: number;
	readonly starStyleString: string;
	readonly starStyleValue: RateStarTransformStyleValue;
	readonly styleString: string;
	readonly styleValue: RateSizeStyleValue;
};

export type RateItem = {
	readonly buttonClass: string;
	readonly buttonStyleString: string;
	readonly buttonStyleValue: RateSizeStyleValue;
	readonly index: number;
	readonly quadrants: RateQuadrantItem[];
};

export type RateDerived = {
	readonly itemIndexes: number[];
	readonly items: RateItem[];
	readonly rootClass: string;
	readonly starSvgClass: string;
	readonly validationErrors: RateValidationErrorKey[];
};

export const resolveRateItems = (total: number): number[] => Array.from({ length: Math.floor(total) }, (_, index) => index);

export const resolveRateRootClass = ({ disabled = false, space = '4' }: ResolveRateRootClassOptions = {}): string =>
	`inset-0 inline-flex flex-wrap${rateSpaceObj[space as keyof typeof rateSpaceObj] || rateSpaceObj['4']}${disabled ? ' opacity-50' : ''}`;

export const resolveRateCanInteract = ({ disabled = false, readonly = false }: { disabled?: boolean; readonly?: boolean } = {}): boolean =>
	!disabled && !readonly;

// 输入 Rate 点击状态，返回下一评分和动画状态，不处理计时器或事件。
// Receive Rate click state and return next value plus animation state without handling timers or events.
export const resolveRateClickAction = ({
	disabled = false,
	readonly = false,
	resetScaleDelay = 80,
	...options
}: ResolveRateClickActionOptions): RateClickAction => {
	const shouldChange = resolveRateCanInteract({ disabled, readonly });
	return {
		clickIndex: options.index,
		isScale: shouldChange,
		nextValue: shouldChange ? getRateNextValue(options) : options.value,
		resetIsScale: false,
		resetScaleDelay,
		shouldChange
	};
};

// 输入 Rate 数值配置，返回组件层可映射为本地化文案的错误 key。
// Resolve Rate numeric config into error keys that components can map to localized messages.
export const resolveRateValidationErrors = ({
	value,
	total,
	half = false,
	width,
	height,
	minSize = 20
}: ResolveRateValidationErrorsOptions): RateValidationErrorKey[] => {
	const errors: RateValidationErrorKey[] = [];
	if (value > total) errors.push('error1');
	if (total % 1 !== 0) errors.push('error2');
	if (!half && value % 1 !== 0) errors.push('error3');
	if (half && value % 0.5 !== 0) errors.push('error4');
	if (width < minSize || height < minSize) errors.push('error5');
	return errors;
};

// 输入动画状态，返回组件层可直接绑定的缩放 class。
// Resolve animation state into a scale class for component bindings.
export const resolveRateScaleClass = ({
	animation = 'current',
	clickIndex,
	index,
	isScale = false
}: ResolveRateScaleClassOptions): string => {
	if (animation === 'active') return clickIndex >= index && isScale ? ' scale-75' : '';
	if (animation === 'current') return clickIndex === index && isScale ? ' scale-75' : '';
	return '';
};

export const resolveRateButtonClass = (options: ResolveRateButtonClassOptions): string => {
	const { disabled = false } = options;
	return `flex flex-wrap transition-all${disabled ? ' cursor-not-allowed' : ' cursor-pointer'}${resolveRateScaleClass(options)}`;
};

// 输入 Rate 尺寸状态，返回组件层可直接绑定的按钮尺寸 style。
// Receive Rate size state and return button size styles for the component layer.
export const resolveRateButtonStyleValue = ({ height, width }: ResolveRateSizeStyleOptions): RateSizeStyleValue => ({
	height: `${height}px`,
	width: `${width}px`
});

export const resolveRateButtonStyleString = ({ height, width }: ResolveRateSizeStyleOptions): string =>
	`height:${height}px;width:${width}px;`;

// 输入 Rate 尺寸状态，返回半选象限区域的尺寸 style。
// Receive Rate size state and return half-selection quadrant size styles.
export const resolveRateQuadrantStyleValue = ({ height, width }: ResolveRateSizeStyleOptions): RateSizeStyleValue => ({
	height: `${height / 2}px`,
	width: `${width / 2}px`
});

export const resolveRateQuadrantStyleString = ({ height, width }: ResolveRateSizeStyleOptions): string =>
	`height:${height / 2}px;width:${width / 2}px;`;

// 输入组件状态，返回框架无关的 Rate 选中结果。
// Input component state and return framework-agnostic Rate active results.
export const resolveRateActive = (options: RateActiveOptions) => {
	const { index, value, half = false, vertical = false, quadrant = 0 } = options;
	if (!half) {
		return index + 1 <= value;
	}
	if (vertical) {
		if (quadrant === 0) return index + 0.5 < value;
		if (quadrant === 1) return index + 0.5 < value;
		return index + 0.5 <= value;
	}
	if (quadrant === 0) return index + 0.5 <= value;
	if (quadrant === 1) return index + 0.5 < value;
	if (quadrant === 2) return index + 0.5 <= value;
	return index + 0.5 < value;
};

// 只抽离分值计算，点击事件、动画计时和 emit 仍留在组件内。
// Only extract value calculation; click events, animation timers, and emit stay inside components.
export const getRateNextValue = (options: RateNextValueOptions) => {
	const { index, value, half = false, zero = false } = options;
	if (half) {
		if (index === 0) {
			if (zero) {
				if (value === 0 || value > 1) return 0.5;
				if (value === 0.5) return 1;
				return 0;
			}
			return value === 0 || value >= 1 ? 0.5 : 1;
		}
		return value === index + 0.5 ? index + 1 : index + 0.5;
	}
	if (zero && index === 0) {
		return value !== 1 ? 1 : 0;
	}
	return index + 1;
};

export const resolveRateQuadrantClass = ({ opacity = '0.3', ...options }: ResolveRateQuadrantClassOptions): string =>
	`overflow-hidden${resolveRateActive(options) ? '' : ` grayscale${rateOpacityObj[opacity as keyof typeof rateOpacityObj] || ' opacity-30'}`}`;

export const resolveRateStarTransform = ({ quadrant, width, height }: ResolveRateStarTransformOptions): string =>
	`translateX(${quadrant === 0 || quadrant === 2 ? 0 : -(width / 2)}px) translateY(${quadrant < 2 ? 0 : -(height / 2)}px)`;

// 输入 Rate 象限和尺寸状态，返回组件层可直接绑定的星形 transform 样式。
// Receive Rate quadrant and size state and return bind-ready star transform styles for the component layer.
export const resolveRateStarTransformStyleValue = (options: ResolveRateStarTransformOptions): RateStarTransformStyleValue => ({
	transform: resolveRateStarTransform(options)
});

export const resolveRateStarTransformStyleString = (options: ResolveRateStarTransformOptions): string =>
	`transform:${resolveRateStarTransform(options)}`;

export const resolveRateStarSvgClass = (): string => 'text-primary dark:text-dark';

// 输入组件 props、内部值和动画状态，返回框架无关的 Rate 派生入参。
// Receive component props, internal value and animation state, then return framework-agnostic Rate derivation options.
export const resolveRateStateOptions = ({
	clickIndex,
	isScale,
	props,
	value
}: ResolveRateStateOptionsParams): ResolveRateDerivedOptions => ({
	animation: props.animation,
	clickIndex,
	disabled: props.disabled,
	half: props.half,
	height: props.height ?? 24,
	isScale,
	opacity: props.opacity,
	space: props.space,
	total: props.total ?? 5,
	value,
	vertical: props.vertical,
	width: props.width ?? 24
});

// 输入 Rate props 和内部动画状态，返回框架无关的渲染派生结果。
// Receive Rate props and internal animation state, then return framework-agnostic render derivation.
export const resolveRateDerived = ({
	value,
	total,
	half = false,
	width,
	height,
	minSize,
	space = '4',
	disabled = false,
	animation = 'current',
	clickIndex = 0,
	isScale = false,
	vertical = false,
	opacity = '0.3'
}: ResolveRateDerivedOptions): RateDerived => {
	const itemIndexes = resolveRateItems(total);
	return {
		itemIndexes,
		rootClass: resolveRateRootClass({ space, disabled }),
		starSvgClass: resolveRateStarSvgClass(),
		validationErrors: resolveRateValidationErrors({ value, total, half, width, height, minSize }),
		items: itemIndexes.map((index) => ({
			index,
			buttonClass: resolveRateButtonClass({ disabled, animation, clickIndex, index, isScale }),
			buttonStyleValue: resolveRateButtonStyleValue({ height, width }),
			buttonStyleString: resolveRateButtonStyleString({ height, width }),
			quadrants: rateQuadrantIndexes.map((quadrant) => ({
				quadrant,
				className: resolveRateQuadrantClass({ index, value, half, vertical, quadrant, opacity }),
				styleValue: resolveRateQuadrantStyleValue({ height, width }),
				styleString: resolveRateQuadrantStyleString({ height, width }),
				starStyleValue: resolveRateStarTransformStyleValue({ quadrant, width, height }),
				starStyleString: resolveRateStarTransformStyleString({ quadrant, width, height })
			}))
		}))
	};
};
