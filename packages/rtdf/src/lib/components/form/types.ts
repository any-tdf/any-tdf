import type { ReactNode } from 'react';
import type {
	FormActionSheetProps as CommonFormActionSheetProps,
	FormActionSheetValue as CommonFormActionSheetValue,
	FormCalendarProps as CommonFormCalendarProps,
	FormCalendarValue,
	FormCheckboxProps as CommonFormCheckboxProps,
	FormCheckboxValue,
	FormColorPickerProps as CommonFormColorPickerProps,
	FormColorPickerValue,
	FormFullKeyboardProps as CommonFormFullKeyboardProps,
	FormInputProps as CommonFormInputProps,
	FormInputValue,
	FormNumKeyboardProps as CommonFormNumKeyboardProps,
	FormPickerProps as CommonFormPickerProps,
	FormPickerValue,
	FormProps as CommonFormProps,
	FormRadioProps as CommonFormRadioProps,
	FormSliderProps as CommonFormSliderProps,
	FormSliderValue,
	FormStepperProps as CommonFormStepperProps,
	FormStepperValue,
	FormSwitchProps as CommonFormSwitchProps,
	FormSwitchValue,
	FormTimePickerProps as CommonFormTimePickerProps,
	FormTimePickerValue
} from '@any-tdf/common/types';
import type { ActionProps, CardProps, ColorPickerProps, ColorPickerValue, FullKeyboardProps, LargeAreaRadius } from '../../types';
import type { ActionSheetProps } from '../actionSheet';
import type { ButtonProps } from '../button';
import type { CalendarProps } from '../calendar';
import type { CheckboxProps } from '../checkbox';
import type { InputProps } from '../input';
import type { NumKeyboardProps } from '../numKeyboard';
import type { PickerProps } from '../picker';
import type { RadioProps } from '../radio';
import type { SliderProps } from '../slider';
import type { StepperProps } from '../stepper';
import type { SwitchProps } from '../switch';
import type { TimePickerProps } from '../timePicker';

export type {
	FormCalendarValue,
	FormCheckboxValue,
	FormColorPickerValue,
	FormFullKeyboardValue,
	FormInputValue,
	FormNumKeyboardValue,
	FormPickerValue,
	FormRadioValue,
	FormSliderValue,
	FormStepperValue,
	FormSwitchValue,
	FormTimePickerValue
} from '@any-tdf/common/types';

export type FormItemBase = Pick<CommonFormInputProps, 'name' | 'label' | 'required'>;

export type FormInputProps = Omit<CommonFormInputProps, 'input'> & {
	input?: InputProps;
};

export type FormTimePickerProps = Omit<CommonFormTimePickerProps, 'timePicker' | 'input'> & {
	timePicker?: TimePickerProps;
	input?: InputProps;
};

export type FormActionSheetProps = Omit<CommonFormActionSheetProps, 'actionSheet' | 'input'> & {
	actionSheet: ActionSheetProps;
	input?: InputProps;
};

export type FormActionSheetValue = Omit<CommonFormActionSheetValue, 'action'> & {
	action?: ActionProps;
	index?: number;
};

export type FormCalendarProps = Omit<CommonFormCalendarProps, 'calendar' | 'input'> & {
	calendar?: CalendarProps;
	input?: InputProps;
};

export type FormNumKeyboardProps = Omit<CommonFormNumKeyboardProps, 'numKeyboard' | 'input'> & {
	numKeyboard?: NumKeyboardProps;
	input?: InputProps;
};

export type FormFullKeyboardProps = Omit<CommonFormFullKeyboardProps, 'fullKeyboard' | 'input'> & {
	fullKeyboard?: FullKeyboardProps;
	input?: InputProps;
};

export type FormPickerProps = Omit<CommonFormPickerProps, 'picker' | 'input' | 'initValue'> & {
	initValue?: string | FormPickerValue;
	picker?: PickerProps & { datas?: unknown[] };
	input?: InputProps;
};

export type FormColorPickerProps = Omit<CommonFormColorPickerProps, 'colorPicker' | 'input'> & {
	initValue?: ColorPickerValue;
	colorPicker?: ColorPickerProps;
	input?: InputProps;
};

export type FormCheckboxProps = Omit<CommonFormCheckboxProps, 'checkbox'> & {
	checkbox?: CheckboxProps;
};

export type FormRadioProps = Omit<CommonFormRadioProps, 'radio'> & {
	radio?: RadioProps;
};

export type FormSliderProps = Omit<CommonFormSliderProps, 'slider'> & {
	slider?: SliderProps & {
		value?: number;
		valueRange?: [number, number];
		isRange?: boolean;
	};
};

export type FormSwitchProps = Omit<CommonFormSwitchProps, 'switch'> & {
	switch?: SwitchProps;
};

export type FormStepperProps = Omit<CommonFormStepperProps, 'stepper'> & {
	stepper?: StepperProps;
};

export type FormItemProps =
	| FormInputProps
	| FormTimePickerProps
	| FormActionSheetProps
	| FormCalendarProps
	| FormNumKeyboardProps
	| FormFullKeyboardProps
	| FormPickerProps
	| FormColorPickerProps
	| FormCheckboxProps
	| FormRadioProps
	| FormSliderProps
	| FormSwitchProps
	| FormStepperProps;

export type FormValueProps =
	| FormInputValue
	| FormTimePickerValue
	| FormActionSheetValue
	| FormCalendarValue
	| FormPickerValue
	| FormColorPickerValue
	| FormCheckboxValue
	| FormSliderValue
	| FormSwitchValue
	| FormStepperValue;

export type FormProps = Omit<CommonFormProps, 'form' | 'submitButton' | 'resetButton' | 'submitChildren' | 'resetChildren' | 'card'> & {
	form: FormItemProps[];
	submitButton?: ButtonProps;
	resetButton?: ButtonProps;
	submitChildren?: ReactNode;
	resetChildren?: ReactNode;
	card?: boolean | CardProps;
	mx?: '2' | '3' | '4' | '6' | '8';
	px?: '0' | '1' | '2' | '4' | '6';
	radius?: LargeAreaRadius;
	shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	onChange?: (data: Record<string, FormValueProps>) => void;
	onSubmit?: (data: Record<string, FormValueProps>) => void;
	onReset?: () => void;
};

export type FormItemInternal = FormItemBase & {
	type?: FormItemProps['type'];
	input?: InputProps;
	timePicker?: TimePickerProps;
	actionSheet?: ActionSheetProps;
	calendar?: CalendarProps;
	numKeyboard?: NumKeyboardProps;
	fullKeyboard?: FullKeyboardProps;
	linkageSeparator?: string;
	picker?: PickerProps & { datas?: unknown[] };
	colorPicker?: ColorPickerProps;
	checkbox?: CheckboxProps;
	radio?: RadioProps;
	slider?: SliderProps & {
		value?: number;
		valueRange?: [number, number];
		isRange?: boolean;
	};
	switch?: SwitchProps;
	stepper?: StepperProps;
	showPopup: boolean;
	data: unknown;
	value: FormValueProps;
};
