import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
	resolvePopupDerived,
	resolvePopupMaskClickFlow,
	resolvePopupRenderEndAction,
	resolvePopupRenderState,
	resolvePopupStateOptions,
	resolvePopupViewportSize
} from '@any-tdf/common/derived/popup';
import type { PopupProps } from '../../types';
import Mask from '../mask';
import Transition from './Transition';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const getViewportSize = () => {
	if (typeof window === 'undefined') return resolvePopupViewportSize();
	return resolvePopupViewportSize({
		height: window.innerHeight,
		width: window.innerWidth
	});
};

const Popup: React.FC<PopupProps> = ({
	visible = false,
	size = 40,
	position = 'bottom',
	duration = 450,
	outDuration = 240,
	easeType = 'cubicOut',
	easeOutType = 'cubicOut',
	px = '0',
	py = '0',
	mask = {},
	maskClosable = true,
	radiusPosition = 'auto',
	radius = '',
	transitionDistance = 0,
	transparent = false,
	zIndex = 600,
	dynamicFixed = true,
	hideScrollbar = false,
	children,
	onClose,
	onClickMask
}) => {
	const [{ height: innerHeight, width: innerWidth }, setViewportSize] = useState(getViewportSize);
	const [shouldRender, setShouldRender] = useState(() => resolvePopupRenderState({ visible }));
	const handleTransitionEnd = useCallback(() => {
		const action = resolvePopupRenderEndAction();
		setShouldRender(action.nextShouldRender);
	}, []);

	useEffect(() => {
		setShouldRender((currentRender) => resolvePopupRenderState({ visible, outDuration, currentRender }));
	}, [outDuration, visible]);

	useIsomorphicLayoutEffect(() => {
		if (dynamicFixed && visible) {
			setViewportSize(getViewportSize());
		}
	}, [dynamicFixed, visible]);

	// 公共派生层只处理 Popup 状态推导，事件、窗口读取和动画绑定留在组件内。
	// The shared derived layer only handles Popup state derivation; events, window reads and animation bindings stay in the component.
	const popupState = resolvePopupDerived(
		resolvePopupStateOptions({
			innerHeight,
			props: { position, radiusPosition, radius, zIndex, transparent, hideScrollbar }
		})
	);

	// 点击遮罩时派发事件
	// Dispatch events when clicking the mask
	const clickMask = () => {
		mask.onClickMask?.();
		onClickMask?.();
		// 公共流程只返回遮罩点击和关闭决策，事件派发留在组件层。
		// Shared flow only returns mask-click and close decisions; event dispatch stays in the component layer.
		const action = resolvePopupMaskClickFlow({ maskClosable, visible });
		if (action.closeAction.shouldEmitClose) onClose?.();
	};

	// 页面滚动时，动态计算窗口高度
	// Dynamically calculate the window height when the page scrolls
	useEffect(() => {
		if (dynamicFixed) {
			const handleResize = () => {
				setViewportSize(getViewportSize());
			};

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [dynamicFixed]);

	return (
		<>
			<Mask visible={visible} duration={duration} outDuration={outDuration} {...mask} onClickMask={clickMask} />

			{shouldRender && (
				<div className={popupState.wrapperClass} style={popupState.wrapperStyleValue}>
					<Transition
						visible={visible}
						size={size}
						position={position}
						viewportHeight={innerHeight}
						viewportWidth={innerWidth}
						px={px}
						py={py}
						duration={duration}
						outDuration={outDuration}
						easeType={easeType}
						easeOutType={easeOutType}
						transitionDistance={transitionDistance}
						onTransitionEnd={handleTransitionEnd}
					>
						<div className={popupState.panelClass}>{children}</div>
					</Transition>
				</div>
			)}

			{hideScrollbar && <style>{popupState.css}</style>}
		</>
	);
};

export default Popup;
