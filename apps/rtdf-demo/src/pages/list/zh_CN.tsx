import { useEffect, useState } from 'react';
import { Avatar, Button, Icon, List, Tab, Toast, dialog, toast } from 'rtdf/components';
import type { ListTransition, SwipeActionProps, TabLabelProps } from 'rtdf/types';

type HeroItem = {
	id: number;
	name: string;
	desc: string;
	avatar: string;
};

type MessageItem = {
	id: number;
	title: string;
	content: string;
	time: string;
	icon: string;
	unread?: boolean;
};

type OrderItem = {
	id: number;
	orderNo: string;
	product: string;
	price: number;
	status: string;
	statusColor: string;
};

type ListItem = {
	id: number;
	title: string;
	description: string;
};

const heroList: HeroItem[] = [
	{ id: 1, name: '莉娜', desc: '一套技能带你回家', avatar: '/assets/images/dota_火女.png' },
	{ id: 2, name: '水人', desc: '打不死的小强', avatar: '/assets/images/dota_水人.png' },
	{ id: 3, name: '斯温', desc: '红了就是爹', avatar: '/assets/images/dota_斯温.png' },
	{ id: 4, name: '火枪', desc: '站得远打得疼', avatar: '/assets/images/dota_火枪.png' }
];

const orderList: OrderItem[] = [
	{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 9999, status: '待付款', statusColor: 'text-warning' },
	{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 1899, status: '已发货', statusColor: 'text-primary' },
	{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 8999, status: '已完成', statusColor: 'text-success' }
];

const animationBatchSize = 4;
const animationTabLabels: TabLabelProps[] = [{ text: '右滑入' }, { text: '上滑入' }, { text: '淡入缩放' }, { text: '交错滑入' }];
const animationTransitions: ListTransition[] = ['slideRight', 'slideUp', 'fadeScale', 'stagger'];
const delayTabLabels: TabLabelProps[] = [{ text: '50ms' }, { text: '100ms' }, { text: '300ms' }];
const delayValues = [50, 100, 300];

const swipeActions: SwipeActionProps[] = [
	{ icon: 'ri-edit-line', text: '编辑', bgColor: 'primary' },
	{ icon: 'ri-share-forward-line', text: '分享', bgColor: 'success' },
	{ icon: 'ri-delete-bin-line', text: '删除', bgColor: 'error' }
];

const messageSwipeActions: SwipeActionProps[] = [
	{ icon: 'ri-check-double-line', text: '已读', bgColor: 'info' },
	{ icon: 'ri-delete-bin-line', text: '删除', bgColor: 'error' }
];

function ListZh() {
	const [messageList, setMessageList] = useState<MessageItem[]>([
		{ id: 1, title: '系统通知', content: '您的订单已发货，预计明天送达', time: '10:30', icon: 'ri-notification-3-line', unread: true },
		{ id: 2, title: '活动推送', content: '双十一大促即将开始，点击查看专属优惠', time: '昨天', icon: 'ri-gift-line', unread: true },
		{ id: 3, title: '账户提醒', content: '您的会员即将到期，续费享 8 折', time: '周一', icon: 'ri-money-cny-circle-line', unread: true },
		{ id: 4, title: '物流更新', content: '您的包裹正在派送中', time: '周日', icon: 'ri-truck-line', unread: true }
	]);

	const [basicData] = useState<ListItem[]>([
		{ id: 1, title: '列表项 1', description: '这是列表项的描述文字' },
		{ id: 2, title: '列表项 2', description: '这是列表项的描述文字' },
		{ id: 3, title: '列表项 3', description: '这是列表项的描述文字' }
	]);

	const [animationData, setAnimationData] = useState<ListItem[]>([]);
	const [animationActive, setAnimationActive] = useState(0);
	const [delayActive, setDelayActive] = useState(1);

	const [swipeData] = useState<ListItem[]>([
		{ id: 1, title: '可滑动项 1', description: '左滑显示操作按钮' },
		{ id: 2, title: '可滑动项 2', description: '左滑显示操作按钮' },
		{ id: 3, title: '可滑动项 3', description: '左滑显示操作按钮' }
	]);

	const [batchData, setBatchData] = useState<ListItem[]>([
		{ id: 1, title: '选择项 1', description: '可批量选择' },
		{ id: 2, title: '选择项 2', description: '可批量选择' },
		{ id: 3, title: '选择项 3', description: '可批量选择' },
		{ id: 4, title: '选择项 4', description: '可批量选择' }
	]);
	const [batchMode, setBatchMode] = useState(false);
	const [batchSelected, setBatchSelected] = useState<(string | number)[]>([]);

	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const showToast = (msg: string) => {
		setToastMessage(msg);
		setToastVisible(true);
	};

	const handleMessageSwipeAction = (actionIndex: number, _action: SwipeActionProps, item: MessageItem) => {
		if (actionIndex === 0) {
			setMessageList((prev) => prev.map((message) => (message.id === item.id ? { ...message, unread: false } : message)));
			showToast('已标为已读');
			return;
		}
		if (actionIndex === 1) {
			setMessageList((prev) => prev.filter((message) => message.id !== item.id));
			showToast('已删除');
		}
	};

	const handleSwipeAction = (actionIndex: number) => {
		if (actionIndex === 0) {
			showToast('点击了编辑');
			return;
		}
		if (actionIndex === 1) {
			showToast('点击了分享');
			return;
		}
		if (actionIndex === 2) {
			showToast('点击了删除');
		}
	};

	const handleBatchDelete = async (selected: (string | number)[]) => {
		const confirmed = await dialog.confirm(`确定要删除选中的 ${selected.length} 项吗？`, '删除确认');
		if (confirmed) {
			setBatchData((prev) => prev.filter((item) => !selected.includes(item.id)));
			setBatchSelected([]);
			setBatchMode(false);
			toast.success('删除成功');
		}
	};

	const loadAnimationData = () => {
		setAnimationData([]);
		setTimeout(() => {
			setAnimationData(
				Array.from({ length: animationBatchSize }, (_, i) => ({
					id: i + 1,
					title: `动画项 ${i + 1}`,
					description: '带动画效果的列表项'
				}))
			);
		}, 100);
	};

	const loadMoreAnimationData = () => {
		setAnimationData((prev) => {
			const startIndex = prev.length;
			const nextItems = Array.from({ length: animationBatchSize }, (_, i) => ({
				id: startIndex + i + 1,
				title: `动画项 ${startIndex + i + 1}`,
				description: '带动画效果的列表项'
			}));
			return [...prev, ...nextItems];
		});
	};

	const removeSomeAnimationData = () => {
		setAnimationData((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
	};

	const handleAnimationTabChange = (index: number) => {
		setAnimationActive(index);
		loadAnimationData();
	};

	useEffect(() => {
		loadAnimationData();
	}, []);

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">英雄列表</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">点击反馈 + 头像 + 分割线</div>
			<List
				data={heroList}
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				onClickItem={(item) => showToast(`点击了 ${item.name}`)}
				itemChild={(item) => (
					<div className="flex items-center gap-3">
						<Avatar size="sm" radius="full" image={item.avatar} />
						<div className="flex-1">
							<div className="font-medium">{item.name}</div>
							<div className="text-sm text-gray-500">{item.desc}</div>
						</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">消息列表</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">左滑显示操作按钮（默认只在第一项显示提示）</div>
			<List
				data={messageList}
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				swipeActions={messageSwipeActions}
				onSwipeAction={handleMessageSwipeAction}
				itemChild={(item) => (
					<div className="flex items-start gap-3">
						<div className="relative shrink-0">
							<Icon name={item.icon} size={24} />
							{item.unread ? <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-error"></div> : null}
						</div>
						<div className="min-w-0 flex-1">
							<div className={`font-medium ${item.unread ? 'font-bold' : ''}`}>{item.title}</div>
							<div className="truncate text-sm text-gray-500">{item.content}</div>
							<div className="mt-1 text-xs text-gray-400">{item.time}</div>
						</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">批量选择</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">点击编辑进入批量选择模式</div>
			<List
				data={batchData}
				batchMode={batchMode}
				batchSelected={batchSelected}
				onBatchModeChange={setBatchMode}
				onBatchChange={setBatchSelected}
				batchSelectable
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				batchActions={[
					{ text: '收藏', status: 'warning', onClick: (selected) => toast.success(`已收藏 ${selected.length} 项`) },
					{ text: '删除', status: 'error', onClick: handleBatchDelete }
				]}
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">订单列表</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">卡片式样式参数 + 滑动操作</div>
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
				itemChild={(item) => (
					<div>
						<div className="mb-2 flex items-center justify-between">
							<span className="text-sm text-gray-500">订单号： {item.orderNo}</span>
							<span className={`text-sm ${item.statusColor}`}>{item.status}</span>
						</div>
						<div className="font-medium">{item.product}</div>
						<div className="mt-1 text-lg font-bold text-primary dark:text-dark">¥ {item.price.toLocaleString()}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">不同圆角和阴影</div>
			<List
				data={basicData}
				mx="4"
				gap="3"
				itemRadius="2xl"
				itemPx="4"
				itemPy="3"
				divider={false}
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark shadow-md"
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">过渡动画</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">使用 Tab 切换 4 种动画</div>
			<div className="mx-4 mb-3 flex gap-2">
				<Button size="sm" onClick={loadAnimationData}>
					重新加载
				</Button>
				<Button size="sm" onClick={loadMoreAnimationData}>
					加载更多
				</Button>
				<Button size="sm" onClick={removeSomeAnimationData}>
					删除一条
				</Button>
			</div>
			<div className="mx-4 mb-2">
				<Tab labels={animationTabLabels} active={animationActive} onClickTab={handleAnimationTabChange} />
			</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">transitionDelay</div>
			<div className="mx-4 mb-4">
				<Tab labels={delayTabLabels} active={delayActive} onClickTab={setDelayActive} />
			</div>
			<List
				key={`animation-${animationActive}`}
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
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">滑动操作</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">左滑显示操作按钮（所有项都显示提示）</div>
			<List
				data={swipeData}
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				swipeActions={swipeActions}
				swipeHint="all"
				onSwipeAction={handleSwipeAction}
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">带箭头指示器</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">设置 arrow 显示右侧箭头</div>
			<List
				data={basicData}
				arrow
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				onClickItem={(item) => showToast(`点击了 ${item.title}`)}
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="h-32"></div>

			<Toast visible={toastVisible} message={toastMessage} onClose={() => setToastVisible(false)} />
		</div>
	);
}

export default ListZh;
