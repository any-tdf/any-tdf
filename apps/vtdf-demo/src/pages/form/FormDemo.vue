<script setup lang="ts">
import { computed, ref } from 'vue';
import { Divider, Form, Toast } from 'vtdf/components';
import type { FormItemProps, FormValueProps, ToastProps } from 'vtdf/types';
import { linkageData as linkageDataEn, someProvinceList as someProvinceListEn } from '../picker/data_en';
import { linkageData as linkageDataZh, someProvinceList as someProvinceListZh } from '../picker/data';

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
		username: '用户名',
		numberKeyboard: '数字键盘',
		numberPlaceholder: '请输入数字',
		fullKeyboard: '全键盘',
		fullKeyboardPlaceholder: '请输入内容',
		time: '时间',
		action: '操作方式',
		add: '新增',
		edit: '修改',
		delete: '删除',
		deleteDesc: '删除后将无法恢复',
		dateRange: '日期范围',
		multipleDates: '日期多选',
		province: '省份',
		region: '地区',
		multipleProvince: '省份多选',
		colorPicker: '颜色选择器',
		colorPlaceholder: '请选择颜色',
		checkboxLabel: '请选择禁用英雄（多选）',
		radioLabel: '请选择英雄（单选）',
		adjustVolume: '请调整音量',
		toggleEnable: '请选择是否开启',
		adjustSteps: '请调整步数',
		heroJugg: '主宰',
		heroJuggName: '奶棒人',
		heroSb: '白牛',
		heroSbName: '令狐冲',
		heroKotl: '光法',
		heroKotlName: '光之守卫',
		heroMag: '猛犸',
		heroMagName: '马格纳斯',
		formValues: '这里展示表单的值',
		basic: '基础用法，包含全部支持的表单项',
		reset: '重置',
		submitWithValues: '有值允许提交',
		submitWithoutValues: '没有值不允许提交',
		card: '卡片布局',
		space: '增加间距',
		radius: '增大卡片、输入框与提交按钮圆角',
		line: '输入框线性风格'
	},
	en_US: {
		username: 'Username',
		numberKeyboard: 'Number Keyboard',
		numberPlaceholder: 'Please enter numbers',
		fullKeyboard: 'Full Keyboard',
		fullKeyboardPlaceholder: 'Please enter text',
		time: 'Time',
		action: 'Action',
		add: 'Add',
		edit: 'Edit',
		delete: 'Delete',
		deleteDesc: 'Cannot be restored after deletion',
		dateRange: 'Date Range',
		multipleDates: 'Multiple Dates',
		province: 'State',
		region: 'Region',
		multipleProvince: 'Multiple States',
		colorPicker: 'Color Picker',
		colorPlaceholder: 'Select a color',
		checkboxLabel: 'Select disabled heroes (multiple)',
		radioLabel: 'Select hero (single)',
		adjustVolume: 'Adjust Volume',
		toggleEnable: 'Toggle Enable',
		adjustSteps: 'Adjust Steps',
		heroJugg: 'Jugg',
		heroJuggName: 'Juggernaut',
		heroSb: 'SB',
		heroSbName: 'Spirit Breaker',
		heroKotl: 'KOTL',
		heroKotlName: 'Keeper of the Light',
		heroMag: 'Mag',
		heroMagName: 'Magnus',
		formValues: 'Form values display',
		basic: 'Basic usage, includes all supported form items',
		reset: 'Reset',
		submitWithValues: 'Values available for submission',
		submitWithoutValues: 'No values, submission not allowed',
		card: 'Card Layout',
		space: 'Increased Spacing',
		radius: 'Increase card and input radius',
		line: 'Input Field Line Style'
	}
};

const text = computed(() => messages[props.locale]);
const pickerData = computed(() =>
	props.locale === 'zh_CN'
		? { linkageData: linkageDataZh, someProvinceList: someProvinceListZh }
		: { linkageData: linkageDataEn, someProvinceList: someProvinceListEn }
);
const formValues = ref<Record<string, FormValueProps>>({ fullKeyboard: '' });
const submitToastVisible = ref(false);
const hasFormValues = computed(() => Object.keys(formValues.value).length > 0);
const toastMessage = computed(() => (hasFormValues.value ? text.value.submitWithValues : text.value.submitWithoutValues));
const toastType = computed<ToastProps['type']>(() => (hasFormValues.value ? 'success' : 'warning'));

const heroData = computed(() => [
	{ label: text.value.heroJugg, name: text.value.heroJuggName },
	{ label: text.value.heroSb, name: text.value.heroSbName },
	{ label: text.value.heroKotl, name: text.value.heroKotlName },
	{ label: text.value.heroMag, name: text.value.heroMagName }
]);

const formConfig = computed<FormItemProps[]>(() => [
	{ type: 'input', name: 'username', label: text.value.username, required: true },
	{ type: 'numKeyboard', name: 'numKeyboard', label: text.value.numberKeyboard, input: { placeholder: text.value.numberPlaceholder } },
	{
		type: 'fullKeyboard',
		name: 'fullKeyboard',
		label: text.value.fullKeyboard,
		input: { placeholder: text.value.fullKeyboardPlaceholder }
	},
	{ type: 'timePicker', name: 'time', label: text.value.time, required: true },
	{
		type: 'actionSheet',
		name: 'action',
		label: text.value.action,
		actionSheet: {
			actions: [
				{ content: text.value.add },
				{ content: text.value.edit },
				{ content: text.value.delete, style: 'error', desc: text.value.deleteDesc }
			]
		}
	},
	{ type: 'calendar', name: 'calendar', label: text.value.dateRange, calendar: { mode: 'range' } },
	{ type: 'calendar', name: 'calendarMultiple', label: text.value.multipleDates, calendar: { mode: 'multiple' } },
	{ type: 'picker', name: 'picker', label: text.value.province, picker: { datas: [{ data: pickerData.value.someProvinceList }] } },
	{ type: 'picker', name: 'pickerLinkage', label: text.value.region, picker: { datas: pickerData.value.linkageData, isLinkage: true } },
	{
		type: 'picker',
		name: 'pickerMultiple',
		label: text.value.multipleProvince,
		picker: { datas: [{ data: pickerData.value.someProvinceList }], multiple: true }
	},
	{
		type: 'colorPicker',
		name: 'colorPicker',
		label: text.value.colorPicker,
		initValue: '#FF6B6B',
		input: { placeholder: text.value.colorPlaceholder },
		colorPicker: { modes: ['hex', 'rgb', 'oklch'] }
	},
	{
		type: 'checkbox',
		name: 'checkbox',
		label: text.value.checkboxLabel,
		initValue: [],
		checkbox: {
			data: heroData.value,
			layout: 'h'
		}
	},
	{
		type: 'radio',
		name: 'radio',
		label: text.value.radioLabel,
		required: true,
		initValue: '',
		radio: {
			data: heroData.value,
			layout: 'h'
		}
	},
	{ type: 'slider', name: 'slider', label: text.value.adjustVolume, slider: { isRange: true } },
	{ type: 'switch', name: 'switch', label: text.value.toggleEnable },
	{ type: 'stepper', name: 'stepper', label: text.value.adjustSteps }
]);

const formCardConfig = computed<FormItemProps[]>(() => [
	{ type: 'input', name: 'username', label: text.value.username, required: true },
	{ type: 'calendar', name: 'calendar', label: text.value.dateRange, calendar: { mode: 'range' } },
	{ type: 'picker', name: 'pickerLinkage', label: text.value.region, picker: { datas: pickerData.value.linkageData, isLinkage: true } }
]);

const formCardRadiusConfig = computed<FormItemProps[]>(() => [
	{ type: 'input', name: 'username', label: text.value.username, required: true, input: { radius: '4xl' } },
	{ type: 'calendar', name: 'calendar', label: text.value.dateRange, calendar: { mode: 'range' }, input: { radius: '4xl' } },
	{
		type: 'picker',
		name: 'pickerLinkage',
		label: text.value.region,
		picker: { datas: pickerData.value.linkageData, isLinkage: true },
		input: { radius: '4xl' }
	}
]);

const formCardLineConfig = computed<FormItemProps[]>(() => [
	{ type: 'input', name: 'username', label: text.value.username, required: true, input: { inputStyle: 'line' } },
	{ type: 'calendar', name: 'calendar', label: text.value.dateRange, calendar: { mode: 'range' }, input: { inputStyle: 'line' } },
	{
		type: 'picker',
		name: 'pickerLinkage',
		label: text.value.region,
		picker: { datas: pickerData.value.linkageData, isLinkage: true },
		input: { inputStyle: 'line' }
	}
]);

const changeFunc = (data: Record<string, FormValueProps>) => {
	formValues.value = data;
};

const resetFunc = () => {
	formValues.value = {};
};

const submitFunc = () => {
	submitToastVisible.value = true;
};
</script>

<template>
	<div
		v-if="hasFormValues"
		class="z-100 sticky top-12 w-full break-all bg-white/50 p-1 text-left text-xs backdrop-blur-sm dark:bg-black/50"
	>
		<p>{{ text.formValues }}</p>
		{{ JSON.stringify(formValues) }}
	</div>

	<Divider :text="text.basic" />
	<Form :form="formConfig" :reset-text="text.reset" @submit="submitFunc" @change="changeFunc" @reset="resetFunc" />
	<Toast v-model:visible="submitToastVisible" :message="toastMessage" :type="toastType" />

	<Divider :text="text.card" />
	<Form :form="formCardConfig" :card="{}" />

	<Divider :text="text.space" />
	<Form :form="formCardConfig" space="4" />

	<Divider :text="text.radius" />
	<Form :form="formCardRadiusConfig" :card="{ radius: '4xl' }" :submit-button="{ radius: 'full' }" />

	<Divider :text="text.line" />
	<Form :form="formCardLineConfig" />
</template>
