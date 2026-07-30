import type { AlertProps, DialogProps, LoadingProps, ModalProps, ToastProps } from '../../types';
import type {
	AlertFnOptions,
	DialogFnOptions,
	DialogResult,
	LoadingFnOptions,
	ModalFnOptions,
	ModalResult,
	ToastFnOptions
} from '../../types';
import { feedbackState } from './state';
import { zh_CN, type LangProps } from '../../lang';
import {
	resolveFeedbackDialogConfirmOptions,
	resolveFeedbackDialogResultAction,
	resolveFeedbackLoadingHideAction,
	resolveFeedbackLoadingShowAction,
	resolveFeedbackModalInfoOptions,
	resolveFeedbackModalResultAction,
	resolveFeedbackQueueHideAction,
	resolveFeedbackQueueShowAction,
	resolveFeedbackTypedShortcutOptions
} from '@any-tdf/common/derived/feedback';

type ToastOptions = Omit<ToastProps, 'visible' | 'children'>;

const showToast = (options: ToastOptions | string): string => {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction({ queue: feedbackState.toastQueue, id, options });
	feedbackState.setToastQueue(action.nextQueue);
	return id;
};

const hideToast = (id?: string): void => {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.toastQueue, id });
	if (action.shouldUpdate) feedbackState.setToastQueue(action.nextQueue);
};

const clearAllToasts = (): void => {
	feedbackState.setToastQueue([]);
};

export const toast = Object.assign(showToast, {
	success: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast(resolveFeedbackTypedShortcutOptions({ message, type: 'success', options })),
	error: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast(resolveFeedbackTypedShortcutOptions({ message, type: 'error', options })),
	warning: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast(resolveFeedbackTypedShortcutOptions({ message, type: 'warning', options })),
	info: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast(resolveFeedbackTypedShortcutOptions({ message, type: 'info', options })),
	loading: (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) =>
		showToast(resolveFeedbackTypedShortcutOptions({ message, type: 'loading', duration: 0, options })),
	hide: hideToast,
	clear: clearAllToasts
});

type AlertOptions = Omit<AlertProps, 'visible' | 'children'>;

const showAlertFn = (options: AlertOptions | string): string => {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction({ queue: feedbackState.alertQueue, id, options });
	feedbackState.setAlertQueue(action.nextQueue);
	return id;
};

const hideAlert = (id?: string): void => {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.alertQueue, id });
	if (action.shouldUpdate) feedbackState.setAlertQueue(action.nextQueue);
};

const clearAllAlerts = (): void => {
	feedbackState.setAlertQueue([]);
};

export const showAlert = Object.assign(showAlertFn, {
	success: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn(resolveFeedbackTypedShortcutOptions({ message, type: 'success', options })),
	error: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn(resolveFeedbackTypedShortcutOptions({ message, type: 'error', options })),
	warning: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn(resolveFeedbackTypedShortcutOptions({ message, type: 'warning', options })),
	info: (message: string, options?: Omit<AlertOptions, 'message' | 'type'>) =>
		showAlertFn(resolveFeedbackTypedShortcutOptions({ message, type: 'info', options })),
	hide: hideAlert,
	clear: clearAllAlerts
});

type DialogOptions = Omit<DialogProps, 'visible' | 'onPrimary' | 'onSecondary' | 'onClose' | 'contentChild' | 'primaryChild'>;

const showDialog = (options: DialogOptions): Promise<DialogResult> => {
	return new Promise((resolve) => {
		feedbackState.setDialogState(
			true,
			{
				...options,
				onPrimary: () => {
					const action = resolveFeedbackDialogResultAction('primary');
					feedbackState.setDialogState(action.nextVisible, null);
					if (action.shouldResolve) resolve(action.result);
				},
				onSecondary: () => {
					const action = resolveFeedbackDialogResultAction('secondary');
					feedbackState.setDialogState(action.nextVisible, null);
					if (action.shouldResolve) resolve(action.result);
				},
				onClose: () => {
					const action = resolveFeedbackDialogResultAction('close');
					feedbackState.setDialogState(action.nextVisible, null);
					if (action.shouldResolve) resolve(action.result);
				}
			},
			resolve
		);
	});
};

const closeDialog = (): void => {
	const action = resolveFeedbackDialogResultAction('close');
	feedbackState.setDialogState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
};

export const dialog = Object.assign(showDialog, {
	confirm: (content: string, title?: string): Promise<boolean> => {
		const currentLang = feedbackState.lang || zh_CN;
		return showDialog(
			resolveFeedbackDialogConfirmOptions({
				content,
				title,
				defaults: currentLang.dialog
			})
		).then((result) => result === 'primary');
	},
	close: closeDialog
});

type ModalOptions = Omit<ModalProps, 'visible' | 'onClose' | 'contentChild'>;

const showModal = (options: ModalOptions): Promise<ModalResult> => {
	return new Promise((resolve) => {
		feedbackState.setModalState(
			true,
			{
				...options,
				onClose: () => {
					const action = resolveFeedbackModalResultAction('close');
					feedbackState.setModalState(action.nextVisible, null);
					if (action.shouldResolve) resolve(action.result);
				}
			},
			resolve
		);
	});
};

const closeModal = (): void => {
	const action = resolveFeedbackModalResultAction('close');
	feedbackState.setModalState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
};

export const modal = Object.assign(showModal, {
	info: (content: string, title?: string): Promise<ModalResult> => {
		const currentLang = feedbackState.lang || zh_CN;
		return showModal(
			resolveFeedbackModalInfoOptions({
				content,
				title,
				defaults: currentLang.modal
			})
		);
	},
	close: closeModal
});

type LoadingOptions = Partial<LoadingProps> & { message?: string };

const showLoading = (options?: LoadingOptions | string): void => {
	const action = resolveFeedbackLoadingShowAction<LoadingProps>(options);
	feedbackState.setLoadingState(action.nextVisible, action.props, action.message);
};

const hideLoading = (): void => {
	const action = resolveFeedbackLoadingHideAction<LoadingProps>();
	feedbackState.setLoadingState(action.nextVisible, action.props, action.message);
};

export const loading = {
	show: showLoading,
	hide: hideLoading
};

export function setFeedbackLang(lang: LangProps): void {
	feedbackState.setLang(lang);
}

export { feedbackState };

export type {
	ToastFnOptions,
	AlertFnOptions,
	DialogFnOptions,
	ModalFnOptions,
	LoadingFnOptions,
	ToastOptions,
	AlertOptions,
	DialogOptions,
	ModalOptions,
	DialogResult,
	ModalResult
};

export { default as Feedback } from './Feedback';

export { default } from './Feedback';
