<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Loading, Pagination } from 'vtdf';
import { aphorisms } from '@any-tdf/site-common/data';

type Aphorism = {
	text: string;
	from: string;
	fromItalic?: boolean;
};

const total = 200;
const current = ref(1);
const data = ref<Aphorism[]>([]);
const currentPage = ref(1);
const pageSize = 4;
const totalData = ref(0);
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const getData = () => {
	loading.value = true;
	if (timer) clearTimeout(timer);
	timer = setTimeout(() => {
		loading.value = false;
		data.value = [...aphorisms].sort(() => Math.random() - 0.5).slice(0, pageSize);
		totalData.value = 64;
	}, 2000);
};

const changePageFunc = (page: number) => {
	currentPage.value = page;
	getData();
};

onMounted(() => {
	getData();
});

onBeforeUnmount(() => {
	if (timer) clearTimeout(timer);
});
</script>

<template>
	<div class="m-4 mt-24 text-lg font-bold">Basic usage</div>
	<Pagination :total="total" />

	<div class="mx-4 mt-8 text-lg font-bold">Event listening</div>
	<div class="mx-4 mb-2 text-sm">Current page: {{ current }}</div>
	<Pagination :total="total" @pre="(page) => (current = page)" @next="(page) => (current = page)" @change="(page) => (current = page)" />

	<div class="mx-4 mt-24 text-lg font-bold">Initial display omitted page</div>
	<div class="mx-4 mb-4 text-xs">Can be used to guide users</div>
	<Pagination :total="total" show-next-omit-page />

	<div class="m-4 mt-8 text-lg font-bold">Set initial page</div>
	<Pagination :total="total" :current="10" />

	<div class="mx-4 mt-8 text-lg font-bold">Max display 11 pages</div>
	<div class="mx-4 mb-4 text-xs">Display more pages but the page number is small</div>
	<Pagination :max-show-page="11" :total="total" />

	<div class="mx-4 mt-8 text-lg font-bold">Max display 5 pages</div>
	<div class="mx-4 mb-4 text-xs">Suitable for scenes with a small paging area</div>
	<div class="flex items-center">
		<div class="px-4">This is my territory</div>
		<div class="flex-1">
			<Pagination :max-show-page="5" :total="total" />
		</div>
	</div>

	<div class="m-4 mt-8 text-lg font-bold">No data</div>
	<Pagination :total="0" />

	<div class="m-4 mt-8 text-lg font-bold">Only one page</div>
	<Pagination :total="8" />

	<div class="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
	<div class="mx-4 mb-4 text-xs">No omitted page</div>
	<Pagination :total="70" />

	<div class="mx-4 mt-8 text-lg font-bold">Total pages are less than the maximum display pages</div>
	<div class="mx-4 mb-4 text-xs">No omitted page</div>
	<Pagination :total="90" :max-show-page="7" />

	<div class="mx-4 mt-8 text-lg font-bold">Total pages are many</div>
	<div class="mx-4 mb-4 text-xs">Will exist two omitted pages</div>
	<Pagination :total="total" />

	<div class="m-4 mt-8 text-lg font-bold">Each page is only 3 items</div>
	<Pagination :total="50" :page-size="3" />

	<div class="m-4 mt-8 text-lg font-bold">Highlighted page is border</div>
	<Pagination :total="total" type="border" />

	<div class="m-4 mt-8 text-lg font-bold">Highlighted page is block</div>
	<Pagination :total="total" type="block" />

	<div class="m-4 mt-8 text-lg font-bold">Increase the radius of the highlighted page</div>
	<Pagination :total="total" type="block" radius="xl" />

	<div class="m-4 mt-8 text-lg font-bold">Omitted page column is 2</div>
	<Pagination :total="total" :page-col="2" />

	<div class="m-4 mt-8 text-lg font-bold">Inject injClass</div>
	<Pagination :total="total" inj-class="mx-2 rounded-full shadow-md dark:shadow-white/10" />

	<div class="m-4 mt-8 text-lg font-bold">White background</div>
	<Pagination :total="total" bg="white" />

	<div class="m-4 mt-8 text-lg font-bold">Theme background</div>
	<Pagination :total="total" bg="theme" />

	<div class="m-4 mt-8 text-lg font-bold">Simulate request</div>
	<div class="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
		<div v-for="item in data" :key="item.text" :class="{ 'py-6': pageSize > 1 }">
			<div class="text-justify text-sm">{{ item.text }}</div>
			<div class="mt-1 text-right" :class="{ italic: item.fromItalic }">{{ item.from }}</div>
		</div>
		<div v-if="loading" class="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
			<div>Querying the {{ currentPage }} page data...</div>
			<Loading />
		</div>
	</div>
	<Pagination :page-size="pageSize" :total="totalData" @change="changePageFunc" />

	<div class="mx-4 mt-8 text-lg font-bold">Continuous mode</div>
	<div class="mx-4 mb-4 text-xs">Only allow clicking on the previous and next pages</div>
	<Pagination :total="total" continuous />

	<div class="pb-10" />
</template>
