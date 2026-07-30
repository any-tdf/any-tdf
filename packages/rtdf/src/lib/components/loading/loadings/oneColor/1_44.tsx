import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingLeapFrogOffsets,
	resolveLoadingLeapFrogCss,
	resolveLoadingLeapFrogStyle,
	resolveLoadingLeapFrogTrackClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBackgroundColorStyle,
	resolveLoadingRoundedElementClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_44: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingLeapFrogCss({ scope: 'rtdf_loading_1_44' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_44">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingLeapFrogOffsets.map((item, i) => (
						<Fragment key={i}>
							<div
								className={resolveLoadingLeapFrogTrackClass()}
								style={parseStyle(resolveLoadingLeapFrogStyle({ offset: item, index: i, speed }))}
							>
								<div
									className={resolveLoadingRoundedElementClass({
										bgClass: loadingClassState.bgClass
									})}
									style={parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))}
								></div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_44;
