import type { ToastProps, DialogProps, DialogResult, ModalProps, ModalResult, AlertProps } from '../../types/index.js';

export type { DialogResult, ModalResult } from '../../types/index.js';

// Toast 队列项类型
// Toast queue item type
export type ToastItem = Omit<ToastProps, 'children'> & {
	id: string;
	visible: boolean;
};

// Alert 队列项类型
// Alert queue item type
export type AlertItem = Omit<AlertProps, 'children'> & {
	id: string;
	visible: boolean;
};

// Dialog Promise resolve 函数类型
// Dialog Promise resolve function type
export type DialogResolve = (result: DialogResult) => void;

// Modal Promise resolve 函数类型
// Modal Promise resolve function type
export type ModalResolve = (result: ModalResult) => void;

// Dialog 状态类型
// Dialog state type
export type DialogStateProps = Omit<DialogProps, 'visible' | 'contentChild' | 'primaryChild'>;

// Modal 状态类型
// Modal state type
export type ModalStateProps = Omit<ModalProps, 'visible' | 'contentChild'>;
