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
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Modal bind:visible={visible1} title="您明白吗？" content="留下来的人才是最痛苦的" btnText="我明白了" />

	<Cell title="内容使用 Snippet" onclick={() => (visible2 = true)} />
	<Modal bind:visible={visible2}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Modal>

	<Cell title="不显示标题" onclick={() => (visible3 = true)} />
	<Modal bind:visible={visible3} title="" />

	<Cell title="不显示按钮" onclick={() => (visible4 = true)} />
	<Modal bind:visible={visible4} showBtn={false}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Modal>

	<Cell title="点击遮罩关闭" onclick={() => (visible5 = true)} />
	<Modal bind:visible={visible5} popup={{ maskClosable: true }} />

	<Cell title="自定义图标" onclick={() => (visible6 = true)} />
	<Modal
		bind:visible={visible6}
		content="请佩戴口罩！"
		showIcon
		icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'stdf-demo-text-teal' }}
	/>

	<Cell title="错误状态按钮" onclick={() => (visible8 = true)} />
	<Modal bind:visible={visible8} btnText="我错了" button={{ state: 'error' }} />

	<Cell title="全圆角按钮" onclick={() => (visible9 = true)} />
	<Modal bind:visible={visible9} button={{ radius: 'full' }} />

	<Cell title="主题色纯文本按钮" onclick={() => (visible12 = true)} />
	<Modal bind:visible={visible12} button={{ fill: 'textState' }} />

	<Cell title="内容使用 Snippet 且滚动" onclick={() => (visible10 = true)} />
	<Modal bind:visible={visible10}>
		{#snippet contentChild()}
			<div class="h-56 overflow-auto">
				<Aphorism num={6} compact />
			</div>
		{/snippet}
	</Modal>

	<Cell title="显示窄一点" onclick={() => (visible7 = true)} />
	<Modal bind:visible={visible7} popup={{ px: '20' }} />

	<Cell title="另一种动画效果" onclick={() => (visible11 = true)} />
	<Modal bind:visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} />

	<Cell title="监听关闭事件" onclick={() => (visible13 = true)} />
	<Modal bind:visible={visible13} onclose={() => (toastVisible = true)} />
	<Toast bind:visible={toastVisible} message="关闭了 Modal！" />

	<Cell title="标题居左" onclick={() => (visible14 = true)} />
	<Modal bind:visible={visible14} title="标题居左" titleAlign="left" />

	<Cell title="自动关闭" onclick={() => (visible15 = true)} />
	<Modal bind:visible={visible15} content="别动！3 秒后我立即消失！" />
</div>

<!-- Aphorism.svelte -->
<!--
<script lang=""ts>
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
