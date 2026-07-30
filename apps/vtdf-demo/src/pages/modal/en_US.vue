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
		<Cell title="Basic usage" @click="() => (visible1 = true)" />
		<Modal v-model:visible="visible1" title="Do you understand?" content="Those who stay will suffer the most" btn-text="I see" />

		<Cell title="Content using slot" @click="() => (visible2 = true)" />
		<Modal v-model:visible="visible2">
			<Aphorism :num="1" compact />
		</Modal>

		<Cell title="Do not show the title" @click="() => (visible3 = true)" />
		<Modal v-model:visible="visible3" title="" />

		<Cell title="Do not show button" @click="() => (visible4 = true)" />
		<Modal v-model:visible="visible4" :show-btn="false">
			<Aphorism :num="1" compact />
		</Modal>

		<Cell title="Click the mask to close" @click="() => (visible5 = true)" />
		<Modal v-model:visible="visible5" :popup="{ maskClosable: true }" />

		<Cell title="Custom icon" @click="() => (visible6 = true)" />
		<Modal
			v-model:visible="visible6"
			content="Please wear a mask!"
			show-icon
			:icon="{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'vtdf-demo-text-teal' }"
		/>

		<Cell title="Error status button" @click="() => (visible8 = true)" />
		<Modal v-model:visible="visible8" btn-text="I was wrong." :button="{ state: 'error' }" />

		<Cell title="Full rounded corner button" @click="() => (visible9 = true)" />
		<Modal v-model:visible="visible9" :button="{ radius: 'full' }" />

		<Cell title="Theme color plain text button" @click="() => (visible12 = true)" />
		<Modal v-model:visible="visible12" :button="{ fill: 'textState' }" />

		<Cell title="Content uses slot and scrolls" @click="() => (visible10 = true)" />
		<Modal v-model:visible="visible10">
			<div class="h-56 overflow-auto">
				<Aphorism :num="6" compact />
			</div>
		</Modal>

		<Cell title="Show narrow" @click="() => (visible7 = true)" />
		<Modal v-model:visible="visible7" :popup="{ px: '20' }" />

		<Cell title="Another animation effect" @click="() => (visible11 = true)" />
		<Modal v-model:visible="visible11" content="Rebound transition" :popup="{ easeType: 'backOut' }" />

		<Cell title="Listening shutdown event" @click="() => (visible13 = true)" />
		<Modal v-model:visible="visible13" @close="() => (toastVisible = true)" />
		<Toast v-model:visible="toastVisible" message="Shut down Modal！" />

		<Cell title="Heading left" @click="() => (visible14 = true)" />
		<Modal v-model:visible="visible14" title="Heading left" title-align="left" />

		<Cell title="Automatic shutdown" @click="() => (visible15 = true)" />
		<Modal v-model:visible="visible15" content="Don't move! I'll be gone in three seconds!" />
	</div>
</template>
