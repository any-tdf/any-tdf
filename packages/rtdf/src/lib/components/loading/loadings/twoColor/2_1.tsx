import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingTwoColorClassState,
	resolveLoadingTwoColorSolidBorderStyle,
	resolveLoadingTwoColorTransparentBorderDurationStyle
} from '@any-tdf/common/derived/loading';

type Props = { inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

const Loading2_1: FC<Props> = ({ inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	return (
		<>
			<div className="rtdf_loading_2_1">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'nestedSpinnerOuter',
						size,
						colorClass: loadingClassState.innerBorderClass
					})}
					style={parseStyle(resolveLoadingTwoColorTransparentBorderDurationStyle({ color: customColor[1], speed }))}
				>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'nestedSpinnerInner',
							colorClass: loadingClassState.outerBorderClass
						})}
						style={parseStyle(resolveLoadingTwoColorSolidBorderStyle(customColor[0]))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading2_1;
