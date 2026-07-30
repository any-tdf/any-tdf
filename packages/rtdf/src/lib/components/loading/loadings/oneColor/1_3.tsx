import type { FC } from 'react';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingBorderTransparentDurationStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';
import { parseStyle } from '../../../utils/style';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_3: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	return (
		<>
			<div className="rtdf_loading_1_3">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'splitSpinnerRing',
						size,
						colorClass: loadingClassState.splitRingClass
					})}
					style={parseStyle(
						resolveLoadingBorderTransparentDurationStyle({
							color: customColor[0],
							durationBase: 1,
							speed,
							transparentSides: ['border-top-color', 'border-bottom-color']
						})
					)}
				></div>
			</div>
		</>
	);
};

export default Loading1_3;
