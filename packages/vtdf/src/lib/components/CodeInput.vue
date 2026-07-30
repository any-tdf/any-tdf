<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
	normalizeCodeInputValue,
	resolveCodeInputAutoScrollTarget,
	resolveCodeInputBlurAction,
	resolveCodeInputDerived,
	resolveCodeInputFinishFlow,
	resolveCodeInputFocusAction,
	resolveCodeInputInitialFocused,
	resolveCodeInputInitialValue,
	resolveCodeInputInputAction,
	resolveCodeInputShouldAutoScroll,
	resolveCodeInputStateOptions
} from '@any-tdf/common/derived/codeInput';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import type { CodeInputProps } from '../types';

const props = withDefaults(defineProps<CodeInputProps & {}>(), {
	value: '',
	length: 6,
	mask: false,
	gutter: '2',
	focused: false,
	type: 'number',
	inputMode: '',
	native: false,
	info: '',
	errorInfo: '',
	radius: '',
	cellSize: 'md',
	cellStyle: 'box',
	cellBg: 'gray',
	cellBorder: 'solid',
	cursorStyle: 'line',
	cursorAnimation: 'blink',
	keyboardVisible: false,
	autoClose: false,
	autoScroll: true,
	bold: false,
	injClass: ''
});

const emit = defineEmits<{
	'update:value': [value: string];
	'update:focused': [focused: boolean];
	change: [value: string];
	finish: [value: string];
	close: [];
	focus: [];
	focusedChange: [focused: boolean];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const innerValue = ref(resolveCodeInputInitialValue(props.value));
const innerFocused = ref(resolveCodeInputInitialFocused(props.focused));
const lastFinishedValue = ref<string | null>(null);

// 公共派生负责输入清洗，组件层只处理事件和状态同步。
// Shared derived normalizes input; the component layer only handles events and state sync.
const value = computed(() =>
	normalizeCodeInputValue({
		value: innerValue.value,
		length: props.length,
		type: props.type,
		native: props.native
	})
);
// 消费框架无关派生结果，组件层只负责事件、绑定和 DOM 读取。
// Consume framework-agnostic derived results while the component layer keeps events, bindings and DOM reads.
const codeInputState = computed(() =>
	resolveCodeInputDerived(
		resolveCodeInputStateOptions({
			props: {
				bold: props.bold,
				cellBg: props.cellBg,
				cellBorder: props.cellBorder,
				cellSize: props.cellSize,
				cellStyle: props.cellStyle,
				cursorAnimation: props.cursorAnimation,
				cursorStyle: props.cursorStyle,
				errorInfo: props.errorInfo,
				gutter: props.gutter,
				info: props.info,
				inputMode: props.inputMode,
				injClass: props.injClass,
				length: props.length,
				mask: props.mask,
				native: props.native,
				radius: props.radius,
				type: props.type
			},
			focused: innerFocused.value,
			keyboardVisible: props.keyboardVisible,
			value: value.value
		})
	)
);

const emitChange = (nextValue: string) => {
	emit('change', nextValue);
	emit('update:value', nextValue);
};

const emitFinish = (nextValue: string) => {
	emit('finish', nextValue);
};

const emitClose = () => {
	emit('close');
};

const emitFocus = () => {
	emit('focus');
};

const updateFocused = (nextFocused: boolean) => {
	innerFocused.value = nextFocused;
	emit('update:focused', nextFocused);
	emit('focusedChange', nextFocused);
};

const handleClick = () => {
	// 公共 focus action 只返回聚焦状态和原生输入聚焦决策，DOM focus 留在组件层。
	// Shared focus action only returns focus state and native-input focus decisions; DOM focus stays in the component layer.
	const action = resolveCodeInputFocusAction({ native: props.native });
	updateFocused(action.nextFocused);
	if (action.shouldFocusNative) {
		inputRef.value?.focus();
	}
	if (action.shouldEmitFocus) emitFocus();
};

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	// 公共 input action 负责清洗原始输入，组件层只同步状态和事件。
	// Shared input action normalizes raw input; the component layer only syncs state and events.
	const action = resolveCodeInputInputAction({
		rawValue: target.value,
		length: props.length,
		type: props.type
	});
	innerValue.value = action.nextValue;
	if (action.shouldEmitChange) emitChange(action.nextValue);
};

const handleBlur = () => {
	const action = resolveCodeInputBlurAction();
	updateFocused(action.nextFocused);
};

watch(
	() => props.value,
	(nextValue) => {
		innerValue.value = normalizeCodeInputValue({
			value: resolveCodeInputInitialValue(nextValue),
			length: props.length,
			type: props.type,
			native: props.native
		});
	}
);

watch(
	() => props.focused,
	(nextFocused) => {
		innerFocused.value = resolveCodeInputInitialFocused(nextFocused);
	}
);

watch(value, (nextValue) => {
	// 公共 finish flow 只返回完成和关闭意图，事件派发和状态赋值留在组件层。
	// Shared finish flow only returns finish and close intent; event dispatch and state assignment stay in the component layer.
	const flow = resolveCodeInputFinishFlow({
		value: nextValue,
		length: props.length,
		lastFinishedValue: lastFinishedValue.value,
		autoClose: props.autoClose
	});
	lastFinishedValue.value = flow.nextLastFinishedValue;
	if (!flow.shouldFinish) return;
	emitFinish(flow.finishedValue);
	if (flow.shouldClose) {
		if (flow.shouldEmitClose) emitClose();
		updateFocused(flow.nextFocused);
	}
});

watch(
	() => [props.autoScroll, props.keyboardVisible] as const,
	([autoScroll, keyboardVisible], _previous, onCleanup) => {
		if (
			!resolveCodeInputShouldAutoScroll({
				autoScroll,
				keyboardVisible,
				hasContainer: Boolean(containerRef.value)
			})
		)
			return;
		const timer = setTimeout(() => {
			const rect = containerRef.value?.getBoundingClientRect();
			if (!rect) return;
			const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
			const targetTop = resolveCodeInputAutoScrollTarget({
				rectBottom: rect.bottom,
				viewportHeight,
				autoScroll,
				scrollY: window.scrollY
			});
			// 组件层只执行 DOM 滚动，滚动目标由 common 纯计算得出。
			// The component layer only performs DOM scrolling; common returns the pure target value.
			if (targetTop !== null) {
				window.scrollTo({ top: targetTop, behavior: 'smooth' });
			}
		}, 300);
		onCleanup(() => clearTimeout(timer));
	}
);
</script>

<template>
	<div ref="containerRef" :class="codeInputState.rootClass">
		<input
			v-if="native"
			ref="inputRef"
			:value="value"
			type="text"
			:inputmode="codeInputState.nativeInputMode"
			:maxlength="length"
			autocomplete="one-time-code"
			:class="codeInputState.nativeInputClass"
			@input="handleInput"
			@blur="handleBlur"
		/>
		<button type="button" :class="codeInputState.buttonClass" aria-label="code input" @click="handleClick">
			<template v-for="cellDisplayState in codeInputState.cellDisplayStates" :key="cellDisplayState.index">
				<div v-if="codeInputState.cellStyle === 'line'" :class="cellDisplayState.cellClass">
					<template v-if="cellDisplayState.kind === 'dot'">
						<span :class="cellDisplayState.dotClass" />
					</template>
					<template v-else-if="cellDisplayState.kind === 'maskText' || cellDisplayState.kind === 'valueText'">
						<span :class="cellDisplayState.textClass">{{ cellDisplayState.text }}</span>
					</template>
					<template v-else-if="cellDisplayState.kind === 'cursor'">
						<span v-if="cellDisplayState.showUnderlineCursor" :class="cellDisplayState.underlineCursorClass" />
						<span v-else :class="cellDisplayState.cursorClass" />
					</template>
					<span :class="cellDisplayState.lineClass" />
				</div>
				<div v-else :class="cellDisplayState.cellClass">
					<template v-if="cellDisplayState.kind === 'dot'">
						<span :class="cellDisplayState.dotClass" />
					</template>
					<template v-else-if="cellDisplayState.kind === 'maskText' || cellDisplayState.kind === 'valueText'">
						<span :class="cellDisplayState.textClass">{{ cellDisplayState.text }}</span>
					</template>
					<template v-else-if="cellDisplayState.kind === 'cursor'">
						<span v-if="cellDisplayState.showUnderlineCursor" :class="cellDisplayState.underlineCursorClass" />
						<span v-else :class="cellDisplayState.cursorClass" />
					</template>
				</div>
			</template>
		</button>
		<p v-if="codeInputState.infoState.showInfo" :class="codeInputState.infoClass">
			{{ codeInputState.infoState.text }}
		</p>
	</div>
</template>
