import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingCornerDotIndexes,
	resolveLoadingCornerDotStyle,
	resolveLoadingCornerTravelCss,
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

const Loading1_9: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingCornerTravelCss({ scope: 'rtdf_loading_1_9' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_9">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingCornerDotIndexes.map((i, index) => (
						<Fragment key={index}>
							<div
								className={resolveLoadingRoundedElementClass({
									bgClass: loadingClassState.bgClass,
									className: 'absolute loading',
									size: 'third'
								})}
								style={parseStyle(resolveLoadingCornerDotStyle({ color: customColor[0], index: i, speed }))}
							></div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_9;
