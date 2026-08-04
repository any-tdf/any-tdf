<script setup lang="ts">
import { nextTick, ref } from 'vue';

const props = withDefaults(
	defineProps<{
		label: string;
		relative?: boolean;
		toggleOnce?: boolean;
	}>(),
	{
		relative: true,
		toggleOnce: false
	}
);

const active = ref(false);
const version = ref(0);

const handleClick = async () => {
	if (props.toggleOnce) {
		active.value = !active.value;
		return;
	}
	active.value = false;
	await nextTick();
	version.value += 1;
	active.value = true;
};
</script>

<template>
	<span class="confetti-toggle" :class="{ relative }" @click="handleClick">
		<button type="button">{{ label }}</button>
		<span v-if="active" :key="version" class="confetti">
			<slot />
		</span>
	</span>
</template>
