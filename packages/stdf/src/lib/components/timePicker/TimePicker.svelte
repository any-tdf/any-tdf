<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import { getDayNum } from '../utils/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { TimePickerProps, TimePickerObjProps } from '../../types/index.js';

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
		cancelText = timePickerLang.defaultCancel,
		confirmText = timePickerLang.defaultConfirm,
		title = timePickerLang.defaultTitle,
		yearText = timePickerLang.defaultYear,
		monthText = timePickerLang.defaultMonth,
		dayText = timePickerLang.defaultDay,
		hourText = timePickerLang.defaultHour,
		minuteText = timePickerLang.defaultMinute,
		secondText = timePickerLang.defaultSecond,
		outFormat = '',
		height = 30,
		popup = {},
		onclose,
		onconfirm,
		oncancel
	}: TimePickerProps = $props();

	// 是否使用弹出层，当 popup 为 null 时不使用
	// Whether to use popup, when popup is null, do not use
	const usePopup = $derived(popup !== null);

	// 获取当前时间，取出对应的年月日时分秒，转成字符，月、日、时、分、秒小于 10 的前面补 0
	// Get the current time, take out the corresponding year, month, day, hour, minute, and second, convert to a character, and add 0 to the front of month, day, hour, minute, and second less than 10
	const now = new Date();
	const currentYear = now.getFullYear().toString();
	const currentMonth = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1).toString();
	const currentDay = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()).toString();
	const currentHour = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()).toString();
	const currentMinute = (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()).toString();
	const currentSecond = (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()).toString();

	// 总共可以传入 13 种 type，做一个映射，方便后面使用
	// A total of 13 types can be passed in, do a mapping, and it is convenient to use later
	const typeMap = {
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
	};

	// 定义 typeInner，对不在 typeMap 的 type 做一个过滤，不在 typeMap 的 type 设置为默认值 YMDhms
	// Define typeInner, filter out types that are not in typeMap, and set types that are not in typeMap to the default value YMDhms
	let typeInner = $derived(typeMap[type] || 'YYYYMMDDhhmmss');

	// 如果 yearRange 长度为2且后一项大于前一项，表示限定区间，否则取当前年的的前后 10 年
	// If the length of yearRange is 2 and the second item is greater than the first item, it means that the range is limited, otherwise the previous and next 10 years of the current year are taken
	const yearData = $derived.by(() => {
		const data: { label: string }[] = [];
		if (yearRange.length === 2 && yearRange[1] > yearRange[0]) {
			for (let i = yearRange[0]; i <= yearRange[1]; i++) {
				data.push({ label: i.toString() });
			}
		} else {
			for (let i = now.getFullYear() - 10; i <= now.getFullYear() + 10; i++) {
				data.push({ label: i.toString() });
			}
		}
		return data;
	});

	// 月份列数据，固定 12 个月，如果有限定区间
	// Month column data, fixed 12 months, if there is a limited range, it needs to be judged according to the year
	const baseMonthData = $derived.by(() => {
		const data: { label: string }[] = [];
		if (monthRange.length === 2 && monthRange[1] > monthRange[0] && monthRange[0] >= 1 && monthRange[1] <= 12) {
			for (let i = monthRange[0]; i <= monthRange[1]; i++) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		} else {
			for (let i = 1; i <= 12; i++) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		}
		return data;
	});

	// 小时列数据，根据限定小时区间计算
	// Hour column data, fixed 24 hours
	const baseHourData = $derived.by(() => {
		const data: { label: string }[] = [];
		if (hourRange.length === 2 && hourRange[1] > hourRange[0] && hourRange[0] >= 0 && hourRange[1] <= 23) {
			for (let i = hourRange[0]; i <= hourRange[1]; i++) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		} else {
			for (let i = 0; i < 24; i++) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		}
		return data;
	});

	// 分钟列数据，根据限定分钟区间计算
	// Minute column data, calculated according to the limited minute range
	const baseMinuteData = $derived.by(() => {
		const data: { label: string }[] = [];
		if (minuteRange.length === 2 && minuteRange[1] > minuteRange[0] && minuteRange[0] >= 0 && minuteRange[1] <= 59) {
			for (let i = minuteRange[0]; i <= minuteRange[1]; i += minuteStep) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		} else {
			for (let i = 0; i < 60; i += minuteStep) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		}
		return data;
	});

	// 秒列数据，根据限定秒区间计算
	// Second column data, calculated according to the limited second range
	const baseSecondData = $derived.by(() => {
		const data: { label: string }[] = [];
		if (secondRange.length === 2 && secondRange[1] > secondRange[0] && secondRange[0] >= 0 && secondRange[1] <= 59) {
			for (let i = secondRange[0]; i <= secondRange[1]; i += secondStep) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		} else {
			for (let i = 0; i < 60; i += secondStep) {
				data.push({ label: (i < 10 ? '0' + i : i).toString() });
			}
		}
		return data;
	});

	// 找出 yearProps、monthProps、dayProps、hourProps、minuteProps、secondProps 中 showRow 的最大值
	// Find the maximum value of showRow in yearProps, monthProps, dayProps, hourProps, minuteProps, and secondProps
	const maxShowRows = $derived(
		Math.max(
			yearProps.showRow || 5,
			monthProps.showRow || 5,
			dayProps.showRow || 5,
			hourProps.showRow || 5,
			minuteProps.showRow || 5,
			secondProps.showRow || 5
		)
	);

	// 天数列数据
	// Day column data
	let baseDayData = $state<{ label: string }[]>([]);

	// 根据当前年月初始一次天数列数据
	// Initialize the day column data according to the current year and month
	const tempDayData: { label: string }[] = [];
	for (let i = 1; i <= getDayNum(currentYear, currentMonth); i++) {
		tempDayData.push({ label: (i < 10 ? '0' + i : i).toString() });
	}
	baseDayData = tempDayData;

	// 初始时年份索引
	// Initial year index
	const initYearIndex = $derived(
		initYear === ''
			? yearData.findIndex((item) => item.label === currentYear)
			: yearData.findIndex((item) => item.label === initYear?.toString())
	);

	// 初始时月份索引
	// Initial month index
	const initMonthIndex = $derived(
		initMonth === ''
			? baseMonthData.findIndex((item) => item.label === currentMonth)
			: baseMonthData.findIndex((item) => item.label === initMonth.toString())
	);

	// 初始时天数索引
	// Initial day index
	let initDayIndex = $derived(
		initDay === ''
			? tempDayData.findIndex((item) => item.label === currentDay)
			: tempDayData.findIndex((item) => item.label === initDay.toString())
	);

	// 初始时小时索引
	// Initial hour index
	const initHourIndex = $derived(
		initHour === ''
			? baseHourData.findIndex((item) => item.label === currentHour)
			: baseHourData.findIndex((item) => item.label === initHour.toString())
	);

	// 初始时分钟索引
	// Initial minute index
	const initMinuteIndex = $derived(
		initMinute === ''
			? baseMinuteData.findIndex((item) => item.label === currentMinute)
			: baseMinuteData.findIndex((item) => item.label === initMinute.toString())
	);

	// 初始时秒索引
	// Initial second index
	const initSecondIndex = $derived(
		initSecond === ''
			? baseSecondData.findIndex((item) => item.label === currentSecond)
			: baseSecondData.findIndex((item) => item.label === initSecond.toString())
	);

	// 年月日时分秒初始索引
	// Year, month, day, hour, minute, second initial index
	let yearIndex = 0;
	let monthIndex = 0;
	let dayIndex = 0;
	let hourIndex = 0;
	let minuteIndex = 0;
	let secondIndex = 0;

	// 根据年份和月份获取对应的天数，更新 baseDayData
	// Get the number of days corresponding to the year and month according to the year and month, and update baseDayData
	const updateDayDataFunc = (dayNum: number) => {
		const data: { label: string }[] = [];
		for (let i = 1; i <= dayNum; i++) {
			data.push({ label: (i < 10 ? '0' + i : i).toString() });
		}
		baseDayData = data;
	};

	// 初始一下生成天数数据
	// Generate day data initially
	$effect(() => {
		if (yearData.length > 0 && baseMonthData.length > 0) {
			updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));
		}
	});

	// 年数据滚动结束时的回调函数
	// Callback function when the year data scrolling ends
	const scrollEndYearFunc = (index: number, isTouch: boolean) => {
		yearIndex = index;
		// 如果月份是 2 月，需要重新计算天数
		// If the month is February, the number of days needs to be recalculated
		if (isTouch && baseMonthData[monthIndex].label === '02') {
			baseDayData = [];
			initDayIndex = 0;
			setTimeout(() => {
				updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));
			});
		}
	};

	// 月数据滚动结束时的回调函数
	// Callback function when the month data scrolling ends
	const scrollEndMonthFunc = (index: number, isTouch: boolean) => {
		monthIndex = index;
		// 根据年份和月份获取对应的天数
		// Get the number of days corresponding to the year and month according to the year and month
		if (isTouch) {
			baseDayData = [];
			initDayIndex = 0;
			setTimeout(() => {
				updateDayDataFunc(getDayNum(yearData[yearIndex].label, baseMonthData[monthIndex].label));
			});
		}
	};

	// 点击取消按钮的回调函数
	// Callback function when clicking the cancel button
	const clickCancelFunc = () => {
		visible = false;
		oncancel?.();
		onclose?.();
	};

	// 传入时间格式与时间对象，返回时间字符串
	// Pass in the time format and time object, return the time string
	const getTimeStr = (format: string, timeObj: TimePickerObjProps) => {
		const { YYYY, MM, DD, hh, mm, ss } = timeObj;
		const timeStr = format.replace('YYYY', YYYY).replace('MM', MM).replace('DD', DD).replace('hh', hh).replace('mm', mm).replace('ss', ss);
		return timeStr;
	};

	// 点击确定按钮的回调函数
	// Callback function when clicking the confirm button
	const clickConfirmFunc = () => {
		visible = false;
		onclose?.();
		const outData: TimePickerObjProps = { YYYY: '', MM: '', DD: '', hh: '', mm: '', ss: '' };
		if (typeInner.includes('YYYY')) {
			outData.YYYY = yearData[yearIndex].label;
		}
		if (typeInner.includes('MM')) {
			outData.MM = baseMonthData[monthIndex].label;
		}
		if (typeInner.includes('DD')) {
			outData.DD = baseDayData[dayIndex].label;
		}
		if (typeInner.includes('hh')) {
			outData.hh = baseHourData[hourIndex].label;
		}
		if (typeInner.includes('mm')) {
			outData.mm = baseMinuteData[minuteIndex].label;
		}
		if (typeInner.includes('ss')) {
			outData.ss = baseSecondData[secondIndex].label;
		}

		// 如果 outFormat 为空，则根据 type 格式
		// If outFormat is empty, format according to type
		if (outFormat === '') {
			// 预先根据 typeInner 生成一份 defaultOutFormat 字符，年月日之间用 - 连接，时分秒之间用 : 连接，年月日和时分秒之间用空格连接
			// Generate a copy of defaultOutFormat characters according to typeInner in advance, and connect the year, month and day with -, and connect the hour, minute and second with :, and connect the year, month, day and hour, minute and second with spaces
			let defaultOutFormat = typeInner
				.replace(/YYYY/g, 'YYYY-')
				.replace(/MM/g, 'MM-')
				.replace(/DD/g, 'DD ')
				.replace(/hh/g, 'hh:')
				.replace(/mm/g, 'mm:')
				.replace(/ss/g, 'ss');
			// 如果 defaultOutFormat 以 - 或 : 或空格 结尾，则去掉最后一个字符
			// If defaultOutFormat ends with - or : or space, remove the last character
			if (defaultOutFormat.endsWith('-') || defaultOutFormat.endsWith(':') || defaultOutFormat.endsWith(' ')) {
				defaultOutFormat = defaultOutFormat.slice(0, -1);
			}
			onconfirm?.(getTimeStr(defaultOutFormat, outData), outData);
		} else {
			// 将 outFormat 里面 YYYY MM DD hh mm ss 替换为对应的 outData 中的值
			// Replace YYYY MM DD hh mm ss in outFormat with the corresponding value in outData
			const outFormatInner = outFormat
				.replace(/YYYY/g, outData.YYYY)
				.replace(/MM/g, outData.MM)
				.replace(/DD/g, outData.DD)
				.replace(/hh/g, outData.hh)
				.replace(/mm/g, outData.mm)
				.replace(/ss/g, outData.ss);
			// 如果 outFormat 为空，则返回时间对象，否则返回时间字符串
			// If outFormat is empty, return the time object, otherwise return the time string
			onconfirm?.(getTimeStr(outFormatInner, outData), outData);
		}
	};
</script>

{#snippet timePickerContent()}
	<div class="flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark">
		<button class="h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60" onclick={clickCancelFunc}>{cancelText}</button>
		<div>{title}</div>
		<button class="text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10" onclick={clickConfirmFunc}>{confirmText}</button>
	</div>
	{#if showTips}
		<div
			class="flex h-8 items-center justify-around gap-1 bg-bg-surface text-center text-sm leading-8 text-black/60 dark:bg-bg-surface-dark dark:text-white/60"
		>
			{#if typeInner.includes('Y')}
				<div class="px-2" style="flex:{yearProps.flex || '1'};text-align:{yearProps.align}">{yearText}</div>{/if}
			{#if typeInner.includes('M')}
				<div class="px-2" style="flex:{monthProps.flex || '1'};text-align:{monthProps.align}">{monthText}</div>{/if}
			{#if typeInner.includes('D')}
				<div class="px-2" style="flex:{dayProps.flex || '1'};text-align:{dayProps.align}">{dayText}</div>{/if}
			{#if typeInner.includes('h')}
				<div class="px-2" style="flex:{hourProps.flex || '1'};text-align:{hourProps.align}">{hourText}</div>{/if}
			{#if typeInner.includes('m')}
				<div class="px-2" style="flex:{minuteProps.flex || '1'};text-align:{minuteProps.align}">{minuteText}</div>{/if}
			{#if typeInner.includes('s')}
				<div class="px-2" style="flex:{secondProps.flex || '1'};text-align:{secondProps.align}">{secondText}</div>{/if}
		</div>
	{/if}
	<div
		class="flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark"
		style={usePopup ? '' : `height:${(window.innerHeight * height) / 100}px`}
	>
		{#if typeInner.includes('Y')}
			<div class="truncate" style="flex:{yearProps.flex || '1'}">
				<ScrollRadio data={yearData} initIndex={initYearIndex} autoScrollToLast={false} {...yearProps} onscrollEnd={scrollEndYearFunc} />
			</div>
		{/if}
		{#if typeInner.includes('M')}
			<div class="truncate" style="flex:{monthProps.flex || '1'}">
				<ScrollRadio data={baseMonthData} lastSelectedIndex={initMonthIndex} {...monthProps} onscrollEnd={scrollEndMonthFunc} />
			</div>
		{/if}
		{#if baseDayData.length > 0 && typeInner.includes('D')}
			<div class="truncate" style="flex:{dayProps.flex || '1'}">
				<ScrollRadio data={baseDayData} lastSelectedIndex={initDayIndex} {...dayProps} onscrollEnd={(index) => (dayIndex = index)} />
			</div>
		{/if}
		{#if typeInner.includes('h')}
			<div class="truncate" style="flex:{hourProps.flex || '1'}">
				<ScrollRadio data={baseHourData} lastSelectedIndex={initHourIndex} {...hourProps} onscrollEnd={(index) => (hourIndex = index)} />
			</div>
		{/if}
		{#if typeInner.includes('m')}
			<div class="truncate" style="flex:{minuteProps.flex || '1'}">
				<ScrollRadio
					data={baseMinuteData}
					lastSelectedIndex={initMinuteIndex}
					{...minuteProps}
					onscrollEnd={(index) => (minuteIndex = index)}
				/>
			</div>
		{/if}
		{#if typeInner.includes('s')}
			<div class="truncate" style="flex:{secondProps.flex || '1'}">
				<ScrollRadio
					data={baseSecondData}
					lastSelectedIndex={initSecondIndex}
					{...secondProps}
					onscrollEnd={(index) => (secondIndex = index)}
				/>
			</div>
		{/if}
	</div>
{/snippet}

{#if usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={(maxShowRows === 3 ? 64 : maxShowRows === 5 ? 48 : 32) * maxShowRows + 41 + (showTips ? 32 : 0)}
		{...popup}
	>
		{@render timePickerContent()}
	</Popup>
{:else}
	{@render timePickerContent()}
{/if}
