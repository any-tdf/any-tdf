import type { MaskProps } from '../../types';
import { useMemo } from 'react';
import { resolveMaskDerived, resolveMaskStateOptions } from '@any-tdf/common/derived/mask';
import { Transition as MotionTransition } from '../utils/transition';

const Mask: React.FC<MaskProps> = ({
	visible = false,
	opacity = '0.5',
	clickable = false,
	inverse = false,
	backdropBlur = 'none',
	duration = 150,
	outDuration = 0,
	zIndex = 500,
	children,
	onClickMask
}) => {
	// 公共派生层只处理 Mask class、过渡参数和 z-index style，点击事件留在组件层。
	// Shared derivation only handles Mask classes, transition params and z-index style; click events stay in the component layer.
	const maskState = useMemo(
		() =>
			resolveMaskDerived(
				resolveMaskStateOptions({
					props: { opacity, clickable, inverse, backdropBlur, duration, outDuration, zIndex }
				})
			),
		[opacity, clickable, inverse, backdropBlur, duration, outDuration, zIndex]
	);

	return (
		<MotionTransition
			visible={visible}
			as="button"
			type="button"
			transition="fade"
			inParams={maskState.inParams}
			outParams={maskState.outParams}
			onClick={() => {
				onClickMask?.();
			}}
			className={maskState.rootClass}
			style={maskState.zIndexStyleValue}
		>
			{children}
		</MotionTransition>
	);
};

export default Mask;
