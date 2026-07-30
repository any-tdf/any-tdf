<script setup lang="ts">
import { ref } from 'vue';
import { ActionPopover, Button } from 'vtdf';
import type { ActionProps, RingActionProps } from 'vtdf/types';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible8 = ref(false);
const visible9 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);
const visible13 = ref(false);
const visible14 = ref(false);

const triggerRef1 = ref<HTMLElement | null>(null);
const triggerRef2 = ref<HTMLElement | null>(null);
const triggerRef3 = ref<HTMLElement | null>(null);
const triggerRef4 = ref<HTMLElement | null>(null);
const triggerRef5 = ref<HTMLElement | null>(null);
const triggerRef6 = ref<HTMLElement | null>(null);
const triggerRef7 = ref<HTMLElement | null>(null);
const triggerRef8 = ref<HTMLElement | null>(null);
const triggerRef9 = ref<HTMLElement | null>(null);
const triggerRef10 = ref<HTMLElement | null>(null);
const triggerRef11 = ref<HTMLElement | null>(null);
const triggerRef12 = ref<HTMLElement | null>(null);
const triggerRef13 = ref<HTMLElement | null>(null);
const triggerRef14 = ref<HTMLElement | null>(null);

const actions: ActionProps[] = [
	{ content: 'Edit' },
	{ content: 'Share', style: 'success', disabled: true },
	{ content: 'Delete', style: 'error' }
];
const actions2: ActionProps[] = [
	{ content: 'Copy Link' },
	{ content: 'Save Image' },
	{ content: 'Forward' },
	{ content: 'Report', style: 'warning' }
];
const actionsWithIcon: ActionProps[] = [
	{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: 'Share', style: 'theme', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: 'Favorite', style: 'info', icon: { name: 'ri-star-line', size: 18 } },
	{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
];
const actionsWithIcon2: ActionProps[] = [
	{ content: 'Copy', icon: { name: 'ri-file-copy-line', size: 18 } },
	{ content: 'Cut', style: 'warning', icon: { name: 'ri-scissors-line', size: 18 } },
	{ content: 'Paste', icon: { name: 'ri-clipboard-line', size: 18 } }
];
const actionsGrid: ActionProps[] = [
	{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: 'Share', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: 'Favorite', icon: { name: 'ri-star-line', size: 18 } },
	{ content: 'Copy', icon: { name: 'ri-file-copy-line', size: 18 } },
	{ content: 'Paste', icon: { name: 'ri-clipboard-line', size: 18 } },
	{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
];
const ringActions3: RingActionProps[] = [
	{ icon: { name: 'ri-edit-line', size: 20 } },
	{ icon: { name: 'ri-share-forward-line', size: 20 } },
	{ icon: { name: 'ri-star-line', size: 20 } }
];
const ringActions5: RingActionProps[] = [
	{ icon: { name: 'ri-edit-line', size: 20 } },
	{ icon: { name: 'ri-share-forward-line', size: 20 } },
	{ icon: { name: 'ri-star-line', size: 20 } },
	{ icon: { name: 'ri-file-copy-line', size: 20 } },
	{ icon: { name: 'ri-delete-bin-line', size: 20 }, style: 'error' }
];
const ringActions8: RingActionProps[] = [
	{ icon: { name: 'ri-edit-line', size: 20 } },
	{ icon: { name: 'ri-share-forward-line', size: 20 } },
	{ icon: { name: 'ri-star-line', size: 20 } },
	{ icon: { name: 'ri-file-copy-line', size: 20 } },
	{ icon: { name: 'ri-clipboard-line', size: 20 } },
	{ icon: { name: 'ri-heart-line', size: 20 }, style: 'error' },
	{ icon: { name: 'ri-thumb-up-line', size: 20 }, style: 'success' },
	{ icon: { name: 'ri-delete-bin-line', size: 20 }, style: 'warning' }
];
</script>

<template>
	<div class="py-4">
		<div class="mx-4 text-lg font-bold">Basic usage</div>
		<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
			ActionPopover appears near the trigger element and fits compact interaction scenarios.
		</div>

		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef1" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible1 = !visible1)">More actions</Button>
			</div>
			<ActionPopover v-model:visible="visible1" :trigger-ref="triggerRef1" :actions="actions" inline-align="left" />
		</div>

		<div class="mx-4 mt-4 flex items-center justify-center gap-4">
			<div ref="triggerRef2" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible2 = !visible2)">Center aligned</Button>
			</div>
			<ActionPopover v-model:visible="visible2" :trigger-ref="triggerRef2" :actions="actions" inline-align="center" />
		</div>

		<div class="mx-4 mt-4 flex items-center justify-end gap-4">
			<div ref="triggerRef3" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible3 = !visible3)">Right aligned</Button>
			</div>
			<ActionPopover v-model:visible="visible3" :trigger-ref="triggerRef3" :actions="actions" inline-align="right" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">With title</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef4" class="inline-block">
				<Button size="sm" fill="lineState" height-out="0" @click="() => (visible4 = !visible4)">More</Button>
			</div>
			<ActionPopover v-model:visible="visible4" :trigger-ref="triggerRef4" :actions="actions2" inline-align="left" title="Select action" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">Pop upward</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef5" class="inline-block">
				<Button
					size="sm"
					fill="colorLight"
					height-out="0"
					:icon="{ name: 'ri-more-2-fill', size: 20 }"
					@click="() => (visible5 = !visible5)"
				/>
			</div>
			<ActionPopover v-model:visible="visible5" :trigger-ref="triggerRef5" :actions="actions" inline-align="left" inline-direction="up" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">With icons</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef6" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible6 = !visible6)">Action menu</Button>
			</div>
			<ActionPopover v-model:visible="visible6" :trigger-ref="triggerRef6" :actions="actionsWithIcon" inline-align="left" align="left" />
		</div>

		<div class="mx-4 mb-4 mt-4 flex items-center justify-end gap-4">
			<div ref="triggerRef7" class="inline-block">
				<Button size="sm" fill="lineLight" height-out="0" :icon="{ name: 'ri-more-line', size: 18 }" @click="() => (visible7 = !visible7)"
					>Edit</Button
				>
			</div>
			<ActionPopover v-model:visible="visible7" :trigger-ref="triggerRef7" :actions="actionsWithIcon2" inline-align="right" align="left" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">Inverse colors</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef8" class="inline-block">
				<Button size="sm" fill="lineState" height-out="0" @click="() => (visible8 = !visible8)">Inverse</Button>
			</div>
			<ActionPopover v-model:visible="visible8" :trigger-ref="triggerRef8" :actions="actions" inline-align="left" inverse />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">Horizontal layout</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef9" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible9 = !visible9)">Horizontal actions</Button>
			</div>
			<ActionPopover v-model:visible="visible9" :trigger-ref="triggerRef9" :actions="actionsWithIcon2" inline-align="left" layout="h" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">Grid layout</div>
		<div class="mx-4 mb-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef10" class="inline-block">
				<Button size="sm" fill="lineLight" height-out="0" @click="() => (visible10 = !visible10)">Grid actions</Button>
			</div>
			<ActionPopover
				v-model:visible="visible10"
				:trigger-ref="triggerRef10"
				:actions="actionsGrid"
				inline-align="left"
				layout="grid"
				:grid-columns="3"
			/>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">Ring Layout</div>
		<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
			Ring layout automatically determines the expansion direction based on the trigger element's position, supporting quarter circle, half
			circle, and full circle.
		</div>

		<div class="mx-4 mt-4 text-sm font-bold">Auto detect (3 items → Quarter circle)</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef11" class="inline-block">
				<Button
					fill="base"
					custom-size
					:custom-width="44"
					:custom-height="44"
					:icon="{ name: 'ri-add-line', size: 20 }"
					@click="() => (visible11 = !visible11)"
				/>
			</div>
			<ActionPopover v-model:visible="visible11" :trigger-ref="triggerRef11" :actions="[]" layout="ring" :ring-actions="ringActions3" />
		</div>

		<div class="mx-4 mt-4 flex items-center justify-end gap-4">
			<div ref="triggerRef12" class="inline-block">
				<Button
					fill="base"
					custom-size
					:custom-width="44"
					:custom-height="44"
					:icon="{ name: 'ri-add-line', size: 20 }"
					@click="() => (visible12 = !visible12)"
				/>
			</div>
			<ActionPopover v-model:visible="visible12" :trigger-ref="triggerRef12" :actions="[]" layout="ring" :ring-actions="ringActions3" />
		</div>

		<div class="mx-4 mt-4 text-sm font-bold">Auto detect (5 items → Half circle)</div>
		<div class="mx-4 mt-4 flex items-center justify-center gap-4">
			<div ref="triggerRef13" class="inline-block">
				<Button
					fill="colorLight"
					custom-size
					:custom-width="44"
					:custom-height="44"
					:icon="{ name: 'ri-more-2-fill', size: 20 }"
					@click="() => (visible13 = !visible13)"
				/>
			</div>
			<ActionPopover v-model:visible="visible13" :trigger-ref="triggerRef13" :actions="[]" layout="ring" :ring-actions="ringActions5" />
		</div>

		<div class="mx-4 mt-4 text-sm font-bold">Full circle (8 items)</div>
		<div class="mx-4 mb-32 mt-4 flex items-center justify-center gap-4">
			<div ref="triggerRef14" class="inline-block">
				<Button
					fill="lineState"
					custom-size
					:custom-width="44"
					:custom-height="44"
					:icon="{ name: 'ri-apps-line', size: 20 }"
					@click="() => (visible14 = !visible14)"
				/>
			</div>
			<ActionPopover
				v-model:visible="visible14"
				:trigger-ref="triggerRef14"
				:actions="[]"
				layout="ring"
				:ring-actions="ringActions8"
				ring-shape="full"
			/>
		</div>
	</div>
</template>
