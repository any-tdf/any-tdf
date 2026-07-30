import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingClimbingDotStepIndexes,
	resolveLoadingClimbingDotBallStyle,
	resolveLoadingClimbingDotCss,
	resolveLoadingClimbingDotStepRootClass,
	resolveLoadingClimbingDotStepStyle,
	resolveLoadingRoundedElementClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_12: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingClimbingDotCss({ scope: 'rtdf_loading_1_12' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_12">
				<div className={resolveLoadingLayoutClass({ kind: 'loadingRelativeBox', size })}>
					<div
						className={resolveLoadingRoundedElementClass({
							bgClass: loadingClassState.bgClass,
							className: 'absolute ball',
							size: 'none'
						})}
						style={parseStyle(resolveLoadingClimbingDotBallStyle({ color: customColor[0], speed }))}
					></div>
					{loadingClimbingDotStepIndexes.map((stepIndex) => (
						<div
							key={stepIndex}
							className={resolveLoadingClimbingDotStepRootClass({
								stepIndex,
								bgClass: loadingClassState.bgClass
							})}
							style={parseStyle(resolveLoadingClimbingDotStepStyle({ color: customColor[0], speed }))}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_12;
