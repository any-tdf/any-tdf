<script setup lang="ts">
import { ref } from 'vue';
import { Button, Cell, Mask, Popup, Toast } from 'vtdf';

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
const isClick = ref(false);
</script>

<template>
	<div class="py-4">
		<Cell title="Basic usage" @click="() => (visible1 = true)" />
		<Mask :visible="visible1" @click-mask="() => (visible1 = false)" />

		<Cell title="Transparency is 0.1" @click="() => (visible2 = true)" />
		<Mask :visible="visible2" opacity="0.1" @click-mask="() => (visible2 = false)" />

		<Cell title="Transparency is 0.8" @click="() => (visible3 = true)" />
		<Mask :visible="visible3" opacity="0.8" @click-mask="() => (visible3 = false)" />

		<Cell title="Click through" detail="Please close manually" @click="() => (visible4 = true)" />
		<Mask :visible="visible4" clickable />
		<div class="flex">
			<div class="flex-1">
				<Button @click="() => (isClick = !isClick)">{{ isClick ? 'Click on me' : 'Click through' }}</Button>
			</div>
			<div class="flex-1">
				<Button @click="() => (visible4 = false)">Manual shutdown</Button>
			</div>
		</div>

		<Cell title="Reverse color mask" @click="() => (visible5 = true)" />
		<Mask :visible="visible5" inverse @click-mask="() => (visible5 = false)" />

		<Cell title="Blur mask" @click="() => (visible6 = true)" />
		<Mask :visible="visible6" backdrop-blur="xs" opacity="0" @click-mask="() => (visible6 = false)" />

		<Cell title="Increase ambiguity" @click="() => (visible7 = true)" />
		<Mask :visible="visible7" backdrop-blur="xl" opacity="0" @click-mask="() => (visible7 = false)" />

		<Cell title="Increased the animation time" @click="() => (visible8 = true)" />
		<Mask :visible="visible8" :duration="1000" @click-mask="() => (visible8 = false)" />

		<Cell title="Increased the duration of vanishing animation" @click="() => (visible9 = true)" />
		<Mask :visible="visible9" :out-duration="1000" @click-mask="() => (visible9 = false)" />

		<Cell title="Toast Use in" @click="() => (visible10 = true)" />
		<Toast v-model:visible="visible10" message="Transparency is 0" />

		<Cell title="Popup Use in" @click="() => (visible11 = true)" />
		<Popup v-model:visible="visible11" />
	</div>
</template>
