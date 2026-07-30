/**
 * 全局反馈组件函数式 API
 * Global feedback component functional API
 */

import { feedbackState } from './state.svelte.js';
import type { DialogResult, ModalResult } from './state.types.js';
import type { ToastProps, DialogProps, ModalProps, AlertProps, LoadingProps } from '../../types/index.js';
import { zh_CN, type LangProps } from '../../lang/index.js';
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

// ==================== Toast API ====================

type ToastOptions = Omit<ToastProps, 'visible' | 'children'>;

/**
 * 显示 Toast 提示
 * Show Toast message
 */
function showToast(options: ToastOptions | string): string {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction({ queue: feedbackState.toastQueue, id, options });

	feedbackState.toastQueue = action.nextQueue;

	return id;
}

/**
 * 隐藏指定 Toast
 * Hide specific Toast
 */
function hideToast(id?: string): void {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.toastQueue, id });
	if (action.shouldUpdate) feedbackState.toastQueue = action.nextQueue;
}

/**
 * 清除所有 Toast
 * Clear all Toasts
 */
function clearAllToasts(): void {
	feedbackState.toastQueue = [];
}

/**
 * Toast 函数式 API
 * Toast functional API
 */
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

// ==================== Alert API ====================

type AlertOptions = Omit<AlertProps, 'visible' | 'children'>;

/**
 * 显示 Alert 提示
 * Show Alert message
 */
function showAlertFn(options: AlertOptions | string): string {
	const id = feedbackState.generateId();
	const action = resolveFeedbackQueueShowAction({ queue: feedbackState.alertQueue, id, options });

	feedbackState.alertQueue = action.nextQueue;

	return id;
}

/**
 * 隐藏指定 Alert
 * Hide specific Alert
 */
function hideAlert(id?: string): void {
	const action = resolveFeedbackQueueHideAction({ queue: feedbackState.alertQueue, id });
	if (action.shouldUpdate) feedbackState.alertQueue = action.nextQueue;
}

/**
 * 清除所有 Alert
 * Clear all Alerts
 */
function clearAllAlerts(): void {
	feedbackState.alertQueue = [];
}

/**
 * Alert 函数式 API（使用 showAlert 避免与 window.alert 冲突）
 * Alert functional API (use showAlert to avoid conflict with window.alert)
 */
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

// ==================== Dialog API ====================

type DialogOptions = Omit<DialogProps, 'visible' | 'onprimary' | 'onsecondary' | 'onclose' | 'contentChild' | 'primaryChild'>;

/**
 * 显示 Dialog 对话框
 * Show Dialog
 */
function showDialog(options: DialogOptions): Promise<DialogResult> {
	return new Promise((resolve) => {
		feedbackState.dialogProps = {
			...options,
			onprimary: () => {
				const action = resolveFeedbackDialogResultAction('primary');
				feedbackState.dialogVisible = action.nextVisible;
				if (action.shouldResolve) resolve(action.result);
			},
			onsecondary: () => {
				const action = resolveFeedbackDialogResultAction('secondary');
				feedbackState.dialogVisible = action.nextVisible;
				if (action.shouldResolve) resolve(action.result);
			},
			onclose: () => {
				const action = resolveFeedbackDialogResultAction('close');
				feedbackState.dialogVisible = action.nextVisible;
				if (action.shouldResolve) resolve(action.result);
			}
		};
		feedbackState.dialogVisible = true;
		feedbackState.dialogResolve = resolve;
	});
}

/**
 * 关闭 Dialog
 * Close Dialog
 */
function closeDialog(): void {
	const action = resolveFeedbackDialogResultAction('close');
	feedbackState.dialogVisible = action.nextVisible;
	if (action.shouldResolve) feedbackState.dialogResolve?.(action.result);
}

/**
 * Dialog 函数式 API
 * Dialog functional API
 */
export const dialog = Object.assign(showDialog, {
	/**
	 * 确认对话框快捷方法
	 * Confirm dialog shortcut
	 */
	confirm: (content: string, title?: string): Promise<boolean> => {
		const currentLang = feedbackState.lang || zh_CN;
		return showDialog(
			resolveFeedbackDialogConfirmOptions({
				content,
				title,
				defaults: currentLang.dialog,
				emptyTitleFallback: true
			})
		).then((result) => result === 'primary');
	},
	close: closeDialog
});

// ==================== Modal API ====================

type ModalOptions = Omit<ModalProps, 'visible' | 'onclose' | 'contentChild'>;

/**
 * 显示 Modal 弹框
 * Show Modal
 */
function showModal(options: ModalOptions): Promise<ModalResult> {
	return new Promise((resolve) => {
		feedbackState.modalProps = {
			...options,
			onclose: () => {
				const action = resolveFeedbackModalResultAction('close');
				feedbackState.modalVisible = action.nextVisible;
				if (action.shouldResolve) resolve(action.result);
			}
		};
		feedbackState.modalVisible = true;
		feedbackState.modalResolve = resolve;
	});
}

/**
 * 关闭 Modal
 * Close Modal
 */
function closeModal(): void {
	const action = resolveFeedbackModalResultAction('close');
	feedbackState.modalVisible = action.nextVisible;
	if (action.shouldResolve) feedbackState.modalResolve?.(action.result);
}

/**
 * Modal 函数式 API
 * Modal functional API
 */
export const modal = Object.assign(showModal, {
	/**
	 * 信息弹框快捷方法
	 * Info modal shortcut
	 */
	info: (content: string, title?: string): Promise<ModalResult> => {
		const currentLang = feedbackState.lang || zh_CN;
		return showModal(
			resolveFeedbackModalInfoOptions({
				content,
				title,
				defaults: currentLang.modal,
				emptyTitleFallback: true
			})
		);
	},
	close: closeModal
});

// ==================== Loading API ====================

type LoadingOptions = Partial<LoadingProps> & { message?: string };

/**
 * 显示 Loading
 * Show Loading
 */
function showLoadingFn(options?: LoadingOptions | string): void {
	const action = resolveFeedbackLoadingShowAction<LoadingProps>(options);
	feedbackState.loadingMessage = action.message;
	feedbackState.loadingProps = action.props;
	feedbackState.loadingVisible = action.nextVisible;
}

/**
 * 隐藏 Loading
 * Hide Loading
 */
function hideLoading(): void {
	feedbackState.loadingVisible = resolveFeedbackLoadingHideAction<LoadingProps>().nextVisible;
}

/**
 * Loading 函数式 API
 * Loading functional API
 */
export const loading = {
	show: showLoadingFn,
	hide: hideLoading
};

// ==================== 配置 API ====================

/**
 * 设置反馈组件语言配置
 * Set feedback component language configuration
 */
export function setFeedbackLang(lang: LangProps): void {
	feedbackState.lang = lang;
}

// 导出状态（供 Feedback 使用）
// Export state (for Feedback)
export { feedbackState };
