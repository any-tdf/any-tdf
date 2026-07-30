<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ButtonGroup, Icon, IndexBar, Toast } from 'vtdf';
import type { ButtonGroupItemProps, IndexBarItemProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type ContactItem = {
	name: string;
	phone: string;
};

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const navHeight = 48;
const bottomHeight = 50;
const colors = [
	'bg-red-500',
	'bg-orange-500',
	'bg-amber-500',
	'bg-yellow-500',
	'bg-lime-500',
	'bg-green-500',
	'bg-emerald-500',
	'bg-teal-500',
	'bg-cyan-500',
	'bg-sky-500',
	'bg-blue-500',
	'bg-indigo-500',
	'bg-violet-500',
	'bg-purple-500',
	'bg-fuchsia-500',
	'bg-pink-500',
	'bg-rose-500'
];

const isZh = computed(() => props.locale === 'zh_CN');
const height = ref(600);
const radius = ref<'sm' | 'full' | 'none'>('sm');
const dataFlag = ref(2);
const scrollAlign = ref(true);
const injClassList = ref<string[]>([]);
const renderStyle = ref(0);
const visible = ref(false);
const toastMessage = ref('');

const addressList = computed<IndexBarItemProps[]>(() =>
	isZh.value
		? [
				{ index: 'A', title: 'A', child: ['澳门', '安宁', '安庆', '鞍山'] },
				{ index: 'B', title: 'B', child: ['北京', '保定', '包头', '宝鸡'] },
				{ index: 'C', title: 'C', child: ['承德', '沧州', '赤峰'] },
				{ index: 'D', title: 'D', child: ['大同', '大连', '大理'] },
				{ index: 'E', title: 'E', child: ['恩施', '鄂尔多斯', '峨眉山'] },
				{ index: 'F', title: 'F', child: ['抚顺', '佛山', '福泉'] },
				{ index: 'G', title: 'G', child: ['个旧', '桂林', '赣州'] },
				{ index: 'H', title: 'H', child: ['邯郸', '呼和浩特', '呼伦贝尔'] },
				{ index: 'J', title: 'J', child: ['吉林', '酒泉', '晋江'] },
				{ index: 'K', title: 'K', child: ['昆明', '昆山', '开封'] },
				{ index: 'L', title: 'L', child: ['拉萨', '兰州', '泸州'] },
				{ index: 'M', title: 'M', child: ['绵阳', '马鞍山', '牡丹江'] },
				{ index: 'N', title: 'N', child: ['南昌', '南京', '宁波'] },
				{ index: 'P', title: 'P', child: ['莆田', '攀枝花', '平顶山'] },
				{ index: 'Q', title: 'Q', child: ['曲靖', '青岛', '齐齐哈尔'] },
				{ index: 'R', title: 'R', child: ['瑞丽', '瑞安', '瑞金'] },
				{ index: 'S', title: 'S', child: ['三亚', '上海', '深圳'] },
				{ index: 'T', title: 'T', child: ['台州', '太原', '天津'] },
				{ index: 'W', title: 'W', child: ['武汉', '无锡', '芜湖'] },
				{ index: 'X', title: 'X', child: ['西安', '厦门', '宣威'] },
				{ index: 'Y', title: 'Y', child: ['义乌', '银川', '玉溪'] },
				{ index: 'Z', title: 'Z', child: ['昭通', '遵义', '张家界'] }
			]
		: [
				{ index: 'A', title: 'A', child: ['Macau', 'Anning', 'Anqing', 'Anshan'] },
				{ index: 'B', title: 'B', child: ['Beijing', 'Baoding', 'Baotou', 'Baoji'] },
				{ index: 'C', title: 'C', child: ['Chengde', 'Cangzhou', 'Chifeng'] },
				{ index: 'D', title: 'D', child: ['Datong', 'Dalian', 'Dali'] },
				{ index: 'E', title: 'E', child: ['Enshi', 'Ordos', 'Emeishan'] },
				{ index: 'F', title: 'F', child: ['Fushun', 'Foshan', 'Fuquan'] },
				{ index: 'G', title: 'G', child: ['Gejiu', 'Guilin', 'Ganzhou'] },
				{ index: 'H', title: 'H', child: ['Handan', 'Hohhot', 'Hulunbuir'] },
				{ index: 'J', title: 'J', child: ['Jilin', 'Jiuquan', 'Jinjiang'] },
				{ index: 'K', title: 'K', child: ['Kunming', 'Kunshan', 'Kaifeng'] },
				{ index: 'L', title: 'L', child: ['Lhasa', 'Lanzhou', 'Luzhou'] },
				{ index: 'M', title: 'M', child: ['Mianyang', 'Maans', 'Mudanjiang'] },
				{ index: 'N', title: 'N', child: ['Nanchang', 'Nanjing', 'Ningbo'] },
				{ index: 'P', title: 'P', child: ['Putian', 'Panzhihua', 'Pingdingshan'] },
				{ index: 'Q', title: 'Q', child: ['Qujing', 'Qingdao', 'Qiqihar'] },
				{ index: 'R', title: 'R', child: ['Ruili', 'Ruian', 'Ruijin'] },
				{ index: 'S', title: 'S', child: ['Sanya', 'Shanghai', 'Shenzhen'] },
				{ index: 'T', title: 'T', child: ['Taizhou', 'Taiyuan', 'Tianjin'] },
				{ index: 'W', title: 'W', child: ['Wuhan', 'Wuxi', 'Wuhu'] },
				{ index: 'X', title: 'X', child: ['Xi an', 'Xiamen', 'Xuanwei'] },
				{ index: 'Y', title: 'Y', child: ['Yiwu', 'Yinchuan', 'Yuxi'] },
				{ index: 'Z', title: 'Z', child: ['Zhaotong', 'Zunyi', 'Zhangjiajie'] }
			]
);

const emojiList = computed<IndexBarItemProps[]>(() =>
	isZh.value
		? [
				{ index: '😀', title: '表情与情感', child: ['😂', '🥰', '🥱', '🧐'] },
				{ index: '👋', title: '人物与身体', child: ['👌', '🤝', '👨‍💻', '💪'] },
				{ index: '🐵', title: '动物与自然', child: ['🦄', '🌱', '🦁', '🐶'] },
				{ index: '🍎', title: '食物与饮料', child: ['🍑', '🍞', '🍽️', '🍩'] },
				{ index: '🌍', title: '旅行与地理', child: ['🏔️', '🚆', '✈️', '🛵'] },
				{ index: '🏆', title: '活动', child: ['⚽', '🎨', '🏀', '🧨'] },
				{ index: '📱', title: '物品', child: ['🎩', '💻', '🎒', '📖'] },
				{ index: '⚠️', title: '符号标志', child: ['🚫', '⚛️', '🛄', '🔱'] },
				{ index: '🏁', title: '旗帜', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
			]
		: [
				{ index: '😀', title: 'Smileys & Emotion', child: ['😂', '🥰', '🥱', '🧐'] },
				{ index: '👋', title: 'People & Body', child: ['👌', '🤝', '👨‍💻', '💪'] },
				{ index: '🐵', title: 'Animals & Nature', child: ['🦄', '🌱', '🦁', '🐶'] },
				{ index: '🍎', title: 'Food & Drink', child: ['🍑', '🍞', '🍽️', '🍩'] },
				{ index: '🌍', title: 'Travel & Places', child: ['🏔️', '🚆', '✈️', '🛵'] },
				{ index: '🏆', title: 'Activities', child: ['⚽', '🎨', '🏀', '🧨'] },
				{ index: '📱', title: 'Objects', child: ['🎩', '💻', '🎒', '📖'] },
				{ index: '⚠️', title: 'Symbols', child: ['🚫', '⚛️', '🛄', '🔱'] },
				{ index: '🏁', title: 'Flags', child: ['🇨🇳', '🇺🇸', '🇧🇻', '🇦🇹'] }
			]
);

const contactList = computed<IndexBarItemProps<ContactItem>[]>(() =>
	isZh.value
		? [
				{
					index: 'A',
					title: 'A',
					child: [
						{ name: '阿里', phone: '138****1234' },
						{ name: '安迪', phone: '139****5678' },
						{ name: '艾米', phone: '137****9012' }
					]
				},
				{
					index: 'B',
					title: 'B',
					child: [
						{ name: '贝贝', phone: '136****3456' },
						{ name: '博文', phone: '135****7890' }
					]
				},
				{
					index: 'C',
					title: 'C',
					child: [
						{ name: '陈晨', phone: '134****1234' },
						{ name: '程程', phone: '133****5678' },
						{ name: '聪聪', phone: '132****9012' }
					]
				},
				{
					index: 'D',
					title: 'D',
					child: [
						{ name: '丹丹', phone: '131****3456' },
						{ name: '东东', phone: '130****7890' }
					]
				},
				{
					index: 'L',
					title: 'L',
					child: [
						{ name: '李明', phone: '158****1234' },
						{ name: '刘洋', phone: '159****5678' },
						{ name: '林涛', phone: '157****9012' }
					]
				},
				{
					index: 'W',
					title: 'W',
					child: [
						{ name: '王芳', phone: '186****3456' },
						{ name: '吴刚', phone: '187****7890' },
						{ name: '魏明', phone: '188****1234' }
					]
				},
				{
					index: 'Z',
					title: 'Z',
					child: [
						{ name: '张伟', phone: '198****5678' },
						{ name: '赵敏', phone: '199****9012' },
						{ name: '周杰', phone: '197****3456' }
					]
				}
			]
		: [
				{
					index: 'A',
					title: 'A',
					child: [
						{ name: 'Alice', phone: '138****1234' },
						{ name: 'Andy', phone: '139****5678' },
						{ name: 'Amy', phone: '137****9012' }
					]
				},
				{
					index: 'B',
					title: 'B',
					child: [
						{ name: 'Bob', phone: '136****3456' },
						{ name: 'Ben', phone: '135****7890' }
					]
				},
				{
					index: 'C',
					title: 'C',
					child: [
						{ name: 'Charlie', phone: '134****1234' },
						{ name: 'Chris', phone: '133****5678' },
						{ name: 'Cathy', phone: '132****9012' }
					]
				},
				{
					index: 'D',
					title: 'D',
					child: [
						{ name: 'David', phone: '131****3456' },
						{ name: 'Diana', phone: '130****7890' }
					]
				},
				{
					index: 'J',
					title: 'J',
					child: [
						{ name: 'Jack', phone: '158****1234' },
						{ name: 'John', phone: '159****5678' },
						{ name: 'Jane', phone: '157****9012' }
					]
				},
				{
					index: 'M',
					title: 'M',
					child: [
						{ name: 'Mike', phone: '186****3456' },
						{ name: 'Mary', phone: '187****7890' },
						{ name: 'Mark', phone: '188****1234' }
					]
				},
				{
					index: 'T',
					title: 'T',
					child: [
						{ name: 'Tom', phone: '198****5678' },
						{ name: 'Tony', phone: '199****9012' },
						{ name: 'Tina', phone: '197****3456' }
					]
				}
			]
);

const activeData = computed(() => (dataFlag.value === 0 ? addressList.value : dataFlag.value === 1 ? emojiList.value : contactList.value));
const activeLabel = computed(() => {
	if (isZh.value) return dataFlag.value === 0 ? '城市' : dataFlag.value === 1 ? '表情' : '联系人';
	return dataFlag.value === 0 ? 'City' : dataFlag.value === 1 ? 'Emoji' : 'Contact';
});
const styleLabel = computed(() => {
	if (dataFlag.value !== 2) return isZh.value ? '样式' : 'Style';
	if (isZh.value) return renderStyle.value === 0 ? '卡片' : renderStyle.value === 1 ? '列表' : '标签';
	return renderStyle.value === 0 ? 'Card' : renderStyle.value === 1 ? 'List' : 'Tag';
});
const controlItems = computed<ButtonGroupItemProps[]>(() => [
	{ text: activeLabel.value },
	{ text: scrollAlign.value ? (isZh.value ? '对齐关闭' : 'Align Off') : isZh.value ? '对齐开启' : 'Align On' },
	{ text: isZh.value ? '圆角' : 'Radius' },
	{ text: styleLabel.value }
]);

const showToast = (message: string) => {
	toastMessage.value = message;
	visible.value = true;
};

const changeRadius = () => {
	radius.value = radius.value === 'sm' ? 'full' : radius.value === 'full' ? 'none' : 'sm';
};

const changeList = () => {
	dataFlag.value = dataFlag.value === 0 ? 1 : dataFlag.value === 1 ? 2 : 0;
	renderStyle.value = 0;
};

const changeScrollAlign = () => {
	scrollAlign.value = !scrollAlign.value;
};

const changeStyle = () => {
	if (dataFlag.value === 2) {
		renderStyle.value = (renderStyle.value + 1) % 3;
		return;
	}
	injClassList.value = injClassList.value.length > 0 ? [] : ['!text-3xl text-center', 'text-xs text-center !py-1'];
};

const handleControlClick = (index: number) => {
	const handlers = [changeList, changeScrollAlign, changeRadius, changeStyle];
	handlers[index]?.();
};

const handleClickChild = (index: number, group: IndexBarItemProps<unknown>, childIndex: number, child: unknown) => {
	if (dataFlag.value === 2) {
		const contact = child as ContactItem;
		showToast(isZh.value ? `点击了 ${contact.name}，电话：${contact.phone}` : `Clicked ${contact.name}, Phone: ${contact.phone}`);
		return;
	}
	showToast(
		isZh.value
			? `点击了第 ${index + 1} 组（${group.title}）中的第 ${childIndex + 1} 项（${String(child)}）`
			: `Clicked group ${index + 1} (${group.title}) item ${childIndex + 1} (${String(child)})`
	);
};

onMounted(() => {
	height.value = window.innerHeight - navHeight - bottomHeight;
});
</script>

<template>
	<IndexBar
		:key="dataFlag"
		:data="activeData"
		:radius="radius"
		:height="height"
		:scroll-align="scrollAlign"
		:title-inj-class="injClassList[0]"
		:text-inj-class="injClassList[1]"
		:top="navHeight"
		@click-child="handleClickChild"
	>
		<template v-if="dataFlag === 2" #default="{ item, childIndex, groupIndex }">
			<div v-if="renderStyle === 0" class="flex items-center gap-3 py-1">
				<div
					:class="[
						colors[(groupIndex * 3 + childIndex) % colors.length],
						'flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-white'
					]"
				>
					{{ (item as ContactItem).name[0] }}
				</div>
				<div class="flex-1">
					<div class="font-medium">{{ (item as ContactItem).name }}</div>
					<div class="text-xs text-black/50 dark:text-white/50">{{ (item as ContactItem).phone }}</div>
				</div>
				<Icon name="ri-phone-line" />
			</div>
			<div v-else-if="renderStyle === 1" class="flex items-center justify-between py-2">
				<span class="font-medium">{{ (item as ContactItem).name }}</span>
				<span class="text-sm text-black/60 dark:text-white/60">{{ (item as ContactItem).phone }}</span>
			</div>
			<div v-else class="flex items-center gap-2 py-1">
				<span :class="[colors[(groupIndex * 3 + childIndex) % colors.length], 'rounded-md px-2 py-1 text-sm text-white']">{{
					(item as ContactItem).name
				}}</span>
				<span class="text-xs text-black/50 dark:text-white/50">{{ (item as ContactItem).phone }}</span>
			</div>
		</template>
	</IndexBar>

	<Toast v-model:visible="visible" :message="toastMessage" />

	<div class="sticky bottom-0 z-10 bg-white/90 dark:bg-black/90">
		<ButtonGroup fill="lineState" :items="controlItems" @click="handleControlClick" />
	</div>
</template>
