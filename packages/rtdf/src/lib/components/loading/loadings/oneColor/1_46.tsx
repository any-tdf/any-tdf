import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingSlideDotDelayMultipliers,
	resolveLoadingStreamCss,
	resolveLoadingStreamTrackClass,
	resolveLoadingTimedStyle,
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

const Loading1_46: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingStreamCss({ scope: 'rtdf_loading_1_46' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_46">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
					<div className={resolveLoadingStreamTrackClass()}>
						{loadingSlideDotDelayMultipliers.map((item, index) => (
							<Fragment key={index}>
								<div
									className={resolveLoadingRoundedElementClass({
										bgClass: loadingClassState.bgClass,
										className: 'dot absolute',
										size: 'stream'
									})}
									style={parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background-color',
											durationBase: 2.5,
											speed,
											delayMultiplier: item
										})
									)}
								></div>
							</Fragment>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading1_46;
