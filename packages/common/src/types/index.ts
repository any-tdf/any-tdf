export type AnyTdfSnippet<_TArgs extends unknown[] = unknown[]> = unknown;
export type AnyTdfComponent = unknown;
export type LargeAreaRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | '';
export type SmallAreaRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | '';
export type NumKeyboardKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | 'delete' | 'close' | 'done';
export type ActionProps = {
	content: string;
	style?: 'normal' | 'theme' | 'success' | 'warning' | 'error' | 'info';
	disabled?: boolean;
	desc?: string;
	showImg?: boolean;
	imgRadius?: SmallAreaRadius;
	imgSrc?: string;
	icon?: IconProps | null;
};
export type ActionSheetProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions: ActionProps[];
	popup?: PopupProps;
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
};
export type RingActionProps = {
	icon: IconProps;
	style?: 'normal' | 'theme' | 'success' | 'warning' | 'error' | 'info';
	disabled?: boolean;
};
export type ActionPopoverProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	actions: ActionProps[];
	showCancel?: boolean;
	cancelText?: string;
	actionClosable?: boolean;
	align?: 'left' | 'center' | 'right';
	inverse?: boolean;
	layout?: 'v' | 'h' | 'grid' | 'ring';
	gridColumns?: 2 | 3 | 4;
	triggerRef?: HTMLElement | null;
	inlineAlign?: 'left' | 'center' | 'right';
	inlineDirection?: 'auto' | 'up' | 'down';
	inlineOffset?: number;
	inlineShadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	inlineRadius?: LargeAreaRadius;
	ringActions?: RingActionProps[];
	ringRadius?: number;
	ringItemSize?: number;
	ringShape?: 'auto' | 'full' | 'half' | 'quarter';
};
export type AsyncPickerProps = {
	visible?: boolean;
	data?: Record<string, unknown>[];
	lastLevel?: boolean;
	firstLevel?: boolean;
	showRow?: 3 | 5 | 7;
	labelKey?: string;
	align?: 'left' | 'center' | 'right';
	cancelText?: string;
	confirmText?: string;
	title?: string;
	nextText?: string;
	prevText?: string;
	showSelected?: boolean;
	selectedText?: string;
	height?: number;
	popup?: PopupProps | null;
	loading?: LoadingProps;
};
export type AvatarProps = {
	image?: string;
	alt?: string;
	icon?: IconProps;
	altSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: SmallAreaRadius;
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	imgSize?: 's' | 'm' | 'l';
	line?: 'none' | 'solid' | 'dashed' | 'dotted';
	injClass?: string;
};
export type AvatarGroupProps = {
	data: AvatarProps[];
	radius?: SmallAreaRadius;
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
	compact?: number;
	lineWidth?: '0' | '1' | '2' | '3' | '4' | '8';
	reverse?: boolean;
	max?: number;
	top?: 'totle' | 'add' | null | AnyTdfSnippet;
	injClass?: string;
};
export type AccordionItemProps = {
	title: string;
	content?: string;
	disabled?: boolean;
	icon?: IconProps;
};
export type AccordionProps = {
	items: AccordionItemProps[];
	activeIndex?: number | number[];
	multiple?: boolean;
	radius?: LargeAreaRadius;
	border?: 'none' | 'solid' | 'dashed' | 'dotted';
	divider?: boolean;
	expandIcon?: 'arrow' | 'plus' | null;
	iconPosition?: 'left' | 'right';
	transitionDuration?: number;
	injClass?: string;
	titleClass?: string;
	contentClass?: string;
	children?: AnyTdfSnippet<[item: AccordionItemProps, index: number]>;
};
export type AlertProps = {
	visible?: boolean;
	title?: string;
	message?: string;
	duration?: number;
	position?: 'top' | 'bottom';
	py?: '0' | '10' | '20' | '40' | '60' | '80';
	type?: 'success' | 'error' | 'warning' | 'info' | null;
	showIcon?: boolean;
	icon?: IconProps;
	closable?: boolean;
	inverse?: boolean;
	card?: CardProps;
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | null;
	transitionParams?: object;
	outDuration?: number;
	easeType?: AnimationEasingProps;
	easeOutType?: AnimationEasingProps;
	zIndex?: number;
	clickable?: boolean;
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type BadgeProps = {
	text?: string;
	radius?: SmallAreaRadius | 'leaf';
	isLeft?: boolean;
	isShow?: boolean;
	offsetY?: number;
	offsetX?: number;
	isInner?: boolean;
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type TagProps = {
	text?: string;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
	fill?: 'base' | 'line' | 'light';
	size?: 'xs' | 'sm' | 'md' | 'lg';
	radius?: SmallAreaRadius;
	mark?: boolean;
	closable?: boolean;
	disabled?: boolean;
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type TimeData = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
};
export type CountDownProps = {
	time?: number;
	format?: string;
	autoStart?: boolean;
	millisecond?: boolean;
	injClass?: string;
	children?: AnyTdfSnippet<[TimeData]>;
};
export type CharRollPreset = 'number' | 'letter' | 'letterUpper' | 'letterLower' | 'alphanumeric' | 'hex' | 'hexUpper' | 'binary' | 'octal';
export type CharRollProps = {
	value?: string | number;
	duration?: number;
	delay?: number;
	stagger?: number;
	direction?: 'up' | 'down';
	height?: number;
	separator?: boolean;
	decimal?: number;
	prefix?: string;
	suffix?: string;
	charSet?: string;
	preset?: CharRollPreset;
	loops?: number;
	autoStart?: boolean;
	loop?: boolean;
	loopInterval?: number;
	easing?: AnimationEasingProps;
	radius?: SmallAreaRadius;
	bg?: 'none' | 'surface' | 'gray' | 'theme';
	gap?: '0' | '1' | '2' | '3' | '4';
	fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
	injClass?: string;
	charClass?: string;
	children?: AnyTdfSnippet<[char: string, index: number]>;
};
export type CodeInputProps = {
	value?: string;
	length?: number;
	mask?: boolean | string;
	gutter?: '0' | '1' | '2' | '3' | '4';
	focused?: boolean;
	type?: 'number' | 'text';
	inputMode?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | '';
	native?: boolean;
	info?: string;
	errorInfo?: string;
	radius?: SmallAreaRadius;
	cellSize?: 'sm' | 'md' | 'lg';
	cellStyle?: 'box' | 'line';
	cellBg?: 'surface' | 'gray' | 'theme';
	cellBorder?: 'none' | 'solid' | 'dashed' | 'dotted';
	cursorStyle?: 'line' | 'underline';
	cursorAnimation?: 'pulse' | 'blink';
	keyboardVisible?: boolean;
	autoClose?: boolean;
	autoScroll?: boolean | number;
	bold?: boolean;
	injClass?: string;
};
export type FullKeyboardProps = {
	value?: string;
	visible?: boolean;
	type?: 'button' | 'block';
	mode?: 'letter' | 'letterNumber' | 'full';
	done?: boolean;
	doneText?: string;
	doneDisabled?: boolean;
	radius?: SmallAreaRadius;
	preview?: boolean;
	previewMask?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps | null;
};
export type CardProps = {
	bg?: 'none' | 'surface' | 'gray' | 'theme';
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	border?: 'none' | 'solid' | 'dashed' | 'dotted';
	borderWidth?: '0' | '1' | '2' | '4';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	p?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	px?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	py?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	overflow?: boolean;
	headerLine?: boolean;
	footerLine?: boolean;
	injClass?: string;
	headerClass?: string;
	bodyClass?: string;
	footerClass?: string;
	header?: AnyTdfSnippet;
	children?: AnyTdfSnippet;
	footer?: AnyTdfSnippet;
};
export type BottomSheetProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	showBackIcon?: boolean;
	closeContent?: 'downIcon' | 'closeIcon' | '' | string;
	showDivider?: boolean;
	duration?: number;
	outDuration?: number;
	mask?: MaskProps;
	maskClosable?: boolean;
	zIndex?: number;
	stayHeightList?: number[];
	stayHeightIndex?: number;
	closeHeight?: number;
	radius?: LargeAreaRadius;
	iconRadius?: SmallAreaRadius;
	children?: AnyTdfSnippet;
};
export type ButtonProps = {
	fill?: 'base' | 'line' | 'lineLight' | 'lineState' | 'text' | 'textState' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: SmallAreaRadius;
	size?: 'full' | 'big' | 'md' | 'sm' | 'auto';
	border?: 'solid' | 'dashed' | 'dotted';
	injClass?: string;
	love?: boolean;
	heightOut?: '0' | '1' | '2' | '3' | '4';
	heightIn?: '0' | '1' | '2' | '3' | '4';
	disabled?: boolean;
	customSize?: boolean;
	customWidth?: number;
	customHeight?: number;
	icon?: IconProps | null;
	iconPosition?: 'left' | 'right';
	loading?: LoadingProps | null;
	disabledLoading?: boolean;
	type?: 'submit' | 'reset' | 'button';
	children?: AnyTdfSnippet;
};
export type ButtonGroupItemProps = {
	text?: string;
	icon?: IconProps | null;
	iconPosition?: 'left' | 'right';
	disabled?: boolean;
};
export type ButtonGroupProps = {
	items?: ButtonGroupItemProps[];
	fill?: 'base' | 'line' | 'lineLight' | 'lineState' | 'text' | 'textState' | 'colorLight';
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	radius?: SmallAreaRadius;
	size?: 'full' | 'big' | 'md' | 'sm' | 'auto';
	border?: 'solid' | 'dashed' | 'dotted';
	dividerHeight?: 'full' | 'mid' | 'short';
	heightIn?: '0' | '1' | '2' | '3' | '4';
	heightOut?: '0' | '1' | '2' | '3' | '4';
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type InfoDateProps = {
	text: string;
	info: string;
};
export type CalendarProps = {
	visible?: boolean;
	startMonth?: string;
	endMonth?: string;
	initMonth?: string;
	initSelectedDates?: string[];
	mode?: 'single' | 'multiple' | 'range';
	startSunday?: boolean;
	weekendRed?: boolean;
	monthCard?: boolean;
	monthMark?: boolean;
	monthMarkSize?: '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
	height?: number;
	infoDates?: InfoDateProps[];
	disabledDates?: string[];
	radius?: SmallAreaRadius;
	showSelectedDay?: boolean;
	confirmText?: string;
	selectedText?: string;
	dayText?: string;
	quickSelects?: ('week' | 'month' | 'quarter' | number)[];
	includeToday?: boolean;
	useAnimation?: boolean;
	highlightToday?: boolean;
	outFormat?: string;
	popup?: PopupProps | null;
	button?: ButtonProps;
	card?: CardProps;
	clear?: boolean;
};
export type CellRightProps = {
	type: 'switch' | 'icon';
	switch?: SwitchProps;
	icon?: IconProps;
};
export type CellProps = {
	title?: string;
	detail?: string;
	right?: null | 'arrow' | CellRightProps;
	left?: null | IconProps;
	subTitle?: string;
	info?: string;
	line?: boolean;
	bg?: 'surface' | 'gray' | 'theme' | 'white';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	radius?: LargeAreaRadius;
	switchActive?: boolean;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	love?: boolean;
	clickAll?: boolean;
	leftChild?: AnyTdfSnippet;
	rightChild?: AnyTdfSnippet;
	detailChild?: AnyTdfSnippet;
};
export type CellGroupProps = {
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	bg?: 'surface' | 'gray' | 'theme' | 'white';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	children?: AnyTdfSnippet;
};
export type CheckboxItemProps = {
	name: string;
	label?: string;
	layout?: 'h' | 'v' | 'inline';
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checked?: boolean;
	children?: AnyTdfSnippet;
};
export type CheckboxProps = {
	data: CheckboxItemProps[];
	layout?: 'h' | 'v' | 'inline';
	checkeds?: string[];
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: null | 'default' | IconProps;
	iconChecked?: null | 'default' | IconProps;
	checkboxChild?: AnyTdfSnippet<
		[
			{
				item: CheckboxItemProps & Record<string, unknown>;
			}
		]
	>;
};
export type DialogProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	popup?: PopupProps;
	showIcon?: boolean;
	icon?: IconProps;
	btnStyle?: 'button' | 'text' | 'textLine';
	primaryText?: string;
	primaryButton?: ButtonProps;
	secondaryText?: string;
	secondaryButton?: ButtonProps;
	btnRatio?: [number, number];
	btnReverse?: boolean;
	secondaryClose?: boolean;
	btnGap?: '0' | '1' | '2' | '4' | '8' | '12' | '16';
	contentChild?: AnyTdfSnippet;
	primaryChild?: AnyTdfSnippet;
};
export type DividerProps = {
	layout?: 'h' | 'v';
	px?: '0' | '4' | '8' | '16' | '36';
	py?: '0' | '4' | '8';
	text?: string;
	align?: 'left' | 'center' | 'right';
	line?: 'solid' | 'dashed' | 'dotted';
	mx?: '1' | '2' | '4';
	weight?: '1' | '2' | '4';
	injClass?: string;
};
export type GridProps = {
	col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	row?: '1' | '2' | '3' | '4' | '5' | '6';
	children?: AnyTdfSnippet;
};
export type GridsProps = {
	cols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
	gap?: '0' | '1' | '2' | '4' | '8';
	mx?: '0' | '1' | '2' | '4' | '8';
	my?: '0' | '1' | '2' | '4' | '8';
	children?: AnyTdfSnippet;
};
export type IconProps = {
	type?: 'symbol' | 'iconify' | 'iconify-color';
	name?: string;
	size?: number;
	width?: number;
	height?: number;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	theme?: boolean;
	opacity?: number;
	path?: string;
	y?: number;
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type IndexBarItemProps<T = string> = {
	index: string;
	title: string;
	child: T[];
	height?: number;
};
export type IndexBarProps<T = string> = {
	data?: IndexBarItemProps<T>[];
	current?: number;
	top?: number;
	height?: number;
	radius?: SmallAreaRadius;
	scrollAlign?: boolean;
	titleInjClass?: string;
	textInjClass?: string;
	children?: AnyTdfSnippet<[T, number, IndexBarItemProps<T>, number]>;
};
export type InputProps = {
	title?: string;
	titlePosition?: 'in' | 'out' | null;
	inputPosition?: 'left' | 'right';
	placeholder?: string;
	radius?: LargeAreaRadius;
	inputStyle?: 'block' | 'line';
	lineTransition?: null | 'center' | 'left';
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	autocomplete?: boolean;
	py?: '0' | '0.5' | '1' | '2' | '3' | '4' | '6';
	disabled?: boolean;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info';
	type?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | 'password' | 'number' | 'textarea';
	inputmode?: 'text' | 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'url' | '';
	readonly?: boolean;
	select?: boolean;
	required?: boolean;
	maxlength?: number;
	textareaMaxlength?: number;
	rows?: number;
	autosize?: boolean;
	negative?: boolean;
	label1?: null | IconProps;
	label2?: null | string;
	label3?: null | IconProps;
	label4?: null | IconProps;
	label5?: null | string;
	label6?: null | IconProps;
	tip?: string | null;
	data1?: null | string;
	data2?: null | string;
	data3?: null | string;
	value?: string;
	clear?: boolean;
	titleChild?: AnyTdfSnippet;
	data1Child?: AnyTdfSnippet;
	data2Child?: AnyTdfSnippet;
	data3Child?: AnyTdfSnippet;
	inputChild?: AnyTdfSnippet;
	children?: AnyTdfSnippet;
	label1Child?: AnyTdfSnippet;
	label2Child?: AnyTdfSnippet;
	label3Child?: AnyTdfSnippet;
	label4Child?: AnyTdfSnippet;
	label5Child?: AnyTdfSnippet;
	label6Child?: AnyTdfSnippet;
	tipChild?: AnyTdfSnippet;
};
export type LoadingProps = {
	type?: string;
	height?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	width?: '2' | '4' | '6' | '8' | '12' | '16' | '20' | '28' | '36' | '48' | '56' | '64' | '72' | '80' | '96' | 'full';
	theme?: boolean;
	inverse?: boolean;
	customColor?: string[];
	lazyAnimation?: boolean;
	speed?: number;
};
export type PullRefreshStatus = 'normal' | 'pulling' | 'canRelease' | 'refreshing' | 'success';
export type PullRefreshChangeDetail = {
	status: PullRefreshStatus;
	distance: number;
	progress: number;
};
export type PullRefreshProps = {
	refreshing?: boolean;
	disabled?: boolean;
	headHeight?: number;
	threshold?: number;
	pullFactor?: number;
	successDuration?: number;
	animationDuration?: number;
	pullingText?: string;
	canReleaseText?: string;
	refreshingText?: string;
	successText?: string;
	loadingIcon?: LoadingProps | null;
	scrollTarget?: HTMLElement | string | null;
	injClass?: string;
	headClass?: string;
	contentClass?: string;
	children?: AnyTdfSnippet;
	normalChild?: AnyTdfSnippet<[detail: PullRefreshChangeDetail]>;
	pullingChild?: AnyTdfSnippet<[detail: PullRefreshChangeDetail]>;
	canReleaseChild?: AnyTdfSnippet<[detail: PullRefreshChangeDetail]>;
	refreshingChild?: AnyTdfSnippet<[detail: PullRefreshChangeDetail]>;
	successChild?: AnyTdfSnippet<[detail: PullRefreshChangeDetail]>;
};
export type InfiniteScrollDirection = 'up' | 'down';
export type InfiniteScrollProps = {
	loading?: boolean;
	finished?: boolean;
	error?: boolean;
	disabled?: boolean;
	offset?: number;
	direction?: InfiniteScrollDirection;
	immediateCheck?: boolean;
	loadingText?: string;
	finishedText?: string;
	errorText?: string;
	loadingIcon?: LoadingProps | null;
	scrollTarget?: HTMLElement | string | null;
	injClass?: string;
	textClass?: string;
	children?: AnyTdfSnippet;
	loadingChild?: AnyTdfSnippet;
	finishedChild?: AnyTdfSnippet;
	errorChild?: AnyTdfSnippet;
};
export type MaskProps = {
	visible?: boolean;
	opacity?: '0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
	clickable?: boolean;
	inverse?: boolean;
	backdropBlur?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	duration?: number;
	outDuration?: number;
	zIndex?: number;
	children?: AnyTdfSnippet;
};
export type ModalProps = {
	visible?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	content?: string;
	popup?: PopupProps;
	showIcon?: boolean;
	icon?: IconProps;
	showBtn?: boolean;
	btnText?: string;
	button?: ButtonProps;
	contentChild?: AnyTdfSnippet;
};
export type NavBarProps = {
	title?: string;
	titleAlign?: 'left' | 'center' | 'right';
	left?: 'back' | null | IconProps;
	rights?: IconProps[];
	line?: boolean;
	injClass?: string;
	love?: boolean;
	titleChild?: AnyTdfSnippet;
	leftChild?: AnyTdfSnippet;
	rightChild?: AnyTdfSnippet;
};
export type NoticeBarProps = {
	textList?: string[];
	leftIcon?: IconProps | null | 'volume';
	rightIcon?: 'close' | 'arrow' | null;
	space?: number;
	speed?: number;
	vertical?: boolean;
	duration?: 100 | 300 | 500 | 700 | 1000;
	interval?: number;
	injClass?: string;
	radius?: LargeAreaRadius;
	leftChild?: AnyTdfSnippet;
	rightChild?: AnyTdfSnippet;
};
export type NumKeyboardProps = {
	value?: string;
	type?: 'button' | 'block';
	visible?: boolean;
	height?: '8' | '10' | '12' | '14' | '16' | '20';
	space?: '0' | '1' | '2' | '3' | '4';
	p?: '0' | '1' | '2' | '3' | '4';
	reverse?: boolean;
	done?: boolean;
	dot?: boolean;
	close?: boolean;
	doneText?: string;
	doneDisabled?: boolean;
	radius?: SmallAreaRadius;
	clear?: boolean;
	preview?: boolean;
	previewMask?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps | null;
};
export type PaginationProps = {
	total?: number;
	pageSize?: number;
	current?: number;
	maxShowPage?: 5 | 7 | 9 | 11;
	radius?: SmallAreaRadius;
	type?: 'border' | 'block' | 'bold';
	bg?: 'surface' | 'gray' | 'theme' | 'white';
	pageCol?: number;
	showNextOmitPage?: boolean;
	showPreOmitPage?: boolean;
	injClass?: string;
	noDataText?: string;
	onePageText?: string;
	continuous?: boolean;
};
export type PickerDataChildProps = {
	[key: string]: string | PickerDataChildProps[] | undefined | number;
	children?: PickerDataChildProps[];
	initIndex?: number;
};
export type PickerDatasProps = {
	data: {
		[key: string]: string;
	}[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	useAnimation?: boolean;
	labelKey?: string;
	flex?: number;
	align?: 'left' | 'center' | 'right';
	lastSelectedIndex?: number;
};
export type PickerMultipleItem = {
	indexs: number[];
	items: {
		[key: string]: string;
	}[];
	label: string;
};
export type PickerProps = {
	visible?: boolean;
	datas: PickerDatasProps[] | PickerDataChildProps[];
	autoScrollToLast?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	isLinkage?: boolean;
	linkageInitIndexs?: number[];
	linkageShowRows?: number[];
	linkageFlexs?: number[];
	linkageAligns?: ('left' | 'center' | 'right')[];
	linkageLabelKeys?: string[];
	linkageChildrenKey?: string;
	height?: number;
	popup?: PopupProps | null;
	multiple?: boolean;
	multipleIcon?: IconProps;
	multipleIconActive?: IconProps;
	multipleSelected?: PickerMultipleItem[];
};
export type PlaceholderProps = {
	py?: '0' | '1' | '2' | '3' | '4' | '8';
	height?: 'full' | '1' | '2' | '4' | '8' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	injClass?: string;
	children?: AnyTdfSnippet;
};
export type PopupProps = {
	visible?: boolean;
	size?: number;
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	duration?: number;
	outDuration?: number;
	easeType?: AnimationEasingProps;
	easeOutType?: AnimationEasingProps;
	px?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';
	py?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '24' | '32' | '48' | '64';
	mask?: MaskProps;
	maskClosable?: boolean;
	radiusPosition?: 'auto' | 'all' | 'top' | 'bottom' | 'left' | 'right' | 'none';
	radius?: LargeAreaRadius;
	transitionDistance?: number;
	transparent?: boolean;
	zIndex?: number;
	dynamicFixed?: boolean;
	hideScrollbar?: boolean;
	children?: AnyTdfSnippet;
};
export type ProgressProps = {
	percent?: number;
	percentPosition?: 'inner' | 'right' | 'block' | null;
	height?: '1' | '2' | '3' | '4';
	radius?: SmallAreaRadius;
	inactive?: boolean;
	overflowPercent?: number;
	duration?: '150' | '300' | '500' | '700' | '1000';
	injClass?: string;
	trackInjClass?: string;
	children?: AnyTdfSnippet;
};
export type ProgressLoopProps = {
	percent?: number;
	strokeWidth?: number;
	butt?: boolean;
	reverse?: boolean;
	duration?: '150' | '300' | '500' | '700' | '1000';
	gradient?: [string, string] | null;
	injClass?: string;
	trackInjClass?: string;
	children?: AnyTdfSnippet;
};
export type RadioItemProps = {
	name: string;
	label?: string;
	layout?: 'v' | 'h' | 'inline';
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	checked?: boolean;
	children?: AnyTdfSnippet;
};
export type RadioProps = {
	data: RadioItemProps[];
	layout?: 'v' | 'h' | 'inline';
	value?: string;
	textPosition?: 'l' | 'r' | 't' | 'b';
	icon?: 'default' | null | IconProps;
	iconChecked?: 'default' | null | IconProps;
	radioChild?: AnyTdfSnippet<
		[
			{
				item: RadioItemProps & Record<string, unknown>;
			}
		]
	>;
};
export type RateProps = {
	value?: number;
	total?: number;
	height?: number;
	width?: number;
	opacity?: '0.05' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '1';
	space?: '0' | '1' | '2' | '3' | '4' | '8';
	half?: boolean;
	zero?: boolean;
	vertical?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	animation?: 'current' | 'active' | null;
	children?: AnyTdfSnippet;
};
export type SkeletonProps = {
	type?: 'div' | 'p' | 'img' | 'video' | 'code' | 'qrcode' | 'barcode';
	width?: 'full' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	height?: '1' | '2' | '4' | '6' | '8' | '12' | '16' | '24' | '32' | '48' | '64' | '96';
	radius?: LargeAreaRadius;
	space?: '0.5' | '1' | '2' | '4' | '8';
	lines?: number;
	iconRatio?: number;
	effect?: 'pulse' | 'wave' | 'breathe' | 'none';
	bg?: 'gray' | 'theme';
};
export type SliderProps = {
	value?: number;
	step?: number;
	minRange?: number;
	maxRange?: number;
	isRange?: boolean;
	valueRange?: [number, number];
	startValue?: number;
	endValue?: number;
	showTip?: 'always' | 'touch' | 'never';
	showSteps?: boolean;
	stepsStyle?: 'block' | 'break';
	stepLabels?: string[];
	radius?: SmallAreaRadius;
	lineBlock?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	children?: AnyTdfSnippet;
};
export type StepperProps = {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	vertical?: boolean;
	numberHighlight?: boolean;
	theme?: boolean;
	radius?: SmallAreaRadius;
	decimal?: number;
	async?: boolean;
	asyncLoading?: boolean;
	loading?: LoadingProps;
	padding?: boolean;
	width?: number;
	injClassOut?: string;
	injClassBtn?: string;
	injClassNum?: string;
};
export type StepsStepBarIconProps = {
	type: 'icon';
	content: IconProps;
};
export type StepsStepBarImageProps = {
	type: 'image';
	content: string;
};
export type StepsStepBarStringProps = {
	type: 'string';
	content: string;
};
export type StepsStepProps = {
	title?: string;
	desc?: string;
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: AnyTdfComponent;
};
export type StepsFinishStepProps = {
	title?: string;
	desc?: string;
	bar?: StepsStepBarIconProps | StepsStepBarImageProps | StepsStepBarStringProps;
	injComponent?: AnyTdfComponent;
};
export type StepsItemProps = {
	step: StepsStepProps;
	finishStep?: StepsFinishStepProps;
	height?: number;
};
export type StepsProps = {
	steps?: StepsItemProps[];
	current?: number;
	radius?: SmallAreaRadius;
	barBorder?: boolean;
	vertical?: boolean;
};
export type SwiperImgProps = {
	type: 'img';
	url: string;
};
export type SwiperComponentProps = {
	type: 'component';
	component: AnyTdfComponent;
};
export type SwiperProps = {
	data?: (SwiperImgProps | SwiperComponentProps)[];
	interval?: number;
	duration?: number;
	autoplay?: boolean;
	lazyplay?: boolean;
	initActive?: number;
	indicatePosition?: 'inner' | 'out' | null;
	indicateAlign?: 'center' | 'right' | 'left';
	indicateStyle?: 'point' | 'line' | 'pointLine' | 'longLine';
	indicateRadius?: SmallAreaRadius;
	indicateInjClass?: string;
	indicateColor?: string;
	indicateActiveColor?: string;
	aspectRatio?: [number, number];
	containerWidth?: number;
	px?: '0' | '1' | '2' | '4' | '6' | '8' | '12' | '16' | '24';
	py?: '0' | '1' | '2' | '4' | '6' | '8' | '12';
	translateX?: number;
	translateZ?: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
	activeInjClass?: string;
	notActiveInjClass?: string;
	radius?: LargeAreaRadius;
	triggerLong?: number;
	notTriggerLong?: number;
	triggerSpeed?: number;
	innerInjClass?: string;
};
export type SwitchProps = {
	active?: boolean;
	radius?: SmallAreaRadius;
	inside?: 'state' | 'loading' | [string, string] | null;
	injClass?: string;
	disabled?: boolean;
	async?: boolean;
	loading?: LoadingProps;
	trueChild?: AnyTdfSnippet;
	falseChild?: AnyTdfSnippet;
};
export type TabBarLabelProps = {
	text?: string;
	icon?: IconProps;
	activeIcon?: IconProps;
};
export type TabBarProps = {
	labels: TabBarLabelProps[];
	active?: number;
	line?: boolean;
	lineW?: number;
	love?: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
};
export type TabContentProps = {
	show?: boolean;
	children?: AnyTdfSnippet;
};
export type TabLabelProps = {
	text?: string;
	icon?: IconProps;
};
export type TabProps = {
	labels?: TabLabelProps[];
	active?: number;
	lineType?: boolean;
	radius?: SmallAreaRadius;
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	layout?: 'h' | 'v';
	love?: boolean;
	injClass?: string;
	tabInjClass?: string;
	activeTabInjClass?: string;
	activeInjClass?: string;
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20';
	overflow?: boolean;
	showNum?: number;
	autoScroll?: boolean;
};
export type TabsProps = {
	tab: TabProps;
	duration?: 'fast' | 'base' | 'slow' | 'slower';
	position?: 't' | 'b' | 'l' | 'r';
	transition?: boolean;
	active?: number;
	children?: AnyTdfSnippet<
		[
			{
				active: number;
			}
		]
	>;
};
export type TimePickerItemProps = {
	showRow?: 3 | 5 | 7;
	flex?: number;
	align?: 'left' | 'center' | 'right';
};
export type TimePickerObjProps = {
	YYYY: string;
	MM: string;
	DD: string;
	hh: string;
	mm: string;
	ss: string;
};
export type TimePickerTypeProps =
	| 'YYYY'
	| 'MM'
	| 'hh'
	| 'mm'
	| 'ss'
	| 'YYYYMM'
	| 'hhmm'
	| 'mmss'
	| 'YYYYMMDD'
	| 'hhmmss'
	| 'YYYYMMDDhh'
	| 'YYYYMMDDhhmm'
	| 'YYYYMMDDhhmmss';
export type TimePickerProps = {
	visible?: boolean;
	type?: TimePickerTypeProps;
	yearProps?: TimePickerItemProps;
	monthProps?: TimePickerItemProps;
	dayProps?: TimePickerItemProps;
	hourProps?: TimePickerItemProps;
	minuteProps?: TimePickerItemProps;
	secondProps?: TimePickerItemProps;
	initYear?: string;
	initMonth?: string;
	initDay?: string;
	initHour?: string;
	initMinute?: string;
	initSecond?: string;
	minuteStep?: number;
	secondStep?: number;
	yearRange?: [number, number] | [];
	monthRange?: [number, number];
	hourRange?: [number, number];
	minuteRange?: [number, number];
	secondRange?: [number, number];
	showTips?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	yearText?: string;
	monthText?: string;
	dayText?: string;
	hourText?: string;
	minuteText?: string;
	secondText?: string;
	outFormat?: string;
	height?: number;
	popup?: PopupProps | null;
};
export type ToastProps = {
	message?: string;
	visible?: boolean;
	duration?: number;
	position?: 'center' | 'top' | 'bottom';
	py?: '0' | '10' | '20' | '40' | '60' | '80';
	radius?: LargeAreaRadius;
	transitionType?: 'scale' | 'fly' | 'fade' | 'slide' | 'blur' | null;
	transitionParams?: object;
	outDuration?: number;
	easeType?: AnimationEasingProps;
	easeOutType?: AnimationEasingProps;
	type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'icon' | null;
	mask?: MaskProps;
	loading?: LoadingProps;
	icon?: IconProps;
	zIndex?: number;
	clickable?: boolean;
	dynamicFixed?: boolean;
	children?: AnyTdfSnippet;
};
export type FormInputValue = string;
export type FormTimePickerValue = {
	timeStr?: string;
	timeObj?: TimePickerObjProps;
};
export type FormActionSheetValue = {
	action?: ActionProps;
	index?: number;
};
export type FormCalendarValue = {
	dates?: string[];
};
export type FormNumKeyboardValue = string;
export type FormFullKeyboardValue = string;
export type FormPickerValue = {
	items?: {
		[key: string]: string;
	}[];
	indexs?: number[];
	multipleSelected?: PickerMultipleItem[];
};
export type FormColorPickerValue = ColorPickerValue | undefined;
export type FormCheckboxValue = string[];
export type FormRadioValue = string;
export type FormSliderValue = {
	value?: number;
	valueRange?: [number, number];
};
export type FormSwitchValue = boolean;
export type FormStepperValue = number;
export type FormInputProps = {
	type?: 'input';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	input?: InputProps;
};
export type FormTimePickerProps = {
	type?: 'timePicker';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	timePicker?: TimePickerProps;
	input?: InputProps;
};
export type FormActionSheetProps = {
	type?: 'actionSheet';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	actionSheet: ActionSheetProps;
	input?: InputProps;
};
export type FormCalendarProps = {
	type?: 'calendar';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	calendar?: CalendarProps;
	input?: InputProps;
};
export type FormNumKeyboardProps = {
	type?: 'numKeyboard';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	numKeyboard?: NumKeyboardProps;
	input?: InputProps;
};
export type FormFullKeyboardProps = {
	type?: 'fullKeyboard';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	fullKeyboard?: FullKeyboardProps;
	input?: InputProps;
};
export type FormPickerProps = {
	type?: 'picker';
	name: string;
	label: string;
	initValue?: string;
	linkageSeparator?: string;
	required?: boolean;
	picker?: PickerProps;
	input?: InputProps;
};
export type FormColorPickerProps = {
	type?: 'colorPicker';
	name: string;
	label: string;
	initValue?: ColorPickerValue;
	required?: boolean;
	colorPicker?: ColorPickerProps;
	input?: InputProps;
};
export type FormCheckboxProps = {
	type?: 'checkbox';
	name: string;
	label: string;
	initValue?: string[];
	required?: boolean;
	checkbox?: CheckboxProps;
};
export type FormRadioProps = {
	type?: 'radio';
	name: string;
	label: string;
	initValue?: string;
	required?: boolean;
	radio?: RadioProps;
};
export type FormSliderProps = {
	type?: 'slider';
	name: string;
	label: string;
	initValue?: number | number[];
	required?: boolean;
	slider?: SliderProps;
};
export type FormSwitchProps = {
	type?: 'switch';
	name: string;
	label: string;
	initValue?: boolean;
	required?: boolean;
	switch?: SwitchProps;
};
export type FormStepperProps = {
	type?: 'stepper';
	name: string;
	label: string;
	initValue?: number;
	required?: boolean;
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
export type FormProps = {
	form: FormItemProps[];
	submitText?: string;
	submitButton?: ButtonProps;
	resetText?: string | null;
	resetButton?: ButtonProps;
	submitChildren?: AnyTdfSnippet;
	resetChildren?: AnyTdfSnippet;
	space?: '0' | '1' | '2' | '4' | '6' | '8';
	card?: CardProps;
};
export type AnimationEasingProps =
	| 'backIn'
	| 'backInOut'
	| 'backOut'
	| 'bounceIn'
	| 'bounceInOut'
	| 'bounceOut'
	| 'circIn'
	| 'circInOut'
	| 'circOut'
	| 'cubicIn'
	| 'cubicInOut'
	| 'cubicOut'
	| 'elasticIn'
	| 'elasticInOut'
	| 'elasticOut'
	| 'expoIn'
	| 'expoInOut'
	| 'expoOut'
	| 'linear'
	| 'quadIn'
	| 'quadInOut'
	| 'quadOut'
	| 'quartIn'
	| 'quartInOut'
	| 'quartOut'
	| 'quintIn'
	| 'quintInOut'
	| 'quintOut'
	| 'sineIn'
	| 'sineInOut'
	| 'sineOut';
export type ListTransition = 'slideRight' | 'slideUp' | 'fadeScale' | 'stagger' | null;
export type SwipeActionBgColor = 'theme' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type SwipeActionProps = {
	icon?: string;
	text?: string;
	bgColor?: SwipeActionBgColor;
};
export type SwipeHintMode = 'none' | 'first' | 'all';
export type BatchActionProps = {
	text: string;
	status?: 'theme' | 'success' | 'warning' | 'error' | 'info';
};
export type ListProps<T = Record<string, unknown>> = {
	data: T[];
	keyField?: string;
	gap?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	mx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	my?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	transition?: ListTransition;
	transitionDelay?: number;
	batchMode?: boolean;
	batchSelected?: (string | number)[];
	batchSelectable?: boolean;
	batchActions?: BatchActionProps[];
	injClass?: string;
	itemInjClass?: string;
	clickable?: boolean;
	arrow?: boolean;
	divider?: boolean;
	itemRadius?: LargeAreaRadius;
	itemPx?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	itemPy?: '0' | '1' | '2' | '3' | '4' | '6' | '8';
	swipeActions?: SwipeActionProps[];
	swipeHint?: SwipeHintMode;
	swipeThreshold?: number;
	itemChild: AnyTdfSnippet<[item: T, index: number]>;
	headerChild?: AnyTdfSnippet;
	footerChild?: AnyTdfSnippet;
};
export type OklchColor = {
	l: number;
	c: number;
	h: number;
};
export type ColorPickerMode = 'oklch' | 'rgb' | 'hex';
export type ColorPickerValue = OklchColor | [number, number, number] | string;
export type ColorPickerProps = {
	visible?: boolean;
	value?: ColorPickerValue;
	modes?: ColorPickerMode[];
	showPreview?: boolean;
	showPanel?: boolean;
	showInputs?: boolean;
	showCopy?: boolean;
	panelHeight?: number;
	sliderHeight?: number;
	radius?: LargeAreaRadius;
	injClass?: string;
	popup?: PopupProps | null;
	tab?: TabProps;
};
export type TooltipProps = {
	content?: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
	visible?: boolean;
	delay?: number;
	hideDelay?: number;
	arrow?: boolean;
	radius?: SmallAreaRadius;
	state?: 'theme' | 'success' | 'warning' | 'error' | 'info' | 'black';
	maxWidth?: number;
	zIndex?: number;
	disabled?: boolean;
	injClass?: string;
	contentClass?: string;
	children?: AnyTdfSnippet;
	contentSnippet?: AnyTdfSnippet;
};
export type ImagePreviewItemProps = {
	url: string;
	thumbnail?: string;
	alt?: string;
};
export type ImagePreviewClosePosition = 'tl' | 'tr' | 'bl' | 'br';
export type ImagePreviewProps = {
	visible?: boolean;
	images?: string[] | ImagePreviewItemProps[];
	current?: number;
	loop?: boolean;
	swipeDuration?: number;
	minScale?: number;
	maxScale?: number;
	closePosition?: ImagePreviewClosePosition;
	showNavigation?: boolean;
	navigationPosition?: 'center' | 'bottom';
	maskClosable?: boolean;
	showIndex?: boolean;
	indicatorType?: 'dot' | 'number' | null;
	zIndex?: number;
	duration?: number;
	outDuration?: number;
	mask?: MaskProps;
	icon?: IconProps;
	showRotation?: boolean;
	rotationIcon?: IconProps;
	children?: AnyTdfSnippet<[item: ImagePreviewItemProps, index: number]>;
	loadingChild?: AnyTdfSnippet;
	errorChild?: AnyTdfSnippet;
	indexChild?: AnyTdfSnippet<[current: number, total: number]>;
};
export type ImageListStatus = 'pending' | 'uploading' | 'success' | 'error';
export type ImageListItemProps = {
	id: string | number;
	url?: string;
	file?: File;
	status?: ImageListStatus;
	message?: string;
	thumbnail?: string;
};
export type ImageListProps = {
	value?: ImageListItemProps[];
	columns?: 3 | 4 | 5;
	max?: number;
	maxSize?: number;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	deletable?: boolean;
	previewable?: boolean;
	gap?: '0' | '1' | '2' | '3' | '4';
	radius?: SmallAreaRadius;
	aspectRatio?: [number, number];
	uploadText?: string;
	loading?: LoadingProps;
	icon?: IconProps;
	deleteIcon?: IconProps;
	injClass?: string;
	itemInjClass?: string;
	uploadChild?: AnyTdfSnippet;
	itemChild?: AnyTdfSnippet<[item: ImageListItemProps, index: number]>;
	statusChild?: AnyTdfSnippet<[item: ImageListItemProps]>;
};
export type ToastFnOptions = Omit<ToastProps, 'visible' | 'children'>;
export type AlertFnOptions = Omit<AlertProps, 'visible' | 'children'>;
export type DialogFnOptions = Omit<DialogProps, 'visible' | 'contentChild' | 'primaryChild'>;
export type DialogResult = 'primary' | 'secondary' | 'close';
export type ModalFnOptions = Omit<ModalProps, 'visible' | 'contentChild'>;
export type ModalResult = 'confirm' | 'close';
export type LoadingFnOptions = Partial<LoadingProps> & {
	message?: string;
};
export interface ToastFunction {
	(options: ToastFnOptions | string): string;
	success: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	loading: (message: string, options?: Omit<ToastFnOptions, 'message' | 'type'>) => string;
	hide: (id?: string) => void;
	clear: () => void;
}
export interface AlertFunction {
	(options: AlertFnOptions | string): string;
	success: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	error: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	warning: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	info: (message: string, options?: Omit<AlertFnOptions, 'message' | 'type'>) => string;
	hide: (id?: string) => void;
	clear: () => void;
}
export interface DialogFunction {
	(options: DialogFnOptions): Promise<DialogResult>;
	confirm: (content: string, title?: string) => Promise<boolean>;
	close: () => void;
}
export interface ModalFunction {
	(options: ModalFnOptions): Promise<ModalResult>;
	info: (content: string, title?: string) => Promise<ModalResult>;
	close: () => void;
}
export interface LoadingFunction {
	show: (options?: LoadingFnOptions | string) => void;
	hide: () => void;
}
export type SignatureRotation = 0 | 90 | 180 | 270;
export type SignatureResult = {
	dataUrl: string;
	isEmpty: boolean;
};
export type SignatureProps = {
	aspectRatio?: [number, number];
	lineWidth?: number;
	lineColor?: string;
	bgColor?: string;
	radius?: LargeAreaRadius;
	showButtons?: boolean;
	clearText?: string;
	confirmText?: string;
	clearButton?: ButtonProps;
	confirmButton?: ButtonProps;
	imageType?: 'png' | 'jpeg' | 'webp';
	imageQuality?: number;
	injClass?: string;
	canvasClass?: string;
};
