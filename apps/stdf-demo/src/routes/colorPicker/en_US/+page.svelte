<!-- ColorPicker Demo -->
<script lang="ts">
	import { ColorPicker, Button, Cell } from 'stdf';
	import type { OklchColor } from 'stdf/types';

	// Default Popup mode
	let visible1 = $state(false);
	let colors1 = $state<string[]>([]);

	// Direct display mode
	let value2: OklchColor = $state({ l: 0.6, c: 0.2, h: 30 });
	let colors2 = $state<string[]>([]);

	// Multiple triggers
	let visible3 = $state(false);
	let colors3 = $state<string[]>([]);

	// Single mode
	let visible4 = $state(false);
	let colors4 = $state<string[]>([]);

	// Dual mode
	let visible5 = $state(false);
	let colors5 = $state<string[]>([]);

	// Custom Tab
	let visible6 = $state(false);
	let colors6 = $state<string[]>([]);

	// Hide preview
	let visible7 = $state(false);

	// Hide inputs
	let visible8 = $state(false);

	// Hide copy
	let visible9 = $state(false);

	// Hide color panel
	let visible9b = $state(false);

	// Initial value - OKLCH format
	let visible10 = $state(false);
	let value10 = $state<OklchColor>({ l: 0.7, c: 0.2, h: 150 });
	let colors10 = $state<string[]>([]);

	// Initial value - RGB format
	let visible11 = $state(false);
	let value11 = $state<[number, number, number]>([255, 100, 50]);
	let colors11 = $state<string[]>([]);

	// Initial value - HEX format
	let visible12 = $state(false);
	let value12 = $state('#8B5CF6');
	let colors12 = $state<string[]>([]);
</script>

<div class="mx-4 mt-8 text-lg font-bold">Default (Popup Mode)</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible1 = true)}>Open ColorPicker</Button>
	<ColorPicker
		bind:visible={visible1}
		onclose={(c) => {
			colors1 = c;
		}}
	/>
	{#if colors1.length > 0}
		<div class="mt-2 text-sm">
			Colors: {colors1.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Direct Display Mode</div>
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
			Current: {colors2.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Multiple Triggers</div>
<div class="px-4 py-4 space-y-2">
	<Button onclick={() => (visible3 = true)}>Button Trigger</Button>
	<Cell title="Cell Trigger" right="arrow" onclick={() => (visible3 = true)} />
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
			Colors: {colors3.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Single Mode (No Tab)</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible4 = true)}>OKLCH Only</Button>
	<ColorPicker
		bind:visible={visible4}
		modes={['oklch']}
		onclose={(c) => {
			colors4 = c;
		}}
	/>
	{#if colors4.length > 0}
		<div class="mt-2 text-sm">
			Color: {colors4[0]}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Dual Mode</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible5 = true)}>HEX + RGB Mode</Button>
	<ColorPicker
		bind:visible={visible5}
		modes={['hex', 'rgb']}
		onclose={(c) => {
			colors5 = c;
		}}
	/>
	{#if colors5.length > 0}
		<div class="mt-2 text-sm">
			Colors: {colors5.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Custom Tab Style</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible6 = true)}>Line Type Tab</Button>
	<ColorPicker
		bind:visible={visible6}
		tab={{ lineType: true }}
		onclose={(c) => {
			colors6 = c;
		}}
	/>
	{#if colors6.length > 0}
		<div class="mt-2 text-sm">
			Colors: {colors6.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Hide Preview</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible7 = true)}>Hide Preview</Button>
	<ColorPicker bind:visible={visible7} showPreview={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Hide Inputs</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible8 = true)}>Hide Inputs</Button>
	<ColorPicker bind:visible={visible8} showInputs={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Hide Copy</div>
<div class="px-4 py-4">
	<Button onclick={() => (visible9 = true)}>Hide Copy</Button>
	<ColorPicker bind:visible={visible9} showCopy={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Hide Color Panel</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">showPanel = false, use sliders only</div>
	<Button onclick={() => (visible9b = true)}>Hide Panel</Button>
	<ColorPicker bind:visible={visible9b} showPanel={false} />
</div>

<div class="mx-4 mt-8 text-lg font-bold">Initial Value - OKLCH Format</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = {'{ l: 0.7, c: 0.2, h: 150 }'}</div>
	<Button onclick={() => (visible10 = true)}>Open</Button>
	<ColorPicker
		bind:visible={visible10}
		bind:value={value10}
		onclose={(c) => {
			colors10 = c;
		}}
	/>
	{#if colors10.length > 0}
		<div class="mt-2 text-sm">
			Colors: {colors10.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Initial Value - RGB Format</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = [255, 100, 50], modes = ['rgb']</div>
	<Button onclick={() => (visible11 = true)}>Open</Button>
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
			Colors: {colors11.join(' | ')}
		</div>
	{/if}
</div>

<div class="mx-4 mt-8 text-lg font-bold">Initial Value - HEX Format</div>
<div class="px-4 py-4">
	<div class="mb-2 text-sm text-black/60 dark:text-white/60">value = '#8B5CF6', modes = ['hex']</div>
	<Button onclick={() => (visible12 = true)}>Open</Button>
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
			Colors: {colors12.join(' | ')}
		</div>
	{/if}
</div>

<div class="h-20"></div>
