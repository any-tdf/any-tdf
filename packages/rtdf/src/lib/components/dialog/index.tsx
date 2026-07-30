import type { ButtonProps, DialogProps } from '../../types';
import { forwardRef, useState, useEffect, type MouseEvent } from 'react';
import Popup from '../popup';
import Button from '../button';
import Icon from '../icon';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import {
	resolveDialogCloseAction,
	resolveDialogDerived,
	resolveDialogInitialVisible,
	resolveDialogPrimaryAction,
	resolveDialogSecondaryFlow,
	resolveDialogStateOptions
} from '@any-tdf/common/derived/dialog';
import { splitButtonCallbacks, splitPopupCallbacks } from '@any-tdf/common/derived/props';

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(
		{
			visible = false,
			title,
			titleAlign = 'center',
			content,
			popup = {},
			showIcon = false,
			icon = {},
			btnStyle = 'button',
			primaryText,
			primaryButton,
			secondaryText,
			secondaryButton,
			btnRatio = [1, 1],
			btnReverse = false,
			secondaryClose = true,
			btnGap = '2',
			onSecondary,
			onPrimary,
			onClose,
			contentChild,
			primaryChild
		},
		_ref
	) => {
		const { locale } = useConfig();
		const dialogLang = locale?.dialog || zh_CN.dialog;
		const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
		// 公共派生层处理 Dialog 状态推导，事件与 children 留在组件内。
		// The shared derived layer handles Dialog state derivation; events and children stay in the component.
		const dialogState = resolveDialogDerived(
			resolveDialogStateOptions({
				defaults: dialogLang,
				hasCustomContent: Boolean(contentChild),
				hasPrimaryCustomContent: Boolean(primaryChild),
				props: {
					btnGap,
					btnRatio,
					btnReverse,
					btnStyle,
					content,
					popup: popupProps,
					primaryText,
					secondaryText,
					showIcon,
					title,
					titleAlign
				}
			})
		);

		const [internalVisible, setInternalVisible] = useState(() => resolveDialogInitialVisible(visible));

		useEffect(() => {
			setInternalVisible(resolveDialogInitialVisible(visible));
		}, [visible]);

		const handleClose = () => {
			// 公共动作函数只返回关闭决策，组件层负责状态写入和事件触发。
			// Shared action function only returns close decisions; the component writes state and fires events.
			const action = resolveDialogCloseAction();
			setInternalVisible(action.nextVisible);
			if (action.shouldClose) onClose?.();
		};

		const handlePopupClose = () => {
			handleClose();
			popupOnClose?.();
		};

		// 渲染按钮样式
		// Render button style
		const renderButton = (
			type: 'primary' | 'secondary',
			text: string,
			buttonConfig: ButtonProps | undefined,
			onClick: () => void,
			child?: React.ReactNode
		) => {
			const { buttonProps, buttonOnClick } = splitButtonCallbacks(buttonConfig);
			const buttonState = type === 'primary' ? dialogState.primaryButtonState : dialogState.secondaryButtonState;
			const handleClick = (event?: MouseEvent<HTMLButtonElement>) => {
				buttonOnClick?.(event);
				onClick();
			};

			return (
				<Button
					key={type}
					{...buttonProps}
					size="full"
					fill={buttonState.fill}
					heightIn={buttonState.heightIn}
					injClass={buttonState.injClass}
					onClick={handleClick}
				>
					{child || text}
				</Button>
			);
		};

		return (
			<Popup visible={internalVisible} {...dialogState.popupProps} onClose={handlePopupClose}>
				<div className={dialogState.panelClass}>
					<div className={dialogState.titleClass}>{dialogState.texts.title}</div>
					{dialogState.contentState.showIcon ? (
						<div>
							<Icon {...icon} />
						</div>
					) : null}
					<div>
						{dialogState.contentState.showCustomContent
							? contentChild
							: dialogState.contentState.showContentText
								? dialogState.texts.content
								: null}
					</div>
					<div className={dialogState.buttonRowClass}>
						<div className={dialogState.secondarySideClass} style={dialogState.secondarySideStyleValue}>
							{renderButton('secondary', dialogState.texts.secondaryText, secondaryButton, () => {
								const action = resolveDialogSecondaryFlow({ secondaryClose });
								if (action.closeAction) {
									setInternalVisible(action.closeAction.nextVisible);
									if (action.closeAction.shouldClose) onClose?.();
								}
								if (action.shouldSecondary) onSecondary?.();
							})}
						</div>
						<div className={dialogState.primarySideClass} style={dialogState.primarySideStyleValue}>
							{renderButton(
								'primary',
								dialogState.texts.primaryText,
								primaryButton,
								() => {
									const action = resolveDialogPrimaryAction();
									if (action.shouldPrimary) onPrimary?.();
								},
								dialogState.contentState.showPrimaryCustomContent ? primaryChild : undefined
							)}
						</div>
					</div>
				</div>
			</Popup>
		);
	}
);

Dialog.displayName = 'Dialog';

export type { DialogProps } from '../../types';
export default Dialog;
