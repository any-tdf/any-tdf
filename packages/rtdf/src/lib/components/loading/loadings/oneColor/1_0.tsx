import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorSvgSpinStyle,
	resolveLoadingSpinnerSvgClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor0Svg } from '@any-tdf/common/svg/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_0: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	return (
		<>
			<div className="rtdf_loading_1_0">
				<div className={resolveLoadingLayoutClass({ kind: 'center', size })}>
					<svg
						viewBox={loadingOneColor0Svg.viewBox}
						className={resolveLoadingSpinnerSvgClass(loadingClassState.textClass)}
						style={parseStyle(resolveLoadingOneColorSvgSpinStyle({ customColor, speed }))}
					>
						<circle
							cx={loadingOneColor0Svg.trackCircle.cx}
							cy={loadingOneColor0Svg.trackCircle.cy}
							r={loadingOneColor0Svg.trackCircle.r}
							strokeWidth={loadingOneColor0Svg.trackCircle.strokeWidth}
							fill={loadingOneColor0Svg.trackCircle.fill}
							className={loadingOneColor0Svg.trackCircle.className}
							stroke={loadingOneColor0Svg.trackCircle.stroke}
						/>
						<circle
							cx={loadingOneColor0Svg.carCircle.cx}
							cy={loadingOneColor0Svg.carCircle.cy}
							r={loadingOneColor0Svg.carCircle.r}
							strokeWidth={loadingOneColor0Svg.carCircle.strokeWidth}
							className={loadingOneColor0Svg.carCircle.className}
							stroke={loadingOneColor0Svg.carCircle.stroke}
							fill={loadingOneColor0Svg.carCircle.fill}
							strokeDashoffset={loadingOneColor0Svg.carCircle.strokeDashoffset}
							strokeDasharray={loadingOneColor0Svg.carCircle.strokeDasharray}
							strokeLinecap={loadingOneColor0Svg.carCircle.strokeLinecap}
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Loading1_0;
