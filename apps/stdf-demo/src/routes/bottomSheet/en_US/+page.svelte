<!-- BottomSheet Demo -->
<script lang="ts">
	import { BottomSheet, Cell, Toast, Button } from 'stdf';
	import Aphorism from '../../components/Aphorism.svelte';

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

	let toastBackVisible = $state(false);
	let toastCloseVisible = $state(false);

	const stayHeightList = [40, 60, 80];
	let currentHeight = $state(60);
	const heightChangeFunc = (height: number) => (currentHeight = height);
</script>

<div class="py-4">
	<Cell title="Basic Usage" onclick={() => (visible1 = true)} />
	<BottomSheet bind:visible={visible1} title="This area supports sliding">
		<div class="flex h-full flex-col justify-center text-center">
			<div>This is the content area</div>
		</div>
	</BottomSheet>

	<Cell title="Content area scrolling" onclick={() => (visible8 = true)} />
	<BottomSheet bind:visible={visible8}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="With back button" onclick={() => (visible2 = true)} />
	<BottomSheet
		bind:visible={visible2}
		showBackIcon
		title="Click back and close to trigger events"
		onback={() => (toastBackVisible = true)}
		onclose={() => (toastCloseVisible = true)}
	>
		<Aphorism num={12} />
	</BottomSheet>
	<Toast bind:visible={toastBackVisible} message="Triggered BottomSheet return event!" />
	<Toast bind:visible={toastCloseVisible} message="Triggered BottomSheet close event!" />

	<Cell title="Initial height is 90" onclick={() => (visible3 = true)} />
	<BottomSheet bind:visible={visible3} stayHeightIndex={2}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="Fixed height is 40/60/80" onclick={() => (visible4 = true)} />
	<BottomSheet
		bind:visible={visible4}
		{stayHeightList}
		onheightChange={heightChangeFunc}
		title={`Current fixed height is ${currentHeight}`}
	>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="Click mask to close" onclick={() => (visible5 = true)} />
	<BottomSheet bind:visible={visible5} maskClosable>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Transition time is 1 second" onclick={() => (visible6 = true)} />
	<BottomSheet bind:visible={visible6} duration={1000}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="Mask completely transparent and blurry" onclick={() => (visible7 = true)} />
	<BottomSheet bind:visible={visible7} mask={{ opacity: '0', backdropBlur: 'sm' }}>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Header does not display any content" onclick={() => (visible9 = true)} />
	<BottomSheet bind:visible={visible9} showDivider={false} closeContent="" title="">
		<div class="flex h-full flex-col justify-around px-4 py-8 text-center">
			<div>Header area</div>
			<div>Title</div>
			<div>Back and close icon</div>
			<div>Divider</div>
			<div>None</div>
			<div>Position still reserved as a sliding touch area</div>
			<div class="mb-8">
				<Button onclick={() => (visible9 = false)}>Close</Button>
			</div>
		</div>
	</BottomSheet>

	<Cell title="Hide close icon and center title" onclick={() => (visible10 = true)} />
	<BottomSheet bind:visible={visible10} closeContent="" titleAlign="center" maskClosable title="Click mask to close">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Another close icon" onclick={() => (visible13 = true)} />
	<BottomSheet bind:visible={visible13} closeContent="closeIcon">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Custom close text" onclick={() => (visible14 = true)} />
	<BottomSheet bind:visible={visible14} closeContent="Complete">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Different rounded style" onclick={() => (visible12 = true)} />
	<BottomSheet bind:visible={visible12} radius="md" showBackIcon>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="Slide to bottom to close" onclick={() => (visible11 = true)} />
	<BottomSheet bind:visible={visible11} closeHeight={10} closeContent="">
		<div class="p-4">
			Set closeHeight to 10. If the position distance is less than 10% of the page height when sliding ends, it will be automatically
			closed.
		</div>
	</BottomSheet>
</div>

<!-- Aphorism.svelte -->
<!--
<script lang="ts">
	// 引入数据
	// import data
	import { aphorisms } from '@any-tdf/site-common/data';

	/**
	 * @typedef {Object} Props
	 * @property {number} [num] - number of items to display
	 * @property {boolean} [compact] - whether to use compact mode
	 */
	/** @type {Props} */
	let { num = 0, compact = false } = $props();

	// 从 aphorisms 随机取出 num 条数据
	// get num items from aphorisms randomly
	const aphorismsList = aphorisms.sort(() => Math.random() - 0.5).slice(0, num);
</script>

<div class="{compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5">
	{#each aphorismsList as item}
		<div class:py-6={num > 1}>
			<div class="text-sm text-justify">{item.text}</div>
			<div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
</div>
-->
