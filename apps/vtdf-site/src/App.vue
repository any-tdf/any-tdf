<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import {
	getSiteNavigationState,
	getSitePage,
	legacyGeneratorPath,
	normalizeSiteLanguage,
	resolveSiteLanguage,
	resolveSiteThemeName,
	sitePaths
} from '@any-tdf/site-common/site';
import { switchTheme } from 'vtdf/theme';
import Header from './components/Header.vue';
import CmdK from './components/CmdK.vue';
import Fund from './components/Fund.vue';
import HomePage from './pages/Home.vue';
import ComponentsPage from './pages/components/ComponentsPage.vue';
import GuideLayout from './pages/guide/GuideLayout.vue';
import GeneratorPage from './pages/generator/GeneratorPage.vue';
import NotFound from './pages/NotFound.vue';
import { appState, syncRouteState } from './store/appStore';
import { delParamsUrl } from './utils/index';

const isZh = computed(() => appState.lang === 'zh_CN');

const updateFavicon = (mode: 'light' | 'dark') => {
	document
		.querySelector<HTMLLinkElement>('[data-theme-favicon]')
		?.setAttribute('href', mode === 'dark' ? '/favicon_black.ico' : '/favicon.ico');
};

// 是否显示左侧导航（路由改变时更新）
const showLeftNav = computed(() => getSiteNavigationState(appState.pathname).showLeftNav);
const currentPage = computed(() => getSitePage(appState.pathname));

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handleThemeChange = (event: MediaQueryListEvent) => {
	appState.sysTheme = event.matches ? 'dark' : 'light';
};
const handleRouteChange = () => {
	syncRouteState();
};

// 同步 URL 中的 lang 参数到 localStorage，并从 URL 中移除
const syncLangFromUrl = () => {
	const url = new URL(window.location.href);
	const langParam = url.searchParams.get('lang');
	const urlLanguage = normalizeSiteLanguage(langParam);
	if (urlLanguage) {
		appState.lang = urlLanguage;
		localStorage.setItem('lang', urlLanguage);
		url.searchParams.delete('lang');
		window.history.replaceState({}, '', url.toString());
		syncRouteState();
		return;
	}
	appState.lang = resolveSiteLanguage(null, localStorage.getItem('lang'), navigator.language);
	localStorage.setItem('lang', appState.lang);
};

// 同步主题色：iframe 内优先取 URL theme 参数，否则取本地存储
const syncThemeFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const themeParam = urlParams.get('theme');
	const isIframe = window.self !== window.top;
	const nextTheme = resolveSiteThemeName(themeParam, localStorage.getItem('theme_color'), isIframe);
	if (localStorage.getItem('theme_color') !== nextTheme) {
		localStorage.setItem('theme_color', nextTheme);
	}
	appState.currentColor = nextTheme;
};

// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
const syncFundFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('fund')) {
		appState.isShowFund = true;
		// 去除 URL 中的 fund 参数
		setTimeout(() => {
			window.history.replaceState({}, '', delParamsUrl(window.location.href, 'fund'));
			syncRouteState();
		}, 10);
	}
};

watch(
	() => appState.currentColor,
	(color) => {
		switchTheme(color);
		localStorage.setItem('theme_color', color);
	},
	{ immediate: true }
);

watch(
	() => [appState.themeMode, appState.sysTheme] as const,
	([themeMode, sysTheme]) => {
		const currentThemeMode = themeMode === 'auto' ? sysTheme : themeMode;
		appState.currentThemeMode = currentThemeMode;
		document.documentElement.setAttribute('data-mode', currentThemeMode);
		updateFavicon(currentThemeMode);
		localStorage.setItem('theme', themeMode);
	},
	{ immediate: true }
);

watch(
	isZh,
	(zh) => {
		document.title = zh ? 'VTDF - 移动 web 组件库' : 'VTDF - Mobile web component library';
	},
	{ immediate: true }
);

onMounted(() => {
	if (appState.pathname === legacyGeneratorPath) {
		window.history.replaceState({}, '', `${sitePaths.generator}${appState.search}`);
		syncRouteState();
	}
	syncLangFromUrl();
	syncThemeFromUrl();
	syncFundFromUrl();

	mediaQuery.addEventListener('change', handleThemeChange);
	window.addEventListener('popstate', handleRouteChange);
});

onBeforeUnmount(() => {
	mediaQuery.removeEventListener('change', handleThemeChange);
	window.removeEventListener('popstate', handleRouteChange);
});
</script>

<template>
	<main class="site-app relative min-h-screen text-left antialiased">
		<Header :show-left-nav="showLeftNav" />
		<HomePage v-if="currentPage === 'home'" />
		<GeneratorPage v-else-if="currentPage === 'generator'" />
		<GuideLayout v-else-if="currentPage === 'guide'" />
		<ComponentsPage v-else-if="currentPage === 'components'" />
		<NotFound v-else />
		<CmdK />
		<!-- 赞赏 -->
		<Fund v-if="appState.isShowFund" />
	</main>
</template>
