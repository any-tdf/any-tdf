import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingThreeDotIndexes,
	resolveLoadingFallingDotCss,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundDotClass,
	resolveLoadingThreeDotIndexedStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_16: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
	const css = resolveLoadingFallingDotCss({ scope: 'rtdf_loading_1_16' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_16">
				<div className={resolveLoadingLayoutClass({ kind: 'flexBetween', size })}>
					{loadingThreeDotIndexes.map((i, index) => (
						<Fragment key={index}>
							<div
								className={resolveLoadingRoundDotClass({
									bgClass: loadingClassState.bgClass,
									className: 'loading'
								})}
								style={parseStyle(resolveLoadingThreeDotIndexedStyle({ index: i, customColor, speed }))}
							></div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_16;
