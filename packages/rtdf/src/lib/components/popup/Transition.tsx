import { useMemo } from 'react';
import type React from 'react';
import { resolvePopupTransitionDerived, resolvePopupTransitionStateOptions } from '@any-tdf/common/derived/popup';
import { resolveMapValue } from '@any-tdf/common/derived/helpers';
import { Transition as MotionTransition } from '../utils/transition';
import { easingFunctions, type EasingProps } from '../utils/easing';

export interface TransitionProps {
	visible?: boolean;
	size?: number;
	position?: string;
	viewportHeight?: number;
	viewportWidth?: number;
	px?: string;
	py?: string;
	duration?: number;
	outDuration?: number;
	easeType?: EasingProps;
	easeOutType?: EasingProps;
	transitionDistance?: number;
	children?: React.ReactNode;
	onTransitionEnd?: () => void;
}

const PopupTransition: React.FC<TransitionProps> = ({
	visible = false,
	size = 40,
	position = 'bottom',
	viewportHeight,
	viewportWidth,
	px = '0',
	py = '0',
	duration = 450,
	outDuration = 240,
	easeType = 'cubicOut',
	easeOutType = 'cubicOut',
	transitionDistance = 0,
	children,
	onTransitionEnd
}) => {
	// 公共派生层给出尺寸、class、位移和过渡类型，组件层只绑定动画组件。
	// The shared derived layer provides size, classes, offsets and transition type; this component only binds the animation component.
	const transitionState = useMemo(
		() =>
			resolvePopupTransitionDerived(
				resolvePopupTransitionStateOptions({
					props: {
						position,
						size,
						transitionDistance,
						px,
						py,
						duration,
						outDuration,
						easing: resolveMapValue(easingFunctions, easeType, 'cubicOut'),
						outEasing: resolveMapValue(easingFunctions, easeOutType, 'cubicOut')
					},
					viewportHeight,
					viewportWidth
				})
			),
		[duration, easeOutType, easeType, outDuration, position, px, py, size, transitionDistance, viewportHeight, viewportWidth]
	);

	return (
		<MotionTransition
			visible={visible}
			transition={transitionState.transitionName}
			inParams={transitionState.inParams}
			outParams={transitionState.outParams}
			className={transitionState.transitionClass}
			style={transitionState.sizeStyleValue as React.CSSProperties}
			onOutroEnd={onTransitionEnd}
		>
			{children}
		</MotionTransition>
	);
};

export default PopupTransition;
