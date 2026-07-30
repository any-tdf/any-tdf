<script setup lang="ts">
import { computed } from 'vue';
import { aphorisms } from '@any-tdf/site-common/data';

const props = withDefaults(
	defineProps<{
		num?: number;
		compact?: boolean;
	}>(),
	{
		num: 0,
		compact: false
	}
);

const aphorismsList = computed(() => [...aphorisms].sort(() => Math.random() - 0.5).slice(0, props.num));
</script>

<template>
	<div :class="[compact ? '' : 'px-4 py-8', 'divide-y divide-black/5 dark:divide-white/5']">
		<div v-for="item in aphorismsList" :key="item.text" :class="{ 'py-6': num > 1 }">
			<div class="text-justify text-sm">{{ item.text }}</div>
			<div :class="['mt-1 text-right', item.fromItalic ? 'italic' : '']">{{ item.from }}</div>
		</div>
	</div>
</template>
