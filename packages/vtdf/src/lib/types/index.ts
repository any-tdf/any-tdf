import type { Component, VNode } from 'vue';
import type { BlurParams, FadeParams, FlyParams, ScaleParams, SlideParams } from '@any-tdf/vue-motion/transition';
import type {
	ActionSheetProps as CommonActionSheetProps,
	AlertProps as CommonAlertProps,
	AnimationEasingProps as CommonAnimationEasingProps,
	AsyncPickerProps as CommonAsyncPickerProps,
	BatchActionProps,
	BottomSheetProps as CommonBottomSheetProps,
	ButtonGroupItemProps,
	ButtonGroupProps as CommonButtonGroupProps,
	ButtonProps,
	CalendarProps as CommonCalendarProps,
	CardProps,
	ColorPickerProps as CommonColorPickerProps,
	DialogProps as CommonDialogProps,
	FullKeyboardProps as CommonFullKeyboardProps,
	InfiniteScrollProps as CommonInfiniteScrollProps,
	ListProps as CommonListProps,
	MaskProps,
	ModalProps as CommonModalProps,
	NumKeyboardProps as CommonNumKeyboardProps,
	PickerProps as CommonPickerProps,
	PopupProps as CommonPopupProps,
	PullRefreshProps as CommonPullRefreshProps,
	SignatureProps as CommonSignatureProps,
	SwipeActionProps,
	TabProps,
	TabsProps as CommonTabsProps,
	TimePickerProps as CommonTimePickerProps,
	ToastProps as CommonToastProps
} from '@any-tdf/common/types';

export type * from '@any-tdf/common/types';
export type VueNode = VNode | string | number | boolean | null | undefined;
export type VueComponentLike = Component | VueNode;
export type TransitionParams = Partial<BlurParams & FadeParams & FlyParams & ScaleParams & SlideParams>;
export type VTDFEasingProps = CommonAnimationEasingProps;

export type ActionSheetProps = Omit<CommonActionSheetProps, 'popup'> & { popup?: PopupProps };
export type AsyncPickerProps = Omit<CommonAsyncPickerProps, 'popup'> & {
	popup?: PopupProps | null;
};
export type AlertProps = Omit<CommonAlertProps, 'card'> & { card?: CardProps };
export type BottomSheetProps = Omit<CommonBottomSheetProps, 'mask'> & { mask?: MaskProps };
export type ButtonGroupProps = Omit<CommonButtonGroupProps, 'items'> & {
	items?: ButtonGroupItemProps[];
};
export type CalendarProps = Omit<CommonCalendarProps, 'popup' | 'button' | 'card'> & {
	popup?: PopupProps | null;
	button?: ButtonProps;
	card?: CardProps;
};
export type ColorPickerProps = Omit<CommonColorPickerProps, 'popup' | 'tab'> & {
	popup?: PopupProps | null;
	tab?: TabProps;
};
export type DialogProps = Omit<CommonDialogProps, 'popup' | 'primaryButton' | 'secondaryButton'> & {
	popup?: PopupProps;
	primaryButton?: ButtonProps;
	secondaryButton?: ButtonProps;
};
export type FullKeyboardProps = Omit<CommonFullKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
};
export type PullRefreshProps = Omit<
	CommonPullRefreshProps,
	'children' | 'normalChild' | 'pullingChild' | 'canReleaseChild' | 'refreshingChild' | 'successChild' | 'onrefresh' | 'onchange'
>;
export type InfiniteScrollProps = Omit<CommonInfiniteScrollProps, 'children' | 'loadingChild' | 'finishedChild' | 'errorChild' | 'onload'>;
export type ListProps<T = Record<string, unknown>> = Omit<CommonListProps<T>, 'batchActions' | 'swipeActions'> & {
	batchActions?: BatchActionProps[];
	swipeActions?: SwipeActionProps[];
};
export type ModalProps = Omit<CommonModalProps, 'popup' | 'button'> & {
	popup?: PopupProps;
	button?: ButtonProps;
};
export type NumKeyboardProps = Omit<CommonNumKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
};
export type PickerProps = Omit<CommonPickerProps, 'popup'> & { popup?: PopupProps | null };
export type PopupProps = Omit<CommonPopupProps, 'mask'> & { mask?: MaskProps };
export type ScrollRadioProps = {
	data?: Record<string, string>[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	labelKey?: string;
	autoScrollToLast?: boolean;
	useAnimation?: boolean;
	lastSelectedIndex?: number;
	align?: 'center' | 'left' | 'right';
	injClass?: string;
};
export type SignatureProps = Omit<CommonSignatureProps, 'clearButton' | 'confirmButton'> & {
	clearButton?: ButtonProps;
	confirmButton?: ButtonProps;
};
export type TabsProps = Omit<CommonTabsProps, 'tab'> & { tab?: TabProps };
export type TimePickerProps = Omit<CommonTimePickerProps, 'popup'> & { popup?: PopupProps | null };
export type ToastProps = Omit<CommonToastProps, 'mask'> & { mask?: MaskProps };
export type ToastFnOptions = Omit<ToastProps, 'visible' | 'children'>;
export type AlertFnOptions = Omit<AlertProps, 'visible' | 'children'>;
export type DialogFnOptions = Omit<DialogProps, 'visible' | 'contentChild' | 'primaryChild'>;
export type ModalFnOptions = Omit<ModalProps, 'visible' | 'contentChild'>;
