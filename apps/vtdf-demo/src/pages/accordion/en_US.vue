<script setup lang="ts">
import { computed, ref } from 'vue';
import { Accordion, Slider } from 'vtdf';
import type { AccordionItemProps, AccordionProps } from 'vtdf/types';

type AccordionRadius = NonNullable<AccordionProps['radius']>;

const basicItems: AccordionItemProps[] = [
	{
		title: 'What is VTDF?',
		content:
			'VTDF is a mobile UI component library based on Vue 3 and Tailwind CSS, providing rich components and theme customization capabilities.'
	},
	{
		title: 'How to install?',
		content:
			'You can quickly create a project with bun create any-tdf@latest my-app -f vue, or manually install the vtdf package into an existing project.'
	},
	{
		title: 'Which frameworks are supported?',
		content: 'VTDF is developed based on Vue 3 and can be used in Vite + Vue and other projects.'
	}
];

const iconItems: AccordionItemProps[] = [
	{
		title: 'Basic Components',
		content: 'Includes Button, Icon, Mask, Popup and other basic components.',
		icon: { name: 'ri-apps-2-line', size: 18 }
	},
	{
		title: 'Form Components',
		content: 'Includes Input, Picker, Calendar, Switch and other form components.',
		icon: { name: 'ri-edit-line', size: 18 }
	},
	{
		title: 'Feedback Components',
		content: 'Includes Toast, Modal, Dialog, Loading and other feedback components.',
		icon: { name: 'ri-discuss-line', size: 18 }
	}
];

const disabledItems: AccordionItemProps[] = [
	{ title: 'Available Item 1', content: 'This is an available accordion item.' },
	{ title: 'Disabled Item', content: 'This content will not be displayed.', disabled: true },
	{ title: 'Available Item 2', content: 'This is another available accordion item.' }
];

const radiusOptions: AccordionRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const radiusLabels = [...radiusOptions];
const radiusIndex = ref(2);
const activeIndex1 = ref<number | undefined>(0);
const activeIndex2 = ref<number[]>([0, 1]);
const currentRadius = computed(() => radiusOptions[radiusIndex.value]);
</script>

<template>
	<div class="flex flex-col gap-8 px-2 py-4">
		<div>
			<div class="mb-4 font-bold">Basic usage</div>
			<Accordion v-model:active-index="activeIndex1" :items="basicItems" />
		</div>

		<div>
			<div class="mb-4 font-bold">Multiple expand</div>
			<Accordion v-model:active-index="activeIndex2" :items="basicItems" multiple />
		</div>

		<div>
			<div class="mb-4 font-bold">Default expand second item</div>
			<Accordion :items="basicItems" :active-index="1" />
		</div>

		<div>
			<div class="mb-4 font-bold">Disabled item</div>
			<Accordion :items="disabledItems" />
		</div>

		<div>
			<div class="mb-4 font-bold">Different radius</div>
			<div class="mb-4">
				<Slider
					:value="radiusIndex"
					:min-range="0"
					:max-range="7"
					:step="1"
					show-steps
					:step-labels="radiusLabels"
					@change="(value) => (radiusIndex = value)"
				/>
			</div>
			<Accordion :items="basicItems" :radius="currentRadius" />
		</div>

		<div>
			<div class="mb-4 font-bold">Different border</div>
			<div class="flex flex-col gap-4">
				<Accordion :items="basicItems.slice(0, 2)" border="solid" />
				<Accordion :items="basicItems.slice(0, 2)" border="dashed" />
				<Accordion :items="basicItems.slice(0, 2)" border="dotted" />
				<Accordion :items="basicItems.slice(0, 2)" border="none" />
			</div>
		</div>

		<div>
			<div class="mb-4 font-bold">Hide divider</div>
			<Accordion :items="basicItems" :divider="false" />
		</div>

		<div>
			<div class="mb-4 font-bold">Different expand icons</div>
			<div class="flex flex-col gap-4">
				<Accordion :items="basicItems.slice(0, 2)" expand-icon="arrow" />
				<Accordion :items="basicItems.slice(0, 2)" expand-icon="plus" />
				<Accordion :items="basicItems.slice(0, 2)" :expand-icon="null" />
			</div>
		</div>

		<div>
			<div class="mb-4 font-bold">Icon position</div>
			<div class="flex flex-col gap-4">
				<Accordion :items="basicItems.slice(0, 2)" icon-position="right" />
				<Accordion :items="basicItems.slice(0, 2)" icon-position="left" />
			</div>
		</div>

		<div>
			<div class="mb-4 font-bold">With title icons</div>
			<Accordion :items="iconItems" />
		</div>

		<div>
			<div class="mb-4 font-bold">Custom content</div>
			<Accordion :items="basicItems" v-slot="{ item, index }">
				<div class="rounded-md bg-black/5 p-3 dark:bg-white/5">
					<div class="mb-2 text-xs text-black/50 dark:text-white/50">Question {{ index + 1 }}</div>
					<div>{{ item.content }}</div>
				</div>
			</Accordion>
		</div>
	</div>
</template>
