<script setup lang="ts">
import type { AvatarGroupProps } from '../types';
import AvatarGroup from './AvatarGroup.vue';

defineProps<
	Omit<AvatarGroupProps, 'top'> & {
		top?: 'totle' | 'add' | null;
	}
>();
</script>

<template>
	<AvatarGroup v-bind="$props">
		<template v-if="$slots.top" #top>
			<slot name="top" />
		</template>
	</AvatarGroup>
</template>
