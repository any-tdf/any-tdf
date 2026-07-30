<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { ProgressProps } from '../types';
import { resolveProgressDerived, resolveProgressStateOptions } from '@any-tdf/common/derived/progress';

const props = withDefaults(defineProps<ProgressProps>(), {
	percent: 66,
	percentPosition: 'right',
	height: '2',
	radius: '',
	inactive: false,
	overflowPercent: 10,
	duration: '300',
	injClass: '',
	trackInjClass: ''
});

const slots = useSlots();

// 公共派生层只处理 Progress 的 class 字符串、样式值和展示文本，slot 渲染留在组件内。
// Shared derived layer only handles Progress classes, style values and display text; slot rendering stays in the component.
const progressState = computed(() =>
	resolveProgressDerived(
		resolveProgressStateOptions({
			props: {
				percent: props.percent,
				percentPosition: props.percentPosition,
				height: props.height,
				radius: props.radius,
				inactive: props.inactive,
				overflowPercent: props.overflowPercent,
				duration: props.duration,
				injClass: props.injClass,
				trackInjClass: props.trackInjClass
			},
			hasCustomContent: Boolean(slots.default)
		})
	)
);
</script>

<template>
	<div :class="progressState.rootClass">
		<div :class="progressState.trackClass">
			<div :class="progressState.barClass" :style="progressState.barStyleValue">
				<div v-if="progressState.labelState.showInner" :class="progressState.innerTextClass">
					<slot v-if="progressState.labelState.showCustomContent" />
					<template v-else-if="progressState.labelState.showFallbackText">{{ progressState.labelState.text }}</template>
				</div>
			</div>
			<div v-if="progressState.labelState.showBlock" :class="progressState.blockLabelClass" :style="progressState.blockLabelStyleValue">
				<slot v-if="progressState.labelState.showCustomContent" />
				<template v-else-if="progressState.labelState.showFallbackText">{{ progressState.labelState.text }}</template>
			</div>
		</div>
		<template v-if="progressState.labelState.showRight">
			<slot v-if="progressState.labelState.showCustomContent" />
			<div v-else-if="progressState.labelState.showFallbackText" :class="progressState.rightLabelClass">
				{{ progressState.labelState.text }}
			</div>
		</template>
	</div>
</template>
