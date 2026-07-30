<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { Button, Cell, Loading, Slider, Tab, Toast } from 'vtdf/components';

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
const visible22 = ref(false);
const visible23 = ref(false);
const visible24 = ref(false);
const visible25 = ref(false);
const visible26 = ref(false);
const visible27 = ref(false);
const visible30 = ref(false);
const visible31 = ref(false);
const visible32 = ref(false);
const time = ref(4);
const transitionTypes = ['scale', 'fly', 'fade', 'blur'] as const;
const transitionLabels = transitionTypes.map((text) => ({ text }));
const transitionTypeIndex = ref(0);
const transitionType = computed(() => transitionTypes[transitionTypeIndex.value]);
const easeTypes = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'] as const;
const easeLabels = easeTypes.map((text) => ({ text: text.replace('Out', '') }));
const easeTypeIndex = ref(0);
const easeType = computed(() => easeTypes[easeTypeIndex.value]);
const inDuration = ref(300);
const outDuration = ref(300);
const flyY = ref(-100);
const scaleStart = ref(0);
const blurAmount = ref(5);
let timer: ReturnType<typeof setInterval> | null = null;

const clearTimer = () => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
};

const useSlotFun = () => {
	visible25.value = true;
	clearTimer();
	timer = setInterval(() => {
		time.value -= 1;
		if (time.value <= 0) {
			clearTimer();
			visible25.value = false;
			time.value = 3;
		}
	}, 1000);
};

const getTransitionParams = () => {
	const base = { duration: inDuration.value };
	if (transitionType.value === 'fly') {
		return { ...base, y: flyY.value };
	}
	if (transitionType.value === 'scale') {
		return { ...base, start: scaleStart.value };
	}
	if (transitionType.value === 'blur') {
		return { ...base, amount: blurAmount.value };
	}
	return base;
};

onBeforeUnmount(clearTimer);
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<Toast v-model:visible="visible1" message="轻提示" />

		<Cell title="长文本提示" @click="() => (visible2 = true)" />
		<Toast v-model:visible="visible2" message="当字符数过长时换行，一般不建议在这里显示太多的内容！" />

		<Cell title="不阻止点击" @click="() => (visible3 = true)" />
		<Toast v-model:visible="visible3" clickable message="遮罩下层内容还可以点击" />

		<Cell title="固定显示时间" @click="() => (visible4 = true)" />
		<Toast v-model:visible="visible4" :duration="6000" message="6 秒后自动关闭" />

		<Cell title="不自动关闭" @click="() => (visible5 = true)" />
		<Toast v-model:visible="visible5" :duration="0" clickable message="此提示不会自动关闭，请点击按钮关闭" />

		<Cell title="成功提示" @click="() => (visible6 = true)" />
		<Toast v-model:visible="visible6" type="success" message="成功提示" />

		<Cell title="失败提示" @click="() => (visible7 = true)" />
		<Toast v-model:visible="visible7" type="error" message="失败提示" />

		<Cell title="警告提示" @click="() => (visible8 = true)" />
		<Toast v-model:visible="visible8" type="warning" message="警告提示" />

		<Cell title="信息提示" @click="() => (visible9 = true)" />
		<Toast v-model:visible="visible9" type="info" message="信息提示" />

		<Cell title="加载提示" @click="() => (visible30 = true)" />
		<Toast v-model:visible="visible30" type="loading" message="加载中..." />

		<Cell title="主题色加载提示" @click="() => (visible31 = true)" />
		<Toast v-model:visible="visible31" type="loading" :loading="{ theme: true }" message="加载中..." />

		<Cell title="1_3 号加载提示" @click="() => (visible32 = true)" />
		<Toast v-model:visible="visible32" type="loading" :loading="{ type: '1_3' }" message="加载中..." />

		<Cell title="自定义类型" @click="() => (visible27 = true)" />
		<Toast v-model:visible="visible27" type="icon" :icon="{ name: 'ri-thumb-up-fill' }" message="你真棒！" />

		<Cell title="遮罩不透明" @click="() => (visible10 = true)" />
		<Toast v-model:visible="visible10" :mask="{ opacity: '0.3' }" message="遮罩透明度为 0.3" />

		<Cell title="反色遮罩" @click="() => (visible11 = true)" />
		<Toast v-model:visible="visible11" :mask="{ inverse: true, opacity: '0.5' }" message="反色遮罩" />

		<Cell title="遮罩模糊" @click="() => (visible12 = true)" />
		<Toast v-model:visible="visible12" :mask="{ opacity: '0', backdropBlur: 'sm' }" message="遮罩下层内容模糊" />

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">动画类型 （transitionType: {{ transitionType }}）</div>
			<Tab :labels="transitionLabels" :active="transitionTypeIndex" @click-tab="(value) => (transitionTypeIndex = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">缓动函数 （easeType: {{ easeType }}）</div>
			<Tab :labels="easeLabels" :active="easeTypeIndex" @click-tab="(value) => (easeTypeIndex = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">进入动画时长：{{ inDuration }} ms</div>
			<Slider :value="inDuration" :min-range="0" :max-range="1000" :step="50" @change="(value) => (inDuration = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">退出动画时长：{{ outDuration }} ms</div>
			<Slider :value="outDuration" :min-range="0" :max-range="1000" :step="50" @change="(value) => (outDuration = value)" />
		</div>

		<div v-if="transitionType === 'fly'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">fly 动画 Y 偏移：{{ flyY }} px</div>
			<Slider :value="flyY" :min-range="-200" :max-range="200" :step="10" @change="(value) => (flyY = value)" />
		</div>
		<div v-else-if="transitionType === 'scale'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">scale 动画初始缩放：{{ scaleStart }}</div>
			<Slider :value="scaleStart" :min-range="0" :max-range="1" :step="0.1" @change="(value) => (scaleStart = value)" />
		</div>
		<div v-else-if="transitionType === 'blur'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">blur 动画模糊程度：{{ blurAmount }} px</div>
			<Slider :value="blurAmount" :min-range="0" :max-range="20" :step="1" @change="(value) => (blurAmount = value)" />
		</div>

		<Cell title="自定义动画效果" @click="() => (visible13 = true)" />
		<Toast
			v-model:visible="visible13"
			:transition-type="transitionType"
			:transition-params="getTransitionParams()"
			:out-duration="outDuration"
			:ease-type="easeType"
			:ease-out-type="easeType"
			message="调整上方控件查看不同动画效果"
		/>

		<Cell title="顶部" @click="() => (visible22 = true)" />
		<Toast v-model:visible="visible22" position="top" message="提示位于顶部" />

		<Cell title="底部" @click="() => (visible23 = true)" />
		<Toast v-model:visible="visible23" position="bottom" message="提示位于底部" />

		<Cell title="顶部增加距离" @click="() => (visible24 = true)" />
		<Toast v-model:visible="visible24" position="top" py="40" message="提示位于顶部且增加了距离" />

		<Cell title="使用插槽" @click="useSlotFun" />
		<Toast v-model:visible="visible25" :duration="0">
			<div class="flex flex-col space-y-4">
				<div>自定义提示内容</div>
				<Loading inverse />
				<div>{{ time }} 秒后关闭</div>
			</div>
		</Toast>

		<Cell title="不同圆角风格" @click="() => (visible26 = true)" />
		<Toast v-model:visible="visible26" radius="2xl" message="加大了圆角" />
	</div>

	<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
		<div class="flex-1">
			<Button fill="lineState" @click="() => (visible5 = false)">手动关闭</Button>
		</div>
	</div>
</template>
