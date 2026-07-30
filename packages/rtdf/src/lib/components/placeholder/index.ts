/**
 * Placeholder 组件模块
 * Placeholder component module
 */

import type { PlaceholderProps } from '../../types';

// 导出组件
export { default as Placeholder } from './placeholder';

// 导出常量和类型
export {
	placeholderPyObj as paddingYClasses,
	placeholderShadowObj as shadowClasses,
	placeholderHeightObj as heightClasses
} from '@any-tdf/common/derived/placeholder';

export type PaddingYType = NonNullable<PlaceholderProps['py']>;
export type ShadowType = NonNullable<PlaceholderProps['shadow']>;
export type RadiusType = NonNullable<PlaceholderProps['radius']>;
export type HeightType = NonNullable<PlaceholderProps['height']>;

// 导出类型
export type { PlaceholderProps } from '../../types';
