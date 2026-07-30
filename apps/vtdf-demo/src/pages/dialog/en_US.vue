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
		<Cell title="Basic Usage" @click="() => (visible1 = true)" />
		<Dialog v-model:visible="visible1" title="Li Xiaoyao" content="Go to Fairy Island?" />

		<Cell title="Content with slot" @click="() => (visible2 = true)" />
		<Dialog v-model:visible="visible2">
			<Aphorism :num="1" compact />
		</Dialog>

		<Cell title="No Title" @click="() => (visible3 = true)" />
		<Dialog v-model:visible="visible3" title="" />

		<Cell title="Close on Mask Click" @click="() => (visible4 = true)" />
		<Dialog v-model:visible="visible4" :popup="{ maskClosable: true }" />

		<Cell title="Custom Icon" @click="() => (visible5 = true)" />
		<Dialog
			v-model:visible="visible5"
			content="Please wear a mask!"
			show-icon
			:icon="{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'vtdf-demo-text-teal' }"
			secondary-text="No mask"
			primary-text="OK"
		/>

		<Cell title="Scrollable Content" @click="() => (visible6 = true)" />
		<Dialog v-model:visible="visible6">
			<div class="max-h-56 overflow-auto">
				<Aphorism :num="6" compact />
			</div>
		</Dialog>

		<Cell title="Bounce Animation" @click="() => (visible7 = true)" />
		<Dialog v-model:visible="visible7" content="Bounce transition" :popup="{ easeType: 'backOut' }" />

		<Cell title="Left Title" @click="() => (visible9 = true)" />
		<Dialog v-model:visible="visible9" title="Left Title" title-align="left" />

		<Cell title="Auto Close" @click="() => (visible8 = true)" />
		<Dialog v-model:visible="visible8" content="Don't move! Closing in 3s!" />

		<Cell title="Primary Button Ratio" @click="() => (visible10 = true)" />
		<Dialog v-model:visible="visible10" :btn-ratio="[3, 2]" />

		<Cell title="Reverse Button Order" @click="() => (visible11 = true)" />
		<Dialog v-model:visible="visible11" btn-reverse />

		<Cell title="Larger Button Gap" @click="() => (visible12 = true)" />
		<Dialog v-model:visible="visible12" btn-gap="16" />

		<Cell title="Text Buttons" @click="() => (visible13 = true)" />
		<Dialog v-model:visible="visible13" btn-style="text" />

		<Cell title="Text Buttons with Line" @click="() => (visible14 = true)" />
		<Dialog v-model:visible="visible14" btn-style="textLine" />

		<Cell title="Rounded Buttons" @click="() => (visible15 = true)" />
		<Dialog v-model:visible="visible15" :primary-button="{ radius: 'full' }" :secondary-button="{ radius: 'full' }" />

		<Cell title="Secondary Event" @click="() => (visible16 = true)" />
		<Dialog v-model:visible="visible16" @secondary="() => (toastVisible = true)" />
		<Toast v-model:visible="toastVisible" message="Cancelled!" />

		<Cell title="Close Event" @click="() => (visible17 = true)" />
		<Dialog v-model:visible="visible17" @close="() => (toastVisible2 = true)" />
		<Toast v-model:visible="toastVisible2" message="Dialog closed!" />

		<Cell title="Primary Event" @click="() => (visible18 = true)" />
		<Dialog v-model:visible="visible18" @primary="() => (toastVisible3 = true)" />
		<Toast v-model:visible="toastVisible3" message="Confirmed!" />

		<Cell title="Async Primary Event" @click="() => (visible19 = true)" />
		<Dialog v-model:visible="visible19" title="Ghost" content="Enter the Demon Tower?" @primary="somethingFnc">
			<template #primary>
				<Loading v-if="loading" inverse width="12" height="6" type="1_17" />
				<span v-else>Enter</span>
			</template>
		</Dialog>
		<Toast v-model:visible="toastVisible4" message="Entered the tower!" />
	</div>
</template>
