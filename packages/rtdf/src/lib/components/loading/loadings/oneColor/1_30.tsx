import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingCubeDelayMultipliers,
	resolveLoadingCubeInnerClass,
	resolveLoadingCubeInnerStyle,
	resolveLoadingCubeMorphCss,
	resolveLoadingCubeRootClass,
	resolveLoadingCubeStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_30: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingCubeMorphCss({ scope: 'rtdf_loading_1_30' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_30">
				<div className={resolveLoadingLayoutClass({ kind: 'flexEndBetween', size })}>
					{loadingCubeDelayMultipliers.map((delayMultiplier) => (
						<div
							key={delayMultiplier}
							className={resolveLoadingCubeRootClass()}
							style={parseStyle(resolveLoadingCubeStyle({ delayMultiplier, speed }))}
						>
							<div
								className={resolveLoadingCubeInnerClass(loadingClassState.bgClass)}
								style={parseStyle(resolveLoadingCubeInnerStyle({ color: customColor[0], delayMultiplier, speed }))}
							></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_30;
