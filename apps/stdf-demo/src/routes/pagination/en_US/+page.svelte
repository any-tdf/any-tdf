<script lang="ts">
	import { onMount } from 'svelte';
	import { Pagination, Loading } from 'stdf';
	import { aphorisms } from '@any-tdf/site-common/data';

	// total, usually from backend
	const total = 200;

	// current page
	let current = $state(1);

	// simulate request data
	let data: { text: string; from: string; fromItalic?: boolean }[] = $state([]);
	let currentPage = $state(1);
	let pageSize = 4;
	let totalData = $state(0);
	let loading = $state(false);
	const getData = () => {
		loading = true;
		// use setTimeout to simulate request
		setTimeout(() => {
			loading = false;
			// get pageSize data from aphorisms randomly
			data = aphorisms.sort(() => Math.random() - 0.5).slice(0, pageSize);
			totalData = 64;
		}, 2000);
	};
	const changePageFunc = (c: number) => {
		currentPage = c;
		getData();
	};
	// initial request first page
	onMount(() => {
		getData();
	});
</script>

<div class="m-4 mt-24 text-lg font-bold">Basic usage</div>
<Pagination {total} />

<div class="mx-4 mt-8 text-lg font-bold">Event listening</div>
<div class="mx-4 mb-2 text-sm">Current page: {current}</div>
<Pagination {total} onpre={(c) => (current = c)} onnext={(c) => (current = c)} onchange={(c) => (current = c)} />

<div class="mx-4 mt-24 text-lg font-bold">Initial display omitted page</div>
<div class="mx-4 mb-4 text-xs">Can be used to guide users</div>
<Pagination {total} showNextOmitPage />

<div class="m-4 mt-8 text-lg font-bold">Set initial page</div>
<Pagination {total} current={10} />

<div class="mx-4 mt-8 text-lg font-bold">Max display 11 pages</div>
<div class="mx-4 mb-4 text-xs">Display more pages but the page number is small</div>
<Pagination maxShowPage={11} {total} />

<div class="mx-4 mt-8 text-lg font-bold">Max display 5 pages</div>
<div class="mx-4 mb-4 text-xs">Suitable for scenes with a small paging area</div>
<div class="flex items-center">
	<div class="px-4">This is my territory</div>
	<div class="flex-1">
		<Pagination maxShowPage={5} {total} />
	</div>
</div>

<div class="m-4 mt-8 text-lg font-bold">No data</div>
<Pagination total={0} />

<div class="m-4 mt-8 text-lg font-bold">Only one page</div>
<Pagination total={8} />

<div class="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
<div class="mx-4 mb-4 text-xs">No omitted page</div>
<Pagination total={70} />

<div class="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
<div class="mx-4 mb-4 text-xs">No omitted page</div>
<Pagination total={90} maxShowPage={7} />

<div class="mx-4 mt-8 text-lg font-bold">Total pages are many</div>
<div class="mx-4 mb-4 text-xs">Will exist two omitted pages</div>
<Pagination {total} />

<div class="m-4 mt-8 text-lg font-bold">Each page is only 3 items</div>
<Pagination total={50} pageSize={3} />

<div class="m-4 mt-8 text-lg font-bold">Highlighted page is border</div>
<Pagination {total} type="border" />

<div class="m-4 mt-8 text-lg font-bold">Highlighted page is block</div>
<Pagination {total} type="block" />

<div class="m-4 mt-8 text-lg font-bold">Increase the radius of the highlighted page</div>
<Pagination {total} type="block" radius="xl" />

<div class="m-4 mt-8 text-lg font-bold">Omitted page column is 2</div>
<Pagination {total} pageCol={2} />

<div class="m-4 mt-8 text-lg font-bold">Inject injClass</div>
<Pagination {total} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />

<div class="m-4 mt-8 text-lg font-bold">White background</div>
<Pagination {total} bg="white" />

<div class="m-4 mt-8 text-lg font-bold">Theme background</div>
<Pagination {total} bg="theme" />

<div class="m-4 mt-8 text-lg font-bold">Simulate request</div>
<div class="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
	{#each data as item}
		<div class:py-6={pageSize > 1}>
			<div class="text-justify text-sm">{item.text}</div>
			<div class="mt-1 text-right" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
	{#if loading}
		<div class="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
			<div>Querying the {currentPage} page data...</div>
			<Loading />
		</div>
	{/if}
</div>
<Pagination {pageSize} total={totalData} onchange={changePageFunc} />

<div class="mx-4 mt-8 text-lg font-bold">Continuous mode</div>
<div class="mx-4 mb-4 text-xs">Only allow clicking on the previous and next pages</div>
<Pagination {total} continuous />

<div class="pb-10"></div>
