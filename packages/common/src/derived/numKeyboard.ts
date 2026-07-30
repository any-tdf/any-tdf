import { radiusObj } from './common.js';
import { joinClasses, resolveKeyboardPreviewState, type KeyboardPreviewState } from './helpers.js';
import { getNumKeyboardSvgSize } from '../svg/numKeyboard.js';

export const numKeyboardHeightClass = {
	'8': 'h-8',
	'10': 'h-10',
	'12': 'h-12',
	'14': 'h-14',
	'16': 'h-16',
	'20': 'h-20'
} as const;

export const numKeyboardFontSizeClass = {
	'8': 'text-sm',
	'10': 'text-base',
	'12': 'text-xl',
	'14': 'text-2xl',
	'16': 'text-2xl',
	'20': 'text-2xl'
} as const;

export const numKeyboardGapClass = {
	'0': 'gap-0',
	'1': 'gap-1',
	'2': 'gap-2',
	'3': 'gap-3',
	'4': 'gap-4'
} as const;

export const numKeyboardPClass = {
	'0': 'p-0',
	'1': 'p-1',
	'2': 'p-2',
	'3': 'p-3',
	'4': 'p-4'
} as const;

export type NumKeyboardTypeClassKey = 'button' | 'block';
export type NumKeyboardHeightClassKey = keyof typeof numKeyboardHeightClass;
export type NumKeyboardSpaceClassKey = keyof typeof numKeyboardGapClass;
export type NumKeyboardPaddingClassKey = keyof typeof numKeyboardPClass;
export type NumKeyboardRadiusClassKey = keyof typeof radiusObj | '';
export type NumKeyboardDigitKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type NumKeyboardRenderKey = NumKeyboardDigitKey | '.' | 'delete' | 'close' | 'done';

export type NumKeyboardRows = {
	topKeys: readonly NumKeyboardDigitKey[];
	middleKeys: readonly NumKeyboardDigitKey[];
	bottomKeys: readonly NumKeyboardDigitKey[];
};

export type ResolveNumKeyboardHeightOptions = {
	type?: NumKeyboardTypeClassKey;
	p?: NumKeyboardPaddingClassKey;
	space?: NumKeyboardSpaceClassKey;
	height?: NumKeyboardHeightClassKey;
	preview?: boolean;
	previewHeight?: number;
};

export type ResolveNumKeyboardKeyClassOptions = {
	key: string | number;
	type?: NumKeyboardTypeClassKey;
	height?: NumKeyboardHeightClassKey;
	radius?: NumKeyboardRadiusClassKey;
	keyClass?: string;
};

export type ResolveNumKeyboardZeroColClassOptions = {
	done?: boolean;
	dot?: boolean;
	close?: boolean;
};

export type ResolveNumKeyboardZeroKeyClassOptions = ResolveNumKeyboardZeroColClassOptions & {
	baseClass: string;
};

export type ResolveNumKeyboardPanelClassOptions = {
	type?: NumKeyboardTypeClassKey;
	p?: NumKeyboardPaddingClassKey;
	panelClass?: string;
};

export type ResolveNumKeyboardGridClassOptions = {
	type?: NumKeyboardTypeClassKey;
	space?: NumKeyboardSpaceClassKey;
	done?: boolean;
};

export type ResolveNumKeyboardDoneKeyClassOptions = {
	baseClass: string;
	doneDisabled?: boolean;
	doneClass?: string;
};

export type ResolveNumKeyboardNextValueOptions = {
	value: string;
	key: string;
};

export type ResolveNumKeyboardShowCloseKeyOptions = {
	close?: boolean;
	done?: boolean;
	dot?: boolean;
};

export type ResolveNumKeyboardKeyActionOptions = {
	doneDisabled?: boolean;
	key: string;
	value: string;
};
export type ResolveNumKeyboardKeyFlowOptions = ResolveNumKeyboardKeyActionOptions & {
	closeOptions?: ResolveNumKeyboardCloseActionOptions;
};

export type NumKeyboardKeyAction = {
	nextValue: string;
	shouldClose: boolean;
	shouldUpdateValue: boolean;
};
export type ResolveNumKeyboardCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};
export type NumKeyboardCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};
export type NumKeyboardKeyFlow = NumKeyboardKeyAction & {
	closeAction: NumKeyboardCloseAction | null;
};
export type ResolveNumKeyboardVisibleChangeActionOptions = {
	clear?: boolean;
	keyboardHeight: number;
	previousVisible?: boolean;
	visible: boolean;
};
export type NumKeyboardVisibleChangeAction = {
	nextPreviousVisible: boolean;
	openHeight: number;
	shouldClearValue: boolean;
	shouldEmitClose: boolean;
	shouldEmitOpen: boolean;
	shouldSkip: boolean;
};
export type ResolveNumKeyboardCloseEmissionActionOptions = {
	shouldEmitClose: boolean;
	skipNextCloseEmission?: boolean;
};
export type NumKeyboardCloseEmissionAction = {
	nextSkipNextCloseEmission: boolean;
	shouldEmitClose: boolean;
	shouldSkipCloseEmission: boolean;
};

export type NumKeyboardTextDefaults = {
	done: string;
};

export type NumKeyboardPopupLike = {
	mask?: unknown;
	visible?: unknown;
};

export type NumKeyboardPopupDerived<TPopup extends NumKeyboardPopupLike> = Omit<TPopup, 'mask' | 'visible'> & {
	mask: { opacity: '0' } & Record<string, unknown>;
	size: 0;
	transitionDistance: number;
};

export type NumKeyboardKeyClassMap = Record<NumKeyboardRenderKey, string>;

export type ResolveNumKeyboardDerivedOptions<TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike> = ResolveNumKeyboardHeightOptions &
	ResolveNumKeyboardZeroColClassOptions & {
		doneClass?: string;
		doneDisabled?: boolean;
		doneText?: string;
		defaults: NumKeyboardTextDefaults;
		keyClass?: string;
		panelClass?: string;
		popup?: TPopup | null;
		radius?: NumKeyboardRadiusClassKey;
		reverse?: boolean;
		value?: string;
		previewMask?: boolean;
	};

export type NumKeyboardStatePropsLike<TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike> = Partial<
	Omit<ResolveNumKeyboardDerivedOptions<TPopup>, 'defaults' | 'doneDisabled' | 'value'>
>;

export type ResolveNumKeyboardStateOptionsParams<TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike> = {
	defaults: NumKeyboardTextDefaults;
	doneDisabled?: boolean;
	props: NumKeyboardStatePropsLike<TPopup>;
	value?: string;
};

export type NumKeyboardDerived<TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike> = {
	doneKeyClass: string;
	doneText: string;
	gridClass: string;
	keyClasses: NumKeyboardKeyClassMap;
	keyRows: NumKeyboardRows;
	keyboardHeight: number;
	panelClass: string;
	previewClass: string;
	popupProps: Partial<NumKeyboardPopupDerived<TPopup>>;
	previewState: KeyboardPreviewState;
	showCloseKey: boolean;
	svgClass: string;
	svgSize: number;
	usePopup: boolean;
	zeroKeyClass: string;
};

const numKeyboardNormalTopKeys = ['1', '2', '3'] as const;
const numKeyboardNormalBottomKeys = ['7', '8', '9'] as const;
const numKeyboardMiddleKeys = ['4', '5', '6'] as const;

// 输入外部可见值，返回组件内部初始可见状态，保留数字键盘默认展开行为。
// Normalize an external visible value into initial internal visibility while keeping the keyboard open by default.
export const resolveNumKeyboardInitialVisible = (visible?: boolean, defaultVisible = true): boolean => visible ?? defaultVisible;

// 输入外部 NumKeyboard 值，返回组件内部可写入的初始值。
// Normalize an external NumKeyboard value into an internal writable initial value.
export const resolveNumKeyboardInitialValue = (value?: string | null): string => value ?? '';

// 输入数字键盘关闭请求，返回组件层可写入的关闭动作。
// Receive a numeric keyboard close request and return a close action for the component layer.
export const resolveNumKeyboardCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveNumKeyboardCloseActionOptions = {}): NumKeyboardCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入可见状态快照，返回组件层是否清空值以及触发打开或关闭回调。
// Receive visibility snapshots and return whether the component layer should clear value or emit open or close callbacks.
export const resolveNumKeyboardVisibleChangeAction = ({
	visible,
	previousVisible,
	clear = false,
	keyboardHeight
}: ResolveNumKeyboardVisibleChangeActionOptions): NumKeyboardVisibleChangeAction => {
	const shouldSkip = previousVisible === visible;
	const hadPreviousVisible = previousVisible !== undefined;
	return {
		nextPreviousVisible: visible,
		openHeight: keyboardHeight,
		shouldClearValue: !shouldSkip && visible && clear,
		shouldEmitOpen: !shouldSkip && visible,
		shouldEmitClose: !shouldSkip && !visible && hadPreviousVisible,
		shouldSkip
	};
};

// 输入关闭回调决策和跳过标记，返回组件层是否触发关闭回调以及下一次标记。
// Receive close callback decision and skip flag, then return whether to emit close and the next skip flag for the component layer.
export const resolveNumKeyboardCloseEmissionAction = ({
	shouldEmitClose,
	skipNextCloseEmission = false
}: ResolveNumKeyboardCloseEmissionActionOptions): NumKeyboardCloseEmissionAction => {
	const shouldSkipCloseEmission = shouldEmitClose && skipNextCloseEmission;
	return {
		nextSkipNextCloseEmission: shouldSkipCloseEmission ? false : skipNextCloseEmission,
		shouldEmitClose: shouldEmitClose && !skipNextCloseEmission,
		shouldSkipCloseEmission
	};
};

export const resolveNumKeyboardUsePopup = (popup: unknown): boolean => popup !== null;

// 输入完成按钮文案 prop 和默认文案，返回框架无关的最终文案。
// Consume the done button text prop and default text, then return framework-agnostic final text.
export const resolveNumKeyboardDoneText = (doneText: string | undefined, defaults: NumKeyboardTextDefaults): string =>
	doneText ?? defaults.done;

// 输入 Popup 配置和键盘高度，返回组件层可直接透传的 Popup props。
// Receive Popup config and keyboard height, then return pass-through Popup props for the component layer.
export const resolveNumKeyboardPopupProps = <TPopup extends NumKeyboardPopupLike>(
	popup: TPopup | null | undefined,
	transitionDistance = 0
): Partial<NumKeyboardPopupDerived<TPopup>> => {
	if (!popup) return {};
	const { visible: _visible, mask, ...restPopup } = popup;
	return {
		size: 0,
		mask: { opacity: '0', ...((mask || {}) as Record<string, unknown>) },
		transitionDistance,
		...restPopup
	} as Partial<NumKeyboardPopupDerived<TPopup>>;
};

// 输入数字键盘布局状态，返回面板高度，不读取 DOM。
// Resolve numeric keyboard layout state into panel height without DOM reads.
export const resolveNumKeyboardHeight = (options: ResolveNumKeyboardHeightOptions = {}) => {
	const { type = 'button', p = '2', space = '2', height = '12', preview = false, previewHeight = 44 } = options;
	const pNum = Number.parseInt(p, 10);
	const gapNum = type === 'button' ? Number.parseInt(space, 10) : 0;
	const heightNum = Number.parseInt(height, 10);
	const baseHeight = (pNum * 2 + gapNum * 3 + heightNum * 4) * 4 + (type === 'block' ? 4 : 0);
	return preview ? baseHeight + previewHeight : baseHeight;
};

// 输入布局方向状态，返回框架无关的按键行数据。
// Resolve layout direction state into framework-agnostic key row data.
export const resolveNumKeyboardRows = (reverse = false): NumKeyboardRows => ({
	topKeys: reverse ? numKeyboardNormalBottomKeys : numKeyboardNormalTopKeys,
	middleKeys: numKeyboardMiddleKeys,
	bottomKeys: reverse ? numKeyboardNormalTopKeys : numKeyboardNormalBottomKeys
});

// 输入按键状态，返回组件层可绑定的 class。
// Receive key state and return a class value for the component layer.
export const resolveNumKeyboardKeyClass = (options: ResolveNumKeyboardKeyClassOptions) => {
	const { key, type = 'button', height = '12', radius = '', keyClass = '' } = options;
	const heightClass = numKeyboardHeightClass[height] || 'h-12';
	const fontSizeClass = numKeyboardFontSizeClass[height] || 'text-base';
	const buttonClass = joinClasses([
		'flex flex-col justify-center items-center shadow-xs font-bold active:scale-95 transition-all duration-100',
		heightClass,
		fontSizeClass,
		radius ? radiusObj[radius] : 'rounded-(--radius-form)',
		keyClass
	]);
	const blockClass = joinClasses([
		'flex flex-col justify-center items-center font-bold active:opacity-40 transition-all duration-100',
		heightClass,
		fontSizeClass,
		keyClass
	]);
	const coreClass = type === 'button' ? buttonClass : blockClass;

	return key === 'done' ? coreClass : `bg-bg-highlight dark:bg-bg-highlight-dark ${coreClass}`;
};

export const resolveNumKeyboardZeroColClass = (options: ResolveNumKeyboardZeroColClassOptions = {}) => {
	const { done = true, dot = true, close = false } = options;
	if (!done) {
		return dot || close ? 'col-span-1' : 'col-span-2';
	}
	return dot && close ? 'col-span-1' : dot || close ? 'col-span-2' : 'col-span-3';
};

// 输入零键状态，返回框架无关的完整零键 class。
// Receive zero-key state and return a framework-agnostic complete zero-key class.
export const resolveNumKeyboardZeroKeyClass = ({
	baseClass,
	done = true,
	dot = true,
	close = false
}: ResolveNumKeyboardZeroKeyClassOptions): string => joinClasses([baseClass, resolveNumKeyboardZeroColClass({ done, dot, close })]);

// 输入键盘布局状态，返回 close 键是否需要渲染。
// Receive keyboard layout state and return whether the close key should render.
export const resolveNumKeyboardShowCloseKey = ({
	done = true,
	dot = true,
	close = false
}: ResolveNumKeyboardShowCloseKeyOptions = {}): boolean => (done ? close : !dot && close);

export const resolveNumKeyboardPanelClass = (options: ResolveNumKeyboardPanelClassOptions = {}) => {
	const { type = 'button', p = '2', panelClass = '' } = options;
	return joinClasses([
		'bg-black/5 text-center dark:bg-white/5',
		type === 'block' ? 'border-t border-gray-100 dark:border-gray-950' : '',
		numKeyboardPClass[p] || 'p-2',
		panelClass
	]);
};

export const resolveNumKeyboardGridClass = (options: ResolveNumKeyboardGridClassOptions = {}) => {
	const { type = 'button', space = '2', done = true } = options;
	return joinClasses(['grid', type === 'button' ? numKeyboardGapClass[space] || 'gap-2' : 'gap-px', done ? 'grid-cols-4' : 'grid-cols-3']);
};

export const resolveNumKeyboardPreviewClass = (): string =>
	'mb-2 flex h-11 items-center justify-center rounded-(--radius-form) bg-bg-highlight text-xl font-semibold tracking-widest dark:bg-bg-highlight-dark';

export const resolveNumKeyboardSvgClass = (): string => 'mx-auto block fill-current';

// 输入完成键状态，返回框架无关的 done key class。
// Resolve done-key state into a framework-agnostic done key class.
export const resolveNumKeyboardDoneKeyClass = ({
	baseClass,
	doneDisabled = false,
	doneClass = ''
}: ResolveNumKeyboardDoneKeyClassOptions) =>
	joinClasses([
		baseClass,
		'bg-primary dark:bg-dark row-span-3 h-full text-text-on-primary dark:text-text-on-dark',
		doneDisabled ? '!opacity-50 transition-none active:!scale-100' : '',
		doneClass
	]);

// 输入组件 props、禁用态、当前值和默认文案，返回框架无关的 NumKeyboard 派生入参。
// Receive component props, disabled state, current value and default text, then return framework-agnostic NumKeyboard derivation options.
export const resolveNumKeyboardStateOptions = <TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike>({
	defaults,
	doneDisabled,
	props,
	value
}: ResolveNumKeyboardStateOptionsParams<TPopup>): ResolveNumKeyboardDerivedOptions<TPopup> => ({
	close: props.close,
	defaults,
	done: props.done,
	doneClass: props.doneClass,
	doneDisabled,
	doneText: props.doneText,
	dot: props.dot,
	height: props.height,
	keyClass: props.keyClass,
	p: props.p,
	panelClass: props.panelClass,
	popup: props.popup,
	preview: props.preview,
	previewHeight: props.previewHeight,
	previewMask: props.previewMask,
	radius: props.radius,
	reverse: props.reverse,
	space: props.space,
	type: props.type,
	value
});

// 输入 NumKeyboard 的 props 和输入值状态，返回框架无关的渲染派生结果。
// Receive NumKeyboard props and value state, then return framework-agnostic render derivations.
export const resolveNumKeyboardDerived = <TPopup extends NumKeyboardPopupLike = NumKeyboardPopupLike>({
	type = 'button',
	p = '2',
	space = '2',
	height = '12',
	preview = false,
	previewHeight,
	done = true,
	dot = true,
	close = false,
	doneClass = '',
	doneDisabled = false,
	doneText,
	defaults,
	keyClass = '',
	panelClass = '',
	popup,
	radius = '',
	reverse = false,
	value = '',
	previewMask = false
}: ResolveNumKeyboardDerivedOptions<TPopup>): NumKeyboardDerived<TPopup> => {
	const keyboardHeight = resolveNumKeyboardHeight({ type, p, space, height, preview, previewHeight });
	const createKeyClass = (key: NumKeyboardRenderKey) => resolveNumKeyboardKeyClass({ key, type, height, radius, keyClass });
	const keyClasses: NumKeyboardKeyClassMap = {
		'0': createKeyClass('0'),
		'1': createKeyClass('1'),
		'2': createKeyClass('2'),
		'3': createKeyClass('3'),
		'4': createKeyClass('4'),
		'5': createKeyClass('5'),
		'6': createKeyClass('6'),
		'7': createKeyClass('7'),
		'8': createKeyClass('8'),
		'9': createKeyClass('9'),
		'.': createKeyClass('.'),
		close: createKeyClass('close'),
		delete: createKeyClass('delete'),
		done: createKeyClass('done')
	};

	return {
		usePopup: resolveNumKeyboardUsePopup(popup),
		doneText: resolveNumKeyboardDoneText(doneText, defaults),
		keyRows: resolveNumKeyboardRows(reverse),
		svgSize: getNumKeyboardSvgSize(height),
		previewState: resolveKeyboardPreviewState({ value, previewMask }),
		showCloseKey: resolveNumKeyboardShowCloseKey({ done, dot, close }),
		keyboardHeight,
		panelClass: resolveNumKeyboardPanelClass({ type, p, panelClass }),
		previewClass: resolveNumKeyboardPreviewClass(),
		gridClass: resolveNumKeyboardGridClass({ type, space, done }),
		keyClasses,
		svgClass: resolveNumKeyboardSvgClass(),
		zeroKeyClass: resolveNumKeyboardZeroKeyClass({ baseClass: keyClasses['0'], done, dot, close }),
		doneKeyClass: resolveNumKeyboardDoneKeyClass({ baseClass: keyClasses.done, doneDisabled, doneClass }),
		popupProps: resolveNumKeyboardPopupProps(popup, keyboardHeight)
	};
};

// 只计算按键后的 value，不处理关闭、禁用和事件。
// Only calculate the next value after key press without close, disabled or event handling.
export const resolveNumKeyboardNextValue = ({ value, key }: ResolveNumKeyboardNextValueOptions): string => {
	if (key === 'close' || key === 'done') return value;
	return key === 'delete' ? value.slice(0, -1) : value + key;
};

// 输入按键状态，返回无副作用的值更新和关闭决策。
// Receive key state and return side-effect-free value update and close decisions.
export const resolveNumKeyboardKeyAction = ({
	value,
	key,
	doneDisabled = false
}: ResolveNumKeyboardKeyActionOptions): NumKeyboardKeyAction => {
	const shouldUpdateValue = key !== 'close' && key !== 'done';
	return {
		nextValue: shouldUpdateValue ? resolveNumKeyboardNextValue({ value, key }) : value,
		shouldUpdateValue,
		shouldClose: key === 'close' || (key === 'done' && !doneDisabled)
	};
};

// 输入按键状态，返回值更新和关闭动作的完整纯流程。
// Receive key state and return a complete side-effect-free value and close flow.
export const resolveNumKeyboardKeyFlow = ({ closeOptions, ...options }: ResolveNumKeyboardKeyFlowOptions): NumKeyboardKeyFlow => {
	const action = resolveNumKeyboardKeyAction(options);
	return {
		...action,
		closeAction: action.shouldClose ? resolveNumKeyboardCloseAction(closeOptions) : null
	};
};
