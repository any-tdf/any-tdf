import { useEffect, useState } from 'react';
import { zh_CN } from '../../lang';
import Alert from '../alert';
import Dialog from '../dialog';
import Loading from '../loading';
import Mask from '../mask';
import Modal from '../modal';
import Toast from '../toast';
import { useConfig } from '../config-provider';
import { feedbackState } from './state';
import {
	removeFeedbackQueueItemById,
	resolveFeedbackAlertQueueViewItems,
	resolveFeedbackDialogResultAction,
	resolveFeedbackLoadingContainerClass,
	resolveFeedbackLoadingMessageClass,
	resolveFeedbackLoadingRenderProps,
	resolveFeedbackModalResultAction,
	resolveFeedbackToastQueueViewItems,
	splitFeedbackDialogCallbacks,
	splitFeedbackModalCallbacks
} from '@any-tdf/common/derived/feedback';

const Feedback: React.FC = () => {
	const [, forceRender] = useState(0);
	const { locale } = useConfig();
	const dialogProps = feedbackState.dialogProps;
	const modalProps = feedbackState.modalProps;
	const { dialogProps: dialogRenderProps } = splitFeedbackDialogCallbacks(dialogProps);
	const { modalProps: modalRenderProps } = splitFeedbackModalCallbacks(modalProps);
	const loadingRenderProps = resolveFeedbackLoadingRenderProps(feedbackState.loadingProps);
	const loadingContainerClass = resolveFeedbackLoadingContainerClass();
	const loadingMessageClass = resolveFeedbackLoadingMessageClass();
	const toastQueueItems = resolveFeedbackToastQueueViewItems(feedbackState.toastQueue);
	const alertQueueItems = resolveFeedbackAlertQueueViewItems(feedbackState.alertQueue);

	useEffect(() => {
		const unsubscribe = feedbackState.subscribe(() => forceRender((value) => value + 1));
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		feedbackState.setLang(locale || zh_CN);
	}, [locale]);

	const handleToastClose = (item: (typeof feedbackState.toastQueue)[number]) => {
		item.onClose?.();
		feedbackState.setToastQueue(removeFeedbackQueueItemById(feedbackState.toastQueue, item.id));
	};

	const handleAlertClose = (item: (typeof feedbackState.alertQueue)[number]) => {
		item.onClose?.();
		feedbackState.setAlertQueue(removeFeedbackQueueItemById(feedbackState.alertQueue, item.id));
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

	const handleModalClose = () => {
		const action = resolveFeedbackModalResultAction('close');
		feedbackState.setModalState(action.nextVisible, null);
		if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
	};

	const handleModalConfirm = (event?: React.MouseEvent<HTMLButtonElement>) => {
		const userButton = feedbackState.modalProps?.button;
		userButton?.onClick?.(event);
		const action = resolveFeedbackModalResultAction('confirm');
		feedbackState.setModalState(action.nextVisible, null);
		if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
	};

	// 公共派生层处理队列堆叠和弹层结果动作，队列写入和回调触发留在组件内。
	// Shared derived layer handles queue stacking and overlay result actions; queue writes and callbacks stay in the component.

	return (
		<>
			{toastQueueItems.map((queueItem) => (
				<div key={queueItem.key} style={queueItem.styleValue}>
					<Toast {...queueItem.item} zIndex={queueItem.zIndex} onClose={() => handleToastClose(queueItem.item)} />
				</div>
			))}

			{alertQueueItems.map((queueItem) => (
				<div key={queueItem.key} style={queueItem.styleValue}>
					<Alert {...queueItem.item} zIndex={queueItem.zIndex} onClose={() => handleAlertClose(queueItem.item)} />
				</div>
			))}

			{dialogProps && feedbackState.dialogVisible ? (
				<Dialog
					{...dialogRenderProps}
					visible={feedbackState.dialogVisible}
					onPrimary={handleDialogPrimary}
					onSecondary={handleDialogSecondary}
					onClose={handleDialogClose}
				/>
			) : null}

			{modalProps && feedbackState.modalVisible ? (
				<Modal
					{...modalRenderProps}
					visible={feedbackState.modalVisible}
					button={{ ...modalProps.button, onClick: handleModalConfirm }}
					onClose={handleModalClose}
				/>
			) : null}

			{feedbackState.loadingVisible ? (
				<Mask visible opacity="0.5" zIndex={2000}>
					<div className={loadingContainerClass}>
						<Loading
							type={loadingRenderProps.type}
							height={loadingRenderProps.height}
							width={loadingRenderProps.width}
							theme={loadingRenderProps.theme}
							inverse={loadingRenderProps.inverse}
							customColor={loadingRenderProps.customColor}
						/>
						{feedbackState.loadingMessage ? <div className={loadingMessageClass}>{feedbackState.loadingMessage}</div> : null}
					</div>
				</Mask>
			) : null}
		</>
	);
};

export default Feedback;
