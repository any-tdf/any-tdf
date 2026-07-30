<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { DialogProps } from '../types';
import {
	resolveDialogCloseAction,
	resolveDialogDerived,
	resolveDialogPrimaryAction,
	resolveDialogSecondaryFlow,
	resolveDialogStateOptions
} from '@any-tdf/common/derived/dialog';
import { zh_CN } from '../lang';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Popup from './Popup.vue';
import { useConfig } from './adapter/config';

const props = withDefaults(defineProps<DialogProps>(), {
	visible: false,
	title: undefined,
	titleAlign: 'center',
	content: undefined,
	popup: () => ({}),
	showIcon: false,
	icon: () => ({}),
	btnStyle: 'button',
	primaryText: undefined,
	primaryButton: () => ({}),
	secondaryText: undefined,
	secondaryButton: () => ({}),
	btnRatio: () => [1, 1],
	btnReverse: false,
	secondaryClose: true,
	btnGap: '2'
});

const emit = defineEmits<{
	'update:visible': [visible: boolean];
	secondary: [];
	primary: [];
	close: [];
}>();

const config = useConfig();
const slots = useSlots();
const dialogLang = computed(() => config.locale?.dialog || zh_CN.dialog);
// 公共派生层处理 Dialog 状态推导，事件与 slot 留在组件内。
// The shared derived layer handles Dialog state derivation; events and slots stay in the component.
const dialogState = computed(() =>
	resolveDialogDerived(
		resolveDialogStateOptions({
			defaults: dialogLang.value,
			hasCustomContent: Boolean(slots.default),
			hasPrimaryCustomContent: Boolean(slots.primary),
			props
		})
	)
);

const closeDialog = () => {
	// 公共动作函数只返回关闭决策，组件层负责状态写入和事件触发。
	// Shared action function only returns close decisions; the component writes state and fires events.
	const action = resolveDialogCloseAction();
	emit('update:visible', action.nextVisible);
	if (action.shouldClose) emit('close');
};

const handleSecondary = () => {
	const action = resolveDialogSecondaryFlow({ secondaryClose: props.secondaryClose });
	if (action.closeAction) {
		emit('update:visible', action.closeAction.nextVisible);
		if (action.closeAction.shouldClose) emit('close');
	}
	if (action.shouldSecondary) emit('secondary');
};

const handlePrimary = () => {
	const action = resolveDialogPrimaryAction();
	if (action.shouldPrimary) emit('primary');
};
</script>

<template>
	<Popup :visible="visible" v-bind="dialogState.popupProps" @update:visible="(value) => emit('update:visible', value)" @close="closeDialog">
		<div :class="dialogState.panelClass">
			<div :class="dialogState.titleClass">{{ dialogState.texts.title }}</div>
			<div v-if="dialogState.contentState.showIcon">
				<Icon v-bind="icon" />
			</div>
			<div>
				<slot v-if="dialogState.contentState.showCustomContent" />
				<template v-else-if="dialogState.contentState.showContentText">{{ dialogState.texts.content }}</template>
			</div>
			<div :class="dialogState.buttonRowClass">
				<div :class="dialogState.secondarySideClass" :style="dialogState.secondarySideStyleValue">
					<Button
						size="full"
						:fill="dialogState.secondaryButtonState.fill"
						:height-in="dialogState.secondaryButtonState.heightIn"
						:inj-class="dialogState.secondaryButtonState.injClass"
						v-bind="secondaryButton"
						@click="handleSecondary"
					>
						{{ dialogState.texts.secondaryText }}
					</Button>
				</div>
				<div :class="dialogState.primarySideClass" :style="dialogState.primarySideStyleValue">
					<Button
						size="full"
						:fill="dialogState.primaryButtonState.fill"
						:height-in="dialogState.primaryButtonState.heightIn"
						:inj-class="dialogState.primaryButtonState.injClass"
						v-bind="primaryButton"
						@click="handlePrimary"
					>
						<slot v-if="dialogState.contentState.showPrimaryCustomContent" name="primary" />
						<template v-else>{{ dialogState.texts.primaryText }}</template>
					</Button>
				</div>
			</div>
		</div>
	</Popup>
</template>
