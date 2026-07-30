import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingBorderTransparentDurationStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_1: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	return (
		<>
			<div className="rtdf_loading_1_1">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'topSpinnerRing',
						size,
						colorClass: loadingClassState.borderClass
					})}
					style={parseStyle(
						resolveLoadingBorderTransparentDurationStyle({
							color: customColor[0],
							durationBase: 1,
							speed,
							transparentSides: ['border-top-color']
						})
					)}
				></div>
			</div>
		</>
	);
};

export default Loading1_1;
