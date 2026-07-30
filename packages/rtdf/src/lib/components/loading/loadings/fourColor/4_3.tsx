import type { FC } from 'react';
import {
	resolveLoadingFourShapePositionCss,
	resolveLoadingFourColorShapeStyle,
	resolveLoadingShapeContainerClass,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';
import { parseStyle } from '../../../utils/style';

type Props = { size?: string; customColor?: string[]; speed?: number };

const Loading4_3: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const css = resolveLoadingFourShapePositionCss({
		scope: 'rtdf_loading_4_3',
		containerDurationBase: 1.2,
		mode: 'quarters',
		shapeDurationBase: 0.6
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_4_3">
				<div
					className={resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size })}
					style={parseStyle(resolveLoadingShapeContainerStyle({ variant: '4_3', speed }))}
				>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 0 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 1 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 2 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 2, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 3, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading4_3;
