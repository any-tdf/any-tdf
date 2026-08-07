import { createMdTextToHljs, groupIconMdPlugin as baseGroupIconMdPlugin } from '@any-tdf/site-common/markdown';
import codeGroupSvgData from './code-group-svg-data';
import hljs from './hljs';

export { throttle } from '@any-tdf/site-common/site';

export const mdTextToHljs = createMdTextToHljs(hljs);

export const groupIconMdPlugin = (md: string) => {
	return baseGroupIconMdPlugin(md, { codeGroupSvgData });
};

export { defaultThemeName, normalizeThemeName } from './theme';
export { delParamsUrl } from '@any-tdf/site-common/url';
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
