<script setup lang="ts">
import { computed } from 'vue';
import VtdfLogo from '../VtdfLogo.vue';

const props = withDefaults(
	defineProps<{
		lang?: 'zh_CN' | 'en_US';
	}>(),
	{
		lang: 'zh_CN'
	}
);

const isZh = computed(() => props.lang === 'zh_CN');

// Vue 优势数据
const vueAdvantages = computed(() => [
	{
		value: isZh.value ? '组合式' : 'Compose',
		desc: isZh.value ? '组合式 API 组织逻辑，适合复杂组件状态' : 'Composition API keeps complex component logic organized'
	},
	{
		value: isZh.value ? '响应式' : 'Reactive',
		desc: isZh.value ? '细粒度响应系统，状态更新直观可控' : 'Fine-grained reactivity with predictable state updates'
	},
	{ value: 'SFC', desc: isZh.value ? '单文件组件体验，模板、脚本、样式清晰分区' : 'Single-file component authoring with clear separation' },
	{
		value: isZh.value ? '生态' : 'Ecosystem',
		desc: isZh.value ? '贴合 Vue 工程生态，易于业务渐进接入' : 'Fits Vue projects and supports incremental adoption'
	},
	{
		value: isZh.value ? '工具链' : 'Tooling',
		desc: isZh.value ? 'Vite、TypeScript 与模板类型检查完整协作' : 'Vite, TypeScript, and template checks work together'
	}
]);

// Tailwind 优势
const tailwindAdvantages = computed(() => [
	{
		value: isZh.value ? '原子化' : 'Utility first',
		desc: isZh.value ? '实用优先的设计理念，样式即文档' : 'Composable utilities keep styling explicit'
	},
	{
		value: isZh.value ? '零运行时' : 'Zero runtime',
		desc: isZh.value ? '构建时生成，无运行时性能损耗' : 'Styles are generated at build time with no runtime cost'
	},
	{
		value: isZh.value ? '响应式' : 'Responsive',
		desc: isZh.value ? '内置响应式断点，轻松适配各种屏幕' : 'Built-in breakpoints for all screen sizes'
	},
	{ value: isZh.value ? '可定制' : 'Customizable', desc: isZh.value ? '完整的主题配置系统' : 'A complete, configurable theming system' },
	{
		value: isZh.value ? '按需生成' : 'On demand',
		desc: isZh.value ? '即时编译，只生成使用到的样式' : 'Only the styles used by the project are generated'
	}
]);

// VTDF 独特优势
const vtdfAdvantages = computed(() => [
	{
		value: isZh.value ? '零依赖' : 'Zero deps',
		desc: isZh.value ? '杜绝依赖黑洞，减少安全风险' : 'A smaller dependency surface and fewer supply-chain risks'
	},
	{ value: '100% TS', desc: isZh.value ? '完整的类型定义，提升开发体验' : 'Complete type definitions for a better developer experience' },
	{
		value: isZh.value ? '简洁' : 'Maintainable',
		desc: isZh.value ? '代码简洁，注释齐全，易于二次修改' : 'Clear source code and documentation make customization easier'
	},
	{
		value: isZh.value ? '工具链' : 'Tooling',
		desc: isZh.value ? 'SVG 插件、VS Code 扩展、CLI 等' : 'SVG plugins, a VS Code extension, and CLI tools'
	},
	{
		value: isZh.value ? '主题系统' : 'Theme system',
		desc: isZh.value ? '无限主题配置，暗黑模式原生支持' : 'Flexible themes with native dark mode support'
	}
]);
</script>

<template>
	<section class="p-6 md:p-8">
		<div class="mx-auto max-w-6xl">
			<!-- 标题 -->
			<div class="text-center mb-12">
				<!-- 标签 -->
				<div
					class="mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark"
				>
					<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"
						/>
					</svg>
					<span>{{ isZh ? '技术栈' : 'Tech Stack' }}</span>
				</div>

				<h2 class="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
					{{ isZh ? '站在巨人肩膀上' : 'Standing on the shoulders of giants' }}
				</h2>
				<p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					{{ isZh ? '基于 Vue + Tailwind CSS，继承优秀基因' : 'Powered by Vue and Tailwind CSS' }}
				</p>
			</div>

			<!-- Vue 优势 -->
			<div class="mb-12">
				<div class="flex items-center gap-3 mb-6">
					<img class="size-6 object-contain" src="/frameworks/vue.svg" alt="" aria-hidden="true" />
					<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Vue</h3>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{{ isZh ? '渐进式 JavaScript 框架，生态成熟、上手平滑' : 'A progressive JavaScript framework with a mature ecosystem' }}
					</span>
				</div>
				<div class="grid grid-cols-1 border-l border-t border-(--site-divider) sm:grid-cols-2 md:grid-cols-5">
					<div v-for="item in vueAdvantages" :key="item.value" class="border-b border-r border-(--site-divider) bg-transparent p-4">
						<div class="mb-2 text-2xl font-bold text-(--brand-vue)">{{ item.value }}</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">{{ item.desc }}</div>
					</div>
				</div>
			</div>

			<!-- Tailwind 优势 -->
			<div class="mb-12">
				<div class="flex items-center gap-3 mb-6">
					<svg class="size-8 text-(--brand-tailwind)" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Tailwind CSS</h3>
					<span class="text-sm text-gray-500 dark:text-gray-400">
						{{ isZh ? '实用优先的 CSS 框架' : 'A utility-first CSS framework' }}
					</span>
				</div>
				<div class="grid grid-cols-1 border-l border-t border-(--site-divider) sm:grid-cols-2 md:grid-cols-5">
					<div v-for="item in tailwindAdvantages" :key="item.value" class="border-b border-r border-(--site-divider) bg-transparent p-4">
						<div class="mb-2 text-2xl font-bold text-(--brand-tailwind)">{{ item.value }}</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">{{ item.desc }}</div>
					</div>
				</div>
			</div>

			<!-- VTDF 独特优势 -->
			<div class="mb-12">
				<div class="flex items-center gap-3 mb-6">
					<VtdfLogo class="size-6" />
					<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
						{{ isZh ? 'VTDF 独特优势' : 'What sets VTDF apart' }}
					</h3>
				</div>
				<div class="grid grid-cols-1 border-l border-t border-(--site-divider) sm:grid-cols-2 md:grid-cols-5">
					<div v-for="item in vtdfAdvantages" :key="item.value" class="border-b border-r border-(--site-divider) bg-transparent p-4">
						<div class="text-2xl font-bold text-primary dark:text-dark mb-2">{{ item.value }}</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">{{ item.desc }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
