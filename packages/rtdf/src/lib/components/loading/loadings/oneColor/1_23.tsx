import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingPulseLineIndexes,
	resolveLoadingLinePulseCss,
	resolveLoadingPulseLineClass,
	resolveLoadingPulseLineRowClass,
	resolveLoadingPulseLineTransformStyle,
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

const Loading1_23: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingLinePulseCss({ scope: 'rtdf_loading_1_23' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_23">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeTranslateNegativeHalf', size })}>
					{loadingPulseLineIndexes.map((i) => (
						<Fragment key={i}>
							<div className={resolveLoadingPulseLineRowClass()} style={parseStyle(resolveLoadingPulseLineTransformStyle(i))}>
								<div
									className={resolveLoadingPulseLineClass(loadingClassState.bgClass)}
									style={parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background',
											durationBase: 1,
											speed,
											delayMultiplier: i,
											delayDivisor: -12,
											webkit: true
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

export default Loading1_23;
