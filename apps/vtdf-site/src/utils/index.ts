import { createMdTextToHljs, groupIconMdPlugin as baseGroupIconMdPlugin } from '@any-tdf/site-common/markdown';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import codeGroupSvgData from './code-group-svg-data';

// 只注册站点文档实际使用的语言，vue 复用 xml 高亮
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerAliases('vue', { languageName: 'xml' });

export { throttle } from '@any-tdf/site-common/site';

export { hljs };
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
