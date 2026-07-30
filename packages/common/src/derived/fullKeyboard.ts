import { radiusObj } from './common.js';
import { joinClasses, resolveKeyboardPreviewState } from './helpers.js';
import type { LargeAreaRadius } from '../types/index.js';

export const fullKeyboardLetterRows = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['z', 'x', 'c', 'v', 'b', 'n', 'm']
] as const;

export const fullKeyboardNumberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const;

export const fullKeyboardSymbolRows = [
	['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	['`', '~', '!', '@', '#', '$', '%', '^', '&', '*'],
	['(', ')', '-', '_', '=', '+', '[', ']', '{', '}'],
	['\\', '|', ';', ':', "'", '"', ',', '.', '<'],
	['>', '/', '?']
] as const;

export const fullKeyboardKeyClass = {
	button:
		'flex items-center justify-center h-11 bg-bg-highlight dark:bg-bg-highlight-dark shadow-xs font-medium active:scale-95 transition-all duration-100 text-lg text-text-primary dark:text-text-dark',
	block:
		'flex items-center justify-center h-11 bg-bg-highlight dark:bg-bg-highlight-dark font-medium active:opacity-40 transition-all duration-100 text-lg text-text-primary dark:text-text-dark'
} as const;

export const fullKeyboardFuncKeyClass = {
	button:
		'flex items-center justify-center h-11 bg-black/10 dark:bg-white/10 shadow-xs font-medium active:scale-95 transition-all duration-100',
	block: 'flex items-center justify-center h-11 bg-black/10 dark:bg-white/10 font-medium active:opacity-40 transition-all duration-100'
} as const;

export const fullKeyboardGapClass = {
	button: 'gap-0.5',
	block: 'gap-px'
} as const;

export type FullKeyboardMode = 'letter' | 'letterNumber' | 'full';
export type FullKeyboardType = keyof typeof fullKeyboardKeyClass;

export type ResolveFullKeyboardHeightOptions = {
	mode?: FullKeyboardMode;
	preview?: boolean;
	previewHeight?: number;
};

export type ResolveFullKeyboardLayoutStateOptions = {
	done?: boolean;
	isSymbolMode?: boolean;
	mode?: FullKeyboardMode;
};

export type ResolveFullKeyboardNextValueOptions = {
	value: string;
	key: string;
	isUpperCase?: boolean;
};

export type ResolveFullKeyboardKeyActionOptions = ResolveFullKeyboardNextValueOptions & {
	doneDisabled?: boolean;
};
export type ResolveFullKeyboardKeyFlowOptions = ResolveFullKeyboardKeyActionOptions & {
	closeOptions?: ResolveFullKeyboardCloseActionOptions;
};

export type FullKeyboardKeyAction = {
	emitKey: string;
	nextValue: string;
	shouldEmit: boolean;
	shouldUpdateValue: boolean;
	shouldClose: boolean;
};
export type ResolveFullKeyboardCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};
export type FullKeyboardCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};
export type FullKeyboardKeyFlow = FullKeyboardKeyAction & {
	closeAction: FullKeyboardCloseAction | null;
};
export type FullKeyboardCaseToggleAction = {
	nextUpperCase: boolean;
};
export type FullKeyboardSymbolModeToggleAction = {
	nextSymbolMode: boolean;
};
export type ResolveFullKeyboardVisibleChangeActionOptions = {
	keyboardHeight: number;
	previousVisible?: boolean;
	visible: boolean;
};
export type FullKeyboardVisibleChangeAction = {
	nextPreviousVisible: boolean;
	openHeight: number;
	shouldEmitClose: boolean;
	shouldEmitOpen: boolean;
	shouldSkip: boolean;
};
export type ResolveFullKeyboardCloseEmissionActionOptions = {
	shouldEmitClose: boolean;
	skipNextCloseEmission?: boolean;
};
export type FullKeyboardCloseEmissionAction = {
	nextSkipNextCloseEmission: boolean;
	shouldEmitClose: boolean;
	shouldSkipCloseEmission: boolean;
};
export type ResolveFullKeyboardVisibleChangeFlowOptions = ResolveFullKeyboardVisibleChangeActionOptions & {
	skipNextCloseEmission?: boolean;
};
export type FullKeyboardVisibleChangeFlow = FullKeyboardVisibleChangeAction &
	FullKeyboardCloseEmissionAction & {
		rawShouldEmitClose: boolean;
	};
export type ResolveFullKeyboardRootPropsOptions<TPopupProps extends object = Record<string, never>> = {
	popupProps?: TPopupProps | null;
	usePopup?: boolean;
	visible?: boolean;
};

export type FullKeyboardRadiusKey = keyof typeof radiusObj | string;
export type FullKeyboardTexts = {
	doneText: string;
	spaceText: string;
};
export type FullKeyboardTextDefaults = {
	common: {
		done: string;
	};
	fullKeyboard: {
		space: string;
	};
};
export type ResolveFullKeyboardTextsOptions = {
	doneText?: string;
	defaults: FullKeyboardTextDefaults;
};
export type FullKeyboardPopupLike = {
	mask?: unknown;
	radius?: LargeAreaRadius;
	visible?: unknown;
};

export type FullKeyboardPopupDerived<TPopup extends FullKeyboardPopupLike> = Omit<TPopup, 'mask' | 'radius' | 'visible'> & {
	mask: { opacity: '0' } & Record<string, unknown>;
	radius: LargeAreaRadius | undefined;
	size: 0;
	transitionDistance: number;
};
export type FullKeyboardLayoutState = {
	bottomSymbolKeys: readonly string[];
	showBottomSymbolKeys: boolean;
	showDoneButton: boolean;
	showFullMode: boolean;
	showLetterMode: boolean;
	showLetterNumberMode: boolean;
	showLetterRows: boolean;
	showNumberRow: boolean;
	showSymbolRows: boolean;
	symbolMainRows: readonly (readonly string[])[];
};
export type ResolveFullKeyboardDerivedOptions<TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike> =
	ResolveFullKeyboardHeightOptions & {
		done?: boolean;
		doneClass?: string;
		doneDisabled?: boolean;
		isSymbolMode?: boolean;
		isUpperCase?: boolean;
		keyClass?: string;
		panelClass?: string;
		popup?: TPopup | null;
		radius?: FullKeyboardRadiusKey;
		type?: string;
		value?: string;
		previewMask?: boolean;
	};

export type FullKeyboardStatePropsLike<TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike> = Partial<
	Omit<ResolveFullKeyboardDerivedOptions<TPopup>, 'doneDisabled' | 'isSymbolMode' | 'isUpperCase' | 'value'>
>;

export type ResolveFullKeyboardStateOptionsParams<TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike> = {
	doneDisabled?: boolean;
	isSymbolMode?: boolean;
	isUpperCase?: boolean;
	props: FullKeyboardStatePropsLike<TPopup>;
	value?: string;
};

export type FullKeyboardDerived<TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike> = {
	bottomRowClass: string;
	deleteButtonClass: string;
	doneButtonClass: string;
	flex1KeyClass: string;
	flexRowClass: string;
	gridRow10Class: string;
	gridRow9PxClass: string;
	iconClass: string;
	innerGrid7Class: string;
	innerGrid9Class: string;
	keyButtonClass: string;
	keyboardHeight: number;
	layout: FullKeyboardLayoutState;
	panelClass: string;
	popupProps: Partial<FullKeyboardPopupDerived<TPopup>>;
	previewClass: string;
	previewState: ReturnType<typeof resolveKeyboardPreviewState>;
	shiftButtonClass: string;
	spaceTextClass: string;
	symbolKeyClass: string;
	symbolToggleButtonClass: string;
	symbolToggleText: string;
};

// 输入外部可见值，返回组件内部初始可见状态，保留全键盘默认展开行为。
// Normalize an external visible value into initial internal visibility while keeping the keyboard open by default.
export const resolveFullKeyboardInitialVisible = (visible?: boolean, defaultVisible = true): boolean => visible ?? defaultVisible;

// 输入外部 FullKeyboard 值，返回组件内部可写入的初始值。
// Normalize an external FullKeyboard value into an internal writable initial value.
export const resolveFullKeyboardInitialValue = (value?: string | null): string => value ?? '';

// 输入全键盘关闭请求，返回组件层可写入的关闭动作。
// Receive a full keyboard close request and return a close action for the component layer.
export const resolveFullKeyboardCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveFullKeyboardCloseActionOptions = {}): FullKeyboardCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入可见状态快照，返回组件层是否触发打开或关闭回调。
// Receive visibility snapshots and return whether the component layer should emit open or close callbacks.
export const resolveFullKeyboardVisibleChangeAction = ({
	visible,
	previousVisible,
	keyboardHeight
}: ResolveFullKeyboardVisibleChangeActionOptions): FullKeyboardVisibleChangeAction => {
	const shouldSkip = previousVisible === visible;
	const hadPreviousVisible = previousVisible !== undefined;
	return {
		nextPreviousVisible: visible,
		openHeight: keyboardHeight,
		shouldEmitOpen: !shouldSkip && visible,
		shouldEmitClose: !shouldSkip && !visible && hadPreviousVisible,
		shouldSkip
	};
};

// 输入关闭回调决策和跳过标记，返回组件层是否触发关闭回调以及下一次标记。
// Receive close callback decision and skip flag, then return whether to emit close and the next skip flag for the component layer.
export const resolveFullKeyboardCloseEmissionAction = ({
	shouldEmitClose,
	skipNextCloseEmission = false
}: ResolveFullKeyboardCloseEmissionActionOptions): FullKeyboardCloseEmissionAction => {
	const shouldSkipCloseEmission = shouldEmitClose && skipNextCloseEmission;
	return {
		nextSkipNextCloseEmission: shouldSkipCloseEmission ? false : skipNextCloseEmission,
		shouldEmitClose: shouldEmitClose && !skipNextCloseEmission,
		shouldSkipCloseEmission
	};
};

// 输入可见状态快照和关闭跳过标记，返回组件层可同步的可见性回调流程。
// Receive visibility snapshots and the close-skip marker, then return a visibility callback flow for component layers.
export const resolveFullKeyboardVisibleChangeFlow = ({
	skipNextCloseEmission = false,
	...options
}: ResolveFullKeyboardVisibleChangeFlowOptions): FullKeyboardVisibleChangeFlow => {
	const visibleAction = resolveFullKeyboardVisibleChangeAction(options);
	const closeEmissionAction = resolveFullKeyboardCloseEmissionAction({
		shouldEmitClose: visibleAction.shouldEmitClose,
		skipNextCloseEmission
	});
	return {
		...visibleAction,
		...closeEmissionAction,
		rawShouldEmitClose: visibleAction.shouldEmitClose
	};
};

export const resolveFullKeyboardUsePopup = (popup: unknown): boolean => popup !== null;

// 输入 Popup 使用状态和键盘可见状态，返回组件根节点可绑定的 props。
// Receive Popup usage and keyboard visibility, then return bind-ready root props for the component layer.
export const resolveFullKeyboardRootProps = <TPopupProps extends object>({
	popupProps,
	usePopup = false,
	visible = false
}: ResolveFullKeyboardRootPropsOptions<TPopupProps>): ({ visible: boolean } & TPopupProps) | Record<string, never> => {
	if (!usePopup) return {};
	return {
		visible,
		...(popupProps ?? ({} as TPopupProps))
	};
};

// 输入键盘文案 props 和默认文案，返回框架无关的最终文案。
// Consume keyboard text props and default text, then return framework-agnostic final text.
export const resolveFullKeyboardTexts = ({ doneText, defaults }: ResolveFullKeyboardTextsOptions): FullKeyboardTexts => ({
	doneText: doneText ?? defaults.common.done,
	spaceText: defaults.fullKeyboard.space
});

// 输入 Popup 配置和键盘布局值，返回组件层可直接透传的 Popup props。
// Receive Popup config and keyboard layout values, then return pass-through Popup props for the component layer.
export const resolveFullKeyboardPopupProps = <TPopup extends FullKeyboardPopupLike>({
	popup,
	transitionDistance = 0,
	type = 'button'
}: {
	popup: TPopup | null | undefined;
	transitionDistance?: number;
	type?: string;
}): Partial<FullKeyboardPopupDerived<TPopup>> => {
	if (!popup) return {};
	const { visible: _visible, mask, radius, ...restPopup } = popup;
	return {
		size: 0,
		mask: { opacity: '0', ...((mask || {}) as Record<string, unknown>) },
		transitionDistance,
		radius: resolveFullKeyboardPopupRadius({ type, radius }),
		...restPopup
	} as Partial<FullKeyboardPopupDerived<TPopup>>;
};

export const resolveFullKeyboardHeight = ({
	mode = 'full',
	preview = false,
	previewHeight = 44
}: ResolveFullKeyboardHeightOptions = {}): number => {
	const baseHeight = mode === 'letterNumber' || mode === 'full' ? 304 : 260;
	return preview ? baseHeight + previewHeight : baseHeight;
};

export const resolveFullKeyboardInputKey = (key: string, isUpperCase = false): string => (isUpperCase ? key.toUpperCase() : key);

// 输入符号模式状态，返回框架无关的切换按钮文本。
// Resolve symbol-mode state into framework-agnostic toggle text.
export const resolveFullKeyboardSymbolToggleText = (isSymbolMode = false): string => (isSymbolMode ? 'ABC' : '123');

// 输入模式和符号状态，返回组件层可直接消费的布局分支和按键行。
// Receive mode and symbol state, then return layout branches and key rows for component binding.
export const resolveFullKeyboardLayoutState = ({
	done = true,
	isSymbolMode = false,
	mode = 'full'
}: ResolveFullKeyboardLayoutStateOptions = {}): FullKeyboardLayoutState => {
	const showLetterMode = mode === 'letter';
	const showLetterNumberMode = mode === 'letterNumber';
	const showFullMode = mode === 'full';
	const showSymbolRows = showFullMode && isSymbolMode;
	return {
		bottomSymbolKeys: showSymbolRows ? fullKeyboardSymbolRows[4] : [],
		showBottomSymbolKeys: showSymbolRows,
		showDoneButton: done,
		showFullMode,
		showLetterMode,
		showLetterNumberMode,
		showLetterRows: showLetterMode || showLetterNumberMode || (showFullMode && !isSymbolMode),
		showNumberRow: showLetterNumberMode,
		showSymbolRows,
		symbolMainRows: showSymbolRows ? fullKeyboardSymbolRows.slice(0, 3) : []
	};
};

export const resolveFullKeyboardKeyRadiusClass = ({
	type = 'button',
	radius = ''
}: { type?: string; radius?: FullKeyboardRadiusKey } = {}) =>
	type === 'button' ? (radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)') : '';

export const resolveFullKeyboardKeyClass = ({ type = 'button', keyClass = '' }: { type?: string; keyClass?: string } = {}) =>
	joinClasses([fullKeyboardKeyClass[type as FullKeyboardType] || fullKeyboardKeyClass.button, keyClass]);

export const resolveFullKeyboardFuncKeyClass = ({ type = 'button', keyClass = '' }: { type?: string; keyClass?: string } = {}) =>
	joinClasses([fullKeyboardFuncKeyClass[type as FullKeyboardType] || fullKeyboardFuncKeyClass.button, keyClass]);

export const resolveFullKeyboardGapClass = (type: string = 'button') =>
	fullKeyboardGapClass[type as FullKeyboardType] || fullKeyboardGapClass.button;

export const resolveFullKeyboardRowSpacingClass = (type: string = 'button') => (type === 'button' ? 'mb-0.5' : 'mb-px');

export const resolveFullKeyboardPanelClass = ({ type = 'button', panelClass = '' }: { type?: string; panelClass?: string } = {}) =>
	joinClasses([
		'select-none bg-black/5 dark:bg-white/5',
		type === 'button' ? 'p-1.5' : 'border-t border-gray-100 dark:border-gray-950',
		panelClass
	]);

export const resolveFullKeyboardPreviewClass = (type: string = 'button') =>
	joinClasses([
		'flex h-11 items-center justify-center bg-bg-highlight text-xl font-semibold tracking-widest dark:bg-bg-highlight-dark rounded-(--radius-form)',
		resolveFullKeyboardRowSpacingClass(type)
	]);

export const resolveFullKeyboardKeyButtonClass = ({
	type = 'button',
	radius = '',
	keyClass = '',
	extraClass = ''
}: { type?: string; radius?: FullKeyboardRadiusKey; keyClass?: string; extraClass?: string } = {}) =>
	joinClasses([resolveFullKeyboardKeyClass({ type, keyClass }), resolveFullKeyboardKeyRadiusClass({ type, radius }), extraClass]);

export const resolveFullKeyboardFuncButtonClass = ({
	type = 'button',
	radius = '',
	keyClass = '',
	extraClass = ''
}: { type?: string; radius?: FullKeyboardRadiusKey; keyClass?: string; extraClass?: string } = {}) =>
	joinClasses([resolveFullKeyboardFuncKeyClass({ type, keyClass }), resolveFullKeyboardKeyRadiusClass({ type, radius }), extraClass]);

export const resolveFullKeyboardShiftButtonClass = ({
	type = 'button',
	radius = '',
	keyClass = '',
	isUpperCase = false
}: { type?: string; radius?: FullKeyboardRadiusKey; keyClass?: string; isUpperCase?: boolean } = {}) =>
	resolveFullKeyboardFuncButtonClass({
		type,
		radius,
		keyClass,
		extraClass: joinClasses(['w-12', isUpperCase ? 'bg-primary/20 dark:bg-dark/20' : ''])
	});

export const resolveFullKeyboardDoneButtonClass = ({
	type = 'button',
	radius = '',
	doneDisabled = false,
	doneClass = ''
}: {
	type?: string;
	radius?: FullKeyboardRadiusKey;
	doneDisabled?: boolean;
	doneClass?: string;
} = {}) =>
	joinClasses([
		resolveFullKeyboardKeyRadiusClass({ type, radius }),
		'w-24 h-11 bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark font-medium',
		type === 'button' ? 'active:scale-95' : 'active:opacity-40',
		'transition-all duration-100',
		doneDisabled ? 'opacity-50 active:scale-100' : '',
		doneClass
	]);

export const resolveFullKeyboardGridRowClass = ({
	type = 'button',
	columns = 10,
	px = false
}: { type?: string; columns?: 7 | 9 | 10; px?: boolean } = {}) =>
	joinClasses([
		'grid',
		columns === 7 ? 'grid-cols-7' : columns === 9 ? 'grid-cols-9' : 'grid-cols-10',
		px ? 'px-4' : '',
		resolveFullKeyboardGapClass(type),
		resolveFullKeyboardRowSpacingClass(type)
	]);

// 输入 FullKeyboard 内层行布局状态，返回不带外层行间距的框架无关 class。
// Receive FullKeyboard inner-row layout state and return framework-agnostic classes without outer row spacing.
export const resolveFullKeyboardInnerGridRowClass = ({ type = 'button', columns = 7 }: { type?: string; columns?: 7 | 9 } = {}) =>
	joinClasses(['grid flex-1', columns === 9 ? 'grid-cols-9' : 'grid-cols-7', resolveFullKeyboardGapClass(type)]);

export const resolveFullKeyboardFlexRowClass = (type: string = 'button') =>
	joinClasses(['flex', resolveFullKeyboardGapClass(type), resolveFullKeyboardRowSpacingClass(type)]);

export const resolveFullKeyboardBottomRowClass = (type: string = 'button') => joinClasses(['flex', resolveFullKeyboardGapClass(type)]);

export const resolveFullKeyboardPopupRadius = ({ type = 'button', radius }: { type?: string; radius?: LargeAreaRadius } = {}):
	| LargeAreaRadius
	| undefined => (type === 'block' ? 'none' : radius);

export const resolveFullKeyboardIconClass = (): string => 'fill-current';

export const resolveFullKeyboardSpaceTextClass = (): string => 'text-sm opacity-60';

// 只计算键盘输入后的 value，不处理 visible、禁用和事件。
// Only calculate keyboard value after input without visible, disabled or event handling.
export const resolveFullKeyboardNextValue = ({ value, key, isUpperCase = false }: ResolveFullKeyboardNextValueOptions): string => {
	if (key === 'delete') return value.slice(0, -1);
	if (key === 'done') return value;
	return value + resolveFullKeyboardInputKey(key, isUpperCase);
};

// 输入按键动作状态，返回组件层可执行的框架无关动作结果。
// Resolve key action state into framework-agnostic action results for component state updates.
export const resolveFullKeyboardKeyAction = ({
	value,
	key,
	isUpperCase = false,
	doneDisabled = false
}: ResolveFullKeyboardKeyActionOptions): FullKeyboardKeyAction => {
	if (key === 'delete') {
		return {
			emitKey: 'delete',
			nextValue: resolveFullKeyboardNextValue({ value, key }),
			shouldEmit: true,
			shouldUpdateValue: true,
			shouldClose: false
		};
	}

	if (key === 'done') {
		return {
			emitKey: 'done',
			nextValue: value,
			shouldEmit: !doneDisabled,
			shouldUpdateValue: false,
			shouldClose: !doneDisabled
		};
	}

	const emitKey = resolveFullKeyboardInputKey(key, isUpperCase);
	return {
		emitKey,
		nextValue: value + emitKey,
		shouldEmit: true,
		shouldUpdateValue: true,
		shouldClose: false
	};
};

// 输入按键动作状态，返回值更新、事件键和关闭动作的完整纯流程。
// Receive key action state and return a complete side-effect-free value, emit-key and close flow.
export const resolveFullKeyboardKeyFlow = ({ closeOptions, ...options }: ResolveFullKeyboardKeyFlowOptions): FullKeyboardKeyFlow => {
	const action = resolveFullKeyboardKeyAction(options);
	return {
		...action,
		closeAction: action.shouldClose ? resolveFullKeyboardCloseAction(closeOptions) : null
	};
};

// 输入大小写状态，返回组件层可写入的下一次大小写状态。
// Receive case state and return the next case state for component implementations to apply.
export const resolveFullKeyboardCaseToggleAction = (isUpperCase = false): FullKeyboardCaseToggleAction => ({
	nextUpperCase: !isUpperCase
});

// 输入符号模式状态，返回组件层可写入的下一次符号模式状态。
// Receive symbol-mode state and return the next symbol-mode state for component implementations to apply.
export const resolveFullKeyboardSymbolModeToggleAction = (isSymbolMode = false): FullKeyboardSymbolModeToggleAction => ({
	nextSymbolMode: !isSymbolMode
});

// 输入组件 props 和内部状态快照，返回框架无关的 FullKeyboard 派生入参。
// Receive component props and internal state snapshots, then return framework-agnostic FullKeyboard derivation options.
export const resolveFullKeyboardStateOptions = <TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike>({
	doneDisabled,
	isSymbolMode,
	isUpperCase,
	props,
	value
}: ResolveFullKeyboardStateOptionsParams<TPopup>): ResolveFullKeyboardDerivedOptions<TPopup> => ({
	done: props.done,
	doneClass: props.doneClass,
	doneDisabled,
	isSymbolMode,
	isUpperCase,
	keyClass: props.keyClass,
	mode: props.mode,
	panelClass: props.panelClass,
	popup: props.popup,
	preview: props.preview,
	previewHeight: props.previewHeight,
	previewMask: props.previewMask,
	radius: props.radius,
	type: props.type,
	value
});

// 输入 FullKeyboard 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current FullKeyboard state and return framework-agnostic derived values ready for component binding.
export const resolveFullKeyboardDerived = <TPopup extends FullKeyboardPopupLike = FullKeyboardPopupLike>({
	done = true,
	doneClass = '',
	doneDisabled = false,
	isSymbolMode = false,
	isUpperCase = false,
	keyClass = '',
	mode = 'full',
	panelClass = '',
	popup = null,
	preview = false,
	previewHeight = 44,
	previewMask = false,
	radius = '',
	type = 'button',
	value = ''
}: ResolveFullKeyboardDerivedOptions<TPopup> = {}): FullKeyboardDerived<TPopup> => {
	const keyboardHeight = resolveFullKeyboardHeight({ mode, preview, previewHeight });
	return {
		bottomRowClass: resolveFullKeyboardBottomRowClass(type),
		deleteButtonClass: resolveFullKeyboardFuncButtonClass({ type, radius, keyClass, extraClass: 'w-12' }),
		doneButtonClass: resolveFullKeyboardDoneButtonClass({ type, radius, doneDisabled, doneClass }),
		flex1KeyClass: resolveFullKeyboardKeyButtonClass({ type, radius, keyClass, extraClass: 'flex-1' }),
		flexRowClass: resolveFullKeyboardFlexRowClass(type),
		gridRow10Class: resolveFullKeyboardGridRowClass({ type, columns: 10 }),
		gridRow9PxClass: resolveFullKeyboardGridRowClass({ type, columns: 9, px: true }),
		iconClass: resolveFullKeyboardIconClass(),
		innerGrid7Class: resolveFullKeyboardInnerGridRowClass({ type, columns: 7 }),
		innerGrid9Class: resolveFullKeyboardInnerGridRowClass({ type, columns: 9 }),
		keyButtonClass: resolveFullKeyboardKeyButtonClass({ type, radius, keyClass }),
		keyboardHeight,
		layout: resolveFullKeyboardLayoutState({ done, isSymbolMode, mode }),
		panelClass: resolveFullKeyboardPanelClass({ type, panelClass }),
		popupProps: resolveFullKeyboardPopupProps({ popup, transitionDistance: keyboardHeight, type }),
		previewClass: resolveFullKeyboardPreviewClass(type),
		previewState: resolveKeyboardPreviewState({ value, previewMask }),
		shiftButtonClass: resolveFullKeyboardShiftButtonClass({ type, radius, keyClass, isUpperCase }),
		spaceTextClass: resolveFullKeyboardSpaceTextClass(),
		symbolKeyClass: resolveFullKeyboardKeyButtonClass({ type, radius, keyClass, extraClass: 'w-10' }),
		symbolToggleButtonClass: resolveFullKeyboardFuncButtonClass({ type, radius, keyClass, extraClass: 'w-16 text-base' }),
		symbolToggleText: resolveFullKeyboardSymbolToggleText(isSymbolMode)
	};
};
