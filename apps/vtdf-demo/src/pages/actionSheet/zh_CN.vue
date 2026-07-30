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

const actions: ActionProps[] = [{ content: '选项一' }, { content: '选项二' }, { content: '选项三' }];
const actions1: ActionProps[] = [
	{ content: '常规选项' },
	{ content: '主题选项', style: 'theme' },
	{ content: '成功选项', style: 'success' },
	{ content: '警告选项', style: 'warning' },
	{ content: '错误选项', style: 'error' },
	{ content: '信息选项', style: 'info' },
	{ content: '禁用选项', style: 'warning', disabled: true }
];
const actions2: ActionProps[] = [
	{ content: '选项一' },
	{ content: '选项二', desc: '这里是描述信息' },
	{ content: '选项三', style: 'error', desc: '这里是描述信息' }
];
const actions3: ActionProps[] = [
	{ content: '火女', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'sm' },
	{ content: '小牛', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'sm' },
	{ content: '水人', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'sm' }
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
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<ActionSheet v-model:visible="visible1" :actions="actions" />

		<Cell title="有取消操作且点击遮罩不可关闭" @click="() => (visible2 = true)" />
		<ActionSheet v-model:visible="visible2" :actions="actions" show-cancel :popup="{ maskClosable: false }" />

		<Cell title="不同样式" @click="() => (visible3 = true)" />
		<ActionSheet v-model:visible="visible3" :actions="actions1" />

		<Cell title="带标题和描述信息" @click="() => (visible4 = true)" />
		<ActionSheet v-model:visible="visible4" :actions="actions2" title="这里是标题，可以简要说明以下操作。" />

		<Cell title="顶部来点圆角" @click="() => (visible5 = true)" />
		<ActionSheet v-model:visible="visible5" :actions="actions" :popup="{ radius: 'xl' }" />

		<Cell title="两侧有间距" @click="() => (visible6 = true)" />
		<ActionSheet v-model:visible="visible6" :actions="actions" :popup="{ radius: 'xl', px: '2' }" />

		<Cell title="监听关闭事件" @click="() => (visible7 = true)" />
		<ActionSheet v-model:visible="visible7" :actions="actions" @close="() => (toastVisible1 = true)" />
		<Toast v-model:visible="toastVisible1" message="关闭了 ActionSheet！" />

		<Cell title="监听取消事件" @click="() => (visible8 = true)" />
		<ActionSheet v-model:visible="visible8" :actions="actions" show-cancel @cancel="() => (toastVisible2 = true)" />
		<Toast v-model:visible="toastVisible2" message="点击了取消！" />

		<Cell title="监听选项点击事件" @click="() => (visible9 = true)" />
		<ActionSheet v-model:visible="visible9" :actions="actions" @click-action="clickActionFunc" />
		<Toast v-model:visible="toastVisible3" :message="`点击了第 ${currentIndex + 1} 项，${currentItem.content}！`" />

		<Cell title="点击选项不关闭" @click="() => (visible10 = true)" />
		<ActionSheet v-model:visible="visible10" :actions="actions" :action-closable="false" />

		<Cell title="选项带图片" @click="() => (visible11 = true)" />
		<ActionSheet v-model:visible="visible11" :actions="actions3" />

		<Cell title="选项左对齐" @click="() => (visible12 = true)" />
		<ActionSheet v-model:visible="visible12" :actions="actions4" align="left" />
	</div>
</template>
