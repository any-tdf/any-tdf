<script setup lang="ts">
import { computed, ref } from 'vue';
import { Alert, Button, Cell, Slider, Switch, Tab } from 'vtdf/components';

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
const visible16 = ref(false);
const visible17 = ref(false);
const visible18 = ref(false);
const visible19 = ref(false);
const inverse = ref(true);
const radiusList = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
const radiusIndex = ref(2);
const radius = computed(() => radiusList[radiusIndex.value]);
const transitionTypes = ['fly', 'scale', 'fade', 'blur'] as const;
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
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<Alert v-model:visible="visible1" message="这是一条提示信息" />

		<Cell title="带标题" @click="() => (visible2 = true)" />
		<Alert v-model:visible="visible2" title="提示标题" message="这是一条带有标题的提示信息" />

		<Cell title="成功提示" @click="() => (visible3 = true)" />
		<Alert v-model:visible="visible3" type="success" title="成功" message="操作已成功完成！" />

		<Cell title="失败提示" @click="() => (visible4 = true)" />
		<Alert v-model:visible="visible4" type="error" title="错误" message="操作失败，请重试！" />

		<Cell title="警告提示" @click="() => (visible5 = true)" />
		<Alert v-model:visible="visible5" type="warning" title="警告" message="请注意，此操作不可撤销！" />

		<Cell title="信息提示" @click="() => (visible6 = true)" />
		<Alert v-model:visible="visible6" type="info" title="提示" message="这是一条普通的信息提示。" />

		<Cell title="底部位置" @click="() => (visible7 = true)" />
		<Alert v-model:visible="visible7" position="bottom" type="success" message="从底部滑入的提示" />

		<Cell title="增加距离" @click="() => (visible8 = true)" />
		<Alert v-model:visible="visible8" py="60" type="info" message="距离顶部更远一些" />

		<Cell title="不显示关闭按钮" @click="() => (visible9 = true)" />
		<Alert v-model:visible="visible9" :closable="false" type="warning" message="此提示没有关闭按钮" />

		<Cell title="不显示类型图标" @click="() => (visible10 = true)" />
		<Alert v-model:visible="visible10" type="success" :show-icon="false" message="成功但不显示图标" />

		<Cell title="自定义图标" @click="() => (visible11 = true)" />
		<Alert v-model:visible="visible11" :icon="{ name: 'ri-rocket-2-line', state: 'success' }" message="使用自定义图标" />

		<Cell title="固定显示 6 秒" @click="() => (visible12 = true)" />
		<Alert v-model:visible="visible12" :duration="6000" type="info" message="6 秒后自动关闭" />

		<Cell title="不自动关闭" @click="() => (visible13 = true)" />
		<Alert v-model:visible="visible13" :duration="0" type="warning" title="注意" message="此提示不会自动关闭，请手动关闭" />

		<Cell title="自定义 Card 样式" @click="() => (visible14 = true)" />
		<Alert
			v-model:visible="visible14"
			:card="{ shadow: '2xl', radius: '2xl', border: 'solid' }"
			type="success"
			title="自定义卡片"
			message="更大的阴影和圆角"
		/>

		<Cell title="使用插槽" @click="() => (visible15 = true)" />
		<Alert v-model:visible="visible15" :duration="0">
			<div class="flex flex-col gap-2">
				<div class="font-medium">自定义内容</div>
				<div class="text-sm text-black/70 dark:text-white/70">这是完全自定义的提示内容，可以包含任意元素。</div>
				<div class="mt-2 flex gap-2">
					<Button size="sm" @click="() => (visible15 = false)">取消</Button>
					<Button size="sm" fill="base" @click="() => (visible15 = false)">确定</Button>
				</div>
			</div>
		</Alert>

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

		<Cell title="自定义动画效果" @click="() => (visible16 = true)" />
		<Alert
			v-model:visible="visible16"
			:transition-type="transitionType"
			:transition-params="getTransitionParams()"
			:out-duration="outDuration"
			:ease-type="easeType"
			:ease-out-type="easeType"
			type="success"
			message="调整上方控件查看不同动画效果"
		/>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">调整圆角 （Card radius: {{ radius }}）</div>
			<Slider :value="radiusIndex" :min-range="0" :max-range="7" :step="1" show-steps @change="(value) => (radiusIndex = value)" />
		</div>

		<Cell title="不同圆角风格" @click="() => (visible17 = true)" />
		<Alert v-model:visible="visible17" :card="{ radius }" type="info" message="调整上方滑块查看不同圆角" />

		<div class="px-2 py-4">
			<div class="flex items-center justify-between">
				<div class="text-sm text-black/50 dark:text-white/50">反转色 （inverse: {{ inverse }}）</div>
				<Switch v-model:active="inverse" />
			</div>
		</div>

		<Cell title="反转色效果" @click="() => (visible18 = true)" />
		<Alert v-model:visible="visible18" :inverse="inverse" type="success" title="提示" message="默认开启反转色，让弹窗更醒目" />

		<Cell title="不反转色效果" @click="() => (visible19 = true)" />
		<Alert v-model:visible="visible19" :inverse="false" type="info" title="提示" message="关闭反转色，使用正常背景色" />
	</div>

	<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
		<div class="flex-1">
			<Button fill="lineState" @click="() => (visible13 = false)">手动关闭</Button>
		</div>
	</div>
</template>
