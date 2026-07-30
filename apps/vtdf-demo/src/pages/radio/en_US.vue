<script setup lang="ts">
import { ref } from 'vue';
import { Button, Divider, Icon, Radio } from 'vtdf';
import type { RadioItemProps } from 'vtdf/types';

const dota: RadioItemProps[] = [
	{ label: 'Jugg', name: 'Juggernaut' },
	{ label: 'SB', name: 'Spirit Breaker' },
	{ label: 'KOTL', name: 'Keeper of the Light' },
	{ label: 'Mag', name: 'Magnus' }
];
const value = ref(dota[0].name);
const checkedsCustom = ref('');

const dotaInlines: RadioItemProps[] = [
	{ label: 'Lina', name: 'Lina' },
	{ label: 'SB', name: 'Spirit Breaker' },
	{ label: 'Morph', name: 'Morphling' },
	{ label: 'Sniper', name: 'Sniper' },
	{ label: 'Sven', name: 'Sven' },
	{ label: 'Invoker', name: 'Invoker' },
	{ label: 'Tide', name: 'Tidehunter' },
	{ label: 'Bat', name: 'Batrider' },
	{ label: 'Mag', name: 'Magnus' }
];
const checkInline = ref('Morphling');

const dotaImgs = [
	{ label: 'Lina', name: 'Lina', imgName: '火女' },
	{ label: 'SB', name: 'Spirit Breaker', imgName: '小牛' },
	{ label: 'Morph', name: 'Morphling', imgName: '水人' },
	{ label: 'Sniper', name: 'Sniper', imgName: '火枪' },
	{ label: 'Sven', name: 'Sven', imgName: '斯温' }
];
const imgChecked = ref('Lina');

const dotaLong: RadioItemProps[] = [
	{ name: 'Jugg', label: 'Juggernaut is a melee agility hero who can quickly engage in combat.' },
	{ name: 'SB', label: 'Barathrum, Spirit Breaker is a powerful ganking strength melee hero.' },
	{ name: 'KOTL', label: 'Ezalor, Keeper of the Light, is a famous support intelligence hero.' },
	{ name: 'Mag', label: 'Magnus? Why not ban Magnus? Why not ban Magnus?' }
];

const dotaVoices = [
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
];
const voiceChecked = ref('');
</script>

<template>
	<div class="px-4">
		<div class="mb-4 mt-8 text-2xl font-bold">Horizontal Layout</div>
		<div class="mb-4 mt-6 text-lg font-bold">Basic Usage</div>
		<Radio layout="h" :data="dota" />
		<Divider />

		<div class="mb-4 mt-6 text-lg font-bold">Get Selected Value</div>
		<Radio v-model:value="value" layout="h" :data="dota" />
		<div class="mt-4 text-sm">Selected: {{ value }}</div>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Text Position</div>
		<Radio layout="h" :data="dota" text-position="l" />
		<Divider />
		<Radio layout="h" :data="dota" text-position="b" />
		<Divider />
		<Radio layout="h" :data="dota" text-position="t" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Custom Icon</div>
		<Radio layout="h" :data="dota" :icon="{ name: 'ri-checkbox-blank-circle-line' }" :icon-checked="{ name: 'ri-radio-button-fill' }" />
		<Divider />
		<Radio layout="h" :data="dota" :icon="{ name: 'ri-checkbox-circle-line' }" :icon-checked="{ name: 'ri-checkbox-circle-fill' }" />
		<Divider />
		<Radio layout="h" :data="dota" :icon="{ name: 'ri-checkbox-multiple-line' }" :icon-checked="{ name: 'ri-checkbox-multiple-fill' }" />
		<Divider />
		<Radio layout="h" :data="dota" :icon="{ name: 'ri-check-line' }" :icon-checked="{ name: 'ri-check-fill' }" />
		<Divider />
		<Radio layout="h" :data="dota" :icon="{ name: 'ri-check-double-line' }" :icon-checked="{ name: 'ri-check-double-line' }" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Slot as Button component</div>
		<Radio layout="h" :data="dota">
			<template #radioChild="{ item }">
				<Button :fill="value === item.name ? 'base' : 'lineLight'" inj-class="px-2 !py-1" @click="() => (value = item.name)">
					{{ item.label }}
				</Button>
			</template>
		</Radio>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Slot as custom element</div>
		<Radio layout="h" :data="dota">
			<template #radioChild="{ item }">
				<button
					:class="[
						'rounded-sm border px-5 py-0.5 text-sm',
						checkedsCustom === item.name
							? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
							: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
					]"
					@click="checkedsCustom = item.name"
				>
					{{ item.label }}
				</button>
			</template>
		</Radio>
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Image Options</div>
		<Radio layout="h" :data="dotaImgs">
			<template #radioChild="{ item }">
				<div class="flex flex-col items-center">
					<div
						:class="['mb-1 h-12 w-12 overflow-hidden rounded-sm', imgChecked === item.name ? 'ring-2 ring-primary dark:ring-dark' : '']"
						@click="imgChecked = item.name"
					>
						<img class="h-full w-full object-cover" :src="`/assets/images/dota_${item.imgName}.png`" alt="" />
					</div>
					<div>
						<Icon
							:name="imgChecked === item.name ? 'ri-arrow-up-s-fill' : 'ri-arrow-up-s-line'"
							:theme="imgChecked === item.name"
							:opacity="imgChecked === item.name ? 1 : 0.2"
						/>
					</div>
				</div>
			</template>
		</Radio>
		<div class="text-sm">
			Selected <span class="vtdf-demo-text-red">{{ imgChecked }}</span>
		</div>
		<Divider />
	</div>

	<div class="px-4">
		<div class="mb-4 text-2xl font-bold">Inline Layout</div>
		<div class="mb-4 mt-8 text-lg font-bold">Slot inline layout</div>
		<Radio layout="inline" :data="dotaInlines">
			<template #radioChild="{ item }">
				<div
					:class="[
						'm-1 rounded-sm border px-2 py-0.5 text-sm',
						checkInline === item.name
							? 'bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark'
							: 'border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-600'
					]"
					@click="checkInline = item.name"
				>
					{{ item.label }}
				</div>
			</template>
		</Radio>
		<div class="mt-2 text-xs">Selected: {{ checkInline }}</div>
	</div>
	<Divider />

	<div class="px-4 pb-8">
		<div class="mb-4 text-2xl font-bold">Vertical Layout</div>
		<div class="mb-4 mt-8 text-lg font-bold">Basic Usage</div>
		<Radio :data="dota" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Long Text Options</div>
		<Radio :data="dotaLong" />
		<Divider />

		<div class="mb-4 mt-8 text-lg font-bold">Text Position</div>
		<Radio :data="dota" text-position="l" />

		<div class="mb-4 mt-8 text-lg font-bold">Complex Options && Custom Selected Effect</div>
		<Radio :data="dotaVoices">
			<template #radioChild="{ item }">
				<div class="flex cursor-pointer items-center" @click="voiceChecked = item.name">
					<div>
						<Icon
							:name="voiceChecked === item.name ? 'ri-radio-button-line' : 'ri-checkbox-blank-circle-line'"
							:theme="voiceChecked === item.name"
							:opacity="voiceChecked === item.name ? 1 : 0.2"
						/>
					</div>
					<div :class="['ml-2 grow', voiceChecked === item.name ? 'text-primary dark:text-dark' : '']">
						{{ item.label }}
						<div v-for="voice in item.voices" :key="voice" class="text-xs">{{ voice }}</div>
						<div class="mt-1 h-px bg-black/10 dark:bg-white/10" />
					</div>
				</div>
			</template>
		</Radio>
	</div>
</template>
