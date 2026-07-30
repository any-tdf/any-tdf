import type { InfoDateProps } from '../types/index.js';
import {
	getCalendarData,
	getCurrentMonth,
	getCurrentQuarter,
	getCurrentWeek,
	getDateRange,
	getDaysRangeWithToday,
	getMonthListRange
} from '../utils/index.js';
import { importantRadiusLeftObj, importantRadiusObj, importantRadiusRightObj, radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const calendarMonthMarkSizeClass = {
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
	'5xl': 'text-5xl',
	'6xl': 'text-6xl',
	'7xl': 'text-7xl',
	'8xl': 'text-8xl',
	'9xl': 'text-9xl'
} as const;

export type CalendarScrollStyleValue = {
	height: string;
};
export type CalendarMonthCardSpacingPriority = 'calendar' | 'card';
export type CalendarMonthCardProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	mx: string;
	my: string;
	overflow: false;
	px: string;
	py: string;
};

// 输入外部可见值，返回组件内部初始可见状态。
// Normalize an external visible value into the component's initial internal visibility state.
export const resolveCalendarInitialVisible = (visible?: boolean): boolean => Boolean(visible);

export const resolveCalendarUsePopup = (popup: unknown): boolean => popup !== null;

// 输入 Calendar 的周起始设置和周索引，返回是否为周末。
// Resolve whether a week index is weekend from Calendar week-start state.
export const resolveCalendarIsWeekend = (startSunday: boolean, index: number): boolean =>
	startSunday ? index === 0 || index === 6 : index === 5 || index === 6;

// 只处理 YYYYMMDD 字符串格式化，不读取日期选择状态或 DOM。
// Only format YYYYMMDD strings without reading selection state or DOM.
export const formatCalendarDate = (format: string, date: string): string => {
	const year = date.slice(0, 4);
	const month = date.slice(4, 6);
	const day = date.slice(6, 8);

	return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
};

export const formatCalendarDates = (format: string, dates: string[]): string[] => dates.map((item) => formatCalendarDate(format, item));

// 输入组件读取到的日期，返回框架无关的 YYYYMMDD 字符串。
// Convert a component-provided Date into a framework-agnostic YYYYMMDD string.
export const resolveCalendarTodayString = (date: Date): string => {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${year}${month}${day}`;
};

export type ResolveCalendarTodayStateOptions = {
	now: Date;
};

export type CalendarTodayState = {
	todayStr: string;
};

// 输入当前时间源，返回 Calendar 可直接消费的日期状态。
// Receive the current time source and return Calendar date state for component binding.
export const resolveCalendarTodayState = ({ now }: ResolveCalendarTodayStateOptions): CalendarTodayState => ({
	todayStr: resolveCalendarTodayString(now)
});

export type ResolveCalendarDayDateStringOptions = {
	dayText: string;
	month: string;
	year: string;
};

// 输入日期单元格状态，返回组件层可直接消费的 Calendar 日期字符串。
// Receive day-cell state and return a Calendar date string ready for component consumption.
export const resolveCalendarDayDateString = ({ dayText, month, year }: ResolveCalendarDayDateStringOptions): string =>
	`${year}${month}${dayText}`;

// 输入日期附加信息，返回组件层可直接渲染的文本。
// Normalize calendar day info into render-ready text for the component layer.
export const resolveCalendarDayInfoText = (info?: string | null): string => info || '';

export const sortCalendarDates = (dates: readonly string[]): string[] => [...dates].sort((a, b) => Number(a) - Number(b));

export const resolveCalendarSelectedDateString = (dates: readonly string[]): string => dates.join(',');

export const resolveCalendarFormattedDates = (format: string, dates: readonly string[]): string[] =>
	dates.length ? formatCalendarDates(format, [...dates]) : [...dates];

export type ResolveCalendarInitialSelectedDatesActionOptions = {
	initSelectedDates?: readonly string[];
};

export type CalendarInitialSelectedDatesAction = {
	selectedDates: string[];
	selectedDateStr: string;
	shouldSync: boolean;
};

// 输入初始化选中日期，返回组件层需要同步的纯状态。
// Receive initial selected dates and return pure state that the component layer should sync.
export const resolveCalendarInitialSelectedDatesAction = ({
	initSelectedDates = []
}: ResolveCalendarInitialSelectedDatesActionOptions = {}): CalendarInitialSelectedDatesAction => {
	const shouldSync = initSelectedDates.length > 0;
	const selectedDates = shouldSync ? sortCalendarDates(initSelectedDates) : [];
	return {
		selectedDates,
		selectedDateStr: resolveCalendarSelectedDateString(selectedDates),
		shouldSync
	};
};

export const resolveCalendarDatesWithoutDisabled = (dates: readonly string[], disabledDates: readonly string[] = []): string[] => {
	if (disabledDates.length === 0) return [...dates];
	const disabledDateSet = new Set(disabledDates);
	return dates.filter((date) => !disabledDateSet.has(date));
};

export const resolveCalendarInitMonthIndex = ({ monthList, initMonth }: { monthList: readonly string[]; initMonth: string }): number => {
	const index = monthList.findIndex((item) => item === initMonth);
	return index < 0 ? 0 : index;
};

export const resolveCalendarQuickSelectScrollIndex = ({
	selectedDates,
	monthList
}: {
	selectedDates: readonly string[];
	monthList: readonly string[];
}): number => {
	if (selectedDates.length === 0) return -1;
	return monthList.findIndex((item) => item === selectedDates[0].slice(0, 6));
};

export type ResolveCalendarMonthScrollActionOptions = {
	index?: number;
	monthCount?: number;
	scrollHeight?: number;
};

export type CalendarMonthScrollAction = {
	scrollTop: number;
	shouldScroll: boolean;
};

// 输入组件层读取到的滚动高度和目标月份索引，返回 Calendar 应写入的滚动位置。
// Receive component-read scroll height and target month index, then return the Calendar scroll position to write.
export const resolveCalendarMonthScrollAction = ({
	index = -1,
	monthCount = 0,
	scrollHeight = 0
}: ResolveCalendarMonthScrollActionOptions): CalendarMonthScrollAction => {
	const shouldScroll = index >= 0 && monthCount > 0;
	return {
		shouldScroll,
		scrollTop: shouldScroll ? scrollHeight * (index / monthCount) : 0
	};
};

export const resolveCalendarTransitionDistance = ({
	calendarHeight,
	hasQuickSelect,
	mode
}: {
	calendarHeight: number;
	hasQuickSelect: boolean;
	mode: string;
}): number => calendarHeight + 40 + 64 + (hasQuickSelect && mode === 'range' ? 36 : 0);

// 只计算日历主体高度，视口读取留在组件层。
// Only calculate calendar body height; viewport reading stays in the component layer.
export const resolveCalendarHeight = ({ viewportHeight = 0, height = 50 }: { viewportHeight?: number; height?: number } = {}): number =>
	(viewportHeight * height) / 100;

// 输入已计算的 Calendar 高度，返回组件层可直接绑定的滚动容器样式。
// Receive the calculated Calendar height and return bind-ready scroll container styles for the component layer.
export const resolveCalendarScrollStyleValue = (calendarHeight = 0): CalendarScrollStyleValue => ({
	height: `${calendarHeight}px`
});

export const resolveCalendarScrollStyleString = (calendarHeight = 0): string => `height:${calendarHeight}px`;

// 输入 Calendar 月份卡片配置，返回组件层可直接透传的卡片 props。
// Resolve Calendar month-card config into props that the component layer can pass through.
export const resolveCalendarMonthCardProps = <T extends Record<string, unknown> = Record<string, unknown>>(
	card: T = {} as T,
	spacingPriority: CalendarMonthCardSpacingPriority = 'calendar'
): CalendarMonthCardProps<T> => {
	const spacing = {
		mx: '0',
		my: '0',
		px: '0',
		py: '2'
	};
	const props = spacingPriority === 'card' ? { ...spacing, ...card } : { ...card, ...spacing };
	return {
		...props,
		overflow: false
	} as CalendarMonthCardProps<T>;
};

export type CalendarTexts = {
	confirmText: string;
	selectedText: string;
	dayText: string;
};

export type CalendarTextDefaults = CalendarTexts;

export type ResolveCalendarTextsOptions = Partial<CalendarTexts> & {
	defaults: CalendarTextDefaults;
};

export type CalendarLocaleDefaults<TWeekText = string> = CalendarTextDefaults & {
	afterText: string;
	beforeText: string;
	currentMonthText: string;
	currentQuarterText: string;
	currentWeekText: string;
	dayText: string;
	weekSundayStartTextList: readonly TWeekText[];
	weekTextList: readonly TWeekText[];
};

export type CalendarWeekItem<TWeekText = string> = {
	className: string;
	index: number;
	isWeekend: boolean;
	text: TWeekText;
};

export type CalendarQuickSelectDerivedItem<TItem extends CalendarQuickSelectItem = CalendarQuickSelectItem> = {
	active: boolean;
	buttonClass: string;
	index: number;
	item: TItem;
	label: string;
};

export type ResolveCalendarDerivedOptions<
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
> = Partial<CalendarTexts> & {
	card?: TCard;
	cardSpacingPriority?: CalendarMonthCardSpacingPriority;
	disabledDates?: readonly string[];
	defaults: CalendarLocaleDefaults<TWeekText>;
	height?: number;
	highlightToday?: boolean;
	infoDates?: readonly InfoDateProps[];
	initMonth?: string;
	isQuickSelect?: boolean;
	mode?: CalendarMode;
	monthCard?: boolean;
	monthMarkSize?: keyof typeof calendarMonthMarkSizeClass | string;
	popup?: TPopup | null;
	quickSelectItem?: CalendarQuickSelectItem | '';
	quickSelects?: readonly TQuickSelect[];
	radius?: CalendarRadius | string;
	selectedDateCount?: number;
	selectedDateStr?: string;
	showSelectedDay?: boolean;
	startMonth?: string;
	endMonth?: string;
	startSunday?: boolean;
	textTone?: CalendarTextTone;
	todayStr?: string;
	useAnimation?: boolean;
	viewportHeight?: number;
	weekendRed?: boolean;
};
export type CalendarStatePropsLike<
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
> = Partial<
	Omit<
		ResolveCalendarDerivedOptions<TPopup, TCard, TWeekText, TQuickSelect>,
		| 'cardSpacingPriority'
		| 'defaults'
		| 'isQuickSelect'
		| 'quickSelectItem'
		| 'selectedDateCount'
		| 'selectedDateStr'
		| 'textTone'
		| 'todayStr'
		| 'viewportHeight'
	>
>;
export type ResolveCalendarStateOptionsParams<
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
> = {
	cardSpacingPriority?: CalendarMonthCardSpacingPriority;
	defaults: CalendarLocaleDefaults<TWeekText>;
	isQuickSelect?: boolean;
	props: CalendarStatePropsLike<TPopup, TCard, TWeekText, TQuickSelect>;
	quickSelectItem?: CalendarQuickSelectItem | '';
	selectedDateCount?: number;
	selectedDateStr?: string;
	textTone?: CalendarTextTone;
	todayStr?: string;
	viewportHeight?: number;
};

export type CalendarDerived<
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
> = {
	allMonthData: CalendarMonthData[];
	calendarHeight: number;
	cellRadiusClass: string;
	dayInfoClass: string;
	dayNumberClass: string;
	disabledMarkClass: string;
	footerClass: string;
	headerClass: string;
	initMonthIndex: number;
	monthContainerClass: string;
	monthCardProps: CalendarMonthCardProps<TCard>;
	monthGridClass: string;
	monthList: string[];
	monthMarkClass: string;
	monthTitleClass: string;
	monthTitleTextClass: string;
	monthViewItems: CalendarMonthViewItem[];
	popupProps: TPopup | Record<string, never>;
	quickSelectListClass: string;
	quickSelectItems: CalendarQuickSelectDerivedItem<TQuickSelect>[];
	scrollClass: string;
	scrollStyleString: string;
	scrollStyleValue: CalendarScrollStyleValue;
	selectedSummary: string;
	showQuickSelect: boolean;
	texts: CalendarTexts;
	transitionDistance: number;
	usePopup: boolean;
	weekRowClass: string;
	weekItems: CalendarWeekItem<TWeekText>[];
	weekTexts: readonly TWeekText[];
};

// 输入组件文案 props 和默认文案，返回框架无关的最终文案。
// Consume component text props and default text, then return framework-agnostic final text.
export const resolveCalendarTexts = ({ confirmText, selectedText, dayText, defaults }: ResolveCalendarTextsOptions): CalendarTexts => ({
	confirmText: confirmText ?? defaults.confirmText,
	selectedText: selectedText ?? defaults.selectedText,
	dayText: dayText ?? defaults.dayText
});

// 输入周起始状态和本地化文本，返回框架无关的星期展示列表。
// Consume week-start state and locale text, then return framework-agnostic week labels.
export const resolveCalendarWeekTexts = <TText>(
	startSunday: boolean,
	weekTextList: readonly TText[],
	weekSundayStartTextList: readonly TText[]
): readonly TText[] => (startSunday ? weekSundayStartTextList : weekTextList);

export const resolveCalendarSurfaceClass = (usePopup: boolean): string => (usePopup ? 'bg-gray-50 dark:bg-gray-800' : '');

export const resolveCalendarHeaderClass = (usePopup: boolean): string =>
	joinClasses(['sticky left-0 top-0 z-10 w-full', resolveCalendarSurfaceClass(usePopup)]);

export const resolveCalendarScrollClass = ({ usePopup, useAnimation }: { useAnimation: boolean; usePopup: boolean }): string =>
	joinClasses([
		'calendar-container flex flex-col gap-4 overflow-y-auto px-4 py-2',
		resolveCalendarSurfaceClass(usePopup),
		useAnimation ? 'scroll-smooth' : 'scroll-auto'
	]);

export const resolveCalendarQuickSelectButtonClass = (active: boolean): string =>
	joinClasses([
		'flex-none rounded-sm bg-bg-surface px-2 py-1 text-xs shadow-sm dark:bg-bg-surface-dark dark:shadow-white/10',
		active && '!bg-primary !text-text-on-primary dark:!bg-dark dark:!text-text-on-dark'
	]);

export const resolveCalendarQuickSelectListClass = (): string => 'calendar-container flex flex-nowrap gap-4 overflow-x-auto px-4 pb-1 pt-2';

export const resolveCalendarWeekRowClass = (): string => 'flex h-10 items-center justify-around gap-1 px-6 text-center leading-10';

export const resolveCalendarWeekTextClass = ({ weekendRed, isWeekend }: { isWeekend: boolean; weekendRed: boolean }): string =>
	joinClasses(['flex-1 font-bold', weekendRed && isWeekend && 'text-error']);

export const resolveCalendarMonthContainerClass = (): string => 'relative';

export const resolveCalendarMonthTitleClass = (): string => 'px-4 pt-4 text-xl text-text-primary/30 dark:text-text-dark/30';

export const resolveCalendarMonthTitleTextClass = (): string => 'mr-2 font-bold text-text-primary dark:text-text-dark';

export const resolveCalendarMonthGridClass = (): string => 'grid grid-cols-7 gap-y-1 p-2 text-center';

export const resolveCalendarDayNumberClass = (): string => 'font-bold';

export const resolveCalendarDayInfoClass = (): string => 'text-xs opacity-50';

export const resolveCalendarDisabledMarkClass = (): string =>
	'absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 text-text-primary/60 opacity-40 dark:text-text-dark';

export const resolveCalendarFooterClass = (): string => 'sticky bottom-0 left-0 z-10 w-full bg-bg-surface dark:bg-bg-surface-dark';

export const resolveCalendarMonthLabel = (monthTextList: readonly string[], month: string | number): string =>
	monthTextList[Number(month) - 1] || '';

export const resolveCalendarDayNumberText = (dayText: string): string | number => (dayText ? Number(dayText) : '');

// 输入选择状态和文案，返回确认按钮内的框架无关摘要文本。
// Consume selection state and labels, then return framework-agnostic confirm summary text.
export const resolveCalendarSelectedSummary = ({
	showSelectedDay,
	mode,
	selectedDateStr,
	selectedDateCount,
	selectedText,
	dayText
}: {
	dayText: string;
	mode: string;
	selectedDateCount: number;
	selectedDateStr: string;
	selectedText: string;
	showSelectedDay: boolean;
}): string =>
	showSelectedDay && mode !== 'single' && selectedDateStr.split(',').length > 0 ? `(${selectedText} ${selectedDateCount} ${dayText})` : '';

export type CalendarQuickSelectItem = string | number;
export type CalendarMode = 'single' | 'range' | 'multiple' | string;
export type CalendarModeFlags = {
	isRange: boolean;
	isMultiple: boolean;
	isSingle: boolean;
};
export type CalendarQuickSelectState = {
	isQuickSelect: true;
	quickSelectItem: CalendarQuickSelectItem;
	selectedDates: string[];
	selectedDateStr: string;
};
export type ResolveCalendarQuickSelectStateOptions = {
	disabledDates?: readonly string[];
	includeToday?: boolean;
	item: CalendarQuickSelectItem;
	startSunday?: boolean;
};
export type ResolveCalendarDayClickStateOptions = {
	dateStr?: string;
	mode?: CalendarMode;
	selectedDates?: readonly string[];
	rangeDates?: readonly string[];
	disabledDates?: readonly string[];
	isQuickSelect?: boolean;
	usePopup?: boolean;
	outFormat?: string;
};
export type CalendarDayClickState = {
	shouldUpdate: boolean;
	selectedDates: string[];
	rangeDates: string[];
	selectedDateStr: string;
	isQuickSelect: boolean;
	confirmDates?: string[];
};
export type ResolveCalendarDayClickFlowOptions = Omit<ResolveCalendarDayClickStateOptions, 'dateStr'> & {
	dayText?: string;
	month: string;
	year: string;
};
export type CalendarDayClickFlow = CalendarDayClickState & {
	dateStr: string;
};
export type ResolveCalendarConfirmActionOptions = {
	outFormat?: string;
	selectedDates?: readonly string[];
};
export type CalendarConfirmAction = {
	confirmDates: string[];
	selectedDates: string[];
	selectedDateStr: string;
	visible: false;
};
export type ResolveCalendarCloseActionOptions = {
	clear?: boolean;
	selectedDates?: readonly string[];
};
export type CalendarCloseAction = {
	selectedDates: string[];
	selectedDateStr: string;
	shouldClear: boolean;
	visible: false;
};
export type ResolveCalendarQuickSelectLabelOptions = {
	item: CalendarQuickSelectItem;
	currentWeekText: string;
	currentMonthText: string;
	currentQuarterText: string;
	beforeText: string;
	afterText: string;
	dayText: string;
};
export type ResolveCalendarQuickSelectScrollFlowOptions = {
	monthList?: readonly string[];
	scrollHeight?: number;
	selectedDates?: readonly string[];
};
export type CalendarQuickSelectScrollFlow = {
	scrollAction: CalendarMonthScrollAction;
	scrollIndex: number;
};
export type ResolveCalendarQuickSelectFlowOptions = ResolveCalendarQuickSelectStateOptions & ResolveCalendarQuickSelectScrollFlowOptions;
export type CalendarQuickSelectFlow = CalendarQuickSelectState & CalendarQuickSelectScrollFlow;

// 输入快捷选择状态和语言文本，返回框架无关的展示文案。
// Receive quick-select state and locale text, then return framework-agnostic display text.
export const resolveCalendarQuickSelectLabel = ({
	item,
	currentWeekText,
	currentMonthText,
	currentQuarterText,
	beforeText,
	afterText,
	dayText
}: ResolveCalendarQuickSelectLabelOptions): string => {
	if (item === 'week') return currentWeekText;
	if (item === 'month') return currentMonthText;
	if (item === 'quarter') return currentQuarterText;
	if (typeof item === 'number' && item < 0) return `${beforeText} ${Math.abs(item)} ${dayText}`;
	if (typeof item === 'number' && item > 0) return `${afterText} ${Math.abs(item)} ${dayText}`;
	return '';
};

export const resolveCalendarModeFlags = (mode: CalendarMode = 'single'): CalendarModeFlags => ({
	isRange: mode === 'range',
	isMultiple: mode === 'multiple',
	isSingle: mode !== 'range' && mode !== 'multiple'
});

export const resolveCalendarMultipleDates = ({
	selectedDates = [],
	dateStr
}: {
	dateStr: string;
	selectedDates?: readonly string[];
}): string[] => (selectedDates.includes(dateStr) ? selectedDates.filter((item) => item !== dateStr) : [...selectedDates, dateStr]);

// 输入 Calendar 快捷选择项，返回过滤和排序后的日期选择状态。
// Resolve a Calendar quick-select item into filtered and sorted selection state.
export const resolveCalendarQuickSelectState = ({
	item,
	startSunday = false,
	includeToday = false,
	disabledDates = []
}: ResolveCalendarQuickSelectStateOptions): CalendarQuickSelectState => {
	let selectedDates: string[] = [];

	if (item === 'week') {
		selectedDates = getCurrentWeek(startSunday);
	} else if (item === 'month') {
		selectedDates = getCurrentMonth();
	} else if (item === 'quarter') {
		selectedDates = getCurrentQuarter();
	} else if (typeof item === 'number' && Number.isInteger(item)) {
		selectedDates = getDaysRangeWithToday(item, includeToday);
	}

	selectedDates = sortCalendarDates(resolveCalendarDatesWithoutDisabled(selectedDates, disabledDates));
	return {
		isQuickSelect: true,
		quickSelectItem: item,
		selectedDates,
		selectedDateStr: resolveCalendarSelectedDateString(selectedDates)
	};
};

// 输入快捷选择状态和滚动上下文，返回组件层可直接应用的纯计算结果。
// Receive quick-select state plus scroll context and return pure results ready for component consumption.
export const resolveCalendarQuickSelectScrollFlow = ({
	selectedDates = [],
	monthList = [],
	scrollHeight = 0
}: ResolveCalendarQuickSelectScrollFlowOptions): CalendarQuickSelectScrollFlow => {
	const scrollIndex = resolveCalendarQuickSelectScrollIndex({ selectedDates, monthList });
	return {
		scrollAction: resolveCalendarMonthScrollAction({ index: scrollIndex, monthCount: monthList.length, scrollHeight }),
		scrollIndex
	};
};

// 输入快捷选择项和组件状态，返回选择状态与滚动目标，不读取 DOM 或触发事件。
// Receive a quick-select item and component state, then return selection state and scroll target without reading DOM or emitting events.
export const resolveCalendarQuickSelectFlow = ({
	monthList,
	scrollHeight,
	...options
}: ResolveCalendarQuickSelectFlowOptions): CalendarQuickSelectFlow => {
	const state = resolveCalendarQuickSelectState(options);
	const scrollFlow = resolveCalendarQuickSelectScrollFlow({ selectedDates: state.selectedDates, monthList, scrollHeight });
	return {
		...state,
		...scrollFlow
	};
};

// 输入日期点击上下文，返回选择状态和可选确认数据，不触发事件。
// Receive date-click context and return selection state plus optional confirm data without emitting events.
export const resolveCalendarDayClickState = ({
	dateStr = '',
	mode = 'single',
	selectedDates = [],
	rangeDates = [],
	disabledDates = [],
	isQuickSelect = false,
	usePopup = true,
	outFormat = 'YYYYMMDD'
}: ResolveCalendarDayClickStateOptions): CalendarDayClickState => {
	if (!dateStr) {
		const currentSelectedDates = [...selectedDates];
		return {
			shouldUpdate: false,
			selectedDates: currentSelectedDates,
			rangeDates: [...rangeDates],
			selectedDateStr: resolveCalendarSelectedDateString(currentSelectedDates),
			isQuickSelect
		};
	}

	const modeFlags = resolveCalendarModeFlags(mode);
	let nextSelectedDates = isQuickSelect ? [] : [...selectedDates];
	let nextRangeDates = [...rangeDates];
	let confirmDates: string[] | undefined;

	if (modeFlags.isRange) {
		nextRangeDates = [...nextRangeDates, dateStr];
		if (nextRangeDates.length === 2) {
			nextRangeDates = sortCalendarDates(nextRangeDates);
			nextSelectedDates = getDateRange(nextRangeDates[0], nextRangeDates[1], [...disabledDates]);
			nextRangeDates = [];
			if (!usePopup) {
				confirmDates = resolveCalendarFormattedDates(outFormat, nextSelectedDates);
			}
		} else {
			nextSelectedDates = nextRangeDates;
		}
	} else if (modeFlags.isMultiple) {
		nextSelectedDates = resolveCalendarMultipleDates({ selectedDates: nextSelectedDates, dateStr });
		if (!usePopup) {
			confirmDates = resolveCalendarFormattedDates(outFormat, sortCalendarDates(nextSelectedDates));
		}
	} else {
		nextSelectedDates = [dateStr];
		if (!usePopup) {
			confirmDates = resolveCalendarFormattedDates(outFormat, nextSelectedDates);
		}
	}

	nextSelectedDates = sortCalendarDates(nextSelectedDates);
	return {
		shouldUpdate: true,
		selectedDates: nextSelectedDates,
		rangeDates: nextRangeDates,
		selectedDateStr: resolveCalendarSelectedDateString(nextSelectedDates),
		isQuickSelect: false,
		confirmDates
	};
};

// 输入日期单元格上下文，返回点击后的日期字符串和选择状态，不处理组件事件。
// Receive day-cell context and return the clicked date string plus selection state without handling component events.
export const resolveCalendarDayClickFlow = ({
	year,
	month,
	dayText = '',
	...options
}: ResolveCalendarDayClickFlowOptions): CalendarDayClickFlow => {
	const dateStr = dayText ? resolveCalendarDayDateString({ year, month, dayText }) : '';
	return {
		dateStr,
		...resolveCalendarDayClickState({
			...options,
			dateStr
		})
	};
};

// 输入确认时的选择状态，返回组件层需要写入的可见性和确认数据。
// Receive selection state on confirm and return visibility plus confirm data for component implementations to apply.
export const resolveCalendarConfirmAction = ({
	outFormat = 'YYYYMMDD',
	selectedDates = []
}: ResolveCalendarConfirmActionOptions): CalendarConfirmAction => {
	const nextSelectedDates = resolveCalendarFormattedDates(outFormat, selectedDates);
	return {
		confirmDates: nextSelectedDates,
		selectedDates: nextSelectedDates,
		selectedDateStr: resolveCalendarSelectedDateString(nextSelectedDates),
		visible: false
	};
};

// 输入关闭配置和当前选择状态，返回组件层需要写入的关闭结果。
// Receive close config and current selection state, then return the close result for component implementations to apply.
export const resolveCalendarCloseAction = ({
	clear = true,
	selectedDates = []
}: ResolveCalendarCloseActionOptions): CalendarCloseAction => {
	const nextSelectedDates = clear ? [] : [...selectedDates];
	return {
		selectedDates: nextSelectedDates,
		selectedDateStr: resolveCalendarSelectedDateString(nextSelectedDates),
		shouldClear: clear,
		visible: false
	};
};

export type CalendarRangeBoundaryOptions = {
	mode: string;
	selectedDateStr: string;
	dateStr: string;
	isStart: boolean;
};

export type CalendarRadius = keyof typeof radiusObj | '';
export type CalendarRangeEdge = 'left' | 'right' | 'all';
export type CalendarTextTone = 'token' | 'plain';
export type CalendarDayData = {
	text: string;
	info?: string;
	disabled?: boolean;
	start?: boolean;
	end?: boolean;
};
export type CalendarMonthData = {
	year: string;
	month: string;
	days: CalendarDayData[];
};
export type CalendarDayViewItem = {
	day: CalendarDayData;
	dayCell: CalendarDayCellDerived;
	index: number;
};
export type CalendarMonthViewItem = CalendarMonthData & {
	dayItems: CalendarDayViewItem[];
	index: number;
};
export type CreateCalendarMonthDataOptions = {
	monthList: string[];
	startSunday?: boolean;
	infoDates?: InfoDateProps[];
	disabledDates?: string[];
};

export type ResolveCalendarDayCellDerivedOptions = {
	dayText?: string;
	dayInfo?: string | null;
	hasInfo?: boolean;
	dayStart?: boolean;
	dayEnd?: boolean;
	dateStr: string;
	selectedDateStr: string;
	radius?: CalendarRadius | string;
	radiusClass?: string;
	mode?: string;
	todayStr?: string;
	highlightToday?: boolean;
	textTone?: CalendarTextTone;
};

export type CalendarDayCellDerived = {
	dateStr?: string;
	infoText: string;
	isSelected: boolean;
	isStart: boolean;
	isEnd: boolean;
	rangeStart: boolean;
	rangeEnd: boolean;
	outerClass: string;
	outerStyle: Record<string, string | undefined> | undefined;
	outerStyleString: string;
	innerClass: string;
};
export type ResolveCalendarDayCellFromDayOptions = Omit<
	ResolveCalendarDayCellDerivedOptions,
	'dayText' | 'hasInfo' | 'dayStart' | 'dayEnd' | 'dateStr'
> & {
	day: Pick<CalendarDayData, 'text' | 'info' | 'start' | 'end'>;
	year: string;
	month: string;
};
export type ResolveCalendarMonthViewItemsOptions = Omit<ResolveCalendarDayCellFromDayOptions, 'day' | 'year' | 'month'> & {
	monthData: readonly CalendarMonthData[];
};

// 输入月份列表和日期标记，返回框架无关的 Calendar 月份数据。
// Convert month list and date markers into framework-agnostic Calendar month data.
export const createCalendarMonthData = ({
	monthList,
	startSunday = false,
	infoDates = [],
	disabledDates = []
}: CreateCalendarMonthDataOptions): CalendarMonthData[] => {
	const infoByDate = new Map(infoDates.map((info) => [info.text, info.info]));
	const disabledDateSet = new Set(disabledDates);

	return monthList.map((monthStr) => {
		const year = monthStr.slice(0, 4);
		const month = monthStr.slice(4);

		return {
			year,
			month,
			days: getCalendarData(monthStr, startSunday).map((text) => {
				const dateStr = `${year}${month}${text}`;
				return {
					text,
					info: resolveCalendarDayInfoText(infoByDate.get(dateStr)),
					disabled: disabledDateSet.has(dateStr),
					start: false,
					end: false
				};
			})
		};
	});
};

export const resolveCalendarRangeBoundary = ({ mode, selectedDateStr, dateStr, isStart }: CalendarRangeBoundaryOptions): boolean => {
	if (mode !== 'range' || !selectedDateStr.includes(dateStr)) return false;
	const dateIndex = selectedDateStr.indexOf(dateStr);
	return isStart ? dateIndex === 0 : dateIndex === selectedDateStr.length - 8;
};

export const resolveCalendarCellRadiusClass = (radius: CalendarRadius | string = ''): string =>
	radius ? radiusObj[radius as keyof typeof radiusObj] || '' : 'rounded-(--radius-form)';

export const resolveCalendarRangeRadiusClass = ({
	radius = '',
	edge
}: {
	radius?: CalendarRadius | string;
	edge: CalendarRangeEdge;
}): string => {
	if (!radius) return '';
	if (edge === 'all') return importantRadiusObj[radius as keyof typeof importantRadiusObj] || '';
	if (edge === 'left') return importantRadiusLeftObj[radius as keyof typeof importantRadiusLeftObj] || '';
	return importantRadiusRightObj[radius as keyof typeof importantRadiusRightObj] || '';
};

export const resolveCalendarDateSelected = (dateStr: string, selectedDateStr: string): boolean =>
	Boolean(dateStr.length === 8 && selectedDateStr.includes(dateStr));

export const resolveCalendarRangeEdge = ({
	mode,
	selectedDateStr,
	dateStr,
	dayStart = false,
	dayEnd = false
}: {
	mode: string;
	selectedDateStr: string;
	dateStr: string;
	dayStart?: boolean;
	dayEnd?: boolean;
}) => {
	const isStart = resolveCalendarRangeBoundary({ mode, selectedDateStr, dateStr, isStart: true });
	const isEnd = resolveCalendarRangeBoundary({ mode, selectedDateStr, dateStr, isStart: false });
	return {
		isStart,
		isEnd,
		rangeStart: isStart || dayStart,
		rangeEnd: isEnd || dayEnd
	};
};

// 输入日期单元格状态，返回框架无关的外层 class。
// Resolve calendar day cell state into framework-agnostic outer classes.
export const resolveCalendarOuterDayClass = ({
	dayText = '',
	isSelected = false,
	radius = '',
	mode = 'single',
	rangeStart = false,
	rangeEnd = false
}: {
	dayText?: string;
	isSelected?: boolean;
	radius?: CalendarRadius | string;
	mode?: string;
	rangeStart?: boolean;
	rangeEnd?: boolean;
} = {}): string => {
	const outerRadiusClass =
		radius && mode === 'range'
			? rangeStart && rangeEnd
				? resolveCalendarRangeRadiusClass({ radius, edge: 'all' })
				: rangeStart
					? resolveCalendarRangeRadiusClass({ radius, edge: 'left' })
					: rangeEnd
						? resolveCalendarRangeRadiusClass({ radius, edge: 'right' })
						: ''
			: radius && mode !== 'range'
				? resolveCalendarRangeRadiusClass({ radius, edge: 'all' })
				: '';

	return joinClasses(['p-px', dayText && 'bg-primary/10 dark:bg-dark/20', !isSelected && '!bg-transparent', outerRadiusClass]);
};

export const resolveCalendarOuterDayStyleValue = ({
	radius = '',
	mode = 'single',
	isSelected = false,
	rangeStart = false,
	rangeEnd = false
}: {
	radius?: CalendarRadius | string;
	mode?: string;
	isSelected?: boolean;
	rangeStart?: boolean;
	rangeEnd?: boolean;
} = {}): Record<string, string | undefined> | undefined => {
	if (radius) return undefined;
	if (mode === 'range') {
		if (!isSelected) return undefined;
		return {
			borderTopLeftRadius: rangeStart ? 'var(--radius-form)' : undefined,
			borderBottomLeftRadius: rangeStart ? 'var(--radius-form)' : undefined,
			borderTopRightRadius: rangeEnd ? 'var(--radius-form)' : undefined,
			borderBottomRightRadius: rangeEnd ? 'var(--radius-form)' : undefined
		};
	}
	return { borderRadius: 'var(--radius-form)' };
};

export const resolveCalendarOuterDayStyleString = (
	options: {
		radius?: CalendarRadius | string;
		mode?: string;
		isSelected?: boolean;
		rangeStart?: boolean;
		rangeEnd?: boolean;
	} = {}
): string => {
	const style = resolveCalendarOuterDayStyleValue(options);
	if (!style) return '';
	if (style.borderRadius) return `border-radius:${style.borderRadius};`;
	return [
		style.borderTopLeftRadius ? `border-top-left-radius:${style.borderTopLeftRadius};` : '',
		style.borderBottomLeftRadius ? `border-bottom-left-radius:${style.borderBottomLeftRadius};` : '',
		style.borderTopRightRadius ? `border-top-right-radius:${style.borderTopRightRadius};` : '',
		style.borderBottomRightRadius ? `border-bottom-right-radius:${style.borderBottomRightRadius};` : ''
	].join('');
};

export const resolveCalendarInnerDayClass = ({
	radiusClass = '',
	dayText = '',
	hasInfo = false,
	mode = 'single',
	isSelected = false,
	isStart = false,
	isEnd = false,
	dateStr = '',
	todayStr = '',
	highlightToday = true,
	textTone = 'plain'
}: {
	radiusClass?: string;
	dayText?: string;
	hasInfo?: boolean;
	mode?: string;
	isSelected?: boolean;
	isStart?: boolean;
	isEnd?: boolean;
	dateStr?: string;
	todayStr?: string;
	highlightToday?: boolean;
	textTone?: CalendarTextTone;
} = {}): string => {
	const selectedTextClass = textTone === 'token' ? 'text-text-on-primary dark:text-text-on-dark' : 'text-white dark:text-black';
	return joinClasses([
		radiusClass,
		'relative flex h-full w-full flex-col justify-center',
		hasInfo ? 'py-1' : 'py-2',
		dayText && mode !== 'range' && isSelected && `bg-primary dark:bg-dark ${selectedTextClass}`,
		dayText && mode === 'range' && isSelected && (isStart || isEnd) && `bg-primary dark:bg-dark ${selectedTextClass}`,
		dayText && mode === 'range' && isSelected && !isStart && !isEnd && 'text-primary dark:text-dark',
		dateStr === todayStr && highlightToday && 'border border-primary dark:border-dark'
	]);
};

// 输入日期单元格状态，返回组件层可直接绑定的 class、style 和范围状态。
// Resolve day cell state into class, style and range data for component bindings.
export const resolveCalendarDayCellDerived = ({
	dayText = '',
	dayInfo = '',
	hasInfo = false,
	dayStart = false,
	dayEnd = false,
	dateStr,
	selectedDateStr,
	radius = '',
	radiusClass = '',
	mode = 'single',
	todayStr = '',
	highlightToday = true,
	textTone = 'plain'
}: ResolveCalendarDayCellDerivedOptions): CalendarDayCellDerived => {
	const isSelected = resolveCalendarDateSelected(dateStr, selectedDateStr);
	const rangeEdge = resolveCalendarRangeEdge({ mode, selectedDateStr, dateStr, dayStart, dayEnd });
	const outerStyle = resolveCalendarOuterDayStyleValue({
		radius,
		mode,
		isSelected,
		rangeStart: rangeEdge.rangeStart,
		rangeEnd: rangeEdge.rangeEnd
	});

	return {
		isSelected,
		infoText: resolveCalendarDayInfoText(dayInfo),
		...rangeEdge,
		outerClass: resolveCalendarOuterDayClass({
			dayText,
			isSelected,
			radius,
			mode,
			rangeStart: rangeEdge.rangeStart,
			rangeEnd: rangeEdge.rangeEnd
		}),
		outerStyle,
		outerStyleString: resolveCalendarOuterDayStyleString({
			radius,
			mode,
			isSelected,
			rangeStart: rangeEdge.rangeStart,
			rangeEnd: rangeEdge.rangeEnd
		}),
		innerClass: resolveCalendarInnerDayClass({
			radiusClass,
			dayText,
			hasInfo,
			mode,
			isSelected,
			isStart: rangeEdge.isStart,
			isEnd: rangeEdge.isEnd,
			dateStr,
			todayStr,
			highlightToday,
			textTone
		})
	};
};

// 输入日期项和月份上下文，返回框架无关的日期单元格派生结果。
// Convert a day item and month context into framework-agnostic day cell derived data.
export const resolveCalendarDayCellFromDay = ({
	day,
	year,
	month,
	...options
}: ResolveCalendarDayCellFromDayOptions): CalendarDayCellDerived => {
	const dateStr = `${year}${month}${day.text}`;
	return {
		dateStr,
		...resolveCalendarDayCellDerived({
			...options,
			dayText: day.text,
			dayInfo: day.info,
			hasInfo: Boolean(day.info),
			dayStart: Boolean(day.start),
			dayEnd: Boolean(day.end),
			dateStr
		})
	};
};

// 输入月份数据和选择状态，返回组件层可直接循环渲染的日期单元格派生列表。
// Receive month data and selection state, then return day-cell derived lists ready for component rendering.
export const resolveCalendarMonthViewItems = ({ monthData, ...options }: ResolveCalendarMonthViewItemsOptions): CalendarMonthViewItem[] =>
	monthData.map((monthItem, index) => ({
		...monthItem,
		index,
		dayItems: monthItem.days.map((day, dayIndex) => ({
			day,
			dayCell: resolveCalendarDayCellFromDay({
				...options,
				day,
				year: monthItem.year,
				month: monthItem.month
			}),
			index: dayIndex
		}))
	}));

export const resolveCalendarMonthMarkClass = ({
	monthMarkSize = '7xl',
	monthCard = true,
	textTone = 'plain'
}: {
	monthMarkSize?: keyof typeof calendarMonthMarkSizeClass | string;
	monthCard?: boolean;
	textTone?: CalendarTextTone;
} = {}): string => {
	const baseTone = textTone === 'token' ? 'text-text-primary/5' : 'text-black/5';
	const darkTone =
		textTone === 'token'
			? monthCard
				? 'dark:text-text-dark/10'
				: 'dark:text-text-dark/5'
			: monthCard
				? 'dark:text-white/10'
				: 'dark:text-white/5';
	return joinClasses([
		'pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-bold',
		resolveClassMapValue(calendarMonthMarkSizeClass, monthMarkSize, '7xl'),
		baseTone,
		darkTone
	]);
};

// 输入组件 props、选择状态和环境数值，返回 Calendar 派生层统一入参。
// Receive component props, selection state and environment values, then return normalized Calendar derivation options.
export const resolveCalendarStateOptions = <
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
>({
	cardSpacingPriority,
	defaults,
	isQuickSelect,
	props,
	quickSelectItem,
	selectedDateCount,
	selectedDateStr,
	textTone,
	todayStr,
	viewportHeight
}: ResolveCalendarStateOptionsParams<TPopup, TCard, TWeekText, TQuickSelect>): ResolveCalendarDerivedOptions<
	TPopup,
	TCard,
	TWeekText,
	TQuickSelect
> => ({
	card: props.card,
	cardSpacingPriority,
	confirmText: props.confirmText,
	selectedText: props.selectedText,
	dayText: props.dayText,
	defaults,
	disabledDates: props.disabledDates,
	height: props.height,
	highlightToday: props.highlightToday,
	infoDates: props.infoDates,
	initMonth: props.initMonth,
	isQuickSelect,
	mode: props.mode,
	monthCard: props.monthCard,
	monthMarkSize: props.monthMarkSize,
	popup: props.popup,
	quickSelectItem,
	quickSelects: props.quickSelects,
	radius: props.radius,
	selectedDateCount,
	selectedDateStr,
	showSelectedDay: props.showSelectedDay,
	startMonth: props.startMonth,
	endMonth: props.endMonth,
	startSunday: props.startSunday,
	textTone,
	todayStr,
	useAnimation: props.useAnimation,
	viewportHeight,
	weekendRed: props.weekendRed
});

// 输入 Calendar 的 props、视口高度和选择状态，返回框架无关的顶层渲染派生结果。
// Receive Calendar props, viewport height and selection state, then return framework-agnostic top-level render derivations.
export const resolveCalendarDerived = <
	TPopup = unknown,
	TCard extends Record<string, unknown> = Record<string, unknown>,
	TWeekText = string,
	TQuickSelect extends CalendarQuickSelectItem = CalendarQuickSelectItem
>({
	card = {} as TCard,
	cardSpacingPriority = 'calendar',
	confirmText,
	selectedText,
	dayText,
	defaults,
	disabledDates = [],
	height = 50,
	highlightToday = true,
	infoDates = [],
	initMonth = '',
	isQuickSelect = false,
	mode = 'single',
	monthCard = true,
	monthMarkSize = '7xl',
	popup,
	quickSelectItem = '',
	quickSelects = [],
	radius = '',
	selectedDateCount = 0,
	selectedDateStr = '',
	showSelectedDay = true,
	startMonth = '',
	endMonth = '',
	startSunday = false,
	textTone = 'plain',
	todayStr = '',
	useAnimation = true,
	viewportHeight = 0,
	weekendRed = false
}: ResolveCalendarDerivedOptions<TPopup, TCard, TWeekText, TQuickSelect>): CalendarDerived<TPopup, TCard, TWeekText, TQuickSelect> => {
	const usePopup = resolveCalendarUsePopup(popup);
	const texts = resolveCalendarTexts({ confirmText, selectedText, dayText, defaults });
	const monthList = getMonthListRange(startMonth, endMonth);
	const calendarHeight = resolveCalendarHeight({ viewportHeight, height });
	const weekTexts = resolveCalendarWeekTexts(startSunday, defaults.weekTextList, defaults.weekSundayStartTextList);
	const hasQuickSelect = quickSelects.length > 0;
	const allMonthData = createCalendarMonthData({ monthList, startSunday, infoDates: [...infoDates], disabledDates: [...disabledDates] });
	const cellRadiusClass = resolveCalendarCellRadiusClass(radius);

	return {
		usePopup,
		popupProps: popup ? popup : {},
		texts,
		monthList,
		initMonthIndex: resolveCalendarInitMonthIndex({ monthList, initMonth }),
		allMonthData,
		dayInfoClass: resolveCalendarDayInfoClass(),
		dayNumberClass: resolveCalendarDayNumberClass(),
		disabledMarkClass: resolveCalendarDisabledMarkClass(),
		footerClass: resolveCalendarFooterClass(),
		monthMarkClass: resolveCalendarMonthMarkClass({ monthMarkSize, monthCard, textTone }),
		monthContainerClass: resolveCalendarMonthContainerClass(),
		monthGridClass: resolveCalendarMonthGridClass(),
		monthTitleClass: resolveCalendarMonthTitleClass(),
		monthTitleTextClass: resolveCalendarMonthTitleTextClass(),
		monthViewItems: resolveCalendarMonthViewItems({
			monthData: allMonthData,
			selectedDateStr,
			radius,
			radiusClass: cellRadiusClass,
			mode,
			todayStr,
			highlightToday,
			textTone
		}),
		cellRadiusClass,
		calendarHeight,
		transitionDistance: resolveCalendarTransitionDistance({ calendarHeight, hasQuickSelect, mode }),
		headerClass: resolveCalendarHeaderClass(usePopup),
		quickSelectListClass: resolveCalendarQuickSelectListClass(),
		scrollClass: resolveCalendarScrollClass({ usePopup, useAnimation }),
		scrollStyleValue: resolveCalendarScrollStyleValue(calendarHeight),
		scrollStyleString: resolveCalendarScrollStyleString(calendarHeight),
		selectedSummary: resolveCalendarSelectedSummary({
			showSelectedDay,
			mode,
			selectedDateStr,
			selectedDateCount,
			selectedText: texts.selectedText,
			dayText: texts.dayText
		}),
		monthCardProps: resolveCalendarMonthCardProps(card, cardSpacingPriority),
		weekTexts,
		weekRowClass: resolveCalendarWeekRowClass(),
		weekItems: weekTexts.map((text, index) => {
			const isWeekend = resolveCalendarIsWeekend(startSunday, index);
			return {
				text,
				index,
				isWeekend,
				className: resolveCalendarWeekTextClass({ weekendRed, isWeekend })
			};
		}),
		showQuickSelect: hasQuickSelect && mode === 'range',
		quickSelectItems: quickSelects.map((item, index) => {
			const active = Boolean(isQuickSelect && quickSelectItem === item);
			return {
				item,
				index,
				active,
				buttonClass: resolveCalendarQuickSelectButtonClass(active),
				label: resolveCalendarQuickSelectLabel({
					item,
					currentWeekText: defaults.currentWeekText,
					currentMonthText: defaults.currentMonthText,
					currentQuarterText: defaults.currentQuarterText,
					beforeText: defaults.beforeText,
					afterText: defaults.afterText,
					dayText: texts.dayText
				})
			};
		})
	};
};
