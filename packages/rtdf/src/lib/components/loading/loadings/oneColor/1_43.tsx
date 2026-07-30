import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingBarDelayMultipliers,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingVerticalJumpCss,
	resolveLoadingVerticalJumpRowClass,
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

const Loading1_43: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingVerticalJumpCss({ scope: 'rtdf_loading_1_43' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_43">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
					<div className={resolveLoadingVerticalJumpRowClass()}>
						{loadingBarDelayMultipliers.map((item, index) => (
							<Fragment key={index}>
								<div
									className={resolveLoadingRoundDotClass({
										bgClass: loadingClassState.bgClass,
										className: 'dot',
										size: 'sm'
									})}
									style={parseStyle(
										resolveLoadingColorDurationDelayStyle({
											color: customColor[0],
											durationBase: 1,
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

export default Loading1_43;
