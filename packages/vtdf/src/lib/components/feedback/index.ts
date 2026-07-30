import type {
	AlertFnOptions,
	DialogFnOptions,
	DialogResult,
	LoadingFnOptions,
	LoadingProps,
	ModalFnOptions,
	ModalResult,
	ToastFnOptions
} from '../../types';
import { zh_CN, type LangProps } from '../../lang';
import { feedbackState } from './state';
import type { AlertItem, ToastItem } from './state';
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

type ToastOptions = ToastFnOptions;
type AlertOptions = AlertFnOptions;
type LoadingOptions = LoadingFnOptions;

const showToast = (options: ToastOptions | string): string => {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction<ToastOptions, ToastItem>({
		queue: feedbackState.toastQueue,
		id,
		options
	});
	feedbackState.setToastQueue(action.nextQueue);
	return id;
};

const hideToast = (id?: string) => {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.toastQueue, id });
	if (action.shouldUpdate) feedbackState.setToastQueue(action.nextQueue);
};

const clearAllToasts = () => {
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

const showAlertFn = (options: AlertOptions | string): string => {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction<AlertOptions, AlertItem>({
		queue: feedbackState.alertQueue,
		id,
		options
	});
	feedbackState.setAlertQueue(action.nextQueue);
	return id;
};

const hideAlert = (id?: string) => {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.alertQueue, id });
	if (action.shouldUpdate) feedbackState.setAlertQueue(action.nextQueue);
};

const clearAllAlerts = () => {
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

const showDialog = (options: DialogFnOptions): Promise<DialogResult> =>
	new Promise((resolve) => {
		feedbackState.setDialogState(true, options, resolve);
	});

const closeDialog = () => {
	const action = resolveFeedbackDialogResultAction('close');
	feedbackState.setDialogState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
};

export const dialog = Object.assign(showDialog, {
	confirm: (content: string, title?: string): Promise<boolean> => {
		const lang = feedbackState.lang || zh_CN;
		return showDialog(
			resolveFeedbackDialogConfirmOptions({
				content,
				title,
				defaults: lang.dialog,
				emptyTitleFallback: true
			})
		).then((result) => result === 'primary');
	},
	close: closeDialog
});

const showModal = (options: ModalFnOptions): Promise<ModalResult> =>
	new Promise((resolve) => {
		feedbackState.setModalState(true, options, resolve);
	});

const closeModal = () => {
	const action = resolveFeedbackModalResultAction('close');
	feedbackState.setModalState(action.nextVisible, null);
	if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
};

export const modal = Object.assign(showModal, {
	info: (content: string, title?: string): Promise<ModalResult> => {
		const lang = feedbackState.lang || zh_CN;
		return showModal(
			resolveFeedbackModalInfoOptions({
				content,
				title,
				defaults: lang.modal,
				emptyTitleFallback: true
			})
		);
	},
	close: closeModal
});

const showLoading = (options?: LoadingOptions | string) => {
	const action = resolveFeedbackLoadingShowAction<LoadingProps>(options);
	feedbackState.setLoadingState(action.nextVisible, action.props, action.message);
};

const hideLoading = () => {
	const action = resolveFeedbackLoadingHideAction<LoadingProps>();
	feedbackState.setLoadingState(action.nextVisible, action.props, action.message);
};

export const loading = {
	show: showLoading,
	hide: hideLoading
};

export const setFeedbackLang = (lang: LangProps) => {
	feedbackState.setLang(lang);
};

export { feedbackState };
export type { AlertFnOptions, DialogFnOptions, DialogResult, LoadingFnOptions, ModalFnOptions, ModalResult, ToastFnOptions };
