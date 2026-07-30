import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingRotatingLineFrames,
	resolveLoadingLineRotateCss,
	resolveLoadingRotatingLineClass,
	resolveLoadingRotatingLineStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_52: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingLineRotateCss({ scope: 'rtdf_loading_1_52', alternate: true });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_52">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					{loadingRotatingLineFrames.map((item, i) => (
						<Fragment key={i}>
							<div
								className={resolveLoadingRotatingLineClass(loadingClassState.bgClass)}
								style={parseStyle(
									resolveLoadingRotatingLineStyle({
										color: customColor[0],
										frame: item,
										speed,
										top: 'calc(50% - 2px)'
									})
								)}
							></div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_52;
