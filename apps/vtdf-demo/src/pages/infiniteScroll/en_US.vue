<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { Button, InfiniteScroll, Loading } from 'vtdf/components';

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
		items.value = [...items.value, ...createItems(items.value.length + 1, 8)];
		if (items.value.length >= 36) finished.value = true;
		loading.value = false;
	}, 900);
};

// 自定义状态内容 Custom status content
const customItems = ref(createItems(101, 8));
const customLoading = ref(false);
const customFinished = ref(false);
const customError = ref(false);
const customFailedOnce = ref(false);

const loadCustomMore = (isRetry: boolean) => {
	customLoading.value = true;
	customError.value = false;
	window.setTimeout(() => {
		if (!customFailedOnce.value && !isRetry && customItems.value.length >= 16) {
			customFailedOnce.value = true;
			customLoading.value = false;
			customError.value = true;
			return;
		}
		customItems.value = [...customItems.value, ...createItems(customItems.value.length + 1, 4)];
		if (customItems.value.length >= 28) customFinished.value = true;
		customLoading.value = false;
	}, 900);
};

// 嵌套滚动容器 Nested scroll container
const boxEl = ref<HTMLDivElement | null>(null);
const boxItems = ref(createItems(201, 10));
const boxLoading = ref(false);
const boxFinished = ref(false);

const loadBoxMore = () => {
	boxLoading.value = true;
	window.setTimeout(() => {
		boxItems.value = [...boxItems.value, ...createItems(boxItems.value.length + 1, 6)];
		if (boxItems.value.length >= 30) boxFinished.value = true;
		boxLoading.value = false;
	}, 900);
};

// 顶部加载 Load older at the top
const upBoxEl = ref<HTMLDivElement | null>(null);
const upItems = ref(createItems(301, 10));
const upLoading = ref(false);
const upFinished = ref(false);

const loadUpMore = () => {
	upLoading.value = true;
	window.setTimeout(async () => {
		upItems.value = [...createItems(upItems.value[0].id - 6, 6), ...upItems.value];
		if (upItems.value.length >= 28) upFinished.value = true;
		upLoading.value = false;
		await nextTick();
		// 前置数据后保持阅读位置，避免停留在顶部立即再次触发
		// Keep the reading position after prepending so it does not retrigger immediately
		if (upBoxEl.value) upBoxEl.value.scrollTop = 120;
	}, 900);
};

// 手动检测 Manual check
const manualItems = ref(createItems(401, 16));
const manualLoading = ref(false);
const manualFinished = ref(false);
const manualRef = ref<{ check: () => void } | null>(null);

const loadManualMore = () => {
	manualLoading.value = true;
	window.setTimeout(() => {
		manualItems.value = [...manualItems.value, ...createItems(manualItems.value.length + 1, 6)];
		if (manualItems.value.length >= 40) manualFinished.value = true;
		manualLoading.value = false;
	}, 900);
};

const removeAndCheck = async () => {
	manualItems.value = manualItems.value.slice(6);
	manualFinished.value = false;
	await nextTick();
	manualRef.value?.check();
};
</script>

<template>
	<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
			<div class="text-base font-bold">Basic usage</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">
				Loading is triggered near the bottom, while loading and finished are controlled externally.
			</div>
			<div class="mt-3">
				<Button size="auto" injClass="px-4" @click="failNext = true">Fail next load</Button>
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

		<div class="mx-4 mt-8 text-lg font-bold">Custom status content</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			The slot detail parameter provides status and retry, so error content can trigger a retry directly.
		</div>
		<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<div v-for="item in customItems" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{{ item.title }}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.desc }}</div>
			</div>
		</div>
		<InfiniteScroll :loading="customLoading" :finished="customFinished" :error="customError" @load="loadCustomMore">
			<template #loadingChild>
				<div class="inline-flex min-h-12 items-center gap-2 text-primary dark:text-dark">
					<Loading type="1_12" width="6" height="6" theme />
					<span>Loading hard...</span>
				</div>
			</template>
			<template #finishedChild>
				<div class="inline-flex min-h-12 items-center text-text-primary/40 dark:text-text-dark/40">— You have reached the end —</div>
			</template>
			<template #errorChild="{ retry }">
				<div class="inline-flex min-h-12 items-center gap-3">
					<span class="text-error">Network error, failed to load</span>
					<Button size="auto" injClass="px-4" @click="retry">Retry</Button>
				</div>
			</template>
		</InfiniteScroll>

		<div class="mx-4 mt-8 text-lg font-bold">Nested scroll container</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			Point scrollTarget at the container so loading triggers near its bottom.
		</div>
		<div ref="boxEl" class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<div v-for="item in boxItems" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{{ item.title }}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.desc }}</div>
			</div>
			<InfiniteScroll :loading="boxLoading" :finished="boxFinished" :scroll-target="boxEl" :offset="100" @load="loadBoxMore" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Load at the top</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			With direction set to up, older data loads near the top, which fits chat history scenarios.
		</div>
		<div ref="upBoxEl" class="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<InfiniteScroll
				:loading="upLoading"
				:finished="upFinished"
				:scroll-target="upBoxEl"
				direction="up"
				:offset="60"
				:immediate-check="false"
				@load="loadUpMore"
			/>
			<div v-for="item in upItems" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{{ item.title }}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.desc }}</div>
			</div>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Manual check</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			After data or container size changes, call the exposed check method to detect actively.
		</div>
		<div class="mx-4 mt-3">
			<Button size="auto" injClass="px-4" @click="removeAndCheck">Remove first 6 and check</Button>
		</div>
		<div class="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
			<div v-for="item in manualItems" :key="item.id" class="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
				<div class="font-medium">{{ item.title }}</div>
				<div class="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{{ item.desc }}</div>
			</div>
		</div>
		<InfiniteScroll ref="manualRef" :loading="manualLoading" :finished="manualFinished" :immediate-check="false" @load="loadManualMore" />
	</div>
</template>
