<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { builtInIconLibraryLabelMap } from '@any-tdf/common/svg';
import { Gem, Palette, SlidersHorizontal, SunMoon, WandSparkles, Zap } from '../../lib/icons';
import {
	Avatar,
	Badge,
	Button,
	Card,
	Cell,
	Checkbox,
	Icon,
	Input,
	Loading,
	NoticeBar,
	Progress,
	ProgressLoop,
	Radio,
	Rate,
	Slider,
	Stepper,
	Steps,
	Switch,
	Tab,
	Tag
} from 'vtdf/components';
import { generateColorScale, themes as vtdfThemes } from 'vtdf/theme';
import { themeLabels } from '../../data/homeData';
import { normalizeThemeName } from '../../utils/theme';
import { appState } from '../../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');
const themeFeatureTags = computed(() => [
	{ icon: Palette, text: isZh.value ? 'OKLCH 色彩空间' : 'OKLCH Color Space' },
	{ icon: Gem, text: isZh.value ? '42 套内置主题' : '42 Built-in Themes' },
	{ icon: SunMoon, text: isZh.value ? '亮暗双色配置' : 'Light & Dark Colors' },
	{ icon: SlidersHorizontal, text: isZh.value ? '丰富配置项' : 'Rich Configuration' },
	{ icon: Zap, text: isZh.value ? '实时主题切换' : 'Real-time Switch' },
	{ icon: WandSparkles, text: isZh.value ? '自定义主题生成' : 'Custom Theme Generator' }
]);

type ThemeItem = (typeof vtdfThemes)[number];

// 生成亮色层样式：所有 dark 变量都用 primary 的值，背景色和文字色使用主题配置的值
const generateLightLayerStyles = (theme: ThemeItem) => {
	if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
	const primaryScale = generateColorScale(theme['color-primary']);

	return `
		--color-primary-50: ${primaryScale[50]};
		--color-primary-100: ${primaryScale[100]};
		--color-primary-200: ${primaryScale[200]};
		--color-primary-300: ${primaryScale[300]};
		--color-primary-400: ${primaryScale[400]};
		--color-primary-500: ${primaryScale[500]};
		--color-primary: ${primaryScale[600]};
		--color-primary-700: ${primaryScale[700]};
		--color-primary-800: ${primaryScale[800]};
		--color-primary-900: ${primaryScale[900]};
		--color-primary-950: ${primaryScale[950]};
		--color-dark-50: ${primaryScale[50]};
		--color-dark-100: ${primaryScale[100]};
		--color-dark-200: ${primaryScale[200]};
		--color-dark-300: ${primaryScale[300]};
		--color-dark-400: ${primaryScale[400]};
		--color-dark-500: ${primaryScale[500]};
		--color-dark: ${primaryScale[600]};
		--color-dark-700: ${primaryScale[700]};
		--color-dark-800: ${primaryScale[800]};
		--color-dark-900: ${primaryScale[900]};
		--color-dark-950: ${primaryScale[950]};
		--color-bg-base: ${theme['color-bg-base']};
		--color-bg-surface: ${theme['color-bg-surface']};
		--color-bg-overlay: ${theme['color-bg-overlay']};
		--color-bg-highlight: ${theme['color-bg-highlight']};
		--color-bg-base-dark: ${theme['color-bg-base']};
		--color-bg-surface-dark: ${theme['color-bg-surface']};
		--color-bg-overlay-dark: ${theme['color-bg-overlay']};
		--color-bg-highlight-dark: ${theme['color-bg-highlight']};
		--color-text-primary: ${theme['color-text-primary']};
		--color-text-dark: ${theme['color-text-primary']};
		--color-text-on-primary: ${theme['color-text-on-primary']};
		--color-text-on-dark: ${theme['color-text-on-primary']};
		--color-success: ${theme['color-success']};
		--color-warning: ${theme['color-warning']};
		--color-error: ${theme['color-error']};
		--color-info: ${theme['color-info']};
		--radius-box: ${theme['radius-box']};
		--radius-form: ${theme['radius-form']};
		--radius-small: ${theme['radius-small']};
	`;
};

// 生成暗色层样式：所有 primary 变量都用 dark 的值，背景色和文字色使用主题配置的暗色值
const generateDarkLayerStyles = (theme: ThemeItem) => {
	if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
	const darkScale = generateColorScale(theme['color-dark']);

	return `
		--color-primary-50: ${darkScale[50]};
		--color-primary-100: ${darkScale[100]};
		--color-primary-200: ${darkScale[200]};
		--color-primary-300: ${darkScale[300]};
		--color-primary-400: ${darkScale[400]};
		--color-primary-500: ${darkScale[500]};
		--color-primary: ${darkScale[600]};
		--color-primary-700: ${darkScale[700]};
		--color-primary-800: ${darkScale[800]};
		--color-primary-900: ${darkScale[900]};
		--color-primary-950: ${darkScale[950]};
		--color-dark-50: ${darkScale[50]};
		--color-dark-100: ${darkScale[100]};
		--color-dark-200: ${darkScale[200]};
		--color-dark-300: ${darkScale[300]};
		--color-dark-400: ${darkScale[400]};
		--color-dark-500: ${darkScale[500]};
		--color-dark: ${darkScale[600]};
		--color-dark-700: ${darkScale[700]};
		--color-dark-800: ${darkScale[800]};
		--color-dark-900: ${darkScale[900]};
		--color-dark-950: ${darkScale[950]};
		--color-bg-base: ${theme['color-bg-base-dark']};
		--color-bg-surface: ${theme['color-bg-surface-dark']};
		--color-bg-overlay: ${theme['color-bg-overlay-dark']};
		--color-bg-highlight: ${theme['color-bg-highlight-dark']};
		--color-bg-base-dark: ${theme['color-bg-base-dark']};
		--color-bg-surface-dark: ${theme['color-bg-surface-dark']};
		--color-bg-overlay-dark: ${theme['color-bg-overlay-dark']};
		--color-bg-highlight-dark: ${theme['color-bg-highlight-dark']};
		--color-text-primary: ${theme['color-text-dark']};
		--color-text-dark: ${theme['color-text-dark']};
		--color-text-on-primary: ${theme['color-text-on-dark']};
		--color-text-on-dark: ${theme['color-text-on-dark']};
		--color-success: ${theme['color-success']};
		--color-warning: ${theme['color-warning']};
		--color-error: ${theme['color-error']};
		--color-info: ${theme['color-info']};
		--radius-box: ${theme['radius-box']};
		--radius-form: ${theme['radius-form']};
		--radius-small: ${theme['radius-small']};
	`;
};

// 圆角可选值
// boxRadius (容器类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem (无 full)
// formRadius (表单类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, calc(infinity * 1px)
// smallRadius (小型控件类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, calc(infinity * 1px)

// 从 VTDF 导入的内置主题，添加 label 用于显示
const themes = vtdfThemes.map((t) => ({
	...t,
	label: isZh.value ? themeLabels[t.name] || t.name : t.name
}));

const currentTheme = ref(normalizeThemeName(localStorage.getItem('theme_color')));
const previewEl = ref<HTMLDivElement | null>(null);
const sliderPos = ref(50);
const isDragging = ref(false);
// 分割方向：宽容器左右分割（x），窄容器上下分割（y）
const splitAxis = ref<'x' | 'y'>('x');

// Loading 随机类型 - 保留 2 个不重复的紧凑示例
const getRandomLoadingTypes = () => {
	const types = Array.from({ length: 54 }, (_, i) => `1_${i}`);
	const shuffled = types.sort(() => Math.random() - 0.5);
	return shuffled.slice(0, 2);
};
const randomLoadingTypes = getRandomLoadingTypes();
const checkboxData = computed(() => [{ name: 'sync', label: isZh.value ? '同步' : 'Sync' }]);
const radioData = computed(() => [{ name: 'auto', label: isZh.value ? '自动' : 'Auto' }]);
const themeSteps = computed(() => [
	{ step: { title: isZh.value ? '选择' : 'Select' } },
	{ step: { title: isZh.value ? '配置' : 'Configure' } },
	{ step: { title: isZh.value ? '完成' : 'Done' } }
]);
const noticeText = computed(() => [
	isZh.value
		? '欢迎使用 VTDF 组件库，简单、快速、高效的移动端组件库。支持 Vue 3，基于 Tailwind CSS 4，祝您使用愉快！'
		: 'Welcome to VTDF, a simple, fast, and efficient mobile component library. Supports Vue 3, built on Tailwind CSS 4, Enjoy your development!'
]);
const tabLabels = computed(() => [
	{ text: isZh.value ? '推荐' : 'For You' },
	{ text: isZh.value ? '关注' : 'Follow' },
	{ text: isZh.value ? '热门' : 'Hot' }
]);

// 演示数据
const switchActive = ref(true);
const cellSwitchActive = ref(false);
const sliderValue = ref(65);
const stepperValue = ref(3);
const inputValue = ref(isZh.value ? '主题预览' : 'Theme preview');
const checkedChoices = ref(['sync']);
const radioValue = ref('auto');
const themeTabActive = ref(0);

// 键盘导航相关
const sectionEl = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const selectTheme = (name: string) => {
	currentTheme.value = name;
};

// 键盘导航：切换到上一个/下一个主题
const navigateTheme = (direction: 'prev' | 'next') => {
	const currentIndex = themes.findIndex((t) => t.name === currentTheme.value);
	let newIndex: number;
	if (direction === 'prev') {
		newIndex = currentIndex <= 0 ? themes.length - 1 : currentIndex - 1;
	} else {
		newIndex = currentIndex >= themes.length - 1 ? 0 : currentIndex + 1;
	}
	currentTheme.value = themes[newIndex].name;
};

const handleKeydown = (e: KeyboardEvent) => {
	if (!isVisible.value) return;
	if (e.key === 'ArrowLeft') {
		e.preventDefault();
		navigateTheme('prev');
	} else if (e.key === 'ArrowRight') {
		e.preventDefault();
		navigateTheme('next');
	}
};

let observer: IntersectionObserver | null = null;
let splitObserver: ResizeObserver | null = null;

onMounted(() => {
	// 监听键盘事件
	window.addEventListener('keydown', handleKeydown);

	// 窗口尺寸变化时重新计算焦点指示器位置
	window.addEventListener('resize', updateThemeFocus);
	updateThemeFocus();

	// 监听区域可见性
	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				isVisible.value = entry.isIntersecting;
			});
		},
		{ threshold: 0.3 }
	);

	if (sectionEl.value) {
		observer.observe(sectionEl.value);
	}

	// 监听预览容器宽度，窄屏时切换为上下分割
	if (previewEl.value) {
		splitObserver = new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect.width;
			if (width != null) {
				splitAxis.value = width < 512 ? 'y' : 'x';
			}
		});
		splitAxis.value = previewEl.value.clientWidth < 512 ? 'y' : 'x';
		splitObserver.observe(previewEl.value);
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	window.removeEventListener('resize', updateThemeFocus);
	observer?.disconnect();
	splitObserver?.disconnect();
});

const currentThemeData = computed(() => themes.find((t) => t.name === currentTheme.value) || themes[0]);
const currentThemeIndex = computed(() => themes.findIndex((theme) => theme.name === currentTheme.value));

// 焦点指示器：从当前主题按钮的实际布局位置计算，适配响应式列数
const themeGridEl = ref<HTMLElement | null>(null);
const themeFocusX = ref('0px');
const themeFocusY = ref('0px');
const themeFocusWidth = ref('0px');
const themeFocusHeight = ref('0px');

const updateThemeFocus = () => {
	const option = themeGridEl.value?.querySelectorAll<HTMLElement>('.theme-option')[currentThemeIndex.value];
	if (!option) return;
	themeFocusX.value = `${option.offsetLeft}px`;
	themeFocusY.value = `${option.offsetTop}px`;
	themeFocusWidth.value = `${option.offsetWidth}px`;
	themeFocusHeight.value = `${option.offsetHeight}px`;
};

watch(currentThemeIndex, () => nextTick(updateThemeFocus));

// 派生当前主题的所有颜色（用于展示区域）
const currentThemeColors = computed(() => {
	if (!currentThemeData.value?.['color-primary'] || !currentThemeData.value?.['color-dark']) {
		return {
			primary: '',
			dark: '',
			success: '',
			warning: '',
			error: '',
			info: '',
			bgBase: '',
			bgSurface: '',
			bgOverlay: '',
			bgHighlight: '',
			bgBaseDark: '',
			bgSurfaceDark: '',
			bgOverlayDark: '',
			bgHighlightDark: '',
			textPrimary: '',
			textDark: '',
			textOnPrimary: '',
			textOnDark: '',
			radiusBox: '',
			radiusForm: '',
			radiusSmall: ''
		};
	}
	return {
		// 主题色
		primary: currentThemeData.value['color-primary'],
		dark: currentThemeData.value['color-dark'],
		// 功能色
		success: currentThemeData.value['color-success'],
		warning: currentThemeData.value['color-warning'],
		error: currentThemeData.value['color-error'],
		info: currentThemeData.value['color-info'],
		// 背景色（亮色）- 直接使用主题配置的值
		bgBase: currentThemeData.value['color-bg-base'],
		bgSurface: currentThemeData.value['color-bg-surface'],
		bgOverlay: currentThemeData.value['color-bg-overlay'],
		bgHighlight: currentThemeData.value['color-bg-highlight'],
		// 背景色（暗色）- 直接使用主题配置的值
		bgBaseDark: currentThemeData.value['color-bg-base-dark'],
		bgSurfaceDark: currentThemeData.value['color-bg-surface-dark'],
		bgOverlayDark: currentThemeData.value['color-bg-overlay-dark'],
		bgHighlightDark: currentThemeData.value['color-bg-highlight-dark'],
		// 文字色 - 直接使用主题配置的值
		textPrimary: currentThemeData.value['color-text-primary'],
		textDark: currentThemeData.value['color-text-dark'],
		textOnPrimary: currentThemeData.value['color-text-on-primary'],
		textOnDark: currentThemeData.value['color-text-on-dark'],
		// 圆角（直接从主题配置读取）
		radiusBox: currentThemeData.value['radius-box'],
		radiusForm: currentThemeData.value['radius-form'],
		radiusSmall: currentThemeData.value['radius-small']
	};
});
const getRadiusPreview = (value: string) => (value.includes('infinity') ? '9999px' : value);

// 生成亮色层和暗色层各自的样式（完全独立，不受全局主题影响）
const lightLayerStyles = computed(() => generateLightLayerStyles(currentThemeData.value));
const darkLayerStyles = computed(() => generateDarkLayerStyles(currentThemeData.value));

// 拖动控制
const startDrag = (e: PointerEvent) => {
	isDragging.value = true;
	(e.target as HTMLElement).setPointerCapture(e.pointerId);
};

const onDrag = (e: PointerEvent) => {
	if (!isDragging.value || !previewEl.value) return;
	const rect = previewEl.value.getBoundingClientRect();
	// 移动端窄屏时扩大拖动范围
	const percent =
		splitAxis.value === 'y'
			? Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 2), 98)
			: Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 2), 98);
	sliderPos.value = percent;
};

const endDrag = () => {
	isDragging.value = false;
};
</script>

<template>
	<section ref="sectionEl" class="relative overflow-hidden px-2 py-6 md:p-8">
		<div class="relative z-10 mx-auto">
			<div class="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-8">
				<!-- 主题选择器 -->
				<div class="flex w-full min-w-0 flex-1 flex-col gap-4">
					<div class="text-center lg:text-left">
						<div class="flex items-center justify-center gap-2 lg:justify-start">
							<span class="text-xl font-bold text-gray-800 dark:text-gray-200">
								{{ isZh ? '42 套内置主题' : '42 Built-in Themes' }}
							</span>
							<!-- 键盘提示图标 - 移动端隐藏 -->
							<div class="group relative hidden md:block">
								<svg
									class="size-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path
										d="M4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4ZM1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM6 13H8V15H6V13ZM10 13H14V15H10V13ZM16 13H18V15H16V13ZM5 9H7V11H5V9ZM9 9H11V11H9V9ZM13 9H15V11H13V9ZM17 9H19V11H17V9Z"
									/>
								</svg>
								<!-- Tooltip -->
								<div
									class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700"
								>
									{{ isZh ? '按 ← → 键切换主题' : 'Press ← → to switch themes' }}
									<div
										class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"
									></div>
								</div>
							</div>
						</div>
						<div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{{ isZh ? '点击选择，拖动对比亮暗效果' : 'Click to select, drag to compare light/dark' }}
						</div>
					</div>

					<!-- 主题网格 -->
					<div
						ref="themeGridEl"
						class="theme-option-grid relative grid grid-cols-3 border-l border-t border-(--site-divider) sm:grid-cols-4 md:grid-cols-6"
					>
						<div
							class="theme-option-focus"
							:style="{ '--theme-focus-x': themeFocusX, '--theme-focus-y': themeFocusY, width: themeFocusWidth, height: themeFocusHeight }"
							aria-hidden="true"
						>
							<span class="theme-option-corner theme-option-corner-top-left"></span>
							<span class="theme-option-corner theme-option-corner-top-right"></span>
							<span class="theme-option-corner theme-option-corner-bottom-left"></span>
							<span class="theme-option-corner theme-option-corner-bottom-right"></span>
						</div>
						<button
							v-for="theme in themes"
							:key="theme.name"
							:aria-pressed="currentTheme === theme.name"
							class="theme-option group relative flex flex-col items-center gap-1.5 border-b border-r border-(--site-divider) p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/50"
							type="button"
							@click="selectTheme(theme.name)"
							@focus="selectTheme(theme.name)"
						>
							<!-- 圆角矩形 - 左浅色背景+亮色，右深色背景+暗色 -->
							<div class="relative flex h-6 w-full overflow-hidden">
								<!-- 左侧：浅色背景 + 亮色圆点 -->
								<div class="flex w-1/2 items-center justify-center bg-gray-100">
									<div class="size-2.5 rounded-full" :style="{ background: theme['color-primary'] }"></div>
								</div>
								<!-- 右侧：深色背景 + 暗色圆点 -->
								<div class="flex w-1/2 items-center justify-center bg-gray-800">
									<div class="size-2.5 rounded-full" :style="{ background: theme['color-dark'] }"></div>
								</div>
							</div>

							<span class="text-xs leading-tight text-gray-600 dark:text-gray-400">{{ theme.label }}</span>
						</button>
					</div>

					<!-- 当前主题信息 -->
					<div class="theme-token-panel border border-gray-200/50 bg-transparent p-3 dark:border-gray-700/30">
						<!-- 主题色 -->
						<div class="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '主题色' : 'Theme' }}</div>
						<div class="mb-1.5 flex gap-1">
							<div class="h-6 flex-1" :style="{ background: currentThemeColors.primary }"></div>
							<div class="h-6 flex-1" :style="{ background: currentThemeColors.dark }"></div>
						</div>

						<!-- 背景色 -->
						<div class="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '背景色' : 'Background' }}</div>
						<div class="mb-1.5 flex gap-1">
							<div
								class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
								:style="{ background: currentThemeColors.bgBase }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
								:style="{ background: currentThemeColors.bgSurface }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
								:style="{ background: currentThemeColors.bgOverlay }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
								:style="{ background: currentThemeColors.bgHighlight }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
								:style="{ background: currentThemeColors.bgBaseDark }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
								:style="{ background: currentThemeColors.bgSurfaceDark }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
								:style="{ background: currentThemeColors.bgOverlayDark }"
							></div>
							<div
								class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
								:style="{ background: currentThemeColors.bgHighlightDark }"
							></div>
						</div>

						<!-- 文字色 -->
						<div class="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '文字色' : 'Text' }}</div>
						<div class="mb-1.5 flex gap-1">
							<div
								class="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
								:style="{ background: currentThemeColors.bgBase, color: currentThemeColors.textPrimary }"
							>
								Aa
							</div>
							<div
								class="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
								:style="{ background: currentThemeColors.primary, color: currentThemeColors.textOnPrimary }"
							>
								Aa
							</div>
							<div
								class="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
								:style="{ background: currentThemeColors.bgBaseDark, color: currentThemeColors.textDark }"
							>
								Aa
							</div>
							<div
								class="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
								:style="{ background: currentThemeColors.dark, color: currentThemeColors.textOnDark }"
							>
								Aa
							</div>
						</div>

						<!-- 功能色 -->
						<div class="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '功能色' : 'Functional' }}</div>
						<div class="mb-1.5 flex gap-1">
							<div class="h-5 flex-1 rounded shadow-sm" :style="{ background: currentThemeColors.success }"></div>
							<div class="h-5 flex-1 rounded shadow-sm" :style="{ background: currentThemeColors.warning }"></div>
							<div class="h-5 flex-1 rounded shadow-sm" :style="{ background: currentThemeColors.error }"></div>
							<div class="h-5 flex-1 rounded shadow-sm" :style="{ background: currentThemeColors.info }"></div>
						</div>

						<!-- 圆角 -->
						<div class="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '圆角' : 'Radius' }}</div>
						<div class="grid grid-cols-3 gap-1.5">
							<div class="theme-radius-option">
								<div class="theme-radius-canvas">
									<div
										class="theme-radius-shape"
										data-site-component-preview
										:style="{
											'--theme-radius-color': currentThemeColors.primary,
											borderRadius: getRadiusPreview(currentThemeColors.radiusBox)
										}"
									></div>
								</div>
								<div class="theme-radius-meta">
									<span>BOX</span><small>{{ currentThemeColors.radiusBox }}</small>
								</div>
							</div>
							<div class="theme-radius-option">
								<div class="theme-radius-canvas">
									<div
										class="theme-radius-shape"
										data-site-component-preview
										:style="{
											'--theme-radius-color': currentThemeColors.primary,
											borderRadius: getRadiusPreview(currentThemeColors.radiusForm)
										}"
									></div>
								</div>
								<div class="theme-radius-meta">
									<span>FORM</span><small>{{ currentThemeColors.radiusForm }}</small>
								</div>
							</div>
							<div class="theme-radius-option">
								<div class="theme-radius-canvas">
									<div
										class="theme-radius-shape"
										data-site-component-preview
										:style="{
											'--theme-radius-color': currentThemeColors.primary,
											borderRadius: getRadiusPreview(currentThemeColors.radiusSmall)
										}"
									></div>
								</div>
								<div class="theme-radius-meta">
									<span>SMALL</span><small>{{ currentThemeColors.radiusSmall }}</small>
								</div>
							</div>
						</div>

						<!-- 内置图标方案 -->
						<div class="mt-1.5 text-center text-xs text-gray-500 dark:text-gray-400">{{ isZh ? '内置图标' : 'Built-in icons' }}</div>
						<div
							data-theme-icon-library
							class="flex h-8 items-center justify-center border border-(--site-divider) font-mono text-xs tracking-wider text-(--site-text) uppercase"
						>
							{{ builtInIconLibraryLabelMap[currentThemeData['built-in-icon-library']!] }}
						</div>
					</div>

					<!-- 自定义主题链接 -->
					<a
						href="/generator"
						class="hover:border-primary hover:bg-primary/5 dark:hover:border-dark dark:hover:bg-dark/5 group flex items-center justify-center gap-3 border border-dashed border-gray-200 bg-gray-50/50 p-3 transition-colors dark:border-gray-700 dark:bg-gray-800/50"
					>
						<div class="bg-primary dark:bg-dark flex size-8 items-center justify-center text-white dark:text-black">
							<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
								/>
							</svg>
						</div>
						<div class="flex-1 text-left">
							<div class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ isZh ? '创建自定义主题' : 'Create Custom Theme' }}</div>
							<div class="text-xs text-gray-500">{{ isZh ? '使用主题生成器' : 'Use theme generator' }}</div>
						</div>
						<svg class="size-4 text-gray-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
							/>
						</svg>
					</a>
				</div>

				<!-- 预览区域 - 亮暗对比（使用独立的内联样式，不受全局主题影响） -->
				<div
					ref="previewEl"
					data-site-component-preview
					role="presentation"
					class="relative w-full max-w-130 overflow-hidden border border-gray-200/30 dark:border-white/10"
					@pointermove="onDrag"
					@pointerup="endDrag"
					@pointerleave="endDrag"
				>
					<!-- 亮色层 -->
					<div data-mode="light" :style="`${lightLayerStyles} background-color: var(--color-bg-base)`">
						<div class="flex justify-center p-3" style="color: var(--color-text-primary)">
							<div class="flex w-full max-w-100 flex-col gap-2">
								<!-- 头部 -->
								<div data-theme-preview-header class="flex items-center gap-3 py-1">
									<Avatar size="sm" image="/assets/images/home/avatar_1.jpg" />
									<div class="flex-1">
										<div class="text-sm font-semibold">Light Mode</div>
										<div class="text-xs opacity-60">{{ currentThemeData.label }}</div>
									</div>
									<Badge text="11">
										<div class="bg-primary size-7" style="border-radius: var(--radius-small)"></div>
									</Badge>
								</div>

								<!-- NoticeBar -->
								<NoticeBar :text-list="noticeText" :right-icon="null" />

								<!-- Loading 与选择控件 -->
								<div data-theme-selection-controls class="grid grid-cols-3 items-center gap-2 py-2">
									<div class="flex items-center justify-around">
										<Loading v-for="type in randomLoadingTypes" :key="type" :type="type" theme />
									</div>
									<div class="flex justify-center">
										<Checkbox layout="h" :data="checkboxData" v-model:checkeds="checkedChoices" />
									</div>
									<div class="flex justify-center">
										<Radio layout="h" :data="radioData" v-model:value="radioValue" />
									</div>
								</div>

								<!-- Tab -->
								<Tab :labels="tabLabels" v-model:active="themeTabActive" />

								<!-- Icon -->
								<div class="flex items-center justify-around py-2">
									<Icon name="ri-home-4-line" theme />
									<Icon name="ri-heart-line" theme />
									<Icon name="ri-star-line" theme />
									<Icon name="ri-message-3-line" theme />
									<Icon name="ri-share-forward-line" theme />
								</div>

								<!-- Cell -->
								<div>
									<Cell :title="isZh ? '个人信息' : 'Profile'" />
									<Cell :title="isZh ? '消息通知' : 'Notifications'" :right="{ type: 'switch' }" v-model:switch-active="cellSwitchActive" />
								</div>

								<!-- 输入框 -->
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
									<Input :title="isZh ? '主题名称' : 'Theme name'" v-model:value="inputValue" clear />
								</Card>

								<!-- 开关和滑块 -->
								<div class="grid grid-cols-2 gap-2">
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
										<div class="flex justify-center">
											<Switch v-model:active="switchActive" />
										</div>
									</Card>
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
										<Slider :value="sliderValue" show-tip="never" @change="sliderValue = $event" />
									</Card>
								</div>

								<!-- 进度条与进度环 -->
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
									<div data-theme-progress-preview class="flex min-h-14 items-center justify-center gap-5">
										<div class="w-2/3 min-w-0">
											<Progress :percent="75" percent-position="block" />
										</div>
										<div class="size-14 shrink-0">
											<ProgressLoop :percent="75" :stroke-width="4" />
										</div>
									</div>
								</Card>

								<!-- 评分和数量 -->
								<div class="grid grid-cols-2 gap-2">
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
										<Rate :value="4" :height="16" />
									</Card>
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
										<div class="flex justify-center">
											<Stepper :value="stepperValue" :min="1" :max="10" @change="stepperValue = $event" />
										</div>
									</Card>
								</div>

								<!-- 功能色标签 -->
								<div class="grid grid-cols-4 gap-2">
									<div class="flex justify-center"><Tag :text="isZh ? '成功' : 'Success'" state="success" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '警告' : 'Warning'" state="warning" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '错误' : 'Error'" state="error" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '信息' : 'Info'" state="info" fill="light" size="sm" /></div>
								</div>

								<!-- 步骤条 -->
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" border-width="1" inj-class="border-black/5">
									<Steps :steps="themeSteps" :current="1" radius="full" />
								</Card>

								<!-- 按钮组 -->
								<div class="grid grid-cols-2 gap-2">
									<Button fill="base" size="full">{{ isZh ? '确认' : 'Confirm' }}</Button>
									<Button fill="lineState" size="full">{{ isZh ? '取消' : 'Cancel' }}</Button>
								</div>
							</div>
						</div>
					</div>

					<!-- 暗色层 -->
					<div
						data-mode="dark"
						class="dark absolute inset-0"
						:style="`${darkLayerStyles} background-color: var(--color-bg-base-dark); clip-path: ${splitAxis === 'y' ? `inset(${sliderPos}% 0 0 0)` : `inset(0 0 0 ${sliderPos}%)`}`"
					>
						<div class="flex justify-center p-3" style="color: var(--color-text-dark)">
							<div class="flex w-full max-w-100 flex-col gap-2">
								<!-- 头部 -->
								<div data-theme-preview-header class="flex items-center gap-3 py-1">
									<Avatar size="sm" image="/assets/images/home/avatar_1.jpg" />
									<div class="flex-1">
										<div class="text-sm font-semibold">Dark Mode</div>
										<div class="text-xs opacity-60">{{ currentThemeData.label }}</div>
									</div>
									<Badge text="11">
										<div class="bg-dark size-7" style="border-radius: var(--radius-small)"></div>
									</Badge>
								</div>

								<!-- NoticeBar -->
								<NoticeBar :text-list="noticeText" :right-icon="null" />

								<!-- Loading 与选择控件 -->
								<div data-theme-selection-controls class="grid grid-cols-3 items-center gap-2 py-2">
									<div class="flex items-center justify-around">
										<Loading v-for="type in randomLoadingTypes" :key="type" :type="type" theme />
									</div>
									<div class="flex justify-center">
										<Checkbox layout="h" :data="checkboxData" v-model:checkeds="checkedChoices" />
									</div>
									<div class="flex justify-center">
										<Radio layout="h" :data="radioData" v-model:value="radioValue" />
									</div>
								</div>

								<!-- Tab -->
								<Tab :labels="tabLabels" v-model:active="themeTabActive" />

								<!-- Icon -->
								<div class="flex items-center justify-around py-2">
									<Icon name="ri-home-4-line" theme />
									<Icon name="ri-heart-line" theme />
									<Icon name="ri-star-line" theme />
									<Icon name="ri-message-3-line" theme />
									<Icon name="ri-share-forward-line" theme />
								</div>

								<!-- Cell -->
								<div>
									<Cell :title="isZh ? '个人信息' : 'Profile'" />
									<Cell :title="isZh ? '消息通知' : 'Notifications'" :right="{ type: 'switch' }" v-model:switch-active="cellSwitchActive" />
								</div>

								<!-- 输入框 -->
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
									<Input :title="isZh ? '主题名称' : 'Theme name'" v-model:value="inputValue" clear />
								</Card>

								<!-- 开关和滑块 -->
								<div class="grid grid-cols-2 gap-2">
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
										<div class="flex justify-center">
											<Switch v-model:active="switchActive" />
										</div>
									</Card>
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
										<Slider :value="sliderValue" show-tip="never" @change="sliderValue = $event" />
									</Card>
								</div>

								<!-- 进度条与进度环 -->
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
									<div data-theme-progress-preview class="flex min-h-14 items-center justify-center gap-5">
										<div class="w-2/3 min-w-0">
											<Progress :percent="75" percent-position="block" />
										</div>
										<div class="size-14 shrink-0">
											<ProgressLoop :percent="75" :stroke-width="4" />
										</div>
									</div>
								</Card>

								<!-- 评分和数量 -->
								<div class="grid grid-cols-2 gap-2">
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
										<Rate :value="4" :height="16" />
									</Card>
									<Card mx="0" my="0" p="3" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
										<div class="flex justify-center">
											<Stepper :value="stepperValue" :min="1" :max="10" @change="stepperValue = $event" />
										</div>
									</Card>
								</div>

								<!-- 功能色标签 -->
								<div class="grid grid-cols-4 gap-2">
									<div class="flex justify-center"><Tag :text="isZh ? '成功' : 'Success'" state="success" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '警告' : 'Warning'" state="warning" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '错误' : 'Error'" state="error" fill="light" size="sm" /></div>
									<div class="flex justify-center"><Tag :text="isZh ? '信息' : 'Info'" state="info" fill="light" size="sm" /></div>
								</div>

								<!-- 步骤条 -->
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" border-width="1" inj-class="border-white/10">
									<Steps :steps="themeSteps" :current="1" radius="full" />
								</Card>

								<!-- 按钮组 -->
								<div class="grid grid-cols-2 gap-2">
									<Button fill="base" size="full">{{ isZh ? '确认' : 'Confirm' }}</Button>
									<Button fill="lineState" size="full">{{ isZh ? '取消' : 'Cancel' }}</Button>
								</div>
							</div>
						</div>
					</div>

					<!-- 分割线手柄 -->
					<div
						v-if="splitAxis === 'x'"
						class="absolute top-0 z-20 h-full w-0.5 -translate-x-1/2 cursor-ew-resize"
						:style="{ left: `${sliderPos}%` }"
						@pointerdown="startDrag"
					>
						<div
							class="from-primary to-primary-700 absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-linear-to-br shadow-xl transition-transform duration-300 active:scale-110"
						>
							<svg class="size-4 text-white" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5L3 12L8 19V5ZM16 5V19L21 12L16 5Z" />
							</svg>
						</div>
					</div>
					<div
						v-else
						class="absolute left-0 z-20 h-0.5 w-full -translate-y-1/2 cursor-ns-resize"
						:style="{ top: `${sliderPos}%` }"
						@pointerdown="startDrag"
					>
						<div
							class="from-primary to-primary-700 absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-linear-to-br shadow-xl transition-transform duration-300 active:scale-110"
						>
							<svg class="size-4 rotate-90 text-white" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5L3 12L8 19V5ZM16 5V19L21 12L16 5Z" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			<!-- 底部特性标签 -->
			<div class="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2">
				<span
					v-for="tag in themeFeatureTags"
					:key="tag.text"
					class="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
				>
					<component :is="tag.icon" :size="14" :stroke-width="1.75" absolute-stroke-width />
					{{ tag.text }}
				</span>
			</div>
		</div>
	</section>
</template>
