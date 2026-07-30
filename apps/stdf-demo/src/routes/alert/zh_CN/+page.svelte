<!-- Alert Demo -->
<script lang="ts">
	import { Alert, Cell, Button, Slider, Card, Switch, Tab } from 'stdf';
	import type { LargeAreaRadius, TabLabelProps, SvelteEasingProps } from 'stdf/types';

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

	// 反转色控制
	let inverse = $state(true);

	// 圆角控制
	const radiusList: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	let radiusIndex = $state(2);
	let radius = $derived(radiusList[radiusIndex]);

	// 动画类型控制
	const transitionTypes = ['fly', 'scale', 'fade', 'blur'] as const;
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
	<Alert bind:visible={visible1} message="这是一条提示信息" />

	<Cell title="带标题" onclick={() => (visible2 = true)} />
	<Alert bind:visible={visible2} title="提示标题" message="这是一条带有标题的提示信息" />

	<Cell title="成功提示" onclick={() => (visible3 = true)} />
	<Alert bind:visible={visible3} type="success" title="成功" message="操作已成功完成！" />

	<Cell title="失败提示" onclick={() => (visible4 = true)} />
	<Alert bind:visible={visible4} type="error" title="错误" message="操作失败，请重试！" />

	<Cell title="警告提示" onclick={() => (visible5 = true)} />
	<Alert bind:visible={visible5} type="warning" title="警告" message="请注意，此操作不可撤销！" />

	<Cell title="信息提示" onclick={() => (visible6 = true)} />
	<Alert bind:visible={visible6} type="info" title="提示" message="这是一条普通的信息提示。" />

	<Cell title="底部位置" onclick={() => (visible7 = true)} />
	<Alert bind:visible={visible7} position="bottom" type="success" message="从底部滑入的提示" />

	<Cell title="增加距离" onclick={() => (visible8 = true)} />
	<Alert bind:visible={visible8} py="60" type="info" message="距离顶部更远一些" />

	<Cell title="不显示关闭按钮" onclick={() => (visible9 = true)} />
	<Alert bind:visible={visible9} closable={false} type="warning" message="此提示没有关闭按钮" />

	<Cell title="不显示类型图标" onclick={() => (visible10 = true)} />
	<Alert bind:visible={visible10} type="success" showIcon={false} message="成功但不显示图标" />

	<Cell title="自定义图标" onclick={() => (visible11 = true)} />
	<Alert bind:visible={visible11} icon={{ name: 'ri-rocket-2-line', state: 'success' }} message="使用自定义图标" />

	<Cell title="固定显示 6 秒" onclick={() => (visible12 = true)} />
	<Alert bind:visible={visible12} duration={6000} type="info" message="6 秒后自动关闭" />

	<Cell title="不自动关闭" onclick={() => (visible13 = true)} />
	<Alert bind:visible={visible13} duration={0} type="warning" title="注意" message="此提示不会自动关闭，请手动关闭" />

	<Cell title="自定义 Card 样式" onclick={() => (visible14 = true)} />
	<Alert bind:visible={visible14} card={{ shadow: '2xl', radius: '2xl', border: 'solid' }} type="success" title="自定义卡片" message="更大的阴影和圆角" />

	<Cell title="使用 Snippet" onclick={() => (visible15 = true)} />
	<Alert bind:visible={visible15} duration={0}>
		<div class="flex flex-col gap-2">
			<div class="font-medium">自定义内容</div>
			<div class="text-sm text-black/70 dark:text-white/70">这是完全自定义的提示内容，可以包含任意元素。</div>
			<div class="flex gap-2 mt-2">
				<Button size="sm" onclick={() => (visible15 = false)}>取消</Button>
				<Button size="sm" fill="base" onclick={() => (visible15 = false)}>确定</Button>
			</div>
		</div>
	</Alert>

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

	<Cell title="自定义动画效果" onclick={() => (visible16 = true)} />
	<Alert
		bind:visible={visible16}
		{transitionType}
		transitionParams={getTransitionParams()}
		{outDuration}
		{easeType}
		easeOutType={easeType}
		type="success"
		message="调整上方控件查看不同动画效果"
	/>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">调整圆角（Card radius: {radius}）</div>
		<Slider value={radiusIndex} minRange={0} maxRange={7} step={1} showSteps onchange={(v) => (radiusIndex = v)} />
	</div>

	<Cell title="不同圆角风格" onclick={() => (visible17 = true)} />
	<Alert bind:visible={visible17} card={{ radius }} type="info" message="调整上方滑块查看不同圆角" />

	<div class="px-2 py-4">
		<div class="flex items-center justify-between">
			<div class="text-sm text-black/50 dark:text-white/50">反转色（inverse: {inverse}）</div>
			<Switch bind:active={inverse} />
		</div>
	</div>

	<Cell title="反转色效果" onclick={() => (visible18 = true)} />
	<Alert bind:visible={visible18} {inverse} type="success" title="提示" message="默认开启反转色，让弹窗更醒目" />

	<Cell title="不反转色效果" onclick={() => (visible19 = true)} />
	<Alert bind:visible={visible19} inverse={false} type="info" title="提示" message="关闭反转色，使用正常背景色" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineState" onclick={() => (visible13 = false)}>手动关闭</Button>
	</div>
</div>
