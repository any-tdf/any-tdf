<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { resolveConditionalProps } from '@any-tdf/common/derived/props';
import type { PopupProps, TimePickerObjProps, TimePickerProps } from '../types';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Popup from './Popup.vue';
import ScrollRadio from './ScrollRadio.vue';

type PopupWithAlias = PopupProps & {};
type TimePickerComponentProps = Omit<TimePickerProps, 'popup'> & {
	popup?: PopupWithAlias | null;
};

const props = withDefaults(defineProps<TimePickerComponentProps>(), {
	visible: false,
	type: 'YYYYMMDDhhmmss',
	yearProps: () => ({}),
	monthProps: () => ({}),
	dayProps: () => ({}),
	hourProps: () => ({}),
	minuteProps: () => ({}),
	secondProps: () => ({}),
	initYear: '',
	initMonth: '',
	initDay: '',
	initHour: '',
	initMinute: '',
	initSecond: '',
	minuteStep: 1,
	secondStep: 1,
	yearRange: () => [],
	monthRange: () => [1, 12],
	hourRange: () => [0, 23],
	minuteRange: () => [0, 59],
	secondRange: () => [0, 59],
	showTips: true,
	outFormat: '',
	height: 30,
	popup: () => ({})
});

const emit = defineEmits<{
	(event: 'update:visible', value: boolean): void;
	(event: 'cancel'): void;
	(event: 'confirm', timeStr: string, timeObj: TimePickerObjProps): void;
	(event: 'close'): void;
}>();

const config = useConfig();
const innerVisible = ref(resolveTimePickerInitialVisible(props.visible));
const now = new Date();
const currentTime = resolveTimePickerNowSnapshot(now);
const baseDayData = ref<{ label: string }[]>([]);
const dayInitIndex = ref(0);
const yearIndex = ref(0);
const monthIndex = ref(0);
const dayIndex = ref(0);
const hourIndex = ref(0);
const minuteIndex = ref(0);
const secondIndex = ref(0);
const innerHeight = ref(
	resolveViewportDimension({
		value: typeof window === 'undefined' ? undefined : window.innerHeight
	})
);

const timePickerLang = computed(() => config.locale?.timePicker || zh_CN.timePicker);
// 公共函数统一组装 TimePicker 派生入参，组件只传入当前 props、状态和环境数值。
// Shared helper normalizes TimePicker derivation options from current props, state and environment values.
const timePickerBaseOptions = computed(() =>
	resolveTimePickerStateOptions<PopupWithAlias>({
		currentTime,
		defaults: timePickerLang.value,
		props,
		viewportHeight: innerHeight.value
	})
);

// 公共派生层统一 TimePicker 的列数据、文本、样式、可见性和 Popup / inline 布局，滚动状态写入留在组件层。
// Shared derivation centralizes TimePicker column data, text, styles, visibility and Popup / inline layout; scroll state writes stay in the component layer.
const initialTimePickerState = computed(() => resolveTimePickerDerived<PopupWithAlias>(timePickerBaseOptions.value));
const timePickerState = computed(() =>
	resolveTimePickerDerived<PopupWithAlias>({
		...timePickerBaseOptions.value,
		currentDayData: baseDayData.value,
		dayInitIndex: dayInitIndex.value
	})
);
const popupBindProps = computed(() =>
	resolveConditionalProps({
		enabled: timePickerState.value.usePopup,
		props: timePickerState.value.popupConfig.popupProps
	})
);

const setVisible = (value: boolean) => {
	innerVisible.value = value;
	emit('update:visible', value);
};

const emitClose = () => {
	emit('close');
};

const scrollEndYear = (index: number, isTouch?: boolean) => {
	// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
	// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
	const action = resolveTimePickerYearScrollAction({
		currentTime,
		index,
		isTouch,
		yearData: timePickerState.value.yearData,
		monthData: timePickerState.value.baseMonthData,
		monthIndex: monthIndex.value
	});
	yearIndex.value = action.nextYearIndex;
	const refresh = action.refresh;
	if (refresh.shouldRefresh) {
		baseDayData.value = [];
		dayInitIndex.value = refresh.dayIndex;
		dayIndex.value = refresh.dayIndex;
		setTimeout(() => {
			baseDayData.value = refresh.dayData;
		});
	}
};

const scrollEndMonth = (index: number, isTouch?: boolean) => {
	// 公共动作函数只返回索引和刷新计划，清空和异步填充保留在组件层。
	// Shared action helper only returns indexes and refresh plans; clearing and async fill stay in the component layer.
	const action = resolveTimePickerMonthScrollAction({
		currentTime,
		index,
		isTouch,
		yearData: timePickerState.value.yearData,
		monthData: timePickerState.value.baseMonthData,
		yearIndex: yearIndex.value
	});
	monthIndex.value = action.nextMonthIndex;
	const refresh = action.refresh;
	if (refresh.shouldRefresh) {
		baseDayData.value = [];
		dayInitIndex.value = refresh.dayIndex;
		dayIndex.value = refresh.dayIndex;
		setTimeout(() => {
			baseDayData.value = refresh.dayData;
		});
	}
};

const clickCancel = () => {
	// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
	// Shared action function only returns close and callback decisions; the component writes state and fires events.
	const action = resolveTimePickerCancelAction();
	setVisible(action.nextVisible);
	if (action.shouldCancel) emit('cancel');
	if (action.shouldClose) emitClose();
};

const clickConfirm = () => {
	// 公共动作函数组装确认值并返回关闭决策，组件层只负责状态写入和事件触发。
	// Shared action function builds confirm values and returns close decisions; the component writes state and fires events.
	const action = resolveTimePickerConfirmAction({
		type: timePickerState.value.typeInner,
		outFormat: props.outFormat,
		yearData: timePickerState.value.yearData,
		monthData: timePickerState.value.baseMonthData,
		dayData: baseDayData.value,
		hourData: timePickerState.value.baseHourData,
		minuteData: timePickerState.value.baseMinuteData,
		secondData: timePickerState.value.baseSecondData,
		yearIndex: yearIndex.value,
		monthIndex: monthIndex.value,
		dayIndex: dayIndex.value,
		hourIndex: hourIndex.value,
		minuteIndex: minuteIndex.value,
		secondIndex: secondIndex.value
	});
	setVisible(action.nextVisible);
	if (action.shouldClose) emitClose();
	if (action.shouldConfirm) emit('confirm', action.timeStr, action.outData);
};

const handlePopupClose = () => {
	// 公共 close action 只返回可见状态和 close 回调决策，Popup 事件留在组件层。
	// Shared close action only returns visibility and close callback decisions; Popup events stay in the component layer.
	const action = resolveTimePickerCloseAction();
	if (!action.shouldClose) return;
	setVisible(action.nextVisible);
	if (action.shouldEmitClose) emitClose();
};

const updateWindowHeight = () => {
	innerHeight.value = resolveViewportDimension({ value: window.innerHeight });
};

watch(
	() => props.visible,
	(value) => {
		innerVisible.value = resolveTimePickerInitialVisible(value);
	}
);

watch(
	() => [initialTimePickerState.value.tempDayData, initialTimePickerState.value.initDayIndex] as const,
	() => {
		baseDayData.value = [...initialTimePickerState.value.tempDayData];
		dayInitIndex.value = initialTimePickerState.value.safeInitDayIndex;
		dayIndex.value = initialTimePickerState.value.safeInitDayIndex;
	},
	{ immediate: true }
);

watch(
	() => initialTimePickerState.value.initYearIndex,
	() => {
		yearIndex.value = initialTimePickerState.value.safeInitYearIndex;
	},
	{ immediate: true }
);

watch(
	() => initialTimePickerState.value.initMonthIndex,
	() => {
		monthIndex.value = initialTimePickerState.value.safeInitMonthIndex;
	},
	{ immediate: true }
);

watch(
	() => initialTimePickerState.value.initHourIndex,
	() => {
		hourIndex.value = initialTimePickerState.value.safeInitHourIndex;
	},
	{ immediate: true }
);

watch(
	() => initialTimePickerState.value.initMinuteIndex,
	() => {
		minuteIndex.value = initialTimePickerState.value.safeInitMinuteIndex;
	},
	{ immediate: true }
);

watch(
	() => initialTimePickerState.value.initSecondIndex,
	() => {
		secondIndex.value = initialTimePickerState.value.safeInitSecondIndex;
	},
	{ immediate: true }
);

onMounted(() => {
	window.addEventListener('resize', updateWindowHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateWindowHeight);
});
</script>

<template>
	<component
		:is="timePickerState.usePopup ? Popup : 'div'"
		v-bind="popupBindProps"
		:visible="innerVisible"
		:size="0"
		mask-closable
		:transition-distance="timePickerState.transitionDistance"
		@close="handlePopupClose"
	>
		<div :class="timePickerState.headerClass">
			<button type="button" :class="timePickerState.cancelButtonClass" @click="clickCancel">
				{{ timePickerState.texts.cancelText }}
			</button>
			<div>{{ timePickerState.texts.title }}</div>
			<button type="button" :class="timePickerState.confirmButtonClass" @click="clickConfirm">
				{{ timePickerState.texts.confirmText }}
			</button>
		</div>

		<div v-if="showTips" :class="timePickerState.tipsClass">
			<div
				v-for="tipItem in timePickerState.tipItems"
				:key="tipItem.key"
				:class="timePickerState.tipItemClass"
				:style="tipItem.tipStyleValue"
			>
				{{ tipItem.tipText }}
			</div>
		</div>

		<div :class="timePickerState.contentClass" :style="timePickerState.contentStyleValue">
			<div
				v-if="timePickerState.columns.year.visible"
				:class="timePickerState.columns.year.rootClass"
				:style="timePickerState.columns.year.styleValue"
			>
				<ScrollRadio
					:data="timePickerState.columns.year.data"
					:init-index="timePickerState.columns.year.safeInitIndex"
					:auto-scroll-to-last="false"
					v-bind="yearProps"
					@scroll-end="scrollEndYear"
				/>
			</div>
			<div
				v-if="timePickerState.columns.month.visible"
				:class="timePickerState.columns.month.rootClass"
				:style="timePickerState.columns.month.styleValue"
			>
				<ScrollRadio
					:data="timePickerState.columns.month.data"
					:last-selected-index="timePickerState.columns.month.safeInitIndex"
					v-bind="monthProps"
					@scroll-end="scrollEndMonth"
				/>
			</div>
			<div
				v-if="baseDayData.length > 0 && timePickerState.columns.day.visible"
				:class="timePickerState.columns.day.rootClass"
				:style="timePickerState.columns.day.styleValue"
			>
				<ScrollRadio
					:data="baseDayData"
					:last-selected-index="dayInitIndex"
					v-bind="dayProps"
					@scroll-end="(index) => (dayIndex = index)"
				/>
			</div>
			<div
				v-if="timePickerState.columns.hour.visible"
				:class="timePickerState.columns.hour.rootClass"
				:style="timePickerState.columns.hour.styleValue"
			>
				<ScrollRadio
					:data="timePickerState.columns.hour.data"
					:last-selected-index="timePickerState.columns.hour.safeInitIndex"
					v-bind="hourProps"
					@scroll-end="(index) => (hourIndex = index)"
				/>
			</div>
			<div
				v-if="timePickerState.columns.minute.visible"
				:class="timePickerState.columns.minute.rootClass"
				:style="timePickerState.columns.minute.styleValue"
			>
				<ScrollRadio
					:data="timePickerState.columns.minute.data"
					:last-selected-index="timePickerState.columns.minute.safeInitIndex"
					v-bind="minuteProps"
					@scroll-end="(index) => (minuteIndex = index)"
				/>
			</div>
			<div
				v-if="timePickerState.columns.second.visible"
				:class="timePickerState.columns.second.rootClass"
				:style="timePickerState.columns.second.styleValue"
			>
				<ScrollRadio
					:data="timePickerState.columns.second.data"
					:last-selected-index="timePickerState.columns.second.safeInitIndex"
					v-bind="secondProps"
					@scroll-end="(index) => (secondIndex = index)"
				/>
			</div>
		</div>
	</component>
</template>
