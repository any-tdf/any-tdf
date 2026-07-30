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
		<Cell title="Basic Usage" @click="() => (visible1 = true)" />
		<Alert v-model:visible="visible1" message="This is an alert message" />

		<Cell title="With Title" @click="() => (visible2 = true)" />
		<Alert v-model:visible="visible2" title="Alert Title" message="This is an alert message with a title" />

		<Cell title="Success Alert" @click="() => (visible3 = true)" />
		<Alert v-model:visible="visible3" type="success" title="Success" message="Operation completed successfully!" />

		<Cell title="Error Alert" @click="() => (visible4 = true)" />
		<Alert v-model:visible="visible4" type="error" title="Error" message="Operation failed, please try again!" />

		<Cell title="Warning Alert" @click="() => (visible5 = true)" />
		<Alert v-model:visible="visible5" type="warning" title="Warning" message="Please note, this action cannot be undone!" />

		<Cell title="Info Alert" @click="() => (visible6 = true)" />
		<Alert v-model:visible="visible6" type="info" title="Info" message="This is a regular information alert." />

		<Cell title="Bottom Position" @click="() => (visible7 = true)" />
		<Alert v-model:visible="visible7" position="bottom" type="success" message="Alert slides in from bottom" />

		<Cell title="Increased Distance" @click="() => (visible8 = true)" />
		<Alert v-model:visible="visible8" py="60" type="info" message="Further from the top" />

		<Cell title="Hide Close Button" @click="() => (visible9 = true)" />
		<Alert v-model:visible="visible9" :closable="false" type="warning" message="This alert has no close button" />

		<Cell title="Hide Type Icon" @click="() => (visible10 = true)" />
		<Alert v-model:visible="visible10" type="success" :show-icon="false" message="Success without icon" />

		<Cell title="Custom Icon" @click="() => (visible11 = true)" />
		<Alert v-model:visible="visible11" :icon="{ name: 'ri-rocket-2-line', state: 'success' }" message="Using custom icon" />

		<Cell title="Fixed 6s Duration" @click="() => (visible12 = true)" />
		<Alert v-model:visible="visible12" :duration="6000" type="info" message="Auto close after 6 seconds" />

		<Cell title="No Auto Close" @click="() => (visible13 = true)" />
		<Alert
			v-model:visible="visible13"
			:duration="0"
			type="warning"
			title="Notice"
			message="This alert won't close automatically, please close manually"
		/>

		<Cell title="Custom Card Style" @click="() => (visible14 = true)" />
		<Alert
			v-model:visible="visible14"
			:card="{ shadow: '2xl', radius: '2xl', border: 'solid' }"
			type="success"
			title="Custom Card"
			message="Larger shadow and radius"
		/>

		<Cell title="Using slot" @click="() => (visible15 = true)" />
		<Alert v-model:visible="visible15" :duration="0">
			<div class="flex flex-col gap-2">
				<div class="font-medium">Custom Content</div>
				<div class="text-sm text-black/70 dark:text-white/70">This is fully customized alert content, can contain any elements.</div>
				<div class="mt-2 flex gap-2">
					<Button size="sm" @click="() => (visible15 = false)">Cancel</Button>
					<Button size="sm" fill="base" @click="() => (visible15 = false)">Confirm</Button>
				</div>
			</div>
		</Alert>

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

		<Cell title="Custom Animation Effect" @click="() => (visible16 = true)" />
		<Alert
			v-model:visible="visible16"
			:transition-type="transitionType"
			:transition-params="getTransitionParams()"
			:out-duration="outDuration"
			:ease-type="easeType"
			:ease-out-type="easeType"
			type="success"
			message="Adjust the controls above to see different animation effects"
		/>

		<div class="px-2 py-4">
			<div class="mb-2 text-sm text-black/50 dark:text-white/50">Adjust Radius (Card radius: {{ radius }})</div>
			<Slider :value="radiusIndex" :min-range="0" :max-range="7" :step="1" show-steps @change="(value) => (radiusIndex = value)" />
		</div>

		<Cell title="Different Radius Styles" @click="() => (visible17 = true)" />
		<Alert v-model:visible="visible17" :card="{ radius }" type="info" message="Adjust the slider above to see different radius" />

		<div class="px-2 py-4">
			<div class="flex items-center justify-between">
				<div class="text-sm text-black/50 dark:text-white/50">Inverse Color (inverse: {{ inverse }})</div>
				<Switch v-model:active="inverse" />
			</div>
		</div>

		<Cell title="Inverse Color Effect" @click="() => (visible18 = true)" />
		<Alert
			v-model:visible="visible18"
			:inverse="inverse"
			type="success"
			title="Notice"
			message="Inverse is enabled by default for better visibility"
		/>

		<Cell title="Non-inverse Effect" @click="() => (visible19 = true)" />
		<Alert
			v-model:visible="visible19"
			:inverse="false"
			type="info"
			title="Notice"
			message="Inverse disabled, using normal background color"
		/>
	</div>

	<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
		<div class="flex-1">
			<Button fill="lineState" @click="() => (visible13 = false)">Close Manually</Button>
		</div>
	</div>
</template>
