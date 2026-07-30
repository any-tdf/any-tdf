import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingFourDotIndexes,
	resolveLoadingPairedPendulumBarClass,
	resolveLoadingPairedPendulumCss,
	resolveLoadingPairedPendulumDotClass,
	resolveLoadingPairedPendulumDotStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBackgroundColorStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_45: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingPairedPendulumCss({ scope: 'rtdf_loading_1_45' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_45">
				<div className={resolveLoadingLayoutClass({ kind: 'flexCenterJustified', size })}>
					{loadingFourDotIndexes.map((item, index) => (
						<div
							key={index}
							className={resolveLoadingPairedPendulumDotClass(item)}
							style={parseStyle(resolveLoadingPairedPendulumDotStyle(speed))}
						>
							<div
								className={resolveLoadingPairedPendulumBarClass(loadingClassState.bgClass)}
								style={parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))}
							></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_45;
