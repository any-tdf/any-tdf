<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { AsyncPicker, Cell } from 'vtdf';
import * as zhData from './data';
import * as enData from './data_en';

type Locale = 'zh_CN' | 'en_US';
type DataItem = Record<string, unknown> & {
	children?: DataItem[];
};

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
		titleProvince: '请选择省级',
		titleCity: '请选择市级',
		titleRegion: '请选择区级',
		selectedItems: '当前选定了：',
		selectedIndexs: '当前选定值位于所在列的索引值分别为：',
		selectData: '请选定数据',
		basic: '基础用法',
		visibleRows: '可见 7 行数为',
		leftAlign: '左对齐',
		customStepText: '自定义上下一步文字',
		nextText: '继续',
		prevText: '返回',
		diffLabelKey: '不同级别使用不同的 labelKey',
		loading: '换一个 Loading 效果',
		roundedTop: '顶部来点圆角',
		showSelected: '显示已选选项',
		dynamicTitle: '动态改变标题',
		withoutPopup: '不使用弹出层'
	},
	en_US: {
		titleProvince: 'Please select state',
		titleCity: 'Please select city',
		titleRegion: 'Please select region',
		selectedItems: 'Currently selected:',
		selectedIndexs: 'Currently selected value is located at the index of each column:',
		selectData: 'Please select data',
		basic: 'Basic usage',
		visibleRows: 'Visible 7 rows',
		leftAlign: 'Left align',
		customStepText: 'Custom next and previous text',
		nextText: 'Continue',
		prevText: 'Back',
		diffLabelKey: 'Different labelKey for each level',
		loading: 'Use another Loading style',
		roundedTop: 'Top corner rounded',
		showSelected: 'Show selected options',
		dynamicTitle: 'Dynamic title',
		withoutPopup: 'Without Popup'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const source = computed(() => (props.locale === 'zh_CN' ? zhData : enData));
const visible = reactive(
	Object.fromEntries(Array.from({ length: 9 }, (_, index) => [`visible${index + 1}`, false])) as Record<string, boolean>
);

const data = ref<DataItem[]>(source.value.linkageData as DataItem[]);
const currentLevel = ref(0);
const lastLevel = ref(false);
const firstLevel = ref(true);
const level1Data = ref<DataItem[]>((source.value.linkageData[0] as DataItem).children || []);
const titleBind = ref(text.value.titleProvince);
const allIndexs = ref<number[]>([]);
const allItems = ref<Record<string, unknown>[]>([]);

const diffLabelKeyData = ref<DataItem[]>(source.value.linkageDiffLabelData as DataItem[]);
const labelKey = ref('province');
const diffLabelKeyCurrentLevel = ref(0);
const diffLabelKeyLastLevel = ref(false);
const diffLabelKeyFirstLevel = ref(true);
const diffLabelKeyLevel1Data = ref<DataItem[]>((source.value.linkageDiffLabelData[0] as DataItem).children || []);

const inlineData = ref<DataItem[]>(source.value.linkageData as DataItem[]);
const inlineCurrentLevel = ref(0);
const inlineLastLevel = ref(false);
const inlineFirstLevel = ref(true);
const inlineLevel1Data = ref<DataItem[]>((source.value.linkageData[0] as DataItem).children || []);

const closePicker = (key: string) => {
	visible[key] = false;
};

const resetState = () => {
	data.value = source.value.linkageData as DataItem[];
	lastLevel.value = false;
	firstLevel.value = true;
	currentLevel.value = 0;
	level1Data.value = (source.value.linkageData[0] as DataItem).children || [];
	titleBind.value = text.value.titleProvince;
};

const nextFunc = (index: number) => {
	if (currentLevel.value === 0) {
		const nextData = ((source.value.linkageData[index] as DataItem).children || []) as DataItem[];
		level1Data.value = nextData;
		setTimeout(() => {
			data.value = nextData;
			currentLevel.value = 1;
			titleBind.value = text.value.titleCity;
			firstLevel.value = false;
		}, 2000);
		return;
	}
	if (currentLevel.value === 1) {
		const nextData = (level1Data.value[index]?.children || []) as DataItem[];
		setTimeout(() => {
			data.value = nextData;
			currentLevel.value = 2;
			titleBind.value = text.value.titleRegion;
			lastLevel.value = true;
		}, 2000);
	}
};

const prevFunc = () => {
	if (currentLevel.value === 1) {
		setTimeout(() => {
			data.value = source.value.linkageData as DataItem[];
			currentLevel.value = 0;
			titleBind.value = text.value.titleProvince;
			firstLevel.value = true;
		}, 2000);
		return;
	}
	if (currentLevel.value === 2) {
		setTimeout(() => {
			data.value = level1Data.value;
			currentLevel.value = 1;
			titleBind.value = text.value.titleCity;
			lastLevel.value = false;
		}, 2000);
	}
};

const resetDiffLabelKeyState = () => {
	diffLabelKeyData.value = source.value.linkageDiffLabelData as DataItem[];
	labelKey.value = 'province';
	diffLabelKeyCurrentLevel.value = 0;
	diffLabelKeyLastLevel.value = false;
	diffLabelKeyFirstLevel.value = true;
	diffLabelKeyLevel1Data.value = (source.value.linkageDiffLabelData[0] as DataItem).children || [];
};

const diffLabelKeyNextFunc = (index: number) => {
	if (diffLabelKeyCurrentLevel.value === 0) {
		const nextData = ((source.value.linkageDiffLabelData[index] as DataItem).children || []) as DataItem[];
		diffLabelKeyLevel1Data.value = nextData;
		setTimeout(() => {
			diffLabelKeyData.value = nextData;
			labelKey.value = 'city';
			diffLabelKeyCurrentLevel.value = 1;
			diffLabelKeyFirstLevel.value = false;
		}, 2000);
		return;
	}
	if (diffLabelKeyCurrentLevel.value === 1) {
		const nextData = (diffLabelKeyLevel1Data.value[index]?.children || []) as DataItem[];
		setTimeout(() => {
			diffLabelKeyData.value = nextData;
			diffLabelKeyCurrentLevel.value = 2;
			labelKey.value = 'region';
			diffLabelKeyLastLevel.value = true;
		}, 2000);
	}
};

const diffLabelKeyPrevFunc = () => {
	if (diffLabelKeyCurrentLevel.value === 1) {
		setTimeout(() => {
			diffLabelKeyData.value = source.value.linkageDiffLabelData as DataItem[];
			diffLabelKeyCurrentLevel.value = 0;
			diffLabelKeyFirstLevel.value = true;
			labelKey.value = 'province';
		}, 2000);
		return;
	}
	if (diffLabelKeyCurrentLevel.value === 2) {
		setTimeout(() => {
			diffLabelKeyData.value = diffLabelKeyLevel1Data.value;
			diffLabelKeyCurrentLevel.value = 1;
			labelKey.value = 'city';
			diffLabelKeyLastLevel.value = false;
		}, 2000);
	}
};

const inlineNextFunc = (index: number) => {
	if (inlineCurrentLevel.value === 0) {
		const nextData = ((source.value.linkageData[index] as DataItem).children || []) as DataItem[];
		inlineLevel1Data.value = nextData;
		inlineData.value = [];
		setTimeout(() => {
			inlineData.value = nextData;
			inlineCurrentLevel.value = 1;
			inlineFirstLevel.value = false;
		}, 1000);
		return;
	}
	if (inlineCurrentLevel.value === 1) {
		const nextData = (inlineLevel1Data.value[index]?.children || []) as DataItem[];
		inlineData.value = [];
		setTimeout(() => {
			inlineData.value = nextData;
			inlineCurrentLevel.value = 2;
			inlineLastLevel.value = true;
		}, 1000);
	}
};

const inlinePrevFunc = () => {
	if (inlineCurrentLevel.value === 1) {
		inlineData.value = [];
		setTimeout(() => {
			inlineData.value = source.value.linkageData as DataItem[];
			inlineCurrentLevel.value = 0;
			inlineFirstLevel.value = true;
		}, 1000);
		return;
	}
	if (inlineCurrentLevel.value === 2) {
		inlineData.value = [];
		setTimeout(() => {
			inlineData.value = inlineLevel1Data.value;
			inlineCurrentLevel.value = 1;
			inlineLastLevel.value = false;
		}, 1000);
	}
};

const getAllDataFunc = (items: Record<string, unknown>[], indexs: number[]) => {
	allItems.value = items;
	allIndexs.value = indexs;
};
</script>

<template>
	<div class="py-4">
		<div class="px-4">
			<template v-if="allItems.length">
				{{ text.selectedItems }}
				<span v-for="(item, index) in allItems" :key="index" class="text-primary dark:text-dark mr-2">{{ item.label }}</span>
			</template>
			<div v-else>{{ text.selectData }}</div>
		</div>
		<div class="px-4">
			<template v-if="allIndexs.length">
				{{ text.selectedIndexs }}
				<span v-for="(index, itemIndex) in allIndexs" :key="itemIndex" class="text-primary dark:text-dark mr-2">{{ index }}</span>
			</template>
			<div v-else>{{ text.selectData }}</div>
		</div>

		<Cell
			:title="text.basic"
			@click="
				() => {
					resetState();
					visible.visible1 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible1"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			@next="nextFunc"
			@prev="prevFunc"
			@confirm="getAllDataFunc"
			@cancel="closePicker('visible1')"
			@close="closePicker('visible1')"
		/>

		<Cell
			:title="text.visibleRows"
			@click="
				() => {
					resetState();
					visible.visible2 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible2"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			:show-row="7"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible2')"
			@close="closePicker('visible2')"
		/>

		<Cell
			:title="text.leftAlign"
			@click="
				() => {
					resetState();
					visible.visible3 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible3"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			align="left"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible3')"
			@close="closePicker('visible3')"
		/>

		<Cell
			:title="text.customStepText"
			@click="
				() => {
					resetState();
					visible.visible5 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible5"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			:next-text="text.nextText"
			:prev-text="text.prevText"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible5')"
			@close="closePicker('visible5')"
		/>

		<Cell
			:title="text.diffLabelKey"
			@click="
				() => {
					resetDiffLabelKeyState();
					visible.visible4 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible4"
			:data="diffLabelKeyData"
			:last-level="diffLabelKeyLastLevel"
			:first-level="diffLabelKeyFirstLevel"
			:label-key="labelKey"
			@next="diffLabelKeyNextFunc"
			@prev="diffLabelKeyPrevFunc"
			@cancel="closePicker('visible4')"
			@close="closePicker('visible4')"
		/>

		<Cell
			:title="text.loading"
			@click="
				() => {
					resetState();
					visible.visible6 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible6"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			:loading="{ type: '1_15', width: '12', height: '12' }"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible6')"
			@close="closePicker('visible6')"
		/>

		<Cell
			:title="text.roundedTop"
			@click="
				() => {
					resetState();
					visible.visible8 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible8"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			:popup="{ radius: 'xl' }"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible8')"
			@close="closePicker('visible8')"
		/>

		<Cell
			:title="text.showSelected"
			@click="
				() => {
					resetState();
					visible.visible7 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible7"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			show-selected
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible7')"
			@close="closePicker('visible7')"
		/>

		<Cell
			:title="text.dynamicTitle"
			@click="
				() => {
					resetState();
					titleBind = text.titleProvince;
					visible.visible9 = true;
				}
			"
		/>
		<AsyncPicker
			v-model:visible="visible.visible9"
			:data="data"
			:last-level="lastLevel"
			:first-level="firstLevel"
			:title="titleBind"
			@next="nextFunc"
			@prev="prevFunc"
			@cancel="closePicker('visible9')"
			@close="closePicker('visible9')"
		/>

		<div class="px-4 py-2">{{ text.withoutPopup }}</div>
		<AsyncPicker
			:popup="null"
			:data="inlineData"
			:last-level="inlineLastLevel"
			:first-level="inlineFirstLevel"
			:height="30"
			@next="inlineNextFunc"
			@prev="inlinePrevFunc"
		/>
	</div>
</template>
