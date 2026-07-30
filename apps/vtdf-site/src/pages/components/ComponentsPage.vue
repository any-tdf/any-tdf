<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
import hljs from 'highlight.js';
import Menu from '../../components/Menu.vue';
import Tab from '../../components/Tabs.vue';
import { menuList, type MenuList, type MenuListChild, type SiteMenuChild } from '../../data/menuList';
import { appState, navigateTo } from '../../store/appStore';
import Api from './Api.vue';
import Component from './Component.vue';
import FAQ from './FAQ.vue';
import Guide from './Guide.vue';
import Version from './Version.vue';

const sourceModulesZh = import.meta.glob('../../../../../apps/vtdf-demo/src/pages/**/zh_CN.vue', {
	query: '?raw',
	import: 'default'
});
const sourceModulesEn = import.meta.glob('../../../../../apps/vtdf-demo/src/pages/**/en_US.vue', {
	query: '?raw',
	import: 'default'
});
const sourceModulesDemo = import.meta.glob('../../../../../apps/vtdf-demo/src/pages/**/*Demo.vue', {
	query: '?raw',
	import: 'default'
});

const flattenMenuList = (list: MenuList[]) =>
	list.reduce<MenuListChild[]>((acc, cur) => {
		if (cur.childs) acc.push(...cur.childs);
		return acc;
	}, []);

const menuChildList = flattenMenuList(menuList);
const isZh = computed(() => appState.lang === 'zh_CN');
const searchParams = computed(() => new URLSearchParams(appState.search));
const currentNav = computed(() => {
	const navParam = searchParams.value.get('nav');
	return navParam ? menuChildList.find((item) => item.nav === navParam) || menuChildList[0] : menuChildList[0];
});
const currentTab = ref(0);
const highlightedCode = ref('');
const loading = ref(true);
const isShowIframe = ref(true);
const menuChange = ref(true);
const docRoot = ref<HTMLDivElement | null>(null);
const outline = ref<SiteOutlineItem[]>([]);
const activeId = ref('');
const mobileOutlineOpen = ref(false);

const getComponentSource = async (name: string) => {
	const sources = isZh.value ? sourceModulesZh : sourceModulesEn;
	const sourcePath = Object.keys(sources).find((key) => key.includes(`/pages/${name}/`));
	if (!sourcePath) return '';
	const source = (await sources[sourcePath]()) as string;
	// VTDF 的示例页面可能拆出 *Demo.vue 文件，优先展示 Demo 文件源码
	const demoFile = source.match(/import\s+\w+\s+from\s+['"]\.\/([^'"]+Demo\.vue)['"]/)?.[1];
	const demoSourcePath = demoFile ? sourcePath.replace(/(?:zh_CN|en_US)\.vue$/, demoFile) : '';
	const resolvedSource =
		demoSourcePath && sourceModulesDemo[demoSourcePath] ? ((await sourceModulesDemo[demoSourcePath]()) as string) : source;
	return resolvedSource
		.replace(/from ['"]\.\.\/\.\.\/lib\/components['"]/g, "from 'vtdf'")
		.replace(/from ['"]\.\.\/\.\.\/lib\/types(?:\/index)?['"]/g, "from 'vtdf/types'")
		.replace(/from ['"]\.\.\/\.\.\/lib\/utils['"]/g, "from 'vtdf/utils'");
};

const loadSource = async (nav: string) => {
	loading.value = true;
	const source = await getComponentSource(nav);
	highlightedCode.value = hljs.highlight(source, { language: 'xml', ignoreIllegals: true }).value;
	loading.value = false;
};

const navigateToState = () => navigateTo(`/components?nav=${currentNav.value.nav}&tab=${currentTab.value}`);

const selectMenu = async (item: SiteMenuChild) => {
	appState.isShowNav = false;
	menuChange.value = false;
	navigateTo(`/components?nav=${item.nav}&tab=${currentTab.value}`);
	await loadSource(item.nav);
	menuChange.value = true;
};

const selectTab = (index: number) => {
	currentTab.value = index;
	mobileOutlineOpen.value = false;
	isShowIframe.value = false;
	window.setTimeout(() => (isShowIframe.value = true), 10);
	navigateToState();
};

watch(
	() => searchParams.value.get('tab'),
	(tab) => {
		const next = Number(tab ?? 0);
		currentTab.value = Number.isNaN(next) ? 0 : Math.min(Math.max(next, 0), 4);
	},
	{ immediate: true }
);

watch(
	() => [currentNav.value.nav, appState.lang] as const,
	([nav]) => loadSource(nav),
	{ immediate: true }
);

// 目录大纲：tab 非 0 时基于文档容器构建
let stopOutline: () => void = () => undefined;
let outlineObserver: MutationObserver | null = null;

const refreshOutline = () => {
	const root = docRoot.value;
	if (!root || currentTab.value === 0) {
		outline.value = [];
		activeId.value = '';
		return;
	}
	stopOutline();
	outline.value = buildSiteOutline(root);
	stopOutline = observeActiveSiteOutline(root, (id) => (activeId.value = id));
};

watch([docRoot, currentTab, menuChange], () => {
	outlineObserver?.disconnect();
	stopOutline();
	const root = docRoot.value;
	if (!root || currentTab.value === 0) {
		outline.value = [];
		activeId.value = '';
		return;
	}
	queueMicrotask(refreshOutline);
	outlineObserver = new MutationObserver(refreshOutline);
	outlineObserver.observe(root, { childList: true, subtree: true });
});

const handleKeydown = (event: KeyboardEvent) => {
	if (appState.isCmdK) return;
	if (event.code === 'ArrowLeft' && currentTab.value > 0) selectTab(currentTab.value - 1);
	if (event.code === 'ArrowRight' && currentTab.value < 4) selectTab(currentTab.value + 1);
	if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
		const currentIndex = menuChildList.findIndex((item) => item.nav === currentNav.value.nav);
		const nextIndex = event.code === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
		if (nextIndex >= 0 && nextIndex < menuChildList.length) selectMenu(menuChildList[nextIndex]);
	}
};

const demoBaseUrl = import.meta.env.DEV ? `${location.protocol}//${location.hostname}:8886/` : 'https://demo.vtdf.dev/';
const demoUrl = computed(
	() =>
		`${demoBaseUrl}${currentNav.value.nav}/${isZh.value ? 'zh_CN' : 'en_US'}?channel=iframe&theme=${appState.currentColor}&darkMode=${appState.currentThemeMode}&lang=${
			isZh.value ? 'zh_CN' : 'en_US'
		}`
);
const standaloneDemoUrl = computed(() => `${demoBaseUrl}${currentNav.value.nav}/${isZh.value ? 'zh_CN' : 'en_US'}`);

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	outlineObserver?.disconnect();
	stopOutline();
});
</script>

<template>
	<div class="site-doc-toolbar">
		<button class="site-header-action" type="button" @click="appState.isShowNav = !appState.isShowNav">
			☰ {{ isZh ? '组件目录' : 'Components' }}
		</button>
		<a v-if="currentTab === 0" class="site-header-action" :href="standaloneDemoUrl" target="_blank"
			>{{ isZh ? '打开预览' : 'Open preview' }} ↗</a
		>
		<button
			v-else
			class="site-header-action"
			type="button"
			:disabled="outline.length === 0"
			@click="mobileOutlineOpen = !mobileOutlineOpen"
		>
			{{ isZh ? '本页目录' : 'On this page' }} {{ outline.length > 0 ? '⌄' : '' }}
		</button>
	</div>

	<div class="site-component-layout">
		<aside class="site-sidebar" :class="{ 'is-open': appState.isShowNav }">
			<Menu :menu-list="menuList" :current-nav="currentNav.nav" show-icons @menu-click="selectMenu" />
		</aside>

		<main class="site-component-main">
			<header class="component-heading">
				<div class="component-heading-copy">
					<div class="component-title-row" data-component-title-row>
						<h1>{{ isZh ? currentNav.title : currentNav.title_en }}</h1>
						<p>{{ isZh ? currentNav.tip : currentNav.tip_en }}</p>
					</div>
				</div>
			</header>

			<div class="component-tabs">
				<Tab :current-tab="currentTab" @change="selectTab" />
			</div>

			<div v-if="currentTab === 0" class="site-component-stage">
				<div class="site-component-code">
					<div v-if="loading" class="p-6 text-sm text-(--site-text-muted)">
						{{ isZh ? '正在加载示例源码……' : 'Loading example source...' }}
					</div>
					<Component v-else :highlighted-code="highlightedCode" />
				</div>
				<div class="site-component-preview" data-site-component-preview>
					<iframe v-if="isShowIframe" title="VTDF component demo" id="iframe-id" :src="demoUrl"></iframe>
				</div>
			</div>
			<div v-else class="component-doc-layout">
				<div class="component-doc-content" ref="docRoot">
					<template v-if="menuChange">
						<Api v-if="currentTab === 1" :api="currentNav.nav" />
						<Guide v-else-if="currentTab === 2" :guide="currentNav.nav" />
						<FAQ v-else-if="currentTab === 3" :guide="currentNav.nav" />
						<Version v-else :guide="currentNav.nav" />
					</template>
				</div>
				<aside class="component-outline" :aria-label="isZh ? '本页目录' : 'On this page'">
					<template v-if="outline.length > 0">
						<h2 class="site-outline-title">{{ isZh ? '本页目录' : 'On this page' }}</h2>
						<a
							v-for="item in outline"
							:key="item.id"
							class="site-outline-link"
							:class="{ 'is-active': activeId === item.id }"
							:data-level="item.level"
							:href="`#${item.id}`"
						>
							{{ item.title }}
						</a>
					</template>
				</aside>
			</div>
		</main>
	</div>

	<div v-if="mobileOutlineOpen && outline.length > 0" class="mobile-component-outline">
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
