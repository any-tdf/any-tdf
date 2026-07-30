<script setup lang="ts">
import { computed } from 'vue';
import type { SiteMenuChild, SiteMenuGroup } from '../data/menuList';
import { getComponentCategoryIcon, getComponentIcon, getGuideCategoryIcon, getGuideItemIcon } from '../lib/icons';
import { appState } from '../store/appStore';

const props = withDefaults(
	defineProps<{
		/** 当前选中的菜单 nav */
		currentNav?: string;
		/** 是否显示每个分类的条目数 */
		showNum?: boolean;
		/** 是否显示图标 */
		showIcons?: boolean;
		/** 图标集：组件文档 / 指南文档 */
		iconSet?: 'components' | 'guide';
		/** 菜单数据 */
		menuList?: SiteMenuGroup[];
	}>(),
	{
		currentNav: '',
		showNum: true,
		showIcons: false,
		iconSet: 'components',
		menuList: () => []
	}
);

const emit = defineEmits<{
	'menu-click': [menu: SiteMenuChild];
}>();

const isZh = computed(() => appState.lang === 'zh_CN');
const buildTime = computed(() => (isZh.value ? import.meta.env.VITE_BUILD_TIME_ZH : import.meta.env.VITE_BUILD_TIME_EN));

const getCategoryIcon = (name: string) => (props.iconSet === 'guide' ? getGuideCategoryIcon(name) : getComponentCategoryIcon(name));
const getItemIcon = (nav: string) => (props.iconSet === 'guide' ? getGuideItemIcon(nav) : getComponentIcon(nav));

const selectMenu = (menu: SiteMenuChild) => {
	emit('menu-click', menu);
};
</script>

<template>
	<nav :class="{ 'has-icons': showIcons }" :aria-label="isZh ? '侧边导航' : 'Sidebar navigation'">
		<div class="site-sidebar-meta">
			{{ isZh ? '文档更新' : 'Document updated' }}
			<br />
			{{ buildTime }}
		</div>
		<section v-for="menu in menuList" :key="menu.class" class="site-sidebar-group">
			<h2 class="site-sidebar-title flex items-center gap-2">
				<component
					:is="getCategoryIcon(menu.class)"
					v-if="showIcons"
					class="shrink-0"
					:size="16"
					:stroke-width="1.75"
					absolute-stroke-width
				/>
				<span>{{ isZh ? menu.class : menu.class_en }}{{ showNum ? ` · ${menu.childs.length}` : '' }}</span>
			</h2>
			<button
				v-for="child in menu.childs"
				:key="child.nav"
				class="site-sidebar-link gap-2"
				:class="{ 'is-active': currentNav === child.nav }"
				:aria-current="currentNav === child.nav ? 'page' : undefined"
				type="button"
				@click="selectMenu(child)"
			>
				<component :is="getItemIcon(child.nav)" v-if="showIcons" class="shrink-0" :size="16" :stroke-width="1.75" absolute-stroke-width />
				<span>{{ isZh ? child.title : child.title_en }}</span>
			</button>
		</section>
	</nav>
</template>
