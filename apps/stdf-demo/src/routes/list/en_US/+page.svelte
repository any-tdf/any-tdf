<script lang="ts">
	import { List, Button, Icon, Toast, Avatar, Tab, dialog, toast } from 'stdf';
	import { en_US } from 'stdf/lang';
	import type { ListTransition, SwipeActionProps, TabLabelProps } from 'stdf/types';
	import { setContext } from 'svelte';

	setContext('STDF_lang', en_US);

	// Hero data
	interface HeroItem extends Record<string, unknown> {
		id: number;
		name: string;
		desc: string;
		avatar: string;
	}

	const heroList: HeroItem[] = [
		{ id: 1, name: 'Lina', desc: 'One combo sends you home', avatar: '/assets/images/dota_火女.png' },
		{ id: 2, name: 'Morphling', desc: 'You can\'t kill what flows', avatar: '/assets/images/dota_水人.png' },
		{ id: 3, name: 'Sven', desc: 'When red, I\'m your daddy', avatar: '/assets/images/dota_斯温.png' },
		{ id: 4, name: 'Sniper', desc: 'Standing far, hitting hard', avatar: '/assets/images/dota_火枪.png' }
	];

	// Message data
	interface MessageItem extends Record<string, unknown> {
		id: number;
		title: string;
		content: string;
		time: string;
		icon: string;
		unread?: boolean;
	}

	let messageList = $state<MessageItem[]>([
		{ id: 1, title: 'System', content: 'Your order has been shipped, arriving tomorrow', time: '10:30', icon: 'ri-notification-3-line', unread: true },
		{ id: 2, title: 'Promotion', content: 'Black Friday sale is coming, check exclusive offers', time: 'Yesterday', icon: 'ri-gift-line', unread: true },
		{ id: 3, title: 'Account', content: 'Your membership is expiring, renew for 20% off', time: 'Monday', icon: 'ri-money-cny-circle-line', unread: true },
		{ id: 4, title: 'Delivery', content: 'Your package is out for delivery', time: 'Sunday', icon: 'ri-truck-line', unread: true }
	]);

	// Message swipe actions
	const messageSwipeActions: SwipeActionProps[] = [
		{ icon: 'ri-check-double-line', text: 'Read', bgColor: 'info' },
		{ icon: 'ri-delete-bin-line', text: 'Delete', bgColor: 'error' }
	];

	const handleMessageSwipeAction = (actionIndex: number, action: SwipeActionProps, item: MessageItem, itemIndex: number) => {
		if (actionIndex === 0) {
			messageList = messageList.map((m) => (m.id === item.id ? { ...m, unread: false } : m));
			showToast('Marked as read');
		} else if (actionIndex === 1) {
			messageList = messageList.filter((m) => m.id !== item.id);
			showToast('Deleted');
		}
	};

	// Order data
	interface OrderItem extends Record<string, unknown> {
		id: number;
		orderNo: string;
		product: string;
		price: number;
		status: string;
		statusColor: string;
	}

	const orderList: OrderItem[] = [
		{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 1199, status: 'Pending', statusColor: 'text-warning' },
		{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 249, status: 'Shipped', statusColor: 'text-primary' },
		{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 1099, status: 'Completed', statusColor: 'text-success' }
	];

	// Basic list data
	interface ListItem extends Record<string, unknown> {
		id: number;
		title: string;
		description: string;
	}

	let basicData: ListItem[] = $state([
		{ id: 1, title: 'List Item 1', description: 'This is the description text' },
		{ id: 2, title: 'List Item 2', description: 'This is the description text' },
		{ id: 3, title: 'List Item 3', description: 'This is the description text' }
	]);

	// Animation data
	let animationData: ListItem[] = $state([]);

	const animationBatchSize = 4;

	const animationTabLabels: TabLabelProps[] = [
		{ text: 'Slide Right' },
		{ text: 'Slide Up' },
		{ text: 'Fade Scale' },
		{ text: 'Stagger' }
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
				title: `Animated Item ${i + 1}`,
				description: 'List item with animation'
			}));
		}, 100);
	};

	const loadMoreAnimationData = () => {
		const startIndex = animationData.length;
		const nextItems = Array.from({ length: animationBatchSize }, (_, i) => ({
			id: startIndex + i + 1,
			title: `Animated Item ${startIndex + i + 1}`,
			description: 'List item with animation'
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

	// Swipe actions
	let swipeData: ListItem[] = $state([
		{ id: 1, title: 'Swipeable Item 1', description: 'Swipe left to show actions' },
		{ id: 2, title: 'Swipeable Item 2', description: 'Swipe left to show actions' },
		{ id: 3, title: 'Swipeable Item 3', description: 'Swipe left to show actions' }
	]);

	const swipeActions: SwipeActionProps[] = [
		{ icon: 'ri-edit-line', text: 'Edit', bgColor: 'primary' },
		{ icon: 'ri-share-forward-line', text: 'Share', bgColor: 'success' },
		{ icon: 'ri-delete-bin-line', text: 'Delete', bgColor: 'error' }
	];

	const handleSwipeAction = (actionIndex: number, action: SwipeActionProps, item: ListItem, itemIndex: number) => {
		if (actionIndex === 0) {
			showToast('Clicked Edit');
		} else if (actionIndex === 1) {
			showToast('Clicked Share');
		} else if (actionIndex === 2) {
			showToast('Clicked Delete');
		}
	};

	// Batch selection
	let batchData: ListItem[] = $state([
		{ id: 1, title: 'Select Item 1', description: 'Batch selectable' },
		{ id: 2, title: 'Select Item 2', description: 'Batch selectable' },
		{ id: 3, title: 'Select Item 3', description: 'Batch selectable' },
		{ id: 4, title: 'Select Item 4', description: 'Batch selectable' }
	]);
	let batchMode = $state(false);
	let batchSelected: (string | number)[] = $state([]);

	// Batch delete handler
	const handleBatchDelete = async (selected: (string | number)[]) => {
		const confirmed = await dialog.confirm(`Are you sure to delete ${selected.length} items?`, 'Delete Confirmation');
		if (confirmed) {
			batchData = batchData.filter((item) => !selected.includes(item.id));
			batchSelected = [];
			toast.success('Deleted successfully');
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
	<!-- Hero list -->
	<div class="mx-4 mt-8 text-lg font-bold">Hero List</div>
	<div class="mt-2 text-xs text-gray-500 mx-4 mb-2">Click feedback + Avatar + Divider</div>
	<List data={heroList} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" onclickItem={(item) => showToast(`Clicked ${item.name}`)}>
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

	<!-- Message list - Swipe action -->
	<div class="mx-4 mt-8 text-lg font-bold">Messages</div>
	<div class="mt-2 text-xs text-gray-500 mx-4 mb-2">Swipe left to show actions (hint on first item by default)</div>
	<List data={messageList} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" swipeActions={messageSwipeActions} onswipeAction={handleMessageSwipeAction}>
		{#snippet itemChild(item)}
			<div class="flex items-start gap-3">
				<div class="relative shrink-0">
					<Icon name={item.icon} size={24} />
					{#if item.unread}
						<div class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-error"></div>
					{/if}
				</div>
				<div class="flex-1 min-w-0">
					<div class="font-medium" class:font-bold={item.unread}>{item.title}</div>
					<div class="text-sm text-gray-500 truncate">{item.content}</div>
					<div class="text-xs text-gray-400 mt-1">{item.time}</div>
				</div>
			</div>
		{/snippet}
	</List>

	<!-- Batch selection -->
	<div class="mx-4 mt-8 text-lg font-bold">Batch Selection</div>
	<div class="mt-2 text-xs text-gray-500 mx-4 mb-2">Click Edit to enter batch selection mode</div>
	<List
		data={batchData}
		bind:batchMode
		bind:batchSelected
		batchSelectable
		itemPx="4"
		itemPy="3"
		itemInjClass="bg-bg-surface dark:bg-bg-surface-dark"
		batchActions={[
			{ text: 'Favorite', status: 'warning', onclick: (selected) => toast.success(`${selected.length} items favorited`) },
			{ text: 'Delete', status: 'error', onclick: handleBatchDelete }
		]}
	>
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- Order list -->
	<div class="mx-4 mt-8 text-lg font-bold">Orders</div>
	<div class="mt-2 text-xs text-gray-500 mx-4 mb-2">Card-like styles via props + Swipe actions</div>
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
	>
		{#snippet itemChild(item)}
			<div>
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm text-gray-500">Order: {item.orderNo}</span>
					<span class="text-sm {item.statusColor}">{item.status}</span>
				</div>
				<div class="font-medium">{item.product}</div>
				<div class="mt-1 text-lg font-bold text-primary dark:text-dark">${item.price.toLocaleString()}</div>
			</div>
		{/snippet}
	</List>

	<!-- Different radius and shadow -->
	<div class="mx-4 mt-8 text-lg font-bold">Radius & Shadow</div>
	<List data={basicData} mx="4" gap="3" itemRadius="2xl" itemPx="4" itemPy="3" divider={false} itemInjClass="bg-bg-surface dark:bg-bg-surface-dark shadow-md">
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- Transition animation -->
	<div class="mx-4 mt-8 text-lg font-bold">Transition Animation</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">Use Tab to switch 4 animations</div>
	<div class="mx-4 mb-3 flex gap-2">
		<Button size="sm" onclick={loadAnimationData}>Reload</Button>
		<Button size="sm" onclick={loadMoreAnimationData}>Load More</Button>
		<Button size="sm" onclick={removeSomeAnimationData}>Remove One</Button>
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

	<!-- Swipe actions -->
	<div class="mx-4 mt-8 text-lg font-bold">Swipe Actions</div>
	<div class="mt-2 text-xs text-gray-500 mx-4 mb-2">Swipe left to show actions (hint on all items)</div>
	<List data={swipeData} itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" swipeActions={swipeActions} swipeHint="all" onswipeAction={handleSwipeAction}>
		{#snippet itemChild(item)}
			<div>
				<div class="font-medium">{item.title}</div>
				<div class="text-sm text-gray-500">{item.description}</div>
			</div>
		{/snippet}
	</List>

	<!-- Arrow indicator -->
	<div class="mx-4 mt-8 text-lg font-bold">Arrow Indicator</div>
	<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">Set arrow to show right arrow</div>
	<List data={basicData} arrow itemPx="4" itemPy="3" itemInjClass="bg-bg-surface dark:bg-bg-surface-dark" onclickItem={(item) => showToast(`Clicked ${item.title}`)}>
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
