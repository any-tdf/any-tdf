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
		<Cell title="Basic usage" @click="() => (visible1 = true)" />
		<Toast v-model:visible="visible1" message="Light hint" />

		<Cell title="Long text prompt" @click="() => (visible2 = true)" />
		<Toast
			v-model:visible="visible2"
			message="When the character count is too long, it is generally not recommended to display too much content here!"
		/>

		<Cell title="Do not block clicks" @click="() => (visible3 = true)" />
		<Toast v-model:visible="visible3" clickable message="The content below the mask can also be clicked" />

		<Cell title="Fixed display time" @click="() => (visible4 = true)" />
		<Toast v-model:visible="visible4" :duration="6000" message="It turns off automatically after 6 seconds" />

		<Cell title="Non-automatic closing" @click="() => (visible5 = true)" />
		<Toast
			v-model:visible="visible5"
			:duration="0"
			clickable
			message="This prompt will not automatically close, please click the button to close"
		/>

		<Cell title="Success message" @click="() => (visible6 = true)" />
		<Toast v-model:visible="visible6" type="success" message="Success message" />

		<Cell title="Failure prompt" @click="() => (visible7 = true)" />
		<Toast v-model:visible="visible7" type="error" message="Failure prompt" />

		<Cell title="Warning prompt" @click="() => (visible8 = true)" />
		<Toast v-model:visible="visible8" type="warning" message="Warning prompt" />

		<Cell title="Information prompt" @click="() => (visible9 = true)" />
		<Toast v-model:visible="visible9" type="info" message="Information prompt" />

		<Cell title="Load prompt" @click="() => (visible30 = true)" />
		<Toast v-model:visible="visible30" type="loading" message="Under load..." />

		<Cell title="Theme color loading prompt" @click="() => (visible31 = true)" />
		<Toast v-model:visible="visible31" type="loading" :loading="{ theme: true }" message="Under load..." />

		<Cell title="Loading prompt for # 1_3" @click="() => (visible32 = true)" />
		<Toast v-model:visible="visible32" type="loading" :loading="{ type: '1_3' }" message="Under load..." />

		<Cell title="Custom type" @click="() => (visible27 = true)" />
		<Toast v-model:visible="visible27" type="icon" :icon="{ name: 'ri-thumb-up-fill' }" message="You are so good!" />

		<Cell title="The mask is opaque" @click="() => (visible10 = true)" />
		<Toast v-model:visible="visible10" :mask="{ opacity: '0.3' }" message="Mask transparency is 0.3" />

		<Cell title="Reverse color mask" @click="() => (visible11 = true)" />
		<Toast v-model:visible="visible11" :mask="{ inverse: true, opacity: '0.5' }" message="Reverse color mask" />

		<Cell title="Mask blur" @click="() => (visible12 = true)" />
		<Toast v-model:visible="visible12" :mask="{ opacity: '0', backdropBlur: 'sm' }" message="The content below the mask is blurry" />

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">Animation Type (transitionType: {{ transitionType }})</div>
			<Tab :labels="transitionLabels" :active="transitionTypeIndex" @click-tab="(value) => (transitionTypeIndex = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">Easing Function (easeType: {{ easeType }})</div>
			<Tab :labels="easeLabels" :active="easeTypeIndex" @click-tab="(value) => (easeTypeIndex = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">Enter Animation Duration: {{ inDuration }} ms</div>
			<Slider :value="inDuration" :min-range="0" :max-range="1000" :step="50" @change="(value) => (inDuration = value)" />
		</div>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">Exit Animation Duration: {{ outDuration }} ms</div>
			<Slider :value="outDuration" :min-range="0" :max-range="1000" :step="50" @change="(value) => (outDuration = value)" />
		</div>

		<div v-if="transitionType === 'fly'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">fly Y Offset: {{ flyY }} px</div>
			<Slider :value="flyY" :min-range="-200" :max-range="200" :step="10" @change="(value) => (flyY = value)" />
		</div>
		<div v-else-if="transitionType === 'scale'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">scale Initial Scale: {{ scaleStart }}</div>
			<Slider :value="scaleStart" :min-range="0" :max-range="1" :step="0.1" @change="(value) => (scaleStart = value)" />
		</div>
		<div v-else-if="transitionType === 'blur'" class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">blur Amount: {{ blurAmount }} px</div>
			<Slider :value="blurAmount" :min-range="0" :max-range="20" :step="1" @change="(value) => (blurAmount = value)" />
		</div>

		<Cell title="Custom Animation Effect" @click="() => (visible13 = true)" />
		<Toast
			v-model:visible="visible13"
			:transition-type="transitionType"
			:transition-params="getTransitionParams()"
			:out-duration="outDuration"
			:ease-type="easeType"
			:ease-out-type="easeType"
			message="Adjust the controls above to see different animation effects"
		/>

		<Cell title="Top" @click="() => (visible22 = true)" />
		<Toast v-model:visible="visible22" position="top" message="Tips at the top" />

		<Cell title="Bottom" @click="() => (visible23 = true)" />
		<Toast v-model:visible="visible23" position="bottom" message="Tips at the bottom" />

		<Cell title="Top increase distance" @click="() => (visible24 = true)" />
		<Toast v-model:visible="visible24" position="top" py="40" message="The tip is at the top and the distance is increased" />

		<Cell title="Use slot" @click="useSlotFun" />
		<Toast v-model:visible="visible25" :duration="0">
			<div class="flex flex-col space-y-4">
				<div>Customize the prompt content</div>
				<Loading inverse />
				<div>Close in {{ time }} seconds</div>
			</div>
		</Toast>

		<Cell title="Different styles of rounded corners" @click="() => (visible26 = true)" />
		<Toast v-model:visible="visible26" radius="2xl" message="Rounded corners were added" />
	</div>

	<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
		<div class="flex-1">
			<Button fill="lineState" @click="() => (visible5 = false)">Manual shutdown</Button>
		</div>
	</div>
</template>
