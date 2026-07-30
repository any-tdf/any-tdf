import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingShapePieceClass,
	resolveLoadingTwoColorClassState,
	resolveLoadingTwoColorShapeStyle
} from '@any-tdf/common/derived/loading';

type Props = { size?: string; customColor?: string[]; speed?: number; inverse?: boolean };

const Loading2_3: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1, inverse = false }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	const css = resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_2_3' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_2_3">
				<div className={resolveLoadingLayoutClass({ kind: 'rotatedCorner', size })}>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 0,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 1,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 2,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 3,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_3', index: 1, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading2_3;
