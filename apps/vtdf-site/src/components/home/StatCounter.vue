<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { menuList } from '../../data/menuList';
import { appState } from '../../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');

// 动态计算组件数量
const componentCount = menuList.reduce((total, category) => total + category.childs.length, 0);

// 统计数据 - 基于实际组件库数据（使用 Remix Icon）
const stats = computed(() => [
	{
		value: componentCount,
		suffix: '',
		label: isZh.value ? '组件' : 'Components',
		desc: isZh.value ? '覆盖常见场景' : 'Cover common scenarios',
		// ri-apps-2-line
		icon: 'M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C6.11929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z'
	},
	{
		value: 42,
		suffix: '',
		label: isZh.value ? '内置主题' : 'Themes',
		desc: isZh.value ? '一键切换风格' : 'One-click style switch',
		// ri-contrast-drop-2-line
		icon: 'M12 3.09735L7.05025 8.04709C4.31658 10.7808 4.31658 15.2129 7.05025 17.9466C9.78392 20.6803 14.2161 20.6803 16.9497 17.9466C19.6834 15.2129 19.6834 10.7808 16.9497 8.0471L12 3.09735ZM12 0.268921L18.364 6.63288C21.8787 10.1476 21.8787 15.8461 18.364 19.3608C14.8492 22.8755 9.15076 22.8755 5.63604 19.3608C2.12132 15.8461 2.12132 10.1476 5.63604 6.63288L12 0.268921ZM7 12.9968H17C17 15.7583 14.7614 17.9968 12 17.9968C9.23858 17.9968 7 15.7583 7 12.9968Z'
	},
	{
		value: 66,
		suffix: '',
		label: isZh.value ? '语言包' : 'Languages',
		desc: isZh.value ? '覆盖全球主流语言' : 'Cover major languages',
		// ri-global-line
		icon: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z'
	},
	{
		value: 100,
		suffix: '%',
		label: 'TypeScript',
		desc: isZh.value ? '类型安全，智能提示' : 'Type safe, smart hints',
		// ri-braces-line
		icon: 'M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16 0a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5V18z'
	}
]);

// 性能优势（使用 Remix Icon）
const performanceAdvantages = computed(() => [
	{
		title: isZh.value ? '组合式开发' : 'Composition API',
		desc: isZh.value ? '基于 Vue 3 组合式 API，状态组织清晰' : 'Built with Vue 3 Composition API',
		// ri-braces-line
		icon: 'M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12 2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16 0a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5V18z'
	},
	{
		title: isZh.value ? '按需加载' : 'Tree Shaking',
		desc: isZh.value ? '只打包使用到的组件' : 'Only bundle what you use',
		// ri-leaf-line
		icon: 'M21 3v2a7 7 0 0 1-7 7h-1v1h1a7 7 0 0 1 7 7v2h-2v-2a5 5 0 0 0-5-5h-1v7H11v-7H10a5 5 0 0 0-5 5v2H3v-2a7 7 0 0 1 7-7h1v-1H10a7 7 0 0 1-7-7V3h2v2a5 5 0 0 0 5 5h1V3h2v7h1a5 5 0 0 0 5-5V3h2z'
	},
	{
		title: isZh.value ? '零依赖主题' : 'Token Driven',
		desc: isZh.value ? 'CSS 变量驱动主题，切换稳定' : 'Theme switching via CSS variables',
		// ri-pantone-line
		icon: 'M5.7646 7.99998L5.46944 7.26944C5.26255 6.75737 5.50995 6.17454 6.02202 5.96765L15.2939 2.22158C15.8059 2.01469 16.3888 2.26209 16.5956 2.77416L22.2147 16.6819C22.4216 17.194 22.1742 17.7768 21.6622 17.9837L12.3903 21.7298C11.8783 21.9367 11.2954 21.6893 11.0885 21.1772L11.0002 20.9586V21H7.00021C6.44792 21 6.00021 20.5523 6.00021 20V19.7303L2.65056 18.377C2.13849 18.1701 1.89109 17.5873 2.09798 17.0752L5.7646 7.99998ZM8.00021 19H10.2089L8.00021 13.5333V19ZM6.00021 12.7558L4.32696 16.8972L6.00021 17.6084V12.7558ZM7.69842 7.44741L12.5683 19.5008L19.9858 16.5039L15.1159 4.45055L7.69842 7.44741ZM10.6766 9.47974C10.1645 9.68663 9.5817 9.43924 9.37481 8.92717C9.16792 8.4151 9.41532 7.83227 9.92739 7.62538C10.4395 7.41849 11.0223 7.66588 11.2292 8.17795C11.4361 8.69002 11.1887 9.27286 10.6766 9.47974Z'
	},
	{
		title: isZh.value ? 'CSS 动画' : 'CSS Animation',
		desc: isZh.value ? '硬件加速，流畅丝滑' : 'GPU accelerated, smooth',
		// ri-speed-line
		icon: 'M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.833 3.337a.595.595 0 0 1 .763.067.59.59 0 0 1 .063.76c-2.18 3.046-3.38 4.678-3.598 4.897a1.502 1.502 0 0 1-2.122 0 1.502 1.502 0 0 1 0-2.122c.374-.373 2.005-1.574 4.894-3.602zM17.5 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-11 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2.318-3.596a1 1 0 1 1-1.416 1.414 1 1 0 0 1 1.416-1.414zM12 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'
	}
]);

// VTDF 特色（使用 Remix Icon）
const vtdfFeatures = computed(() => [
	{
		title: isZh.value ? '开源免费' : 'Open Source',
		desc: isZh.value ? 'MIT 许可，商用无忧' : 'MIT license, commercial friendly',
		// ri-git-repository-line
		icon: 'M13 21V23.5L10 21.5L7 23.5V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H13ZM13 19H19V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H7V17H13V19ZM19 14V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H19ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM7 11H9V13H7V11Z'
	},
	{
		title: isZh.value ? '持续迭代' : 'Active Dev',
		desc: isZh.value ? '持续更新，及时响应' : 'Regular updates, quick response',
		// ri-refresh-line
		icon: 'M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 0 0-11.95-6.95l-2.587-1.617zM18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 11.95 6.95l2.587 1.617z'
	},
	{
		title: isZh.value ? '懒加载' : 'Lazy Load',
		desc: isZh.value ? '懒加载与懒动画，提升性能' : 'Lazy load & animation for performance',
		// ri-timer-line
		icon: 'M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z'
	},
	{
		title: isZh.value ? '文档齐全' : 'Full Docs',
		desc: isZh.value ? '详尽文档，丰富示例' : 'Complete docs & examples',
		// ri-file-list-3-line
		icon: 'M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z'
	}
]);

const advantageItems = computed(() => [...performanceAdvantages.value, ...vtdfFeatures.value]);

// 数字动画
const counts = ref<number[]>(stats.value.map(() => 0));
const isVisible = ref(false);
let animationFrameId: number | null = null;
let observer: IntersectionObserver | null = null;

const animateNumbers = () => {
	const duration = 2000;
	const start = performance.now();

	const animate = (now: number) => {
		const progress = Math.min((now - start) / duration, 1);
		const easeOut = 1 - Math.pow(1 - progress, 3);

		counts.value = stats.value.map((stat) => Math.floor(easeOut * stat.value));

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(animate);
		} else {
			animationFrameId = null;
		}
	};

	animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting && !isVisible.value) {
				isVisible.value = true;
				animateNumbers();
			}
		},
		{ threshold: 0.3 }
	);

	const section = document.getElementById('stat-counter');
	if (section) observer.observe(section);
});

onBeforeUnmount(() => {
	observer?.disconnect();
	if (animationFrameId !== null) {
		cancelAnimationFrame(animationFrameId);
	}
});
</script>

<template>
	<section id="stat-counter" class="stat-counter">
		<div class="stat-grid">
			<div v-for="(stat, i) in stats" :key="i" class="stat-card">
				<svg class="stat-card-icon" viewBox="0 0 24 24" fill="currentColor"><path :d="stat.icon" /></svg>
				<div class="relative z-10">
					<div class="stat-value">{{ counts[i] }}{{ stat.suffix }}</div>
					<div class="stat-label">{{ stat.label }}</div>
					<div class="stat-description">{{ stat.desc }}</div>
				</div>
			</div>
		</div>

		<div class="advantage-grid">
			<div v-for="item in advantageItems" :key="item.title" class="advantage-cell">
				<div class="advantage-icon">
					<svg class="size-5" viewBox="0 0 24 24" fill="currentColor"><path :d="item.icon" /></svg>
				</div>
				<div>
					<div class="mb-1 font-semibold">{{ item.title }}</div>
					<div class="text-xs opacity-60">{{ item.desc }}</div>
				</div>
			</div>
		</div>
	</section>
</template>
