import type { Snippet, Component } from 'svelte';
import type {
	TimeData,
	NumKeyboardKey,
	IndexBarItemProps,
	PickerMultipleItem,
	StepsStepBarImageProps,
	StepsStepBarStringProps,
	SwiperImgProps,
	TimePickerObjProps,
	FormInputValue,
	FormTimePickerValue,
	FormCalendarValue,
	FormPickerValue,
	FormColorPickerValue,
	FormCheckboxValue,
	FormSliderValue,
	FormSwitchValue,
	FormStepperValue,
	AnimationEasingProps,
	ImagePreviewItemProps,
	ImageListItemProps,
	DialogResult,
	ModalResult,
	ActionProps as CommonActionProps,
	ActionSheetProps as CommonActionSheetProps,
	RingActionProps as CommonRingActionProps,
	ActionPopoverProps as CommonActionPopoverProps,
	AsyncPickerProps as CommonAsyncPickerProps,
	AvatarProps as CommonAvatarProps,
	AvatarGroupProps as CommonAvatarGroupProps,
	AccordionItemProps as CommonAccordionItemProps,
	AccordionProps as CommonAccordionProps,
	AlertProps as CommonAlertProps,
	BadgeProps as CommonBadgeProps,
	TagProps as CommonTagProps,
	CountDownProps as CommonCountDownProps,
	CharRollProps as CommonCharRollProps,
	CodeInputProps as CommonCodeInputProps,
	FullKeyboardProps as CommonFullKeyboardProps,
	CardProps as CommonCardProps,
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
	IndexBarProps as CommonIndexBarProps,
	InputProps as CommonInputProps,
	MaskProps as CommonMaskProps,
	ModalProps as CommonModalProps,
	NavBarProps as CommonNavBarProps,
	NoticeBarProps as CommonNoticeBarProps,
	NumKeyboardProps as CommonNumKeyboardProps,
	PickerProps as CommonPickerProps,
	PlaceholderProps as CommonPlaceholderProps,
	PopupProps as CommonPopupProps,
	PaginationProps as CommonPaginationProps,
	ProgressProps as CommonProgressProps,
	ProgressLoopProps as CommonProgressLoopProps,
	RadioItemProps as CommonRadioItemProps,
	RadioProps as CommonRadioProps,
	RateProps as CommonRateProps,
	SliderProps as CommonSliderProps,
	StepperProps as CommonStepperProps,
	StepsStepBarIconProps as CommonStepsStepBarIconProps,
	StepsStepProps as CommonStepsStepProps,
	StepsFinishStepProps as CommonStepsFinishStepProps,
	StepsItemProps as CommonStepsItemProps,
	StepsProps as CommonStepsProps,
	SwiperComponentProps as CommonSwiperComponentProps,
	SwiperProps as CommonSwiperProps,
	SwitchProps as CommonSwitchProps,
	TabBarLabelProps as CommonTabBarLabelProps,
	TabBarProps as CommonTabBarProps,
	TabContentProps as CommonTabContentProps,
	TabLabelProps as CommonTabLabelProps,
	TabProps as CommonTabProps,
	TabsProps as CommonTabsProps,
	TimePickerProps as CommonTimePickerProps,
	ToastProps as CommonToastProps,
	FormActionSheetValue as CommonFormActionSheetValue,
	FormInputProps as CommonFormInputProps,
	FormTimePickerProps as CommonFormTimePickerProps,
	FormActionSheetProps as CommonFormActionSheetProps,
	FormCalendarProps as CommonFormCalendarProps,
	FormNumKeyboardProps as CommonFormNumKeyboardProps,
	FormFullKeyboardProps as CommonFormFullKeyboardProps,
	FormPickerProps as CommonFormPickerProps,
	FormColorPickerProps as CommonFormColorPickerProps,
	FormCheckboxProps as CommonFormCheckboxProps,
	FormRadioProps as CommonFormRadioProps,
	FormSliderProps as CommonFormSliderProps,
	FormSwitchProps as CommonFormSwitchProps,
	FormStepperProps as CommonFormStepperProps,
	FormProps as CommonFormProps,
	SwipeActionProps as CommonSwipeActionProps,
	BatchActionProps as CommonBatchActionProps,
	ListProps as CommonListProps,
	ColorPickerProps as CommonColorPickerProps,
	TooltipProps as CommonTooltipProps,
	ImagePreviewProps as CommonImagePreviewProps,
	ImageListProps as CommonImageListProps,
	PullRefreshChangeDetail as CommonPullRefreshChangeDetail,
	PullRefreshProps as CommonPullRefreshProps,
	InfiniteScrollProps as CommonInfiniteScrollProps,
	ToastFunction as CommonToastFunction,
	AlertFunction as CommonAlertFunction,
	SignatureProps as CommonSignatureProps,
	SignatureResult as CommonSignatureResult
} from '@any-tdf/common/types';

export type {
	LargeAreaRadius,
	SmallAreaRadius,
	TimeData,
	NumKeyboardKey,
	CharRollPreset,
	InfoDateProps,
	DividerProps,
	IndexBarItemProps,
	LoadingProps,
	PickerDataChildProps,
	PickerDatasProps,
	PickerMultipleItem,
	SkeletonProps,
	StepsStepBarImageProps,
	StepsStepBarStringProps,
	SwiperImgProps,
	TimePickerItemProps,
	TimePickerObjProps,
	TimePickerTypeProps,
	FormInputValue,
	FormTimePickerValue,
	FormCalendarValue,
	FormNumKeyboardValue,
	FormFullKeyboardValue,
	FormPickerValue,
	FormColorPickerValue,
	FormCheckboxValue,
	FormRadioValue,
	FormSliderValue,
	FormSwitchValue,
	FormStepperValue,
	AnimationEasingProps,
	ListTransition,
	SwipeActionBgColor,
	SwipeHintMode,
	OklchColor,
	ColorPickerMode,
	ColorPickerValue,
	ImagePreviewItemProps,
	ImagePreviewClosePosition,
	ImageListStatus,
	ImageListItemProps,
	PullRefreshStatus,
	PullRefreshChangeDetail,
	InfiniteScrollDirection,
	DialogResult,
	ModalResult,
	LoadingFnOptions,
	LoadingFunction,
	SignatureRotation,
	SignatureResult
} from '@any-tdf/common/types';

export type SvelteEasingProps = AnimationEasingProps;

export type ActionProps = Omit<CommonActionProps, 'icon'> & {
	icon?: IconProps | null;
};

export type ActionSheetProps = Omit<CommonActionSheetProps, 'actions' | 'popup' | 'onclickAction'> & {
	actions: ActionProps[];
	popup?: PopupProps;
	oncancel?: () => void;
	onclickAction?: (index: number, action: ActionProps) => void;
	onclose?: () => void;
};

export type RingActionProps = Omit<CommonRingActionProps, 'icon'> & {
	icon: IconProps;
};

export type ActionPopoverProps = Omit<CommonActionPopoverProps, 'actions' | 'ringActions' | 'onclickAction'> & {
	actions: ActionProps[];
	ringActions?: RingActionProps[];
	oncancel?: () => void;
	onclickAction?: (index: number, action: ActionProps | RingActionProps) => void;
	onclose?: () => void;
};

export type AsyncPickerProps = Omit<CommonAsyncPickerProps, 'popup'> & {
	popup?: PopupProps | null;
	oncancel?: () => void;
	onprev?: () => void;
	onconfirm?: (items: Record<string, unknown>[], indexs: number[]) => void;
	onnext?: (index: number) => void;
	onclose?: () => void;
};

export type AvatarProps = Omit<CommonAvatarProps, 'icon'> & {
	icon?: IconProps;
	onclick?: () => void;
};

export type AvatarGroupProps = Omit<CommonAvatarGroupProps, 'data' | 'top'> & {
	data: AvatarProps[];
	top?: 'totle' | 'add' | null | Snippet;
	onclick?: () => void;
};

export type AccordionItemProps = Omit<CommonAccordionItemProps, 'icon'> & {
	icon?: IconProps;
};

export type AccordionProps = Omit<CommonAccordionProps, 'items' | 'children'> & {
	items: AccordionItemProps[];
	children?: Snippet<[item: AccordionItemProps, index: number]>;
	onchange?: (index: number | number[] | undefined) => void;
};

export type AlertProps = Omit<CommonAlertProps, 'icon' | 'card' | 'children'> & {
	icon?: IconProps;
	card?: CardProps;
	children?: Snippet;
	onclose?: () => void;
};

export type BadgeProps = Omit<CommonBadgeProps, 'children'> & {
	children?: Snippet;
};

export type TagProps = Omit<CommonTagProps, 'children'> & {
	children?: Snippet;
	onclick?: () => void;
	onclose?: () => void;
};

export type CountDownProps = Omit<CommonCountDownProps, 'children'> & {
	children?: Snippet<[TimeData]>;
	onfinish?: () => void;
	onchange?: (timeData: TimeData) => void;
};

export type CharRollProps = Omit<CommonCharRollProps, 'children'> & {
	children?: Snippet<[char: string, index: number]>; // 自定义字符渲染 Custom character render
	onstart?: () => void;
	oncomplete?: () => void;
	onchange?: (value: string) => void;
};

export type CodeInputProps = CommonCodeInputProps & {
	onfinish?: (value: string) => void;
	onclose?: () => void;
	onfocus?: () => void;
};

export type FullKeyboardProps = Omit<CommonFullKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
	onclick?: (key: string) => void;
	onopen?: (height: number) => void;
	onclose?: () => void;
};

export type CardProps = Omit<CommonCardProps, 'header' | 'children' | 'footer'> & {
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	onclick?: () => void;
};

export type BottomSheetProps = Omit<CommonBottomSheetProps, 'mask' | 'children'> & {
	mask?: MaskProps;
	children?: Snippet;
	onheightChange?: (height: number) => void;
	onclickMask?: () => void;
	onclose?: () => void;
	onback?: () => void;
};

export type ButtonProps = Omit<CommonButtonProps, 'icon' | 'children'> & {
	icon?: IconProps | null;
	children?: Snippet;
	onclick?: () => void;
};

export type ButtonGroupItemProps = Omit<CommonButtonGroupItemProps, 'icon'> & {
	icon?: IconProps | null;
	onclick?: () => void;
};

export type ButtonGroupProps = Omit<CommonButtonGroupProps, 'items' | 'children'> & {
	items?: ButtonGroupItemProps[];
	children?: Snippet;
};

export type CalendarProps = Omit<CommonCalendarProps, 'popup' | 'button' | 'card'> & {
	popup?: PopupProps | null;
	button?: ButtonProps;
	card?: CardProps;
	onconfirm?: (dates: string[]) => void;
	onclose?: () => void;
};

export type CellRightProps = Omit<CommonCellRightProps, 'type'> & {
	type: 'switch' | 'icon';
	switch?: SwitchProps;
	icon?: IconProps;
};

export type CellProps = Omit<CommonCellProps, 'right' | 'left' | 'leftChild' | 'rightChild' | 'detailChild'> & {
	right?: null | 'arrow' | CellRightProps;
	left?: null | IconProps;
	leftChild?: Snippet;
	rightChild?: Snippet;
	detailChild?: Snippet;
	onclick?: () => void;
};

export type CellGroupProps = Omit<CommonCellGroupProps, 'children'> & {
	children?: Snippet;
};

export type CheckboxItemProps = Omit<CommonCheckboxItemProps, 'icon' | 'iconChecked' | 'children'> & {
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	children?: Snippet;
	onclick?: (name: string) => void;
};

export type CheckboxProps = Omit<CommonCheckboxProps, 'data' | 'icon' | 'iconChecked' | 'checkboxChild'> & {
	data: CheckboxItemProps[];
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checkboxChild?: Snippet<[{ item: CheckboxItemProps & Record<string, unknown> }]>;
	onchange?: (checkeds: string[]) => void;
};

export type DialogProps = Omit<
	CommonDialogProps,
	'popup' | 'icon' | 'primaryButton' | 'secondaryButton' | 'contentChild' | 'primaryChild'
> & {
	popup?: PopupProps;
	icon?: IconProps;
	primaryButton?: ButtonProps;
	secondaryButton?: ButtonProps;
	contentChild?: Snippet;
	primaryChild?: Snippet;
	onsecondary?: () => void;
	onprimary?: () => void;
	onclose?: () => void;
};

export type GridProps = Omit<CommonGridProps, 'children'> & {
	children?: Snippet;
};

export type GridsProps = Omit<CommonGridsProps, 'children'> & {
	children?: Snippet;
};

export type IconProps = Omit<CommonIconProps, 'children'> & {
	children?: Snippet;
	onclick?: () => void;
};

export type IndexBarProps<T = string> = Omit<CommonIndexBarProps<T>, 'children'> & {
	children?: Snippet<[T, number, IndexBarItemProps<T>, number]>;
	onclickChild?: (index: number, group: IndexBarItemProps<T>, childIndex: number, child: T) => void;
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
	titleChild?: Snippet;
	data1Child?: Snippet;
	data2Child?: Snippet;
	data3Child?: Snippet;
	inputChild?: Snippet;
	children?: Snippet;
	label1Child?: Snippet;
	label2Child?: Snippet;
	label3Child?: Snippet;
	label4Child?: Snippet;
	label5Child?: Snippet;
	label6Child?: Snippet;
	tipChild?: Snippet;
	onfocus?: (value: string) => void;
	onblur?: (value: string) => void;
	onchange?: (value: string) => void;
	onclear?: () => void;
	onclickLabel1?: () => void;
	onclickLabel2?: () => void;
	onclickLabel3?: () => void;
	onclickLabel4?: () => void;
	onclickLabel5?: () => void;
	onclickLabel6?: () => void;
	onkeydown?: (key: string) => void;
};

export type MaskProps = Omit<CommonMaskProps, 'children'> & {
	children?: Snippet;
	onclickMask?: () => void;
};

export type ModalProps = Omit<CommonModalProps, 'popup' | 'icon' | 'button' | 'contentChild'> & {
	popup?: PopupProps;
	icon?: IconProps;
	button?: ButtonProps;
	contentChild?: Snippet;
	onclose?: () => void;
};

export type NavBarProps = Omit<CommonNavBarProps, 'left' | 'rights' | 'titleChild' | 'leftChild' | 'rightChild'> & {
	left?: 'back' | null | IconProps;
	rights?: IconProps[];
	titleChild?: Snippet;
	leftChild?: Snippet;
	rightChild?: Snippet;
	onclickLeft?: () => void;
	onclickRight?: (index: number) => void;
};

export type NoticeBarProps = Omit<CommonNoticeBarProps, 'leftIcon' | 'leftChild' | 'rightChild'> & {
	leftIcon?: IconProps | null | 'volume';
	leftChild?: Snippet;
	rightChild?: Snippet;
	onclickRight?: () => void;
};

export type NumKeyboardProps = Omit<CommonNumKeyboardProps, 'popup'> & {
	popup?: PopupProps | null;
	onclick?: (key: NumKeyboardKey) => void;
	onopen?: (height: number) => void;
	onclose?: () => void;
};

export type PaginationProps = CommonPaginationProps & {
	onchange?: (current: number) => void;
	onnext?: (current: number) => void;
	onpre?: (current: number) => void;
};

export type PickerProps = Omit<CommonPickerProps, 'popup' | 'multipleIcon' | 'multipleIconActive'> & {
	popup?: PopupProps | null;
	multipleIcon?: IconProps;
	multipleIconActive?: IconProps;
	onclose?: () => void;
	onconfirm?: (items: { [key: string]: string }[], indexs: number[]) => void;
	oncancel?: () => void;
	onmultiplechange?: (selected: PickerMultipleItem[]) => void;
};

export type PlaceholderProps = Omit<CommonPlaceholderProps, 'children'> & {
	children?: Snippet;
};

export type PopupProps = Omit<CommonPopupProps, 'mask' | 'children'> & {
	mask?: MaskProps;
	children?: Snippet;
	onclose?: () => void;
	onclickMask?: () => void;
};

export type ProgressProps = Omit<CommonProgressProps, 'children'> & {
	children?: Snippet;
};

export type ProgressLoopProps = Omit<CommonProgressLoopProps, 'children'> & {
	children?: Snippet;
};

export type RadioItemProps = Omit<CommonRadioItemProps, 'icon' | 'iconChecked' | 'children'> & {
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	children?: Snippet;
	onclick?: (name: string) => void;
};

export type RadioProps = Omit<CommonRadioProps, 'data' | 'icon' | 'iconChecked' | 'radioChild'> & {
	data: RadioItemProps[];
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	radioChild?: Snippet<[{ item: RadioItemProps & Record<string, unknown> }]>;
	onchange?: (value: string) => void;
};

export type RateProps = Omit<CommonRateProps, 'children'> & {
	children?: Snippet;
	onclick?: (value: number) => void;
};

export type SliderProps = Omit<CommonSliderProps, 'children'> & {
	children?: Snippet;
	onchange?: (
		value: number,
		valueRange?: [number, number],
		label?: string | number,
		labelRange?: [string | number, string | number]
	) => void;
};

export type StepperProps = CommonStepperProps & {
	onchange?: (value: number) => void;
	ondecrease?: () => void;
	onincrease?: () => void;
};

export type StepsStepBarIconProps = Omit<CommonStepsStepBarIconProps, 'type'> & {
	type: 'icon';
	content: IconProps;
};

export type StepsStepProps = Omit<CommonStepsStepProps, 'bar' | 'injComponent'> & {
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: Component;
};

export type StepsFinishStepProps = Omit<CommonStepsFinishStepProps, 'bar' | 'injComponent'> & {
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: Component;
};

export type StepsItemProps = Omit<CommonStepsItemProps, 'step' | 'finishStep'> & {
	step: StepsStepProps;
	finishStep?: StepsFinishStepProps;
};

export type StepsProps = Omit<CommonStepsProps, 'steps'> & {
	steps: StepsItemProps[];
};

export type SwiperComponentProps = Omit<CommonSwiperComponentProps, 'type'> & {
	type: 'component';
	component: Component;
};

export type SwiperProps = Omit<CommonSwiperProps, 'data'> & {
	data: (SwiperImgProps | SwiperComponentProps)[];
	onchange?: (current: number) => void;
	onclick?: (current: number) => void;
};

export type SwitchProps = Omit<CommonSwitchProps, 'trueChild' | 'falseChild'> & {
	trueChild?: Snippet;
	falseChild?: Snippet;
	onchange?: (active: boolean) => void;
	onclick?: () => void;
};

export type TabBarLabelProps = Omit<CommonTabBarLabelProps, 'text'> & {
	text?: string;
	icon?: IconProps;
	activeIcon?: IconProps;
};

export type TabBarProps = Omit<CommonTabBarProps, 'labels'> & {
	labels: TabBarLabelProps[];
	onchange?: (active: number) => void;
};

export type TabContentProps = Omit<CommonTabContentProps, 'show'> & {
	show?: boolean;
	children?: Snippet;
};

export type TabLabelProps = Omit<CommonTabLabelProps, 'text'> & {
	text?: string;
	icon?: IconProps;
};

export type TabProps = Omit<CommonTabProps, 'labels'> & {
	labels?: TabLabelProps[];
	onclickTab?: (active: number) => void;
};

export type TabsProps = Omit<CommonTabsProps, 'tab' | 'children'> & {
	tab: TabProps;
	children?: Snippet<[{ active: number }]>;
	onchange?: (active: number) => void;
};

export type TimePickerProps = Omit<CommonTimePickerProps, 'popup'> & {
	popup?: PopupProps | null;
	oncancel?: () => void;
	onconfirm?: (timeStr: string, timeObj: TimePickerObjProps) => void;
	onclose?: () => void;
};

export type ToastProps = Omit<CommonToastProps, 'mask' | 'icon' | 'children'> & {
	mask?: MaskProps;
	icon?: IconProps;
	children?: Snippet;
	onclose?: () => void;
};

export type FormActionSheetValue = Omit<CommonFormActionSheetValue, 'action'> & {
	action?: ActionProps;
	index?: number;
};

export type FormInputProps = Omit<CommonFormInputProps, 'input'> & {
	input?: InputProps;
};

export type FormTimePickerProps = Omit<CommonFormTimePickerProps, 'timePicker' | 'input'> & {
	timePicker?: TimePickerProps;
	input?: InputProps;
};

export type FormActionSheetProps = Omit<CommonFormActionSheetProps, 'actionSheet' | 'input'> & {
	actionSheet: ActionSheetProps;
	input?: InputProps;
};

export type FormCalendarProps = Omit<CommonFormCalendarProps, 'calendar' | 'input'> & {
	calendar?: CalendarProps;
	input?: InputProps;
};

export type FormNumKeyboardProps = Omit<CommonFormNumKeyboardProps, 'numKeyboard' | 'input'> & {
	numKeyboard?: NumKeyboardProps;
	input?: InputProps;
};

export type FormFullKeyboardProps = Omit<CommonFormFullKeyboardProps, 'fullKeyboard' | 'input'> & {
	fullKeyboard?: FullKeyboardProps;
	input?: InputProps;
};

export type FormPickerProps = Omit<CommonFormPickerProps, 'picker' | 'input'> & {
	picker?: PickerProps;
	input?: InputProps;
};

export type FormColorPickerProps = Omit<CommonFormColorPickerProps, 'colorPicker' | 'input'> & {
	colorPicker?: ColorPickerProps;
	input?: InputProps;
};

export type FormCheckboxProps = Omit<CommonFormCheckboxProps, 'checkbox'> & {
	checkbox?: CheckboxProps;
};

export type FormRadioProps = Omit<CommonFormRadioProps, 'radio'> & {
	radio?: RadioProps;
};

export type FormSliderProps = Omit<CommonFormSliderProps, 'slider'> & {
	slider?: SliderProps;
};

export type FormSwitchProps = Omit<CommonFormSwitchProps, 'switch'> & {
	switch?: SwitchProps;
};

export type FormStepperProps = Omit<CommonFormStepperProps, 'stepper'> & {
	stepper?: StepperProps;
};

export type FormItemProps =
	| FormInputProps
	| FormTimePickerProps
	| FormActionSheetProps
	| FormCalendarProps
	| FormNumKeyboardProps
	| FormFullKeyboardProps
	| FormPickerProps
	| FormColorPickerProps
	| FormCheckboxProps
	| FormRadioProps
	| FormSliderProps
	| FormSwitchProps
	| FormStepperProps;

export type FormValueProps =
	| FormInputValue
	| FormTimePickerValue
	| FormActionSheetValue
	| FormCalendarValue
	| FormPickerValue
	| FormColorPickerValue
	| FormCheckboxValue
	| FormSliderValue
	| FormSwitchValue
	| FormStepperValue;

export type FormProps = Omit<
	CommonFormProps,
	'form' | 'submitButton' | 'resetButton' | 'submitChildren' | 'resetChildren' | 'card' | 'onchange' | 'onsubmit'
> & {
	form: FormItemProps[];
	submitButton?: ButtonProps;
	resetButton?: ButtonProps;
	submitChildren?: Snippet;
	resetChildren?: Snippet;
	card?: CardProps;
	onchange?: (data: Record<string, FormValueProps>) => void;
	onsubmit?: (data: Record<string, FormValueProps>) => void;
	onreset?: () => void;
};

export type ListProps<T = Record<string, unknown>> = Omit<
	CommonListProps<T>,
	'itemChild' | 'headerChild' | 'footerChild' | 'swipeActions' | 'batchActions'
> & {
	itemChild: Snippet<[item: T, index: number]>;
	headerChild?: Snippet; // 列表头部 List header
	footerChild?: Snippet; // 列表底部 List footer
	swipeActions?: SwipeActionProps[];
	batchActions?: BatchActionProps[];
	onbatchChange?: (selected: (string | number)[]) => void;
	onclickItem?: (item: T, index: number) => void;
	onswipeAction?: (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => void;
};

export type SwipeActionProps = CommonSwipeActionProps & {
	onclick?: () => void;
};

export type BatchActionProps = CommonBatchActionProps & {
	onclick?: (selected: (string | number)[]) => void;
};

export type PullRefreshProps = Omit<
	CommonPullRefreshProps,
	'children' | 'normalChild' | 'pullingChild' | 'canReleaseChild' | 'refreshingChild' | 'successChild' | 'onrefresh' | 'onchange'
> & {
	children?: Snippet;
	normalChild?: Snippet<[detail: CommonPullRefreshChangeDetail]>;
	pullingChild?: Snippet<[detail: CommonPullRefreshChangeDetail]>;
	canReleaseChild?: Snippet<[detail: CommonPullRefreshChangeDetail]>;
	refreshingChild?: Snippet<[detail: CommonPullRefreshChangeDetail]>;
	successChild?: Snippet<[detail: CommonPullRefreshChangeDetail]>;
	onrefresh?: () => void;
	onchange?: (detail: CommonPullRefreshChangeDetail) => void;
};

export type InfiniteScrollProps = Omit<
	CommonInfiniteScrollProps,
	'children' | 'loadingChild' | 'finishedChild' | 'errorChild' | 'onload'
> & {
	children?: Snippet;
	loadingChild?: Snippet;
	finishedChild?: Snippet;
	errorChild?: Snippet;
	onload?: (isRetry: boolean) => void;
};

export type ColorPickerProps = Omit<CommonColorPickerProps, 'popup' | 'tab'> & {
	popup?: PopupProps | null; // Popup 配置，null 时直接显示 Popup config, null for direct display
	tab?: TabProps; // Tab 配置 Tab config
	onchange?: (colors: string[]) => void;
	onclose?: (colors: string[]) => void;
	oncopy?: (text: string) => void;
};

export type TooltipProps = Omit<CommonTooltipProps, 'children' | 'contentSnippet'> & {
	children?: Snippet; // 触发元素 Trigger element
	contentSnippet?: Snippet; // 自定义内容 Custom content
	onshow?: () => void;
	onhide?: () => void;
};

export type ImagePreviewProps = Omit<
	CommonImagePreviewProps,
	'mask' | 'icon' | 'rotationIcon' | 'children' | 'loadingChild' | 'errorChild' | 'indexChild'
> & {
	mask?: MaskProps; // 遮罩层参数 Mask layer parameters
	icon?: IconProps; // 关闭图标参数 Close icon parameters
	rotationIcon?: IconProps; // 旋转图标参数 Rotation icon parameters
	children?: Snippet<[item: ImagePreviewItemProps, index: number]>; // 自定义内容（如图片描述）Custom content (like image description)
	loadingChild?: Snippet; // 自定义加载中 Custom loading
	errorChild?: Snippet; // 自定义加载失败 Custom error
	indexChild?: Snippet<[current: number, total: number]>; // 自定义索引 Custom index
	onchange?: (index: number) => void;
	onclose?: () => void;
	onscale?: (scale: number) => void;
	onrotate?: (rotation: 0 | 90 | 180 | 270) => void;
};

export type ImageListProps = Omit<CommonImageListProps, 'icon' | 'deleteIcon' | 'uploadChild' | 'itemChild' | 'statusChild'> & {
	icon?: IconProps; // 上传图标参数 Upload icon parameters
	deleteIcon?: IconProps; // 删除图标参数 Delete icon parameters
	uploadChild?: Snippet; // 自定义上传按钮 Custom upload button
	itemChild?: Snippet<[item: ImageListItemProps, index: number]>; // 自定义每项 Custom item
	statusChild?: Snippet<[item: ImageListItemProps]>; // 自定义状态 Custom status
	onadd?: (files: File[]) => void;
	ondelete?: (item: ImageListItemProps, index: number) => void;
	onretry?: (item: ImageListItemProps, index: number) => void;
	onpreview?: (item: ImageListItemProps, index: number) => void;
	onexceed?: (files: File[], max: number) => void;
	onoversized?: (file: File, maxSize: number) => void;
	onclickUpload?: () => void;
};

export type ToastFnOptions = Omit<ToastProps, 'visible' | 'children'>;

// Alert 函数式 API 选项类型
// Alert functional API options type

export type AlertFnOptions = Omit<AlertProps, 'visible' | 'children'>;

// Dialog 函数式 API 选项类型
// Dialog functional API options type

export type DialogFnOptions = Omit<DialogProps, 'visible' | 'onprimary' | 'onsecondary' | 'onclose' | 'contentChild' | 'primaryChild'>;

// Dialog 返回结果类型
// Dialog result type

export type ModalFnOptions = Omit<ModalProps, 'visible' | 'onclose' | 'contentChild'>;

// Modal 返回结果类型
// Modal result type

export type ToastFunction = Omit<CommonToastFunction, 'success' | 'error' | 'warning' | 'info' | 'loading'> & {
	success: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	loading: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
};

export type AlertFunction = Omit<CommonAlertFunction, 'success' | 'error' | 'warning' | 'info'> & {
	success: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
};

export interface DialogFunction {
	(options: DialogFnOptions): Promise<DialogResult>;
	confirm: (content: string, title?: string) => Promise<boolean>;
	close: () => void;
}

// Modal 函数类型
// Modal function type

export interface ModalFunction {
	(options: ModalFnOptions): Promise<ModalResult>;
	info: (content: string, title?: string) => Promise<ModalResult>;
	close: () => void;
}

// Loading 函数类型
// Loading function type

export type SignatureProps = Omit<CommonSignatureProps, 'clearButton' | 'confirmButton'> & {
	clearButton?: ButtonProps; // 清空按钮配置 Clear button config
	confirmButton?: ButtonProps; // 确认按钮配置 Confirm button config
	onclear?: () => void;
	onconfirm?: (result: CommonSignatureResult) => void;
	ondrawStart?: () => void;
	ondrawEnd?: () => void;
};
