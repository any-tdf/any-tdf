<script setup lang="ts">
import { ref } from 'vue';
import { Icon, NavBar, Toast } from 'vtdf';

const icons1 = [{ name: 'ri-paint-brush-line', theme: true }, { name: 'ri-share-line' }];
const icons2 = [{ name: 'ri-command-line' }, { name: 'ri-drag-move-line' }];
const icons3 = [{ name: 'ri-indent-decrease' }, { name: 'ri-service-line' }];
const icons4 = [{ name: 'ri-hand-heart-line', theme: true }, { name: 'ri-parent-line' }];

const visible1 = ref(false);
const visible2 = ref(false);
const rightIndex = ref(0);
const visible3 = ref(false);
</script>

<template>
	<div class="flex flex-col space-y-8 py-8">
		<NavBar title="Basic usage" />
		<NavBar title="Use Icon on the right side" :rights="icons1" />
		<NavBar title="Title centered" title-align="center" :rights="[{ name: 'ri-command-line' }]" />
		<NavBar title="Click on the left" @click-left="() => (visible1 = true)" />
		<Toast v-model:visible="visible1" message="Clicked on the left!" />
		<NavBar
			title="Click on the right"
			:rights="icons2"
			@click-right="
				(index) => {
					visible2 = true;
					rightIndex = index;
				}
			"
		/>
		<Toast v-model:visible="visible2" :message="`The index of the clicked right icon is ${rightIndex}.`" />
		<NavBar title="No left and bottom dividers, long text" :left="null" :line="false" :rights="icons3" />
		<NavBar title="Custom background color by injClass" inj-class="vtdf-demo-nav-bg" />
		<NavBar>
			<template #titleChild>
				<div class="vtdf-demo-text-red-green">Custom text color by slot</div>
			</template>
		</NavBar>
		<NavBar>
			<template #titleChild>
				<div class="flex h-12 flex-col justify-around text-xs">
					<div class="text-sm">title slot renders</div>
					<div>right slot renders</div>
				</div>
			</template>
			<template #rightChild>
				<div>
					<button class="h-12 w-12 cursor-pointer text-center text-primary dark:text-dark" @click="visible3 = true">Hello</button>
				</div>
			</template>
		</NavBar>
		<Toast v-model:visible="visible3" message="Clicked on the right slot content!" />
		<NavBar title="Love version" love :rights="icons4" />
		<NavBar inj-class="!bg-transparent" :line="false">
			<template #leftChild>
				<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
					<Icon name="ri-home-7-line" :size="18" :y="-2" />
				</div>
			</template>
			<template #titleChild>
				<div class="my-2 h-8 rounded-full bg-white px-3 text-sm leading-8 dark:bg-black/50">injClass + slot</div>
			</template>
			<template #rightChild>
				<div class="m-2 h-8 w-8 rounded-full bg-white text-center leading-8 dark:bg-black/50">
					<Icon name="ri-customer-service-2-line" :size="18" :y="-2" />
				</div>
			</template>
		</NavBar>
	</div>
</template>
