import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingAlphaBorderDurationStyle,
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	size?: string;
	customColor?: string[];
	speed?: number;
	theme?: boolean;
	inverse?: boolean;
};

const Loading1_20: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1, theme = false, inverse = false }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_1_20' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_20">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'doubleSpinnerRing',
						size,
						colorClass: loadingClassState.doubleSpinBorderClass
					})}
					style={parseStyle(
						resolveLoadingAlphaBorderDurationStyle({
							color: customColor[0],
							durationBase: 2,
							speed,
							fullBorder: true
						})
					)}
				></div>
			</div>
		</>
	);
};

export default Loading1_20;
