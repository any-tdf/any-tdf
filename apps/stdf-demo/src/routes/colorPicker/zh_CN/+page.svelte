<!-- ColorPicker Demo -->
<script lang="ts">
	import { ColorPicker, Button, Cell } from 'stdf';
	import type { OklchColor } from 'stdf/types';

	// 默认 Popup 模式
	let visible1 = $state(false);
	let colors1 = $state<string[]>([]);

	// 直接显示模式
	let value2: OklchColor = $state({ l: 0.6, c: 0.2, h: 30 });
	let colors2 = $state<string[]>([]);

	// 不同触发方式
	let visible3 = $state(false);
	let colors3 = $state<string[]>([]);

	// 单一模式
	let visible4 = $state(false);
	let colors4 = $state<string[]>([]);

	// 双模式
	let visible5 = $state(false);
	let colors5 = $state<string[]>([]);

	// 自定义 Tab
	let visible6 = $state(false);
	let colors6 = $state<string[]>([]);

	// 隐藏预览
	let visible7 = $state(false);

	// 隐藏输入框
	let visible8 = $state(false);

	// 隐藏复制
	let visible9 = $state(false);

	// 隐藏色块面板
	let visible9b = $state(false);

	// 初始色值 - OKLCH 格式
	let visible10 = $state(false);
	let value10 = $state<OklchColor>({ l: 0.7, c: 0.2, h: 150 });
	let colors10 = $state<string[]>([]);

	// 初始色值 - RGB 格式
	let visible11 = $state(false);
	let value11 = $state<[number, number, number]>([255, 100, 50]);
	let colors11 = $state<string[]>([]);

	// 初始色值 - HEX 格式
	let visible12 = $state(false);
	let value12 = $state('#8B5CF6');
	let colors12 = $state<string[]>([]);
</script>

<div class="mx-4 mt-8 text-lg font-bold">默认（Popup 模式）</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible1 = true)}>打开颜色选择器</Button>
	<ColorPicker
		bind:visible={visible1}
		onclose={(c) => {
			colors1 = c;
		}}
	/>
	{#if colors1.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors1.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">直接显示模式</div>
<div class="px-4 py-4">
	<ColorPicker
		popup={null}
		bind:value={value2}
		onchange={(c) => {
			colors2 = c;
		}}
	/>
	{#if colors2.length > 0}
		<div class="mt-2 text-sm">
			当前颜色：{colors2.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">多种触发方式</div>
<div class="px-4 py-4 space-y-2">
	<Button onclick={() => (visible3 = true)}>按钮触发</Button>
	<Cell title="单元格触发" right="arrow" onclick={() => (visible3 = true)} />
	<div
		class="h-10 w-10 rounded-md border border-black/10 cursor-pointer dark:border-white/20"
		style="background-color: {colors3[2] || '#7B68EE'}"
		onclick={() => (visible3 = true)}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (visible3 = true)}
	></div>
	<ColorPicker
		bind:visible={visible3}
		onclose={(c) => {
			colors3 = c;
		}}
	/>
	{#if colors3.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors3.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">单一模式（无 Tab）</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible4 = true)}>仅 OKLCH 模式</Button>
	<ColorPicker
		bind:visible={visible4}
		modes={['oklch']}
		onclose={(c) => {
			colors4 = c;
		}}
	/>
	{#if colors4.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors4[0]}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">双模式</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible5 = true)}>HEX + RGB 模式</Button>
	<ColorPicker
		bind:visible={visible5}
		modes={['hex', 'rgb']}
		onclose={(c) => {
			colors5 = c;
		}}
	/>
	{#if colors5.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors5.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">自定义 Tab 样式</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible6 = true)}>线型 Tab</Button>
	<ColorPicker
		bind:visible={visible6}
		tab={{ lineType: true }}
		onclose={(c) => {
			colors6 = c;
		}}
	/>
	{#if colors6.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors6.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">隐藏预览</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible7 = true)}>隐藏预览区</Button>
	<ColorPicker bind:visible={visible7} showPreview={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">隐藏输入框</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible8 = true)}>隐藏输入框</Button>
	<ColorPicker bind:visible={visible8} showInputs={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">隐藏复制功能</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible9 = true)}>隐藏复制</Button>
	<ColorPicker bind:visible={visible9} showCopy={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">隐藏色块面板</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">showPanel = false，仅使用滑块调色</div>
	<Button onclick={() => (visible9b = true)}>隐藏色块面板</Button>
	<ColorPicker bind:visible={visible9b} showPanel={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">初始色值 - OKLCH 格式</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = {'{ l: 0.7, c: 0.2, h: 150 }'}</div>
	<Button onclick={() => (visible10 = true)}>打开</Button>
	<ColorPicker
		bind:visible={visible10}
		bind:value={value10}
		onclose={(c) => {
			colors10 = c;
		}}
	/>
	{#if colors10.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors10.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">初始色值 - RGB 格式</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = [255, 100, 50]，modes = ['rgb']</div>
	<Button onclick={() => (visible11 = true)}>打开</Button>
	<ColorPicker
		bind:visible={visible11}
		bind:value={value11}
		modes={['rgb']}
		onclose={(c) => {
			colors11 = c;
		}}
	/>
	{#if colors11.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors11.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">初始色值 - HEX 格式</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = '#8B5CF6'，modes = ['hex']</div>
	<Button onclick={() => (visible12 = true)}>打开</Button>
	<ColorPicker
		bind:visible={visible12}
		bind:value={value12}
		modes={['hex']}
		onclose={(c) => {
			colors12 = c;
		}}
	/>
	{#if colors12.length > 0}
		<div class="mt-2 text-sm">
			返回颜色：{colors12.join(' | ')}
		</div>
	{/if}
</div>

<div class="h-20"></div>
