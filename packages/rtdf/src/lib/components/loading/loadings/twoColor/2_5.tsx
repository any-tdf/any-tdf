import type { FC } from 'react';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapePositionCss,
	resolveLoadingTwoColorClassState,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass,
	resolveLoadingTwoColorShapeStyle
} from '@any-tdf/common/derived/loading';

type Props = { size?: string; customColor?: string[]; speed?: number; inverse?: boolean };

const Loading2_5: FC<Props> = ({ inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	const css = resolveLoadingFourShapePositionCss({
		scope: 'rtdf_loading_2_5',
		containerDurationBase: 1.2,
		mode: 'quarters',
		shapeDurationBase: 0.6
	});

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_2_5">
				<div
					className={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })}
					style={parseStyle(resolveLoadingShapeContainerStyle({ variant: '2_5', speed }))}
				>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 0,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 1,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 2,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundHalf',
							index: 3,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_5', index: 1, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading2_5;
