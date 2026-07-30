<script lang="ts">
	import { switchTheme } from 'stdf/theme';
	import Header from '$lib/header/Header.svelte';
	import CmdK from '$lib/cmdk/CmdK.svelte';
	import Fund from '$lib/fund/Fund.svelte';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import {
		getSiteNavigationState,
		normalizeSiteLanguage,
		normalizeSiteThemeMode,
		resolveSiteLanguage,
		resolveSiteThemeMode,
		resolveSiteThemeName
	} from '@any-tdf/site-common/site';
	import { isCmdKStore, isShowFundStore, currentColorStore } from '../store.js';
	import '../app.css';
	import { delParamsUrl } from '../utils/index.js';

	let { children } = $props();

	let showLeftNav = $state(false); //是否显示左侧导航

	//路由改变时，更新左侧导航
	$effect(() => {
		showLeftNav = getSiteNavigationState(page.url.pathname).showLeftNav;
	});
	// 点击顶部菜单事件
	const headerCmdKFun = () => {
		isCmdKStore.set(true);
	};

	const urlParams = new URLSearchParams(window.location.search);
	// 设置默认主题色
	const themeParam = urlParams.get('theme');
	const isIframe = window.self !== window.top;
	const currentTheme = resolveSiteThemeName(themeParam, localStorage.getItem('theme_color'), isIframe);
	if (localStorage.getItem('theme_color') !== currentTheme) {
		localStorage.setItem('theme_color', currentTheme);
	}
	currentColorStore.set(currentTheme);
	switchTheme(currentTheme);

	const langParam = normalizeSiteLanguage(urlParams.get('lang'));
	if (langParam) {
		// URL 中有 lang 参数，更新 localStorage
		localStorage.setItem('lang', langParam);
		// 删除 URL 中的 lang 参数
		setTimeout(() => {
			const url = new URL(window.location.href);
			url.searchParams.delete('lang');
			replaceState(url, page.state);
		}, 10);
	} else {
		localStorage.setItem('lang', resolveSiteLanguage(null, localStorage.getItem('lang'), navigator.language));
	}
	const themeMode = normalizeSiteThemeMode(localStorage.getItem('theme'));
	document.documentElement.setAttribute(
		'data-mode',
		resolveSiteThemeMode(themeMode, window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
	const isFund = urlParams.has('fund');
	if (isFund) {
		isShowFundStore.set(true);
		// 去除 URL 中的 fund 参数
		setTimeout(() => {
			replaceState(delParamsUrl(window.location.href, 'fund'), page.state);
		}, 10);
	}
</script>

<svelte:head>
	<title>STDF - {isZh ? '移动 web 组件库' : 'Mobile web component library'}</title>
</svelte:head>

<main class="site-app relative min-h-screen text-left antialiased">
	<Header {showLeftNav} onclickCmdK={headerCmdKFun} />
	<!-- <Router {routes} /> -->
	<!-- <div class="mx-auto max-w-screen-2xl"> -->
	{@render children()}
	<!-- </div> -->

	<CmdK />
	<!-- 赞赏 -->
	{#if $isShowFundStore}
		<Fund />
	{/if}
</main>
