<!-- NumKeyboard Demo -->
<script lang="ts">
	import { NumKeyboard, Cell, Toast, Slider } from 'stdf';
	import type { SmallAreaRadius } from 'stdf/types';
	import { Confetti } from 'svelte-confetti';

	// 按键圆角
	const radiusValues: SmallAreaRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2);
	let currentRadius = $derived<SmallAreaRadius>(radiusValues[radiusIndex]);

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
	let visible20 = $state(false);
	let visible21 = $state(false);
	let visible22 = $state(false);

	// 演示监听点击事件
	let visibleToast = $state(false);
	let key = $state('');
	const clickFunc = (k: string) => {
		key = k;
		visibleToast = true;
	};

	// 演示监听开启与关闭事件
	let loveDom: HTMLElement | null = $state(null);
	// loveDom 距离窗口底部的距离
	let loveDomBottom = 0;
	let value = $state('');
	let top = $state(0);
	const openFunc = (height: number) => {
		// 如果 loveDom 距离窗口底部小于键盘高度，就把 loveDom 向上移动键盘高度
		loveDomBottom = window.innerHeight - (loveDom?.getBoundingClientRect().bottom || 0);
		top = loveDomBottom < height ? -(height - loveDomBottom) - 50 : 0;
	};

	let value21 = $state('');
	// 演示清空内容
	let valueClear = $state('');
</script>

<Cell title="基础用法" onclick={() => (visible1 = true)} />
<NumKeyboard bind:visible={visible1} />

<div class="px-4">输入了: {value21}</div>
<Cell title="获取内容" onclick={() => (visible21 = true)} />
<NumKeyboard bind:visible={visible21} bind:value={value21} />

<div class="px-4">输入了: {valueClear}</div>
<Cell title="打开时清空内容" onclick={() => (visible20 = true)} />
<NumKeyboard bind:visible={visible20} bind:value={valueClear} clear />

<Cell title="不显示完成" onclick={() => (visible2 = true)} />
<NumKeyboard bind:visible={visible2} done={false} />

<Cell title="显示关闭" onclick={() => (visible3 = true)} />
<NumKeyboard bind:visible={visible3} close />

<Cell title="显示关闭不显示完成" subTitle="必须隐藏小数点" onclick={() => (visible9 = true)} />
<NumKeyboard bind:visible={visible9} close dot={false} done={false} />

<Cell title="数字上下反向" onclick={() => (visible4 = true)} />
<NumKeyboard bind:visible={visible4} reverse />

<Cell title="增高按键高度" onclick={() => (visible5 = true)} />
<NumKeyboard bind:visible={visible5} height="16" />

<Cell title="增大间距" onclick={() => (visible6 = true)} />
<NumKeyboard bind:visible={visible6} space="4" p="4" />

<Cell title="不显示小数点" onclick={() => (visible7 = true)} />
<NumKeyboard bind:visible={visible7} close dot={false} />

<Cell title="不必要的全部不显示" onclick={() => (visible8 = true)} />
<NumKeyboard bind:visible={visible8} done={false} dot={false} />

<Cell title="块式" onclick={() => (visible10 = true)} />
<NumKeyboard bind:visible={visible10} type="block" height="14" p="0" />

<Cell title="自定义完成文字" onclick={() => (visible18 = true)} />
<NumKeyboard bind:visible={visible18} doneText="转账" />

<Cell title="监听点击事件" onclick={() => (visible11 = true)} />
<NumKeyboard bind:visible={visible11} onclick={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`点击了 ${key}`}></Toast>

<div
	class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
	style="top:{top}px"
	bind:this={loveDom}
>
	{value}
	{#if value === '5201314'}
		<span class="absolute left-1/2"><Confetti rounded amount={100} /></span>
	{/if}
</div>
<Cell title="请输入 5201314" onclick={() => (visible12 = true)} />
<NumKeyboard bind:visible={visible12} doneDisabled={value !== '5201314'} bind:value onopen={openFunc} onclose={() => (top = 0)} />

<Cell title="增大按键圆角" onclick={() => (visible13 = true)} />
<NumKeyboard bind:visible={visible13} radius="2xl" />

<Cell title="完成按键注入 Class" onclick={() => (visible14 = true)} />
<NumKeyboard bind:visible={visible14} doneClass="stdf-demo-gradient-action" />

<Cell title="面板与按键注入 Class" onclick={() => (visible15 = true)} />
<NumKeyboard
	bind:visible={visible15}
	panelClass="stdf-demo-gradient-primary"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="自定义过渡动画" subTitle="通过 popup" onclick={() => (visible16 = true)} />
<NumKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="激活时背景不透明" subTitle="通过 popup 内的 mask" onclick={() => (visible17 = true)} />
<NumKeyboard bind:visible={visible17} popup={{ mask: { opacity: '0.4' } }} />

<Cell title="自定义按键字体" subTitle="需要 CSS 加载字体并在 @theme 中配置" onclick={() => (visible19 = true)} />
<NumKeyboard bind:visible={visible19} keyClass="font-Trueno" />

<Cell title="输入预览" subTitle="在键盘顶部显示输入内容" onclick={() => (visible22 = true)} />
<NumKeyboard bind:visible={visible22} preview />

<div class="px-4 py-2">不使用弹出层</div>
<div class="px-4 pb-2">
	<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
</div>
<NumKeyboard popup={null} radius={currentRadius} />
