<script setup lang="ts">
import { computed } from 'vue';
import type { CellGroupProps } from '../types';
import { resolveCellGroupClass } from '@any-tdf/common/derived/cell';

const props = withDefaults(defineProps<CellGroupProps>(), {
	radius: '',
	shadow: 'xs',
	bg: 'surface',
	my: '4',
	mx: '2'
});

// 公共派生层只处理 CellGroup 的 class 字符串，slot 渲染留在组件内。
// Shared derived layer only handles CellGroup class strings; slot rendering stays in the component.
const className = computed(() =>
	resolveCellGroupClass({
		bg: props.bg,
		radius: props.radius,
		shadow: props.shadow,
		my: props.my,
		mx: props.mx
	})
);
</script>

<template>
	<div :class="className">
		<slot />
	</div>
</template>
