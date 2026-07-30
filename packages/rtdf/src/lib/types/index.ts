import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';
import type { BlurParams, FadeParams, FlyParams, ScaleParams, SlideParams } from '@any-tdf/react-motion/transition';
import type {
	AnimationEasingProps,
	TimeData,
	ActionProps as CommonActionProps,
	ActionSheetProps as CommonActionSheetProps,
	RingActionProps as CommonRingActionProps,
	ActionPopoverProps as CommonActionPopoverProps,
	AccordionItemProps as CommonAccordionItemProps,
	AccordionProps as CommonAccordionProps,
	AlertProps as CommonAlertProps,
	TagProps as CommonTagProps,
	CardProps as CommonCardProps,
	TooltipProps as CommonTooltipProps,
	CountDownProps as CommonCountDownProps,
	CharRollProps as CommonCharRollProps,
	CodeInputProps as CommonCodeInputProps,
	FullKeyboardProps as CommonFullKeyboardProps,
	SignatureResult,
	SignatureProps as CommonSignatureProps,
	SwipeActionProps as CommonSwipeActionProps,
	BatchActionProps as CommonBatchActionProps,
	ListProps as CommonListProps,
	ColorPickerProps as CommonColorPickerProps,
	ImagePreviewItemProps,
	ImagePreviewProps as CommonImagePreviewProps,
	ImageListItemProps,
	ImageListProps as CommonImageListProps,
	AsyncPickerProps as CommonAsyncPickerProps,
	AvatarProps as CommonAvatarProps,
	AvatarGroupProps as CommonAvatarGroupProps,
	BadgeProps as CommonBadgeProps,
	BottomSheetProps as CommonBottomSheetProps,
	ButtonProps as CommonButtonProps,
	ButtonGroupItemProps as CommonButtonGroupItemProps,
	ButtonGroupProps as CommonButtonGroupProps,
	CalendarProps as CommonCalendarProps,
	CellRightProps as CommonCellRightProps,
	CellProps as CommonCellProps,
	CellGroupProps as CommonCellGroupProps,
	CheckboxItemProps as CommonCheckboxItemProps,
	CheckboxProps as CommonCheckboxProps,
	DialogProps as CommonDialogProps,
	GridProps as CommonGridProps,
	GridsProps as CommonGridsProps,
	IconProps as CommonIconProps,
	IndexBarItemProps,
	IndexBarProps as CommonIndexBarProps,
	InputProps as CommonInputProps,
	LoadingProps,
	PullRefreshChangeDetail as CommonPullRefreshChangeDetail,
	PullRefreshProps as CommonPullRefreshProps,
	InfiniteScrollProps as CommonInfiniteScrollProps,
	MaskProps as CommonMaskProps,
	ModalProps as CommonModalProps,
	NavBarProps as CommonNavBarProps,
	NoticeBarProps as CommonNoticeBarProps,
	NumKeyboardKey,
	NumKeyboardProps as CommonNumKeyboardProps,
	PaginationProps as CommonPaginationProps,
	PickerDataChildProps,
	PickerDatasProps,
	PickerMultipleItem,
	PickerProps as CommonPickerProps,
	PlaceholderProps as CommonPlaceholderProps,
	PopupProps as CommonPopupProps,
	ProgressProps as CommonProgressProps,
	ProgressLoopProps as CommonProgressLoopProps,
	RadioItemProps as CommonRadioItemProps,
	RadioProps as CommonRadioProps,
	RateProps as CommonRateProps,
	SkeletonProps as CommonSkeletonProps,
	SliderProps as CommonSliderProps,
	StepperProps as CommonStepperProps,
	StepsStepBarIconProps as CommonStepsStepBarIconProps,
	StepsStepBarImageProps,
	StepsStepBarStringProps,
	StepsStepProps as CommonStepsStepProps,
	StepsFinishStepProps as CommonStepsFinishStepProps,
	StepsItemProps as CommonStepsItemProps,
	StepsProps as CommonStepsProps,
	SwiperImgProps,
	SwiperComponentProps as CommonSwiperComponentProps,
	SwiperProps as CommonSwiperProps,
	SwitchProps as CommonSwitchProps,
	TabBarLabelProps as CommonTabBarLabelProps,
	TabBarProps as CommonTabBarProps,
	TabContentProps as CommonTabContentProps,
	TabLabelProps as CommonTabLabelProps,
	TabProps as CommonTabProps,
	TabsProps as CommonTabsProps,
	TimePickerObjProps,
	TimePickerProps as CommonTimePickerProps,
	ToastProps as CommonToastProps
} from '@any-tdf/common/types';

export type {
	AnimationEasingProps,
	LargeAreaRadius,
	SmallAreaRadius,
	TimeData,
	CharRollPreset,
	SignatureRotation,
	SignatureResult,
	ListTransition,
	SwipeActionBgColor,
	SwipeHintMode,
	OklchColor,
	ColorPickerMode,
	ColorPickerValue,
	ImagePreviewClosePosition,
	ImageListStatus,
	DialogResult,
	ModalResult,
	NumKeyboardKey,
	ImagePreviewItemProps,
	ImageListItemProps,
	InfoDateProps,
	DividerProps,
	IndexBarItemProps,
	LoadingProps,
	PickerDataChildProps,
	PickerDatasProps,
	PickerMultipleItem,
	StepsStepBarImageProps,
	StepsStepBarStringProps,
	SwiperImgProps,
	TimePickerItemProps,
	TimePickerObjProps,
	TimePickerTypeProps,
	PullRefreshStatus,
	PullRefreshChangeDetail,
	InfiniteScrollDirection
} from '@any-tdf/common/types';

export type EasingProps = AnimationEasingProps;
export type RTDFEasingProps = EasingProps;
export type TransitionParams = Partial<BlurParams & FadeParams & FlyParams & ScaleParams & SlideParams>;

export type ActionProps = Omit<CommonActionProps, 'icon'> & {
	icon?: IconProps | null;
};

export type ActionSheetProps = Omit<CommonActionSheetProps, 'actions' | 'popup'> & {
	actions?: ActionProps[];
	popup?: PopupProps;
	onCancel?: () => void;
	onClickAction?: (index: number, action: ActionProps) => void;
	onClose?: () => void;
};

export type RingActionProps = Omit<CommonRingActionProps, 'icon'> & {
	icon: IconProps;
};

export type ActionPopoverProps = Omit<CommonActionPopoverProps, 'actions' | 'ringActions' | 'triggerRef'> & {
	actions?: ActionProps[];
	triggerRef?: HTMLElement | RefObject<HTMLElement | null> | null;
	ringActions?: RingActionProps[];
	onCancel?: () => void;
	onClickAction?: (index: number, action: ActionProps | RingActionProps) => void;
	onClose?: () => void;
};

export type AccordionItemProps = Omit<CommonAccordionItemProps, 'icon'> & {
	icon?: IconProps;
};

export type AccordionProps = Omit<CommonAccordionProps, 'items' | 'children'> & {
	items?: AccordionItemProps[];
	children?: ((item: AccordionItemProps, index: number) => ReactNode) | ReactNode;
	onChange?: (index: number | number[] | undefined) => void;
};

export type AlertProps = Omit<CommonAlertProps, 'icon' | 'card' | 'transitionParams' | 'children'> & {
	icon?: IconProps;
	card?: CardProps;
	transitionParams?: TransitionParams;
	children?: ReactNode | (() => ReactNode);
	onClose?: () => void;
};

export type TagProps = Omit<CommonTagProps, 'children'> & {
	children?: ReactNode;
	onClick?: () => void;
	onClose?: () => void;
};

export type CardProps = Omit<CommonCardProps, 'header' | 'children' | 'footer'> & {
	header?: ReactNode | (() => ReactNode);
	children?: ReactNode;
	footer?: ReactNode | (() => ReactNode);
	onClick?: () => void;
};

export type TooltipProps = Omit<CommonTooltipProps, 'children' | 'contentSnippet'> & {
	children?: ReactNode;
	contentSnippet?: () => ReactNode;
	onShow?: () => void;
	onHide?: () => void;
};

export type CountDownProps = Omit<CommonCountDownProps, 'children'> & {
	children?: ((data: TimeData) => ReactNode) | ReactNode;
	onFinish?: () => void;
	onChange?: (timeData: TimeData) => void;
};

export type CharRollProps = Omit<CommonCharRollProps, 'children'> & {
	children?: ((char: string, index: number) => ReactNode) | ReactNode;
	onStart?: () => void;
	onComplete?: () => void;
	onChange?: (value: string) => void;
};

export type CodeInputProps = CommonCodeInputProps & {
	onChange?: (value: string) => void;
	onFinish?: (value: string) => void;
	onClose?: () => void;
	onFocus?: () => void;
	onFocusedChange?: (focused: boolean) => void;
};

export type FullKeyboardProps = Omit<CommonFullKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
	onClick?: (key: string) => void;
	onOpen?: (height: number) => void;
	onClose?: () => void;
};

export type SignatureProps = Omit<CommonSignatureProps, 'clearButton' | 'confirmButton'> & {
	clearButton?: ButtonProps;
	confirmButton?: ButtonProps;
	onClear?: () => void;
	onConfirm?: (result: SignatureResult) => void;
	onDrawStart?: () => void;
	onDrawEnd?: () => void;
};

export type SwipeActionProps = CommonSwipeActionProps & {
	onClick?: () => void;
};

export type BatchActionProps = CommonBatchActionProps & {
	onClick?: (selected: (string | number)[]) => void;
};

export type ListProps<T extends Record<string, unknown>> = Omit<
	CommonListProps<T>,
	'data' | 'headerChild' | 'footerChild' | 'swipeActions' | 'batchActions'
> & {
	data?: T[];
	headerChild?: () => ReactNode;
	footerChild?: () => ReactNode;
	swipeActions?: SwipeActionProps[];
	batchActions?: BatchActionProps[];
	itemChild: (item: T, index: number) => ReactNode;
	onBatchModeChange?: (batchMode: boolean) => void;
	onBatchChange?: (selected: (string | number)[]) => void;
	onClickItem?: (item: T, index: number) => void;
	onSwipeAction?: (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => void;
};

export type PullRefreshProps = Omit<
	CommonPullRefreshProps,
	| 'children'
	| 'normalChild'
	| 'pullingChild'
	| 'canReleaseChild'
	| 'refreshingChild'
	| 'successChild'
	| 'scrollTarget'
	| 'onrefresh'
	| 'onchange'
> & {
	children?: ReactNode;
	normalChild?: (detail: CommonPullRefreshChangeDetail) => ReactNode;
	pullingChild?: (detail: CommonPullRefreshChangeDetail) => ReactNode;
	canReleaseChild?: (detail: CommonPullRefreshChangeDetail) => ReactNode;
	refreshingChild?: (detail: CommonPullRefreshChangeDetail) => ReactNode;
	successChild?: (detail: CommonPullRefreshChangeDetail) => ReactNode;
	scrollTarget?: HTMLElement | RefObject<HTMLElement | null> | string | null;
	onRefresh?: () => void;
	onrefresh?: () => void;
	onChange?: (detail: CommonPullRefreshChangeDetail) => void;
	onchange?: (detail: CommonPullRefreshChangeDetail) => void;
};

export type InfiniteScrollRef = {
	check: () => void;
};

export type InfiniteScrollProps = Omit<
	CommonInfiniteScrollProps,
	'children' | 'loadingChild' | 'finishedChild' | 'errorChild' | 'scrollTarget' | 'onload'
> & {
	children?: ReactNode;
	loadingChild?: ReactNode;
	finishedChild?: ReactNode;
	errorChild?: ReactNode;
	scrollTarget?: HTMLElement | RefObject<HTMLElement | null> | string | null;
	onLoad?: (isRetry: boolean) => void;
	onload?: (isRetry: boolean) => void;
};

export type ColorPickerProps = Omit<CommonColorPickerProps, 'popup' | 'tab'> & {
	popup?: PopupProps | null;
	tab?: TabProps;
	onChange?: (colors: string[]) => void;
	onClose?: (colors: string[]) => void;
	onCopy?: (text: string) => void;
};

export type ImagePreviewProps = Omit<
	CommonImagePreviewProps,
	'mask' | 'icon' | 'rotationIcon' | 'children' | 'loadingChild' | 'errorChild' | 'indexChild'
> & {
	mask?: MaskProps;
	icon?: IconProps;
	rotationIcon?: IconProps;
	children?: ((item: ImagePreviewItemProps, index: number) => ReactNode) | ReactNode;
	loadingChild?: () => ReactNode;
	errorChild?: () => ReactNode;
	indexChild?: (current: number, total: number) => ReactNode;
	onChange?: (index: number) => void;
	onClose?: () => void;
	onScale?: (scale: number) => void;
	onRotate?: (rotation: 0 | 90 | 180 | 270) => void;
};

export type ImageListProps = Omit<CommonImageListProps, 'icon' | 'deleteIcon' | 'uploadChild' | 'itemChild' | 'statusChild'> & {
	icon?: IconProps;
	deleteIcon?: IconProps;
	uploadChild?: () => ReactNode;
	itemChild?: (item: ImageListItemProps, index: number) => ReactNode;
	statusChild?: (item: ImageListItemProps) => ReactNode;
	onAdd?: (files: File[]) => void;
	onDelete?: (item: ImageListItemProps, index: number) => void;
	onRetry?: (item: ImageListItemProps, index: number) => void;
	onPreview?: (item: ImageListItemProps, index: number) => void;
	onExceed?: (files: File[], max: number) => void;
	onOversized?: (file: File, maxSize: number) => void;
	onClickUpload?: () => void;
};

export type AsyncPickerProps = Omit<CommonAsyncPickerProps, 'popup' | 'loading'> & {
	popup?: PopupProps | null;
	loading?: LoadingProps;
	onCancel?: () => void;
	onPrev?: () => void;
	onConfirm?: (items: Record<string, unknown>[], indexs: number[]) => void;
	onNext?: (index: number) => void;
	onClose?: () => void;
};

export type AvatarProps = Omit<CommonAvatarProps, 'icon'> & {
	icon?: IconProps;
	onClick?: () => void;
};

export type AvatarGroupProps = Omit<CommonAvatarGroupProps, 'data' | 'top'> & {
	data?: AvatarProps[];
	top?: 'totle' | 'add' | null | Exclude<ReactNode, string> | (() => ReactNode);
	onClick?: () => void;
};

export type BadgeProps = Omit<CommonBadgeProps, 'children'> & {
	children?: ReactNode;
};

export type BottomSheetProps = Omit<CommonBottomSheetProps, 'mask' | 'children'> & {
	mask?: MaskProps;
	children?: ReactNode;
	onHeightChange?: (height: number) => void;
	onClickMask?: () => void;
	onClose?: () => void;
	onBack?: () => void;
};

export type ButtonProps = Omit<CommonButtonProps, 'icon' | 'children'> & {
	icon?: IconProps | null;
	children?: ReactNode;
	onClick?: (e?: ReactMouseEvent<HTMLButtonElement>) => void;
};

export type ButtonGroupItemProps = Omit<CommonButtonGroupItemProps, 'icon'> & {
	icon?: IconProps | null;
	onClick?: () => void;
};

export type ButtonGroupProps = Omit<CommonButtonGroupProps, 'items' | 'children'> & {
	items?: ButtonGroupItemProps[];
	children?: ReactNode;
};

export type CalendarProps = Omit<CommonCalendarProps, 'popup' | 'button' | 'card'> & {
	popup?: PopupProps | null;
	button?: ButtonProps;
	card?: CardProps;
	onConfirm?: (dates: string[]) => void;
	onClose?: () => void;
};

export type CellRightProps = Omit<CommonCellRightProps, 'type'> & {
	type: 'switch' | 'icon';
	switch?: SwitchProps;
	icon?: IconProps;
};

export type CellProps = Omit<CommonCellProps, 'right' | 'left' | 'leftChild' | 'rightChild' | 'detailChild'> & {
	right?: null | 'arrow' | CellRightProps;
	left?: null | IconProps;
	leftChild?: ReactNode;
	rightChild?: ReactNode;
	detailChild?: ReactNode;
	onClick?: () => void;
};

export type CellGroupProps = Omit<CommonCellGroupProps, 'children'> & {
	children?: ReactNode;
};

export type CheckboxItemProps = Omit<CommonCheckboxItemProps, 'icon' | 'iconChecked' | 'children'> & {
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	children?: ReactNode;
	onClick?: (name: string) => void;
};

export type CheckboxProps = Omit<CommonCheckboxProps, 'data' | 'icon' | 'iconChecked' | 'checkboxChild'> & {
	data?: CheckboxItemProps[];
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checkboxChild?: ReactNode | ((props: { item: CheckboxItemProps }) => ReactNode);
	onChange?: (checkeds: string[]) => void;
};

export type DialogProps = Omit<
	CommonDialogProps,
	'popup' | 'icon' | 'primaryButton' | 'secondaryButton' | 'contentChild' | 'primaryChild'
> & {
	popup?: PopupProps;
	icon?: IconProps;
	primaryButton?: ButtonProps;
	secondaryButton?: ButtonProps;
	contentChild?: ReactNode;
	primaryChild?: ReactNode;
	onSecondary?: () => void;
	onPrimary?: () => void;
	onClose?: () => void;
};

export type GridProps = Omit<CommonGridProps, 'children'> & {
	children?: ReactNode;
};

export type GridsProps = Omit<CommonGridsProps, 'children'> & {
	children?: ReactNode;
};

export type IconProps = Omit<CommonIconProps, 'size' | 'children'> & {
	size?: number | 'full';
	children?: ReactNode;
	onClick?: () => void;
};

export type IndexBarProps<T = string> = Omit<CommonIndexBarProps<T>, 'children'> & {
	children?: (child: T, childIndex: number, group: IndexBarItemProps<T>, groupIndex: number) => ReactNode;
	onClickChild?: (index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void;
};

export type InputProps = Omit<
	CommonInputProps,
	| 'label1'
	| 'label3'
	| 'label4'
	| 'label6'
	| 'titleChild'
	| 'data1Child'
	| 'data2Child'
	| 'data3Child'
	| 'inputChild'
	| 'children'
	| 'label1Child'
	| 'label2Child'
	| 'label3Child'
	| 'label4Child'
	| 'label5Child'
	| 'label6Child'
	| 'tipChild'
> & {
	label1?: null | IconProps;
	label3?: null | IconProps;
	label4?: null | IconProps;
	label6?: null | IconProps;
	titleChild?: ReactNode;
	data1Child?: ReactNode;
	data2Child?: ReactNode;
	data3Child?: ReactNode;
	inputChild?: ReactNode;
	children?: ReactNode;
	label1Child?: ReactNode;
	label2Child?: ReactNode;
	label3Child?: ReactNode;
	label4Child?: ReactNode;
	label5Child?: ReactNode;
	label6Child?: ReactNode;
	tipChild?: ReactNode;
	onFocus?: (value: string) => void;
	onBlur?: (value: string) => void;
	onChange?: (value: string) => void;
	onClear?: () => void;
	onClickLabel1?: () => void;
	onClickLabel2?: () => void;
	onClickLabel3?: () => void;
	onClickLabel4?: () => void;
	onClickLabel5?: () => void;
	onClickLabel6?: () => void;
	onKeyDown?: (key: string) => void;
	onkeydown?: (key: string) => void;
};

export type MaskProps = Omit<CommonMaskProps, 'children'> & {
	children?: ReactNode;
	onClickMask?: () => void;
};

export type ModalProps = Omit<CommonModalProps, 'popup' | 'icon' | 'button' | 'contentChild'> & {
	popup?: PopupProps;
	icon?: IconProps;
	button?: ButtonProps;
	contentChild?: ReactNode;
	onClose?: () => void;
};

export type NavBarProps = Omit<CommonNavBarProps, 'left' | 'rights' | 'titleChild' | 'leftChild' | 'rightChild'> & {
	left?: 'back' | null | IconProps;
	rights?: IconProps[];
	titleChild?: ReactNode;
	leftChild?: ReactNode;
	rightChild?: ReactNode;
	onClickLeft?: () => void;
	onClickRight?: (index: number) => void;
};

export type NoticeBarProps = Omit<CommonNoticeBarProps, 'leftIcon' | 'leftChild' | 'rightChild'> & {
	leftIcon?: IconProps | null | 'volume';
	leftChild?: ReactNode;
	rightChild?: ReactNode;
	onClickRight?: () => void;
};

export type NumKeyboardProps = Omit<CommonNumKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
	onClick?: (key: NumKeyboardKey) => void;
	onOpen?: (height: number) => void;
	onClose?: () => void;
};

export type PaginationProps = CommonPaginationProps & {
	onChange?: (current: number) => void;
	onNext?: (current: number) => void;
	onPre?: (current: number) => void;
};

export type PickerProps = Omit<CommonPickerProps, 'datas' | 'popup' | 'multipleIcon' | 'multipleIconActive'> & {
	datas?: PickerDatasProps[] | PickerDataChildProps[];
	popup?: PopupProps | null;
	multipleIcon?: IconProps;
	multipleIconActive?: IconProps;
	onClose?: () => void;
	onConfirm?: (items: { [key: string]: string }[], indexs: number[]) => void;
	onCancel?: () => void;
	onMultipleChange?: (selected: PickerMultipleItem[]) => void;
	onmultiplechange?: (selected: PickerMultipleItem[]) => void;
};

export type PlaceholderProps = Omit<CommonPlaceholderProps, 'children'> & {
	children?: ReactNode;
};

export type PopupProps = Omit<CommonPopupProps, 'mask' | 'children'> & {
	mask?: MaskProps;
	children?: ReactNode;
	onClose?: () => void;
	onClickMask?: () => void;
};

export type ProgressProps = Omit<CommonProgressProps, 'children'> & {
	children?: ReactNode;
};

export type ProgressLoopProps = Omit<CommonProgressLoopProps, 'children'> & {
	children?: ReactNode;
};

export type RadioItemProps = Omit<CommonRadioItemProps, 'icon' | 'iconChecked' | 'children'> & {
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	children?: ReactNode;
	onClick?: (name: string) => void;
};

export type RadioProps = Omit<CommonRadioProps, 'data' | 'icon' | 'iconChecked' | 'radioChild'> & {
	data?: RadioItemProps[];
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	radioChild?: ReactNode | ((props: { item: RadioItemProps }) => ReactNode);
	onChange?: (value: string) => void;
};

export type RateProps = Omit<CommonRateProps, 'children'> & {
	children?: ReactNode;
	onClick?: (value: number) => void;
};

export type SkeletonProps = CommonSkeletonProps;

export type SliderProps = Omit<CommonSliderProps, 'children'> & {
	children?: ReactNode;
	onChange?: (
		value: number,
		valueRange?: [number, number],
		label?: string | number,
		labelRange?: [string | number, string | number]
	) => void;
};

export type StepperProps = CommonStepperProps & {
	onChange?: (value: number) => void;
	onDecrease?: () => void;
	onIncrease?: () => void;
};

export type StepsStepBarIconProps = Omit<CommonStepsStepBarIconProps, 'type'> & {
	type: 'icon';
	content: IconProps;
};

export type StepsStepProps = Omit<CommonStepsStepProps, 'bar' | 'injComponent'> & {
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: ReactNode | (() => ReactNode);
};

export type StepsFinishStepProps = Omit<CommonStepsFinishStepProps, 'bar' | 'injComponent'> & {
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: ReactNode | (() => ReactNode);
};

export type StepsItemProps = Omit<CommonStepsItemProps, 'step' | 'finishStep'> & {
	step: StepsStepProps;
	finishStep?: StepsFinishStepProps;
};

export type StepsProps = Omit<CommonStepsProps, 'steps'> & {
	steps?: StepsItemProps[];
};

export type SwiperComponentProps = Omit<CommonSwiperComponentProps, 'component'> & {
	type: 'component';
	component: ReactNode | (() => ReactNode);
};

export interface SwiperReactNodeProps {
	type: 'ReactNode';
	ReactNode: ReactNode;
}

export type SwiperProps = Omit<CommonSwiperProps, 'data'> & {
	data?: (SwiperImgProps | SwiperComponentProps | SwiperReactNodeProps)[];
	onChange?: (current: number) => void;
	onClick?: (current: number) => void;
};

export type SwitchProps = Omit<CommonSwitchProps, 'trueChild' | 'falseChild'> & {
	trueChild?: ReactNode;
	falseChild?: ReactNode;
	onChange?: (active: boolean) => void;
	onClick?: () => void;
};

export type TabBarLabelProps = Omit<CommonTabBarLabelProps, 'icon' | 'activeIcon'> & {
	text?: string;
	icon?: IconProps;
	activeIcon?: IconProps;
};

export type TabBarProps = Omit<CommonTabBarProps, 'labels'> & {
	labels?: TabBarLabelProps[];
	onChange?: (active: number) => void;
};

export type TabContentProps = Omit<CommonTabContentProps, 'show'> & {
	show?: boolean;
	children?: ReactNode;
	onClickTab?: () => void;
};

export type TabLabelProps = Omit<CommonTabLabelProps, 'text'> & {
	text?: string;
	icon?: IconProps;
};

export type TabProps = Omit<CommonTabProps, 'labels'> & {
	labels?: TabLabelProps[];
	labelChild?: ReactNode | ((props: { active: boolean }) => ReactNode);
	onClickTab?: (active: number) => void;
};

export type TabsProps = Omit<CommonTabsProps, 'tab' | 'children'> & {
	tab?: TabProps;
	children?: ReactNode | ((props: { active: number }) => ReactNode);
	onChange?: (active: number) => void;
};

export type TimePickerProps = Omit<CommonTimePickerProps, 'popup'> & {
	popup?: PopupProps | null;
	onCancel?: () => void;
	onConfirm?: (timeStr: string, timeObj: TimePickerObjProps) => void;
	onClose?: () => void;
};

export type ToastProps = Omit<CommonToastProps, 'mask' | 'icon' | 'children' | 'transitionParams'> & {
	mask?: MaskProps;
	icon?: IconProps;
	children?: ReactNode;
	transitionParams?: TransitionParams;
	onClose?: () => void;
};

export type ToastFnOptions = Omit<ToastProps, 'visible' | 'children'>;

export type AlertFnOptions = Omit<AlertProps, 'visible' | 'children'>;

export type DialogFnOptions = Omit<DialogProps, 'visible' | 'onPrimary' | 'onSecondary' | 'onClose' | 'contentChild' | 'primaryChild'>;

export type ModalFnOptions = Omit<ModalProps, 'visible' | 'onClose' | 'contentChild'>;

export type LoadingFnOptions = Partial<LoadingProps> & { message?: string };
