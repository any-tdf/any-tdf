<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Cell, Icon, Popup, Slider, Tab } from 'vtdf/components';
import Aphorism from '../components/Aphorism.vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible8 = ref(false);
const visible9 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);
const visible13 = ref(false);
const visible14 = ref(false);
const visible15 = ref(false);
const visible17 = ref(false);
const visible18 = ref(false);
const visible19 = ref(false);
const visible20 = ref(false);
const easeTypes = ['cubicOut', 'backOut', 'bounceOut', 'elasticOut'] as const;
const easeLabels = easeTypes.map((text) => ({ text: text.replace('Out', '') }));
const easeTypeIndex = ref(0);
const easeType = computed(() => easeTypes[easeTypeIndex.value]);
const durationModes = ['enter', 'exit'] as const;
const durationLabels = [{ text: '进入' }, { text: '退出' }];
const durationModeIndex = ref(0);
const durationMode = computed(() => durationModes[durationModeIndex.value]);
const inDuration = ref(450);
const outDuration = ref(240);
const durationValue = computed(() => (durationMode.value === 'enter' ? inDuration.value : outDuration.value));

const handleDurationChange = (value: number) => {
	if (durationMode.value === 'enter') {
		inDuration.value = value;
		return;
	}
	outDuration.value = value;
};
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<Popup v-model:visible="visible1" />

		<Cell title="顶部位置" @click="() => (visible2 = true)" />
		<Popup v-model:visible="visible2" position="top" />

		<Cell title="左侧位置" @click="() => (visible3 = true)" />
		<Popup v-model:visible="visible3" position="left" />

		<Cell title="右侧位置" @click="() => (visible4 = true)" />
		<Popup v-model:visible="visible4" position="right" />

		<Cell title="中间位置" @click="() => (visible5 = true)" />
		<Popup v-model:visible="visible5" position="center" />

		<Cell title="顶部位置有圆角" @click="() => (visible6 = true)" />
		<Popup v-model:visible="visible6" radius="2xl" />

		<Cell title="有圆角和间距" @click="() => (visible7 = true)" />
		<Popup v-model:visible="visible7" radius-position="all" radius="3xl" px="4" py="4" />

		<Cell title="中间位置有间距和圆角" @click="() => (visible10 = true)" />
		<Popup v-model:visible="visible10" position="center" radius-position="all" radius="xl" px="8" />

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">缓动函数 （easeType: {{ easeType }}）</div>
			<Tab :labels="easeLabels" :active="easeTypeIndex" @click-tab="(value) => (easeTypeIndex = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">
				动画时长 （{{ durationMode === 'enter' ? '进入' : '退出' }}: {{ durationValue }} ms）
			</div>
			<Tab :labels="durationLabels" :active="durationModeIndex" @click-tab="(value) => (durationModeIndex = value)" />
			<div class="mt-3">
				<Slider :value="durationValue" :min-range="0" :max-range="1000" :step="50" @change="handleDurationChange" />
			</div>
		</div>

		<Cell title="自定义动画缓动与时长" @click="() => (visible11 = true)" />
		<Popup v-model:visible="visible11" :ease-type="easeType" :ease-out-type="easeType" :duration="inDuration" :out-duration="outDuration" />

		<Cell title="不同大小" @click="() => (visible8 = true)" />
		<Popup v-model:visible="visible8" :size="80" />

		<Cell title="左侧位置不同大小" @click="() => (visible9 = true)" />
		<Popup v-model:visible="visible9" :size="80" position="left" />

		<Cell title="遮罩完全透明且模糊" @click="() => (visible12 = true)" />
		<Popup
			v-model:visible="visible12"
			position="center"
			radius-position="all"
			radius="xl"
			px="8"
			:mask="{ opacity: '0', backdropBlur: 'sm' }"
		/>

		<Cell title="点击遮罩不会关闭" @click="() => (visible13 = true)" />
		<Popup v-model:visible="visible13" :mask-closable="false">
			<div class="flex h-full flex-col justify-center">
				<Button @click="() => (visible13 = false)">关闭</Button>
			</div>
		</Popup>

		<Cell title="大小自动" detail="取决于内部元素" @click="() => (visible14 = true)" />
		<Popup v-model:visible="visible14" :size="0" radius-position="all" radius="3xl" px="4" py="4" :transition-distance="353">
			<div class="w-full text-center">
				<div class="py-6 text-xl font-bold">AirPods Pro 已连接</div>
				<div class="m-auto w-1/2">
					<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
				</div>
				<div class="flex justify-around py-6 text-primary dark:text-dark">
					<div>设置</div>
					<div>音乐</div>
				</div>
			</div>
		</Popup>

		<Cell title="左侧位置自动大小" @click="() => (visible20 = true)" />
		<Popup v-model:visible="visible20" :size="0" position="left" py="48" radius-position="right" radius="2xl" :transition-distance="80">
			<div class="flex h-full flex-col justify-around text-primary dark:text-dark">
				<button class="p-6" @click="visible20 = false">首页</button>
				<button class="p-6" @click="visible20 = false">设置</button>
				<button class="p-6" @click="visible20 = false">关于</button>
			</div>
		</Popup>

		<Cell title="大小自动背景透明" @click="() => (visible17 = true)" />
		<Popup v-model:visible="visible17" position="top" :size="0" px="4" py="8" transparent :transition-distance="136">
			<div class="flex w-full justify-between rounded-full bg-black p-3 text-white">
				<div class="flex">
					<div class="h-12 w-12 overflow-hidden rounded-full">
						<img class="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
					</div>
					<div class="flex flex-col justify-end pl-4">
						<div class="text-xs text-white/40">手机</div>
						<div>胡歌</div>
					</div>
				</div>
				<div class="flex space-x-3">
					<div
						class="flex h-12 w-12 flex-col items-center justify-center rounded-full vtdf-demo-bg-danger"
						style="transform: rotate(135deg)"
					>
						<Icon name="ri-phone-fill" />
					</div>
					<div class="flex h-12 w-12 flex-col items-center justify-center rounded-full vtdf-demo-bg-success">
						<Icon name="ri-phone-fill" />
					</div>
				</div>
			</div>
		</Popup>

		<Cell title="居中位置背景透明" @click="() => (visible18 = true)" />
		<Popup v-model:visible="visible18" :size="0" position="center" transparent>
			<div class="flex flex-col justify-center">
				<div class="m-auto w-1/2">
					<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
				</div>
			</div>
		</Popup>

		<Cell title="反色遮罩" @click="() => (visible15 = true)" />
		<Popup v-model:visible="visible15" :mask="{ inverse: true }" />

		<Cell title="溢出滚动" @click="() => (visible19 = true)" />
		<Popup v-model:visible="visible19" :size="30" position="center">
			<Aphorism :num="4" />
		</Popup>
	</div>
</template>
