import type { GridsProps } from '../../types';
import { forwardRef, memo } from 'react';
import { resolveGridsDerived, resolveGridsStateOptions } from '@any-tdf/common/derived/grids';

/**
 * Grids 组件 - 网格容器组件
 * Grid container component for managing the overall grid layout
 */
const Grids = memo(
	forwardRef<HTMLDivElement, GridsProps>(({ cols = '6', gap = '2', mx = '2', my = '2', children }, ref) => {
		// 公共 Grids 派生函数返回容器布局 class，组件层只负责渲染内容。
		// Shared Grids derivation returns container layout classes; the component layer only renders content.
		const gridsState = resolveGridsDerived(resolveGridsStateOptions({ props: { cols, gap, mx, my } }));

		return (
			<div ref={ref} className={gridsState.containerClass}>
				{children}
			</div>
		);
	})
);

Grids.displayName = 'Grids';

export default Grids;
