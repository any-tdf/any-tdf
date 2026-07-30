<script lang="ts">
	import { BottomSheet, Calendar, Button } from 'stdf';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// BottomSheet 状态
	let showBottomSheet = $state(false);

	// Calendar 状态
	let showCalendar = $state(false);
	let selectedDate = $state('');

	// 获取当前月份
	const now = new Date();
	const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
	const nextMonth = `${now.getFullYear()}-${String(now.getMonth() + 3).padStart(2, '0')}`;

	// 处理日期选择
	const handleDateConfirm = (dates: string[]) => {
		if (dates && dates.length > 0) {
			selectedDate = dates[0];
		}
		showCalendar = false;
	};

	// 移动端特性
	const mobileFeatures = [
		{
			icon: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6Z',
			title: isZh ? '手势操作' : 'Gesture Control',
			desc: isZh ? '支持滑动、拖拽、下拉等手势' : 'Swipe, drag, pull gestures'
		},
		{
			icon: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z',
			title: isZh ? '流畅动画' : 'Smooth Animation',
			desc: isZh ? '60fps 原生级动画效果' : '60fps native-like animations'
		},
		{
			icon: 'M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM9 9H15V15H9V9ZM11 11V13H13V11H11Z',
			title: isZh ? '触屏优化' : 'Touch Optimized',
			desc: isZh ? '44px 触控区域标准' : '44px touch target standard'
		},
		{
			icon: 'M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z',
			title: isZh ? '响应式' : 'Responsive',
			desc: isZh ? '完美适配各种屏幕' : 'Perfect fit for all screens'
		}
	];
</script>

<section class="relative overflow-hidden px-4 py-20 md:px-12 md:py-32">
	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="mb-12 text-center">
			<!-- 标签 -->
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M7 4V20H17V4H7ZM6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"
					/>
				</svg>
				<span>{isZh ? '移动端优先' : 'Mobile First'}</span>
			</div>

			<h2
				class="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white"
			>
				{isZh ? '触手可及，流畅自然' : 'Touch & Feel Natural'}
			</h2>
			<p class="mx-auto max-w-2xl text-base opacity-70">
				{isZh
					? '专为移动端设计的触控交互，流畅自然的手势响应。原生应用般的用户体验。'
					: 'Touch interactions designed for mobile. Smooth gesture responses with native-like user experience.'}
			</p>
		</div>

		<!-- 特性网格 -->
		<div class="mx-auto max-w-4xl">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each mobileFeatures as feature (feature)}
					<div
						class="group rounded-2xl border border-gray-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-white/10 dark:bg-gray-900/80"
					>
						<div
							class="mb-4 flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-700 shadow-lg shadow-primary/25 dark:from-dark dark:to-dark-700 dark:shadow-dark/25"
						>
							<svg class="size-6 text-white" viewBox="0 0 24 24" fill="currentColor">
								<path d={feature.icon} />
							</svg>
						</div>
						<div class="mb-1 font-semibold">{feature.title}</div>
						<div class="text-sm opacity-60">{feature.desc}</div>
					</div>
				{/each}
			</div>

			<!-- 交互演示区域 -->
			<div
				class="mt-8 rounded-2xl border border-gray-200/50 bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/60"
			>
				<div class="mb-4 text-center">
					<div class="text-lg font-semibold text-gray-800 dark:text-white">
						{isZh ? '点击体验移动端组件' : 'Tap to Experience Mobile Components'}
					</div>
					<div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
						{isZh ? '这些组件专为触屏交互设计，支持手势操作' : 'Components designed for touch interaction with gesture support'}
					</div>
				</div>

				<!-- 已选日期显示 -->
				{#if selectedDate}
					<div class="mb-4 rounded-xl bg-primary/10 p-3 text-center dark:bg-dark/10">
						<div class="text-xs text-gray-500 dark:text-gray-400">{isZh ? '已选日期' : 'Selected Date'}</div>
						<div class="text-xl font-bold text-primary dark:text-dark">{selectedDate}</div>
					</div>
				{/if}

				<!-- 操作按钮 -->
				<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button fill="base" onclick={() => (showBottomSheet = true)}>
						<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H6V6H11Z"
							/>
						</svg>
						{isZh ? '底部弹窗' : 'BottomSheet'}
					</Button>
					<Button fill="line" onclick={() => (showCalendar = true)}>
						<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM20 9H4V19H20V9ZM15 5H9V5H7V5H4V7H20V5H17V5H15ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11Z"
							/>
						</svg>
						{isZh ? '日历选择' : 'Calendar'}
					</Button>
				</div>

				<!-- 组件标签 -->
				<div class="mt-5 flex flex-wrap justify-center gap-2">
					{#each ['BottomSheet', 'Calendar', 'Swiper', 'Picker', 'ActionSheet', 'Toast'] as comp (comp)}
						<span
							class="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
							>{comp}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- BottomSheet 组件 -->
<BottomSheet bind:visible={showBottomSheet} title={isZh ? '底部弹窗' : 'Bottom Sheet'} stayHeightList={[300, 450]} stayHeightIndex={0}>
	<div class="p-4">
		<div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
			{isZh ? '这是一个可以拖拽调整高度的底部弹窗组件，支持多个停靠高度。' : 'This is a draggable bottom sheet with multiple snap heights.'}
		</div>
		<div class="grid grid-cols-3 gap-3">
			{#each [1, 2, 3, 4, 5, 6] as i (i)}
				<div
					class="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
				>
					{i}
				</div>
			{/each}
		</div>
		<div class="mt-4">
			<Button fill="base" size="full" onclick={() => (showBottomSheet = false)}>
				{isZh ? '关闭' : 'Close'}
			</Button>
		</div>
	</div>
</BottomSheet>

<!-- Calendar 组件 -->
<Calendar
	bind:visible={showCalendar}
	startMonth={currentMonth}
	endMonth={nextMonth}
	mode="single"
	onconfirm={handleDateConfirm}
	onclose={() => (showCalendar = false)}
/>
