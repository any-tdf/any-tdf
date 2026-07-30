<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonGroupItemProps, ButtonGroupProps } from '../types';
import {
	resolveButtonGroupDerived,
	resolveButtonGroupItemClickAction,
	resolveButtonGroupStateOptions
} from '@any-tdf/common/derived/button';
import Icon from './Icon.vue';

const props = withDefaults(defineProps<ButtonGroupProps>(), {
	items: () => [],
	fill: 'base',
	state: undefined,
	radius: '',
	size: 'big',
	border: 'solid',
	dividerHeight: 'mid',
	heightIn: '3',
	heightOut: '2',
	injClass: ''
});

const emit = defineEmits<{
	click: [index: number, item: ButtonGroupItemProps];
}>();

// 公共派生层处理 ButtonGroup class 和纯点击决策，事件与 slot 渲染留在组件层。
// Shared derived layer handles ButtonGroup classes and pure click decisions; events and slot rendering stay in the component layer.
const buttonGroupState = computed(() =>
	resolveButtonGroupDerived(
		resolveButtonGroupStateOptions({
			props: {
				items: props.items,
				fill: props.fill,
				state: props.state,
				radius: props.radius,
				size: props.size,
				border: props.border,
				dividerHeight: props.dividerHeight,
				heightIn: props.heightIn,
				heightOut: props.heightOut,
				injClass: props.injClass
			}
		})
	)
);

const clickItemFun = (index: number, item: ButtonGroupItemProps) => {
	// 公共动作函数只返回点击决策，事件派发留在组件层。
	// Shared action function only returns the click decision; event emission stays in the component.
	const action = resolveButtonGroupItemClickAction({ disabled: item.disabled });
	if (!action.shouldClick) return;
	emit('click', index, item);
};
</script>

<template>
	<div :class="buttonGroupState.outerClass">
		<div :class="buttonGroupState.innerClass">
			<template v-if="buttonGroupState.useItems">
				<template v-for="(itemState, index) in buttonGroupState.itemStates" :key="index">
					<button
						type="button"
						:class="itemState.itemClass"
						:disabled="itemState.item.disabled"
						@click="clickItemFun(index, itemState.item)"
					>
						<Icon v-if="itemState.showLeftIcon" v-bind="itemState.item.icon" />
						<template v-if="itemState.item.text">{{ itemState.item.text }}</template>
						<Icon v-if="itemState.showRightIcon" v-bind="itemState.item.icon" />
					</button>
					<div v-if="itemState.showDivider" :class="itemState.dividerWrapClass">
						<div :class="itemState.dividerClass" />
					</div>
				</template>
			</template>
			<slot v-else />
		</div>
	</div>
</template>
