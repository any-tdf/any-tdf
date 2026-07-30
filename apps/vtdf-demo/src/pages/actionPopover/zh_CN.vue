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
	{ content: '编辑' },
	{ content: '分享', style: 'success', disabled: true },
	{ content: '删除', style: 'error' }
];
const actions2: ActionProps[] = [
	{ content: '复制链接' },
	{ content: '保存图片' },
	{ content: '转发给朋友' },
	{ content: '举报', style: 'warning' }
];
const actionsWithIcon: ActionProps[] = [
	{ content: '编辑', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: '分享', style: 'theme', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: '收藏', style: 'info', icon: { name: 'ri-star-line', size: 18 } },
	{ content: '删除', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
];
const actionsWithIcon2: ActionProps[] = [
	{ content: '复制', icon: { name: 'ri-file-copy-line', size: 18 } },
	{ content: '剪切', style: 'warning', icon: { name: 'ri-scissors-line', size: 18 } },
	{ content: '粘贴', icon: { name: 'ri-clipboard-line', size: 18 } }
];
const actionsGrid: ActionProps[] = [
	{ content: '编辑', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: '分享', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: '收藏', icon: { name: 'ri-star-line', size: 18 } },
	{ content: '复制', icon: { name: 'ri-file-copy-line', size: 18 } },
	{ content: '粘贴', icon: { name: 'ri-clipboard-line', size: 18 } },
	{ content: '删除', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
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
		<div class="mx-4 text-lg font-bold">基础用法</div>
		<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
			ActionPopover 操作气泡用于在触发元素附近弹出，适合更紧凑的交互场景。
		</div>

		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef1" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible1 = !visible1)">更多操作</Button>
			</div>
			<ActionPopover v-model:visible="visible1" :trigger-ref="triggerRef1" :actions="actions" inline-align="left" />
		</div>

		<div class="mx-4 mt-4 flex items-center justify-center gap-4">
			<div ref="triggerRef2" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible2 = !visible2)">居中对齐</Button>
			</div>
			<ActionPopover v-model:visible="visible2" :trigger-ref="triggerRef2" :actions="actions" inline-align="center" />
		</div>

		<div class="mx-4 mt-4 flex items-center justify-end gap-4">
			<div ref="triggerRef3" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible3 = !visible3)">右对齐</Button>
			</div>
			<ActionPopover v-model:visible="visible3" :trigger-ref="triggerRef3" :actions="actions" inline-align="right" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">带标题</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef4" class="inline-block">
				<Button size="sm" fill="lineState" height-out="0" @click="() => (visible4 = !visible4)">更多</Button>
			</div>
			<ActionPopover v-model:visible="visible4" :trigger-ref="triggerRef4" :actions="actions2" inline-align="left" title="选择操作" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">向上弹出</div>
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

		<div class="mx-4 mt-8 text-sm font-bold">带图标</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef6" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible6 = !visible6)">操作菜单</Button>
			</div>
			<ActionPopover v-model:visible="visible6" :trigger-ref="triggerRef6" :actions="actionsWithIcon" inline-align="left" align="left" />
		</div>

		<div class="mx-4 mb-4 mt-4 flex items-center justify-end gap-4">
			<div ref="triggerRef7" class="inline-block">
				<Button size="sm" fill="lineLight" height-out="0" :icon="{ name: 'ri-more-line', size: 18 }" @click="() => (visible7 = !visible7)"
					>编辑</Button
				>
			</div>
			<ActionPopover v-model:visible="visible7" :trigger-ref="triggerRef7" :actions="actionsWithIcon2" inline-align="right" align="left" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">反转色</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef8" class="inline-block">
				<Button size="sm" fill="lineState" height-out="0" @click="() => (visible8 = !visible8)">反转色</Button>
			</div>
			<ActionPopover v-model:visible="visible8" :trigger-ref="triggerRef8" :actions="actions" inline-align="left" inverse />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">横向排列</div>
		<div class="mx-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef9" class="inline-block">
				<Button size="sm" height-out="0" @click="() => (visible9 = !visible9)">横向操作</Button>
			</div>
			<ActionPopover v-model:visible="visible9" :trigger-ref="triggerRef9" :actions="actionsWithIcon2" inline-align="left" layout="h" />
		</div>

		<div class="mx-4 mt-8 text-sm font-bold">宫格布局</div>
		<div class="mx-4 mb-4 mt-4 flex items-center gap-4">
			<div ref="triggerRef10" class="inline-block">
				<Button size="sm" fill="lineLight" height-out="0" @click="() => (visible10 = !visible10)">宫格操作</Button>
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

		<div class="mx-4 mt-8 text-lg font-bold">环形布局</div>
		<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">
			环形布局会根据触发元素在页面的位置自动判断展开方向，支持 1/4 圆、半圆、全圆三种形式。
		</div>

		<div class="mx-4 mt-4 text-sm font-bold">自动判断（3 个操作项 → 1/4 圆）</div>
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

		<div class="mx-4 mt-4 text-sm font-bold">自动判断（5 个操作项 → 半圆）</div>
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

		<div class="mx-4 mt-4 text-sm font-bold">全圆（8 个操作项）</div>
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
