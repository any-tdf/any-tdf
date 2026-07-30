<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Loading, TabContent, Tabs } from 'vtdf/components';

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
		one: '单色',
		two: '双色',
		four: '四色',
		other: '其他',
		defaultColor: '默认色',
		themeColor: '主题色',
		customColor: '自选色',
		inverseColor: '反差色',
		inverseThemeColor: '反主色',
		updating: '持续更新...',
		speed: '倍速'
	},
	en_US: {
		one: 'Single',
		two: 'Dual',
		four: 'Four',
		other: 'Other',
		defaultColor: 'Default',
		themeColor: 'Theme',
		customColor: 'Custom',
		inverseColor: 'Inverse',
		inverseThemeColor: 'Inverse Theme',
		updating: 'Coming soon...',
		speed: 'x speed'
	}
};

const text = computed(() => messages[props.locale]);
const labels = computed(() => [{ text: text.value.one }, { text: text.value.two }, { text: text.value.four }, { text: text.value.other }]);
const speed = ref(1);
const speedBtns = [0.5, 1, 2];
const oneColorTypes = Array.from({ length: 54 }, (_, index) => `1_${index}`);
const twoColorTypes = Array.from({ length: 6 }, (_, index) => `2_${index}`);
const fourColorTypes = Array.from({ length: 4 }, (_, index) => `4_${index}`);

const randomColorArr = (num: number) => {
	const randomColor = () => `#${`00000${Math.floor(Math.random() * 0x1000000).toString(16)}`.slice(-6)}`;
	const colors: string[] = [];
	for (let index = 0; index < num; index += 1) {
		colors.push(randomColor());
	}
	return colors;
};
</script>

<template>
	<div class="py-4">
		<Tabs :tab="{ labels }">
			<TabContent>
				<div class="py-4">
					<div class="flex text-center text-sm font-bold">
						<div
							v-for="item in [text.defaultColor, text.themeColor, text.customColor, text.inverseColor, text.inverseThemeColor]"
							:key="item"
							class="flex-1 border border-black/5 py-2 dark:border-white/5"
						>
							{{ item }}
						</div>
					</div>
					<div class="grid grid-cols-5">
						<template v-for="item in oneColorTypes" :key="item">
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" theme :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" theme :custom-color="randomColorArr(1)" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div
								class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
							>
								<div class="h-8 w-8">
									<Loading :type="item" inverse :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div
								class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
							>
								<div class="h-8 w-8">
									<Loading :type="item" theme inverse :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
						</template>
					</div>
				</div>
				<div class="p-4 text-xs">{{ text.updating }}</div>
			</TabContent>

			<TabContent>
				<div class="py-4">
					<div class="flex text-center text-sm font-bold">
						<div
							v-for="item in [text.defaultColor, text.customColor, text.inverseColor]"
							:key="item"
							class="flex-1 border border-black/5 py-2 dark:border-white/5"
						>
							{{ item }}
						</div>
					</div>
					<div class="grid grid-cols-3">
						<template v-for="item in twoColorTypes" :key="item">
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" :custom-color="randomColorArr(2)" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div
								class="bg-bg-base-dark dark:bg-bg-base flex w-full flex-col items-center border border-white/5 py-6 text-white dark:border-black/5 dark:text-black"
							>
								<div class="h-8 w-8">
									<Loading :type="item" inverse :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
						</template>
					</div>
				</div>
				<div class="p-4 text-xs">{{ text.updating }}</div>
			</TabContent>

			<TabContent>
				<div class="py-4">
					<div class="flex text-center text-sm font-bold">
						<div
							v-for="(item, index) in [text.defaultColor, text.customColor, text.defaultColor, text.customColor]"
							:key="`${item}-${index}`"
							class="flex-1 border border-black/5 py-2 dark:border-white/5"
						>
							{{ item }}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<template v-for="item in fourColorTypes" :key="item">
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
							<div class="flex w-full flex-col items-center border border-black/5 py-6 dark:border-white/5">
								<div class="h-8 w-8">
									<Loading :type="item" :custom-color="randomColorArr(4)" :speed="speed" />
								</div>
								<div class="mt-8 text-center text-xs">{{ item }}</div>
							</div>
						</template>
					</div>
				</div>
				<div class="p-4 text-xs">{{ text.updating }}</div>
			</TabContent>

			<TabContent>
				<div class="py-4" />
				<div class="p-4 text-xs">{{ text.updating }}</div>
			</TabContent>
		</Tabs>
	</div>

	<div class="sticky bottom-0 left-0 z-10 flex w-full justify-between gap-3 bg-white/60 px-2 backdrop-blur-sm dark:bg-black/60">
		<div v-for="item in speedBtns" :key="item" class="flex-1">
			<Button :fill="speed === item ? 'base' : 'lineState'" size="full" inj-class="text-xs px-2" @click="speed = item"
				>{{ item }} {{ text.speed }}</Button
			>
		</div>
	</div>
</template>
