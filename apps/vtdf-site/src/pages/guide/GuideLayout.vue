<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
import Menu from '../../components/Menu.vue';
import { guideMenuList, type GuideMenuChild, type SiteMenuChild } from '../../data/menuList';
import { appState, navigateTo } from '../../store/appStore';
import GuidePage from './GuidePage.vue';

const isZh = computed(() => appState.lang === 'zh_CN');
const contentRoot = ref<HTMLDivElement | null>(null);
const outline = ref<SiteOutlineItem[]>([]);
const activeId = ref('');
const mobileOutlineOpen = ref(false);

const flatMenuList = guideMenuList.flatMap((group) => group.childs);
const getGuideNavFromPath = (pathname: string) => pathname.split('/').filter(Boolean)[1] ?? 'quick-start';
const guideDocMap: Record<string, string> = {
	'icon-plugin': 'iconPlugin',
	md: 'mdPlugin'
};
const currentNav = computed<GuideMenuChild>(() => {
	const path = appState.pathname;
	const guideNav = getGuideNavFromPath(path);
	return flatMenuList.find((item) => item.nav === guideNav) ?? flatMenuList[0];
});

watch(
	() => appState.pathname,
	() => {
		mobileOutlineOpen.value = false;
	}
);

const refreshOutline = () => {
	if (!contentRoot.value) {
		outline.value = [];
		activeId.value = '';
		return () => undefined;
	}
	outline.value = buildSiteOutline(contentRoot.value);
	return observeActiveSiteOutline(contentRoot.value, (id) => (activeId.value = id));
};

let stopOutline = refreshOutline();
let observer: MutationObserver | null = null;

onMounted(() => {
	stopOutline = refreshOutline();
	observer = new MutationObserver(() => {
		stopOutline();
		stopOutline = refreshOutline();
	});
	if (contentRoot.value) observer.observe(contentRoot.value, { childList: true, subtree: true });
});

onBeforeUnmount(() => {
	observer?.disconnect();
	stopOutline();
});

const selectMenu = (item: SiteMenuChild) => {
	appState.isShowNav = false;
	navigateTo(`/guide${item.nav === 'quick-start' ? '' : `/${item.nav}`}`);
};

const editUrl = computed(() => {
	const base = 'https://github.com/any-tdf/any-tdf/edit/main/content/vtdf/guide/';
	if (currentNav.value.nav === 'create')
		return `https://github.com/any-tdf/any-tdf/edit/main/tooling/create-any-tdf/README${isZh.value ? '_CN' : ''}.md`;
	const currentDoc = currentNav.value.doc ?? guideDocMap[currentNav.value.nav];
	return `${base}${currentDoc}${isZh.value ? '' : '_en'}.md`;
});
</script>

<template>
	<div class="site-doc-toolbar">
		<button class="site-header-action" type="button" @click="appState.isShowNav = !appState.isShowNav">
			☰ {{ isZh ? '目录' : 'Menu' }}
		</button>
		<button class="site-header-action" type="button" :disabled="outline.length === 0" @click="mobileOutlineOpen = !mobileOutlineOpen">
			{{ isZh ? '本页目录' : 'On this page' }} {{ outline.length > 0 ? '⌄' : '' }}
		</button>
	</div>

	<div class="site-doc-layout">
		<aside class="site-sidebar" :class="{ 'is-open': appState.isShowNav }">
			<Menu
				:menu-list="guideMenuList"
				:current-nav="currentNav.nav"
				:show-num="false"
				show-icons
				icon-set="guide"
				@menu-click="selectMenu"
			/>
		</aside>

		<main class="site-doc-main">
			<div class="site-doc-main-inner is-wide" ref="contentRoot">
				<GuidePage :current-nav="currentNav.nav" />
			</div>

			<div
				v-if="!['color', 'logo', 'shortkey'].includes(currentNav.nav)"
				class="mt-10 flex flex-wrap items-center gap-3 border-t border-(--site-divider) pt-5 text-sm"
			>
				<a class="text-(--site-accent)" :href="editUrl" target="_blank">{{ isZh ? '在 GitHub 上编辑' : 'Edit on GitHub' }} ↗</a>
			</div>
		</main>

		<aside class="site-outline" :aria-label="isZh ? '本页目录' : 'On this page'">
			<template v-if="outline.length > 0">
				<h2 class="site-outline-title">{{ isZh ? '本页目录' : 'On this page' }}</h2>
				<a
					v-for="item in outline"
					:key="item.id"
					class="site-outline-link"
					:class="{ 'is-active': activeId === item.id }"
					:data-level="item.level"
					:aria-current="activeId === item.id ? 'location' : undefined"
					:href="`#${item.id}`"
				>
					{{ item.title }}
				</a>
			</template>
		</aside>
	</div>

	<div v-if="mobileOutlineOpen && outline.length > 0" class="mobile-outline-panel">
		<div class="mb-2 flex items-center justify-between">
			<strong>{{ isZh ? '本页目录' : 'On this page' }}</strong>
			<button class="site-header-action" type="button" @click="mobileOutlineOpen = false">×</button>
		</div>
		<a
			v-for="item in outline"
			:key="item.id"
			class="site-outline-link"
			:class="{ 'is-active': activeId === item.id }"
			:data-level="item.level"
			:href="`#${item.id}`"
			@click="mobileOutlineOpen = false"
		>
			{{ item.title }}
		</a>
	</div>
</template>
