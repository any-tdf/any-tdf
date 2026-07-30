import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingTwoColorClassState,
	resolveLoadingTwoColorSolidBorderDurationStyle,
	resolveLoadingTwoColorTransparentBorderStyle
} from '@any-tdf/common/derived/loading';

type Props = { inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

const Loading2_0: FC<Props> = ({ inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	return (
		<>
			<div className="rtdf_loading_2_0">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'nestedSpinnerOuter',
						size,
						colorClass: loadingClassState.outerBorderClass
					})}
					style={parseStyle(resolveLoadingTwoColorSolidBorderDurationStyle({ color: customColor[0], speed }))}
				>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'nestedSpinnerInner',
							colorClass: loadingClassState.innerBorderClass
						})}
						style={parseStyle(resolveLoadingTwoColorTransparentBorderStyle(customColor[1]))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading2_0;
