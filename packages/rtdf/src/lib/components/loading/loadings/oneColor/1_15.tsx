import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingElasticDotLeftPercents,
	resolveLoadingElasticDotsCss,
	resolveLoadingElasticDotClass,
	resolveLoadingElasticDotStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_15: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingElasticDotsCss({ scope: 'rtdf_loading_1_15' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_15">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingElasticDotLeftPercents.map((left, index) => (
						<div
							key={left}
							className={resolveLoadingElasticDotClass({
								bgClass: loadingClassState.bgClass,
								index
							})}
							style={parseStyle(resolveLoadingElasticDotStyle({ color: customColor[0], index, speed }))}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_15;
