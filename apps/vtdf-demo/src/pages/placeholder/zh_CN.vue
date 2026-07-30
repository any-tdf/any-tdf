<script setup lang="ts">
import { Grid, Grids, Placeholder } from 'vtdf/components';
</script>

<template>
	<div class="m-4 text-lg font-bold">基础用法</div>
	<Placeholder>基础用法</Placeholder>

	<div class="m-4 text-lg font-bold">设置高度</div>
	<Placeholder height="32">高为 32</Placeholder>

	<div class="m-4 text-lg font-bold">不同圆角</div>
	<div class="flex flex-col space-y-4">
		<Placeholder radius="none">无圆角</Placeholder>
		<Placeholder radius="xl">XL 圆角</Placeholder>
		<Placeholder radius="4xl">全圆角</Placeholder>
	</div>

	<div class="m-4 text-lg font-bold">有阴影</div>
	<Placeholder shadow="md">阴影</Placeholder>

	<div class="m-4 text-lg font-bold">自定义 injClass</div>
	<Placeholder height="24" inj-class="vtdf-demo-gradient-primary !text-white">渐变背景</Placeholder>

	<div class="m-4 text-lg font-bold">与 Grids 结合</div>
	<Grids>
		<Grid row="3" col="2"><Placeholder>3﹡2</Placeholder></Grid>
		<Grid col="3"><Placeholder>1﹡3</Placeholder></Grid>
		<Grid row="3"><Placeholder>3﹡1</Placeholder></Grid>
		<Grid row="2" col="2"><Placeholder>2﹡2</Placeholder></Grid>
		<Grid><Placeholder>1﹡1</Placeholder></Grid>
		<Grid><Placeholder>1﹡1</Placeholder></Grid>
	</Grids>
	<div class="pb-4" />
</template>
