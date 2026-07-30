<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import ApiPlayground from '../components/home/ApiPlayground.vue';
import ApiRichness from '../components/home/ApiRichness.vue';
import ComponentsGrid from '../components/home/ComponentsGrid.vue';
import HeroComponentPreview from '../components/home/HeroComponentPreview.vue';
import MobileAdvantages from '../components/home/MobileAdvantages.vue';
import StatCounter from '../components/home/StatCounter.vue';
import TechStack from '../components/home/TechStack.vue';
import TerminalDemo from '../components/home/TerminalDemo.vue';
import ThemeSystem from '../components/home/ThemeSystem.vue';
import { bottomInfo, descList, thinkGithub, ugly } from '../data/homeData';
import { appState, navigateTo } from '../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');

const go = (url: string) => {
	navigateTo(url);
};

// 页脚站内链接走前端路由，外链保持默认行为
const goFooterLink = (event: MouseEvent, link: { link: string; _blank?: boolean }) => {
	if (link._blank) return;
	event.preventDefault();
	go(link.link);
};

onMounted(() => {
	document.title = isZh.value ? 'VTDF - Vue 移动 Web 组件库' : 'VTDF - Vue mobile Web component library';
	document
		.querySelector('meta[name="description"]')
		?.setAttribute(
			'content',
			isZh.value
				? 'VTDF 是基于 Vue 与 Tailwind CSS 的移动 Web 组件库。'
				: 'VTDF is a mobile Web component library based on Vue and Tailwind CSS.'
		);
});

onBeforeUnmount(() => {
	document.title = isZh.value ? 'VTDF - 移动 web 组件库' : 'VTDF - Mobile web component library';
});
</script>

<template>
	<div class="site-home">
		<div class="site-home-rail">
			<section class="site-hero">
				<div class="site-hero-copy">
					<div class="site-eyebrow">Vue · Tailwind CSS · Mobile</div>
					<h1 class="site-hero-title">VTDF</h1>
					<p class="site-hero-description">
						<template v-if="isZh">
							基于
							<a class="site-hero-tech-link" href="https://vuejs.org" target="_blank" rel="noreferrer">Vue</a> 与
							<a class="site-hero-tech-link" href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwind CSS</a>
							构建的移动 Web 组件系统，清晰、完整、轻量。
						</template>
						<template v-else>
							A clear, complete, lightweight mobile Web component system built with
							<a class="site-hero-tech-link" href="https://vuejs.org" target="_blank" rel="noreferrer">Vue</a> and
							<a class="site-hero-tech-link" href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwind CSS</a>.
						</template>
					</p>
					<div class="site-button-row">
						<a class="site-button site-button-primary" href="/guide" @click.prevent="go('/guide')"
							>{{ isZh ? '开始使用' : 'Get started' }} →</a
						>
						<a
							class="site-button site-button-transparent"
							href="/components?nav=button&tab=0"
							@click.prevent="go('/components?nav=button&tab=0')"
						>
							{{ isZh ? '浏览组件' : 'Explore components' }}
						</a>
						<a class="site-button site-button-transparent" href="https://demo.vtdf.dev" target="_blank">Demo ↗</a>
					</div>
				</div>

				<div class="site-hero-visual" :aria-label="isZh ? 'VTDF 组件预览' : 'VTDF component preview'">
					<HeroComponentPreview />
				</div>
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">01</div>
					<div>
						<div class="site-section-kicker">POSITIONING</div>
						<h2 class="site-section-title">
							{{ isZh ? '简单、轻量、可组合的移动组件底座' : 'A simple, tiny, composable mobile foundation' }}
						</h2>
						<p class="site-section-description">
							{{
								isZh
									? '保留 VTDF 现有能力，但用更明确的信息层级展示产品定位。界面强调结构、边界和内容密度，不依赖大面积阴影。'
									: 'The existing VTDF capabilities, presented with stronger hierarchy, structural boundaries, and less visual noise.'
							}}
						</p>
					</div>
				</div>
				<div class="site-feature-grid" v-reveal="{ selector: ':scope > *', stagger: 60 }">
					<article v-for="(item, index) in descList" :key="item.title" class="site-feature-card">
						<div class="flex items-baseline gap-2 font-mono">
							<span class="text-xs text-(--site-text-muted)">0{{ index + 1 }} /</span>
							<strong class="text-sm font-bold tracking-widest text-(--site-accent)">{{ item.title.toUpperCase() }}</strong>
						</div>
						<h3>{{ isZh ? item.titleZh : item.title }}</h3>
						<p>{{ isZh ? item.desc : item.descEn }}</p>
					</article>
				</div>
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">02</div>
					<div>
						<div class="site-section-kicker">QUICK START</div>
						<h2 class="site-section-title">{{ isZh ? '一个命令，建立可运行的组件工程' : 'One command to a working component project' }}</h2>
						<p class="site-section-description">
							{{
								isZh
									? '从脚手架到构建工具，保持路径清晰并提供可直接复制的命令。'
									: 'A direct path from scaffolding to build tools, with copy-ready commands.'
							}}
						</p>
					</div>
				</div>
				<TerminalDemo :lang="isZh ? 'zh_CN' : 'en_US'" />
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">03</div>
					<div>
						<div class="site-section-kicker">THEME SYSTEM</div>
						<h2 class="site-section-title">
							{{ isZh ? '亮暗模式与 42 套主题使用同一组语义' : 'Light, dark, and 42 themes with shared semantics' }}
						</h2>
						<p class="site-section-description">
							{{
								isZh
									? '站点保持克制的中性背景，当前主题只负责链接、按钮、焦点和局部光效；组件演示继续展示完整主题能力。'
									: 'The site keeps neutral surfaces while the selected theme drives links, actions, focus states, and component previews.'
							}}
						</p>
					</div>
				</div>
				<div class="site-panel overflow-hidden"><ThemeSystem /></div>
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">04</div>
					<div>
						<div class="site-section-kicker">COMPONENT SYSTEM</div>
						<h2 class="site-section-title">
							{{ isZh ? '从 API 到移动交互的完整组件体验' : 'A complete component experience from API to mobile interaction' }}
						</h2>
						<p class="site-section-description">
							{{
								isZh
									? '保留可交互演示、能力统计和组件索引，并将每个模块放入统一的技术面板。'
									: 'Interactive demos, capability metrics, and the component index inside one coherent technical system.'
							}}
						</p>
					</div>
				</div>
				<div class="mb-6 site-panel overflow-hidden"><StatCounter /></div>
				<div class="site-split site-component-system-split">
					<div class="site-panel overflow-hidden"><ApiPlayground /></div>
					<div class="site-panel overflow-hidden"><ApiRichness :lang="isZh ? 'zh_CN' : 'en_US'" /></div>
				</div>
				<div class="mt-6 site-panel overflow-hidden"><MobileAdvantages :lang="isZh ? 'zh_CN' : 'en_US'" /></div>
				<div class="mt-6 site-panel overflow-hidden"><TechStack :lang="isZh ? 'zh_CN' : 'en_US'" /></div>
				<div class="mt-6 site-panel overflow-hidden"><ComponentsGrid /></div>
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">05</div>
					<div>
						<div class="site-section-kicker">BEFORE YOU START</div>
						<h2 class="site-section-title">{{ isZh ? '使用前须知' : 'Things to know before you start' }}</h2>
						<p class="site-section-description">
							{{
								isZh
									? '明确项目边界与依赖，让采用和维护都更可预期。'
									: 'Clear boundaries and dependencies make adoption and maintenance predictable.'
							}}
						</p>
					</div>
				</div>
				<div class="site-feature-grid site-notice-grid" v-reveal="{ selector: ':scope > *', stagger: 60 }">
					<article v-for="(item, index) in ugly.data" :key="item.p" class="site-feature-card site-notice-card">
						<div class="font-mono text-xs text-(--site-accent)">NOTICE / 0{{ index + 1 }}</div>
						<p>{{ isZh ? item.p : item.p_en }}</p>
					</article>
				</div>
			</section>

			<section class="site-section">
				<div class="site-section-heading" v-reveal>
					<div class="site-section-index">06</div>
					<div>
						<div class="site-section-kicker">COMMUNITY</div>
						<h2 class="site-section-title">{{ isZh ? '由社区持续建设' : 'Built continuously by the community' }}</h2>
						<p class="site-section-description">
							{{
								isZh
									? '感谢所有贡献者和赞助者，让 VTDF 保持开放并持续迭代。'
									: 'Thanks to every contributor and sponsor keeping VTDF open and evolving.'
							}}
						</p>
					</div>
				</div>
				<div class="site-split" v-reveal="{ selector: ':scope > *', stagger: 90 }">
					<div class="site-panel p-6">
						<div class="mb-4 font-mono text-xs text-(--site-text-muted)">CONTRIBUTORS</div>
						<a href="https://github.com/any-tdf/any-tdf/graphs/contributors" target="_blank">
							<img src="https://contrib.nn.ci/api?repo=any-tdf/any-tdf&cols=7" :alt="isZh ? 'VTDF 贡献者' : 'VTDF contributors'" />
						</a>
					</div>
					<div class="site-panel p-6">
						<div class="mb-4 font-mono text-xs text-(--site-text-muted)">SPONSORS / GITHUB</div>
						<div class="flex flex-wrap gap-3">
							<a v-for="item in thinkGithub" :key="item.name" :href="`https://github.com/${item.name}`" target="_blank" :title="item.name">
								<img
									class="size-12 rounded-full border border-(--site-divider)"
									:src="`https://avatars.githubusercontent.com/${item.name}`"
									:alt="item.name"
								/>
							</a>
						</div>
					</div>
				</div>
			</section>

			<footer class="site-footer">
				<div class="site-footer-grid">
					<div>
						<div class="site-brand mb-4"><span class="site-brand-name">VTDF</span></div>
						<p class="max-w-sm text-sm leading-7 text-(--site-text-soft)">
							{{
								isZh
									? '为 Vue 项目提供可靠、轻量、可主题化的移动 Web 组件。'
									: 'Reliable, lightweight, themeable mobile Web components for Vue.'
							}}
						</p>
						<a class="site-button site-button-transparent mt-4" href="/guide" @click.prevent="go('/guide')"
							>{{ isZh ? '阅读快速开始' : 'Read quick start' }} →</a
						>
					</div>
					<div v-for="group in bottomInfo" :key="group.title">
						<h3 class="mb-3 text-sm font-bold">{{ isZh ? group.title : group.title_en }}</h3>
						<div class="flex flex-col gap-2 text-sm">
							<a
								v-for="link in group.list"
								:key="link.title"
								:href="link.link"
								:target="link._blank ? '_blank' : '_self'"
								@click="goFooterLink($event, link)"
							>
								{{ isZh ? link.title : link.title_en }}
							</a>
						</div>
					</div>
				</div>
				<div
					class="mt-12 flex flex-wrap justify-between gap-3 border-t border-(--site-divider) pt-5 font-mono text-xs text-(--site-text-muted)"
				>
					<span>VTDF DESIGN · MADE BY DUFU</span>
					<span>Vue / Tailwind CSS / MIT</span>
				</div>
			</footer>
		</div>
	</div>
</template>
