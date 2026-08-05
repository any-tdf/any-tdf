<script lang="ts">
	import { page } from '$app/state';
	import { createSiteLanguageUrl, getSiteNavigationState, siteHeaderIconPaths, sitePaths } from '@any-tdf/site-common/site';
	import ModeSwitch from '../modeSwitch/ModeSwitch.svelte';
	import ThemeSwitch from '../themeSwitch/ThemeSwitch.svelte';
	import { isShowFundStore, showThemeSwitchStore } from '../../store';

	let { showLeftNav = false, onclickCmdK } = $props();
	let mobileOpen = $state(false);
	let mobileThemeOpen = $state(false);
	let themePanel: HTMLDivElement | null = $state(null);
	const isZh = localStorage.getItem('lang') === 'zh_CN';
	let currentRoute = $derived(page.url.pathname);
	let navigationState = $derived(getSiteNavigationState(currentRoute));
	let isGuide = $derived(navigationState.isGuide);
	let isComponents = $derived(navigationState.isComponents);
	let isGenerator = $derived(navigationState.isGenerator);

	const switchLang = () => {
		window.location.href = createSiteLanguageUrl(window.location.href, isZh ? 'zh_CN' : 'en_US');
	};

	$effect(() => {
		if (currentRoute) mobileOpen = false;
	});

	const toggleTheme = (event: MouseEvent) => {
		event.stopPropagation();
		showThemeSwitchStore.set(!$showThemeSwitchStore);
	};
</script>

{#snippet headerIcon(name: keyof typeof siteHeaderIconPaths)}
	<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d={siteHeaderIconPaths[name]} />
	</svg>
{/snippet}

<svelte:document
	onclick={(event) => {
		if (!themePanel?.contains(event.target as Node)) showThemeSwitchStore.set(false);
	}}
	onkeydown={(event) => {
		if (event.key === 'Escape') showThemeSwitchStore.set(false);
	}}
/>

<header class="site-header" data-has-sidebar={showLeftNav || undefined}>
	<div class="site-header-inner">
		<a href="/" class="site-brand" aria-label={isZh ? 'STDF 首页' : 'STDF home'}>
			<span class="site-brand-mark tdf-logo-animated" data-logo-animated>
				<svg viewBox="0 0 80 80" aria-hidden="true">
					<path
						class="fill-primary dark:fill-dark"
						d="M40 0C54.8 0 67.7 8 74.6 20H30V30H40A10 10 0 0 1 40 50H30V80H10V20H0V0H40Zm38.7 30A40 40 0 0 1 40 80V60A20 20 0 0 0 57.3 30h21.4Z"
					/>
					<path
						class="tdf-stdf-logo-lightning fill-dark text-dark dark:fill-primary dark:text-primary"
						data-logo-layer="stdf-mark"
						d="M20 30H40L20 80V50H0L20 0V30Z"
					/>
				</svg>
			</span>
		</a>

		<nav class="site-header-nav" aria-label={isZh ? '主导航' : 'Main navigation'}>
			<button
				class="site-search-trigger"
				onclick={() => onclickCmdK?.()}
				type="button"
				aria-label={isZh ? '搜索文档' : 'Search docs'}
			>
				<span>{isZh ? '搜索文档' : 'Search docs'}</span>
				<span class="site-search-key" aria-hidden="true">⌘ K</span>
			</button>
			<a
				class="site-header-link"
				class:is-active={isGuide}
				aria-current={isGuide ? 'page' : undefined}
				href="/guide"
			>
				{isZh ? '指南' : 'Guide'}
			</a>
			<a
				class="site-header-link"
				class:is-active={isComponents}
				aria-current={isComponents ? 'page' : undefined}
				href={sitePaths.components}
			>
				{isZh ? '组件' : 'Components'}
			</a>
			<div class="relative" bind:this={themePanel}>
				<button
					class="site-header-action"
					onclick={toggleTheme}
					type="button"
					aria-expanded={$showThemeSwitchStore}
					aria-current={isGenerator ? 'page' : undefined}
				>
					{isZh ? '主题' : 'Theme'}
				</button>
				{#if $showThemeSwitchStore}
					<div class="site-popover site-theme-popover">
						<div class="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
							<div>
								<div class="text-sm font-bold">{isZh ? '界面主题' : 'Interface theme'}</div>
								<div class="text-xs text-(--site-text-muted)">{isZh ? '模式与内置颜色' : 'Mode and built-in colors'}</div>
							</div>
							<ModeSwitch />
						</div>
						<ThemeSwitch vertical />
						<a
							href={sitePaths.generator}
							class="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
						>
							<span class="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
								<svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
								</svg>
							</span>
							<span class="min-w-0 flex-1">
								<span class="block text-sm font-medium">{isZh ? '创建新主题' : 'Create theme'}</span>
								<span class="block text-xs text-(--site-text-muted)">{isZh ? '打开主题生成器' : 'Open theme generator'}</span>
							</span>
							<span class="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
						</a>
					</div>
				{/if}
			</div>
			<button
				class="site-header-action"
				onclick={() => isShowFundStore.set(true)}
				type="button"
			>
				{isZh ? '支持' : 'Support'}
			</button>
			<button
				class="site-header-action site-header-icon-action site-language-action"
				onclick={switchLang}
				type="button"
				aria-label={isZh ? '切换到英文' : 'Switch to Chinese'}
				title={isZh ? '切换到英文' : 'Switch to Chinese'}
			>
				{@render headerIcon('language')}
			</button>
			<a
				class="site-header-action site-header-icon-action"
				href="https://github.com/any-tdf/any-tdf"
				target="_blank"
				rel="noreferrer"
				aria-label="GitHub"
				title="GitHub"
			>
				{@render headerIcon('github')}
			</a>
		</nav>

		<button
			class="site-mobile-menu-button"
			onclick={() => {
				mobileOpen = !mobileOpen;
				mobileThemeOpen = false;
			}}
			type="button"
			aria-label={isZh ? '打开导航菜单' : 'Open navigation menu'}
			aria-expanded={mobileOpen}
		>
			<span aria-hidden="true">{mobileOpen ? '×' : '☰'}</span>
		</button>

		{#if mobileOpen}
			<div class="site-popover right-4 top-14 lg:hidden">
				{#if mobileThemeOpen}
					<!-- 主题二级面板 -->
					<div class="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
						<button class="site-header-action" onclick={() => (mobileThemeOpen = false)} type="button">
							{isZh ? '← 返回' : '← Back'}
						</button>
						<div class="text-sm font-bold">{isZh ? '界面主题' : 'Interface theme'}</div>
						<ModeSwitch />
					</div>
					<ThemeSwitch vertical />
					<a
						href={sitePaths.generator}
						class="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
					>
						<span class="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
							<svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path
									d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
								/>
							</svg>
						</span>
						<span class="min-w-0 flex-1">
							<span class="block text-sm font-medium">{isZh ? '创建新主题' : 'Create theme'}</span>
							<span class="block text-xs text-(--site-text-muted)">{isZh ? '打开主题生成器' : 'Open theme generator'}</span>
						</span>
						<span class="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
					</a>
				{:else}
					<div class="site-mobile-menu-nav mb-3">
						<a class="site-header-link" href="/guide">{isZh ? '指南' : 'Guide'}</a>
						<a class="site-header-link" href={sitePaths.components}>{isZh ? '组件' : 'Components'}</a>
						<button class="site-header-action" onclick={() => (mobileThemeOpen = true)} type="button">
							{isZh ? '主题' : 'Theme'} ›
						</button>
						<a class="site-header-link" href={sitePaths.generator}>{isZh ? '主题生成器' : 'Theme generator'}</a>
						<button class="site-header-action" onclick={() => onclickCmdK?.()} type="button">
							{isZh ? '搜索' : 'Search'}
						</button>
						<button class="site-header-action" onclick={() => isShowFundStore.set(true)} type="button">
							{isZh ? '支持' : 'Support'}
						</button>
					</div>
					<div class="mt-3 flex justify-between border-t border-(--site-divider) pt-3">
						<button class="site-header-action" onclick={switchLang} type="button">{isZh ? 'English' : '简体中文'}</button>
						<a class="site-header-action" href="https://github.com/any-tdf/any-tdf" target="_blank">GitHub ↗</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</header>
