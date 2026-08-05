<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { createSiteLanguageUrl, getSiteNavigationState, siteHeaderIconPaths, sitePaths } from '@any-tdf/site-common/site';
import ModeSwitch from './ModeSwitch.vue';
import ThemeSwitch from './ThemeSwitch.vue';
import VtdfLogo from './VtdfLogo.vue';
import { appState, navigateTo } from '../store/appStore';

defineProps<{
	showLeftNav?: boolean;
}>();

const mobileOpen = ref(false);
const mobileThemeOpen = ref(false);
const themePanel = ref<HTMLDivElement | null>(null);
const isZh = computed(() => appState.lang === 'zh_CN');
const currentRoute = computed(() => appState.pathname);
const navigationState = computed(() => getSiteNavigationState(currentRoute.value));
const isGuide = computed(() => navigationState.value.isGuide);
const isComponents = computed(() => navigationState.value.isComponents);
const isGenerator = computed(() => navigationState.value.isGenerator);

const go = (url: string) => {
	mobileOpen.value = false;
	navigateTo(url);
};

const switchLang = () => {
	window.location.href = createSiteLanguageUrl(window.location.href, isZh.value ? 'zh_CN' : 'en_US');
};

const toggleTheme = (event: MouseEvent) => {
	event.stopPropagation();
	appState.showThemeSwitch = !appState.showThemeSwitch;
};

const handleDocumentClick = (event: MouseEvent) => {
	if (!themePanel.value?.contains(event.target as Node)) appState.showThemeSwitch = false;
};

const handleDocumentKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Escape') appState.showThemeSwitch = false;
};

onMounted(() => {
	document.addEventListener('click', handleDocumentClick);
	document.addEventListener('keydown', handleDocumentKeydown);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleDocumentClick);
	document.removeEventListener('keydown', handleDocumentKeydown);
});
</script>

<template>
	<header class="site-header" :data-has-sidebar="showLeftNav || undefined">
		<div class="site-header-inner">
			<a href="/" class="site-brand" :aria-label="isZh ? 'VTDF 首页' : 'VTDF home'" @click.prevent="go('/')">
				<span class="site-brand-mark tdf-logo-animated" data-logo-animated>
					<VtdfLogo class="size-full" />
				</span>
			</a>

			<nav class="site-header-nav" :aria-label="isZh ? '主导航' : 'Main navigation'">
				<button class="site-search-trigger" type="button" :aria-label="isZh ? '搜索文档' : 'Search docs'" @click="appState.isCmdK = true">
					<span>{{ isZh ? '搜索文档' : 'Search docs' }}</span>
					<span class="site-search-key" aria-hidden="true">⌘ K</span>
				</button>
				<a
					class="site-header-link"
					:class="{ 'is-active': isGuide }"
					:aria-current="isGuide ? 'page' : undefined"
					href="/guide"
					@click.prevent="go('/guide')"
				>
					{{ isZh ? '指南' : 'Guide' }}
				</a>
				<a
					class="site-header-link"
					:class="{ 'is-active': isComponents }"
					:aria-current="isComponents ? 'page' : undefined"
					:href="sitePaths.components"
					@click.prevent="go(sitePaths.components)"
				>
					{{ isZh ? '组件' : 'Components' }}
				</a>
				<div class="relative" ref="themePanel">
					<button
						class="site-header-action"
						type="button"
						:aria-expanded="appState.showThemeSwitch"
						:aria-current="isGenerator ? 'page' : undefined"
						@click="toggleTheme"
					>
						{{ isZh ? '主题' : 'Theme' }}
					</button>
					<div v-if="appState.showThemeSwitch" class="site-popover site-theme-popover">
						<div class="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
							<div>
								<div class="text-sm font-bold">{{ isZh ? '界面主题' : 'Interface theme' }}</div>
								<div class="text-xs text-(--site-text-muted)">{{ isZh ? '模式与内置颜色' : 'Mode and built-in colors' }}</div>
							</div>
							<ModeSwitch />
						</div>
						<ThemeSwitch vertical />
						<a
							:href="sitePaths.generator"
							class="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
							@click.prevent="go(sitePaths.generator)"
						>
							<span class="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
								<svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
									/>
								</svg>
							</span>
							<span class="min-w-0 flex-1">
								<span class="block text-sm font-medium">{{ isZh ? '创建新主题' : 'Create theme' }}</span>
								<span class="block text-xs text-(--site-text-muted)">{{ isZh ? '打开主题生成器' : 'Open theme generator' }}</span>
							</span>
							<span class="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
						</a>
					</div>
				</div>
				<button class="site-header-action" type="button" @click="appState.isShowFund = true">
					{{ isZh ? '支持' : 'Support' }}
				</button>
				<button
					class="site-header-action site-header-icon-action site-language-action"
					type="button"
					:aria-label="isZh ? '切换到英文' : 'Switch to Chinese'"
					:title="isZh ? '切换到英文' : 'Switch to Chinese'"
					@click="switchLang"
				>
					<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path :d="siteHeaderIconPaths.language" />
					</svg>
				</button>
				<a
					class="site-header-action site-header-icon-action"
					href="https://github.com/any-tdf/any-tdf"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
					title="GitHub"
				>
					<svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path :d="siteHeaderIconPaths.github" />
					</svg>
				</a>
			</nav>

			<button
				class="site-mobile-menu-button"
				type="button"
				:aria-label="isZh ? '打开导航菜单' : 'Open navigation menu'"
				:aria-expanded="mobileOpen"
				@click="
					mobileOpen = !mobileOpen;
					mobileThemeOpen = false;
				"
			>
				<span aria-hidden="true">{{ mobileOpen ? '×' : '☰' }}</span>
			</button>

			<div v-if="mobileOpen" class="site-popover right-4 top-16 lg:hidden">
				<template v-if="mobileThemeOpen">
					<!-- 主题二级面板 -->
					<div class="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
						<button class="site-header-action" type="button" @click="mobileThemeOpen = false">
							{{ isZh ? '← 返回' : '← Back' }}
						</button>
						<div class="text-sm font-bold">{{ isZh ? '界面主题' : 'Interface theme' }}</div>
						<ModeSwitch />
					</div>
					<ThemeSwitch vertical />
					<a
						:href="sitePaths.generator"
						class="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
						@click.prevent="go(sitePaths.generator)"
					>
						<span class="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
							<svg class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path
									d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
								/>
							</svg>
						</span>
						<span class="min-w-0 flex-1">
							<span class="block text-sm font-medium">{{ isZh ? '创建新主题' : 'Create theme' }}</span>
							<span class="block text-xs text-(--site-text-muted)">{{ isZh ? '打开主题生成器' : 'Open theme generator' }}</span>
						</span>
						<span class="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
					</a>
				</template>
				<template v-else>
					<div class="site-mobile-menu-nav mb-3">
						<a class="site-header-link" href="/guide" @click.prevent="go('/guide')">{{ isZh ? '指南' : 'Guide' }}</a>
						<a class="site-header-link" :href="sitePaths.components" @click.prevent="go(sitePaths.components)">
							{{ isZh ? '组件' : 'Components' }}
						</a>
						<button class="site-header-action" type="button" @click="mobileThemeOpen = true">{{ isZh ? '主题' : 'Theme' }} ›</button>
						<a class="site-header-link" :href="sitePaths.generator" @click.prevent="go(sitePaths.generator)">
							{{ isZh ? '主题生成器' : 'Theme generator' }}
						</a>
						<button class="site-header-action" type="button" @click="appState.isCmdK = true">
							{{ isZh ? '搜索' : 'Search' }}
						</button>
						<button class="site-header-action" type="button" @click="appState.isShowFund = true">
							{{ isZh ? '支持' : 'Support' }}
						</button>
					</div>
					<div class="mt-3 flex justify-between border-t border-(--site-divider) pt-3">
						<button class="site-header-action" type="button" @click="switchLang">{{ isZh ? 'English' : '简体中文' }}</button>
						<a class="site-header-action" href="https://github.com/any-tdf/any-tdf" target="_blank">GitHub ↗</a>
					</div>
				</template>
			</div>
		</div>
	</header>
</template>
