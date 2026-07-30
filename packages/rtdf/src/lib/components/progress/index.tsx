import type { ProgressProps } from '../../types';
import { forwardRef } from 'react';
import { resolveProgressDerived, resolveProgressStateOptions } from '@any-tdf/common/derived/progress';

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	(
		{
			percent = 66,
			percentPosition = 'right',
			height = '2',
			radius = '',
			inactive = false,
			overflowPercent = 10,
			duration = '300',
			children,
			injClass = '',
			trackInjClass = ''
		},
		ref
	) => {
		// 公共派生层只处理 Progress 的 class 字符串、样式值和展示文本，children 渲染留在组件内。
		// Shared derived layer only handles Progress classes, style values and display text; children rendering stays in the component.
		const progressState = resolveProgressDerived(
			resolveProgressStateOptions({
				props: {
					percent,
					percentPosition,
					height,
					radius,
					inactive,
					overflowPercent,
					duration,
					injClass,
					trackInjClass
				},
				hasCustomContent: Boolean(children)
			})
		);

		return (
			<div ref={ref} className={progressState.rootClass}>
				<div className={progressState.trackClass}>
					<div className={progressState.barClass} style={progressState.barStyleValue}>
						{progressState.labelState.showInner ? (
							<div className={progressState.innerTextClass}>
								{progressState.labelState.showCustomContent
									? children
									: progressState.labelState.showFallbackText
										? progressState.labelState.text
										: null}
							</div>
						) : null}
					</div>
					{progressState.labelState.showBlock ? (
						<div className={progressState.blockLabelClass} style={progressState.blockLabelStyleValue}>
							{progressState.labelState.showCustomContent
								? children
								: progressState.labelState.showFallbackText
									? progressState.labelState.text
									: null}
						</div>
					) : null}
				</div>
				{progressState.labelState.showRight ? (
					progressState.labelState.showCustomContent ? (
						children
					) : progressState.labelState.showFallbackText ? (
						<div className={progressState.rightLabelClass}>{progressState.labelState.text}</div>
					) : null
				) : null}
			</div>
		);
	}
);

Progress.displayName = 'Progress';

export default Progress;
