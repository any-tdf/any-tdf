<script setup lang="ts">
import { ref, watch } from 'vue';
import { Cell, Dialog, Loading, Toast } from 'vtdf/components';
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
const visible16 = ref(false);
const visible17 = ref(false);
const visible18 = ref(false);
const visible19 = ref(false);
const toastVisible = ref(false);
const toastVisible2 = ref(false);
const toastVisible3 = ref(false);
const toastVisible4 = ref(false);
const loading = ref(false);

const somethingFnc = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		visible19.value = false;
		toastVisible4.value = true;
	}, 3000);
};

watch(visible8, (visible) => {
	if (visible) {
		setTimeout(() => {
			visible8.value = false;
		}, 3000);
	}
});
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<Dialog v-model:visible="visible1" title="李逍遥" content="你确认前往仙灵岛吗？" />

		<Cell title="内容使用插槽" @click="() => (visible2 = true)" />
		<Dialog v-model:visible="visible2">
			<Aphorism :num="1" compact />
		</Dialog>

		<Cell title="不显示标题" @click="() => (visible3 = true)" />
		<Dialog v-model:visible="visible3" title="" />

		<Cell title="点击遮罩关闭" @click="() => (visible4 = true)" />
		<Dialog v-model:visible="visible4" :popup="{ maskClosable: true }" />

		<Cell title="自定义图标" @click="() => (visible5 = true)" />
		<Dialog
			v-model:visible="visible5"
			content="请佩戴口罩！"
			show-icon
			:icon="{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'vtdf-demo-text-teal' }"
			secondary-text="没携带"
			primary-text="好的"
		/>

		<Cell title="内容使用插槽且滚动" @click="() => (visible6 = true)" />
		<Dialog v-model:visible="visible6">
			<div class="max-h-56 overflow-auto">
				<Aphorism :num="6" compact />
			</div>
		</Dialog>

		<Cell title="另一种动画效果" @click="() => (visible7 = true)" />
		<Dialog v-model:visible="visible7" content="回弹过渡" :popup="{ easeType: 'backOut' }" />

		<Cell title="标题居左" @click="() => (visible9 = true)" />
		<Dialog v-model:visible="visible9" title="标题居左" title-align="left" />

		<Cell title="自动关闭" @click="() => (visible8 = true)" />
		<Dialog v-model:visible="visible8" content="别动！3 秒后我立即消失！" />

		<Cell title="主按钮占比多一点" @click="() => (visible10 = true)" />
		<Dialog v-model:visible="visible10" :btn-ratio="[3, 2]" />

		<Cell title="主次按钮位置反转" @click="() => (visible11 = true)" />
		<Dialog v-model:visible="visible11" btn-reverse />

		<Cell title="按钮间距大一点" @click="() => (visible12 = true)" />
		<Dialog v-model:visible="visible12" btn-gap="16" />

		<Cell title="按钮为纯文字" @click="() => (visible13 = true)" />
		<Dialog v-model:visible="visible13" btn-style="text" />

		<Cell title="按钮为纯文字有分割线" @click="() => (visible14 = true)" />
		<Dialog v-model:visible="visible14" btn-style="textLine" />

		<Cell title="全圆角按钮" @click="() => (visible15 = true)" />
		<Dialog v-model:visible="visible15" :primary-button="{ radius: 'full' }" :secondary-button="{ radius: 'full' }" />

		<Cell title="监听次要事件" @click="() => (visible16 = true)" />
		<Dialog v-model:visible="visible16" @secondary="() => (toastVisible = true)" />
		<Toast v-model:visible="toastVisible" message="点击了取消！" />

		<Cell title="监听关闭事件" @click="() => (visible17 = true)" />
		<Dialog v-model:visible="visible17" @close="() => (toastVisible2 = true)" />
		<Toast v-model:visible="toastVisible2" message="关闭了 Dialog！" />

		<Cell title="监听主要事件" @click="() => (visible18 = true)" />
		<Dialog v-model:visible="visible18" @primary="() => (toastVisible3 = true)" />
		<Toast v-model:visible="toastVisible3" message="点击了确认！" />

		<Cell title="异步执行主要事件" @click="() => (visible19 = true)" />
		<Dialog v-model:visible="visible19" title="小鬼" content="你一定要进入锁妖塔吗？" @primary="somethingFnc">
			<template #primary>
				<Loading v-if="loading" inverse width="12" height="6" type="1_17" />
				<span v-else>进入</span>
			</template>
		</Dialog>
		<Toast v-model:visible="toastVisible4" message="已进入锁妖塔！" />
	</div>
</template>
