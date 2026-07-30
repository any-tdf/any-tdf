import React, { useState, useEffect, useRef } from 'react';
import {
	resolveCalendarDayNumberText,
	resolveCalendarDayClickFlow,
	resolveCalendarCloseAction,
	resolveCalendarConfirmAction,
	resolveCalendarDerived,
	resolveCalendarInitialVisible,
	resolveCalendarInitialSelectedDatesAction,
	resolveCalendarMonthLabel,
	resolveCalendarMonthScrollAction,
	resolveCalendarQuickSelectFlow,
	resolveCalendarStateOptions,
	resolveCalendarTodayState
} from '@any-tdf/common/derived/calendar';
import Popup from '../popup';
import Button from '../button';
import Card from '../card';
import { useConfig } from '../config-provider';
import { getNowBeforeOrAfterMonth } from '@any-tdf/common/utils';
import { splitButtonCallbacks, splitPopupCallbacks } from '@any-tdf/common/derived/props';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { zh_CN } from '../../lang';
import type { CalendarProps } from '../../types';
import { calendarDisabledSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

/**
 * Calendar 日历组件
 * Calendar component for date selection
 *
 * 支持单选、多选、范围选择等多种模式
 * Supports single, multiple, and range selection modes
 */
export const Calendar: React.FC<CalendarProps> = ({
	visible = false,
	startMonth = getNowBeforeOrAfterMonth(-6),
	endMonth = getNowBeforeOrAfterMonth(6),
	initMonth = getNowBeforeOrAfterMonth(0),
	initSelectedDates = [],
	mode = 'single',
	startSunday = false,
	weekendRed = false,
	monthCard = true,
	monthMark = false,
	monthMarkSize = '7xl',
	height = 50,
	infoDates = [],
	disabledDates = [],
	radius = '',
	showSelectedDay = true,
	confirmText,
	selectedText,
	dayText,
	quickSelects = [],
	includeToday = false,
	useAnimation = true,
	highlightToday = true,
	outFormat = 'YYYYMMDD',
	popup = {},
	button = {},
	card = {},
	clear = true,
	onConfirm,
	onClose
}) => {
	const { locale } = useConfig();
	const calendarLang = locale?.calendar || zh_CN.calendar;
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
	const { buttonProps, buttonOnClick } = splitButtonCallbacks(button);
	const [internalVisible, setInternalVisible] = useState(() => resolveCalendarInitialVisible(visible));

	// 当天日期字符串，YYYYMMDD，月和日不足两位时前面补 0。
	// Today's date string, YYYYMMDD, month and day are padded to two digits.
	const todayState = resolveCalendarTodayState({ now: new Date() });
	const todayStr = todayState.todayStr;

	// 滚动元素 / Scroll element
	const scrollElement = useRef<HTMLDivElement>(null);

	// 是否点击了快速选择 / Whether to click the quick selection
	const [isQuickSelect, setIsQuickSelect] = useState(false);

	// 选中的日期 / Selected date
	const [selectedDate, setSelectedDate] = useState<string[]>([]);

	// 范围选择时，点击的开始与结束 / When range selection is clicked, the beginning and end are clicked
	const [rangeArr, setRangeArr] = useState<string[]>([]);

	// selectedDate 字符串 / selectedDate string
	const [selectedDateStr, setSelectedDateStr] = useState('');

	// 快速选择项目 / Quick selection item
	const [quickSelectItem, setQuickSelectItem] = useState<string | number>('');
	const safeInnerHeight = resolveViewportDimension({
		value: typeof window !== 'undefined' ? window.innerHeight : undefined
	});

	// 公共派生层只处理 Calendar 文案、月份数据、日期单元格和摘要，选择状态与 DOM 滚动留在组件内。
	// Shared derived layer handles Calendar text, month data, day cells and summary; selection state and DOM scrolling stay in the component.
	const calendarState = resolveCalendarDerived(
		resolveCalendarStateOptions({
			defaults: calendarLang,
			props: {
				startMonth,
				endMonth,
				initMonth,
				startSunday,
				weekendRed,
				mode,
				monthCard,
				monthMarkSize,
				height,
				infoDates,
				disabledDates,
				radius,
				showSelectedDay,
				confirmText,
				selectedText,
				dayText,
				quickSelects,
				useAnimation,
				popup: popup === null ? null : popupProps,
				card,
				highlightToday
			},
			viewportHeight: safeInnerHeight,
			isQuickSelect,
			quickSelectItem,
			cardSpacingPriority: 'card',
			selectedDateStr,
			selectedDateCount: selectedDate.length,
			todayStr,
			textTone: 'plain'
		})
	);

	// 点击日期事件 / Click date event
	const clickDayFunc = (
		year: string,
		month: string,
		days: { text: string; info?: string; disabled?: boolean; start?: boolean; end?: boolean }
	) => {
		// 公共流程计算日期字符串和点击后的选择状态，事件派发留在组件层。
		// Shared flow computes the date string and selection state after a date click; event dispatch stays in the component layer.
		const nextState = resolveCalendarDayClickFlow({
			year,
			month,
			dayText: days.text,
			mode,
			selectedDates: selectedDate,
			rangeDates: rangeArr,
			disabledDates,
			isQuickSelect,
			usePopup: calendarState.usePopup,
			outFormat
		});
		if (!nextState.shouldUpdate) return;
		setIsQuickSelect(nextState.isQuickSelect);
		setSelectedDate(nextState.selectedDates);
		setSelectedDateStr(nextState.selectedDateStr);
		setRangeArr(nextState.rangeDates);
		if (nextState.confirmDates) {
			onConfirm?.(nextState.confirmDates);
		}
	};

	// 点击快速选择 / Click quick selection
	const quickSelectFunc = (type: string | number) => {
		// 公共流程返回快捷选择状态和滚动目标，真实滚动写入留在组件层。
		// Shared flow returns quick-select state and scroll target while the real scroll write stays in the component layer.
		const action = resolveCalendarQuickSelectFlow({
			item: type,
			startSunday,
			includeToday,
			disabledDates,
			monthList: calendarState.monthList,
			scrollHeight: scrollElement.current?.scrollHeight || 0
		});
		setIsQuickSelect(action.isQuickSelect);
		setQuickSelectItem(action.quickSelectItem);
		const newSelectedDate = action.selectedDates;
		setSelectedDate(newSelectedDate);
		setSelectedDateStr(action.selectedDateStr);

		// 对快速选择做自动滚动 / Automatic scrolling for quick selection
		if (scrollElement.current && action.scrollAction.shouldScroll) {
			scrollElement.current.scrollTop = action.scrollAction.scrollTop;
		}
	};

	// 点击确定事件 / Click the confirm event
	const confirmFunc = () => {
		// 公共 action 只返回确认后的状态和日期数据，事件派发留在组件层。
		// Shared action only returns confirmed state and date data; event dispatch stays in the component layer.
		const action = resolveCalendarConfirmAction({ outFormat, selectedDates: selectedDate });
		setInternalVisible(action.visible);
		onConfirm?.(action.confirmDates);
		closeFunc();
	};

	// 关闭弹窗事件 / Close popup event
	const closeFunc = () => {
		// 公共 action 只返回关闭后的选择状态，组件层负责写入状态和派发事件。
		// Shared action only returns selection state after close; the component layer writes state and emits events.
		const action = resolveCalendarCloseAction({ clear, selectedDates: selectedDate });
		setInternalVisible(action.visible);
		setSelectedDate(action.selectedDates);
		setSelectedDateStr(action.selectedDateStr);
		onClose?.();
	};

	const handlePopupClose = () => {
		closeFunc();
		popupOnClose?.();
	};

	useEffect(() => {
		setInternalVisible(resolveCalendarInitialVisible(visible));
	}, [visible]);

	useEffect(() => {
		// 公共 action 只返回初始化日期同步结果，组件层负责写入本地状态。
		// Shared action only returns initial date sync results; local state writes stay in the component layer.
		const action = resolveCalendarInitialSelectedDatesAction({ initSelectedDates });
		if (action.shouldSync) {
			setSelectedDate(action.selectedDates);
			setSelectedDateStr(action.selectedDateStr);
		}
	}, [initSelectedDates]);

	// 根据 initMonthIndex 在 monthList 中的索引，自动滚动到 scrollElement 高度的百分比
	// Automatically scroll to the percentage of the height of scrollElement according to the index of initMonthIndex in monthList
	useEffect(() => {
		if (scrollElement.current && internalVisible && !isQuickSelect) {
			const scrollAction = resolveCalendarMonthScrollAction({
				index: calendarState.initMonthIndex,
				monthCount: calendarState.monthList.length,
				scrollHeight: scrollElement.current.scrollHeight
			});
			if (scrollAction.shouldScroll) {
				scrollElement.current.scrollTop = scrollAction.scrollTop;
			}
		}
	}, [internalVisible, isQuickSelect, calendarState.initMonthIndex, calendarState.monthList.length]);

	const calendarContent = (
		<div>
			<div className={calendarState.headerClass}>
				{calendarState.showQuickSelect && (
					<div className={calendarState.quickSelectListClass}>
						{calendarState.quickSelectItems.map((quickItem) => (
							<button key={quickItem.index} type="button" className={quickItem.buttonClass} onClick={() => quickSelectFunc(quickItem.item)}>
								{quickItem.label}
							</button>
						))}
					</div>
				)}
				<div className={calendarState.weekRowClass}>
					{calendarState.weekItems.map((weekItem) => (
						<div key={weekItem.index} className={weekItem.className}>
							{weekItem.text}
						</div>
					))}
				</div>
			</div>
			<div className={calendarState.scrollClass} style={calendarState.scrollStyleValue} ref={scrollElement}>
				{calendarState.monthViewItems.map((item) => (
					<React.Fragment key={item.index}>
						{monthCard ? (
							<Card {...calendarState.monthCardProps}>
								<div className={calendarState.monthContainerClass}>
									<div className={calendarState.monthTitleClass}>
										<span className={calendarState.monthTitleTextClass}>
											{resolveCalendarMonthLabel(calendarLang.monthTextList, item.month)}
										</span>
										{item.year}
									</div>
									<div className={calendarState.monthGridClass}>
										{item.dayItems.map(({ day, dayCell, index: dayIndex }) => {
											return (
												<button
													key={dayIndex}
													type="button"
													className={dayCell.outerClass}
													onClick={() => {
														if (!day.disabled) clickDayFunc(item.year, item.month, day);
													}}
													style={dayCell.outerStyle}
												>
													<div className={dayCell.innerClass}>
														<div className={calendarState.dayNumberClass}>{resolveCalendarDayNumberText(day.text)}</div>
														<div className={calendarState.dayInfoClass}>{dayCell.infoText}</div>
														{day.text && day.disabled && (
															<div className={calendarState.disabledMarkClass}>
																{/* 公共 Calendar 禁用图标 SVG 数据在 common 中维护。 / Shared Calendar disabled SVG data lives in common. */}
																<SvgIcon svg={calendarDisabledSvg} width="100%" height="100%" />
															</div>
														)}
													</div>
												</button>
											);
										})}
									</div>
									{monthMark && (
										<div className={calendarState.monthMarkClass}>{resolveCalendarMonthLabel(calendarLang.monthTextList, item.month)}</div>
									)}
								</div>
							</Card>
						) : (
							<div className={calendarState.monthContainerClass}>
								<div className={calendarState.monthTitleClass}>
									<span className={calendarState.monthTitleTextClass}>
										{resolveCalendarMonthLabel(calendarLang.monthTextList, item.month)}
									</span>
									{item.year}
								</div>
								<div className={calendarState.monthGridClass}>
									{item.dayItems.map(({ day, dayCell, index: dayIndex }) => {
										return (
											<button
												key={dayIndex}
												type="button"
												className={dayCell.outerClass}
												onClick={() => {
													if (!day.disabled) clickDayFunc(item.year, item.month, day);
												}}
												style={dayCell.outerStyle}
											>
												<div className={dayCell.innerClass}>
													<div className={calendarState.dayNumberClass}>{resolveCalendarDayNumberText(day.text)}</div>
													<div className={calendarState.dayInfoClass}>{dayCell.infoText}</div>
													{day.text && day.disabled && (
														<div className={calendarState.disabledMarkClass}>
															<SvgIcon svg={calendarDisabledSvg} width="100%" height="100%" />
														</div>
													)}
												</div>
											</button>
										);
									})}
								</div>
								{monthMark && (
									<div className={calendarState.monthMarkClass}>{resolveCalendarMonthLabel(calendarLang.monthTextList, item.month)}</div>
								)}
							</div>
						)}
					</React.Fragment>
				))}
			</div>
			{calendarState.usePopup && (
				<div className={calendarState.footerClass}>
					<Button
						{...buttonProps}
						onClick={(event) => {
							buttonOnClick?.(event);
							confirmFunc();
						}}
					>
						{calendarState.texts.confirmText}
						{calendarState.selectedSummary}
					</Button>
				</div>
			)}
		</div>
	);

	if (!calendarState.usePopup) {
		return <div>{calendarContent}</div>;
	}

	return (
		<Popup
			visible={internalVisible}
			size={0}
			maskClosable={true}
			transitionDistance={calendarState.transitionDistance}
			{...calendarState.popupProps}
			onClose={handlePopupClose}
		>
			{calendarContent}
		</Popup>
	);
};

export default Calendar;
