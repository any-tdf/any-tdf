import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingBarDelayMultipliers,
	resolveLoadingBarGrowCss,
	resolveLoadingTimedStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingBarItemClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_31: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingBarGrowCss({ scope: 'rtdf_loading_1_31' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_31">
				<div className={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
					{loadingBarDelayMultipliers.map((item, index) => (
						<Fragment key={index}>
							<div
								className={resolveLoadingBarItemClass(loadingClassState.bgClass)}
								style={parseStyle(
									resolveLoadingTimedStyle({
										color: customColor[0],
										colorProperty: 'background-color',
										durationBase: 1,
										speed,
										delayBase: 1,
										delaySpeed: 1,
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

export default Loading1_31;
