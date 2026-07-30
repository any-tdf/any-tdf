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
	{ text: '应用', icon: { name: 'ri-apps-2-line', size: 18 } },
	{ text: '收藏', icon: { name: 'ri-star-line', size: 18 } },
	{ text: '分享', icon: { name: 'ri-share-forward-line', size: 18 } }
];

const textOnlyItems: ButtonGroupItemProps[] = [{ text: '取消' }, { text: '确定' }];

const iconOnlyItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-thumb-up-line', size: 20 } },
	{ icon: { name: 'ri-thumb-down-line', size: 20 } },
	{ icon: { name: 'ri-heart-line', size: 20 } }
];

const disabledItems: ButtonGroupItemProps[] = [{ text: '可用' }, { text: '禁用', disabled: true }, { text: '可用' }];

const textIconAndIconItems: ButtonGroupItemProps[] = [
	{ text: '搜索', icon: { name: 'ri-search-line', size: 18 } },
	{ icon: { name: 'ri-filter-line', size: 20 } }
];

const iconAndTextIconItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-arrow-left-line', size: 20 } },
	{ text: '下一步', icon: { name: 'ri-arrow-right-line', size: 18 }, iconPosition: 'right' }
];

const iconPositionItems: ButtonGroupItemProps[] = [
	{ text: '上一页', icon: { name: 'ri-arrow-left-s-line', size: 18 } },
	{ text: '下一页', icon: { name: 'ri-arrow-right-s-line', size: 18 }, iconPosition: 'right' }
];

const complexItems: ButtonGroupItemProps[] = [
	{ icon: { name: 'ri-skip-back-line', size: 18 } },
	{ text: '播放', icon: { name: 'ri-play-line', size: 18 } },
	{ icon: { name: 'ri-skip-forward-line', size: 18 } }
];
</script>

<template>
	<div class="flex flex-col space-y-8 py-8">
		<div>
			<div class="p-4 font-bold">fill 与 state 结合</div>
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
			<div class="p-4 font-bold">两个按钮组合</div>
			<ButtonGroup :items="textOnlyItems" @click="handleButtonClick" />
			<ButtonGroup :items="textIconAndIconItems" fill="lineState" />
			<ButtonGroup :items="iconAndTextIconItems" fill="colorLight" />
			<ButtonGroup :items="iconPositionItems" fill="lineState" />
		</div>
		<div>
			<div class="p-4 font-bold">图标位置</div>
			<ButtonGroup :items="iconPositionItems" />
			<ButtonGroup :items="iconPositionItems" fill="lineState" />
			<ButtonGroup :items="iconPositionItems" fill="colorLight" />
		</div>
		<div>
			<div class="p-4 font-bold">复杂组合</div>
			<div class="flex flex-col items-center gap-2">
				<ButtonGroup :items="complexItems" size="md" />
				<ButtonGroup :items="complexItems" fill="lineState" size="md" />
				<ButtonGroup :items="complexItems" fill="colorLight" size="md" />
			</div>
		</div>
		<div>
			<div class="p-4 font-bold">不同圆角风格</div>
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
			<div class="p-4 font-bold">不同尺寸</div>
			<ButtonGroup :items="basicItems" size="full" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="big" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="md" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" size="auto" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">不同高度</div>
			<ButtonGroup :items="textOnlyItems" height-in="0" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="1" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="2" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="3" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" height-in="4" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" height-out="0" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" height-out="4" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">分割线高度</div>
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="full" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="mid" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" divider-height="short" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">边框风格</div>
			<ButtonGroup :items="basicItems" fill="lineState" border="solid" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" border="dashed" @click="handleButtonClick" />
			<ButtonGroup :items="basicItems" fill="lineState" border="dotted" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">仅文本</div>
			<ButtonGroup :items="textOnlyItems" @click="handleButtonClick" />
			<ButtonGroup :items="textOnlyItems" fill="lineState" @click="handleButtonClick" />
		</div>
		<div>
			<div class="p-4 font-bold">仅图标</div>
			<ButtonGroup :items="iconOnlyItems" size="sm" />
			<ButtonGroup :items="iconOnlyItems" fill="lineState" size="sm" />
		</div>
		<div>
			<div class="p-4 font-bold">禁用某个按钮</div>
			<ButtonGroup :items="disabledItems" />
			<ButtonGroup :items="disabledItems" fill="lineState" />
		</div>
		<div>
			<div class="p-4 font-bold">children 自定义模式</div>
			<ButtonGroup fill="lineState" height-in="0">
				<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
					<Icon name="ri-apps-2-line" :size="18" />
					应用
				</button>
				<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
					<Icon name="ri-star-line" :size="18" />
					收藏
				</button>
				<button class="flex-1 py-2 active:opacity-80" @click="visible = true">
					<Icon name="ri-share-forward-line" :size="18" />
					分享
				</button>
			</ButtonGroup>
		</div>
	</div>
	<Toast v-model:visible="visible" message="点击了按钮！" />
</template>
