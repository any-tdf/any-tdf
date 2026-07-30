import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Popup from '../popup';
import ScrollRadio from '../scrollRadio';
import {
	resolveTimePickerCancelAction,
	resolveTimePickerCloseAction,
	resolveTimePickerConfirmAction,
	resolveTimePickerDerived,
	resolveTimePickerInitialVisible,
	resolveTimePickerMonthScrollAction,
	resolveTimePickerNowSnapshot,
	resolveTimePickerYearScrollAction,
	resolveTimePickerStateOptions
} from '@any-tdf/common/derived/timePicker';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import type { TimePickerProps } from '../../types';

const emptyItemProps: NonNullable<TimePickerProps['yearProps']> = {};
const emptyYearRange: NonNullable<TimePickerProps['yearRange']> = [];
const defaultMonthRange: NonNullable<TimePickerProps['monthRange']> = [1, 12];
const defaultHourRange: NonNullable<TimePickerProps['hourRange']> = [0, 23];
const defaultMinuteRange: NonNullable<TimePickerProps['minuteRange']> = [0, 59];
const defaultSecondRange: NonNullable<TimePickerProps['secondRange']> = [0, 59];
const emptyPopupProps: NonNullable<TimePickerProps['popup']> = {};

export const TimePicker: React.FC<TimePickerProps> = ({
	visible: visibleProp,
	type = 'YYYYMMDDhhmmss',
	yearProps = emptyItemProps,
	monthProps = emptyItemProps,
	dayProps = emptyItemProps,
	hourProps = emptyItemProps,
	minuteProps = emptyItemProps,
	secondProps = emptyItemProps,
	initYear = '',
	initMonth = '',
	initDay = '',
	initHour = '',
	initMinute = '',
	initSecond = '',
	minuteStep = 1,
	secondStep = 1,
	yearRange = emptyYearRange,
	monthRange = defaultMonthRange,
	hourRange = defaultHourRange,
	minuteRange = defaultMinuteRange,
	secondRange = defaultSecondRange,
	showTips = true,
	cancelText,
	confirmText,
	title,
	yearText,
	monthText,
	dayText,
	hourText,
	minuteText,
	secondText,
	outFormat = '',
	height = 30,
	popup = emptyPopupProps,
	onClose,
	onConfirm,
	onCancel
}) => {
	const { locale } = useConfig();
	const timePickerLang = locale?.timePicker || zh_CN.timePicker;
	const [innerVisible, setInnerVisible] = useState(() => resolveTimePickerInitialVisible(visibleProp));
	const visible = innerVisible;
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);

	useEffect(() => {
		setInnerVisible(resolveTimePickerInitialVisible(visibleProp));
	}, [visibleProp]);

	const setVisible = useCallback((nextVisible: boolean) => {
		setInnerVisible(nextVisible);
	}, []);

	const nowRef = useRef(new Date());
	const now = nowRef.current;
	const currentTime = useMemo(() => resolveTimePickerNowSnapshot(now), [now]);
	// 公共函数统一组装 TimePicker 派生入参，组件只传入当前 props、状态和环境数值。
	// Shared helper normalizes TimePicker derivation options from current props, state and environment values.
	const timePickerBaseOptions = useMemo(
		() =>
			resolveTimePickerStateOptions({
				currentTime,
				defaults: timePickerLang,
				props: {
					type,
					yearProps,
					monthProps,
					dayProps,
					hourProps,
					minuteProps,
					secondProps,
					initYear,
					initMonth,
					initDay,
					initHour,
					initMinute,
					initSecond,
					minuteStep,
					secondStep,
					yearRange,
					monthRange,
					hourRange,
					minuteRange,
					secondRange,
					showTips,
					cancelText,
					confirmText,
					title,
					yearText,
					monthText,
					dayText,
					hourText,
					minuteText,
					secondText,
					height,
					popup
				},
				viewportHeight: resolveViewportDimension({
					value: typeof window === 'undefined' ? undefined : window.innerHeight
				})
			}),
		[
			currentTime,
			timePickerLang,
			type,
			yearProps,
			monthProps,
			dayProps,
			hourProps,
			minuteProps,
			secondProps,
			initYear,
			initMonth,
			initDay,
			initHour,
			initMinute,
			initSecond,
			minuteStep,
			secondStep,
			yearRange,
			monthRange,
			hourRange,
			minuteRange,
			secondRange,
			showTips,
			cancelText,
			confirmText,
			title,
			yearText,
			monthText,
			dayText,
			hourText,
			minuteText,
			secondText,
			height,
			popup
		]
	);
	const initialTimePickerState = useMemo(() => resolveTimePickerDerived(timePickerBaseOptions), [timePickerBaseOptions]);

	const [baseDayData, setBaseDayData] = useState<{ label: string }[]>(initialTimePickerState.tempDayData);
	const [dayInitIndex, setDayInitIndex] = useState(initialTimePickerState.initDayIndex);

	const [yearIndex, setYearIndex] = useState(0);
	const [monthIndex, setMonthIndex] = useState(0);
	const [dayIndex, setDayIndex] = useState(0);
	const [hourIndex, setHourIndex] = useState(0);
	const [minuteIndex, setMinuteIndex] = useState(0);
	const [secondIndex, setSecondIndex] = useState(0);
	// 公共派生层统一 TimePicker 的列数据、文本、样式、可见性和 Popup / inline 布局，滚动状态写入留在组件层。
	// Shared derivation centralizes TimePicker column data, text, styles, visibility and Popup / inline layout; scroll state writes stay in the component layer.
	const timePickerState = useMemo(
		() =>
			resolveTimePickerDerived(
				resolveTimePickerStateOptions({
					currentTime,
					currentDayData: baseDayData,
					dayInitIndex,
					defaults: timePickerLang,
					props: {
						type,
						yearProps,
						monthProps,
						dayProps,
						hourProps,
						minuteProps,
						secondProps,
						initYear,
						initMonth,
						initDay,
						initHour,
						initMinute,
						initSecond,
						minuteStep,
						secondStep,
						yearRange,
						monthRange,
						hourRange,
						minuteRange,
						secondRange,
						showTips,
						cancelText,
						confirmText,
						title,
						yearText,
						monthText,
						dayText,
						hourText,
						minuteText,
						secondText,
						height,
						popup
					},
					viewportHeight: resolveViewportDimension({
						value: typeof window === 'undefined' ? undefined : window.innerHeight
					})
				})
			),
		[baseDayData, dayInitIndex, timePickerBaseOptions]
	);

	useEffect(() => {
		setBaseDayData(initialTimePickerState.tempDayData);
		setDayInitIndex(initialTimePickerState.initDayIndex);
		setDayIndex(initialTimePickerState.safeInitDayIndex);
	}, [initialTimePickerState]);

	const scrollEndYearFunc = useCallback(
		(index: number, isTouch?: boolean) => {
			// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
			// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
			const action = resolveTimePickerYearScrollAction({
				currentTime,
				index,
				isTouch,
				yearData: timePickerState.yearData,
				monthData: timePickerState.baseMonthData,
				monthIndex
			});
			setYearIndex(action.nextYearIndex);
			const refresh = action.refresh;
			if (refresh.shouldRefresh) {
				setBaseDayData([]);
				setDayInitIndex(refresh.dayIndex);
				setDayIndex(refresh.dayIndex);
				setTimeout(() => {
					setBaseDayData(refresh.dayData);
				}, 0);
			}
		},
		[currentTime, monthIndex, timePickerState.baseMonthData, timePickerState.yearData]
	);

	const scrollEndMonthFunc = useCallback(
		(index: number, isTouch?: boolean) => {
			// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
			// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
			const action = resolveTimePickerMonthScrollAction({
				currentTime,
				index,
				isTouch,
				yearData: timePickerState.yearData,
				monthData: timePickerState.baseMonthData,
				yearIndex
			});
			setMonthIndex(action.nextMonthIndex);
			const refresh = action.refresh;
			if (refresh.shouldRefresh) {
				setBaseDayData([]);
				setDayInitIndex(refresh.dayIndex);
				setDayIndex(refresh.dayIndex);
				setTimeout(() => {
					setBaseDayData(refresh.dayData);
				}, 0);
			}
		},
		[currentTime, timePickerState.baseMonthData, timePickerState.yearData, yearIndex]
	);

	const clickCancelFunc = useCallback(() => {
		// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
		// Shared action function only returns close and callback decisions; the component writes state and fires events.
		const action = resolveTimePickerCancelAction();
		setVisible(action.nextVisible);
		if (action.shouldCancel) onCancel?.();
		if (action.shouldClose) onClose?.();
	}, [onCancel, onClose, setVisible]);

	const clickConfirmFunc = useCallback(() => {
		// 公共动作函数组装确认值并返回关闭决策，组件层只负责状态写入和事件触发。
		// Shared action function builds confirm values and returns close decisions; the component writes state and fires events.
		const action = resolveTimePickerConfirmAction({
			type: timePickerState.typeInner,
			outFormat,
			yearData: timePickerState.yearData,
			monthData: timePickerState.baseMonthData,
			dayData: baseDayData,
			hourData: timePickerState.baseHourData,
			minuteData: timePickerState.baseMinuteData,
			secondData: timePickerState.baseSecondData,
			yearIndex,
			monthIndex,
			dayIndex,
			hourIndex,
			minuteIndex,
			secondIndex
		});
		setVisible(action.nextVisible);
		if (action.shouldClose) onClose?.();
		if (action.shouldConfirm) onConfirm?.(action.timeStr, action.outData);
	}, [
		baseDayData,
		dayIndex,
		hourIndex,
		minuteIndex,
		monthIndex,
		onClose,
		onConfirm,
		outFormat,
		secondIndex,
		setVisible,
		timePickerState.baseHourData,
		timePickerState.baseMinuteData,
		timePickerState.baseMonthData,
		timePickerState.baseSecondData,
		timePickerState.typeInner,
		timePickerState.yearData,
		yearIndex
	]);

	const handlePopupClose = useCallback(() => {
		// 公共 close action 只返回可见状态和 close 回调决策，Popup 回调留在组件层。
		// Shared close action only returns visibility and close callback decisions; Popup callbacks stay in the component layer.
		const action = resolveTimePickerCloseAction();
		if (!action.shouldClose) return;
		setVisible(action.nextVisible);
		if (action.shouldEmitClose) {
			onClose?.();
			popupOnClose?.();
		}
	}, [onClose, popupOnClose, setVisible]);

	const content = (
		<>
			<div className={timePickerState.headerClass}>
				<button type="button" className={timePickerState.cancelButtonClass} onClick={clickCancelFunc}>
					{timePickerState.texts.cancelText}
				</button>
				<div>{timePickerState.texts.title}</div>
				<button type="button" className={timePickerState.confirmButtonClass} onClick={clickConfirmFunc}>
					{timePickerState.texts.confirmText}
				</button>
			</div>
			{showTips ? (
				<div className={timePickerState.tipsClass}>
					{timePickerState.tipItems.map((tipItem) => (
						<div key={tipItem.key} className={timePickerState.tipItemClass} style={tipItem.tipStyleValue}>
							{tipItem.tipText}
						</div>
					))}
				</div>
			) : null}
			<div className={timePickerState.contentClass} style={timePickerState.contentStyleValue}>
				{timePickerState.columns.year.visible ? (
					<div className={timePickerState.columns.year.rootClass} style={timePickerState.columns.year.styleValue}>
						<ScrollRadio
							data={timePickerState.columns.year.data}
							initIndex={timePickerState.columns.year.initIndex}
							autoScrollToLast={false}
							{...yearProps}
							onScrollEnd={scrollEndYearFunc}
						/>
					</div>
				) : null}
				{timePickerState.columns.month.visible ? (
					<div className={timePickerState.columns.month.rootClass} style={timePickerState.columns.month.styleValue}>
						<ScrollRadio
							data={timePickerState.columns.month.data}
							lastSelectedIndex={timePickerState.columns.month.initIndex}
							{...monthProps}
							onScrollEnd={scrollEndMonthFunc}
						/>
					</div>
				) : null}
				{baseDayData.length > 0 && timePickerState.columns.day.visible ? (
					<div className={timePickerState.columns.day.rootClass} style={timePickerState.columns.day.styleValue}>
						<ScrollRadio data={baseDayData} lastSelectedIndex={dayInitIndex} {...dayProps} onScrollEnd={(index) => setDayIndex(index)} />
					</div>
				) : null}
				{timePickerState.columns.hour.visible ? (
					<div className={timePickerState.columns.hour.rootClass} style={timePickerState.columns.hour.styleValue}>
						<ScrollRadio
							data={timePickerState.columns.hour.data}
							lastSelectedIndex={timePickerState.columns.hour.initIndex}
							{...hourProps}
							onScrollEnd={(index) => setHourIndex(index)}
						/>
					</div>
				) : null}
				{timePickerState.columns.minute.visible ? (
					<div className={timePickerState.columns.minute.rootClass} style={timePickerState.columns.minute.styleValue}>
						<ScrollRadio
							data={timePickerState.columns.minute.data}
							lastSelectedIndex={timePickerState.columns.minute.initIndex}
							{...minuteProps}
							onScrollEnd={(index) => setMinuteIndex(index)}
						/>
					</div>
				) : null}
				{timePickerState.columns.second.visible ? (
					<div className={timePickerState.columns.second.rootClass} style={timePickerState.columns.second.styleValue}>
						<ScrollRadio
							data={timePickerState.columns.second.data}
							lastSelectedIndex={timePickerState.columns.second.initIndex}
							{...secondProps}
							onScrollEnd={(index) => setSecondIndex(index)}
						/>
					</div>
				) : null}
			</div>
		</>
	);

	if (!timePickerState.usePopup) {
		return <div>{content}</div>;
	}

	return (
		<Popup
			visible={visible}
			size={0}
			maskClosable
			transitionDistance={timePickerState.transitionDistance}
			{...popupProps}
			onClose={handlePopupClose}
		>
			{content}
		</Popup>
	);
};

export default TimePicker;
