import { durationObj, pyScaleObj, radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue, resolveFocusableTabIndex } from './helpers.js';

export const inputStateObj = {
	theme: 'ring-primary dark:ring-dark',
	success: 'ring-success',
	warning: 'ring-warning',
	error: 'ring-error',
	info: 'ring-info'
} as const;

export const inputLineTransitionStateObj = {
	theme: 'bg-primary dark:bg-dark ',
	success: 'bg-success',
	warning: 'bg-warning',
	error: 'bg-error',
	info: 'bg-info'
} as const;

export const inputStyleBaseObj = {
	block: 'px-2 bg-text-primary/5 dark:bg-text-dark/5',
	line: 'px-1 border-b bg-transparent border-text-primary/20 dark:border-text-dark/20'
} as const;

export const inputStyleFocusBaseObj = {
	block: 'px-2 ring-2 bg-transparent',
	line: 'px-1 border-b bg-transparent border-text-primary/20 dark:border-text-dark/20'
} as const;

export type InputResolvedMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url';
export type InputModeValue = InputResolvedMode | '';

export type NormalizeInputValueOptions = {
	value: string;
	type?: string;
	maxlength?: number;
	textareaMaxlength?: number;
	negative?: boolean;
};

export type ResolveInputValueChangeActionOptions = NormalizeInputValueOptions & {
	autosize?: boolean;
	composing?: boolean;
	rawValue: string;
};
export type ResolveInputTextareaHeightStyleOptions = {
	scrollHeight?: number | null;
};

export type InputValueChangeAction = {
	nextValue: string;
	shouldCommit: boolean;
	shouldResizeTextarea: boolean;
};

export type InputClearAction = {
	nextValue: string;
	shouldChange: boolean;
	shouldClear: boolean;
};

export type ResolveInputFocusActionOptions = {
	disabled?: boolean;
};

export type InputFocusAction = {
	shouldFocus: boolean;
};

export type ResolveInputFocusStateActionOptions = {
	value: string;
};

export type InputFocusStateAction = {
	nextFocus: true;
	shouldEmitFocus: true;
	value: string;
};

export type ResolveInputBlurStateActionOptions = {
	value: string;
};

export type InputBlurStateAction = {
	nextFocus: false;
	shouldEmitBlur: true;
	value: string;
};

export type ResolveInputCompositionActionOptions = {
	phase: 'start' | 'end';
};

export type InputCompositionAction = {
	nextComposing: boolean;
	shouldCommit: boolean;
};

export type ResolveInputCustomContentKeyboardActionOptions = ResolveInputFocusActionOptions & {
	key: string;
};

export type InputCustomContentKeyboardAction = {
	isActivationKey: boolean;
	shouldFocus: boolean;
};

export type ResolveInputPlaceholderOptions = {
	placeholder?: string;
	title?: string;
	select?: boolean;
	pleaseSelect: string;
	pleaseInput: string;
};

export type ResolveInputDisplayStateOptions = {
	clear?: boolean;
	value?: string;
	select?: boolean;
	inputStyle?: InputStyle;
};

export type ResolveInputDerivedOptions = ResolveInputPlaceholderOptions & {
	autocomplete?: boolean | string;
	clear?: boolean;
	disabled?: boolean;
	duration?: InputDuration;
	focus?: boolean;
	hasInputChild?: boolean;
	hasTip?: boolean;
	inputPosition?: string;
	inputState?: InputState;
	inputStyle?: InputStyle;
	inputmode?: InputModeValue;
	lineTransition?: string | null;
	py?: keyof typeof pyScaleObj | string;
	radius?: InputRadius | string;
	readonly?: boolean;
	rows?: number;
	textTone?: InputTextTone;
	titlePosition?: string | null;
	type?: string;
	value?: string;
};

export type InputStatePropsLike = Partial<
	Omit<ResolveInputDerivedOptions, 'focus' | 'hasInputChild' | 'hasTip' | 'pleaseInput' | 'pleaseSelect' | 'value'>
>;

export type ResolveInputStateOptionsParams = {
	focus?: boolean;
	hasInputChild?: boolean;
	hasTip?: boolean;
	pleaseInput: string;
	pleaseSelect: string;
	props: InputStatePropsLike;
	value?: string;
};

export type InputRadius = keyof typeof radiusObj | '';
export type InputStyle = keyof typeof inputStyleBaseObj | string;
export type InputState = keyof typeof inputStateObj | string;
export type InputDuration = keyof typeof durationObj | string;
export type InputTextTone = 'token' | 'plain';
export type InputNativeType = 'password' | 'text';

// 输入 Input 类型和 inputmode，返回浏览器 inputMode 值。
// Resolve Input type and inputmode into browser inputMode value.
export const resolveInputMode = (type = 'text', inputmode: InputModeValue = ''): InputResolvedMode => {
	if (inputmode !== '') return inputmode;
	if (type === 'password') return 'text';
	if (type === 'number') return 'decimal';
	if (type === 'textarea') return 'text';
	if (
		type === 'none' ||
		type === 'decimal' ||
		type === 'numeric' ||
		type === 'tel' ||
		type === 'email' ||
		type === 'search' ||
		type === 'url'
	)
		return type;
	return 'text';
};

export const resolveInputPlaceholder = ({
	placeholder = '',
	title = '',
	select = false,
	pleaseSelect,
	pleaseInput
}: ResolveInputPlaceholderOptions): string => {
	if (placeholder !== '') return placeholder;
	return title !== '' ? `${select ? pleaseSelect : pleaseInput} ${title}` : '';
};

// 输入 Input 类型，返回组件层绑定到原生 input 的安全 type。
// Resolve Input type into the safe native input type bound by the component layer.
export const resolveInputNativeType = (type = 'text'): InputNativeType => (type === 'password' ? 'password' : 'text');

// 输入只读与选择态，返回原生输入控件的 readOnly 状态。
// Resolve readonly and select state into the native input readOnly flag.
export const resolveInputNativeReadonly = ({ readonly = false, select = false }: { readonly?: boolean; select?: boolean } = {}): boolean =>
	readonly || select;

// 输入外部 Input 值，返回组件内部可写入的初始值。
// Normalize an external Input value into an internal writable initial value.
export const resolveInputInitialValue = (value?: string | null): string => value ?? '';

// 输入受控值和内部值，返回当前应渲染的 Input 值。
// Resolve controlled and internal values into the current rendered Input value.
export const resolveInputCurrentValue = ({
	controlledValue,
	internalValue
}: {
	controlledValue?: string | null;
	internalValue: string;
}): string => controlledValue ?? internalValue;

// 输入组件层读取到的 textarea 高度，返回可写入 DOM style 的高度字符串。
// Receive a component-measured textarea height and return a height string ready for DOM style writes.
export const resolveInputTextareaHeightStyle = ({ scrollHeight = 0 }: ResolveInputTextareaHeightStyleOptions = {}): string =>
	`${scrollHeight ?? 0}px`;

// 只处理输入值清洗，不处理组合输入、DOM 高度和事件派发。
// Only sanitize input value without handling composition, DOM height or event emits.
export const normalizeInputValue = ({
	value,
	type = 'text',
	maxlength = 24,
	textareaMaxlength = 200,
	negative = false
}: NormalizeInputValueOptions): string => {
	const limit = type === 'textarea' ? textareaMaxlength : maxlength;
	const nextValue = value.slice(0, limit);

	if (type === 'decimal' || type === 'number') {
		if (negative && nextValue.startsWith('-')) {
			return `-${nextValue
				.substring(1)
				.replace(/[^\d.]+/g, '')
				.replace(/\.{2,}/g, '.')
				.replace(/^(\d*\.\d*)\./, '$1')}`;
		}
		return nextValue
			.replace(/[^\d.]+/g, '')
			.replace(/^\./, '')
			.replace(/\.{2,}/g, '.')
			.replace(/^(\d*\.\d*)\./, '$1');
	}

	if (type === 'numeric') {
		if (negative && nextValue.startsWith('-')) {
			return `-${nextValue.substring(1).replace(/[^\d]+/g, '')}`;
		}
		return nextValue.replace(/[^\d]+/g, '');
	}

	return nextValue;
};

// 输入原始值和组合输入状态，返回组件层可执行的提交动作。
// Receive raw value and composition state, then return a commit action for the component layer.
export const resolveInputValueChangeAction = ({
	rawValue,
	type = 'text',
	maxlength = 24,
	textareaMaxlength = 200,
	negative = false,
	autosize = false,
	composing = false
}: ResolveInputValueChangeActionOptions): InputValueChangeAction => {
	const shouldCommit = !composing;
	return {
		nextValue: shouldCommit ? normalizeInputValue({ value: rawValue, type, maxlength, textareaMaxlength, negative }) : rawValue,
		shouldCommit,
		shouldResizeTextarea: shouldCommit && type === 'textarea' && autosize
	};
};

// 输入清空动作，返回清空后的值和事件标记；事件本身由组件派发。
// Receive clear intent and return cleared value plus event flags; events are emitted by the component.
export const resolveInputClearAction = (): InputClearAction => ({
	nextValue: '',
	shouldChange: true,
	shouldClear: true
});

// 输入 disabled 状态，返回组件层是否可以执行 DOM focus。
// Resolve Input disabled state into whether the component layer can perform DOM focus.
export const resolveInputFocusAction = ({ disabled = false }: ResolveInputFocusActionOptions = {}): InputFocusAction => ({
	shouldFocus: !disabled
});

// 输入 Input focus 事件状态，返回组件层可写入的焦点动作。
// Receive Input focus event state and return a focus action for the component layer.
export const resolveInputFocusStateAction = ({ value }: ResolveInputFocusStateActionOptions): InputFocusStateAction => ({
	nextFocus: true,
	shouldEmitFocus: true,
	value
});

// 输入 Input blur 事件状态，返回组件层可写入的失焦动作。
// Receive Input blur event state and return a blur action for the component layer.
export const resolveInputBlurStateAction = ({ value }: ResolveInputBlurStateActionOptions): InputBlurStateAction => ({
	nextFocus: false,
	shouldEmitBlur: true,
	value
});

// 输入组合输入阶段，返回组件层可写入的 composition 状态。
// Receive the composition phase and return composition state for the component layer.
export const resolveInputCompositionAction = ({ phase }: ResolveInputCompositionActionOptions): InputCompositionAction => ({
	nextComposing: phase === 'start',
	shouldCommit: phase === 'end'
});

// 输入自定义内容按键状态，返回框架无关的激活动作。
// Resolve custom-content key state into a framework-agnostic activation action.
export const resolveInputCustomContentKeyboardAction = ({
	key,
	disabled = false
}: ResolveInputCustomContentKeyboardActionOptions): InputCustomContentKeyboardAction => {
	const isActivationKey = key === 'Enter' || key === ' ';
	return {
		isActivationKey,
		shouldFocus: isActivationKey && !disabled
	};
};

export const resolveInputRadiusClass = ({ radius = '', type = 'text' }: { radius?: InputRadius | string; type?: string } = {}): string =>
	radius ? radiusObj[radius as keyof typeof radiusObj] || '' : type === 'textarea' ? 'rounded-(--radius-box)' : 'rounded-(--radius-form)';

export const resolveInputPyClass = (py: keyof typeof pyScaleObj | string = '2'): string => resolveClassMapValue(pyScaleObj, py, '2');

// 输入 Input 外层间距配置，返回框架无关的外层容器 class。
// Receive Input outer spacing config and return a framework-agnostic outer wrapper class.
export const resolveInputOuterClass = (py: keyof typeof pyScaleObj | string = '2'): string =>
	joinClasses(['px-2', resolveInputPyClass(py)]);

export const resolveInputDurationClass = (duration: InputDuration = 'base'): string => resolveClassMapValue(durationObj, duration, 'base');

export const resolveInputBaseClass = ({
	inputStyle = 'block',
	radiusClass = ''
}: { inputStyle?: InputStyle; radiusClass?: string } = {}): string =>
	inputStyle === 'line' ? inputStyleBaseObj.line : joinClasses([inputStyleBaseObj.block, radiusClass]);

export const resolveInputFocusClass = ({
	inputStyle = 'block',
	inputState = 'theme',
	radiusClass = ''
}: {
	inputStyle?: InputStyle;
	inputState?: InputState;
	radiusClass?: string;
} = {}): string =>
	inputStyle === 'line'
		? inputStyleFocusBaseObj.line
		: joinClasses([inputStyleFocusBaseObj.block, resolveClassMapValue(inputStateObj, inputState, 'theme'), radiusClass]);

// 输入 Input 状态，返回框架无关的容器 class。
// Resolve Input state into framework-agnostic wrapper classes.
export const resolveInputWrapperClass = ({
	hasInputChild = false,
	titlePosition = 'out',
	duration = 'base',
	focus = false,
	inputStyle = 'block',
	radiusClass = '',
	inputState = 'theme'
}: {
	hasInputChild?: boolean;
	titlePosition?: string | null;
	duration?: InputDuration;
	focus?: boolean;
	inputStyle?: InputStyle;
	radiusClass?: string;
	inputState?: InputState;
} = {}): string =>
	joinClasses([
		'relative my-0.5 flex space-x-1 text-sm transition-all',
		hasInputChild ? 'items-start whitespace-normal' : 'items-center whitespace-nowrap',
		resolveInputDurationClass(duration),
		titlePosition === 'in' ? 'py-1' : 'py-3',
		focus ? resolveInputFocusClass({ inputStyle, inputState, radiusClass }) : resolveInputBaseClass({ inputStyle, radiusClass }),
		inputStyle === 'block' ? radiusClass : ''
	]);

export const resolveInputLineTransitionClass = ({
	lineTransition = null,
	duration = 'base',
	focus = false,
	inputState = 'theme'
}: {
	lineTransition?: string | null;
	duration?: InputDuration;
	focus?: boolean;
	inputState?: InputState;
} = {}): string =>
	joinClasses([
		'absolute -bottom-px h-0.5',
		lineTransition === null ? 'transition-colors' : 'transition-all',
		resolveInputDurationClass(duration),
		!focus && lineTransition === null && 'w-full bg-transparent',
		focus && lineTransition === null && `${resolveClassMapValue(inputLineTransitionStateObj, inputState, 'theme')} w-full`,
		!focus && lineTransition !== null && `w-0 ${resolveClassMapValue(inputLineTransitionStateObj, inputState, 'theme')}`,
		focus && lineTransition !== null && `w-full ${resolveClassMapValue(inputLineTransitionStateObj, inputState, 'theme')}`
	]);

export const resolveInputLineTransitionStyleValue = (
	lineTransition: string | null = null
): { left: string | number; transform?: string; WebkitTransform?: string } =>
	lineTransition === 'center' ? { left: '50%', transform: 'translateX(-50%)', WebkitTransform: 'translateX(-50%)' } : { left: 0 };

export const resolveInputLineTransitionStyleString = (lineTransition: string | null = null): string =>
	lineTransition === 'center' ? 'left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);' : 'left:0;';

export const resolveInputTextAlignClass = (inputPosition = 'left'): string => (inputPosition === 'left' ? 'text-left' : 'text-right');

export const resolveInputDisplayMinHeight = ({ type = 'text', rows = 2 }: { type?: string; rows?: number } = {}): string =>
	type === 'textarea' ? `${rows * 1.5}rem` : '1.5rem';

// 输入自定义内容最小高度，返回框架无关的 style value。
// Receive custom-content min height and return a framework-agnostic style value.
export const resolveInputCustomContentStyleValue = (displayMinHeight: string): { minHeight: string } => ({ minHeight: displayMinHeight });

export const resolveInputCustomContentStyleString = (displayMinHeight: string): string => `min-height: ${displayMinHeight};`;

export const resolveInputAutocompleteValue = (autocomplete: boolean | string = true): 'on' | 'off' =>
	autocomplete === true ? 'on' : 'off';

// 输入辅助行状态，返回框架无关的布局 class。
// Resolve helper-row state into framework-agnostic layout classes.
export const resolveInputEdgeRowClass = (hasLeadingContent = false): string =>
	joinClasses(['flex px-2', hasLeadingContent ? 'justify-between' : 'justify-end']);

export const resolveInputTitleClass = (): string => 'relative mb-1 text-sm font-semibold';

export const resolveInputRequiredClass = (titlePosition: 'out' | 'in' | string | null = 'out'): string =>
	titlePosition === 'in' ? 'text-error absolute -left-2 text-sm' : 'text-error absolute -left-2.5 text-base';

export const resolveInputEdgeContentClass = (): string => 'flex space-x-2 text-xs';

export const resolveInputContentColumnClass = (): string => 'flex grow flex-col';

export const resolveInputInlineTitleClass = (): string => 'relative text-xs text-gray-400';

export const resolveInputControlRowClass = (): string => 'flex space-x-1';

export const resolveInputControlSlotClass = (): string => 'w-full';

export const resolveInputCustomWrapperClass = (): string => 'relative w-full';

export const resolveInputHiddenControlClass = (): string =>
	'focus:outline-hidden pointer-events-none absolute inset-0 h-full w-full opacity-0';

export const resolveInputClearIconClass = (): string => 'opacity-30';

export const resolveInputSelectIconClass = (): string => 'opacity-50';

export const resolveInputTipTextClass = (): string => 'text-xs text-gray-400';

export const resolveInputDataTextClass = (): string => 'text-xs';

export const resolveInputControlClass = ({
	inputPosition = 'left',
	disabled = false,
	textarea = false,
	textTone = 'token'
}: {
	inputPosition?: string;
	disabled?: boolean;
	textarea?: boolean;
	textTone?: InputTextTone;
} = {}): string => {
	const textClass = textTone === 'plain' ? 'text-black dark:text-white' : 'text-text-primary dark:text-text-dark';
	return joinClasses([
		'focus:outline-hidden w-full bg-transparent font-semibold',
		!textarea && 'whitespace-normal',
		textClass,
		resolveInputTextAlignClass(inputPosition),
		disabled && 'cursor-not-allowed opacity-50'
	]);
};

export const resolveInputCustomContentClass = ({
	inputPosition = 'left',
	disabled = false,
	textTone = 'token'
}: {
	inputPosition?: string;
	disabled?: boolean;
	textTone?: InputTextTone;
} = {}): string => {
	const textClass = textTone === 'plain' ? 'text-black dark:text-white' : 'text-text-primary dark:text-text-dark';
	return joinClasses([
		'flex w-full flex-wrap items-center gap-2',
		textClass,
		resolveInputTextAlignClass(inputPosition),
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'
	]);
};

// 输入 Input 展示状态，返回组件层可直接使用的框架无关分支结果。
// Receive Input display state and return framework-agnostic branch results for the component layer.
export const resolveInputDisplayState = ({
	clear = false,
	value = '',
	select = false,
	inputStyle = 'block'
}: ResolveInputDisplayStateOptions = {}) => ({
	showClearButton: clear && value !== '',
	showSelectIcon: select,
	showLineTransition: inputStyle === 'line'
});

// 输入组件 props、内部状态和多语言文案，返回框架无关的 Input 派生入参。
// Receive component props, internal state and locale text, then return framework-agnostic Input derivation options.
export const resolveInputStateOptions = ({
	focus,
	hasInputChild,
	hasTip,
	pleaseInput,
	pleaseSelect,
	props,
	value
}: ResolveInputStateOptionsParams): ResolveInputDerivedOptions => ({
	autocomplete: props.autocomplete,
	clear: props.clear,
	disabled: props.disabled,
	duration: props.duration,
	focus,
	hasInputChild,
	hasTip,
	inputPosition: props.inputPosition,
	inputState: props.inputState,
	inputStyle: props.inputStyle,
	inputmode: props.inputmode,
	lineTransition: props.lineTransition,
	placeholder: props.placeholder,
	pleaseInput,
	pleaseSelect,
	py: props.py,
	radius: props.radius,
	readonly: props.readonly,
	rows: props.rows,
	select: props.select,
	textTone: props.textTone,
	title: props.title,
	titlePosition: props.titlePosition,
	type: props.type,
	value
});

// 输入 Input 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Input state and return framework-agnostic derived values ready for component binding.
export const resolveInputDerived = ({
	autocomplete = true,
	clear = false,
	disabled = false,
	duration = 'base',
	focus = false,
	hasInputChild = false,
	hasTip = false,
	inputPosition = 'left',
	inputState = 'theme',
	inputStyle = 'block',
	inputmode = '',
	lineTransition = null,
	placeholder = '',
	pleaseInput,
	pleaseSelect,
	py = '2',
	radius = '',
	readonly = false,
	rows = 2,
	select = false,
	textTone = 'token',
	title = '',
	titlePosition = 'out',
	type = 'text',
	value = ''
}: ResolveInputDerivedOptions) => {
	const radiusClass = resolveInputRadiusClass({ radius, type });
	const displayMinHeight = resolveInputDisplayMinHeight({ type, rows });

	return {
		mode: resolveInputMode(type, inputmode),
		nativeInputType: resolveInputNativeType(type),
		nativeReadonly: resolveInputNativeReadonly({ readonly, select }),
		placeholderText: resolveInputPlaceholder({ placeholder, title, select, pleaseSelect, pleaseInput }),
		displayMinHeight,
		customContentStyleValue: resolveInputCustomContentStyleValue(displayMinHeight),
		customContentStyleString: resolveInputCustomContentStyleString(displayMinHeight),
		radiusClass,
		outerClass: resolveInputOuterClass(py),
		displayState: resolveInputDisplayState({ clear, value, select, inputStyle }),
		autocompleteValue: resolveInputAutocompleteValue(autocomplete),
		wrapperClass: resolveInputWrapperClass({
			hasInputChild,
			titlePosition: titlePosition || 'out',
			duration,
			focus,
			inputStyle,
			radiusClass,
			inputState
		}),
		lineClass: resolveInputLineTransitionClass({ lineTransition, duration, focus, inputState }),
		lineStyleValue: resolveInputLineTransitionStyleValue(lineTransition),
		lineStyleString: resolveInputLineTransitionStyleString(lineTransition),
		controlClass: resolveInputControlClass({ inputPosition, disabled, textarea: type === 'textarea', textTone }),
		customContentClass: resolveInputCustomContentClass({ inputPosition, disabled, textTone }),
		clearIconClass: resolveInputClearIconClass(),
		contentColumnClass: resolveInputContentColumnClass(),
		controlRowClass: resolveInputControlRowClass(),
		controlSlotClass: resolveInputControlSlotClass(),
		customWrapperClass: resolveInputCustomWrapperClass(),
		dataTextClass: resolveInputDataTextClass(),
		edgeContentClass: resolveInputEdgeContentClass(),
		hiddenControlClass: resolveInputHiddenControlClass(),
		inlineRequiredClass: resolveInputRequiredClass('in'),
		inlineTitleClass: resolveInputInlineTitleClass(),
		requiredClass: resolveInputRequiredClass(titlePosition || 'out'),
		selectIconClass: resolveInputSelectIconClass(),
		tipTextClass: resolveInputTipTextClass(),
		titleClass: resolveInputTitleClass(),
		titleRowClass: resolveInputEdgeRowClass(title !== ''),
		tipRowClass: resolveInputEdgeRowClass(hasTip),
		focusableTabIndex: resolveFocusableTabIndex({ disabled })
	};
};
