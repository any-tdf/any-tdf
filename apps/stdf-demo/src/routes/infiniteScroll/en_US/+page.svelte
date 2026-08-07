<script lang="ts">
	import { tick } from 'svelte';
	import { Button, InfiniteScroll, Loading } from 'stdf';

	type DemoItem = {
		id: number;
		title: string;
		desc: string;
	};

	const createItems = (start: number, count = 10): DemoItem[] =>
		Array.from({ length: count }, (_, index) => ({
			id: start + index,
			title: `Order record ${start + index}`,
			desc: `Item ${start + index} came from a paged API.`
		}));

	let items = $state(createItems(1, 12));
	let loading = $state(false);
	let finished = $state(false);
	let error = $state(false);
	let failNext = $state(false);

	const loadMore = (isRetry: boolean) => {
		loading = true;
		error = false;
		window.setTimeout(() => {
			if (failNext && !isRetry) {
				loading = false;
				error = true;
				failNext = false;
				return;
			}
			items = [...items, ...createItems(items.length + 1, 8)];
			if (items.length >= 36) finished = true;
			loading = false;
		}, 900);
	};

	// 自定义状态内容 Custom status content
	let customItems = $state(createItems(101, 8));
	let customLoading = $state(false);
	let customFinished = $state(false);
	let customError = $state(false);
	let customFailedOnce = $state(false);

	const loadCustomMore = (isRetry: boolean) => {
		customLoading = true;
		customError = false;
		window.setTimeout(() => {
			if (!customFailedOnce && !isRetry && customItems.length >= 16) {
				customFailedOnce = true;
				customLoading = false;
				customError = true;
				return;
			}
			customItems = [...customItems, ...createItems(customItems.length + 1, 4)];
			if (customItems.length >= 28) customFinished = true;
			customLoading = false;
		}, 900);
	};

	// 嵌套滚动容器 Nested scroll container
	let boxEl = $state<HTMLDivElement | null>(null);
	let boxItems = $state(createItems(201, 10));
	let boxLoading = $state(false);
	let boxFinished = $state(false);

	const loadBoxMore = () => {
		boxLoading = true;
		window.setTimeout(() => {
			boxItems = [...boxItems, ...createItems(boxItems.length + 1, 6)];
			if (boxItems.length >= 30) boxFinished = true;
			boxLoading = false;
		}, 900);
	};

	// 顶部加载 Load older at the top
	let upBoxEl = $state<HTMLDivElement | null>(null);
	let upItems = $state(createItems(301, 10));
	let upLoading = $state(false);
	let upFinished = $state(false);

	const loadUpMore = () => {
		upLoading = true;
		window.setTimeout(async () => {
			upItems = [...createItems(upItems[0].id - 6, 6), ...upItems];
			if (upItems.length >= 28) upFinished = true;
			upLoading = false;
			await tick();
			// 前置数据后保持阅读位置，避免停留在顶部立即再次触发
			// Keep the reading position after prepending so it does not retrigger immediately
			if (upBoxEl) upBoxEl.scrollTop = 120;
		}, 900);
	};

	// 手动检测 Manual check
	let manualItems = $state(createItems(401, 16));
	let manualLoading = $state(false);
	let manualFinished = $state(false);
	let manualScroller: { check: () => void };

	const loadManualMore = () => {
		manualLoading = true;
		window.setTimeout(() => {
			manualItems = [...manualItems, ...createItems(manualItems.length + 1, 6)];
			if (manualItems.length >= 40) manualFinished = true;
			manualLoading = false;
		}, 900);
	};

	const removeAndCheck = async () => {
		manualItems = manualItems.slice(6);
		manualFinished = false;
		await tick();
		manualScroller?.check();
	};
</script>

<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
	<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
		<div class="text-base font-bold">Basic usage</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">Loading is triggered near the bottom, while loading and finished are controlled externally.</div>
		<div class="mt-3">
			<Button size="auto" injClass="px-4" onclick={() => (failNext = true)}>Fail next load</Button>
		</div>
	</div>
	<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		{#each items as item (item.id)}
			<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{item.title}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
			</div>
		{/each}
	</div>
	<InfiniteScroll bind:loading bind:finished bind:error loadingIcon={{ type: '1_17', width: '8', height: '4' }} onload={loadMore} />

	<div class="mx-4 mt-8 text-lg font-bold">Custom status content</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		The snippet detail parameter provides status and retry, so error content can trigger a retry directly.
	</div>
	<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		{#each customItems as item (item.id)}
			<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{item.title}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
			</div>
		{/each}
	</div>
	<InfiniteScroll bind:loading={customLoading} bind:finished={customFinished} bind:error={customError} onload={loadCustomMore}>
		{#snippet loadingChild()}
			<div class="inline-flex min-h-12 items-center gap-2 text-primary dark:text-dark">
				<Loading type="1_12" width="6" height="6" theme />
				<span>Loading hard...</span>
			</div>
		{/snippet}
		{#snippet finishedChild()}
			<div class="inline-flex min-h-12 items-center text-text-primary/40 dark:text-text-dark/40">— You have reached the end —</div>
		{/snippet}
		{#snippet errorChild(detail)}
			<div class="inline-flex min-h-12 items-center gap-3">
				<span class="text-error">Network error, failed to load</span>
				<Button size="auto" injClass="px-4" onclick={detail.retry}>Retry</Button>
			</div>
		{/snippet}
	</InfiniteScroll>

	<div class="mx-4 mt-8 text-lg font-bold">Nested scroll container</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		Point scrollTarget at the container so loading triggers near its bottom.
	</div>
	<div bind:this={boxEl} class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		{#each boxItems as item (item.id)}
			<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{item.title}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
			</div>
		{/each}
		<InfiniteScroll bind:loading={boxLoading} bind:finished={boxFinished} scrollTarget={boxEl} offset={100} onload={loadBoxMore} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Load at the top</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		With direction set to up, older data loads near the top, which fits chat history scenarios.
	</div>
	<div bind:this={upBoxEl} class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		<InfiniteScroll bind:loading={upLoading} bind:finished={upFinished} scrollTarget={upBoxEl} direction="up" offset={60} immediateCheck={false} onload={loadUpMore} />
		{#each upItems as item (item.id)}
			<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{item.title}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
			</div>
		{/each}
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Manual check</div>
	<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
		After data or container size changes, call the exposed check method to detect actively.
	</div>
	<div class="mx-4 mt-3">
		<Button size="auto" injClass="px-4" onclick={removeAndCheck}>Remove first 6 and check</Button>
	</div>
	<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
		{#each manualItems as item (item.id)}
			<div class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{item.title}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
			</div>
		{/each}
	</div>
	<InfiniteScroll bind:this={manualScroller} bind:loading={manualLoading} bind:finished={manualFinished} immediateCheck={false} onload={loadManualMore} />
</div>
