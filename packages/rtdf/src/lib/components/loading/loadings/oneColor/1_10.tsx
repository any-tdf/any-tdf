import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingThreeDotIndexes,
	resolveLoadingDotFadeScaleCss,
	resolveLoadingRoundDotClass,
	resolveLoadingTimedStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_10: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingDotFadeScaleCss({ scope: 'rtdf_loading_1_10' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_10">
				<div className={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
					{loadingThreeDotIndexes.map((i, index) => (
						<Fragment key={index}>
							<div
								className={resolveLoadingRoundDotClass({
									bgClass: loadingClassState.bgClass,
									className: 'loading'
								})}
								style={parseStyle(
									resolveLoadingTimedStyle({
										color: customColor[0],
										colorProperty: 'background',
										durationBase: 1,
										speed,
										delayBase: 1,
										delaySpeed: 1,
										delayMultiplier: i === 1 ? -0.3 : 0,
										webkit: true
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

export default Loading1_10;
