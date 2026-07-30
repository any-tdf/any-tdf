<script lang="ts">
	// 全局反馈组件容器
	// Global feedback component container
	// 使用方式：在应用根布局中添加此组件
	// Usage: Add this component to your app's root layout

	import { getContext, onMount } from 'svelte';
	import { feedbackState } from './state.svelte.js';
	import Toast from '../toast/Toast.svelte';
	import Dialog from '../dialog/Dialog.svelte';
	import Modal from '../modal/Modal.svelte';
	import Alert from '../alert/Alert.svelte';
	import Loading from '../loading/Loading.svelte';
	import Mask from '../mask/Mask.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import {
		removeFeedbackQueueItemById,
		resolveFeedbackAlertQueueViewItems,
		resolveFeedbackDialogResultAction,
		resolveFeedbackLoadingContainerClass,
		resolveFeedbackLoadingMessageClass,
		resolveFeedbackModalResultAction,
		resolveFeedbackLoadingRenderProps,
		resolveFeedbackToastQueueViewItems
	} from '@any-tdf/common/derived/feedback';

	// 从 Context 获取语言配置
	// Get language configuration from Context
	const lang = (getContext('STDF_lang') || zh_CN) as LangProps;

	// 同步语言配置到全局状态
	// Sync language configuration to global state
	onMount(() => {
		feedbackState.lang = lang;
	});

	// 处理 Toast 关闭
	// Handle Toast close
	function handleToastClose(id: string) {
		feedbackState.toastQueue = removeFeedbackQueueItemById(feedbackState.toastQueue, id);
	}

	// 处理 Alert 关闭
	// Handle Alert close
	function handleAlertClose(id: string) {
		feedbackState.alertQueue = removeFeedbackQueueItemById(feedbackState.alertQueue, id);
	}

	// 处理 Dialog 关闭
	// Handle Dialog close
	function handleDialogClose() {
		const action = resolveFeedbackDialogResultAction('close');
		feedbackState.dialogVisible = action.nextVisible;
		if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
	}

	// 处理 Dialog 主按钮点击
	// Handle Dialog primary button click
	function handleDialogPrimary() {
		const action = resolveFeedbackDialogResultAction('primary');
		feedbackState.dialogVisible = action.nextVisible;
		if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
	}

	// 处理 Dialog 次按钮点击
	// Handle Dialog secondary button click
	function handleDialogSecondary() {
		const action = resolveFeedbackDialogResultAction('secondary');
		feedbackState.dialogVisible = action.nextVisible;
		if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
	}

	// 处理 Modal 关闭
	// Handle Modal close
	function handleModalClose() {
		const action = resolveFeedbackModalResultAction('close');
		feedbackState.modalVisible = action.nextVisible;
		if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
	}

	// 公共派生层处理队列堆叠和弹层结果动作，队列写入和回调触发留在组件内。
	// Shared derived layer handles queue stacking and overlay result actions; queue writes and callbacks stay in the component.
	const loadingRenderProps = $derived(resolveFeedbackLoadingRenderProps(feedbackState.loadingProps));
	const toastQueueItems = $derived(resolveFeedbackToastQueueViewItems(feedbackState.toastQueue));
	const alertQueueItems = $derived(resolveFeedbackAlertQueueViewItems(feedbackState.alertQueue));
	const loadingContainerClass = resolveFeedbackLoadingContainerClass();
	const loadingMessageClass = resolveFeedbackLoadingMessageClass();
</script>

<!-- Toast 队列渲染 -->
<!-- Toast queue rendering -->
{#each toastQueueItems as queueItem (queueItem.key)}
	<div style={queueItem.styleString}>
		<Toast
			message={queueItem.item.message}
			visible={queueItem.item.visible}
			duration={queueItem.item.duration}
			position={queueItem.item.position}
			py={queueItem.item.py}
			radius={queueItem.item.radius}
			transitionType={queueItem.item.transitionType}
			transitionParams={queueItem.item.transitionParams}
			outDuration={queueItem.item.outDuration}
			type={queueItem.item.type}
			mask={queueItem.item.mask}
			loading={queueItem.item.loading}
			icon={queueItem.item.icon}
			zIndex={queueItem.zIndex}
			clickable={queueItem.item.clickable}
			dynamicFixed={queueItem.item.dynamicFixed}
			onclose={() => handleToastClose(queueItem.item.id)}
		/>
	</div>
{/each}

<!-- Alert 堆叠渲染 -->
<!-- Alert stack rendering -->
{#each alertQueueItems as queueItem (queueItem.key)}
	<div style={queueItem.styleString}>
		<Alert
			visible={queueItem.item.visible}
			title={queueItem.item.title}
			message={queueItem.item.message}
			duration={queueItem.item.duration}
			position={queueItem.item.position}
			py={queueItem.item.py}
			type={queueItem.item.type}
			showIcon={queueItem.item.showIcon}
			icon={queueItem.item.icon}
			closable={queueItem.item.closable}
			inverse={queueItem.item.inverse}
			card={queueItem.item.card}
			transitionType={queueItem.item.transitionType}
			transitionParams={queueItem.item.transitionParams}
			outDuration={queueItem.item.outDuration}
			easeType={queueItem.item.easeType}
			easeOutType={queueItem.item.easeOutType}
			zIndex={queueItem.zIndex}
			clickable={queueItem.item.clickable}
			injClass={queueItem.item.injClass}
			onclose={() => handleAlertClose(queueItem.item.id)}
		/>
	</div>
{/each}

<!-- Dialog 单例 -->
<!-- Dialog singleton -->
{#if feedbackState.dialogProps && feedbackState.dialogVisible}
	<Dialog
		visible={feedbackState.dialogVisible}
		title={feedbackState.dialogProps.title}
		titleAlign={feedbackState.dialogProps.titleAlign}
		content={feedbackState.dialogProps.content}
		popup={feedbackState.dialogProps.popup}
		showIcon={feedbackState.dialogProps.showIcon}
		icon={feedbackState.dialogProps.icon}
		btnStyle={feedbackState.dialogProps.btnStyle}
		primaryText={feedbackState.dialogProps.primaryText}
		primaryButton={feedbackState.dialogProps.primaryButton}
		secondaryText={feedbackState.dialogProps.secondaryText}
		secondaryButton={feedbackState.dialogProps.secondaryButton}
		btnRatio={feedbackState.dialogProps.btnRatio}
		btnReverse={feedbackState.dialogProps.btnReverse}
		secondaryClose={feedbackState.dialogProps.secondaryClose}
		btnGap={feedbackState.dialogProps.btnGap}
		onprimary={handleDialogPrimary}
		onsecondary={handleDialogSecondary}
		onclose={handleDialogClose}
	/>
{/if}

<!-- Modal 单例 -->
<!-- Modal singleton -->
{#if feedbackState.modalProps && feedbackState.modalVisible}
	<Modal
		visible={feedbackState.modalVisible}
		title={feedbackState.modalProps.title}
		titleAlign={feedbackState.modalProps.titleAlign}
		content={feedbackState.modalProps.content}
		popup={feedbackState.modalProps.popup}
		showIcon={feedbackState.modalProps.showIcon}
		icon={feedbackState.modalProps.icon}
		showBtn={feedbackState.modalProps.showBtn}
		btnText={feedbackState.modalProps.btnText}
		button={feedbackState.modalProps.button}
		onclose={handleModalClose}
	/>
{/if}

<!-- Loading 全局遮罩 -->
<!-- Loading global mask -->
{#if feedbackState.loadingVisible}
	<Mask visible={true} opacity="0.5" zIndex={2000}>
		<div class={loadingContainerClass}>
			<Loading
				type={loadingRenderProps.type}
				height={loadingRenderProps.height}
				width={loadingRenderProps.width}
				theme={loadingRenderProps.theme}
				inverse={loadingRenderProps.inverse}
				customColor={loadingRenderProps.customColor}
			/>
			{#if feedbackState.loadingMessage}
				<div class={loadingMessageClass}>
					{feedbackState.loadingMessage}
				</div>
			{/if}
		</div>
	</Mask>
{/if}
