import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
	getSiteNavigationState,
	getSitePage,
	legacyGeneratorPath,
	normalizeSiteLanguage,
	normalizeSiteThemeMode,
	resolveSiteLanguage,
	resolveSiteThemeName,
	sitePaths
} from '@any-tdf/site-common/site';
import { delParamsUrl } from '@any-tdf/site-common/url';
import { switchMode, switchTheme } from 'rtdf/theme';
import Header from './components/Header';
import CmdK from './components/CmdK';
import Fund from './components/Fund';
import HomePage from './pages/Home';
import { AppContextProvider, type LangType, type ThemeMode } from './store/appStore';

// 页面组件按需加载，减小首屏 bundle
const GuideLayout = lazy(() => import('./pages/guide/GuideLayout'));
const ComponentsPage = lazy(() => import('./pages/components/ComponentsPage'));
const GeneratorPage = lazy(() => import('./pages/generator/GeneratorPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// localStorage 可能被禁用（如隐私模式），读写失败时回退默认值，避免初始化整站崩溃
const getStorageItem = (key: string) => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};

const setStorageItem = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch {
		// 忽略写入失败
	}
};

const getStoredLang = (): LangType => {
	return resolveSiteLanguage(null, getStorageItem('lang'), navigator.language);
};

const getStoredThemeMode = (): ThemeMode => {
	return normalizeSiteThemeMode(getStorageItem('theme'));
};

const updateFavicon = (mode: 'light' | 'dark') => {
	document
		.querySelector<HTMLLinkElement>('[data-theme-favicon]')
		?.setAttribute('href', mode === 'dark' ? '/favicon_black.ico' : '/favicon.ico');
};

function App() {
	const location = useLocation();
	const [lang, setLang] = useState<LangType>(getStoredLang());
	const [isShowNav, setIsShowNav] = useState(false);
	const [isCmdK, setIsCmdK] = useState(false);
	const [isShowFund, setIsShowFund] = useState(false);
	const [showThemeSwitch, setShowThemeSwitch] = useState(false);
	const [currentColor, setCurrentColor] = useState(resolveSiteThemeName(null, getStorageItem('theme_color'), false));
	const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode());
	const [sysTheme, setSysTheme] = useState<'light' | 'dark'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	const [isWideScreen, setIsWideScreen] = useState(getStorageItem('isFull') === 'full');

	const showLeftNav = useMemo(() => {
		return getSiteNavigationState(location.pathname).showLeftNav;
	}, [location.pathname]);

	// 路由改变时，按路由更新页面标题与描述（首页与主题生成器页由各自页面自行设置）
	useEffect(() => {
		const page = getSitePage(location.pathname);
		if (page === 'home' || page === 'generator') return;
		const isZh = lang === 'zh_CN';
		const pageMeta = {
			guide: {
				title: isZh ? '指南' : 'Guide',
				description: isZh
					? 'RTDF 使用指南：快速开始、主题配置、国际化与插件文档。'
					: 'RTDF guide: quick start, theming, internationalization and plugin documentation.'
			},
			components: {
				title: isZh ? '组件' : 'Components',
				description: isZh
					? 'RTDF 移动 Web 组件的示例、API 与常见问题文档。'
					: 'Examples, API and FAQ documentation for RTDF mobile web components.'
			},
			'not-found': {
				title: isZh ? '页面未找到' : 'Page not found',
				description: isZh ? '抱歉，页面未找到。' : 'Sorry, page not found.'
			}
		};
		const meta = pageMeta[page];
		document.title = `${meta.title} - RTDF`;
		document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
	}, [lang, location.pathname]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const themeParam = urlParams.get('theme');
		const isIframe = window.self !== window.top;
		const nextTheme = resolveSiteThemeName(themeParam, getStorageItem('theme_color'), isIframe);
		if (isIframe && themeParam) {
			setStorageItem('theme_color', nextTheme);
		}
		setCurrentColor(nextTheme);
	}, [location.search]);

	useEffect(() => {
		switchTheme(currentColor);
		setStorageItem('theme_color', currentColor);
	}, [currentColor]);

	useEffect(() => {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const updateSysTheme = (isDark: boolean) => {
			setSysTheme(isDark ? 'dark' : 'light');
			if (themeMode === 'auto') {
				switchMode(isDark ? 'dark' : 'primary');
			}
		};
		updateSysTheme(mql.matches);
		const handler = (event: MediaQueryListEvent) => updateSysTheme(event.matches);
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	}, [themeMode]);

	useEffect(() => {
		const resolvedThemeMode = themeMode === 'auto' ? sysTheme : themeMode;
		switchMode(resolvedThemeMode === 'dark' ? 'dark' : 'primary');
		updateFavicon(resolvedThemeMode);
		setStorageItem('theme', themeMode);
	}, [sysTheme, themeMode]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const langParam = urlParams.get('lang');
		const urlLanguage = normalizeSiteLanguage(langParam);
		if (urlLanguage) {
			setStorageItem('lang', urlLanguage);
			setLang(urlLanguage);
			const nextUrl = new URL(window.location.href);
			nextUrl.searchParams.delete('lang');
			setTimeout(() => {
				window.history.replaceState({}, '', nextUrl.toString());
			}, 10);
			return;
		}
		const nextLanguage = resolveSiteLanguage(null, getStorageItem('lang'), navigator.language);
		setStorageItem('lang', nextLanguage);
		setLang(nextLanguage);
	}, [location.search]);

	// 根据 params 判断当前 URL 是否含有 fund 参数，如果有则显示赞赏弹窗
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('fund')) {
			setIsShowFund(true);
			setTimeout(() => {
				window.history.replaceState({}, '', delParamsUrl(window.location.href, 'fund'));
			}, 10);
		}
	}, [location.search]);

	const contextValue = useMemo(
		() => ({
			lang,
			setLang,
			isShowNav,
			setIsShowNav,
			isCmdK,
			setIsCmdK,
			isShowFund,
			setIsShowFund,
			showThemeSwitch,
			setShowThemeSwitch,
			currentColor,
			setCurrentColor,
			themeMode,
			setThemeMode,
			sysTheme,
			setSysTheme,
			isWideScreen,
			setIsWideScreen
		}),
		[lang, isShowNav, isCmdK, isShowFund, showThemeSwitch, currentColor, themeMode, sysTheme, isWideScreen]
	);

	return (
		<AppContextProvider value={contextValue}>
			<main className="site-app relative min-h-screen text-left antialiased">
				<Header showLeftNav={showLeftNav} onclickCmdK={() => setIsCmdK(true)} />
				<Suspense
					fallback={<div className="p-6 text-sm text-(--site-text-muted)">{lang === 'zh_CN' ? '页面加载中……' : 'Loading page...'}</div>}
				>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path={legacyGeneratorPath} element={<Navigate to={sitePaths.generator} replace />} />
						<Route path="/guide/*" element={<GuideLayout />} />
						<Route path={sitePaths.generator} element={<GeneratorPage />} />
						<Route path="/components" element={<ComponentsPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
				<CmdK />
				{/* 赞赏 */}
				{isShowFund ? <Fund /> : null}
			</main>
		</AppContextProvider>
	);
}

export default App;
