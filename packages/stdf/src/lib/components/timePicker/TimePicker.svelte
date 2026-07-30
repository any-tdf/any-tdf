<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { TimePickerProps } from '../../types/index.js';
	import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
		import {
			resolveTimePickerCancelAction,
			resolveTimePickerConfirmAction,
			resolveTimePickerDerived,
			resolveTimePickerMonthScrollAction,
			resolveTimePickerNowSnapshot,
			resolveTimePickerSelectedDayData,
			resolveTimePickerYearScrollAction,
			resolveTimePickerStateOptions
		} from '@any-tdf/common/derived/timePicker';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const timePickerLang: LangProps['timePicker'] = currentLang.timePicker;

	let {
		visible = $bindable(false),
		type = 'YYYYMMDDhhmmss',
		yearProps = {},
		monthProps = {},
		dayProps = {},
		hourProps = {},
		minuteProps = {},
		secondProps = {},
		initYear = '',
		initMonth = '',
		initDay = '',
		initHour = '',
		initMinute = '',
		initSecond = '',
		minuteStep = 1,
		secondStep = 1,
		yearRange = [],
		monthRange = [1, 12],
		hourRange = [0, 23],
		minuteRange = [0, 59],
		secondRange = [0, 59],
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
		popup = {},
		onclose,
		onconfirm,
		oncancel
	}: TimePickerProps = $props();

	// 获取当前时间，取出对应的年月日时分秒，转成字符，月、日、时、分、秒小于 10 的前面补 0
	// Get the current time, take out the corresponding year, month, day, hour, minute, and second, convert to a character, and add 0 to the front of month, day, hour, minute, and second less than 10
	const now = new Date();
	const currentTime = resolveTimePickerNowSnapshot(now);

	// 公共函数统一组装 TimePicker 派生入参，组件只传入当前 props、状态和环境数值。
	// Shared helper normalizes TimePicker derivation options from current props, state and environment values.
	const timePickerBaseOptions = $derived(
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
			viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight })
		})
	);
	const initialTimePickerState = $derived(resolveTimePickerDerived(timePickerBaseOptions));

	// 天数列数据
	// Day column data
	let baseDayData = $state<{ label: string }[]>(
		resolveTimePickerSelectedDayData({
			currentTime,
			yearData: [],
			monthData: [],
			yearIndex: 0,
			monthIndex: 0
		})
	);

	// 公共派生层统一 TimePicker 的列数据、文本、样式、可见性和 Popup / inline 布局，滚动状态写入留在组件层。
	// Shared derivation centralizes TimePicker column data, text, styles, visibility and Popup / inline layout; scroll state writes stay in the component layer.
	const timePickerState = $derived(resolveTimePickerDerived(resolveTimePickerStateOptions({
		currentTime,
		currentDayData: baseDayData,
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
		viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight })
	})));

	// 初始时天数索引
	// Initial day index
	let initDayIndex = $derived(timePickerState.initDayIndex);

	// 年月日时分秒初始索引
	// Year, month, day, hour, minute, second initial index
	let yearIndex = 0;
	let monthIndex = 0;
	let dayIndex = 0;
	let hourIndex = 0;
	let minuteIndex = 0;
	let secondIndex = 0;

	// 初始一下生成天数数据
	// Generate day data initially
	$effect(() => {
		if (initialTimePickerState.yearData.length > 0 && initialTimePickerState.baseMonthData.length > 0) {
			baseDayData = resolveTimePickerSelectedDayData({
				currentTime,
				yearData: initialTimePickerState.yearData,
				monthData: initialTimePickerState.baseMonthData,
				yearIndex,
				monthIndex
			});
		}
	});

	// 年数据滚动结束时的回调函数
	// Callback function when the year data scrolling ends
	const scrollEndYearFunc = (index: number, isTouch: boolean) => {
		// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
		// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
		const action = resolveTimePickerYearScrollAction({ currentTime, index, isTouch, yearData: timePickerState.yearData, monthData: timePickerState.baseMonthData, monthIndex });
		yearIndex = action.nextYearIndex;
		const refresh = action.refresh;
		if (refresh.shouldRefresh) {
			baseDayData = [];
			initDayIndex = refresh.dayIndex;
			dayIndex = refresh.dayIndex;
			setTimeout(() => {
				baseDayData = refresh.dayData;
			});
		}
	};

	// 月数据滚动结束时的回调函数
	// Callback function when the month data scrolling ends
	const scrollEndMonthFunc = (index: number, isTouch: boolean) => {
		// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
		// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
		const action = resolveTimePickerMonthScrollAction({ currentTime, index, isTouch, yearData: timePickerState.yearData, monthData: timePickerState.baseMonthData, yearIndex });
		monthIndex = action.nextMonthIndex;
		const refresh = action.refresh;
		if (refresh.shouldRefresh) {
			baseDayData = [];
			initDayIndex = refresh.dayIndex;
			dayIndex = refresh.dayIndex;
			setTimeout(() => {
				baseDayData = refresh.dayData;
			});
		}
	};

	// 点击取消按钮的回调函数
	// Callback function when clicking the cancel button
	const clickCancelFunc = () => {
		// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
		// Shared action function only returns close and callback decisions; the component writes state and fires events.
		const action = resolveTimePickerCancelAction();
		visible = action.nextVisible;
		if (action.shouldCancel) oncancel?.();
		if (action.shouldClose) onclose?.();
	};

	// 点击确定按钮的回调函数
	// Callback function when clicking the confirm button
	const clickConfirmFunc = () => {
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
		visible = action.nextVisible;
		if (action.shouldClose) onclose?.();
		if (action.shouldConfirm) onconfirm?.(action.timeStr, action.outData);
	};
</script>

{#snippet timePickerContent()}
	<div class={timePickerState.headerClass}>
		<button class={timePickerState.cancelButtonClass} onclick={clickCancelFunc}>{timePickerState.texts.cancelText}</button>
		<div>{timePickerState.texts.title}</div>
		<button class={timePickerState.confirmButtonClass} onclick={clickConfirmFunc}>{timePickerState.texts.confirmText}</button>
	</div>
	{#if showTips}
		<div
			class={timePickerState.tipsClass}
		>
			{#each timePickerState.tipItems as tipItem (tipItem.key)}
				<div class={timePickerState.tipItemClass} style={tipItem.tipStyleString}>{tipItem.tipText}</div>
			{/each}
		</div>
	{/if}
	<div
		class={timePickerState.contentClass}
		style={timePickerState.contentStyleString}
	>
		{#if timePickerState.columns.year.visible}
			<div class={timePickerState.columns.year.rootClass} style={timePickerState.columns.year.styleString}>
				<ScrollRadio data={timePickerState.columns.year.data} initIndex={timePickerState.columns.year.initIndex} autoScrollToLast={false} {...yearProps} onscrollEnd={scrollEndYearFunc} />
			</div>
		{/if}
		{#if timePickerState.columns.month.visible}
			<div class={timePickerState.columns.month.rootClass} style={timePickerState.columns.month.styleString}>
				<ScrollRadio data={timePickerState.columns.month.data} lastSelectedIndex={timePickerState.columns.month.initIndex} {...monthProps} onscrollEnd={scrollEndMonthFunc} />
			</div>
		{/if}
		{#if baseDayData.length > 0 && timePickerState.columns.day.visible}
			<div class={timePickerState.columns.day.rootClass} style={timePickerState.columns.day.styleString}>
				<ScrollRadio data={baseDayData} lastSelectedIndex={initDayIndex} {...dayProps} onscrollEnd={(index) => (dayIndex = index)} />
			</div>
		{/if}
		{#if timePickerState.columns.hour.visible}
			<div class={timePickerState.columns.hour.rootClass} style={timePickerState.columns.hour.styleString}>
				<ScrollRadio data={timePickerState.columns.hour.data} lastSelectedIndex={timePickerState.columns.hour.initIndex} {...hourProps} onscrollEnd={(index) => (hourIndex = index)} />
			</div>
		{/if}
		{#if timePickerState.columns.minute.visible}
			<div class={timePickerState.columns.minute.rootClass} style={timePickerState.columns.minute.styleString}>
				<ScrollRadio
					data={timePickerState.columns.minute.data}
					lastSelectedIndex={timePickerState.columns.minute.initIndex}
					{...minuteProps}
					onscrollEnd={(index) => (minuteIndex = index)}
				/>
			</div>
		{/if}
		{#if timePickerState.columns.second.visible}
			<div class={timePickerState.columns.second.rootClass} style={timePickerState.columns.second.styleString}>
				<ScrollRadio
					data={timePickerState.columns.second.data}
					lastSelectedIndex={timePickerState.columns.second.initIndex}
					{...secondProps}
					onscrollEnd={(index) => (secondIndex = index)}
				/>
			</div>
		{/if}
	</div>
{/snippet}

{#if timePickerState.usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={timePickerState.transitionDistance}
		{...popup}
	>
		{@render timePickerContent()}
	</Popup>
{:else}
	{@render timePickerContent()}
{/if}
