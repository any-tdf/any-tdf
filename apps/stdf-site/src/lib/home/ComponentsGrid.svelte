<script lang="ts">
	import { ArrowRight, Boxes } from '@lucide/svelte';
	import { menuList } from '../../data/menuList';
	import { categoryIconMap, componentIconMap, fallbackComponentIcon } from '../componentIcons.js';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let activeCategory = $state<string>(menuList[0]?.class || '');
	const totalComponents = menuList.reduce((acc, cur) => acc + cur.childs.length, 0);
	let filteredComponents = $derived(menuList.find((item) => item.class === activeCategory || item.class_en === activeCategory)?.childs || []);
</script>

<section class="relative overflow-hidden p-6 md:p-8">
	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="mb-12 text-center">
			<div
				class="border-primary/20 bg-primary/5 text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark mb-6 inline-flex items-center gap-2 border px-4 py-1.5 text-sm"
			>
				<Boxes size={16} strokeWidth={1.75} absoluteStrokeWidth />
				<span>{isZh ? '组件总览' : 'Components Overview'}</span>
			</div>

			<h2 class="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
				{isZh ? '丰富组件，开箱即用' : 'Rich Components, Ready to Use'}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400">
				{isZh
					? `${totalComponents} 精心设计的组件，覆盖表单、导航、反馈、展示等各种场景，满足移动端开发的全部需求。`
					: `${totalComponents} carefully designed components covering forms, navigation, feedback, display and more scenarios.`}
			</p>
		</div>

			<div class="component-category-tabs mb-8 flex flex-wrap justify-center">
			{#each menuList as category (category)}
				{@const CategoryIcon = categoryIconMap[category.class as keyof typeof categoryIconMap] || fallbackComponentIcon}
				<button
					class="component-category-tab flex items-center gap-2 border border-(--site-divider) px-4 py-2 text-sm font-medium transition-colors {activeCategory === category.class ||
					activeCategory === category.class_en
						? 'bg-primary text-text-on-primary dark:bg-dark dark:text-text-on-dark'
						: 'bg-transparent text-gray-600 hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:text-gray-400 dark:hover:border-dark/20 dark:hover:bg-dark/10 dark:hover:text-dark'}"
					onclick={() => (activeCategory = category.class)}
				>
					<CategoryIcon size={16} strokeWidth={1.75} absoluteStrokeWidth />
					{isZh ? category.class : category.class_en}
					<span class="text-xs opacity-70">{category.childs.length}</span>
				</button>
			{/each}
		</div>

		<div class="component-items-grid">
			{#each filteredComponents as component (component.nav)}
				{@const ComponentIcon = componentIconMap[component.nav as keyof typeof componentIconMap] || fallbackComponentIcon}
				<a
					href={`/components?nav=${component.nav}&tab=0`}
					class="component-item-card group relative overflow-hidden border border-(--site-divider) bg-transparent p-4 transition-colors hover:bg-primary/5 dark:hover:bg-dark/5"
				>
					<div class="relative z-10">
						<div
							class="bg-primary/10 group-hover:bg-primary dark:bg-dark/10 dark:group-hover:bg-dark mb-3 flex size-10 items-center justify-center transition-colors"
						>
							<ComponentIcon
								class="text-primary group-hover:text-text-on-primary dark:text-dark dark:group-hover:text-text-on-dark transition-colors"
								size={20}
								strokeWidth={1.75}
								absoluteStrokeWidth
							/>
						</div>

						<div
							class="group-hover:text-primary dark:group-hover:text-dark mb-1 text-sm font-semibold text-gray-800 transition-colors dark:text-white"
						>
							{isZh ? component.title_zh : component.title_en}
						</div>
						<div class="text-xs text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
							{component.title_en}
						</div>
					</div>

					<div class="absolute bottom-2 right-2 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
						<ArrowRight class="text-primary dark:text-dark" size={16} strokeWidth={1.75} absoluteStrokeWidth />
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-10 text-center">
			<a
				href="/components"
				class="inline-flex items-center gap-2 border border-(--site-divider) bg-transparent px-6 py-3 text-sm font-medium text-(--site-text) transition-colors hover:border-(--site-text-muted) hover:bg-black/5 focus-visible:border-(--site-text-muted) focus-visible:outline-none dark:hover:bg-white/5"
			>
				{isZh ? '查看全部组件文档' : 'View All Component Docs'}
				<ArrowRight size={16} strokeWidth={1.75} absoluteStrokeWidth />
			</a>
		</div>
	</div>
</section>
