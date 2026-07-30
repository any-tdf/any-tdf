import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingBorderElementClass,
	resolveLoadingBorderTransparentDurationStyle,
	resolveLoadingBorderCapStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_4: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	return (
		<>
			<div className="rtdf_loading_1_4">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size })}>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'splitSpinnerRing',
							className: 'relative',
							size: 'h-8 w-8',
							colorClass: loadingClassState.borderClass
						})}
						style={parseStyle(
							resolveLoadingBorderTransparentDurationStyle({
								color: customColor[0],
								durationBase: 1,
								speed,
								transparentSides: ['border-top-color', 'border-bottom-color']
							})
						)}
					>
						<div
							className={resolveLoadingBorderElementClass({
								kind: 'borderCapStart',
								colorClass: loadingClassState.borderClass
							})}
							style={parseStyle(resolveLoadingBorderCapStyle({ color: customColor[0], rotate: 225 }))}
						></div>
						<div
							className={resolveLoadingBorderElementClass({
								kind: 'borderCapEnd',
								colorClass: loadingClassState.borderClass
							})}
							style={parseStyle(resolveLoadingBorderCapStyle({ color: customColor[0], rotate: 45 }))}
						></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading1_4;
