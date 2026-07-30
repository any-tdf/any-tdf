<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { ModalProps } from '../types';
import {
	resolveModalCloseAction,
	resolveModalConfirmAction,
	resolveModalDerived,
	resolveModalStateOptions
} from '@any-tdf/common/derived/modal';
import { zh_CN } from '../lang';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Popup from './Popup.vue';
import { useConfig } from './adapter/config';

const props = withDefaults(defineProps<ModalProps>(), {
	visible: false,
	title: undefined,
	titleAlign: 'center',
	content: undefined,
	popup: () => ({}),
	showIcon: false,
	icon: () => ({}),
	showBtn: true,
	btnText: undefined,
	button: () => ({})
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	confirm: [];
	close: [];
}>();

const config = useConfig();
const slots = useSlots();
const modalLang = computed(() => config.locale?.modal || zh_CN.modal);
// 公共派生层处理 Modal 状态推导，关闭事件和 slot 留在组件内。
// The shared derived layer handles Modal state derivation; close events and slots stay in the component.
const modalState = computed(() =>
	resolveModalDerived(
		resolveModalStateOptions({
			props: {
				title: props.title,
				titleAlign: props.titleAlign,
				content: props.content,
				btnText: props.btnText,
				showBtn: props.showBtn,
				popup: props.popup,
				showIcon: props.showIcon
			},
			defaults: modalLang.value,
			hasCustomContent: Boolean(slots.default)
		})
	)
);

const closeModalFunc = () => {
	// 公共动作函数只返回关闭决策，组件层负责状态写入和事件触发。
	// Shared action function only returns close decisions; the component writes state and fires events.
	const action = resolveModalCloseAction();
	emit('update:visible', action.nextVisible);
	if (action.shouldClose) emit('close');
};

const confirmModalFunc = () => {
	const action = resolveModalConfirmAction();
	if (action.shouldConfirm) emit('confirm');
	if (action.shouldClose) {
		emit('update:visible', action.nextVisible);
		emit('close');
	}
};
</script>

<template>
	<Popup
		:visible="visible"
		v-bind="modalState.popupProps"
		@update:visible="(value) => emit('update:visible', value)"
		@close="closeModalFunc"
	>
		<div :class="modalState.contentClass">
			<div :class="modalState.titleClass">{{ modalState.texts.title }}</div>
			<div v-if="modalState.contentState.showIcon">
				<Icon v-bind="icon" />
			</div>
			<div>
				<slot v-if="modalState.contentState.showCustomContent" />
				<template v-else-if="modalState.contentState.showContentText">{{ modalState.texts.content }}</template>
			</div>
			<div v-if="modalState.contentState.showButton">
				<Button size="full" v-bind="button" @click="confirmModalFunc">{{ modalState.texts.btnText }}</Button>
			</div>
		</div>
	</Popup>
</template>
