import type { SwiperImgProps, SwiperProps } from 'stdf/types';
import {
	avatarImgs,
	avatarRadiusList,
	createFooterInfo,
	createThemeLabels,
	emojiList1,
	emojiList2,
	getRandomEmoji,
	injPaginationRadiusMap,
	inputRadiusList,
	inputStyleList,
	paginationRadiusList,
	paginationTypeList,
	randomBool,
	randomPick,
	randomRange,
	sliderRadiusList,
	sliderShowTipList,
	swiperData as sharedSwiperData,
	swiperOptions as sharedSwiperOptions,
	switchInsideList,
	switchRadiusList,
	tabRadiusList,
	thinkGithub
} from '@any-tdf/site-common/data';
import type {
	AvatarRadius,
	InputRadius,
	InputStyle,
	PaginationRadius,
	PaginationType,
	SliderRadius,
	SliderShowTip,
	SwitchInside,
	SwitchRadius,
	TabRadius
} from '@any-tdf/site-common/data';

export {
	avatarImgs,
	avatarRadiusList,
	emojiList1,
	emojiList2,
	injPaginationRadiusMap,
	inputRadiusList,
	inputStyleList,
	paginationRadiusList,
	paginationTypeList,
	randomBool,
	randomPick,
	randomRange,
	sliderRadiusList,
	sliderShowTipList,
	switchInsideList,
	switchRadiusList,
	tabRadiusList,
	thinkGithub
};
export type {
	AvatarRadius,
	InputRadius,
	InputStyle,
	PaginationRadius,
	PaginationType,
	SliderRadius,
	SliderShowTip,
	SwitchInside,
	SwitchRadius,
	TabRadius
};

export const themeLabels: Record<string, string> = createThemeLabels('STDF', 'STDF');

export const swiperData: SwiperImgProps[] = sharedSwiperData as SwiperImgProps[];

export const swiperOptions: SwiperProps[] = sharedSwiperOptions as SwiperProps[];

export const descList = [
	{
		title: 'Simple',
		titleZh: '简单',
		desc: '代码清晰，文档完善，易于使用。',
		descEn: 'Clear code, complete docs, easy to use.',
		shwTip: false
	},
	{
		title: 'Tiny',
		titleZh: '轻量',
		desc: '体积小，无依赖，适合移动端。',
		descEn: 'Small size, no deps, for mobile.',
		shwTip: true
	},
	{
		title: 'Design',
		titleZh: '设计',
		desc: '优化移动端设计交互，支持主题配置。',
		descEn: 'Better mobile design & themes.',
		shwTip: false
	},
	{
		title: 'Fast',
		titleZh: '快速',
		desc: '配套脚手架，无虚拟 DOM，性能卓越。',
		descEn: 'With CLI, no vDOM, high performance.',
		shwTip: false
	}
];

export const dominant = {
	title: '优势 & 目标',
	title_en: 'Advantages & Goals',
	data: [
		{
			icon: 'svelte',
			p: '丰富 Svelte 生态，为开发者提供高效、优质的组件库。',
			p_en: 'Enrich the Svelte ecosystem by providing efficient, high-quality component library.'
		},
		{
			icon: 'css3-line',
			p: '简化 CSS 开发流程，让开发者专注业务逻辑实现。',
			p_en: 'Streamline CSS development so developers can focus on business logic implementation.'
		},
		{
			icon: 'contrast-2-line',
			p: '内置暗黑模式与主题系统，轻松构建现代化界面。',
			p_en: 'Built-in dark mode and theming system for easily creating modern interfaces.'
		},
		{
			icon: 'paint-brush-line',
			p: '面向移动端的通用组件库，提供灵活的 UI 定制能力。',
			p_en: 'A versatile mobile component library with flexible UI customization capabilities.'
		},
		{
			icon: 'clockwise-line',
			p: '精心设计的交互体验，流畅的动画过渡，带来极致用户体验。',
			p_en: 'Carefully crafted interactions with smooth animations for ultimate user experience.'
		},
		{
			icon: 'article-line',
			p: '完整的中英文支持，文档、示例和注释清晰完整。',
			p_en: 'Full Chinese and English support with clear documentation, examples and comments.'
		},
		{
			icon: 'file-copy-2-line',
			p: '提供完善的脚手架和插件，助力开发者高效开发。',
			p_en: 'Provides comprehensive scaffolding and plugins for efficient development.'
		},
		{
			icon: 'planet-line',
			p: '强大的国际化支持，内置 60+ 语言包，快速实现多语言应用。',
			p_en: 'Powerful i18n with 60+ built-in language packs for quick multilingual implementation.'
		}
	]
};

export const ugly = {
	title: '提前警告',
	title_en: 'Early Warning',
	data: [
		{
			icon: 'hammer-line',
			p: 'STDF 不追求高大上的概念，只专注于为您提供简单实用的开发工具。',
			p_en: 'STDF focuses solely on providing practical development tools, without any fancy concepts.'
		},
		{
			icon: 'service-line',
			p: 'Svelte 生态仍在发展中，欢迎您加入我们一起建设更好的 Svelte 社区。',
			p_en: 'The Svelte ecosystem is still growing. We welcome you to join us in building a better Svelte community.'
		},
		{
			icon: 'bard-line',
			p: 'STDF 可能使用到 Vite、SvelteKit 等生态，建议先了解这些项目的核心概念。',
			p_en: 'STDF may use Vite, SvelteKit, etc. We recommend understanding their core concepts first.'
		},
		{
			icon: 'css3-line',
			p: 'STDF 支持 UnoCSS 等 Tailwind CSS 类库，使用前请先掌握相关基础知识。',
			p_en: 'STDF supports Tailwind CSS-like libraries such as UnoCSS. Please master the basics before using them.'
		}
	]
};

export const bottomInfo = createFooterInfo({
	currentSite: 'stdf',
	framework: { title: 'Svelte', title_en: 'Svelte', link: 'https://svelte.dev', _blank: true },
	licenseLink: 'https://github.com/any-tdf/any-tdf/blob/main/LICENSE'
});

export const getRandomSwiperOption = (): SwiperProps => {
	return randomPick(swiperOptions);
};

export { getRandomEmoji };
