<script setup lang="ts">
import type { MaskProps } from '../types';
import { Transition as MotionTransition } from '@any-tdf/vue-motion';
import { computed } from 'vue';
import { resolveMaskDerived, resolveMaskStateOptions } from '@any-tdf/common/derived/mask';

const props = withDefaults(defineProps<MaskProps & {}>(), {
	visible: false,
	opacity: '0.5',
	clickable: false,
	inverse: false,
	backdropBlur: 'none',
	duration: 150,
	outDuration: 0,
	zIndex: 500
});

const emit = defineEmits<{
	clickMask: [];
}>();

const handleClick = () => {
	emit('clickMask');
};

// 公共派生层只处理 Mask class、过渡参数和 z-index style，点击事件留在组件层。
// Shared derivation only handles Mask classes, transition params and z-index style; click events stay in the component layer.
const maskState = computed(() =>
	resolveMaskDerived(
		resolveMaskStateOptions({
			props: {
				opacity: props.opacity,
				clickable: props.clickable,
				inverse: props.inverse,
				backdropBlur: props.backdropBlur,
				duration: props.duration,
				outDuration: props.outDuration,
				zIndex: props.zIndex
			}
		})
	)
);
</script>

<template>
	<MotionTransition
		:visible="visible"
		as="button"
		type="button"
		transition="fade"
		:in-params="maskState.inParams"
		:out-params="maskState.outParams"
		:class="maskState.rootClass"
		:style="maskState.zIndexStyleValue"
		@click="handleClick"
	>
		<slot />
	</MotionTransition>
</template>
