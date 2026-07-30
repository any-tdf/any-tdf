<script setup lang="ts">
import { computed } from 'vue';
import type { PlaceholderProps } from '../types';
import { resolvePlaceholderDerived } from '@any-tdf/common/derived/placeholder';

const props = withDefaults(defineProps<PlaceholderProps>(), {
	py: '4',
	height: 'full',
	radius: '',
	shadow: 'none',
	injClass: ''
});

// 公共派生层只处理 Placeholder 的 class 字符串，slot 渲染留在组件内。
// Shared derived layer only handles Placeholder class strings; slot rendering stays in the component.
const placeholderState = computed(() => resolvePlaceholderDerived(props));
</script>

<template>
	<div :class="placeholderState.rootClass">
		<slot />
	</div>
</template>
