import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelFadeCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeSlowStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor38Svg } from '@any-tdf/common/svg/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_38: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingStrokeTravelFadeCss({ scope: 'rtdf_loading_1_38' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_38">
				<div className={resolveLoadingLayoutClass({ kind: 'center', size })}>
					<svg
						className={resolveLoadingLayoutClass({ kind: 'svgFull' })}
						x="0px"
						y="0px"
						viewBox={loadingOneColor38Svg.viewBox}
						height={loadingOneColor38Svg.height}
						width={loadingOneColor38Svg.width}
						preserveAspectRatio="xMidYMid meet"
					>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'track opacity-10',
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeStyle({ customColor }))}
							strokeWidth={loadingOneColor38Svg.path.strokeWidth}
							fill="none"
							pathLength={loadingOneColor38Svg.path.pathLength}
							d={loadingOneColor38Svg.path.d}
						/>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'car',
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeSlowStyle({ customColor, speed }))}
							strokeWidth={loadingOneColor38Svg.path.strokeWidth}
							fill="none"
							pathLength={loadingOneColor38Svg.path.pathLength}
							d={loadingOneColor38Svg.path.d}
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_38;
