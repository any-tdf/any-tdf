import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapePositionCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorShapeStyle,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';

type Props = {
	size?: string;
	customColor?: string[];
	speed?: number;
	theme?: boolean;
	inverse?: boolean;
};

const Loading1_21: FC<Props> = ({ size = 'w-8 h-8', customColor = [], speed = 1, theme = false, inverse = false }) => {
	const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });

	const css = resolveLoadingFourShapePositionCss({
		scope: 'rtdf_loading_1_21',
		containerDurationBase: 1.2,
		mode: 'quarters',
		shapeDurationBase: 0.6
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_1_21">
				<div
					className={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })}
					style={parseStyle(resolveLoadingShapeContainerStyle({ variant: '1_21', speed }))}
				>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 0,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 1,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 2,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 3,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading1_21;
