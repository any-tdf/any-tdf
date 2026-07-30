import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
	getSiteNavigationState,
	legacyGeneratorPath,
	normalizeSiteLanguage,
	normalizeSiteThemeMode,
	resolveSiteLanguage,
	resolveSiteThemeName,
	sitePaths
} from '@any-tdf/site-common/site';
import { switchMode, switchTheme } from 'rtdf/theme';
import Header from './components/Header';
import CmdK from './components/CmdK';
import Fund from './components/Fund';
import HomePage from './pages/Home';
import GuideLayout from './pages/guide/GuideLayout';
import ComponentsPage from './pages/components/ComponentsPage';
import GeneratorPage from './pages/generator/GeneratorPage';
import NotFound from './pages/NotFound';
import { AppContextProvider, type LangType, type ThemeMode } from './store/appStore';
import { delParamsUrl } from './utils';

const getStoredLang = (): LangType => {
	return resolveSiteLanguage(null, localStorage.getItem('lang'), navigator.language);
};

const getStoredThemeMode = (): ThemeMode => {
	return normalizeSiteThemeMode(localStorage.getItem('theme'));
};

function App() {
	const location = useLocation();
	const [lang, setLang] = useState<LangType>(getStoredLang());
	const [isShowNav, setIsShowNav] = useState(false);
	const [isCmdK, setIsCmdK] = useState(false);
	const [isShowFund, setIsShowFund] = useState(false);
	const [showThemeSwitch, setShowThemeSwitch] = useState(false);
	const [currentColor, setCurrentColor] = useState(resolveSiteThemeName(null, localStorage.getItem('theme_color'), false));
	const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode());
	const [sysTheme, setSysTheme] = useState<'light' | 'dark'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	const [isWideScreen, setIsWideScreen] = useState(localStorage.getItem('isFull') === 'full');

	const showLeftNav = useMemo(() => {
		return getSiteNavigationState(location.pathname).showLeftNav;
	}, [location.pathname]);

	// 路由改变时，更新页面标题（首页由 Home 页自行设置）
	useEffect(() => {
		if (location.pathname === '/') return;
		const isZh = lang === 'zh_CN';
		document.title = `RTDF - ${isZh ? '移动 web 组件库' : 'Mobile web component library'}`;
	}, [lang, location.pathname]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const themeParam = urlParams.get('theme');
		const isIframe = window.self !== window.top;
		const nextTheme = resolveSiteThemeName(themeParam, localStorage.getItem('theme_color'), isIframe);
		if (isIframe && themeParam) {
			localStorage.setItem('theme_color', nextTheme);
		}
		setCurrentColor(nextTheme);
	}, [location.search]);

	useEffect(() => {
		switchTheme(currentColor);
		localStorage.setItem('theme_color', currentColor);
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
		if (themeMode === 'auto') {
			switchMode(sysTheme === 'dark' ? 'dark' : 'primary');
		} else {
			switchMode(themeMode === 'dark' ? 'dark' : 'primary');
		}
		localStorage.setItem('theme', themeMode);
	}, [sysTheme, themeMode]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const langParam = urlParams.get('lang');
		const urlLanguage = normalizeSiteLanguage(langParam);
		if (urlLanguage) {
			localStorage.setItem('lang', urlLanguage);
			setLang(urlLanguage);
			const nextUrl = new URL(window.location.href);
			nextUrl.searchParams.delete('lang');
			setTimeout(() => {
				window.history.replaceState({}, '', nextUrl.toString());
			}, 10);
			return;
		}
		const nextLanguage = resolveSiteLanguage(null, localStorage.getItem('lang'), navigator.language);
		localStorage.setItem('lang', nextLanguage);
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
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path={legacyGeneratorPath} element={<Navigate to={sitePaths.generator} replace />} />
					<Route path="/guide/*" element={<GuideLayout />} />
					<Route path={sitePaths.generator} element={<GeneratorPage />} />
					<Route path="/components" element={<ComponentsPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<CmdK />
				{/* 赞赏 */}
				{isShowFund ? <Fund /> : null}
			</main>
		</AppContextProvider>
	);
}

export default App;
