<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { Avatar, Button, Swiper } from 'vtdf/components';
import type { SwiperImgProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const messages = {
	zh_CN: {
		basic: '基础用法',
		initIndex: '初始索引为 2',
		interval: '间隔 8 秒',
		duration: '过渡 1500 毫秒',
		disableAutoplay: '关闭自动播放',
		outIndicator: '外部指示器',
		hideIndicator: '关闭指示器',
		rightIndicator: '指示器右对齐',
		pointIndicator: '圆点指示器',
		lineIndicator: '线性指示器',
		longLineIndicator: '长线指示器',
		squareIndicator: '方形指示器',
		customIndicatorBg: '指定指示器背景色',
		injectClass: '注入 Class',
		customIndicatorColor: '指定指示器颜色',
		removeBg: '同时去除背景色',
		aspectRatio: '指定容器宽高比',
		padding: '配置容器内边距',
		paddingDesc: '同时指定指示器颜色、去除指示器背景色、配置容器内部圆角',
		shadow: '容器内部增加投影',
		translate: '未激活容器 X 轴和 Z 轴偏移',
		rotate: '未激活容器 X 轴、Y 轴和 Z 轴旋转',
		inactiveClass: '未激活容器注入 Class',
		containerWidth: '指定容器宽度',
		componentContent: '容器内容使用组件',
		componentText: '此容器使用单个组件作为内容',
		button: '按钮',
		changeEvent: '监听 change 事件',
		currentIndex: '当前激活索引值：',
		clickEvent: '监听 click 事件',
		clickIndex: '点击索引值：',
		notClicked: '未点击'
	},
	en_US: {
		basic: 'Basic Usage',
		initIndex: 'Initial Index 2',
		interval: '8s Interval',
		duration: '1500ms Duration',
		disableAutoplay: 'Disable Autoplay',
		outIndicator: 'External Indicator',
		hideIndicator: 'Hide Indicator',
		rightIndicator: 'Right Aligned Indicator',
		pointIndicator: 'Dot Indicator',
		lineIndicator: 'Line Indicator',
		longLineIndicator: 'Long Line Indicator',
		squareIndicator: 'Square Indicator',
		customIndicatorBg: 'Custom Indicator Background',
		injectClass: 'Inject Class',
		customIndicatorColor: 'Custom Indicator Color',
		removeBg: 'Remove Background',
		aspectRatio: 'Custom Aspect Ratio',
		padding: 'Container Padding',
		paddingDesc: 'With Custom Colors and Radius',
		shadow: 'Inner Shadow',
		translate: 'Inactive Item X and Z Translation',
		rotate: 'Inactive Item X, Y and Z Rotation',
		inactiveClass: 'Custom Inactive Item Style',
		containerWidth: 'Custom Container Width',
		componentContent: 'Component as Content',
		componentText: 'This container uses a single component as its content',
		button: 'Button',
		changeEvent: 'change Event',
		currentIndex: 'Current Index: ',
		clickEvent: 'click Event',
		clickIndex: 'Clicked Index: ',
		notClicked: 'None'
	}
};

const text = computed(() => messages[props.locale]);
const indexClick = ref(-1);
const indexChange = ref(0);
const bodyWidth = ref(0);
const containerWidth = computed(() => (bodyWidth.value / 4) * 3);
const data: SwiperImgProps[] = [
	{ type: 'img', url: '/assets/images/wall_1.jpg' },
	{ type: 'img', url: '/assets/images/wall_2.jpg' },
	{ type: 'img', url: '/assets/images/wall_3.jpg' },
	{ type: 'img', url: '/assets/images/wall_4.jpg' }
];

const syncBodyWidth = () => {
	bodyWidth.value = typeof document === 'undefined' ? 0 : document.body.clientWidth;
};

const renderSwiperItem = () =>
	h('div', { class: 'flex h-full flex-col items-center justify-center space-y-4 bg-bg-surface dark:bg-bg-surface-dark' }, [
		h('div', { class: 'text-center' }, text.value.componentText),
		h('div', null, [h(Avatar)]),
		h('div', { class: 'w-full px-6' }, [h(Button, null, () => text.value.button)])
	]);

onMounted(() => {
	syncBodyWidth();
	window.addEventListener('resize', syncBodyWidth);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', syncBodyWidth);
});
</script>

<template>
	<div>
		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.basic }}</div>
		<Swiper :data="data" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.initIndex }}</div>
		<Swiper :data="data" :init-active="2" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.interval }}</div>
		<Swiper :data="data" :interval="8" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.duration }}</div>
		<Swiper :data="data" :duration="1500" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.disableAutoplay }}</div>
		<Swiper :data="data" :autoplay="false" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.outIndicator }}</div>
		<Swiper :data="data" indicate-position="out" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.hideIndicator }}</div>
		<Swiper :data="data" :indicate-position="null" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.rightIndicator }}</div>
		<Swiper :data="data" indicate-align="right" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.pointIndicator }}</div>
		<Swiper :data="data" indicate-style="point" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.lineIndicator }}</div>
		<Swiper :data="data" indicate-style="line" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.longLineIndicator }}</div>
		<Swiper :data="data" indicate-style="longLine" :interval="8" />
		<div class="mt-10" />
		<Swiper :data="data" indicate-style="longLine" :interval="8" indicate-position="out" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.squareIndicator }}</div>
		<Swiper :data="data" indicate-radius="none" />
		<div class="mt-10" />
		<Swiper :data="data" indicate-style="point" indicate-radius="none" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">
			{{ text.customIndicatorBg }}
			<p class="mb-2 text-xs font-thin">{{ text.injectClass }}</p>
		</div>
		<Swiper :data="data" indicate-inj-class="from-black/0 to-purple/50" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">
			{{ text.customIndicatorColor }}
			<p class="mb-2 text-xs font-thin">{{ text.removeBg }}</p>
		</div>
		<Swiper :data="data" indicate-inj-class="bg-none" indicate-color="bg-blue" indicate-active-color="bg-purple" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.aspectRatio }}</div>
		<Swiper :data="data" :aspect-ratio="[4, 1]" />

		<div class="mx-4 mt-10 text-lg font-bold">
			{{ text.padding }}
			<p class="mb-2 text-xs font-thin">{{ text.paddingDesc }}</p>
		</div>
		<Swiper
			:data="data"
			px="6"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-black/5 dark:bg-white/10"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:interval="8"
			indicate-style="longLine"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="6"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="4xl"
			:aspect-ratio="[3, 1]"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">
			{{ text.shadow }}
			<p class="mb-2 text-xs font-normal">{{ text.injectClass }}</p>
		</div>
		<Swiper
			:data="data"
			px="6"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="4xl"
			:aspect-ratio="[3, 1]"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.translate }}</div>
		<Swiper
			:data="data"
			px="16"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:aspect-ratio="[3, 1]"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:translate-x="100"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:translate-z="400"
			:translate-x="-200"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="12"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:translate-z="600"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.rotate }}</div>
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-x="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-y="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-z="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-x="90"
			:rotate-y="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-x="90"
			:rotate-z="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="4"
			py="8"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			radius="xl"
			:rotate-y="90"
			:rotate-z="90"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			:duration="2000"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.inactiveClass }}</div>
		<Swiper
			:data="data"
			px="24"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			radius="xl"
			:aspect-ratio="[3, 1]"
			:translate-x="160"
			:duration="2000"
			not-active-inj-class="grayscale"
		/>
		<div class="mt-10" />
		<Swiper
			:data="data"
			px="24"
			py="6"
			indicate-inj-class="bg-none"
			indicate-color="bg-primary dark:bg-dark"
			indicate-active-color="bg-primary dark:bg-dark"
			inner-inj-class="shadow-md shadow-black/20 dark:shadow-white/20"
			radius="xl"
			:aspect-ratio="[3, 1]"
			:translate-x="160"
			:duration="2000"
			not-active-inj-class="blur"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.containerWidth }}</div>
		<div class="flex justify-center">
			<Swiper :data="data" :container-width="containerWidth" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.componentContent }}</div>
		<Swiper
			:data="[
				{ type: 'ReactNode', ReactNode: renderSwiperItem },
				{ type: 'img', url: '/assets/images/wall_1.jpg' }
			]"
		/>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">
			{{ text.changeEvent }}
			<p class="mb-2 text-xs font-normal">{{ text.currentIndex }}{{ indexChange }}</p>
		</div>
		<Swiper :data="data" @change="(current: number) => (indexChange = current)" />

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">
			{{ text.clickEvent }}
			<p class="mb-2 text-xs font-normal">{{ text.clickIndex }}{{ indexClick === -1 ? text.notClicked : indexClick }}</p>
		</div>
		<Swiper :data="data" @click="(current: number) => (indexClick = current)" />
	</div>
</template>
