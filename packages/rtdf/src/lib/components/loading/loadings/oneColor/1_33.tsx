import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingHalfFlowSections,
	resolveLoadingHalfFlowContainerStyle,
	resolveLoadingHalfFlowCss,
	resolveLoadingHalfFlowOverlayClass,
	resolveLoadingHalfFlowPieceRootClass,
	resolveLoadingHalfFlowPieceStyle,
	resolveLoadingHalfFlowWrapClass,
	resolveLoadingHalfFlowWrapStyle,
	resolveLoadingOneColorBackgroundColorStyle
} from '@any-tdf/common/derived/loading';

type Props = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

const Loading1_33: FC<Props> = ({ theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingHalfFlowCss({ scope: 'rtdf_loading_1_33' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_33">
				<div
					className={resolveLoadingLayoutClass({ kind: 'containerRelativeFlexColumn', size })}
					style={parseStyle(resolveLoadingHalfFlowContainerStyle(speed))}
				>
					{loadingHalfFlowSections.map((section) => (
						<div key={section} className={resolveLoadingHalfFlowWrapClass()} style={parseStyle(resolveLoadingHalfFlowWrapStyle(section))}>
							<div
								className={resolveLoadingHalfFlowOverlayClass(loadingClassState.bgClass)}
								style={parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))}
							></div>
							<div
								className={resolveLoadingHalfFlowPieceRootClass({
									section,
									bgClass: loadingClassState.bgClass
								})}
								style={parseStyle(resolveLoadingHalfFlowPieceStyle({ color: customColor[0], section, speed }))}
							></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Loading1_33;
