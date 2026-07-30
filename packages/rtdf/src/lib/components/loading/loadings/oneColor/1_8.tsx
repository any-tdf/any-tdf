import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingRoundDotClass,
	resolveLoadingRotateScaleCss,
	resolveLoadingOneColorClassState,
	resolveLoadingBaseAnimationStyle,
	resolveLoadingOneColorBackgroundStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_8: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingRotateScaleCss({ scope: 'rtdf_loading_1_8' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_8">
				<div
					className={resolveLoadingLayoutClass({ kind: 'loadingFlexBetween', size })}
					style={parseStyle(resolveLoadingBaseAnimationStyle({ speed }))}
				>
					<div
						className={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })}
						style={parseStyle(resolveLoadingOneColorBackgroundStyle({ customColor }))}
					></div>
					<div
						className={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })}
						style={parseStyle(resolveLoadingOneColorBackgroundStyle({ customColor }))}
					></div>
					<div
						className={resolveLoadingRoundDotClass({ bgClass: loadingClassState.bgClass })}
						style={parseStyle(resolveLoadingOneColorBackgroundStyle({ customColor }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_8;
