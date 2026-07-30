import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingRadialDotDelayMultipliers,
	resolveLoadingRadialLineStyle,
	resolveLoadingRadialDotRowClass,
	resolveLoadingRadialDotStyle,
	resolveLoadingRadialOscillateCss,
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

const Loading1_29: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingRadialOscillateCss({ scope: 'rtdf_loading_1_29' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_29">
				<div className={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size })}>
					{loadingRadialDotDelayMultipliers.map((item, i) => (
						<div key={i} className={resolveLoadingRadialDotRowClass()} style={parseStyle(resolveLoadingRadialLineStyle(i, speed))}>
							<div
								className={resolveLoadingRoundDotClass({
									bgClass: loadingClassState.bgClass,
									className: 'dot',
									size: 'sm'
								})}
								style={parseStyle(
									resolveLoadingRadialDotStyle({
										color: customColor[0],
										delayMultiplier: item,
										speed
									})
								)}
							></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_29;
