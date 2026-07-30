import Icon from '../icon';
import Popup from '../popup';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import { useEffect, useState } from 'react';
import type { ActionSheetProps, ActionProps } from '../../types';
import {
	resolveActionSheetActionClickFlow,
	resolveActionSheetCancelAction,
	resolveActionSheetCloseAction,
	resolveActionSheetDerived,
	resolveActionSheetInitialVisible,
	resolveActionSheetStateOptions
} from '@any-tdf/common/derived/actionSheet';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';

const ActionSheet: React.FC<ActionSheetProps> = ({
	visible = false,
	title,
	titleAlign = 'center',
	actions = [],
	popup = {},
	showCancel = false,
	cancelText: cancelTextProp,
	actionClosable = true,
	align = 'center',
	onCancel,
	onClickAction,
	onClose
}) => {
	const { locale } = useConfig();
	const actionSheetLang = locale?.actionSheet || zh_CN.actionSheet;
	const [internalVisible, setInternalVisible] = useState(() => resolveActionSheetInitialVisible(visible));
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
	// 公共派生层统一 ActionSheet 的高度、标题、按钮和操作项展示结果，组件层只处理事件和 Popup 绑定。
	// Common derivation unifies ActionSheet height, title, buttons and action item view state; the component layer only handles events and Popup binding.
	const actionSheetState = resolveActionSheetDerived(
		resolveActionSheetStateOptions({
			defaults: actionSheetLang,
			props: { actions, align, cancelText: cancelTextProp, showCancel, title, titleAlign }
		})
	);

	useEffect(() => {
		setInternalVisible(resolveActionSheetInitialVisible(visible));
	}, [visible]);

	// 处理操作项点击
	// Handle action item click
	const handleActionClick = (index: number, action: ActionProps) => {
		// 公共动作函数只返回状态和回调决策，组件层负责写入状态和触发事件。
		// Shared action function only returns state and callback decisions; the component writes state and fires events.
		const clickAction = resolveActionSheetActionClickFlow({ action, actionClosable, index });
		if (!clickAction.shouldSelect) return;
		onClickAction?.(clickAction.index, clickAction.action);
		if (clickAction.closeAction.shouldClose) {
			setInternalVisible(clickAction.closeAction.nextVisible);
			if (clickAction.closeAction.shouldEmitClose) onClose?.();
		}
	};

	// 处理取消按钮点击
	// Handle cancel button click
	const handleCancelClick = () => {
		const action = resolveActionSheetCancelAction();
		setInternalVisible(action.nextVisible);
		if (action.shouldCancel) onCancel?.();
		if (action.shouldClose) onClose?.();
	};

	const handlePopupClose = () => {
		// 公共 close action 只返回可见状态和 close 回调决策，Popup 回调留在组件层。
		// Shared close action only returns visibility and close callback decisions; Popup callbacks stay in the component layer.
		const action = resolveActionSheetCloseAction();
		if (!action.shouldClose) return;
		setInternalVisible(action.nextVisible);
		if (action.shouldEmitClose) {
			onClose?.();
			popupOnClose?.();
		}
	};

	return (
		<Popup
			visible={internalVisible}
			size={0}
			transitionDistance={actionSheetState.transitionDistance}
			{...popupProps}
			onClose={handlePopupClose}
		>
			{actionSheetState.showTitle && <div className={actionSheetState.titleClass}>{title}</div>}

			<div>
				{actionSheetState.actionViewStates.map((actionViewState, index) => {
					const action = actionViewState.action;

					return (
						<div key={index}>
							<button
								type="button"
								onClick={() => handleActionClick(index, action)}
								className={actionViewState.buttonClass}
								disabled={actionViewState.disabled}
							>
								{actionViewState.showIcon && action.icon ? (
									<Icon {...action.icon} state={actionViewState.iconState} injClass={actionViewState.iconInjClass} />
								) : actionViewState.showImage ? (
									<div className={actionViewState.imageClass}>
										<img className={actionViewState.imageInnerClass} src={action.imgSrc} alt="" />
									</div>
								) : null}
								<div>
									<div className={actionViewState.contentClass}>{action.content}</div>
									{actionViewState.showDesc ? <div className={actionViewState.descClass}>{action.desc}</div> : null}
								</div>
							</button>
							{actionViewState.showDivider ? <div className={actionViewState.dividerClass}></div> : null}
						</div>
					);
				})}
			</div>

			{showCancel && (
				<>
					<div className={actionSheetState.cancelGapClass} />
					<button type="button" className={actionSheetState.cancelButtonClass} onClick={handleCancelClick}>
						<div>{actionSheetState.cancelText}</div>
					</button>
				</>
			)}
		</Popup>
	);
};

export type { ActionSheetProps } from '../../types';
export default ActionSheet;
