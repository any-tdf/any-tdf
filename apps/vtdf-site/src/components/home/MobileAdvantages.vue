<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		lang?: 'zh_CN' | 'en_US';
	}>(),
	{
		lang: 'zh_CN'
	}
);

const isZh = computed(() => props.lang === 'zh_CN');

// 移动端优化特性
const mobileFeatures = computed(() => [
	{
		icon: 'touch_app',
		title: isZh.value ? '触控优化' : 'Touch Optimized',
		desc: isZh.value ? '点击区域适中，手势反馈灵敏' : 'Proper tap areas, responsive feedback',
		details: isZh.value ? ['最小触控区域', '防误触设计', '点击反馈'] : ['Min touch target', 'Mis-tap prevention', 'Click feedback']
	},
	{
		icon: 'smartphone',
		title: isZh.value ? '响应式布局' : 'Responsive Layout',
		desc: isZh.value ? '自适应各种屏幕尺寸' : 'Adapt to all screen sizes',
		details: isZh.value ? ['安全区适配', '横竖屏兼容', 'REM/VW 单位'] : ['Safe area support', 'Portrait/Landscape', 'REM/VW units']
	},
	{
		icon: 'swipe',
		title: isZh.value ? '手势交互' : 'Gesture Support',
		desc: isZh.value ? '丰富手势操作，交互自然流畅' : 'Rich gestures, natural interactions',
		details: isZh.value ? ['滑动切换', '惯性滚动', '手势反馈'] : ['Swipe switch', 'Momentum scroll', 'Gesture feedback']
	},
	{
		icon: 'speed',
		title: isZh.value ? '性能至上' : 'Performance First',
		desc: isZh.value ? '懒加载、GPU 加速，流畅体验' : 'Lazy loading, GPU acceleration',
		details: isZh.value ? ['懒加载', '懒动画', 'CSS 硬件加速'] : ['Lazy loading', 'Lazy animation', 'CSS GPU acceleration']
	},
	{
		icon: 'lightweight',
		title: isZh.value ? '轻量体积' : 'Lightweight',
		desc: isZh.value ? '按需引入，不增加额外负担' : 'On-demand import, no extra burden',
		details: isZh.value ? ['按需加载', '零冗余依赖', '体积可控'] : ['On-demand loading', 'Zero redundant deps', 'Size controllable']
	},
	{
		icon: 'dark_mode',
		title: isZh.value ? '暗黑模式' : 'Dark Mode',
		desc: isZh.value ? '跟随系统或手动切换' : 'Auto-follow system or manual toggle',
		details: isZh.value ? ['系统跟随', 'OLED 友好', '过渡动画'] : ['System follow', 'OLED friendly', 'Transition effects']
	}
]);

// SVG 图标路径映射
const iconPaths: Record<string, string> = {
	touch_app:
		'M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.21 0-.59-.34-1.11-.84-1.35l-.07-.03z',
	smartphone:
		'M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
	swipe:
		'M15.1986 9.94447C14.7649 9.5337 14.4859 8.98613 14.4085 8.39384L14.0056 5.31138L11.275 6.79724C10.7503 7.08274 10.1433 7.17888 9.55608 7.06948L6.49998 6.50015L7.06931 9.55625C7.17871 10.1435 7.08257 10.7505 6.79707 11.2751L5.31121 14.0057L8.39367 14.4086C8.98596 14.4861 9.53353 14.7651 9.94431 15.1987L12.0821 17.4557L13.4178 14.6486C13.6745 14.1092 14.109 13.6747 14.6484 13.418L17.4555 12.0823L15.1986 9.94447ZM15.2238 15.5079L13.0111 20.1581C12.8687 20.4573 12.5107 20.5844 12.2115 20.442C12.1448 20.4103 12.0845 20.3665 12.0337 20.3129L8.49229 16.5741C8.39749 16.474 8.27113 16.4096 8.13445 16.3918L3.02816 15.7243C2.69958 15.6814 2.46804 15.3802 2.51099 15.0516C2.52056 14.9784 2.54359 14.9075 2.5789 14.8426L5.04031 10.3192C5.1062 10.1981 5.12839 10.058 5.10314 9.92253L4.16 4.85991C4.09931 4.53414 4.3142 4.22086 4.63997 4.16017C4.7126 4.14664 4.78711 4.14664 4.85974 4.16017L9.92237 5.10331C10.0579 5.12855 10.198 5.10637 10.319 5.04048L14.8424 2.57907C15.1335 2.42068 15.4979 2.52825 15.6562 2.81931C15.6916 2.88421 15.7146 2.95507 15.7241 3.02833L16.3916 8.13462C16.4095 8.2713 16.4739 8.39766 16.5739 8.49245L20.3127 12.0338C20.5533 12.2617 20.5636 12.6415 20.3357 12.8821C20.2849 12.9357 20.2246 12.9795 20.1579 13.0112L15.5078 15.224C15.3833 15.2832 15.283 15.3835 15.2238 15.5079ZM16.0206 17.435L17.4348 16.0208L21.6775 20.2634L20.2633 21.6776L16.0206 17.435Z',
	speed:
		'M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44zm-9.79 6.84a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z',
	lightweight: 'M12 3L4 9v12h16V9l-8-6zm0 2.5L18 10v9H6v-9l6-4.5zM12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
	dark_mode:
		'M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z'
};
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
							d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V3C19 2.44772 18.5523 2 18 2H6ZM7 4H17V18H7V4ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
						/>
					</svg>
					<span>{{ isZh ? '移动优先' : 'Mobile First' }}</span>
				</div>

				<h2 class="mb-4 text-3xl font-bold text-(--site-text) md:text-4xl">
					{{ isZh ? '触手可及，流畅自然' : 'Touch & Feel Natural' }}
				</h2>
				<p class="text-base opacity-70 max-w-2xl mx-auto">
					{{
						isZh
							? '触控优化、手势丰富、性能至上，专为移动端打造的流畅体验'
							: 'Touch optimized, gesture rich, performance first - smooth experience built for mobile'
					}}
				</p>
			</div>

			<!-- 特性网格 -->
			<div class="grid grid-cols-1 border-l border-t border-(--site-divider) md:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="feature in mobileFeatures"
					:key="feature.title"
					class="group border-b border-r border-(--site-divider) bg-transparent p-6 transition-colors hover:bg-primary/5 dark:hover:bg-dark/5"
				>
					<!-- 图标 -->
					<div class="bg-primary/10 dark:bg-dark/10 mb-4 flex size-14 items-center justify-center">
						<svg class="size-7 text-primary dark:text-dark" viewBox="0 0 24 24" fill="currentColor">
							<path :d="iconPaths[feature.icon]" />
						</svg>
					</div>

					<!-- 标题和描述 -->
					<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ feature.title }}</h3>
					<p class="opacity-60 mb-4 text-sm leading-relaxed">{{ feature.desc }}</p>

					<!-- 详情列表 -->
					<div class="flex flex-wrap gap-2">
						<span
							v-for="detail in feature.details"
							:key="detail"
							class="bg-primary/5 dark:bg-dark/10 text-primary dark:text-dark border border-primary/10 px-2 py-1 text-xs dark:border-dark/10"
						>
							{{ detail }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
