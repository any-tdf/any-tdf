import type { CSSProperties } from 'react';
import { parseStyleString } from '@any-tdf/common/derived/helpers';

// 公共函数负责解析，组件本地工具只保留类型适配。
// The shared helper owns parsing; the local component utility only keeps the type adapter.
export const parseStyle = (style: string): CSSProperties => parseStyleString(style) as CSSProperties;
