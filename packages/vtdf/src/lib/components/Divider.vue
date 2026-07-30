<script setup lang="ts">
import { computed } from 'vue';
import type { DividerProps } from '../types';
import { resolveDividerDerived, resolveDividerStateOptions } from '@any-tdf/common/derived/divider';

const props = withDefaults(defineProps<DividerProps>(), {
	layout: 'h',
	px: '0',
	py: '4',
	text: '',
	align: 'center',
	line: 'solid',
	mx: '1',
	weight: '1',
	injClass: ''
});

// 公共派生层处理 Divider 的 class 和渲染分支，组件层只负责模板绑定。
// Shared derived layer handles Divider classes and render branches; the component layer only binds templates.
const dividerState = computed(() =>
	resolveDividerDerived(
		resolveDividerStateOptions({
			props: {
				layout: props.layout,
				px: props.px,
				py: props.py,
				text: props.text,
				align: props.align,
				line: props.line,
				mx: props.mx,
				weight: props.weight,
				injClass: props.injClass
			}
		})
	)
);
</script>

<template>
	<div v-if="dividerState.isVertical" :class="dividerState.verticalClass" />
	<div v-else :class="dividerState.horizontalClass">
		<div v-if="dividerState.lineVisibility.showLeadingLine" :class="dividerState.lineClass" />
		<div v-if="dividerState.lineVisibility.showText" :class="dividerState.textClass">
			{{ text }}
		</div>
		<div v-if="dividerState.lineVisibility.showTrailingLine" :class="dividerState.lineClass" />
	</div>
</template>
