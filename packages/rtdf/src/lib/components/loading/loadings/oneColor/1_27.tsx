import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingSixDotDelayMultipliers,
	resolveLoadingOrbitSpinContainerStyle,
	resolveLoadingOrbitSpinCss,
	resolveLoadingOrbitSpinDotClass,
	resolveLoadingOrbitSpinDotStyle,
	resolveLoadingOrbitSpinInnerStyle,
	resolveLoadingRoundDotClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_27: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingOrbitSpinCss({ scope: 'rtdf_loading_1_27' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_27">
				<div
					className={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size })}
					style={parseStyle(resolveLoadingOrbitSpinContainerStyle(speed))}
				>
					{loadingSixDotDelayMultipliers.map((delayMultiplier) => (
						<div
							key={delayMultiplier}
							className={resolveLoadingOrbitSpinDotClass()}
							style={parseStyle(resolveLoadingOrbitSpinDotStyle({ delayMultiplier, speed }))}
						>
							<div
								className={resolveLoadingRoundDotClass({
									bgClass: loadingClassState.bgClass,
									size: 'sm'
								})}
								style={parseStyle(
									resolveLoadingOrbitSpinInnerStyle({
										color: customColor[0],
										delayMultiplier,
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

export default Loading1_27;
