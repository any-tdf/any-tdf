<script lang="ts">
	import { onMount } from 'svelte';
	import { Pagination, Loading } from 'stdf';
	import { aphorisms } from '@any-tdf/site-common/data';

	// 总数，一般是后端接口返回
	const total = 200;

	// 当前页码，演示事件监听
	let current = $state(1);

	// 模拟请求数据
	let data: { text: string; from: string; fromItalic?: boolean }[] = $state([]);
	let currentPage = $state(1);
	let pageSize = 4;
	let totalData = $state(0);
	let loading = $state(false);
	const getData = () => {
		loading = true;
		// 使用 setTimeout 模拟请求
		setTimeout(() => {
			loading = false;
			//从 aphorisms 随机取出 pageSize 条数据
			data = aphorisms.sort(() => Math.random() - 0.5).slice(0, pageSize);
			totalData = 64;
		}, 2000);
	};
	const changePageFunc = (c: number) => {
		currentPage = c;
		getData();
	};
	// 初始请求第一页
	onMount(() => {
		getData();
	});
</script>

<div class="m-4 mt-24 text-lg font-bold">基础用法</div>
<Pagination {total} />

<div class="mx-4 mt-8 text-lg font-bold">事件监听</div>
<div class="mx-4 mb-2 text-sm">当前页码：{current}</div>
<Pagination {total} onpre={(c) => (current = c)} onnext={(c) => (current = c)} onchange={(c) => (current = c)} />

<div class="mx-4 mt-24 text-lg font-bold">初始展示省略页码</div>
<div class="mx-4 mb-4 text-xs">可用于引导用户</div>
<Pagination {total} showNextOmitPage />

<div class="m-4 mt-8 text-lg font-bold">设置初始页</div>
<Pagination {total} current={10} />

<div class="mx-4 mt-8 text-lg font-bold">最大显示 11 页</div>
<div class="mx-4 mb-4 text-xs">同时显示较多页但页码较小</div>
<Pagination maxShowPage={11} {total} />

<div class="mx-4 mt-8 text-lg font-bold">最大显示 5 页</div>
<div class="mx-4 mb-4 text-xs">适合分页区域较小的场景</div>
<div class="flex items-center">
	<div class="px-4">这是我的地盘</div>
	<div class="flex-1">
		<Pagination maxShowPage={5} {total} />
	</div>
</div>

<div class="m-4 mt-8 text-lg font-bold">无数据</div>
<Pagination total={0} />

<div class="m-4 mt-8 text-lg font-bold">仅一页</div>
<Pagination total={8} />

<div class="mx-4 mt-8 text-lg font-bold">总页数未超过最大显示页数</div>
<div class="mx-4 mb-4 text-xs">不会存在省略页码</div>
<Pagination total={70} />

<div class="mx-4 mt-8 text-lg font-bold">总页数超过最大显示页数但不算多</div>
<div class="mx-4 mb-4 text-xs">不会同时存在前后两个省略页码</div>
<Pagination total={90} maxShowPage={7} />

<div class="mx-4 mt-8 text-lg font-bold">总页数很多</div>
<div class="mx-4 mb-4 text-xs">会同时存在前后两个省略页码</div>
<Pagination {total} />

<div class="m-4 mt-8 text-lg font-bold">每页仅 3 项</div>
<Pagination total={50} pageSize={3} />

<div class="m-4 mt-8 text-lg font-bold">高亮页码为边框</div>
<Pagination {total} type="border" />

<div class="m-4 mt-8 text-lg font-bold">高亮页码为块状</div>
<Pagination {total} type="block" />

<div class="m-4 mt-8 text-lg font-bold">增加高亮页码圆角</div>
<Pagination {total} type="block" radius="xl" />

<div class="m-4 mt-8 text-lg font-bold">省略页码列数为 2</div>
<Pagination {total} pageCol={2} />

<div class="m-4 mt-8 text-lg font-bold">白色背景</div>
<Pagination {total} bg="white" />

<div class="m-4 mt-8 text-lg font-bold">主题色背景</div>
<Pagination {total} bg="theme" />

<div class="m-4 mt-8 text-lg font-bold">注入 injClass</div>
<Pagination {total} injClass="mx-2 rounded-full shadow-md dark:shadow-white/10" />

<div class="m-4 mt-8 text-lg font-bold">模拟请求</div>
<div class="relative min-h-80 divide-y divide-black/5 px-4 py-8 dark:divide-white/5">
	{#each data as item}
		<div class:py-6={pageSize > 1}>
			<div class="text-justify text-sm">{item.text}</div>
			<div class="mt-1 text-right" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
	{#if loading}
		<div class="absolute inset-0 flex h-full w-full flex-col justify-center gap-8 text-center backdrop-blur-sm">
			<div>查询第 {currentPage} 页数据...</div>
			<Loading />
		</div>
	{/if}
</div>
<Pagination {pageSize} total={totalData} onchange={changePageFunc} />

<div class="mx-4 mt-8 text-lg font-bold">连续模式</div>
<div class="mx-4 mb-4 text-xs">只允许点击上下页</div>
<Pagination {total} continuous />

<div class="pb-10"></div>
