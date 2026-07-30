<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Cell, Picker } from 'vtdf';
import type { PickerMultipleItem } from 'vtdf/types';
import * as zhData from './data';
import * as enData from './data_en';

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
		select: '请选择',
		basic: '基础用法',
		customTitle: '自定义标题',
		selectProvince: '请选择省份',
		visibleRows: '可见 7 行',
		closeAutoScroll: '关闭自动滚动至上次选定项',
		initFourth: '初始选定始终为第 4 项',
		initFourthSub: '需要关闭自动选定上次选中项',
		cancelAnimation: '自动滚动时取消动画',
		customLabelKey: '自定义 label 的 key 值',
		selectCity: '请选择城市',
		rightDetail: '右侧展示选定项',
		leftAlign: '单列左对齐',
		multiColumn: '多列选择器',
		columnRows: '不同列可见行数',
		columnFlex: '不同列 flex 比例',
		columnAlign: '多列不同对齐方式',
		linkage: '多级联动',
		linkageRows: '多级联动不同可见行数',
		linkageFlex: '多级联动不同 flex 比例',
		linkageLabelKey: '多级联动自定义每级 label 的 key 值',
		linkageChildrenKey: '多级联动自定义上下级 children 的 key 值',
		linkageAlign: '联动不同对齐方式',
		linkageInit: '多级联动设置每列初始选定项',
		selectedItems: '当前选定了：',
		selectedIndexs: '当前选定值位于所在列的索引值分别为：',
		selectData: '请选定数据',
		getSelected: '获取选定数据',
		roundedTop: '顶部来点圆角',
		singleMultiple: '单列多选',
		columnMultiple: '多列多选',
		linkageMultiple: '联动多选',
		selectedCount: '已选 {count} 项',
		withoutPopup: '不使用弹出层'
	},
	en_US: {
		select: 'Please select',
		basic: 'Basic usage',
		customTitle: 'Custom title',
		selectProvince: 'Please select state',
		visibleRows: 'Visible 7 rows',
		closeAutoScroll: 'Close automatic scrolling to the last selected item',
		initFourth: 'Initial selection is always the 4th item',
		initFourthSub: 'Need to close automatic selection of the last selected item',
		cancelAnimation: 'Cancel animation when scrolling',
		customLabelKey: 'Custom label key value',
		selectCity: 'Please select city',
		rightDetail: 'Right display selected item',
		leftAlign: 'Single column left alignment',
		multiColumn: 'Multi-column picker',
		columnRows: 'Different column visibility rows',
		columnFlex: 'Different column flex ratios',
		columnAlign: 'Different column alignments',
		linkage: 'Multi-level linkage',
		linkageRows: 'Multi-level linkage different visible rows',
		linkageFlex: 'Multi-level linkage different flex ratios',
		linkageLabelKey: 'Multi-level linkage custom label key for each level',
		linkageChildrenKey: "Multi-level linkage custom key for each level's children",
		linkageAlign: 'Multi-level linkage different alignments',
		linkageInit: 'Multi-level linkage set initial selected items for each column',
		selectedItems: 'Currently selected:',
		selectedIndexs: 'Currently selected value is located at the index of each column:',
		selectData: 'Please select data',
		getSelected: 'Get selected data',
		roundedTop: 'Top corner rounded',
		singleMultiple: 'Single column multiple',
		columnMultiple: 'Multiple columns multiple',
		linkageMultiple: 'Linkage multiple',
		selectedCount: '{count} selected',
		withoutPopup: 'Without Popup'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const dataSource = computed(() => (props.locale === 'zh_CN' ? zhData : enData));
const datas = computed(() => [{ data: dataSource.value.someProvinceList }]);
const col3Datas = computed(() => [
	{ data: dataSource.value.weekList },
	{ data: dataSource.value.amOrPmList },
	{ data: dataSource.value.timeList }
]);
const visible = reactive(
	Object.fromEntries(Array.from({ length: 25 }, (_, index) => [`visible${index + 1}`, false])) as Record<string, boolean>
);
const currentDetail = ref(text.value.select);
const allItems = ref<{ [key: string]: string }[]>([]);
const allIndexs = ref<number[]>([]);
const multipleSelected1 = ref<PickerMultipleItem[]>([]);
const multipleSelected2 = ref<PickerMultipleItem[]>([]);
const multipleSelected3 = ref<PickerMultipleItem[]>([]);

const selectedCountText = (count: number) => text.value.selectedCount.replace('{count}', `${count}`);
</script>

<template>
	<div class="py-4">
		<Cell :title="text.basic" @click="visible.visible1 = true" />
		<Picker v-model:visible="visible.visible1" :datas="datas" />

		<Cell :title="text.customTitle" @click="visible.visible2 = true" />
		<Picker v-model:visible="visible.visible2" :title="text.selectProvince" :datas="datas" />

		<Cell :title="text.visibleRows" @click="visible.visible3 = true" />
		<Picker v-model:visible="visible.visible3" :datas="[{ data: dataSource.someProvinceList, showRow: 7 }]" />

		<Cell :title="text.closeAutoScroll" @click="visible.visible4 = true" />
		<Picker v-model:visible="visible.visible4" :datas="datas" :auto-scroll-to-last="false" />

		<Cell :title="text.initFourth" :sub-title="text.initFourthSub" @click="visible.visible5 = true" />
		<Picker
			v-model:visible="visible.visible5"
			:datas="[{ data: dataSource.someProvinceList, initIndex: 3 }]"
			:auto-scroll-to-last="false"
		/>

		<Cell :title="text.cancelAnimation" @click="visible.visible6 = true" />
		<Picker v-model:visible="visible.visible6" :datas="[{ data: dataSource.someProvinceList, useAnimation: false }]" />

		<Cell :title="text.customLabelKey" @click="visible.visible7 = true" />
		<Picker v-model:visible="visible.visible7" :datas="[{ data: dataSource.cityList, labelKey: 'cityName' }]" :title="text.selectCity" />

		<Cell :title="text.rightDetail" :detail="currentDetail" @click="visible.visible8 = true" />
		<Picker v-model:visible="visible.visible8" :datas="datas" @confirm="(items) => (currentDetail = items[0]?.label || '')" />

		<Cell :title="text.leftAlign" @click="visible.visible20 = true" />
		<Picker v-model:visible="visible.visible20" :datas="[{ data: dataSource.someProvinceList, align: 'left' }]" />

		<Cell :title="text.multiColumn" @click="visible.visible9 = true" />
		<Picker v-model:visible="visible.visible9" :datas="col3Datas" />

		<Cell :title="text.columnRows" @click="visible.visible10 = true" />
		<Picker
			v-model:visible="visible.visible10"
			:datas="[{ data: dataSource.weekList }, { data: dataSource.amOrPmList, showRow: 3 }, { data: dataSource.timeList, showRow: 7 }]"
		/>

		<Cell :title="text.columnFlex" @click="visible.visible11 = true" />
		<Picker
			v-model:visible="visible.visible11"
			:datas="[
				{ data: dataSource.weekList, flex: 3 },
				{ data: dataSource.amOrPmList, flex: 1 },
				{ data: dataSource.timeList, flex: 2 }
			]"
		/>

		<Cell :title="text.columnAlign" @click="visible.visible21 = true" />
		<Picker
			v-model:visible="visible.visible21"
			:datas="[
				{ data: dataSource.weekList, align: 'left' },
				{ data: dataSource.amOrPmList, align: 'center' },
				{ data: dataSource.timeList, align: 'right' }
			]"
		/>

		<Cell :title="text.linkage" @click="visible.visible12 = true" />
		<Picker v-model:visible="visible.visible12" :datas="dataSource.linkageData" is-linkage />

		<Cell :title="text.linkageRows" @click="visible.visible13 = true" />
		<Picker v-model:visible="visible.visible13" :datas="dataSource.linkageData" :linkage-show-rows="[3, 5, 7]" is-linkage />

		<Cell :title="text.linkageFlex" @click="visible.visible14 = true" />
		<Picker v-model:visible="visible.visible14" :datas="dataSource.linkageData" :linkage-flexs="[1, 2, 3]" is-linkage />

		<Cell :title="text.linkageLabelKey" @click="visible.visible15 = true" />
		<Picker
			v-model:visible="visible.visible15"
			:datas="dataSource.linkagDiffLabelKeyData"
			:linkage-label-keys="['province', 'city', 'region']"
			is-linkage
		/>

		<Cell :title="text.linkageChildrenKey" @click="visible.visible16 = true" />
		<Picker v-model:visible="visible.visible16" :datas="dataSource.linkagCustomChildrenKeyData" linkage-children-key="child" is-linkage />

		<Cell :title="text.linkageAlign" @click="visible.visible22 = true" />
		<Picker v-model:visible="visible.visible22" :datas="dataSource.linkageData" :linkage-aligns="['right', 'center', 'left']" is-linkage />

		<Cell :title="text.linkageInit" @click="visible.visible17 = true" />
		<Picker v-model:visible="visible.visible17" :datas="dataSource.linkageData" :linkage-init-indexs="[0, 1, 8]" is-linkage />

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
		<Cell :title="text.getSelected" @click="visible.visible18 = true" />
		<Picker
			v-model:visible="visible.visible18"
			:datas="col3Datas"
			@confirm="
				(items, indexs) => {
					allItems = items;
					allIndexs = indexs;
				}
			"
		/>

		<Cell :title="text.roundedTop" @click="visible.visible19 = true" />
		<Picker v-model:visible="visible.visible19" :datas="datas" :popup="{ radius: 'xl' }" />

		<Cell
			:title="text.singleMultiple"
			:sub-title="multipleSelected1.length > 0 ? selectedCountText(multipleSelected1.length) : ''"
			@click="visible.visible23 = true"
		/>
		<Picker v-model:visible="visible.visible23" v-model:multiple-selected="multipleSelected1" :datas="datas" multiple />

		<Cell
			:title="text.columnMultiple"
			:sub-title="multipleSelected2.length > 0 ? selectedCountText(multipleSelected2.length) : ''"
			@click="visible.visible24 = true"
		/>
		<Picker v-model:visible="visible.visible24" v-model:multiple-selected="multipleSelected2" :datas="col3Datas" multiple />

		<Cell
			:title="text.linkageMultiple"
			:sub-title="multipleSelected3.length > 0 ? selectedCountText(multipleSelected3.length) : ''"
			@click="visible.visible25 = true"
		/>
		<Picker
			v-model:visible="visible.visible25"
			v-model:multiple-selected="multipleSelected3"
			:datas="dataSource.linkageData"
			is-linkage
			multiple
		/>

		<div class="px-4 py-2">{{ text.withoutPopup }}</div>
		<Picker :popup="null" :datas="datas" :height="30" />
	</div>
</template>
