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
		time: `刚刚更新 ${index + 1} 分钟前`
	}));

const items = ref(createItems('动态', 1));
const refreshing = ref(false);
const customRefreshing = ref(false);
const changeDetail = ref<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
const refreshCount = ref(0);

const refreshData = () => {
	refreshing.value = true;
	window.setTimeout(() => {
		refreshCount.value += 1;
		items.value = createItems(`刷新 ${refreshCount.value}`, refreshCount.value * 10);
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
			<div class="text-base font-bold">基础用法</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">下拉列表顶部后释放，触发明确的数据刷新。</div>
		</div>
		<PullRefresh
			:refreshing="refreshing"
			success-text="刷新完成"
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
			当前状态：{{ changeDetail.status }}，进度：{{ changeDetail.progress.toFixed(2) }}
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">自定义头部</div>
		<PullRefresh :refreshing="customRefreshing" :head-height="64" :threshold="72" @refresh="refreshCustom">
			<template #pullingChild="detail">
				<div class="text-primary dark:text-dark">继续下拉 {{ Math.round(detail.progress * 100) }}%</div>
			</template>
			<template #canReleaseChild>
				<div class="font-medium text-success">释放刷新</div>
			</template>
			<template #refreshingChild>
				<div class="text-primary dark:text-dark">正在同步数据</div>
			</template>
			<template #successChild>
				<div class="text-success">同步完成</div>
			</template>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">自定义状态内容</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">可以通过具名 slot 根据状态展示不同内容。</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">禁用状态</div>
		<PullRefresh disabled>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">当前不可刷新</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">用于权限、离线或当前页面不允许刷新时。</div>
				<div class="mt-3">
					<Button disabled>刷新不可用</Button>
				</div>
			</div>
		</PullRefresh>
	</div>
</template>
