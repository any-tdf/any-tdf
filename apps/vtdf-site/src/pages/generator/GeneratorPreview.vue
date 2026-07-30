<script setup lang="ts">
import { computed, ref } from 'vue';
import {
	Avatar,
	AvatarGroup,
	Badge,
	Button,
	ButtonGroup,
	Calendar,
	Card,
	Cell,
	Checkbox,
	ConfigProvider,
	Divider,
	FullKeyboard,
	Icon,
	Input,
	Loading,
	NoticeBar,
	NumKeyboard,
	Pagination,
	Progress,
	ProgressLoop,
	Radio,
	Rate,
	Skeleton,
	Slider,
	Stepper,
	Steps,
	Swiper,
	Switch,
	Tab,
	Tag
} from 'vtdf/components';
import { en_US, zh_CN } from 'vtdf/lang';
import { defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import GeneratorLandscapeSvg from './GeneratorLandscapeSvg.vue';

const props = withDefaults(
	defineProps<{
		dark?: boolean;
		extendList?: { color: string; alias: string; hex: string }[];
		builtInIconLibrary?: BuiltInIconLibrary;
	}>(),
	{
		dark: false,
		extendList: () => [],
		builtInIconLibrary: defaultBuiltInIconLibrary
	}
);

// 组件使用 CSS 变量作为默认圆角值
// 通过父组件的 previewStyle 设置 --radius-box, --radius-form, --radius-small CSS 变量来动态控制

const isZh = typeof window !== 'undefined' ? localStorage.getItem('lang') === 'zh_CN' : true;
// 根据 localStorage 中的语言设置，设置组件库语言上下文
const locale = isZh ? zh_CN : en_US;

// 获取扩展色，如果不存在则返回黑色
const getExtendColor = (index: number) => props.extendList[index]?.color || 'oklch(0 0 0)';

// 根据 dark prop 派生样式类（使用配置的 CSS 变量）
const textMuted = computed(() => (props.dark ? 'text-text-dark/60' : 'text-text-primary/60'));
const textSubtle = computed(() => (props.dark ? 'text-text-dark/50' : 'text-text-primary/50'));
const bgSurface = computed(() => (props.dark ? 'bg-bg-surface-dark' : 'bg-bg-surface'));
const indicateActive = computed(() => (props.dark ? 'bg-dark' : 'bg-primary'));
const textTheme = computed(() => (props.dark ? 'text-dark' : 'text-primary'));

const rateValue = ref(4.5);
const radioValue = ref('alipay');
const sliderValue = ref(65);
const sliderBarValue = ref(60);

// 条形图数据（正态分布）
const barList = Array.from({ length: 40 }, (_, i) => {
	const x = (i - 20) / 8;
	return Math.floor(Math.exp((-x * x) / 2) * 40) + 4;
});

// 开关状态
const notifySwitch = ref(true);
const autoUpdateSwitch = ref(false);
const locationSwitch = ref(true);

// 登录表单状态
const username = ref('');
const password = ref('');

// 商品数量
const productCount = ref(1);

// Tabs 状态
const activeTabIndex = ref(0);

// 分页状态
const currentPage = ref(3);
const currentPage2 = ref(5);

// 数字键盘值
const numKeyboardValue = ref('');

// 全键盘值
const fullKeyboardValue = ref('');

// Checkbox 状态
const checkboxValues = ref(['agree']);

// 支付方式
const paymentData = [
	{ name: 'alipay', label: isZh ? '支付宝' : 'Alipay' },
	{ name: 'wechat', label: isZh ? '微信支付' : 'WeChat Pay' },
	{ name: 'card', label: isZh ? '银行卡' : 'Bank Card' }
];

// 物流步骤数据
const logisticsSteps = [
	{
		step: {
			title: isZh ? '订单已提交' : 'Order Placed',
			desc: isZh ? '12 月 20 日 14:30' : 'Dec 20, 14:30',
			bar: { type: 'icon' as const, content: { name: 'ri-checkbox-circle-line', size: 16 } }
		}
	},
	{
		step: {
			title: isZh ? '商家已发货' : 'Shipped',
			desc: isZh ? '12 月 21 日 09:15' : 'Dec 21, 09:15',
			bar: { type: 'icon' as const, content: { name: 'ri-gift-line', size: 16 } }
		}
	},
	{
		step: {
			title: isZh ? '运输中' : 'In Transit',
			desc: isZh ? '12 月 22 日 06:00' : 'Dec 22, 06:00',
			bar: { type: 'icon' as const, content: { name: 'ri-truck-line', size: 16 } }
		}
	},
	{
		step: {
			title: isZh ? '派送中' : 'Out for Delivery',
			desc: isZh ? '预计今日送达' : 'Expected today',
			bar: { type: 'icon' as const, content: { name: 'ri-home-4-line', size: 16 } }
		}
	}
];

// 商品分类 Tab labels
const categoryLabels = computed(() => [
	{ text: isZh ? '推荐' : 'Featured' },
	{ text: isZh ? '热销' : 'Hot' },
	{ text: isZh ? '新品' : 'New' },
	{ text: isZh ? '特惠' : 'Sale' }
]);

// Checkbox 数据
const checkboxData = [{ name: 'agree', label: isZh ? '我已阅读并同意服务协议' : 'I agree to the Terms of Service' }];
const skeletonIconPreviewTypes = ['img', 'video', 'code', 'qrcode', 'barcode'] as const;

// Loading 可用的 type 列表 (1_0 到 1_53)
const loadingTypes = Array.from({ length: 54 }, (_, i) => `1_${i}`);

// 随机选择 4 个 loading type
const getRandomLoadingTypes = () => {
	const shuffled = [...loadingTypes].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, 4);
};

const randomLoadingTypes = ref(getRandomLoadingTypes());

// 获取当前月份字符串 YYYYMM
const now = new Date();
const currentMonthStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

// 获取当前月份的天数
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

// 选择本月连续 10 天的区间（模拟酒店预订）
const getSelectedDatesRange = () => {
	const maxStartDay = Math.max(1, daysInMonth - 9);
	const startDay = Math.floor(Math.random() * maxStartDay) + 1;
	const dates: string[] = [];
	for (let i = 0; i < 10; i++) {
		const day = startDay + i;
		dates.push(`${currentMonthStr}${String(day).padStart(2, '0')}`);
	}
	return dates;
};

const randomSelectedDates = getSelectedDatesRange();

// 随机选择一张 wall 图片
const randomWallIndex = Math.floor(Math.random() * 4) + 1;
const randomWallImage = `/assets/images/home/wall_${randomWallIndex}.jpg`;

// Swiper 数据
const swiperData = [
	{ type: 'img' as const, url: '/assets/images/home/wall_1.jpg' },
	{ type: 'img' as const, url: '/assets/images/home/wall_2.jpg' },
	{ type: 'img' as const, url: '/assets/images/home/wall_3.jpg' },
	{ type: 'img' as const, url: '/assets/images/home/wall_4.jpg' }
];

// 组件区块随机顺序
const componentOrder = Array.from({ length: 29 }, (_, i) => i).sort(() => Math.random() - 0.5);

// 扩展色图例
const lineLegend = computed(() => [0, 1, 2, 3].filter((index) => props.extendList[index]));
</script>

<template>
	<ConfigProvider :locale="locale" :built-in-icon-library="builtInIconLibrary" :sync-theme="false">
		<div
			data-site-component-preview
			class="generator-preview-columns mx-auto px-6 py-5 [&>div]:mb-6 [&>div]:border-b [&>div]:pb-6"
			:class="dark ? 'bg-bg-base-dark text-text-dark [&>div]:border-white/10' : 'bg-bg-base text-text-primary [&>div]:border-black/10'"
		>
			<div v-for="index in componentOrder" :key="index" class="break-inside-avoid">
				<template v-if="index === 0">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '轮播图' : 'Carousel' }} <span class="opacity-50">Swiper</span>
					</div>
					<div style="width: 300px; margin: 0 auto">
						<Swiper
							:data="swiperData"
							py="6"
							px="2"
							indicate-inj-class="bg-none"
							indicate-color="bg-black/10 dark:bg-white/10"
							:indicate-active-color="indicateActive"
							indicate-style="longLine"
							:interval="6"
							:container-width="300"
						/>
					</div>
					<div class="mt-3" style="width: 300px; margin: 0 auto">
						<Swiper
							:data="swiperData"
							py="8"
							px="6"
							indicate-inj-class="bg-none"
							indicate-color="bg-black/10 dark:bg-white/10"
							:indicate-active-color="indicateActive"
							:container-width="300"
							:translate-z="600"
						/>
					</div>
				</template>

				<template v-else-if="index === 1">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '商品操作' : 'Product Actions' }} <span class="opacity-50">Button / ButtonGroup</span>
					</div>
					<div class="flex flex-col">
						<Button>{{ isZh ? '立即购买' : 'Buy Now' }}</Button>
						<Button fill="colorLight">{{ isZh ? '收藏商品' : 'Add to Wishlist' }}</Button>
						<Button fill="lineState">{{ isZh ? '加入购物车' : 'Add to Cart' }}</Button>
						<div class="mt-2 flex justify-between gap-2 px-4">
							<Button
								state="success"
								custom-size
								:custom-width="44"
								:custom-height="44"
								:icon="{ name: 'ri-checkbox-circle-line', size: 20 }"
							/>
							<Button
								state="warning"
								custom-size
								:custom-width="44"
								:custom-height="44"
								:icon="{ name: 'ri-error-warning-line', size: 20 }"
							/>
							<Button state="error" custom-size :custom-width="44" :custom-height="44" :icon="{ name: 'ri-close-circle-line', size: 20 }" />
							<Button state="info" custom-size :custom-width="44" :custom-height="44" :icon="{ name: 'ri-information-line', size: 20 }" />
						</div>
						<div class="mt-3">
							<ButtonGroup fill="lineState" :items="[{ text: 'S' }, { text: 'M' }, { text: 'L' }, { text: 'XL' }]" />
						</div>
					</div>
				</template>

				<template v-else-if="index === 2">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '订单状态' : 'Order Status' }} <span class="opacity-50">Badge</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="0" py="4">
						<div class="flex items-center justify-around">
							<div class="flex flex-col items-center gap-1">
								<Badge text="2" inj-class="bg-warning"><Icon name="ri-wallet-3-line" theme :size="24" /></Badge>
								<span class="text-xs">{{ isZh ? '待付款' : 'Unpaid' }}</span>
							</div>
							<div class="flex flex-col items-center gap-1">
								<Badge text="Hot" inj-class="bg-info" radius="leaf"><Icon name="ri-gift-line" theme :size="24" /></Badge>
								<span class="text-xs">{{ isZh ? '待发货' : 'Pending' }}</span>
							</div>
							<div class="flex flex-col items-center gap-1">
								<Icon name="ri-truck-line" theme :size="24" />
								<span class="text-xs">{{ isZh ? '待收货' : 'Shipping' }}</span>
							</div>
							<div class="flex flex-col items-center gap-1">
								<Badge text="New" inj-class="bg-error"><Icon name="ri-star-line" theme :size="24" /></Badge>
								<span class="text-xs">{{ isZh ? '待评价' : 'Review' }}</span>
							</div>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 3">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '入住日期' : 'Check-in Date' }} <span class="opacity-50">Calendar</span>
					</div>
					<Calendar
						:popup="null"
						:clear="false"
						mode="range"
						:start-month="currentMonthStr"
						:init-month="currentMonthStr"
						:init-selected-dates="randomSelectedDates"
						:height="35"
					/>
				</template>

				<template v-else-if="index === 4">
					<div class="mb-2 text-xs font-medium" :class="textMuted">{{ isZh ? '插画' : 'Illustration' }}</div>
					<Card bg="gray" shadow="none" mx="0" my="0" p="0">
						<div class="flex h-48 items-center overflow-hidden">
							<GeneratorLandscapeSvg :dark="dark" />
						</div>
					</Card>
				</template>

				<template v-else-if="index === 5">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '物流追踪' : 'Shipping Status' }} <span class="opacity-50">Steps</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" p="3">
						<Steps :steps="logisticsSteps" :current="3" vertical />
					</Card>
				</template>

				<template v-else-if="index === 6">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '加载中' : 'Loading' }} <span class="opacity-50">Loading</span>
					</div>
					<div class="flex flex-wrap items-center justify-around gap-2">
						<Loading v-for="type in randomLoadingTypes" :key="type" theme :type="type" />
					</div>
				</template>

				<template v-else-if="index === 7">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '数据统计' : 'Statistics' }} <span class="opacity-50">ProgressLoop</span>
					</div>
					<div class="flex items-center justify-around">
						<div class="flex flex-col items-center gap-1">
							<div class="h-14 w-14">
								<ProgressLoop :percent="78" :stroke-width="3" />
							</div>
							<span class="text-xs" :class="textSubtle">{{ isZh ? '任务' : 'Tasks' }}</span>
						</div>
						<div class="flex flex-col items-center gap-1">
							<div class="h-14 w-14">
								<ProgressLoop :percent="45" :stroke-width="3" inj-class="!stroke-success" />
							</div>
							<span class="text-xs" :class="textSubtle">{{ isZh ? '存储' : 'Storage' }}</span>
						</div>
						<div class="flex flex-col items-center gap-1">
							<div class="h-14 w-14">
								<ProgressLoop :percent="92" :stroke-width="3" inj-class="!stroke-warning" />
							</div>
							<span class="text-xs" :class="textSubtle">{{ isZh ? '电量' : 'Battery' }}</span>
						</div>
					</div>
				</template>

				<template v-else-if="index === 8">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '快捷功能' : 'Quick Actions' }} <span class="opacity-50">Icon</span>
					</div>
					<div class="flex flex-wrap items-center justify-around gap-3">
						<div class="flex flex-col items-center gap-1">
							<Icon name="ri-scan-2-line" theme :size="28" />
							<span class="text-xs">{{ isZh ? '扫一扫' : 'Scan' }}</span>
						</div>
						<div class="flex flex-col items-center gap-1">
							<Icon name="ri-bank-card-line" theme :size="28" />
							<span class="text-xs">{{ isZh ? '付款' : 'Pay' }}</span>
						</div>
						<div class="flex flex-col items-center gap-1">
							<Icon name="ri-coupon-3-line" theme :size="28" />
							<span class="text-xs">{{ isZh ? '卡券' : 'Coupon' }}</span>
						</div>
						<div class="flex flex-col items-center gap-1">
							<Icon name="ri-gift-line" theme :size="28" />
							<span class="text-xs">{{ isZh ? '福利' : 'Gift' }}</span>
						</div>
					</div>
				</template>

				<template v-else-if="index === 9">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '会员等级' : 'VIP Level' }} <span class="opacity-50">Progress</span>
					</div>
					<div class="flex flex-col gap-2">
						<div class="flex items-center justify-between text-xs">
							<span :class="textSubtle">Lv.3</span>
							<span :class="textSubtle">1680/2000 {{ isZh ? '经验' : 'EXP' }}</span>
							<span :class="textSubtle">Lv.4</span>
						</div>
						<Progress :percent="84" height="2" />
						<Progress :percent="65" height="4" percent-position="block" />
					</div>
				</template>

				<template v-else-if="index === 10">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '商品评分' : 'Product Rating' }} <span class="opacity-50">Rate</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
						<div class="flex items-center justify-between">
							<div class="flex flex-col">
								<span class="text-2xl font-bold">{{ rateValue }}</span>
								<span class="text-xs" :class="textSubtle">{{ isZh ? '综合评分' : 'Overall' }}</span>
							</div>
							<Rate v-model:value="rateValue" half />
						</div>
					</Card>
				</template>

				<template v-else-if="index === 11">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '偏好设置' : 'Settings' }} <span class="opacity-50">Switch</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
						<div class="flex flex-col gap-3">
							<div class="flex items-center justify-between">
								<span class="text-sm">{{ isZh ? '消息通知' : 'Notifications' }}</span>
								<Switch v-model:active="notifySwitch" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm">{{ isZh ? '自动更新' : 'Auto Update' }}</span>
								<Switch v-model:active="autoUpdateSwitch" inside="state" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm">{{ isZh ? '位置服务' : 'Location' }}</span>
								<Switch v-model:active="locationSwitch" />
							</div>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 12">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '音量调节' : 'Volume' }} <span class="opacity-50">Slider</span>
					</div>
					<div class="flex items-center gap-3 px-2 pt-5">
						<svg class="size-5 fill-current" viewBox="0 0 24 24">
							<path
								d="M10 7.22 6.603 10H3v4h3.603L10 16.78zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387zm14.525-4 3.536 3.536-1.415 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.465l1.414-1.415L19 10.586l3.535-3.536 1.415 1.415z"
							/>
						</svg>
						<div class="flex-1">
							<Slider :value="sliderValue" show-tip="always" @change="sliderValue = $event" />
						</div>
						<svg class="size-5 fill-current" viewBox="0 0 24 24">
							<path
								d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"
							/>
						</svg>
					</div>
					<div class="mt-4 px-2 pt-12">
						<Slider line-block show-tip="never" :value="sliderBarValue" @change="sliderBarValue = $event">
							<div class="relative grow items-end">
								<div class="flex items-end justify-between overflow-hidden" style="transform: translateY(-22px)">
									<div
										v-for="(item, i) in barList"
										:key="i"
										class="w-1 rounded-full"
										:class="i / 40 < sliderBarValue / 100 ? (dark ? 'bg-dark' : 'bg-primary') : dark ? 'bg-gray-500' : 'bg-gray-200'"
										:style="{ height: `${item}px` }"
									></div>
								</div>
							</div>
						</Slider>
					</div>
				</template>

				<template v-else-if="index === 13">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '支付方式' : 'Payment' }} <span class="opacity-50">Radio</span>
					</div>
					<Radio :data="paymentData" v-model:value="radioValue" />
				</template>

				<template v-else-if="index === 14">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '用户登录' : 'User Login' }} <span class="opacity-50">Input</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0">
						<div class="flex flex-col gap-3">
							<Input
								v-model:value="username"
								:placeholder="isZh ? '请输入用户名' : 'Username'"
								:label1="{ name: 'ri-user-3-line', size: 18 }"
								clear
							/>
							<Input
								v-model:value="password"
								type="password"
								:placeholder="isZh ? '请输入密码' : 'Password'"
								:label1="{ name: 'ri-lock-line', size: 18 }"
								clear
							/>
							<Input
								:placeholder="isZh ? '请输入用户名' : 'Username'"
								:label1="{ name: 'ri-user-3-line', size: 18 }"
								input-style="line"
								clear
							/>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 15">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '活动通知' : 'Notice' }} <span class="opacity-50">NoticeBar</span>
					</div>
					<NoticeBar
						:text-list="[
							isZh ? '双 12 大促进行中，全场满 300 减 50！' : 'Holiday Sale: Get $50 off on orders over $300!',
							isZh ? '新用户注册即送 100 元优惠券！' : 'New users get $100 coupon on signup!'
						]"
						left-icon="volume"
						vertical
					/>
					<div class="mt-3">
						<NoticeBar
							:text-list="[
								isZh
									? '欢迎来到 VTDF 主题生成器，快来定制属于你的专属主题吧！'
									: 'Welcome to VTDF Theme Generator, customize your own theme now!'
							]"
							:right-icon="null"
						>
							<template #leftChild>
								<span class="text-base">🥳</span>
							</template>
						</NoticeBar>
					</div>
				</template>

				<template v-else-if="index === 16">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '商品分类' : 'Categories' }} <span class="opacity-50">Tab</span>
					</div>
					<div class="flex flex-col gap-3">
						<Tab :labels="categoryLabels" v-model:active="activeTabIndex" mx="0" />
						<Tab :labels="categoryLabels" v-model:active="activeTabIndex" mx="0" line-type />
					</div>
				</template>

				<template v-else-if="index === 17">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '购物车商品' : 'Cart Item' }} <span class="opacity-50">Stepper</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" p="3">
						<div class="flex gap-3">
							<div class="rounded-box h-20 w-20 shrink-0 overflow-hidden">
								<img :src="randomWallImage" alt="product" class="h-full w-full object-cover" />
							</div>
							<div class="flex flex-1 flex-col justify-between">
								<div>
									<div class="text-sm font-medium">{{ isZh ? '无线蓝牙耳机 Pro' : 'Wireless Earbuds Pro' }}</div>
									<div class="text-xs" :class="textSubtle">{{ isZh ? '颜色：星空黑 | 规格：标准版' : 'Black | Standard' }}</div>
								</div>
								<div class="flex items-center justify-between">
									<span class="font-bold" :class="textTheme">¥299</span>
									<Stepper :value="productCount" :min="1" :max="10" @change="productCount = $event" />
								</div>
							</div>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 18">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '账户设置' : 'Account Settings' }} <span class="opacity-50">Cell</span>
					</div>
					<div class="overflow-hidden rounded-lg">
						<Cell :title="isZh ? '个人资料' : 'Profile'" right="arrow" />
						<Cell :title="isZh ? '账户安全' : 'Security'" right="arrow" />
						<Cell :title="isZh ? '深色模式' : 'Dark Mode'" :right="{ type: 'switch' }" />
					</div>
				</template>

				<template v-else-if="index === 19">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '加载占位' : 'Skeleton' }} <span class="opacity-50">Skeleton</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" p="3">
						<div class="flex flex-col gap-3">
							<div class="flex gap-3">
								<Skeleton type="img" width="12" height="12" />
								<div class="flex flex-1 flex-col gap-2">
									<Skeleton type="p" width="16" height="2" />
									<Skeleton type="p" width="full" height="2" />
									<Skeleton type="p" width="12" height="2" />
								</div>
							</div>
							<div class="grid grid-cols-5 gap-2">
								<div v-for="type in skeletonIconPreviewTypes" :key="type" class="flex min-w-0 flex-col items-center gap-1">
									<Skeleton :type="type" width="8" height="8" :icon-ratio="0.62" />
									<span class="w-full truncate text-center text-xs opacity-60">{{ type }}</span>
								</div>
							</div>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 20">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '内容分隔' : 'Divider' }} <span class="opacity-50">Divider</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
						<div class="text-sm">{{ isZh ? '上方内容' : 'Content above' }}</div>
						<Divider :text="isZh ? '分隔线' : 'Divider'" />
						<div class="text-sm">{{ isZh ? '下方内容' : 'Content below' }}</div>
					</Card>
				</template>

				<template v-else-if="index === 21">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '用户头像' : 'User Avatar' }} <span class="opacity-50">Avatar</span>
					</div>
					<div class="flex items-end justify-around">
						<Avatar image="/assets/images/home/wall_1.jpg" size="sm" />
						<Avatar image="/assets/images/home/wall_2.jpg" size="base" />
						<Avatar image="/assets/images/home/wall_3.jpg" size="md" />
						<Avatar :icon="{ name: 'ri-user-3-line', size: 32 }" size="md" />
					</div>
					<div class="mt-4 pl-4">
						<AvatarGroup
							:data="[
								{ image: '/assets/images/home/wall_1.jpg' },
								{ image: '/assets/images/home/wall_2.jpg' },
								{ image: '/assets/images/home/wall_3.jpg' },
								{ image: '/assets/images/home/wall_4.jpg' },
								{ image: '/assets/images/home/avatar_1.jpg' }
							]"
						/>
					</div>
				</template>

				<template v-else-if="index === 22">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '分页器' : 'Pagination' }} <span class="opacity-50">Pagination</span>
					</div>
					<div class="flex flex-col gap-28 pt-20">
						<Pagination
							:total="100"
							:page-size="10"
							:current="currentPage"
							:max-show-page="5"
							show-next-omit-page
							@change="currentPage = $event"
						/>
						<Pagination
							:total="100"
							:page-size="10"
							:current="currentPage2"
							:max-show-page="5"
							type="block"
							@change="currentPage2 = $event"
						/>
					</div>
				</template>

				<template v-else-if="index === 23">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '数字键盘' : 'NumKeyboard' }} <span class="opacity-50">NumKeyboard</span>
					</div>
					<div class="mb-2 flex h-10 items-center justify-between rounded-sm px-3" :class="bgSurface">
						<span class="text-xs" :class="textSubtle">{{ isZh ? '输入金额' : 'Amount' }}</span>
						<span class="font-bold">{{ numKeyboardValue || '0.00' }}</span>
					</div>
					<NumKeyboard v-model:value="numKeyboardValue" :popup="null" height="10" />
				</template>

				<template v-else-if="index === 24">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '用户协议' : 'Agreement' }} <span class="opacity-50">Checkbox</span>
					</div>
					<Checkbox :data="checkboxData" v-model:checkeds="checkboxValues" />
				</template>

				<template v-else-if="index === 25">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '折线图' : 'Line Chart' }} <span class="opacity-50">Extend Colors</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
						<div class="mb-3 flex items-center gap-4">
							<div v-for="legendIndex in lineLegend" :key="legendIndex" class="flex items-center gap-1">
								<span class="h-2 w-2 rounded-full" :style="{ backgroundColor: getExtendColor(legendIndex) }"></span>
								<span class="text-xs">{{ extendList[legendIndex]?.alias || `C${legendIndex + 1}` }}</span>
							</div>
						</div>
						<svg class="h-40 w-full" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet">
							<!-- Y 轴刻度线 -->
							<line x1="40" y1="20" x2="300" y2="20" stroke="currentColor" stroke-opacity="0.1" />
							<line x1="40" y1="50" x2="300" y2="50" stroke="currentColor" stroke-opacity="0.1" />
							<line x1="40" y1="80" x2="300" y2="80" stroke="currentColor" stroke-opacity="0.1" />
							<line x1="40" y1="110" x2="300" y2="110" stroke="currentColor" stroke-opacity="0.1" />
							<line x1="40" y1="140" x2="300" y2="140" stroke="currentColor" stroke-opacity="0.1" />
							<!-- Y 轴标签 -->
							<text x="30" y="24" text-anchor="end" fill="currentColor" fill-opacity="0.5" font-size="10">600</text>
							<text x="30" y="54" text-anchor="end" fill="currentColor" fill-opacity="0.5" font-size="10">450</text>
							<text x="30" y="84" text-anchor="end" fill="currentColor" fill-opacity="0.5" font-size="10">300</text>
							<text x="30" y="114" text-anchor="end" fill="currentColor" fill-opacity="0.5" font-size="10">150</text>
							<text x="30" y="144" text-anchor="end" fill="currentColor" fill-opacity="0.5" font-size="10">0</text>
							<!-- X 轴标签 -->
							<text x="70" y="155" text-anchor="middle" fill="currentColor" fill-opacity="0.5" font-size="10">10-13</text>
							<text x="147" y="155" text-anchor="middle" fill="currentColor" fill-opacity="0.5" font-size="10">10-14</text>
							<text x="223" y="155" text-anchor="middle" fill="currentColor" fill-opacity="0.5" font-size="10">10-15</text>
							<text x="300" y="155" text-anchor="middle" fill="currentColor" fill-opacity="0.5" font-size="10">10-16</text>
							<!-- 折线 1 -->
							<template v-if="extendList[0]">
								<path
									d="M70 25 Q108 60 147 95 T223 70 T300 55"
									fill="none"
									:stroke="getExtendColor(0)"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<circle cx="70" cy="25" r="3" :fill="getExtendColor(0)" />
								<circle cx="147" cy="95" r="3" :fill="getExtendColor(0)" />
								<circle cx="223" cy="70" r="3" :fill="getExtendColor(0)" />
								<circle cx="300" cy="55" r="3" :fill="getExtendColor(0)" />
							</template>
							<!-- 折线 2 -->
							<template v-if="extendList[1]">
								<path
									d="M70 35 Q108 55 147 65 T223 120 T300 20"
									fill="none"
									:stroke="getExtendColor(1)"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<circle cx="70" cy="35" r="3" :fill="getExtendColor(1)" />
								<circle cx="147" cy="65" r="3" :fill="getExtendColor(1)" />
								<circle cx="223" cy="120" r="3" :fill="getExtendColor(1)" />
								<circle cx="300" cy="20" r="3" :fill="getExtendColor(1)" />
							</template>
							<!-- 折线 3 -->
							<template v-if="extendList[2]">
								<path
									d="M70 80 Q108 45 147 50 T223 85 T300 40"
									fill="none"
									:stroke="getExtendColor(2)"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<circle cx="70" cy="80" r="3" :fill="getExtendColor(2)" />
								<circle cx="147" cy="50" r="3" :fill="getExtendColor(2)" />
								<circle cx="223" cy="85" r="3" :fill="getExtendColor(2)" />
								<circle cx="300" cy="40" r="3" :fill="getExtendColor(2)" />
							</template>
							<!-- 折线 4 -->
							<template v-if="extendList[3]">
								<path
									d="M70 110 Q108 100 147 75 T223 100 T300 85"
									fill="none"
									:stroke="getExtendColor(3)"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<circle cx="70" cy="110" r="3" :fill="getExtendColor(3)" />
								<circle cx="147" cy="75" r="3" :fill="getExtendColor(3)" />
								<circle cx="223" cy="100" r="3" :fill="getExtendColor(3)" />
								<circle cx="300" cy="85" r="3" :fill="getExtendColor(3)" />
							</template>
						</svg>
					</Card>
				</template>

				<template v-else-if="index === 26">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '环形图' : 'Donut Chart' }} <span class="opacity-50">Extend Colors</span>
					</div>
					<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="4">
						<div class="flex items-center justify-between">
							<div class="flex flex-col gap-2">
								<div v-for="legendIndex in lineLegend" :key="legendIndex" class="flex items-center gap-2">
									<span class="h-2 w-2 rounded-full" :style="{ backgroundColor: getExtendColor(legendIndex) }"></span>
									<span class="text-xs"
										>{{ extendList[legendIndex]?.alias || `C${legendIndex + 1}` }}: {{ [1600, 1000, 400, 200][legendIndex] }}</span
									>
								</div>
							</div>
							<svg class="h-32 w-32 shrink-0" viewBox="0 0 160 160">
								<!-- 环形图背景 -->
								<circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" stroke-opacity="0.1" stroke-width="20" />
								<!-- 扇区 1: 50% -->
								<circle
									v-if="extendList[0]"
									cx="80"
									cy="80"
									r="60"
									fill="none"
									:stroke="getExtendColor(0)"
									stroke-width="20"
									stroke-dasharray="188.5 377"
									stroke-dashoffset="94.25"
									transform="rotate(-90 80 80)"
								/>
								<!-- 扇区 2: 31.25% -->
								<circle
									v-if="extendList[1]"
									cx="80"
									cy="80"
									r="60"
									fill="none"
									:stroke="getExtendColor(1)"
									stroke-width="20"
									stroke-dasharray="117.8 377"
									stroke-dashoffset="-94.25"
									transform="rotate(-90 80 80)"
								/>
								<!-- 扇区 3: 12.5% -->
								<circle
									v-if="extendList[2]"
									cx="80"
									cy="80"
									r="60"
									fill="none"
									:stroke="getExtendColor(2)"
									stroke-width="20"
									stroke-dasharray="47.1 377"
									stroke-dashoffset="-212.05"
									transform="rotate(-90 80 80)"
								/>
								<!-- 扇区 4: 6.25% -->
								<circle
									v-if="extendList[3]"
									cx="80"
									cy="80"
									r="60"
									fill="none"
									:stroke="getExtendColor(3)"
									stroke-width="20"
									stroke-dasharray="23.6 377"
									stroke-dashoffset="-259.15"
									transform="rotate(-90 80 80)"
								/>
								<!-- 中心文字 -->
								<text x="80" y="72" text-anchor="middle" fill="currentColor" fill-opacity="0.5" font-size="10">
									{{ isZh ? '总量' : 'Total' }}
								</text>
								<text x="80" y="92" text-anchor="middle" fill="currentColor" font-size="16" font-weight="bold">3,200</text>
							</svg>
						</div>
					</Card>
				</template>

				<template v-else-if="index === 27">
					<div class="mb-2 text-xs font-medium" :class="textMuted">
						{{ isZh ? '全键盘' : 'Full Keyboard' }} <span class="opacity-50">FullKeyboard</span>
					</div>
					<div class="mb-2 flex h-10 items-center justify-between rounded-sm px-3" :class="bgSurface">
						<span class="text-xs" :class="textSubtle">{{ isZh ? '输入内容' : 'Input' }}</span>
						<span class="font-bold">{{ fullKeyboardValue || (isZh ? '请输入' : 'Type here') }}</span>
					</div>
					<FullKeyboard v-model:value="fullKeyboardValue" :popup="null" />
				</template>

				<template v-else>
					<div class="mb-2 text-xs font-medium" :class="textMuted">{{ isZh ? '标签' : 'Tags' }} <span class="opacity-50">Tag</span></div>
					<div class="flex flex-wrap gap-2">
						<Tag :text="isZh ? '新品' : 'New'" state="success" fill="light" />
						<Tag :text="isZh ? '热销' : 'Hot'" state="warning" />
						<Tag :text="isZh ? '限时' : 'Limited'" state="error" fill="line" />
						<Tag :text="isZh ? '推荐' : 'Featured'" state="theme" />
						<Tag :text="isZh ? '中性' : 'Neutral'" state="neutral" fill="light" />
					</div>
				</template>
			</div>
		</div>
	</ConfigProvider>
</template>
