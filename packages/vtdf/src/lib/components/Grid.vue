<script setup lang="ts">
import { computed } from 'vue';
import type { GridProps } from '../types';
import { resolveGridDerived, resolveGridStateOptions } from '@any-tdf/common/derived/grids';

const props = withDefaults(defineProps<GridProps>(), {
	col: '1',
	row: '1'
});

const gridState = computed(() => resolveGridDerived(resolveGridStateOptions({ props: { row: props.row, col: props.col } })));
</script>

<template>
	<!-- 公共 Grid 派生函数返回布局 class，组件层只负责渲染内容。 / Shared Grid derivation returns layout classes; the component layer only renders content. -->
	<div :class="gridState.itemClass">
		<slot />
	</div>
</template>
