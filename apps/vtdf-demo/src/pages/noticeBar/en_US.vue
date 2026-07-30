<script setup lang="ts">
import { ref } from 'vue';
import { NoticeBar, Toast } from 'vtdf';

const textList = ['1. This is the first announcement!', '2. This is the second notice!'];
const textLongList = [
	'1. This message long, long, long, long, long, long, long, long, long, long, long, long, long!',
	'2. This is the second notice!'
];
const visible = ref(false);
</script>

<template>
	<div class="m-4 mt-8 text-lg font-bold">Basic usage</div>
	<NoticeBar :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">The announcements are short and do not scroll</div>
	<NoticeBar :text-list="['1. Short notice!', '2. Short notice!']" />

	<div class="m-4 mt-8 text-lg font-bold">Set notification spacing</div>
	<NoticeBar :space="200" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Set rolling speed</div>
	<NoticeBar :speed="100" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Right arrow (listen for click events)</div>
	<NoticeBar right-icon="arrow" :text-list="textList" @click-right="() => (visible = true)" />
	<Toast v-model:visible="visible" message="Click the right arrow!" />

	<div class="m-4 mt-8 text-lg font-bold">No content on the right</div>
	<NoticeBar :right-icon="null" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Nothing on the left</div>
	<NoticeBar :left-icon="null" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Custom left</div>
	<NoticeBar :left-icon="{ name: 'ri-notification-2-line', size: 16, y: -1 }" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :left-icon="{ name: 'ri-wireless-charging-line', size: 16, y: -1 }" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :text-list="textList">
		<template #leftChild>🥳</template>
	</NoticeBar>

	<div class="m-4 mt-8 text-lg font-bold">Custom right</div>
	<NoticeBar :text-list="textList">
		<template #rightChild>🥳</template>
	</NoticeBar>

	<div class="m-4 mt-8 text-lg font-bold">Vertical rolling</div>
	<NoticeBar vertical :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Scroll transition to 1 second</div>
	<NoticeBar vertical :duration="1000" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">The scrolling interval is 8 seconds</div>
	<NoticeBar vertical :interval="8" :text-list="textList" />

	<div class="m-4 mt-8 text-lg font-bold">Excessively long text</div>
	<NoticeBar vertical :text-list="textLongList" />

	<div class="m-4 mt-8 text-lg font-bold">Single bar does not roll</div>
	<NoticeBar vertical :text-list="[textLongList[0]]" />

	<div class="m-4 mt-8 text-lg font-bold">Custom style</div>
	<NoticeBar inj-class="!text-error !bg-error/10" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar :left-icon="{ name: 'ri-check-line', size: 16, y: -1 }" inj-class="!text-success !bg-success/10" :text-list="textList" />
	<div class="my-4" />
	<NoticeBar inj-class="!text-blue !bg-purple/10" :text-list="textList" />
	<div class="pb-8" />
</template>
