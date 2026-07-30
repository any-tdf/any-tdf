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

const Loading2_4: FC<Props> = ({ inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 }) => {
	const loadingClassState = resolveLoadingTwoColorClassState({ inverse });

	const css = resolveLoadingFourShapePositionCss({ scope: 'rtdf_loading_2_4' });

	return (
		<>
			{css ? <style>{css}</style> : null}
			<div className="rtdf_loading_2_4">
				<div
					className={resolveLoadingLayoutClass({ kind: 'loadingRelative', size })}
					style={parseStyle(resolveLoadingShapeContainerStyle({ variant: '2_4', speed }))}
				>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundThird',
							index: 0,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundThird',
							index: 1,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 1, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundThird',
							index: 2,
							bgClass: loadingClassState.bgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 0, customColor, speed }))}
					></div>
					<div
						className={resolveLoadingShapePieceClass({
							variant: 'roundThird',
							index: 3,
							bgClass: loadingClassState.secondaryBgClass
						})}
						style={parseStyle(resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 1, customColor, speed }))}
					></div>
				</div>
			</div>
		</>
	);
};

export default Loading2_4;
