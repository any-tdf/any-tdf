<script setup lang="ts">
import { computed } from 'vue';
import type { SkeletonProps } from '../types';
import { resolveSkeletonDerived, resolveSkeletonRandomValue, resolveSkeletonStateOptions } from '@any-tdf/common/derived/skeleton';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<SkeletonProps>(), {
	type: 'div',
	width: '6',
	height: '6',
	radius: '',
	space: '1',
	lines: 3,
	iconRatio: 0.6,
	effect: 'pulse',
	bg: 'gray'
});

// 随机源留在组件层，随机值归一化由公共派生层统一。
// Random source stays in the component layer, while shared derivations normalize the value.
const randomValue = resolveSkeletonRandomValue({ random: Math.random() });
const skeletonState = computed(() =>
	resolveSkeletonDerived(
		resolveSkeletonStateOptions({
			props: {
				type: props.type,
				width: props.width,
				height: props.height,
				radius: props.radius,
				space: props.space,
				lines: props.lines,
				iconRatio: props.iconRatio,
				effect: props.effect,
				bg: props.bg
			},
			randomValue
		})
	)
);
</script>

<template>
	<component :is="'style'" v-html="skeletonState.css" />
	<div :class="skeletonState.classes.wrapperClass">
		<div v-if="skeletonState.displayState.showParagraph" :class="skeletonState.paragraphClass">
			<div v-for="index in skeletonState.paragraphLineIndexes" :key="index" :class="skeletonState.classes.lineClass" />
			<div :class="skeletonState.randomLineClass" />
		</div>
		<div v-else :class="skeletonState.classes.blockClass">
			<div
				v-if="skeletonState.displayState.showIcon && skeletonState.iconSvg"
				:class="skeletonState.iconWrapClass"
				:style="skeletonState.iconRatioStyleValue"
			>
				<!-- 公共 Skeleton 图标 SVG 数据在 common 中维护。 / Shared Skeleton SVG data lives in common. -->
				<SvgIcon :svg="skeletonState.iconSvg" width="100%" height="100%" :class-name="skeletonState.iconSvgClass" />
			</div>
		</div>
	</div>
</template>
