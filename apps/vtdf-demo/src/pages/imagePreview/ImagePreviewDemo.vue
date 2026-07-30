<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Icon, ImagePreview } from 'vtdf';
import type { ImagePreviewItemProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type RotationValue = 0 | 90 | 180 | 270;

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const images = ['/assets/images/wall_1.jpg', '/assets/images/wall_2.jpg', '/assets/images/wall_3.jpg', '/assets/images/wall_4.jpg'];

const messages = {
	zh_CN: {
		landscape: '风景图片',
		basic: '基础用法',
		preview: '预览图片',
		initial: '指定初始索引',
		startThird: '从第 3 张开始',
		numberIndicator: '数字指示器',
		showNumber: '显示 1 / 4',
		dotIndicator: '圆点指示器',
		dotStyle: '圆点样式',
		hideIndicator: '关闭指示器',
		noIndicator: '不显示指示器',
		closePosition: '关闭按钮位置',
		topLeftClose: '左上角关闭按钮',
		maskClose: '启用点击蒙层关闭',
		maskCloseDesc: '默认禁用，启用后点击空白区域可关闭',
		enableTapClose: '启用点击关闭',
		disableLoop: '禁用循环切换',
		stopAtBoundary: '滑动到边界时停止',
		hideNavigation: '隐藏导航图标',
		hideNavigationButton: '不显示左右切换图标',
		navigationPosition: '导航图标位置',
		navigationBottom: '导航图标在底部',
		description: '图片描述',
		showDescription: '显示图片描述',
		imageLabel: '第 {index} 张',
		customScale: '自定义缩放范围',
		customScaleDesc: '最小缩放 0.3，最大缩放 5',
		customScaleButton: '自定义缩放',
		events: '监听事件',
		eventsDesc: '当前索引： {index}，缩放比例： {scale}',
		eventsButton: '监听切换和缩放',
		customIndex: '自定义索引显示',
		customIndexButton: '自定义索引样式',
		rotation: '图片旋转',
		rotationDesc: '点击旋转按钮可逆时针旋转图片，当前角度： {angle}°',
		rotationButton: '支持旋转'
	},
	en_US: {
		landscape: 'Landscape',
		basic: 'Basic Usage',
		preview: 'Preview Images',
		initial: 'Initial Index',
		startThird: 'Start from 3rd image',
		numberIndicator: 'Number Indicator',
		showNumber: 'Show 1 / 4',
		dotIndicator: 'Dot Indicator',
		dotStyle: 'Dot style',
		hideIndicator: 'Hide Indicator',
		noIndicator: 'No indicator',
		closePosition: 'Close Button Position',
		topLeftClose: 'Top left close button',
		maskClose: 'Enable Mask Close',
		maskCloseDesc: 'Disabled by default, can close by clicking blank area when enabled',
		enableTapClose: 'Enable tap close',
		disableLoop: 'Disable Loop',
		stopAtBoundary: 'Stop at boundary',
		hideNavigation: 'Hide Navigation',
		hideNavigationButton: 'Hide prev/next icons',
		navigationPosition: 'Navigation Position',
		navigationBottom: 'Navigation at bottom',
		description: 'Image Description',
		showDescription: 'Show description',
		imageLabel: 'Image {index}',
		customScale: 'Custom Scale Range',
		customScaleDesc: 'Min scale 0.3, max scale 5',
		customScaleButton: 'Custom scale',
		events: 'Listen Events',
		eventsDesc: 'Current index: {index}, Scale: {scale}',
		eventsButton: 'Listen change and scale',
		customIndex: 'Custom Index Display',
		customIndexButton: 'Custom index style',
		rotation: 'Image Rotation',
		rotationDesc: 'Click rotation button to rotate image counterclockwise. Current angle: {angle}°',
		rotationButton: 'Support Rotation'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const imagesWithDesc = computed<ImagePreviewItemProps[]>(() =>
	images.map((url, index) => ({
		url,
		alt: `${text.value.landscape} ${index + 1}`
	}))
);

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible8 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);
const visible13 = ref(false);
const visible14 = ref(false);
const visible15 = ref(false);
const visible16 = ref(false);
const visible17 = ref(false);
const current2 = ref(2);
const currentIndex = ref(0);
const scaleValue = ref(1);
const rotationAngle = ref<RotationValue>(0);

const format = (template: string, values: Record<string, string | number>) =>
	Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, `${value}`), template);
</script>

<template>
	<div>
		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.basic }}</div>
		<div class="mx-4">
			<Button @click="visible1 = true">{{ text.preview }}</Button>
		</div>
		<ImagePreview v-model:visible="visible1" :images="images" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.initial }}</div>
		<div class="mx-4">
			<Button @click="visible2 = true">{{ text.startThird }}</Button>
		</div>
		<ImagePreview v-model:visible="visible2" v-model:current="current2" :images="images" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.numberIndicator }}</div>
		<div class="mx-4">
			<Button @click="visible3 = true">{{ text.showNumber }}</Button>
		</div>
		<ImagePreview v-model:visible="visible3" :images="images" indicator-type="number" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.dotIndicator }}</div>
		<div class="mx-4">
			<Button @click="visible4 = true">{{ text.dotStyle }}</Button>
		</div>
		<ImagePreview v-model:visible="visible4" :images="images" indicator-type="dot" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.hideIndicator }}</div>
		<div class="mx-4">
			<Button @click="visible5 = true">{{ text.noIndicator }}</Button>
		</div>
		<ImagePreview v-model:visible="visible5" :images="images" :show-index="false" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.closePosition }}</div>
		<div class="mx-4">
			<Button @click="visible6 = true">{{ text.topLeftClose }}</Button>
		</div>
		<ImagePreview v-model:visible="visible6" :images="images" close-position="tl" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.maskClose }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.maskCloseDesc }}</p>
		<div class="mx-4">
			<Button @click="visible8 = true">{{ text.enableTapClose }}</Button>
		</div>
		<ImagePreview v-model:visible="visible8" :images="images" mask-closable />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.disableLoop }}</div>
		<div class="mx-4">
			<Button @click="visible10 = true">{{ text.stopAtBoundary }}</Button>
		</div>
		<ImagePreview v-model:visible="visible10" :images="images" :loop="false" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.hideNavigation }}</div>
		<div class="mx-4">
			<Button @click="visible11 = true">{{ text.hideNavigationButton }}</Button>
		</div>
		<ImagePreview v-model:visible="visible11" :images="images" :show-navigation="false" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.navigationPosition }}</div>
		<div class="mx-4">
			<Button @click="visible12 = true">{{ text.navigationBottom }}</Button>
		</div>
		<ImagePreview v-model:visible="visible12" :images="images" navigation-position="bottom" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.description }}</div>
		<div class="mx-4">
			<Button @click="visible13 = true">{{ text.showDescription }}</Button>
		</div>
		<ImagePreview v-model:visible="visible13" :images="imagesWithDesc">
			<template #default="{ item, index }">
				<div class="text-center text-white">
					<p class="text-lg">{{ item.alt }}</p>
					<p class="text-sm opacity-60">{{ format(text.imageLabel, { index: index + 1 }) }}</p>
				</div>
			</template>
		</ImagePreview>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customScale }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.customScaleDesc }}</p>
		<div class="mx-4">
			<Button @click="visible14 = true">{{ text.customScaleButton }}</Button>
		</div>
		<ImagePreview v-model:visible="visible14" :images="images" :min-scale="0.3" :max-scale="5" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.events }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ format(text.eventsDesc, { index: currentIndex, scale: scaleValue.toFixed(2) }) }}</p>
		<div class="mx-4">
			<Button @click="visible15 = true">{{ text.eventsButton }}</Button>
		</div>
		<ImagePreview
			v-model:visible="visible15"
			:images="images"
			@change="(index) => (currentIndex = index)"
			@scale="(scale) => (scaleValue = scale)"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customIndex }}</div>
		<div class="mx-4">
			<Button @click="visible16 = true">{{ text.customIndexButton }}</Button>
		</div>
		<ImagePreview v-model:visible="visible16" :images="images">
			<template #index="{ current, total }">
				<div class="flex items-center gap-2 rounded-full bg-primary/80 px-4 py-2 text-white dark:bg-dark/80">
					<Icon name="ri-image-line" :size="16" />
					<span>{{ current }} of {{ total }}</span>
				</div>
			</template>
		</ImagePreview>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.rotation }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ format(text.rotationDesc, { angle: rotationAngle }) }}</p>
		<div class="mx-4">
			<Button @click="visible17 = true">{{ text.rotationButton }}</Button>
		</div>
		<ImagePreview v-model:visible="visible17" :images="images" show-rotation @rotate="(angle) => (rotationAngle = angle)" />

		<div class="h-20" />
	</div>
</template>
