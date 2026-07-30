<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
	import { guideMenuList } from '@any-tdf/site-common/data';
	import Menu from '$lib/menu/Menu.svelte';
	import { isShowNavStore } from '../../store';

	let { children } = $props();
	const isZh = localStorage.getItem('lang') === 'zh_CN';
	let contentRoot: HTMLDivElement | null = $state(null);
	let outline = $state<SiteOutlineItem[]>([]);
	let activeId = $state('');
	let mobileOutlineOpen = $state(false);

	const flatMenuList = guideMenuList.flatMap((group) => group.childs);
	const getGuideNavFromPath = (pathname: string) => pathname.split('/').filter(Boolean)[1] ?? 'quick-start';
	const guideDocMap: Record<string, string> = {
		'icon-plugin': 'iconPlugin',
		md: 'mdPlugin'
	};
	let currentNav = $state(flatMenuList[0]);

	$effect(() => {
		const path = page.url.pathname;
		const guideNav = getGuideNavFromPath(path);
		currentNav = flatMenuList.find((item) => item.nav === guideNav) ?? flatMenuList[0];
		mobileOutlineOpen = false;
	});

	const refreshOutline = () => {
		if (!contentRoot) {
			outline = [];
			activeId = '';
			return () => undefined;
		}
		outline = buildSiteOutline(contentRoot);
		return observeActiveSiteOutline(contentRoot, (id) => (activeId = id));
	};

	onMount(() => {
		let stopOutline = refreshOutline();
		const observer = new MutationObserver(() => {
			stopOutline();
			stopOutline = refreshOutline();
		});
		if (contentRoot) observer.observe(contentRoot, { childList: true, subtree: true });
		return () => {
			observer.disconnect();
			stopOutline();
		};
	});

	const selectMenu = (item: (typeof flatMenuList)[number]) => {
		isShowNavStore.set(false);
		goto(`/guide${item.nav === 'quick-start' ? '' : `/${item.nav}`}`);
	};

	const editUrl = () => {
		const base = 'https://github.com/any-tdf/any-tdf/edit/main/content/stdf/guide/';
		if (currentNav.nav === 'create') return `${base}create${isZh ? '' : '_en'}.md`;
		const currentDoc = currentNav.doc ?? guideDocMap[currentNav.nav];
		return `${base}${currentDoc}${isZh ? '' : '_en'}.md`;
	};
</script>

<div class="site-doc-toolbar">
	<button class="site-header-action" onclick={() => isShowNavStore.set(!$isShowNavStore)} type="button">
		☰ {isZh ? '目录' : 'Menu'}
	</button>
	<button class="site-header-action" onclick={() => (mobileOutlineOpen = !mobileOutlineOpen)} disabled={outline.length === 0} type="button">
		{isZh ? '本页目录' : 'On this page'} {outline.length > 0 ? '⌄' : ''}
	</button>
</div>

<div class="site-doc-layout">
	<aside class="site-sidebar" class:is-open={$isShowNavStore}>
		<Menu menuList={guideMenuList} currentNav={currentNav.nav} onclickMenu={selectMenu} showNum={false} showIcons iconSet="guide" />
	</aside>

	<main class="site-doc-main">
		<div class="site-doc-main-inner is-wide overflow-x-auto" bind:this={contentRoot}>
			{@render children()}
		</div>

		{#if !['color', 'logo', 'shortkey'].includes(currentNav.nav)}
			<div class="mt-10 flex flex-wrap items-center gap-3 border-t border-(--site-divider) pt-5 text-sm">
				<a class="text-(--site-accent)" href={editUrl()} target="_blank">{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'} ↗</a>
			</div>
		{/if}
	</main>

	<aside class="site-outline" aria-label={isZh ? '本页目录' : 'On this page'}>
		{#if outline.length > 0}
			<h2 class="site-outline-title">{isZh ? '本页目录' : 'On this page'}</h2>
			{#each outline as item (item.id)}
				<a
					class="site-outline-link"
					class:is-active={activeId === item.id}
					data-level={item.level}
					aria-current={activeId === item.id ? 'location' : undefined}
					href={`#${item.id}`}
				>
					{item.title}
				</a>
			{/each}
		{/if}
	</aside>
</div>

{#if mobileOutlineOpen && outline.length > 0}
	<div class="mobile-outline-panel">
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
