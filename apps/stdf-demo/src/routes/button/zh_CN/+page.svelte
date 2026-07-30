<!-- Button Demo -->
<script lang="ts">
	import { Button, Icon, Toast, Loading, Slider } from 'stdf';
	import type { ButtonProps } from 'stdf/types';

	let visible = $state(false);

	// 圆角配置
	const radiusOptions: ButtonProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2); // 默认 sm
	let currentRadius: ButtonProps['radius'] = $derived(radiusOptions[radiusIndex]);
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<div class="p-4 font-bold">fill 与 state 结合</div>
		<Button>填充主题</Button>
		<Button state="success">填充成功</Button>
		<Button state="warning">填充警告</Button>
		<Button state="error">填充错误</Button>
		<Button state="info">填充信息</Button>
		<Button fill="line">无色线性</Button>
		<Button fill="lineLight">浅色线性</Button>
		<Button fill="lineState">线性主题</Button>
		<Button fill="lineState" state="success">线性成功</Button>
		<Button fill="lineState" state="warning">线性警告</Button>
		<Button fill="lineState" state="error">线性错误</Button>
		<Button fill="lineState" state="info">线性信息</Button>
		<Button fill="text">无色文本</Button>
		<Button fill="textState">文本主题</Button>
		<Button fill="textState" state="success">文本成功</Button>
		<Button fill="textState" state="warning">文本警告</Button>
		<Button fill="textState" state="error">文本错误</Button>
		<Button fill="textState" state="info">文本信息</Button>
		<Button fill="colorLight">浅填灰色</Button>
		<Button fill="colorLight" state="theme">浅填主题</Button>
		<Button fill="colorLight" state="success">浅填成功</Button>
		<Button fill="colorLight" state="warning">浅填警告</Button>
		<Button fill="colorLight" state="error">浅填错误</Button>
		<Button fill="colorLight" state="info">浅填信息</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同圆角风格</div>
		<div class="px-4 pb-4">
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
		<Button radius={currentRadius}>默认填充</Button>
		<Button radius={currentRadius} fill="lineState">状态色线性</Button>
		<Button radius={currentRadius} fill="colorLight">浅色填充</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同边框风格</div>
		<Button fill="lineState">实线</Button>
		<Button fill="lineState" border="dashed">虚线</Button>
		<Button fill="lineState" border="dotted">点线</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同大小</div>
		<Button size="full" radius="none">通栏且无圆角</Button>
		<Button>默认</Button>
		<Button size="md">中号</Button>
		<Button size="sm">小号</Button>
		<Button size="auto">AUTO</Button>
		<Button size="auto">
			<div class="px-1">
				<Icon name="ri-plane-fill" size={20} />
			</div>
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">不同高度</div>
		<Button heightOut="0">外部高度为 0</Button>
		<Button heightIn="0">内部高度为 0</Button>
	</div>
	<div>
		<div class="p-4 font-bold">固定大小</div>
		<div class="flex items-center justify-around">
			<Button customSize customWidth={40} customHeight={40} radius="full">宽</Button>
			<Button customSize customWidth={40} customHeight={40} radius="xl">高</Button>
			<Button customSize customWidth={40} customHeight={40}>一</Button>
			<Button customSize customWidth={40} customHeight={40} radius="none">致</Button>
			<Button fill="lineState" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} />
			</Button>
			<Button radius="full" fill="lineState" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} />
			</Button>
			<Button radius="full" border="dashed" fill="lineState" customSize customWidth={40} customHeight={40}>
				<Icon name="ri-plane-fill" size={20} />
			</Button>
			<Button radius="full" customSize customWidth={24} customHeight={24} heightIn="0">
				<Icon name="ri-plane-fill" size={12} />
			</Button>
		</div>
	</div>
	<div>
		<div class="p-4 font-bold">禁用</div>
		<Button disabled>禁用</Button>
		<Button fill="lineState" disabled>禁用</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带图标</div>
		<Button icon={{ name: 'ri-share-forward-2-fill', size: 18 }}>投掷二向箔</Button>
		<Button fill="lineState" icon={{ name: 'ri-mic-off-fill', size: 16 }}>启动面壁计划</Button>
		<Button icon={{ name: 'ri-share-forward-2-fill', size: 18 }} iconPosition="right">投掷二向箔</Button>
		<Button fill="lineState" icon={{ name: 'ri-mic-off-fill', size: 16 }} iconPosition="right">启动面壁计划</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带加载（默认禁用）</div>
		<Button loading={{ inverse: true, height: '6', width: '6' }}>加载中</Button>
		<Button loading={{ inverse: true, height: '6', width: '6', type: '1_28' }}>加载中</Button>
		<Button loading={{ inverse: true, height: '6', width: '6' }} disabledLoading={false}>加载中</Button>
	</div>
	<div>
		<div class="p-4 font-bold">带图标（通过 Snippet 传入）</div>
		<Button>
			<Icon name="ri-share-forward-2-fill" size={18} />
			投掷二向箔
		</Button>
		<Button fill="lineState">
			<Icon name="ri-mic-off-fill" size={16} />
			启动面壁计划
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">加载（通过 Snippet 传入）</div>
		<Button>
			<Loading inverse height="6" width="6" />
		</Button>
		<Button>
			<Loading inverse width="16" height="6" type="1_17" />
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">关爱版</div>
		<Button love>关爱版按钮</Button>
		<Button love fill="lineState">
			<Icon name="ri-hand-heart-line" size={22} />
			关爱版按钮
		</Button>
	</div>
	<div>
		<div class="p-4 font-bold">自定义</div>
		<Button injClass="stdf-demo-button-fill">纯色填充</Button>
		<Button injClass="stdf-demo-gradient-primary !text-white">渐变填充</Button>
		<Button fill="line" injClass="stdf-demo-button-line">线性</Button>
		<Button injClass="shadow-md shadow-black/30 dark:shadow-white/30">阴影</Button>
		<Button radius="full" injClass="shadow-lg shadow-primary/40 dark:shadow-dark/40">颜色阴影</Button>
	</div>
</div>
<Toast bind:visible message="点击了按钮！" />
