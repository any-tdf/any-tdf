<script lang="ts">
	import { tick } from 'svelte';
	import { Button, InfiniteScroll, Loading, PullRefresh } from 'stdf';
	import type { PullRefreshChangeDetail } from 'stdf/types';

	type DemoItem = {
		id: number;
		title: string;
		time: string;
	};

	const createItems = (prefix: string, start = 1, count = 8): DemoItem[] =>
		Array.from({ length: count }, (_, index) => ({
			id: start + index,
			title: `${prefix} ${start + index}`,
			time: `刚刚更新 ${index + 1} 分钟前`
		}));

	let items = $state(createItems('动态', 1));
	let refreshing = $state(false);
	let dampRefreshing = $state(false);
	let customRefreshing = $state(false);
	let tipRefreshing = $state(false);
	let boxRefreshing = $state(false);
	let refreshCount = $state(0);
	let changeDetail = $state<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
	let dampDetail = $state<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });

	// 嵌套滚动容器 Combined scroll container
	let boxEl = $state<HTMLDivElement | null>(null);
	let boxItems = $state(createItems('动态', 1, 10));
	let boxLoading = $state(false);
	let boxFinished = $state(false);

	const refreshData = () => {
		refreshing = true;
		window.setTimeout(() => {
			refreshCount += 1;
			items = createItems(`刷新 ${refreshCount}`, refreshCount * 10);
			refreshing = false;
		}, 900);
	};

	const refreshDamped = () => {
		dampRefreshing = true;
		window.setTimeout(() => (dampRefreshing = false), 900);
	};

	const refreshCustom = () => {
		customRefreshing = true;
		window.setTimeout(() => (customRefreshing = false), 900);
	};

	const refreshTip = () => {
		tipRefreshing = true;
		window.setTimeout(() => (tipRefreshing = false), 900);
	};

	const refreshBox = () => {
		boxRefreshing = true;
		window.setTimeout(() => {
			boxItems = createItems('刷新', boxItems.length + 1, 10);
			boxFinished = false;
			boxRefreshing = false;
		}, 900);
	};

	const loadBoxMore = () => {
		boxLoading = true;
		window.setTimeout(async () => {
			boxItems = [...boxItems, ...createItems('加载', boxItems.length + 1, 6)];
			if (boxItems.length >= 28) boxFinished = true;
			boxLoading = false;
			await tick();
		}, 900);
	};
</script>

<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
	<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
		<div class="text-base font-bold">基础用法</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">下拉列表顶部后释放，触发明确的数据刷新，桌面端可按住鼠标向下拖拽。</div>
	</div>
	<PullRefresh bind:refreshing successText="刷新完成" loadingIcon={{ type: '1_17', width: '8', height: '4' }} onrefresh={refreshData} onchange={(detail) => (changeDetail = detail)}>
		<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			{#each items as item (item.id)}
				<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
					<div class="font-medium">{item.title}</div>
					<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.time}</div>
				</div>
			{/each}
		</div>
	</PullRefresh>
	<div class="mx-4 mt-3 text-xs text-text-primary/50 dark:text-text-dark/50">当前状态：{changeDetail.status}，进度：{changeDetail.progress.toFixed(2)}</div>

	<div class="mx-4 mt-8 text-lg font-bold">阻尼与最大距离</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		超过 threshold 后下拉距离会按阻尼曲线衰减，maxDistance 限制最大下拉距离，跟随手指过程无动画延迟。
	</div>
	<PullRefresh
		bind:refreshing={dampRefreshing}
		threshold={60}
		maxDistance={90}
		onrefresh={refreshDamped}
		onchange={(detail) => (dampDetail = detail)}
	>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">下拉距离被限制在 90px 以内</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				当前距离：{dampDetail.distance}px，进度：{dampDetail.progress.toFixed(2)}
			</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">自定义头部</div>
	<PullRefresh bind:refreshing={customRefreshing} headHeight={64} threshold={72} onrefresh={refreshCustom}>
		{#snippet pullingChild(detail)}
			<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
				<span class="inline-block text-base" style="transform: rotate({Math.min(1, detail.progress) * 180}deg);">↓</span>
				<span>继续下拉 {Math.round(Math.min(1, detail.progress) * 100)}%</span>
			</div>
		{/snippet}
		{#snippet canReleaseChild()}
			<div class="inline-flex items-center gap-2 font-medium text-success">
				<span class="inline-block rotate-180 text-base">↓</span>
				<span>释放刷新</span>
			</div>
		{/snippet}
		{#snippet refreshingChild()}
			<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
				<Loading type="1_12" width="6" height="6" theme />
				<span>正在同步数据</span>
			</div>
		{/snippet}
		{#snippet successChild()}
			<div class="text-success">同步完成</div>
		{/snippet}
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">箭头随进度旋转</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">通过 snippet 的 detail 参数读取 status、distance 和 progress。</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">成功提示与时长</div>
	<PullRefresh bind:refreshing={tipRefreshing} successText="已为你推荐最新内容" successDuration={1500} onrefresh={refreshTip}>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">成功文案展示 1.5 秒</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">successText 配合 successDuration 控制成功态停留时长。</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">嵌套滚动容器</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">容器内下拉刷新，滚动到底部加载更多，通过 scrollTarget 指定滚动容器。</div>
	<div bind:this={boxEl} class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		<PullRefresh bind:refreshing={boxRefreshing} scrollTarget={boxEl} onrefresh={refreshBox}>
			<div class="overflow-hidden">
				{#each boxItems as item (item.id)}
					<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div class="font-medium">{item.title}</div>
						<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.time}</div>
					</div>
				{/each}
			</div>
			<InfiniteScroll bind:loading={boxLoading} bind:finished={boxFinished} scrollTarget={boxEl} offset={100} onload={loadBoxMore} />
		</PullRefresh>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">禁用状态</div>
	<PullRefresh disabled>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">当前不可刷新</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">用于权限、离线或当前页面不允许刷新时。</div>
			<div class="mt-3">
				<Button disabled>刷新不可用</Button>
			</div>
		</div>
	</PullRefresh>
</div>
