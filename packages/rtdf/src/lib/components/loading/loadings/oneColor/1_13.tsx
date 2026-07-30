import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingBorderElementClass,
	resolveLoadingClippedRingRotateCss,
	resolveLoadingClippedInnerRingStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBorderSlowStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_13: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingClippedRingRotateCss({ scope: 'rtdf_loading_1_13' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_13">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenterBox', size })}>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'clippedOuterRing',
							size,
							colorClass: loadingClassState.borderClass
						})}
						style={parseStyle(resolveLoadingOneColorBorderSlowStyle({ customColor, speed }))}
					></div>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'clippedInnerRing',
							colorClass: loadingClassState.borderClass
						})}
						style={parseStyle(resolveLoadingClippedInnerRingStyle({ color: customColor[0], speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_13;
