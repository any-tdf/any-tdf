<script setup lang="ts">
import DemoButton from './DemoButton.vue';
import ExampleConfetti from './ExampleConfetti.vue';

withDefaults(
	defineProps<{
		label: string;
		code: string;
		kind: string;
		relative?: boolean;
		toggleOnce?: boolean;
	}>(),
	{
		relative: true,
		toggleOnce: false
	}
);
</script>

<template>
	<div class="button-code-group">
		<DemoButton :label="label" :relative="relative" :toggle-once="toggleOnce">
			<ExampleConfetti :kind="kind" />
		</DemoButton>
		<code class="well">{{ code }}</code>
	</div>
</template>
