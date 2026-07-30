import { gapScaleObj, borderStyleObj, radiusLeftObj, radiusRightObj, radiusObj, bgObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const codeInputGutterClass = gapScaleObj;
export const codeInputBorderObj = {
	none: '',
	...borderStyleObj
} as const;

export const codeInputSizeClass = {
	sm: 'w-10 h-10 text-base',
	md: 'w-12 h-12 text-xl',
	lg: 'w-14 h-14 text-2xl'
} as const;

export const codeInputLineSizeClass = codeInputSizeClass;

export const codeInputDotSizeClass = {
	sm: 'w-2 h-2',
	md: 'w-2.5 h-2.5',
	lg: 'w-3 h-3'
} as const;

export const codeInputCursorSizeClass = {
	sm: 'h-4',
	md: 'h-5',
	lg: 'h-6'
} as const;

export const codeInputBoldTextClass = {
	sm: 'text-xl font-bold',
	md: 'text-2xl font-bold',
	lg: 'text-3xl font-bold'
} as const;

export const codeInputRadiusLeftObj = radiusLeftObj;
export const codeInputRadiusRightObj = radiusRightObj;

export type NormalizeCodeInputValueOptions = {
	value: string;
	length: number;
	type?: 'number' | 'text' | string;
	native?: boolean;
};
export type ResolveCodeInputFinishActionOptions = {
	value: string;
	length: number;
	lastFinishedValue?: string | null;
	autoClose?: boolean;
};
export type CodeInputFinishAction = {
	finishedValue: string;
	nextLastFinishedValue: string | null;
	shouldFinish: boolean;
	shouldClose: boolean;
};
export type ResolveCodeInputFinishFlowOptions = ResolveCodeInputFinishActionOptions & {
	emitClose?: boolean;
};
export type CodeInputFinishFlow = CodeInputFinishAction &
	CodeInputCloseAction & {
		shouldEmitFinish: boolean;
	};
export type ResolveCodeInputFocusActionOptions = {
	emitFocus?: boolean;
	native?: boolean;
};
export type CodeInputFocusAction = {
	nextFocused: true;
	shouldEmitFocus: boolean;
	shouldFocusNative: boolean;
};
export type CodeInputBlurAction = {
	nextFocused: false;
};
export type ResolveCodeInputInputActionOptions = {
	length: number;
	rawValue: string;
	type?: 'number' | 'text' | string;
	native?: boolean;
	emitChange?: boolean;
};
export type CodeInputInputAction = {
	nextValue: string;
	shouldEmitChange: boolean;
};
export type ResolveCodeInputCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};
export type CodeInputCloseAction = {
	nextFocused: false;
	nextKeyboardVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};
export type ResolveCodeInputAutoScrollOptions = {
	autoScroll?: boolean | number;
	keyboardVisible?: boolean;
	hasContainer?: boolean;
};
export type ResolveCodeInputScrollTargetOptions = {
	rectBottom: number;
	viewportHeight: number;
	autoScroll: boolean | number;
	scrollY: number;
	extra?: number;
};
export type CodeInputNativeInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

export type CodeInputRadius = keyof typeof radiusObj | '';
export type CodeInputCellSize = keyof typeof codeInputSizeClass | string;
export type CodeInputCellStyle = 'box' | 'line' | string;
export type CodeInputCellBorder = keyof typeof codeInputBorderObj | string;
export type CodeInputCellBg = keyof typeof bgObj | string;
export type ResolveCodeInputCellDisplayStateOptions = {
	currentIndex?: number;
	cursorStyle?: 'underline' | string;
	index?: number;
	mask?: boolean | string;
	showCursor?: boolean;
	value?: string;
};
export type ResolveCodeInputCellDisplayStateListOptions = Omit<ResolveCodeInputCellDisplayStateOptions, 'index'> & {
	length?: number;
};
export type CodeInputCellDisplayStateItem = CodeInputCellDisplayState & {
	index: number;
};
export type CodeInputCellDisplayState =
	| { kind: 'dot' }
	| { kind: 'maskText'; text: string }
	| { kind: 'valueText'; text: string | undefined }
	| { kind: 'cursor'; showUnderlineCursor: boolean }
	| { kind: 'none' };
export type ResolveCodeInputInfoStateOptions = {
	errorInfo?: string;
	info?: string;
};
export type CodeInputInfoState = {
	hasError: boolean;
	showInfo: boolean;
	text: string;
};
export type ResolveCodeInputDerivedOptions = ResolveCodeInputCellDisplayStateListOptions & {
	bold?: boolean;
	cellBg?: CodeInputCellBg;
	cellBorder?: CodeInputCellBorder;
	cellSize?: CodeInputCellSize;
	cellStyle?: CodeInputCellStyle;
	cursorAnimation?: 'blink' | string;
	focused?: boolean;
	gutter?: string;
	info?: string;
	errorInfo?: string;
	inputMode?: string;
	injClass?: string;
	keyboardVisible?: boolean;
	native?: boolean;
	radius?: CodeInputRadius | string;
	type?: string;
};
export type CodeInputStatePropsLike = Partial<Omit<ResolveCodeInputDerivedOptions, 'focused' | 'keyboardVisible' | 'value'>>;
export type ResolveCodeInputStateOptionsParams = {
	focused?: boolean;
	keyboardVisible?: boolean;
	props: CodeInputStatePropsLike;
	value?: string;
};
export type CodeInputCellDerived = CodeInputCellDisplayStateItem & {
	active: boolean;
	boxCellClass: string;
	cellClass: string;
	cursorClass: string;
	dotClass: string;
	lineCellClass: string;
	lineClass: string;
	textClass: string;
	underlineCursorClass: string;
};
export type CodeInputDerived = {
	buttonClass: string;
	cellDisplayStates: CodeInputCellDerived[];
	cellStyle: CodeInputCellStyle;
	currentIndex: number;
	cursorAnimationClass: string;
	hasError: boolean;
	infoClass: string;
	infoState: CodeInputInfoState;
	nativeInputClass: string;
	nativeInputMode: CodeInputNativeInputMode;
	rootClass: string;
	showCursor: boolean;
};

// 输入当前值和组件状态，返回无框架的输入清洗结果。
// Normalize input value from component state without framework or DOM access.
export const normalizeCodeInputValue = ({ value, length, type = 'number', native = false }: NormalizeCodeInputValueOptions): string => {
	if (native) return value;

	const slicedValue = value.slice(0, length);
	return type === 'number' ? slicedValue.replace(/[^0-9]/g, '') : slicedValue;
};

// 输入外部 CodeInput 值，返回组件内部可写入的初始值。
// Normalize an external CodeInput value into an internal writable initial value.
export const resolveCodeInputInitialValue = (value?: string | null): string => value ?? '';

// 输入外部聚焦状态，返回组件内部可写入的初始聚焦状态。
// Normalize an external focused value into an internal writable focused state.
export const resolveCodeInputInitialFocused = (focused?: boolean | null): boolean => focused ?? false;

export const resolveCodeInputNativeInputClass = (): string => 'sr-only';

export const resolveCodeInputFinishedValue = ({ value, length }: { value: string; length: number }): string => value.slice(0, length);

// 输入点击聚焦状态，返回组件层可写入的聚焦动作和原生输入聚焦决策。
// Receive click focus state and return focus state plus native-input focus decisions for the component layer.
export const resolveCodeInputFocusAction = ({
	emitFocus = true,
	native = false
}: ResolveCodeInputFocusActionOptions = {}): CodeInputFocusAction => ({
	nextFocused: true,
	shouldEmitFocus: emitFocus,
	shouldFocusNative: Boolean(native)
});

// 输入失焦状态，返回组件层可写入的失焦动作。
// Receive blur state and return the blur action for the component layer.
export const resolveCodeInputBlurAction = (): CodeInputBlurAction => ({
	nextFocused: false
});

// 输入原始输入值，返回组件层可同步的清洗值和 change 决策。
// Receive a raw input value and return the normalized value plus change decision for the component layer.
export const resolveCodeInputInputAction = ({
	rawValue,
	length,
	type = 'number',
	native = false,
	emitChange = true
}: ResolveCodeInputInputActionOptions): CodeInputInputAction => ({
	nextValue: normalizeCodeInputValue({ value: rawValue, length, type, native }),
	shouldEmitChange: emitChange
});

// 输入当前值和上一次完成值，返回完成事件的纯动作描述。
// Receive current value and the previous finished value, then return a pure finish action description.
export const resolveCodeInputFinishAction = ({
	value,
	length,
	lastFinishedValue = null,
	autoClose = false
}: ResolveCodeInputFinishActionOptions): CodeInputFinishAction => {
	if (value.length < length) {
		return {
			finishedValue: '',
			nextLastFinishedValue: null,
			shouldFinish: false,
			shouldClose: false
		};
	}

	const finishedValue = resolveCodeInputFinishedValue({ value, length });
	if (lastFinishedValue === finishedValue) {
		return {
			finishedValue,
			nextLastFinishedValue: lastFinishedValue,
			shouldFinish: false,
			shouldClose: false
		};
	}

	return {
		finishedValue,
		nextLastFinishedValue: finishedValue,
		shouldFinish: true,
		shouldClose: autoClose
	};
};

// 输入完成后的关闭决策，返回组件层可写入的键盘和聚焦状态。
// Receive the finish close decision and return keyboard and focus state for the component layer.
export const resolveCodeInputCloseAction = ({
	emitClose = true,
	shouldClose = false
}: ResolveCodeInputCloseActionOptions = {}): CodeInputCloseAction => ({
	nextFocused: false,
	nextKeyboardVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入完成检测上下文，返回组件层可同步的完成与关闭流程。
// Receive finish detection context and return the finish plus close flow that component layers can sync.
export const resolveCodeInputFinishFlow = ({ emitClose = true, ...options }: ResolveCodeInputFinishFlowOptions): CodeInputFinishFlow => {
	const finishAction = resolveCodeInputFinishAction(options);
	const closeAction = resolveCodeInputCloseAction({ shouldClose: finishAction.shouldClose, emitClose });
	return {
		...finishAction,
		...closeAction,
		shouldEmitFinish: finishAction.shouldFinish
	};
};

// 输入 CodeInput 状态，返回框架无关的格子派生结果。
// Resolve CodeInput state into framework-agnostic cell values and classes.
export const resolveCodeInputCells = (length = 6): number[] => Array.from({ length }, (_, index) => index);

// 输入当前值和格子索引，返回框架无关的单格展示文本。
// Resolve current value and cell index into framework-agnostic display text.
export const resolveCodeInputCellText = (value = '', index = 0): string | undefined => value[index];

// 输入单格状态，返回框架无关的展示分支。
// Receive cell state and return a framework-agnostic display branch.
export const resolveCodeInputCellDisplayState = ({
	currentIndex = 0,
	cursorStyle = 'line',
	index = 0,
	mask = false,
	showCursor = false,
	value = ''
}: ResolveCodeInputCellDisplayStateOptions = {}): CodeInputCellDisplayState => {
	if (index < value.length) {
		if (mask === true) return { kind: 'dot' };
		if (typeof mask === 'string') return { kind: 'maskText', text: mask };
		return { kind: 'valueText', text: resolveCodeInputCellText(value, index) };
	}

	if (showCursor && index === currentIndex) {
		return { kind: 'cursor', showUnderlineCursor: cursorStyle === 'underline' };
	}

	return { kind: 'none' };
};

// 输入 CodeInput 当前状态，返回组件层可直接渲染的格子展示列表。
// Receive CodeInput state and return a framework-agnostic cell display list for components.
export const resolveCodeInputCellDisplayStateList = ({
	length = 6,
	currentIndex = 0,
	cursorStyle = 'line',
	mask = false,
	showCursor = false,
	value = ''
}: ResolveCodeInputCellDisplayStateListOptions = {}): CodeInputCellDisplayStateItem[] =>
	resolveCodeInputCells(length).map((index) => ({
		index,
		...resolveCodeInputCellDisplayState({ value, index, mask, showCursor, currentIndex, cursorStyle })
	}));

export const resolveCodeInputCurrentIndex = (value = ''): number => value.length;

export const resolveCodeInputShowCursor = ({
	keyboardVisible = false,
	currentIndex = 0,
	length = 6
}: {
	keyboardVisible?: boolean;
	currentIndex?: number;
	length?: number;
}): boolean => keyboardVisible && currentIndex < length;

export const resolveCodeInputHasError = (errorInfo?: string): boolean => Boolean(errorInfo);

// 输入提示文本状态，返回框架无关的提示展示结果。
// Receive info text state and return a framework-agnostic display result.
export const resolveCodeInputInfoState = ({ errorInfo = '', info = '' }: ResolveCodeInputInfoStateOptions = {}): CodeInputInfoState => ({
	hasError: resolveCodeInputHasError(errorInfo),
	showInfo: Boolean(errorInfo || info),
	text: errorInfo || info
});

export const resolveCodeInputCellActive = ({
	focused = false,
	index = 0,
	currentIndex = 0
}: { focused?: boolean; index?: number; currentIndex?: number } = {}): boolean => focused && index === currentIndex;

export const resolveCodeInputNativeInputMode = ({
	inputMode = '',
	type = 'number'
}: { inputMode?: string; type?: string } = {}): CodeInputNativeInputMode =>
	(inputMode || (type === 'number' ? 'numeric' : 'text')) as CodeInputNativeInputMode;

export const resolveCodeInputShouldAutoScroll = ({
	autoScroll = true,
	keyboardVisible = false,
	hasContainer = false
}: ResolveCodeInputAutoScrollOptions = {}): boolean => Boolean(autoScroll && keyboardVisible && hasContainer);

export const resolveCodeInputAutoScrollTarget = ({
	rectBottom,
	viewportHeight,
	autoScroll,
	scrollY,
	extra = 20
}: ResolveCodeInputScrollTargetOptions): number | null => {
	const keyboardHeight = typeof autoScroll === 'number' ? autoScroll : viewportHeight * 0.4;
	const availableHeight = viewportHeight - keyboardHeight;
	return rectBottom > availableHeight ? scrollY + rectBottom - availableHeight + extra : null;
};

export const resolveCodeInputCursorAnimationClass = (cursorAnimation: 'blink' | string = 'blink'): string =>
	cursorAnimation === 'blink' ? 'animate-code-input-blink' : 'animate-pulse';

export const resolveCodeInputGutterClass = (gutter: string = '2'): string => resolveClassMapValue(codeInputGutterClass, gutter, '2');

export const resolveCodeInputCellRadiusClass = ({
	cellStyle = 'box',
	radius = ''
}: { cellStyle?: CodeInputCellStyle; radius?: CodeInputRadius | string } = {}): string =>
	cellStyle === 'line' ? '' : radius ? radiusObj[radius as keyof typeof radiusObj] || '' : 'rounded-(--radius-form)';

export const resolveCodeInputCellRadiusLeftClass = ({
	cellStyle = 'box',
	radius = ''
}: { cellStyle?: CodeInputCellStyle; radius?: CodeInputRadius | string } = {}): string =>
	cellStyle === 'line'
		? ''
		: radius
			? codeInputRadiusLeftObj[radius as keyof typeof codeInputRadiusLeftObj] || ''
			: 'rounded-l-(--radius-form)';

export const resolveCodeInputCellRadiusRightClass = ({
	cellStyle = 'box',
	radius = ''
}: { cellStyle?: CodeInputCellStyle; radius?: CodeInputRadius | string } = {}): string =>
	cellStyle === 'line'
		? ''
		: radius
			? codeInputRadiusRightObj[radius as keyof typeof codeInputRadiusRightObj] || ''
			: 'rounded-r-(--radius-form)';

export const resolveCodeInputLineCellClass = (cellSize: CodeInputCellSize = 'md'): string =>
	joinClasses([
		'relative flex items-center justify-center',
		resolveClassMapValue(codeInputLineSizeClass, cellSize, 'md'),
		'font-semibold transition-colors'
	]);

export const resolveCodeInputDotClass = (cellSize: CodeInputCellSize = 'md'): string =>
	joinClasses(['bg-text-primary dark:bg-text-dark rounded-full', resolveClassMapValue(codeInputDotSizeClass, cellSize, 'md')]);

export const resolveCodeInputTextClass = ({
	bold = false,
	cellSize = 'md'
}: { bold?: boolean; cellSize?: CodeInputCellSize } = {}): string =>
	joinClasses(['text-text-primary dark:text-text-dark', bold && resolveClassMapValue(codeInputBoldTextClass, cellSize, 'md')]);

export const resolveCodeInputCursorClass = ({
	cellSize = 'md',
	cursorAnimationClass = ''
}: { cellSize?: CodeInputCellSize; cursorAnimationClass?: string } = {}): string =>
	joinClasses(['w-0.5 bg-primary dark:bg-dark', resolveClassMapValue(codeInputCursorSizeClass, cellSize, 'md'), cursorAnimationClass]);

export const resolveCodeInputUnderlineCursorClass = ({
	box = false,
	cursorAnimationClass = ''
}: { box?: boolean; cursorAnimationClass?: string } = {}): string =>
	joinClasses([
		`absolute ${box ? 'bottom-2' : 'bottom-1'} left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary dark:bg-dark`,
		cursorAnimationClass
	]);

export const resolveCodeInputLineClass = ({ hasError = false, active = false }: { hasError?: boolean; active?: boolean } = {}): string =>
	joinClasses([
		'absolute bottom-0 left-0 right-0 h-0.5 transition-colors',
		hasError ? 'bg-error dark:bg-error-dark' : active ? 'bg-primary dark:bg-dark' : 'bg-text-primary/30 dark:bg-text-dark/30'
	]);

export const resolveCodeInputBoxCellClass = ({
	index = 0,
	length = 6,
	currentIndex = 0,
	focused = false,
	hasError = false,
	gutter = '2',
	cellBg = 'gray',
	cellBorder = 'solid',
	radius = '',
	cellSize = 'md'
}: {
	index?: number;
	length?: number;
	currentIndex?: number;
	focused?: boolean;
	hasError?: boolean;
	gutter?: string;
	cellBg?: CodeInputCellBg;
	cellBorder?: CodeInputCellBorder;
	radius?: CodeInputRadius | string;
	cellSize?: CodeInputCellSize;
} = {}): string => {
	const isActive = resolveCodeInputCellActive({ focused, index, currentIndex });
	const borderVisible = cellBorder !== 'none';
	const radiusClass =
		gutter === '0'
			? index === 0
				? resolveCodeInputCellRadiusLeftClass({ radius })
				: index === length - 1
					? resolveCodeInputCellRadiusRightClass({ radius })
					: ''
			: resolveCodeInputCellRadiusClass({ radius });

	return joinClasses([
		'relative flex items-center justify-center',
		resolveClassMapValue(bgObj, cellBg, 'gray'),
		borderVisible && 'border',
		resolveClassMapValue(codeInputBorderObj, cellBorder, 'none'),
		hasError
			? 'border-error dark:border-error-dark'
			: isActive
				? 'border-primary dark:border-dark'
				: borderVisible
					? 'border-black/10 dark:border-white/10'
					: '',
		gutter === '0' && index > 0 && !isActive && 'border-l-0',
		radiusClass,
		resolveClassMapValue(codeInputSizeClass, cellSize, 'md'),
		'font-semibold transition-colors'
	]);
};

export const resolveCodeInputRootClass = (injClass = ''): string => joinClasses(['relative', injClass]);

// 输入 CodeInput 间距配置，返回框架无关的格子按钮 class。
// Receive CodeInput gutter config and return a framework-agnostic cell button class.
export const resolveCodeInputButtonClass = (gutter: string = '2'): string => joinClasses(['flex', resolveCodeInputGutterClass(gutter)]);

export const resolveCodeInputInfoClass = (hasError = false): string =>
	joinClasses(['mt-2 text-sm', hasError ? 'text-error dark:text-error-dark' : 'text-gray-500 dark:text-gray-400']);

// 输入组件 props 和内部状态快照，返回框架无关的 CodeInput 派生入参。
// Receive component props and internal state snapshots, then return framework-agnostic CodeInput derivation options.
export const resolveCodeInputStateOptions = ({
	focused,
	keyboardVisible,
	props,
	value
}: ResolveCodeInputStateOptionsParams): ResolveCodeInputDerivedOptions => ({
	bold: props.bold,
	cellBg: props.cellBg,
	cellBorder: props.cellBorder,
	cellSize: props.cellSize,
	cellStyle: props.cellStyle,
	cursorAnimation: props.cursorAnimation,
	cursorStyle: props.cursorStyle,
	errorInfo: props.errorInfo,
	focused,
	gutter: props.gutter,
	info: props.info,
	inputMode: props.inputMode,
	injClass: props.injClass,
	keyboardVisible,
	length: props.length,
	mask: props.mask,
	native: props.native,
	radius: props.radius,
	showCursor: props.showCursor,
	type: props.type,
	value
});

// 输入 CodeInput 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current CodeInput state and return framework-agnostic derived values ready for component binding.
export const resolveCodeInputDerived = ({
	bold = false,
	cellBg = 'gray',
	cellBorder = 'solid',
	cellSize = 'md',
	cellStyle = 'box',
	cursorAnimation = 'blink',
	cursorStyle = 'line',
	errorInfo = '',
	focused = false,
	gutter = '2',
	info = '',
	inputMode = '',
	injClass = '',
	keyboardVisible = false,
	length = 6,
	mask = false,
	radius = '',
	showCursor: externalShowCursor,
	type = 'number',
	value = ''
}: ResolveCodeInputDerivedOptions = {}): CodeInputDerived => {
	const cursorAnimationClass = resolveCodeInputCursorAnimationClass(cursorAnimation);
	const currentIndex = resolveCodeInputCurrentIndex(value);
	const showCursor = externalShowCursor ?? resolveCodeInputShowCursor({ keyboardVisible, currentIndex, length });
	const infoState = resolveCodeInputInfoState({ info, errorInfo });
	const hasError = infoState.hasError;
	const textClass = resolveCodeInputTextClass({ bold, cellSize });
	const dotClass = resolveCodeInputDotClass(cellSize);
	const cursorClass = resolveCodeInputCursorClass({ cellSize, cursorAnimationClass });
	const underlineCursorClass = resolveCodeInputUnderlineCursorClass({ box: cellStyle !== 'line', cursorAnimationClass });
	const lineCellClass = resolveCodeInputLineCellClass(cellSize);

	return {
		buttonClass: resolveCodeInputButtonClass(gutter),
		cellDisplayStates: resolveCodeInputCellDisplayStateList({ value, length, mask, showCursor, currentIndex, cursorStyle }).map(
			(cellDisplayState) => {
				const active = resolveCodeInputCellActive({ focused, index: cellDisplayState.index, currentIndex });
				const boxCellClass = resolveCodeInputBoxCellClass({
					index: cellDisplayState.index,
					length,
					currentIndex,
					focused,
					hasError,
					gutter,
					cellBg,
					cellBorder,
					radius,
					cellSize
				});
				return {
					...cellDisplayState,
					active,
					boxCellClass,
					cellClass: cellStyle === 'line' ? lineCellClass : boxCellClass,
					cursorClass,
					dotClass,
					lineCellClass,
					lineClass: resolveCodeInputLineClass({ hasError, active }),
					textClass,
					underlineCursorClass
				};
			}
		),
		cellStyle,
		currentIndex,
		cursorAnimationClass,
		hasError,
		infoClass: resolveCodeInputInfoClass(hasError),
		infoState,
		nativeInputClass: resolveCodeInputNativeInputClass(),
		nativeInputMode: resolveCodeInputNativeInputMode({ inputMode, type }),
		rootClass: resolveCodeInputRootClass(injClass),
		showCursor
	};
};
