import type { SwiperImgProps, SwiperProps } from 'vtdf/types';
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

export const themeLabels: Record<string, string> = createThemeLabels('ANYTDF', 'ANYTDF');

export const swiperData: SwiperImgProps[] = sharedSwiperData as SwiperImgProps[];

export const swiperOptions: SwiperProps[] = sharedSwiperOptions as SwiperProps[];

export const descList = [
	{
		title: 'Visual',
		titleZh: '视觉',
		desc: '视觉表现清晰统一，主题与组件样式灵活可定制。',
		descEn: 'Clear visual language with flexible themes and component styles.',
		shwTip: false
	},
	{
		title: 'Tiny',
		titleZh: '轻量',
		desc: '体积小，按需引入，适合移动端。',
		descEn: 'Compact size, tree-shakable, mobile-ready.',
		shwTip: true
	},
	{
		title: 'Design',
		titleZh: '设计',
		desc: '移动端交互优化，主题系统可配置。',
		descEn: 'Mobile-first interactions with configurable themes.',
		shwTip: false
	},
	{
		title: 'Fast',
		titleZh: '快速',
		desc: '配套脚手架与工具链，开发与构建更高效。',
		descEn: 'Scaffolded tooling for faster dev and build.',
		shwTip: false
	}
];

export const dominant = {
	title: '优势与目标',
	title_en: 'Advantages and Goals',
	data: [
		{
			icon: 'code-box-fill',
			p: '丰富 Vue 生态，为开发者提供高效、优质的组件库。',
			p_en: 'Enrich the Vue ecosystem by providing an efficient, high-quality component library.'
		},
		{
			icon: 'css3-line',
			p: '简化 CSS 开发流程，让开发者专注业务逻辑实现。',
			p_en: 'Streamline CSS development so developers can focus on business logic.'
		},
		{
			icon: 'contrast-2-line',
			p: '内置暗黑模式与主题系统，轻松构建现代化界面。',
			p_en: 'Built-in dark mode and theming system for modern interfaces.'
		},
		{
			icon: 'paint-brush-line',
			p: '面向移动端的通用组件库，提供灵活的 UI 定制能力。',
			p_en: 'A versatile mobile component library with flexible UI customization.'
		},
		{
			icon: 'clockwise-line',
			p: '精心设计的交互体验，流畅的动画过渡，带来极致用户体验。',
			p_en: 'Carefully crafted interactions with smooth animations for great user experience.'
		},
		{
			icon: 'article-line',
			p: '完整的中英文支持，文档、示例和注释清晰完整。',
			p_en: 'Full Chinese and English support with clear docs, examples, and comments.'
		},
		{
			icon: 'file-copy-2-line',
			p: '提供完善的脚手架和插件，助力开发者高效开发。',
			p_en: 'Provides scaffolding and plugins for efficient development.'
		},
		{
			icon: 'planet-line',
			p: '强大的国际化支持，内置 60 多语言包，快速实现多语言应用。',
			p_en: 'Powerful i18n with 60+ built-in language packs for quick multilingual apps.'
		}
	]
};

export const ugly = {
	title: '提前警告',
	title_en: 'Early Warning',
	data: [
		{
			icon: 'hammer-line',
			p: 'VTDF 不追求高大上的概念，只专注于为您提供简单实用的开发工具。',
			p_en: 'VTDF focuses on practical tools instead of fancy concepts.'
		},
		{
			icon: 'service-line',
			p: 'VTDF 仍在持续迭代，欢迎您加入我们一起建设更好的 Vue 组件生态。',
			p_en: 'VTDF is still evolving. Join us to build a better Vue component ecosystem.'
		},
		{
			icon: 'bard-line',
			p: 'VTDF 可能使用到 Vite、Vue Router 等生态，建议先了解这些项目的核心概念。',
			p_en: 'VTDF may use Vite, Vue Router, and other tooling. Learn their core concepts first.'
		},
		{
			icon: 'css3-line',
			p: 'VTDF 基于 Tailwind CSS 体系，使用前请先掌握相关基础知识。',
			p_en: 'VTDF is built on the Tailwind CSS ecosystem. Please master the basics before using it.'
		}
	]
};

export const bottomInfo = createFooterInfo({
	currentSite: 'vtdf',
	framework: { title: 'Vue', title_en: 'Vue', link: 'https://vuejs.org', _blank: true },
	licenseLink: 'https://github.com/any-tdf/any-tdf/blob/main/LICENSE'
});

export const getRandomSwiperOption = (): SwiperProps => randomPick(swiperOptions);
