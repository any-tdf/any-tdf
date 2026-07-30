<!-- FullKeyboard Demo -->
<script lang="ts">
	import { FullKeyboard, Cell, Toast, Slider } from 'stdf';
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

	// 获取内容
	let value1 = $state('');

	// 监听点击事件
	let visibleToast = $state(false);
	let key = $state('');
	const clickFunc = (k: string) => {
		key = k;
		visibleToast = true;
	};

	// 禁用完成按钮 + 烟花效果
	let value9 = $state('');
	let helloDom: HTMLElement | null = $state(null);
	let helloDomBottom = 0;
	let top = $state(0);
	const openFunc = (height: number) => {
		helloDomBottom = window.innerHeight - (helloDom?.getBoundingClientRect().bottom || 0);
		top = helloDomBottom < height ? -(height - helloDomBottom) - 50 : 0;
	};
</script>

<Cell title="基础用法" subTitle="默认 full 模式" onclick={() => (visible1 = true)} />
<FullKeyboard bind:visible={visible1} />

<Cell title="纯字母模式" subTitle="mode='letter'" onclick={() => (visible12 = true)} />
<FullKeyboard bind:visible={visible12} mode="letter" />

<Cell title="字母加数字模式" subTitle="mode='letterNumber'" onclick={() => (visible13 = true)} />
<FullKeyboard bind:visible={visible13} mode="letterNumber" />

<Cell title="完整模式" subTitle="mode='full'" onclick={() => (visible14 = true)} />
<FullKeyboard bind:visible={visible14} mode="full" />

<Cell title="块式样式" subTitle="type='block'" onclick={() => (visible19 = true)} />
<FullKeyboard bind:visible={visible19} type="block" />

<Cell title="块式样式 + 字母数字模式" subTitle="type='block' + mode='letterNumber'" onclick={() => (visible20 = true)} />
<FullKeyboard bind:visible={visible20} type="block" mode="letterNumber" />

<div class="px-4">输入了: {value1}</div>
<Cell title="获取内容" onclick={() => (visible2 = true)} />
<FullKeyboard bind:visible={visible2} bind:value={value1} />

<Cell title="不显示完成" onclick={() => (visible3 = true)} />
<FullKeyboard bind:visible={visible3} done={false} />

<Cell title="自定义完成文字" onclick={() => (visible6 = true)} />
<FullKeyboard bind:visible={visible6} doneText="发送" />

<Cell title="输入预览" onclick={() => (visible7 = true)} />
<FullKeyboard bind:visible={visible7} preview />

<Cell title="输入预览掩码显示" onclick={() => (visible8 = true)} />
<FullKeyboard bind:visible={visible8} preview previewMask />

<div
	class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
	style="top:{top}px"
	bind:this={helloDom}
>
	{value9}
	{#if value9.toLowerCase() === 'hello'}
		<span class="absolute left-1/2"><Confetti rounded amount={100} /></span>
	{/if}
</div>
<Cell title="请输入 hello" onclick={() => (visible9 = true)} />
<FullKeyboard bind:visible={visible9} bind:value={value9} doneDisabled={value9.toLowerCase() !== 'hello'} onopen={openFunc} onclose={() => (top = 0)} />

<Cell title="增大按键圆角" onclick={() => (visible10 = true)} />
<FullKeyboard bind:visible={visible10} radius="2xl" />

<Cell title="自定义按键字体" subTitle="需要 CSS 加载字体并在 @theme 中配置" onclick={() => (visible15 = true)} />
<FullKeyboard bind:visible={visible15} keyClass="font-Trueno" />

<Cell title="自定义过渡动画" subTitle="弹性动画" onclick={() => (visible16 = true)} />
<FullKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="完成按键注入 Class" onclick={() => (visible17 = true)} />
<FullKeyboard bind:visible={visible17} doneClass="stdf-demo-gradient-action" />

<Cell title="面板与按键注入 Class" onclick={() => (visible18 = true)} />
<FullKeyboard
	bind:visible={visible18}
	panelClass="stdf-demo-gradient-primary"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="监听点击事件" onclick={() => (visible11 = true)} />
<FullKeyboard bind:visible={visible11} onclick={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`点击了 ${key}`}></Toast>

<div class="px-4 py-2">不使用弹出层</div>
<div class="px-4 pb-2">
	<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
</div>
<FullKeyboard popup={null} radius={currentRadius} />
