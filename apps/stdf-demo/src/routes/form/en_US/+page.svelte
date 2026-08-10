<script lang="ts">
	import { Divider, Form, Toast } from 'stdf';

	import type { FormItemProps, FormValueProps } from 'stdf/types';
	import { someProvinceList, linkageData } from '../../picker/en_US/data_en.js';

	// Form configuration
	const formConfig: FormItemProps[] = [
		{ type: 'input', name: 'username', label: 'Username', required: true },
		{ type: 'numKeyboard', name: 'numKeyboard', label: 'Number Keyboard', input: { placeholder: 'Please enter numbers' } },
		{ type: 'fullKeyboard', name: 'fullKeyboard', label: 'Full Keyboard', input: { placeholder: 'Please enter text' } },
		{ type: 'timePicker', name: 'time', label: 'Time', required: true },
		{
			type: 'actionSheet',
			name: 'action',
			label: 'Action',
			actionSheet: { actions: [{ content: 'Add' }, { content: 'Edit' }, { content: 'Delete', style: 'error', desc: 'Cannot be restored after deletion' }] }
		},
		{ type: 'calendar', name: 'calendar', label: 'Date Range', calendar: { mode: 'range' } },
		{ type: 'calendar', name: 'calendarMultiple', label: 'Multiple Dates', calendar: { mode: 'multiple' } },
		{ type: 'picker', name: 'picker', label: 'State', picker: { datas: [{ data: someProvinceList }] } },
		{ type: 'picker', name: 'pickerLinkage', label: 'Region', picker: { datas: linkageData, isLinkage: true } },
		{
			type: 'picker',
			name: 'pickerMultiple',
			label: 'Multiple States',
			picker: { datas: [{ data: someProvinceList }], multiple: true }
		},
		{
			type: 'colorPicker',
			name: 'colorPicker',
			label: 'Color Picker',
			initValue: '#FF6B6B',
			input: { placeholder: 'Select a color' },
			colorPicker: { modes: ['hex', 'rgb', 'oklch'] }
		},
		{
			type: 'checkbox',
			name: 'checkbox',
			label: 'Select disabled heroes (multiple)',
			initValue: [],
			checkbox: {
				data: [
					{ label: 'Jugg', name: 'Juggernaut' },
					{ label: 'SB', name: 'Spirit Breaker' },
					{ label: 'KOTL', name: 'Keeper of the Light' },
					{ label: 'Mag', name: 'Magnus' }
				],
				layout: 'h'
			}
		},
		{
			type: 'radio',
			name: 'radio',
			label: 'Select hero (single)',
			required: true,
			initValue: '',
			radio: {
				data: [
					{ label: 'Jugg', name: 'Juggernaut' },
					{ label: 'SB', name: 'Spirit Breaker' },
					{ label: 'KOTL', name: 'Keeper of the Light' },
					{ label: 'Mag', name: 'Magnus' }
				],
				layout: 'h'
			}
		},
		{ type: 'slider', name: 'slider', label: 'Adjust Volume', slider: { isRange: true } },
		{ type: 'switch', name: 'switch', label: 'Toggle Enable' },
		{ type: 'stepper', name: 'stepper', label: 'Adjust Steps' }
	];
	let formValues = $state({});
	const changeFunc = (data: Record<string, FormValueProps>) => {
		formValues = data;
	};
	const resetFunc = () => {
		formValues = {};
	};
	let submitToastVisible = $state(false);
	let toastMessage = $derived(Object.keys(formValues).length > 0 ? 'Values available for submission' : 'No values, submission not allowed');
	let toastType = $derived(Object.keys(formValues).length > 0 ? ('success' as const) : ('warning' as const));
	const submitFunc = () => {
		submitToastVisible = true;
	};

	const formCardConfig: FormItemProps[] = [
		{ type: 'input', name: 'username', label: 'Username', required: true },
		{ type: 'calendar', name: 'calendar', label: 'Date Range', calendar: { mode: 'range' } },
		{ type: 'picker', name: 'pickerLinkage', label: 'Region', picker: { datas: linkageData, isLinkage: true } }
	];

	const formCardRadioConfig: FormItemProps[] = [
		{ type: 'input', name: 'username', label: 'Username', required: true, input: { radius: '4xl' } },
		{ type: 'calendar', name: 'calendar', label: 'Date Range', calendar: { mode: 'range' }, input: { radius: '4xl' } },
		{ type: 'picker', name: 'pickerLinkage', label: 'Region', picker: { datas: linkageData, isLinkage: true }, input: { radius: '4xl' } }
	];

	const formCardLineConfig: FormItemProps[] = [
		{ type: 'input', name: 'username', label: 'Username', required: true, input: { inputStyle: 'line' } },
		{ type: 'calendar', name: 'calendar', label: 'Date Range', calendar: { mode: 'range' }, input: { inputStyle: 'line' } },
		{ type: 'picker', name: 'pickerLinkage', label: 'Region', picker: { datas: linkageData, isLinkage: true }, input: { inputStyle: 'line' } }
	];
</script>

{#if Object.keys(formValues).length > 0}
	<div class="z-100 sticky top-12 w-full break-all bg-white/50 p-1 text-left text-xs backdrop-blur-sm dark:bg-black/50">
		<p>Form values display</p>
		{JSON.stringify(formValues)}
	</div>
{/if}
<Divider text="Basic usage, includes all supported form items" />
<Form form={formConfig} onsubmit={submitFunc} onchange={changeFunc} resetText="Reset" onreset={resetFunc} />
<Toast bind:visible={submitToastVisible} message={toastMessage} type={toastType} />

<Divider text="Card Layout" />
<Form form={formCardConfig} card={{}} />

<Divider text="Increased Spacing" />
<Form form={formCardConfig} space="4" />

<Divider text="Increase card and input radius" />
<Form form={formCardRadioConfig} card={{ radius: '4xl' }} submitButton={{ radius: 'full' }} />

<Divider text="Input Field Line Style" />
<Form form={formCardLineConfig} />
