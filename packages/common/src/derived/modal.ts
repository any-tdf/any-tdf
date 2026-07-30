import type { ModalProps } from '../types/index.js';
import { textAlignObj } from './common.js';
import { joinClasses } from './helpers.js';

export type ResolveModalPopupOptions = {
	showBtn?: boolean;
};

export type ResolveModalPopupPropsOptions<TPopup extends object = Record<string, never>> = ResolveModalPopupOptions & {
	popup?: TPopup;
};

export type ResolveModalTitleOptions = {
	titleAlign?: ModalProps['titleAlign'];
};

export type ResolveModalContentOptions = {
	showBtn?: boolean;
};

export type ResolveModalContentStateOptions = {
	content?: unknown;
	hasCustomContent?: boolean;
	showBtn?: boolean;
	showIcon?: boolean;
};

export type ModalContentState = {
	showButton: boolean;
	showContentText: boolean;
	showCustomContent: boolean;
	showIcon: boolean;
};

export type ModalPopupDefaults = {
	size: number;
	duration: number;
	outDuration: number;
	maskClosable: boolean;
	position: 'center';
	radiusPosition: 'all';
	radius: 'lg';
	px: '8';
};
export type ModalTexts = {
	btnText: string;
	content: string;
	title: string;
};
export type ResolveModalTextsOptions = {
	btnText?: string;
	content?: string;
	defaults: ModalTexts;
	title?: string;
};

export type ResolveModalDerivedOptions<TPopup extends object = Record<string, never>> = ResolveModalTextsOptions &
	ResolveModalPopupPropsOptions<TPopup> &
	ResolveModalTitleOptions & {
		hasCustomContent?: boolean;
		showIcon?: boolean;
	};

export type ModalStatePropsLike<TPopup extends object = Record<string, never>> = Partial<
	Omit<ResolveModalDerivedOptions<TPopup>, 'defaults' | 'hasCustomContent'>
>;

export type ResolveModalStateOptionsParams<TPopup extends object = Record<string, never>> = {
	defaults: ModalTexts;
	hasCustomContent?: boolean;
	props: ModalStatePropsLike<TPopup>;
};

export type ModalCloseAction = {
	nextVisible: false;
	shouldClose: true;
};

export type ModalConfirmAction = {
	nextVisible: false;
	shouldClose: true;
	shouldConfirm: true;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveModalInitialVisible = (visible?: boolean): boolean => Boolean(visible);

// 输入外部文案和语言默认值，返回框架无关的展示文案。
// Resolve external copy and locale defaults into framework-agnostic display texts.
export const resolveModalTexts = ({ title, content, btnText, defaults }: ResolveModalTextsOptions): ModalTexts => ({
	title: title ?? defaults.title,
	content: content ?? defaults.content,
	btnText: btnText ?? defaults.btnText
});

// 输入 Modal 当前状态，返回框架无关的弹层默认参数。
// Consume current Modal state and return framework-agnostic popup defaults.
export const resolveModalPopupDefaults = ({ showBtn = true }: ResolveModalPopupOptions = {}): ModalPopupDefaults => ({
	size: 0,
	duration: 300,
	outDuration: 150,
	maskClosable: !showBtn,
	position: 'center',
	radiusPosition: 'all',
	radius: 'lg',
	px: '8'
});

// 输入 Modal 默认状态和外部 Popup 参数，返回框架无关的最终 Popup 参数。
// Resolve Modal defaults and external Popup props into framework-agnostic final Popup props.
export const resolveModalPopupProps = <TPopup extends object = Record<string, never>>(
	options: ResolveModalPopupPropsOptions<TPopup> = {}
): ModalPopupDefaults & TPopup => ({
	...resolveModalPopupDefaults(options),
	...((options.popup ?? {}) as TPopup)
});

// 输入关闭动作，返回组件层可消费的可见状态和回调决策。
// Resolve a close action into visibility and callback decisions for component usage.
export const resolveModalCloseAction = (): ModalCloseAction => ({
	nextVisible: false,
	shouldClose: true
});

// 输入确认按钮动作，返回组件层可消费的确认与关闭决策。
// Resolve a confirm button action into confirm and close decisions for component usage.
export const resolveModalConfirmAction = (): ModalConfirmAction => ({
	nextVisible: false,
	shouldClose: true,
	shouldConfirm: true
});

export const resolveModalContentClass = ({ showBtn = true }: ResolveModalContentOptions = {}) =>
	joinClasses(['px-4 pt-4 space-y-4 text-center', showBtn ? 'pb-2' : 'pb-4']);

export const resolveModalTitleClass = ({ titleAlign = 'center' }: ResolveModalTitleOptions = {}) =>
	joinClasses(['font-bold', textAlignObj[titleAlign] || textAlignObj.center]);

// 输入 Modal 内容状态，返回框架无关的展示分支。
// Resolve Modal content state into framework-agnostic display branches.
export const resolveModalContentState = ({
	content = '',
	hasCustomContent = false,
	showBtn = true,
	showIcon = false
}: ResolveModalContentStateOptions = {}): ModalContentState => ({
	showButton: Boolean(showBtn),
	showContentText: !hasCustomContent && Boolean(content),
	showCustomContent: hasCustomContent,
	showIcon: Boolean(showIcon)
});

// 输入组件 props、默认文案和内容插槽状态，返回框架无关的 Modal 派生入参。
// Receive component props, default text and content slot state, then return framework-agnostic Modal derivation options.
export const resolveModalStateOptions = <TPopup extends object = Record<string, never>>({
	defaults,
	hasCustomContent,
	props
}: ResolveModalStateOptionsParams<TPopup>): ResolveModalDerivedOptions<TPopup> => ({
	btnText: props.btnText,
	content: props.content,
	defaults,
	hasCustomContent,
	popup: props.popup,
	showBtn: props.showBtn,
	showIcon: props.showIcon,
	title: props.title,
	titleAlign: props.titleAlign
});

// 输入 Modal 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Modal state and return framework-agnostic derived values ready for component binding.
export const resolveModalDerived = <TPopup extends object = Record<string, never>>(options: ResolveModalDerivedOptions<TPopup>) => {
	const texts = resolveModalTexts(options);

	return {
		texts,
		popupProps: resolveModalPopupProps(options),
		contentClass: resolveModalContentClass(options),
		titleClass: resolveModalTitleClass(options),
		contentState: resolveModalContentState({
			content: texts.content,
			hasCustomContent: options.hasCustomContent,
			showBtn: options.showBtn,
			showIcon: options.showIcon
		})
	};
};
