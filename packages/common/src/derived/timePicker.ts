export const timePickerTypeMap = {
	YYYY: 'YYYY',
	MM: 'MM',
	hh: 'hh',
	mm: 'mm',
	ss: 'ss',
	YYYYMM: 'YYYYMM',
	hhmm: 'hhmm',
	mmss: 'mmss',
	YYYYMMDD: 'YYYYMMDD',
	hhmmss: 'hhmmss',
	YYYYMMDDhh: 'YYYYMMDDhh',
	YYYYMMDDhhmm: 'YYYYMMDDhhmm',
	YYYYMMDDhhmmss: 'YYYYMMDDhhmmss'
} as const;

export type TimePickerLikeValue = {
	YYYY: string;
	MM: string;
	DD: string;
	hh: string;
	mm: string;
	ss: string;
};

export type TimePickerColumnItem = { label: string };

export type TimePickerNowSnapshot = TimePickerLikeValue & {
	yearNumber: number;
};

export type TimePickerColumnVisibility = {
	year: boolean;
	month: boolean;
	day: boolean;
	hour: boolean;
	minute: boolean;
	second: boolean;
};
export type TimePickerTextAlign = 'left' | 'center' | 'right';

export type TimePickerColumnStyleValue = {
	flex: string | number;
};

export type TimePickerTipColumnStyleValue = TimePickerColumnStyleValue & {
	textAlign?: TimePickerTextAlign;
};

export type ResolveTimePickerConfirmValueOptions = {
	type: string;
	outFormat?: string;
	yearData: readonly TimePickerColumnItem[];
	monthData: readonly TimePickerColumnItem[];
	dayData: readonly TimePickerColumnItem[];
	hourData: readonly TimePickerColumnItem[];
	minuteData: readonly TimePickerColumnItem[];
	secondData: readonly TimePickerColumnItem[];
	yearIndex: number;
	monthIndex: number;
	dayIndex: number;
	hourIndex: number;
	minuteIndex: number;
	secondIndex: number;
};

export type TimePickerCancelAction = {
	nextVisible: false;
	shouldCancel: true;
	shouldClose: true;
};

export type TimePickerConfirmAction = {
	nextVisible: false;
	outData: TimePickerLikeValue;
	shouldClose: true;
	shouldConfirm: true;
	timeStr: string;
};
export type ResolveTimePickerCloseActionOptions = {
	emitClose?: boolean;
	shouldClose?: boolean;
};
export type TimePickerCloseAction = {
	nextVisible: false;
	shouldClose: boolean;
	shouldEmitClose: boolean;
};

export type TimePickerTexts = {
	cancelText: string;
	confirmText: string;
	title: string;
	yearText: string;
	monthText: string;
	dayText: string;
	hourText: string;
	minuteText: string;
	secondText: string;
};

export type ResolveTimePickerDayColumnRefreshOptions = {
	reason: 'year' | 'month';
	isTouch?: boolean;
	yearLabel: string | number;
	monthLabel: string | number;
};
export type ResolveTimePickerYearScrollActionOptions = {
	currentTime: TimePickerNowSnapshot;
	index: number;
	isTouch?: boolean;
	monthData: readonly TimePickerColumnItem[];
	monthIndex: number;
	yearData: readonly TimePickerColumnItem[];
};
export type ResolveTimePickerMonthScrollActionOptions = {
	currentTime: TimePickerNowSnapshot;
	index: number;
	isTouch?: boolean;
	monthData: readonly TimePickerColumnItem[];
	yearData: readonly TimePickerColumnItem[];
	yearIndex: number;
};
export type ResolveTimePickerSelectedDayDataOptions = {
	currentTime: TimePickerNowSnapshot;
	monthData: readonly TimePickerColumnItem[];
	monthIndex: number;
	yearData: readonly TimePickerColumnItem[];
	yearIndex: number;
};

export type TimePickerDayColumnRefresh = {
	shouldRefresh: boolean;
	dayData: TimePickerColumnItem[];
	dayIndex: number;
};
export type TimePickerYearScrollAction = {
	nextYearIndex: number;
	refresh: TimePickerDayColumnRefresh;
};
export type TimePickerMonthScrollAction = {
	nextMonthIndex: number;
	refresh: TimePickerDayColumnRefresh;
};

export type TimePickerTextDefaults = {
	defaultCancel: string;
	defaultConfirm: string;
	defaultTitle: string;
	defaultYear: string;
	defaultMonth: string;
	defaultDay: string;
	defaultHour: string;
	defaultMinute: string;
	defaultSecond: string;
};

export type ResolveTimePickerTextsOptions = Partial<TimePickerTexts> & {
	defaults: TimePickerTextDefaults;
};
export type TimePickerPopupConfig<TPopup> = {
	popupProps: TPopup | Record<string, never>;
};
export type TimePickerHeightStyleValue = {
	height: string;
};
export type TimePickerColumnKey = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export type TimePickerColumnPropsLike = {
	align?: TimePickerTextAlign;
	flex?: string | number;
	showRow?: number;
};
export type TimePickerColumnDerived = {
	data: TimePickerColumnItem[];
	initIndex: number;
	key: TimePickerColumnKey;
	rootClass: string;
	safeInitIndex: number;
	styleString: string;
	styleValue: TimePickerColumnStyleValue;
	tipStyleString: string;
	tipStyleValue: TimePickerTipColumnStyleValue;
	tipText: string;
	visible: boolean;
};
export type ResolveTimePickerDerivedOptions<TPopup = unknown> = Partial<TimePickerTexts> & {
	currentTime: TimePickerNowSnapshot;
	currentDayData?: readonly TimePickerColumnItem[];
	dayInitIndex?: number;
	dayProps?: TimePickerColumnPropsLike;
	defaults: TimePickerTextDefaults;
	height?: number;
	hourProps?: TimePickerColumnPropsLike;
	hourRange?: readonly number[];
	initDay?: string | number;
	initHour?: string | number;
	initMinute?: string | number;
	initMonth?: string | number;
	initSecond?: string | number;
	initYear?: string | number;
	minuteProps?: TimePickerColumnPropsLike;
	minuteRange?: readonly number[];
	minuteStep?: number;
	monthProps?: TimePickerColumnPropsLike;
	monthRange?: readonly number[];
	popup?: TPopup | null;
	secondProps?: TimePickerColumnPropsLike;
	secondRange?: readonly number[];
	secondStep?: number;
	showTips?: boolean;
	type?: string;
	viewportHeight?: number;
	yearProps?: TimePickerColumnPropsLike;
	yearRange?: readonly number[];
};
export type TimePickerStatePropsLike<TPopup = unknown> = Partial<
	Omit<ResolveTimePickerDerivedOptions<TPopup>, 'currentDayData' | 'currentTime' | 'dayInitIndex' | 'defaults' | 'viewportHeight'>
>;
export type ResolveTimePickerStateOptionsParams<TPopup = unknown> = {
	currentTime: TimePickerNowSnapshot;
	currentDayData?: readonly TimePickerColumnItem[];
	dayInitIndex?: number;
	defaults: TimePickerTextDefaults;
	props: TimePickerStatePropsLike<TPopup>;
	viewportHeight?: number;
};
export type TimePickerDerived<TPopup = unknown> = {
	baseDayData: TimePickerColumnItem[];
	baseHourData: TimePickerColumnItem[];
	baseMinuteData: TimePickerColumnItem[];
	baseMonthData: TimePickerColumnItem[];
	baseSecondData: TimePickerColumnItem[];
	cancelButtonClass: string;
	columnItems: TimePickerColumnDerived[];
	columnVisibility: TimePickerColumnVisibility;
	columns: Record<TimePickerColumnKey, TimePickerColumnDerived>;
	contentClass: string;
	contentStyleString: string;
	contentStyleValue: TimePickerHeightStyleValue | undefined;
	confirmButtonClass: string;
	currentTime: TimePickerNowSnapshot;
	headerClass: string;
	initDayIndex: number;
	initHourIndex: number;
	initMinuteIndex: number;
	initMonthIndex: number;
	initSecondIndex: number;
	initYearIndex: number;
	inlineHeightStyleString: string;
	inlineHeightStyleValue: TimePickerHeightStyleValue;
	maxShowRows: number;
	popupConfig: TimePickerPopupConfig<TPopup>;
	safeInitDayIndex: number;
	safeInitHourIndex: number;
	safeInitMinuteIndex: number;
	safeInitMonthIndex: number;
	safeInitSecondIndex: number;
	safeInitYearIndex: number;
	tempDayData: TimePickerColumnItem[];
	texts: TimePickerTexts;
	tipItemClass: string;
	tipItems: TimePickerColumnDerived[];
	tipsClass: string;
	transitionDistance: number;
	typeInner: string;
	usePopup: boolean;
	yearData: TimePickerColumnItem[];
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveTimePickerInitialVisible = (visible?: boolean): boolean => Boolean(visible);

export const resolveTimePickerUsePopup = (popup: unknown): boolean => popup !== null;

// 输入 TimePicker 的 Popup 配置，返回组件层可直接消费的透传对象。
// Receive TimePicker Popup config and return pass-through props for the component layer.
export const resolveTimePickerPopupConfig = <TPopup>(popup: TPopup | null | undefined): TimePickerPopupConfig<TPopup> => ({
	popupProps: popup ? popup : {}
});

// 输入组件 props、内部状态和环境数值，返回 TimePicker 派生层统一入参。
// Receive component props, internal state and environment values, then return normalized TimePicker derivation options.
export const resolveTimePickerStateOptions = <TPopup = unknown>({
	currentTime,
	currentDayData,
	dayInitIndex,
	defaults,
	props,
	viewportHeight
}: ResolveTimePickerStateOptionsParams<TPopup>): ResolveTimePickerDerivedOptions<TPopup> => ({
	currentTime,
	currentDayData,
	dayInitIndex,
	defaults,
	type: props.type,
	yearProps: props.yearProps,
	monthProps: props.monthProps,
	dayProps: props.dayProps,
	hourProps: props.hourProps,
	minuteProps: props.minuteProps,
	secondProps: props.secondProps,
	initYear: props.initYear,
	initMonth: props.initMonth,
	initDay: props.initDay,
	initHour: props.initHour,
	initMinute: props.initMinute,
	initSecond: props.initSecond,
	minuteStep: props.minuteStep,
	secondStep: props.secondStep,
	yearRange: props.yearRange,
	monthRange: props.monthRange,
	hourRange: props.hourRange,
	minuteRange: props.minuteRange,
	secondRange: props.secondRange,
	showTips: props.showTips,
	cancelText: props.cancelText,
	confirmText: props.confirmText,
	title: props.title,
	yearText: props.yearText,
	monthText: props.monthText,
	dayText: props.dayText,
	hourText: props.hourText,
	minuteText: props.minuteText,
	secondText: props.secondText,
	height: props.height,
	popup: props.popup,
	viewportHeight
});

export const getTimePickerDayCount = (year: string | number, month: string | number): number =>
	new Date(Number(year), Number(month), 0).getDate();

export const padTimePickerValue = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const createTimePickerRangeData = (start: number, end: number, step = 1, pad = true): TimePickerColumnItem[] => {
	const data: TimePickerColumnItem[] = [];
	for (let value = start; value <= end; value += step) {
		data.push({ label: pad ? padTimePickerValue(value) : `${value}` });
	}
	return data;
};

// 输入组件读取到的时间，返回框架无关的时间快照。
// Convert a component-provided Date into a framework-agnostic time snapshot.
export const resolveTimePickerNowSnapshot = (date: Date): TimePickerNowSnapshot => ({
	YYYY: `${date.getFullYear()}`,
	MM: padTimePickerValue(date.getMonth() + 1),
	DD: padTimePickerValue(date.getDate()),
	hh: padTimePickerValue(date.getHours()),
	mm: padTimePickerValue(date.getMinutes()),
	ss: padTimePickerValue(date.getSeconds()),
	yearNumber: date.getFullYear()
});

export const resolveTimePickerType = (type: string): string =>
	timePickerTypeMap[type as keyof typeof timePickerTypeMap] || timePickerTypeMap.YYYYMMDDhhmmss;

// 输入 TimePicker 类型，返回框架无关的列可见性。
// Resolve TimePicker type into framework-agnostic column visibility.
export const resolveTimePickerColumnVisibility = (type: string): TimePickerColumnVisibility => ({
	year: type.includes('Y'),
	month: type.includes('M'),
	day: type.includes('D'),
	hour: type.includes('h'),
	minute: type.includes('m'),
	second: type.includes('s')
});

// 输入组件文案 props 和默认文案，返回框架无关的最终文案。
// Consume component text props and default text, then return framework-agnostic final text.
export const resolveTimePickerTexts = ({
	cancelText,
	confirmText,
	title,
	yearText,
	monthText,
	dayText,
	hourText,
	minuteText,
	secondText,
	defaults
}: ResolveTimePickerTextsOptions): TimePickerTexts => ({
	cancelText: cancelText ?? defaults.defaultCancel,
	confirmText: confirmText ?? defaults.defaultConfirm,
	title: title ?? defaults.defaultTitle,
	yearText: yearText ?? defaults.defaultYear,
	monthText: monthText ?? defaults.defaultMonth,
	dayText: dayText ?? defaults.defaultDay,
	hourText: hourText ?? defaults.defaultHour,
	minuteText: minuteText ?? defaults.defaultMinute,
	secondText: secondText ?? defaults.defaultSecond
});

export const resolveTimePickerYearData = ({
	yearRange,
	currentYear
}: {
	yearRange: readonly number[];
	currentYear: number;
}): TimePickerColumnItem[] => {
	if (yearRange.length === 2 && yearRange[1] > yearRange[0]) {
		return createTimePickerRangeData(yearRange[0], yearRange[1], 1, false);
	}
	return createTimePickerRangeData(currentYear - 10, currentYear + 10, 1, false);
};

export const resolveTimePickerMonthData = (monthRange: readonly number[]): TimePickerColumnItem[] => {
	if (monthRange.length === 2 && monthRange[1] > monthRange[0] && monthRange[0] >= 1 && monthRange[1] <= 12) {
		return createTimePickerRangeData(monthRange[0], monthRange[1]);
	}
	return createTimePickerRangeData(1, 12);
};

export const resolveTimePickerHourData = (hourRange: readonly number[]): TimePickerColumnItem[] => {
	if (hourRange.length === 2 && hourRange[1] > hourRange[0] && hourRange[0] >= 0 && hourRange[1] <= 23) {
		return createTimePickerRangeData(hourRange[0], hourRange[1]);
	}
	return createTimePickerRangeData(0, 23);
};

export const resolveTimePickerMinuteData = ({
	minuteRange,
	minuteStep
}: {
	minuteRange: readonly number[];
	minuteStep: number;
}): TimePickerColumnItem[] => {
	if (minuteRange.length === 2 && minuteRange[1] > minuteRange[0] && minuteRange[0] >= 0 && minuteRange[1] <= 59) {
		return createTimePickerRangeData(minuteRange[0], minuteRange[1], minuteStep);
	}
	return createTimePickerRangeData(0, 59, minuteStep);
};

export const resolveTimePickerSecondData = ({
	secondRange,
	secondStep
}: {
	secondRange: readonly number[];
	secondStep: number;
}): TimePickerColumnItem[] => {
	if (secondRange.length === 2 && secondRange[1] > secondRange[0] && secondRange[0] >= 0 && secondRange[1] <= 59) {
		return createTimePickerRangeData(secondRange[0], secondRange[1], secondStep);
	}
	return createTimePickerRangeData(0, 59, secondStep);
};

export const resolveTimePickerDayData = ({ year, month }: { year: string | number; month: string | number }): TimePickerColumnItem[] =>
	createTimePickerRangeData(1, getTimePickerDayCount(year, month));

// 输入当前年月索引和列数据，返回框架无关的天数列数据。
// Consume current year/month indexes and column data, then return framework-agnostic day column data.
export const resolveTimePickerSelectedDayData = ({
	currentTime,
	monthData,
	monthIndex,
	yearData,
	yearIndex
}: ResolveTimePickerSelectedDayDataOptions): TimePickerColumnItem[] =>
	resolveTimePickerDayData({
		year: yearData[resolveTimePickerSafeIndex(yearIndex)]?.label || currentTime.YYYY,
		month: monthData[resolveTimePickerSafeIndex(monthIndex)]?.label || currentTime.MM
	});

// 输入年月滚动状态，返回是否需要重置并刷新天数列。
// Receive year/month scroll state and return whether the day column should reset and refresh.
export const resolveTimePickerDayColumnRefresh = ({
	reason,
	isTouch = false,
	yearLabel,
	monthLabel
}: ResolveTimePickerDayColumnRefreshOptions): TimePickerDayColumnRefresh => {
	const shouldRefresh = Boolean(isTouch && (reason === 'month' || `${monthLabel}` === '02'));
	return {
		shouldRefresh,
		dayData: shouldRefresh ? resolveTimePickerDayData({ year: yearLabel, month: monthLabel }) : [],
		dayIndex: 0
	};
};

// 输入滚动列状态，返回组件实现需要写入的索引和天数列刷新计划。
// Receive scrolled column state and return the next index plus day-column refresh plan for component implementations.
export const resolveTimePickerYearScrollAction = ({
	currentTime,
	index,
	isTouch,
	monthData,
	monthIndex,
	yearData
}: ResolveTimePickerYearScrollActionOptions): TimePickerYearScrollAction => ({
	nextYearIndex: index,
	refresh: resolveTimePickerDayColumnRefresh({
		reason: 'year',
		isTouch,
		yearLabel: yearData[resolveTimePickerSafeIndex(index)]?.label || currentTime.YYYY,
		monthLabel: monthData[resolveTimePickerSafeIndex(monthIndex)]?.label || currentTime.MM
	})
});

export const resolveTimePickerMonthScrollAction = ({
	currentTime,
	index,
	isTouch,
	monthData,
	yearData,
	yearIndex
}: ResolveTimePickerMonthScrollActionOptions): TimePickerMonthScrollAction => ({
	nextMonthIndex: index,
	refresh: resolveTimePickerDayColumnRefresh({
		reason: 'month',
		isTouch,
		yearLabel: yearData[resolveTimePickerSafeIndex(yearIndex)]?.label || currentTime.YYYY,
		monthLabel: monthData[resolveTimePickerSafeIndex(index)]?.label || currentTime.MM
	})
});

export const resolveTimePickerMaxShowRows = (...showRows: Array<number | undefined>): number =>
	Math.max(...showRows.map((showRow) => showRow || 5));

export const resolveTimePickerTransitionDistance = ({ maxShowRows, showTips }: { maxShowRows: number; showTips: boolean }): number =>
	(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41 + (showTips ? 32 : 0);

// 只计算内联模式高度，视口读取留在组件层。
// Only calculate inline mode height; viewport reading stays in the component layer.
export const resolveTimePickerInlineHeight = ({
	viewportHeight = 0,
	height = 30
}: { viewportHeight?: number; height?: number } = {}): number => (viewportHeight * height) / 100;

export const resolveTimePickerInlineHeightStyleValue = (options: { viewportHeight?: number; height?: number } = {}) => ({
	height: `${resolveTimePickerInlineHeight(options)}px`
});

export const resolveTimePickerInlineHeightStyleString = (options: { viewportHeight?: number; height?: number } = {}) =>
	`height:${resolveTimePickerInlineHeight(options)}px`;

// 输入弹层状态和内联高度配置，返回内容容器可直接绑定的高度样式。
// Receive popup state and inline height options, then return bind-ready content height styles.
export const resolveTimePickerContentStyleValue = ({
	usePopup = true,
	viewportHeight = 0,
	height = 30
}: { usePopup?: boolean; viewportHeight?: number; height?: number } = {}): TimePickerHeightStyleValue | undefined =>
	usePopup ? undefined : resolveTimePickerInlineHeightStyleValue({ viewportHeight, height });

export const resolveTimePickerContentStyleString = ({
	usePopup = true,
	viewportHeight = 0,
	height = 30
}: { usePopup?: boolean; viewportHeight?: number; height?: number } = {}): string =>
	usePopup ? '' : resolveTimePickerInlineHeightStyleString({ viewportHeight, height });

// 输入 TimePicker 列配置，返回组件层可直接绑定的列宽样式。
// Receive TimePicker column config and return bind-ready column width styles for the component layer.
export const resolveTimePickerColumnStyleValue = ({ flex }: { flex?: string | number } = {}): TimePickerColumnStyleValue => ({
	flex: flex || 1
});

export const resolveTimePickerColumnStyleString = ({ flex }: { flex?: string | number } = {}): string => `flex:${flex || 1}`;

export const resolveTimePickerHeaderClass = () =>
	'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark';

export const resolveTimePickerCancelButtonClass = () => 'h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60';

export const resolveTimePickerConfirmButtonClass = () => 'text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10';

export const resolveTimePickerTipsClass = () =>
	'flex h-8 items-center justify-around gap-1 bg-bg-surface text-center text-sm leading-8 text-black/60 dark:bg-bg-surface-dark dark:text-white/60';

export const resolveTimePickerTipItemClass = () => 'px-2';

export const resolveTimePickerContentClass = () => 'flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark';

export const resolveTimePickerColumnRootClass = () => 'truncate';

// 输入 TimePicker 提示列配置，返回列宽和对齐样式；文案渲染仍留在组件层。
// Receive TimePicker tip column config and return width and alignment styles; text rendering stays in the component layer.
export const resolveTimePickerTipColumnStyleValue = ({
	flex,
	align
}: { flex?: string | number; align?: TimePickerTextAlign } = {}): TimePickerTipColumnStyleValue => ({
	flex: flex || 1,
	...(align ? { textAlign: align } : {})
});

export const resolveTimePickerTipColumnStyleString = ({
	flex,
	align
}: { flex?: string | number; align?: TimePickerTextAlign } = {}): string => `flex:${flex || 1}${align ? `;text-align:${align}` : ''}`;

export const resolveTimePickerInitialIndex = ({
	data,
	initValue,
	currentValue
}: {
	data: readonly TimePickerColumnItem[];
	initValue?: string | number;
	currentValue: string | number;
}): number => data.findIndex((item) => item.label === (initValue === '' || initValue === undefined ? currentValue : initValue).toString());

export const resolveTimePickerSafeIndex = (index: number): number => Math.max(index, 0);

export const resolveTimePickerDefaultOutFormat = (type: string): string => {
	const defaultOutFormat = type
		.replace(/YYYY/g, 'YYYY-')
		.replace(/MM/g, 'MM-')
		.replace(/DD/g, 'DD ')
		.replace(/hh/g, 'hh:')
		.replace(/mm/g, 'mm:')
		.replace(/ss/g, 'ss');
	return defaultOutFormat.endsWith('-') || defaultOutFormat.endsWith(':') || defaultOutFormat.endsWith(' ')
		? defaultOutFormat.slice(0, -1)
		: defaultOutFormat;
};

// 输入选择索引和列数据，返回框架无关的确认结果。
// Consume selected indexes and column data, then return a framework-agnostic confirm result.
export const resolveTimePickerConfirmValue = ({
	type,
	outFormat = '',
	yearData,
	monthData,
	dayData,
	hourData,
	minuteData,
	secondData,
	yearIndex,
	monthIndex,
	dayIndex,
	hourIndex,
	minuteIndex,
	secondIndex
}: ResolveTimePickerConfirmValueOptions): { timeStr: string; outData: TimePickerLikeValue } => {
	const outData: TimePickerLikeValue = { YYYY: '', MM: '', DD: '', hh: '', mm: '', ss: '' };
	if (type.includes('YYYY')) outData.YYYY = yearData[yearIndex]?.label || '';
	if (type.includes('MM')) outData.MM = monthData[monthIndex]?.label || '';
	if (type.includes('DD')) outData.DD = dayData[dayIndex]?.label || '';
	if (type.includes('hh')) outData.hh = hourData[hourIndex]?.label || '';
	if (type.includes('mm')) outData.mm = minuteData[minuteIndex]?.label || '';
	if (type.includes('ss')) outData.ss = secondData[secondIndex]?.label || '';
	return {
		timeStr: formatTimePickerValue(outFormat || resolveTimePickerDefaultOutFormat(type), outData),
		outData
	};
};

// 输入取消动作，返回组件层可消费的关闭与回调决策。
// Resolve a cancel action into close and callback decisions for component usage.
export const resolveTimePickerCancelAction = (): TimePickerCancelAction => ({
	nextVisible: false,
	shouldCancel: true,
	shouldClose: true
});

// 输入 TimePicker 关闭请求，返回组件层可写入的关闭动作。
// Receive a TimePicker close request and return a close action for the component layer.
export const resolveTimePickerCloseAction = ({
	emitClose = true,
	shouldClose = true
}: ResolveTimePickerCloseActionOptions = {}): TimePickerCloseAction => ({
	nextVisible: false,
	shouldClose,
	shouldEmitClose: shouldClose && emitClose
});

// 输入当前时间选择状态，返回组件层可消费的确认动作结果。
// Consume current time selection state and return a confirm action result for component usage.
export const resolveTimePickerConfirmAction = (options: ResolveTimePickerConfirmValueOptions): TimePickerConfirmAction => {
	const { timeStr, outData } = resolveTimePickerConfirmValue(options);
	return {
		nextVisible: false,
		outData,
		shouldClose: true,
		shouldConfirm: true,
		timeStr
	};
};

// 输入 TimePicker 当前对象，返回框架无关的格式化时间字符串。
// Resolve TimePicker value object into a framework-agnostic formatted string.
export const formatTimePickerValue = (format: string, timeObj: TimePickerLikeValue): string => {
	const { YYYY, MM, DD, hh, mm, ss } = timeObj;
	return format.replace('YYYY', YYYY).replace('MM', MM).replace('DD', DD).replace('hh', hh).replace('mm', mm).replace('ss', ss);
};

const createTimePickerColumnDerived = ({
	data,
	initIndex,
	key,
	props = {},
	tipText,
	visible
}: {
	data: TimePickerColumnItem[];
	initIndex: number;
	key: TimePickerColumnKey;
	props?: TimePickerColumnPropsLike;
	tipText: string;
	visible: boolean;
}): TimePickerColumnDerived => ({
	data,
	initIndex,
	key,
	rootClass: resolveTimePickerColumnRootClass(),
	safeInitIndex: resolveTimePickerSafeIndex(initIndex),
	styleString: resolveTimePickerColumnStyleString({ flex: props.flex }),
	styleValue: resolveTimePickerColumnStyleValue({ flex: props.flex }),
	tipStyleString: resolveTimePickerTipColumnStyleString({ flex: props.flex, align: props.align }),
	tipStyleValue: resolveTimePickerTipColumnStyleValue({ flex: props.flex, align: props.align }),
	tipText,
	visible
});

// 输入 TimePicker 的 props、当前时间快照和组件层状态，返回框架无关的列数据、样式和展示派生。
// Receive TimePicker props, current time snapshot and component-layer state, then return framework-agnostic column data, styles and display derivations.
export const resolveTimePickerDerived = <TPopup = unknown>({
	cancelText,
	confirmText,
	currentDayData,
	currentTime,
	dayInitIndex,
	dayProps = {},
	dayText,
	defaults,
	height = 30,
	hourProps = {},
	hourRange = [0, 23],
	hourText,
	initDay = '',
	initHour = '',
	initMinute = '',
	initMonth = '',
	initSecond = '',
	initYear = '',
	minuteProps = {},
	minuteRange = [0, 59],
	minuteStep = 1,
	minuteText,
	monthProps = {},
	monthRange = [1, 12],
	monthText,
	popup = {} as TPopup,
	secondProps = {},
	secondRange = [0, 59],
	secondStep = 1,
	secondText,
	showTips = true,
	title,
	type = 'YYYYMMDDhhmmss',
	viewportHeight = 0,
	yearProps = {},
	yearRange = [],
	yearText
}: ResolveTimePickerDerivedOptions<TPopup>): TimePickerDerived<TPopup> => {
	const texts = resolveTimePickerTexts({
		cancelText,
		confirmText,
		title,
		yearText,
		monthText,
		dayText,
		hourText,
		minuteText,
		secondText,
		defaults
	});
	const typeInner = resolveTimePickerType(type);
	const columnVisibility = resolveTimePickerColumnVisibility(typeInner);
	const yearData = resolveTimePickerYearData({ yearRange, currentYear: currentTime.yearNumber });
	const baseMonthData = resolveTimePickerMonthData(monthRange);
	const baseHourData = resolveTimePickerHourData(hourRange);
	const baseMinuteData = resolveTimePickerMinuteData({ minuteRange, minuteStep });
	const baseSecondData = resolveTimePickerSecondData({ secondRange, secondStep });
	const tempDayData = resolveTimePickerDayData({ year: currentTime.YYYY, month: currentTime.MM });
	const baseDayData = currentDayData ? [...currentDayData] : tempDayData;
	const initYearIndex = resolveTimePickerInitialIndex({ data: yearData, initValue: initYear, currentValue: currentTime.YYYY });
	const initMonthIndex = resolveTimePickerInitialIndex({ data: baseMonthData, initValue: initMonth, currentValue: currentTime.MM });
	const initDayIndex =
		dayInitIndex ?? resolveTimePickerInitialIndex({ data: tempDayData, initValue: initDay, currentValue: currentTime.DD });
	const initHourIndex = resolveTimePickerInitialIndex({ data: baseHourData, initValue: initHour, currentValue: currentTime.hh });
	const initMinuteIndex = resolveTimePickerInitialIndex({ data: baseMinuteData, initValue: initMinute, currentValue: currentTime.mm });
	const initSecondIndex = resolveTimePickerInitialIndex({ data: baseSecondData, initValue: initSecond, currentValue: currentTime.ss });
	const maxShowRows = resolveTimePickerMaxShowRows(
		yearProps.showRow,
		monthProps.showRow,
		dayProps.showRow,
		hourProps.showRow,
		minuteProps.showRow,
		secondProps.showRow
	);
	const columns: Record<TimePickerColumnKey, TimePickerColumnDerived> = {
		year: createTimePickerColumnDerived({
			key: 'year',
			data: yearData,
			initIndex: initYearIndex,
			props: yearProps,
			tipText: texts.yearText,
			visible: columnVisibility.year
		}),
		month: createTimePickerColumnDerived({
			key: 'month',
			data: baseMonthData,
			initIndex: initMonthIndex,
			props: monthProps,
			tipText: texts.monthText,
			visible: columnVisibility.month
		}),
		day: createTimePickerColumnDerived({
			key: 'day',
			data: baseDayData,
			initIndex: initDayIndex,
			props: dayProps,
			tipText: texts.dayText,
			visible: columnVisibility.day
		}),
		hour: createTimePickerColumnDerived({
			key: 'hour',
			data: baseHourData,
			initIndex: initHourIndex,
			props: hourProps,
			tipText: texts.hourText,
			visible: columnVisibility.hour
		}),
		minute: createTimePickerColumnDerived({
			key: 'minute',
			data: baseMinuteData,
			initIndex: initMinuteIndex,
			props: minuteProps,
			tipText: texts.minuteText,
			visible: columnVisibility.minute
		}),
		second: createTimePickerColumnDerived({
			key: 'second',
			data: baseSecondData,
			initIndex: initSecondIndex,
			props: secondProps,
			tipText: texts.secondText,
			visible: columnVisibility.second
		})
	};
	const columnItems = (['year', 'month', 'day', 'hour', 'minute', 'second'] as const)
		.map((key) => columns[key])
		.filter((column) => column.visible);
	const usePopup = resolveTimePickerUsePopup(popup);

	return {
		baseDayData,
		baseHourData,
		baseMinuteData,
		baseMonthData,
		baseSecondData,
		cancelButtonClass: resolveTimePickerCancelButtonClass(),
		columnItems,
		columnVisibility,
		columns,
		contentClass: resolveTimePickerContentClass(),
		contentStyleString: resolveTimePickerContentStyleString({ usePopup, viewportHeight, height }),
		contentStyleValue: resolveTimePickerContentStyleValue({ usePopup, viewportHeight, height }),
		confirmButtonClass: resolveTimePickerConfirmButtonClass(),
		currentTime,
		headerClass: resolveTimePickerHeaderClass(),
		initDayIndex,
		initHourIndex,
		initMinuteIndex,
		initMonthIndex,
		initSecondIndex,
		initYearIndex,
		inlineHeightStyleString: resolveTimePickerInlineHeightStyleString({ viewportHeight, height }),
		inlineHeightStyleValue: resolveTimePickerInlineHeightStyleValue({ viewportHeight, height }),
		maxShowRows,
		popupConfig: resolveTimePickerPopupConfig<TPopup>(popup),
		safeInitDayIndex: resolveTimePickerSafeIndex(initDayIndex),
		safeInitHourIndex: resolveTimePickerSafeIndex(initHourIndex),
		safeInitMinuteIndex: resolveTimePickerSafeIndex(initMinuteIndex),
		safeInitMonthIndex: resolveTimePickerSafeIndex(initMonthIndex),
		safeInitSecondIndex: resolveTimePickerSafeIndex(initSecondIndex),
		safeInitYearIndex: resolveTimePickerSafeIndex(initYearIndex),
		tempDayData,
		texts,
		tipItemClass: resolveTimePickerTipItemClass(),
		tipItems: showTips ? columnItems : [],
		tipsClass: resolveTimePickerTipsClass(),
		transitionDistance: resolveTimePickerTransitionDistance({ maxShowRows, showTips }),
		typeInner,
		usePopup,
		yearData
	};
};
