import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingOneColorStrokeTravelStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor25Svg } from '@any-tdf/common/svg/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_25: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingStrokeTravelCss({
		scope: 'rtdf_loading_1_25',
		dasharray: '25, 75',
		includeLineCap: false,
		includeTransition: true
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_25">
				<div className={resolveLoadingLayoutClass({ kind: 'center' })}>
					<svg className={resolveLoadingLayoutClass({ kind: 'svgOriginWillChange', size })} viewBox={loadingOneColor25Svg.viewBox}>
						<rect
							className={resolveLoadingSvgStrokeClass({
								className: loadingOneColor25Svg.trackRect.className,
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeStyle({ customColor }))}
							x={loadingOneColor25Svg.trackRect.x}
							y={loadingOneColor25Svg.trackRect.y}
							fill={loadingOneColor25Svg.trackRect.fill}
							strokeWidth={loadingOneColor25Svg.trackRect.strokeWidth}
							width={loadingOneColor25Svg.trackRect.width}
							height={loadingOneColor25Svg.trackRect.height}
						/>
						<rect
							className={resolveLoadingSvgStrokeClass({
								className: loadingOneColor25Svg.carRect.className,
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeTravelStyle({ customColor, speed }))}
							x={loadingOneColor25Svg.carRect.x}
							y={loadingOneColor25Svg.carRect.y}
							fill={loadingOneColor25Svg.carRect.fill}
							strokeWidth={loadingOneColor25Svg.carRect.strokeWidth}
							width={loadingOneColor25Svg.carRect.width}
							height={loadingOneColor25Svg.carRect.height}
							pathLength={loadingOneColor25Svg.carRect.pathLength}
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_25;
