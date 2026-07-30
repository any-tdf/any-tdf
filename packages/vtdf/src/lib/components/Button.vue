<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from '../types';
import { resolveButtonDerived, resolveButtonStateOptions } from '@any-tdf/common/derived/button';
import Icon from './Icon.vue';
import Loading from './Loading.vue';

const props = withDefaults(defineProps<ButtonProps>(), {
	fill: 'base',
	state: undefined,
	radius: '',
	size: 'big',
	border: 'solid',
	injClass: '',
	love: false,
	heightOut: '2',
	heightIn: '3',
	disabled: false,
	customSize: false,
	customWidth: 0,
	customHeight: 0,
	icon: null,
	iconPosition: 'left',
	loading: null,
	disabledLoading: true,
	type: 'button'
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

// 公共派生层处理 Button class、尺寸和内容分支，事件与 slot 留在组件层。
// Shared derived layer handles Button classes, size and content branches; events and slots stay in the component layer.
const buttonState = computed(() =>
	resolveButtonDerived(
		resolveButtonStateOptions({
			props: {
				fill: props.fill,
				state: props.state,
				radius: props.radius,
				size: props.size,
				border: props.border,
				heightOut: props.heightOut,
				heightIn: props.heightIn,
				injClass: props.injClass,
				love: props.love,
				disabled: props.disabled,
				loading: props.loading,
				disabledLoading: props.disabledLoading,
				customSize: props.customSize,
				customWidth: props.customWidth,
				customHeight: props.customHeight,
				icon: props.icon,
				iconPosition: props.iconPosition
			}
		})
	)
);

const handleClick = (event: MouseEvent) => {
	emit('click', event);
};
</script>

<template>
	<div :class="buttonState.outerClass">
		<button
			:class="buttonState.buttonClass"
			:disabled="buttonState.innerDisabled"
			:aria-disabled="buttonState.innerDisabled"
			:aria-busy="loading ? true : undefined"
			:style="buttonState.buttonStyleValue"
			:type="type"
			@click="handleClick"
		>
			<Loading v-if="buttonState.contentState.loadingProps" v-bind="buttonState.contentState.loadingProps" />
			<Icon
				v-if="buttonState.contentState.showLeftIcon && buttonState.contentState.iconProps"
				v-bind="buttonState.contentState.iconProps"
			/>
			<slot />
			<Icon
				v-if="buttonState.contentState.showRightIcon && buttonState.contentState.iconProps"
				v-bind="buttonState.contentState.iconProps"
			/>
		</button>
	</div>
</template>
