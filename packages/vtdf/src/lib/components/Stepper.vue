<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { StepperProps } from '../types';
import {
	resolveStepperDerived,
	resolveStepperInitialValue,
	resolveStepperStateOptions,
	resolveStepperStepAction
} from '@any-tdf/common/derived/stepper';
import { minusSvg, plusSvg } from '@any-tdf/common/svg/common';
import Loading from './Loading.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<StepperProps & {}>(), {
	value: 10,
	min: 0,
	max: 100,
	step: 1,
	vertical: false,
	numberHighlight: false,
	theme: true,
	radius: '',
	decimal: 0,
	async: false,
	asyncLoading: false,
	loading: () => ({}),
	padding: true,
	width: 0,
	injClassOut: '',
	injClassBtn: '',
	injClassNum: ''
});

const emit = defineEmits<{
	change: [value: number];
	decrease: [];
	increase: [];
}>();

const value = ref(resolveStepperInitialValue(props.value));

// 公共派生只处理纯 class、数值和禁用态，事件与状态更新留在组件层。
// Shared derivation only handles pure classes, values and disabled state; events and state updates stay in the component layer.
const stepperState = computed(() =>
	resolveStepperDerived(
		resolveStepperStateOptions({
			value: value.value,
			props: {
				min: props.min,
				max: props.max,
				async: props.async,
				vertical: props.vertical,
				numberHighlight: props.numberHighlight,
				theme: props.theme,
				radius: props.radius,
				decimal: props.decimal,
				padding: props.padding,
				width: props.width,
				injClassOut: props.injClassOut,
				injClassBtn: props.injClassBtn,
				injClassNum: props.injClassNum
			}
		})
	)
);

const emitChange = (nextValue: number) => {
	emit('change', nextValue);
};

const decrease = () => {
	// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
	// Shared action function only returns the next value and change decision; events are still dispatched by the component.
	const action = resolveStepperStepAction({
		type: 'decrease',
		value: value.value,
		min: props.min,
		step: props.step,
		async: props.async
	});
	if (action.shouldChange) {
		value.value = action.nextValue;
		emitChange(action.nextValue);
	}
	emit('decrease');
};

const increase = () => {
	// 公共动作函数只返回下一值和是否变更，事件仍由组件派发。
	// Shared action function only returns the next value and change decision; events are still dispatched by the component.
	const action = resolveStepperStepAction({
		type: 'increase',
		value: value.value,
		max: props.max,
		step: props.step,
		async: props.async
	});
	if (action.shouldChange) {
		value.value = action.nextValue;
		emitChange(action.nextValue);
	}
	emit('increase');
};

watch(
	() => props.value,
	(nextValue) => {
		value.value = resolveStepperInitialValue(nextValue);
	}
);
</script>

<template>
	<div :class="stepperState.rootClass">
		<button
			type="button"
			:class="stepperState.buttonClass"
			:disabled="stepperState.decreaseDisabled"
			aria-label="decrease"
			@click="decrease"
		>
			<span :class="stepperState.decreaseIconClass">
				<!-- 公共 SVG 数据在 common，点击和 disabled 绑定留在组件层。 -->
				<!-- Shared SVG data lives in common; click and disabled bindings stay in the component layer. -->
				<SvgIcon :svg="minusSvg" width="24" height="24" :class-name="stepperState.iconClass" />
			</span>
		</button>

		<div v-if="async && asyncLoading" :class="stepperState.loadingClass">
			<Loading width="6" height="6" v-bind="loading" />
		</div>
		<div v-else :class="stepperState.numberClass" :style="stepperState.numberStyleValue">
			{{ stepperState.displayValue }}
		</div>

		<button
			type="button"
			:class="stepperState.buttonClass"
			:disabled="stepperState.increaseDisabled"
			aria-label="increase"
			@click="increase"
		>
			<span :class="stepperState.increaseIconClass">
				<SvgIcon :svg="plusSvg" width="24" height="24" :class-name="stepperState.iconClass" />
			</span>
		</button>
	</div>
</template>
