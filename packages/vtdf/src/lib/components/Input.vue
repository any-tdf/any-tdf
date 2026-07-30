<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import type { InputProps } from '../types';
import {
	resolveInputBlurStateAction,
	resolveInputClearAction,
	resolveInputCompositionAction,
	resolveInputInitialValue,
	resolveInputCustomContentKeyboardAction,
	resolveInputDerived,
	resolveInputFocusAction,
	resolveInputFocusStateAction,
	resolveInputStateOptions,
	resolveInputTextareaHeightStyle,
	resolveInputValueChangeAction
} from '@any-tdf/common/derived/input';
import { formClearSvg, selectArrowRightSvg } from '@any-tdf/common/svg/common';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<InputProps>(), {
	title: '',
	titlePosition: 'out',
	inputPosition: 'left',
	placeholder: '',
	radius: '',
	label1: null,
	label2: null,
	label3: null,
	label4: null,
	label5: null,
	label6: null,
	tip: null,
	data1: null,
	data2: null,
	data3: null,
	value: '',
	clear: false,
	inputStyle: 'block',
	lineTransition: null,
	duration: 'base',
	autocomplete: true,
	py: '2',
	disabled: false,
	state: 'theme',
	type: 'text',
	inputmode: '',
	readonly: false,
	select: false,
	required: false,
	maxlength: 24,
	textareaMaxlength: 200,
	rows: 2,
	autosize: false,
	negative: false
});

const emit = defineEmits<{
	'update:value': [value: string];
	change: [value: string];
	focus: [value: string];
	blur: [value: string];
	clear: [];
	keydown: [key: string];
	clickLabel: [index: number];
}>();

const slots = useSlots();
const innerValue = ref(resolveInputInitialValue(props.value));
const focus = ref(false);
const composing = ref(false);
const textareaDom = ref<HTMLTextAreaElement | null>(null);
const inputDom = ref<HTMLInputElement | null>(null);
const config = useConfig();
const inputLang = computed(() => config.locale?.input || zh_CN.input);

// 消费框架无关派生结果，组件层只负责事件、绑定和 DOM 读取。
// Consume framework-agnostic derived results while the component layer keeps events, bindings and DOM reads.
const inputViewState = computed(() =>
	resolveInputDerived(
		resolveInputStateOptions({
			props: {
				autocomplete: props.autocomplete,
				clear: props.clear,
				disabled: props.disabled,
				duration: props.duration,
				inputPosition: props.inputPosition,
				inputState: props.state,
				inputStyle: props.inputStyle,
				inputmode: props.inputmode,
				lineTransition: props.lineTransition,
				placeholder: props.placeholder,
				py: props.py,
				radius: props.radius,
				readonly: props.readonly,
				rows: props.rows,
				select: props.select,
				title: props.title,
				titlePosition: props.titlePosition,
				type: props.type
			},
			focus: focus.value,
			hasInputChild: Boolean(slots.input),
			hasTip: props.tip !== null,
			pleaseSelect: inputLang.value.pleaseSelect,
			pleaseInput: inputLang.value.pleaseInput,
			value: innerValue.value
		})
	)
);

watch(
	() => props.value,
	(value) => {
		innerValue.value = resolveInputInitialValue(value);
	}
);

const commitValue = (value: string) => {
	innerValue.value = value;
	emit('update:value', value);
	emit('change', value);
};

const onFocus = () => {
	const action = resolveInputFocusStateAction({ value: innerValue.value });
	focus.value = action.nextFocus;
	if (action.shouldEmitFocus) emit('focus', action.value);
};

const onBlur = () => {
	const action = resolveInputBlurStateAction({ value: innerValue.value });
	focus.value = action.nextFocus;
	if (action.shouldEmitBlur) emit('blur', action.value);
};

const valueChangeFun = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
	// 公共 action 只返回输入提交动作，DOM 高度和事件派发留在组件内。
	// Shared action only returns input commit action; DOM height and events stay in the component.
	const action = resolveInputValueChangeAction({
		rawValue: target.value,
		value: target.value,
		type: props.type,
		maxlength: props.maxlength,
		textareaMaxlength: props.textareaMaxlength,
		negative: props.negative,
		autosize: props.autosize,
		composing: composing.value
	});
	if (!action.shouldCommit) return;
	if (target.value !== action.nextValue) {
		target.value = action.nextValue;
	}
	if (action.shouldResizeTextarea && textareaDom.value) {
		textareaDom.value.style.height = 'auto';
		textareaDom.value.style.height = resolveInputTextareaHeightStyle({
			scrollHeight: textareaDom.value.scrollHeight
		});
	}
	commitValue(action.nextValue);
};

const clearFun = (event?: Event) => {
	event?.preventDefault();
	event?.stopPropagation();
	const action = resolveInputClearAction();
	commitValue(action.nextValue);
	if (action.shouldClear) emit('clear');
};

const compositionstartFun = () => {
	const action = resolveInputCompositionAction({ phase: 'start' });
	composing.value = action.nextComposing;
};

const compositionendFun = (event: Event) => {
	const action = resolveInputCompositionAction({ phase: 'end' });
	composing.value = action.nextComposing;
	if (action.shouldCommit) valueChangeFun(event);
};

const keydownFunc = (event: KeyboardEvent) => {
	emit('keydown', event.key);
};

const clickLabel = (index: number) => {
	emit('clickLabel', index);
};

const focusInput = () => {
	// 公共 action 只返回是否允许聚焦，DOM focus 留在组件层。
	// Shared action only returns whether focus is allowed; DOM focus stays in the component layer.
	const action = resolveInputFocusAction({ disabled: props.disabled });
	if (!action.shouldFocus) return;
	if (props.type === 'textarea') {
		textareaDom.value?.focus();
		return;
	}
	inputDom.value?.focus();
};

const handleCustomContentKeydown = (event: KeyboardEvent) => {
	// 公共 action 只判断激活键，事件对象和 DOM 聚焦留在组件层。
	// Shared action only identifies activation keys; event objects and DOM focus stay in the component layer.
	const action = resolveInputCustomContentKeyboardAction({
		key: event.key,
		disabled: props.disabled
	});
	if (!action.isActivationKey) return;
	event.preventDefault();
	if (action.shouldFocus) focusInput();
};
</script>

<template>
	<div :class="inputViewState.outerClass">
		<label>
			<div :class="inputViewState.titleRowClass">
				<template v-if="titlePosition === 'out'">
					<slot v-if="$slots.title" name="title" />
					<div v-else-if="title !== ''" :class="inputViewState.titleClass">
						<span v-if="required" :class="inputViewState.requiredClass">*</span>
						{{ title }}
					</div>
				</template>
				<div :class="inputViewState.edgeContentClass">
					<slot v-if="$slots.data1" name="data1" />
					<template v-else-if="data1 !== null">{{ data1 }}</template>
					<slot v-if="$slots.data2" name="data2" />
					<template v-else-if="data2 !== null">{{ data2 }}</template>
				</div>
			</div>

			<div :class="inputViewState.wrapperClass">
				<slot v-if="$slots.label1" name="label1" />
				<button v-else-if="label1 !== null" type="button" @click="clickLabel(1)">
					<Icon v-bind="label1" />
				</button>

				<slot v-if="$slots.label2" name="label2" />
				<button v-else-if="label2 !== null" type="button" @click="clickLabel(2)">
					{{ label2 }}
				</button>

				<slot v-if="$slots.label3" name="label3" />
				<button v-else-if="label3 !== null" type="button" @click="clickLabel(3)">
					<Icon v-bind="label3" />
				</button>

				<div :class="inputViewState.contentColumnClass">
					<div v-if="titlePosition === 'in'" :class="inputViewState.inlineTitleClass">
						<span v-if="required" :class="inputViewState.inlineRequiredClass">*</span>
						{{ title }}
					</div>
					<div :class="inputViewState.controlRowClass">
						<div :class="inputViewState.controlSlotClass">
							<div v-if="$slots.input" :class="inputViewState.customWrapperClass">
								<textarea
									v-if="type === 'textarea'"
									ref="textareaDom"
									:value="innerValue"
									:rows="rows"
									:inputmode="inputViewState.mode"
									:placeholder="inputViewState.placeholderText"
									:class="inputViewState.hiddenControlClass"
									:autocomplete="inputViewState.autocompleteValue"
									:disabled="disabled"
									readonly
									tabindex="-1"
									@focus="onFocus"
									@blur="onBlur"
									@keydown="keydownFunc"
								/>
								<input
									v-else
									ref="inputDom"
									:value="innerValue"
									:type="inputViewState.nativeInputType"
									:inputmode="inputViewState.mode"
									:placeholder="inputViewState.placeholderText"
									:class="inputViewState.hiddenControlClass"
									:autocomplete="inputViewState.autocompleteValue"
									:disabled="disabled"
									readonly
									tabindex="-1"
									@focus="onFocus"
									@blur="onBlur"
									@keydown="keydownFunc"
								/>
								<div
									:class="inputViewState.customContentClass"
									:style="inputViewState.customContentStyleValue"
									role="textbox"
									:tabindex="inputViewState.focusableTabIndex"
									@click="focusInput"
									@focus="focusInput"
									@keydown="handleCustomContentKeydown"
								>
									<slot name="input" />
								</div>
							</div>
							<textarea
								v-else-if="type === 'textarea'"
								ref="textareaDom"
								:value="innerValue"
								:rows="rows"
								:inputmode="inputViewState.mode"
								:placeholder="inputViewState.placeholderText"
								:class="inputViewState.controlClass"
								:autocomplete="inputViewState.autocompleteValue"
								:disabled="disabled"
								:readonly="inputViewState.nativeReadonly"
								@focus="onFocus"
								@blur="onBlur"
								@input="valueChangeFun"
								@compositionstart="compositionstartFun"
								@compositionend="compositionendFun"
								@keydown="keydownFunc"
							/>
							<input
								v-else
								ref="inputDom"
								:value="innerValue"
								:type="inputViewState.nativeInputType"
								:inputmode="inputViewState.mode"
								:placeholder="inputViewState.placeholderText"
								:class="inputViewState.controlClass"
								:autocomplete="inputViewState.autocompleteValue"
								:disabled="disabled"
								:readonly="inputViewState.nativeReadonly"
								@focus="onFocus"
								@blur="onBlur"
								@input="valueChangeFun"
								@compositionstart="compositionstartFun"
								@compositionend="compositionendFun"
								@keydown="keydownFunc"
							/>
						</div>

						<button v-if="inputViewState.displayState.showClearButton" type="button" aria-label="clear" @click="clearFun">
							<!-- 公共输入图标 SVG 数据在 common 中维护。 / Shared input SVG data lives in common. -->
							<SvgIcon :svg="formClearSvg" width="16" height="16" :class-name="inputViewState.clearIconClass" />
						</button>
					</div>
				</div>

				<slot v-if="$slots.label4" name="label4" />
				<button v-else-if="label4 !== null" type="button" @click="clickLabel(4)">
					<Icon v-bind="label4" />
				</button>

				<slot v-if="$slots.label5" name="label5" />
				<button v-else-if="label5 !== null" type="button" @click="clickLabel(5)">
					{{ label5 }}
				</button>

				<SvgIcon
					v-if="inputViewState.displayState.showSelectIcon"
					:svg="selectArrowRightSvg"
					width="24"
					height="24"
					:class-name="inputViewState.selectIconClass"
				/>

				<slot v-if="$slots.label6" name="label6" />
				<button v-else-if="label6 !== null" type="button" @click="clickLabel(6)">
					<Icon v-bind="label6" />
				</button>

				<div
					v-if="inputViewState.displayState.showLineTransition"
					:class="inputViewState.lineClass"
					:style="inputViewState.lineStyleString"
				/>
			</div>

			<div :class="inputViewState.tipRowClass">
				<slot v-if="$slots.tip" name="tip" />
				<div v-else-if="tip !== null" :class="inputViewState.tipTextClass">{{ tip }}</div>
				<slot v-if="$slots.data3" name="data3" />
				<div v-else-if="data3 !== null" :class="inputViewState.dataTextClass">{{ data3 }}</div>
			</div>
		</label>
	</div>
</template>
