<script lang="ts">
	import { getContext } from 'svelte';
	import Input from '../input/Input.svelte';
	import TimePicker from '../timePicker/TimePicker.svelte';
	import ActionSheet from '../actionSheet/ActionSheet.svelte';
	import Calendar from '../calendar/Calendar.svelte';
	import NumKeyboard from '../numKeyboard/NumKeyboard.svelte';
	import FullKeyboard from '../fullKeyboard/FullKeyboard.svelte';
	import Picker from '../picker/Picker.svelte';
	import Checkbox from '../checkbox/Checkbox.svelte';
	import Radio from '../radio/Radio.svelte';
	import Slider from '../slider/Slider.svelte';
	import Switch from '../switch/Switch.svelte';
	import Stepper from '../stepper/Stepper.svelte';
	import ColorPicker from '../colorPicker/ColorPicker.svelte';
	import Tag from '../tag/Tag.svelte';
	import Button from '../button/Button.svelte';
	import Card from '../card/Card.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type {
		FormProps,
		FormValueProps,
		FormTimePickerValue,
		FormCalendarValue,
		FormActionSheetValue,
		FormPickerValue,
		FormSliderValue,
		FormColorPickerValue
	} from '../../types/index.js';
	import {
		formatFormColorPickerValue,
		resolveFormActionSheetChangeValue,
		resolveFormActionSheetInputValue,
		resolveFormCalendarChangeValue,
		resolveFormCalendarDates,
		resolveFormCalendarKey,
		resolveFormCalendarTagItems,
		resolveFormCalendarValueAfterRemove,
		resolveFormChangeAction,
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
		resolveFormRuntimeItemResetPatch,
		resolveFormRuntimeItem,
		resolveFormStateOptions,
		resolveFormTimePickerChangeValue,
		resolveFormTimePickerInputValue
	} from '@any-tdf/common/derived/form';
	import { formClearSvg, selectArrowRightSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const formLang: LangProps['form'] = currentLang.form;
	const inputLang: LangProps['input'] = currentLang.input;

	let {
		form,
		onchange,
		submitText = undefined,
		resetText = null,
		onsubmit,
		submitButton,
		resetButton,
		onreset,
		submitChildren,
		resetChildren,
		card,
		space = '0'
	}: FormProps = $props();

	// 公共 Form 派生处理初始值、包装模式和展示值，状态写入仍留在组件内。
	// Shared Form derivations resolve initial values, wrapper mode and display values; state writes stay here.
	const formState = $derived(resolveFormDerived(resolveFormStateOptions({
		defaultSubmit: formLang.submit,
		props: { card, form, space, submitText }
	})));
	type FormRuntimeItem = (typeof form)[number] & { showPopup: boolean; data: unknown; value: FormValueProps };
	const createFormRuntimeItems = () => formState.runtimeItems.map((item) => ({ ...item })) as FormRuntimeItem[];
	let formInner = $state<FormRuntimeItem[]>(createFormRuntimeItems());
	$effect(() => {
		formInner = createFormRuntimeItems();
	});
	let model = $state<Record<string, FormValueProps>>({});
	// 统一的 onchange 处理函数 / unified onchange handler
	const handleFormChange = (currentItem: (typeof formInner)[0], currentValue: unknown) => {
		// 公共 action 同时返回字段列表和 model，组件层只负责把结果写回响应式状态。
		// Shared action returns both field items and model; the component layer only applies them to reactive state.
		const action = resolveFormChangeAction({ items: formInner, model, name: currentItem.name, value: currentValue as FormValueProps });
		const nextItem = action.nextItems.find((item) => item.name === currentItem.name);
		if (nextItem) Object.assign(currentItem, nextItem);
		model = action.nextModel as Record<string, FormValueProps>;
		onchange?.(model);
	};
	const setItemPopup = (item: (typeof formInner)[0], showPopup: boolean) => {
		// 公共 action 计算字段弹层状态，组件层只把匹配字段 patch 回响应式对象。
		// Shared action calculates field popup state; the component layer only patches the matching reactive item.
		const action = resolveFormPopupAction({ items: formInner, name: item.name, showPopup });
		const nextItem = action.nextItems.find((next) => next.name === item.name);
		if (nextItem) Object.assign(item, nextItem);
	};
	const submitFunc = () => {
		onsubmit?.(model as Record<string, FormValueProps>);
	};
	const resetFunc = () => {
		// 逐个重置每个表单项，避免完全重新赋值导致的页面滚动 / reset each form item to avoid page scroll caused by full reassignment
		const resetState = resolveFormResetState(formInner);
		formInner.forEach((item, index) => {
			const resetItem = resetState.items[index] || resolveFormRuntimeItem(item);
			Object.assign(item, resolveFormRuntimeItemResetPatch(item, resetItem as typeof item));
		});
		// 更新 model 对象 / update model object
		model = resetState.model as Record<string, FormValueProps>;
		onchange?.(model);
		onreset?.();
	};

	const handleOpenPopupKeydown = (e: KeyboardEvent, item: (typeof formInner)[0]) => {
		// 公共 action 只判断按键是否应打开弹层，状态写入留在组件层。
		// Shared action only decides whether the key should open a popup; state writes stay in the component layer.
		const action = resolveFormOpenPopupKeyboardAction({ key: e.key });
		if (action.shouldOpen) setItemPopup(item, true);
	};

	const clearItemValue = (item: (typeof formInner)[0], pickerMultiple = false) => {
		// 公共 action 负责计算字段清空值，组件层只写状态和派发变更。
		// Shared action calculates field clear values; the component layer only writes state and emits changes.
		const nextValue = resolveFormFieldClearValue({ type: item.type, pickerMultiple }) as FormValueProps;
		item.value = nextValue;
		handleFormChange(item, nextValue);
	};
</script>

{#snippet formContent()}
	<div class={formState.spaceClass}>
		{#each formInner as item (item.name)}
			{@const itemView = resolveFormItemViewDerived(resolveFormItemViewStateOptions({ item, pleaseSelect: inputLang.pleaseSelect }))}
			{#if itemView.renderState.showInput}
				<Input
					title={item.label}
					bind:value={item.value as string}
					clear
					required={item.required}
					onclear={() => {
						clearItemValue(item);
						}}
						onchange={() => handleFormChange(item, item.value)}
						{...itemView.inputProps}
					/>
				{:else if itemView.renderState.showTimePicker}
					<Input
					title={item.label}
					select
					value={resolveFormTimePickerInputValue(item.value as FormTimePickerValue)}
					clear
					required={item.required}
					onfocus={() => {
						setItemPopup(item, true);
					}}
					onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
					<TimePicker
						bind:visible={item.showPopup}
					onconfirm={(timeStr, timeObj) => {
						item.value = resolveFormTimePickerChangeValue(timeStr, timeObj);
							handleFormChange(item, item.value);
						}}
						{...itemView.timePickerProps}
					/>
				{:else if itemView.renderState.showActionSheet}
					<Input
					title={item.label}
					select
					value={resolveFormActionSheetInputValue(item.value as FormActionSheetValue)}
					clear
					required={item.required}
					onfocus={() => {
						setItemPopup(item, true);
					}}
					onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
					<ActionSheet
						bind:visible={item.showPopup}
					onclickAction={(index: number, action) => {
							item.value = resolveFormActionSheetChangeValue(index, action);
							handleFormChange(item, item.value);
						}}
						{...itemView.actionSheetProps}
					/>
			{:else if itemView.renderState.showCalendar}
				{@const calendarDates = resolveFormCalendarDates(item.value as FormCalendarValue)}
				{@const calendarTagItems = resolveFormCalendarTagItems(item.value as FormCalendarValue)}
				{@const isCalendarMultiple = itemView.calendarIsMultiple}
				{#if isCalendarMultiple}
					<!-- 多选模式：使用自定义展示容器 -->
					<div class={formState.multiRootClass}>
						<div class={formState.fieldHeaderClass}>
							<div class={formState.fieldTitleClass}>
								{#if item.required}
									<span class={formState.requiredClass}>*</span>
								{/if}
								{item.label}
							</div>
						</div>
						<div
							role="button"
							tabindex="0"
							class={formState.multiControlClass}
							onclick={() => {
								setItemPopup(item, true);
							}}
							onkeydown={(e) => handleOpenPopupKeydown(e, item)}
							>
								<div class={formState.multiTagsClass}>
									{#if resolveFormHasTags(calendarTagItems)}
										{#each calendarTagItems as dateItem, index (dateItem.key)}
											<Tag
												text={dateItem.label}
												size="sm"
												fill="light"
												closable
											onclose={() => {
												item.value = resolveFormCalendarValueAfterRemove(item.value as FormCalendarValue, index);
												handleFormChange(item, item.value);
											}}
										/>
									{/each}
								{:else}
									<span class={formState.placeholderClass}>{itemView.placeholder}</span>
								{/if}
							</div>
							{#if resolveFormHasTags(calendarTagItems)}
								<button
									type="button"
									class={formState.clearButtonClass}
									aria-label="clear"
									onclick={(e) => {
										e.stopPropagation();
										clearItemValue(item);
									}}
								>
									<!-- 公共 Form 图标 SVG 数据在 common 中维护。 / Shared Form SVG data lives in common. -->
									<SvgIcon svg={formClearSvg} width="16" height="16" class={formState.clearIconClass} />
								</button>
							{/if}
							<SvgIcon svg={selectArrowRightSvg} width="24" height="24" class={formState.selectIconClass} />
						</div>
					</div>
				{:else}
					<!-- 单选/范围模式：使用 Input 组件 -->
					<Input
						title={item.label}
						select
						value={itemView.calendarDisplayValue}
						clear
						required={item.required}
						onfocus={() => {
							setItemPopup(item, true);
						}}
						onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
				{/if}
				{#key resolveFormCalendarKey({ isMultiple: itemView.calendarIsMultiple, value: item.value as FormCalendarValue, fallback: item.name })}
					<Calendar
						bind:visible={item.showPopup}
						{...itemView.calendarProps}
						initSelectedDates={calendarDates}
						onconfirm={(dates) => {
							item.value = resolveFormCalendarChangeValue(dates);
							handleFormChange(item, item.value);
						}}
						clear={false}
					/>
				{/key}
			{:else if itemView.renderState.showNumKeyboard}
				<Input
					title={item.label}
					select
					bind:value={item.value as string}
					clear
					required={item.required}
					onfocus={() => {
						setItemPopup(item, true);
					}}
					onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
				<NumKeyboard
					bind:visible={item.showPopup}
					onclick={(key) => {
						// 公共动作函数只返回字段值和关闭决策，状态写入仍留在组件内。
						// Shared action function only returns field value and close decisions; state writes stay inside the component.
						const action = resolveFormKeyboardClickAction({ value: item.value as string, key });
						if (action.shouldClose) {
							setItemPopup(item, false);
						}
						if (action.shouldUpdateValue) {
							item.value = action.nextValue;
						}
							handleFormChange(item, item.value);
						}}
						{...itemView.numKeyboardProps}
					/>
			{:else if itemView.renderState.showFullKeyboard}
				<Input
					title={item.label}
					select
					bind:value={item.value as string}
					clear
					required={item.required}
					onfocus={() => {
						setItemPopup(item, true);
					}}
					onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
				<FullKeyboard
					bind:visible={item.showPopup}
					bind:value={item.value as string}
					onclick={() => {
						handleFormChange(item, item.value);
					}}
					onclose={() => {
							handleFormChange(item, item.value);
						}}
						{...itemView.fullKeyboardProps}
					/>
			{:else if itemView.renderState.showColorPicker}
				<Input
					title={item.label}
					select
					value={formatFormColorPickerValue(item.value as FormColorPickerValue)}
					clear
					required={item.required}
					onfocus={() => {
						setItemPopup(item, true);
					}}
					onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
				<ColorPicker
					bind:visible={item.showPopup}
					bind:value={item.value as FormColorPickerValue}
					onchange={() => {
						handleFormChange(item, item.value);
					}}
					onclose={() => {
							handleFormChange(item, item.value);
						}}
						{...itemView.colorPickerProps}
					/>
			{:else if itemView.renderState.showPicker}
				{@const pickerValue = item.value as FormPickerValue}
				{@const pickerMultipleSelected = resolveFormPickerSelected(pickerValue)}
				{@const pickerTagItems = resolveFormPickerTagItems(pickerValue)}
				{@const isMultiple = itemView.pickerIsMultiple}
				{#if isMultiple}
					<!-- 多选模式：使用自定义展示容器 -->
					<div class={formState.multiRootClass}>
						<div class={formState.fieldHeaderClass}>
							<div class={formState.fieldTitleClass}>
								{#if item.required}
									<span class={formState.requiredClass}>*</span>
								{/if}
								{item.label}
							</div>
						</div>
						<div
							role="button"
							tabindex="0"
							class={formState.multiControlClass}
							onclick={() => {
								setItemPopup(item, true);
							}}
							onkeydown={(e) => handleOpenPopupKeydown(e, item)}
							>
								<div class={formState.multiTagsClass}>
									{#if resolveFormHasTags(pickerTagItems)}
										{#each pickerTagItems as selectedItem, index (selectedItem.key)}
											<Tag
												text={selectedItem.label}
											size="sm"
											fill="light"
											closable
											onclose={() => {
												item.value = resolveFormPickerValueAfterRemove(item.value as FormPickerValue, index);
												handleFormChange(item, item.value);
											}}
										/>
									{/each}
								{:else}
									<span class={formState.placeholderClass}>{itemView.placeholder}</span>
								{/if}
							</div>
							{#if resolveFormHasTags(pickerTagItems)}
								<button
									type="button"
									class={formState.clearButtonClass}
									aria-label="clear"
									onclick={(e) => {
										e.stopPropagation();
										clearItemValue(item, true);
									}}
								>
									<SvgIcon svg={formClearSvg} width="16" height="16" class={formState.clearIconClass} />
								</button>
							{/if}
							<SvgIcon svg={selectArrowRightSvg} width="24" height="24" class={formState.selectIconClass} />
						</div>
					</div>
				{:else}
					<!-- 单选模式：使用 Input 组件 -->
					<Input
						title={item.label}
						select
						value={itemView.pickerDisplayValue}
						clear
						required={item.required}
						onfocus={() => {
							setItemPopup(item, true);
						}}
						onclear={() => {
							clearItemValue(item);
						}}
						{...itemView.inputProps}
					/>
				{/if}
				<Picker
						bind:visible={item.showPopup}
						{...itemView.pickerProps}
						datas={itemView.pickerDatas}
						multipleSelected={pickerMultipleSelected}
					onmultiplechange={(selected) => {
						item.value = resolveFormPickerMultipleChangeValue(pickerValue, selected);
						handleFormChange(item, item.value);
					}}
					onconfirm={(items, indexs) => {
						item.value = resolveFormPickerConfirmValue(pickerValue, items, indexs);
						handleFormChange(item, item.value);
					}}
					onclose={() => {
						setItemPopup(item, false);
					}}
				/>
			{:else if itemView.renderState.showCheckbox}
				<div class={formState.groupClass}>
					<div class={formState.fieldHeaderClass}>
						<div class={formState.fieldTitleClass}>
							{#if item.required}
								<span class={formState.requiredClass}>*</span>
							{/if}
							{item.label}
						</div>
						<div class={formState.fieldMetaClass}></div>
					</div>
						<Checkbox
							{...itemView.checkboxProps}
							bind:checkeds={item.value as string[]}
							onchange={(checkeds: string[]) => handleFormChange(item, checkeds)}
						/>
				</div>
			{:else if itemView.renderState.showRadio}
				<div class={formState.groupClass}>
					<div class={formState.fieldHeaderClass}>
						<div class={formState.fieldTitleClass}>
							{#if item.required}
								<span class={formState.requiredClass}>*</span>
							{/if}
							{item.label}
						</div>
						<div class={formState.fieldMetaClass}></div>
					</div>
						<Radio
							{...itemView.radioProps}
							bind:value={item.value as string}
							onchange={(value: string) => handleFormChange(item, value)}
						/>
				</div>
			{:else if itemView.renderState.showSlider}
				<div class={formState.groupClass}>
					<div class={formState.fieldHeaderClass}>
						<div class={formState.fieldTitleClass}>
							{#if item.required}
								<span class={formState.requiredClass}>*</span>
							{/if}
							{item.label}
						</div>
						<div class={formState.fieldMetaClass}></div>
					</div>
					<div class={formState.sliderWrapperClass}>
							<Slider
								{...itemView.sliderProps}
								onchange={(value, valueRange) => {
									if (itemView.sliderIsRange) {
										if (valueRange) {
											(item.value as FormSliderValue).valueRange = valueRange;
										handleFormChange(item, { valueRange });
									}
								} else {
									(item.value as FormSliderValue).value = value;
									handleFormChange(item, { value });
								}
							}}
						/>
					</div>
				</div>
			{:else if itemView.renderState.showSwitch}
				<div class={formState.groupClass}>
					<div class={formState.fieldHeaderClass}>
						<div class={formState.fieldTitleClass}>
							{#if item.required}
								<span class={formState.requiredClass}>*</span>
							{/if}
							{item.label}
						</div>
						<div class={formState.fieldMetaClass}></div>
					</div>
						<Switch {...itemView.switchProps} bind:active={item.value as boolean} onchange={(value: boolean) => handleFormChange(item, value)} />
				</div>
			{:else if itemView.renderState.showStepper}
				<div class={formState.groupClass}>
					<div class={formState.fieldHeaderClass}>
						<div class={formState.fieldTitleClass}>
							{#if item.required}
								<span class={formState.requiredClass}>*</span>
							{/if}
							{item.label}
						</div>
						<div class={formState.fieldMetaClass}></div>
					</div>
						<Stepper {...itemView.stepperProps} bind:value={item.value as number} onchange={(value: number) => handleFormChange(item, value)} />
				</div>
			{:else}{/if}
		{/each}
	</div>
{/snippet}

{#if formState.cardWrapper.kind === 'card'}
	<Card {...formState.cardWrapper.cardProps}>
		{@render formContent()}
	</Card>
{:else if formState.cardWrapper.kind === 'legacy'}
	<div class={formState.cardWrapperClass}>
		{@render formContent()}
	</div>
{:else}
	{@render formContent()}
{/if}
{#if submitChildren}
	{@render submitChildren?.()}
{:else if formState.submitText}
	<Button onclick={submitFunc} {...submitButton}>{formState.submitText}</Button>
{:else}{/if}
{#if resetChildren}
	{@render resetChildren?.()}
{:else if resetText}
	<Button fill="lineState" type="button" onclick={resetFunc} {...resetButton}>{resetText}</Button>
{:else}{/if}
