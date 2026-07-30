<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Button, Cell, ColorPicker } from 'vtdf/components';
import type { ColorPickerValue, OklchColor } from 'vtdf/types';

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
		defaultPopup: '默认（ Popup 模式 ）',
		openPicker: '打开颜色选择器',
		returnColors: '返回颜色：',
		currentColors: '当前颜色：',
		direct: '直接显示模式',
		triggers: '多种触发方式',
		buttonTrigger: '按钮触发',
		cellTrigger: '单元格触发',
		singleMode: '单一模式（无 Tab ）',
		oklchOnly: '仅 OKLCH 模式',
		oneColor: '返回颜色：',
		doubleMode: '双模式',
		hexRgb: 'HEX + RGB 模式',
		customTab: '自定义 Tab 样式',
		lineTab: '线型 Tab',
		hidePreview: '隐藏预览',
		hidePreviewButton: '隐藏预览区',
		hideInputs: '隐藏输入框',
		hideCopy: '隐藏复制功能',
		hideCopyButton: '隐藏复制',
		hidePanel: '隐藏色块面板',
		hidePanelDesc: 'showPanel = false 仅使用滑块调色',
		initialOklch: '初始色值 - OKLCH 格式',
		initialRgb: '初始色值 - RGB 格式',
		initialHex: '初始色值 - HEX 格式',
		open: '打开'
	},
	en_US: {
		defaultPopup: 'Default ( Popup Mode )',
		openPicker: 'Open ColorPicker',
		returnColors: 'Colors: ',
		currentColors: 'Current: ',
		direct: 'Direct Display Mode',
		triggers: 'Multiple Triggers',
		buttonTrigger: 'Button Trigger',
		cellTrigger: 'Cell Trigger',
		singleMode: 'Single Mode ( No Tab )',
		oklchOnly: 'OKLCH Only',
		oneColor: 'Color: ',
		doubleMode: 'Dual Mode',
		hexRgb: 'HEX + RGB Mode',
		customTab: 'Custom Tab Style',
		lineTab: 'Line Type Tab',
		hidePreview: 'Hide Preview',
		hidePreviewButton: 'Hide Preview',
		hideInputs: 'Hide Inputs',
		hideCopy: 'Hide Copy',
		hideCopyButton: 'Hide Copy',
		hidePanel: 'Hide Color Panel',
		hidePanelDesc: 'showPanel = false, use sliders only',
		initialOklch: 'Initial Value - OKLCH Format',
		initialRgb: 'Initial Value - RGB Format',
		initialHex: 'Initial Value - HEX Format',
		open: 'Open'
	}
};

const text = computed(() => messages[props.locale]);
const visible = reactive<Record<string, boolean>>({
	visible1: false,
	visible3: false,
	visible4: false,
	visible5: false,
	visible6: false,
	visible7: false,
	visible8: false,
	visible9: false,
	visible9b: false,
	visible10: false,
	visible11: false,
	visible12: false
});
const colors1 = ref<string[]>([]);
const value2 = ref<OklchColor>({ l: 0.6, c: 0.2, h: 30 });
const colors2 = ref<string[]>([]);
const colors3 = ref<string[]>([]);
const colors4 = ref<string[]>([]);
const colors5 = ref<string[]>([]);
const colors6 = ref<string[]>([]);
const value10 = ref<ColorPickerValue>({ l: 0.7, c: 0.2, h: 150 });
const colors10 = ref<string[]>([]);
const value11 = ref<ColorPickerValue>([255, 100, 50]);
const colors11 = ref<string[]>([]);
const value12 = ref<ColorPickerValue>('#8B5CF6');
const colors12 = ref<string[]>([]);
const joinColors = (colors: string[]) => colors.join(' | ');
</script>

<template>
	<div class="mx-4 mt-8 text-lg font-bold">{{ text.defaultPopup }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible1 = true">{{ text.openPicker }}</Button>
		<ColorPicker v-model:visible="visible.visible1" @close="(colors) => (colors1 = colors)" />
		<div v-if="colors1.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors1) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.direct }}</div>
	<div class="px-4 py-4">
		<ColorPicker v-model:value="value2" :popup="null" @change="(colors) => (colors2 = colors)" />
		<div v-if="colors2.length > 0" class="mt-2 text-sm">{{ text.currentColors }}{{ joinColors(colors2) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.triggers }}</div>
	<div class="space-y-2 px-4 py-4">
		<Button @click="visible.visible3 = true">{{ text.buttonTrigger }}</Button>
		<Cell :title="text.cellTrigger" right="arrow" @click="visible.visible3 = true" />
		<div
			class="h-10 w-10 cursor-pointer rounded-md border border-black/10 dark:border-white/20"
			:style="{ backgroundColor: colors3[2] || '#7B68EE' }"
			role="button"
			tabindex="0"
			@click="visible.visible3 = true"
			@keydown="(event) => event.key === 'Enter' && (visible.visible3 = true)"
		/>
		<ColorPicker v-model:visible="visible.visible3" @close="(colors) => (colors3 = colors)" />
		<div v-if="colors3.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors3) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.singleMode }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible4 = true">{{ text.oklchOnly }}</Button>
		<ColorPicker v-model:visible="visible.visible4" :modes="['oklch']" @close="(colors) => (colors4 = colors)" />
		<div v-if="colors4.length > 0" class="mt-2 text-sm">{{ text.oneColor }}{{ colors4[0] }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.doubleMode }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible5 = true">{{ text.hexRgb }}</Button>
		<ColorPicker v-model:visible="visible.visible5" :modes="['hex', 'rgb']" @close="(colors) => (colors5 = colors)" />
		<div v-if="colors5.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors5) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.customTab }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible6 = true">{{ text.lineTab }}</Button>
		<ColorPicker v-model:visible="visible.visible6" :tab="{ lineType: true }" @close="(colors) => (colors6 = colors)" />
		<div v-if="colors6.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors6) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.hidePreview }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible7 = true">{{ text.hidePreviewButton }}</Button>
		<ColorPicker v-model:visible="visible.visible7" :show-preview="false" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.hideInputs }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible8 = true">{{ text.hideInputs }}</Button>
		<ColorPicker v-model:visible="visible.visible8" :show-inputs="false" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.hideCopy }}</div>
	<div class="px-4 py-4">
		<Button @click="visible.visible9 = true">{{ text.hideCopyButton }}</Button>
		<ColorPicker v-model:visible="visible.visible9" :show-copy="false" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.hidePanel }}</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm text-black/60 dark:text-white/60">{{ text.hidePanelDesc }}</div>
		<Button @click="visible.visible9b = true">{{ text.hidePanel }}</Button>
		<ColorPicker v-model:visible="visible.visible9b" :show-panel="false" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.initialOklch }}</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = { l: 0.7, c: 0.2, h: 150 }</div>
		<Button @click="visible.visible10 = true">{{ text.open }}</Button>
		<ColorPicker v-model:visible="visible.visible10" v-model:value="value10" @close="(colors) => (colors10 = colors)" />
		<div v-if="colors10.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors10) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.initialRgb }}</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = [255, 100, 50] modes = ['rgb']</div>
		<Button @click="visible.visible11 = true">{{ text.open }}</Button>
		<ColorPicker v-model:visible="visible.visible11" v-model:value="value11" :modes="['rgb']" @close="(colors) => (colors11 = colors)" />
		<div v-if="colors11.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors11) }}</div>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">{{ text.initialHex }}</div>
	<div class="px-4 py-4">
		<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = '#8B5CF6' modes = ['hex']</div>
		<Button @click="visible.visible12 = true">{{ text.open }}</Button>
		<ColorPicker v-model:visible="visible.visible12" v-model:value="value12" :modes="['hex']" @close="(colors) => (colors12 = colors)" />
		<div v-if="colors12.length > 0" class="mt-2 text-sm">{{ text.returnColors }}{{ joinColors(colors12) }}</div>
	</div>

	<div class="h-20" />
</template>
