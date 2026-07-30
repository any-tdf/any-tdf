<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue';
import { Avatar, Button, ButtonGroup, Divider, Icon, Steps } from 'vtdf/components';
import type { ButtonGroupItemProps, StepsItemProps } from 'vtdf/types';

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
		getUp: '起床',
		eat: '吃饭',
		drink: '喝水',
		play: '打豆豆',
		sleep: '睡觉',
		getUpDone: '已起床',
		eatDone: '吃饱了',
		drinkDone: '喝足了',
		playDone: '打爽了',
		sleepDone: '睡着了',
		getUpDesc: '起床搬砖了！',
		eatDesc: '吃吃吃，肥死你。',
		drinkDesc: '慢慢走路，多多喝水。',
		playDescLong: '吃饭睡觉，打豆豆很爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽。顺便验证进度条高度自适应步骤文字高度。',
		playDescLongIcon:
			'吃饭睡觉，打豆豆很爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽。顺便验证进度条高度自适应步骤文字高度。',
		sleepDesc: '吃太饱，睡不着。',
		getUpFinishDesc: '砖已经搬完了！',
		eatFinishDesc: '饭已经全部被吃完了！',
		drinkFinishDesc: '水喝太多，从眼睛里溢出来了！',
		playFinishDesc: '豆豆已经被打趴下了。',
		sleepFinishDesc: '睡着了正在做梦呢！',
		playDesc: '吃饭睡觉，打豆豆。',
		injectImage: '此处以组件形式注入一张图片',
		injectContent: '此处以组件形式注入一些内容',
		button: '按钮',
		prev: '上一步',
		next: '下一步',
		horizontal: '横向排列',
		simple: '简单用法',
		radius: '不同圆角',
		icon: '带图标',
		iconBorder: '图标不同边框',
		finish: '带完成步骤',
		iconFinish: '带图标 && 完成步骤',
		textBar: '步骤栏区域使用文字',
		imageBar: '步骤栏区域使用图片',
		vertical: '纵向排列',
		desc: '带描述信息',
		inject: '内容区域注入元素'
	},
	en_US: {
		getUp: 'Get up',
		eat: 'Eat',
		drink: 'Drink',
		play: 'Beat beans',
		sleep: 'sleep',
		getUpDone: 'Have got up',
		eatDone: 'Have had enough',
		drinkDone: 'Drink up',
		playDone: 'Have a good time',
		sleepDone: 'Fall asleep',
		getUpDesc: 'Get up and move bricks!',
		eatDesc: 'Eat, eat, eat, eat, fat you.',
		drinkDesc: 'Walk slowly and drink lots of water.',
		playDescLong:
			"Eat, sleep, play peas it's cool, it's cool, it's cool, it's cool. By the way to verify the progress bar height adaptive step text height.",
		playDescLongIcon:
			"Eat, sleep, play peas It's cool, it's cool, it's cool, it's cool, it's cool. By the way to verify the progress bar height adaptive step text height.",
		sleepDesc: 'Too full to sleep.',
		getUpFinishDesc: 'The bricks are gone!',
		eatFinishDesc: 'The meal has been eaten up!',
		drinkFinishDesc: 'I drink too much water and it spills out of my eyes!',
		playFinishDesc: 'Doudou has been beaten to the ground.',
		sleepFinishDesc: 'Asleep and dreaming!',
		playDesc: 'Eat, sleep, play beans.',
		injectImage: 'Here you inject a picture as a component',
		injectContent: 'Here you inject something in the form of a component',
		button: 'button',
		prev: 'Previous',
		next: 'Next',
		horizontal: 'Horizontal arrangement',
		simple: 'Simple usage',
		radius: 'Different fillet',
		icon: 'Tape icon',
		iconBorder: 'Different icon border',
		finish: 'Tape completion step',
		iconFinish: 'Tape icon && Complete steps',
		textBar: 'The step bar area uses text',
		imageBar: 'Use images for the step bar area',
		vertical: 'Longitudinal arrangement',
		desc: 'Tape description information',
		inject: 'The content area injects elements'
	}
};

const text = computed(() => messages[props.locale]);
const current = ref(1);
const simpleSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp } },
	{ step: { title: text.value.eat } },
	{ step: { title: text.value.drink } },
	{ step: { title: text.value.play } },
	{ step: { title: text.value.sleep } }
]);
const iconSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
	{ step: { title: text.value.eat, bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
	{ step: { title: text.value.drink, bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
	{ step: { title: text.value.play, bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } } },
	{ step: { title: text.value.sleep, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
]);
const finishSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp }, finishStep: { title: text.value.getUpDone } },
	{ step: { title: text.value.eat }, finishStep: { title: text.value.eatDone } },
	{ step: { title: text.value.drink }, finishStep: { title: text.value.drinkDone } },
	{ step: { title: text.value.play }, finishStep: { title: text.value.playDone } },
	{ step: { title: text.value.sleep }, finishStep: { title: text.value.sleepDone } }
]);
const iconFinishSteps = computed<StepsItemProps[]>(() => [
	{
		step: { title: text.value.getUp, bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
		finishStep: { title: text.value.getUpDone, bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } } }
	},
	{
		step: { title: text.value.eat, bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
		finishStep: { title: text.value.eatDone, bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } } }
	},
	{
		step: { title: text.value.drink, bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
		finishStep: { title: text.value.drinkDone, bar: { type: 'icon', content: { name: 'ri-cup-fill' } } }
	},
	{
		step: { title: text.value.play, bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
		finishStep: { title: text.value.playDone, bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } } }
	},
	{
		step: { title: text.value.sleep, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
		finishStep: { title: text.value.sleepDone, bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
	}
]);
const descSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, desc: text.value.getUpDesc } },
	{ step: { title: text.value.eat, desc: text.value.eatDesc } },
	{ step: { title: text.value.drink, desc: text.value.drinkDesc } },
	{ step: { title: text.value.play, desc: text.value.playDescLong } },
	{ step: { title: text.value.sleep, desc: text.value.sleepDesc } }
]);
const descIconSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, desc: text.value.getUpDesc, bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
	{ step: { title: text.value.eat, desc: text.value.eatDesc, bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
	{ step: { title: text.value.drink, desc: text.value.drinkDesc, bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
	{
		step: {
			title: text.value.play,
			desc: text.value.playDescLongIcon,
			bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } }
		}
	},
	{ step: { title: text.value.sleep, desc: text.value.sleepDesc, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
]);
const descFinishSteps = computed<StepsItemProps[]>(() => [
	{
		step: { title: text.value.getUp, desc: text.value.getUpDesc, bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
		finishStep: {
			title: text.value.getUpDone,
			desc: text.value.getUpFinishDesc,
			bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } }
		}
	},
	{
		step: { title: text.value.eat, desc: text.value.eatDesc, bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
		finishStep: {
			title: text.value.eatDone,
			desc: text.value.eatFinishDesc,
			bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } }
		}
	},
	{
		step: { title: text.value.drink, desc: text.value.drinkDesc, bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
		finishStep: { title: text.value.drinkDone, desc: text.value.drinkFinishDesc, bar: { type: 'icon', content: { name: 'ri-cup-fill' } } }
	},
	{
		step: { title: text.value.play, desc: text.value.playDesc, bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
		finishStep: {
			title: text.value.playDone,
			desc: text.value.playFinishDesc,
			bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } }
		}
	},
	{
		step: { title: text.value.sleep, desc: text.value.sleepDesc, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
		finishStep: { title: text.value.sleepDone, desc: text.value.sleepFinishDesc, bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
	}
]);
const textBarSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, desc: text.value.getUpDesc, bar: { type: 'string', content: '1' } } },
	{ step: { title: text.value.eat, desc: text.value.eatDesc, bar: { type: 'string', content: props.locale === 'zh_CN' ? '吃' : 'eat' } } },
	{ step: { title: text.value.drink, desc: text.value.drinkDesc, bar: { type: 'string', content: '3' } } },
	{
		step: {
			title: text.value.play,
			desc: text.value.playDesc,
			bar: props.locale === 'zh_CN' ? { type: 'string', content: '5' } : { type: 'icon', content: { name: 'ri-emotion-sad-line' } }
		}
	},
	{ step: { title: text.value.sleep, desc: text.value.sleepDesc, bar: { type: 'string', content: '😴' } } }
]);
const imageBarSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, bar: { type: 'image', content: '/assets/images/avatar_2.png' } } },
	{ step: { title: text.value.eat, bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
	{ step: { title: text.value.drink, bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
	{ step: { title: text.value.play, bar: { type: 'image', content: '/assets/images/avatar_1.jpg' } } },
	{ step: { title: text.value.sleep, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
]);

const ImageInject = defineComponent({
	name: 'StepsImageInject',
	setup: () => () =>
		h('div', { class: 'text-sm text-primary dark:text-dark' }, [
			h('div', text.value.injectImage),
			h('div', { class: 'h-20 w-20 overflow-hidden rounded-full' }, [h('img', { src: '/assets/images/avatar_1.jpg', alt: '' })])
		])
});

const ContentInject = defineComponent({
	name: 'StepsContentInject',
	setup: () => () =>
		h('div', [
			h('div', { class: 'text-sm text-primary dark:text-dark' }, text.value.injectContent),
			h('div', { class: 'flex items-center space-x-4' }, [
				h(Button, { size: 'full', heightIn: '2', injClass: 'px-4' }, () => text.value.button),
				h(Avatar, { image: '/assets/images/avatar_1.jpg', size: 'sm' }),
				h(Icon, { name: 'ri-money-cny-circle-line', theme: true }),
				h(Icon, { name: 'ri-fingerprint-line', theme: true })
			])
		])
});

const injectSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.getUp, desc: text.value.getUpDesc, bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
	{
		step: {
			title: text.value.eat,
			desc: text.value.eatDesc,
			bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } },
			injComponent: ImageInject
		}
	},
	{ step: { title: text.value.drink, desc: text.value.drinkDesc, bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
	{
		step: {
			title: text.value.play,
			desc: text.value.playDesc,
			bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } },
			injComponent: ContentInject
		}
	},
	{ step: { title: text.value.sleep, desc: text.value.sleepDesc, bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
]);

const stepButtons = computed<ButtonGroupItemProps[]>(() => [
	{
		text: text.value.prev,
		icon: { name: 'ri-arrow-left-s-line', size: 18 }
	},
	{
		text: text.value.next,
		icon: { name: 'ri-arrow-right-s-line', size: 18 },
		iconPosition: 'right'
	}
]);

const handleStepButtonClick = (index: number) => {
	if (index === 0 && current.value > 1) {
		current.value -= 1;
		return;
	}
	if (index === 1 && current.value < simpleSteps.value.length + 1) {
		current.value += 1;
	}
};
</script>

<template>
	<div class="mb-4 mt-8 px-4 text-2xl font-bold">{{ text.horizontal }}</div>
	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.simple }}</div>
	<Steps :steps="simpleSteps" :current="current" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.radius }}</div>
	<Steps :steps="simpleSteps" :current="current" radius="none" />
	<Steps :steps="simpleSteps" :current="current" radius="full" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.icon }}</div>
	<Steps :steps="iconSteps" :current="current" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.iconBorder }}</div>
	<Steps :steps="iconSteps" :current="current" :bar-border="false" />
	<Steps :steps="iconSteps" :current="current" :bar-border="false" radius="full" />
	<Steps :steps="iconSteps" :current="current" radius="none" />
	<Steps :steps="iconSteps" :current="current" radius="xl" />
	<Steps :steps="iconSteps" :current="current" radius="full" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.finish }}</div>
	<Steps :steps="finishSteps" :current="current" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.iconFinish }}</div>
	<Steps :steps="iconFinishSteps" :current="current" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.textBar }}</div>
	<Steps :steps="textBarSteps" :current="current" />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.imageBar }}</div>
	<Steps :steps="imageBarSteps" :current="current" />
	<Steps :steps="imageBarSteps" radius="full" :current="current" />
	<Divider />

	<div class="mb-4 mt-4 px-4 text-2xl font-bold">{{ text.vertical }}</div>
	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.radius }}</div>
	<div class="flex justify-around">
		<Steps :steps="simpleSteps" :current="current" vertical />
		<Steps :steps="simpleSteps" :current="current" radius="none" vertical />
		<Steps :steps="simpleSteps" :current="current" radius="full" vertical />
	</div>

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.iconBorder }}</div>
	<div class="flex justify-around">
		<Steps :steps="iconSteps" :current="current" vertical />
		<Steps :steps="iconSteps" :current="current" vertical radius="full" :bar-border="false" />
	</div>
	<Divider px="8" />
	<div class="flex justify-around">
		<Steps :steps="iconSteps" :current="current" vertical :bar-border="false" radius="none" />
		<Steps :steps="iconSteps" :current="current" vertical radius="none" />
	</div>
	<Divider px="8" />
	<div class="flex justify-around">
		<Steps :steps="iconSteps" :current="current" vertical radius="xl" />
		<Steps :steps="iconSteps" :current="current" vertical radius="full" />
	</div>

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.desc }}</div>
	<Steps :steps="descSteps" :current="current" vertical />
	<Divider px="8" />
	<Steps :steps="descIconSteps" :current="current" vertical />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.finish }}</div>
	<Steps :steps="descFinishSteps" :current="current" vertical />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.textBar }}</div>
	<Steps :steps="textBarSteps" :current="current" vertical />

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.imageBar }}</div>
	<div class="flex justify-around">
		<Steps :steps="imageBarSteps" :current="current" vertical />
		<Steps :steps="imageBarSteps" :current="current" radius="full" vertical />
	</div>

	<div class="mb-4 mt-8 px-4 text-lg font-bold">{{ text.inject }}</div>
	<Steps :steps="injectSteps" :current="current" vertical />

	<div class="sticky bottom-0 z-10 bg-white/50 backdrop-blur-sm dark:bg-black/50">
		<ButtonGroup :items="stepButtons" fill="lineState" size="full" @click="handleStepButtonClick" />
	</div>
</template>
