export { default as aphorisms } from './stdf-data/aphorisms.js';
export { menuList } from './stdf-data/menuList.js';
export type { MenuList, MenuListChild } from './stdf-data/menuList.js';
export { guideMenuList } from './stdf-data/guideMenuList.js';
export type { GuideMenuChild, GuideMenuGroup } from './stdf-data/guideMenuList.js';
export {
	fallbackComponentIcon,
	componentCategoryIconMap,
	componentIconMap,
	guideCategoryIconMap,
	guideItemIconMap
} from './stdf-data/icons.js';

export type SiteSwiperImg = {
	type: 'img';
	url: string;
};

export type SiteSwiperOption = {
	data: SiteSwiperImg[];
	containerWidth?: number;
	px?: string;
	py?: string;
	indicateInjClass?: string;
	indicateColor?: string;
	indicateActiveColor?: string;
	radius?: string;
	indicateStyle?: string;
	aspectRatio?: [number, number];
	innerInjClass?: string;
	translateX?: number;
	rotateY?: number;
	translateZ?: number;
	notActiveInjClass?: string;
};

export type FooterLink = {
	title: string;
	title_en: string;
	link: string;
	_blank: boolean;
};

export type FooterInfo = {
	title: string;
	title_en: string;
	list: FooterLink[];
};

type FooterSite = 'stdf' | 'rtdf' | 'vtdf';

export type FooterInfoConfig = {
	currentSite: FooterSite;
	framework: FooterLink;
	licenseLink: string;
};

const anyTdfSiteLinks: Record<FooterSite, FooterLink> = {
	stdf: { title: 'STDF', title_en: 'STDF', link: 'https://stdf.dev', _blank: true },
	rtdf: { title: 'RTDF', title_en: 'RTDF', link: 'https://rtdf.dev', _blank: true },
	vtdf: { title: 'VTDF', title_en: 'VTDF', link: 'https://vtdf.dev', _blank: true }
};

const footerSiteList: FooterSite[] = ['stdf', 'rtdf', 'vtdf'];

const motionLinks: FooterLink[] = [
	{ title: 'react-motion', title_en: 'react-motion', link: 'https://react-motion.any-tdf.dev', _blank: true },
	{ title: 'vue-motion', title_en: 'vue-motion', link: 'https://vue-motion.any-tdf.dev', _blank: true }
];

const toolLinks: FooterLink[] = [
	{ title: 'create-any-tdf', title_en: 'create-any-tdf', link: 'https://www.npmjs.com/package/create-any-tdf', _blank: true },
	{
		title: 'vite-plugin-svg-symbol',
		title_en: 'vite-plugin-svg-symbol',
		link: 'https://www.npmjs.com/package/@any-tdf/vite-plugin-svg-symbol',
		_blank: true
	},
	{
		title: 'vite-plugin-md-ts',
		title_en: 'vite-plugin-md-ts',
		link: 'https://www.npmjs.com/package/@any-tdf/vite-plugin-md-ts',
		_blank: true
	},
	{
		title: 'Any TDF for VS Code',
		title_en: 'Any TDF for VS Code',
		link: 'https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension',
		_blank: true
	},
	...motionLinks
];

const confettiLinks: FooterLink[] = [
	{ title: 'react-confetti', title_en: 'react-confetti', link: 'https://react-confetti.any-tdf.dev', _blank: true },
	{ title: 'vue-confetti', title_en: 'vue-confetti', link: 'https://vue-confetti.any-tdf.dev', _blank: true }
];

const builtInIconLinks: FooterLink[] = [
	{ title: 'Remix', title_en: 'Remix', link: 'https://remixicon.com', _blank: true },
	{ title: 'Lucide', title_en: 'Lucide', link: 'https://lucide.dev', _blank: true },
	{ title: 'Phosphor', title_en: 'Phosphor', link: 'https://phosphoricons.com', _blank: true },
	{ title: 'Tabler', title_en: 'Tabler', link: 'https://tabler.io/icons', _blank: true },
	{ title: 'Iconoir', title_en: 'Iconoir', link: 'https://iconoir.com', _blank: true },
	{ title: 'Reicon', title_en: 'Reicon', link: 'https://reicon.dev', _blank: true }
];

const sharedThemeLabels: Record<string, string> = {
	Nintendo: '红蓝天堂',
	Ocean: '海蓝金沙',
	Forest: '翠林暖棕',
	Sunset: '橙霞蓝天',
	Cherry: '粉樱翠影',
	Twilight: '暮紫粉霞',
	Amber: '琥珀紫韵',
	Mint: '薄荷玫红',
	Coral: '珊瑚碧蓝',
	Slate: '石墨暖棕',
	Emerald: '翡翠丹霞',
	Crimson: '绯红碧波',
	Navy: '藏蓝珊瑚',
	Olive: '橄榄紫烟',
	Plum: '梅紫青翠',
	Cyan: '青碧暖橙',
	Tangerine: '蜜橘深蓝',
	Sage: '草绿粉紫',
	Berry: '浆紫嫩绿',
	Wine: '酒红翠青',
	IKEA: '宜家蓝黄',
	Ferrari: '法拉红金',
	Tiffany: '蒂芙蓝白',
	Pepsi: '百事蓝红',
	Spotify: '声田绿米',
	Netflix: '奈飞红白',
	Hermes: '爱马橙棕',
	CocaCola: '可乐红白',
	Starbucks: '星巴绿棕',
	McDonalds: '金拱红黄',
	Gucci: '古驰绿红',
	Chanel: '香奈黑米',
	Rolex: '劳力绿金',
	LouisVuitton: '路威棕金',
	Mastercard: '万事红橙',
	Sepia: '泛黄记忆',
	GoldWood: '金色森林',
	CyberNeon: '赛博霓虹',
	Aurora: '极光幻夜',
	Terracotta: '陶青梦境',
	Sakura: '靛蓝樱花'
};

export const createThemeLabels = (defaultKey: string, defaultLabel: string): Record<string, string> => ({
	[defaultKey]: defaultLabel,
	...sharedThemeLabels
});

export const swiperData: SiteSwiperImg[] = [
	{ type: 'img', url: '/assets/images/home/wall_1.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_2.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_3.jpg' },
	{ type: 'img', url: '/assets/images/home/wall_4.jpg' }
];

export const swiperOptions: SiteSwiperOption[] = [
	{
		data: swiperData,
		containerWidth: 390,
		px: '6',
		py: '6',
		indicateInjClass: 'bg-none',
		indicateColor: 'bg-black/5 dark:bg-white/10',
		indicateActiveColor: 'bg-primary dark:bg-dark',
		radius: 'xl',
		indicateStyle: 'longLine'
	},
	{
		data: swiperData,
		containerWidth: 390,
		px: '16',
		py: '6',
		indicateInjClass: 'bg-none',
		indicateColor: 'bg-primary dark:bg-dark',
		indicateActiveColor: 'bg-primary dark:bg-dark',
		radius: 'xl',
		aspectRatio: [3, 1],
		innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20',
		translateX: 100
	},
	{
		data: swiperData,
		containerWidth: 390,
		px: '4',
		py: '8',
		indicateInjClass: 'bg-none',
		indicateColor: 'bg-primary dark:bg-dark',
		indicateActiveColor: 'bg-primary dark:bg-dark',
		radius: 'xl',
		rotateY: 90,
		innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20'
	},
	{
		data: swiperData,
		containerWidth: 390,
		px: '24',
		py: '8',
		indicateInjClass: 'bg-none',
		indicateColor: 'bg-primary dark:bg-dark',
		indicateActiveColor: 'bg-primary dark:bg-dark',
		innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20',
		radius: 'xl',
		aspectRatio: [3, 1],
		translateX: 160,
		notActiveInjClass: 'grayscale'
	},
	{
		data: swiperData,
		indicateStyle: 'longLine',
		containerWidth: 390,
		px: '12',
		py: '8',
		indicateInjClass: 'bg-none',
		indicateColor: 'bg-black/5 dark:bg-white/10',
		indicateActiveColor: 'bg-primary dark:bg-dark',
		radius: 'xl',
		translateZ: 600,
		innerInjClass: 'shadow-md shadow-black/20 dark:shadow-white/20'
	}
];

export const thinkGithub = [
	{ name: 'sbscan', amount: 100 },
	{ name: 'MuGuiLin', amount: 50 },
	{ name: 'yuedanlabs', amount: 10 }
];

export const createFooterInfo = (config: FooterInfoConfig): FooterInfo[] => [
	{
		title: 'Any TDF',
		title_en: 'Any TDF',
		list: [
			{ title: 'Any TDF', title_en: 'Any TDF', link: 'https://any-tdf.dev', _blank: true },
			...footerSiteList.filter((site) => site !== config.currentSite).map((site) => anyTdfSiteLinks[site]),
			...confettiLinks
		]
	},
	{
		title: '相关',
		title_en: 'Related',
		list: [
			config.framework,
			{
				title: 'Tailwind CSS',
				title_en: 'Tailwind CSS',
				link: 'https://tailwindcss.com',
				_blank: true
			},
			{ title: '关于', title_en: 'About', link: '/guide/about', _blank: false },
			{ title: '常见问题', title_en: 'FAQ', link: '/guide/faq', _blank: false },
			{ title: '开源许可', title_en: 'License', link: config.licenseLink, _blank: true }
		]
	},
	{
		title: '工具',
		title_en: 'Tools',
		list: toolLinks
	},
	{
		title: '内置图标',
		title_en: 'Built-in Icons',
		list: builtInIconLinks
	}
];

export const avatarRadiusList = ['none', 'sm', 'xl', '2xl', '3xl', 'full'] as const;
export type AvatarRadius = (typeof avatarRadiusList)[number];

export const avatarImgs = ['/assets/images/home/wall_3.jpg', '/assets/images/home/avatar_1.jpg', null] as const;

export const switchRadiusList = ['none', 'sm', 'full'] as const;
export type SwitchRadius = (typeof switchRadiusList)[number];

export const switchInsideList = ['state', 'loading', null] as const;
export type SwitchInside = (typeof switchInsideList)[number];

export const sliderRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type SliderRadius = (typeof sliderRadiusList)[number];

export const sliderShowTipList = ['always', 'never', 'touch'] as const;
export type SliderShowTip = (typeof sliderShowTipList)[number];

export const emojiList1 = ['love', 'default'] as const;
export const emojiList2 = ['👍', '👋', '👏', '🌺', '🏆', '🎯', '💯', '🎳', '🎖️'] as const;

export const tabRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type TabRadius = (typeof tabRadiusList)[number];

export const paginationTypeList = ['block', 'bold', 'border'] as const;
export type PaginationType = (typeof paginationTypeList)[number];

export const paginationRadiusList = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;
export type PaginationRadius = (typeof paginationRadiusList)[number];

export const injPaginationRadiusMap: Record<PaginationRadius, string> = {
	none: 'rounded-none',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	full: 'rounded-full'
};

export const inputRadiusList = ['none', 'full', 'sm', 'xl'] as const;
export type InputRadius = (typeof inputRadiusList)[number];

export const inputStyleList = ['line', 'block'] as const;
export type InputStyle = (typeof inputStyleList)[number];

export const randomPick = <T>(arr: readonly T[] | T[]): T => {
	return arr[Math.floor(Math.random() * arr.length)];
};

export const randomRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomBool = (probability = 0.5): boolean => {
	return Math.random() > probability;
};

export const getRandomSwiperOption = (): SiteSwiperOption => {
	return randomPick(swiperOptions);
};

export const getRandomEmoji = (): string => {
	return randomBool() ? randomPick(emojiList1) : randomPick(emojiList2);
};
