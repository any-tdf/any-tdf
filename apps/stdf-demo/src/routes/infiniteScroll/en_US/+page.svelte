<script lang="ts">
	import { Button, InfiniteScroll } from 'stdf';

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
</script>

<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
	<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
		<div class="text-base font-bold">Basic usage</div>
		<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">Loading is triggered near the bottom, while loading and finished are controlled externally.</div>
		<div class="mt-3">
			<Button size="sm" onclick={() => (failNext = true)}>Fail next load</Button>
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
</div>
