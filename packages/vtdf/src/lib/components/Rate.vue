<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { RateProps } from '../types';
import { resolveRateClickAction, resolveRateDerived, resolveRateInitialValue, resolveRateStateOptions } from '@any-tdf/common/derived/rate';
import { rateStarSvg } from '@any-tdf/common/svg/common';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<RateProps & {}>(), {
	value: 4,
	total: 5,
	height: 24,
	width: 24,
	opacity: '0.2',
	space: '3',
	half: false,
	zero: false,
	vertical: false,
	disabled: false,
	readonly: false,
	animation: 'current'
});

const emit = defineEmits<{
	'update:value': [value: number];
	click: [value: number];
}>();

const innerValue = ref(resolveRateInitialValue(props.value));
const isScale = ref(false);
const clickIndex = ref(0);
// 公共派生层统一 Rate 的 class、尺寸、象限状态和校验结果，组件层只处理事件和动画计时。
// Common derivation unifies Rate class, size, quadrant state and validation results; the component layer only handles events and animation timing.
const rateState = computed(() =>
	resolveRateDerived(
		resolveRateStateOptions({
			value: innerValue.value,
			clickIndex: clickIndex.value,
			isScale: isScale.value,
			props: {
				total: props.total,
				half: props.half,
				width: props.width,
				height: props.height,
				space: props.space,
				disabled: props.disabled,
				animation: props.animation,
				vertical: props.vertical,
				opacity: props.opacity
			}
		})
	)
);

watch(
	() => props.value,
	(value) => {
		innerValue.value = resolveRateInitialValue(value);
	}
);

const setValue = (value: number) => {
	innerValue.value = value;
	emit('update:value', value);
	emit('click', value);
};

const clickFun = (index: number) => {
	const action = resolveRateClickAction({
		index,
		value: innerValue.value,
		half: props.half,
		zero: props.zero,
		disabled: props.disabled,
		readonly: props.readonly
	});
	if (!action.shouldChange) return;
	isScale.value = action.isScale;
	clickIndex.value = action.clickIndex;
	setTimeout(() => {
		isScale.value = action.resetIsScale;
	}, action.resetScaleDelay);
	setValue(action.nextValue);
};
</script>

<template>
	<div :class="rateState.rootClass">
		<button
			v-for="item in rateState.items"
			:key="item.index"
			type="button"
			:class="item.buttonClass"
			:style="item.buttonStyleValue"
			@click="clickFun(item.index)"
		>
			<div
				v-for="quadrantItem in item.quadrants"
				:key="quadrantItem.quadrant"
				:class="quadrantItem.className"
				:style="quadrantItem.styleValue"
			>
				<div :style="quadrantItem.starStyleValue">
					<slot v-if="$slots.default" />
					<!-- 公共星形 SVG 数据在 common 中维护，评分事件仍在组件内处理。 / Shared star SVG data lives in common while rating events stay here. -->
					<SvgIcon v-else :svg="rateStarSvg" :width="height" :height="height" :class-name="rateState.starSvgClass" />
				</div>
			</div>
		</button>
	</div>
</template>
