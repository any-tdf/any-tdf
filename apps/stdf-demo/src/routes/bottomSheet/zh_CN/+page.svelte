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
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<BottomSheet bind:visible={visible1} title="此区域支持滑动">
		<div class="flex h-full flex-col justify-center text-center">
			<div>这里是内容区域</div>
		</div>
	</BottomSheet>

	<Cell title="内容区域滚动" onclick={() => (visible8 = true)} />
	<BottomSheet bind:visible={visible8}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="有返回按钮" onclick={() => (visible2 = true)} />
	<BottomSheet
		bind:visible={visible2}
		showBackIcon
		title="点击返回与关闭可触发事件"
		onback={() => (toastBackVisible = true)}
		onclose={() => (toastCloseVisible = true)}
	>
		<Aphorism num={12} />
	</BottomSheet>
	<Toast bind:visible={toastBackVisible} message="触发了 BottomSheet 返回事件！" />
	<Toast bind:visible={toastCloseVisible} message="触发了 BottomSheet 关闭事件！" />

	<Cell title="初始高度为 90" onclick={() => (visible3 = true)} />
	<BottomSheet bind:visible={visible3} stayHeightIndex={2}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="固定高度为 40/60/80" onclick={() => (visible4 = true)} />
	<BottomSheet bind:visible={visible4} {stayHeightList} onheightChange={heightChangeFunc} title={`当前固定高度为${currentHeight}`}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="点击遮罩可关闭" onclick={() => (visible5 = true)} />
	<BottomSheet bind:visible={visible5} maskClosable>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="出现过渡时间为 1 秒" onclick={() => (visible6 = true)} />
	<BottomSheet bind:visible={visible6} duration={1000}>
		<Aphorism num={12} />
	</BottomSheet>

	<Cell title="遮罩完全透明且模糊" onclick={() => (visible7 = true)} />
	<BottomSheet bind:visible={visible7} mask={{ opacity: '0', backdropBlur: 'sm' }}>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="头部不显示任何内容" onclick={() => (visible9 = true)} />
	<BottomSheet bind:visible={visible9} showDivider={false} closeContent="" title="">
		<div class="flex h-full flex-col justify-around px-4 py-8 text-center">
			<div>头部区域</div>
			<div>标题</div>
			<div>返回与关闭图标</div>
			<div>分割线</div>
			<div>都不显示</div>
			<div>位置依旧保留作为滑动触控区域</div>
			<div class="mb-8">
				<Button onclick={() => (visible9 = false)}>关闭</Button>
			</div>
		</div>
	</BottomSheet>

	<Cell title="隐藏关闭图标且标题居中" onclick={() => (visible10 = true)} />
	<BottomSheet bind:visible={visible10} closeContent="" titleAlign="center" maskClosable title="点击遮罩关闭">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="另一种关闭图标" onclick={() => (visible13 = true)} />
	<BottomSheet bind:visible={visible13} closeContent="closeIcon">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="关闭区域自定义文字" onclick={() => (visible14 = true)} />
	<BottomSheet bind:visible={visible14} closeContent="完成">
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="图标不同圆角风格" onclick={() => (visible12 = true)} />
	<BottomSheet bind:visible={visible12} radius="md" showBackIcon>
		<Aphorism num={2} />
	</BottomSheet>

	<Cell title="可下滑到底部关闭" onclick={() => (visible11 = true)} />
	<BottomSheet bind:visible={visible11} closeHeight={10} closeContent="">
		<div class="p-4">将 closeHeight 设置为 10，如果滑动结束时位置距离页面底部小于页面高度的 10% 则自动关闭。</div>
	</BottomSheet>
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
