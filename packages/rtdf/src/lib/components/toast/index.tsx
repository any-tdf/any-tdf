import { useEffect, useState } from 'react';
import type { ToastProps } from '../../types';
import Mask from '../mask';
import Icon from '../icon';
import Loading from '../loading';
import { SvgIcon } from '../utils/SvgIcon';
import {
	resolveToastDerived,
	resolveToastInitialRendered,
	resolveToastOutroEndAction,
	resolveToastStateOptions,
	resolveToastVisibilityFlow
} from '@any-tdf/common/derived/toast';
import { resolveMapValue, resolveViewportDimension } from '@any-tdf/common/derived/helpers';
import { easingFunctions } from '../utils/easing';
import { Transition as MotionTransition } from '../utils/transition';

const Toast: React.FC<ToastProps> = ({
	message = '',
	visible = false,
	duration = 2000,
	position = 'center',
	py = '0',
	radius = '',
	transitionType = 'scale',
	transitionParams = {},
	outDuration = 0,
	easeType = 'cubicOut',
	easeOutType = 'cubicOut',
	zIndex = 1000,
	type = null,
	mask = {},
	loading = {},
	icon = {},
	clickable = false,
	dynamicFixed = true,
	children,
	onClose
}) => {
	const [innerHeight, setInnerHeight] = useState(
		resolveViewportDimension({
			value: typeof window === 'undefined' ? undefined : window.innerHeight
		})
	);
	const [rendered, setRendered] = useState(() => resolveToastInitialRendered(visible));

	// 公共派生层处理 Toast 的 class、过渡参数和纯渲染状态，计时器与 DOM 监听留在组件内。
	// Shared derivations cover Toast classes, transition params and pure render state; timers and DOM listeners stay here.
	const toastState = resolveToastDerived(
		resolveToastStateOptions({
			easeIn: resolveMapValue(easingFunctions, easeType, 'cubicOut'),
			easeOut: resolveMapValue(easingFunctions, easeOutType, 'cubicOut'),
			innerHeight,
			props: {
				clickable,
				dynamicFixed,
				outDuration,
				position,
				py,
				radius,
				transitionParams: transitionParams as Record<string, unknown>,
				transitionType,
				type,
				zIndex
			}
		})
	);

	// 自动关闭逻辑
	// Auto close logic
	useEffect(() => {
		// 公共 visibility flow 只返回自动关闭计划，timer 和事件触发留在组件内。
		// Shared visibility flow only returns auto-close planning; timers and event dispatch stay in the component.
		const flow = resolveToastVisibilityFlow({ visible, duration });
		if (!flow.shouldScheduleClose) return;
		const timer = setTimeout(() => {
			if (flow.shouldEmitClose) onClose?.();
		}, flow.delayMs);
		return () => clearTimeout(timer);
	}, [visible, duration, onClose]);

	useEffect(() => {
		// 公共 visibility flow 只返回 rendered 同步结果，状态写入留在组件内。
		// Shared visibility flow only returns rendered sync results; state writes stay in the component.
		const flow = resolveToastVisibilityFlow({
			visible,
			currentRendered: rendered,
			transitionType,
			outDuration,
			duration
		});
		if (flow.shouldUpdateRendered) setRendered(flow.nextRendered);
	}, [outDuration, rendered, transitionType, visible]);

	// 处理窗口高度变化
	// Handle window height change
	useEffect(() => {
		if (dynamicFixed) {
			const handleResize = () => {
				setInnerHeight(resolveViewportDimension({ value: window.innerHeight }));
			};

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [dynamicFixed]);

	const getTypeIcon = () => {
		if (toastState.iconFrameState.icon.kind === 'svg') {
			return (
				<SvgIcon svg={toastState.iconFrameState.icon.svg} width={30} height={30} className={toastState.iconFrameState.icon.className} />
			);
		}

		switch (toastState.iconFrameState.icon.kind) {
			case 'loading':
				return <Loading inverse {...loading} />;
			case 'icon':
				return <Icon size={30} {...icon} />;
			default:
				return null;
		}
	};

	if (!rendered) {
		return null;
	}

	return (
		<>
			<Mask visible={visible} clickable={clickable} opacity="0" outDuration={outDuration} {...mask} />

			<div className={toastState.containerClass} style={toastState.containerStyleValue}>
				<MotionTransition
					visible={visible}
					transition={transitionType}
					inParams={toastState.inParams}
					outParams={toastState.outParams}
					className={toastState.transitionClass}
					onOutroEnd={() => {
						const action = resolveToastOutroEndAction({ currentRendered: rendered });
						if (action.shouldUpdateRendered) setRendered(action.nextRendered);
					}}
				>
					<div className={toastState.contentClass}>
						{children ? (
							children
						) : (
							<>
								{toastState.iconFrameState.shouldRender ? <div className="mb-2">{getTypeIcon()}</div> : null}
								<div>{message}</div>
							</>
						)}
					</div>
				</MotionTransition>
			</div>
		</>
	);
};

export default Toast;
