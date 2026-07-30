import { useCallback, useMemo, useState } from 'react';
import {
	formatFormColorPickerValue,
	resolveFormActionSheetChangeValue,
	resolveFormActionSheetInputValue,
	resolveFormCalendarChangeValue,
	resolveFormCalendarDates,
	resolveFormCalendarTagItems,
	resolveFormCalendarValueAfterRemove,
	resolveFormChangeAction,
	resolveFormColorPickerChangeValue,
	resolveFormDerived,
	resolveFormFieldClearValue,
	resolveFormItemsChangeAction,
	resolveFormItemViewDerived,
	resolveFormItemViewStateOptions,
	resolveFormKeyboardClickAction,
	resolveFormOpenPopupKeyboardAction,
	resolveFormPickerConfirmValue,
	resolveFormPickerMultipleChangeValue,
	resolveFormPickerSelected,
	resolveFormPickerTagItems,
	resolveFormPickerValueAfterRemove,
	resolveFormPopupAction,
	resolveFormResetState,
	resolveFormSliderChangeValue,
	resolveFormStateOptions,
	resolveFormTimePickerChangeValue,
	resolveFormTimePickerInputValue
} from '@any-tdf/common/derived/form';
import { formClearSvg, selectArrowRightSvg } from '@any-tdf/common/svg/common';
import Input from '../input';
import TimePicker from '../timePicker';
import ActionSheet from '../actionSheet';
import Calendar from '../calendar';
import NumKeyboard from '../numKeyboard';
import FullKeyboard from '../fullKeyboard';
import Picker from '../picker';
import ColorPicker from '../colorPicker';
import Checkbox from '../checkbox';
import Radio from '../radio';
import Slider from '../slider';
import Stepper from '../stepper';
import Switch from '../switch';
import Button from '../button';
import Card from '../card';
import Tag from '../tag';
import { SvgIcon } from '../utils/SvgIcon';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import type {
	FormActionSheetValue,
	FormCalendarValue,
	FormColorPickerValue,
	FormItemInternal,
	FormItemProps,
	FormPickerValue,
	FormProps,
	FormTimePickerValue,
	FormValueProps
} from './types';
import type { ColorPickerValue } from '../../types';

const emitCallbacks = <TArgs extends unknown[]>(callbacks: Array<((...args: TArgs) => void) | undefined>, ...args: TArgs) => {
	callbacks.forEach((callback) => callback?.(...args));
};

const Form: React.FC<FormProps> = ({
	form,
	submitText,
	resetText = null,
	onSubmit,
	onReset,
	onChange,
	submitButton,
	resetButton,
	submitChildren,
	resetChildren,
	card = false,
	mx = '4',
	space = '0',
	radius = '',
	px = '2',
	shadow = 'sm'
}) => {
	const { locale } = useConfig();
	const formLang = locale?.form || zh_CN.form;
	const inputLang = locale?.input || zh_CN.input;
	// 公共 Form 派生处理初始值、包装模式和展示值，状态更新留在组件层。
	// Shared Form derivations resolve initial values, wrapper mode and display values; state updates stay here.
	const formState = useMemo(
		() =>
			resolveFormDerived<FormItemProps>(
				resolveFormStateOptions({
					defaultSubmit: formLang.submit,
					props: { card, form, legacy: { radius, mx, px, shadow }, space, submitText }
				})
			),
		[card, form, formLang.submit, mx, px, radius, shadow, space, submitText]
	);

	const [formInner, setFormInner] = useState<FormItemInternal[]>(() => formState.runtimeItems as FormItemInternal[]);
	const [model, setModel] = useState<Record<string, FormValueProps>>({});

	const emitChange = useCallback(
		(nextModel: Record<string, FormValueProps>) => {
			onChange?.(nextModel);
		},
		[onChange]
	);

	const handleFormChange = useCallback(
		(itemName: string, currentValue: FormValueProps) => {
			setModel((prevModel) => {
				const { nextModel } = resolveFormChangeAction({
					items: [] as FormItemInternal[],
					model: prevModel,
					name: itemName,
					value: currentValue
				});
				const newModel = nextModel as Record<string, FormValueProps>;
				emitChange(newModel);
				return newModel;
			});
			setFormInner(
				(prevItems) =>
					resolveFormItemsChangeAction({ items: prevItems, name: itemName, value: currentValue }).nextItems as FormItemInternal[]
			);
		},
		[emitChange]
	);

	const setItemPopup = useCallback((itemName: string, showPopup: boolean) => {
		setFormInner((prevItems) => resolveFormPopupAction({ items: prevItems, name: itemName, showPopup }).nextItems as FormItemInternal[]);
	}, []);

	const clearFieldValue = useCallback(
		(item: FormItemInternal, pickerMultiple = false) => {
			// 公共 action 负责计算字段清空值，组件层只写状态和派发变更。
			// Shared action calculates field clear values; the component layer only writes state and emits changes.
			handleFormChange(item.name, resolveFormFieldClearValue({ type: item.type, pickerMultiple }) as FormValueProps);
		},
		[handleFormChange]
	);

	const submitFunc = useCallback(() => {
		onSubmit?.(model);
	}, [model, onSubmit]);

	const resetFunc = useCallback(() => {
		const resetState = resolveFormResetState(form);
		const nextItems = resetState.items as FormItemInternal[];
		const nextModel = resetState.model as Record<string, FormValueProps>;
		setFormInner(nextItems);
		setModel(nextModel);
		emitChange(nextModel);
		onReset?.();
	}, [emitChange, form, onReset]);

	const commonLabel = (item: FormItemInternal) => (
		<div className={formState.fieldTitleClass}>
			{item.required && <span className={formState.requiredClass}>*</span>}
			{item.label}
		</div>
	);

	const renderFormGroup = (item: FormItemInternal, child: React.ReactNode) => (
		<div className={formState.groupClass} key={item.name}>
			<div className={formState.fieldHeaderClass}>{commonLabel(item)}</div>
			{child}
		</div>
	);

	const handleOpenPopupKeyDown = (key: string, onOpen: () => void) => {
		// 公共 action 只判断按键是否应打开弹层，状态写入留在组件层。
		// Shared action only decides whether the key should open a popup; state writes stay in the component layer.
		const action = resolveFormOpenPopupKeyboardAction({ key });
		if (action.shouldOpen) onOpen();
	};

	const renderSelectedTags = (
		items: { label: string }[],
		placeholder: string,
		onOpen: () => void,
		onClear: () => void,
		onRemove: (index: number) => void
	) => (
		<div
			role="button"
			tabIndex={0}
			className={formState.multiControlClass}
			onClick={onOpen}
			onKeyDown={(event) => handleOpenPopupKeyDown(event.key, onOpen)}
		>
			<div className={formState.multiTagsClass}>
				{items.length > 0 ? (
					items.map((item, index) => (
						<Tag key={`${item.label}-${index}`} text={item.label} size="sm" fill="light" closable onClose={() => onRemove(index)} />
					))
				) : (
					<span className={formState.placeholderClass}>{placeholder}</span>
				)}
			</div>
			{items.length > 0 ? (
				<button
					type="button"
					className={formState.clearButtonClass}
					aria-label="clear"
					onClick={(event) => {
						event.stopPropagation();
						onClear();
					}}
				>
					{/* 公共 Form 图标 SVG 数据在 common 中维护。 / Shared Form SVG data lives in common. */}
					<SvgIcon svg={formClearSvg} width={16} height={16} className={formState.clearIconClass} />
				</button>
			) : null}
			<SvgIcon svg={selectArrowRightSvg} width={24} height={24} className={formState.selectIconClass} />
		</div>
	);

	const renderFormItem = (item: FormItemInternal) => {
		// 公共派生一次性返回字段展示值和子组件 props，组件层只保留状态和事件。
		// Shared derivation returns field display values and child props; the component layer keeps state and events.
		const itemView = resolveFormItemViewDerived(resolveFormItemViewStateOptions({ item, pleaseSelect: inputLang.pleaseSelect }));
		const itemRenderState = itemView.renderState;
		if (itemRenderState.showInput) {
			return (
				<Input
					key={item.name}
					title={item.label}
					value={item.value as string}
					clear
					required={item.required}
					{...itemView.inputProps}
					onChange={(value: string) => {
						handleFormChange(item.name, value);
						emitCallbacks([item.input?.onChange, item.input?.onChange], value);
					}}
					onClear={() => {
						clearFieldValue(item);
						emitCallbacks([item.input?.onClear, item.input?.onClear]);
					}}
				/>
			);
		}
		if (itemRenderState.showTimePicker) {
			return (
				<div key={item.name}>
					<Input
						title={item.label}
						select
						value={resolveFormTimePickerInputValue(item.value as FormTimePickerValue)}
						clear
						required={item.required}
						{...itemView.inputProps}
						onFocus={(value) => {
							setItemPopup(item.name, true);
							emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
						}}
						onClear={() => {
							clearFieldValue(item);
							emitCallbacks([item.input?.onClear, item.input?.onClear]);
						}}
					/>
					<TimePicker
						visible={item.showPopup}
						{...itemView.timePickerProps}
						onConfirm={(timeStr, timeObj) => {
							handleFormChange(item.name, resolveFormTimePickerChangeValue(timeStr, timeObj));
							emitCallbacks([item.timePicker?.onConfirm, item.timePicker?.onConfirm], timeStr, timeObj);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.timePicker?.onClose, item.timePicker?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showActionSheet) {
			return (
				<div key={item.name}>
					<Input
						title={item.label}
						select
						value={resolveFormActionSheetInputValue(item.value as FormActionSheetValue)}
						clear
						required={item.required}
						{...itemView.inputProps}
						onFocus={(value) => {
							setItemPopup(item.name, true);
							emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
						}}
						onClear={() => {
							clearFieldValue(item);
							emitCallbacks([item.input?.onClear, item.input?.onClear]);
						}}
					/>
					<ActionSheet
						visible={item.showPopup}
						{...itemView.actionSheetProps}
						onClickAction={(index, action) => {
							handleFormChange(item.name, resolveFormActionSheetChangeValue(index, action));
							emitCallbacks([item.actionSheet?.onClickAction, item.actionSheet?.onClickAction], index, action);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.actionSheet?.onClose, item.actionSheet?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showCalendar) {
			const calendarValue = item.value as FormCalendarValue;
			const dates = resolveFormCalendarDates(calendarValue);
			const isMultiple = itemView.calendarIsMultiple;
			return (
				<div key={item.name}>
					{isMultiple ? (
						<div className={formState.multiRootClass}>
							<div className={formState.fieldHeaderClass}>{commonLabel(item)}</div>
							{renderSelectedTags(
								resolveFormCalendarTagItems(calendarValue),
								itemView.placeholder,
								() => setItemPopup(item.name, true),
								() => clearFieldValue(item),
								(index) => handleFormChange(item.name, resolveFormCalendarValueAfterRemove(calendarValue, index))
							)}
						</div>
					) : (
						<Input
							title={item.label}
							select
							value={itemView.calendarDisplayValue}
							clear
							required={item.required}
							{...itemView.inputProps}
							onFocus={(value) => {
								setItemPopup(item.name, true);
								emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
							}}
							onClear={() => {
								clearFieldValue(item);
								emitCallbacks([item.input?.onClear, item.input?.onClear]);
							}}
						/>
					)}
					<Calendar
						visible={item.showPopup}
						{...itemView.calendarProps}
						initSelectedDates={dates}
						clear={false}
						onConfirm={(nextDates) => {
							handleFormChange(item.name, resolveFormCalendarChangeValue(nextDates));
							emitCallbacks([item.calendar?.onConfirm, item.calendar?.onConfirm], nextDates);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.calendar?.onClose, item.calendar?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showNumKeyboard) {
			return (
				<div key={item.name}>
					<Input
						title={item.label}
						select
						value={item.value as string}
						clear
						required={item.required}
						{...itemView.inputProps}
						onFocus={(value) => {
							setItemPopup(item.name, true);
							emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
						}}
						onClear={() => {
							clearFieldValue(item);
							emitCallbacks([item.input?.onClear, item.input?.onClear]);
						}}
					/>
					<NumKeyboard
						visible={item.showPopup}
						value={item.value as string}
						{...itemView.numKeyboardProps}
						onClick={(key) => {
							// 公共动作函数只返回字段值和关闭决策，状态写入仍留在组件内。
							// Shared action function only returns field value and close decisions; state writes stay inside the component.
							const action = resolveFormKeyboardClickAction({ value: item.value as string, key });
							if (action.shouldClose) {
								setItemPopup(item.name, false);
							}
							if (action.shouldUpdateValue) {
								handleFormChange(item.name, action.nextValue);
							}
							emitCallbacks([item.numKeyboard?.onClick, item.numKeyboard?.onClick], key);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.numKeyboard?.onClose, item.numKeyboard?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showFullKeyboard) {
			return (
				<div key={item.name}>
					<Input
						title={item.label}
						select
						value={item.value as string}
						clear
						required={item.required}
						{...itemView.inputProps}
						onFocus={(value) => {
							setItemPopup(item.name, true);
							emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
						}}
						onClear={() => {
							clearFieldValue(item);
							emitCallbacks([item.input?.onClear, item.input?.onClear]);
						}}
					/>
					<FullKeyboard
						visible={item.showPopup}
						value={item.value as string}
						{...itemView.fullKeyboardProps}
						onClick={(key) => {
							// 公共动作函数只返回字段值和关闭决策，状态写入仍留在组件内。
							// Shared action function only returns field value and close decisions; state writes stay inside the component.
							const action = resolveFormKeyboardClickAction({
								value: item.value as string,
								key,
								closeKeys: ['done']
							});
							if (action.shouldClose) {
								setItemPopup(item.name, false);
							}
							if (action.shouldUpdateValue) {
								handleFormChange(item.name, action.nextValue);
							}
							emitCallbacks([item.fullKeyboard?.onClick, item.fullKeyboard?.onClick], key);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.fullKeyboard?.onClose, item.fullKeyboard?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showColorPicker) {
			return (
				<div key={item.name}>
					<Input
						title={item.label}
						select
						value={formatFormColorPickerValue(item.value as FormColorPickerValue)}
						clear
						required={item.required}
						{...itemView.inputProps}
						onFocus={(value) => {
							setItemPopup(item.name, true);
							emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
						}}
						onClear={() => {
							clearFieldValue(item);
							emitCallbacks([item.input?.onClear, item.input?.onClear]);
						}}
					/>
					<ColorPicker
						visible={item.showPopup}
						value={item.value as ColorPickerValue | undefined}
						{...itemView.colorPickerProps}
						onChange={(colors) => {
							handleFormChange(item.name, resolveFormColorPickerChangeValue(colors));
							emitCallbacks([item.colorPicker?.onChange, item.colorPicker?.onChange], colors);
						}}
						onClose={(colors) => {
							handleFormChange(item.name, resolveFormColorPickerChangeValue(colors));
							setItemPopup(item.name, false);
							emitCallbacks([item.colorPicker?.onClose, item.colorPicker?.onClose], colors);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showPicker) {
			const pickerValue = item.value as FormPickerValue;
			const isMultiple = itemView.pickerIsMultiple;
			const selected = resolveFormPickerSelected(pickerValue);
			return (
				<div key={item.name}>
					{isMultiple ? (
						<div className={formState.multiRootClass}>
							<div className={formState.fieldHeaderClass}>{commonLabel(item)}</div>
							{renderSelectedTags(
								resolveFormPickerTagItems(pickerValue),
								itemView.placeholder,
								() => setItemPopup(item.name, true),
								() => clearFieldValue(item, true),
								(index) => handleFormChange(item.name, resolveFormPickerValueAfterRemove(pickerValue, index))
							)}
						</div>
					) : (
						<Input
							title={item.label}
							select
							value={itemView.pickerDisplayValue}
							clear
							required={item.required}
							{...itemView.inputProps}
							onFocus={(value) => {
								setItemPopup(item.name, true);
								emitCallbacks([item.input?.onFocus, item.input?.onFocus], value);
							}}
							onClear={() => {
								clearFieldValue(item);
								emitCallbacks([item.input?.onClear, item.input?.onClear]);
							}}
						/>
					)}
					<Picker
						visible={item.showPopup}
						{...itemView.pickerProps}
						datas={itemView.pickerDatas}
						multipleSelected={selected}
						onMultipleChange={(nextSelected) => {
							handleFormChange(item.name, resolveFormPickerMultipleChangeValue(pickerValue, nextSelected));
							emitCallbacks([item.picker?.onMultipleChange, item.picker?.onMultipleChange], nextSelected);
						}}
						onConfirm={(items, indexs) => {
							handleFormChange(item.name, resolveFormPickerConfirmValue(pickerValue, items, indexs));
							emitCallbacks([item.picker?.onConfirm, item.picker?.onConfirm], items, indexs);
						}}
						onClose={() => {
							setItemPopup(item.name, false);
							emitCallbacks([item.picker?.onClose, item.picker?.onClose]);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showCheckbox) {
			return renderFormGroup(
				item,
				<Checkbox
					{...itemView.checkboxProps}
					checkeds={item.value as string[]}
					onChange={(checkeds: string[]) => {
						handleFormChange(item.name, checkeds);
						emitCallbacks([item.checkbox?.onChange, item.checkbox?.onChange], checkeds);
					}}
				/>
			);
		}
		if (itemRenderState.showRadio) {
			return renderFormGroup(
				item,
				<Radio
					{...itemView.radioProps}
					value={item.value as string}
					onChange={(value: string) => {
						handleFormChange(item.name, value);
						emitCallbacks([item.radio?.onChange, item.radio?.onChange], value);
					}}
				/>
			);
		}
		if (itemRenderState.showSlider) {
			return renderFormGroup(
				item,
				<div className={formState.sliderWrapperClass}>
					<Slider
						{...itemView.sliderProps}
						onChange={(value, valueRange, label, labelRange) => {
							handleFormChange(
								item.name,
								resolveFormSliderChangeValue({
									isRange: itemView.sliderIsRange,
									value,
									valueRange
								})
							);
							emitCallbacks([item.slider?.onChange, item.slider?.onChange], value, valueRange, label, labelRange);
						}}
					/>
				</div>
			);
		}
		if (itemRenderState.showSwitch) {
			return renderFormGroup(
				item,
				<Switch
					{...itemView.switchProps}
					active={item.value as boolean}
					onChange={(value: boolean) => {
						handleFormChange(item.name, value);
						emitCallbacks([item.switch?.onChange, item.switch?.onChange], value);
					}}
				/>
			);
		}
		if (itemRenderState.showStepper) {
			return renderFormGroup(
				item,
				<Stepper
					{...itemView.stepperProps}
					value={item.value as number}
					onChange={(value: number) => {
						handleFormChange(item.name, value);
						emitCallbacks([item.stepper?.onChange, item.stepper?.onChange], value);
					}}
				/>
			);
		}
		return null;
	};

	const formContent = <div className={formState.spaceClass}>{formInner.map(renderFormItem)}</div>;
	const formCardWrapper = formState.cardWrapper;

	const finalFormContent =
		formCardWrapper.kind === 'card' ? (
			<Card {...formCardWrapper.cardProps}>{formContent}</Card>
		) : formCardWrapper.kind === 'legacy' ? (
			<div className={formState.cardWrapperClass}>{formContent}</div>
		) : (
			formContent
		);

	return (
		<div>
			{finalFormContent}
			{submitChildren ||
				(formState.submitText ? (
					<Button
						{...submitButton}
						onClick={(event) => {
							submitFunc();
							emitCallbacks([submitButton?.onClick, submitButton?.onClick], event);
						}}
					>
						{formState.submitText}
					</Button>
				) : null)}
			{resetChildren ||
				(resetText ? (
					<Button
						fill="lineState"
						type="button"
						{...resetButton}
						onClick={(event) => {
							resetFunc();
							emitCallbacks([resetButton?.onClick, resetButton?.onClick], event);
						}}
					>
						{resetText}
					</Button>
				) : null)}
		</div>
	);
};

export type {
	FormActionSheetProps,
	FormActionSheetValue,
	FormCalendarProps,
	FormCalendarValue,
	FormCheckboxProps,
	FormCheckboxValue,
	FormColorPickerProps,
	FormColorPickerValue,
	FormFullKeyboardProps,
	FormFullKeyboardValue,
	FormInputProps,
	FormInputValue,
	FormItemBase,
	FormItemInternal,
	FormItemProps,
	FormNumKeyboardProps,
	FormNumKeyboardValue,
	FormPickerProps,
	FormPickerValue,
	FormProps,
	FormRadioProps,
	FormRadioValue,
	FormSliderProps,
	FormSliderValue,
	FormStepperProps,
	FormStepperValue,
	FormSwitchProps,
	FormSwitchValue,
	FormTimePickerProps,
	FormTimePickerValue,
	FormValueProps
} from './types';

export default Form;
