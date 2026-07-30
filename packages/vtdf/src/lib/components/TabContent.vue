<script setup lang="ts">
import { computed } from 'vue';
import type { TabContentProps } from '../types';
import { resolveTabContentClass } from '@any-tdf/common/derived/tabContent';

const props = withDefaults(defineProps<TabContentProps & {}>(), {
	show: true
});

const emit = defineEmits<{
	clickTab: [];
}>();

const clickTab = () => {
	emit('clickTab');
};

// 公共派生层只处理 TabContent 可见性 class，内容渲染留在组件内。
// Shared derived layer only handles TabContent visibility classes; content rendering stays in the component.
const contentClass = computed(() => resolveTabContentClass(props.show));
</script>

<template>
	<div :class="contentClass" @click="clickTab">
		<slot />
	</div>
</template>
