import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingDiagonalDotDelayMultipliers,
	resolveLoadingDiagonalDotStyle,
	resolveLoadingVerticalJumpCss,
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

const Loading1_40: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
	const css = resolveLoadingVerticalJumpCss({ scope: 'rtdf_loading_1_40', distance: '120%' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_40">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeFlexCenter', size })}>
					{loadingDiagonalDotDelayMultipliers.map((item, i) => (
						<Fragment key={i}>
							<div
								className={resolveLoadingRoundedElementClass({
									bgClass: loadingClassState.bgClass,
									className: 'dot absolute',
									size: 'xs'
								})}
								style={parseStyle(
									resolveLoadingDiagonalDotStyle({
										color: customColor[0],
										index: i,
										delayMultiplier: item,
										speed
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

export default Loading1_40;
