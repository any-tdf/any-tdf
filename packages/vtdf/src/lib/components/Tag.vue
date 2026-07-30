<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { TagProps } from '../types';
import {
	resolveTagClickAction,
	resolveTagCloseAction,
	resolveTagDerived,
	resolveTagKeyboardAction,
	resolveTagStateOptions
} from '@any-tdf/common/derived/tag';
import { tagCloseSvg } from '@any-tdf/common/svg/tag';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<TagProps & {}>(), {
	text: '',
	state: 'theme',
	fill: 'base',
	size: 'md',
	radius: 'sm',
	mark: false,
	closable: false,
	disabled: false,
	injClass: ''
});

const emit = defineEmits<{
	click: [];
	close: [];
}>();

const slots = useSlots();
const tagState = computed(() =>
	resolveTagDerived(
		resolveTagStateOptions({
			props: {
				text: props.text,
				state: props.state,
				fill: props.fill,
				size: props.size,
				radius: props.radius,
				mark: props.mark,
				closable: props.closable,
				disabled: props.disabled,
				injClass: props.injClass
			},
			hasCustomContent: Boolean(slots.default)
		})
	)
);

const handleClick = () => {
	const action = resolveTagClickAction({ disabled: props.disabled });
	if (action.shouldEmit) emit('click');
};

const handleClose = (event: Event) => {
	event.stopPropagation();
	const action = resolveTagCloseAction({ disabled: props.disabled });
	if (action.shouldEmit) emit('close');
};

const handleKeydown = (event: KeyboardEvent) => {
	// 公共 action 只判断按键是否触发 Tag 事件，DOM 事件仍留在组件层。
	// Shared action only decides whether the key triggers a Tag event; DOM events stay in the component layer.
	const action = resolveTagKeyboardAction({ key: event.key, disabled: props.disabled });
	if (action.shouldEmit) emit('click');
};

const handleCloseKeydown = (event: KeyboardEvent) => {
	// 公共 action 只返回关闭键盘动作，事件阻止冒泡仍由组件处理。
	// Shared action only returns close keyboard action; event propagation remains handled by the component.
	const action = resolveTagKeyboardAction({ key: event.key, disabled: props.disabled });
	if (!action.isActivationKey) return;
	event.stopPropagation();
	if (action.shouldEmit) emit('close');
};
</script>

<template>
	<span
		:class="tagState.classes.rootClass"
		role="button"
		:tabindex="tagState.focusableTabIndex"
		@click="handleClick"
		@keydown="handleKeydown"
	>
		<slot v-if="tagState.contentState.showCustomContent" />
		<template v-else-if="tagState.contentState.showText">{{ text }}</template>
		<SvgIcon
			v-if="tagState.contentState.showClose"
			:svg="tagCloseSvg"
			:class-name="tagState.classes.closeClass"
			fill="none"
			stroke="currentColor"
			:stroke-width="2"
			role="button"
			:tabindex="tagState.focusableTabIndex"
			:aria-hidden="false"
			@click="handleClose"
			@keydown="handleCloseKeydown"
		/>
	</span>
</template>
