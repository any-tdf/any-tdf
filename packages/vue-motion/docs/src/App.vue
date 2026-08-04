<script setup lang="ts">
import {
	Activity,
	Atom,
	BookOpen,
	ChartNoAxesCombined,
	Code2,
	Package,
	Rocket,
	Sparkles,
	TableProperties,
	type LucideIcon
} from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import InlineText from './components/InlineText.vue';
import {
	apiContent,
	defaultLocale,
	demoContent,
	homeContent,
	locales,
	navItems,
	pageKeys,
	quickStartContent,
	uiText,
	type Locale,
	type PageKey
} from './content';
import EasingVisualiser from './demos/EasingVisualiser.vue';

type Route = {
	locale: Locale;
	page: PageKey;
};
type ThemeMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = Exclude<ThemeMode, 'auto'>;

const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
const isPageKey = (value: string): value is PageKey => pageKeys.includes(value as PageKey);
const themeModes: ThemeMode[] = ['auto', 'light', 'dark'];
const themeStorageKey = 'vue-motion-theme';
const actionIcons: Partial<Record<PageKey, LucideIcon>> = {
	'quick-start': Rocket,
	'demo/easing': ChartNoAxesCombined
};
const featureIcons = [Sparkles, Code2, Activity] as const;
const exampleIcons = [Sparkles, Package, Activity] as const;

const isThemeMode = (value: string): value is ThemeMode => themeModes.includes(value as ThemeMode);
const parseRoute = (pathname: string): Route => {
	const parts = pathname.split('/').filter(Boolean);
	const locale = isLocale(parts[0]) ? parts[0] : defaultLocale;
	const pagePath = parts.slice(isLocale(parts[0]) ? 1 : 0).join('/') || 'home';
	return { locale, page: isPageKey(pagePath) ? pagePath : 'home' };
};
const hrefFor = (locale: Locale, page: PageKey) => `/${locale}${page === 'home' ? '' : `/${page}`}`;
const getSystemTheme = (): ResolvedTheme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const getInitialThemeMode = (): ThemeMode => {
	const stored = window.localStorage.getItem(themeStorageKey);
	return stored && isThemeMode(stored) ? stored : 'auto';
};

const route = ref<Route>(parseRoute(window.location.pathname));
const themeMode = ref<ThemeMode>(getInitialThemeMode());
const labels = computed(() => uiText[route.value.locale]);
const home = computed(() => homeContent[route.value.locale]);
const quickStart = computed(() => quickStartContent[route.value.locale]);
const api = computed(() => apiContent[route.value.locale]);
const demo = computed(() => demoContent[route.value.locale]);
const otherLocale = computed<Locale>(() => (route.value.locale === 'zh' ? 'en' : 'zh'));

const navigate = (locale: Locale, page: PageKey) => {
	const href = hrefFor(locale, page);
	window.history.pushState(null, '', href);
	route.value = { locale, page };
};

const syncRoute = () => {
	route.value = parseRoute(window.location.pathname);
};
const media = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = () => {
	const resolved = themeMode.value === 'auto' ? getSystemTheme() : themeMode.value;
	document.documentElement.dataset.theme = resolved;
	document.documentElement.dataset.themeMode = themeMode.value;
	document.documentElement.style.colorScheme = resolved;
	window.localStorage.setItem(themeStorageKey, themeMode.value);
};
const handleSystemThemeChange = () => {
	if (themeMode.value === 'auto') applyTheme();
};

watch(themeMode, applyTheme, { immediate: true });
watch(
	() => [route.value.locale, route.value.page] as const,
	() => {
		const currentHref = hrefFor(route.value.locale, route.value.page);
		if (window.location.pathname !== currentHref) window.history.replaceState(null, '', currentHref);
		document.documentElement.lang = route.value.locale === 'zh' ? 'zh-CN' : 'en';
		const pageLabel = navItems[route.value.locale].find((item) => item.key === route.value.page)?.label;
		document.title = `${labels.value.brand} - ${pageLabel ?? labels.value.brand}`;
	},
	{ immediate: true }
);

onMounted(() => {
	window.addEventListener('popstate', syncRoute);
	media.addEventListener('change', handleSystemThemeChange);
});
onBeforeUnmount(() => {
	window.removeEventListener('popstate', syncRoute);
	media.removeEventListener('change', handleSystemThemeChange);
});
</script>

<template>
	<div class="site-shell">
		<header class="site-header">
			<a class="brand" :href="hrefFor(route.locale, 'home')" @click.prevent="navigate(route.locale, 'home')">
				<span class="brand-mark" aria-hidden="true"><Atom :size="20" :stroke-width="2.2" /></span>
				<span class="brand-copy">
					<strong>{{ labels.brand }}</strong>
					<small>{{ labels.tagline }}</small>
				</span>
			</a>

			<nav class="main-nav" aria-label="Primary">
				<a
					v-for="item in navItems[route.locale]"
					:key="item.key"
					:class="{ active: item.key === route.page }"
					:href="hrefFor(route.locale, item.key)"
					@click.prevent="navigate(route.locale, item.key)"
				>
					{{ item.label }}
				</a>
			</nav>

			<div class="header-actions">
				<label class="theme-control">
					<span>{{ labels.theme }}</span>
					<select v-model="themeMode" :aria-label="labels.theme">
						<option v-for="mode in themeModes" :key="mode" :value="mode">{{ labels.themeOptions[mode] }}</option>
					</select>
				</label>
				<a class="language-link" :href="hrefFor(otherLocale, route.page)" @click.prevent="navigate(otherLocale, route.page)">
					{{ labels.language }}
				</a>
			</div>
		</header>

		<main v-if="route.page === 'home'" class="page-content">
			<section class="hero-section">
				<div class="hero-copy">
					<p class="eyebrow">@any-tdf/vue-motion</p>
					<h1>{{ home.title }}</h1>
					<p>{{ home.description }}</p>
					<div class="action-row">
						<a
							v-for="action in home.actions"
							:key="action.key"
							:href="hrefFor(route.locale, action.key)"
							@click.prevent="navigate(route.locale, action.key)"
						>
							<component
								:is="actionIcons[action.key]"
								v-if="actionIcons[action.key]"
								class="button-icon"
								:size="17"
								:stroke-width="2.2"
								aria-hidden="true"
							/>
							<span>{{ action.label }}</span>
						</a>
					</div>
				</div>
				<div class="curve-preview" aria-hidden="true">
					<svg viewBox="0 0 320 220">
						<path d="M22 180 C60 170 82 160 112 118 S180 20 226 78 275 176 298 42" />
						<circle cx="226" cy="78" r="8" />
					</svg>
				</div>
			</section>

			<section class="feature-grid" aria-label="Features">
				<article v-for="(feature, index) in home.features" :key="feature.title" class="feature-card">
					<span class="feature-icon" aria-hidden="true">
						<component :is="featureIcons[index] ?? Sparkles" :size="21" :stroke-width="2.1" />
					</span>
					<h2>{{ feature.title }}</h2>
					<p><InlineText :text="feature.text" /></p>
				</article>
			</section>
		</main>

		<main v-else-if="route.page === 'quick-start'" class="page-content narrow">
			<section class="doc-section">
				<div class="section-heading">
					<BookOpen class="section-icon" :size="28" :stroke-width="2.1" aria-hidden="true" />
					<h1>{{ quickStart.title }}</h1>
				</div>
				<p><InlineText :text="quickStart.intro" /></p>
			</section>

			<section class="doc-section">
				<h2 class="icon-heading">
					<Package class="heading-icon" :size="20" :stroke-width="2.1" aria-hidden="true" />
					<span>{{ labels.install }}</span>
				</h2>
				<pre><code>{{ quickStart.install }}</code></pre>
			</section>

			<section class="doc-section">
				<h2 class="icon-heading">
					<Code2 class="heading-icon" :size="20" :stroke-width="2.1" aria-hidden="true" />
					<span>{{ labels.imports }}</span>
				</h2>
				<div class="example-list">
					<article v-for="(example, index) in quickStart.examples" :key="example.title" class="example-block">
						<h3 class="example-title">
							<component :is="exampleIcons[index] ?? Code2" class="heading-icon" :size="18" :stroke-width="2.1" />
							<span>{{ example.title }}</span>
						</h3>
						<pre><code>{{ example.code }}</code></pre>
					</article>
				</div>
			</section>
		</main>

		<main v-else-if="route.page === 'api'" class="page-content narrow">
			<section class="doc-section">
				<div class="section-heading">
					<TableProperties class="section-icon" :size="28" :stroke-width="2.1" aria-hidden="true" />
					<h1>{{ api.title }}</h1>
				</div>
				<p><InlineText :text="api.intro" /></p>
			</section>

			<section class="doc-section">
				<div class="api-table-wrap">
					<table class="api-table">
						<thead>
							<tr>
								<th>Svelte</th>
								<th>Vue Motion</th>
								<th>Import</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in api.rows" :key="row[0]">
								<td>
									<code>{{ row[0] }}</code>
								</td>
								<td>{{ row[1] }}</td>
								<td>
									<code>{{ row[2] }}</code>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section class="doc-section">
				<ul class="note-list">
					<li v-for="note in api.notes" :key="note"><InlineText :text="note" /></li>
				</ul>
			</section>
		</main>

		<main v-else class="page-content demo-page">
			<section class="doc-section">
				<div class="section-heading compact-heading">
					<ChartNoAxesCombined class="section-icon" :size="24" :stroke-width="2.1" aria-hidden="true" />
					<h1>{{ demo.title }}</h1>
				</div>
				<p><InlineText :text="demo.intro" /></p>
			</section>
			<EasingVisualiser :locale="route.locale" />
		</main>
	</div>
</template>
