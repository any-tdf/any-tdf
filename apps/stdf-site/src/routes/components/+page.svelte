<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
	import hljs from 'highlight.js';
	import Menu from '$lib/menu/Menu.svelte';
	import Tab from '$lib/tab/Tab.svelte';
	import { currentColorStore, currentThemeStore, isCmdKStore, isShowNavStore } from '../../store';
	import { menuList, type MenuList, type MenuListChild } from '../../data/menuList';
	import Api from './Api.svelte';
	import Component from './Component.svelte';
	import FAQ from './FAQ.svelte';
	import Guide from './Guide.svelte';
	import Version from './Version.svelte';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const menuChildList = menuList.flatMap((group: MenuList) => group.childs);
	let currentNav = $state<MenuListChild>(menuChildList[0]);
	let currentTab = $state(0);
	let highlightedCode = $state('');
	let loading = $state(true);
	let isShowIframe = $state(true);
	let menuChange = $state(true);
	let docRoot: HTMLDivElement | null = $state(null);
	let outline = $state<SiteOutlineItem[]>([]);
	let activeId = $state('');
	let mobileOutlineOpen = $state(false);

	const getComponentSource = async (name: string) => {
		const source = await import(`../../../../../apps/stdf-demo/src/routes/${name}/${isZh ? 'zh_CN' : 'en_US'}/+page.svelte?raw`);
		return source.default
			.replace(/from ['"]\$lib\/index\.js['"]/g, "from 'stdf'")
			.replace(/from ['"]\$lib\/types\/index\.js['"]/g, "from 'stdf/types'");
	};

	const loadSource = async (nav: string) => {
		loading = true;
		const source = await getComponentSource(nav);
		highlightedCode = hljs.highlight(source, { language: 'svelte', ignoreIllegals: true }).value;
		loading = false;
	};

	const navigateToState = () => goto(`/components?nav=${currentNav.nav}&tab=${currentTab}`);

	const selectMenu = async (item: MenuListChild) => {
		isShowNavStore.set(false);
		menuChange = false;
		currentNav = item;
		await navigateToState();
		await loadSource(item.nav);
		menuChange = true;
	};

	const selectTab = (index: number) => {
		currentTab = index;
		mobileOutlineOpen = false;
		isShowIframe = false;
		window.setTimeout(() => (isShowIframe = true), 10);
		navigateToState();
	};

	onMount(() => {
		const navParam = page.url.searchParams.get('nav');
		const tabParam = Number(page.url.searchParams.get('tab') ?? 0);
		currentNav = menuChildList.find((item) => item.nav === navParam) ?? menuChildList[0];
		currentTab = Number.isNaN(tabParam) ? 0 : Math.min(Math.max(tabParam, 0), 4);
		loadSource(currentNav.nav);
	});

	$effect(() => {
		const root = docRoot;
		if (!root || currentTab === 0) {
			outline = [];
			activeId = '';
			return;
		}

		let stopOutline: () => void = () => undefined;
		const refresh = () => {
			stopOutline();
			outline = buildSiteOutline(root);
			stopOutline = observeActiveSiteOutline(root, (id) => (activeId = id));
		};
		queueMicrotask(refresh);
		const observer = new MutationObserver(refresh);
		observer.observe(root, { childList: true, subtree: true });
		return () => {
			observer.disconnect();
			stopOutline();
		};
	});

	const handleKeydown = (event: KeyboardEvent) => {
		if ($isCmdKStore) return;
		if (event.code === 'ArrowLeft' && currentTab > 0) selectTab(currentTab - 1);
		if (event.code === 'ArrowRight' && currentTab < 4) selectTab(currentTab + 1);
		if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
			const currentIndex = menuChildList.findIndex((item) => item.nav === currentNav.nav);
			const nextIndex = event.code === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
			if (nextIndex >= 0 && nextIndex < menuChildList.length) selectMenu(menuChildList[nextIndex]);
		}
	};

	const demoBaseUrl = import.meta.env.DEV ? `${location.protocol}//${location.hostname}:8888/` : 'https://demo.stdf.dev/';
	let demoUrl = $derived(
		`${demoBaseUrl}${currentNav.nav}/${isZh ? 'zh_CN' : 'en_US'}?channel=iframe&theme=${$currentColorStore}&darkMode=${$currentThemeStore}&lang=${
			isZh ? 'zh_CN' : 'en_US'
		}`
	);
	let standaloneDemoUrl = $derived(`${demoBaseUrl}${currentNav.nav}/${isZh ? 'zh_CN' : 'en_US'}`);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="site-doc-toolbar">
	<button class="site-header-action" onclick={() => isShowNavStore.set(!$isShowNavStore)} type="button">☰ {isZh ? '组件目录' : 'Components'}</button>
	{#if currentTab === 0}
		<a class="site-header-action" href={standaloneDemoUrl} target="_blank">{isZh ? '打开预览' : 'Open preview'} ↗</a>
	{:else}
		<button class="site-header-action" onclick={() => (mobileOutlineOpen = !mobileOutlineOpen)} disabled={outline.length === 0} type="button">
			{isZh ? '本页目录' : 'On this page'} {outline.length > 0 ? '⌄' : ''}
		</button>
	{/if}
</div>

<div class="site-component-layout">
	<aside class="site-sidebar" class:is-open={$isShowNavStore}>
		<Menu {menuList} currentNav={currentNav.nav} onclickMenu={selectMenu} showIcons />
	</aside>

	<main class="site-component-main">
		<header class="component-heading">
			<div class="component-heading-copy">
				<div class="component-title-row" data-component-title-row>
					<h1>{isZh ? currentNav.title : currentNav.title_en}</h1>
					<p>{isZh ? currentNav.tip : currentNav.tip_en}</p>
				</div>
			</div>
		</header>

		<div class="component-tabs">
			<Tab {currentTab} onclickTab={selectTab} />
		</div>

		{#if currentTab === 0}
			<div class="site-component-stage">
				<div class="site-component-code">
					{#if loading}
						<div class="p-6 text-sm text-(--site-text-muted)">{isZh ? '正在加载示例源码……' : 'Loading example source...'}</div>
					{:else}
						<Component {highlightedCode} />
					{/if}
				</div>
				<div class="site-component-preview" data-site-component-preview>
					{#if isShowIframe}
						<iframe title="STDF component demo" id="iframe-id" src={demoUrl}></iframe>
					{/if}
				</div>
			</div>
		{:else}
			<div class="component-doc-layout">
				<div class="component-doc-content" bind:this={docRoot}>
					{#if menuChange}
						{#if currentTab === 1}
							<Api api={currentNav.nav} />
						{:else if currentTab === 2}
							<Guide guide={currentNav.nav} />
						{:else if currentTab === 3}
							<FAQ guide={currentNav.nav} />
						{:else}
							<Version guide={currentNav.nav} />
						{/if}
					{/if}
				</div>
				<aside class="component-outline" aria-label={isZh ? '本页目录' : 'On this page'}>
					{#if outline.length > 0}
						<h2 class="site-outline-title">{isZh ? '本页目录' : 'On this page'}</h2>
						{#each outline as item (item.id)}
							<a
								class="site-outline-link"
								class:is-active={activeId === item.id}
								data-level={item.level}
								href={`#${item.id}`}
							>
								{item.title}
							</a>
						{/each}
					{/if}
				</aside>
			</div>
		{/if}
	</main>
</div>

{#if mobileOutlineOpen && outline.length > 0}
	<div class="mobile-component-outline">
		<div class="mb-2 flex items-center justify-between">
			<strong>{isZh ? '本页目录' : 'On this page'}</strong>
			<button class="site-header-action" onclick={() => (mobileOutlineOpen = false)} type="button">×</button>
		</div>
		{#each outline as item (item.id)}
			<a class="site-outline-link" class:is-active={activeId === item.id} data-level={item.level} href={`#${item.id}`} onclick={() => (mobileOutlineOpen = false)}>
				{item.title}
			</a>
		{/each}
	</div>
{/if}
