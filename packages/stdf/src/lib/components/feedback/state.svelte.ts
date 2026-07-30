/**
 * 全局反馈组件状态管理
 * Global feedback component state management
 */

import type { ToastItem, AlertItem, DialogResolve, ModalResolve, DialogStateProps, ModalStateProps } from './state.types.js';
import type { LangProps } from '../../lang/index.js';
import type { LoadingProps } from '../../types/index.js';
import { resolveFeedbackId, resolveFeedbackInitialVisible, resolveFeedbackResetVisibilityState } from '@any-tdf/common/derived/feedback';

/**
 * 全局反馈状态类
 * Global feedback state class
 */
class FeedbackState {
	// Toast 队列
	// Toast queue
	toastQueue: ToastItem[] = $state([]);

	// Alert 队列
	// Alert queue
	alertQueue: AlertItem[] = $state([]);

	// Dialog 状态
	// Dialog state
	dialogVisible = $state(resolveFeedbackInitialVisible());
	dialogProps: DialogStateProps | null = $state(null);
	dialogResolve: DialogResolve | null = null;

	// Modal 状态
	// Modal state
	modalVisible = $state(resolveFeedbackInitialVisible());
	modalProps: ModalStateProps | null = $state(null);
	modalResolve: ModalResolve | null = null;

	// Loading 状态
	// Loading state
	loadingVisible = $state(resolveFeedbackInitialVisible());
	loadingProps: Partial<LoadingProps> = $state({});
	loadingMessage = $state('');

	// 语言配置
	// Language configuration
	lang: LangProps | null = $state(null);

	// ID 计数器
	// ID counter
	idCounter = 0;

	/**
	 * 生成唯一 ID
	 * Generate unique ID
	 */
	generateId() {
		return resolveFeedbackId({ counter: ++this.idCounter, timestamp: Date.now() });
	}

	/**
	 * 重置所有状态
	 * Reset all states
	 */
	reset() {
		const visibilityState = resolveFeedbackResetVisibilityState();
		this.toastQueue = [];
		this.alertQueue = [];
		this.dialogVisible = visibilityState.dialogVisible;
		this.dialogProps = null;
		this.dialogResolve = null;
		this.modalVisible = visibilityState.modalVisible;
		this.modalProps = null;
		this.modalResolve = null;
		this.loadingVisible = visibilityState.loadingVisible;
		this.loadingProps = {};
		this.loadingMessage = '';
	}
}

// 导出全局单例
// Export global singleton
export const feedbackState = new FeedbackState();
