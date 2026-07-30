import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeBaseStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor24Svg } from '@any-tdf/common/svg/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_24: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingStrokeTravelCss({
		scope: 'rtdf_loading_1_24',
		includeTransition: true
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_24">
				<div className={resolveLoadingLayoutClass({ kind: 'center' })}>
					<svg
						className={resolveLoadingLayoutClass({ kind: 'svgOrigin', size })}
						x="0px"
						y="0px"
						viewBox={loadingOneColor24Svg.viewBox}
						preserveAspectRatio="xMidYMid meet"
					>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'opacity-10',
								strokeClass: loadingClassState.strokeClass
							})}
							fill="none"
							style={parseStyle(resolveLoadingOneColorStrokeStyle({ customColor }))}
							strokeWidth={loadingOneColor24Svg.path.strokeWidth}
							pathLength={loadingOneColor24Svg.path.pathLength}
							d={loadingOneColor24Svg.path.d}
						></path>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'car',
								strokeClass: loadingClassState.strokeClass
							})}
							fill="none"
							style={parseStyle(resolveLoadingOneColorStrokeBaseStyle({ customColor, speed }))}
							strokeWidth={loadingOneColor24Svg.path.strokeWidth}
							pathLength={loadingOneColor24Svg.path.pathLength}
							d={loadingOneColor24Svg.path.d}
						></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_24;
