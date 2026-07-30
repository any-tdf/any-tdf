<script setup lang="ts">
import { ref } from 'vue';
import { Button, PullRefresh } from 'vtdf/components';
import type { PullRefreshChangeDetail } from 'vtdf/types';

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

const items = ref(createItems('Feed', 1));
const refreshing = ref(false);
const customRefreshing = ref(false);
const changeDetail = ref<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
const refreshCount = ref(0);

const refreshData = () => {
	refreshing.value = true;
	window.setTimeout(() => {
		refreshCount.value += 1;
		items.value = createItems(`Refresh ${refreshCount.value}`, refreshCount.value * 10);
		refreshing.value = false;
	}, 900);
};

const refreshCustom = () => {
	customRefreshing.value = true;
	window.setTimeout(() => {
		customRefreshing.value = false;
	}, 900);
};
</script>

<template>
	<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
			<div class="text-base font-bold">Basic</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">Pull from the top of the list and release to refresh data.</div>
		</div>
		<PullRefresh
			:refreshing="refreshing"
			success-text="Refresh complete"
			:loading-icon="{ type: '1_17', width: '8', height: '4' }"
			@refresh="refreshData"
			@change="(detail) => (changeDetail = detail)"
		>
			<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				<div v-for="item in items" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
					<div class="font-medium">{{ item.title }}</div>
					<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.time }}</div>
				</div>
			</div>
		</PullRefresh>
		<div class="mx-4 mt-3 text-xs text-text-primary/50 dark:text-text-dark/50">
			Status: {{ changeDetail.status }}, progress: {{ changeDetail.progress.toFixed(2) }}
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Custom Header</div>
		<PullRefresh :refreshing="customRefreshing" :head-height="64" :threshold="72" @refresh="refreshCustom">
			<template #pullingChild="detail">
				<div class="text-primary dark:text-dark">Keep pulling {{ Math.round(detail.progress * 100) }}%</div>
			</template>
			<template #canReleaseChild>
				<div class="font-medium text-success">Release to refresh</div>
			</template>
			<template #refreshingChild>
				<div class="text-primary dark:text-dark">Syncing data</div>
			</template>
			<template #successChild>
				<div class="text-success">Sync complete</div>
			</template>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">Custom state content</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">Use named slots to render content for each state.</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">Disabled</div>
		<PullRefresh disabled>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">Refresh is unavailable</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					Use this state when refresh is blocked by permissions, offline mode, or page state.
				</div>
				<div class="mt-3">
					<Button disabled>Refresh unavailable</Button>
				</div>
			</div>
		</PullRefresh>
	</div>
</template>
