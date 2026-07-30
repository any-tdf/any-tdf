<script setup lang="ts">
import { ref } from 'vue';
import { Button, InfiniteScroll } from 'vtdf/components';

type DemoItem = {
	id: number;
	title: string;
	desc: string;
};

const createItems = (start: number, count = 10): DemoItem[] =>
	Array.from({ length: count }, (_, index) => ({
		id: start + index,
		title: `Order ${start + index}`,
		desc: `Record ${start + index} comes from the paged API.`
	}));

const items = ref(createItems(1, 12));
const loading = ref(false);
const finished = ref(false);
const error = ref(false);
const failNext = ref(false);

const loadMore = (isRetry: boolean) => {
	loading.value = true;
	error.value = false;
	window.setTimeout(() => {
		if (failNext.value && !isRetry) {
			loading.value = false;
			error.value = true;
			failNext.value = false;
			return;
		}
		const nextItems = [...items.value, ...createItems(items.value.length + 1, 8)];
		items.value = nextItems;
		if (nextItems.length >= 36) finished.value = true;
		loading.value = false;
	}, 900);
};
</script>

<template>
	<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
			<div class="text-base font-bold">Basic</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">
				Load when the scroll position is near the bottom, while loading and finished stay controlled outside.
			</div>
			<div class="mt-3">
				<Button size="sm" @click="failNext = true">Fail next load</Button>
			</div>
		</div>
		<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<div v-for="item in items" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{{ item.title }}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.desc }}</div>
			</div>
		</div>
		<InfiniteScroll
			:loading="loading"
			:finished="finished"
			:error="error"
			:loading-icon="{ type: '1_17', width: '8', height: '4' }"
			@load="loadMore"
		/>
	</div>
</template>
