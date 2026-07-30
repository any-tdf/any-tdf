<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
	formatFormColorPickerValue,
	type FormCardRadius,
	type FormCardShadow,
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
	resolveFormHasTags,
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
import { zh_CN } from '../lang';
import type {
	ActionProps,
	ButtonProps,
	CardProps,
	ColorPickerValue,
	FormActionSheetValue,
	FormCalendarValue,
	FormColorPickerValue,
	FormItemProps,
	FormPickerValue,
	FormProps,
	FormTimePickerValue,
	FormValueProps,
	PickerMultipleItem,
	TimePickerObjProps,
	VueNode
} from '../types';
import { useConfig } from './adapter/config';
import ActionSheet from './ActionSheet.vue';
import Button from './Button.vue';
import Calendar from './Calendar.vue';
import Card from './Card.vue';
import Checkbox from './Checkbox.vue';
import ColorPicker from './ColorPicker.vue';
import FullKeyboard from './FullKeyboard.vue';
import Input from './Input.vue';
import NumKeyboard from './NumKeyboard.vue';
import Picker from './Picker.vue';
import Radio from './Radio.vue';
import Slider from './Slider.vue';
import Stepper from './Stepper.vue';
import Switch from './Switch.vue';
import Tag from './Tag.vue';
import TimePicker from './TimePicker.vue';
import SvgIcon from './SvgIcon.vue';

type FormItemInternal = FormItemProps & {
	showPopup: boolean;
	data: unknown;
	value: FormValueProps;
	[key: string]: unknown;
};
type AnyRecord = Record<string, any>;
type FormVueProps = Omit<FormProps, 'card' | 'submitChildren' | 'resetChildren'> & {
	card?: boolean | CardProps;
	submitChildren?: VueNode | (() => VueNode);
	resetChildren?: VueNode | (() => VueNode);
	mx?: '2' | '3' | '4' | '6' | '8';
	px?: '0' | '1' | '2' | '4' | '6';
	radius?: FormCardRadius;
	shadow?: FormCardShadow;
};

const props = withDefaults(defineProps<FormVueProps>(), {
	form: () => [],
	submitText: undefined,
	resetText: null,
	submitButton: () => ({}),
	resetButton: () => ({}),
	card: false,
	mx: '4',
	space: '0',
	radius: '',
	px: '2',
	shadow: 'sm'
});

const emit = defineEmits<{
	(event: 'change', data: Record<string, FormValueProps>): void;
	(event: 'submit', data: Record<string, FormValueProps>): void;
	(event: 'reset'): void;
}>();

const config = useConfig();
const model = ref<Record<string, FormValueProps>>({});
const formLang = computed(() => config.locale?.form || zh_CN.form);
const inputLang = computed(() => config.locale?.input || zh_CN.input);
// 公共 Form 派生处理初始值、包装模式和展示值，响应式写入留在组件层。
// Shared Form derivations resolve initial values, wrapper mode and display values; reactive writes stay here.
const formState = computed(() =>
	resolveFormDerived<FormItemProps>(
		resolveFormStateOptions({
			defaultSubmit: formLang.value.submit,
			props: {
				...props,
				legacy: { radius: props.radius, mx: props.mx, px: props.px, shadow: props.shadow }
			}
		})
	)
);
const cardObjectProps = computed(() => formState.value.cardWrapper.cardProps as CardProps);
const wrapperComponent = computed(() => (formState.value.cardWrapper.kind === 'card' ? Card : 'div'));
const formInner = ref<FormItemInternal[]>([]);

const emitChange = (nextModel: Record<string, FormValueProps>) => {
	emit('change', nextModel);
};

const handleFormChange = (item: FormItemInternal, value: FormValueProps) => {
	const action = resolveFormChangeAction({
		items: formInner.value,
		model: model.value,
		name: item.name,
		value
	});
	formInner.value = action.nextItems as FormItemInternal[];
	const nextModel = action.nextModel as Record<string, FormValueProps>;
	model.value = nextModel;
	emitChange(nextModel);
};

const setItemPopup = (item: FormItemInternal, visible: boolean) => {
	formInner.value = resolveFormPopupAction({
		items: formInner.value,
		name: item.name,
		showPopup: visible
	}).nextItems as FormItemInternal[];
};

const handleOpenPopupKeydown = (event: KeyboardEvent, item: FormItemInternal) => {
	// 公共 action 只判断按键是否应打开弹层，状态写入留在组件层。
	// Shared action only decides whether the key should open a popup; state writes stay in the component layer.
	const action = resolveFormOpenPopupKeyboardAction({ key: event.key });
	if (action.shouldOpen) setItemPopup(item, true);
};

const clearFieldValue = (item: FormItemInternal, pickerMultiple = false) => {
	// 公共 action 负责计算字段清空值，组件层只写状态和派发变更。
	// Shared action calculates field clear values; the component layer only writes state and emits changes.
	handleFormChange(item, resolveFormFieldClearValue({ type: item.type, pickerMultiple }) as FormValueProps);
};

const resetItemPopup = (item: FormItemInternal, visible: boolean) => {
	formInner.value = resolveFormPopupAction({
		items: formInner.value,
		name: item.name,
		showPopup: visible
	}).nextItems as FormItemInternal[];
};

// 公共派生一次性返回字段展示值和子组件 props，组件层只保留响应式绑定和事件。
// Shared derivation returns field display values and child props; the component layer keeps reactive bindings and events.
const deriveItem = (item: FormItemInternal) =>
	resolveFormItemViewDerived(resolveFormItemViewStateOptions({ item, pleaseSelect: inputLang.value.pleaseSelect }));
// 公共派生返回字段渲染分支，组件层只负责选择对应渲染模板。
// Shared derivation returns field render branches; the component layer only selects the matching template.
const deriveItemRenderState = (item: FormItemInternal) => deriveItem(item).renderState;

const removeCalendarDate = (item: FormItemInternal, index: number) => {
	handleFormChange(item, resolveFormCalendarValueAfterRemove(item.value as FormCalendarValue, index));
};

const removePickerSelected = (item: FormItemInternal, index: number) => {
	handleFormChange(item, resolveFormPickerValueAfterRemove(item.value as FormPickerValue, index));
};

const handleNumKeyboardClick = (item: FormItemInternal, key: string) => {
	// 公共动作函数只返回字段值和关闭决策，值同步仍由组件绑定处理。
	// Shared action function only returns field value and close decisions; value sync stays with component bindings.
	const action = resolveFormKeyboardClickAction({ value: item.value as string, key });
	if (action.shouldClose) {
		setItemPopup(item, false);
	}
};

const handleFullKeyboardClick = (item: FormItemInternal, key: string) => {
	// 公共动作函数只返回字段值和关闭决策，值同步仍由组件绑定处理。
	// Shared action function only returns field value and close decisions; value sync stays with component bindings.
	const action = resolveFormKeyboardClickAction({
		value: item.value as string,
		key,
		closeKeys: ['done']
	});
	if (action.shouldClose) {
		setItemPopup(item, false);
	}
};

const submitFunc = () => {
	emit('submit', model.value);
};

const resetFunc = () => {
	const resetState = resolveFormResetState(props.form);
	formInner.value = resetState.items as FormItemInternal[];
	const nextModel = resetState.model as Record<string, FormValueProps>;
	model.value = nextModel;
	emitChange(nextModel);
	emit('reset');
};

watch(
	() => props.form,
	() => {
		formInner.value = formState.value.runtimeItems as FormItemInternal[];
	},
	{ immediate: true, deep: true }
);
</script>

<template>
	<div>
		<component :is="wrapperComponent" v-bind="cardObjectProps" :class="formState.cardWrapperClass">
			<div :class="formState.spaceClass">
				<template v-for="item in formInner" :key="item.name">
					<Input
						v-if="deriveItemRenderState(item).showInput"
						v-bind="deriveItem(item).inputProps"
						:title="item.label"
						:value="item.value as string"
						clear
						:required="item.required"
						@change="(value) => handleFormChange(item, value)"
						@clear="clearFieldValue(item)"
					/>

					<div v-else-if="deriveItemRenderState(item).showTimePicker">
						<Input
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="resolveFormTimePickerInputValue(item.value as FormTimePickerValue)"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<TimePicker
							v-bind="deriveItem(item).timePickerProps"
							v-model:visible="item.showPopup"
							@confirm="
								(timeStr: string, timeObj: TimePickerObjProps) => handleFormChange(item, resolveFormTimePickerChangeValue(timeStr, timeObj))
							"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showActionSheet">
						<Input
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="resolveFormActionSheetInputValue(item.value as FormActionSheetValue)"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<ActionSheet
							v-bind="deriveItem(item).actionSheetProps"
							v-model:visible="item.showPopup"
							@click-action="
								(index: number, action: ActionProps) => handleFormChange(item, resolveFormActionSheetChangeValue(index, action))
							"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showCalendar">
						<div v-if="deriveItem(item).calendarIsMultiple" :class="formState.multiRootClass">
							<div :class="formState.fieldHeaderClass">
								<div :class="formState.fieldTitleClass">
									<span v-if="item.required" :class="formState.requiredClass">*</span>
									{{ item.label }}
								</div>
							</div>
							<div
								role="button"
								tabindex="0"
								:class="formState.multiControlClass"
								@click="setItemPopup(item, true)"
								@keydown="(event) => handleOpenPopupKeydown(event, item)"
							>
								<div :class="formState.multiTagsClass">
									<Tag
										v-for="(dateItem, index) in resolveFormCalendarTagItems(item.value as FormCalendarValue)"
										:key="dateItem.key"
										:text="dateItem.label"
										size="sm"
										fill="light"
										closable
										@close="removeCalendarDate(item, index)"
									/>
									<span
										v-if="!resolveFormHasTags(resolveFormCalendarTagItems(item.value as FormCalendarValue))"
										:class="formState.placeholderClass"
										>{{ deriveItem(item).placeholder }}</span
									>
								</div>
								<button
									v-if="resolveFormHasTags(resolveFormCalendarTagItems(item.value as FormCalendarValue))"
									type="button"
									:class="formState.clearButtonClass"
									aria-label="clear"
									@click.stop="clearFieldValue(item)"
								>
									<!-- 公共 Form 图标 SVG 数据在 common 中维护。 / Shared Form SVG data lives in common. -->
									<SvgIcon :svg="formClearSvg" width="16" height="16" :class-name="formState.clearIconClass" />
								</button>
								<SvgIcon :svg="selectArrowRightSvg" width="24" height="24" :class-name="formState.selectIconClass" />
							</div>
						</div>
						<Input
							v-else
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="deriveItem(item).calendarDisplayValue"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<Calendar
							v-bind="deriveItem(item).calendarProps"
							v-model:visible="item.showPopup"
							:init-selected-dates="resolveFormCalendarDates(item.value as FormCalendarValue)"
							:clear="false"
							@confirm="(dates: string[]) => handleFormChange(item, resolveFormCalendarChangeValue(dates))"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showNumKeyboard">
						<Input
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="item.value as string"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<NumKeyboard
							v-bind="deriveItem(item).numKeyboardProps"
							v-model:visible="item.showPopup"
							:value="item.value as string"
							@update:value="(value: string) => handleFormChange(item, value)"
							@click="(key: string) => handleNumKeyboardClick(item, key)"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showFullKeyboard">
						<Input
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="item.value as string"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<FullKeyboard
							v-bind="deriveItem(item).fullKeyboardProps"
							v-model:visible="item.showPopup"
							:value="item.value as string"
							@update:value="(value: string) => handleFormChange(item, value)"
							@click="(key: string) => handleFullKeyboardClick(item, key)"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showColorPicker">
						<Input
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="formatFormColorPickerValue(item.value as FormColorPickerValue)"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<ColorPicker
							v-bind="deriveItem(item).colorPickerProps"
							v-model:visible="item.showPopup"
							:value="item.value as ColorPickerValue | undefined"
							@close="
								(colors: string[]) => {
									handleFormChange(item, resolveFormColorPickerChangeValue(colors));
									resetItemPopup(item, false);
								}
							"
							@change="(colors: string[]) => handleFormChange(item, resolveFormColorPickerChangeValue(colors))"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showPicker">
						<div v-if="deriveItem(item).pickerIsMultiple" :class="formState.multiRootClass">
							<div :class="formState.fieldHeaderClass">
								<div :class="formState.fieldTitleClass">
									<span v-if="item.required" :class="formState.requiredClass">*</span>
									{{ item.label }}
								</div>
							</div>
							<div
								role="button"
								tabindex="0"
								:class="formState.multiControlClass"
								@click="setItemPopup(item, true)"
								@keydown="(event) => handleOpenPopupKeydown(event, item)"
							>
								<div :class="formState.multiTagsClass">
									<Tag
										v-for="(selectedItem, index) in resolveFormPickerTagItems(item.value as FormPickerValue)"
										:key="selectedItem.key"
										:text="selectedItem.label"
										size="sm"
										fill="light"
										closable
										@close="removePickerSelected(item, index)"
									/>
									<span
										v-if="!resolveFormHasTags(resolveFormPickerTagItems(item.value as FormPickerValue))"
										:class="formState.placeholderClass"
										>{{ deriveItem(item).placeholder }}</span
									>
								</div>
								<button
									v-if="resolveFormHasTags(resolveFormPickerTagItems(item.value as FormPickerValue))"
									type="button"
									:class="formState.clearButtonClass"
									aria-label="clear"
									@click.stop="clearFieldValue(item, true)"
								>
									<SvgIcon :svg="formClearSvg" width="16" height="16" :class-name="formState.clearIconClass" />
								</button>
								<SvgIcon :svg="selectArrowRightSvg" width="24" height="24" :class-name="formState.selectIconClass" />
							</div>
						</div>
						<Input
							v-else
							v-bind="deriveItem(item).inputProps"
							:title="item.label"
							select
							:value="deriveItem(item).pickerDisplayValue"
							clear
							:required="item.required"
							@focus="setItemPopup(item, true)"
							@clear="clearFieldValue(item)"
						/>
						<Picker
							v-bind="deriveItem(item).pickerProps"
							v-model:visible="item.showPopup"
							:datas="deriveItem(item).pickerDatas"
							:multiple-selected="resolveFormPickerSelected(item.value as FormPickerValue) as PickerMultipleItem[]"
							@multiple-change="
								(selected: PickerMultipleItem[]) =>
									handleFormChange(item, resolveFormPickerMultipleChangeValue(item.value as FormPickerValue, selected))
							"
							@confirm="
								(items: Record<string, string>[], indexs: number[]) =>
									handleFormChange(item, resolveFormPickerConfirmValue(item.value as FormPickerValue, items, indexs))
							"
							@close="resetItemPopup(item, false)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showCheckbox" :class="formState.groupClass">
						<div :class="formState.fieldHeaderClass">
							<div :class="formState.fieldTitleClass">
								<span v-if="item.required" :class="formState.requiredClass">*</span>
								{{ item.label }}
							</div>
						</div>
						<Checkbox
							v-bind="deriveItem(item).checkboxProps"
							:checkeds="item.value as string[]"
							@change="(checkeds: string[]) => handleFormChange(item, checkeds)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showRadio" :class="formState.groupClass">
						<div :class="formState.fieldHeaderClass">
							<div :class="formState.fieldTitleClass">
								<span v-if="item.required" :class="formState.requiredClass">*</span>
								{{ item.label }}
							</div>
						</div>
						<Radio
							v-bind="deriveItem(item).radioProps"
							:value="item.value as string"
							@change="(value: string) => handleFormChange(item, value)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showSlider" :class="formState.groupClass">
						<div :class="formState.fieldHeaderClass">
							<div :class="formState.fieldTitleClass">
								<span v-if="item.required" :class="formState.requiredClass">*</span>
								{{ item.label }}
							</div>
						</div>
						<div :class="formState.sliderWrapperClass">
							<Slider
								v-bind="deriveItem(item).sliderProps"
								@change="
									(value: number, valueRange?: [number, number]) =>
										handleFormChange(
											item,
											resolveFormSliderChangeValue({
												isRange: deriveItem(item).sliderIsRange,
												value,
												valueRange
											})
										)
								"
							/>
						</div>
					</div>

					<div v-else-if="deriveItemRenderState(item).showSwitch" :class="formState.groupClass">
						<div :class="formState.fieldHeaderClass">
							<div :class="formState.fieldTitleClass">
								<span v-if="item.required" :class="formState.requiredClass">*</span>
								{{ item.label }}
							</div>
						</div>
						<Switch
							v-bind="deriveItem(item).switchProps"
							:active="item.value as boolean"
							@change="(value: boolean) => handleFormChange(item, value)"
						/>
					</div>

					<div v-else-if="deriveItemRenderState(item).showStepper" :class="formState.groupClass">
						<div :class="formState.fieldHeaderClass">
							<div :class="formState.fieldTitleClass">
								<span v-if="item.required" :class="formState.requiredClass">*</span>
								{{ item.label }}
							</div>
						</div>
						<Stepper
							v-bind="deriveItem(item).stepperProps"
							:value="item.value as number"
							@change="(value: number) => handleFormChange(item, value)"
						/>
					</div>
				</template>
			</div>
		</component>

		<slot name="submit">
			<Button v-if="formState.submitText" v-bind="submitButton" @click="submitFunc">
				{{ formState.submitText }}
			</Button>
		</slot>
		<slot name="reset">
			<Button v-if="resetText" fill="lineState" type="button" v-bind="resetButton" @click="resetFunc">
				{{ resetText }}
			</Button>
		</slot>
	</div>
</template>
