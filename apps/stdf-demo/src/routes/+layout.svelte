<script lang="ts">
	import { setContext } from 'svelte';
	import { page } from '$app/state';
	import { goto, replaceState } from '$app/navigation';
	import { NavBar, Icon, Feedback } from 'stdf';
	import { zh_CN, en_US } from 'stdf/lang';
	import '../app.css';
	import { menuList, type MenuListChild } from '@any-tdf/site-common/data';
	import { builtInIconLibraryList, defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
	import ThemeSwitch from './components/ThemeSwitch.svelte';
	import { switchTheme, switchMode } from 'stdf/theme';
	import { builtInIconLibraryContextKey } from 'stdf/utils';

	let { children } = $props();
	const normalizeThemeName = (themeName: string | null) => (themeName === 'STDF' ? 'ANYTDF' : themeName || 'ANYTDF');
	// 安全读取存储，存储被禁用（如 sandbox 的 iframe）时返回 null
	// Safely read storage, return null when storage is disabled (e.g. sandboxed iframe)
	const safeGet = (key: string, session = false): string | null => {
		try {
			return (session ? sessionStorage : localStorage).getItem(key);
		} catch {
			return null;
		}
	};
	// 安全写入存储，存储被禁用（如 sandbox 的 iframe）时静默忽略
	// Safely write storage, silently ignore when storage is disabled (e.g. sandboxed iframe)
	const safeSet = (key: string, value: string, session = false): void => {
		try {
			(session ? sessionStorage : localStorage).setItem(key, value);
		} catch {
			// 写入失败时静默忽略
			// Silently ignore write failures
		}
	};
	const normalizeStoredTheme = (themeName: string | null) => {
		const normalizedTheme = normalizeThemeName(themeName);
		if (themeName !== normalizedTheme) {
			safeSet('theme_color', 'ANYTDF');
		}
		return normalizedTheme;
	};
	const pathParts = page.url.pathname.split('/').filter(Boolean);
	const currentNavName = pathParts[0];
	const pathLang = pathParts.find((part) => part === 'en_US' || part === 'zh_CN');
	const builtInIconLibraryStorageKey = 'built_in_icon_library';
	const isBuiltInIconLibrary = (library: string | null): library is BuiltInIconLibrary =>
		typeof library === 'string' && (builtInIconLibraryList as readonly string[]).includes(library);
	const normalizeStoredBuiltInIconLibrary = (library: string | null): BuiltInIconLibrary =>
		isBuiltInIconLibrary(library) ? library : defaultBuiltInIconLibrary;

	let currentColor = $state('ANYTDF');
	let builtInIconLibrary = $state<BuiltInIconLibrary>(normalizeStoredBuiltInIconLibrary(safeGet(builtInIconLibraryStorageKey)));

	// 循环 menuList，将所有元素的 childs 组成一个数组
	// Cycle menuList, and combine the childs of all elements into an array
	const menuListArr: MenuListChild[] = menuList.reduce((acc: MenuListChild[], cur) => {
		if (cur.childs) {
			acc.push(...cur.childs);
		}
		return acc;
	}, []);

	// 使用 `URLSearchParams` 对象来获取 URL 查询参数
	// Use the `URLSearchParams` object to get the URL query parameters
	const urlParams = new URLSearchParams(page.url.search);
	const channel = urlParams.get('channel');
	// 判断是否是 iframe
	// judge whether it is iframe
	const isIframe = channel === 'iframe' || (typeof window !== 'undefined' && window.self !== window.top) ? '1' : '0';
	// 设置 iframe
	// setting iframe
	setContext('iframe', isIframe);
	setContext(builtInIconLibraryContextKey, () => builtInIconLibrary);
	const storedTheme = normalizeStoredTheme(safeGet('theme_color'));

	let lang = 'zh_CN';

	if (isIframe === '1') {
		// 获取 url 中的 theme 和 mode 和 lang
		// get theme, mode and lang from url
		const urlTheme = urlParams.get('theme');
		const themeToUse = normalizeThemeName(urlTheme || storedTheme);
		const urlMode = urlParams.get('darkMode');
		currentColor = themeToUse;
		switchTheme(themeToUse);
		if (urlTheme) {
			safeSet('theme_color', themeToUse);
		}
		if (urlMode === 'dark') {
			switchMode('dark');
			safeSet('theme', 'dark');
		} else if (urlMode === 'light') {
			switchMode('primary');
			safeSet('theme', 'primary');
		}
		const urlLang = urlParams.get('lang');
		if (urlLang) {
			lang = urlLang;
		}
	} else {
		currentColor = storedTheme;
		switchTheme(storedTheme);
	}

	// 环境变量
	// environment variables
	const mode = import.meta.env.MODE;

	// mode 是否是指定组件模式
	// whether mode is specified component mode
	const isComponentMode = mode != 'production' && mode != 'development' && mode != 'english';

	let showLeft = $derived(!(isIframe === '1' || page.url.pathname === '/' || isComponentMode));

	let theme = $state(safeGet('theme') === 'dark' ? 'dark' : 'primary');

	// 设置亮暗模式
	// Set primary and dark mode
	if (safeGet('theme') === 'dark') {
		switchMode('dark');
	} else {
		switchMode('primary');
	}
	//手动切换亮暗模式
	// manually switch primary and dark mode
	const toggleFun = () => {
		if (theme === 'dark') {
			// 切换到 primary
			// switch to primary
			theme = 'primary';
			safeSet('theme', 'primary');
			switchMode('primary');
		} else {
			// 切换到 dark
			// switch to dark
			theme = 'dark';
			safeSet('theme', 'dark');
			switchMode('dark');
		}
	};

	// 返回上一页，没有可回退的历史（如直接打开深链）时回到首页
	// Go back to the previous page, or go home when there is no history to go back (e.g. opened via deep link)
	const goBack = () => {
		const historyIndex = window.history.state?.['sveltekit:history'];
		if (typeof historyIndex === 'number' && historyIndex > 0) {
			window.history.back();
		} else {
			goto('/');
		}
	};

	// 判断 mode 是否是 English 模式
	// Determine whether mode is English mode
	const englishMode = mode.slice(-3) === '_en' || mode === 'english';

	if (englishMode) {
		// 固定为英文
		// Fixed to English
		lang = 'en_US';
	} else {
		// 根据 url 或 urlParams 或 sessionStorage 获取语言，优先级为 urlParams > url  > sessionStorage
		// Get the language according to the url or urlParams or sessionStorage, the priority is urlParams > url > sessionStorage
		// 如果 urlParams 中有 ?lang=en_US，则设置为英文，如果有 ?lang=zh_CN，则设置为中文
		// If there is ?lang=en_US in urlParams, set it to English, if there is ?lang=zh_CN, set it to Chinese
		const urlParamsLang = urlParams.get('lang');
		if (urlParamsLang) {
			lang = urlParamsLang;
			// 将 url 的 ?lang=en_US 或 ?lang=zh_CN 去掉，挂载完成后立即执行，避免固定延时的竞态
			// Remove ?lang=en_US or ?lang=zh_CN from url, run immediately after mounted to avoid the race of fixed delay
			$effect(() => {
				const url = new URL(location.href);
				url.searchParams.delete('lang');
				replaceState(url, {});
			});
		} else {
			// 如果 URL 中包含 /en_US/ 或 /zh_CN/，则设置为英文或中文
			// If the URL contains /en_US/ or /zh_CN/, set it to English or Chinese
			if (pathLang) {
				lang = pathLang;
			} else {
				// 如果 sessionStorage 中有 lang，则设置为 sessionStorage 中的 lang
				// If there is lang in sessionStorage, set it to lang in sessionStorage
				const sessionStorageLang = safeGet('lang', true);
				if (sessionStorageLang) {
					lang = sessionStorageLang;
				} else {
					// 如果 sessionStorage 中没有 lang，则设置为中文
					// If there is no lang in sessionStorage, set it to Chinese
					lang = 'zh_CN';
				}
			}
		}
	}
	safeSet('lang', lang, true);
	const isZh = lang === 'zh_CN';
	setContext('STDF_lang', isZh ? zh_CN : en_US);

	// 组件模式下重定向到对应路由
	// Redirect to corresponding route in component mode
	if (isComponentMode && typeof window !== 'undefined') {
		const nav = englishMode ? mode.slice(0, -3) : mode;
		const targetPath = `/${nav}/${englishMode ? 'en_US' : 'zh_CN'}`;
		if (window.location.pathname !== targetPath) {
			window.location.replace(targetPath);
		}
	}

	let showTheme = $state(false);
	// 切换主题
	// switch theme
	const switchThemeFunc = () => {
		showTheme = !showTheme;
	};

	const selectBuiltInIconLibrary = (library: BuiltInIconLibrary) => {
		builtInIconLibrary = library;
		safeSet(builtInIconLibraryStorageKey, library);
	};
</script>

<div class="z-100 sticky top-0">
	<NavBar
		title={page.url.pathname === '/'
			? isZh
				? 'STDF 示例'
				: 'STDF Demo'
			: (menuListArr.filter((item) => item.nav === currentNavName)[0]?.[isZh ? 'title_zh' : 'title_en'] ?? 'STDF') +
				(isZh ? '示例' : ' Demo')}
		left={showLeft ? 'back' : null}
		injClass="bg-white/60 dark:bg-black/60 backdrop-blur-sm"
		onclickLeft={goBack}
	>
		{#snippet rightChild()}
			<div class="flex text-center">
				{#if isIframe === '0'}
					<div class="h-12 w-10">
						<a href="https://github.com/any-tdf/any-tdf" target="_blank" rel="noreferrer">
							<Icon name="ri-github-fill" />
						</a>
					</div>
					<div class="h-12 w-10">
						<a
							href={`https://stdf.dev${page.url.pathname === '/' ? '' : `/components?nav=${currentNavName}&tab=0`}`}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name="ri-compass-line" />
						</a>
					</div>
				{/if}
				<button class="h-12 w-10" onclick={toggleFun} aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}>
					<Icon name={theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'} state="theme" />
				</button>
				<button class="h-12 w-10" onclick={switchThemeFunc} aria-label="切换主题">
					<Icon name="ri-palette-line" state="theme" />
				</button>
			</div>
		{/snippet}
	</NavBar>
</div>
{@render children?.()}
<div class="z-1000 pointer-events-none fixed inset-x-0 top-14 overflow-hidden pb-4 pl-2">
	<div
		aria-hidden={!showTheme}
		inert={!showTheme}
		class="pointer-events-auto mr-2 rounded-lg border border-black/10 bg-white p-2 shadow-md transition-transform duration-500 dark:border-white/10 dark:bg-black {showTheme
			? 'translate-x-0'
			: 'stdf-theme-panel-hidden'}"
	>
		<ThemeSwitch {currentColor} {builtInIconLibrary} onIconLibraryChange={selectBuiltInIconLibrary} />
	</div>
</div>

<!-- 全局反馈组件容器 -->
<!-- Global feedback component container -->
<Feedback />
