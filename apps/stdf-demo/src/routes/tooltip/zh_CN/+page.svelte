<!-- Tooltip Demo -->
<script lang="ts">
	import { Tooltip, Button, Icon, Slider } from 'stdf';
	import type { TooltipProps } from 'stdf/types';

	// 圆角配置
	const radiusOptions: TooltipProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2);
	let currentRadius: TooltipProps['radius'] = $derived(radiusOptions[radiusIndex]);

	// 状态配置
	const stateOptions: TooltipProps['state'][] = ['black', 'theme', 'success', 'warning', 'error', 'info'];
	const stateLabels = ['黑色', '主题', '成功', '警告', '错误', '信息'];
	let stateIndex = $state(0);
	let currentState: TooltipProps['state'] = $derived(stateOptions[stateIndex]);

	// 手动控制
	let manualVisible = $state(false);

	// 延迟
	let delayValue = $state(0);
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
	<div class="mx-4 mt-2 text-sm opacity-60">点击触发元素显示/隐藏提示</div>
	<div class="flex justify-around p-4">
		<Tooltip content="这是一条提示信息">
			<Button size="sm">点击显示</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">不同状态颜色</div>
	<div class="px-4 py-2">
		<Slider
			value={stateIndex}
			minRange={0}
			maxRange={5}
			step={1}
			showSteps
			stepLabels={stateLabels}
			onchange={(v) => (stateIndex = v)}
		/>
	</div>
	<div class="flex justify-center p-4">
		<Tooltip content="不同状态的提示" state={currentState}>
			<Button size="sm" state={currentState === 'black' ? 'theme' : currentState}>{stateLabels[stateIndex]}</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">所有状态预览</div>
	<div class="flex flex-wrap justify-around gap-4 p-4">
		<Tooltip content="黑色主题" state="black">
			<Button size="sm">黑色</Button>
		</Tooltip>
		<Tooltip content="主题色" state="theme">
			<Button size="sm" state="theme">主题</Button>
		</Tooltip>
		<Tooltip content="成功提示" state="success">
			<Button size="sm" state="success">成功</Button>
		</Tooltip>
		<Tooltip content="警告提示" state="warning">
			<Button size="sm" state="warning">警告</Button>
		</Tooltip>
		<Tooltip content="错误提示" state="error">
			<Button size="sm" state="error">错误</Button>
		</Tooltip>
		<Tooltip content="信息提示" state="info">
			<Button size="sm" state="info">信息</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">不同圆角</div>
	<div class="px-4 py-2">
		<Slider
			value={radiusIndex}
			minRange={0}
			maxRange={7}
			step={1}
			showSteps
			stepLabels={radiusLabels}
			onchange={(v) => (radiusIndex = v)}
		/>
	</div>
	<div class="flex justify-center p-4">
		<Tooltip content="调整圆角风格" radius={currentRadius}>
			<Button size="sm">{radiusLabels[radiusIndex]}</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">隐藏箭头</div>
	<div class="flex justify-around p-4">
		<Tooltip content="无箭头提示" arrow={false}>
			<Button size="sm">无箭头</Button>
		</Tooltip>
		<Tooltip content="有箭头提示">
			<Button size="sm">有箭头</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">延迟显示</div>
	<div class="mx-4 mt-2 text-sm opacity-60">设置显示延迟：{delayValue}ms</div>
	<div class="px-4 py-2">
		<Slider value={delayValue} minRange={0} maxRange={1000} step={100} onchange={(v) => (delayValue = v)} />
	</div>
	<div class="flex justify-center p-4">
		<Tooltip content="延迟显示的提示" delay={delayValue}>
			<Button size="sm">延迟 {delayValue}ms</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">手动控制</div>
	<div class="flex justify-around p-4">
		<Tooltip content="手动控制显示" bind:visible={manualVisible}>
			<Button size="sm">受控元素</Button>
		</Tooltip>
		<Button size="sm" fill="line" onclick={() => (manualVisible = !manualVisible)}>
			{manualVisible ? '隐藏' : '显示'}
		</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">禁用状态</div>
	<div class="flex justify-around p-4">
		<Tooltip content="不会显示" disabled>
			<Button size="sm" disabled>禁用状态</Button>
		</Tooltip>
		<Tooltip content="正常显示">
			<Button size="sm">正常状态</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">自定义内容</div>
	<div class="flex justify-center p-4">
		<Tooltip maxWidth={300}>
			{#snippet contentSnippet()}
				<div class="flex items-center gap-2">
					<Icon name="ri-information-line" size={16} />
					<span>支持自定义复杂内容</span>
				</div>
			{/snippet}
			<Button size="sm">自定义内容</Button>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">搭配图标</div>
	<div class="flex justify-around p-4">
		<Tooltip content="个人设置">
			<Icon name="ri-settings-3-line" size={24} />
		</Tooltip>
		<Tooltip content="帮助中心" state="info">
			<Icon name="ri-question-line" size={24} />
		</Tooltip>
		<Tooltip content="消息通知" state="theme">
			<Icon name="ri-notification-3-line" size={24} />
		</Tooltip>
		<Tooltip content="危险操作" state="error">
			<Icon name="ri-delete-bin-line" size={24} />
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">不同位置预览</div>
	<div class="mx-4 mt-2 text-sm opacity-60">分别展示四个方向</div>
	<div class="flex justify-around p-8">
		<Tooltip content="上方" position="top">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">上</div>
		</Tooltip>
		<Tooltip content="下方" position="bottom">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">下</div>
		</Tooltip>
		<Tooltip content="左侧" position="left">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">左</div>
		</Tooltip>
		<Tooltip content="右侧" position="right">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">右</div>
		</Tooltip>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">长文本内容</div>
	<div class="flex justify-center p-4">
		<Tooltip content="这是一段很长的提示文本内容，用于展示 Tooltip 在处理长文本时的自动换行效果。最大宽度默认为 200px，可以通过 maxWidth 属性调整。" maxWidth={250}>
			<Button size="sm">长文本提示</Button>
		</Tooltip>
	</div>
</div>
