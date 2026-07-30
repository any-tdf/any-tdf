import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
	resolveLoadingFourColorBorderDurationStyle
} from '@any-tdf/common/derived/loading';

type Props = { size?: string; customColor?: string[]; speed?: number };

const Loading4_0: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_4_0' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_4_0">
				<div
					className={resolveLoadingBorderElementClass({ kind: 'doubleSpinnerRing', size })}
					style={parseStyle(resolveLoadingFourColorBorderDurationStyle({ customColor, durationBase: 2, speed }))}
				></div>
			</div>
		</>
	);
};

export default Loading4_0;
