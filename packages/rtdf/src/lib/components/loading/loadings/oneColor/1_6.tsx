import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingTwoDotIndexes,
	resolveLoadingSquareSwapCss,
	resolveLoadingSquareSwapDotClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorSlowStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_6: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingSquareSwapCss({ scope: 'rtdf_loading_1_6' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_6">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingTwoDotIndexes.map((dotIndex) => (
						<div
							key={dotIndex}
							className={resolveLoadingSquareSwapDotClass({
								bgClass: loadingClassState.bgClass,
								index: dotIndex
							})}
							style={parseStyle(resolveLoadingOneColorSlowStyle({ customColor, speed }))}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_6;
