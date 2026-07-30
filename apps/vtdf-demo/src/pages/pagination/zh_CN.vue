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
	<div class="m-4 mt-24 text-lg font-bold">基础用法</div>
	<Pagination :total="total" />

	<div class="mx-4 mt-8 text-lg font-bold">事件监听</div>
	<div class="mx-4 mb-2 text-sm">当前页码：{{ current }}</div>
	<Pagination :total="total" @pre="(page) => (current = page)" @next="(page) => (current = page)" @change="(page) => (current = page)" />

	<div class="mx-4 mt-24 text-lg font-bold">初始展示省略页码</div>
	<div class="mx-4 mb-4 text-xs">可用于引导用户</div>
	<Pagination :total="total" show-next-omit-page />

	<div class="m-4 mt-8 text-lg font-bold">设置初始页</div>
	<Pagination :total="total" :current="10" />

	<div class="mx-4 mt-8 text-lg font-bold">最大显示 11 页</div>
	<div class="mx-4 mb-4 text-xs">同时显示较多页但页码较小</div>
	<Pagination :max-show-page="11" :total="total" />

	<div class="mx-4 mt-8 text-lg font-bold">最大显示 5 页</div>
	<div class="mx-4 mb-4 text-xs">适合分页区域较小的场景</div>
	<div class="flex items-center">
		<div class="px-4">这是我的地盘</div>
		<div class="flex-1">
			<Pagination :max-show-page="5" :total="total" />
		</div>
	</div>

	<div class="m-4 mt-8 text-lg font-bold">无数据</div>
	<Pagination :total="0" />

	<div class="m-4 mt-8 text-lg font-bold">仅一页</div>
	<Pagination :total="8" />

	<div class="mx-4 mt-8 text-lg font-bold">总页数未超过最大显示页数</div>
	<div class="mx-4 mb-4 text-xs">不会存在省略页码</div>
	<Pagination :total="70" />

	<div class="mx-4 mt-8 text-lg font-bold">总页数超过最大显示页数但不算多</div>
	<div class="mx-4 mb-4 text-xs">不会同时存在前后两个省略页码</div>
	<Pagination :total="90" :max-show-page="7" />

	<div class="mx-4 mt-8 text-lg font-bold">总页数很多</div>
	<div class="mx-4 mb-4 text-xs">会同时存在前后两个省略页码</div>
	<Pagination :total="total" />

	<div class="m-4 mt-8 text-lg font-bold">每页仅 3 项</div>
	<Pagination :total="50" :page-size="3" />

	<div class="m-4 mt-8 text-lg font-bold">高亮页码为边框</div>
	<Pagination :total="total" type="border" />

	<div class="m-4 mt-8 text-lg font-bold">高亮页码为块状</div>
	<Pagination :total="total" type="block" />

	<div class="m-4 mt-8 text-lg font-bold">增加高亮页码圆角</div>
	<Pagination :total="total" type="block" radius="xl" />

	<div class="m-4 mt-8 text-lg font-bold">省略页码列数为 2</div>
	<Pagination :total="total" :page-col="2" />

	<div class="m-4 mt-8 text-lg font-bold">白色背景</div>
	<Pagination :total="total" bg="white" />

	<div class="m-4 mt-8 text-lg font-bold">主题色背景</div>
	<Pagination :total="total" bg="theme" />

	<div class="m-4 mt-8 text-lg font-bold">注入 injClass</div>
	<Pagination :total="total" inj-class="mx-2 rounded-full shadow-md dark:shadow-white/10" />

	<div class="m-4 mt-8 text-lg font-bold">模拟请求</div>
	<div class="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
		<div v-for="item in data" :key="item.text" :class="{ 'py-6': pageSize > 1 }">
			<div class="text-justify text-sm">{{ item.text }}</div>
			<div class="mt-1 text-right" :class="{ italic: item.fromItalic }">{{ item.from }}</div>
		</div>
		<div v-if="loading" class="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
			<div>查询第 {{ currentPage }} 页数据……</div>
			<Loading />
		</div>
	</div>
	<Pagination :page-size="pageSize" :total="totalData" @change="changePageFunc" />

	<div class="mx-4 mt-8 text-lg font-bold">连续模式</div>
	<div class="mx-4 mb-4 text-xs">只允许点击上下页</div>
	<Pagination :total="total" continuous />

	<div class="pb-10" />
</template>
