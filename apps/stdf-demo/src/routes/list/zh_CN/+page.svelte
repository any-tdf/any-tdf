<script lang="ts">
	import { List, Button, Icon, Toast, Avatar, Tab, dialog, toast } from 'stdf';
	import type { ListTransition, SwipeActionProps, TabLabelProps } from 'stdf/types';

	// 英雄数据
	interface HeroItem extends Record<string, unknown> {
		id: number;
		name: string;
		desc: string;
		avatar: string;
	}

	const heroList: HeroItem[] = [
		{ id: 1, name: '莉娜', desc: '一套技能带你回家', avatar: '/assets/images/dota_火女.png' },
		{ id: 2, name: '水人', desc: '打不死的小强', avatar: '/assets/images/dota_水人.png' },
		{ id: 3, name: '斯温', desc: '红了就是爹', avatar: '/assets/images/dota_斯温.png' },
		{ id: 4, name: '火枪', desc: '站得远打得疼', avatar: '/assets/images/dota_火枪.png' }
	];

	// 消息列表数据
	interface MessageItem extends Record<string, unknown> {
		id: number;
		title: string;
		content: string;
		time: string;
		icon: string;
		unread?: boolean;
	}

	let messageList = $state<MessageItem[]>([
		{ id: 1, title: '系统通知', content: '您的订单已发货，预计明天送达', time: '10:30', icon: 'ri-notification-3-line', unread: true },
		{ id: 2, title: '活动推送', content: '双十一大促即将开始，点击查看专属优惠', time: '昨天', icon: 'ri-gift-line', unread: true },
		{ id: 3, title: '账户提醒', content: '您的会员即将到期，续费享 8 折', time: '周一', icon: 'ri-money-cny-circle-line', unread: true },
		{ id: 4, title: '物流更新', content: '您的包裹正在派送中', time: '周日', icon: 'ri-truck-line', unread: true }
	]);

	// 消息滑动操作
	const messageSwipeActions: SwipeActionProps[] = [
		{ icon: 'ri-check-double-line', text: '已读', bgColor: 'info' },
		{ icon: 'ri-delete-bin-line', text: '删除', bgColor: 'error' }
	];

	const handleMessageSwipeAction = (actionIndex: number, action: SwipeActionProps, item: MessageItem, itemIndex: number) => {
		if (actionIndex === 0) {
			messageList = messageList.map((m) => (m.id === item.id ? { ...m, unread: false } : m));
			showToast('已标为已读');
		} else if (actionIndex === 1) {
			messageList = messageList.filter((m) => m.id !== item.id);
			showToast('已删除');
		}
	};

	// 订单数据
	interface OrderItem extends Record<string, unknown> {
		id: number;
		orderNo: string;
		product: string;
		price: number;
		status: string;
		statusColor: string;
	}

	const orderList: OrderItem[] = [
		{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 9999, status: '待付款', statusColor: 'text-warning' },
		{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 1899, status: '已发货', statusColor: 'text-primary' },
		{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 8999, status: '已完成', statusColor: 'text-success' }
	];

	// 基础列表数据
	interface ListItem extends Record<string, unknown> {
		id: number;
		title: string;
		description: string;
	}

	let basicData: ListItem[] = $state([
		{ id: 1, title: '列表项 1', description: '这是列表项的描述文字' },
		{ id: 2, title: '列表项 2', description: '这是列表项的描述文字' },
		{ id: 3, title: '列表项 3', description: '这是列表项的描述文字' }
	]);

	// 动画数据
	let animationData: ListItem[] = $state([]);

	const animationBatchSize = 4;

	const animationTabLabels: TabLabelProps[] = [
		{ text: '右滑入' },
		{ text: '上滑入' },
		{ text: '淡入缩放' },
		{ text: '交错滑入' }
	];

	const animationTransitions: ListTransition[] = ['slideRight', 'slideUp', 'fadeScale', 'stagger'];
	let animationActive = $state(0);

	const delayTabLabels: TabLabelProps[] = [{ text: '50ms' }, { text: '100ms' }, { text: '300ms' }];
	const delayValues = [50, 100, 300];
	let delayActive = $state(1);

	const loadAnimationData = () => {
		animationData = [];
		setTimeout(() => {
			animationData = Array.from({ length: animationBatchSize }, (_, i) => ({
				id: i + 1,
				title: `动画项 ${i + 1}`,
				description: '带动画效果的列表项'
			}));
		}, 100);
	};

	const loadMoreAnimationData = () => {
		const startIndex = animationData.length;
		const nextItems = Array.from({ length: animationBatchSize }, (_, i) => ({
			id: startIndex + i + 1,
			title: `动画项 ${startIndex + i + 1}`,
			description: '带动画效果的列表项'
		}));
		animationData = [...animationData, ...nextItems];
	};

	const removeSomeAnimationData = () => {
		if (animationData.length === 0) return;
		animationData = animationData.slice(0, Math.max(0, animationData.length - 1));
	};

	const handleAnimationTabChange = (index: number) => {
		animationActive = index;
		loadAnimationData();
	};

	loadAnimationData();

	// 滑动操作
	let swipeData: ListItem[] = $state([
		{ id: 1, title: '可滑动项 1', description: '左滑显示操作按钮' },
		{ id: 2, title: '可滑动项 2', description: '左滑显示操作按钮' },
		{ id: 3, title: '可滑动项 3', description: '左滑显示操作按钮' }
	]);

	const swipeActions: SwipeActionProps[] = [
		{ icon: 'ri-edit-line', text: '编辑', bgColor: 'primary' },
		{ icon: 'ri-share-forward-line', text: '分享', bgColor: 'success' },
		{ icon: 'ri-delete-bin-line', text: '删除', bgColor: 'error' }
	];

	const handleSwipeAction = (actionIndex: number, action: SwipeActionProps, item: ListItem, itemIndex: number) => {
		if (actionIndex === 0) {
			showToast('点击了编辑');
		} else if (actionIndex === 1) {
			showToast('点击了分享');
		} else if (actionIndex === 2) {
			showToast('点击了删除');
		}
	};

	// 批量选择
	let batchData: ListItem[] = $state([
		{ id: 1, title: '选择项 1', description: '可批量选择' },
		{ id: 2, title: '选择项 2', description: '可批量选择' },
		{ id: 3, title: '选择项 3', description: '可批量选择' },
		{ id: 4, title: '选择项 4', description: '可批量选择' }
	]);
	let batchMode = $state(false);
	let batchSelected: (string | number)[] = $state([]);

	// 批量删除处理
	const handleBatchDelete = async (selected: (string | number)[]) => {
		const confirmed = await dialog.confirm(`确定要删除选中的 ${selected.length} 项吗？`, '删除确认');
		if (confirmed) {
			batchData = batchData.filter((item) => !selected.includes(item.id));
			batchSelected = [];
			toast.success('删除成功');
		}
	};

	// Toast
	let toastVisible = $state(false);
	let toastMessage = $state('');

	const showToast = (msg: string) => {
		toastMessage = msg;
		toastVisible = true;
	};

</script>

<div class="pb-4 pt-1">
	<!-- 英雄列表 -->
	<div class="mx-4 mt-8 text-lg font-bold">英雄列表</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">点击反馈 + 头像 + 分割线</div>
	<List data={heroList} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" onclickItem={(item) => showToast(`点击了 ${item.name}`)}>
		{#snippet itemChild(item)}
			<div class="flex items-center gap-3">
				<Avatar size="sm" radius="full" image={item.avatar} />
				<div class="flex-1">
					<div class="font-medium">{item.name}</div>
					<div class="text-sm text-gray-500">{item.desc}</div>
				</div>
			</div>
		{/snippet}
	</List>

	<!-- 消息列表 - 左滑操作 -->
	<div class="mx-4 mt-8 text-lg font-bold">消息列表</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">左滑显示操作按钮（默认只在第一项显示提示）</div>
	<List data={messageList} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" swipeActions={messageSwipeActions} onswipeAction={handleMessageSwipeAction}>
		{#snippet itemChild(item)}
			<div class="flex items-start gap-3">
				<div class="relative shrink-0">
					<Icon name={item.icon} size={24} />
					{#if item.unread}
						<div class="bg-error absolute -right-1 -top-1 h-2 w-2 rounded-full"></div>
					{/if}
				</div>
				<div class="min-w-0 flex-1">
					<div class="font-medium" class:font-bold={item.unread}>{item.title}</div>
					<div class="truncate text-sm text-gray-500">{item.content}</div>
					<div class="mt-1 text-xs text-gray-400">{item.time}</div>
				</div>
			</div>
		{/snippet}
	</List>

	<!-- 批量选择 -->
	<div class="mx-4 mt-8 text-lg font-bold">批量选择</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">点击编辑进入批量选择模式</div>
	<List
		data={batchData}
		bind:batchMode
		bind:batchSelected
		batchSelectable
		itemPx="4"
		itemPy="3"
		itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
		batchActions={[
			{ text: '收藏', status: 'warning', onclick: (selected) => toast.success(`已收藏 ${selected.length} 项`) },
			{ text: '删除', status: 'error', onclick: handleBatchDelete }
		]}
	>
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- 订单列表 -->
	<div class="mx-4 mt-8 text-lg font-bold">订单列表</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">卡片式样式参数 + 滑动操作</div>
	<List
		data={orderList}
		mx="4"
		gap="3"
		itemRadius="xl"
		itemPx="4"
		itemPy="3"
		divider={false}
		itemInjClass="bg-bg-surface dark:bg-bg-surface-dark shadow-sm"
		swipeActions={[
			{ icon: 'ri-file-list-line', text: '详情', bgColor: 'info' },
			{ icon: 'ri-delete-bin-line', text: '删除', bgColor: 'error' }
		]}
	>
		{#snippet itemChild(item)}
			<div>
				<div class="mb-2 flex items-center justify-between">
					<span class="text-sm text-gray-500">订单号： {item.orderNo}</span>
					<span class="text-sm {item.statusColor}">{item.status}</span>
				</div>
				<div class="font-medium">{item.product}</div>
				<div class="text-primary dark:text-dark mt-1 text-lg font-bold">¥ {item.price.toLocaleString()}</div>
			</div>
		{/snippet}
	</List>

	<!-- 不同圆角和阴影 -->
	<div class="mx-4 mt-8 text-lg font-bold">不同圆角和阴影</div>
	<List data={basicData} mx="4" gap="3" itemRadius="2xl" itemPx="4" itemPy="3" divider={false} itemInjClass="bg-bg-surface dark:bg-bg-surface-dark shadow-md">
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- 过渡动画 -->
	<div class="mx-4 mt-8 text-lg font-bold">过渡动画</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">使用 Tab 切换 4 种动画</div>
	<div class="mx-4 mb-3 flex gap-2">
		<Button size="sm" onclick={loadAnimationData}>重新加载</Button>
		<Button size="sm" onclick={loadMoreAnimationData}>加载更多</Button>
		<Button size="sm" onclick={removeSomeAnimationData}>删除一条</Button>
	</div>
	<div class="mx-4 mb-2">
		<Tab labels={animationTabLabels} active={animationActive} onclickTab={handleAnimationTabChange} />
	</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">transitionDelay</div>
	<div class="mx-4 mb-4">
		<Tab labels={delayTabLabels} active={delayActive} onclickTab={(i) => (delayActive = i)} />
	</div>
	{#key animationActive}
		<List
			data={animationData}
			mx="4"
			gap="2"
			itemRadius="lg"
			itemPx="4"
			itemPy="3"
			divider={false}
			itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
			transition={animationTransitions[animationActive]}
			transitionDelay={delayValues[delayActive]}
		>
			{#snippet itemChild(item)}
				<div>
					<div class="font-medium">{item.title}</div>
					<div class="text-sm text-gray-500">{item.description}</div>
				</div>
			{/snippet}
		</List>
	{/key}

	<!-- 滑动操作 -->
	<div class="mx-4 mt-8 text-lg font-bold">滑动操作</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">左滑显示操作按钮（所有项都显示提示）</div>
	<List data={swipeData} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" {swipeActions} swipeHint="all" onswipeAction={handleSwipeAction}>
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- 带箭头指示器 -->
	<div class="mx-4 mt-8 text-lg font-bold">带箭头指示器</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">设置 arrow 显示右侧箭头</div>
	<List data={basicData} arrow itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" onclickItem={(item) => showToast(`点击了 ${item.title}`)}>
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<div class="h-32"></div>
</div>

<Toast bind:visible={toastVisible} message={toastMessage} />
