import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingThreeDotDelayMultipliers,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingThreeDotPulseCss,
	resolveLoadingThreeDotPulseRowClass,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundDotClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_47: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingThreeDotPulseCss({ scope: 'rtdf_loading_1_47' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_47">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
					<div className={resolveLoadingThreeDotPulseRowClass()}>
						{loadingThreeDotDelayMultipliers.map((item, index) => (
							<Fragment key={index}>
								<div
									className={resolveLoadingRoundDotClass({
										bgClass: loadingClassState.bgClass,
										className: 'dot'
									})}
									style={parseStyle(
										resolveLoadingColorDurationDelayStyle({
											color: customColor[0],
											durationBase: 1.3,
											speed,
											delayMultiplier: item
										})
									)}
								></div>
							</Fragment>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading1_47;
