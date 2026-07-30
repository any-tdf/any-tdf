<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { zh_CN } from '../lang';
import Alert from './Alert.vue';
import Dialog from './Dialog.vue';
import Loading from './Loading.vue';
import Mask from './Mask.vue';
import Modal from './Modal.vue';
import Toast from './Toast.vue';
import { useConfig } from './adapter/config';
import { feedbackState } from './feedback';
import type { AlertItem, ToastItem } from './feedback/state';
import {
	removeFeedbackQueueItemById,
	resolveFeedbackAlertQueueViewItems,
	resolveFeedbackDialogResultAction,
	resolveFeedbackLoadingContainerClass,
	resolveFeedbackLoadingMessageClass,
	resolveFeedbackLoadingRenderProps,
	resolveFeedbackModalResultAction,
	resolveFeedbackToastQueueViewItems
} from '@any-tdf/common/derived/feedback';

const config = useConfig();
const loadingRenderProps = computed(() => resolveFeedbackLoadingRenderProps(feedbackState.loadingProps));
const toastQueueItems = computed(() => resolveFeedbackToastQueueViewItems(feedbackState.toastQueue));
const alertQueueItems = computed(() => resolveFeedbackAlertQueueViewItems(feedbackState.alertQueue));
const loadingContainerClass = resolveFeedbackLoadingContainerClass();
const loadingMessageClass = resolveFeedbackLoadingMessageClass();

watchEffect(() => {
	feedbackState.setLang(config.locale || zh_CN);
});

const handleToastClose = (item: ToastItem) => {
	feedbackState.setToastQueue(removeFeedbackQueueItemById(feedbackState.toastQueue, item.id));
};

const handleAlertClose = (item: AlertItem) => {
	feedbackState.setAlertQueue(removeFeedbackQueueItemById(feedbackState.alertQueue, item.id));
};

// 公共派生层处理队列堆叠和弹层结果动作，队列写入和回调触发留在组件内。
// Shared derived layer handles queue stacking and overlay result actions; queue writes and callbacks stay in the component.

const handleModalClose = () => {
	const action = resolveFeedbackModalResultAction('close');
	feedbackState.setModalState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
};

const handleModalConfirm = () => {
	const action = resolveFeedbackModalResultAction('confirm');
	feedbackState.setModalState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
};

const handleDialogClose = () => {
	const action = resolveFeedbackDialogResultAction('close');
	feedbackState.setDialogState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
};

const handleDialogPrimary = () => {
	const action = resolveFeedbackDialogResultAction('primary');
	feedbackState.setDialogState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
};

const handleDialogSecondary = () => {
	const action = resolveFeedbackDialogResultAction('secondary');
	feedbackState.setDialogState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
};
</script>

<template>
	<div v-for="queueItem in toastQueueItems" :key="queueItem.key" :style="queueItem.styleValue">
		<Toast v-bind="queueItem.item" :z-index="queueItem.zIndex" @close="() => handleToastClose(queueItem.item)" />
	</div>

	<div v-for="queueItem in alertQueueItems" :key="queueItem.key" :style="queueItem.styleValue">
		<Alert v-bind="queueItem.item" :z-index="queueItem.zIndex" @close="() => handleAlertClose(queueItem.item)" />
	</div>

	<Modal
		v-if="feedbackState.modalProps && feedbackState.modalVisible"
		v-bind="feedbackState.modalProps"
		:visible="feedbackState.modalVisible"
		@close="handleModalClose"
		@confirm="handleModalConfirm"
	/>

	<Dialog
		v-if="feedbackState.dialogProps && feedbackState.dialogVisible"
		v-bind="feedbackState.dialogProps"
		:visible="feedbackState.dialogVisible"
		@close="handleDialogClose"
		@primary="handleDialogPrimary"
		@secondary="handleDialogSecondary"
	/>

	<Mask v-if="feedbackState.loadingVisible" visible opacity="0.5" :z-index="2000">
		<div :class="loadingContainerClass">
			<Loading
				:type="loadingRenderProps.type"
				:height="loadingRenderProps.height"
				:width="loadingRenderProps.width"
				:theme="loadingRenderProps.theme"
				:inverse="loadingRenderProps.inverse"
				:custom-color="loadingRenderProps.customColor"
			/>
			<div v-if="feedbackState.loadingMessage" :class="loadingMessageClass">
				{{ feedbackState.loadingMessage }}
			</div>
		</div>
	</Mask>
</template>
