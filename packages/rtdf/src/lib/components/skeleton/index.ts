/**
 * Skeleton 组件模块
 * Skeleton component module
 */

import type { SkeletonProps } from '../../types';

// 导出组件
export { default as Skeleton } from './skeleton';

// 导出常量和类型
export {
	skeletonWidthObj as widthClasses,
	skeletonHeightObj as heightClasses,
	skeletonPaddingObj as paddingClasses,
	skeletonRandomWidthList as randomWidthClasses
} from '@any-tdf/common/derived/skeleton';

export type RadiusType = NonNullable<SkeletonProps['radius']>;
export type WidthType = NonNullable<SkeletonProps['width']>;
export type HeightType = NonNullable<SkeletonProps['height']>;
export type PaddingType = NonNullable<SkeletonProps['space']>;
export type SkeletonType = NonNullable<SkeletonProps['type']>;

// 导出类型
export type { SkeletonProps } from '../../types';
