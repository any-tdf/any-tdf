import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ConfigProvider, Feedback, Icon, NavBar } from 'rtdf/components';
import { en_US, zh_CN } from 'rtdf/lang';
import { menuList } from '@any-tdf/site-common/data';
import { builtInIconLibraryList, defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import HomePage from './pages/home';
import ThemeSwitch from './pages/components/ThemeSwitch';
import { routes } from './routes';

const legacyDefaultThemeNames = new Set(['STDF', 'RTDF', 'VTDF']);
const builtInIconLibraryStorageKey = 'built_in_icon_library';

const normalizeStoredTheme = (themeName: string | null) => {
	if (!themeName || legacyDefaultThemeNames.has(themeName)) {
		localStorage.setItem('theme_color', 'ANYTDF');
		return 'ANYTDF';
	}
	return themeName;
};

const isBuiltInIconLibrary = (library: string | null): library is BuiltInIconLibrary =>
	typeof library === 'string' && (builtInIconLibraryList as readonly string[]).includes(library);

const normalizeStoredBuiltInIconLibrary = (library: string | null): BuiltInIconLibrary =>
	isBuiltInIconLibrary(library) ? library : defaultBuiltInIconLibrary;

const updateFavicon = (mode: 'primary' | 'dark') => {
	document.querySelector<HTMLLinkElement>('[data-theme-favicon]')?.setAttribute('href', mode === 'dark' ? '/rtdf_dark.svg' : '/rtdf.svg');
};

function App() {
	const location = useLocation();

	const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const channel = urlParams.get('channel');
	const isIframe = channel === 'iframe' || (typeof window !== 'undefined' && window.self !== window.top) ? '1' : '0';

	const mode = import.meta.env.MODE;
	const isComponentMode = mode !== 'production' && mode !== 'development' && mode !== 'english';
	const englishMode = mode.slice(-3) === '_en' || mode === 'english';

	const menuListArr = useMemo(() => {
		return menuList.reduce(
			(acc, cur) => {
				if (cur.childs) acc.push(...cur.childs);
				return acc;
			},
			[] as (typeof menuList)[number]['childs']
		);
	}, []);

	const storedTheme = normalizeStoredTheme(localStorage.getItem('theme_color'));
	const [currentColor, setCurrentColor] = useState(storedTheme);
	const [themeMode, setThemeMode] = useState<'primary' | 'dark'>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'primary');
	const [builtInIconLibrary, setBuiltInIconLibrary] = useState<BuiltInIconLibrary>(
		normalizeStoredBuiltInIconLibrary(localStorage.getItem(builtInIconLibraryStorageKey))
	);
	const [lang, setLang] = useState<'zh_CN' | 'en_US'>('zh_CN');
	const [showTheme, setShowTheme] = useState(false);

	useEffect(() => {
		if (isIframe === '1') {
			const urlTheme = urlParams.get('theme');
			const themeToUse = normalizeStoredTheme(urlTheme || storedTheme);
			setCurrentColor(themeToUse);
			const urlMode = urlParams.get('darkMode');
			if (urlMode === 'dark') setThemeMode('dark');
			if (urlMode === 'light') setThemeMode('primary');
			const urlLang = urlParams.get('lang');
			if (urlLang === 'zh_CN' || urlLang === 'en_US') {
				setLang(urlLang);
			}
			if (urlTheme) localStorage.setItem('theme_color', themeToUse);
		} else {
			setCurrentColor(storedTheme);
		}
	}, [isIframe, storedTheme, urlParams]);

	useEffect(() => {
		localStorage.setItem('theme_color', currentColor);
	}, [currentColor]);

	useEffect(() => {
		localStorage.setItem('theme', themeMode);
		updateFavicon(themeMode);
	}, [themeMode]);

	useEffect(() => {
		let nextLang: 'zh_CN' | 'en_US' = 'zh_CN';
		if (englishMode) {
			nextLang = 'en_US';
		} else {
			const urlParamsLang = urlParams.get('lang');
			if (urlParamsLang === 'zh_CN' || urlParamsLang === 'en_US') {
				nextLang = urlParamsLang;
				const url = new URL(window.location.href);
				url.searchParams.delete('lang');
				window.history.replaceState(null, '', url.toString());
			} else if (isIframe === '0') {
				const pathParts = location.pathname.split('/').filter(Boolean);
				const pathLang = pathParts[pathParts.length - 1];
				if (pathLang === 'zh_CN' || pathLang === 'en_US') {
					nextLang = pathLang;
				} else {
					const sessionLang = sessionStorage.getItem('lang');
					if (sessionLang === 'zh_CN' || sessionLang === 'en_US') {
						nextLang = sessionLang;
					}
				}
			}
		}
		setLang(nextLang);
		sessionStorage.setItem('lang', nextLang);
	}, [englishMode, isIframe, location.pathname, urlParams]);

	useEffect(() => {
		if (!isComponentMode) return;
		const nav = englishMode ? mode.slice(0, -3) : mode;
		const targetPath = `/${nav}/${englishMode ? 'en_US' : 'zh_CN'}`;
		if (window.location.pathname !== targetPath) {
			window.location.replace(targetPath);
		}
	}, [englishMode, isComponentMode, mode]);

	const isZh = lang === 'zh_CN';
	const showLeft = !(isIframe === '1' || location.pathname === '/' || isComponentMode);

	const toggleFun = () => {
		setThemeMode((prev) => (prev === 'dark' ? 'primary' : 'dark'));
	};

	const switchThemeFunc = () => {
		setShowTheme((prev) => !prev);
	};

	const selectBuiltInIconLibrary = (library: BuiltInIconLibrary) => {
		setBuiltInIconLibrary(library);
		localStorage.setItem(builtInIconLibraryStorageKey, library);
	};

	const rightChil = () => (
		<div className="flex text-center">
			{isIframe === '0' ? (
				<>
					<div className="h-12 w-10">
						<a href="https://github.com/any-tdf/any-tdf" target="_blank" rel="noreferrer">
							<Icon name="ri-github-fill" />
						</a>
					</div>
					<div className="h-12 w-10">
						<a
							href={`https://rtdf.dev${location.pathname === '/' ? '' : `/components?nav=${location.pathname.split('/')[1]}&tab=0`}`}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name="ri-compass-line" />
						</a>
					</div>
				</>
			) : null}
			<button
				className="h-12 w-10"
				onClick={toggleFun}
				aria-label={themeMode === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
				type="button"
			>
				<Icon name={themeMode === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} theme />
			</button>
			<button className="h-12 w-10" onClick={switchThemeFunc} aria-label="切换主题" type="button">
				<Icon name="ri-palette-line" theme />
			</button>
		</div>
	);

	return (
		<ConfigProvider locale={isZh ? zh_CN : en_US} theme={currentColor} mode={themeMode} builtInIconLibrary={builtInIconLibrary}>
			<div className="rtdf-site-nav sticky top-0">
				<NavBar
					title={
						location.pathname === '/'
							? isZh
								? 'RTDF 示例'
								: 'RTDF Demo'
							: (() => {
									const nav = location.pathname.split('/')[1];
									const item = menuListArr.find((menu) => menu.nav === nav);
									const label = item ? (isZh ? item.title_zh : item.title_en) : '';
									return label ? `${label}${isZh ? '示例' : ' Demo'}` : '';
								})()
					}
					left={showLeft ? 'back' : null}
					injClass="bg-white/60 dark:bg-black/60 backdrop-blur-sm"
					onClickLeft={() => window.history.back()}
					rightChild={rightChil()}
				/>
			</div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={<route.component />} />
				))}
			</Routes>
			<div className="rtdf-theme-panel-wrap pointer-events-none fixed inset-x-0 top-14 overflow-hidden pb-4 pl-2">
				<div
					className={`pointer-events-auto mr-2 rounded-lg border border-black/10 bg-white p-2 shadow-md transition-transform duration-500 dark:border-white/10 dark:bg-black ${
						showTheme ? 'translate-x-0' : 'rtdf-theme-panel-hidden'
					}`}
				>
					<ThemeSwitch
						currentColor={currentColor}
						builtInIconLibrary={builtInIconLibrary}
						onChange={setCurrentColor}
						onIconLibraryChange={selectBuiltInIconLibrary}
					/>
				</div>
			</div>

			<Feedback />
		</ConfigProvider>
	);
}

export default App;
