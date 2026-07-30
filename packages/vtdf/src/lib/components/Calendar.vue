<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
	resolveCalendarQuickSelectScrollFlow,
	resolveCalendarStateOptions,
	resolveCalendarTodayState
} from '@any-tdf/common/derived/calendar';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { resolveConditionalProps, splitButtonCallbacks } from '@any-tdf/common/derived/props';
import { calendarDisabledSvg } from '@any-tdf/common/svg/common';
import { getNowBeforeOrAfterMonth } from '@any-tdf/common/utils';
import { zh_CN } from '../lang';
import type { ButtonProps, CalendarProps, CardProps, PopupProps } from '../types';
import { useConfig } from './adapter/config';
import Button from './Button.vue';
import Card from './Card.vue';
import Popup from './Popup.vue';
import SvgIcon from './SvgIcon.vue';

type CalendarDay = {
	text: string;
	info?: string;
	disabled?: boolean;
	start?: boolean;
	end?: boolean;
};
type CalendarQuickSelect = NonNullable<CalendarProps['quickSelects']>[number];
type CalendarPopupProps = PopupProps & {};
type CalendarButtonProps = ButtonProps & {};
type CalendarVueProps = Omit<CalendarProps, 'popup' | 'button' | 'card' | 'radius'> & {
	popup?: CalendarPopupProps | null;
	button?: CalendarButtonProps;
	card?: CardProps;
	radius?: NonNullable<CalendarProps['radius']> | '';
};

const props = withDefaults(defineProps<CalendarVueProps>(), {
	visible: false,
	startMonth: () => getNowBeforeOrAfterMonth(-6),
	endMonth: () => getNowBeforeOrAfterMonth(6),
	initMonth: () => getNowBeforeOrAfterMonth(0),
	initSelectedDates: () => [],
	mode: 'single',
	startSunday: false,
	weekendRed: false,
	monthCard: true,
	monthMark: false,
	monthMarkSize: '7xl',
	height: 50,
	infoDates: () => [],
	disabledDates: () => [],
	radius: '',
	showSelectedDay: true,
	quickSelects: () => [],
	includeToday: false,
	useAnimation: true,
	highlightToday: true,
	outFormat: 'YYYYMMDD',
	popup: () => ({}),
	button: () => ({}),
	card: () => ({}),
	clear: true
});

const emit = defineEmits<{
	(event: 'update:visible', visible: boolean): void;
	(event: 'confirm', dates: string[]): void;
	(event: 'close'): void;
}>();

const config = useConfig();
const internalVisible = ref(resolveCalendarInitialVisible(props.visible));
const scrollElement = ref<HTMLDivElement | null>(null);
const isQuickSelect = ref(false);
const selectedDate = ref<string[]>([]);
const rangeArr = ref<string[]>([]);
const selectedDateStr = ref('');
const quickSelectItem = ref<CalendarQuickSelect | ''>('');
const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);
const todayState = resolveCalendarTodayState({ now: new Date() });
const todayStr = todayState.todayStr;

const calendarLang = computed(() => config.locale?.calendar || zh_CN.calendar);
const buttonConfig = computed(() => splitButtonCallbacks(props.button));
const buttonProps = computed(() => buttonConfig.value.buttonProps);

// 公共派生层只处理 Calendar 文案、月份数据、日期单元格和摘要，选择状态与 DOM 滚动留在组件内。
// Shared derived layer handles Calendar text, month data, day cells and summary; selection state and DOM scrolling stay in the component.
const calendarState = computed(() =>
	resolveCalendarDerived<CalendarPopupProps, CardProps, string, CalendarQuickSelect>(
		resolveCalendarStateOptions<CalendarPopupProps, CardProps, string, CalendarQuickSelect>({
			defaults: calendarLang.value,
			props,
			viewportHeight: innerHeight.value,
			isQuickSelect: isQuickSelect.value,
			quickSelectItem: quickSelectItem.value,
			cardSpacingPriority: 'calendar',
			selectedDateStr: selectedDateStr.value,
			selectedDateCount: selectedDate.value.length,
			todayStr,
			textTone: 'plain'
		})
	)
);
const monthCardBindProps = computed(() => resolveConditionalProps({ enabled: props.monthCard, props: calendarState.value.monthCardProps }));

const clickDay = (year: string, month: string, day: CalendarDay) => {
	// 公共流程计算日期字符串和点击后的选择状态，事件派发留在组件层。
	// Shared flow computes the date string and selection state after a date click; event dispatch stays in the component layer.
	const nextState = resolveCalendarDayClickFlow({
		year,
		month,
		dayText: day.text,
		mode: props.mode,
		selectedDates: selectedDate.value,
		rangeDates: rangeArr.value,
		disabledDates: props.disabledDates,
		isQuickSelect: isQuickSelect.value,
		usePopup: calendarState.value.usePopup,
		outFormat: props.outFormat
	});
	if (!nextState.shouldUpdate) return;
	isQuickSelect.value = nextState.isQuickSelect;
	selectedDate.value = nextState.selectedDates;
	selectedDateStr.value = nextState.selectedDateStr;
	rangeArr.value = nextState.rangeDates;
	if (nextState.confirmDates) {
		emit('confirm', nextState.confirmDates);
	}
};

const quickSelect = (type: CalendarQuickSelect) => {
	// 公共流程返回快捷选择状态，真实滚动写入留在组件层。
	// Shared flow returns quick-select state while the real scroll write stays in the component layer.
	const action = resolveCalendarQuickSelectFlow({
		item: type,
		startSunday: props.startSunday,
		includeToday: props.includeToday,
		disabledDates: props.disabledDates
	});
	isQuickSelect.value = action.isQuickSelect;
	quickSelectItem.value = type;
	const newSelectedDate = action.selectedDates;
	selectedDate.value = newSelectedDate;
	selectedDateStr.value = action.selectedDateStr;

	nextTick(() => {
		if (!scrollElement.value || newSelectedDate.length === 0) return;
		// 公共流程只计算目标滚动位置，真实 DOM 写入留在组件层。
		// Shared flow only calculates the target scroll position; the real DOM write stays in the component layer.
		const { scrollAction } = resolveCalendarQuickSelectScrollFlow({
			selectedDates: newSelectedDate,
			monthList: calendarState.value.monthList,
			scrollHeight: scrollElement.value.scrollHeight
		});
		if (scrollAction.shouldScroll) {
			scrollElement.value.scrollTop = scrollAction.scrollTop;
		}
	});
};

const confirm = () => {
	// 公共 action 只返回确认后的状态和日期数据，事件派发留在组件层。
	// Shared action only returns confirmed state and date data; event dispatch stays in the component layer.
	const action = resolveCalendarConfirmAction({
		outFormat: props.outFormat,
		selectedDates: selectedDate.value
	});
	internalVisible.value = action.visible;
	emit('update:visible', false);
	emit('confirm', action.confirmDates);
	close();
};

const close = () => {
	// 公共 action 只返回关闭后的选择状态，组件层负责写入状态和派发事件。
	// Shared action only returns selection state after close; the component layer writes state and emits events.
	const action = resolveCalendarCloseAction({
		clear: props.clear,
		selectedDates: selectedDate.value
	});
	internalVisible.value = action.visible;
	emit('update:visible', false);
	selectedDate.value = action.selectedDates;
	selectedDateStr.value = action.selectedDateStr;
	emit('close');
};

const handlePopupClose = () => {
	close();
};

const handleConfirmClick = (event?: MouseEvent) => {
	const buttonOnClick = buttonConfig.value.buttonOnClick;
	if (typeof buttonOnClick === 'function') buttonOnClick(event);
	confirm();
};

const handleResize = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

watch(
	() => props.visible,
	(visible) => {
		internalVisible.value = resolveCalendarInitialVisible(visible);
	}
);

watch(
	() => props.initSelectedDates,
	(dates) => {
		// 公共 action 只返回初始化日期同步结果，组件层负责写入本地状态。
		// Shared action only returns initial date sync results; local state writes stay in the component layer.
		const action = resolveCalendarInitialSelectedDatesAction({ initSelectedDates: dates });
		if (action.shouldSync) {
			selectedDate.value = action.selectedDates;
			selectedDateStr.value = action.selectedDateStr;
		}
	},
	{ immediate: true }
);

watch(
	() => [internalVisible.value, isQuickSelect.value, calendarState.value.initMonthIndex, calendarState.value.monthList.length],
	async () => {
		if (scrollElement.value && internalVisible.value && !isQuickSelect.value) {
			await nextTick();
			const scrollAction = resolveCalendarMonthScrollAction({
				index: calendarState.value.initMonthIndex,
				monthCount: calendarState.value.monthList.length,
				scrollHeight: scrollElement.value.scrollHeight
			});
			if (scrollAction.shouldScroll) {
				scrollElement.value.scrollTop = scrollAction.scrollTop;
			}
		}
	},
	{ flush: 'post' }
);

onMounted(() => {
	handleResize();
	window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<template>
	<Popup
		v-if="calendarState.usePopup"
		:visible="internalVisible"
		:size="0"
		:mask-closable="true"
		:transition-distance="calendarState.transitionDistance"
		v-bind="calendarState.popupProps"
		@close="handlePopupClose"
	>
		<div>
			<div :class="calendarState.headerClass">
				<div v-if="calendarState.showQuickSelect" :class="calendarState.quickSelectListClass">
					<button
						v-for="quickItem in calendarState.quickSelectItems"
						:key="quickItem.index"
						type="button"
						:class="quickItem.buttonClass"
						@click="quickSelect(quickItem.item)"
					>
						{{ quickItem.label }}
					</button>
				</div>
				<div :class="calendarState.weekRowClass">
					<div v-for="weekItem in calendarState.weekItems" :key="weekItem.index" :class="weekItem.className">
						{{ weekItem.text }}
					</div>
				</div>
			</div>

			<div ref="scrollElement" :class="calendarState.scrollClass" :style="calendarState.scrollStyleValue">
				<component
					:is="monthCard ? Card : 'div'"
					v-for="monthItem in calendarState.monthViewItems"
					:key="monthItem.index"
					v-bind="monthCardBindProps"
				>
					<div :class="calendarState.monthContainerClass">
						<div :class="calendarState.monthTitleClass">
							<span :class="calendarState.monthTitleTextClass">{{
								resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month)
							}}</span>
							{{ monthItem.year }}
						</div>
						<div :class="calendarState.monthGridClass">
							<button
								v-for="dayItem in monthItem.dayItems"
								:key="dayItem.index"
								type="button"
								:class="dayItem.dayCell.outerClass"
								:style="dayItem.dayCell.outerStyle"
								@click="!dayItem.day.disabled && clickDay(monthItem.year, monthItem.month, dayItem.day)"
							>
								<div :class="dayItem.dayCell.innerClass">
									<div :class="calendarState.dayNumberClass">
										{{ resolveCalendarDayNumberText(dayItem.day.text) }}
									</div>
									<div :class="calendarState.dayInfoClass">{{ dayItem.dayCell.infoText }}</div>
									<div v-if="dayItem.day.text && dayItem.day.disabled" :class="calendarState.disabledMarkClass">
										<!-- 公共 Calendar 禁用图标 SVG 数据在 common 中维护。 / Shared Calendar disabled SVG data lives in common. -->
										<SvgIcon :svg="calendarDisabledSvg" width="100%" height="100%" />
									</div>
								</div>
							</button>
						</div>
						<div v-if="monthMark" :class="calendarState.monthMarkClass">
							{{ resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month) }}
						</div>
					</div>
				</component>
			</div>

			<div :class="calendarState.footerClass">
				<Button v-bind="buttonProps" @click="handleConfirmClick">
					{{ calendarState.texts.confirmText }}
					{{ calendarState.selectedSummary }}
				</Button>
			</div>
		</div>
	</Popup>

	<div v-else>
		<div :class="calendarState.headerClass">
			<div v-if="calendarState.showQuickSelect" :class="calendarState.quickSelectListClass">
				<button
					v-for="quickItem in calendarState.quickSelectItems"
					:key="quickItem.index"
					type="button"
					:class="quickItem.buttonClass"
					@click="quickSelect(quickItem.item)"
				>
					{{ quickItem.label }}
				</button>
			</div>
			<div :class="calendarState.weekRowClass">
				<div v-for="weekItem in calendarState.weekItems" :key="weekItem.index" :class="weekItem.className">
					{{ weekItem.text }}
				</div>
			</div>
		</div>

		<div ref="scrollElement" :class="calendarState.scrollClass" :style="calendarState.scrollStyleValue">
			<component
				:is="monthCard ? Card : 'div'"
				v-for="monthItem in calendarState.monthViewItems"
				:key="monthItem.index"
				v-bind="monthCardBindProps"
			>
				<div :class="calendarState.monthContainerClass">
					<div :class="calendarState.monthTitleClass">
						<span :class="calendarState.monthTitleTextClass">{{
							resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month)
						}}</span>
						{{ monthItem.year }}
					</div>
					<div :class="calendarState.monthGridClass">
						<button
							v-for="dayItem in monthItem.dayItems"
							:key="dayItem.index"
							type="button"
							:class="dayItem.dayCell.outerClass"
							:style="dayItem.dayCell.outerStyle"
							@click="!dayItem.day.disabled && clickDay(monthItem.year, monthItem.month, dayItem.day)"
						>
							<div :class="dayItem.dayCell.innerClass">
								<div :class="calendarState.dayNumberClass">
									{{ resolveCalendarDayNumberText(dayItem.day.text) }}
								</div>
								<div :class="calendarState.dayInfoClass">{{ dayItem.dayCell.infoText }}</div>
								<div v-if="dayItem.day.text && dayItem.day.disabled" :class="calendarState.disabledMarkClass">
									<SvgIcon :svg="calendarDisabledSvg" width="100%" height="100%" />
								</div>
							</div>
						</button>
					</div>
					<div v-if="monthMark" :class="calendarState.monthMarkClass">
						{{ resolveCalendarMonthLabel(calendarLang.monthTextList, monthItem.month) }}
					</div>
				</div>
			</component>
		</div>
	</div>
</template>
