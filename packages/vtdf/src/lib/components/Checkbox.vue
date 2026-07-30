<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CheckboxProps } from '../types';
import CheckboxItem from './CheckboxItem.vue';
import {
	resolveCheckboxClickAction,
	resolveCheckboxDerived,
	resolveCheckboxInitialCheckeds,
	resolveCheckboxStateOptions
} from '@any-tdf/common/derived/checkbox';

const props = withDefaults(defineProps<CheckboxProps & {}>(), {
	data: () => [],
	layout: 'v',
	checkeds: () => [],
	textPosition: 'r',
	icon: 'default',
	iconChecked: 'default'
});

const emit = defineEmits<{
	'update:checkeds': [value: string[]];
	change: [value: string[]];
}>();

const internalCheckeds = ref<string[]>(resolveCheckboxInitialCheckeds(props.checkeds));
// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
const checkboxState = computed(() =>
	resolveCheckboxDerived(
		resolveCheckboxStateOptions({
			props: {
				data: props.data,
				layout: props.layout
			},
			checkeds: internalCheckeds.value
		})
	)
);

const clickItem = (name: string) => {
	// 公共动作函数只返回下一组选中值，组件层负责状态写入和事件触发。
	// Shared action function only returns next checked values; the component writes state and fires events.
	const action = resolveCheckboxClickAction({ checkeds: internalCheckeds.value, name });
	internalCheckeds.value = action.nextCheckeds;
	if (action.shouldEmit) {
		emit('update:checkeds', action.nextCheckeds);
		emit('change', action.nextCheckeds);
	}
};

watch(
	() => props.checkeds,
	(nextCheckeds) => {
		internalCheckeds.value = resolveCheckboxInitialCheckeds(nextCheckeds);
	}
);
</script>

<template>
	<div :class="checkboxState.groupClass">
		<template v-for="itemState in checkboxState.itemStates" :key="itemState.item.name">
			<slot v-if="$slots.checkboxChild" name="checkboxChild" :item="itemState.item" />
			<CheckboxItem
				v-else
				v-bind="itemState.item"
				:layout="layout"
				:text-position="textPosition"
				:icon="icon"
				:icon-checked="iconChecked"
				:checked="itemState.checked"
				@click="clickItem"
			>
				{{ itemState.item.label }}
			</CheckboxItem>
		</template>
	</div>
</template>
