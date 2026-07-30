import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingTwoDotIndexes,
	resolveLoadingTwoDotElasticCss,
	resolveLoadingTwoDotElasticDotClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBaseStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_7: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingTwoDotElasticCss({ scope: 'rtdf_loading_1_7' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_7">
				<div className={resolveLoadingLayoutClass({ kind: 'flexCenter', size })}>
					{loadingTwoDotIndexes.map((dotIndex) => (
						<div
							key={dotIndex}
							className={resolveLoadingTwoDotElasticDotClass({
								bgClass: loadingClassState.bgClass,
								index: dotIndex
							})}
							style={parseStyle(resolveLoadingOneColorBaseStyle({ customColor, speed }))}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_7;
