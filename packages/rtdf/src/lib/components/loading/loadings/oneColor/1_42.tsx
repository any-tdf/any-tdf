import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingWobbleRotations,
	resolveLoadingWobbleContainerStyle,
	resolveLoadingWobbleCss,
	resolveLoadingWobbleDotStyle,
	resolveLoadingWobbleRotationClass,
	resolveLoadingWobbleRotationStyle,
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

const Loading1_42: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingWobbleCss({ scope: 'rtdf_loading_1_42' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_42">
				<div
					className={resolveLoadingLayoutClass({ kind: 'containerRelativeInlineBlock', size })}
					style={parseStyle(resolveLoadingWobbleContainerStyle(speed))}
				>
					{loadingWobbleRotations.map((item) => (
						<div key={item} className={resolveLoadingWobbleRotationClass()} style={parseStyle(resolveLoadingWobbleRotationStyle(item))}>
							<div
								className={resolveLoadingRoundedElementClass({
									bgClass: loadingClassState.bgClass,
									className: 'dot absolute left-0 top-0',
									size: 'zeroFullWidth'
								})}
								style={parseStyle(resolveLoadingWobbleDotStyle({ color: customColor[0], speed }))}
							></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_42;
