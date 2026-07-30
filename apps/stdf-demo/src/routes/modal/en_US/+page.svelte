<!-- Modal Demo -->
<script lang="ts">
	import { Modal, Cell, Toast } from 'stdf';
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

	let toastVisible = $state(false);

	$effect(() => {
		if (visible15) {
			setTimeout(() => {
				visible15 = false;
			}, 3000);
		}
	});
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Modal bind:visible={visible1} title="Do you understand?" content="Those who stay will suffer the most" btnText="I see" />

	<Cell title="Content usage Snippet" onclick={() => (visible2 = true)} />
	<Modal bind:visible={visible2}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Modal>

	<Cell title="Do not show the title" onclick={() => (visible3 = true)} />
	<Modal bind:visible={visible3} title="" />

	<Cell title="Do not show button" onclick={() => (visible4 = true)} />
	<Modal bind:visible={visible4} showBtn={false}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Modal>

	<Cell title="Click the mask to close" onclick={() => (visible5 = true)} />
	<Modal bind:visible={visible5} popup={{ maskClosable: true }} />

	<Cell title="Custom icon" onclick={() => (visible6 = true)} />
	<Modal
		bind:visible={visible6}
		content="Please wear a mask!"
		showIcon
		icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'stdf-demo-text-teal' }}
	/>

	<Cell title="Error status button" onclick={() => (visible8 = true)} />
	<Modal bind:visible={visible8} btnText="I was wrong." button={{ state: 'error' }} />

	<Cell title="Full rounded corner button" onclick={() => (visible9 = true)} />
	<Modal bind:visible={visible9} button={{ radius: 'full' }} />

	<Cell title="Theme color plain text button" onclick={() => (visible12 = true)} />
	<Modal bind:visible={visible12} button={{ fill: 'textState' }} />

	<Cell title="Content uses Snippet and scrolls" onclick={() => (visible10 = true)} />
	<Modal bind:visible={visible10}>
		{#snippet contentChild()}
			<div class="h-56 overflow-auto">
				<Aphorism num={6} compact />
			</div>
		{/snippet}
	</Modal>

	<Cell title="Show narrow" onclick={() => (visible7 = true)} />
	<Modal bind:visible={visible7} popup={{ px: '20' }} />

	<Cell title="Another animation effect" onclick={() => (visible11 = true)} />
	<Modal bind:visible={visible11} content="Rebound transition" popup={{ easeType: 'backOut' }} />

	<Cell title="Listening shutdown event" onclick={() => (visible13 = true)} />
	<Modal bind:visible={visible13} onclose={() => (toastVisible = true)} />
	<Toast bind:visible={toastVisible} message="Shut down Modal！" />

	<Cell title="Heading left" onclick={() => (visible14 = true)} />
	<Modal bind:visible={visible14} title="Heading left" titleAlign="left" />

	<Cell title="Automatic shutdown" onclick={() => (visible15 = true)} />
	<Modal bind:visible={visible15} content="Don't move! I'll be gone in three seconds!" />
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
