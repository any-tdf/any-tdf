import { useState } from 'react';
import { Divider, Form, Toast } from 'rtdf/components';
import type { FormItemProps, FormValueProps } from 'rtdf/components';
import { linkageData, someProvinceList } from '../picker/data';

const formConfig: FormItemProps[] = [
	{ type: 'input', name: 'username', label: '用户名', required: true },
	{ type: 'numKeyboard', name: 'numKeyboard', label: '数字键盘', input: { placeholder: '请输入数字' } },
	{ type: 'fullKeyboard', name: 'fullKeyboard', label: '全键盘', input: { placeholder: '请输入内容' } },
	{ type: 'timePicker', name: 'time', label: '时间', required: true },
	{
		type: 'actionSheet',
		name: 'action',
		label: '操作方式',
		actionSheet: { actions: [{ content: '新增' }, { content: '修改' }, { content: '删除', style: 'error', desc: '删除后将无法恢复' }] }
	},
	{ type: 'calendar', name: 'calendar', label: '日期范围', calendar: { mode: 'range' } },
	{ type: 'calendar', name: 'calendarMultiple', label: '日期多选', calendar: { mode: 'multiple' } },
	{ type: 'picker', name: 'picker', label: '省份', picker: { datas: [{ data: someProvinceList }] } },
	{ type: 'picker', name: 'pickerLinkage', label: '地区', picker: { datas: linkageData, isLinkage: true } },
	{
		type: 'picker',
		name: 'pickerMultiple',
		label: '省份多选',
		picker: { datas: [{ data: someProvinceList }], multiple: true }
	},
	{
		type: 'colorPicker',
		name: 'colorPicker',
		label: '颜色选择器',
		initValue: '#FF6B6B',
		input: { placeholder: '请选择颜色' },
		colorPicker: { modes: ['hex', 'rgb', 'oklch'] }
	},
	{
		type: 'checkbox',
		name: 'checkbox',
		label: '请选择禁用英雄（多选）',
		initValue: [],
		checkbox: {
			data: [
				{ label: '主宰', name: '奶棒人' },
				{ label: '白牛', name: '令狐冲' },
				{ label: '光法', name: '光之守卫' },
				{ label: '猛犸', name: '马格纳斯' }
			],
			layout: 'h'
		}
	},
	{
		type: 'radio',
		name: 'radio',
		label: '请选择英雄（单选）',
		required: true,
		initValue: '',
		radio: {
			data: [
				{ label: '主宰', name: '奶棒人' },
				{ label: '白牛', name: '令狐冲' },
				{ label: '光法', name: '光之守卫' },
				{ label: '猛犸', name: '马格纳斯' }
			],
			layout: 'h'
		}
	},
	{ type: 'slider', name: 'slider', label: '请调整音量', slider: { isRange: true } },
	{ type: 'switch', name: 'switch', label: '请选择是否开启' },
	{ type: 'stepper', name: 'stepper', label: '请调整步数' }
];

const formCardConfig: FormItemProps[] = [
	{ type: 'input', name: 'username', label: '用户名', required: true },
	{ type: 'calendar', name: 'calendar', label: '日期范围', calendar: { mode: 'range' } },
	{ type: 'picker', name: 'pickerLinkage', label: '地区', picker: { datas: linkageData, isLinkage: true } }
];

const formCardRadioConfig: FormItemProps[] = [
	{ type: 'input', name: 'username', label: '用户名', required: true, input: { radius: '4xl' } },
	{ type: 'calendar', name: 'calendar', label: '日期范围', calendar: { mode: 'range' }, input: { radius: '4xl' } },
	{ type: 'picker', name: 'pickerLinkage', label: '地区', picker: { datas: linkageData, isLinkage: true }, input: { radius: '4xl' } }
];

const formCardLineConfig: FormItemProps[] = [
	{ type: 'input', name: 'username', label: '用户名', required: true, input: { inputStyle: 'line' } },
	{ type: 'calendar', name: 'calendar', label: '日期范围', calendar: { mode: 'range' }, input: { inputStyle: 'line' } },
	{ type: 'picker', name: 'pickerLinkage', label: '地区', picker: { datas: linkageData, isLinkage: true }, input: { inputStyle: 'line' } }
];

const FormZh = () => {
	const [formValues, setFormValues] = useState<Record<string, FormValueProps>>({ fullKeyboard: '' });
	const [submitToastVisible, setSubmitToastVisible] = useState(false);
	const toastMessage = Object.keys(formValues).length > 0 ? '有值允许提交' : '没有值不允许提交';
	const toastType = Object.keys(formValues).length > 0 ? 'success' : 'warning';

	const changeFunc = (data: Record<string, FormValueProps>) => {
		setFormValues(data);
	};

	const resetFunc = () => {
		setFormValues({});
	};

	const submitFunc = () => {
		setSubmitToastVisible(true);
	};

	return (
		<>
			{Object.keys(formValues).length > 0 ? (
				<div className="z-100 sticky top-12 w-full break-all bg-white/50 p-1 text-left text-xs backdrop-blur-sm dark:bg-black/50">
					<p>这里展示表单的值</p>
					{JSON.stringify(formValues)}
				</div>
			) : null}
			<Divider text="基础用法，包含全部支持的表单项" />
			<Form form={formConfig} onSubmit={submitFunc} onChange={changeFunc} resetText="重置" onReset={resetFunc} />
			<Toast visible={submitToastVisible} message={toastMessage} type={toastType} onClose={() => setSubmitToastVisible(false)} />

			<Divider text="卡片布局" />
			<Form form={formCardConfig} card={{}} />

			<Divider text="增加间距" />
			<Form form={formCardConfig} space="4" />

			<Divider text="增大卡片、输入框与提交按钮圆角" />
			<Form form={formCardRadioConfig} card={{ radius: '4xl' }} submitButton={{ radius: 'full' }} />

			<Divider text="输入框线性风格" />
			<Form form={formCardLineConfig} />
		</>
	);
};

export default FormZh;
