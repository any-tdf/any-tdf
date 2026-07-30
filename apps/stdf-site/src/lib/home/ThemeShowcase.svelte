<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Switch, Avatar, Progress, Tab, Badge } from 'stdf';
	import { themes as stdfThemes } from 'stdf/theme';
	import { themeLabels } from '../../data/homeData.js';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 监听暗色模式
	let isDark = $state(false);

	onMount(() => {
		// 初始化
		isDark = document.documentElement.getAttribute('data-mode') === 'dark';

		// 监听 data-mode 变化
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'data-mode') {
					isDark = document.documentElement.getAttribute('data-mode') === 'dark';
				}
			});
		});

		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });

		return () => observer.disconnect();
	});

	// 取前 11 个内置主题用于展示
	const themes = stdfThemes.slice(0, 11).map((t) => ({
		name: t.name,
		label: isZh ? themeLabels[t.name] || t.name : t.name,
		color: t['color-primary'],
		darkColor: t['color-dark']
	}));

	let currentTheme = $state('STDF');
	let phoneEl = $state<HTMLDivElement>();
	let hoveredTheme = $state<string | null>(null);

	const selectTheme = (name: string) => {
		currentTheme = name;
		if (phoneEl) {
			phoneEl.setAttribute('data-theme', name);
		}
	};

	const currentThemeData = $derived(themes.find((t) => t.name === currentTheme) || themes[0]);
</script>

<section class="relative overflow-hidden px-4 py-20 md:px-12 md:py-32">
	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="mb-16 text-center">
			<!-- 标签 -->
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 12L17 7L18.41 8.41L12 14.82L7.59 10.41L9 9L12 12Z"
					/>
				</svg>
				<span>{isZh ? '主题系统' : 'Theme System'}</span>
			</div>

			<h2
				class="mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:via-gray-300 dark:to-white"
			>
				{isZh ? '无限可能，随心定制' : 'Infinite Themes, Endless Possibilities'}
			</h2>
			<p class="mx-auto max-w-2xl text-lg opacity-70">
				{isZh
					? '11 套精心设计的内置主题，从活力四射的 Nintendo 到沉稳典雅的 Twilight。使用主题生成器，轻松创建品牌专属配色。'
					: '11 carefully designed built-in themes, from vibrant Nintendo to elegant Twilight. Use the theme generator to easily create brand-specific color schemes.'}
			</p>
		</div>

		<div class="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-20">
			<!-- 模拟手机 -->
			<div class="relative">
				<!-- 简化的圆角矩形框架 -->
				<div
					class="relative h-130 w-70 overflow-hidden rounded-3xl border border-gray-200/50 bg-white/90 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-900/90"
				>
					<!-- 手机内容 -->
					<div
						bind:this={phoneEl}
						data-theme={currentTheme}
						data-mode={isDark ? 'dark' : 'light'}
						class="h-full w-full overflow-hidden bg-bg-base transition-colors duration-300 dark:bg-bg-base-dark {isDark ? 'dark' : ''}"
					>
						<div class="flex h-full flex-col p-4">
							<!-- 组件展示 -->
							<div class="flex flex-1 flex-col gap-4">
								<!-- 用户卡片 -->
								<div class="rounded-2xl border border-black/5 bg-bg-surface p-4 shadow-sm dark:border-white/5 dark:bg-bg-surface-dark">
									<div class="flex items-center gap-3">
										<Avatar size="md" image="/assets/images/home/avatar_1.jpg" />
										<div class="flex-1">
											<div class="text-sm font-semibold text-text-primary dark:text-text-dark">{currentThemeData.label}</div>
											<div class="text-xs text-gray-500">{isZh ? '当前主题' : 'Current Theme'}</div>
										</div>
										<Badge text="11">
											<div class="size-9 rounded-xl bg-primary dark:bg-dark"></div>
										</Badge>
									</div>
								</div>

								<!-- Tab 切换 -->
								<Tab labels={[{ text: isZh ? '首页' : 'Home' }, { text: isZh ? '消息' : 'Msg' }, { text: isZh ? '我的' : 'Me' }]} />

								<!-- 进度条 -->
								<div class="rounded-xl border border-black/5 bg-bg-surface p-4 dark:border-white/5 dark:bg-bg-surface-dark">
									<div class="mb-2 flex items-center justify-between">
										<span class="text-xs text-gray-500">{isZh ? '下载进度' : 'Download'}</span>
										<span class="text-xs font-medium text-text-primary dark:text-text-dark">68%</span>
									</div>
									<Progress percent={68} />
								</div>

								<!-- 开关 -->
								<div
									class="flex items-center justify-between rounded-xl border border-black/5 bg-bg-surface p-4 dark:border-white/5 dark:bg-bg-surface-dark"
								>
									<span class="text-sm text-text-primary dark:text-text-dark">{isZh ? '推送通知' : 'Push Notifications'}</span>
									<Switch active />
								</div>

								<!-- 按钮组 -->
								<div class="mt-auto flex gap-3">
									<Button fill="line" size="md">{isZh ? '了解更多' : 'Learn More'}</Button>
									<Button size="md">{isZh ? '立即使用' : 'Get Started'}</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 主题选择器 -->
			<div class="flex max-w-md flex-col gap-6">
				<div class="text-center lg:text-left">
					<div class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
						{isZh ? '选择主题预览效果' : 'Select a theme to preview'}
					</div>
					<div class="text-2xl font-bold text-gray-800 dark:text-gray-200">
						{isZh ? '11 套内置主题' : '11 Built-in Themes'}
					</div>
				</div>

				<!-- 主题网格 -->
				<div class="grid grid-cols-4 gap-3">
					{#each themes as theme (theme)}
						<button
							onclick={() => selectTheme(theme.name)}
							onmouseenter={() => (hoveredTheme = theme.name)}
							onmouseleave={() => (hoveredTheme = null)}
							class="group relative flex flex-col items-center gap-2 rounded-2xl p-3 transition-all duration-300 {currentTheme ===
							theme.name
								? 'bg-gray-100 shadow-lg dark:bg-gray-800'
								: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}"
						>
							<!-- 选中指示器 -->
							{#if currentTheme === theme.name}
								<div class="absolute -inset-px rounded-2xl border-2 border-primary dark:border-dark"></div>
							{/if}

							<!-- 颜色球 -->
							<div class="relative">
								<div
									class="size-12 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 {currentTheme === theme.name
										? 'scale-110'
										: ''}"
									style="background: linear-gradient(135deg, {theme.color}, {theme.darkColor})"
								></div>
								<!-- 光晕 -->
								{#if hoveredTheme === theme.name || currentTheme === theme.name}
									<div
										class="absolute inset-0 -z-10 rounded-full blur-lg transition-opacity"
										style="background: linear-gradient(135deg, {theme.color}, {theme.darkColor}); opacity: 0.5"
									></div>
								{/if}
							</div>

							<span
								class="text-xs font-medium text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200"
							>
								{theme.label}
							</span>
						</button>
					{/each}
				</div>

				<!-- 自定义主题链接 -->
				<a
					href="/generator"
					class="group flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-primary hover:bg-primary/5 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-dark dark:hover:bg-dark/5"
				>
					<div
						class="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-700 text-white shadow-lg dark:from-dark dark:to-dark-700"
					>
						<svg class="size-5" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
							/>
						</svg>
					</div>
					<div class="flex-1 text-left">
						<div class="font-medium text-gray-800 dark:text-gray-200">{isZh ? '创建自定义主题' : 'Create Custom Theme'}</div>
						<div class="text-xs text-gray-500">{isZh ? '使用主题生成器' : 'Use theme generator'}</div>
					</div>
					<svg class="size-5 text-gray-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
						/>
					</svg>
				</a>

				<!-- 特性标签 -->
				<div class="flex flex-wrap gap-2">
					{#each [{ icon: '🎨', text: isZh ? 'OKLCH 色彩空间' : 'OKLCH Color Space' }, { icon: '🌙', text: isZh ? '亮暗双色' : 'Light & Dark' }, { icon: '⚡', text: isZh ? '实时切换' : 'Real-time Switch' }] as tag}
						<span
							class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
						>
							<span>{tag.icon}</span>
							{tag.text}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
