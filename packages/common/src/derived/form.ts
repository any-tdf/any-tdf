import type {
	FormCalendarValue,
	FormColorPickerValue,
	FormTimePickerValue,
	FormPickerValue,
	FormSliderValue,
	FormValueProps,
	TimePickerObjProps,
	PickerMultipleItem
} from '../types/index.js';
import { cardShadowObj } from './card.js';
import { mxScaleObj, pxScaleObj, radiusObj } from './common.js';
import { joinClasses, resolveClassMapValue } from './helpers.js';

export const formSpaceClass = {
	'0': 'space-y-0',
	'1': 'space-y-1',
	'2': 'space-y-2',
	'4': 'space-y-4',
	'6': 'space-y-6',
	'8': 'space-y-8'
} as const;

export type FormDerivedItem = {
	type?: string;
	name?: string;
	label?: string;
	initValue?: unknown;
	linkageSeparator?: string;
	input?: {
		placeholder?: string;
	};
	timePicker?: unknown;
	actionSheet?: unknown;
	calendar?: {
		mode?: string;
	};
	numKeyboard?: unknown;
	fullKeyboard?: {
		value?: string;
	};
	picker?: {
		multiple?: boolean;
		multipleSelected?: PickerMultipleItem[];
	};
	colorPicker?: {
		value?: FormColorPickerValue;
	};
	checkbox?: unknown;
	radio?: unknown;
	slider?: {
		isRange?: boolean;
		value?: number;
		valueRange?: [number, number];
		startValue?: number;
		endValue?: number;
	};
	switch?: unknown;
	stepper?: unknown;
	showPopup?: boolean;
	data?: unknown;
	value?: unknown;
};

export type FormRuntimeItem<T extends FormDerivedItem = FormDerivedItem> = T & {
	showPopup: boolean;
	data: unknown;
	value: FormValueProps;
};

export type FormComponentProps = Record<string, any>;
export type FormActionSheetViewProps = FormComponentProps & { actions: any[] };
export type FormCheckboxViewProps = FormComponentProps & { data: any[] };
export type FormRadioViewProps = FormComponentProps & { data: any[] };
export type FormPickerDatas = any[];
export const formItemRenderTypes = [
	'input',
	'timePicker',
	'actionSheet',
	'calendar',
	'numKeyboard',
	'fullKeyboard',
	'colorPicker',
	'picker',
	'checkbox',
	'radio',
	'slider',
	'switch',
	'stepper'
] as const;
export type FormItemKnownRenderType = (typeof formItemRenderTypes)[number];
export type FormItemRenderType = FormItemKnownRenderType | 'unknown';
export type FormItemRenderState = {
	type: FormItemRenderType;
	showInput: boolean;
	showTimePicker: boolean;
	showActionSheet: boolean;
	showCalendar: boolean;
	showNumKeyboard: boolean;
	showFullKeyboard: boolean;
	showColorPicker: boolean;
	showPicker: boolean;
	showCheckbox: boolean;
	showRadio: boolean;
	showSlider: boolean;
	showSwitch: boolean;
	showStepper: boolean;
};
export type FormRuntimeItemResetPatch = {
	showPopup: false;
	data: null;
	value: FormValueProps;
	slider?: FormDerivedItem['slider'];
};

export type FormResetState<T extends FormDerivedItem = FormDerivedItem> = {
	items: FormRuntimeItem<T>[];
	model: Record<string, FormValueProps>;
};

export type ResolveFormPlaceholderOptions = {
	inputPlaceholder?: string;
	label?: string;
	pleaseSelect: string;
};

export type ResolveFormItemViewDerivedOptions<T extends FormDerivedItem = FormDerivedItem> = {
	item: T;
	pleaseSelect: string;
};
export type ResolveFormItemViewStateOptionsParams<T extends FormDerivedItem = FormDerivedItem> = ResolveFormItemViewDerivedOptions<T>;

export type FormItemViewDerived = {
	inputProps: FormComponentProps;
	timePickerProps: FormComponentProps;
	actionSheetProps: FormActionSheetViewProps;
	calendarProps: FormComponentProps;
	numKeyboardProps: FormComponentProps;
	fullKeyboardProps: FormComponentProps;
	colorPickerProps: FormComponentProps;
	pickerProps: FormComponentProps;
	pickerDatas: FormPickerDatas;
	calendarIsMultiple: boolean;
	pickerIsMultiple: boolean;
	checkboxProps: FormCheckboxViewProps;
	radioProps: FormRadioViewProps;
	sliderProps: FormComponentProps;
	sliderIsRange: boolean;
	switchProps: FormComponentProps;
	stepperProps: FormComponentProps;
	placeholder: string;
	calendarDisplayValue: string;
	pickerDisplayValue: string;
	renderState: FormItemRenderState;
};

export type FormCardRadius = keyof typeof radiusObj | '';
export type FormCardMx = keyof typeof mxScaleObj | string;
export type FormCardPx = keyof typeof pxScaleObj | string;
export type FormCardShadow = keyof typeof cardShadowObj | string;
export type FormCardWrapperKind = 'card' | 'legacy' | 'plain';
export type FormCardWrapperDerived = {
	cardProps: FormComponentProps;
	className: string;
	kind: FormCardWrapperKind;
};
export type ResolveFormLegacyCardOptions = {
	radius?: FormCardRadius | string;
	mx?: FormCardMx;
	px?: FormCardPx;
	shadow?: FormCardShadow;
};
export type ResolveFormDerivedOptions<T extends FormDerivedItem = FormDerivedItem> = {
	card?: boolean | FormComponentProps;
	defaultSubmit: string;
	form?: readonly T[];
	legacy?: ResolveFormLegacyCardOptions | false;
	space?: keyof typeof formSpaceClass | string;
	submitText?: string;
};
export type FormStatePropsLike<T extends FormDerivedItem = FormDerivedItem> = Partial<Omit<ResolveFormDerivedOptions<T>, 'defaultSubmit'>>;
export type ResolveFormStateOptionsParams<T extends FormDerivedItem = FormDerivedItem> = {
	defaultSubmit: string;
	props: FormStatePropsLike<T>;
};
export type FormDerived<T extends FormDerivedItem = FormDerivedItem> = {
	cardWrapperClass: string;
	cardWrapper: FormCardWrapperDerived;
	clearButtonClass: string;
	clearIconClass: string;
	fieldHeaderClass: string;
	fieldMetaClass: string;
	fieldTitleClass: string;
	groupClass: string;
	legacyCardClass: string;
	multiControlClass: string;
	multiRootClass: string;
	multiTagsClass: string;
	placeholderClass: string;
	requiredClass: string;
	runtimeItems: FormRuntimeItem<T>[];
	selectIconClass: string;
	sliderWrapperClass: string;
	spaceClass: string;
	submitText: string;
};
export type FormTimePickerInputSource = {
	timeStr?: string;
};
export type FormActionSheetInputSource = {
	action?: {
		content?: string;
	};
};
export type FormTagViewItem = {
	label: string;
	key: string;
};
export type ResolveFormKeyboardClickActionOptions = {
	closeKeys?: readonly string[];
	key: string;
	value: string;
};
export type FormKeyboardClickAction = {
	nextValue: string;
	shouldClose: boolean;
	shouldUpdateValue: boolean;
};
export type ResolveFormChangeActionOptions<TValue, T extends { readonly name?: string; readonly value?: TValue }> = {
	items: readonly T[];
	model: Record<string, TValue>;
	name: string | undefined;
	value: TValue;
};
export type ResolveFormItemsChangeActionOptions<TValue, T extends { readonly name?: string; readonly value?: TValue }> = Omit<
	ResolveFormChangeActionOptions<TValue, T>,
	'model'
>;
export type FormChangeAction<TValue, T extends { readonly name?: string; readonly value?: TValue }> = {
	nextItems: T[];
	nextModel: Record<string, TValue>;
};
export type FormItemsChangeAction<T extends { readonly name?: string }> = {
	nextItems: T[];
};
export type ResolveFormPopupActionOptions<T extends { readonly name?: string; readonly showPopup?: boolean }> = {
	items: readonly T[];
	name: string | undefined;
	showPopup: boolean;
};
export type FormPopupAction<T extends { readonly name?: string; readonly showPopup?: boolean }> = {
	nextItems: T[];
	showPopup: boolean;
};
export type ResolveFormItemPopupActionOptions = {
	showPopup: boolean;
};
export type FormItemPopupAction = {
	showPopup: boolean;
};
export type ResolveFormOpenPopupKeyboardActionOptions = {
	key: string;
};
export type FormOpenPopupKeyboardAction = {
	isActivationKey: boolean;
	shouldOpen: boolean;
};
export type ResolveFormFieldClearValueOptions = {
	pickerMultiple?: boolean;
	type?: string;
};

// 输入 Form 字段配置，返回框架无关的初始值。
// Resolve a Form field config into a framework-agnostic initial value.
export const resolveFormItemInitialValue = (item: FormDerivedItem): FormValueProps => {
	switch (item.type) {
		case 'checkbox':
			return [];
		case 'switch':
			return false;
		case 'stepper':
			return (item.initValue as number) || 0;
		case 'slider': {
			const valueRange = item.slider?.valueRange as [number, number] | undefined;
			const value = item.slider?.value as number | undefined;
			return item.slider?.isRange
				? ({ valueRange: valueRange || (item.initValue as [number, number]) || [20, 60] } as FormSliderValue)
				: ({ value: value || (item.initValue as number) || 40 } as FormSliderValue);
		}
		case 'timePicker':
			return { timeStr: '', timeObj: undefined };
		case 'actionSheet':
			return { action: undefined, index: undefined };
		case 'picker':
			return {
				items: [],
				indexs: [],
				multipleSelected: item.picker?.multiple
					? item.picker?.multipleSelected || ((item.initValue as FormPickerValue)?.multipleSelected ?? [])
					: undefined
			};
		case 'calendar':
			return { dates: [] };
		case 'fullKeyboard':
			return item.fullKeyboard?.value || (item.initValue as string) || '';
		case 'colorPicker':
			return item.colorPicker?.value ?? (item.initValue as FormValueProps);
		case 'numKeyboard':
		case 'input':
		case undefined:
		default:
			return (item.initValue as string) || '';
	}
};

// 只补齐 Slider 运行时 props，不触碰组件状态或事件。
// Only enrich Slider runtime props without touching component state or events.
export const resolveFormItemWithSliderRuntime = <T extends FormDerivedItem>(item: T, value: FormValueProps): T => {
	if (item.type !== 'slider') return item;
	if (item.slider?.isRange) {
		const valueRange = (value as FormSliderValue).valueRange || [20, 60];
		return {
			...item,
			slider: {
				...item.slider,
				startValue: valueRange[0],
				endValue: valueRange[1],
				valueRange
			}
		};
	}

	const nextValue = (value as FormSliderValue).value || 40;
	return {
		...item,
		slider: {
			...item.slider,
			value: nextValue
		}
	};
};

export const resolveFormRuntimeItem = <T extends FormDerivedItem>(item: T): FormRuntimeItem<T> => {
	const value = resolveFormItemInitialValue(item);
	return {
		...resolveFormItemWithSliderRuntime(item, value),
		showPopup: false,
		data: null,
		value
	};
};

export const resolveFormRuntimeItems = <T extends FormDerivedItem>(items: readonly T[] = []): FormRuntimeItem<T>[] =>
	items.map((item) => resolveFormRuntimeItem(item));

export const resolveFormItemRenderType = (type?: string): FormItemRenderType => {
	if (!type) return 'input';
	if (type === 'input') return 'input';
	return formItemRenderTypes.includes(type as FormItemKnownRenderType) ? (type as FormItemKnownRenderType) : 'unknown';
};

// 输入 Form 字段类型，返回框架无关的渲染分支状态。
// Receive a Form field type and return framework-agnostic render branch state.
export const resolveFormItemRenderState = (type?: string): FormItemRenderState => {
	const resolvedType = resolveFormItemRenderType(type);
	return {
		type: resolvedType,
		showInput: resolvedType === 'input',
		showTimePicker: resolvedType === 'timePicker',
		showActionSheet: resolvedType === 'actionSheet',
		showCalendar: resolvedType === 'calendar',
		showNumKeyboard: resolvedType === 'numKeyboard',
		showFullKeyboard: resolvedType === 'fullKeyboard',
		showColorPicker: resolvedType === 'colorPicker',
		showPicker: resolvedType === 'picker',
		showCheckbox: resolvedType === 'checkbox',
		showRadio: resolvedType === 'radio',
		showSlider: resolvedType === 'slider',
		showSwitch: resolvedType === 'switch',
		showStepper: resolvedType === 'stepper'
	};
};

export const resolveFormItemsRenderState = <T extends { readonly type?: string }>(items: readonly T[] = []): FormItemRenderState[] =>
	items.map((item) => resolveFormItemRenderState(item.type));

// 输入当前字段和重置字段，返回组件层可写入的无副作用 reset patch。
// Receive current and reset field items, then return a side-effect-free reset patch for the component layer.
export const resolveFormRuntimeItemResetPatch = <T extends FormRuntimeItem>(item: T, resetItem: T): FormRuntimeItemResetPatch => ({
	value: resetItem.value,
	showPopup: false,
	data: null,
	...(resolveFormItemRenderState(item.type).showSlider ? { slider: resetItem.slider } : {})
});

// 输入 Form 运行时字段列表和字段值，返回无副作用的下一份字段列表。
// Receive Form runtime items and a field value, then return the next side-effect-free item list.
export const resolveFormRuntimeItemsValue = <T extends { readonly name?: string; readonly value?: unknown }>(
	items: readonly T[],
	name: string | undefined,
	value: T['value']
): T[] => items.map((item) => (item.name === name ? { ...item, value } : item));

// 输入 Form 运行时字段列表和弹层状态，返回无副作用的下一份字段列表。
// Receive Form runtime items and popup state, then return the next side-effect-free item list.
export const resolveFormRuntimeItemsPopup = <T extends { readonly name?: string; readonly showPopup?: boolean }>(
	items: readonly T[],
	name: string | undefined,
	showPopup: boolean
): T[] => items.map((item) => (item.name === name ? { ...item, showPopup } : item));

// 输入 Form 字段配置列表，返回无框架的重置项和 model。
// Resolve Form field configs into framework-agnostic reset items and model.
export const resolveFormResetState = <T extends FormDerivedItem>(items: readonly T[] = []): FormResetState<T> => {
	const runtimeItems = resolveFormRuntimeItems(items);
	return {
		items: runtimeItems,
		model: runtimeItems.reduce<Record<string, FormValueProps>>((model, item) => {
			if (item.name) model[item.name] = item.value;
			return model;
		}, {})
	};
};

export const resolveFormModelValue = <TValue>(
	model: Record<string, TValue>,
	name: string | undefined,
	value: TValue
): Record<string, TValue> => {
	return name ? { ...model, [name]: value } : { ...model };
};

// 输入 Form 字段变更状态，返回框架无关的字段列表和 model 下一状态。
// Receive Form field change state and return framework-agnostic next items and model.
export const resolveFormChangeAction = <TValue, T extends { readonly name?: string; readonly value?: TValue }>({
	items,
	model,
	name,
	value
}: ResolveFormChangeActionOptions<TValue, T>): FormChangeAction<TValue, T> => ({
	nextItems: resolveFormRuntimeItemsValue(items, name, value),
	nextModel: resolveFormModelValue(model, name, value)
});

// 输入 Form 字段列表变更状态，返回组件层可写入的字段列表下一状态。
// Receive Form item change state and return next items for the component layer to write.
export const resolveFormItemsChangeAction = <TValue, T extends { readonly name?: string; readonly value?: TValue }>({
	items,
	name,
	value
}: ResolveFormItemsChangeActionOptions<TValue, T>): FormItemsChangeAction<T> => ({
	nextItems: resolveFormRuntimeItemsValue(items, name, value)
});

// 输入 Form 弹层状态，返回组件层可写入的下一份字段列表。
// Receive Form popup state and return next items for the component layer to write.
export const resolveFormPopupAction = <T extends { readonly name?: string; readonly showPopup?: boolean }>({
	items,
	name,
	showPopup
}: ResolveFormPopupActionOptions<T>): FormPopupAction<T> => ({
	nextItems: resolveFormRuntimeItemsPopup(items, name, showPopup),
	showPopup
});

// 输入 Form 字段弹层可见值，返回组件层可写入的字段弹层状态。
// Receive a Form field popup visibility value and return field popup state for the component layer.
export const resolveFormItemPopupAction = ({ showPopup }: ResolveFormItemPopupActionOptions): FormItemPopupAction => ({
	showPopup
});

// 输入 Form 可打开区域的按键状态，返回组件层是否应打开弹层。
// Resolve key state for openable Form areas into whether the component layer should open the popup.
export const resolveFormOpenPopupKeyboardAction = ({ key }: ResolveFormOpenPopupKeyboardActionOptions): FormOpenPopupKeyboardAction => {
	const isActivationKey = key === 'Enter' || key === ' ';
	return {
		isActivationKey,
		shouldOpen: isActivationKey
	};
};

export const resolveFormComponentProps = <T extends FormDerivedItem>(
	item: T,
	key: keyof T,
	defaults: FormComponentProps = {}
): FormComponentProps => {
	const props = item[key];
	return { ...defaults, ...((props && typeof props === 'object' ? props : {}) as FormComponentProps) };
};

export const resolveFormActionSheetProps = <T extends FormDerivedItem>(item: T): FormActionSheetViewProps =>
	resolveFormComponentProps(item, 'actionSheet', { actions: [] }) as FormActionSheetViewProps;

export const resolveFormCheckboxProps = <T extends FormDerivedItem>(item: T): FormCheckboxViewProps =>
	resolveFormComponentProps(item, 'checkbox', { data: [] }) as FormCheckboxViewProps;

export const resolveFormRadioProps = <T extends FormDerivedItem>(item: T): FormRadioViewProps =>
	resolveFormComponentProps(item, 'radio', { data: [] }) as FormRadioViewProps;

// 输入 Picker props，返回组件可直接绑定的列表数据。
// Resolve Picker props into list data that components can bind directly.
export const resolveFormPickerDatas = (pickerProps: FormComponentProps): FormPickerDatas =>
	Array.isArray(pickerProps.datas) ? pickerProps.datas : [];

export const resolveFormCalendarValueAfterRemove = (value: FormCalendarValue | undefined, index: number): FormCalendarValue => {
	return { dates: (value?.dates || []).filter((_, currentIndex) => currentIndex !== index) };
};

export const resolveFormPickerValueAfterRemove = (value: FormPickerValue | undefined, index: number): FormPickerValue => {
	return {
		...(value || { items: [], indexs: [] }),
		multipleSelected: (value?.multipleSelected || []).filter((_, currentIndex) => currentIndex !== index)
	};
};

export const resolveFormClearedPickerValue = (multiple = false): FormPickerValue => ({
	items: [],
	indexs: [],
	multipleSelected: multiple ? [] : undefined
});

// 输入 Form 字段类型，返回组件层写入字段时使用的框架无关清空值。
// Resolve a Form field type into the framework-agnostic clear value written by the component layer.
export const resolveFormFieldClearValue = ({ type, pickerMultiple = false }: ResolveFormFieldClearValueOptions = {}): FormValueProps => {
	const renderState = resolveFormItemRenderState(type);
	if (renderState.showTimePicker) return { timeStr: '', timeObj: undefined };
	if (renderState.showActionSheet) return { action: undefined, index: undefined };
	if (renderState.showCalendar) return { dates: [] };
	if (renderState.showPicker) return resolveFormClearedPickerValue(pickerMultiple);
	if (renderState.showColorPicker) return undefined;
	if (renderState.showCheckbox) return [];
	if (renderState.showSwitch) return false;
	if (renderState.showStepper) return 0;
	if (renderState.showSlider) return { value: 40 };
	return '';
};

export const resolveFormCalendarMultiple = (mode: unknown): boolean => mode === 'multiple';

export const resolveFormPickerMultiple = (multiple: unknown): boolean => Boolean(multiple);

export const resolveFormKeyboardClose = (key: string, closeKeys: readonly string[] = ['close', 'done']): boolean => closeKeys.includes(key);

export const resolveFormTimePickerInputValue = (value?: FormTimePickerInputSource): string => value?.timeStr || '';

export const resolveFormActionSheetInputValue = (value?: FormActionSheetInputSource): string => value?.action?.content || '';

export const resolveFormSliderChangeValue = ({
	isRange = false,
	value,
	valueRange
}: {
	isRange?: boolean;
	value: number;
	valueRange?: [number, number];
}): FormSliderValue => (isRange && valueRange ? { valueRange } : { value });

// 输入子组件事件数据，返回 Form 字段可保存的纯值。
// Receive child component event data and return pure values that Form fields can store.
export const resolveFormTimePickerChangeValue = (timeStr: string, timeObj?: TimePickerObjProps): FormTimePickerValue => ({
	timeStr,
	timeObj
});

export const resolveFormActionSheetChangeValue = <TAction>(index: number, action: TAction): { action: TAction; index: number } => ({
	action,
	index
});

export const resolveFormCalendarChangeValue = (dates: string[]): FormCalendarValue => ({ dates });

export const resolveFormPickerMultipleChangeValue = (value: FormPickerValue, multipleSelected: PickerMultipleItem[]): FormPickerValue => ({
	...value,
	multipleSelected
});

export const resolveFormPickerConfirmValue = (
	value: FormPickerValue,
	items: FormPickerValue['items'],
	indexs: number[]
): FormPickerValue => ({ ...value, items, indexs });

export const resolveFormColorPickerChangeValue = (colors: readonly FormColorPickerValue[]): FormColorPickerValue => colors[0];

export const resolveFormKeyboardNextValue = (value: string, key: string): string => {
	if (key === 'delete') return value.slice(0, -1);
	if (resolveFormKeyboardClose(key)) return value;
	return value + key;
};

// 输入 Form 键盘按键状态，返回无副作用的值更新和关闭决策。
// Receive Form keyboard key state and return side-effect-free value update and close decisions.
export const resolveFormKeyboardClickAction = ({
	value,
	key,
	closeKeys = ['close', 'done']
}: ResolveFormKeyboardClickActionOptions): FormKeyboardClickAction => {
	const shouldClose = resolveFormKeyboardClose(key, closeKeys);
	const nextValue = key === 'delete' ? value.slice(0, -1) : shouldClose ? value : value + key;
	return {
		nextValue,
		shouldClose,
		shouldUpdateValue: !shouldClose
	};
};

export const formatFormColorPickerValue = (value: FormColorPickerValue): string => {
	if (!value) return '';
	if (typeof value === 'string') return value;
	if (Array.isArray(value)) return `rgb(${value.join(', ')})`;
	if (typeof value === 'object' && 'l' in value && 'c' in value && 'h' in value) {
		return `oklch(${value.l} ${value.c} ${value.h})`;
	}
	return '';
};

export const resolveFormCalendarDisplayValue = (value: FormCalendarValue | undefined, mode?: string): string => {
	const dates = value?.dates || [];
	if (dates.length === 0) return '';
	if (mode === 'range' && dates.length >= 2) return `${dates[0]} - ${dates[1]}`;
	return dates.join(',');
};

export const resolveFormPickerDisplayValue = (value: FormPickerValue | undefined, separator = ' / '): string =>
	value?.items?.map((item) => item.label).join(separator) || '';

export const resolveFormCalendarDates = (value?: FormCalendarValue): string[] => value?.dates || [];

export const resolveFormCalendarKey = ({
	isMultiple = false,
	value,
	fallback = ''
}: {
	isMultiple?: boolean;
	value?: FormCalendarValue;
	fallback?: string;
}): string => (isMultiple ? resolveFormCalendarDates(value).join('|') : fallback);

// 输入已选日期，返回组件层渲染 Tag 所需的轻量数据。
// Resolve selected dates into lightweight tag data for component rendering.
export const resolveFormCalendarTagItems = (value?: FormCalendarValue): FormTagViewItem[] =>
	resolveFormCalendarDates(value).map((date) => ({ label: date, key: date }));

export const resolveFormPickerSelected = (value?: FormPickerValue): PickerMultipleItem[] => value?.multipleSelected || [];

// 输入 Picker 已选项，返回组件层渲染 Tag 所需的轻量数据。
// Resolve selected Picker items into lightweight tag data for component rendering.
export const resolveFormPickerTagItems = (value?: FormPickerValue): FormTagViewItem[] =>
	resolveFormPickerSelected(value).map((selectedItem, index) => ({ label: selectedItem.label, key: `${selectedItem.label}-${index}` }));

export const resolveFormHasTags = (items: readonly unknown[]): boolean => items.length > 0;

export const resolveFormPlaceholder = ({ inputPlaceholder, label, pleaseSelect }: ResolveFormPlaceholderOptions): string => {
	if (inputPlaceholder) return inputPlaceholder;
	return label ? `${pleaseSelect} ${label}` : '';
};

// 输入 Form 字段和语言文案，返回组件层可直接消费的展示派生结果。
// Resolve a Form field and locale text into view derived values that components can consume directly.
export const resolveFormItemViewStateOptions = <T extends FormDerivedItem>(
	options: ResolveFormItemViewStateOptionsParams<T>
): ResolveFormItemViewDerivedOptions<T> => options;

export const resolveFormItemViewDerived = <T extends FormDerivedItem>({
	item,
	pleaseSelect
}: ResolveFormItemViewDerivedOptions<T>): FormItemViewDerived => {
	const inputProps = resolveFormComponentProps(item, 'input');
	const calendarProps = resolveFormComponentProps(item, 'calendar');
	const pickerProps = resolveFormComponentProps(item, 'picker');
	const sliderProps = resolveFormComponentProps(item, 'slider');
	const calendarIsMultiple = resolveFormCalendarMultiple(calendarProps.mode);
	const pickerIsMultiple = resolveFormPickerMultiple(pickerProps.multiple);
	return {
		inputProps,
		timePickerProps: resolveFormComponentProps(item, 'timePicker'),
		actionSheetProps: resolveFormActionSheetProps(item),
		calendarProps,
		numKeyboardProps: resolveFormComponentProps(item, 'numKeyboard'),
		fullKeyboardProps: resolveFormComponentProps(item, 'fullKeyboard'),
		colorPickerProps: resolveFormComponentProps(item, 'colorPicker'),
		pickerProps,
		pickerDatas: resolveFormPickerDatas(pickerProps),
		calendarIsMultiple,
		pickerIsMultiple,
		checkboxProps: resolveFormCheckboxProps(item),
		radioProps: resolveFormRadioProps(item),
		sliderProps,
		sliderIsRange: Boolean(sliderProps.isRange),
		switchProps: resolveFormComponentProps(item, 'switch'),
		stepperProps: resolveFormComponentProps(item, 'stepper'),
		placeholder: resolveFormPlaceholder({
			inputPlaceholder: inputProps.placeholder as string | undefined,
			label: item.label,
			pleaseSelect
		}),
		calendarDisplayValue: resolveFormCalendarDisplayValue(
			item.value as FormCalendarValue | undefined,
			calendarProps.mode as string | undefined
		),
		pickerDisplayValue: resolveFormPickerDisplayValue(
			item.value as FormPickerValue | undefined,
			(item.linkageSeparator as string | undefined) || ' / '
		),
		renderState: resolveFormItemRenderState(item.type)
	};
};

export const resolveFormSpaceClass = (space: keyof typeof formSpaceClass | string = '0'): string =>
	resolveClassMapValue(formSpaceClass, space, '0');

export const resolveFormGroupClass = (): string => 'p-2';

export const resolveFormFieldHeaderClass = (extra = ''): string => joinClasses(['mb-2 flex justify-between px-2', extra]);

export const resolveFormMultiRootClass = (): string => 'px-2 py-2';

export const resolveFormFieldTitleClass = (): string => 'relative mb-1 text-sm font-semibold';

export const resolveFormRequiredClass = (): string => 'text-error absolute -left-2.5 text-base';

export const resolveFormFieldMetaClass = (): string => 'flex space-x-2 text-xs';

export const resolveFormMultiControlClass = (): string =>
	'bg-text-primary/5 dark:bg-text-dark/5 rounded-(--radius-form) relative my-0.5 flex min-h-12 w-full cursor-pointer items-center gap-2 px-2 py-3 text-left text-sm transition-all duration-300';

export const resolveFormMultiTagsClass = (): string => 'flex flex-1 flex-wrap items-center gap-2';

export const resolveFormPlaceholderClass = (): string => 'font-semibold opacity-50';

export const resolveFormClearButtonClass = (): string => 'shrink-0';

export const resolveFormClearIconClass = (): string => 'opacity-30';

export const resolveFormSelectIconClass = (): string => 'shrink-0 opacity-50';

export const resolveFormSliderWrapperClass = (): string => 'mx-4';

// 输入 Form 文案配置，返回提交按钮展示文案。
// Resolve Form copy config into the submit button display text.
export const resolveFormSubmitText = (submitText: string | undefined, defaultSubmit: string): string => submitText ?? defaultSubmit;

// 输入 Form 包装配置，返回框架无关的旧版卡片 class。
// Resolve Form wrapper config into framework-agnostic legacy card classes.
export const resolveFormLegacyCardClass = ({
	radius = '',
	mx = '4',
	px = '2',
	shadow = 'sm'
}: ResolveFormLegacyCardOptions = {}): string => {
	const radiusClass = radius ? radiusObj[radius as keyof typeof radiusObj] || '' : 'rounded-(--radius-box)';
	const mxClass = resolveClassMapValue(mxScaleObj, mx, '4');
	const pxClass = resolveClassMapValue(pxScaleObj, px, '2');
	const shadowClass = resolveClassMapValue(cardShadowObj, shadow, 'sm');
	return `${radiusClass} ${mxClass} ${pxClass} ${shadowClass} mb-2 bg-white py-2 dark:bg-black`;
};

// 输入 Form 包装配置，返回组件层可执行的框架无关包装模式。
// Resolve Form wrapper config into a framework-agnostic wrapper mode for component rendering.
export const resolveFormCardWrapper = ({
	card,
	legacyClass = ''
}: { card?: boolean | FormComponentProps; legacyClass?: string } = {}): FormCardWrapperDerived => {
	if (card && typeof card === 'object') {
		return {
			kind: 'card',
			cardProps: card,
			className: ''
		};
	}
	if (card === true) {
		return {
			kind: 'legacy',
			cardProps: {},
			className: legacyClass
		};
	}
	return {
		kind: 'plain',
		cardProps: {},
		className: ''
	};
};

// 输入 Form 包装派生结果，返回组件层可直接绑定的外层 class。
// Receive Form wrapper derivation and return bind-ready wrapper classes for component rendering.
export const resolveFormCardWrapperClass = (wrapper: FormCardWrapperDerived): string =>
	wrapper.kind === 'legacy' ? wrapper.className : '';

// 输入 Form props 相关状态，返回组件层可直接绑定的框架无关派生结果。
// Receive Form prop-related state and return framework-agnostic derived values ready for component binding.
export const resolveFormStateOptions = <T extends FormDerivedItem>({
	defaultSubmit,
	props
}: ResolveFormStateOptionsParams<T>): ResolveFormDerivedOptions<T> => ({
	card: props.card,
	defaultSubmit,
	form: props.form,
	legacy: props.legacy,
	space: props.space,
	submitText: props.submitText
});

export const resolveFormDerived = <T extends FormDerivedItem>({
	card,
	defaultSubmit,
	form = [],
	legacy,
	space = '0',
	submitText
}: ResolveFormDerivedOptions<T>): FormDerived<T> => {
	const legacyCardClass = legacy ? resolveFormLegacyCardClass(legacy) : '';
	const cardWrapper = resolveFormCardWrapper({ card, legacyClass: legacyCardClass });
	return {
		cardWrapper,
		cardWrapperClass: resolveFormCardWrapperClass(cardWrapper),
		clearButtonClass: resolveFormClearButtonClass(),
		clearIconClass: resolveFormClearIconClass(),
		fieldHeaderClass: resolveFormFieldHeaderClass(),
		fieldMetaClass: resolveFormFieldMetaClass(),
		fieldTitleClass: resolveFormFieldTitleClass(),
		groupClass: resolveFormGroupClass(),
		legacyCardClass,
		multiControlClass: resolveFormMultiControlClass(),
		multiRootClass: resolveFormMultiRootClass(),
		multiTagsClass: resolveFormMultiTagsClass(),
		placeholderClass: resolveFormPlaceholderClass(),
		requiredClass: resolveFormRequiredClass(),
		runtimeItems: resolveFormRuntimeItems(form),
		selectIconClass: resolveFormSelectIconClass(),
		sliderWrapperClass: resolveFormSliderWrapperClass(),
		spaceClass: resolveFormSpaceClass(space),
		submitText: resolveFormSubmitText(submitText, defaultSubmit)
	};
};
