<script lang="ts">
	import { Card, Icon, Button, Slider, Toast, Steps, ActionPopover } from 'stdf';
	import type { StepsItemProps, ActionProps, LargeAreaRadius } from 'stdf/types';

	// 圆角选项
	const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	let radiusIndex = $state(4);
	let currentRadius = $derived<LargeAreaRadius>(radiusValues[radiusIndex]);

	// Toast 状态
	let toastVisible = $state(false);
	let toastMessage = $state('');
	const showToast = (msg: string) => {
		toastMessage = msg;
		toastVisible = true;
	};

	// 物流步骤
	const logisticsSteps: StepsItemProps[] = [
		{ step: { title: '快件已到达【北京朝阳区营业点】', desc: '2024-01-15 14:30' } },
		{ step: { title: '快件已从【上海转运中心】发出', desc: '2024-01-14 22:15' } },
		{ step: { title: '商家已发货', desc: '2024-01-14 18:00' } }
	];

	// 用户信息 操作气泡
	let userActionVisible = $state(false);
	let userActionTrigger = $state<HTMLElement | null>(null);
	const userActions: ActionProps[] = [
		{ content: '编辑', icon: { name: 'ri-edit-line', size: 18 } },
		{ content: '分享', icon: { name: 'ri-share-forward-line', size: 18 } },
		{ content: '删除', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
	];
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
	<Card>
		<div class="text-center">这是一个基础卡片</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">背景类型</div>
	<Card bg="surface">
		<div class="text-sm">表面背景 bg="surface"（默认）</div>
	</Card>
	<Card bg="gray" shadow="none">
		<div class="text-sm">灰色透明背景 bg="gray"</div>
	</Card>
	<Card bg="theme" shadow="none">
		<div class="text-sm">主题色透明背景 bg="theme"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">不同圆角</div>
	<Card radius={currentRadius}>
		<div class="text-sm text-center">radius="{currentRadius}"</div>
	</Card>
	<div class="px-4">
		<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">不同阴影</div>
	<Card shadow="none">
		<div class="text-sm">无阴影 shadow="none"</div>
	</Card>
	<Card shadow="xs">
		<div class="text-sm">超小阴影 shadow="xs"</div>
	</Card>
	<Card shadow="sm">
		<div class="text-sm">小阴影 shadow="sm"（默认）</div>
	</Card>
	<Card shadow="md">
		<div class="text-sm">中等阴影 shadow="md"</div>
	</Card>
	<Card shadow="lg">
		<div class="text-sm">大阴影 shadow="lg"</div>
	</Card>
	<Card shadow="xl">
		<div class="text-sm">超大阴影 shadow="xl"</div>
	</Card>
	<Card shadow="2xl">
		<div class="text-sm">特大阴影 shadow="2xl"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">不同内边距</div>
	<Card p="0">
		<div class="bg-primary/10 p-2 text-sm dark:bg-dark/10">p="0"</div>
	</Card>
	<Card p="2">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="2"</div>
	</Card>
	<Card p="4">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="4"（默认）</div>
	</Card>
	<Card p="8">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="8"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">分别设置内边距</div>
	<Card px="8" py="2">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">px="8" py="2"</div>
	</Card>
	<Card px="2" py="8">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">px="2" py="8"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">边框样式</div>
	<Card border="solid" shadow="none">
		<div class="text-sm">实线边框 border="solid"</div>
	</Card>
	<Card border="dashed" shadow="none">
		<div class="text-sm">虚线边框 border="dashed"</div>
	</Card>
	<Card border="dotted" shadow="none">
		<div class="text-sm">点线边框 border="dotted"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">边框粗细</div>
	<Card border="solid" borderWidth="1" shadow="none">
		<div class="text-sm">边框粗细 1</div>
	</Card>
	<Card border="solid" borderWidth="2" shadow="none">
		<div class="text-sm">边框粗细 2</div>
	</Card>
	<Card border="solid" borderWidth="4" shadow="none">
		<div class="text-sm">边框粗细 4</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">带头部区域</div>
	<Card>
		{#snippet header()}
			<div class="font-bold">卡片标题</div>
		{/snippet}
		<div class="text-sm">这是卡片的内容区域</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">带底部区域</div>
	<Card>
		<div class="text-sm">这是卡片的内容区域</div>
		{#snippet footer()}
			<div class="flex justify-end gap-2">
				<Button size="sm" fill="text">取消</Button>
				<Button size="sm">确认</Button>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">完整卡片</div>
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="font-bold">用户信息</div>
				<button
					type="button"
					bind:this={userActionTrigger}
					class="cursor-pointer bg-transparent p-0 border-0"
					onclick={() => (userActionVisible = !userActionVisible)}
					aria-label="更多操作"
				>
					<Icon name="ri-more-line" size={20} />
				</button>
				<ActionPopover
					bind:visible={userActionVisible}
					triggerRef={userActionTrigger}
					actions={userActions}
					inlineAlign="right"
					align="left"
				/>
			</div>
		{/snippet}
		<div class="flex items-center gap-4">
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
				<Icon name="ri-user-fill" size={24} />
			</div>
			<div>
				<div class="font-bold">张三</div>
				<div class="text-sm text-gray-500">前端开发工程师</div>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex justify-between text-sm text-gray-500">
				<span>已工作 3 年</span>
				<span>北京</span>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">无分隔线</div>
	<Card headerLine={false} footerLine={false}>
		{#snippet header()}
			<div class="font-bold">卡片标题</div>
		{/snippet}
		<div class="text-sm">这是卡片的内容区域，头部和底部没有分隔线</div>
		{#snippet footer()}
			<div class="text-sm text-gray-500">底部信息</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">可点击卡片</div>
	<Card onclick={() => showToast('点击了卡片')}>
		<div class="text-sm">这是一个可点击的卡片，点击试试</div>
	</Card>
	<Toast bind:visible={toastVisible} message={toastMessage} />

	<div class="mx-4 mt-8 text-lg font-bold">自定义样式</div>
	<Card injClass="!bg-primary/10 dark:!bg-dark/10">
		<div class="text-sm">自定义背景颜色</div>
	</Card>
	<Card injClass="ring-2 ring-primary dark:ring-dark">
		<div class="text-sm">自定义环形边框</div>
	</Card>
	<Card headerClass="!bg-primary/10 dark:!bg-dark/10">
		{#snippet header()}
			<div class="font-bold">自定义头部样式</div>
		{/snippet}
		<div class="text-sm">内容区域</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">复杂内容</div>
	<Card>
		{#snippet header()}
			<div class="flex items-center gap-2">
				<Icon name="ri-article-line" size={20} />
				<span class="font-bold">文章标题</span>
			</div>
		{/snippet}
		<div class="space-y-2">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				这是一段文章摘要，可以包含多行文本。Card 组件提供了灵活的布局选项，允许您根据需要自定义头部、内容和底部区域。
			</p>
			<div class="flex gap-2">
				<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">标签一</span>
				<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">标签二</span>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex items-center justify-between text-sm text-gray-500">
				<span>2024-01-01</span>
				<div class="flex gap-4">
					<span class="flex items-center gap-1">
						<Icon name="ri-eye-line" size={16} />
						1234
					</span>
					<span class="flex items-center gap-1">
						<Icon name="ri-heart-line" size={16} />
						56
					</span>
				</div>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">业务场景</div>

	<!-- 商品卡片 -->
	<Card p="0" onclick={() => showToast('查看商品详情')}>
		<div class="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
			<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
		</div>
		<div class="p-3">
			<div class="line-clamp-2 text-sm">Apple AirPods Pro 2 无线蓝牙耳机 主动降噪 MagSafe 充电盒</div>
			<div class="mt-2 flex items-baseline gap-1">
				<span class="text-lg font-bold text-red-500">¥1899</span>
				<span class="text-xs text-gray-400 line-through">¥1999</span>
			</div>
			<div class="mt-2 flex items-center justify-between text-xs text-gray-500">
				<span>已售 1.2 万</span>
				<span class="flex items-center gap-0.5">
					<Icon name="ri-star-fill" size={12} state="theme" />
					4.9
				</span>
			</div>
		</div>
	</Card>

	<!-- 订单卡片 -->
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Icon name="ri-store-2-line" size={18} />
					<span class="font-medium">Apple 官方旗舰店</span>
				</div>
				<span class="text-sm text-primary dark:text-dark">待发货</span>
			</div>
		{/snippet}
		<div class="flex gap-3">
			<div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
				<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
			</div>
			<div class="flex flex-1 flex-col justify-between">
				<div class="line-clamp-2 text-sm">Apple AirPods Pro 2 无线蓝牙耳机</div>
				<div class="flex items-center justify-between">
					<span class="text-xs text-gray-500">白色 × 1</span>
					<span class="font-medium">¥1899</span>
				</div>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex justify-end gap-2">
				<Button size="sm" fill="lineState">联系客服</Button>
				<Button size="sm">提醒发货</Button>
			</div>
		{/snippet}
	</Card>

	<!-- 消息通知卡片 -->
	<Card onclick={() => showToast('查看消息详情')}>
		<div class="flex gap-3">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
				<Icon name="ri-notification-3-line" size={20} state="theme" />
			</div>
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<span class="font-medium">系统通知</span>
					<span class="text-xs text-gray-400">10 分钟前</span>
				</div>
				<p class="mt-1 line-clamp-2 text-sm text-gray-500">
					您的订单已发货，快递单号：SF1234567890，请注意查收。
				</p>
			</div>
		</div>
	</Card>

	<!-- 优惠券卡片 -->
	<Card p="0" border="dashed" shadow="none">
		<div class="flex">
			<div class="flex w-24 shrink-0 flex-col items-center justify-center bg-primary/10 p-3 dark:bg-dark/10">
				<div class="flex items-baseline">
					<span class="text-xs text-primary dark:text-dark">¥</span>
					<span class="text-3xl font-bold text-primary dark:text-dark">50</span>
				</div>
				<div class="text-xs text-gray-500">满 200 可用</div>
			</div>
			<div class="flex flex-1 flex-col justify-between p-3">
				<div>
					<div class="font-medium">新人专享券</div>
					<div class="mt-1 text-xs text-gray-500">全品类通用，部分商品除外</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-xs text-gray-400">2024.12.31 到期</span>
					<Button size="sm">立即使用</Button>
				</div>
			</div>
		</div>
	</Card>

	<!-- 物流卡片 -->
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Icon name="ri-truck-line" size={18} state="theme" />
					<span class="font-medium text-primary dark:text-dark">运输中</span>
				</div>
				<span class="text-xs text-gray-500">顺丰快递</span>
			</div>
		{/snippet}
		<Steps steps={logisticsSteps} current={1} vertical />
	</Card>

	<!-- 银行卡片 -->
	<Card injClass="!bg-linear-to-br !from-primary !to-primary/70 dark:!from-dark dark:!to-dark/70 !text-white">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Icon name="ri-bank-card-line" size={24} />
				<span class="font-medium">招商银行</span>
			</div>
			<span class="text-sm opacity-80">储蓄卡</span>
		</div>
		<div class="mt-6 text-2xl tracking-widest">**** **** **** 8888</div>
		<div class="mt-4 flex items-center justify-between text-sm opacity-80">
			<span>张三</span>
			<span>有效期 12/28</span>
		</div>
	</Card>

	<div class="h-8"></div>
</div>
