<script lang="ts">
	import { browser } from '$app/environment';
	import { Button, ButtonGroup, Calendar, Cell, ConfigProvider, Icon, Tabs } from 'stdf';
	import { en_US, zh_CN } from 'stdf/lang';
	import { switchMode } from 'stdf/theme';
	import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from 'stdf/svg';
	import Counter from './Counter.svelte';

	const storageGet = (key: string) => (browser ? localStorage.getItem(key) : null);
	const sessionStorageGet = (key: string) => (browser ? sessionStorage.getItem(key) : null);
	const storageSet = (key: string, value: string) => {
		if (browser) localStorage.setItem(key, value);
	};
	const sessionStorageSet = (key: string, value: string) => {
		if (browser) sessionStorage.setItem(key, value);
	};

	if (browser) {
		document.body.addEventListener('touchstart', () => {});
	}

	// 切换亮暗模式
	// Toggle light or dark mode
	let mode = $state(sessionStorageGet('mode') === 'dark' ? 'dark' : 'primary');

	$effect(() => {
		switchMode(mode === 'dark' ? 'dark' : 'primary');
	});
	const toggleModeFun = () => {
		if (mode === 'dark') {
			mode = 'primary';
			sessionStorageSet('mode', 'primary');
		} else {
			mode = 'dark';
			sessionStorageSet('mode', 'dark');
		}
	};

	// 设置语言
	// Set language
	let lang = $state(storageGet('lang') === 'en_US' ? 'en_US' : 'zh_CN');
	const locale = $derived(lang === 'zh_CN' ? zh_CN : en_US);
	const toggleLangFun = () => {
		lang = lang === 'zh_CN' ? 'en_US' : 'zh_CN';
		storageSet('lang', lang);
		if (browser) window.location.reload();
	};

	const builtInIconLibraryStorageKey = 'built_in_icon_library';
	const initialBuiltInIconLibrary = '__STDF_BUILT_IN_ICON_LIBRARY__' as BuiltInIconLibrary;
	const isBuiltInIconLibrary = (library: string | null): library is BuiltInIconLibrary =>
		typeof library === 'string' && (builtInIconLibraryList as readonly string[]).includes(library);
	const getStoredBuiltInIconLibrary = (): BuiltInIconLibrary => {
		const storedLibrary = storageGet(builtInIconLibraryStorageKey);
		return isBuiltInIconLibrary(storedLibrary) ? storedLibrary : initialBuiltInIconLibrary;
	};
	const storedBuiltInIconLibrary = getStoredBuiltInIconLibrary();
	let builtInIconLibrary = $state<BuiltInIconLibrary>(storedBuiltInIconLibrary);
	const changeBuiltInIconLibraryFunc = (nextLibrary: BuiltInIconLibrary) => {
		builtInIconLibrary = nextLibrary;
		storageSet(builtInIconLibraryStorageKey, nextLibrary);
	};
	const builtInIconLibraryItems = builtInIconLibraryList.map((item) => ({
		text: builtInIconLibraryLabelMap[item],
		onclick: () => changeBuiltInIconLibraryFunc(item)
	}));

	// 进度条
	// Percent
	let percent = $state(20);
	const reduceFunc = () => {
		if (percent > 0) percent -= 10;
	};
	const increaseFunc = () => {
		if (percent < 100) percent += 10;
	};

	// 日历
	// Calendar
	let visible = $state(false);
</script>

<ConfigProvider {locale} {builtInIconLibrary}>
	<div class="flex items-center justify-center gap-2 pt-10 text-center">
		<a class="flex w-10 flex-col items-center" href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
			<img src="/svelte.svg" alt="Svelte Logo" />
		</a>
		<a class="flex w-10 flex-col items-center" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
			<img src="/tailwindcss.svg" alt="Tailwind Logo" />
		</a>
		<a class="flex w-10 flex-col items-center" href="https://typescriptlang.org" target="_blank" rel="noreferrer">
			<img src="/typescript.svg" alt="Typescript Logo" />
		</a>
		<a class="flex w-8 flex-col items-center" href="https://stdf.dev" target="_blank" rel="noreferrer" aria-label="STDF Logo">
			<svg class="h-full w-full" width="32" height="32" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
				<path
					class="text-primary dark:text-dark"
					fill="currentColor"
					d="M40 0C54.8054 0 67.7312 8.04427 74.6475 20H30V30H40C45.5228 30 50 34.4772 50 40C50 45.5228 45.5228 50 40 50H30V80H10V20H0V0H40ZM78.7393 30C79.5619 33.1962 80 36.547 80 40C80 62.0914 62.0914 80 40 80V60C51.0457 60 60 51.0457 60 40C60 36.3571 59.0259 32.9417 57.3242 30H78.7393Z"
				/>
				<path
					class="text-dark dark:text-primary"
					fill="currentColor"
					d="M20 30H40L20 80V50H0L20 0V30Z"
				/>
			</svg>
		</a>
	</div>
	<div class="my-6 text-center text-xs">
		{#if lang === 'zh_CN'}
			<p>这是 SvelteKit & Tailwind & TypeScript & STDF 构建的模板</p>
			<p class="mt-2">点击上方 LOGO 了解更多</p>
		{:else}
			<p>This is a template using SvelteKit & Tailwind CSS & TypeScript & STDF</p>
			<p class="mt-2">Click the logo above to learn more</p>
		{/if}
	</div>
	<div class="my-6">
		<a href="about">
			<Cell title={lang === 'zh_CN' ? '跳转 ABOUT' : 'Go to ABOUT'} />
		</a>
	</div>
	<div class="my-6">
		<Cell
			title={lang === 'zh_CN' ? '暗模式' : 'Dark mode'}
			right={{ type: 'switch', switch: { active: mode === 'dark' } }}
			onclick={toggleModeFun}
		/>
	</div>
	<div class="mt-8">
		<Counter bind:percent />
	</div>
	<div class="mb-8">
		<ButtonGroup
			fill="lineState"
			items={[
				{ text: '-10', onclick: reduceFunc },
				{ text: '+10', onclick: increaseFunc },
				{ text: lang === 'zh_CN' ? '重置' : 'Reset', onclick: () => (percent = 20) }
			]}
		/>
	</div>
	<div class="my-6">
		<Button fill="lineState" onclick={() => (visible = true)}>{lang === 'zh_CN' ? '日历' : 'Calendar'}</Button>
	</div>
	<Calendar bind:visible />

	<!-- STDF_ICON_EXAMPLES -->

	<div class="my-6">
		<Button onclick={toggleLangFun}>{lang === 'zh_CN' ? '切换语言' : 'Toggle language'}</Button>
	</div>

	<!-- STDF_THEME_CONTROL -->

	<div class="my-6 px-4">
		<div class="mb-3 text-center text-sm font-bold">
			{lang === 'zh_CN' ? '内置图标库' : 'Built-in icons'}: {builtInIconLibraryLabelMap[builtInIconLibrary]}
		</div>
		<ButtonGroup fill="lineState" heightIn="0" size="full" items={builtInIconLibraryItems} />
	</div>
</ConfigProvider>
