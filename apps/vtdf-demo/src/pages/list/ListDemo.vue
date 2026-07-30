<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Avatar, Button, Icon, List, Tab, Toast, toast } from 'vtdf';
import type { BatchActionProps, ListTransition, SwipeActionProps, TabLabelProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type ListRecord = Record<string, unknown>;

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const messages = {
	zh_CN: {
		heroTitle: '英雄列表',
		heroDesc: '点击反馈 + 头像 + 分割线',
		messageTitle: '消息列表',
		messageDesc: '左滑显示操作按钮（默认只在第一项显示提示）',
		batchTitle: '批量选择',
		batchDesc: '点击编辑进入批量选择模式',
		orderTitle: '订单列表',
		orderDesc: '卡片式样式参数 + 滑动操作',
		radiusTitle: '不同圆角和阴影',
		transitionTitle: '过渡动画',
		transitionDesc: '使用 Tab 切换 4 种动画',
		transitionDelay: 'transitionDelay',
		reload: '重新加载',
		loadMore: '加载更多',
		removeOne: '移除一项',
		edit: '编辑',
		share: '分享',
		delete: '删除',
		read: '已读',
		details: '详情',
		favorite: '收藏',
		clicked: '点击了 ',
		markedRead: '已标为已读',
		deleted: '已删除',
		favoriteSuccess: '已收藏 ',
		deleteSuccess: '删除成功',
		selectedUnit: ' 项',
		orderNo: '订单号：',
		pricePrefix: '¥ ',
		animationItem: '动画项 ',
		animationDesc: '带动画效果的列表项'
	},
	en_US: {
		heroTitle: 'Hero List',
		heroDesc: 'Click feedback + Avatar + Divider',
		messageTitle: 'Messages',
		messageDesc: 'Swipe left to show actions (hint on first item by default)',
		batchTitle: 'Batch Selection',
		batchDesc: 'Click Edit to enter batch selection mode',
		orderTitle: 'Orders',
		orderDesc: 'Card-like styles via props + Swipe actions',
		radiusTitle: 'Radius & Shadow',
		transitionTitle: 'Transition Animation',
		transitionDesc: 'Use Tab to switch 4 animations',
		transitionDelay: 'transitionDelay',
		reload: 'Reload',
		loadMore: 'Load More',
		removeOne: 'Remove One',
		edit: 'Edit',
		share: 'Share',
		delete: 'Delete',
		read: 'Read',
		details: 'Details',
		favorite: 'Favorite',
		clicked: 'Clicked ',
		markedRead: 'Marked as read',
		deleted: 'Deleted',
		favoriteSuccess: 'Favorited ',
		deleteSuccess: 'Deleted successfully',
		selectedUnit: ' items',
		orderNo: 'Order: ',
		pricePrefix: '$',
		animationItem: 'Animated Item ',
		animationDesc: 'List item with animation'
	}
};

const text = computed(() => messages[props.locale]);
const isZh = computed(() => props.locale === 'zh_CN');
const toastVisible = ref(false);
const toastMessage = ref('');
const animationActive = ref(0);
const delayActive = ref(1);
const animationData = ref<ListRecord[]>([]);
const batchMode = ref(false);
const batchSelected = ref<(string | number)[]>([]);

const heroList = computed<ListRecord[]>(() =>
	isZh.value
		? [
				{ id: 1, name: '莉娜', desc: '一套技能带你回家', avatar: '/assets/images/dota_火女.png' },
				{ id: 2, name: '水人', desc: '打不死的小强', avatar: '/assets/images/dota_水人.png' },
				{ id: 3, name: '斯温', desc: '红了就是爹', avatar: '/assets/images/dota_斯温.png' },
				{ id: 4, name: '火枪', desc: '站得远打得疼', avatar: '/assets/images/dota_火枪.png' }
			]
		: [
				{ id: 1, name: 'Lina', desc: 'One combo sends you home', avatar: '/assets/images/dota_火女.png' },
				{ id: 2, name: 'Morphling', desc: "You can't kill what flows", avatar: '/assets/images/dota_水人.png' },
				{ id: 3, name: 'Sven', desc: "When red, I'm your daddy", avatar: '/assets/images/dota_斯温.png' },
				{ id: 4, name: 'Sniper', desc: 'Standing far, hitting hard', avatar: '/assets/images/dota_火枪.png' }
			]
);

const messageList = ref<ListRecord[]>([]);
const batchData = ref<ListRecord[]>([]);
const basicData = computed<ListRecord[]>(() =>
	Array.from({ length: 3 }, (_, index) => ({
		id: index + 1,
		title: isZh.value ? `列表项 ${index + 1}` : `List Item ${index + 1}`,
		description: isZh.value ? '这是列表项的描述文字' : 'This is the description text'
	}))
);
const orderList = computed<ListRecord[]>(() =>
	isZh.value
		? [
				{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 9999, status: '待付款', statusColor: 'text-warning' },
				{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 1899, status: '已发货', statusColor: 'text-primary' },
				{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 8999, status: '已完成', statusColor: 'text-success' }
			]
		: [
				{ id: 1, orderNo: '202401010001', product: 'iPhone 15 Pro Max', price: 1199, status: 'Pending', statusColor: 'text-warning' },
				{ id: 2, orderNo: '202401010002', product: 'AirPods Pro 2', price: 249, status: 'Shipped', statusColor: 'text-primary' },
				{ id: 3, orderNo: '202401010003', product: 'MacBook Air M3', price: 1099, status: 'Completed', statusColor: 'text-success' }
			]
);

const animationTransitions: ListTransition[] = ['slideRight', 'slideUp', 'fadeScale', 'stagger'];
const animationTabLabels = computed<TabLabelProps[]>(() =>
	(isZh.value ? ['右滑入', '上滑入', '淡入缩放', '交错滑入'] : ['Slide Right', 'Slide Up', 'Fade Scale', 'Stagger']).map((label) => ({
		text: label
	}))
);
const delayTabLabels: TabLabelProps[] = [{ text: '50ms' }, { text: '100ms' }, { text: '300ms' }];
const delayValues = [50, 100, 300];
const animationBatchSize = 4;

const messageSwipeActions = computed<SwipeActionProps[]>(() => [
	{ icon: 'ri-check-double-line', text: text.value.read, bgColor: 'info' },
	{ icon: 'ri-delete-bin-line', text: text.value.delete, bgColor: 'error' }
]);
const swipeActions = computed<SwipeActionProps[]>(() => [
	{ icon: 'ri-edit-line', text: text.value.edit, bgColor: 'primary' },
	{ icon: 'ri-share-forward-line', text: text.value.share, bgColor: 'success' },
	{ icon: 'ri-delete-bin-line', text: text.value.delete, bgColor: 'error' }
]);
const batchActions = computed<BatchActionProps[]>(() => [
	{ text: text.value.favorite, status: 'warning' },
	{ text: text.value.delete, status: 'error' }
]);

const field = (item: ListRecord, key: string) => String(item[key]);
const boolField = (item: ListRecord, key: string) => Boolean(item[key]);
const numberField = (item: ListRecord, key: string) => Number(item[key]);

const showToast = (message: string) => {
	toastMessage.value = message;
	toastVisible.value = true;
};

const resetLocalizedData = () => {
	messageList.value = isZh.value
		? [
				{ id: 1, title: '系统通知', content: '您的订单已发货，预计明天送达', time: '10:30', icon: 'ri-notification-3-line', unread: true },
				{ id: 2, title: '活动推送', content: '双十一大促即将开始，点击查看专属优惠', time: '昨天', icon: 'ri-gift-line', unread: true },
				{
					id: 3,
					title: '账户提醒',
					content: '您的会员即将到期，续费享 8 折',
					time: '周一',
					icon: 'ri-money-cny-circle-line',
					unread: true
				},
				{ id: 4, title: '物流更新', content: '您的包裹正在派送中', time: '周日', icon: 'ri-truck-line', unread: true }
			]
		: [
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
			];
	batchData.value = Array.from({ length: 4 }, (_, index) => ({
		id: index + 1,
		title: isZh.value ? `选择项 ${index + 1}` : `Select Item ${index + 1}`,
		description: isZh.value ? '可批量选择' : 'Batch selectable'
	}));
	batchSelected.value = [];
	batchMode.value = false;
};

const handleMessageSwipeAction = (actionIndex: number, _action: SwipeActionProps, item: ListRecord) => {
	if (actionIndex === 0) {
		messageList.value = messageList.value.map((message) => (message.id === item.id ? { ...message, unread: false } : message));
		showToast(text.value.markedRead);
		return;
	}
	messageList.value = messageList.value.filter((message) => message.id !== item.id);
	showToast(text.value.deleted);
};

const handleSwipeAction = (actionIndex: number) => {
	const labels = [text.value.edit, text.value.share, text.value.delete];
	showToast(`${text.value.clicked}${labels[actionIndex]}`);
};

const handleBatchDelete = (selected: (string | number)[]) => {
	batchData.value = batchData.value.filter((item) => !selected.includes(Number(item.id)));
	batchSelected.value = [];
	batchMode.value = false;
	toast.success(text.value.deleteSuccess);
};

const handleBatchAction = (actionIndex: number, _action: BatchActionProps, selected: (string | number)[]) => {
	if (actionIndex === 0) {
		toast.success(`${text.value.favoriteSuccess}${selected.length}${text.value.selectedUnit}`);
		return;
	}
	handleBatchDelete(selected);
};

const loadAnimationData = () => {
	animationData.value = [];
	setTimeout(() => {
		animationData.value = Array.from({ length: animationBatchSize }, (_, index) => ({
			id: index + 1,
			title: `${text.value.animationItem}${index + 1}`,
			description: text.value.animationDesc
		}));
	}, 100);
};

const loadMoreAnimationData = () => {
	const startIndex = animationData.value.length;
	animationData.value = [
		...animationData.value,
		...Array.from({ length: animationBatchSize }, (_, index) => ({
			id: startIndex + index + 1,
			title: `${text.value.animationItem}${startIndex + index + 1}`,
			description: text.value.animationDesc
		}))
	];
};

const removeOneAnimationData = () => {
	animationData.value = animationData.value.slice(0, Math.max(0, animationData.value.length - 1));
};

const handleAnimationTabChange = (index: number) => {
	animationActive.value = index;
	loadAnimationData();
};

onMounted(() => {
	resetLocalizedData();
	loadAnimationData();
});
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">{{ text.heroTitle }}</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.heroDesc }}</div>
		<List
			:data="heroList"
			item-px="4"
			item-py="3"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark"
			@click-item="(item) => showToast(`${text.clicked}${field(item, 'name')}`)"
		>
			<template #item="{ item }">
				<div class="flex items-center gap-3">
					<Avatar size="sm" radius="full" :image="field(item, 'avatar')" />
					<div class="flex-1">
						<div class="font-medium">{{ field(item, 'name') }}</div>
						<div class="text-sm text-gray-500">{{ field(item, 'desc') }}</div>
					</div>
				</div>
			</template>
		</List>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.messageTitle }}</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.messageDesc }}</div>
		<List
			:data="messageList"
			item-px="4"
			item-py="3"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark"
			:swipe-actions="messageSwipeActions"
			@swipe-action="handleMessageSwipeAction"
		>
			<template #item="{ item }">
				<div class="flex items-start gap-3">
					<div class="relative shrink-0">
						<Icon :name="field(item, 'icon')" :size="24" />
						<div v-if="boolField(item, 'unread')" class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-error" />
					</div>
					<div class="min-w-0 flex-1">
						<div :class="['font-medium', boolField(item, 'unread') ? 'font-bold' : '']">{{ field(item, 'title') }}</div>
						<div class="truncate text-sm text-gray-500">{{ field(item, 'content') }}</div>
						<div class="mt-1 text-xs text-gray-400">{{ field(item, 'time') }}</div>
					</div>
				</div>
			</template>
		</List>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.batchTitle }}</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.batchDesc }}</div>
		<List
			v-model:batch-mode="batchMode"
			v-model:batch-selected="batchSelected"
			:data="batchData"
			batch-selectable
			item-px="4"
			item-py="3"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark"
			:batch-actions="batchActions"
			@batch-action="handleBatchAction"
		>
			<template #item="{ item }">
				<div>
					<div class="font-medium">{{ field(item, 'title') }}</div>
					<div class="text-sm text-gray-500">{{ field(item, 'description') }}</div>
				</div>
			</template>
		</List>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.orderTitle }}</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.orderDesc }}</div>
		<List
			:data="orderList"
			mx="4"
			gap="3"
			item-radius="xl"
			item-px="4"
			item-py="3"
			:divider="false"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark shadow-sm"
			:swipe-actions="[
				{ icon: 'ri-file-list-line', text: text.details, bgColor: 'info' },
				{ icon: 'ri-delete-bin-line', text: text.delete, bgColor: 'error' }
			]"
			@swipe-action="handleSwipeAction"
		>
			<template #item="{ item }">
				<div>
					<div class="mb-2 flex items-center justify-between">
						<span class="text-sm text-gray-500">{{ text.orderNo }}{{ field(item, 'orderNo') }}</span>
						<span :class="['text-sm', field(item, 'statusColor')]">{{ field(item, 'status') }}</span>
					</div>
					<div class="font-medium">{{ field(item, 'product') }}</div>
					<div class="text-primary dark:text-dark mt-1 text-lg font-bold">
						{{ text.pricePrefix }}{{ numberField(item, 'price').toLocaleString() }}
					</div>
				</div>
			</template>
		</List>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.radiusTitle }}</div>
		<List
			:data="basicData"
			mx="4"
			gap="3"
			item-radius="2xl"
			item-px="4"
			item-py="3"
			:divider="false"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark shadow-md"
		>
			<template #item="{ item }">
				<div>
					<div class="font-medium">{{ field(item, 'title') }}</div>
					<div class="text-sm text-gray-500">{{ field(item, 'description') }}</div>
				</div>
			</template>
		</List>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.transitionTitle }}</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.transitionDesc }}</div>
		<div class="mx-4 mb-3 flex flex-wrap gap-2">
			<Button size="sm" @click="loadAnimationData">{{ text.reload }}</Button>
			<Button size="sm" fill="line" @click="loadMoreAnimationData">{{ text.loadMore }}</Button>
			<Button size="sm" fill="line" @click="removeOneAnimationData">{{ text.removeOne }}</Button>
		</div>
		<div class="mx-4 mb-2">
			<Tab :labels="animationTabLabels" :active="animationActive" @click-tab="handleAnimationTabChange" />
		</div>
		<div class="mx-4 mb-2 mt-2 text-xs text-gray-500">{{ text.transitionDelay }}</div>
		<div class="mx-4 mb-4">
			<Tab :labels="delayTabLabels" :active="delayActive" @click-tab="(index) => (delayActive = index)" />
		</div>
		<List
			:key="`animation-${animationActive}`"
			:data="animationData"
			mx="4"
			gap="2"
			item-radius="lg"
			item-px="4"
			item-py="3"
			:divider="false"
			item-inj-class="bg-bg-surface dark:bg-bg-surface-dark shadow-sm"
			:transition="animationTransitions[animationActive]"
			:transition-delay="delayValues[delayActive]"
		>
			<template #item="{ item }">
				<div>
					<div class="font-medium">{{ field(item, 'title') }}</div>
					<div class="text-sm text-gray-500">{{ field(item, 'description') }}</div>
				</div>
			</template>
		</List>

		<Toast v-model:visible="toastVisible" :message="toastMessage" />
	</div>
</template>
