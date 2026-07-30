<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { IconProps } from '../types';
import {
	resolveIconDerived,
	resolveIconInteractive,
	resolveIconKeyboardAction,
	resolveIconStateOptions
} from '@any-tdf/common/derived/icon';
import { useConfig } from './adapter/config';

const props = withDefaults(defineProps<IconProps>(), {
	type: 'symbol',
	name: '',
	size: 24,
	width: 0,
	height: 0,
	theme: false,
	opacity: 1,
	y: undefined,
	injClass: ''
});

const emit = defineEmits<{
	click: [];
}>();

const instance = getCurrentInstance();
const config = useConfig();
const isInteractive = computed(() => resolveIconInteractive(instance?.vnode.props?.onClick));
// 公共派生层统一 Icon 的 class、style、尺寸、可访问性和最终资源路径，组件层只负责事件派发。
// Common derivation unifies Icon class, style, size, accessibility and final asset path; the component layer only emits events.
const iconState = computed(() =>
	resolveIconDerived(
		resolveIconStateOptions({
			props: {
				type: props.type,
				name: props.name,
				size: props.size,
				width: props.width,
				height: props.height,
				state: props.state,
				theme: props.theme,
				opacity: props.opacity,
				path: props.path,
				y: props.y,
				injClass: props.injClass
			},
			configPath: config.iconPath,
			interactive: isInteractive.value
		})
	)
);

const handleClick = () => {
	emit('click');
};

const handleKeyDown = (event: KeyboardEvent) => {
	const action = resolveIconKeyboardAction({ interactive: isInteractive.value, key: event.key });
	if (action.shouldPreventDefault) {
		event.preventDefault();
	}
	if (action.shouldClick) {
		handleClick();
	}
};
</script>

<template>
	<slot v-if="$slots.default" />
	<span
		v-else-if="type === 'iconify' || type === 'iconify-color'"
		:class="iconState.iconifyClass"
		:style="iconState.iconifyStyleValue"
		:role="iconState.accessibility.role"
		:tabindex="iconState.accessibility.tabIndex"
		:aria-label="iconState.accessibility.ariaLabel"
		:aria-hidden="iconState.accessibility.ariaHidden"
		@click="isInteractive ? handleClick() : undefined"
		@keydown="handleKeyDown"
	/>
	<svg
		v-else-if="type === 'symbol'"
		:width="iconState.symbolWidth"
		:height="iconState.symbolHeight"
		:class="iconState.symbolClass"
		:style="iconState.symbolStyleValue"
		:role="iconState.accessibility.role"
		:tabindex="iconState.accessibility.tabIndex"
		:aria-label="iconState.accessibility.ariaLabel"
		:aria-hidden="iconState.accessibility.ariaHidden"
		@click="isInteractive ? handleClick() : undefined"
		@keydown="handleKeyDown"
	>
		<use :xlink:href="iconState.symbolHref" />
	</svg>
</template>
