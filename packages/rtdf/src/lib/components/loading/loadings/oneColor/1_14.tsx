import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingBorderElementClass,
	resolveLoadingClipRotatePulseCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBaseStyle,
	resolveLoadingOneColorBorderBaseStyle,
	resolveLoadingRoundedElementClass
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_14: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingClipRotatePulseCss({ scope: 'rtdf_loading_1_14' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_14">
				<div className={resolveLoadingLayoutClass({ kind: 'relativeCenter', size })}>
					<div
						className={resolveLoadingBorderElementClass({
							kind: 'clipPulseRing',
							colorClass: loadingClassState.borderClass
						})}
						style={parseStyle(resolveLoadingOneColorBorderBaseStyle({ customColor, speed }))}
					></div>
					<div
						className={resolveLoadingRoundedElementClass({
							bgClass: loadingClassState.bgClass,
							className: 'absolute left-1/4 top-1/4 loading2',
							size: 'half'
						})}
						style={parseStyle(resolveLoadingOneColorBaseStyle({ customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_14;
