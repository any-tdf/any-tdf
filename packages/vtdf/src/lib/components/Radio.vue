<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { RadioItemProps, RadioProps } from '../types';
import RadioItem from './RadioItem.vue';
import {
	resolveRadioClickAction,
	resolveRadioDerived,
	resolveRadioInitialValue,
	resolveRadioStateOptions
} from '@any-tdf/common/derived/radio';

const props = withDefaults(defineProps<RadioProps & {}>(), {
	data: () => [],
	value: '',
	layout: 'v',
	textPosition: 'r',
	icon: 'default',
	iconChecked: 'default'
});

const emit = defineEmits<{
	'update:value': [value: string];
	change: [value: string];
}>();

defineSlots<{
	radioChild?: (props: { item: RadioItemProps & Record<string, unknown> }) => unknown;
}>();

const internalValue = ref(resolveRadioInitialValue(props.value));
// 公共派生层只处理选中态和布局 class，状态写入与事件留在组件层。
// Shared derivation only handles checked state and layout classes; state writes and events stay in the component layer.
const radioState = computed(() =>
	resolveRadioDerived(
		resolveRadioStateOptions({
			props: {
				data: props.data,
				layout: props.layout
			},
			value: internalValue.value
		})
	)
);

const clickItem = (name: string) => {
	// 公共动作函数只返回下一选中值，组件层负责状态写入和事件触发。
	// Shared action function only returns the next selected value; the component writes state and fires events.
	const action = resolveRadioClickAction({ name });
	internalValue.value = action.nextValue;
	if (action.shouldEmit) {
		emit('update:value', action.nextValue);
		emit('change', action.nextValue);
	}
};

watch(
	() => props.value,
	(nextValue) => {
		internalValue.value = resolveRadioInitialValue(nextValue);
	}
);
</script>

<template>
	<div :class="radioState.groupClass">
		<template v-for="itemState in radioState.itemStates" :key="itemState.item.name">
			<slot v-if="$slots.radioChild" name="radioChild" :item="itemState.item" />
			<RadioItem
				v-else
				v-bind="itemState.item"
				:layout="layout"
				:text-position="textPosition"
				:icon="icon"
				:icon-checked="iconChecked"
				:checked="itemState.checked"
				@click="() => clickItem(itemState.item.name)"
			>
				{{ itemState.item.label }}
			</RadioItem>
		</template>
	</div>
</template>
