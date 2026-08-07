import { themes } from '@any-tdf/common/theme/runtime';
import { createThemeLabels } from '@any-tdf/site-common/data';
import { siteHeaderIconPaths } from '@any-tdf/site-common/site';
import {
	Blocks,
	CodeXml,
	createIcons,
	ExternalLink,
	Layers,
	Menu,
	Monitor,
	Moon,
	PackageCheck,
	PackageOpen,
	Paintbrush,
	PanelsTopLeft,
	Plug,
	RefreshCw,
	Repeat2,
	Sun,
	Workflow,
	X
} from 'lucide';
import './styles.css';

createIcons({
	icons: {
		Blocks,
		CodeXml,
		ExternalLink,
		Layers,
		Menu,
		Monitor,
		Moon,
		PackageCheck,
		PackageOpen,
		Paintbrush,
		PanelsTopLeft,
		Plug,
		RefreshCw,
		Repeat2,
		Sun,
		Workflow,
		X
	}
});

for (const icon of document.querySelectorAll('[data-site-header-icon]')) {
	icon.querySelector('path').setAttribute('d', siteHeaderIconPaths[icon.dataset.siteHeaderIcon]);
}

const translations = {
	zh: {
		brandLabel: 'Any TDF 首页',
		navLabel: '主导航',
		mobileNavLabel: '移动端导航',
		openMenu: '打开导航菜单',
		closeMenu: '关闭导航菜单',
		theme: '主题',
		interfaceTheme: '界面主题',
		modeAndBuiltInColors: '模式与内置颜色',
		modeGroupLabel: '显示模式',
		lightMode: '亮模式',
		darkMode: '暗模式',
		systemMode: '跟随系统',
		builtInThemesLabel: '内置主题',
		backToMenu: '← 返回',
		support: '支持',
		supportStarLabel: '在 GitHub 上为 Any TDF 点亮 Star',
		supportCloseLabel: '关闭支持窗口',
		supportDescription:
			'Any TDF 是一个免费、开源、持续演进的移动 Web 组件生态。我们在跨框架组件设计、配套工具和文档建设等方面投入了大量心力。如果 Any TDF 为你带来了帮助，欢迎点亮 Star 或通过赞助支持项目继续发展，感谢你的认可！',
		supportPromise: '无论如何，Any TDF 都会怀着热爱继续前行！',
		supportNonChina: '推荐非中国地区使用',
		supportChina: '推荐中国地区使用',
		supportWechat: '微信赞赏 ↗',
		supportAlipay: '支付宝收款 ↗',
		supportWechatScan: '微信扫一扫',
		supportAlipayScan: '支付宝扫一扫',
		supportWechatOpenLabel: '显示微信赞赏二维码',
		supportWechatCloseLabel: '收起微信赞赏二维码',
		supportAlipayOpenLabel: '显示支付宝收款二维码',
		supportAlipayCloseLabel: '收起支付宝收款二维码',
		supportWechatCodeAlt: '微信赞赏二维码',
		supportAlipayCodeAlt: '支付宝收款二维码',
		supportNote: '欢迎在赞助留言中附上你的 GitHub 或其他社交账号链接，Any TDF 将在项目仓库和官网中展示感谢！',
		heroDescription: '一个共享产品语言、面向三种框架原生实现的移动 Web 组件系统。选择你熟悉的框架，获得一致的设计、主题与交互体验。',
		chooseFramework: '选择框架',
		exploreArchitecture: '了解架构',
		heroNote: '共享行为契约，不共享框架限制。',
		architecturePreviewLabel: 'Any TDF 架构概览',
		mapCommon: '状态派生 · 主题语义 · 公共类型',
		productsTitle: '同一套设计语言，三种原生实现',
		productsDescription: '每个组件库都基于 Tailwind CSS，并遵循一致的组件能力、主题语义和文档结构，同时保留对应框架最自然的开发方式。',
		stdfDescription: '面向 Svelte 的移动 Web 组件库，保持简洁的组件语法与轻量运行时体验。',
		rtdfDescription: '面向 React 的移动 Web 组件库，以组件与 Hook 适配共享交互契约。',
		vtdfDescription: '面向 Vue 的移动 Web 组件库，以组件和组合式函数提供原生 Vue 体验。',
		framework: '框架',
		styling: '样式基础',
		package: 'npm 包',
		openSite: '打开官网',
		architectureTitle: '共享产品逻辑，保留框架原生渲染',
		architectureDescription: 'Any TDF 共享状态推导、主题、语言、SVG 数据与公共类型，但不把 Svelte、React、Vue 强行合并为同一套渲染源码。',
		architectureRule: '依赖方向保持单向',
		sharedLayer: '共享层',
		sharedLayerDetail: '组件状态 · 主题语义 · 语言与类型 · SVG 数据',
		adapterLayer: '适配层',
		svelteAdapter: 'Svelte 组件、事件与插槽',
		reactAdapter: 'React 组件、Props 与 Hook',
		vueAdapter: 'Vue 组件、事件与插槽',
		experienceLayer: '体验层',
		independentPackages: '独立 npm 包',
		independentSites: '独立官网',
		frameworkDemos: '框架 Demo',
		sharedTooling: '共享工具链',
		motionCompatibility: '动效兼容',
		motionTitle: 'Svelte 原生，React 与 Vue 对齐',
		motionDescription:
			'Svelte 直接使用框架内置的 easing、transition、animate 与 motion 能力；为了让另外两端保持一致的动效语义，Any TDF 分别实现了 React 和 Vue 版本。',
		reactMotionDescription: '对齐 Svelte API 的动效函数、React 组件与 Hook。',
		vueMotionDescription: '对齐 Svelte API 的动效函数、Vue 组件与组合式函数。',
		principlesTitle: '统一但不抹平差异',
		principlesDescription: '架构围绕可维护的共享边界设计，让三端保持一致，也让每个框架仍然像它自己。',
		nativeTitle: '框架原生',
		nativeDescription: '组件、事件、插槽和类型都遵循各自框架的习惯，不引入额外跨框架运行时。',
		consistentTitle: '体验一致',
		consistentDescription: '组件范围、主题语义、文档结构和移动交互在三端保持可预测的一致性。',
		tailwindTitle: 'Tailwind CSS 基础',
		tailwindDescription: '三套组件库都基于 Tailwind CSS，共享清晰的主题变量和可组合样式语言。',
		deliveryTitle: '独立交付',
		deliveryDescription: '每个组件库都可以单独安装、构建和使用，消费者不需要了解 Monorepo。',
		resourcesTitle: '组件之外，还有完整的开发工具链',
		resourcesDescription: '除核心组件库与 Motion 实现外，Any TDF 还提供共享能力、脚手架、构建插件、视觉效果、AI Skill 与编辑器支持。',
		npmResourcesTitle: 'npm 包',
		skillsResourcesTitle: 'AI Skill',
		vscodeResourcesTitle: 'VS Code 插件',
		officialWebsite: '官网',
		sourceCode: '源码',
		reactConfettiResourceDescription: '面向 React 的纯 HTML 与 CSS 彩纸动画，保持 svelte-confetti 的轻量实现和 SSR 兼容。',
		vueConfettiResourceDescription: '面向 Vue 的纯 HTML 与 CSS 彩纸动画，保持 svelte-confetti 的轻量实现和 SSR 兼容。',
		commonResourceDescription: '跨框架共享工具、主题、语言包、类型，以及由组件状态派生的公共能力。',
		createAnyTdfResourceDescription: '用于创建 STDF、RTDF 与 VTDF TypeScript 项目的命令行脚手架。',
		mdPluginResourceDescription: '把 Markdown 文件转换为 JavaScript 模块的 Vite 与 Rollup 插件。',
		svgPluginResourceDescription: '把多个 SVG 文件合并为 symbol sprite 的 Vite 与 Rollup 插件。',
		stdfSkillResourceDescription: '面向 AI 代理的 STDF 离线资料，覆盖组件、主题、色彩、国际化、脚手架与图标方案。',
		rtdfSkillResourceDescription: '面向 AI 代理的 RTDF 离线资料，覆盖组件、主题、色彩、国际化、脚手架与图标方案。',
		vtdfSkillResourceDescription: '面向 AI 代理的 VTDF 离线资料，覆盖组件、主题、色彩、国际化、脚手架与图标方案。',
		vscodeExtensionResourceDescription: '为 STDF、RTDF 与 VTDF 提供组件 API 悬停文档、版本信息和框架原生代码补全。',
		ctaTitle: '从你熟悉的框架开始',
		ctaDescription: '访问对应官网，查看指南、组件、主题生成器和在线 Demo。',
		footerRelated: '相关',
		footerTools: '工具',
		footerBuiltInIcons: '内置图标',
		footerLicense: '开源许可',
		pageTitle: 'Any TDF - 一个系统，三种原生框架体验',
		pageDescription: 'Any TDF 是面向 Svelte、React 与 Vue 的移动 Web 组件系统，提供一致的设计语言、主题能力和原生框架体验。'
	},
	en: {
		brandLabel: 'Any TDF home',
		navLabel: 'Main navigation',
		mobileNavLabel: 'Mobile navigation',
		openMenu: 'Open navigation menu',
		closeMenu: 'Close navigation menu',
		theme: 'Theme',
		interfaceTheme: 'Interface theme',
		modeAndBuiltInColors: 'Mode and built-in colors',
		modeGroupLabel: 'Display mode',
		lightMode: 'Light',
		darkMode: 'Dark',
		systemMode: 'System',
		builtInThemesLabel: 'Built-in themes',
		backToMenu: '← Back',
		support: 'Support',
		supportStarLabel: 'Star Any TDF on GitHub',
		supportCloseLabel: 'Close support dialog',
		supportDescription:
			'Any TDF is a free, open-source, continuously evolving mobile Web component ecosystem. We put substantial care into cross-framework component design, supporting tools, and documentation. If Any TDF has helped you, please consider starring or sponsoring the project. Thank you for your support!',
		supportPromise: 'No matter what, Any TDF will keep moving forward with love!',
		supportNonChina: 'Recommended for regions outside China',
		supportChina: 'Recommended for China',
		supportWechat: 'WeChat Reward ↗',
		supportAlipay: 'Alipay Payment ↗',
		supportWechatScan: 'Scan with WeChat',
		supportAlipayScan: 'Scan with Alipay',
		supportWechatOpenLabel: 'Show the WeChat reward QR code',
		supportWechatCloseLabel: 'Hide the WeChat reward QR code',
		supportAlipayOpenLabel: 'Show the Alipay payment QR code',
		supportAlipayCloseLabel: 'Hide the Alipay payment QR code',
		supportWechatCodeAlt: 'WeChat reward QR code',
		supportAlipayCodeAlt: 'Alipay payment QR code',
		supportNote:
			'Feel free to include your GitHub or another social profile in your sponsorship message. Any TDF will gratefully acknowledge your support in the project repository and on the website!',
		heroDescription:
			'One shared product language, implemented natively for three frameworks. Choose the framework you know and keep the same design, theming, and interaction experience.',
		chooseFramework: 'Products',
		exploreArchitecture: 'Architecture',
		heroNote: 'Share behavior contracts, not framework constraints.',
		architecturePreviewLabel: 'Any TDF architecture overview',
		mapCommon: 'Derived state · Theme semantics · Shared types',
		productsTitle: 'One design language, three native implementations',
		productsDescription:
			'Every library is built on Tailwind CSS and follows the same component capabilities, theme semantics, and documentation structure while preserving each framework’s natural development model.',
		stdfDescription: 'Mobile Web components for Svelte, with concise component syntax and a lightweight runtime experience.',
		rtdfDescription: 'Mobile Web components for React, adapting shared interaction contracts through components and hooks.',
		vtdfDescription: 'Mobile Web components for Vue, delivered through native components and composables.',
		framework: 'Framework',
		styling: 'Styling',
		package: 'npm package',
		openSite: 'Open website',
		architectureTitle: 'Share product logic, keep native rendering',
		architectureDescription:
			'Any TDF shares derived state, themes, language, SVG data, and public types without forcing Svelte, React, and Vue into one rendering source.',
		architectureRule: 'Dependencies flow in one direction',
		sharedLayer: 'Shared layer',
		sharedLayerDetail: 'Component state · Theme semantics · Language and types · SVG data',
		adapterLayer: 'Adapter layer',
		svelteAdapter: 'Svelte components, events, and slots',
		reactAdapter: 'React components, props, and hooks',
		vueAdapter: 'Vue components, events, and slots',
		experienceLayer: 'Experience layer',
		independentPackages: 'Independent npm packages',
		independentSites: 'Independent websites',
		frameworkDemos: 'Framework Demos',
		sharedTooling: 'Shared tooling',
		motionCompatibility: 'Motion compatibility',
		motionTitle: 'Native in Svelte, aligned for React and Vue',
		motionDescription:
			'Svelte uses its built-in easing, transition, animate, and motion APIs. To keep the other implementations aligned with that model, Any TDF provides dedicated React and Vue versions.',
		reactMotionDescription: 'Svelte-aligned motion functions, React components, and hooks.',
		vueMotionDescription: 'Svelte-aligned motion functions, Vue components, and composables.',
		principlesTitle: 'Unified without erasing differences',
		principlesDescription:
			'The architecture draws maintainable sharing boundaries so all three stay consistent while each framework still feels native.',
		nativeTitle: 'Framework native',
		nativeDescription: 'Components, events, slots, and types follow each framework’s conventions without an extra cross-framework runtime.',
		consistentTitle: 'Consistent experience',
		consistentDescription:
			'Component coverage, theme semantics, documentation structure, and mobile interactions stay predictable across all three.',
		tailwindTitle: 'Tailwind CSS foundation',
		tailwindDescription: 'All three libraries use Tailwind CSS with clear theme variables and a composable styling language.',
		deliveryTitle: 'Independent delivery',
		deliveryDescription:
			'Every component library installs, builds, and runs independently. Consumers do not need to know about the Monorepo.',
		resourcesTitle: 'Beyond components, a complete development toolchain',
		resourcesDescription:
			'Beyond the core component libraries and Motion implementations, Any TDF also provides shared foundations, scaffolding, build plugins, visual effects, AI Skills, and editor support.',
		npmResourcesTitle: 'npm packages',
		skillsResourcesTitle: 'AI Skills',
		vscodeResourcesTitle: 'VS Code extension',
		officialWebsite: 'Website',
		sourceCode: 'Source',
		reactConfettiResourceDescription:
			'A pure HTML and CSS confetti effect for React that keeps svelte-confetti’s lightweight implementation and SSR compatibility.',
		vueConfettiResourceDescription:
			'A pure HTML and CSS confetti effect for Vue that keeps svelte-confetti’s lightweight implementation and SSR compatibility.',
		commonResourceDescription:
			'Framework-agnostic utilities, themes, language packs, types, and shared capabilities derived from component state.',
		createAnyTdfResourceDescription: 'A command-line scaffold for creating STDF, RTDF, and VTDF TypeScript projects.',
		mdPluginResourceDescription: 'A Vite and Rollup plugin that transforms Markdown files into JavaScript modules.',
		svgPluginResourceDescription: 'A Vite and Rollup plugin that combines SVG files into a symbol sprite.',
		stdfSkillResourceDescription:
			'Offline STDF context for AI agents, covering components, themes, color, internationalization, scaffolding, and icon workflows.',
		rtdfSkillResourceDescription:
			'Offline RTDF context for AI agents, covering components, themes, color, internationalization, scaffolding, and icon workflows.',
		vtdfSkillResourceDescription:
			'Offline VTDF context for AI agents, covering components, themes, color, internationalization, scaffolding, and icon workflows.',
		vscodeExtensionResourceDescription:
			'Component API hover documentation, version information, and framework-native completions for STDF, RTDF, and VTDF.',
		ctaTitle: 'Start with the framework you know',
		ctaDescription: 'Visit its website for guides, components, the theme generator, and interactive Demos.',
		footerRelated: 'Related',
		footerTools: 'Tools',
		footerBuiltInIcons: 'Built-in Icons',
		footerLicense: 'License',
		pageTitle: 'Any TDF - One system, three native framework experiences',
		pageDescription:
			'Any TDF is a mobile Web component system for Svelte, React, and Vue with a consistent design language, theming model, and native framework experience.'
	}
};

const root = document.documentElement;
const languageStorageKey = 'any-tdf-language';
const modeStorageKey = 'any-tdf-mode';
const colorThemeStorageKey = 'theme_color';
const modePreferences = ['auto', 'light', 'dark'];
const defaultColorTheme = 'ANYTDF';
const colorThemeNames = new Set(themes.map((theme) => theme.name));
const colorThemeLabels = createThemeLabels(defaultColorTheme, 'Any TDF');
const portalThemeProperties = [
	'color-primary',
	'color-dark',
	'color-bg-base',
	'color-bg-surface',
	'color-bg-overlay',
	'color-bg-highlight',
	'color-bg-base-dark',
	'color-bg-surface-dark',
	'color-bg-overlay-dark',
	'color-bg-highlight-dark',
	'color-text-primary',
	'color-text-dark',
	'color-text-on-primary',
	'color-text-on-dark'
];
const systemMode = matchMedia('(prefers-color-scheme: dark)');
const favicon = document.querySelector('[data-theme-favicon]');
const faviconPaths = { light: '/favicon.svg', dark: '/favicon-dark.svg' };
const preferredLanguage = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
const savedLanguage = localStorage.getItem(languageStorageKey);
const savedModePreference = localStorage.getItem(modeStorageKey);
const savedColorTheme = localStorage.getItem(colorThemeStorageKey);
let currentLanguage = savedLanguage === 'zh' || savedLanguage === 'en' ? savedLanguage : preferredLanguage;
let currentModePreference = modePreferences.includes(savedModePreference) ? savedModePreference : 'auto';
let currentColorTheme = colorThemeNames.has(savedColorTheme) ? savedColorTheme : defaultColorTheme;
let currentMode = root.dataset.mode === 'dark' ? 'dark' : 'light';

const updateBrowserThemeColor = () => {
	const propertyName = currentMode === 'dark' ? '--color-bg-base-dark' : '--color-bg-base';
	const color = getComputedStyle(root).getPropertyValue(propertyName).trim();
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
};

const updateModeControls = () => {
	const labelKeys = { light: 'lightMode', dark: 'darkMode', auto: 'systemMode' };
	for (const control of document.querySelectorAll('[data-mode-choice]')) {
		const isActive = control.dataset.modeChoice === currentModePreference;
		const label = translations[currentLanguage][labelKeys[control.dataset.modeChoice]];
		control.classList.toggle('is-active', isActive);
		control.setAttribute('aria-pressed', String(isActive));
		control.setAttribute('aria-label', label);
		control.title = label;
	}
};

const updateColorThemeControls = () => {
	for (const control of document.querySelectorAll('[data-color-theme-choice]')) {
		const isActive = control.dataset.colorThemeChoice === currentColorTheme;
		control.classList.toggle('is-active', isActive);
		control.setAttribute('aria-pressed', String(isActive));
	}
};

const updateColorThemeLabels = () => {
	for (const labelElement of document.querySelectorAll('[data-color-theme-label]')) {
		const themeName = labelElement.dataset.colorThemeLabel;
		const label = currentLanguage === 'zh' ? (colorThemeLabels[themeName] ?? themeName) : themeName;
		const control = labelElement.closest('[data-color-theme-choice]');
		const isActive = themeName === currentColorTheme;
		labelElement.textContent = label;
		control.setAttribute(
			'aria-label',
			isActive
				? currentLanguage === 'zh'
					? `${label}，当前主题`
					: `${label}, current theme`
				: currentLanguage === 'zh'
					? `切换到 ${label}`
					: `Switch to ${label}`
		);
	}
};

const applyColorTheme = (themeName, persist = true) => {
	const theme = themes.find((item) => item.name === themeName);
	currentColorTheme = theme.name;
	for (const propertyName of portalThemeProperties) {
		root.style.setProperty(`--${propertyName}`, theme[propertyName]);
	}
	root.dataset.theme = theme.name;
	if (persist) localStorage.setItem(colorThemeStorageKey, theme.name);
	updateColorThemeControls();
	updateColorThemeLabels();
	updateBrowserThemeColor();
};

const applyModePreference = (modePreference, persist = true) => {
	currentModePreference = modePreference;
	currentMode = modePreference === 'auto' ? (systemMode.matches ? 'dark' : 'light') : modePreference;
	root.dataset.mode = currentMode === 'dark' ? 'dark' : 'primary';
	favicon?.setAttribute('href', faviconPaths[currentMode]);
	if (persist) localStorage.setItem(modeStorageKey, modePreference);
	updateModeControls();
	updateBrowserThemeColor();
};

const createColorThemeOption = (theme) => {
	const control = document.createElement('button');
	control.className = 'portal-theme-option';
	control.type = 'button';
	control.dataset.colorThemeChoice = theme.name;
	control.setAttribute('aria-pressed', 'false');

	const swatch = document.createElement('span');
	swatch.className = 'portal-theme-swatch';
	swatch.setAttribute('aria-hidden', 'true');
	const lightSwatch = document.createElement('span');
	lightSwatch.className = 'portal-theme-swatch-light';
	const primaryColor = document.createElement('i');
	primaryColor.style.background = theme['color-primary'];
	lightSwatch.append(primaryColor);
	const darkSwatch = document.createElement('span');
	darkSwatch.className = 'portal-theme-swatch-dark';
	const darkColor = document.createElement('i');
	darkColor.style.background = theme['color-dark'];
	darkSwatch.append(darkColor);
	swatch.append(lightSwatch, darkSwatch);

	const label = document.createElement('span');
	label.className = 'portal-theme-option-label';
	label.dataset.colorThemeLabel = theme.name;
	const selectedMark = document.createElement('span');
	selectedMark.className = 'portal-theme-selected-mark';
	selectedMark.textContent = '✓';
	selectedMark.setAttribute('aria-hidden', 'true');
	control.append(swatch, label, selectedMark);
	control.addEventListener('click', () => applyColorTheme(theme.name));
	return control;
};

for (const container of document.querySelectorAll('[data-theme-options]')) {
	container.replaceChildren(...themes.map(createColorThemeOption));
}

for (const control of document.querySelectorAll('[data-mode-choice]')) {
	control.addEventListener('click', () => {
		control.classList.add('is-clicked');
		setTimeout(() => control.classList.remove('is-clicked'), 150);
		applyModePreference(control.dataset.modeChoice);
	});
}

const applyLanguage = (language) => {
	currentLanguage = language;
	const dictionary = translations[language];
	root.lang = language === 'zh' ? 'zh-CN' : 'en';
	localStorage.setItem(languageStorageKey, language);

	for (const element of document.querySelectorAll('[data-i18n]')) {
		const value = dictionary[element.dataset.i18n];
		if (value) element.textContent = value;
	}
	for (const element of document.querySelectorAll('[data-i18n-aria]')) {
		const value = dictionary[element.dataset.i18nAria];
		if (value) element.setAttribute('aria-label', value);
	}
	for (const element of document.querySelectorAll('[data-i18n-alt]')) {
		const value = dictionary[element.dataset.i18nAlt];
		if (value) element.setAttribute('alt', value);
	}
	for (const control of document.querySelectorAll('[data-language-toggle]')) {
		const accessibleLabel = language === 'zh' ? 'Switch to English' : '切换到简体中文';
		control.setAttribute('aria-label', accessibleLabel);
		control.title = accessibleLabel;
	}
	document.title = dictionary.pageTitle;
	document.querySelector('meta[name="description"]')?.setAttribute('content', dictionary.pageDescription);
	updateSupportPaymentControls();
	updateModeControls();
	updateColorThemeControls();
	updateColorThemeLabels();
	updateMenuControl();
};

for (const control of document.querySelectorAll('[data-language-toggle]')) {
	control.addEventListener('click', () => applyLanguage(currentLanguage === 'zh' ? 'en' : 'zh'));
}

const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('#portal-mobile-menu');
const mobileMenuMain = mobileMenu?.querySelector('[data-mobile-menu-main]');
const mobileThemePanel = mobileMenu?.querySelector('[data-mobile-theme-panel]');
const mobileThemeOpenButton = mobileMenu?.querySelector('[data-mobile-theme-open]');
const mobileThemeBackButton = mobileMenu?.querySelector('[data-mobile-theme-back]');
const themeControl = document.querySelector('[data-theme-control]');
const themePanelToggle = themeControl?.querySelector('[data-theme-panel-toggle]');
const themePanel = themeControl?.querySelector('[data-theme-panel]');
let isMobileThemeOpen = false;

const scrollCurrentThemeIntoView = (container) => {
	requestAnimationFrame(() => {
		container?.querySelector(`[data-color-theme-choice="${currentColorTheme}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
	});
};
const setThemePanelOpen = (open, restoreFocus = false) => {
	themePanelToggle?.setAttribute('aria-expanded', String(open));
	if (themePanel) themePanel.hidden = !open;
	if (open) scrollCurrentThemeIntoView(themePanel);
	if (!open && restoreFocus) themePanelToggle?.focus();
};
const setMobileThemeOpen = (open, restoreFocus = false) => {
	isMobileThemeOpen = open;
	if (mobileMenuMain) {
		mobileMenuMain.hidden = open;
		mobileMenuMain.setAttribute('aria-hidden', String(open));
	}
	if (mobileThemePanel) {
		mobileThemePanel.hidden = !open;
		mobileThemePanel.setAttribute('aria-hidden', String(!open));
	}
	mobileThemeOpenButton?.setAttribute('aria-expanded', String(open));
	if (open) scrollCurrentThemeIntoView(mobileThemePanel);
	if (!open && restoreFocus) mobileThemeOpenButton?.focus();
};
const updateMenuControl = () => {
	if (!menuButton) return;
	const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
	menuButton.setAttribute('aria-label', translations[currentLanguage][isOpen ? 'closeMenu' : 'openMenu']);
};
const setMenuOpen = (open) => {
	if (open) setThemePanelOpen(false);
	if (!open) setMobileThemeOpen(false);
	menuButton?.setAttribute('aria-expanded', String(open));
	if (mobileMenu) {
		mobileMenu.hidden = !open;
		mobileMenu.setAttribute('aria-hidden', String(!open));
	}
	updateMenuControl();
};

const supportDialog = document.querySelector('[data-support-dialog]');
const supportCloseButton = supportDialog?.querySelector('[data-support-close]');
const supportPaymentControls = supportDialog?.querySelectorAll('[data-support-payment]') ?? [];
let activeSupportPayment = null;
let lastSupportTrigger = null;

const isSupportDialogOpen = () => Boolean(supportDialog && !supportDialog.hidden);
const updateSupportPaymentControls = () => {
	for (const control of supportPaymentControls) {
		const payment = control.dataset.supportPayment;
		const isActive = payment === activeSupportPayment;
		const paymentName = payment === 'wechat' ? 'Wechat' : 'Alipay';
		const labelKey = `support${paymentName}${isActive ? 'Close' : 'Open'}Label`;
		control.classList.toggle('is-active', isActive);
		control.setAttribute('aria-expanded', String(isActive));
		control.dataset.i18nAria = labelKey;
		control.setAttribute('aria-label', translations[currentLanguage][labelKey]);
	}

	if (supportDialog) supportDialog.dataset.activePayment = activeSupportPayment ?? '';
};
const setActiveSupportPayment = (payment) => {
	activeSupportPayment = activeSupportPayment === payment ? null : payment;
	updateSupportPaymentControls();
};
const openSupportDialog = (trigger) => {
	if (!supportDialog || isSupportDialogOpen()) return;
	setThemePanelOpen(false);
	if (trigger instanceof HTMLElement) {
		const isMobileTrigger = Boolean(mobileMenu?.contains(trigger));
		lastSupportTrigger = isMobileTrigger ? menuButton : trigger;
		if (isMobileTrigger) setMenuOpen(false);
	}
	activeSupportPayment = null;
	updateSupportPaymentControls();
	supportDialog.hidden = false;
	supportDialog.setAttribute('aria-hidden', 'false');
	root.classList.add('has-support-dialog');
	requestAnimationFrame(() => supportCloseButton?.focus());
};
const closeSupportDialog = () => {
	if (!supportDialog || !isSupportDialogOpen()) return;
	supportDialog.hidden = true;
	supportDialog.setAttribute('aria-hidden', 'true');
	root.classList.remove('has-support-dialog');
	activeSupportPayment = null;
	updateSupportPaymentControls();
	const focusTarget = lastSupportTrigger;
	lastSupportTrigger = null;
	requestAnimationFrame(() => focusTarget?.focus());
};
const getSupportFocusableElements = () =>
	[...supportDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
		(element) => element.getClientRects().length > 0
	);

for (const trigger of document.querySelectorAll('[data-support-trigger]')) {
	trigger.addEventListener('click', () => openSupportDialog(trigger));
}
supportCloseButton?.addEventListener('click', closeSupportDialog);
supportDialog?.addEventListener('click', (event) => {
	if (event.target === supportDialog) closeSupportDialog();
});
for (const control of supportPaymentControls) {
	control.addEventListener('click', () => setActiveSupportPayment(control.dataset.supportPayment));
}

themePanelToggle?.addEventListener('click', () => {
	setThemePanelOpen(themePanelToggle.getAttribute('aria-expanded') !== 'true');
});
mobileThemeOpenButton?.addEventListener('click', () => setMobileThemeOpen(true));
mobileThemeBackButton?.addEventListener('click', () => setMobileThemeOpen(false, true));
menuButton?.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
for (const link of mobileMenu?.querySelectorAll('a') ?? []) link.addEventListener('click', () => setMenuOpen(false));
document.addEventListener('pointerdown', (event) => {
	if (!(event.target instanceof Node)) return;
	if (themePanelToggle?.getAttribute('aria-expanded') === 'true' && !themeControl?.contains(event.target)) {
		setThemePanelOpen(false);
	}
	if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
	if (menuButton.contains(event.target) || mobileMenu?.contains(event.target)) return;
	setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		if (isSupportDialogOpen()) {
			event.preventDefault();
			closeSupportDialog();
		} else if (themePanelToggle?.getAttribute('aria-expanded') === 'true') {
			event.preventDefault();
			setThemePanelOpen(false, true);
		} else if (isMobileThemeOpen) {
			event.preventDefault();
			setMobileThemeOpen(false, true);
		} else {
			setMenuOpen(false);
		}
		return;
	}

	if (event.key !== 'Tab' || !isSupportDialogOpen()) return;
	const focusableElements = getSupportFocusableElements();
	if (focusableElements.length === 0) {
		event.preventDefault();
		supportDialog.focus();
		return;
	}
	const firstElement = focusableElements[0];
	const lastElement = focusableElements.at(-1);
	if (event.shiftKey && document.activeElement === firstElement) {
		event.preventDefault();
		lastElement.focus();
	} else if (!event.shiftKey && document.activeElement === lastElement) {
		event.preventDefault();
		firstElement.focus();
	}
});

const desktopNavigation = matchMedia('(min-width: 64rem)');
desktopNavigation.addEventListener('change', (event) => {
	if (event.matches) {
		setMenuOpen(false);
	} else {
		setThemePanelOpen(false);
	}
});

const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('[data-reveal]');
if (motionQuery.matches || !('IntersectionObserver' in window)) {
	for (const element of revealElements) element.classList.add('is-visible');
} else {
	root.classList.add('has-motion');
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
	);
	for (const element of revealElements) observer.observe(element);
}

systemMode.addEventListener('change', () => {
	if (currentModePreference === 'auto') applyModePreference('auto', false);
});

document.querySelector('[data-current-year]').textContent = String(new Date().getFullYear());
applyColorTheme(currentColorTheme, false);
applyModePreference(currentModePreference, false);
applyLanguage(currentLanguage);

const currentUrl = new URL(window.location.href);
if (currentUrl.searchParams.has('fund')) {
	currentUrl.searchParams.delete('fund');
	history.replaceState(history.state, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
	openSupportDialog();
}
