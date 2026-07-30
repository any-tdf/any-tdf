<script setup lang="ts">
import { ref } from 'vue';
import { BottomSheet, Button, Cell, Toast } from 'vtdf';
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

const toastBackVisible = ref(false);
const toastCloseVisible = ref(false);
const stayHeightList = [40, 60, 80];
const currentHeight = ref(60);

const heightChangeFunc = (height: number) => {
	currentHeight.value = height;
};
</script>

<template>
	<div class="py-4">
		<Cell title="Basic Usage" @click="() => (visible1 = true)" />
		<BottomSheet v-model:visible="visible1" title="This area supports sliding">
			<div class="flex h-full flex-col justify-center text-center">
				<div>This is the content area</div>
			</div>
		</BottomSheet>

		<Cell title="Content area scrolling" @click="() => (visible8 = true)" />
		<BottomSheet v-model:visible="visible8">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="With back button" @click="() => (visible2 = true)" />
		<BottomSheet
			v-model:visible="visible2"
			show-back-icon
			title="Click back and close to trigger events"
			@back="() => (toastBackVisible = true)"
			@close="() => (toastCloseVisible = true)"
		>
			<Aphorism :num="12" />
		</BottomSheet>
		<Toast v-model:visible="toastBackVisible" message="Triggered BottomSheet return event!" />
		<Toast v-model:visible="toastCloseVisible" message="Triggered BottomSheet close event!" />

		<Cell title="Initial height is 90" @click="() => (visible3 = true)" />
		<BottomSheet v-model:visible="visible3" :stay-height-index="2">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="Fixed height is 40/60/80" @click="() => (visible4 = true)" />
		<BottomSheet
			v-model:visible="visible4"
			:stay-height-list="stayHeightList"
			@height-change="heightChangeFunc"
			:title="`Current fixed height is ${currentHeight}`"
		>
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="Click mask to close" @click="() => (visible5 = true)" />
		<BottomSheet v-model:visible="visible5" mask-closable>
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Transition time is 1 second" @click="() => (visible6 = true)" />
		<BottomSheet v-model:visible="visible6" :duration="1000">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="Mask completely transparent and blurry" @click="() => (visible7 = true)" />
		<BottomSheet v-model:visible="visible7" :mask="{ opacity: '0', backdropBlur: 'sm' }">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Header does not display any content" @click="() => (visible9 = true)" />
		<BottomSheet v-model:visible="visible9" :show-divider="false" close-content="" title="">
			<div class="flex h-full flex-col justify-around px-4 py-8 text-center">
				<div>Header area</div>
				<div>Title</div>
				<div>Back and close icon</div>
				<div>Divider</div>
				<div>None</div>
				<div>Position still reserved as a sliding touch area</div>
				<div class="mb-8">
					<Button @click="() => (visible9 = false)">Close</Button>
				</div>
			</div>
		</BottomSheet>

		<Cell title="Hide close icon and center title" @click="() => (visible10 = true)" />
		<BottomSheet v-model:visible="visible10" close-content="" title-align="center" mask-closable title="Click mask to close">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Another close icon" @click="() => (visible13 = true)" />
		<BottomSheet v-model:visible="visible13" close-content="closeIcon">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Custom close text" @click="() => (visible14 = true)" />
		<BottomSheet v-model:visible="visible14" close-content="Complete">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Different rounded style" @click="() => (visible12 = true)" />
		<BottomSheet v-model:visible="visible12" radius="md" show-back-icon>
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="Slide to bottom to close" @click="() => (visible11 = true)" />
		<BottomSheet v-model:visible="visible11" :close-height="10" close-content="">
			<div class="p-4">
				Set closeHeight to 10. If the position distance is less than 10% of the page height when sliding ends, it will be automatically
				closed.
			</div>
		</BottomSheet>
	</div>
</template>
