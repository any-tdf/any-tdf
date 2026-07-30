<script setup lang="ts">
import { ref } from 'vue';
import { NoticeBar, Toast } from 'vtdf';

const textList = ['1. 这是第一条通告内容！', '2. 这是第二条通告内容！'];
const textLongList = ['1. 这条通告超长长长长长长长长长长长长长长长长长长长长长！', '2. 这是第二条通告内容！'];
const visible = ref(false);
</script>

<template>
	<div class="m-4 mt-8 text-lg font-bold">基础用法</div>
	<NoticeBar :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">通告内容较短不滚动</div>
	<NoticeBar :text-list="['1. 短通告！', '2. 短通告！']" />

	<div class="m-4 mt-8 text-lg font-bold">设定通告间距</div>
	<NoticeBar :space="200" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">设定滚动速度</div>
	<NoticeBar :speed="100" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">右侧箭头（监听点击事件）</div>
	<NoticeBar right-icon="arrow" :text-list="textList" @click-right="() => (visible = true)" />
	<Toast v-model:visible="visible" message="点击了右侧箭头！" />

	<div class="m-4 mt-8 text-lg font-bold">右侧无内容</div>
	<NoticeBar :right-icon="null" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">左侧无内容</div>
	<NoticeBar :left-icon="null" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">自定义左侧</div>
	<NoticeBar :left-icon="{ name: 'ri-notification-2-line', size: 16, y: -1 }" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :left-icon="{ name: 'ri-wireless-charging-line', size: 16, y: -1 }" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :text-list="textList">
		<template #leftChild>🥳</template>
	</NoticeBar>

	<div class="m-4 mt-8 text-lg font-bold">自定义右侧</div>
	<NoticeBar :text-list="textList">
		<template #rightChild>🥳</template>
	</NoticeBar>

	<div class="m-4 mt-8 text-lg font-bold">垂直滚动</div>
	<NoticeBar vertical :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">滚动过渡为 1 秒</div>
	<NoticeBar vertical :duration="1000" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">滚动间隔为 8 秒</div>
	<NoticeBar vertical :interval="8" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">文字过长</div>
	<NoticeBar vertical :text-list="textLongList" />

	<div class="m-4 mt-8 text-lg font-bold">单条不滚动</div>
	<NoticeBar vertical :text-list="[textLongList[0]]" />

	<div class="m-4 mt-8 text-lg font-bold">自定义样式</div>
	<NoticeBar inj-class="!text-error !bg-error/10" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :left-icon="{ name: 'ri-check-line', size: 16, y: -1 }" inj-class="!text-success !bg-success/10" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar inj-class="!text-blue !bg-purple/10" :text-list="textList" />
	<div class="pb-8" />
</template>
