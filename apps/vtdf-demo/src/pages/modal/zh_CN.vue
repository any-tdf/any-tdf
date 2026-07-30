<script setup lang="ts">
import { ref, watch } from 'vue';
import { Cell, Modal, Toast } from 'vtdf/components';
import Aphorism from '../components/Aphorism.vue';

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
const visible13 = ref(false);
const visible14 = ref(false);
const visible15 = ref(false);
const toastVisible = ref(false);

watch(visible15, (visible) => {
	if (visible) {
		setTimeout(() => {
			visible15.value = false;
		}, 3000);
	}
});
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<Modal v-model:visible="visible1" title="您明白吗？" content="留下来的人才是最痛苦的" btn-text="我明白了" />

		<Cell title="内容使用插槽" @click="() => (visible2 = true)" />
		<Modal v-model:visible="visible2">
			<Aphorism :num="1" compact />
		</Modal>

		<Cell title="不显示标题" @click="() => (visible3 = true)" />
		<Modal v-model:visible="visible3" title="" />

		<Cell title="不显示按钮" @click="() => (visible4 = true)" />
		<Modal v-model:visible="visible4" :show-btn="false">
			<Aphorism :num="1" compact />
		</Modal>

		<Cell title="点击遮罩关闭" @click="() => (visible5 = true)" />
		<Modal v-model:visible="visible5" :popup="{ maskClosable: true }" />

		<Cell title="自定义图标" @click="() => (visible6 = true)" />
		<Modal
			v-model:visible="visible6"
			content="请佩戴口罩！"
			show-icon
			:icon="{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'vtdf-demo-text-teal' }"
		/>

		<Cell title="错误状态按钮" @click="() => (visible8 = true)" />
		<Modal v-model:visible="visible8" btn-text="我错了" :button="{ state: 'error' }" />

		<Cell title="全圆角按钮" @click="() => (visible9 = true)" />
		<Modal v-model:visible="visible9" :button="{ radius: 'full' }" />

		<Cell title="主题色纯文本按钮" @click="() => (visible12 = true)" />
		<Modal v-model:visible="visible12" :button="{ fill: 'textState' }" />

		<Cell title="内容使用插槽且滚动" @click="() => (visible10 = true)" />
		<Modal v-model:visible="visible10">
			<div class="h-56 overflow-auto">
				<Aphorism :num="6" compact />
			</div>
		</Modal>

		<Cell title="显示窄一点" @click="() => (visible7 = true)" />
		<Modal v-model:visible="visible7" :popup="{ px: '20' }" />

		<Cell title="另一种动画效果" @click="() => (visible11 = true)" />
		<Modal v-model:visible="visible11" content="回弹过渡" :popup="{ easeType: 'backOut' }" />

		<Cell title="监听关闭事件" @click="() => (visible13 = true)" />
		<Modal v-model:visible="visible13" @close="() => (toastVisible = true)" />
		<Toast v-model:visible="toastVisible" message="关闭了 Modal！" />

		<Cell title="标题居左" @click="() => (visible14 = true)" />
		<Modal v-model:visible="visible14" title="标题居左" title-align="left" />

		<Cell title="自动关闭" @click="() => (visible15 = true)" />
		<Modal v-model:visible="visible15" content="别动！3 秒后我立即消失！" />
	</div>
</template>
