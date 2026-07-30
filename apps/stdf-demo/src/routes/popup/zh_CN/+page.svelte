<!-- Popup Demo -->
<script lang="ts">
	import { Cell, Popup, Button, Icon, Tab, Slider } from 'stdf';
	import type { TabLabelProps, SvelteEasingProps } from 'stdf/types';
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
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);

	const easeTypes: SvelteEasingProps[] = ['cubicOut', 'backOut', 'bounceOut', 'elasticOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((t) => ({ text: t.replace('Out', '') }));
	let easeTypeIndex = $state(0);
	let easeType = $derived(easeTypes[easeTypeIndex]);

	const durationModes = ['enter', 'exit'] as const;
	const durationLabels: TabLabelProps[] = [{ text: '进入' }, { text: '退出' }];
	let durationModeIndex = $state(0);
	let durationMode = $derived(durationModes[durationModeIndex]);

	let inDuration = $state(450);
	let outDuration = $state(240);
	let durationValue = $derived(durationMode === 'enter' ? inDuration : outDuration);
	const handleDurationChange = (value: number) => {
		if (durationMode === 'enter') {
			inDuration = value;
		} else {
			outDuration = value;
		}
	};
</script>

<div class="py-4">
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Popup bind:visible={visible1} />

	<Cell title="顶部位置" onclick={() => (visible2 = true)} />
	<Popup bind:visible={visible2} position="top" />

	<Cell title="左侧位置" onclick={() => (visible3 = true)} />
	<Popup bind:visible={visible3} position="left" />

	<Cell title="右侧位置" onclick={() => (visible4 = true)} />
	<Popup bind:visible={visible4} position="right" />

	<Cell title="中间位置" onclick={() => (visible5 = true)} />
	<Popup bind:visible={visible5} position="center" />

	<Cell title="顶部位置有圆角" onclick={() => (visible6 = true)} />
	<Popup bind:visible={visible6} radius="2xl" />

	<Cell title="有圆角和间距" onclick={() => (visible7 = true)} />
	<Popup bind:visible={visible7} radiusPosition="all" radius="3xl" px="4" py="4" />

	<Cell title="中间位置有间距和圆角" onclick={() => (visible10 = true)} />
	<Popup bind:visible={visible10} position="center" radiusPosition="all" radius="xl" px="8" />

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">缓动函数（easeType： {easeType}）</div>
		<Tab labels={easeLabels} active={easeTypeIndex} onclickTab={(v) => (easeTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">
			动画时长（{durationMode === 'enter' ? '进入' : '退出'}： {durationValue} ms）
		</div>
		<Tab labels={durationLabels} active={durationModeIndex} onclickTab={(v) => (durationModeIndex = v)} />
		<div class="mt-3">
			<Slider value={durationValue} minRange={0} maxRange={1000} step={50} onchange={handleDurationChange} />
		</div>
	</div>

	<Cell title="自定义动画缓动与时长" onclick={() => (visible11 = true)} />
	<Popup
		bind:visible={visible11}
		{easeType}
		easeOutType={easeType}
		duration={inDuration}
		outDuration={outDuration}
	/>

	<Cell title="不同大小" onclick={() => (visible8 = true)} />
	<Popup bind:visible={visible8} size={80} />

	<Cell title="左侧位置不同大小" onclick={() => (visible9 = true)} />
	<Popup bind:visible={visible9} size={80} position="left" />

	<Cell title="遮罩完全透明且模糊" onclick={() => (visible12 = true)} />
	<Popup bind:visible={visible12} position="center" radiusPosition="all" radius="xl" px="8" mask={{ opacity: '0', backdropBlur: 'sm' }} />

	<Cell title="点击遮罩不会关闭" onclick={() => (visible13 = true)} />
	<Popup bind:visible={visible13} maskClosable={false}>
		<div class="flex h-full flex-col justify-center">
			<Button onclick={() => (visible13 = false)}>关闭</Button>
		</div>
	</Popup>

	<Cell title="大小自动" detail="取决于内部元素" onclick={() => (visible14 = true)} />
	<Popup bind:visible={visible14} size={0} radiusPosition="all" radius="3xl" px="4" py="4" transitionDistance={353}>
		<div class="w-full text-center">
			<div class="py-6 text-xl font-bold">AirPods Pro 已连接</div>
			<div class="m-auto w-1/2">
				<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
			</div>
			<div class="text-primary dark:text-dark flex justify-around py-6">
				<div>设置</div>
				<div>音乐</div>
			</div>
		</div>
	</Popup>

	<Cell title="左侧位置自动大小" onclick={() => (visible20 = true)} />
	<Popup bind:visible={visible20} size={0} position="left" py="48" radiusPosition="right" radius="2xl" transitionDistance={80}>
		<div class="text-primary dark:text-dark flex h-full flex-col justify-around">
			<button class="p-6" onclick={() => (visible20 = false)}>首页</button>
			<button class="p-6" onclick={() => (visible20 = false)}>设置</button>
			<button class="p-6" onclick={() => (visible20 = false)}>关于</button>
		</div>
	</Popup>

	<Cell title="大小自动背景透明" onclick={() => (visible17 = true)} />
	<Popup bind:visible={visible17} position="top" size={0} px="4" py="8" transparent transitionDistance={136}>
		<div class="flex w-full justify-between rounded-full bg-black p-3 text-white">
			<div class="flex">
				<div class="h-12 w-12 overflow-hidden rounded-full">
					<img class="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
				</div>
				<div class="flex flex-col justify-end pl-4">
					<div class="text-xs text-white/40">手机</div>
					<div>胡歌</div>
				</div>
			</div>
			<div class="flex space-x-3">
				<div class="flex h-12 w-12 flex-col items-center justify-center rounded-full stdf-demo-bg-danger" style="transform: rotate(135deg);">
					<Icon name="ri-phone-fill" />
				</div>
				<div class="flex h-12 w-12 flex-col items-center justify-center rounded-full stdf-demo-bg-success">
					<Icon name="ri-phone-fill" />
				</div>
			</div>
		</div>
	</Popup>

	<Cell title="居中位置背景透明" onclick={() => (visible18 = true)} />
	<Popup bind:visible={visible18} size={0} position="center" transparent>
		<div class="flex flex-col justify-center">
			<div class="m-auto w-1/2">
				<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
			</div>
		</div>
	</Popup>

	<Cell title="反色遮罩" onclick={() => (visible15 = true)} />
	<Popup bind:visible={visible15} mask={{ inverse: true }} />

	<Cell title="溢出滚动" onclick={() => (visible19 = true)} />
	<Popup bind:visible={visible19} size={30} position="center">
		<Aphorism num={4} />
	</Popup>

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
			<div class="text-justify text-sm">{item.text}</div>
			<div class="mt-1 text-right" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
</div>
-->
