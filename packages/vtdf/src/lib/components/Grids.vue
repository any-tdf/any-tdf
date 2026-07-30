<script setup lang="ts">
import { computed } from 'vue';
import type { GridsProps } from '../types';
import { resolveGridsDerived, resolveGridsStateOptions } from '@any-tdf/common/derived/grids';

const props = withDefaults(defineProps<GridsProps>(), {
	cols: '6',
	gap: '2',
	mx: '2',
	my: '2'
});

const gridsState = computed(() =>
	resolveGridsDerived(
		resolveGridsStateOptions({
			props: { cols: props.cols, mx: props.mx, my: props.my, gap: props.gap }
		})
	)
);
</script>

<template>
	<!-- 公共 Grids 派生函数返回容器布局 class，组件层只负责渲染内容。 / Shared Grids derivation returns container layout classes; the component layer only renders content. -->
	<div :class="gridsState.containerClass">
		<slot />
	</div>
</template>
