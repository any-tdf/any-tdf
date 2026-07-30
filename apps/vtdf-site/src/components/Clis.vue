<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import codeGroupSvgData from '../utils/code-group-svg-data';
import { appState } from '../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');

// 将 codeGroupSvgData 随机打乱
const randomCodeGroupSvgData = [...codeGroupSvgData].sort(() => Math.random() - 0.5);

const showCli = ref(0);
let intervalTime: ReturnType<typeof setInterval>;
const isClicked = ref(false);
const isHover = ref(false);
const textCli = ref('_');
let times: ReturnType<typeof setInterval>;

// 写一个函数，模拟打字效果，传入一段文字，返回一个打字效果的函数
const typeWriter = (text: string, speed: number = 150) => {
	let number = 0;
	times = setInterval(() => {
		number++;
		if (number >= text.length) {
			number = 0;
			textCli.value = text;
			clearInterval(times);
		} else {
			textCli.value = text.slice(0, number) + '_';
		}
	}, speed);
};

// 动画
const animationFun = () => {
	typeWriter(randomCodeGroupSvgData[showCli.value].cli);
	// 每 6 秒切换一次
	intervalTime = setInterval(() => {
		if (showCli.value === codeGroupSvgData.length - 1) {
			showCli.value = 0;
		} else {
			showCli.value++;
		}
		textCli.value = '_';
		setTimeout(() => {
			typeWriter(randomCodeGroupSvgData[showCli.value].cli);
		}, 300);
	}, 6000);
};

const handleVisibilityChange = () => {
	if (document.visibilityState === 'visible') {
		animationFun();
	} else {
		clearInterval(intervalTime);
		clearInterval(times);
	}
};

const copyCli = async () => {
	await navigator.clipboard.writeText(randomCodeGroupSvgData[showCli.value].cli);
	isClicked.value = true;
	setTimeout(() => {
		isClicked.value = false;
	}, 2000);
};

onMounted(() => {
	animationFun();
	window.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
	clearInterval(intervalTime);
	clearInterval(times);
	window.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
	<div class="inline-flex justify-center">
		<div class="bg-primary/5 dark:bg-dark/10 rounded-l-full text-xs">
			<div class="mr-2 flex h-7 items-center gap-1 pl-3" v-html="randomCodeGroupSvgData[showCli].svg"></div>
		</div>
		<button
			type="button"
			class="bg-primary/5 dark:bg-dark/10 relative inline-flex cursor-copy items-center justify-center rounded-r-full py-1 pr-3"
			@mouseenter="isHover = true"
			@mouseleave="isHover = false"
			@click="copyCli"
		>
			<code class="text-primary dark:text-dark text-sm opacity-80">{{ textCli }}</code>
			<div
				class="bg-primary dark:bg-dark rounded-xs absolute -top-3 left-1/2 size-3 -translate-x-1/2 rotate-45 transition-all"
				:class="isHover ? '-translate-y-1/2 opacity-100' : '-translate-y-4 opacity-0'"
			></div>
			<div
				class="bg-primary dark:bg-dark absolute -top-8 left-1/2 -translate-x-1/2 text-nowrap rounded-sm px-2 py-1 text-xs text-white transition-all dark:text-black"
				:class="isHover ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'"
			>
				{{ isZh ? (isClicked ? '已复制' : '复制') : isClicked ? 'Copied' : 'Copy' }}
			</div>
		</button>
	</div>
</template>
