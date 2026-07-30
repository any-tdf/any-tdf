<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowRight, Boxes, getComponentCategoryIcon, getComponentIcon } from '../../lib/icons';
import { menuList } from '../../data/menuList';
import { appState, navigateTo } from '../../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');

const activeCategory = ref<string>(menuList[0]?.class || '');
const totalComponents = menuList.reduce((acc, cur) => acc + cur.childs.length, 0);
const filteredComponents = computed(
	() => menuList.find((item) => item.class === activeCategory.value || item.class_en === activeCategory.value)?.childs || []
);

const go = (url: string) => {
	navigateTo(url);
};
</script>

<template>
	<section class="relative overflow-hidden p-6 md:p-8">
		<div class="relative z-10 mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<div
					class="border-primary/20 bg-primary/5 text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark mb-6 inline-flex items-center gap-2 border px-4 py-1.5 text-sm"
				>
					<Boxes :size="16" :stroke-width="1.75" absolute-stroke-width />
					<span>{{ isZh ? '组件总览' : 'Components Overview' }}</span>
				</div>

				<h2 class="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
					{{ isZh ? '丰富组件，开箱即用' : 'Rich Components, Ready to Use' }}
				</h2>
				<p class="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400">
					{{
						isZh
							? `${totalComponents} 精心设计的组件，覆盖表单、导航、反馈、展示等各种场景，满足移动端开发的全部需求。`
							: `${totalComponents} carefully designed components covering forms, navigation, feedback, display and more scenarios.`
					}}
				</p>
			</div>

			<div class="component-category-tabs mb-8 flex flex-wrap justify-center">
				<button
					v-for="category in menuList"
					:key="category.class"
					class="component-category-tab flex items-center gap-2 border border-(--site-divider) px-4 py-2 text-sm font-medium transition-colors"
					:class="
						activeCategory === category.class || activeCategory === category.class_en
							? 'bg-primary text-text-on-primary dark:bg-dark dark:text-text-on-dark'
							: 'bg-transparent text-gray-600 hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:text-gray-400 dark:hover:border-dark/20 dark:hover:bg-dark/10 dark:hover:text-dark'
					"
					type="button"
					@click="activeCategory = category.class"
				>
					<component :is="getComponentCategoryIcon(category.class)" :size="16" :stroke-width="1.75" absolute-stroke-width />
					{{ isZh ? category.class : category.class_en }}
					<span class="text-xs opacity-70">{{ category.childs.length }}</span>
				</button>
			</div>

			<div class="component-items-grid">
				<a
					v-for="component in filteredComponents"
					:key="component.nav"
					:href="`/components?nav=${component.nav}&tab=0`"
					class="component-item-card group relative overflow-hidden border border-(--site-divider) bg-transparent p-4 transition-colors hover:bg-primary/5 dark:hover:bg-dark/5"
					@click.prevent="go(`/components?nav=${component.nav}&tab=0`)"
				>
					<div class="relative z-10">
						<div
							class="bg-primary/10 group-hover:bg-primary dark:bg-dark/10 dark:group-hover:bg-dark mb-3 flex size-10 items-center justify-center transition-colors"
						>
							<component
								:is="getComponentIcon(component.nav)"
								class="text-primary group-hover:text-text-on-primary dark:text-dark dark:group-hover:text-text-on-dark transition-colors"
								:size="20"
								:stroke-width="1.75"
								absolute-stroke-width
							/>
						</div>

						<div
							class="group-hover:text-primary dark:group-hover:text-dark mb-1 text-sm font-semibold text-gray-800 transition-colors dark:text-white"
						>
							{{ isZh ? component.title_zh : component.title_en }}
						</div>
						<div
							class="text-xs text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
						>
							{{ component.title_en }}
						</div>
					</div>

					<div class="absolute bottom-2 right-2 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
						<ArrowRight class="text-primary dark:text-dark" :size="16" :stroke-width="1.75" absolute-stroke-width />
					</div>
				</a>
			</div>

			<div class="mt-10 text-center">
				<a
					href="/components"
					class="inline-flex items-center gap-2 border border-(--site-divider) bg-transparent px-6 py-3 text-sm font-medium text-(--site-text) transition-colors hover:border-(--site-text-muted) hover:bg-black/5 focus-visible:border-(--site-text-muted) focus-visible:outline-none dark:hover:bg-white/5"
					@click.prevent="go('/components')"
				>
					{{ isZh ? '查看全部组件文档' : 'View All Component Docs' }}
					<ArrowRight :size="16" :stroke-width="1.75" absolute-stroke-width />
				</a>
			</div>
		</div>
	</section>
</template>
