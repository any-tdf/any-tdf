import { textAlignObj, textAlignSpaceObj } from './common.js';
import { joinClasses } from './helpers.js';

export const dialogBtnGapClass = {
	'0': '',
	'1': ' gap-1',
	'2': ' gap-2',
	'4': ' gap-4',
	'8': ' gap-8',
	'12': ' gap-12',
	'16': ' gap-16'
} as const;

export type DialogTitleAlign = keyof typeof textAlignObj | string;
export type DialogBtnGap = keyof typeof dialogBtnGapClass | string;
export type DialogBtnStyle = 'button' | 'text' | 'textLine';
export type DialogButtonType = 'primary' | 'secondary';
export type DialogButtonDerived = {
	fill: 'base' | 'colorLight' | 'text' | 'textState';
	heightIn: '2' | '3';
	injClass: string;
};
export type DialogTexts = {
	content: string;
	primaryText: string;
	secondaryText: string;
	title: string;
};
export type ResolveDialogTextsOptions = {
	content?: string;
	defaults: DialogTexts;
	primaryText?: string;
	secondaryText?: string;
	title?: string;
};
export type ResolveDialogContentStateOptions = {
	content?: unknown;
	hasCustomContent?: boolean;
	hasPrimaryCustomContent?: boolean;
	showIcon?: boolean;
};
export type DialogContentState = {
	showContentText: boolean;
	showCustomContent: boolean;
	showIcon: boolean;
	showPrimaryCustomContent: boolean;
};
export type DialogPopupDefaults = {
	duration: number;
	maskClosable: boolean;
	outDuration: number;
	position: 'center';
	px: '4';
	radius: 'lg';
	radiusPosition: 'all';
	size: number;
};

export type ResolveDialogPopupPropsOptions<TPopup extends object = Record<string, never>> = {
	popup?: TPopup;
};

export type ResolveDialogDerivedOptions<TPopup extends object = Record<string, never>> = ResolveDialogTextsOptions &
	ResolveDialogPopupPropsOptions<TPopup> &
	ResolveDialogContentStateOptions & {
		btnGap?: DialogBtnGap;
		btnRatio?: readonly [string | number, string | number];
		btnReverse?: boolean;
		btnStyle?: DialogBtnStyle;
		titleAlign?: DialogTitleAlign;
	};
export type DialogStatePropsLike<TPopup extends object = Record<string, never>> = Partial<
	Omit<ResolveDialogDerivedOptions<TPopup>, 'defaults' | 'hasCustomContent' | 'hasPrimaryCustomContent'>
>;
export type ResolveDialogStateOptionsParams<TPopup extends object = Record<string, never>> = {
	defaults: DialogTexts;
	hasCustomContent?: boolean;
	hasPrimaryCustomContent?: boolean;
	props: DialogStatePropsLike<TPopup>;
};

export type DialogButtonFlexStyleValue = {
	flex: string | number;
};

export type DialogCloseAction = {
	nextVisible: false;
	shouldClose: true;
};

export type ResolveDialogSecondaryActionOptions = {
	secondaryClose?: boolean;
};

export type DialogSecondaryAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldSecondary: true;
};

export type DialogSecondaryFlow = DialogSecondaryAction & {
	closeAction: DialogCloseAction | null;
};

export type DialogPrimaryAction = {
	shouldClose: false;
	shouldPrimary: true;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveDialogInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入外部文案和语言默认值，返回框架无关的展示文案。
// Resolve external copy and locale defaults into framework-agnostic display texts.
export const resolveDialogTexts = ({ title, content, primaryText, secondaryText, defaults }: ResolveDialogTextsOptions): DialogTexts => ({
	title: title ?? defaults.title,
	content: content ?? defaults.content,
	primaryText: primaryText ?? defaults.primaryText,
	secondaryText: secondaryText ?? defaults.secondaryText
});

// 输入 Dialog 状态，返回框架无关的 Popup 默认参数。
// Resolve Dialog state into framework-agnostic Popup default props.
export const resolveDialogPopupDefaults = (): DialogPopupDefaults => ({
	size: 0,
	maskClosable: false,
	duration: 300,
	outDuration: 150,
	position: 'center',
	radiusPosition: 'all',
	radius: 'lg',
	px: '4'
});

// 输入 Dialog 外部 Popup 参数，返回框架无关的最终 Popup 参数。
// Resolve external Dialog Popup props into framework-agnostic final Popup props.
export const resolveDialogPopupProps = <TPopup extends object = Record<string, never>>(
	options: ResolveDialogPopupPropsOptions<TPopup> = {}
): DialogPopupDefaults & TPopup => ({
	...resolveDialogPopupDefaults(),
	...((options.popup ?? {}) as TPopup)
});

// 输入次要按钮配置，返回是否执行关闭分支。
// Resolve secondary button config into whether the close branch should run.
export const resolveDialogSecondaryShouldClose = (secondaryClose = true): boolean => Boolean(secondaryClose);

// 输入关闭动作，返回组件层可消费的可见状态和回调决策。
// Resolve a close action into visibility and callback decisions for component usage.
export const resolveDialogCloseAction = (): DialogCloseAction => ({
	nextVisible: false,
	shouldClose: true
});

// 输入次要按钮配置，返回框架无关的点击动作结果。
// Consume secondary button config and return a framework-agnostic click action result.
export const resolveDialogSecondaryAction = ({
	secondaryClose = true
}: ResolveDialogSecondaryActionOptions = {}): DialogSecondaryAction => ({
	nextVisible: false,
	shouldClose: resolveDialogSecondaryShouldClose(secondaryClose),
	shouldSecondary: true
});

// 输入次要按钮配置，返回次要按钮动作和可选关闭动作，不执行事件回调。
// Receive secondary-button config and return the secondary action plus optional close action without executing callbacks.
export const resolveDialogSecondaryFlow = (options: ResolveDialogSecondaryActionOptions = {}): DialogSecondaryFlow => {
	const action = resolveDialogSecondaryAction(options);
	return {
		...action,
		closeAction: action.shouldClose ? resolveDialogCloseAction() : null
	};
};

// 输入主要按钮动作，返回框架无关的点击动作结果。
// Resolve primary button action into a framework-agnostic click action result.
export const resolveDialogPrimaryAction = (): DialogPrimaryAction => ({
	shouldClose: false,
	shouldPrimary: true
});

// 输入 Dialog 组件状态，返回框架无关的 class 字符串。
// Convert Dialog component state into framework-agnostic class strings.
export const resolveDialogTitleAlignClass = (titleAlign: DialogTitleAlign = 'center') =>
	textAlignObj[titleAlign as keyof typeof textAlignObj] || textAlignObj.center;

export const resolveDialogTitleAlignSpaceClass = (titleAlign: DialogTitleAlign = 'center') =>
	textAlignSpaceObj[titleAlign as keyof typeof textAlignSpaceObj] || textAlignSpaceObj.center;

// 输入 Dialog 标题对齐状态，返回框架无关的完整标题 class。
// Resolve Dialog title alignment into complete framework-agnostic title classes.
export const resolveDialogTitleClass = (titleAlign: DialogTitleAlign = 'center') =>
	joinClasses(['font-bold', resolveDialogTitleAlignClass(titleAlign)]);

export const resolveDialogButtonGapClass = (btnGap: DialogBtnGap = '2') =>
	dialogBtnGapClass[btnGap as keyof typeof dialogBtnGapClass] || dialogBtnGapClass['2'];

export const resolveDialogPanelClass = (btnStyle = 'button') =>
	joinClasses(['px-4 pt-4 space-y-4 text-center', btnStyle === 'button' ? 'pb-2' : '']);

export const resolveDialogButtonRowClass = ({
	btnGap = '2',
	btnReverse = false,
	btnStyle = 'button'
}: { btnGap?: DialogBtnGap; btnReverse?: boolean; btnStyle?: string } = {}) =>
	joinClasses([
		'flex w-full',
		resolveDialogButtonGapClass(btnGap),
		btnReverse ? 'flex-row-reverse' : '',
		btnStyle === 'textLine' ? 'border-t border-black/10 dark:border-white/10' : ''
	]);

export const resolveDialogButtonSideClass = ({
	btnStyle = 'button',
	btnReverse = false,
	side = 'secondary'
}: { btnStyle?: string; btnReverse?: boolean; side?: 'primary' | 'secondary' } = {}) => {
	if (btnStyle !== 'textLine') return '';
	return side === 'secondary' && !btnReverse
		? 'border-r border-black/10 dark:border-white/10'
		: side === 'primary' && btnReverse
			? 'border-r border-black/10 dark:border-white/10'
			: '';
};

// 输入 Dialog 按钮占比，返回组件层可直接绑定的 flex 样式。
// Convert Dialog button ratio into bind-ready flex styles for the component layer.
export const resolveDialogButtonFlexStyleValue = (ratio: string | number = 1): DialogButtonFlexStyleValue => ({
	flex: ratio
});

export const resolveDialogButtonFlexStyleString = (ratio: string | number = 1) => `flex:${ratio}`;

export const resolveDialogButtonFill = ({
	btnStyle = 'button',
	type
}: {
	btnStyle?: DialogBtnStyle;
	type: DialogButtonType;
}): DialogButtonDerived['fill'] => {
	if (btnStyle === 'button') return type === 'primary' ? 'base' : 'colorLight';
	return type === 'primary' ? 'textState' : 'text';
};

export const resolveDialogButtonHeightIn = (btnStyle: DialogBtnStyle = 'button'): DialogButtonDerived['heightIn'] =>
	btnStyle === 'button' ? '3' : '2';

export const resolveDialogButtonInjClass = (btnStyle: DialogBtnStyle = 'button'): string => (btnStyle === 'button' ? '' : 'font-bold');

// 输入 Dialog 按钮样式状态，返回框架无关的按钮 props 派生。
// Resolve Dialog button style state into framework-agnostic button prop derivations.
export const resolveDialogButtonDerived = ({
	btnStyle = 'button',
	type
}: {
	btnStyle?: DialogBtnStyle;
	type: DialogButtonType;
}): DialogButtonDerived => ({
	fill: resolveDialogButtonFill({ btnStyle, type }),
	heightIn: resolveDialogButtonHeightIn(btnStyle),
	injClass: resolveDialogButtonInjClass(btnStyle)
});

// 输入 Dialog 内容状态，返回框架无关的展示分支。
// Resolve Dialog content state into framework-agnostic display branches.
export const resolveDialogContentState = ({
	content = '',
	hasCustomContent = false,
	hasPrimaryCustomContent = false,
	showIcon = false
}: ResolveDialogContentStateOptions = {}): DialogContentState => ({
	showContentText: !hasCustomContent && Boolean(content),
	showCustomContent: hasCustomContent,
	showIcon: Boolean(showIcon),
	showPrimaryCustomContent: hasPrimaryCustomContent
});

// 输入组件 props、默认文案和内容状态，返回框架无关的 Dialog 派生入参。
// Receive component props, default texts and content state, then return framework-agnostic Dialog derivation options.
export const resolveDialogStateOptions = <TPopup extends object = Record<string, never>>({
	defaults,
	hasCustomContent,
	hasPrimaryCustomContent,
	props
}: ResolveDialogStateOptionsParams<TPopup>): ResolveDialogDerivedOptions<TPopup> => ({
	btnGap: props.btnGap,
	btnRatio: props.btnRatio,
	btnReverse: props.btnReverse,
	btnStyle: props.btnStyle,
	content: props.content,
	defaults,
	hasCustomContent,
	hasPrimaryCustomContent,
	popup: props.popup,
	primaryText: props.primaryText,
	secondaryText: props.secondaryText,
	showIcon: props.showIcon,
	title: props.title,
	titleAlign: props.titleAlign
});

// 输入 Dialog 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Dialog state and return framework-agnostic derived values ready for component binding.
export const resolveDialogDerived = <TPopup extends object = Record<string, never>>({
	btnGap = '2',
	btnRatio = [1, 1],
	btnReverse = false,
	btnStyle = 'button',
	titleAlign = 'center',
	...options
}: ResolveDialogDerivedOptions<TPopup>) => {
	const texts = resolveDialogTexts(options);

	return {
		texts,
		popupProps: resolveDialogPopupProps(options),
		panelClass: resolveDialogPanelClass(btnStyle),
		titleClass: resolveDialogTitleClass(titleAlign),
		buttonRowClass: resolveDialogButtonRowClass({ btnGap, btnReverse, btnStyle }),
		secondarySideClass: resolveDialogButtonSideClass({ btnStyle, btnReverse, side: 'secondary' }),
		primarySideClass: resolveDialogButtonSideClass({ btnStyle, btnReverse, side: 'primary' }),
		secondarySideStyleValue: resolveDialogButtonFlexStyleValue(btnRatio[1]),
		secondarySideStyleString: resolveDialogButtonFlexStyleString(btnRatio[1]),
		primarySideStyleValue: resolveDialogButtonFlexStyleValue(btnRatio[0]),
		primarySideStyleString: resolveDialogButtonFlexStyleString(btnRatio[0]),
		secondaryButtonState: resolveDialogButtonDerived({ btnStyle, type: 'secondary' }),
		primaryButtonState: resolveDialogButtonDerived({ btnStyle, type: 'primary' }),
		contentState: resolveDialogContentState({
			content: texts.content,
			hasCustomContent: options.hasCustomContent,
			hasPrimaryCustomContent: options.hasPrimaryCustomContent,
			showIcon: options.showIcon
		})
	};
};
