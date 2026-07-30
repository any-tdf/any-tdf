import { useCallback, useEffect, useState } from 'react';
import type { AlertProps } from '../../types';
import Card from '../card';
import Icon from '../icon';
import { SvgIcon } from '../utils/SvgIcon';
import {
	resolveAlertCloseFlow,
	resolveAlertDerived,
	resolveAlertInitialRendered,
	resolveAlertInitialVisible,
	resolveAlertOutroEndAction,
	resolveAlertRenderedState,
	resolveAlertShouldAutoClose,
	resolveAlertStateOptions
} from '@any-tdf/common/derived/alert';
import { closePlainSvg } from '@any-tdf/common/svg/common';
import { Transition as MotionTransition } from '../utils/transition';
import { easingFunctions } from '../utils/easing';
import { resolveMapValue } from '@any-tdf/common/derived/helpers';

const Alert: React.FC<AlertProps> = ({
	visible: visibleProp,
	title = '',
	message = '',
	duration = 3000,
	position = 'top',
	py = '20',
	type = null,
	showIcon = true,
	icon = {},
	closable = true,
	inverse = true,
	card = {},
	transitionType = 'fly',
	transitionParams = {},
	outDuration = 300,
	easeType: _easeType = 'cubicOut',
	easeOutType: _easeOutType = 'cubicOut',
	zIndex = 1000,
	clickable = true,
	injClass = '',
	children,
	onClose
}) => {
	const [innerVisible, setInnerVisible] = useState(() => resolveAlertInitialVisible(visibleProp));
	const [rendered, setRendered] = useState(() => resolveAlertInitialRendered(visibleProp));

	const visible = innerVisible;

	useEffect(() => {
		setInnerVisible(resolveAlertInitialVisible(visibleProp));
	}, [visibleProp]);

	const emitClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const requestClose = useCallback(() => {
		// 公共 close flow 只返回关闭和立即收尾意图，事件触发和状态写入留在组件内。
		// Shared close flow only returns close and immediate-completion intent; event dispatch and state writes stay in the component.
		const flow = resolveAlertCloseFlow({
			visible,
			currentRendered: rendered,
			transitionType,
			outDuration
		});
		if (!flow.shouldClose) return;
		setInnerVisible(flow.nextVisible);
		if (flow.shouldEmitClose) {
			setRendered(flow.nextRendered);
			emitClose();
		}
	}, [emitClose, outDuration, rendered, transitionType, visible]);

	useEffect(() => {
		if (visible) {
			setRendered((currentRendered) => resolveAlertRenderedState({ visible, currentRendered, transitionType, outDuration }));
		} else if (rendered) {
			const nextRendered = resolveAlertRenderedState({
				visible,
				currentRendered: rendered,
				transitionType,
				outDuration
			});
			if (!nextRendered) {
				setRendered(nextRendered);
				emitClose();
			}
		}
	}, [emitClose, outDuration, rendered, transitionType, visible]);

	useEffect(() => {
		// 公共 action 只判断是否需要自动关闭，timer 调度和关闭事件留在组件层。
		// Shared action only decides whether auto close is needed; timer scheduling and close events stay in the component layer.
		if (!resolveAlertShouldAutoClose({ visible, duration })) return;
		const timer = setTimeout(() => {
			requestClose();
		}, duration);
		return () => clearTimeout(timer);
	}, [duration, requestClose, visible]);

	// 公共派生层处理 Alert 的 class、过渡参数和纯状态判断，事件留在组件内。
	// Shared derivations cover Alert classes, transition params and pure state decisions; events stay here.
	const alertState = resolveAlertDerived(
		resolveAlertStateOptions({
			easeIn: resolveMapValue(easingFunctions, _easeType, 'cubicOut'),
			easeOut: resolveMapValue(easingFunctions, _easeOutType, 'cubicOut'),
			hasCustomContent: Boolean(children),
			props: {
				cardRadius: card.radius,
				clickable,
				closable,
				icon,
				injClass,
				inverse,
				message,
				outDuration,
				position,
				py,
				showIcon,
				title,
				transitionParams: transitionParams as Record<string, unknown>,
				transitionType,
				type,
				zIndex
			}
		})
	);

	const handleOutroEnd = () => {
		const action = resolveAlertOutroEndAction({ visible, emitClose: true });
		if (!action.shouldComplete) return;
		setRendered(action.nextRendered);
		if (action.shouldEmitClose) emitClose();
	};

	if (!rendered) return null;

	return (
		<MotionTransition
			visible={visible}
			transition={transitionType}
			inParams={alertState.inParams}
			outParams={alertState.outParams}
			className={alertState.containerClass}
			style={alertState.containerStyleValue}
			onOutroEnd={handleOutroEnd}
		>
			<div className={alertState.contentClass}>
				<Card shadow="lg" mx="0" my="0" bg={alertState.cardBg} {...card}>
					<div className={alertState.bodyClass}>
						{alertState.contentState.showTypeIcon && alertState.contentState.typeIcon ? (
							<div className={alertState.contentState.typeIcon.wrapperClass}>
								{/* 公共 SVG 只提供状态图形，Alert 的可见性、事件和过渡仍保留在组件内。 */}
								{/* Shared SVG only provides status shapes; visibility, events, and transitions stay in Alert. */}
								<SvgIcon svg={alertState.contentState.typeIcon.svg} width={24} height={24} />
							</div>
						) : alertState.contentState.showCustomIcon ? (
							<div className={alertState.customIconClass}>
								<Icon size={24} {...icon} />
							</div>
						) : null}

						<div className={alertState.textContentClass}>
							{alertState.contentState.showCustomContent ? (
								typeof children === 'function' ? (
									(children as () => React.ReactNode)()
								) : (
									children
								)
							) : (
								<>
									{alertState.contentState.showTitle ? <div className={alertState.titleClass}>{title}</div> : null}
									{alertState.contentState.showMessage ? <div className={alertState.messageClass}>{message}</div> : null}
								</>
							)}
						</div>

						{alertState.contentState.showClose ? (
							<button type="button" className={alertState.closeButtonClass} onClick={requestClose} aria-label="Close">
								<SvgIcon svg={closePlainSvg} width={18} height={18} />
							</button>
						) : null}
					</div>
				</Card>
			</div>
		</MotionTransition>
	);
};

export default Alert;
