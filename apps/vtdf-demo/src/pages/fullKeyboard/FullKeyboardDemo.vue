<script setup lang="ts">
import { computed, ref } from 'vue';
import { Confetti } from '@any-tdf/vue-confetti';
import { Cell, FullKeyboard, Slider, Toast } from 'vtdf';

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
		fullDefault: '默认 full 模式',
		letter: '纯字母模式',
		letterDesc: 'mode="letter"',
		letterNumber: '字母加数字模式',
		letterNumberDesc: 'mode="letterNumber"',
		full: '完整模式',
		fullDesc: 'mode="full"',
		block: '块式样式',
		blockDesc: 'type="block"',
		blockLetterNumber: '块式样式 + 字母数字模式',
		blockLetterNumberDesc: 'type="block" + mode="letterNumber"',
		getValue: '获取内容',
		noDone: '不显示完成',
		customDone: '自定义完成文字',
		preview: '输入预览',
		previewMask: '输入预览掩码显示',
		enterHello: '请输入 hello',
		largeRadius: '增大按键圆角',
		customFont: '自定义按键字体',
		fontDesc: '需要 CSS 加载字体并在 @theme 中配置',
		customTransition: '自定义过渡动画',
		bounce: '弹性动画',
		doneClass: '完成按键注入 Class',
		panelClass: '面板与按键注入 Class',
		clickEvent: '监听点击事件',
		inline: '不使用弹出层',
		input: '输入了：',
		clicked: '点击了 ',
		doneText: '发送'
	},
	en_US: {
		basic: 'Basic Usage',
		fullDefault: 'Default full mode',
		letter: 'Letter Mode',
		letterDesc: 'mode="letter"',
		letterNumber: 'Letter Number Mode',
		letterNumberDesc: 'mode="letterNumber"',
		full: 'Full Mode',
		fullDesc: 'mode="full"',
		block: 'Block Style',
		blockDesc: 'type="block"',
		blockLetterNumber: 'Block + Letter Number',
		blockLetterNumberDesc: 'type="block" + mode="letterNumber"',
		getValue: 'Get Value',
		noDone: 'Hide Done',
		customDone: 'Custom Done Text',
		preview: 'Input Preview',
		previewMask: 'Masked Input Preview',
		enterHello: 'Please enter hello',
		largeRadius: 'Larger Key Radius',
		customFont: 'Custom Key Font',
		fontDesc: 'Requires CSS font loading and @theme configuration',
		customTransition: 'Custom Transition',
		bounce: 'Bounce animation',
		doneClass: 'Inject Done Class',
		panelClass: 'Inject Panel and Key Class',
		clickEvent: 'Listen Click Event',
		inline: 'No Popup',
		input: 'Input: ',
		clicked: 'Clicked ',
		doneText: 'Send'
	}
};

const text = computed(() => messages[props.locale]);
const visible = Array.from({ length: 21 }, () => ref(false));
const value1 = ref('');
const value9 = ref('');
const visibleToast = ref(false);
const key = ref('');
const top = ref(0);
const helloDom = ref<HTMLElement | null>(null);

const clickKey = (nextKey: string) => {
	key.value = nextKey;
	visibleToast.value = true;
};

const openKeyboard = (index: number) => {
	visible[index].value = true;
};

const openFunc = (height: number) => {
	const rect = helloDom.value?.getBoundingClientRect();
	const bottom = window.innerHeight - (rect?.bottom || 0);
	top.value = bottom < height ? -(height - bottom) - 50 : 0;
};
</script>

<template>
	<Cell :title="text.basic" :sub-title="text.fullDefault" @click="openKeyboard(1)" />
	<FullKeyboard v-model:visible="visible[1].value" />

	<Cell :title="text.letter" :sub-title="text.letterDesc" @click="openKeyboard(12)" />
	<FullKeyboard v-model:visible="visible[12].value" mode="letter" />

	<Cell :title="text.letterNumber" :sub-title="text.letterNumberDesc" @click="openKeyboard(13)" />
	<FullKeyboard v-model:visible="visible[13].value" mode="letterNumber" />

	<Cell :title="text.full" :sub-title="text.fullDesc" @click="openKeyboard(14)" />
	<FullKeyboard v-model:visible="visible[14].value" mode="full" />

	<Cell :title="text.block" :sub-title="text.blockDesc" @click="openKeyboard(19)" />
	<FullKeyboard v-model:visible="visible[19].value" type="block" />

	<Cell :title="text.blockLetterNumber" :sub-title="text.blockLetterNumberDesc" @click="openKeyboard(20)" />
	<FullKeyboard v-model:visible="visible[20].value" type="block" mode="letterNumber" />

	<div class="px-4">{{ text.input }}{{ value1 }}</div>
	<Cell :title="text.getValue" @click="openKeyboard(2)" />
	<FullKeyboard v-model:visible="visible[2].value" v-model:value="value1" />

	<Cell :title="text.noDone" @click="openKeyboard(3)" />
	<FullKeyboard v-model:visible="visible[3].value" :done="false" />

	<Cell :title="text.customDone" @click="openKeyboard(6)" />
	<FullKeyboard v-model:visible="visible[6].value" :done-text="text.doneText" />

	<Cell :title="text.preview" @click="openKeyboard(7)" />
	<FullKeyboard v-model:visible="visible[7].value" preview />

	<Cell :title="text.previewMask" @click="openKeyboard(8)" />
	<FullKeyboard v-model:visible="visible[8].value" preview preview-mask />

	<div
		ref="helloDom"
		class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
		:style="{ top: `${top}px` }"
	>
		{{ value9 }}
		<span v-if="value9.toLowerCase() === 'hello'" class="absolute left-1/2">
			<Confetti rounded :amount="100" />
		</span>
	</div>
	<Cell :title="text.enterHello" @click="openKeyboard(9)" />
	<FullKeyboard
		v-model:visible="visible[9].value"
		v-model:value="value9"
		:done-disabled="value9.toLowerCase() !== 'hello'"
		@open="openFunc"
		@close="() => (top = 0)"
	/>

	<Cell :title="text.largeRadius" @click="openKeyboard(10)" />
	<FullKeyboard v-model:visible="visible[10].value" radius="2xl" />

	<Cell :title="text.customFont" :sub-title="text.fontDesc" @click="openKeyboard(15)" />
	<FullKeyboard v-model:visible="visible[15].value" key-class="font-Trueno" />

	<Cell :title="text.customTransition" :sub-title="text.bounce" @click="openKeyboard(16)" />
	<FullKeyboard v-model:visible="visible[16].value" :popup="{ duration: 1000, easeType: 'bounceOut' }" />

	<Cell :title="text.doneClass" @click="openKeyboard(17)" />
	<FullKeyboard v-model:visible="visible[17].value" done-class="vtdf-demo-gradient-action" />

	<Cell :title="text.panelClass" @click="openKeyboard(18)" />
	<FullKeyboard
		v-model:visible="visible[18].value"
		panel-class="vtdf-demo-gradient-primary"
		key-class="!bg-transparent border border-white/40 !text-white"
	/>

	<Cell :title="text.clickEvent" @click="openKeyboard(11)" />
	<FullKeyboard v-model:visible="visible[11].value" @click="clickKey" />
	<Toast v-model:visible="visibleToast" :duration="500" :message="`${text.clicked}${key}`" />

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
	<FullKeyboard :popup="null" :radius="currentRadius" />
</template>
