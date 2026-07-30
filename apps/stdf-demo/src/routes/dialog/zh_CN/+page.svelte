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
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Dialog bind:visible={visible1} title="李逍遥" content="你确认前往仙灵岛吗？" />

	<Cell title="内容使用 Snippet" onclick={() => (visible2 = true)} />
	<Dialog bind:visible={visible2}>
		{#snippet contentChild()}
			<Aphorism num={1} compact />
		{/snippet}
	</Dialog>

	<Cell title="不显示标题" onclick={() => (visible3 = true)} />
	<Dialog bind:visible={visible3} title="" />

	<Cell title="点击遮罩关闭" onclick={() => (visible5 = true)} />
	<Dialog bind:visible={visible5} popup={{ maskClosable: true }} />

	<Cell title="自定义图标" onclick={() => (visible6 = true)} />
	<Dialog
		bind:visible={visible6}
		content="请佩戴口罩！"
		showIcon
		icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'stdf-demo-text-teal' }}
		secondaryText="没携带"
		primaryText="好的"
	/>

	<Cell title="内容使用 Snippet 且滚动" onclick={() => (visible4 = true)} />
	<Dialog bind:visible={visible4}>
		{#snippet contentChild()}
			<div class="max-h-56 overflow-auto">
				<Aphorism num={6} compact />
			</div>
		{/snippet}
	</Dialog>

	<Cell title="另一种动画效果" onclick={() => (visible11 = true)} />
	<Dialog bind:visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} />

	<Cell title="标题居左" onclick={() => (visible7 = true)} />
	<Dialog bind:visible={visible7} title="标题居左" titleAlign="left" />

	<Cell title="自动关闭" onclick={() => (visible8 = true)} />
	<Dialog bind:visible={visible8} content="别动！3 秒后我立即消失！" />

	<Cell title="主按钮占比多一点" onclick={() => (visible9 = true)} />
	<Dialog bind:visible={visible9} btnRatio={[3, 2]} />

	<Cell title="主次按钮位置反转" onclick={() => (visible10 = true)} />
	<Dialog bind:visible={visible10} btnReverse />

	<Cell title="按钮间距大一点" onclick={() => (visible19 = true)} />
	<Dialog bind:visible={visible19} btnGap="16" />

	<Cell title="按钮为纯文字" onclick={() => (visible12 = true)} />
	<Dialog bind:visible={visible12} btnStyle="text" />

	<Cell title="按钮为纯文字有分割线" onclick={() => (visible13 = true)} />
	<Dialog bind:visible={visible13} btnStyle="textLine" />

	<Cell title="全圆角按钮" onclick={() => (visible15 = true)} />
	<Dialog bind:visible={visible15} primaryButton={{ radius: 'full' }} secondaryButton={{ radius: 'full' }} />

	<Cell title="监听次要事件" onclick={() => (visible14 = true)} />
	<Dialog bind:visible={visible14} onsecondary={() => (toastVisible = true)} />
	<Toast bind:visible={toastVisible} message="点击了取消！" />

	<Cell title="监听关闭事件" onclick={() => (visible16 = true)} />
	<Dialog bind:visible={visible16} onclose={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="关闭了 Dialog！" />

	<Cell title="监听主要事件" onclick={() => (visible17 = true)} />
	<Dialog bind:visible={visible17} onprimary={() => (toastVisible3 = true)} />
	<Toast bind:visible={toastVisible3} message="点击了确认！" />

	<Cell title="异步执行主要事件" onclick={() => (visible18 = true)} />
	<Dialog bind:visible={visible18} onprimary={somethingFnc} title="小鬼" content="你一定要进入锁妖塔吗？">
		{#snippet primaryChild()}
			<span>
				{#if loading}
					<Loading inverse width="12" height="6" type="1_17" />
				{:else}
					进入
				{/if}
			</span>
		{/snippet}
	</Dialog>
	<Toast bind:visible={toastVisible4} message="已进入锁妖塔！" />
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
