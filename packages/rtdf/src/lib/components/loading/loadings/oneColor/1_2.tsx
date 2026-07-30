import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingAlphaBorderDurationStyle,
	resolveLoadingBorderElementClass,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_2: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	return (
		<>
			<div className="rtdf_loading_1_2">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'alphaSpinnerRing',
						size,
						colorClass: loadingClassState.spinBorderClass
					})}
					style={parseStyle(
						resolveLoadingAlphaBorderDurationStyle({
							color: customColor[0],
							durationBase: 1,
							speed
						})
					)}
				></div>
			</div>
		</>
	);
};

export default Loading1_2;
