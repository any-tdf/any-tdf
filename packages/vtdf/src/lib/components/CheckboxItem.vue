<script setup lang="ts">
import { computed } from 'vue';
import type { CheckboxItemProps } from '../types';
import { checkboxCheckedSvg, checkboxUncheckedSvg } from '@any-tdf/common/svg/common';
import { resolveSelectionItemRenderState } from '@any-tdf/common/derived/selection';
import Icon from './Icon.vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<CheckboxItemProps & {}>(), {
	name: '',
	layout: 'v',
	checked: false,
	textPosition: 'r',
	icon: 'default',
	iconChecked: 'default',
	label: ''
});

const emit = defineEmits<{
	click: [name: string];
}>();

// 公共派生层只处理选择项可见性、class 和图标展示分支，点击事件留在组件层。
// Shared derivation only handles selection item visibility, classes and icon display branches; click events stay in the component layer.
const itemState = computed(() =>
	resolveSelectionItemRenderState({
		layout: props.layout,
		textPosition: props.textPosition,
		icon: props.icon,
		iconChecked: props.iconChecked,
		checked: props.checked
	})
);

const clickCheckbox = () => {
	emit('click', props.name);
};
</script>

<template>
	<button type="button" :class="itemState.itemClass" @click="clickCheckbox">
		<div v-if="itemState.showLeadingLabel" :class="itemState.leadingLabelClass">
			<slot>{{ label }}</slot>
			<div v-if="itemState.showDivider" :class="itemState.dividerClass" />
		</div>

		<div :class="itemState.checkedIconClass">
			<template v-if="itemState.checkedIconState.kind === 'none'" />
			<!-- 公共 SVG 数据在 common，选中态和事件仍保留在 CheckboxItem。 -->
			<!-- Shared SVG data lives in common, while checked state and events stay in CheckboxItem. -->
			<SvgIcon
				v-else-if="itemState.checkedIconState.kind === 'default'"
				:svg="checkboxCheckedSvg"
				width="24"
				height="24"
				:class-name="itemState.checkedSvgClass"
			/>
			<Icon v-else-if="itemState.checkedIconProps" v-bind="itemState.checkedIconProps" theme />
		</div>

		<div :class="itemState.uncheckedIconClass">
			<template v-if="itemState.uncheckedIconState.kind === 'none'" />
			<SvgIcon
				v-else-if="itemState.uncheckedIconState.kind === 'default'"
				:svg="checkboxUncheckedSvg"
				width="24"
				height="24"
				:class-name="itemState.uncheckedSvgClass"
			/>
			<Icon v-else-if="itemState.uncheckedIconProps" :opacity="0.2" v-bind="itemState.uncheckedIconProps" />
		</div>

		<div v-if="itemState.showTrailingLabel" :class="itemState.trailingLabelClass">
			<slot>{{ label }}</slot>
		</div>
	</button>
</template>
