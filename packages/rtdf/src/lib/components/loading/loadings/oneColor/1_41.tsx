import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOrbitalScaleCss,
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

const Loading1_41: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingOrbitalScaleCss({
		scope: 'rtdf_loading_1_41',
		targetClass: 'container'
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_41">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					<div
						className={resolveLoadingRoundedElementClass({
							bgClass: loadingClassState.bgClass,
							className: 'container absolute left-2.5 top-2.5',
							size: 'lg'
						})}
						style={parseStyle(
							resolveLoadingTimedStyle({
								color: customColor[0],
								colorProperty: 'background-color',
								durationBase: 1.5,
								speed,
								includeDelay: false
							})
						)}
					></div>
					<div
						className={resolveLoadingRoundedElementClass({
							bgClass: loadingClassState.bgClass,
							className: 'container absolute left-2.5 top-2.5',
							size: 'lg'
						})}
						style={parseStyle(
							resolveLoadingTimedStyle({
								color: customColor[0],
								colorProperty: 'background-color',
								durationBase: 1.5,
								speed,
								delayBase: 0.75
							})
						)}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_41;
