import { createMdTextToHljs, groupIconMdPlugin as baseGroupIconMdPlugin } from '@any-tdf/site-common/markdown';
import codeGroupSvgData from './code-group-svg-data';
import hljs from 'highlight.js';
// @ts-expect-error - highlightjs-svelte 缺少类型定义
import hljs_svelte from 'highlightjs-svelte/dist/index.mjs';

export { throttle } from '@any-tdf/site-common/site';

hljs_svelte(hljs);

export const mdTextToHljs = createMdTextToHljs(hljs);

export const groupIconMdPlugin = (md: string) => {
	return baseGroupIconMdPlugin(md, { codeGroupSvgData });
};

export { delParamsUrl } from '@any-tdf/site-common/url';
export { defaultThemeName, normalizeThemeName } from './theme';
export {
	generateThemeBlack,
	generateThemeWhite,
	oklchToHex,
	oklchToRgb,
	colorObjToArr,
	getOklchOpacity,
	calculateContrastRatio,
	getWCAGLevel,
	getContrastScore,
	evaluateColorContrast,
	generateRandomOklchColor,
	generateTextColor
} from '@any-tdf/site-common/theme';
export type { OklchColor, WCAGLevel } from '@any-tdf/site-common/theme';
