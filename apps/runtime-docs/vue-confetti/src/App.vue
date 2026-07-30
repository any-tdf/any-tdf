<script setup lang="ts">
import { computed, onMounted, ref, watch, type Component } from 'vue';
import {
	Braces,
	Code,
	ExternalLink,
	GitFork,
	Languages,
	Monitor,
	Moon,
	MousePointerClick,
	Package,
	Palette,
	Sparkles,
	Sun,
	TableProperties,
	Zap
} from 'lucide-vue-next';
import { Confetti } from '@any-tdf/vue-confetti';
import ConfettiOnClick from './components/ConfettiOnClick.vue';
import DemoButton from './components/DemoButton.vue';
import ExampleConfetti from './components/ExampleConfetti.vue';
import ExampleRow from './components/ExampleRow.vue';
import { colors, packageCommands, snippets, t, topDemoKinds, type Copy, type Locale, type SectionId, type Theme } from './data';

const sectionIcons: Record<SectionId, Component> = {
	spread: Sparkles,
	amount: Braces,
	shape: Palette,
	size: Code,
	timing: Zap,
	color: Palette,
	gravity: MousePointerClick,
	multiple: Sparkles,
	styling: Code
};

const getInitialLocale = (): Locale => {
	const params = new URLSearchParams(window.location.search);
	return params.get('lang') === 'en_US' ? 'en_US' : 'zh_CN';
};

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark' || value === 'auto';

const getInitialTheme = (): Theme => {
	const savedTheme = window.localStorage.getItem('vue-confetti-theme');
	return isTheme(savedTheme) ? savedTheme : 'auto';
};

const locale = ref<Locale>(getInitialLocale());
const theme = ref<Theme>(getInitialTheme());
const manager = ref<keyof typeof packageCommands>('bun');
const copy = computed<Copy>(() => t[locale.value]);
const sectionEntries = computed(() => Object.entries(copy.value.sections) as [SectionId, Copy['sections'][SectionId]][]);
const packageCommandKeys = Object.keys(packageCommands) as Array<keyof typeof packageCommands>;

const setLocale = (nextLocale: Locale) => {
	locale.value = nextLocale;
};

const setTheme = (nextTheme: Theme) => {
	theme.value = nextTheme;
};

const syncDocument = () => {
	document.documentElement.lang = locale.value === 'zh_CN' ? 'zh-CN' : 'en';
	const url = new URL(window.location.href);
	url.searchParams.set('lang', locale.value);
	window.history.replaceState(null, '', url);
};

const syncTheme = () => {
	document.documentElement.dataset.theme = theme.value;
	document.documentElement.style.colorScheme = theme.value === 'auto' ? 'light dark' : theme.value;
	window.localStorage.setItem('vue-confetti-theme', theme.value);
};

onMounted(() => {
	syncDocument();
	syncTheme();
});

watch(locale, syncDocument);
watch(theme, syncTheme);
</script>

<template>
	<div class="wrapper">
		<div class="header">
			<div class="title-stage">
				<span class="title-confetti">
					<Confetti infinite :amount="10" :x="[-0.5, -0.25]" :y="[0.25, 0.5]" :delay="[500, 2000]" :color-array="colors.primary" />
				</span>
				<h1>
					<mark>{{ copy.titlePrefix }}</mark
					>&nbsp;Confetti
				</h1>
			</div>
			<p>{{ copy.intro }}</p>
			<div class="links">
				<a href="https://github.com/any-tdf/any-tdf/tree/main/packages/vue-confetti">
					<GitFork aria-hidden="true" :size="15" />
					{{ copy.links.source }}
				</a>
				<a href="https://www.npmjs.com/package/@any-tdf/vue-confetti">
					<Package aria-hidden="true" :size="15" />
					{{ copy.links.package }}
				</a>
				<a href="https://mitcheljager.github.io/svelte-confetti/">
					<ExternalLink aria-hidden="true" :size="15" />
					{{ copy.links.basedOn }}
				</a>
			</div>
			<div class="controls">
				<div class="language-switch" :aria-label="copy.language">
					<Languages aria-hidden="true" :size="15" />
					<button type="button" :class="{ active: locale === 'zh_CN' }" @click="setLocale('zh_CN')">zh_CN</button>
					<button type="button" :class="{ active: locale === 'en_US' }" @click="setLocale('en_US')">en_US</button>
				</div>
				<div class="theme-switch" :aria-label="copy.theme.label">
					<button type="button" :class="{ active: theme === 'light' }" @click="setTheme('light')">
						<Sun aria-hidden="true" :size="15" />
						<span>{{ copy.theme.light }}</span>
					</button>
					<button type="button" :class="{ active: theme === 'dark' }" @click="setTheme('dark')">
						<Moon aria-hidden="true" :size="15" />
						<span>{{ copy.theme.dark }}</span>
					</button>
					<button type="button" :class="{ active: theme === 'auto' }" @click="setTheme('auto')">
						<Monitor aria-hidden="true" :size="15" />
						<span>{{ copy.theme.auto }}</span>
					</button>
				</div>
			</div>
		</div>

		<div class="block demo-block">
			<div class="section-heading">
				<span class="icon-chip"><MousePointerClick aria-hidden="true" :size="20" /></span>
				<h2>{{ copy.demoTitle }}</h2>
			</div>
			<p>{{ copy.demoIntro }}</p>
			<div class="buttons">
				<DemoButton
					v-for="kind in topDemoKinds"
					:key="kind"
					:label="copy.buttons[kind]"
					:relative="kind !== 'fullscreen'"
					:toggle-once="kind === 'constant' || kind === 'fullscreen'"
				>
					<ExampleConfetti :kind="kind" />
				</DemoButton>
			</div>
			<ConfettiOnClick :label="copy.clickBox" />
		</div>

		<div class="block">
			<div class="section-heading">
				<span class="icon-chip"><Package aria-hidden="true" :size="20" /></span>
				<h2>{{ copy.installTitle }}</h2>
			</div>
			<p>{{ copy.installIntro }}</p>
			<div class="has-tabs">
				<div class="tabs" role="tablist" aria-label="Package manager">
					<button
						v-for="key in packageCommandKeys"
						:key="key"
						type="button"
						class="tab"
						:class="{ active: manager === key }"
						@click="manager = key"
					>
						{{ key }}
					</button>
				</div>
				<code class="well">{{ packageCommands[manager] }}</code>
			</div>
		</div>

		<div class="block">
			<div class="section-heading">
				<span class="icon-chip"><Code aria-hidden="true" :size="20" /></span>
				<h2>{{ copy.usageTitle }}</h2>
			</div>
			<p>{{ copy.usageIntro }}</p>
			<code class="well">{{ snippets.import }}</code>
			<code class="well">{{ snippets.default }}</code>
		</div>

		<div class="section-title">
			<div class="section-heading">
				<span class="icon-chip"><Sparkles aria-hidden="true" :size="20" /></span>
				<h2>{{ copy.exampleTitle }}</h2>
			</div>
		</div>

		<div v-for="[id, section] in sectionEntries" :key="id" class="block">
			<div class="small-heading">
				<span class="icon-chip small">
					<component :is="sectionIcons[id]" aria-hidden="true" :size="18" />
				</span>
				<h3>{{ section.title }}</h3>
			</div>
			<p>{{ section.description }}</p>
			<ExampleRow
				v-for="(example, index) in section.examples"
				:key="`${id}-${example.label}-${index}`"
				:label="example.label"
				:code="example.code"
				:kind="example.kind"
				:relative="example.relative ?? true"
				:toggle-once="example.toggleOnce"
			/>
		</div>

		<div class="block">
			<div class="section-heading">
				<span class="icon-chip"><TableProperties aria-hidden="true" :size="20" /></span>
				<h2>{{ copy.propertiesTitle }}</h2>
			</div>
			<p>{{ copy.propertiesIntro }}</p>
			<div class="table">
				<strong>{{ copy.tableHeaders.property }}</strong>
				<strong>{{ copy.tableHeaders.defaultValue }}</strong>
				<strong>{{ copy.tableHeaders.description }}</strong>
				<template v-for="prop in copy.props" :key="prop.name">
					<code>{{ prop.name }}</code>
					<code>{{ prop.defaultValue }}</code>
					<div>
						{{ prop.description }}
						<mark v-if="prop.name === 'className' || prop.name === 'style'">{{ copy.vueAdditions }}</mark>
					</div>
				</template>
			</div>
		</div>
		<footer class="footer-note">
			<a href="https://mitcheljager.github.io/svelte-confetti/">{{ copy.footer }}</a>
		</footer>
	</div>
</template>
