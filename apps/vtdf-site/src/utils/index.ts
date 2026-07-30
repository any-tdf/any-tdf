import { createMdTextToHljs, groupIconMdPlugin as baseGroupIconMdPlugin } from '@any-tdf/site-common/markdown';
import hljs from 'highlight.js';
import codeGroupSvgData from './code-group-svg-data';

hljs.registerAliases('vue', { languageName: 'xml' });

export { throttle } from '@any-tdf/site-common/site';

export const mdTextToHljs = createMdTextToHljs(hljs);

export const groupIconMdPlugin = (md: string) => {
	return baseGroupIconMdPlugin(md, { codeGroupSvgData });
};

export { defaultThemeName, normalizeThemeName } from './theme';
export { delParamsUrl } from '@any-tdf/site-common/url';
export {
	calculateContrastRatio,
	colorObjToArr,
	evaluateColorContrast,
	generateRandomOklchColor,
	generateTextColor,
	generateThemeBlack,
	generateThemeWhite,
	getContrastScore,
	getOklchOpacity,
	getWCAGLevel,
	oklchToHex,
	oklchToRgb
} from '@any-tdf/site-common/theme';
export type { OklchColor, WCAGLevel } from '@any-tdf/site-common/theme';
