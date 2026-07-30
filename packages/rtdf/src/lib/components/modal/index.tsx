import type { ModalProps } from '../../types';
import { forwardRef, useState, useEffect } from 'react';
import Popup from '../popup';
import Button from '../button';
import Icon from '../icon';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import {
	resolveModalCloseAction,
	resolveModalConfirmAction,
	resolveModalDerived,
	resolveModalInitialVisible,
	resolveModalStateOptions
} from '@any-tdf/common/derived/modal';
import { splitButtonCallbacks, splitPopupCallbacks } from '@any-tdf/common/derived/props';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			visible = false,
			title: titleProp,
			titleAlign = 'center',
			content: contentProp,
			popup = {},
			showIcon = false,
			icon,
			showBtn = true,
			btnText: btnTextProp,
			button,
			contentChild,
			onClose
		},
		_ref
	) => {
		const { locale } = useConfig();
		const modalLang = locale?.modal || zh_CN.modal;
		const [internalVisible, setInternalVisible] = useState(() => resolveModalInitialVisible(visible));
		const { buttonProps, buttonOnClick } = splitButtonCallbacks(button);
		const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
		// 公共派生层处理 Modal 状态推导，关闭事件和 children 留在组件内。
		// The shared derived layer handles Modal state derivation; close events and children stay in the component.
		const modalState = resolveModalDerived(
			resolveModalStateOptions({
				props: {
					title: titleProp,
					titleAlign,
					content: contentProp,
					btnText: btnTextProp,
					showBtn,
					popup: popupProps,
					showIcon
				},
				defaults: modalLang,
				hasCustomContent: Boolean(contentChild)
			})
		);

		useEffect(() => {
			setInternalVisible(resolveModalInitialVisible(visible));
		}, [visible]);

		// 处理关闭
		// Handle close
		const handleClose = () => {
			// 公共动作函数只返回关闭决策，组件层负责状态写入和事件触发。
			// Shared action function only returns close decisions; the component writes state and fires events.
			const action = resolveModalCloseAction();
			setInternalVisible(action.nextVisible);
			if (action.shouldClose) onClose?.();
		};

		const handlePopupClose = () => {
			handleClose();
			popupOnClose?.();
		};

		const handleButtonClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
			buttonOnClick?.(event);
			const action = resolveModalConfirmAction();
			if (action.shouldClose) {
				setInternalVisible(action.nextVisible);
				onClose?.();
			}
		};

		return (
			<Popup visible={internalVisible} {...modalState.popupProps} onClose={handlePopupClose}>
				<div className={modalState.contentClass}>
					<div className={modalState.titleClass}>{modalState.texts.title}</div>
					{modalState.contentState.showIcon && (
						<div>
							<Icon {...icon} />
						</div>
					)}
					{modalState.contentState.showCustomContent ? (
						<div>{contentChild}</div>
					) : modalState.contentState.showContentText ? (
						<div>{modalState.texts.content}</div>
					) : null}
					{modalState.contentState.showButton && (
						<div>
							<Button size="full" fill="base" state="theme" {...buttonProps} onClick={handleButtonClick}>
								{modalState.texts.btnText}
							</Button>
						</div>
					)}
				</div>
			</Popup>
		);
	}
);

Modal.displayName = 'Modal';

export type { ModalProps } from '../../types';
export default Modal;
