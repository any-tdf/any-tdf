import type { FC } from 'react';
import {
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingFourColorShapeStyle,
	resolveLoadingShapeContainerClass,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';
import { parseStyle } from '../../../utils/style';

type Props = { size?: string; customColor?: string[]; speed?: number };

const Loading4_1: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const css = resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_4_1' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_4_1">
				<div className={resolveLoadingShapeContainerClass({ kind: 'rotatedCorner', size })}>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 0 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 1 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 2, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 3 })}
						style={parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 3, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading4_1;
