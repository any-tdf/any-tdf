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
	{ id: 1, name: 'Lina', desc: 'One combo sends you home', avatar: '/assets/images/dota_火女.png' },
	{ id: 2, name: 'Morphling', desc: "You can't kill what flows", avatar: '/assets/images/dota_水人.png' },
	{ id: 3, name: 'Sven', desc: "When red, I'm your daddy", avatar: '/assets/images/dota_斯温.png' },
	{ id: 4, name: 'Sniper', desc: 'Standing far, hitting hard', avatar: '/assets/images/dota_火枪.png' }
];

const orderList: OrderItem[] = [
	{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 1199, status: 'Pending', statusColor: 'text-warning' },
	{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 249, status: 'Shipped', statusColor: 'text-primary' },
	{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 1099, status: 'Completed', statusColor: 'text-success' }
];

const animationBatchSize = 4;
const animationTabLabels: TabLabelProps[] = [{ text: 'Slide Right' }, { text: 'Slide Up' }, { text: 'Fade Scale' }, { text: 'Stagger' }];
const animationTransitions: ListTransition[] = ['slideRight', 'slideUp', 'fadeScale', 'stagger'];
const delayTabLabels: TabLabelProps[] = [{ text: '50ms' }, { text: '100ms' }, { text: '300ms' }];
const delayValues = [50, 100, 300];

const swipeActions: SwipeActionProps[] = [
	{ icon: 'ri-edit-line', text: 'Edit', bgColor: 'primary' },
	{ icon: 'ri-share-forward-line', text: 'Share', bgColor: 'success' },
	{ icon: 'ri-delete-bin-line', text: 'Delete', bgColor: 'error' }
];

const messageSwipeActions: SwipeActionProps[] = [
	{ icon: 'ri-check-double-line', text: 'Read', bgColor: 'info' },
	{ icon: 'ri-delete-bin-line', text: 'Delete', bgColor: 'error' }
];

function ListEn() {
	const [messageList, setMessageList] = useState<MessageItem[]>([
		{
			id: 1,
			title: 'System',
			content: 'Your order has been shipped, arriving tomorrow',
			time: '10:30',
			icon: 'ri-notification-3-line',
			unread: true
		},
		{
			id: 2,
			title: 'Promotion',
			content: 'Black Friday sale is coming, check exclusive offers',
			time: 'Yesterday',
			icon: 'ri-gift-line',
			unread: true
		},
		{
			id: 3,
			title: 'Account',
			content: 'Your membership is expiring, renew for 20% off',
			time: 'Monday',
			icon: 'ri-money-cny-circle-line',
			unread: true
		},
		{ id: 4, title: 'Delivery', content: 'Your package is out for delivery', time: 'Sunday', icon: 'ri-truck-line', unread: true }
	]);

	const [basicData] = useState<ListItem[]>([
		{ id: 1, title: 'List Item 1', description: 'This is the description text' },
		{ id: 2, title: 'List Item 2', description: 'This is the description text' },
		{ id: 3, title: 'List Item 3', description: 'This is the description text' }
	]);

	const [animationData, setAnimationData] = useState<ListItem[]>([]);
	const [animationActive, setAnimationActive] = useState(0);
	const [delayActive, setDelayActive] = useState(1);

	const [swipeData] = useState<ListItem[]>([
		{ id: 1, title: 'Swipeable Item 1', description: 'Swipe left to show actions' },
		{ id: 2, title: 'Swipeable Item 2', description: 'Swipe left to show actions' },
		{ id: 3, title: 'Swipeable Item 3', description: 'Swipe left to show actions' }
	]);

	const [batchData, setBatchData] = useState<ListItem[]>([
		{ id: 1, title: 'Select Item 1', description: 'Batch selectable' },
		{ id: 2, title: 'Select Item 2', description: 'Batch selectable' },
		{ id: 3, title: 'Select Item 3', description: 'Batch selectable' },
		{ id: 4, title: 'Select Item 4', description: 'Batch selectable' }
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
			showToast('Marked as read');
			return;
		}
		if (actionIndex === 1) {
			setMessageList((prev) => prev.filter((message) => message.id !== item.id));
			showToast('Deleted');
		}
	};

	const handleSwipeAction = (actionIndex: number) => {
		if (actionIndex === 0) {
			showToast('Clicked Edit');
			return;
		}
		if (actionIndex === 1) {
			showToast('Clicked Share');
			return;
		}
		if (actionIndex === 2) {
			showToast('Clicked Delete');
		}
	};

	const handleBatchDelete = async (selected: (string | number)[]) => {
		const confirmed = await dialog.confirm(`Are you sure to delete ${selected.length} items?`, 'Delete Confirmation');
		if (confirmed) {
			setBatchData((prev) => prev.filter((item) => !selected.includes(item.id)));
			setBatchSelected([]);
			setBatchMode(false);
			toast.success('Deleted successfully');
		}
	};

	const loadAnimationData = () => {
		setAnimationData([]);
		setTimeout(() => {
			setAnimationData(
				Array.from({ length: animationBatchSize }, (_, i) => ({
					id: i + 1,
					title: `Animated Item ${i + 1}`,
					description: 'List item with animation'
				}))
			);
		}, 100);
	};

	const loadMoreAnimationData = () => {
		setAnimationData((prev) => {
			const startIndex = prev.length;
			const nextItems = Array.from({ length: animationBatchSize }, (_, i) => ({
				id: startIndex + i + 1,
				title: `Animated Item ${startIndex + i + 1}`,
				description: 'List item with animation'
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
			<div className="mx-4 mt-8 text-lg font-bold">Hero List</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Click feedback + Avatar + Divider</div>
			<List
				data={heroList}
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				onClickItem={(item) => showToast(`Clicked ${item.name}`)}
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

			<div className="mx-4 mt-8 text-lg font-bold">Messages</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Swipe left to show actions (hint on first item by default)</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">Batch Selection</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Click Edit to enter batch selection mode</div>
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
					{ text: 'Favorite', status: 'warning', onClick: (selected) => toast.success(`${selected.length} items favorited`) },
					{ text: 'Delete', status: 'error', onClick: handleBatchDelete }
				]}
				itemChild={(item) => (
					<div>
						<div className="font-medium">{item.title}</div>
						<div className="text-sm text-gray-500">{item.description}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">Orders</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Card-like styles via props + Swipe actions</div>
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
					{ icon: 'ri-file-list-line', text: 'Details', bgColor: 'info' },
					{ icon: 'ri-delete-bin-line', text: 'Delete', bgColor: 'error' }
				]}
				itemChild={(item) => (
					<div>
						<div className="mb-2 flex items-center justify-between">
							<span className="text-sm text-gray-500">Order: {item.orderNo}</span>
							<span className={`text-sm ${item.statusColor}`}>{item.status}</span>
						</div>
						<div className="font-medium">{item.product}</div>
						<div className="mt-1 text-lg font-bold text-primary dark:text-dark">${item.price.toLocaleString()}</div>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">Radius & Shadow</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">Transition Animation</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Use Tab to switch 4 animations</div>
			<div className="mx-4 mb-3 flex gap-2">
				<Button size="sm" onClick={loadAnimationData}>
					Reload
				</Button>
				<Button size="sm" onClick={loadMoreAnimationData}>
					Load More
				</Button>
				<Button size="sm" onClick={removeSomeAnimationData}>
					Remove One
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

			<div className="mx-4 mt-8 text-lg font-bold">Swipe Actions</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Swipe left to show actions (hint on all items)</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">Arrow Indicator</div>
			<div className="mx-4 mb-2 mt-2 text-xs text-gray-500">Set arrow to show right arrow</div>
			<List
				data={basicData}
				arrow
				itemPx="4"
				itemPy="3"
				itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
				onClickItem={(item) => showToast(`Clicked ${item.title}`)}
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

export default ListEn;
