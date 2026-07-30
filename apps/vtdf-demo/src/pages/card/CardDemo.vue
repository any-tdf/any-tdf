<script setup lang="ts">
import { computed, ref } from 'vue';
import { ActionPopover, Button, Card, Icon, Slider, Steps, Toast } from 'vtdf/components';
import type { ActionProps, LargeAreaRadius, StepsItemProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const messages = {
	zh_CN: {
		basic: '基础用法',
		basicCard: '这是一个基础卡片',
		background: '背景类型',
		surfaceBg: '表面背景 bg="surface"（默认）',
		grayBg: '灰色透明背景 bg="gray"',
		themeBg: '主题色透明背景 bg="theme"',
		radius: '不同圆角',
		shadow: '不同阴影',
		noShadow: '无阴影 shadow="none"',
		xsShadow: '超小阴影 shadow="xs"',
		smShadow: '小阴影 shadow="sm"（默认）',
		mdShadow: '中等阴影 shadow="md"',
		lgShadow: '大阴影 shadow="lg"',
		xlShadow: '超大阴影 shadow="xl"',
		xxlShadow: '特大阴影 shadow="2xl"',
		padding: '不同内边距',
		padding4: 'p="4"（默认）',
		separatePadding: '分别设置内边距',
		borderStyle: '边框样式',
		solidBorder: '实线边框 border="solid"',
		dashedBorder: '虚线边框 border="dashed"',
		dottedBorder: '点线边框 border="dotted"',
		borderWidth: '边框粗细',
		withHeader: '带头部区域',
		cardTitle: '卡片标题',
		cardContent: '这是卡片的内容区域',
		withFooter: '带底部区域',
		cancel: '取消',
		confirm: '确认',
		complete: '完整卡片',
		userInfo: '用户信息',
		more: '更多操作',
		years: '已工作 3 年',
		city: '北京',
		name: '张三',
		job: '前端开发工程师',
		noLines: '无分隔线',
		footerInfo: '底部信息',
		noLinesContent: '这是卡片的内容区域，头部和底部没有分隔线',
		clickable: '可点击卡片',
		clickMe: '这是一个可点击的卡片，点击试试',
		cardClicked: '点击了卡片',
		customStyle: '自定义样式',
		customBg: '自定义背景颜色',
		customRing: '自定义环形边框',
		customHeader: '自定义头部样式',
		contentArea: '内容区域',
		complex: '复杂内容',
		articleTitle: '文章标题',
		articleSummary: '这是一段文章摘要，可以包含多行文本。Card 组件提供了灵活的布局选项，允许您根据需要自定义头部、内容和底部区域。',
		tagOne: '标签一',
		tagTwo: '标签二',
		business: '业务场景',
		productToast: '查看商品详情',
		productTitle: 'Apple AirPods Pro 2 无线蓝牙耳机 主动降噪 MagSafe 充电盒',
		price: '¥ 1899',
		oldPrice: '¥ 1999',
		sold: '已售 1.2 万',
		store: 'Apple 官方旗舰店',
		pending: '待发货',
		contact: '联系客服',
		remind: '提醒发货',
		orderTitle: 'Apple AirPods Pro 2 无线蓝牙耳机',
		orderSpec: '白色 × 1',
		notificationToast: '查看消息详情',
		systemNotice: '系统通知',
		noticeTime: '10 分钟前',
		noticeText: '您的订单已发货，快递单号： SF1234567890，请注意查收。',
		couponSpend: '满 200 可用',
		couponTitle: '新人专享券',
		couponDesc: '全品类通用，部分商品除外',
		couponExpire: '2024.12.31 到期',
		useNow: '立即使用',
		inTransit: '运输中',
		shipper: '顺丰快递',
		bank: '招商银行',
		cardType: '储蓄卡',
		cardOwner: '张三',
		cardValid: '有效期 12/28',
		edit: '编辑',
		share: '分享',
		delete: '删除',
		logistics1: '快件已到达【北京朝阳区营业点】',
		logistics2: '快件已从【上海转运中心】发出',
		logistics3: '商家已发货'
	},
	en_US: {
		basic: 'Basic Usage',
		basicCard: 'This is a basic card',
		background: 'Background Type',
		surfaceBg: 'Surface background bg="surface" (default)',
		grayBg: 'Gray transparent background bg="gray"',
		themeBg: 'Theme transparent background bg="theme"',
		radius: 'Different Radius',
		shadow: 'Different Shadow',
		noShadow: 'No shadow shadow="none"',
		xsShadow: 'Extra small shadow shadow="xs"',
		smShadow: 'Small shadow shadow="sm" (default)',
		mdShadow: 'Medium shadow shadow="md"',
		lgShadow: 'Large shadow shadow="lg"',
		xlShadow: 'Extra large shadow shadow="xl"',
		xxlShadow: '2xl shadow shadow="2xl"',
		padding: 'Different Padding',
		padding4: 'p="4" (default)',
		separatePadding: 'Separate Padding',
		borderStyle: 'Border Style',
		solidBorder: 'Solid border border="solid"',
		dashedBorder: 'Dashed border border="dashed"',
		dottedBorder: 'Dotted border border="dotted"',
		borderWidth: 'Border Width',
		withHeader: 'With Header',
		cardTitle: 'Card Title',
		cardContent: 'This is the card content area',
		withFooter: 'With Footer',
		cancel: 'Cancel',
		confirm: 'Confirm',
		complete: 'Complete Card',
		userInfo: 'User Info',
		more: 'More actions',
		years: '3 years of experience',
		city: 'New York',
		name: 'John Doe',
		job: 'Frontend Developer',
		noLines: 'Without Divider Lines',
		footerInfo: 'Footer info',
		noLinesContent: 'This is the card content area without header and footer divider lines',
		clickable: 'Clickable Card',
		clickMe: 'Click me',
		cardClicked: 'Card clicked',
		customStyle: 'Custom Style',
		customBg: 'Custom background color',
		customRing: 'Custom ring border',
		customHeader: 'Custom header style',
		contentArea: 'Content area',
		complex: 'Complex Content',
		articleTitle: 'Article Title',
		articleSummary:
			'This is an article summary that can contain multiple lines of text. The Card component provides flexible layout options, allowing you to customize the header, content, and footer areas as needed.',
		tagOne: 'Tag One',
		tagTwo: 'Tag Two',
		business: 'Business Scenarios',
		productToast: 'View product details',
		productTitle: 'Apple AirPods Pro 2 Wireless Earbuds Active Noise Cancelling MagSafe Case',
		price: '$ 229',
		oldPrice: '$ 249',
		sold: '12K+ sold',
		store: 'Apple Official Store',
		pending: 'Pending Shipment',
		contact: 'Contact',
		remind: 'Remind',
		orderTitle: 'Apple AirPods Pro 2 Wireless Earbuds',
		orderSpec: 'White × 1',
		notificationToast: 'View notification details',
		systemNotice: 'System Notification',
		noticeTime: '10 min ago',
		noticeText: 'Your order has been shipped. Tracking number: SF1234567890. Please check it.',
		couponSpend: 'Min. spend $ 200',
		couponTitle: 'New User Coupon',
		couponDesc: 'Valid for all categories, some exclusions apply',
		couponExpire: 'Expires 2024.12.31',
		useNow: 'Use Now',
		inTransit: 'In Transit',
		shipper: 'FedEx',
		bank: 'Chase Bank',
		cardType: 'Debit Card',
		cardOwner: 'John Doe',
		cardValid: 'Valid thru 12/28',
		edit: 'Edit',
		share: 'Share',
		delete: 'Delete',
		logistics1: 'Arrived at [New York Distribution Center]',
		logistics2: 'Departed from [Los Angeles Hub]',
		logistics3: 'Seller shipped your order'
	}
};

const text = computed(() => messages[props.locale]);
const radiusIndex = ref(4);
const toastVisible = ref(false);
const toastMessage = ref('');
const userActionVisible = ref(false);
const userActionTrigger = ref<HTMLButtonElement | null>(null);
const currentRadius = computed(() => radiusValues[radiusIndex.value]);
const logisticsSteps = computed<StepsItemProps[]>(() => [
	{ step: { title: text.value.logistics1, desc: '2024-01-15 14:30' } },
	{ step: { title: text.value.logistics2, desc: '2024-01-14 22:15' } },
	{ step: { title: text.value.logistics3, desc: '2024-01-14 18:00' } }
]);
const userActions = computed<ActionProps[]>(() => [
	{ content: text.value.edit, icon: { name: 'ri-edit-line', size: 18 } },
	{ content: text.value.share, icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: text.value.delete, style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
]);

const showToast = (message: string) => {
	toastMessage.value = message;
	toastVisible.value = true;
};
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">{{ text.basic }}</div>
		<Card>
			<div class="text-center">{{ text.basicCard }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.background }}</div>
		<Card bg="surface">
			<div class="text-sm">{{ text.surfaceBg }}</div>
		</Card>
		<Card bg="gray" shadow="none">
			<div class="text-sm">{{ text.grayBg }}</div>
		</Card>
		<Card bg="theme" shadow="none">
			<div class="text-sm">{{ text.themeBg }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.radius }}</div>
		<Card :radius="currentRadius">
			<div class="text-center text-sm">radius="{{ currentRadius }}"</div>
		</Card>
		<div class="px-4">
			<Slider
				:value="radiusIndex"
				:max-range="7"
				:step="1"
				show-steps
				steps-style="break"
				:step-labels="radiusValues"
				@change="(value) => (radiusIndex = value)"
			/>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.shadow }}</div>
		<Card shadow="none">
			<div class="text-sm">{{ text.noShadow }}</div>
		</Card>
		<Card shadow="xs">
			<div class="text-sm">{{ text.xsShadow }}</div>
		</Card>
		<Card shadow="sm">
			<div class="text-sm">{{ text.smShadow }}</div>
		</Card>
		<Card shadow="md">
			<div class="text-sm">{{ text.mdShadow }}</div>
		</Card>
		<Card shadow="lg">
			<div class="text-sm">{{ text.lgShadow }}</div>
		</Card>
		<Card shadow="xl">
			<div class="text-sm">{{ text.xlShadow }}</div>
		</Card>
		<Card shadow="2xl">
			<div class="text-sm">{{ text.xxlShadow }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.padding }}</div>
		<Card p="0">
			<div class="bg-primary/10 p-2 text-sm dark:bg-dark/10">p="0"</div>
		</Card>
		<Card p="2">
			<div class="bg-primary/10 text-sm dark:bg-dark/10">p="2"</div>
		</Card>
		<Card p="4">
			<div class="bg-primary/10 text-sm dark:bg-dark/10">{{ text.padding4 }}</div>
		</Card>
		<Card p="8">
			<div class="bg-primary/10 text-sm dark:bg-dark/10">p="8"</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.separatePadding }}</div>
		<Card px="8" py="2">
			<div class="bg-primary/10 text-sm dark:bg-dark/10">px="8" py="2"</div>
		</Card>
		<Card px="2" py="8">
			<div class="bg-primary/10 text-sm dark:bg-dark/10">px="2" py="8"</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.borderStyle }}</div>
		<Card border="solid" shadow="none">
			<div class="text-sm">{{ text.solidBorder }}</div>
		</Card>
		<Card border="dashed" shadow="none">
			<div class="text-sm">{{ text.dashedBorder }}</div>
		</Card>
		<Card border="dotted" shadow="none">
			<div class="text-sm">{{ text.dottedBorder }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.borderWidth }}</div>
		<Card border="solid" border-width="1" shadow="none">
			<div class="text-sm">{{ text.borderWidth }} 1</div>
		</Card>
		<Card border="solid" border-width="2" shadow="none">
			<div class="text-sm">{{ text.borderWidth }} 2</div>
		</Card>
		<Card border="solid" border-width="4" shadow="none">
			<div class="text-sm">{{ text.borderWidth }} 4</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.withHeader }}</div>
		<Card>
			<template #header>
				<div class="font-bold">{{ text.cardTitle }}</div>
			</template>
			<div class="text-sm">{{ text.cardContent }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.withFooter }}</div>
		<Card>
			<div class="text-sm">{{ text.cardContent }}</div>
			<template #footer>
				<div class="flex justify-end gap-2">
					<Button size="sm" fill="text">{{ text.cancel }}</Button>
					<Button size="sm">{{ text.confirm }}</Button>
				</div>
			</template>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.complete }}</div>
		<Card>
			<template #header>
				<div class="flex items-center justify-between">
					<div class="font-bold">{{ text.userInfo }}</div>
					<button
						ref="userActionTrigger"
						type="button"
						class="cursor-pointer border-0 bg-transparent p-0"
						:aria-label="text.more"
						@click="userActionVisible = !userActionVisible"
					>
						<Icon name="ri-more-line" :size="20" />
					</button>
					<ActionPopover
						v-model:visible="userActionVisible"
						:trigger-ref="userActionTrigger"
						:actions="userActions"
						inline-align="right"
						align="left"
					/>
				</div>
			</template>
			<div class="flex items-center gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
					<Icon name="ri-user-fill" :size="24" />
				</div>
				<div>
					<div class="font-bold">{{ text.name }}</div>
					<div class="text-sm text-gray-500">{{ text.job }}</div>
				</div>
			</div>
			<template #footer>
				<div class="flex justify-between text-sm text-gray-500">
					<span>{{ text.years }}</span>
					<span>{{ text.city }}</span>
				</div>
			</template>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.noLines }}</div>
		<Card :header-line="false" :footer-line="false">
			<template #header>
				<div class="font-bold">{{ text.cardTitle }}</div>
			</template>
			<div class="text-sm">{{ text.noLinesContent }}</div>
			<template #footer>
				<div class="text-sm text-gray-500">{{ text.footerInfo }}</div>
			</template>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.clickable }}</div>
		<Card @click="showToast(text.cardClicked)">
			<div class="text-sm">{{ text.clickMe }}</div>
		</Card>
		<Toast v-model:visible="toastVisible" :message="toastMessage" />

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.customStyle }}</div>
		<Card inj-class="!bg-primary/10 dark:!bg-dark/10">
			<div class="text-sm">{{ text.customBg }}</div>
		</Card>
		<Card inj-class="ring-2 ring-primary dark:ring-dark">
			<div class="text-sm">{{ text.customRing }}</div>
		</Card>
		<Card header-class="!bg-primary/10 dark:!bg-dark/10">
			<template #header>
				<div class="font-bold">{{ text.customHeader }}</div>
			</template>
			<div class="text-sm">{{ text.contentArea }}</div>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.complex }}</div>
		<Card>
			<template #header>
				<div class="flex items-center gap-2">
					<Icon name="ri-article-line" :size="20" />
					<span class="font-bold">{{ text.articleTitle }}</span>
				</div>
			</template>
			<div class="space-y-2">
				<p class="text-sm text-gray-600 dark:text-gray-400">{{ text.articleSummary }}</p>
				<div class="flex gap-2">
					<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">{{ text.tagOne }}</span>
					<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">{{ text.tagTwo }}</span>
				</div>
			</div>
			<template #footer>
				<div class="flex items-center justify-between text-sm text-gray-500">
					<span>2024-01-01</span>
					<div class="flex gap-4">
						<span class="flex items-center gap-1">
							<Icon name="ri-eye-line" :size="16" />
							1234
						</span>
						<span class="flex items-center gap-1">
							<Icon name="ri-heart-line" :size="16" />
							56
						</span>
					</div>
				</div>
			</template>
		</Card>

		<div class="mx-4 mt-8 text-lg font-bold">{{ text.business }}</div>

		<Card p="0" @click="showToast(text.productToast)">
			<div class="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
				<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
			</div>
			<div class="p-3">
				<div class="line-clamp-2 text-sm">{{ text.productTitle }}</div>
				<div class="mt-2 flex items-baseline gap-1">
					<span class="text-lg font-bold text-red-500">{{ text.price }}</span>
					<span class="text-xs text-gray-400 line-through">{{ text.oldPrice }}</span>
				</div>
				<div class="mt-2 flex items-center justify-between text-xs text-gray-500">
					<span>{{ text.sold }}</span>
					<span class="flex items-center gap-0.5">
						<Icon name="ri-star-fill" :size="12" state="theme" />
						4.9
					</span>
				</div>
			</div>
		</Card>

		<Card>
			<template #header>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Icon name="ri-store-2-line" :size="18" />
						<span class="font-medium">{{ text.store }}</span>
					</div>
					<span class="text-sm text-primary dark:text-dark">{{ text.pending }}</span>
				</div>
			</template>
			<div class="flex gap-3">
				<div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
					<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
				</div>
				<div class="flex flex-1 flex-col justify-between">
					<div class="line-clamp-2 text-sm">{{ text.orderTitle }}</div>
					<div class="flex items-center justify-between">
						<span class="text-xs text-gray-500">{{ text.orderSpec }}</span>
						<span class="font-medium">{{ text.price }}</span>
					</div>
				</div>
			</div>
			<template #footer>
				<div class="flex justify-end gap-2">
					<Button size="sm" fill="lineState">{{ text.contact }}</Button>
					<Button size="sm">{{ text.remind }}</Button>
				</div>
			</template>
		</Card>

		<Card @click="showToast(text.notificationToast)">
			<div class="flex gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
					<Icon name="ri-notification-3-line" :size="20" state="theme" />
				</div>
				<div class="flex-1">
					<div class="flex items-center justify-between">
						<span class="font-medium">{{ text.systemNotice }}</span>
						<span class="text-xs text-gray-400">{{ text.noticeTime }}</span>
					</div>
					<p class="mt-1 line-clamp-2 text-sm text-gray-500">{{ text.noticeText }}</p>
				</div>
			</div>
		</Card>

		<Card p="0" border="dashed" shadow="none">
			<div class="flex">
				<div class="flex w-24 shrink-0 flex-col items-center justify-center bg-primary/10 p-3 dark:bg-dark/10">
					<div class="flex items-baseline">
						<span class="text-xs text-primary dark:text-dark">{{ props.locale === 'zh_CN' ? '¥' : '$' }}</span>
						<span class="text-3xl font-bold text-primary dark:text-dark">50</span>
					</div>
					<div class="text-xs text-gray-500">{{ text.couponSpend }}</div>
				</div>
				<div class="flex flex-1 flex-col justify-between p-3">
					<div>
						<div class="font-medium">{{ text.couponTitle }}</div>
						<div class="mt-1 text-xs text-gray-500">{{ text.couponDesc }}</div>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-xs text-gray-400">{{ text.couponExpire }}</span>
						<Button size="sm">{{ text.useNow }}</Button>
					</div>
				</div>
			</div>
		</Card>

		<Card>
			<template #header>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Icon name="ri-truck-line" :size="18" state="theme" />
						<span class="font-medium text-primary dark:text-dark">{{ text.inTransit }}</span>
					</div>
					<span class="text-xs text-gray-500">{{ text.shipper }}</span>
				</div>
			</template>
			<Steps :steps="logisticsSteps" :current="1" vertical />
		</Card>

		<Card inj-class="!bg-linear-to-br !from-primary !to-primary/70 dark:!from-dark dark:!to-dark/70 !text-white">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Icon name="ri-bank-card-line" :size="24" />
					<span class="font-medium">{{ text.bank }}</span>
				</div>
				<span class="text-sm opacity-80">{{ text.cardType }}</span>
			</div>
			<div class="mt-6 text-2xl tracking-widest">**** **** **** 8888</div>
			<div class="mt-4 flex items-center justify-between text-sm opacity-80">
				<span>{{ text.cardOwner }}</span>
				<span>{{ text.cardValid }}</span>
			</div>
		</Card>

		<div class="h-8" />
	</div>
</template>
