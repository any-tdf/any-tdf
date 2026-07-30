import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingEightRadialDelayMultipliers,
	resolveLoadingRadialDotPulseCss,
	resolveLoadingRadialDotRowClass,
	resolveLoadingRadialEightTransformStyle,
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

const Loading1_28: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingRadialDotPulseCss({ scope: 'rtdf_loading_1_28' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_28">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeFlexCenter', size })}>
					{loadingEightRadialDelayMultipliers.map((item, i) => (
						<Fragment key={i}>
							<div className={resolveLoadingRadialDotRowClass()} style={parseStyle(resolveLoadingRadialEightTransformStyle(i))}>
								<div
									className={resolveLoadingRoundDotClass({
										bgClass: loadingClassState.bgClass,
										className: 'dot',
										size: 'sm'
									})}
									style={parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background-color',
											durationBase: 1,
											speed,
											delayMultiplier: item
										})
									)}
								></div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_28;
