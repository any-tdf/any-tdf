<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeProps } from '../types';
import { resolveBadgeDerived, resolveBadgeStateOptions } from '@any-tdf/common/derived/badge';

const props = withDefaults(defineProps<BadgeProps>(), {
	text: '',
	radius: '',
	isLeft: false,
	isShow: true,
	offsetY: 0,
	offsetX: 0,
	isInner: false,
	injClass: ''
});

// 公共派生层只接收 Badge 状态，组件层只负责模板绑定。
// The shared derived layer receives Badge state; the component layer only binds the template.
const badgeState = computed(() =>
	resolveBadgeDerived(
		resolveBadgeStateOptions({
			props: {
				text: props.text,
				radius: props.radius,
				isLeft: props.isLeft,
				isShow: props.isShow,
				offsetY: props.offsetY,
				offsetX: props.offsetX,
				isInner: props.isInner,
				injClass: props.injClass
			}
		})
	)
);
</script>

<template>
	<div v-if="badgeState.isInner" :class="badgeState.classes.innerClass" :style="badgeState.innerStyleValue">
		{{ text }}
	</div>
	<div v-else :class="badgeState.classes.wrapperClass">
		<slot />
		<div :class="badgeState.classes.outerClass" :style="badgeState.outerStyleValue">
			{{ text }}
		</div>
	</div>
</template>
