import { oklchStrToHex, oklchStrToRgbStr } from 'stdf/utils';
import codeGroupSvgData from './code-group-svg-data';
import hljs from 'highlight.js';
// @ts-expect-error - highlightjs-svelte 缺少类型定义
import hljs_svelte from 'highlightjs-svelte/dist/index.mjs';

hljs_svelte(hljs);

/**
 * 节流，每 n 毫秒执行一次
 * @param {function} func - 需要节流的函数
 * @param {number} wait - 节流的时间间隔
 * @returns {function} - 返回节流后的函数
 * @example
 * const throttleFunc = throttle(() => console.log(123), 1000)
 */
export const throttle = <T extends (...args: unknown[]) => void>(func: T, wait: number = 100) => {
	let timer: null | ReturnType<typeof setInterval> = null;
	return function (...args: Parameters<T>) {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			func(...args);
			timer = null;
		}, wait);
	};
};

/**
 * 字符过滤器，防止 HTML 的特殊字符如 <、>、& 等被转义
 * @param {string} text - 需要处理的字符串
 * @returns {string} - 返回处理后的字符串
 * @example
 * htmlFilter('<div>123</div>') // <div>123</div>
 */
const htmlFilter = (text: string) => {
	// 抽离成可配置的匹配列表
	const matchList = {
		'&lt;': '<',
		'&gt;': '>',
		'&amp;': '&',
		'&#34;': '"',
		'&quot;': '"',
		'&#39;': "'"
	};
	let regStr = '(' + Object.keys(matchList).toString() + ')';
	// ↑ ------------【*提取匹配列表 key 值*】.【组数转字符串】
	regStr = regStr.replace(/,/g, ')|(');
	// ↑ 通过匹配将其更新为正则的字符串类型
	const regExp = new RegExp(regStr, 'g');
	// ↑ ------- 字符串 转 正则 方法
	return text.replace(regExp, (match) => matchList[match as keyof typeof matchList]);
	// ↑ ------ 替换方法 (正则，当前 key => 返回当前被匹配的 key 值)
};

/**
 * 将字符串中的一部分替换成另一部分
 * @param {string} str - 需要处理的字符串
 * @param {string} findText - 需要被替换的部分
 * @param {string} replaceText - 需要替换成的部分
 * @returns {string} - 返回处理后的字符串
 * @example
 * replacePart('http://www.baidu.com?name=1&age=2', 'name=1', 'name=2') // http://www.baidu.com?name=2&age=2
 */
const replacePart = (str: string, findText: string, replaceText: string) => {
	return str.replace(findText, replaceText);
};

/**
 * 将 Markdown 文档中的 code 标签高亮
 * @param {string} mdText - 需要处理的 Markdown 文本
 * @returns {string} - 返回处理后的 Markdown 文本
 * @example
 * mdTextToHljs('```js\nconsole.log(123)\n```') // <code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">123</span>)</code>
 */
export const mdTextToHljs = (mdText: string, language: string = '') => {
	// 将所有 <td><code> 标签替换为 <td><code class="hljs language-typescript">
	mdText = mdText.replace(/<td><code>/g, `<td><code class="${language ? 'language-' + language : ''}">`);
	if (mdText.indexOf('<code class="') > 0) {
		let apiText = mdText.indexOf('<code class="') > 0 ? htmlFilter(mdText).replace(/<code class="/g, '<code class="hljs ') : mdText;
		const codeTexts = apiText.match(/<code[\s\S]*?<\/code>/g);
		if (!codeTexts) return apiText;
		for (let t = 0; t < codeTexts.length; t++) {
			const languageMatch = codeTexts[t].match(/<code class="hljs language-(.*?)">/);
			const language = languageMatch ? languageMatch[1] : ''; //语言
			const codeMatch = codeTexts[t].match(/<code[\s\S]*?>([\s\S]*?)<\/code>/);
			const code = codeMatch ? codeMatch[1] : '';
			const highlightedCode = language
				? hljs.highlight(code, {
						language,
						ignoreIllegals: true
					}).value
				: hljs.highlightAuto(code).value;
			// 将高亮代码替换原代码
			const newCode = codeTexts[t].replace(code, highlightedCode);
			apiText = replacePart(apiText, codeTexts[t], newCode);
		}

		return apiText;
	} else {
		return mdText;
	}
};

/**
 * 传入解析出来的 md 文档字符，找到其中  ::: code-group 与  ::: 之间的代码块，并将其分组，实现代码块的 tab 分组显示，
 * 其中 label 标签中的内容为 tab 标签的标题，并在文字前面增加一个 icon 标签，icon 标签的 class 内容为 iconfont 的类名
 * @param {string} md - 解析出来的 md 文档字符
 * @returns {string} - 返回处理后的 md 文档字符
 */
export const groupIconMdPlugin = (md: string) => {
	// 找出自字符中所有的 ::: code-group 与  ::: 之间的字符组成数组
	const codeGroupStrListAll = md.match(/<!-- :::code-groups -->[\s\S]*?<!-- ::: -->/g);
	if (!codeGroupStrListAll) {
		return md;
	}
	const codeGroupStrList = codeGroupStrListAll.map((item) =>
		item
			.replace(/<!-- :::code-groups -->/g, '')
			.replace(/<!-- ::: -->/g, '')
			.split('<!-- :: -->')
	);
	const codeGroupList = codeGroupStrList.map((item) =>
		item.map((subItem) => {
			return {
				tab: subItem.match(/<!-- (.*?) -->/)?.[1],
				code: subItem.replace(/<!-- (.*?) -->/, '')
			};
		})
	);

	const codeGroupHtmlList = codeGroupList.map((item, index) => {
		const arr: { label: string; code: string }[] = [];
		item.forEach((subItem, subIndex) => {
			const label = `
			<input id="tab-${index + '-' + subIndex}" type="radio" name="tab-${index}" class="peer/tab-${index + '-' + subIndex} w-0 hidden" ${
				subIndex === 0 ? 'checked' : ''
			} />
				<label
					for="tab-${index + '-' + subIndex}"
					class="border-b-2 border-black/10 dark:border-white/10 peer-checked/tab-${index + '-' + subIndex}:border-primary dark:peer-checked/tab-${
						index + '-' + subIndex
					}:border-dark transition duration-300 cursor-pointer py-2 px-3 inline-flex items-center gap-1 text-xs"
				>
					${codeGroupSvgData.find((icon) => icon.name === subItem.tab)?.svg}${subItem.tab}
				</label>
			`;
			const code = `<div class="hidden peer-checked/tab-${index + '-' + subIndex}:block w-full">${subItem.code}</div>`;
			arr.push({ label, code });
		});
		return `
			<section class="flex flex-row flex-wrap bg-black/5 dark:bg-white/5 rounded-sm mb-4">
				${arr.map((item) => item.label).join('')}
				${arr.map((item) => item.code).join('')}
			</section>
			`;
	});
	const replaceCodeGroups = (inputString: string, replacements: string[]) => {
		// 定义正则表达式匹配 <!-- :::code-groups --> 与 <!-- ::: --> 之间的内容
		const regex = /<!--\s*:::code-groups\s*-->(.*?)<!--\s*:::\s*-->/gs;

		let index = 0;
		// 替换匹配到的部分
		inputString = inputString.replace(regex, () => {
			if (index < replacements.length) {
				return replacements[index++];
			}
			return '';
		});

		return inputString;
	};
	return replaceCodeGroups(md, codeGroupHtmlList).replace(/w-full">\n\n<pre>/g, 'w-full">\n\n<pre style="margin: 0;">');
};

/**
 * 去除 url 最后一项的？方法
 * @param {string} url - 需要处理的 url
 * @returns {string} - 返回处理后的 url
 * @example
 * delLastParamsUrl('http://www.baidu.com?') // http://www.baidu.com
 */
const delLastParamsUrl = (url: string) => {
	if (url.lastIndexOf('?') === url.length - 1) {
		url = url.substring(0, url.length - 1);
	}
	return url;
};

/**
 * 去除 url 中指定参数的方法
 * @param {string} url - 需要处理的 url
 * @param {string} name - 需要去除的参数名
 * @returns {string} - 返回处理后的 url
 * @example
 * delParamsUrl('http://www.baidu.com?name=1&age=2', 'name') // http://www.baidu.com?age=2
 */
export const delParamsUrl = (url: string, name: string) => {
	const baseUrl = url.split('?')[0] + '?';
	const query = url.split('?')[1];
	if (query.indexOf(name) > -1) {
		const obj: Record<string, string> = {};
		const arr = query.split('&');
		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].split('=')[0];
			obj[key] = arr[i].split('=')[1];
		}
		delete obj[name];
		url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&');
		return delLastParamsUrl(url);
	} else {
		return delLastParamsUrl(url);
	}
};

/** OKLCH 颜色对象类型 */
export type OklchColor = { l: number; c: number; h: number };

/**
 * 生成主题黑白色的公共函数（使用 OKLCH 算法）
 * @param {OklchColor} color - OKLCH 颜色对象 { l, c, h }
 * @param {boolean} isBlack - 是否生成主题黑色
 * @returns {string} oklch 格式的颜色字符串
 * @description
 * 保留原色的色相，调整亮度和色度：
 * - 主题黑：L = 0.15，C = 原色度的 20%（保留微弱色彩倾向）
 * - 主题白：L = 0.97，C = 原色度的 10%（接近纯白但带一点色彩）
 */
const generateThemeBW = (color: OklchColor, isBlack: boolean): string => {
	const { c, h } = color;
	const newL = isBlack ? 0.15 : 0.97;
	const newC = isBlack ? c * 0.2 : c * 0.1;

	return `oklch(${+newL.toFixed(3)} ${+newC.toFixed(3)} ${+h.toFixed(3)})`;
};

/** 根据给定颜色计算出主题黑 */
export const generateThemeBlack = (color: OklchColor): string => generateThemeBW(color, true);

/** 根据给定颜色计算出主题白 */
export const generateThemeWhite = (color: OklchColor): string => generateThemeBW(color, false);

/**
 * 将 oklch 格式颜色字符串转换为十六进制格式
 * @param {string} oklchStr - oklch 格式的颜色字符串
 * @returns {string} - 返回十六进制格式的颜色值
 */
export const oklchToHex = (oklchStr: string): string => {
	return oklchStrToHex(oklchStr);
};

/**
 * 将 oklch 格式颜色字符串转换为 RGB 格式
 * @param {string} oklchStr - oklch 格式的颜色字符串
 * @returns {string} - 返回 rgb(r, g, b) 格式的颜色值
 */
export const oklchToRgb = (oklchStr: string): string => {
	return oklchStrToRgbStr(oklchStr);
};

/**
 * 将传入的对象转为数组，且 default 在第 6 项
 * @param {object} obj - 需要转换的对象
 * @returns {array} - 返回转换后的数组
 * @example
 * colorObjToArr({ 50: '#50', 100: '#100', 200: '#200', 300: '#300', 400: '#400', 500: '#500', 700: '#700', 800: '#800', 900: '#900', default: '#000' })
 * [{key: '50', value: '#50'}, {key: '100', value: '#100'}, {key: '200', value: '#200'}, {key: '300', value: '#300'}, {key: '400', value: '#400'}, {key: '500', value: '#500'},{key: 'default', value: '#000'},{key: '700', value: '#700'},{key: '800', value: '#800'},{key: '900', value: '#900'}]
 */
export const colorObjToArr = (obj: Record<string, string>) => {
	// 将 obj 转为数组
	const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));
	// 将最后一项移动到第 6 项
	const lastItem = arr.pop();
	if (lastItem) {
		arr.splice(6, 0, lastItem);
	}
	return arr;
};

/**
 * 传入 oklch 格式的颜色值与透明度，返回带透明度的 oklch 格式
 * @param {string} str - 颜色值
 * @param {number} opacity - 透明度
 * @returns {string} - 返回带透明度的 oklch 格式
 * @example
 * getOklchOpacity('oklch(0.5 0.5 0)', 0.5) // 'oklch(0.5 0.5 0 / 0.5)'
 */
export const getOklchOpacity = (str: string, opacity: number) => {
	// 将最后一个 ) 替换为【/ 透明度】
	return str.replace(/\)$/, ` / ${opacity})`);
};

/**
 * 计算两个 OKLCH 颜色之间的对比度
 * @param {OklchColor} color1 - OKLCH 颜色对象
 * @param {OklchColor} color2 - OKLCH 颜色对象
 * @returns {number} 对比度比值 (1:1 到 21:1)
 * @description
 * 基于 WCAG 2.1 对比度计算标准的近似算法。
 * 使用 OKLCH 的 L 值作为感知亮度的近似。
 */
export const calculateContrastRatio = (color1: OklchColor, color2: OklchColor): number => {
	const l1 = Math.max(color1.l, color2.l);
	const l2 = Math.min(color1.l, color2.l);
	return (l1 + 0.05) / (l2 + 0.05);
};

/** WCAG 等级类型 */
export type WCAGLevel = 'AAA' | 'AA' | 'A' | 'Fail';

/**
 * 获取 WCAG 等级
 * @param {number} ratio - 对比度比值
 * @param {boolean} isLargeText - 是否为大文本（>=18pt 或 >=14pt bold）
 * @returns {WCAGLevel} WCAG 等级
 * @description
 * WCAG 2.1 对比度要求：
 * - 普通文本：AAA >= 7:1, AA >= 4.5:1, A >= 3:1
 * - 大文本：AAA >= 4.5:1, AA >= 3:1
 */
export const getWCAGLevel = (ratio: number, isLargeText: boolean = false): WCAGLevel => {
	if (isLargeText) {
		if (ratio >= 4.5) return 'AAA';
		if (ratio >= 3) return 'AA';
		return 'Fail';
	}
	if (ratio >= 7) return 'AAA';
	if (ratio >= 4.5) return 'AA';
	if (ratio >= 3) return 'A';
	return 'Fail';
};

/**
 * 计算对比度分数 (0-100)
 * @param {number} ratio - 对比度比值
 * @returns {number} 0-100 的分数
 * @description
 * 以 7:1（AAA 等级）为满分 100，线性映射
 */
export const getContrastScore = (ratio: number): number => {
	return Math.min((ratio / 7) * 100, 100);
};

/**
 * 评估颜色在背景上的可见性
 * @param {OklchColor} foreground - 前景色
 * @param {OklchColor} background - 背景色
 * @returns {{ ratio: number; level: WCAGLevel; score: number }} 评估结果
 */
export const evaluateColorContrast = (
	foreground: OklchColor,
	background: OklchColor
): { ratio: number; level: WCAGLevel; score: number } => {
	const ratio = calculateContrastRatio(foreground, background);
	const level = getWCAGLevel(ratio);
	const score = getContrastScore(ratio);
	return { ratio, level, score };
};

/**
 * 生成满足对比度要求的随机 OKLCH 颜色
 * @param {'light' | 'dark'} mode - 颜色模式
 * @returns {OklchColor} OKLCH 颜色对象
 * @description
 * - light 模式：生成在白色背景上突出的颜色（L: 0.35-0.55）
 * - dark 模式：生成在黑色背景上突出的颜色（L: 0.7-0.9）
 */
export const generateRandomOklchColor = (mode: 'light' | 'dark'): OklchColor => {
	const h = Math.random() * 360; // 色相全范围
	const c = 0.12 + Math.random() * 0.13; // 色度 0.12-0.25

	let l: number;
	if (mode === 'light') {
		// 亮色模式：需要在白色背景上突出，L 应该较低
		l = 0.35 + Math.random() * 0.2; // L: 0.35-0.55
	} else {
		// 暗色模式：需要在黑色背景上突出，L 应该较高
		l = 0.7 + Math.random() * 0.2; // L: 0.7-0.9
	}

	return { l, c, h };
};

/**
 * 生成满足对比度的文字颜色
 * @param {OklchColor} backgroundColor - 背景色
 * @param {number} minRatio - 最小对比度要求，默认 4.5（AA 等级）
 * @returns {OklchColor} OKLCH 颜色对象
 * @description
 * 根据背景色亮度自动选择深色或浅色文字
 */
export const generateTextColor = (backgroundColor: OklchColor, minRatio: number = 4.5): OklchColor => {
	// 根据背景色亮度决定文字颜色
	if (backgroundColor.l > 0.5) {
		// 浅色背景使用深色文字
		return { l: 0.15, c: 0, h: 0 };
	} else {
		// 深色背景使用浅色文字
		return { l: 0.95, c: 0, h: 0 };
	}
};
