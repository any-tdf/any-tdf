<!-- Dialog Demo -->
<script lang="ts">
	import { Dialog, Cell, Toast, Loading } from 'stdf';
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
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);

	let toastVisible = $state(false);
	let toastVisible2 = $state(false);
	let toastVisible3 = $state(false);
	let toastVisible4 = $state(false);

	$effect(() => {
		if (visible8) {
			setTimeout(() => {
				visible8 = false;
			}, 3000);
		}
	});

	let loading = $state(false);
	const somethingFnc = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
			visible18 = false;
			toastVisible4 = true;
		}, 3000);
	};
</script>

<div class="py-4">
	<Cell title="Basic Usage" onclick={() => (visible1 = true)} />
	<Dialog bind:visible={visible1} title="Li Xiaoyao" content="Go to Fairy Island?" />

	<Cell title="Content with Snippet" onclick={() => (visible2 = true)} />
	<Dialog bind:visible={visible2}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Dialog>

	<Cell title="No Title" onclick={() => (visible3 = true)} />
	<Dialog bind:visible={visible3} title="" />

	<Cell title="Close on Mask Click" onclick={() => (visible5 = true)} />
	<Dialog bind:visible={visible5} popup={{ maskClosable: true }} />

	<Cell title="Custom Icon" onclick={() => (visible6 = true)} />
	<Dialog
		bind:visible={visible6}
		content="Please wear a mask!"
		showIcon
		icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'stdf-demo-text-teal' }}
		secondaryText="No mask"
		primaryText="OK"
	/>

	<Cell title="Scrollable Content" onclick={() => (visible4 = true)} />
	<Dialog bind:visible={visible4}>
		{#snippet contentChild()}
			<div class="max-h-56 overflow-auto">
				<Aphorism num={6} compact />
			</div>
		{/snippet}
	</Dialog>

	<Cell title="Bounce Animation" onclick={() => (visible11 = true)} />
	<Dialog bind:visible={visible11} content="Bounce transition" popup={{ easeType: 'backOut' }} />

	<Cell title="Left Title" onclick={() => (visible7 = true)} />
	<Dialog bind:visible={visible7} title="Left Title" titleAlign="left" />

	<Cell title="Auto Close" onclick={() => (visible8 = true)} />
	<Dialog bind:visible={visible8} content="Don't move! Closing in 3s!" />

	<Cell title="Primary Button Ratio" onclick={() => (visible9 = true)} />
	<Dialog bind:visible={visible9} btnRatio={[3, 2]} />

	<Cell title="Reverse Button Order" onclick={() => (visible10 = true)} />
	<Dialog bind:visible={visible10} btnReverse />

	<Cell title="Larger Button Gap" onclick={() => (visible19 = true)} />
	<Dialog bind:visible={visible19} btnGap="16" />

	<Cell title="Text Buttons" onclick={() => (visible12 = true)} />
	<Dialog bind:visible={visible12} btnStyle="text" />

	<Cell title="Text Buttons with Line" onclick={() => (visible13 = true)} />
	<Dialog bind:visible={visible13} btnStyle="textLine" />

	<Cell title="Rounded Buttons" onclick={() => (visible15 = true)} />
	<Dialog bind:visible={visible15} primaryButton={{ radius: 'full' }} secondaryButton={{ radius: 'full' }} />

	<Cell title="Secondary Event" onclick={() => (visible14 = true)} />
	<Dialog bind:visible={visible14} onsecondary={() => (toastVisible = true)} />
	<Toast bind:visible={toastVisible} message="Cancelled!" />

	<Cell title="Close Event" onclick={() => (visible16 = true)} />
	<Dialog bind:visible={visible16} onclose={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="Dialog closed!" />

	<Cell title="Primary Event" onclick={() => (visible17 = true)} />
	<Dialog bind:visible={visible17} onprimary={() => (toastVisible3 = true)} />
	<Toast bind:visible={toastVisible3} message="Confirmed!" />

	<Cell title="Async Primary Event" onclick={() => (visible18 = true)} />
	<Dialog bind:visible={visible18} onprimary={somethingFnc} title="Ghost" content="Enter the Demon Tower?">
		{#snippet primaryChild()}
			<span>
				{#if loading}
					<Loading inverse width="12" height="6" type="1_17" />
				{:else}
					Enter
				{/if}
			</span>
		{/snippet}
	</Dialog>
	<Toast bind:visible={toastVisible4} message="Entered the tower!" />
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
