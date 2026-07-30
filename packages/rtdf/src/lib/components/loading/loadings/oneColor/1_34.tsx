import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingHorizontalZoomCss,
	resolveLoadingLayoutClass,
	resolveLoadingTimedStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBackgroundColorStyle,
	resolveLoadingTrackBarClass,
	resolveLoadingTrackOverlayClass,
	resolveLoadingTrackShellStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_34: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
	const css = resolveLoadingHorizontalZoomCss({ scope: 'rtdf_loading_1_34' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_34">
				<div className={resolveLoadingLayoutClass({ kind: 'flexColumn', size })}>
					<div className={resolveLoadingLayoutClass({ kind: 'trackShell', size })} style={parseStyle(resolveLoadingTrackShellStyle())}>
						<div
							className={resolveLoadingTrackOverlayClass(loadingClassState.bgClass)}
							style={parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))}
						></div>
						<div
							className={resolveLoadingTrackBarClass(loadingClassState.bgClass)}
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
					</div>
				</div>
			</div>
		</>
	);
};

export default Loading1_34;
