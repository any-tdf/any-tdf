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
		time: `刚刚更新 ${index + 1} 分钟前`
	}));

const items = ref(createItems('动态', 1));
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
const boxItems = ref(createItems('动态', 1, 10));
const boxLoading = ref(false);
const boxFinished = ref(false);

const refreshData = () => {
	refreshing.value = true;
	window.setTimeout(() => {
		refreshCount.value += 1;
		items.value = createItems(`刷新 ${refreshCount.value}`, refreshCount.value * 10);
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
		boxItems.value = createItems('刷新', boxItems.value.length + 1, 10);
		boxFinished.value = false;
		boxRefreshing.value = false;
	}, 900);
};

const loadBoxMore = () => {
	boxLoading.value = true;
	window.setTimeout(async () => {
		boxItems.value = [...boxItems.value, ...createItems('加载', boxItems.value.length + 1, 6)];
		if (boxItems.value.length >= 28) boxFinished.value = true;
		boxLoading.value = false;
		await nextTick();
	}, 900);
};
</script>

<template>
	<div class="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
		<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
			<div class="text-base font-bold">基础用法</div>
			<div class="mt-1 text-text-primary/60 dark:text-text-dark/60">下拉列表顶部后释放，触发明确的数据刷新，桌面端可按住鼠标向下拖拽。</div>
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

		<div class="mx-4 mt-8 text-lg font-bold">阻尼与最大距离</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			超过 threshold 后下拉距离会按阻尼曲线衰减，maxDistance 限制最大下拉距离，跟随手指过程无动画延迟。
		</div>
		<PullRefresh
			:refreshing="dampRefreshing"
			:threshold="60"
			:max-distance="90"
			@refresh="refreshDamped"
			@change="(detail) => (dampDetail = detail)"
		>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">下拉距离被限制在 90px 以内</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					当前距离：{{ dampDetail.distance }}px，进度：{{ dampDetail.progress.toFixed(2) }}
				</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">自定义头部</div>
		<PullRefresh :refreshing="customRefreshing" :head-height="64" :threshold="72" @refresh="refreshCustom">
			<template #pullingChild="detail">
				<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
					<span class="inline-block text-base" :style="{ transform: `rotate(${Math.min(1, detail.progress) * 180}deg)` }">↓</span>
					<span>继续下拉 {{ Math.round(Math.min(1, detail.progress) * 100) }}%</span>
				</div>
			</template>
			<template #canReleaseChild>
				<div class="inline-flex items-center gap-2 font-medium text-success">
					<span class="inline-block rotate-180 text-base">↓</span>
					<span>释放刷新</span>
				</div>
			</template>
			<template #refreshingChild>
				<div class="inline-flex items-center gap-2 text-primary dark:text-dark">
					<Loading type="1_12" width="6" height="6" theme />
					<span>正在同步数据</span>
				</div>
			</template>
			<template #successChild>
				<div class="text-success">同步完成</div>
			</template>
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">箭头随进度旋转</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
					通过插槽的 detail 参数读取 status、distance 和 progress。
				</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">成功提示与时长</div>
		<PullRefresh :refreshing="tipRefreshing" success-text="已为你推荐最新内容" :success-duration="1500" @refresh="refreshTip">
			<div class="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
				<div class="font-medium">成功文案展示 1.5 秒</div>
				<div class="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">successText 配合 successDuration 控制成功态停留时长。</div>
			</div>
		</PullRefresh>

		<div class="mx-4 mt-8 text-lg font-bold">嵌套滚动容器</div>
		<div class="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
			容器内下拉刷新，滚动到底部加载更多，通过 scrollTarget 指定滚动容器。
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
