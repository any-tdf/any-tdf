import { radiusObj } from './common.js';
import { joinClasses } from './helpers.js';

export type StepperNextValueOptions = {
	readonly value: number;
	readonly min?: number;
	readonly max?: number;
	readonly step?: number;
};
export type StepperStepActionType = 'decrease' | 'increase';
export type ResolveStepperStepActionOptions = StepperNextValueOptions & {
	readonly async?: boolean;
	readonly type: StepperStepActionType;
};
export type StepperStepAction = {
	readonly nextValue: number;
	readonly shouldChange: boolean;
};
export type StepperStateOptions = {
	readonly value: number;
	readonly min?: number;
	readonly max?: number;
	readonly async?: boolean;
};
export type StepperClassOptions = {
	readonly radiusClass: string;
	readonly vertical?: boolean;
	readonly padding?: boolean;
	readonly injClassOut?: string;
	readonly injClassBtn?: string;
	readonly injClassNum?: string;
	readonly buttonToneClass?: string;
	readonly numberToneClass?: string;
};
export type StepperWidthStyleValue = {
	width: string;
};
export type ResolveStepperDerivedOptions = StepperStateOptions & {
	readonly decimal?: number;
	readonly injClassBtn?: string;
	readonly injClassNum?: string;
	readonly injClassOut?: string;
	readonly numberHighlight?: boolean;
	readonly padding?: boolean;
	readonly radius?: keyof typeof radiusObj | '';
	readonly theme?: boolean;
	readonly vertical?: boolean;
	readonly width?: number;
};
export type StepperStatePropsLike = Partial<Omit<ResolveStepperDerivedOptions, 'value'>>;
export type ResolveStepperStateOptionsParams = {
	readonly props: StepperStatePropsLike;
	readonly value: number;
};
export type StepperDerived = {
	readonly buttonClass: string;
	readonly decreaseDisabled: boolean;
	readonly decreaseIconClass: string;
	readonly displayValue: string;
	readonly iconClass: string;
	readonly increaseDisabled: boolean;
	readonly increaseIconClass: string;
	readonly loadingClass: string;
	readonly numberClass: string;
	readonly numberStyleString: string;
	readonly numberStyleValue: StepperWidthStyleValue | undefined;
	readonly radiusClass: string;
	readonly rootClass: string;
};

// 输入组件状态，返回框架无关的 Stepper 派生结果。
// Input component state and return framework-agnostic Stepper derived results.
// 输入外部 Stepper 值，返回组件内部可写入的初始值。
// Normalize an external Stepper value into an internal writable initial value.
export const resolveStepperInitialValue = (value?: number | null, defaultValue = 10): number => value ?? defaultValue;

export const resolveStepperRadiusClass = (options: { readonly radius?: keyof typeof radiusObj | ''; readonly vertical?: boolean } = {}) => {
	const { radius = '', vertical = false } = options;
	if (radius) {
		return vertical && radius === 'full' ? 'rounded-2xl' : radiusObj[radius];
	}
	return vertical ? 'rounded-2xl' : 'rounded-(--radius-small)';
};

export const resolveStepperButtonToneClass = (options: { readonly numberHighlight?: boolean; readonly theme?: boolean } = {}) => {
	const { numberHighlight = false, theme = true } = options;
	if (numberHighlight) return '';
	return theme ? 'bg-primary/5 dark:bg-dark/10' : 'bg-bg-highlight dark:bg-bg-highlight-dark';
};

export const resolveStepperNumberToneClass = (options: { readonly numberHighlight?: boolean; readonly theme?: boolean } = {}) => {
	const { numberHighlight = false, theme = true } = options;
	if (!numberHighlight) return '';
	return theme ? 'bg-primary/5 text-primary dark:bg-dark/10 dark:text-dark' : 'bg-bg-highlight dark:bg-bg-highlight-dark';
};

export const resolveStepperIconClass = (options: { readonly numberHighlight?: boolean; readonly theme?: boolean } = {}) => {
	const { numberHighlight = false, theme = true } = options;
	return theme && !numberHighlight ? 'text-primary dark:text-dark' : 'text-black dark:text-white';
};

export const resolveStepperRootClass = ({ radiusClass, padding = true, vertical = false, injClassOut = '' }: StepperClassOptions) =>
	joinClasses([
		'inline-flex items-center bg-black/5 dark:bg-white/5',
		radiusClass,
		padding ? 'p-1' : 'p-0',
		'overflow-hidden',
		injClassOut,
		vertical ? 'flex-col-reverse' : 'flex-row'
	]);

export const resolveStepperButtonClass = ({ radiusClass, vertical = false, injClassBtn = '', buttonToneClass = '' }: StepperClassOptions) =>
	joinClasses([
		vertical ? 'w-full' : 'w-8',
		'h-8',
		radiusClass,
		'flex flex-col items-center',
		injClassBtn,
		'justify-center',
		buttonToneClass
	]);

export const resolveStepperNumberClass = ({
	radiusClass,
	injClassNum = '',
	numberToneClass = ''
}: Pick<StepperClassOptions, 'radiusClass' | 'injClassNum' | 'numberToneClass'>) =>
	joinClasses(['h-8 px-4', radiusClass, 'flex flex-col items-center', injClassNum, 'justify-center', numberToneClass]);

export const resolveStepperLoadingClass = (radiusClass: string) =>
	joinClasses(['h-8 px-2', radiusClass, 'flex flex-col items-center justify-center']);

export const resolveStepperDecreaseDisabled = ({ value, min = 0, async = false }: Pick<StepperStateOptions, 'value' | 'min' | 'async'>) =>
	async || value === min;

export const resolveStepperIncreaseDisabled = ({ value, max = 100, async = false }: Pick<StepperStateOptions, 'value' | 'max' | 'async'>) =>
	async || value === max;

export const resolveStepperCanDecrease = ({ value, min = 0, async = false }: Pick<StepperStateOptions, 'value' | 'min' | 'async'>) =>
	!async && value > min;

export const resolveStepperCanIncrease = ({ value, max = 100, async = false }: Pick<StepperStateOptions, 'value' | 'max' | 'async'>) =>
	!async && value < max;

export const resolveStepperDisabledIconClass = (disabled = false) => (disabled ? 'opacity-20' : '');

export const resolveStepperWidthStyleValue = (width = 0): StepperWidthStyleValue | undefined =>
	width ? { width: `${width}px` } : undefined;

export const resolveStepperWidthStyleString = (width = 0): string => (width ? `width: ${width}px;` : '');

export const resolveStepperDisplayValue = (value: number, decimal = 0): string => value.toFixed(decimal);

// 输入组件 props 和内部数值，返回框架无关的 Stepper 派生入参。
// Receive component props and internal value, then return framework-agnostic Stepper derivation options.
export const resolveStepperStateOptions = ({ props, value }: ResolveStepperStateOptionsParams): ResolveStepperDerivedOptions => ({
	async: props.async,
	decimal: props.decimal,
	injClassBtn: props.injClassBtn,
	injClassNum: props.injClassNum,
	injClassOut: props.injClassOut,
	max: props.max,
	min: props.min,
	numberHighlight: props.numberHighlight,
	padding: props.padding,
	radius: props.radius,
	theme: props.theme,
	value,
	vertical: props.vertical,
	width: props.width
});

// 输入 Stepper 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Stepper state and return framework-agnostic derived values ready for component binding.
export const resolveStepperDerived = ({
	value,
	min = 0,
	max = 100,
	async = false,
	vertical = false,
	numberHighlight = false,
	theme = true,
	radius = '',
	decimal = 0,
	padding = true,
	width = 0,
	injClassOut = '',
	injClassBtn = '',
	injClassNum = ''
}: ResolveStepperDerivedOptions): StepperDerived => {
	const radiusClass = resolveStepperRadiusClass({ radius, vertical });
	const buttonToneClass = resolveStepperButtonToneClass({ numberHighlight, theme });
	const numberToneClass = resolveStepperNumberToneClass({ numberHighlight, theme });
	const decreaseDisabled = resolveStepperDecreaseDisabled({ value, min, async });
	const increaseDisabled = resolveStepperIncreaseDisabled({ value, max, async });

	return {
		radiusClass,
		rootClass: resolveStepperRootClass({ radiusClass, padding, vertical, injClassOut }),
		buttonClass: resolveStepperButtonClass({ radiusClass, vertical, injClassBtn, buttonToneClass }),
		numberClass: resolveStepperNumberClass({ radiusClass, injClassNum, numberToneClass }),
		loadingClass: resolveStepperLoadingClass(radiusClass),
		iconClass: resolveStepperIconClass({ numberHighlight, theme }),
		decreaseDisabled,
		increaseDisabled,
		decreaseIconClass: resolveStepperDisabledIconClass(decreaseDisabled),
		increaseIconClass: resolveStepperDisabledIconClass(increaseDisabled),
		numberStyleValue: resolveStepperWidthStyleValue(width),
		numberStyleString: resolveStepperWidthStyleString(width),
		displayValue: resolveStepperDisplayValue(value, decimal)
	};
};

// 只抽离数值计算和状态判断，事件派发和状态写入仍留在组件层。
// Only extract value calculation and state checks; event emits and state writes stay in the component layer.
export const getStepperDecreaseValue = (options: StepperNextValueOptions) => {
	const { value, min = 0, step = 1 } = options;
	return Math.max(min, value - step);
};

export const getStepperIncreaseValue = (options: StepperNextValueOptions) => {
	const { value, max = 100, step = 1 } = options;
	return Math.min(max, value + step);
};

// 输入 Stepper 动作状态，返回无副作用的下一值和变更决策。
// Receive Stepper action state and return side-effect-free next value and change decision.
export const resolveStepperStepAction = ({
	type,
	value,
	min = 0,
	max = 100,
	step = 1,
	async = false
}: ResolveStepperStepActionOptions): StepperStepAction => {
	if (type === 'decrease') {
		const shouldChange = resolveStepperCanDecrease({ value, min, async });
		return {
			nextValue: shouldChange ? getStepperDecreaseValue({ value, min, step }) : value,
			shouldChange
		};
	}

	const shouldChange = resolveStepperCanIncrease({ value, max, async });
	return {
		nextValue: shouldChange ? getStepperIncreaseValue({ value, max, step }) : value,
		shouldChange
	};
};
