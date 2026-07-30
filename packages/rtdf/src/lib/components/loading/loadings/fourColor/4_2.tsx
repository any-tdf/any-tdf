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

const Loading4_2: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const css = resolveLoadingFourShapePositionCss({ scope: 'rtdf_loading_4_2' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_4_2">
				<div
					className={resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size })}
					style={parseStyle(resolveLoadingShapeContainerStyle({ variant: '4_2', speed }))}
				>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 0 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 1 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 2 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 2, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'roundThird', index: 3 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_2', index: 3, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading4_2;
