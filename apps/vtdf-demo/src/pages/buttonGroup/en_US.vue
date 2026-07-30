<script setup lang="ts">
import { computed, ref } from 'vue';
import { ButtonGroup, Icon, Slider, Toast } from 'vtdf/components';
import type { ButtonGroupItemProps, ButtonGroupProps } from 'vtdf/types';

const visible = ref(false);
const radiusOptions: ButtonGroupProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
const radiusIndex = ref(2);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
const handleButtonClick = () => {
	visible.value = true;
};

const basicItems: ButtonGroupItemProps[] = [
	{ text: 'App', icon: { name: 'ri-apps-2-line', size: 18 } },
	{ text: 'Collect', icon: { name: 'ri-star-line', size: 18 } },
	{ text: 'Share', icon: { name: 'ri-share-forward-line', size: 18 } }
];

const textOnlyItems: ButtonGroupItemProps[] = [{ text: 'Cancel' }, { text: 'Confirm' }];

const iconOnlyItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-thumb-up-line', size: 20 } },
	{ icon: { name: 'ri-thumb-down-line', size: 20 } },
	{ icon: { name: 'ri-heart-line', size: 20 } }
];

const disabledItems: ButtonGroupItemProps[] = [{ text: 'Enabled' }, { text: 'Disabled', disabled: true }, { text: 'Enabled' }];

const textIconAndIconItems: ButtonGroupItemProps[] = [
	{ text: 'Search', icon: { name: 'ri-search-line', size: 18 } },
	{ icon: { name: 'ri-filter-line', size: 20 } }
];

const iconAndTextIconItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-arrow-left-line', size: 20 } },
	{ text: 'Next', icon: { name: 'ri-arrow-right-line', size: 18 }, iconPosition: 'right' }
];

const iconPositionItems: ButtonGroupItemProps[] = [
	{ text: 'Previous', icon: { name: 'ri-arrow-left-s-line', size: 18 } },
	{ text: 'Next', icon: { name: 'ri-arrow-right-s-line', size: 18 }, iconPosition: 'right' }
];

const complexItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-skip-back-line', size: 18 } },
	{ text: 'Play', icon: { name: 'ri-play-line', size: 18 } },
	{ icon: { name: 'ri-skip-forward-line', size: 18 } }
];
</script>

<template>
	<div class="flex flex-col space-y-8 py-8">
		<div>
			<div class="p-4 font-bold">fill + state</div>
			<ButtonGroup :items="basicItems" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" state="success" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" state="warning" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" state="error" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" state="info" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="line" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineLight" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" state="success" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" state="warning" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" state="error" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" state="info" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="text" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" state="success" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" state="warning" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" state="error" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" state="info" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="theme" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="success" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="warning" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="error" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="info" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Two-button combinations</div>
			<ButtonGroup :items="textOnlyItems" @click="handleButtonClick" />
			<ButtonGroup :items="textIconAndIconItems" fill="lineState" />
			<ButtonGroup :items="iconAndTextIconItems" fill="colorLight" />
			<ButtonGroup :items="iconPositionItems" fill="lineState" />
		</div>
		<div>
			<div class="p-4 font-bold">Icon position</div>
			<ButtonGroup :items="iconPositionItems" />
			<ButtonGroup :items="iconPositionItems" fill="lineState" />
			<ButtonGroup :items="iconPositionItems" fill="colorLight" />
		</div>
		<div>
			<div class="p-4 font-bold">Complex combination</div>
			<div class="flex flex-col items-center gap-2">
				<ButtonGroup :items="complexItems" size="md" />
				<ButtonGroup :items="complexItems" fill="lineState" size="md" />
				<ButtonGroup :items="complexItems" fill="colorLight" size="md" />
			</div>
		</div>
		<div>
			<div class="p-4 font-bold">Different fill modes</div>
			<ButtonGroup :items="basicItems" fill="base" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="line" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="text" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">fill + state combination</div>
			<ButtonGroup :items="basicItems" fill="base" state="success" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" state="error" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="colorLight" state="warning" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="textState" state="info" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Different radius styles</div>
			<div class="px-4 pb-4">
				<Slider
					:value="radiusIndex"
					:min-range="0"
					:max-range="7"
					:step="1"
					show-steps
					:step-labels="radiusLabels"
					@change="(value: number) => (radiusIndex = value)"
				/>
			</div>
			<ButtonGroup :items="textOnlyItems" :radius="currentRadius" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" :radius="currentRadius" fill="lineState" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" :radius="currentRadius" fill="colorLight" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Different sizes</div>
			<ButtonGroup :items="basicItems" size="full" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="big" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="md" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="auto" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Different heights</div>
			<ButtonGroup :items="textOnlyItems" height-in="0" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="1" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="2" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="3" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="4" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" height-out="0" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" height-out="4" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Divider height</div>
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="full" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="mid" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="short" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Border style</div>
			<ButtonGroup :items="basicItems" fill="lineState" border="solid" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" border="dashed" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" border="dotted" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Text only</div>
			<ButtonGroup :items="textOnlyItems" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">Icon only</div>
			<ButtonGroup :items="iconOnlyItems" size="sm" />
			<ButtonGroup :items="iconOnlyItems" fill="lineState" size="sm" />
		</div>
		<div>
			<div class="p-4 font-bold">Disable some buttons</div>
			<ButtonGroup :items="disabledItems" />
			<ButtonGroup :items="disabledItems" fill="lineState" />
		</div>
		<div>
			<div class="p-4 font-bold">Children custom mode</div>
			<ButtonGroup fill="lineState" height-in="0">
				<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
					<Icon name="ri-apps-2-line" :size="18" />
					App
				</button>
				<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
					<Icon name="ri-star-line" :size="18" />
					Collect
				</button>
				<button class="flex-1 py-2 active:opacity-80" @click="visible = true">
					<Icon name="ri-share-forward-line" :size="18" />
					Share
				</button>
			</ButtonGroup>
		</div>
	</div>
	<Toast v-model:visible="visible" message="Button clicked!" />
</template>
