<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Card from '../card/Card.svelte';
	import {
		getNowBeforeOrAfterMonth
	} from '@any-tdf/common/utils';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { CalendarProps } from '../../types/index.js';
	import { resolveHiddenScrollbarCss, resolveViewportDimension } from '@any-tdf/common/derived/helpers';
	import {
		resolveCalendarDayNumberText,
		resolveCalendarDayClickFlow,
		resolveCalendarCloseAction,
		resolveCalendarConfirmAction,
		resolveCalendarDerived,
		resolveCalendarInitialSelectedDatesAction,
		resolveCalendarIsWeekend,
		resolveCalendarMonthLabel,
		resolveCalendarMonthScrollAction,
		resolveCalendarQuickSelectFlow,
		resolveCalendarSelectedDateString,
		resolveCalendarStateOptions,
		resolveCalendarTodayState
	} from '@any-tdf/common/derived/calendar';
	import { calendarDisabledSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const calendarLang: LangProps['calendar'] = currentLang.calendar;

	let {
		visible = $bindable(false),
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
		onconfirm,
		onclose
	}: CalendarProps = $props();

	// 当天日期字符串，YYYYMMDD，月和日不足两位时前面补 0。
	// Today's date string, YYYYMMDD, month and day are padded to two digits.
	const todayState = resolveCalendarTodayState({ now: new Date() });
	const todayStr = todayState.todayStr;

	// 滚动元素
	// Scroll element
	let scrollElement = $state<HTMLDivElement | null>(null);

	// 是否点击了快速选择
	// Whether to click the quick selection
	let isQuickSelect = $state(false);

	// 快速选择项目
	// Quick selection item
	let quickSelectItem: string | number = $state('');

	// 选中的日期
	// Selected date
	let selectedDate: string[] = $state([]);
	$effect(() => {
		// 公共 action 只返回初始化日期同步结果，组件层负责写入本地状态。
		// Shared action only returns initial date sync results; local state writes stay in the component layer.
		const action = resolveCalendarInitialSelectedDatesAction({ initSelectedDates });
		if (action.shouldSync) {
			selectedDate = action.selectedDates;
		}
	});

	// 范围选择时，点击的开始与结束
	// When range selection is clicked, the beginning and end are clicked
	let rangeArr: string[] = [];

	// selectedDate 字符串
	// selectedDate string
	let selectedDateStr = $derived(resolveCalendarSelectedDateString(selectedDate));
	const css = resolveHiddenScrollbarCss({ selector: '.calendar-container' });

	// 公共派生层只处理 Calendar 文案、月份数据、日期单元格和摘要，选择状态与 DOM 滚动留在组件内。
	// Shared derived layer handles Calendar text, month data, day cells and summary; selection state and DOM scrolling stay in the component.
	const calendarState = $derived(
		resolveCalendarDerived(
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
					popup,
					card,
					highlightToday
				},
				viewportHeight: resolveViewportDimension({ value: typeof window === 'undefined' ? undefined : window.innerHeight }),
				isQuickSelect,
				quickSelectItem,
				cardSpacingPriority: 'card',
				selectedDateStr,
				selectedDateCount: selectedDate.length,
				todayStr,
				textTone: 'token'
			})
		)
	);
	type CalendarMonthViewItemProps = (typeof calendarState.monthViewItems)[number];

	// 点击日期事件
	// Click date event
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
		isQuickSelect = nextState.isQuickSelect;
		selectedDate = nextState.selectedDates;
		rangeArr = nextState.rangeDates;
		if (nextState.confirmDates) {
			onconfirm?.(nextState.confirmDates);
		}
	};

	// 点击快速选择
	// Click quick selection
	const quickSelectFunc = (type: string | number) => {
		// 公共流程返回快捷选择状态和滚动目标，真实滚动写入留在组件层。
		// Shared flow returns quick-select state and scroll target while the real scroll write stays in the component layer.
		const action = resolveCalendarQuickSelectFlow({ item: type, startSunday, includeToday, disabledDates, monthList: calendarState.monthList, scrollHeight: scrollElement?.scrollHeight || 0 });
		isQuickSelect = action.isQuickSelect;
		quickSelectItem = action.quickSelectItem;
		selectedDate = action.selectedDates;
		// 对快速选择做自动滚动
		// Automatic scrolling for quick selection
		if (scrollElement && action.scrollAction.shouldScroll) {
			scrollElement.scrollTop = action.scrollAction.scrollTop;
		}
	};

	// 点击确定事件
	// Click the confirm event
	const confirmFunc = () => {
		// 公共 action 只返回确认后的状态和日期数据，事件派发留在组件层。
		// Shared action only returns confirmed state and date data; event dispatch stays in the component layer.
		const action = resolveCalendarConfirmAction({ outFormat, selectedDates: selectedDate });
		visible = action.visible;
		selectedDate = action.selectedDates;
		onconfirm?.(action.confirmDates);
	};

	// 根据 initMonthIndex 在 monthList 中的索引，自动滚动到 scrollElement 高度的百分比
	// Automatically scroll to the percentage of the height of scrollElement according to the index of initMonthIndex in monthList
	$effect(() => {
		if (scrollElement && visible && !isQuickSelect) {
			const scrollAction = resolveCalendarMonthScrollAction({ index: calendarState.initMonthIndex, monthCount: calendarState.monthList.length, scrollHeight: scrollElement.scrollHeight });
			if (scrollAction.shouldScroll) {
				scrollElement.scrollTop = scrollAction.scrollTop;
			}
		}
	});

	// 监听 visible 的变化，派发事件
	// Listen to the change of visible, dispatch events
	$effect(() => {
		if (!visible) {
			// 公共 action 只返回关闭后的选择状态，组件层负责写入状态和派发事件。
			// Shared action only returns selection state after close; the component layer writes state and emits events.
			const action = resolveCalendarCloseAction({ clear });
			if (action.shouldClear) {
				selectedDate = action.selectedDates;
			}
			onclose?.();
		}
	});
</script>

<svelte:head>
	<style>
		{css}
	</style>
</svelte:head>

{#snippet calendarContent()}
	<div class={calendarState.headerClass}>
		{#if calendarState.showQuickSelect}
			<div class={calendarState.quickSelectListClass}>
				{#each calendarState.quickSelectItems as quickItem (quickItem.index)}
					<button
						class={quickItem.buttonClass}
						onclick={() => quickSelectFunc(quickItem.item)}
					>
						{quickItem.label}
					</button>
				{/each}
			</div>
		{/if}
		<div class={calendarState.weekRowClass}>
			{#each calendarState.weekItems as weekItem (weekItem.index)}
				<div class={weekItem.className}>
					{weekItem.text}
				</div>
			{/each}
		</div>
	</div>
	<div
		class={calendarState.scrollClass}
		style={calendarState.scrollStyleString}
		bind:this={scrollElement}
	>
		{#snippet monthContentInner(monthItem: CalendarMonthViewItemProps)}
			<div class={calendarState.monthContainerClass}>
				<div class={calendarState.monthTitleClass}>
					<span class={calendarState.monthTitleTextClass}>
						{resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month)}
					</span>
					{monthItem.year}
				</div>
					<div class={calendarState.monthGridClass}>
						{#each monthItem.dayItems as dayItem (dayItem.index)}
							{@const day = dayItem.day}
							{@const dayCell = dayItem.dayCell}
							<button
								class={dayCell.outerClass}
								onclick={() => {
									if (!day.disabled) clickDayFunc(monthItem.year, monthItem.month, day);
								}}
								style={dayCell.outerStyleString}
							>
								<div class={dayCell.innerClass}>
								<div class={calendarState.dayNumberClass} class:text-error={weekendRed && day.text && resolveCalendarIsWeekend(startSunday, dayItem.index % 7)}>
									{resolveCalendarDayNumberText(day.text)}
								</div>
								<div class={calendarState.dayInfoClass}>{dayCell.infoText}</div>
								{#if day.text && day.disabled}
									<div
										class={calendarState.disabledMarkClass}
									>
										<!-- 公共 Calendar 禁用图标 SVG 数据在 common 中维护。 / Shared Calendar disabled SVG data lives in common. -->
										<SvgIcon svg={calendarDisabledSvg} width="100%" height="100%" />
									</div>
								{/if}
							</div>
						</button>
					{/each}
				</div>
				{#if monthMark}
					<div
						class={calendarState.monthMarkClass}
					>
						{resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month)}
					</div>
				{/if}
			</div>
		{/snippet}
		{#each calendarState.monthViewItems as item (item.index)}
			{#if monthCard}
				<Card {...calendarState.monthCardProps}>
					{@render monthContentInner(item)}
				</Card>
			{:else}
				{@render monthContentInner(item)}
			{/if}
		{/each}
	</div>
{/snippet}

{#if calendarState.usePopup}
	<Popup
		bind:visible
		size={0}
		maskClosable
		transitionDistance={calendarState.transitionDistance}
		{...calendarState.popupProps}
	>
		<div>
			{@render calendarContent()}
			<div class={calendarState.footerClass}>
				<Button {...button} onclick={confirmFunc}>
					{calendarState.texts.confirmText}
					{calendarState.selectedSummary}
				</Button>
			</div>
		</div>
	</Popup>
{:else}
	<div>
		{@render calendarContent()}
	</div>
{/if}
