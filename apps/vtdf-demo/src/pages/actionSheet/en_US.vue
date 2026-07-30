<script setup lang="ts">
import { ref } from 'vue';
import { ActionSheet, Cell, Toast } from 'vtdf';
import type { ActionProps } from 'vtdf/types';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible8 = ref(false);
const visible9 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);

const actions: ActionProps[] = [{ content: 'Option one' }, { content: 'Option two' }, { content: 'Option three' }];
const actions1: ActionProps[] = [
	{ content: 'Normal option' },
	{ content: 'Theme option', style: 'theme' },
	{ content: 'Success option', style: 'success' },
	{ content: 'Warning option', style: 'warning' },
	{ content: 'Error option', style: 'error' },
	{ content: 'Info option', style: 'info' },
	{ content: 'Disabled option', style: 'warning', disabled: true }
];
const actions2: ActionProps[] = [
	{ content: 'Option one' },
	{ content: 'Option two', desc: 'Here is the description information' },
	{ content: 'Option three', style: 'error', desc: 'Here is the description information' }
];
const actions3: ActionProps[] = [
	{ content: 'Lina', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'sm' },
	{ content: 'SB', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'sm' },
	{ content: 'Morph', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'sm' }
];
const actions4: ActionProps[] = [
	{ content: 'Apple', showImg: true, imgSrc: '/assets/logos/apple.png', imgRadius: 'none' },
	{ content: 'Google', showImg: true, imgSrc: '/assets/logos/google.png', imgRadius: 'none' },
	{ content: 'Microsoft', showImg: true, imgSrc: '/assets/logos/microsoft.png', imgRadius: 'none' },
	{ content: 'Adobe', showImg: true, imgSrc: '/assets/logos/adobe.png', imgRadius: 'none' },
	{ content: 'Figma', showImg: true, imgSrc: '/assets/logos/figma.png', imgRadius: 'none' }
];

const toastVisible1 = ref(false);
const toastVisible2 = ref(false);
const toastVisible3 = ref(false);
const currentIndex = ref(0);
const currentItem = ref<ActionProps>({ content: '' });

const clickActionFunc = (index: number, action: ActionProps) => {
	currentIndex.value = index;
	currentItem.value = action;
	toastVisible3.value = true;
};
</script>

<template>
	<div class="py-4">
		<Cell title="Basic usage" @click="() => (visible1 = true)" />
		<ActionSheet v-model:visible="visible1" :actions="actions" />

		<Cell title="With cancel operation and click mask not closable" @click="() => (visible2 = true)" />
		<ActionSheet v-model:visible="visible2" :actions="actions" show-cancel :popup="{ maskClosable: false }" />

		<Cell title="Different styles" @click="() => (visible3 = true)" />
		<ActionSheet v-model:visible="visible3" :actions="actions1" />

		<Cell title="With title and description information" @click="() => (visible4 = true)" />
		<ActionSheet
			v-model:visible="visible4"
			:actions="actions2"
			title="Here is the title, which can briefly explain the following operations."
		/>

		<Cell title="Top corner rounded" @click="() => (visible5 = true)" />
		<ActionSheet v-model:visible="visible5" :actions="actions" :popup="{ radius: 'xl' }" />

		<Cell title="With spacing on both sides" @click="() => (visible6 = true)" />
		<ActionSheet v-model:visible="visible6" :actions="actions" :popup="{ radius: 'xl', px: '2' }" />

		<Cell title="Listen to close event" @click="() => (visible7 = true)" />
		<ActionSheet v-model:visible="visible7" :actions="actions" @close="() => (toastVisible1 = true)" />
		<Toast v-model:visible="toastVisible1" message="Closed ActionSheet!" />

		<Cell title="Listen to cancel event" @click="() => (visible8 = true)" />
		<ActionSheet v-model:visible="visible8" :actions="actions" show-cancel @cancel="() => (toastVisible2 = true)" />
		<Toast v-model:visible="toastVisible2" message="Clicked cancel!" />

		<Cell title="Listen to action click event" @click="() => (visible9 = true)" />
		<ActionSheet v-model:visible="visible9" :actions="actions" @click-action="clickActionFunc" />
		<Toast v-model:visible="toastVisible3" :message="`Clicked item ${currentIndex + 1}, ${currentItem.content}!`" />

		<Cell title="Do not close on click" @click="() => (visible10 = true)" />
		<ActionSheet v-model:visible="visible10" :actions="actions" :action-closable="false" />

		<Cell title="Options with images" @click="() => (visible11 = true)" />
		<ActionSheet v-model:visible="visible11" :actions="actions3" />

		<Cell title="Left aligned options" @click="() => (visible12 = true)" />
		<ActionSheet v-model:visible="visible12" :actions="actions4" align="left" />
	</div>
</template>
