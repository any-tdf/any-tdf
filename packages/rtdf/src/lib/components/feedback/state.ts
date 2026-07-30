import type { LoadingProps } from '../../types';
import type { LangProps } from '../../lang';
import type { AlertItem, DialogResolve, DialogStateProps, ModalResolve, ModalStateProps, ToastItem } from './state.types';
import { resolveFeedbackId, resolveFeedbackInitialVisible } from '@any-tdf/common/derived/feedback';

class FeedbackState {
	toastQueue: ToastItem[] = [];
	alertQueue: AlertItem[] = [];
	dialogVisible = resolveFeedbackInitialVisible();
	dialogProps: DialogStateProps | null = null;
	dialogResolve: DialogResolve | null = null;
	modalVisible = resolveFeedbackInitialVisible();
	modalProps: ModalStateProps | null = null;
	modalResolve: ModalResolve | null = null;
	loadingVisible = resolveFeedbackInitialVisible();
	loadingProps: Partial<LoadingProps> = {};
	loadingMessage = '';
	lang: LangProps | null = null;
	idCounter = 0;
	private listeners = new Set<() => void>();

	subscribe(listener: () => void) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify() {
		this.listeners.forEach((listener) => listener());
	}

	generateId() {
		return resolveFeedbackId({ counter: ++this.idCounter, timestamp: Date.now() });
	}

	setToastQueue(queue: ToastItem[]) {
		this.toastQueue = queue;
		this.notify();
	}

	setAlertQueue(queue: AlertItem[]) {
		this.alertQueue = queue;
		this.notify();
	}

	setDialogState(visible: boolean, props: DialogStateProps | null, resolve?: DialogResolve | null) {
		this.dialogVisible = visible;
		this.dialogProps = props;
		this.dialogResolve = resolve || null;
		this.notify();
	}

	setModalState(visible: boolean, props: ModalStateProps | null, resolve?: ModalResolve | null) {
		this.modalVisible = visible;
		this.modalProps = props;
		this.modalResolve = resolve || null;
		this.notify();
	}

	setLoadingState(visible: boolean, props: Partial<LoadingProps>, message: string) {
		this.loadingVisible = visible;
		this.loadingProps = props;
		this.loadingMessage = message;
		this.notify();
	}

	setLang(lang: LangProps) {
		this.lang = lang;
		this.notify();
	}
}

export const feedbackState = new FeedbackState();
