<script lang="ts">
	import { Button, PullRefresh } from 'stdf';
	import type { PullRefreshChangeDetail } from 'stdf/types';

	type DemoItem = {
		id: number;
		title: string;
		time: string;
	};

	const createItems = (prefix: string, start = 1): DemoItem[] =>
		Array.from({ length: 8 }, (_, index) => ({
			id: start + index,
			title: `${prefix} ${start + index}`,
			time: `刚刚更新 ${index + 1} 分钟前`
		}));

	let items = $state(createItems('动态', 1));
	let refreshing = $state(false);
	let customRefreshing = $state(false);
	let refreshCount = $state(0);
	let changeDetail = $state<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });

	const refreshData = () => {
		refreshing = true;
		window.setTimeout(() => {
			refreshCount += 1;
			items = createItems(`刷新 ${refreshCount}`, refreshCount * 10);
			refreshing = false;
		}, 900);
	};

	const refreshCustom = () => {
		customRefreshing = true;
		window.setTimeout(() => {
			customRefreshing = false;
		}, 900);
	};
</script>

<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
	<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
		<div class="text-base font-bold">基础用法</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">下拉列表顶部后释放，触发明确的数据刷新。</div>
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

	<div class="mx-4 mt-8 text-lg font-bold">自定义头部</div>
	<PullRefresh bind:refreshing={customRefreshing} headHeight={64} threshold={72} onrefresh={refreshCustom}>
		{#snippet pullingChild(detail)}
			<div class="text-primary dark:text-dark">继续下拉 {Math.round(detail.progress * 100)}%</div>
		{/snippet}
		{#snippet canReleaseChild()}
			<div class="font-medium text-success">释放刷新</div>
		{/snippet}
		{#snippet refreshingChild()}
			<div class="text-primary dark:text-dark">正在同步数据</div>
		{/snippet}
		{#snippet successChild()}
			<div class="text-success">同步完成</div>
		{/snippet}
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">自定义状态内容</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">可以通过 snippet 根据状态展示不同内容。</div>
		</div>
	</PullRefresh>

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
