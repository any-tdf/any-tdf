<script lang="ts">
	import type { MenuListChild } from '../../data/menuList.js';
	import { categoryIconMap, componentIconMap, fallbackComponentIcon } from '../componentIcons.js';
	import { guideCategoryIconMap, guideItemIconMap } from '../guideIcons.js';

	let { currentNav = $bindable(''), showNum = true, showIcons = false, iconSet = 'components', menuList = [], onclickMenu } = $props();
	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const getCategoryIcon = (name: string) =>
		iconSet === 'guide'
			? guideCategoryIconMap[name as keyof typeof guideCategoryIconMap] || fallbackComponentIcon
			: categoryIconMap[name as keyof typeof categoryIconMap] || fallbackComponentIcon;
	const getItemIcon = (nav: string) =>
		iconSet === 'guide'
			? guideItemIconMap[nav as keyof typeof guideItemIconMap] || fallbackComponentIcon
			: componentIconMap[nav as keyof typeof componentIconMap] || fallbackComponentIcon;

	const selectMenu = (menu: MenuListChild) => {
		currentNav = menu.nav;
		onclickMenu(menu);
	};
</script>

<nav class:has-icons={showIcons} aria-label={isZh ? '侧边导航' : 'Sidebar navigation'}>
	<div class="site-sidebar-meta">
		{isZh ? '文档更新' : 'Document updated'}
		<br />
		{isZh ? import.meta.env.VITE_BUILD_TIME_ZH : import.meta.env.VITE_BUILD_TIME_EN}
	</div>
	{#each menuList as menu (menu.class)}
		{@const CategoryIcon = getCategoryIcon(menu.class)}
		<section class="site-sidebar-group">
			<h2 class="site-sidebar-title flex items-center gap-2">
				{#if showIcons}
					<CategoryIcon class="shrink-0" size={16} strokeWidth={1.75} absoluteStrokeWidth />
				{/if}
				<span>{isZh ? menu.class : menu.class_en}{showNum ? ` · ${menu.childs.length}` : ''}</span>
			</h2>
			{#each menu.childs as child (child.nav)}
				{@const ComponentIcon = getItemIcon(child.nav)}
				<button
					onclick={() => selectMenu(child)}
					class="site-sidebar-link gap-2"
					class:is-active={currentNav === child.nav}
					aria-current={currentNav === child.nav ? 'page' : undefined}
					type="button"
				>
					{#if showIcons}
						<ComponentIcon class="shrink-0" size={16} strokeWidth={1.75} absoluteStrokeWidth />
					{/if}
					<span>{isZh ? child.title : child.title_en}</span>
				</button>
			{/each}
		</section>
	{/each}
</nav>
