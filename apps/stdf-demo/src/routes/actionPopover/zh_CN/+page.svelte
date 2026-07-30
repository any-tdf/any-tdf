<!-- ActionPopover Demo -->
<script lang="ts">
	import { ActionPopover, Button } from 'stdf';
	import { type ActionProps, type RingActionProps } from 'stdf/types';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let triggerRef1 = $state<HTMLElement | null>(null);
	let triggerRef2 = $state<HTMLElement | null>(null);
	let triggerRef3 = $state<HTMLElement | null>(null);
	let triggerRef4 = $state<HTMLElement | null>(null);
	let triggerRef5 = $state<HTMLElement | null>(null);
	let triggerRef6 = $state<HTMLElement | null>(null);
	let triggerRef7 = $state<HTMLElement | null>(null);
	let triggerRef8 = $state<HTMLElement | null>(null);
	let triggerRef9 = $state<HTMLElement | null>(null);
	let triggerRef10 = $state<HTMLElement | null>(null);
	let triggerRef11 = $state<HTMLElement | null>(null);
	let triggerRef12 = $state<HTMLElement | null>(null);
	let triggerRef13 = $state<HTMLElement | null>(null);
	let triggerRef14 = $state<HTMLElement | null>(null);

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

	// 环形布局操作项
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

<div class="py-4">
	<div class="mx-4 text-lg font-bold">基础用法</div>
	<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">ActionPopover 操作气泡用于在触发元素附近弹出，适合更紧凑的交互场景。</div>

	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef1} class="inline-block">
			<Button size="sm" onclick={() => (visible1 = !visible1)} heightOut="0">更多操作</Button>
		</div>
		<ActionPopover bind:visible={visible1} triggerRef={triggerRef1} actions={actions} inlineAlign="left" />
	</div>

	<div class="mx-4 mt-4 flex items-center justify-center gap-4">
		<div bind:this={triggerRef2} class="inline-block">
			<Button size="sm" onclick={() => (visible2 = !visible2)} heightOut="0">居中对齐</Button>
		</div>
		<ActionPopover bind:visible={visible2} triggerRef={triggerRef2} actions={actions} inlineAlign="center" />
	</div>

	<div class="mx-4 mt-4 flex items-center justify-end gap-4">
		<div bind:this={triggerRef3} class="inline-block">
			<Button size="sm" onclick={() => (visible3 = !visible3)} heightOut="0">右对齐</Button>
		</div>
		<ActionPopover bind:visible={visible3} triggerRef={triggerRef3} actions={actions} inlineAlign="right" />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">带标题</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef4} class="inline-block">
			<Button size="sm" fill="lineState" onclick={() => (visible4 = !visible4)} heightOut="0">更多</Button>
		</div>
		<ActionPopover bind:visible={visible4} triggerRef={triggerRef4} actions={actions2} inlineAlign="left" title="选择操作" />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">向上弹出</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef5} class="inline-block">
			<Button size="sm" fill="colorLight" onclick={() => (visible5 = !visible5)} heightOut="0" icon={{ name: 'ri-more-2-fill', size: 20 }}></Button>
		</div>
		<ActionPopover bind:visible={visible5} triggerRef={triggerRef5} actions={actions} inlineAlign="left" inlineDirection="up" />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">带图标</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef6} class="inline-block">
			<Button size="sm" onclick={() => (visible6 = !visible6)} heightOut="0">操作菜单</Button>
		</div>
		<ActionPopover bind:visible={visible6} triggerRef={triggerRef6} actions={actionsWithIcon} inlineAlign="left" align="left" />
	</div>

	<div class="mx-4 mb-4 mt-4 flex items-center justify-end gap-4">
		<div bind:this={triggerRef7} class="inline-block">
			<Button size="sm" fill="lineLight" onclick={() => (visible7 = !visible7)} heightOut="0" icon={{ name: 'ri-more-line', size: 18 }}>编辑</Button>
		</div>
		<ActionPopover bind:visible={visible7} triggerRef={triggerRef7} actions={actionsWithIcon2} inlineAlign="right" align="left" />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">反转色</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef8} class="inline-block">
			<Button size="sm" fill="lineState" onclick={() => (visible8 = !visible8)} heightOut="0">反转色</Button>
		</div>
		<ActionPopover bind:visible={visible8} triggerRef={triggerRef8} actions={actions} inlineAlign="left" inverse />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">横向排列</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef9} class="inline-block">
			<Button size="sm" onclick={() => (visible9 = !visible9)} heightOut="0">横向操作</Button>
		</div>
		<ActionPopover bind:visible={visible9} triggerRef={triggerRef9} actions={actionsWithIcon2} inlineAlign="left" layout="h" />
	</div>

	<div class="mx-4 mt-8 text-sm font-bold">宫格布局</div>
	<div class="mx-4 mb-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef10} class="inline-block">
			<Button size="sm" fill="lineLight" onclick={() => (visible10 = !visible10)} heightOut="0">宫格操作</Button>
		</div>
		<ActionPopover
			bind:visible={visible10}
			triggerRef={triggerRef10}
			actions={actionsGrid}
			inlineAlign="left"
			layout="grid"
			gridColumns={3}
		/>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">环形布局</div>
	<div class="mx-4 mt-2 text-sm text-black/50 dark:text-white/50">环形布局会根据触发元素在页面的位置自动判断展开方向，支持 1/4 圆、半圆、全圆三种形式。</div>

	<div class="mx-4 mt-4 text-sm font-bold">自动判断（3 个操作项 → 1/4 圆）</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<div bind:this={triggerRef11} class="inline-block">
			<Button fill="base" onclick={() => (visible11 = !visible11)} customSize customWidth={44} customHeight={44} icon={{ name: 'ri-add-line', size: 20 }}></Button>
		</div>
		<ActionPopover bind:visible={visible11} triggerRef={triggerRef11} actions={[]} layout="ring" ringActions={ringActions3} />
	</div>

	<div class="mx-4 mt-4 flex items-center justify-end gap-4">
		<div bind:this={triggerRef12} class="inline-block">
			<Button fill="base" onclick={() => (visible12 = !visible12)} customSize customWidth={44} customHeight={44} icon={{ name: 'ri-add-line', size: 20 }}></Button>
		</div>
		<ActionPopover bind:visible={visible12} triggerRef={triggerRef12} actions={[]} layout="ring" ringActions={ringActions3} />
	</div>

	<div class="mx-4 mt-4 text-sm font-bold">自动判断（5 个操作项 → 半圆）</div>
	<div class="mx-4 mt-4 flex items-center justify-center gap-4">
		<div bind:this={triggerRef13} class="inline-block">
			<Button fill="colorLight" onclick={() => (visible13 = !visible13)} customSize customWidth={44} customHeight={44} icon={{ name: 'ri-more-2-fill', size: 20 }}></Button>
		</div>
		<ActionPopover bind:visible={visible13} triggerRef={triggerRef13} actions={[]} layout="ring" ringActions={ringActions5} />
	</div>

	<div class="mx-4 mt-4 text-sm font-bold">全圆（8 个操作项）</div>
	<div class="mx-4 mb-32 mt-4 flex items-center justify-center gap-4">
		<div bind:this={triggerRef14} class="inline-block">
			<Button fill="lineState" onclick={() => (visible14 = !visible14)} customSize customWidth={44} customHeight={44} icon={{ name: 'ri-apps-line', size: 20 }}></Button>
		</div>
		<ActionPopover bind:visible={visible14} triggerRef={triggerRef14} actions={[]} layout="ring" ringActions={ringActions8} ringShape="full" />
	</div>
</div>
