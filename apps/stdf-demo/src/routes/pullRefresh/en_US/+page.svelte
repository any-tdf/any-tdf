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
			time: `Updated ${index + 1} minutes ago`
		}));

	let items = $state(createItems('Activity', 1));
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
	let boxItems = $state(createItems('Activity', 1, 10));
	let boxLoading = $state(false);
	let boxFinished = $state(false);

	const refreshData = () => {
		refreshing = true;
		window.setTimeout(() => {
			refreshCount += 1;
			items = createItems(`Refresh ${refreshCount}`, refreshCount * 10);
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
			boxItems = createItems('Refreshed', boxItems.length + 1, 10);
			boxFinished = false;
			boxRefreshing = false;
		}, 900);
	};

	const loadBoxMore = () => {
		boxLoading = true;
		window.setTimeout(async () => {
			boxItems = [...boxItems, ...createItems('Loaded', boxItems.length + 1, 6)];
			if (boxItems.length >= 28) boxFinished = true;
			boxLoading = false;
			await tick();
		}, 900);
	};
</script>

<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
	<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
		<div class="text-base font-bold">Basic usage</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">
			Pull from the top of the list and release to refresh. On desktop, drag down with the mouse.
		</div>
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

	<div class="mx-4 mt-8 text-lg font-bold">Damping and max distance</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		Beyond the threshold the pull distance is damped, maxDistance caps the distance, and the content tracks the finger without animation lag.
	</div>
	<PullRefresh
		bind:refreshing={dampRefreshing}
		threshold={60}
		maxDistance={90}
		onrefresh={refreshDamped}
		onchange={(detail) => (dampDetail = detail)}
	>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">Pull distance is capped at 90px</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				Distance: {dampDetail.distance}px, progress: {dampDetail.progress.toFixed(2)}
			</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">Custom head</div>
	<PullRefresh bind:refreshing={customRefreshing} headHeight={64} threshold={72} onrefresh={refreshCustom}>
		{#snippet pullingChild(detail)}
			<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
				<span class="inline-block text-base" style="transform: rotate({Math.min(1, detail.progress) * 180}deg);">↓</span>
				<span>Keep pulling {Math.round(Math.min(1, detail.progress) * 100)}%</span>
			</div>
		{/snippet}
		{#snippet canReleaseChild()}
			<div class="inline-flex items-center gap-2 font-medium text-success">
				<span class="inline-block rotate-180 text-base">↓</span>
				<span>Release to refresh</span>
			</div>
		{/snippet}
		{#snippet refreshingChild()}
			<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
				<Loading type="1_12" width="6" height="6" theme />
				<span>Syncing data</span>
			</div>
		{/snippet}
		{#snippet successChild()}
			<div class="text-success">Sync complete</div>
		{/snippet}
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">The arrow rotates with progress</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">Read status, distance, and progress from the snippet detail parameter.</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">Success tip and duration</div>
	<PullRefresh bind:refreshing={tipRefreshing} successText="Latest content recommended" successDuration={1500} onrefresh={refreshTip}>
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
			<div class="font-medium">Success text stays for 1.5s</div>
			<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">Use successText with successDuration to control how long the success state stays.</div>
		</div>
	</PullRefresh>

	<div class="mx-4 mt-8 text-lg font-bold">Nested scroll container</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		Pull to refresh inside the container and load more at the bottom by pointing scrollTarget at the container.
	</div>
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
