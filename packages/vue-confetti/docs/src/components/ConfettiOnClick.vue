<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { Confetti } from '@any-tdf/vue-confetti';

defineProps<{
	label: string;
}>();

type ClickConfetti = {
	id: number;
	x: number;
	y: number;
};

const items = ref<ClickConfetti[]>([]);
let timeout: ReturnType<typeof setTimeout> | undefined;

const handleClick = (event: MouseEvent) => {
	const target = event.currentTarget as HTMLDivElement;
	const bounds = target.getBoundingClientRect();
	items.value = [
		...items.value,
		{
			id: Date.now() + Math.random(),
			x: event.clientX - bounds.left,
			y: event.clientY - bounds.top
		}
	];
	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(() => {
		items.value = [];
	}, 2000);
};

onBeforeUnmount(() => {
	if (timeout) clearTimeout(timeout);
});
</script>

<template>
	<div class="box" @click="handleClick">
		<span>{{ label }}</span>
		<span v-for="item in items" :key="item.id" class="click-confetti" :style="{ left: `${item.x}px`, top: `${item.y}px` }">
			<Confetti :amount="10" :y="[-0.5, 0.5]" fall-distance="20px" :duration="2000" />
		</span>
	</div>
</template>
