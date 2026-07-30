<script setup lang="ts">
withDefaults(
	defineProps<{
		highlightedCode?: string;
	}>(),
	{
		highlightedCode: ''
	}
);
</script>

<template>
	<article class="prose max-w-none text-sm dark:prose-invert [&_.hljs]:!bg-transparent">
		<pre><code class="hljs" v-html="highlightedCode"></code></pre>
	</article>
</template>
