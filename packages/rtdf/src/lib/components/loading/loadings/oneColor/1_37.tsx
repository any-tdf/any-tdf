import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeSlowStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor37Svg } from '@any-tdf/common/svg/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_37: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingStrokeTravelCss({ scope: 'rtdf_loading_1_37' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_37">
				<div className={resolveLoadingLayoutClass({ kind: 'center', size })}>
					<svg
						className={resolveLoadingLayoutClass({ kind: 'svgFull' })}
						x="0px"
						y="0px"
						viewBox={loadingOneColor37Svg.viewBox}
						height={loadingOneColor37Svg.height}
						width={loadingOneColor37Svg.width}
						preserveAspectRatio="xMidYMid meet"
					>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'opacity-10',
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeStyle({ customColor }))}
							fill="none"
							strokeWidth={loadingOneColor37Svg.path.strokeWidth}
							pathLength={loadingOneColor37Svg.path.pathLength}
							d={loadingOneColor37Svg.path.d}
						></path>
						<path
							className={resolveLoadingSvgStrokeClass({
								className: 'car',
								strokeClass: loadingClassState.strokeClass
							})}
							style={parseStyle(resolveLoadingOneColorStrokeSlowStyle({ customColor, speed }))}
							fill="none"
							strokeWidth={loadingOneColor37Svg.path.strokeWidth}
							pathLength={loadingOneColor37Svg.path.pathLength}
							d={loadingOneColor37Svg.path.d}
						></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_37;
