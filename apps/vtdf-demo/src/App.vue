<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { menuList, type MenuListChild } from '@any-tdf/site-common/data';
import { builtInIconLibraryList, defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import { ConfigProvider, Feedback, Icon, NavBar } from 'vtdf/components';
import { en_US, zh_CN } from 'vtdf/lang';
import { switchMode, switchTheme } from 'vtdf/theme';
import { componentRoutes } from './componentRoutes';
import DemoRenderer from './DemoRenderer.vue';
import HomePage from './pages/HomePage.vue';
import ThemeSwitch from './pages/components/ThemeSwitch.vue';

const legacyDefaultThemeNames = new Set(['STDF', 'RTDF', 'VTDF']);
const builtInIconLibraryStorageKey = 'built_in_icon_library';

// storage 读写统一容错：iframe 沙箱（无 allow-same-origin）等场景下访问会抛 SecurityError
const safeGetStorage = (storage: Storage, key: string) => {
	try {
		return storage.getItem(key);
	} catch {
		return null;
	}
};

const safeSetStorage = (storage: Storage, key: string, value: string) => {
	try {
		storage.setItem(key, value);
	} catch {
		// 写入失败静默忽略
	}
};

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
	document.querySelector<HTMLLinkElement>('[data-theme-favicon]')?.setAttribute('href', mode === 'dark' ? '/vtdf_dark.svg' : '/vtdf.svg');
};

const path = ref(window.location.pathname);
const search = ref(window.location.search);
const mode = import.meta.env.MODE;
const englishMode = mode.slice(-3) === '_en' || mode === 'english';
const isComponentMode = mode !== 'production' && mode !== 'development' && mode !== 'english';
const storedTheme = normalizeStoredTheme(safeGetStorage(localStorage, 'theme_color'));
const currentColor = ref(storedTheme);
const theme = ref<'primary' | 'dark'>(safeGetStorage(localStorage, 'theme') === 'dark' ? 'dark' : 'primary');
const builtInIconLibrary = ref<BuiltInIconLibrary>(
	normalizeStoredBuiltInIconLibrary(safeGetStorage(localStorage, builtInIconLibraryStorageKey))
);
const showTheme = ref(false);

const menuListArr = computed(() =>
	menuList.reduce((acc: MenuListChild[], cur) => {
		if (cur.childs) acc.push(...cur.childs);
		return acc;
	}, [])
);
const urlParams = computed(() => new URLSearchParams(search.value));
const channel = computed(() => urlParams.value.get('channel'));
const isIframe = computed(() => (channel.value === 'iframe' || window.self !== window.top ? '1' : '0'));

const lang = computed<'zh_CN' | 'en_US'>(() => {
	if (englishMode) return 'en_US';
	const queryLang = urlParams.value.get('lang');
	if (queryLang === 'zh_CN' || queryLang === 'en_US') return queryLang;
	const pathParts = path.value.split('/').filter(Boolean);
	const pathLang = pathParts[pathParts.length - 1];
	if (pathLang === 'zh_CN' || pathLang === 'en_US') return pathLang;
	const sessionLang = safeGetStorage(sessionStorage, 'lang');
	if (sessionLang === 'zh_CN' || sessionLang === 'en_US') return sessionLang;
	return 'zh_CN';
});
const isZh = computed(() => lang.value === 'zh_CN');
const nav = computed(() => path.value.split('/').filter(Boolean)[0] || '');
const currentRoute = computed(() => componentRoutes.find((route) => route.nav === nav.value));
const isHome = computed(() => path.value === '/' || !nav.value);
const showLeft = computed(() => !(isIframe.value === '1' || isHome.value || isComponentMode));
const title = computed(() => {
	if (isHome.value) return isZh.value ? 'VTDF 示例' : 'VTDF Demo';
	const item = menuListArr.value.find((menu) => menu.nav === nav.value);
	const label = item ? (isZh.value ? item.title_zh : item.title_en) : '';
	return label ? `${label}${isZh.value ? '示例' : ' Demo'}` : '';
});

watch(theme, updateFavicon, { immediate: true });

const syncPath = () => {
	path.value = window.location.pathname;
	search.value = window.location.search;
};

const goBack = () => {
	// 深链打开且无站内来源时兜底回首页，避免直接退出站点
	const hasSiteHistory = window.history.length > 1 && document.referrer.startsWith(window.location.origin);
	if (hasSiteHistory) {
		window.history.back();
	} else {
		window.location.href = '/';
	}
};

const toggleThemeMode = () => {
	if (theme.value === 'dark') {
		theme.value = 'primary';
		safeSetStorage(localStorage, 'theme', 'primary');
		switchMode('primary');
	} else {
		theme.value = 'dark';
		safeSetStorage(localStorage, 'theme', 'dark');
		switchMode('dark');
	}
};

const switchThemePanel = () => {
	showTheme.value = !showTheme.value;
};

const handleThemeChange = (themeName: string) => {
	currentColor.value = themeName;
};

const selectBuiltInIconLibrary = (library: BuiltInIconLibrary) => {
	builtInIconLibrary.value = library;
	safeSetStorage(localStorage, builtInIconLibraryStorageKey, library);
};

onMounted(() => {
	// 归一化后的主题写回存储（原 setup 阶段的写副作用挪到挂载后）
	safeSetStorage(localStorage, 'theme_color', storedTheme);
	if (isIframe.value === '1') {
		const urlTheme = urlParams.value.get('theme');
		const themeToUse = normalizeStoredTheme(urlTheme || storedTheme);
		const urlMode = urlParams.value.get('darkMode');
		currentColor.value = themeToUse;
		switchTheme(themeToUse);
		if (urlTheme) safeSetStorage(localStorage, 'theme_color', themeToUse);
		if (urlMode === 'dark') {
			theme.value = 'dark';
			safeSetStorage(localStorage, 'theme', 'dark');
			switchMode('dark');
		} else if (urlMode === 'light') {
			theme.value = 'primary';
			safeSetStorage(localStorage, 'theme', 'primary');
			switchMode('primary');
		}
	} else {
		switchTheme(storedTheme);
	}
	if (theme.value === 'dark') {
		switchMode('dark');
	} else {
		switchMode('primary');
	}
	safeSetStorage(sessionStorage, 'lang', lang.value);
	const queryLang = urlParams.value.get('lang');
	if (queryLang === 'zh_CN' || queryLang === 'en_US') {
		const url = new URL(window.location.href);
		url.searchParams.delete('lang');
		window.history.replaceState(null, '', url.toString());
		syncPath();
	}
	if (isComponentMode) {
		const componentNav = englishMode ? mode.slice(0, -3) : mode;
		const targetPath = `/${componentNav}/${englishMode ? 'en_US' : 'zh_CN'}`;
		if (window.location.pathname !== targetPath) {
			window.location.replace(targetPath);
		}
	}
});
</script>

<template>
	<ConfigProvider :locale="isZh ? zh_CN : en_US" :theme="currentColor" :mode="theme" :built-in-icon-library="builtInIconLibrary">
		<div class="z-100 sticky top-0">
			<NavBar
				:title="title"
				:left="showLeft ? 'back' : null"
				inj-class="bg-white/60 dark:bg-black/60 backdrop-blur-sm"
				@click-left="goBack"
			>
				<template #rightChild>
					<div class="flex text-center">
						<template v-if="isIframe === '0'">
							<div class="h-12 w-10">
								<a
									href="https://github.com/any-tdf/any-tdf"
									target="_blank"
									rel="noreferrer"
									:aria-label="isZh ? 'GitHub 仓库' : 'GitHub repository'"
								>
									<Icon name="ri-github-fill" />
								</a>
							</div>
							<div class="h-12 w-10">
								<a
									:href="`https://vtdf.dev${isHome ? '' : `/components?nav=${nav}&tab=0`}`"
									target="_blank"
									rel="noreferrer"
									:aria-label="isZh ? '查看组件文档' : 'View component documentation'"
								>
									<Icon name="ri-compass-line" />
								</a>
							</div>
						</template>
						<button
							type="button"
							class="h-12 w-10"
							:aria-label="theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'"
							@click="toggleThemeMode"
						>
							<Icon :name="theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-line'" state="theme" />
						</button>
						<button type="button" class="h-12 w-10" aria-label="切换主题" @click="switchThemePanel">
							<Icon name="ri-palette-line" state="theme" />
						</button>
					</div>
				</template>
			</NavBar>
		</div>

		<HomePage v-if="isHome" :lang="lang" />
		<DemoRenderer v-else-if="currentRoute" :nav="currentRoute.nav" :lang="lang" />
		<div v-else class="flex flex-col items-center py-20">
			<div class="text-lg font-bold">{{ isZh ? '页面不存在' : 'Page not found' }}</div>
			<a href="/" class="text-primary dark:text-dark mt-4 text-sm underline">{{ isZh ? '返回首页' : 'Back to home' }}</a>
		</div>

		<div class="z-1000 pointer-events-none fixed inset-x-0 top-14 overflow-hidden pb-4 pl-2">
			<div
				class="pointer-events-auto mr-2 rounded-lg border border-black/10 bg-white p-2 shadow-md transition-transform duration-500 dark:border-white/10 dark:bg-black"
				:class="showTheme ? 'translate-x-0' : 'stdf-theme-panel-hidden'"
			>
				<ThemeSwitch
					:current-color="currentColor"
					:built-in-icon-library="builtInIconLibrary"
					:lang="lang"
					@change="handleThemeChange"
					@icon-library-change="selectBuiltInIconLibrary"
				/>
			</div>
		</div>

		<Feedback />
	</ConfigProvider>
</template>
