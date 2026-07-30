<script setup lang="ts">
import { computed, ref } from 'vue';
import { Confetti } from '@any-tdf/vue-confetti';
import { Cell, NumKeyboard, Slider, Toast } from 'vtdf';

type Locale = 'zh_CN' | 'en_US';

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const radiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const radiusLabels = [...radiusValues];
const radiusIndex = ref(2);
const currentRadius = computed(() => radiusValues[radiusIndex.value]);

const messages = {
	zh_CN: {
		basic: '基础用法',
		getValue: '获取内容',
		clearOnOpen: '打开时清空内容',
		noDone: '不显示完成',
		showClose: '显示关闭',
		showCloseNoDone: '显示关闭不显示完成',
		mustHideDot: '必须隐藏小数点',
		reverse: '数字上下反向',
		tall: '增高按键高度',
		largeGap: '增大间距',
		noDot: '不显示小数点',
		minimal: '不必要的全部不显示',
		block: '块式',
		customDone: '自定义完成文字',
		clickEvent: '监听点击事件',
		enterCode: '请输入 5201314',
		largeRadius: '增大按键圆角',
		doneClass: '完成按键注入 Class',
		panelClass: '面板与按键注入 Class',
		customTransition: '自定义过渡动画',
		byPopup: '通过 popup',
		opaqueMask: '激活时背景不透明',
		byPopupMask: '通过 popup 内的 mask',
		customFont: '自定义按键字体',
		fontDesc: '需要 CSS 加载字体并在 @theme 中配置',
		preview: '输入预览',
		previewDesc: '在键盘顶部显示输入内容',
		inline: '不使用弹出层',
		input: '输入了：',
		clicked: '点击了 ',
		doneText: '转账'
	},
	en_US: {
		basic: 'Basic Usage',
		getValue: 'Get Value',
		clearOnOpen: 'Clear on Open',
		noDone: 'Hide Done',
		showClose: 'Show Close',
		showCloseNoDone: 'Show Close Without Done',
		mustHideDot: 'Dot must be hidden',
		reverse: 'Reverse Numbers',
		tall: 'Taller Keys',
		largeGap: 'Larger Gap',
		noDot: 'Hide Dot',
		minimal: 'Hide Optional Keys',
		block: 'Block Style',
		customDone: 'Custom Done Text',
		clickEvent: 'Listen Click Event',
		enterCode: 'Please enter 5201314',
		largeRadius: 'Larger Key Radius',
		doneClass: 'Inject Done Class',
		panelClass: 'Inject Panel and Key Class',
		customTransition: 'Custom Transition',
		byPopup: 'Via popup',
		opaqueMask: 'Opaque Active Mask',
		byPopupMask: 'Via popup mask',
		customFont: 'Custom Key Font',
		fontDesc: 'Requires CSS font loading and @theme configuration',
		preview: 'Input Preview',
		previewDesc: 'Show input content above keyboard',
		inline: 'No Popup',
		input: 'Input: ',
		clicked: 'Clicked ',
		doneText: 'Transfer'
	}
};

const text = computed(() => messages[props.locale]);
const visible = Array.from({ length: 23 }, () => ref(false));
const value = ref('');
const value21 = ref('');
const valueClear = ref('initial');
const visibleToast = ref(false);
const key = ref('');
const top = ref(0);
const loveDom = ref<HTMLElement | null>(null);

const clickKey = (nextKey: string) => {
	key.value = nextKey;
	visibleToast.value = true;
};

const openKeyboard = (index: number) => {
	visible[index].value = true;
};

const openFunc = (height: number) => {
	const rect = loveDom.value?.getBoundingClientRect();
	const bottom = window.innerHeight - (rect?.bottom || 0);
	top.value = bottom < height ? -(height - bottom) - 50 : 0;
};
</script>

<template>
	<Cell :title="text.basic" @click="openKeyboard(1)" />
	<NumKeyboard v-model:visible="visible[1].value" />

	<div class="px-4">{{ text.input }}{{ value21 }}</div>
	<Cell :title="text.getValue" @click="openKeyboard(21)" />
	<NumKeyboard v-model:visible="visible[21].value" v-model:value="value21" />

	<div class="px-4">{{ text.input }}{{ valueClear }}</div>
	<Cell :title="text.clearOnOpen" @click="openKeyboard(20)" />
	<NumKeyboard v-model:visible="visible[20].value" v-model:value="valueClear" clear />

	<Cell :title="text.noDone" @click="openKeyboard(2)" />
	<NumKeyboard v-model:visible="visible[2].value" :done="false" />

	<Cell :title="text.showClose" @click="openKeyboard(3)" />
	<NumKeyboard v-model:visible="visible[3].value" close />

	<Cell :title="text.showCloseNoDone" :sub-title="text.mustHideDot" @click="openKeyboard(9)" />
	<NumKeyboard v-model:visible="visible[9].value" close :dot="false" :done="false" />

	<Cell :title="text.reverse" @click="openKeyboard(4)" />
	<NumKeyboard v-model:visible="visible[4].value" reverse />

	<Cell :title="text.tall" @click="openKeyboard(5)" />
	<NumKeyboard v-model:visible="visible[5].value" height="16" />

	<Cell :title="text.largeGap" @click="openKeyboard(6)" />
	<NumKeyboard v-model:visible="visible[6].value" space="4" p="4" />

	<Cell :title="text.noDot" @click="openKeyboard(7)" />
	<NumKeyboard v-model:visible="visible[7].value" close :dot="false" />

	<Cell :title="text.minimal" @click="openKeyboard(8)" />
	<NumKeyboard v-model:visible="visible[8].value" :done="false" :dot="false" />

	<Cell :title="text.block" @click="openKeyboard(10)" />
	<NumKeyboard v-model:visible="visible[10].value" type="block" height="14" p="0" />

	<Cell :title="text.customDone" @click="openKeyboard(18)" />
	<NumKeyboard v-model:visible="visible[18].value" :done-text="text.doneText" />

	<Cell :title="text.clickEvent" @click="openKeyboard(11)" />
	<NumKeyboard v-model:visible="visible[11].value" @click="clickKey" />
	<Toast v-model:visible="visibleToast" :duration="500" :message="`${text.clicked}${key}`" />

	<div
		ref="loveDom"
		class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
		:style="{ top: `${top}px` }"
	>
		{{ value }}
		<span v-if="value === '5201314'" class="absolute left-1/2">
			<Confetti rounded :amount="100" />
		</span>
	</div>
	<Cell :title="text.enterCode" @click="openKeyboard(12)" />
	<NumKeyboard
		v-model:visible="visible[12].value"
		v-model:value="value"
		:done-disabled="value !== '5201314'"
		@open="openFunc"
		@close="() => (top = 0)"
	/>

	<Cell :title="text.largeRadius" @click="openKeyboard(13)" />
	<NumKeyboard v-model:visible="visible[13].value" radius="2xl" />

	<Cell :title="text.doneClass" @click="openKeyboard(14)" />
	<NumKeyboard v-model:visible="visible[14].value" done-class="vtdf-demo-gradient-action" />

	<Cell :title="text.panelClass" @click="openKeyboard(15)" />
	<NumKeyboard
		v-model:visible="visible[15].value"
		panel-class="vtdf-demo-gradient-primary"
		key-class="!bg-transparent border border-white/40 !text-white"
	/>

	<Cell :title="text.customTransition" :sub-title="text.byPopup" @click="openKeyboard(16)" />
	<NumKeyboard v-model:visible="visible[16].value" :popup="{ duration: 1000, easeType: 'bounceOut' }" />

	<Cell :title="text.opaqueMask" :sub-title="text.byPopupMask" @click="openKeyboard(17)" />
	<NumKeyboard v-model:visible="visible[17].value" :popup="{ mask: { opacity: '0.4' } }" />

	<Cell :title="text.customFont" :sub-title="text.fontDesc" @click="openKeyboard(19)" />
	<NumKeyboard v-model:visible="visible[19].value" key-class="font-Trueno" />

	<Cell :title="text.preview" :sub-title="text.previewDesc" @click="openKeyboard(22)" />
	<NumKeyboard v-model:visible="visible[22].value" preview />

	<div class="px-4 py-2">{{ text.inline }}</div>
	<div class="px-4 pb-2">
		<Slider
			:value="radiusIndex"
			:max-range="7"
			:step="1"
			show-steps
			steps-style="break"
			:step-labels="radiusLabels"
			@change="(nextValue) => (radiusIndex = nextValue)"
		/>
	</div>
	<NumKeyboard :popup="null" :radius="currentRadius" />
</template>
