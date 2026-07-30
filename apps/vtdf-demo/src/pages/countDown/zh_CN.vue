<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, CountDown, Toast } from 'vtdf';
import type { TimeData } from 'vtdf/types';

type CountDownExpose = {
	start: () => void;
	pause: () => void;
	reset: (time?: number) => void;
};

const countDownRef = ref<CountDownExpose | null>(null);
const countDownRef2 = ref<CountDownExpose | null>(null);
const showToast = ref(false);
const currentTime = ref({ hours: 1, minutes: 29, seconds: 59 });
const prevTime = ref({ hours: 1, minutes: 29, seconds: 59 });
const flipState = ref({ hours: false, minutes: false, seconds: false });

const pad = (value: number, length = 2) => String(value).padStart(length, '0');

const handleTimeChange = (data: TimeData) => {
	prevTime.value = { ...currentTime.value };
	currentTime.value = { hours: data.hours, minutes: data.minutes, seconds: data.seconds };

	if (data.seconds !== prevTime.value.seconds) {
		flipState.value.seconds = true;
		setTimeout(() => (flipState.value.seconds = false), 600);
	}
	if (data.minutes !== prevTime.value.minutes) {
		flipState.value.minutes = true;
		setTimeout(() => (flipState.value.minutes = false), 600);
	}
	if (data.hours !== prevTime.value.hours) {
		flipState.value.hours = true;
		setTimeout(() => (flipState.value.hours = false), 600);
	}
};

const clockValues = computed(() => [
	{ current: currentTime.value.hours, prev: prevTime.value.hours, key: 'hours', flip: flipState.value.hours },
	{ current: currentTime.value.minutes, prev: prevTime.value.minutes, key: 'minutes', flip: flipState.value.minutes },
	{ current: currentTime.value.seconds, prev: prevTime.value.seconds, key: 'seconds', flip: flipState.value.seconds }
]);
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">倒计时</span>
			<CountDown :time="30 * 1000" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">自定义格式</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">时分秒</span>
			<CountDown :time="30 * 60 * 60 * 1000" format="HH:mm:ss" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">带天数</span>
			<CountDown :time="2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000" format="DD 天 HH:mm:ss" />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">仅秒数</span>
			<CountDown :time="90 * 1000" format="ss 秒" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">毫秒级渲染</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">毫秒</span>
			<CountDown :time="30 * 1000" format="ss:SSS" millisecond />
		</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">完整毫秒</span>
			<CountDown :time="30 * 1000" format="HH:mm:ss:SSS" millisecond />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">手动控制</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">倒计时</span>
			<CountDown ref="countDownRef" :time="60 * 1000" :auto-start="false" format="mm:ss" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="() => countDownRef?.start()">开始</Button>
			<Button size="sm" fill="line" @click="() => countDownRef?.pause()">暂停</Button>
			<Button size="sm" fill="line" @click="() => countDownRef?.reset()">重置</Button>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">自定义样式</div>
		<div class="p-4">
			<CountDown :time="24 * 60 * 60 * 1000">
				<template #default="{ hours, minutes, seconds }">
					<div class="flex items-center gap-1">
						<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">{{ pad(hours) }}</span>
						<span class="text-primary dark:text-dark">:</span>
						<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">{{ pad(minutes) }}</span>
						<span class="text-primary dark:text-dark">:</span>
						<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">{{ pad(seconds) }}</span>
					</div>
				</template>
			</CountDown>
		</div>
		<div class="p-4">
			<CountDown :time="2 * 60 * 60 * 1000 + 30 * 60 * 1000">
				<template #default="{ hours, minutes, seconds }">
					<div class="flex items-center gap-2">
						<div class="flex flex-col items-center">
							<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">{{
								pad(hours)
							}}</span>
							<span class="mt-1 text-xs text-gray-500">时</span>
						</div>
						<span class="text-xl font-bold text-gray-400">:</span>
						<div class="flex flex-col items-center">
							<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">{{
								pad(minutes)
							}}</span>
							<span class="mt-1 text-xs text-gray-500">分</span>
						</div>
						<span class="text-xl font-bold text-gray-400">:</span>
						<div class="flex flex-col items-center">
							<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">{{
								pad(seconds)
							}}</span>
							<span class="mt-1 text-xs text-gray-500">秒</span>
						</div>
					</div>
				</template>
			</CountDown>
		</div>
		<div class="p-4">
			<CountDown :time="90 * 60 * 1000" @change="handleTimeChange">
				<div class="flex items-center gap-4">
					<template v-for="(item, index) in clockValues" :key="item.key">
						<div class="flip-clock relative h-18 w-16">
							<div class="absolute left-0 top-0 h-9 w-full overflow-hidden rounded-t-lg vtdf-demo-flip-top">
								<div class="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
									{{ pad(item.current) }}
								</div>
							</div>
							<div class="absolute bottom-0 left-0 h-9 w-full overflow-hidden rounded-b-lg vtdf-demo-flip-bottom">
								<div class="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
									{{ pad(item.flip ? item.prev : item.current) }}
								</div>
							</div>
							<template v-if="item.flip">
								<div class="flip-down absolute left-0 top-0 z-10 h-9 w-full overflow-hidden rounded-t-lg vtdf-demo-flip-top">
									<div class="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
										{{ pad(item.prev) }}
									</div>
								</div>
								<div class="flip-up absolute bottom-0 left-0 z-10 h-9 w-full overflow-hidden rounded-b-lg vtdf-demo-flip-bottom">
									<div class="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
										{{ pad(item.current) }}
									</div>
								</div>
							</template>
							<div class="absolute left-0 right-0 top-1/2 z-20 h-0.5 -translate-y-1/2 bg-black" />
						</div>
						<div v-if="index < 2" class="flex flex-col gap-2.5">
							<div class="h-2 w-2 rounded-full bg-gray-600" />
							<div class="h-2 w-2 rounded-full bg-gray-600" />
						</div>
					</template>
				</div>
			</CountDown>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">带毫秒的自定义样式</div>
		<div class="p-4">
			<CountDown :time="30 * 1000" millisecond>
				<template #default="{ seconds, milliseconds }">
					<div class="flex items-center gap-1 text-lg font-bold">
						<span class="text-primary dark:text-dark">{{ pad(seconds) }}</span>
						<span class="text-gray-400">.</span>
						<span class="text-sm text-gray-500">{{ pad(milliseconds, 3) }}</span>
					</div>
				</template>
			</CountDown>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">倒计时结束回调</div>
		<div class="flex items-center justify-between p-4">
			<span class="text-gray-600 dark:text-gray-400">3 秒后结束</span>
			<CountDown ref="countDownRef2" :time="3 * 1000" :auto-start="false" @finish="() => (showToast = true)" />
		</div>
		<div class="flex gap-2 p-4">
			<Button size="sm" @click="() => countDownRef2?.start()">开始倒计时</Button>
			<Button size="sm" fill="line" @click="() => countDownRef2?.reset()">重置</Button>
		</div>
	</div>

	<Toast v-model:visible="showToast" message="倒计时结束！" />
</template>

<style>
.flip-clock {
	perspective: 300px;
}

.flip-down {
	transform-origin: bottom center;
	animation: flip-down 0.3s ease-in forwards;
}

.flip-up {
	transform: rotateX(90deg);
	transform-origin: top center;
	animation: flip-up 0.3s ease-out 0.3s forwards;
}

@keyframes flip-down {
	0% {
		transform: rotateX(0deg);
	}

	100% {
		transform: rotateX(-90deg);
	}
}

@keyframes flip-up {
	0% {
		transform: rotateX(90deg);
	}

	100% {
		transform: rotateX(0deg);
	}
}
</style>
