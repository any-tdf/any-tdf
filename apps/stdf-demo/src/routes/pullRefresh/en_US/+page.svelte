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
			time: `Updated ${index + 1} minutes ago`
		}));

	let items = $state(createItems('Activity', 1));
	let refreshing = $state(false);
	let customRefreshing = $state(false);
	let refreshCount = $state(0);
	let changeDetail = $state<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });

	const refreshData = () => {
		refreshing = true;
		window.setTimeout(() => {
			refreshCount += 1;
			items = createItems(`Refresh ${refreshCount}`, refreshCount * 10);
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
		<div class="text-base font-bold">Basic usage</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">Pull from the top of the list and release to refresh data explicitly.</div>
	</div>
	<PullRefresh bind:refreshing successText="Refresh complete" loadingIcon={{ type: '1_17', width: '8', height: '4' }} onrefresh={refreshData} onchange={(detail) => (changeDetail = detail)}>
		<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			{#each items as item (item.id)}
				<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
					<div class="font-medium">{item.title}</div>
					<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.time}</div>
				</div>
			{/each}
		</div>
	</PullRefresh>
	<div class="mx-4 mt-3 text-xs text-text-primary/50 dark:text-text-dark/50">Status: {changeDetail.status}, progress: {changeDetail.progress.toFixed(2)}</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom head</div>
	<PullRefresh bind:refreshing={customRefreshing} headHeight={64} threshold={72} onrefresh={refreshCustom}>
		{#snippet pullingChild(detail)}
			<div class="text-primary dark:text-dark">Keep pulling {Math.round(detail.progress * 100)}%</div>
		{/snippet}
		{#snippet canReleaseChild()}
			<div class="font-medium text-success">Release to refresh</div>
		{/snippet}
		{#snippet refreshingChild()}
			<div class="text-primary dark:text-dark">Syncing data</div>
		{/snippet}
		{#snippet successChild()}
			<div class="text-success">Sync complete</div>
		{/snippet}
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">Custom state content</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">Snippets can display different content for each state.</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">Disabled</div>
	<PullRefresh disabled>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">Refresh unavailable</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">Use this when permissions, offline state, or page rules block refresh.</div>
			<div class="mt-3">
				<Button disabled>Refresh disabled</Button>
			</div>
		</div>
	</PullRefresh>
</div>
