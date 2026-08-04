<script setup lang="ts">
defineProps<{ text: string }>();

const splitInlineCode = (text: string) =>
	text.split(/(`[^`]+`)/g).map((part) => ({
		code: part.startsWith('`') && part.endsWith('`'),
		text: part.startsWith('`') && part.endsWith('`') ? part.slice(1, -1) : part
	}));
</script>

<template>
	<template v-for="(part, index) in splitInlineCode(text)" :key="`${part.text}-${index}`">
		<code v-if="part.code">{{ part.text }}</code>
		<template v-else>{{ part.text }}</template>
	</template>
</template>
