<script setup lang="ts">
import { computed, ref } from 'vue';
import { CodeInput, FullKeyboard, NumKeyboard, Slider, Toast } from 'vtdf';

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
const radiusIndex = ref(7);
const currentRadius = computed(() => radiusValues[radiusIndex.value]);

const messages = {
	zh_CN: {
		basic: '基础用法',
		customLength: '自定义长度',
		masked: '掩码显示',
		customMask: '自定义掩码',
		letterInput: '字母输入',
		noGutter: '无间距',
		infoMessage: '提示信息',
		nativeNumeric: '原生键盘（ numeric ）',
		nativeTel: '原生键盘（ tel ）',
		nativeDecimal: '原生键盘（ decimal ）',
		numKeyboardPreview: '数字键盘预览',
		fullKeyboardPreview: '全键盘预览',
		customFont: '自定义字体',
		lineMode: '线模式',
		underlineCursor: '下划线光标',
		pulseAnimation: '呼吸动画',
		customRadius: '自定义圆角',
		themeBackground: '主题背景',
		dashedBorder: '虚线边框',
		surfaceBackground: '无边框 + surface 背景',
		bold: '加大加粗',
		autoClose: '自动关闭',
		info: '请输入 6 位验证码',
		error: '验证码错误，请重新输入',
		finished: '输入完成：',
		toast: '输入完成，键盘已关闭'
	},
	en_US: {
		basic: 'Basic Usage',
		customLength: 'Custom Length',
		masked: 'Masked',
		customMask: 'Custom Mask',
		letterInput: 'Letter Input',
		noGutter: 'No Gutter',
		infoMessage: 'Info Message',
		nativeNumeric: 'Native Keyboard (numeric)',
		nativeTel: 'Native Keyboard (tel)',
		nativeDecimal: 'Native Keyboard (decimal)',
		numKeyboardPreview: 'NumKeyboard Preview',
		fullKeyboardPreview: 'FullKeyboard Preview',
		customFont: 'Custom Font',
		lineMode: 'Line Mode',
		underlineCursor: 'Underline Cursor',
		pulseAnimation: 'Pulse Animation',
		customRadius: 'Custom Radius',
		themeBackground: 'Theme Background',
		dashedBorder: 'Dashed Border',
		surfaceBackground: 'No Border + Surface Background',
		bold: 'Bold',
		autoClose: 'Auto Close',
		info: 'Please enter 6-digit code',
		error: 'Invalid code, please try again',
		finished: 'Finished: ',
		toast: 'Input complete, keyboard closed'
	}
};

const text = computed(() => messages[props.locale]);

const value1 = ref('');
const showNumKeyboard1 = ref(false);
const finishValue1 = ref('');

const value2 = ref('');
const showNumKeyboard2 = ref(false);

const value3 = ref('');
const showNumKeyboard3 = ref(false);

const value3b = ref('');
const showNumKeyboard3b = ref(false);

const value4 = ref('');
const showFullKeyboard4 = ref(false);

const value5 = ref('');
const showNumKeyboard5 = ref(false);

const value6 = ref('');
const showNumKeyboard6 = ref(false);
const errorInfo6 = ref('');

const value7 = ref('');
const focused7 = ref(false);

const value7b = ref('');
const focused7b = ref(false);

const value7c = ref('');
const focused7c = ref(false);

const value8 = ref('');
const showNumKeyboard8 = ref(false);

const value9 = ref('');
const showFullKeyboard9 = ref(false);

const value10 = ref('');
const showFullKeyboard10 = ref(false);

const value11 = ref('');
const showNumKeyboard11 = ref(false);

const value12 = ref('');
const showNumKeyboard12 = ref(false);

const value13 = ref('');
const showNumKeyboard13 = ref(false);

const value14 = ref('');
const showNumKeyboard14 = ref(false);

const value15 = ref('');
const showNumKeyboard15 = ref(false);

const value16 = ref('');
const showNumKeyboard16 = ref(false);

const value17 = ref('');
const showNumKeyboard17 = ref(false);

const value17b = ref('');
const showNumKeyboard17b = ref(false);

const value18 = ref('');
const showNumKeyboard18 = ref(false);
const showToast18 = ref(false);

const handleFinish1 = (value: string) => {
	finishValue1.value = value;
};

const handleFinish6 = (value: string) => {
	errorInfo6.value = value === '123456' ? '' : text.value.error;
};
</script>

<template>
	<div class="space-y-6 p-4">
		<p class="text-sm text-gray-500">{{ text.basic }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value1"
				:focused="showNumKeyboard1"
				:keyboard-visible="showNumKeyboard1"
				@focus="showNumKeyboard1 = true"
				@finish="handleFinish1"
			/>
		</div>
		<p v-if="finishValue1" class="text-primary dark:text-dark text-center text-xs">{{ text.finished }}{{ finishValue1 }}</p>
		<NumKeyboard v-model:value="value1" v-model:visible="showNumKeyboard1" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.customLength }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value2"
				:focused="showNumKeyboard2"
				:keyboard-visible="showNumKeyboard2"
				:length="4"
				@focus="showNumKeyboard2 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value2" v-model:visible="showNumKeyboard2" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.masked }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value3"
				:focused="showNumKeyboard3"
				:keyboard-visible="showNumKeyboard3"
				mask
				@focus="showNumKeyboard3 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value3" v-model:visible="showNumKeyboard3" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.customMask }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value3b"
				:focused="showNumKeyboard3b"
				:keyboard-visible="showNumKeyboard3b"
				mask="*"
				@focus="showNumKeyboard3b = true"
			/>
		</div>
		<NumKeyboard v-model:value="value3b" v-model:visible="showNumKeyboard3b" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.letterInput }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value4"
				:focused="showFullKeyboard4"
				:keyboard-visible="showFullKeyboard4"
				type="text"
				:mask="false"
				@focus="showFullKeyboard4 = true"
			/>
		</div>
		<FullKeyboard v-model:value="value4" v-model:visible="showFullKeyboard4" />

		<p class="text-sm text-gray-500">{{ text.noGutter }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value5"
				:focused="showNumKeyboard5"
				:keyboard-visible="showNumKeyboard5"
				gutter="0"
				@focus="showNumKeyboard5 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value5" v-model:visible="showNumKeyboard5" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.infoMessage }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value6"
				:focused="showNumKeyboard6"
				:keyboard-visible="showNumKeyboard6"
				:info="text.info"
				:error-info="errorInfo6"
				@focus="showNumKeyboard6 = true"
				@finish="handleFinish6"
			/>
		</div>
		<NumKeyboard v-model:value="value6" v-model:visible="showNumKeyboard6" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.nativeNumeric }}</p>
		<div class="flex justify-center">
			<CodeInput v-model:value="value7" v-model:focused="focused7" :keyboard-visible="focused7" native :mask="false" />
		</div>

		<p class="text-sm text-gray-500">{{ text.nativeTel }}</p>
		<div class="flex justify-center">
			<CodeInput v-model:value="value7b" v-model:focused="focused7b" :keyboard-visible="focused7b" native input-mode="tel" :mask="false" />
		</div>

		<p class="text-sm text-gray-500">{{ text.nativeDecimal }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value7c"
				v-model:focused="focused7c"
				:keyboard-visible="focused7c"
				native
				input-mode="decimal"
				:mask="false"
			/>
		</div>

		<p class="text-sm text-gray-500">{{ text.numKeyboardPreview }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value8"
				:focused="showNumKeyboard8"
				:keyboard-visible="showNumKeyboard8"
				:mask="false"
				@focus="showNumKeyboard8 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value8" v-model:visible="showNumKeyboard8" done :dot="false" preview />

		<p class="text-sm text-gray-500">{{ text.fullKeyboardPreview }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value9"
				:focused="showFullKeyboard9"
				:keyboard-visible="showFullKeyboard9"
				type="text"
				:mask="false"
				@focus="showFullKeyboard9 = true"
			/>
		</div>
		<FullKeyboard v-model:value="value9" v-model:visible="showFullKeyboard9" preview />

		<p class="text-sm text-gray-500">{{ text.customFont }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value10"
				:focused="showFullKeyboard10"
				:keyboard-visible="showFullKeyboard10"
				type="text"
				:mask="false"
				@focus="showFullKeyboard10 = true"
			/>
		</div>
		<FullKeyboard v-model:value="value10" v-model:visible="showFullKeyboard10" key-class="font-Trueno" />

		<p class="text-sm text-gray-500">{{ text.lineMode }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value11"
				:focused="showNumKeyboard11"
				:keyboard-visible="showNumKeyboard11"
				cell-style="line"
				:mask="false"
				@focus="showNumKeyboard11 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value11" v-model:visible="showNumKeyboard11" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.underlineCursor }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value12"
				:focused="showNumKeyboard12"
				:keyboard-visible="showNumKeyboard12"
				cursor-style="underline"
				:mask="false"
				@focus="showNumKeyboard12 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value12" v-model:visible="showNumKeyboard12" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.pulseAnimation }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value13"
				:focused="showNumKeyboard13"
				:keyboard-visible="showNumKeyboard13"
				cursor-animation="pulse"
				:mask="false"
				@focus="showNumKeyboard13 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value13" v-model:visible="showNumKeyboard13" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.customRadius }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value14"
				:focused="showNumKeyboard14"
				:keyboard-visible="showNumKeyboard14"
				:radius="currentRadius"
				:mask="false"
				@focus="showNumKeyboard14 = true"
			/>
		</div>
		<div class="px-4">
			<Slider
				:value="radiusIndex"
				:max-range="7"
				:step="1"
				show-steps
				steps-style="break"
				:step-labels="radiusLabels"
				@change="(value) => (radiusIndex = value)"
			/>
		</div>
		<NumKeyboard v-model:value="value14" v-model:visible="showNumKeyboard14" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.themeBackground }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value15"
				:focused="showNumKeyboard15"
				:keyboard-visible="showNumKeyboard15"
				cell-bg="theme"
				:mask="false"
				@focus="showNumKeyboard15 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value15" v-model:visible="showNumKeyboard15" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.dashedBorder }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value16"
				:focused="showNumKeyboard16"
				:keyboard-visible="showNumKeyboard16"
				cell-border="dashed"
				:mask="false"
				@focus="showNumKeyboard16 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value16" v-model:visible="showNumKeyboard16" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.surfaceBackground }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value17"
				:focused="showNumKeyboard17"
				:keyboard-visible="showNumKeyboard17"
				cell-bg="surface"
				cell-border="none"
				@focus="showNumKeyboard17 = true"
			/>
		</div>
		<NumKeyboard v-model:value="value17" v-model:visible="showNumKeyboard17" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.bold }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value17b"
				:focused="showNumKeyboard17b"
				:keyboard-visible="showNumKeyboard17b"
				bold
				@focus="showNumKeyboard17b = true"
			/>
		</div>
		<NumKeyboard v-model:value="value17b" v-model:visible="showNumKeyboard17b" done :dot="false" />

		<p class="text-sm text-gray-500">{{ text.autoClose }}</p>
		<div class="flex justify-center">
			<CodeInput
				v-model:value="value18"
				:focused="showNumKeyboard18"
				:keyboard-visible="showNumKeyboard18"
				auto-close
				@focus="showNumKeyboard18 = true"
				@close="
					showNumKeyboard18 = false;
					showToast18 = true;
				"
			/>
		</div>
		<NumKeyboard v-model:value="value18" v-model:visible="showNumKeyboard18" :dot="false" />
		<Toast v-model:visible="showToast18" :message="text.toast" />

		<div class="h-96" />
	</div>
</template>
