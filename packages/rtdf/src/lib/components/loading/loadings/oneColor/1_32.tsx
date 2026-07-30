import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingExploreLineDelayMultipliers,
	resolveLoadingExploreCenterLineStyle,
	resolveLoadingExploreLineClass,
	resolveLoadingExploreLineCss,
	resolveLoadingExploreLineStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_32: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingExploreLineCss({ scope: 'rtdf_loading_1_32' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_32">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					<div
						className={resolveLoadingExploreLineClass({
							bgClass: loadingClassState.bgClass,
							kind: 'center'
						})}
						style={parseStyle(resolveLoadingExploreCenterLineStyle({ color: customColor[0], speed }))}
					></div>
					{loadingExploreLineDelayMultipliers.map((delayMultiplier) => (
						<div
							key={delayMultiplier}
							className={resolveLoadingExploreLineClass({
								bgClass: loadingClassState.bgClass,
								kind: 'trail'
							})}
							style={parseStyle(resolveLoadingExploreLineStyle({ color: customColor[0], delayMultiplier, speed }))}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_32;
