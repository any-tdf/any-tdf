import type { GridProps } from '../../types';
import { forwardRef, memo } from 'react';
import { resolveGridDerived, resolveGridStateOptions } from '@any-tdf/common/derived/grids';

/**
 * Grid 组件 - 网格项目组件
 * Grid item component for creating individual grid cells
 */
const Grid = memo(
	forwardRef<HTMLDivElement, GridProps>(({ col = '1', row = '1', children }, ref) => {
		// 公共 Grid 派生函数返回布局 class，组件层只负责渲染内容。
		// Shared Grid derivation returns layout classes; the component layer only renders content.
		const gridState = resolveGridDerived(resolveGridStateOptions({ props: { row, col } }));

		return (
			<div ref={ref} className={gridState.itemClass}>
				{children}
			</div>
		);
	})
);

Grid.displayName = 'Grid';

export default Grid;
