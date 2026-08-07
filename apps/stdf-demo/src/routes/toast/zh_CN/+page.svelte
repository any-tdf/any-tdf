<!-- Toast Demo -->
<script lang="ts">
	import { Toast, Cell, Button, Loading, Tab, Slider } from 'stdf';
	import type { TabLabelProps, SvelteEasingProps } from 'stdf/types';
	import { onDestroy } from 'svelte';

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
	let visible22 = $state(false);
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);
	let visible26 = $state(false);
	let visible27 = $state(false);
	let visible30 = $state(false);
	let visible31 = $state(false);
	let visible32 = $state(false);

	let time = $state(4);
	let timer: ReturnType<typeof setInterval>;
	const useSnippetFun = () => {
		visible25 = true;
		timer = setInterval(() => {
			time--;
			if (time <= 0) {
				clearInterval(timer!);
				visible25 = false;
				time = 3;
			}
		}, 1000);
	};

	// 组件卸载时清理定时器，避免泄漏
	onDestroy(() => {
		clearInterval(timer);
	});

	// 动画类型控制
	const transitionTypes = ['scale', 'fly', 'fade', 'blur'] as const;
	const transitionLabels: TabLabelProps[] = transitionTypes.map((t) => ({ text: t }));
	let transitionTypeIndex = $state(0);
	let transitionType = $derived(transitionTypes[transitionTypeIndex]);

	// 缓动函数控制
	const easeTypes: SvelteEasingProps[] = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((t) => ({ text: t.replace('Out', '') }));
	let easeTypeIndex = $state(0);
	let easeType = $derived(easeTypes[easeTypeIndex]);

	// 动画时长控制
	let inDuration = $state(300);
	let outDuration = $state(300);

	// fly 动画参数
	let flyY = $state(-100);

	// scale 动画参数
	let scaleStart = $state(0);

	// blur 动画参数
	let blurAmount = $state(5);

	// 根据动画类型生成 transitionParams
	const getTransitionParams = () => {
		const base = { duration: inDuration };
		if (transitionType === 'fly') {
			return { ...base, y: flyY };
		} else if (transitionType === 'scale') {
			return { ...base, start: scaleStart };
		} else if (transitionType === 'blur') {
			return { ...base, amount: blurAmount };
		}
		return base;
	};
</script>

<div class="py-4">
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="轻提示" />

	<Cell title="长文本提示" onclick={() => (visible2 = true)} />
	<Toast bind:visible={visible2} message="当字符数过长时换行，一般不建议在这里显示太多的内容！" />

	<Cell title="不阻止点击" onclick={() => (visible3 = true)} />
	<Toast bind:visible={visible3} clickable message="遮罩下层内容还可以点击" />

	<Cell title="固定显示时间" onclick={() => (visible4 = true)} />
	<Toast bind:visible={visible4} duration={6000} message="6 秒后自动关闭" />

	<Cell title="不自动关闭" onclick={() => (visible5 = true)} />
	<Toast bind:visible={visible5} duration={0} clickable message="此提示不会自动关闭，请点击按钮关闭" />

	<Cell title="成功提示" onclick={() => (visible6 = true)} />
	<Toast bind:visible={visible6} type="success" message="成功提示" />

	<Cell title="失败提示" onclick={() => (visible7 = true)} />
	<Toast bind:visible={visible7} type="error" message="失败提示" />

	<Cell title="警告提示" onclick={() => (visible8 = true)} />
	<Toast bind:visible={visible8} type="warning" message="警告提示" />

	<Cell title="信息提示" onclick={() => (visible9 = true)} />
	<Toast bind:visible={visible9} type="info" message="信息提示" />

	<Cell title="加载提示" onclick={() => (visible30 = true)} />
	<Toast bind:visible={visible30} type="loading" message="加载中..." />

	<Cell title="主题色加载提示" onclick={() => (visible31 = true)} />
	<Toast bind:visible={visible31} type="loading" loading={{ theme: true }} message="加载中..." />

	<Cell title="1_3 号加载提示" onclick={() => (visible32 = true)} />
	<Toast bind:visible={visible32} type="loading" loading={{ type: '1_3' }} message="加载中..." />

	<Cell title="自定义类型" onclick={() => (visible27 = true)} />
	<Toast bind:visible={visible27} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="你真棒！" />

	<Cell title="遮罩不透明" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} mask={{ opacity: '0.3' }} message="遮罩透明度为 0.3" />

	<Cell title="反色遮罩" onclick={() => (visible11 = true)} />
	<Toast bind:visible={visible11} mask={{ inverse: true, opacity: '0.5' }} message="反色遮罩" />

	<Cell title="遮罩模糊" onclick={() => (visible12 = true)} />
	<Toast bind:visible={visible12} mask={{ opacity: '0', backdropBlur: 'sm' }} message="遮罩下层内容模糊" />

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">动画类型（transitionType: {transitionType}）</div>
		<Tab labels={transitionLabels} active={transitionTypeIndex} onclickTab={(v) => (transitionTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">缓动函数（easeType: {easeType}）</div>
		<Tab labels={easeLabels} active={easeTypeIndex} onclickTab={(v) => (easeTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">进入动画时长：{inDuration}ms</div>
		<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (inDuration = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">退出动画时长：{outDuration}ms</div>
		<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (outDuration = v)} />
	</div>

	{#if transitionType === 'fly'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">fly 动画 Y 偏移：{flyY}px</div>
			<Slider value={flyY} minRange={-200} maxRange={200} step={10} onchange={(v) => (flyY = v)} />
		</div>
	{:else if transitionType === 'scale'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">scale 动画初始缩放：{scaleStart}</div>
			<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onchange={(v) => (scaleStart = v)} />
		</div>
	{:else if transitionType === 'blur'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">blur 动画模糊程度：{blurAmount}px</div>
			<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onchange={(v) => (blurAmount = v)} />
		</div>
	{/if}

	<Cell title="自定义动画效果" onclick={() => (visible13 = true)} />
	<Toast
		bind:visible={visible13}
		{transitionType}
		transitionParams={getTransitionParams()}
		{outDuration}
		{easeType}
		easeOutType={easeType}
		message="调整上方控件查看不同动画效果"
	/>

	<Cell title="顶部" onclick={() => (visible22 = true)} />
	<Toast bind:visible={visible22} position="top" message="提示位于顶部" />

	<Cell title="底部" onclick={() => (visible23 = true)} />
	<Toast bind:visible={visible23} position="bottom" message="提示位于底部" />

	<Cell title="顶部增加距离" onclick={() => (visible24 = true)} />
	<Toast bind:visible={visible24} position="top" py="40" message="提示位于顶部且增加了距离" />

	<Cell title="使用 Snippet" onclick={useSnippetFun} />
	<Toast bind:visible={visible25} duration={0}>
		<div class="flex flex-col space-y-4">
			<div>自定义提示内容</div>
			<Loading inverse />
			<div>{time} 秒后关闭</div>
		</div>
	</Toast>

	<Cell title="不同圆角风格" onclick={() => (visible26 = true)} />
	<Toast bind:visible={visible26} radius="2xl" message="加大了圆角" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineState" onclick={() => (visible5 = false)}>手动关闭</Button>
	</div>
</div>
