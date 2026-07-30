import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingCircularStretchCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorColorStyle,
	resolveLoadingOrbitCarStyle,
	resolveLoadingOrbitContainerStyle,
	resolveLoadingStretchSvgClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor22Svg } from '@any-tdf/common/svg/loading';

type Props = {
	size?: string;
	customColor?: string[];
	speed?: number;
	theme?: boolean;
	inverse?: boolean;
};

const Loading1_22: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingCircularStretchCss({ scope: 'rtdf_loading_1_22' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_22">
				<div
					className={resolveLoadingLayoutClass({ kind: 'center', size })}
					style={parseStyle(resolveLoadingOrbitContainerStyle({ speed }))}
				>
					<svg
						className={resolveLoadingStretchSvgClass(loadingClassState.textClass)}
						viewBox={loadingOneColor22Svg.viewBox}
						style={parseStyle(resolveLoadingOneColorColorStyle({ customColor }))}
					>
						<circle
							className={loadingOneColor22Svg.trackCircle.className}
							stroke={loadingOneColor22Svg.trackCircle.stroke}
							cx={loadingOneColor22Svg.trackCircle.cx}
							cy={loadingOneColor22Svg.trackCircle.cy}
							r={loadingOneColor22Svg.trackCircle.r}
							fill={loadingOneColor22Svg.trackCircle.fill}
						/>
						<circle
							className={loadingOneColor22Svg.carCircle.className}
							style={parseStyle(resolveLoadingOrbitCarStyle({ speed }))}
							stroke={loadingOneColor22Svg.carCircle.stroke}
							cx={loadingOneColor22Svg.carCircle.cx}
							cy={loadingOneColor22Svg.carCircle.cy}
							r={loadingOneColor22Svg.carCircle.r}
							fill={loadingOneColor22Svg.carCircle.fill}
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_22;
