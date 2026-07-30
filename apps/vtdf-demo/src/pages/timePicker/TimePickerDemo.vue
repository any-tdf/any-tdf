<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Cell, TimePicker } from 'vtdf';
import type { TimePickerObjProps } from 'vtdf/types';

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
		currentlySelected: '当前选定了：',
		selectTime: '请选定时间',
		basic: '基础用法',
		basicSub: '默认选定当前时间，可选前后十年',
		ymdOnly: '只用年月日',
		hmsOnly: '只用时分秒',
		ymdhOnly: '只用年月日时',
		hideTips: '不显示提示',
		rows: '不同列不同可见行',
		widths: '不同列不同宽度',
		aligns: '年数据右对齐，日数据左对齐',
		yearRange: '限定年份区间',
		monthRange: '限定月份区间',
		timeRange: '限定时分秒区间',
		minuteStep: '分钟步长为 5',
		secondStep: '秒步长为 10',
		customFormat: '自定义返回时间格式',
		customFormatSub: '输出格式为 X 年 X 月 X 日 X 时 X 分 X 秒',
		monthFirst: '返回时间月份在前',
		timeObj: '返回时间对象',
		roundedTop: '顶部来点圆角',
		customTitle: '自定义标题',
		customTitleText: '请选择时间',
		initYear: '指定初始选定年份',
		initMonth: '指定初始选定月份',
		initTime: '指定初始选定时分秒',
		withoutPopup: '不使用弹出层',
		outFormat: 'YYYY 年 MM 月 DD 日 hh 时 mm 分 ss 秒'
	},
	en_US: {
		currentlySelected: 'Currently selected:',
		selectTime: 'Please select a time',
		basic: 'Basic Usage',
		basicSub: 'Default to current time, can select 10 years before and after',
		ymdOnly: 'Year Month Day only',
		hmsOnly: 'Hour Minute Second only',
		ymdhOnly: 'Year Month Day Hour only',
		hideTips: 'Hide Tips',
		rows: 'Different visible rows for each column',
		widths: 'Different widths for each column',
		aligns: 'Year data right-aligned, day data left-aligned',
		yearRange: 'Limit year range',
		monthRange: 'Limit month range',
		timeRange: 'Limit hour, minute, second range',
		minuteStep: 'Minute step of 5',
		secondStep: 'Second step of 10',
		customFormat: 'Custom return time format',
		customFormatSub: 'Output format: X year X month X day X hour X minute X second',
		monthFirst: 'Return time with month first',
		timeObj: 'Return time object',
		roundedTop: 'Rounded corners at the top',
		customTitle: 'Custom title',
		customTitleText: 'Please select a time',
		initYear: 'Specify initial selected year',
		initMonth: 'Specify initial selected month',
		initTime: 'Specify initial selected hour, minute, second',
		withoutPopup: 'Without Popup',
		outFormat: 'YYYY year MM month DD day hh hour mm minute ss second'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const visible = reactive(
	Object.fromEntries(
		[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((index) => [`visible${index}`, false])
	) as Record<string, boolean>
);
const defaultTimeStr = ref('');
const customFormatStr = ref('');
const monthFirstStr = ref('');
const timeObj = ref<TimePickerObjProps | Record<string, never>>({});
const timeObjStr = computed(() => JSON.stringify(timeObj.value));
</script>

<template>
	<div class="py-4">
		<div class="px-4">
			<template v-if="defaultTimeStr !== ''">
				{{ text.currentlySelected }}
				<span class="text-primary dark:text-dark mr-2">{{ defaultTimeStr }}</span>
			</template>
			<div v-else>{{ text.selectTime }}</div>
		</div>
		<Cell :title="text.basic" :sub-title="text.basicSub" @click="visible.visible1 = true" />
		<TimePicker v-model:visible="visible.visible1" @confirm="(time) => (defaultTimeStr = time)" />

		<Cell :title="text.ymdOnly" @click="visible.visible2 = true" />
		<TimePicker v-model:visible="visible.visible2" type="YYYYMMDD" />

		<Cell :title="text.hmsOnly" @click="visible.visible3 = true" />
		<TimePicker v-model:visible="visible.visible3" type="hhmmss" />

		<Cell :title="text.ymdhOnly" @click="visible.visible4 = true" />
		<TimePicker v-model:visible="visible.visible4" type="YYYYMMDDhh" />

		<Cell :title="text.hideTips" @click="visible.visible5 = true" />
		<TimePicker v-model:visible="visible.visible5" :show-tips="false" />

		<Cell :title="text.rows" @click="visible.visible6 = true" />
		<TimePicker
			v-model:visible="visible.visible6"
			:year-props="{ showRow: 3 }"
			:hour-props="{ showRow: 7 }"
			:minute-props="{ showRow: 7 }"
			:second-props="{ showRow: 7 }"
		/>

		<Cell :title="text.widths" @click="visible.visible8 = true" />
		<TimePicker v-model:visible="visible.visible8" :year-props="{ flex: 3 }" :day-props="{ flex: 2 }" />

		<Cell :title="text.aligns" @click="visible.visible22 = true" />
		<TimePicker v-model:visible="visible.visible22" type="YYYYMMDD" :year-props="{ align: 'right' }" :day-props="{ align: 'left' }" />

		<Cell :title="text.yearRange" @click="visible.visible9 = true" />
		<TimePicker v-model:visible="visible.visible9" :year-range="[2022, 2025]" />

		<Cell :title="text.monthRange" @click="visible.visible10 = true" />
		<TimePicker v-model:visible="visible.visible10" :month-range="[2, 5]" />

		<Cell :title="text.timeRange" @click="visible.visible11 = true" />
		<TimePicker v-model:visible="visible.visible11" :hour-range="[2, 5]" :minute-range="[25, 45]" :second-range="[5, 10]" />

		<Cell :title="text.minuteStep" @click="visible.visible12 = true" />
		<TimePicker v-model:visible="visible.visible12" :minute-step="5" />

		<Cell :title="text.secondStep" @click="visible.visible13 = true" />
		<TimePicker v-model:visible="visible.visible13" :second-step="10" />

		<div class="px-4">
			<template v-if="customFormatStr !== ''">
				{{ text.currentlySelected }}
				<span class="text-primary dark:text-dark mr-2">{{ customFormatStr }}</span>
			</template>
			<div v-else>{{ text.selectTime }}</div>
		</div>
		<Cell :title="text.customFormat" :sub-title="text.customFormatSub" @click="visible.visible15 = true" />
		<TimePicker v-model:visible="visible.visible15" :out-format="text.outFormat" @confirm="(timeStr) => (customFormatStr = timeStr)" />

		<div class="px-4">
			<template v-if="monthFirstStr !== ''">
				{{ text.currentlySelected }}
				<span class="text-primary dark:text-dark mr-2">{{ monthFirstStr }}</span>
			</template>
			<div v-else>{{ text.selectTime }}</div>
		</div>
		<Cell :title="text.monthFirst" @click="visible.visible16 = true" />
		<TimePicker
			v-model:visible="visible.visible16"
			type="YYYYMMDD"
			out-format="MM/DD/YYYY"
			@confirm="(timeStr) => (monthFirstStr = timeStr)"
		/>

		<div class="px-4 text-xs">
			{{ text.currentlySelected }}<br />
			<span class="text-primary dark:text-dark mr-2 break-words">{{ timeObjStr }}</span>
		</div>
		<Cell :title="text.timeObj" @click="visible.visible17 = true" />
		<TimePicker v-model:visible="visible.visible17" @confirm="(_, obj) => (timeObj = obj)" />

		<Cell :title="text.roundedTop" @click="visible.visible14 = true" />
		<TimePicker v-model:visible="visible.visible14" :popup="{ radius: 'xl' }" />

		<Cell :title="text.customTitle" @click="visible.visible18 = true" />
		<TimePicker v-model:visible="visible.visible18" :title="text.customTitleText" />

		<Cell :title="text.initYear" @click="visible.visible19 = true" />
		<TimePicker v-model:visible="visible.visible19" init-year="2020" />

		<Cell :title="text.initMonth" @click="visible.visible20 = true" />
		<TimePicker v-model:visible="visible.visible20" init-month="05" />

		<Cell :title="text.initTime" @click="visible.visible21 = true" />
		<TimePicker v-model:visible="visible.visible21" init-hour="05" init-minute="05" init-second="05" />

		<div class="px-4 py-2">{{ text.withoutPopup }}</div>
		<TimePicker :popup="null" type="YYYYMMDD" :height="30" />
	</div>
</template>
