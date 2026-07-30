import type { ProgressLoopProps } from '../../types';
import { forwardRef, useRef } from 'react';
import {
	resolveProgressLoopDerived,
	resolveProgressLoopGradientIdSuffix,
	resolveProgressLoopStateOptions
} from '@any-tdf/common/derived/progressLoop';
import { progressLoopSvg } from '@any-tdf/common/svg/progressLoop';

const ProgressLoop = forwardRef<HTMLDivElement, ProgressLoopProps>(
	(
		{
			percent = 66,
			strokeWidth = 2,
			butt = false,
			reverse = false,
			duration = '300',
			gradient = null,
			children,
			injClass = '',
			trackInjClass = ''
		},
		ref
	) => {
		// 随机源留在组件层，渐变 ID 后缀规则由公共派生层统一。
		// Random source stays in the component layer, while shared derivations own the gradient ID suffix rule.
		const gradientIdSuffix = useRef(resolveProgressLoopGradientIdSuffix({ random: Math.random() })).current;

		// 输入组件状态，返回框架无关的 SVG 数学、class 和展示文本派生结果。
		// Receive component state and return framework-agnostic SVG math, class and display text derivations.
		const progressLoopState = resolveProgressLoopDerived(
			resolveProgressLoopStateOptions({
				props: { percent, strokeWidth, butt, reverse, duration, gradient, injClass, trackInjClass },
				gradientIdSuffix
			})
		);

		return (
			<div ref={ref} className={progressLoopState.rootClass}>
				<svg viewBox={progressLoopSvg.viewBox} className={progressLoopState.svgClass}>
					<circle
						cx={progressLoopSvg.center}
						cy={progressLoopSvg.center}
						r={progressLoopState.radius}
						strokeWidth={strokeWidth}
						fill="none"
						className={progressLoopState.trackClass}
					/>
					{progressLoopState.gradientStopStyles ? (
						<defs>
							<linearGradient id={progressLoopState.gradientId}>
								<stop offset="0%" style={progressLoopState.gradientStopStyles.startStyle} />
								<stop offset="100%" style={progressLoopState.gradientStopStyles.endStyle} />
							</linearGradient>
						</defs>
					) : null}
					<circle
						cx={progressLoopSvg.center}
						cy={progressLoopSvg.center}
						r={progressLoopState.radius}
						strokeWidth={strokeWidth}
						className={progressLoopState.barClass}
						fill="none"
						strokeDashoffset={progressLoopState.dashOffset}
						strokeDasharray={progressLoopState.circleLength}
						strokeLinecap={progressLoopState.lineCap}
						stroke={progressLoopState.strokeValue}
					/>
				</svg>
				<div className={progressLoopState.labelClass}>
					{children ? children : <div className={progressLoopState.percentTextClass}>{progressLoopState.percentText}</div>}
				</div>
			</div>
		);
	}
);

ProgressLoop.displayName = 'ProgressLoop';

export default ProgressLoop;
