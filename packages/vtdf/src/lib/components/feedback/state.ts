import { reactive } from 'vue';
import type { AlertProps, DialogProps, DialogResult, LoadingProps, ModalProps, ModalResult, ToastProps } from '../../types';
import type { LangProps } from '../../lang';
import { resolveFeedbackId, resolveFeedbackInitialVisible } from '@any-tdf/common/derived/feedback';

export type { DialogResult, ModalResult } from '../../types';

export type ToastItem = Omit<ToastProps, 'visible' | 'children'> & {
	id: string;
	visible: boolean;
};
export type AlertItem = Omit<AlertProps, 'visible' | 'children'> & {
	id: string;
	visible: boolean;
};
export type DialogResolve = (result: DialogResult) => void;
export type ModalResolve = (result: ModalResult) => void;
export type DialogStateProps = Omit<DialogProps, 'visible'>;
export type ModalStateProps = Omit<ModalProps, 'visible'>;

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

	generateId = () => resolveFeedbackId({ counter: ++this.idCounter, timestamp: Date.now() });

	setToastQueue = (queue: ToastItem[]) => {
		this.toastQueue = queue;
	};

	setAlertQueue = (queue: AlertItem[]) => {
		this.alertQueue = queue;
	};

	setDialogState = (visible: boolean, props: DialogStateProps | null, resolve?: DialogResolve | null) => {
		this.dialogVisible = visible;
		this.dialogProps = props;
		this.dialogResolve = resolve || null;
	};

	setModalState = (visible: boolean, props: ModalStateProps | null, resolve?: ModalResolve | null) => {
		this.modalVisible = visible;
		this.modalProps = props;
		this.modalResolve = resolve || null;
	};

	setLoadingState = (visible: boolean, props: Partial<LoadingProps>, message: string) => {
		this.loadingVisible = visible;
		this.loadingProps = props;
		this.loadingMessage = message;
	};

	setLang = (lang: LangProps) => {
		this.lang = lang;
	};
}

export const feedbackState = reactive(new FeedbackState()) as FeedbackState;
