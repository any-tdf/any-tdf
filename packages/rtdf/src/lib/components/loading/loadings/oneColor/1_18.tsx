import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingFourShapeTranslateStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';

type Props = {
	size?: string;
	customColor?: string[];
	speed?: number;
	theme?: boolean;
	inverse?: boolean;
};

const Loading1_18: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1, theme = false, inverse = false }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
	const css = resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_1_18' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_18">
				<div className={resolveLoadingLayoutClass({ kind: 'rotatedCorner', size })}>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 0,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 1,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 2,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'cornerThird',
							index: 3,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_18;
