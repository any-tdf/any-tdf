<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { Button, InfiniteScroll, Loading, PullRefresh } from 'vtdf/components';
import type { PullRefreshChangeDetail } from 'vtdf/types';

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

const items = ref(createItems('Activity', 1));
const refreshing = ref(false);
const dampRefreshing = ref(false);
const customRefreshing = ref(false);
const tipRefreshing = ref(false);
const boxRefreshing = ref(false);
const refreshCount = ref(0);
const changeDetail = ref<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
const dampDetail = ref<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });

// 嵌套滚动容器 Combined scroll container
const boxEl = ref<HTMLDivElement | null>(null);
const boxItems = ref(createItems('Activity', 1, 10));
const boxLoading = ref(false);
const boxFinished = ref(false);

const refreshData = () => {
	refreshing.value = true;
	window.setTimeout(() => {
		refreshCount.value += 1;
		items.value = createItems(`Refresh ${refreshCount.value}`, refreshCount.value * 10);
		refreshing.value = false;
	}, 900);
};

const refreshDamped = () => {
	dampRefreshing.value = true;
	window.setTimeout(() => (dampRefreshing.value = false), 900);
};

const refreshCustom = () => {
	customRefreshing.value = true;
	window.setTimeout(() => (customRefreshing.value = false), 900);
};

const refreshTip = () => {
	tipRefreshing.value = true;
	window.setTimeout(() => (tipRefreshing.value = false), 900);
};

const refreshBox = () => {
	boxRefreshing.value = true;
	window.setTimeout(() => {
		boxItems.value = createItems('Refreshed', boxItems.value.length + 1, 10);
		boxFinished.value = false;
		boxRefreshing.value = false;
	}, 900);
};

const loadBoxMore = () => {
	boxLoading.value = true;
	window.setTimeout(async () => {
		boxItems.value = [...boxItems.value, ...createItems('Loaded', boxItems.value.length + 1, 6)];
		if (boxItems.value.length >= 28) boxFinished.value = true;
		boxLoading.value = false;
		await nextTick();
	}, 900);
};
</script>

<template>
	<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
			<div class="text-base font-bold">Basic usage</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">
				Pull from the top of the list and release to refresh. On desktop, drag down with the mouse.
			</div>
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

		<div class="mx-4 mt-8 text-lg font-bold">Damping and max distance</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			Beyond the threshold the pull distance is damped, maxDistance caps the distance, and the content tracks the finger without animation
			lag.
		</div>
		<PullRefresh
			:refreshing="dampRefreshing"
			:threshold="60"
			:max-distance="90"
			@refresh="refreshDamped"
			@change="(detail) => (dampDetail = detail)"
		>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">Pull distance is capped at 90px</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					Distance: {{ dampDetail.distance }}px, progress: {{ dampDetail.progress.toFixed(2) }}
				</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">Custom head</div>
		<PullRefresh :refreshing="customRefreshing" :head-height="64" :threshold="72" @refresh="refreshCustom">
			<template #pullingChild="detail">
				<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
					<span class="inline-block text-base" :style="{ transform: `rotate(${Math.min(1, detail.progress) * 180}deg)` }">↓</span>
					<span>Keep pulling {{ Math.round(Math.min(1, detail.progress) * 100) }}%</span>
				</div>
			</template>
			<template #canReleaseChild>
				<div class="inline-flex items-center gap-2 font-medium text-success">
					<span class="inline-block rotate-180 text-base">↓</span>
					<span>Release to refresh</span>
				</div>
			</template>
			<template #refreshingChild>
				<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
					<Loading type="1_12" width="6" height="6" theme />
					<span>Syncing data</span>
				</div>
			</template>
			<template #successChild>
				<div class="text-success">Sync complete</div>
			</template>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">The arrow rotates with progress</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					Read status, distance, and progress from the slot detail parameter.
				</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">Success tip and duration</div>
		<PullRefresh :refreshing="tipRefreshing" success-text="Latest content recommended" :success-duration="1500" @refresh="refreshTip">
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">Success text stays for 1.5s</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					Use successText with successDuration to control how long the success state stays.
				</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">Nested scroll container</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			Pull to refresh inside the container and load more at the bottom by pointing scrollTarget at the container.
		</div>
		<div ref="boxEl" class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<PullRefresh :refreshing="boxRefreshing" :scroll-target="boxEl" @refresh="refreshBox">
				<div class="overflow-hidden">
					<div v-for="item in boxItems" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div class="font-medium">{{ item.title }}</div>
						<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.time }}</div>
					</div>
				</div>
				<InfiniteScroll :loading="boxLoading" :finished="boxFinished" :scroll-target="boxEl" :offset="100" @load="loadBoxMore" />
			</PullRefresh>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Disabled</div>
		<PullRefresh disabled>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">Refresh unavailable</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					Use this when permissions, offline state, or page rules block refresh.
				</div>
				<div class="mt-3">
					<Button disabled>Refresh disabled</Button>
				</div>
			</div>
		</PullRefresh>
	</div>
</template>
