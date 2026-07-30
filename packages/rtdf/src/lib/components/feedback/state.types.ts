import type { AlertProps, DialogProps, DialogResult, ModalProps, ModalResult, ToastProps } from '../../types';

export type { DialogResult, ModalResult } from '../../types';

export type ToastItem = Omit<ToastProps, 'children'> & {
	id: string;
	visible: boolean;
};

export type AlertItem = Omit<AlertProps, 'children'> & {
	id: string;
	visible: boolean;
};

export type DialogResolve = (result: DialogResult) => void;
export type ModalResolve = (result: ModalResult) => void;

export type DialogStateProps = Omit<DialogProps, 'visible' | 'contentChild' | 'primaryChild'>;
export type ModalStateProps = Omit<ModalProps, 'visible' | 'contentChild'>;
