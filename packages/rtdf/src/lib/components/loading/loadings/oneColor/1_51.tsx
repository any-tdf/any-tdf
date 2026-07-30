import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingQuarterDelayMultipliers,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingPulseScaleCss,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundedElementClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_51: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
	const css = resolveLoadingPulseScaleCss({ scope: 'rtdf_loading_1_51' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_51">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingQuarterDelayMultipliers.map((item, index) => (
						<Fragment key={index}>
							<div
								className={resolveLoadingRoundedElementClass({
									bgClass: loadingClassState.bgClass,
									className: 'dot absolute left-0 top-0',
									size: 'full'
								})}
								style={parseStyle(
									resolveLoadingColorDurationDelayStyle({
										color: customColor[0],
										durationBase: 2,
										speed,
										delayMultiplier: item
									})
								)}
							></div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_51;
