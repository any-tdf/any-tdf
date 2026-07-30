<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressLoopProps } from '../types';
import {
	resolveProgressLoopDerived,
	resolveProgressLoopGradientIdSuffix,
	resolveProgressLoopStateOptions
} from '@any-tdf/common/derived/progressLoop';
import { progressLoopSvg } from '@any-tdf/common/svg/progressLoop';

const props = withDefaults(defineProps<ProgressLoopProps>(), {
	percent: 66,
	strokeWidth: 2,
	butt: false,
	reverse: false,
	duration: '300',
	gradient: null,
	injClass: '',
	trackInjClass: ''
});

// 随机源留在组件层，渐变 ID 后缀规则由公共派生层统一。
// Random source stays in the component layer, while shared derivations own the gradient ID suffix rule.
const gradientIdSuffix = resolveProgressLoopGradientIdSuffix({ random: Math.random() });

// 输入组件状态，返回框架无关的 SVG 数学、class 和展示文本派生结果。
// Receive component state and return framework-agnostic SVG math, class and display text derivations.
const progressLoopState = computed(() =>
	resolveProgressLoopDerived(
		resolveProgressLoopStateOptions({
			props: {
				percent: props.percent,
				strokeWidth: props.strokeWidth,
				butt: props.butt,
				reverse: props.reverse,
				duration: props.duration,
				gradient: props.gradient,
				injClass: props.injClass,
				trackInjClass: props.trackInjClass
			},
			gradientIdSuffix
		})
	)
);
</script>

<template>
	<div :class="progressLoopState.rootClass">
		<svg :viewBox="progressLoopSvg.viewBox" :class="progressLoopState.svgClass">
			<circle
				:cx="progressLoopSvg.center"
				:cy="progressLoopSvg.center"
				:r="progressLoopState.radius"
				:stroke-width="strokeWidth"
				fill="none"
				:class="progressLoopState.trackClass"
			/>
			<defs v-if="progressLoopState.gradientStopStyles">
				<linearGradient :id="progressLoopState.gradientId">
					<stop offset="0%" :style="progressLoopState.gradientStopStyles.startStyle" />
					<stop offset="100%" :style="progressLoopState.gradientStopStyles.endStyle" />
				</linearGradient>
			</defs>
			<circle
				:cx="progressLoopSvg.center"
				:cy="progressLoopSvg.center"
				:r="progressLoopState.radius"
				:stroke-width="strokeWidth"
				:class="progressLoopState.barClass"
				fill="none"
				:stroke-dashoffset="progressLoopState.dashOffset"
				:stroke-dasharray="progressLoopState.circleLength"
				:stroke-linecap="progressLoopState.lineCap"
				:stroke="progressLoopState.strokeValue"
			/>
		</svg>
		<div :class="progressLoopState.labelClass">
			<slot v-if="$slots.default" />
			<div v-else :class="progressLoopState.percentTextClass">
				{{ progressLoopState.percentText }}
			</div>
		</div>
	</div>
</template>
