import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
	resolveLoadingTwoColorBorderDurationStyle,
	resolveLoadingTwoColorClassState
} from '@any-tdf/common/derived/loading';

type Props = { size?: string; customColor?: string[]; speed?: number; inverse?: boolean };

const Loading2_2: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1, inverse = false }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_2_2' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_2_2">
				<div
					className={resolveLoadingBorderElementClass({
						kind: 'doubleSpinnerRing',
						size,
						colorClass: loadingClassState.spinBorderClass
					})}
					style={parseStyle(resolveLoadingTwoColorBorderDurationStyle({ customColor, durationBase: 2, speed }))}
				></div>
			</div>
		</>
	);
};

export default Loading2_2;
