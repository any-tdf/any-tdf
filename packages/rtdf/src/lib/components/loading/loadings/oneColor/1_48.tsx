import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingSwingDotOpacities,
	resolveLoadingHalfTurnSwingCss,
	resolveLoadingSwingDotStyle,
	resolveLoadingSwingLineClass,
	resolveLoadingSwingLineStyle,
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

const Loading1_48: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingHalfTurnSwingCss({ scope: 'rtdf_loading_1_48' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_48">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeRotatedFlexCenter', size })}>
					{loadingSwingDotOpacities.map((item, i) => (
						<Fragment key={i}>
							<div className={resolveLoadingSwingLineClass()} style={parseStyle(resolveLoadingSwingLineStyle(i, speed))}>
								<div
									className={resolveLoadingRoundedElementClass({
										bgClass: loadingClassState.bgClass,
										size: 'quarter'
									})}
									style={parseStyle(resolveLoadingSwingDotStyle({ color: customColor[0], opacity: item, index: i }))}
								></div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_48;
