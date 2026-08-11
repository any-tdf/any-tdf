import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider, Feedback, Icon, Loading, NavBar } from 'rtdf/components';
import { en_US, zh_CN } from 'rtdf/lang';
import { menuList } from '@any-tdf/site-common/data';
import { builtInIconLibraryList, defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import HomePage from './pages/home';
import ThemeSwitch from './pages/components/ThemeSwitch';
import { routes } from './routes';
import { safeGetStorage, safeSetStorage } from './utils/storage';

const legacyDefaultThemeNames = new Set(['STDF', 'RTDF', 'VTDF']);
const builtInIconLibraryStorageKey = 'built_in_icon_library';

// 仅做取值归一化，持久化写入交给 useEffect，避免 render 阶段产生副作用
const normalizeStoredTheme = (themeName: string | null) => {
	if (!themeName || legacyDefaultThemeNames.has(themeName)) {
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

// 路由切换后回到顶部，hash 变化或同路径跳转不滚动
function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
}

function App() {
	const location = useLocation();
	const navigate = useNavigate();

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

	const storedTheme = normalizeStoredTheme(safeGetStorage(localStorage, 'theme_color'));
	const [currentColor, setCurrentColor] = useState(storedTheme);
	const [themeMode, setThemeMode] = useState<'primary' | 'dark'>(safeGetStorage(localStorage, 'theme') === 'dark' ? 'dark' : 'primary');
	const [builtInIconLibrary, setBuiltInIconLibrary] = useState<BuiltInIconLibrary>(
		normalizeStoredBuiltInIconLibrary(safeGetStorage(localStorage, builtInIconLibraryStorageKey))
	);
	const [lang, setLang] = useState<'zh_CN' | 'en_US'>('zh_CN');
	const [showTheme, setShowTheme] = useState(false);
	const themePanelRef = useRef<HTMLDivElement>(null);
	const themeButtonRef = useRef<HTMLButtonElement>(null);

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
			if (urlTheme) safeSetStorage(localStorage, 'theme_color', themeToUse);
		} else {
			setCurrentColor(storedTheme);
		}
	}, [isIframe, storedTheme, urlParams]);

	useEffect(() => {
		safeSetStorage(localStorage, 'theme_color', currentColor);
	}, [currentColor]);

	useEffect(() => {
		safeSetStorage(localStorage, 'theme', themeMode);
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
					const sessionLang = safeGetStorage(sessionStorage, 'lang');
					if (sessionLang === 'zh_CN' || sessionLang === 'en_US') {
						nextLang = sessionLang;
					}
				}
			}
		}
		setLang(nextLang);
		safeSetStorage(sessionStorage, 'lang', nextLang);
	}, [englishMode, isIframe, location.pathname, urlParams]);

	useEffect(() => {
		if (!isComponentMode) return;
		const nav = englishMode ? mode.slice(0, -3) : mode;
		const targetPath = `/${nav}/${englishMode ? 'en_US' : 'zh_CN'}`;
		if (window.location.pathname !== targetPath) {
			window.location.replace(targetPath);
		}
	}, [englishMode, isComponentMode, mode]);

	// 主题面板打开时，点击面板外部或按 Escape 关闭
	useEffect(() => {
		if (!showTheme) return;
		const onPointerDown = (event: PointerEvent) => {
			const target = event.target as Node;
			if (themePanelRef.current?.contains(target) || themeButtonRef.current?.contains(target)) return;
			setShowTheme(false);
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setShowTheme(false);
		};
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [showTheme]);

	const isZh = lang === 'zh_CN';
	const showLeft = !(isIframe === '1' || location.pathname === '/' || isComponentMode);

	// 切语言：写 storage + 更新状态，组件页同步切到对应语言路由，不再整页刷新
	const changeLangFunc = (nextLang: 'zh_CN' | 'en_US') => {
		safeSetStorage(sessionStorage, 'lang', nextLang);
		setLang(nextLang);
		const pathParts = location.pathname.split('/').filter(Boolean);
		const lastPart = pathParts[pathParts.length - 1];
		if (lastPart === 'zh_CN' || lastPart === 'en_US') {
			navigate(`/${[...pathParts.slice(0, -1), nextLang].join('/')}`, { replace: true });
		}
	};

	// 未匹配路由的兜底目标：组件路径补上当前语言后缀，其余回首页
	const fallbackPath = useMemo(() => {
		const nav = location.pathname.split('/')[1];
		return nav && menuListArr.some((menu) => menu.nav === nav) ? `/${nav}/${lang}` : '/';
	}, [location.pathname, menuListArr, lang]);

	// 深链打开时 history 没有上一页，返回键兜底回首页
	const backFunc = () => {
		const historyIdx = (window.history.state as { idx?: number } | null)?.idx;
		if (typeof historyIdx === 'number' && historyIdx > 0) {
			window.history.back();
		} else {
			navigate('/');
		}
	};

	const toggleFun = () => {
		setThemeMode((prev) => (prev === 'dark' ? 'primary' : 'dark'));
	};

	const switchThemeFunc = () => {
		setShowTheme((prev) => !prev);
	};

	const selectBuiltInIconLibrary = (library: BuiltInIconLibrary) => {
		setBuiltInIconLibrary(library);
		safeSetStorage(localStorage, builtInIconLibraryStorageKey, library);
	};

	const rightChil = () => (
		<div className="flex text-center">
			{isIframe === '0' ? (
				<>
					<div className="h-12 w-10">
						<a
							href="https://github.com/any-tdf/any-tdf"
							target="_blank"
							rel="noreferrer"
							aria-label={isZh ? 'GitHub 仓库' : 'GitHub repository'}
						>
							<Icon name="ri-github-fill" />
						</a>
					</div>
					<div className="h-12 w-10">
						<a
							href={`https://rtdf.dev${location.pathname === '/' ? '' : `/components?nav=${location.pathname.split('/')[1]}&tab=0`}`}
							target="_blank"
							rel="noreferrer"
							aria-label={isZh ? 'RTDF 文档站' : 'RTDF documentation site'}
						>
							<Icon name="ri-compass-line" />
						</a>
					</div>
				</>
			) : null}
			<button
				className="h-12 w-10"
				onClick={toggleFun}
				aria-label={
					themeMode === 'dark' ? (isZh ? '切换到亮色模式' : 'Switch to light mode') : isZh ? '切换到暗色模式' : 'Switch to dark mode'
				}
				aria-pressed={themeMode === 'dark'}
				type="button"
			>
				<Icon name={themeMode === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} theme />
			</button>
			<button
				ref={themeButtonRef}
				className="h-12 w-10"
				onClick={switchThemeFunc}
				aria-label={isZh ? '切换主题' : 'Switch theme'}
				aria-expanded={showTheme}
				type="button"
			>
				<Icon name="ri-palette-line" theme />
			</button>
		</div>
	);

	return (
		<ConfigProvider locale={isZh ? zh_CN : en_US} theme={currentColor} mode={themeMode} builtInIconLibrary={builtInIconLibrary}>
			<ScrollToTop />
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
					onClickLeft={backFunc}
					rightChild={rightChil()}
				/>
			</div>
			<Suspense
				fallback={
					<div className="flex justify-center py-20">
						<Loading />
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<HomePage lang={lang} onChangeLang={changeLangFunc} />} />
					{routes.map((route) => (
						<Route key={route.path} path={route.path} element={<route.component />} />
					))}
					<Route path="*" element={<Navigate to={fallbackPath} replace />} />
				</Routes>
			</Suspense>
			<div ref={themePanelRef} className="rtdf-theme-panel-wrap pointer-events-none fixed inset-x-0 top-14 overflow-hidden pb-4 pl-2">
				<div
					className={`pointer-events-auto mr-2 rounded-lg border border-black/10 bg-white p-2 shadow-md transition-transform duration-500 dark:border-white/10 dark:bg-black ${
						showTheme ? 'translate-x-0' : 'rtdf-theme-panel-hidden'
					}`}
				>
					<ThemeSwitch
						currentColor={currentColor}
						builtInIconLibrary={builtInIconLibrary}
						lang={lang}
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
