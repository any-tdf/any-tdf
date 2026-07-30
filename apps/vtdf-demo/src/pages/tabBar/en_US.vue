<script setup lang="ts">
import { ref } from 'vue';
import { TabBar } from 'vtdf';
import type { TabBarLabelProps } from 'vtdf/types';

const labels: TabBarLabelProps[] = [
	{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
	{ text: 'Discover', icon: { name: 'ri-compass-3-line', size: 20 }, activeIcon: { name: 'ri-compass-3-fill', size: 20 } },
	{ text: 'Message', icon: { name: 'ri-discuss-line', size: 20 }, activeIcon: { name: 'ri-discuss-fill', size: 20 } },
	{ text: 'Mine', icon: { name: 'ri-account-circle-line', size: 20 }, activeIcon: { name: 'ri-account-circle-fill', size: 20 } }
];
const labels1: TabBarLabelProps[] = [{ text: 'Home' }, { text: 'Discover' }, { text: 'Message' }, { text: 'Mine' }];
const labels2: TabBarLabelProps[] = [
	{ icon: { name: 'ri-home-3-line', size: 26 }, activeIcon: { name: 'ri-home-3-fill', size: 26 } },
	{ icon: { name: 'ri-compass-3-line', size: 26 }, activeIcon: { name: 'ri-compass-3-fill', size: 26 } },
	{ icon: { name: 'ri-discuss-line', size: 26 }, activeIcon: { name: 'ri-discuss-fill', size: 26 } },
	{ icon: { name: 'ri-account-circle-line', size: 26 }, activeIcon: { name: 'ri-account-circle-fill', size: 26 } }
];
const labels3: TabBarLabelProps[] = [
	{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 } },
	{ text: 'Discover', icon: { name: 'ri-compass-3-line', size: 20 } },
	{ text: 'Message', icon: { name: 'ri-discuss-line', size: 20 } },
	{ text: 'Mine', icon: { name: 'ri-account-circle-line', size: 20 } }
];
const labels4: TabBarLabelProps[] = [
	{ text: 'Home', icon: { name: 'ri-home-3-line', size: 20 }, activeIcon: { name: 'ri-home-3-fill', size: 20 } },
	{ text: 'Message', icon: { name: 'ri-discuss-line', size: 20 }, activeIcon: { name: 'ri-discuss-fill', size: 20 } },
	{ text: 'Mine', icon: { name: 'ri-account-circle-line', size: 20 }, activeIcon: { name: 'ri-account-circle-fill', size: 20 } }
];

const active = ref(0);
</script>

<template>
	<div class="mb-20 py-8">
		<div class="my-4 space-y-8">
			<div>
				<div class="mb-2 px-4 font-bold">Basic usage</div>
				<TabBar :labels="labels" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Text only</div>
				<TabBar :labels="labels1" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Icon only</div>
				<TabBar :labels="labels2" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Belt line</div>
				<TabBar :labels="labels" line :line-w="8" />
				<div class="mt-2" />
				<TabBar :labels="labels" line />
				<div class="mt-2" />
				<TabBar :labels="labels" line :line-w="2" />
				<div class="mt-2" />
				<TabBar :labels="labels" line :line-w="1" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">ICONS change colors only</div>
				<TabBar :labels="labels3" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Customize the outermost layer</div>
				<TabBar :labels="labels" inj-class="mx-2 rounded-full shadow-md dark:shadow-white/10" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">customize Tab</div>
				<TabBar :labels="labels" tab-inj-class="vtdf-demo-text-purple-yellow" active-tab-inj-class="!text-primary dark:!text-dark" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Only customize selected Tab</div>
				<TabBar :labels="labels" active-tab-inj-class="vtdf-demo-text-purple-yellow" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Custom line</div>
				<TabBar :labels="labels" line active-inj-class="vtdf-demo-bg-purple-yellow" />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">Care edition</div>
				<TabBar :labels="labels" love />
			</div>
			<div>
				<div class="mb-2 px-4 font-bold">monitor change event</div>
				<div class="m-4">At present TabBar activated active: {{ active }}</div>
				<TabBar :labels="labels" @change="(nextActive) => (active = nextActive)" />
			</div>
		</div>
	</div>
	<div class="fixed bottom-0 w-full">
		<TabBar :labels="labels4" inj-class="bg-white/50 backdrop-blur-sm dark:bg-black/50" />
	</div>
</template>
