import type { FC } from 'react';
import { Fragment } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingOrbitSliceIndexes,
	resolveLoadingOrbitalScaleCss,
	resolveLoadingOrbitSliceClass,
	resolveLoadingOrbitSliceRowClass,
	resolveLoadingOrbitSliceRowStyle,
	resolveLoadingOrbitSliceStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_39: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingOrbitalScaleCss({ scope: 'rtdf_loading_1_39' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_39">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumnItemsCenter', size })}>
					{loadingOrbitSliceIndexes.map((item, index) => (
						<Fragment key={index}>
							<div className={resolveLoadingOrbitSliceRowClass()} style={parseStyle(resolveLoadingOrbitSliceRowStyle())}>
								<div
									className={resolveLoadingOrbitSliceClass(loadingClassState.bgClass)}
									style={parseStyle(resolveLoadingOrbitSliceStyle({ color: customColor[0], index: item, speed }))}
								></div>
								<div
									className={resolveLoadingOrbitSliceClass(loadingClassState.bgClass)}
									style={parseStyle(
										resolveLoadingOrbitSliceStyle({
											color: customColor[0],
											index: item,
											phase: 'trailing',
											speed
										})
									)}
								></div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_39;
