<script setup lang="ts">
import VtdfLogo from '../../components/VtdfLogo.vue';
</script>

<template>
	<div class="mx-auto max-w-full">
		<div class="mb-4 flex justify-around gap-3 text-9xl font-bold md:justify-start md:gap-10">
			<div class="text-dark dark:text-primary">V</div>
			<div class="text-primary dark:text-dark">T</div>
			<div class="text-primary dark:text-dark">D</div>
			<div class="text-primary dark:text-dark">F</div>
		</div>
		<div class="max-w-full md:max-w-md">
			<VtdfLogo class="w-full" construction data-logo-construction data-logo-static />
		</div>
	</div>
</template>
