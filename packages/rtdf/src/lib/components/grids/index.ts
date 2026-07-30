/**
 * Grid 组件模块
 * Grid components module
 */

import type { GridProps, GridsProps } from '../../types';

// 导出组件
export { default as Grid } from './grid';
export { default as Grids } from './grids';

// 导出常量和类型
export {
	gridColObj as colSpanClasses,
	gridRowObj as rowSpanClasses,
	gridsColsObj as gridColsClasses,
	gridsGapObj as gapClasses,
	gridsMxObj as marginXClasses,
	gridsMyObj as marginYClasses
} from '@any-tdf/common/derived/grids';

export type ColSpanType = NonNullable<GridProps['col']>;
export type RowSpanType = NonNullable<GridProps['row']>;
export type GridColsType = ColSpanType;
export type GapType = NonNullable<GridsProps['gap']>;
export type MarginXType = NonNullable<GridsProps['mx']>;
export type MarginYType = NonNullable<GridsProps['my']>;

// 导出类型
export type { GridProps, GridsProps } from '../../types';
