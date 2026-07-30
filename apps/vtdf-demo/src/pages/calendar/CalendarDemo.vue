<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Calendar, Cell } from 'vtdf/components';
import type { InfoDateProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const messages = {
	zh_CN: {
		basic: '基础用法',
		multiple: '多选',
		range: '范围选择',
		startSunday: '从周日开始',
		weekendRed: '周末文字标红',
		noCardMark: '不使用卡片样式且加水印',
		higher: '高一点',
		infoDates: '自定义显示信息的日期',
		noRadius: '不要圆角',
		bigRadius: '加大圆角',
		noAnimation: '滚动时关闭动画',
		buttonStyle: '配置确认按钮样式',
		popupRadius: '顶部来点圆角',
		monthRange: '定义开始与结束月',
		disabledDates: '自定义不可选日期',
		hideSelectedDay: '多选或范围选择时不显示已选天数',
		initMonth: '自定义初始显示月份',
		initMonthSub: '开始月份为当前月份前第三个月',
		quickSelect: '展示一些快速选择项',
		includeToday: '快速选择天数时包含当天',
		sundayWeek: '从周日开始快速选择本周',
		selectedTitle: '当前选定了以下共 {count} 天：',
		pleaseSelect: '请选定日期',
		getSelected: '获取返回的选定日期',
		formatSelected: '自定义返回的日期格式',
		closeTodayHighlight: '今日日期关闭高亮显示',
		keepSelected: '关闭时不清空已选日期',
		cardStyle: '自定义月份卡片样式',
		withoutPopup: '不使用弹出层',
		infoLabels: ['出发', '入住', '购物', '拍照', '离店', '回程'],
		outFormat: 'YYYY年MM月DD日'
	},
	en_US: {
		basic: 'Basic usage',
		multiple: 'Choice',
		range: 'Range selection',
		startSunday: 'Starting from Sunday',
		weekendRed: 'Weekend text marking red',
		noCardMark: 'No card style but add watermark',
		higher: 'Higher',
		infoDates: 'Customize the date of display information',
		noRadius: 'Do not round the corner',
		bigRadius: 'Increase the corner',
		noAnimation: 'Turn off the animation when rolling',
		buttonStyle: 'Configure confirmation button style',
		popupRadius: 'Top rounded corner',
		monthRange: 'Definition start and end month',
		disabledDates: 'Customize the unsalented date',
		hideSelectedDay: 'No showed days have been displayed',
		initMonth: 'Customized initial display month',
		initMonthSub: 'Third month before the current month',
		quickSelect: 'Show some fast selection items',
		includeToday: 'Quickly choose to include that day',
		sundayWeek: 'Select this week from Sunday',
		selectedTitle: 'The following is the following total {count} day:',
		pleaseSelect: 'Please select the date',
		getSelected: 'Get the selection date of returning',
		formatSelected: 'Customized date format',
		closeTodayHighlight: "Turn off today's highlight display",
		keepSelected: 'Do not clear the selected date when closing',
		cardStyle: 'Custom month card style',
		withoutPopup: 'Without popup',
		infoLabels: ['Set off', 'Stay', 'Shopping', 'Photo', 'Leave', 'Return'],
		outFormat: 'M/D/Y'
	}
};

const text = computed(() => messages[props.locale]);
const visible = reactive<Record<string, boolean>>({
	visible1: false,
	visible2: false,
	visible3: false,
	visible4: false,
	visible5: false,
	visible6: false,
	visible7: false,
	visible8: false,
	visible9: false,
	visible10: false,
	visible11: false,
	visible12: false,
	visible13: false,
	visible14: false,
	visible15: false,
	visible16: false,
	visible17: false,
	visible18: false,
	visible19: false,
	visible20: false,
	visible21: false,
	visible22: false,
	visible23: false,
	visible24: false,
	visible25: false
});
const now = new Date();
const infoDates = computed<InfoDateProps[]>(() =>
	Array.from({ length: 6 }, (_, index) => {
		const date = new Date(now.getTime() + index * 24 * 60 * 60 * 1000);
		return {
			text: `${date.getFullYear()}${`${date.getMonth() + 1}`.padStart(2, '0')}${`${date.getDate()}`.padStart(2, '0')}`,
			info: text.value.infoLabels[index]
		};
	})
);
const disabledDates = computed<string[]>(() => {
	const before7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	return Array.from({ length: 14 }, (_, index) => {
		const date = new Date(before7.getTime() + index * 24 * 60 * 60 * 1000);
		return `${date.getFullYear()}${`${date.getMonth() + 1}`.padStart(2, '0')}${`${date.getDate()}`.padStart(2, '0')}`;
	});
});
const getInitMonth = (n: number) => {
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const newMonth = month - n;
	if (newMonth > 0) {
		return `${year}${`${newMonth}`.padStart(2, '0')}`;
	}
	return `${year - 1}${`${12 + newMonth}`.padStart(2, '0')}`;
};
const initMonth = getInitMonth(3);
const quickSelectsDay = [-5, -2, 3, 7];
const selectedDates = ref<string[]>([]);
const selectedFormatDates = ref<string[]>([]);
const noPopupDates = ref<string[]>([]);
const selectedTitle = (count: number) => text.value.selectedTitle.replace('{count}', `${count}`);
</script>

<template>
	<div class="py-4">
		<Cell :title="text.basic" @click="visible.visible1 = true" />
		<Calendar v-model:visible="visible.visible1" />

		<Cell :title="text.multiple" @click="visible.visible7 = true" />
		<Calendar v-model:visible="visible.visible7" mode="multiple" />

		<Cell :title="text.range" @click="visible.visible8 = true" />
		<Calendar v-model:visible="visible.visible8" mode="range" />

		<Cell :title="text.startSunday" @click="visible.visible2 = true" />
		<Calendar v-model:visible="visible.visible2" start-sunday />

		<Cell :title="text.weekendRed" @click="visible.visible3 = true" />
		<Calendar v-model:visible="visible.visible3" weekend-red />

		<Cell :title="text.noCardMark" @click="visible.visible4 = true" />
		<Calendar v-model:visible="visible.visible4" :month-card="false" month-mark />

		<Cell :title="text.higher" @click="visible.visible5 = true" />
		<Calendar v-model:visible="visible.visible5" :height="60" />

		<Cell :title="text.infoDates" @click="visible.visible6 = true" />
		<Calendar v-model:visible="visible.visible6" :info-dates="infoDates" />

		<Cell :title="text.noRadius" @click="visible.visible9 = true" />
		<Calendar v-model:visible="visible.visible9" mode="range" radius="none" />

		<Cell :title="text.bigRadius" @click="visible.visible10 = true" />
		<Calendar v-model:visible="visible.visible10" mode="range" radius="2xl" />

		<Cell :title="text.noAnimation" @click="visible.visible18 = true" />
		<Calendar v-model:visible="visible.visible18" :use-animation="false" />

		<Cell :title="text.buttonStyle" @click="visible.visible11 = true" />
		<Calendar v-model:visible="visible.visible11" :button="{ radius: 'full' }" />

		<Cell :title="text.popupRadius" @click="visible.visible19 = true" />
		<Calendar v-model:visible="visible.visible19" :popup="{ radius: 'xl' }" />

		<Cell :title="text.monthRange" @click="visible.visible12 = true" />
		<Calendar v-model:visible="visible.visible12" start-month="202101" end-month="202106" />

		<Cell :title="text.disabledDates" @click="visible.visible13 = true" />
		<Calendar v-model:visible="visible.visible13" :disabled-dates="disabledDates" mode="range" />

		<Cell :title="text.hideSelectedDay" @click="visible.visible14 = true" />
		<Calendar v-model:visible="visible.visible14" mode="range" :show-selected-day="false" />

		<Cell :title="text.initMonth" :sub-title="text.initMonthSub" @click="visible.visible15 = true" />
		<Calendar v-model:visible="visible.visible15" :init-month="initMonth" />

		<Cell :title="text.quickSelect" @click="visible.visible16 = true" />
		<Calendar v-model:visible="visible.visible16" mode="range" :quick-selects="['week', 'month', 'quarter', -3, -7, -30, 3, 7, 30]" />

		<Cell :title="text.includeToday" @click="visible.visible23 = true" />
		<Calendar v-model:visible="visible.visible23" mode="range" :quick-selects="quickSelectsDay" include-today />

		<Cell :title="text.sundayWeek" @click="visible.visible17 = true" />
		<Calendar v-model:visible="visible.visible17" mode="range" start-sunday :quick-selects="['week']" />

		<div class="px-4">
			<div v-if="selectedDates.length">{{ selectedTitle(selectedDates.length) }}</div>
			<div v-else>{{ text.pleaseSelect }}</div>
		</div>
		<div class="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
			<div v-for="(item, index) in selectedDates" :key="index" class="text-center">
				{{ item }}
			</div>
		</div>
		<Cell :title="text.getSelected" @click="visible.visible20 = true" />
		<Calendar v-model:visible="visible.visible20" mode="range" @confirm="(dates: string[]) => (selectedDates = dates)" />

		<div class="px-4">
			<div v-if="selectedFormatDates.length">{{ selectedTitle(selectedFormatDates.length) }}</div>
			<div v-else>{{ text.pleaseSelect }}</div>
		</div>
		<div class="grid grid-cols-3 gap-2 p-2 text-sm text-primary dark:text-dark">
			<div v-for="(item, index) in selectedFormatDates" :key="index" class="text-center">
				{{ item }}
			</div>
		</div>
		<Cell :title="text.formatSelected" @click="visible.visible21 = true" />
		<Calendar
			v-model:visible="visible.visible21"
			mode="range"
			:out-format="text.outFormat"
			@confirm="(dates: string[]) => (selectedFormatDates = dates)"
		/>

		<Cell :title="text.closeTodayHighlight" @click="visible.visible22 = true" />
		<Calendar v-model:visible="visible.visible22" :highlight-today="false" />

		<Cell :title="text.keepSelected" @click="visible.visible24 = true" />
		<Calendar v-model:visible="visible.visible24" mode="range" :clear="false" />

		<Cell :title="text.cardStyle" @click="visible.visible25 = true" />
		<Calendar v-model:visible="visible.visible25" :card="{ bg: 'theme' }" />

		<div class="px-4 py-2">{{ text.withoutPopup }}</div>
		<template v-if="noPopupDates.length">
			<div class="px-4">{{ selectedTitle(noPopupDates.length) }}</div>
			<div class="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
				<div v-for="(item, index) in noPopupDates" :key="index" class="text-center">
					{{ item }}
				</div>
			</div>
		</template>
		<Calendar :popup="null" mode="range" @confirm="(dates: string[]) => (noPopupDates = dates)" />
	</div>
</template>
