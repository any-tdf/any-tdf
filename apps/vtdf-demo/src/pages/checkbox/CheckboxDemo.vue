<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Checkbox, CheckboxItem, Divider, Icon } from 'vtdf/components';
import type { CheckboxItemProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type ImageCheckboxItem = CheckboxItemProps & { imgName?: string };
type VoiceCheckboxItem = CheckboxItemProps & { voices: string[] };

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
		horizontal: '横向排列',
		basic: '简单用法',
		textPosition: '文字在不同位置',
		customIcons: '自定义图标',
		buttonChild: 'checkboxChild 为 Button 组件',
		customChild: 'checkboxChild 为自定义元素',
		imageOptions: '图片选项',
		selectedPrefix: '已选 ',
		noneSelected: '未选择任何英雄',
		inline: '行内元素排列',
		inlineChild: 'checkboxChild 行内元素排列',
		selected: '已选：',
		vertical: '纵向排列',
		longText: '长文字选项',
		leftText: '文字靠左',
		complex: '复杂选项 && 自定义选中效果',
		batch: '批量操作',
		unselected: '未选：',
		all: '全选',
		none: '全不选',
		reverse: '反选',
		animation: '带动画',
		no: '未选',
		yes: '已选'
	},
	en_US: {
		horizontal: 'Horizontal Layout',
		basic: 'Basic Usage',
		textPosition: 'Text Position',
		customIcons: 'Custom Icons',
		buttonChild: 'checkboxChild as Button Component',
		customChild: 'checkboxChild as Custom Element',
		imageOptions: 'Image Options',
		selectedPrefix: 'Selected ',
		noneSelected: 'No heroes selected',
		inline: 'Inline Layout',
		inlineChild: 'checkboxChild Inline Layout',
		selected: 'Selected: ',
		vertical: 'Vertical Layout',
		longText: 'Long Text Options',
		leftText: 'Left Aligned Text',
		complex: 'Complex Options && Custom Selection Effect',
		batch: 'Batch Operations',
		unselected: 'Unselected: ',
		all: 'All',
		none: 'None',
		reverse: 'Reverse',
		animation: 'With Animation',
		no: 'Unselected',
		yes: 'Selected'
	}
};

const text = computed(() => messages[props.locale]);
const dota = computed<CheckboxItemProps[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ label: '主宰', name: '奶棒人' },
				{ label: '白牛', name: '令狐冲' },
				{ label: '光法', name: '光之守卫' },
				{ label: '猛犸', name: '马格纳斯' }
			]
		: [
				{ label: 'Jugg', name: 'Juggernaut' },
				{ label: 'SB', name: 'Spirit Breaker' },
				{ label: 'KOTL', name: 'Keeper of the Light' },
				{ label: 'Mag', name: 'Magnus' }
			]
);
const dotaInlines = computed<CheckboxItemProps[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ label: '火女', name: '火女' },
				{ label: '小牛', name: '小牛' },
				{ label: '水人', name: '水人' },
				{ label: '火枪', name: '火枪' },
				{ label: '斯温', name: '斯温' },
				{ label: '祈求者', name: '祈求者' },
				{ label: '潮汐', name: '潮汐' },
				{ label: '蝙蝠', name: '蝙蝠' },
				{ label: '猛犸', name: '猛犸' }
			]
		: [
				{ label: 'Lina', name: 'Lina' },
				{ label: 'SB', name: 'Spirit Breaker' },
				{ label: 'Morph', name: 'Morphling' },
				{ label: 'Sniper', name: 'Sniper' },
				{ label: 'Sven', name: 'Sven' },
				{ label: 'Invoker', name: 'Invoker' },
				{ label: 'Tide', name: 'Tidehunter' },
				{ label: 'Bat', name: 'Batrider' },
				{ label: 'Mag', name: 'Magnus' }
			]
);
const dotaImgs = computed<ImageCheckboxItem[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ label: '火女', name: '火女' },
				{ label: '小牛', name: '小牛' },
				{ label: '水人', name: '水人' },
				{ label: '火枪', name: '火枪' },
				{ label: '斯温', name: '斯温' }
			]
		: [
				{ label: 'Lina', name: 'Lina', imgName: '火女' },
				{ label: 'SB', name: 'Spirit Breaker', imgName: '小牛' },
				{ label: 'Morph', name: 'Morphling', imgName: '水人' },
				{ label: 'Sniper', name: 'Sniper', imgName: '火枪' },
				{ label: 'Sven', name: 'Sven', imgName: '斯温' }
			]
);
const dotaLong = computed<CheckboxItemProps[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ name: '主宰', label: '主宰是一个近战敏捷英雄，他能够迅速切入战斗。' },
				{ name: '白牛', label: '巴拉森，裂魂人是一个强大的 Gank 型的力量型近战英雄。' },
				{ name: '光法', label: '伊扎洛，光之守卫，他是一个著名的辅助性智力英雄。' },
				{ name: '猛犸', label: '猛犸？为什么不 BAN 猛犸？为什么不 BAN 猛犸？' }
			]
		: [
				{ name: 'Jugg', label: 'Juggernaut is a melee agility hero who can quickly engage in combat.' },
				{ name: 'SB', label: 'Barathrum, Spirit Breaker is a powerful ganking strength melee hero.' },
				{ name: 'KOTL', label: 'Ezalor, Keeper of the Light, is a famous support intelligence hero.' },
				{ name: 'Mag', label: 'Magnus? Why not ban Magnus? Why not ban Magnus?' }
			]
);
const dotaVoices = computed<VoiceCheckboxItem[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ name: '祈求者', label: '祈求者', voices: ['“来自于伟大的奥秘。”'] },
				{ name: '风暴之灵', label: '风暴之灵', voices: ['“喂～快醒醒，快喝点咖啡，我方上塔正遭受攻击。”'] },
				{
					name: '蝙蝠骑士',
					label: '蝙蝠骑士',
					voices: ['“哦，莉娜，当我的压寨夫人怎么样？”', '“哦，风行者，见着我你不用跑。”', '“水晶室女，你就像一个装满冰水的高脚杯。”']
				},
				{ name: '潮汐猎人', label: '潮汐猎人', voices: ['“我还能吃下一根海藻。”'] }
			]
		: [
				{ name: 'Invoker', label: 'Invoker', voices: ['"From the first point was begat a line."'] },
				{ name: 'Storm', label: 'Storm', voices: ['"Hey, wake up! Get some coffee, our tower is under attack."'] },
				{
					name: 'Batrider',
					label: 'Batrider',
					voices: [
						'"Oh Lina, wanna be my queen?"',
						'"Oh Windrunner, no need to run from me."',
						'"Crystal Maiden, you\'re like a tall glass of water."'
					]
				},
				{ name: 'Tidehunter', label: 'Tidehunter', voices: ['"I could eat a sea cucumber."'] }
			]
);
const dotaAll = computed<CheckboxItemProps[]>(() =>
	props.locale === 'zh_CN'
		? [
				{ name: '火女', label: '火女' },
				{ name: '小牛', label: '小牛' },
				{ name: '水人', label: '水人' },
				{ name: '火枪', label: '火枪' },
				{ name: '斯温', label: '斯温' },
				{ name: '祈求者', label: '祈求者' },
				{ name: '潮汐', label: '潮汐' },
				{ name: '蝙蝠', label: '蝙蝠' },
				{ name: '猛犸', label: '猛犸' }
			]
		: [
				{ name: 'Lina', label: 'Lina' },
				{ name: 'SB', label: 'Spirit Breaker' },
				{ name: 'Morph', label: 'Morphling' },
				{ name: 'Sniper', label: 'Sniper' },
				{ name: 'Sven', label: 'Sven' },
				{ name: 'Invoker', label: 'Invoker' },
				{ name: 'Tide', label: 'Tidehunter' },
				{ name: 'Bat', label: 'Batrider' },
				{ name: 'Mag', label: 'Magnus' }
			]
);
const animates = computed(() =>
	props.locale === 'zh_CN'
		? ['火女', '小牛', '水人', '火枪', '斯温', '祈求者', '潮汐', '蝙蝠', '猛犸']
		: ['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker', 'Tide', 'Bat', 'Mag']
);

const checkeds = ref<string[]>([]);
const checkedsCustom = ref<string[]>([]);
const checkInlines = ref<string[]>(props.locale === 'zh_CN' ? ['小牛', '水人'] : ['Spirit Breaker', 'Morphling']);
const imgCheckeds = ref<string[]>(props.locale === 'zh_CN' ? ['火女'] : ['Lina']);
const voiceCheckeds = ref<string[]>([]);
const checkDotas = ref<string[]>(props.locale === 'zh_CN' ? ['火枪', '斯温'] : ['Sniper', 'Sven']);
const animateNos = ref<string[]>(
	props.locale === 'zh_CN' ? ['火女', '小牛', '水人', '火枪', '斯温', '祈求者'] : ['Lina', 'SB', 'Morph', 'Sniper', 'Sven', 'Invoker']
);
const noCheckDotas = computed(() => dotaAll.value.filter((item) => !checkDotas.value.includes(item.name)).map((item) => item.name));
const animateYess = computed(() => animates.value.filter((item) => !animateNos.value.includes(item)));
const animateHeight = computed(() => animates.value.length * 30 + 50);

const toggleList = (list: string[], name: string) => (list.includes(name) ? list.filter((value) => value !== name) : [name, ...list]);
const labelByName = (name: string) => dotaAll.value.find((item) => item.name === name)?.label;
const imageName = (item: ImageCheckboxItem) => item.imgName || item.name;
const voiceList = (item: CheckboxItemProps) => (item as VoiceCheckboxItem).voices;
const checkAllFun = () => {
	checkDotas.value = dotaAll.value.map((item) => item.name);
};
const checkNoneFun = () => {
	checkDotas.value = [];
};
const checkReverseFun = () => {
	checkDotas.value = noCheckDotas.value;
};
const checkAnimateNoFun = (name: string) => {
	animateNos.value = animateNos.value.filter((item) => item !== name);
};
const checkAnimateYesFun = (name: string) => {
	animateNos.value = [name, ...animateNos.value];
};
</script>

<template>
	<div class="px-4 pb-8">
		<div class="mb-4 mt-8 text-2xl font-bold">{{ text.horizontal }}</div>
		<div class="mb-4 mt-6 text-lg font-bold">{{ text.basic }}</div>
		<Checkbox layout="h" :data="dota" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.textPosition }}</div>
		<Checkbox layout="h" :data="dota" text-position="l" />
		<Divider />
		<Checkbox layout="h" :data="dota" text-position="b" />
		<Divider />
		<Checkbox layout="h" :data="dota" text-position="t" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.customIcons }}</div>
		<Checkbox layout="h" :data="dota" :icon="{ name: 'ri-checkbox-blank-circle-line' }" :icon-checked="{ name: 'ri-radio-button-fill' }" />
		<Divider />
		<Checkbox layout="h" :data="dota" :icon="{ name: 'ri-checkbox-circle-line' }" :icon-checked="{ name: 'ri-checkbox-circle-fill' }" />
		<Divider />
		<Checkbox layout="h" :data="dota" :icon="{ name: 'ri-checkbox-multiple-line' }" :icon-checked="{ name: 'ri-checkbox-multiple-fill' }" />
		<Divider />
		<Checkbox layout="h" :data="dota" :icon="{ name: 'ri-check-line' }" :icon-checked="{ name: 'ri-check-fill' }" />
		<Divider />
		<Checkbox layout="h" :data="dota" :icon="{ name: 'ri-check-double-line' }" :icon-checked="{ name: 'ri-check-double-line' }" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.buttonChild }}</div>
		<Checkbox layout="h" :data="dota">
			<template #checkboxChild="{ item }">
				<Button
					:fill="checkeds.includes(item.name) ? 'base' : 'lineLight'"
					inj-class="px-2 !py-1"
					@click="checkeds = toggleList(checkeds, item.name)"
				>
					{{ item.label }}
				</Button>
			</template>
		</Checkbox>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.customChild }}</div>
		<Checkbox layout="h" :data="dota">
			<template #checkboxChild="{ item }">
				<button
					type="button"
					:class="[
						'rounded-sm border px-5 py-0.5 text-sm',
						checkedsCustom.includes(item.name)
							? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
							: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
					]"
					@click="checkedsCustom = toggleList(checkedsCustom, item.name)"
				>
					{{ item.label }}
				</button>
			</template>
		</Checkbox>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.imageOptions }}</div>
		<Checkbox layout="h" :data="dotaImgs">
			<template #checkboxChild="{ item }">
				<div class="flex flex-col items-center">
					<button
						type="button"
						:class="[
							'mb-1 h-12 w-12 cursor-pointer overflow-hidden rounded-sm',
							imgCheckeds.includes(item.name) ? 'ring-primary dark:ring-dark ring-2' : ''
						]"
						@click="imgCheckeds = toggleList(imgCheckeds, item.name)"
					>
						<img class="h-full w-full object-cover" :src="`/assets/images/dota_${imageName(item)}.png`" alt="" />
					</button>
					<div>
						<Icon
							:name="imgCheckeds.includes(item.name) ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'"
							:theme="imgCheckeds.includes(item.name)"
							:opacity="imgCheckeds.includes(item.name) ? 1 : 0.2"
						/>
					</div>
				</div>
			</template>
		</Checkbox>
		<div class="text-sm">
			{{ imgCheckeds.length > 0 ? text.selectedPrefix : text.noneSelected }}
			<span class="text-error">{{ imgCheckeds.join(' + ') }}</span>
		</div>
		<Divider />

		<div class="mb-4 text-2xl font-bold">{{ text.inline }}</div>
		<div class="mb-4 mt-8 text-lg font-bold">{{ text.inlineChild }}</div>
		<Checkbox layout="inline" :data="dotaInlines">
			<template #checkboxChild="{ item }">
				<button
					type="button"
					:class="[
						'm-1 cursor-pointer rounded-sm border px-2 py-0.5 text-sm',
						checkInlines.includes(item.name)
							? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
							: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
					]"
					@click="checkInlines = toggleList(checkInlines, item.name)"
				>
					{{ item.label }}
				</button>
			</template>
		</Checkbox>
		<div class="mt-2 text-xs">{{ text.selected }}{{ checkInlines.join('-') }}</div>
		<Divider />

		<div class="mb-4 text-2xl font-bold">{{ text.vertical }}</div>
		<div class="mb-4 mt-8 text-lg font-bold">{{ text.basic }}</div>
		<Checkbox :data="dota" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.longText }}</div>
		<Checkbox :data="dotaLong" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.leftText }}</div>
		<Checkbox :data="dota" text-position="l" />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.complex }}</div>
		<Checkbox :data="dotaVoices">
			<template #checkboxChild="{ item }">
				<button
					type="button"
					class="flex cursor-pointer items-center text-left"
					@click="voiceCheckeds = toggleList(voiceCheckeds, item.name)"
				>
					<div>
						<Icon
							:name="voiceCheckeds.includes(item.name) ? 'ri-checkbox-fill' : 'ri-checkbox-line'"
							:theme="voiceCheckeds.includes(item.name)"
							:opacity="voiceCheckeds.includes(item.name) ? 1 : 0.2"
						/>
					</div>
					<div :class="['ml-2 grow', voiceCheckeds.includes(item.name) ? 'text-primary dark:text-dark' : '']">
						{{ item.label }}
						<div v-for="(voice, index) in voiceList(item)" :key="index" class="text-xs">{{ voice }}</div>
						<div class="mt-1 h-px bg-black/10 dark:bg-white/10" />
					</div>
				</button>
			</template>
		</Checkbox>

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.batch }}</div>
		<Checkbox v-model:checkeds="checkDotas" :data="dotaAll" />
		<div class="mt-2 text-xs">{{ text.selected }}{{ checkDotas.map(labelByName).join('-') }}</div>
		<div class="mt-2 text-xs">{{ text.unselected }}{{ noCheckDotas.map(labelByName).join('-') }}</div>
		<div class="mt-2 flex">
			<div class="flex-1">
				<Button fill="lineState" height-in="1" @click="checkAllFun">{{ text.all }}</Button>
			</div>
			<div class="flex-1">
				<Button fill="lineState" height-in="1" @click="checkNoneFun">{{ text.none }}</Button>
			</div>
			<div class="flex-1">
				<Button fill="lineState" height-in="1" @click="checkReverseFun">{{ text.reverse }}</Button>
			</div>
		</div>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">{{ text.animation }}</div>
		<div class="flex justify-center" :style="{ height: `${animateHeight}px` }">
			<div class="flex-1">
				<div class="pb-2">{{ text.no }}</div>
				<div v-for="item in animateNos" :key="item" class="transition-all duration-300">
					<CheckboxItem :name="item" :checked="!animateNos.includes(item)" @click="checkAnimateNoFun">{{ item }}</CheckboxItem>
				</div>
			</div>
			<div class="flex-1">
				<div class="pb-2">{{ text.yes }}</div>
				<div v-for="item in animateYess" :key="item" class="transition-all duration-300">
					<CheckboxItem :name="item" :checked="animateYess.includes(item)" @click="checkAnimateYesFun">{{ item }}</CheckboxItem>
				</div>
			</div>
		</div>
	</div>
</template>
