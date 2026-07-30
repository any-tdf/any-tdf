// 公共函数负责解析，组件本地工具直接复用同名出口。
// The shared helper owns parsing; the local component utility reuses the same export.
export { parseStyleString as parseStyle } from '@any-tdf/common/derived/helpers';
