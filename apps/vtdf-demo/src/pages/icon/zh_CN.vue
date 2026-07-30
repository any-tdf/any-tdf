<script setup lang="ts">
import { computed, ref } from 'vue';
import { builtInIconGalleryList, builtInIconLibraryLabelMap, builtInIconLibraryList, resolveBuiltInSvg } from '@any-tdf/common/svg';
import { Icon, Tab } from 'vtdf';
import type { IconProps } from 'vtdf/types';
import { SvgIcon } from 'vtdf/components';

const icons = ['ri-spy-fill', 'ri-chrome-fill', 'ri-riding-line', 'ri-switch-fill'];
const msIcons: IconProps[] = [
	{ name: 'material-symbols--agriculture' },
	{ name: 'material-symbols--brightness-5', state: 'theme' },
	{ name: 'material-symbols--cardiology-outline', opacity: 0.5 },
	{ name: 'material-symbols--e911-avatar-rounded', size: 36 }
];
const solarIcons: IconProps[] = [
	{ name: 'solar--cat-broken' },
	{ name: 'solar--chair-2-line-duotone', state: 'theme' },
	{ name: 'solar--bonfire-line-duotone', opacity: 0.5 },
	{ name: 'solar--cup-hot-broken', size: 36 }
];
const states = ['theme', 'success', 'warning', 'error', 'info'] as const;
const fcIcons: IconProps[] = [
	{ name: 'fluent-color--building-store-24' },
	{ name: 'fluent-color--slide-text-sparkle-16' },
	{ name: 'fluent-color--chart-multiple-24', opacity: 0.5 },
	{ name: 'fluent-color--bot-sparkle-24', size: 36 }
];
const builtInIconLibraryIndex = ref(0);
const builtInIconLibraryLabels = builtInIconLibraryList.map((library) => ({
	text: builtInIconLibraryLabelMap[library]
}));
const activeBuiltInIconLibrary = computed(() => builtInIconLibraryList[builtInIconLibraryIndex.value] || builtInIconLibraryList[0]);
</script>

<template>
	<div class="flex flex-col space-y-12 px-4 py-8">
		<div>
			<div class="mb-2 text-xl font-bold">基础用法</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="icon in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon :name="icon" />
					<div class="mt-2 text-xs">{{ icon }}</div>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">不同状态</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="state in states" :key="state" class="flex-1 py-2 text-center">
					<Icon :name="icons[0]" :state="state" />
					<div class="mt-2 text-xs">{{ state }}</div>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">不同大小</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="(icon, index) in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon :name="icon" :size="18 + index * 6" />
					<div class="mt-2 text-xs">{{ 18 + index * 6 }}</div>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">不同透明度</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="(icon, index) in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon :name="icon" :opacity="Number((0.2 + index * 0.2).toFixed(1))" />
					<div class="mt-2 text-xs">{{ (0.2 + index * 0.2).toFixed(1) }}</div>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">使用 iconify</div>
			<div>material-symbols</div>
			<div class="flex flex-wrap items-center justify-around py-2">
				<Icon v-for="icon in msIcons" :key="icon.name" type="iconify" v-bind="icon" />
			</div>
			<div>solar</div>
			<div class="flex flex-wrap items-center justify-around py-2">
				<Icon v-for="icon in solarIcons" :key="icon.name" type="iconify" v-bind="icon" />
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">使用 iconify-color</div>
			<div class="flex flex-wrap items-center justify-around py-2">
				<Icon v-for="icon in fcIcons" :key="icon.name" type="iconify-color" v-bind="icon" />
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">自定义颜色<span class="ml-2 text-xs font-normal">通过 injClass</span></div>
			<div class="flex flex-wrap justify-between">
				<div v-for="icon in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon :name="icon" inj-class="vtdf-demo-text-red-green" />
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">自定义颜色<span class="ml-2 text-xs font-normal">通过插槽</span></div>
			<div class="flex flex-wrap justify-between">
				<div v-for="icon in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon>
						<i class="vtdf-demo-text-blue-red"><Icon :name="icon" /></i>
					</Icon>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">插槽</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="(icon, index) in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon>
						<svg
							height="24"
							width="24"
							aria-hidden="true"
							viewBox="0 0 16 16"
							data-view-component="true"
							style="display: inline"
							:class="index % 2 ? 'fill-primary dark:fill-dark' : 'fill-black dark:fill-white'"
						>
							<path
								fill-rule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
							/>
						</svg>
					</Icon>
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">偏移</div>
			<div class="flex flex-wrap justify-between">
				<div v-for="(icon, index) in icons" :key="icon" class="flex-1 py-2 text-center">
					<Icon :name="icons[1]" :y="-4 + index * 2" />
					y:{{ -4 + index * 2 }}
				</div>
			</div>
		</div>

		<div>
			<div class="mb-2 text-xl font-bold">内置 SVG</div>
			<Tab v-model:active="builtInIconLibraryIndex" :labels="builtInIconLibraryLabels" />
			<div class="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
				<div
					v-for="item in builtInIconGalleryList"
					:key="`${activeBuiltInIconLibrary}-${item.key}`"
					class="rounded-lg border border-black/10 p-3 text-center dark:border-white/10"
				>
					<SvgIcon
						:svg="resolveBuiltInSvg(item.key, activeBuiltInIconLibrary)"
						:width="28"
						:height="28"
						class-name="mx-auto block text-primary dark:text-dark"
					/>
					<div class="mt-2 break-all text-xs text-black/60 dark:text-white/60">{{ item.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
