<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, ImageList, Signature, Tab, Toast } from 'vtdf';
import type { ImageListItemProps, SignatureResult, SignatureRotation } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type SignatureExpose = {
	clear: () => void;
	getSignature: (rotation?: SignatureRotation) => SignatureResult | null;
	isEmpty: () => boolean;
};

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const rotationMap: SignatureRotation[] = [0, 90, 180, 270];
const rotationLabels = [{ text: '0°' }, { text: '90°' }, { text: '180°' }, { text: '270°' }];
const imageTypes = ['png', 'jpeg', 'webp'] as const;
const imageTypeLabels = [{ text: 'PNG' }, { text: 'JPEG' }, { text: 'WebP' }];

const messages = {
	zh_CN: {
		basic: '基础用法',
		basicDesc: '点击确认后签名图片将保存到下方列表（最多 6 张）',
		saved: '已保存的签名：',
		empty: '签名为空，请先签名',
		savedToast: '签名已保存',
		cleared: '签名已清空',
		customAspect: '自定义比例',
		aspectDesc: '宽高比 2:1',
		customColors: '自定义颜色',
		colorsDesc: '蓝色画笔，浅蓝背景',
		customLineWidth: '自定义画笔粗细',
		lineWidthDesc: '画笔粗细 6 px',
		rotationExport: '旋转导出',
		rotationDesc: '导出时可指定旋转角度，适用于横屏签名后需要旋转图片的场景',
		exported: '已导出的签名：',
		exportedToast: '签名已导出（旋转 {rotation}°）',
		rotatedMessage: '旋转 {rotation}°',
		customRadius: '自定义圆角',
		radiusDesc: '圆角 2xl',
		hideButtons: '不显示按钮',
		hideButtonsDesc: '通过外部调用组件方法',
		clear: '清空',
		confirm: '确认',
		externalClear: '外部清空',
		externalGet: '外部获取',
		externalEmpty: '签名为空',
		externalCaptured: '签名已获取',
		exportFormats: '导出不同格式',
		customButtonText: '自定义按钮文字',
		reSign: '重新签名',
		submitSignature: '提交签名',
		customButtonStyle: '自定义按钮样式'
	},
	en_US: {
		basic: 'Basic Usage',
		basicDesc: 'After clicking confirm, signatures will be saved to the list below (max 6)',
		saved: 'Saved signatures:',
		empty: 'Signature is empty, please sign first',
		savedToast: 'Signature saved',
		cleared: 'Signature cleared',
		customAspect: 'Custom Aspect Ratio',
		aspectDesc: 'Aspect ratio 2:1',
		customColors: 'Custom Colors',
		colorsDesc: 'Blue pen, light blue background',
		customLineWidth: 'Custom Line Width',
		lineWidthDesc: 'Line width 6 px',
		rotationExport: 'Rotation Export',
		rotationDesc: 'Specify rotation angle when exporting, useful for rotating images after landscape signing',
		exported: 'Exported signatures:',
		exportedToast: 'Signature exported (rotated {rotation}°)',
		rotatedMessage: 'Rotated {rotation}°',
		customRadius: 'Custom Border Radius',
		radiusDesc: 'Border radius 2xl',
		hideButtons: 'Hide Buttons',
		hideButtonsDesc: 'Call component methods externally',
		clear: 'Clear',
		confirm: 'Confirm',
		externalClear: 'External Clear',
		externalGet: 'External Get',
		externalEmpty: 'Signature is empty',
		externalCaptured: 'Signature captured',
		exportFormats: 'Export Different Formats',
		customButtonText: 'Custom Button Text',
		reSign: 'Re-sign',
		submitSignature: 'Submit Signature',
		customButtonStyle: 'Custom Button Style'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const signatureImages = ref<ImageListItemProps[]>([]);
const rotationImages = ref<ImageListItemProps[]>([]);
const rotationValue = ref(0);
const imageTypeIndex = ref(0);
const signatureRef = ref<SignatureExpose | null>(null);
const rotationSignatureRef = ref<SignatureExpose | null>(null);
const toastVisible = ref(false);
const toastMessage = ref('');

const rotation = computed(() => rotationMap[rotationValue.value]);
const imageType = computed(() => imageTypes[imageTypeIndex.value]);
const isZh = computed(() => props.locale === 'zh_CN');

const format = (template: string, value: SignatureRotation) => template.replace('{rotation}', `${value}`);

const showToast = (message: string) => {
	toastMessage.value = message;
	toastVisible.value = true;
};

const pushImage = (list: typeof signatureImages, item: ImageListItemProps) => {
	list.value = list.value.length >= 6 ? [...list.value.slice(1), item] : [...list.value, item];
};

const handleConfirm = (result: SignatureResult) => {
	if (result.isEmpty) {
		showToast(text.value.empty);
		return;
	}
	pushImage(signatureImages, {
		id: Date.now(),
		url: result.dataUrl,
		status: 'success'
	});
	showToast(text.value.savedToast);
};

const handleRotationExport = () => {
	const result = rotationSignatureRef.value?.getSignature(rotation.value);
	if (!result) return;
	if (result.isEmpty) {
		showToast(text.value.empty);
		return;
	}
	pushImage(rotationImages, {
		id: Date.now(),
		url: result.dataUrl,
		status: 'success',
		message: format(text.value.rotatedMessage, rotation.value)
	});
	showToast(format(text.value.exportedToast, rotation.value));
};

const handleExternalClear = () => {
	signatureRef.value?.clear();
};

const handleExternalConfirm = () => {
	const result = signatureRef.value?.getSignature();
	if (!result) return;
	showToast(result.isEmpty ? text.value.externalEmpty : text.value.externalCaptured);
};

const handleClear = () => {
	showToast(text.value.cleared);
};
</script>

<template>
	<div>
		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.basic }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.basicDesc }}</p>
		<div class="mx-4">
			<Signature
				:clear-text="isZh ? '' : text.clear"
				:confirm-text="isZh ? '' : text.confirm"
				@confirm="handleConfirm"
				@clear="handleClear"
			/>
			<div v-if="signatureImages.length > 0" class="mt-3">
				<p class="mb-2 text-sm opacity-60">{{ text.saved }}</p>
				<ImageList :value="signatureImages" readonly :columns="3" :aspect-ratio="[3, 1]" />
			</div>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customAspect }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.aspectDesc }}</p>
		<div class="mx-4">
			<Signature
				:aspect-ratio="[2, 1]"
				:clear-text="isZh ? '' : text.clear"
				:confirm-text="isZh ? '' : text.confirm"
				@clear="handleClear"
			/>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customColors }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.colorsDesc }}</p>
		<div class="mx-4">
			<Signature
				line-color="#2563eb"
				bg-color="#dbeafe"
				:clear-text="isZh ? '' : text.clear"
				:confirm-text="isZh ? '' : text.confirm"
				@clear="handleClear"
			/>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customLineWidth }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.lineWidthDesc }}</p>
		<div class="mx-4">
			<Signature :line-width="6" :clear-text="isZh ? '' : text.clear" :confirm-text="isZh ? '' : text.confirm" @clear="handleClear" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.rotationExport }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.rotationDesc }}</p>
		<div class="mx-4 mb-3">
			<Tab :labels="rotationLabels" :active="rotationValue" @click-tab="(value) => (rotationValue = value)" />
		</div>
		<div class="mx-4">
			<Signature ref="rotationSignatureRef" :show-buttons="false" />
			<div class="mt-3 flex justify-end gap-3">
				<Button fill="line" size="auto" inj-class="px-4" @click="rotationSignatureRef?.clear()">{{ text.clear }}</Button>
				<Button fill="base" size="auto" inj-class="px-4" @click="handleRotationExport">{{
					isZh ? `导出（${rotation}°）` : `Export (${rotation}°)`
				}}</Button>
			</div>
			<div v-if="rotationImages.length > 0" class="mt-3">
				<p class="mb-2 text-sm opacity-60">{{ text.exported }}</p>
				<ImageList :value="rotationImages" readonly :columns="3" :aspect-ratio="[3, 1]" />
			</div>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customRadius }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.radiusDesc }}</p>
		<div class="mx-4">
			<Signature radius="2xl" :clear-text="isZh ? '' : text.clear" :confirm-text="isZh ? '' : text.confirm" @clear="handleClear" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.hideButtons }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.hideButtonsDesc }}</p>
		<div class="mx-4">
			<Signature ref="signatureRef" :show-buttons="false" />
			<div class="mt-3 flex gap-3">
				<Button fill="line" size="auto" inj-class="px-4" @click="handleExternalClear">{{ text.externalClear }}</Button>
				<Button fill="base" size="auto" inj-class="px-4" @click="handleExternalConfirm">{{ text.externalGet }}</Button>
			</div>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.exportFormats }}</div>
		<div class="mx-4 mb-3">
			<Tab :labels="imageTypeLabels" :active="imageTypeIndex" @click-tab="(value) => (imageTypeIndex = value)" />
		</div>
		<div class="mx-4">
			<Signature
				:image-type="imageType"
				:image-quality="0.8"
				:clear-text="isZh ? '' : text.clear"
				:confirm-text="isZh ? '' : text.confirm"
				@clear="handleClear"
			/>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customButtonText }}</div>
		<div class="mx-4">
			<Signature :clear-text="text.reSign" :confirm-text="text.submitSignature" @clear="handleClear" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customButtonStyle }}</div>
		<div class="mx-4">
			<Signature
				:clear-text="isZh ? '' : text.clear"
				:confirm-text="isZh ? '' : text.confirm"
				:clear-button="{ state: 'error', fill: 'line' }"
				:confirm-button="{ state: 'success', fill: 'base' }"
				@clear="handleClear"
			/>
		</div>

		<div class="h-20" />
		<Toast v-model:visible="toastVisible" :message="toastMessage" :duration="1500" />
	</div>
</template>
