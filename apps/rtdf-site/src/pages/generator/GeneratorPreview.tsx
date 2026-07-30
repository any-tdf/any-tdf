import { cloneElement, useState } from 'react';
import {
	Button,
	ButtonGroup,
	Switch,
	Progress,
	ProgressLoop,
	Loading,
	Badge,
	Tag,
	Icon,
	Slider,
	Rate,
	Radio,
	Steps,
	Avatar,
	AvatarGroup,
	Calendar,
	Input,
	Cell,
	NoticeBar,
	Stepper,
	Tab,
	Skeleton,
	Divider,
	Card,
	Swiper,
	Pagination,
	NumKeyboard,
	Checkbox,
	FullKeyboard,
	ConfigProvider
} from 'rtdf/components';
import { zh_CN, en_US } from 'rtdf/lang';
import { type BuiltInIconLibrary, defaultBuiltInIconLibrary } from '@any-tdf/common/svg';
import LandscapeSvg from './LandscapeSvg';
import { useAppContext } from '../../store/appStore';

type GeneratorPreviewProps = {
	dark?: boolean;
	extendList?: { color: string; alias: string; hex: string }[];
	builtInIconLibrary?: BuiltInIconLibrary;
};

const GeneratorPreview = ({ dark = false, extendList = [], builtInIconLibrary = defaultBuiltInIconLibrary }: GeneratorPreviewProps) => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	// 获取扩展色，如果不存在则返回黑色
	const getExtendColor = (index: number) => extendList[index]?.color || 'oklch(0 0 0)';

	// 根据 dark prop 派生样式类（使用配置的 CSS 变量）
	const textMuted = dark ? 'text-text-dark/60' : 'text-text-primary/60';
	const textSubtle = dark ? 'text-text-dark/50' : 'text-text-primary/50';
	const bgSurface = dark ? 'bg-bg-surface-dark' : 'bg-bg-surface';
	const indicateActive = dark ? 'bg-dark' : 'bg-primary';
	const textTheme = dark ? 'text-dark' : 'text-primary';

	const [rateValue, setRateValue] = useState(4.5);
	const [radioValue, setRadioValue] = useState('alipay');
	const [sliderValue, setSliderValue] = useState(65);
	const [sliderBarValue, setSliderBarValue] = useState(60);

	// 条形图数据（正态分布）
	const barList = Array.from({ length: 40 }, (_, i) => {
		const x = (i - 20) / 8;
		return Math.floor(Math.exp((-x * x) / 2) * 40) + 4;
	});

	// 开关状态
	const [notifySwitch, setNotifySwitch] = useState(true);
	const [autoUpdateSwitch, setAutoUpdateSwitch] = useState(false);
	const [locationSwitch, setLocationSwitch] = useState(true);

	// 登录表单状态
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// 商品数量
	const [productCount, setProductCount] = useState(1);

	// Tabs 状态
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	// 分页状态
	const [currentPage, setCurrentPage] = useState(3);
	const [currentPage2, setCurrentPage2] = useState(5);

	// 数字键盘值
	const [numKeyboardValue, setNumKeyboardValue] = useState('');

	// 全键盘值
	const [fullKeyboardValue, setFullKeyboardValue] = useState('');

	// Checkbox 状态
	const [checkboxValues, setCheckboxValues] = useState(['agree']);

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
	const categoryLabels = [
		{ text: isZh ? '推荐' : 'Featured' },
		{ text: isZh ? '热销' : 'Hot' },
		{ text: isZh ? '新品' : 'New' },
		{ text: isZh ? '特惠' : 'Sale' }
	];

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

	const [randomLoadingTypes] = useState(getRandomLoadingTypes());

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

	const [randomSelectedDates] = useState(getSelectedDatesRange);

	// 随机选择一张 wall 图片
	const [randomWallImage] = useState(() => {
		const randomWallIndex = Math.floor(Math.random() * 4) + 1;
		return `/assets/images/home/wall_${randomWallIndex}.jpg`;
	});

	// Swiper 数据
	const swiperData = [
		{ type: 'img' as const, url: '/assets/images/home/wall_1.jpg' },
		{ type: 'img' as const, url: '/assets/images/home/wall_2.jpg' },
		{ type: 'img' as const, url: '/assets/images/home/wall_3.jpg' },
		{ type: 'img' as const, url: '/assets/images/home/wall_4.jpg' }
	];

	// 组件区块随机顺序
	const [componentOrder] = useState(() => Array.from({ length: 29 }, (_, i) => i).sort(() => Math.random() - 0.5));

	const swiperBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '轮播图' : 'Carousel'} <span className="opacity-50">Swiper</span>
			</div>
			<div style={{ width: '300px', margin: '0 auto' }}>
				<Swiper
					data={swiperData}
					py="6"
					px="2"
					indicateInjClass="bg-none"
					indicateColor="bg-black/10 dark:bg-white/10"
					indicateActiveColor={indicateActive}
					indicateStyle="longLine"
					interval={6}
					containerWidth={300}
				/>
			</div>
			<div className="mt-3" style={{ width: '300px', margin: '0 auto' }}>
				<Swiper
					data={swiperData}
					py="8"
					px="6"
					indicateInjClass="bg-none"
					indicateColor="bg-black/10 dark:bg-white/10"
					indicateActiveColor={indicateActive}
					containerWidth={300}
					translateZ={600}
				/>
			</div>
		</div>
	);

	const buttonBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '商品操作' : 'Product Actions'} <span className="opacity-50">Button / ButtonGroup</span>
			</div>
			<div className="flex flex-col">
				<Button>{isZh ? '立即购买' : 'Buy Now'}</Button>
				<Button fill="colorLight">{isZh ? '收藏商品' : 'Add to Wishlist'}</Button>
				<Button fill="lineState">{isZh ? '加入购物车' : 'Add to Cart'}</Button>
				<div className="mt-2 flex justify-between gap-2 px-4">
					<Button state="success" customSize customWidth={44} customHeight={44} icon={{ name: 'ri-checkbox-circle-line', size: 20 }} />
					<Button state="warning" customSize customWidth={44} customHeight={44} icon={{ name: 'ri-error-warning-line', size: 20 }} />
					<Button state="error" customSize customWidth={44} customHeight={44} icon={{ name: 'ri-close-circle-line', size: 20 }} />
					<Button state="info" customSize customWidth={44} customHeight={44} icon={{ name: 'ri-information-line', size: 20 }} />
				</div>
				<div className="mt-3">
					<ButtonGroup fill="lineState" items={[{ text: 'S' }, { text: 'M' }, { text: 'L' }, { text: 'XL' }]} />
				</div>
			</div>
		</div>
	);

	const badgeBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '订单状态' : 'Order Status'} <span className="opacity-50">Badge</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="0" py="4">
				<div className="flex items-center justify-around">
					<div className="flex flex-col items-center gap-1">
						<Badge text="2" injClass="bg-warning">
							<Icon name="ri-wallet-3-line" theme size={24} />
						</Badge>
						<span className="text-xs">{isZh ? '待付款' : 'Unpaid'}</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<Badge text="Hot" injClass="bg-info" radius="leaf">
							<Icon name="ri-gift-line" theme size={24} />
						</Badge>
						<span className="text-xs">{isZh ? '待发货' : 'Pending'}</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<Icon name="ri-truck-line" theme size={24} />
						<span className="text-xs">{isZh ? '待收货' : 'Shipping'}</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<Badge text="New" injClass="bg-error">
							<Icon name="ri-star-line" theme size={24} />
						</Badge>
						<span className="text-xs">{isZh ? '待评价' : 'Review'}</span>
					</div>
				</div>
			</Card>
		</div>
	);

	const tagBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '标签' : 'Tags'} <span className="opacity-50">Tag</span>
			</div>
			<div className="flex flex-wrap gap-2">
				<Tag text={isZh ? '新品' : 'New'} state="success" fill="light" />
				<Tag text={isZh ? '热销' : 'Hot'} state="warning" />
				<Tag text={isZh ? '限时' : 'Limited'} state="error" fill="line" />
				<Tag text={isZh ? '推荐' : 'Featured'} state="theme" />
				<Tag text={isZh ? '中性' : 'Neutral'} state="neutral" fill="light" />
			</div>
		</div>
	);

	const calendarBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '入住日期' : 'Check-in Date'} <span className="opacity-50">Calendar</span>
			</div>
			<Calendar
				popup={null}
				clear={false}
				mode="range"
				startMonth={currentMonthStr}
				initMonth={currentMonthStr}
				initSelectedDates={randomSelectedDates}
				height={35}
			/>
		</div>
	);

	const illustrationBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>{isZh ? '插画' : 'Illustration'}</div>
			<Card bg="gray" shadow="none" mx="0" my="0" p="0">
				<div className="flex h-48 items-center overflow-hidden">
					<LandscapeSvg dark={dark} />
				</div>
			</Card>
		</div>
	);

	const stepsBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '物流追踪' : 'Shipping Status'} <span className="opacity-50">Steps</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" p="3">
				<Steps steps={logisticsSteps} current={3} vertical />
			</Card>
		</div>
	);

	const loadingBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '加载中' : 'Loading'} <span className="opacity-50">Loading</span>
			</div>
			<div className="flex flex-wrap items-center justify-around gap-2">
				{randomLoadingTypes.map((type) => (
					<Loading theme type={type} key={type} />
				))}
			</div>
		</div>
	);

	const progressLoopBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '数据统计' : 'Statistics'} <span className="opacity-50">ProgressLoop</span>
			</div>
			<div className="flex items-center justify-around">
				<div className="flex flex-col items-center gap-1">
					<div className="h-14 w-14">
						<ProgressLoop percent={78} strokeWidth={3} />
					</div>
					<span className={`text-xs ${textSubtle}`}>{isZh ? '任务' : 'Tasks'}</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<div className="h-14 w-14">
						<ProgressLoop percent={45} strokeWidth={3} injClass="!stroke-success" />
					</div>
					<span className={`text-xs ${textSubtle}`}>{isZh ? '存储' : 'Storage'}</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<div className="h-14 w-14">
						<ProgressLoop percent={92} strokeWidth={3} injClass="!stroke-warning" />
					</div>
					<span className={`text-xs ${textSubtle}`}>{isZh ? '电量' : 'Battery'}</span>
				</div>
			</div>
		</div>
	);

	const iconBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '快捷功能' : 'Quick Actions'} <span className="opacity-50">Icon</span>
			</div>
			<div className="flex flex-wrap items-center justify-around gap-3">
				<div className="flex flex-col items-center gap-1">
					<Icon name="ri-scan-2-line" theme size={28} />
					<span className="text-xs">{isZh ? '扫一扫' : 'Scan'}</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Icon name="ri-bank-card-line" theme size={28} />
					<span className="text-xs">{isZh ? '付款' : 'Pay'}</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Icon name="ri-coupon-3-line" theme size={28} />
					<span className="text-xs">{isZh ? '卡券' : 'Coupon'}</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Icon name="ri-gift-line" theme size={28} />
					<span className="text-xs">{isZh ? '福利' : 'Gift'}</span>
				</div>
			</div>
		</div>
	);

	const progressBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '会员等级' : 'VIP Level'} <span className="opacity-50">Progress</span>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between text-xs">
					<span className={textSubtle}>Lv.3</span>
					<span className={textSubtle}>1680/2000 {isZh ? '经验' : 'EXP'}</span>
					<span className={textSubtle}>Lv.4</span>
				</div>
				<Progress percent={84} height="2" />
				<Progress percent={65} height="4" percentPosition="block" />
			</div>
		</div>
	);

	const rateBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '商品评分' : 'Product Rating'} <span className="opacity-50">Rate</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<span className="text-2xl font-bold">{rateValue}</span>
						<span className={`text-xs ${textSubtle}`}>{isZh ? '综合评分' : 'Overall'}</span>
					</div>
					<Rate value={rateValue} onClick={setRateValue} half />
				</div>
			</Card>
		</div>
	);

	const switchBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '偏好设置' : 'Settings'} <span className="opacity-50">Switch</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<span className="text-sm">{isZh ? '消息通知' : 'Notifications'}</span>
						<Switch active={notifySwitch} onChange={setNotifySwitch} />
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm">{isZh ? '自动更新' : 'Auto Update'}</span>
						<Switch active={autoUpdateSwitch} onChange={setAutoUpdateSwitch} inside="state" />
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm">{isZh ? '位置服务' : 'Location'}</span>
						<Switch active={locationSwitch} onChange={setLocationSwitch} />
					</div>
				</div>
			</Card>
		</div>
	);

	const sliderBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '音量调节' : 'Volume'} <span className="opacity-50">Slider</span>
			</div>
			<div className="flex items-center gap-3 px-2 pt-5">
				<svg className="size-5 fill-current" viewBox="0 0 24 24">
					<path d="M10 7.22 6.603 10H3v4h3.603L10 16.78zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387zm14.525-4 3.536 3.536-1.415 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.465l1.414-1.415L19 10.586l3.535-3.536 1.415 1.415z" />
				</svg>
				<div className="flex-1">
					<Slider value={sliderValue} onChange={setSliderValue} showTip="always" />
				</div>
				<svg className="size-5 fill-current" viewBox="0 0 24 24">
					<path d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z" />
				</svg>
			</div>
			<div className="mt-4 px-2 pt-12">
				<Slider lineBlock showTip="never" value={sliderBarValue} onChange={(v) => setSliderBarValue(v)}>
					<div className="relative grow items-end">
						<div className="flex items-end justify-between overflow-hidden" style={{ transform: 'translateY(-22px)' }}>
							{barList.map((item, i) => (
								<div
									className={`w-1 rounded-full ${
										i / 40 < sliderBarValue / 100 ? (dark ? 'bg-dark' : 'bg-primary') : dark ? 'bg-gray-500' : 'bg-gray-200'
									}`}
									style={{ height: `${item}px` }}
									key={i}
								></div>
							))}
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);

	const radioBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '支付方式' : 'Payment'} <span className="opacity-50">Radio</span>
			</div>
			<Radio data={paymentData} value={radioValue} onChange={setRadioValue} />
		</div>
	);

	const inputBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '用户登录' : 'User Login'} <span className="opacity-50">Input</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0">
				<div className="flex flex-col gap-3">
					<Input
						value={username}
						onChange={setUsername}
						placeholder={isZh ? '请输入用户名' : 'Username'}
						label1={{ name: 'ri-user-3-line', size: 18 }}
						clear
					/>
					<Input
						value={password}
						onChange={setPassword}
						type="password"
						placeholder={isZh ? '请输入密码' : 'Password'}
						label1={{ name: 'ri-lock-line', size: 18 }}
						clear
					/>
					<Input placeholder={isZh ? '请输入用户名' : 'Username'} label1={{ name: 'ri-user-3-line', size: 18 }} inputStyle="line" clear />
				</div>
			</Card>
		</div>
	);

	const noticeBarBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '活动通知' : 'Notice'} <span className="opacity-50">NoticeBar</span>
			</div>
			<NoticeBar
				textList={[
					isZh ? '双 12 大促进行中，全场满 300 减 50！' : 'Holiday Sale: Get $50 off on orders over $300!',
					isZh ? '新用户注册即送 100 元优惠券！' : 'New users get $100 coupon on signup!'
				]}
				leftIcon="volume"
				vertical
			/>
			<div className="mt-3">
				<NoticeBar
					textList={[
						isZh
							? '欢迎来到 RTDF 主题生成器，快来定制属于你的专属主题吧！'
							: 'Welcome to RTDF Theme Generator, customize your own theme now!'
					]}
					rightIcon={null}
					leftChild={<span className="text-base">🥳</span>}
				/>
			</div>
		</div>
	);

	const tabsBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '商品分类' : 'Categories'} <span className="opacity-50">Tab</span>
			</div>
			<div className="flex flex-col gap-3">
				<Tab labels={categoryLabels} active={activeTabIndex} onClickTab={setActiveTabIndex} mx="0" />
				<Tab labels={categoryLabels} active={activeTabIndex} onClickTab={setActiveTabIndex} mx="0" lineType />
			</div>
		</div>
	);

	const stepperBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '购物车商品' : 'Cart Item'} <span className="opacity-50">Stepper</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" p="3">
				<div className="flex gap-3">
					<div className="rounded-box h-20 w-20 shrink-0 overflow-hidden">
						<img src={randomWallImage} alt="product" className="h-full w-full object-cover" />
					</div>
					<div className="flex flex-1 flex-col justify-between">
						<div>
							<div className="text-sm font-medium">{isZh ? '无线蓝牙耳机 Pro' : 'Wireless Earbuds Pro'}</div>
							<div className={`text-xs ${textSubtle}`}>{isZh ? '颜色：星空黑 | 规格：标准版' : 'Black | Standard'}</div>
						</div>
						<div className="flex items-center justify-between">
							<span className={`${textTheme} font-bold`}>¥299</span>
							<Stepper value={productCount} onChange={setProductCount} min={1} max={10} />
						</div>
					</div>
				</div>
			</Card>
		</div>
	);

	const cellBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '账户设置' : 'Account Settings'} <span className="opacity-50">Cell</span>
			</div>
			<div className="overflow-hidden rounded-lg">
				<Cell title={isZh ? '个人资料' : 'Profile'} right="arrow" />
				<Cell title={isZh ? '账户安全' : 'Security'} right="arrow" />
				<Cell title={isZh ? '深色模式' : 'Dark Mode'} right={{ type: 'switch' }} />
			</div>
		</div>
	);

	const skeletonBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '加载占位' : 'Skeleton'} <span className="opacity-50">Skeleton</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" p="3">
				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<Skeleton type="img" width="12" height="12" />
						<div className="flex flex-1 flex-col gap-2">
							<Skeleton type="p" width="16" height="2" />
							<Skeleton type="p" width="full" height="2" />
							<Skeleton type="p" width="12" height="2" />
						</div>
					</div>
					<div className="grid grid-cols-5 gap-2">
						{skeletonIconPreviewTypes.map((type) => (
							<div className="flex min-w-0 flex-col items-center gap-1" key={type}>
								<Skeleton type={type} width="8" height="8" iconRatio={0.62} />
								<span className="w-full truncate text-center text-xs opacity-60">{type}</span>
							</div>
						))}
					</div>
				</div>
			</Card>
		</div>
	);

	const dividerBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '内容分隔' : 'Divider'} <span className="opacity-50">Divider</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
				<div className="text-sm">{isZh ? '上方内容' : 'Content above'}</div>
				<Divider text={isZh ? '分隔线' : 'Divider'} />
				<div className="text-sm">{isZh ? '下方内容' : 'Content below'}</div>
			</Card>
		</div>
	);

	const avatarBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '用户头像' : 'User Avatar'} <span className="opacity-50">Avatar</span>
			</div>
			<div className="flex items-end justify-around">
				<Avatar image="/assets/images/home/wall_1.jpg" size="sm" />
				<Avatar image="/assets/images/home/wall_2.jpg" size="base" />
				<Avatar image="/assets/images/home/wall_3.jpg" size="md" />
				<Avatar icon={{ name: 'ri-user-3-line', size: 32 }} size="md" />
			</div>
			<div className="mt-4 pl-4">
				<AvatarGroup
					data={[
						{ image: '/assets/images/home/wall_1.jpg' },
						{ image: '/assets/images/home/wall_2.jpg' },
						{ image: '/assets/images/home/wall_3.jpg' },
						{ image: '/assets/images/home/wall_4.jpg' },
						{ image: '/assets/images/home/avatar_1.jpg' }
					]}
				/>
			</div>
		</div>
	);

	const paginationBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '分页器' : 'Pagination'} <span className="opacity-50">Pagination</span>
			</div>
			<div className="flex flex-col gap-28 pt-20">
				<Pagination total={100} pageSize={10} current={currentPage} onChange={setCurrentPage} maxShowPage={5} showNextOmitPage />
				<Pagination total={100} pageSize={10} current={currentPage2} onChange={setCurrentPage2} maxShowPage={5} type="block" />
			</div>
		</div>
	);

	const numKeyboardBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '数字键盘' : 'NumKeyboard'} <span className="opacity-50">NumKeyboard</span>
			</div>
			<div className={`${bgSurface} mb-2 flex h-10 items-center justify-between rounded-sm px-3`}>
				<span className={`text-xs ${textSubtle}`}>{isZh ? '输入金额' : 'Amount'}</span>
				<span className="font-bold">{numKeyboardValue || '0.00'}</span>
			</div>
			<NumKeyboard
				value={numKeyboardValue}
				onClick={(key) =>
					setNumKeyboardValue((prev) => (key === 'delete' ? prev.slice(0, -1) : key === 'done' || key === 'close' ? prev : prev + key))
				}
				popup={null}
				height="10"
			/>
		</div>
	);

	const checkboxBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '用户协议' : 'Agreement'} <span className="opacity-50">Checkbox</span>
			</div>
			<Checkbox data={checkboxData} checkeds={checkboxValues} onChange={setCheckboxValues} />
		</div>
	);

	const lineChartBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '折线图' : 'Line Chart'} <span className="opacity-50">Extend Colors</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="3">
				<div className="mb-3 flex items-center gap-4">
					{[0, 1, 2, 3].map((i) =>
						extendList[i] ? (
							<div className="flex items-center gap-1" key={i}>
								<span className="h-2 w-2 rounded-full" style={{ backgroundColor: getExtendColor(i) }}></span>
								<span className="text-xs">{extendList[i]?.alias || `C${i + 1}`}</span>
							</div>
						) : null
					)}
				</div>
				<svg className="h-40 w-full" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet">
					{/* Y 轴刻度线 */}
					<line x1="40" y1="20" x2="300" y2="20" stroke="currentColor" strokeOpacity="0.1" />
					<line x1="40" y1="50" x2="300" y2="50" stroke="currentColor" strokeOpacity="0.1" />
					<line x1="40" y1="80" x2="300" y2="80" stroke="currentColor" strokeOpacity="0.1" />
					<line x1="40" y1="110" x2="300" y2="110" stroke="currentColor" strokeOpacity="0.1" />
					<line x1="40" y1="140" x2="300" y2="140" stroke="currentColor" strokeOpacity="0.1" />
					{/* Y 轴标签 */}
					<text x="30" y="24" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="10">
						600
					</text>
					<text x="30" y="54" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="10">
						450
					</text>
					<text x="30" y="84" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="10">
						300
					</text>
					<text x="30" y="114" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="10">
						150
					</text>
					<text x="30" y="144" textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="10">
						0
					</text>
					{/* X 轴标签 */}
					<text x="70" y="155" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="10">
						10-13
					</text>
					<text x="147" y="155" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="10">
						10-14
					</text>
					<text x="223" y="155" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="10">
						10-15
					</text>
					<text x="300" y="155" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="10">
						10-16
					</text>
					{/* 折线 1 */}
					{extendList[0] ? (
						<>
							<path
								d="M70 25 Q108 60 147 95 T223 70 T300 55"
								fill="none"
								stroke={getExtendColor(0)}
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<circle cx="70" cy="25" r="3" fill={getExtendColor(0)} />
							<circle cx="147" cy="95" r="3" fill={getExtendColor(0)} />
							<circle cx="223" cy="70" r="3" fill={getExtendColor(0)} />
							<circle cx="300" cy="55" r="3" fill={getExtendColor(0)} />
						</>
					) : null}
					{/* 折线 2 */}
					{extendList[1] ? (
						<>
							<path
								d="M70 35 Q108 55 147 65 T223 120 T300 20"
								fill="none"
								stroke={getExtendColor(1)}
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<circle cx="70" cy="35" r="3" fill={getExtendColor(1)} />
							<circle cx="147" cy="65" r="3" fill={getExtendColor(1)} />
							<circle cx="223" cy="120" r="3" fill={getExtendColor(1)} />
							<circle cx="300" cy="20" r="3" fill={getExtendColor(1)} />
						</>
					) : null}
					{/* 折线 3 */}
					{extendList[2] ? (
						<>
							<path
								d="M70 80 Q108 45 147 50 T223 85 T300 40"
								fill="none"
								stroke={getExtendColor(2)}
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<circle cx="70" cy="80" r="3" fill={getExtendColor(2)} />
							<circle cx="147" cy="50" r="3" fill={getExtendColor(2)} />
							<circle cx="223" cy="85" r="3" fill={getExtendColor(2)} />
							<circle cx="300" cy="40" r="3" fill={getExtendColor(2)} />
						</>
					) : null}
					{/* 折线 4 */}
					{extendList[3] ? (
						<>
							<path
								d="M70 110 Q108 100 147 75 T223 100 T300 85"
								fill="none"
								stroke={getExtendColor(3)}
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<circle cx="70" cy="110" r="3" fill={getExtendColor(3)} />
							<circle cx="147" cy="75" r="3" fill={getExtendColor(3)} />
							<circle cx="223" cy="100" r="3" fill={getExtendColor(3)} />
							<circle cx="300" cy="85" r="3" fill={getExtendColor(3)} />
						</>
					) : null}
				</svg>
			</Card>
		</div>
	);

	const fullKeyboardBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '全键盘' : 'Full Keyboard'} <span className="opacity-50">FullKeyboard</span>
			</div>
			<div className={`${bgSurface} mb-2 flex h-10 items-center justify-between rounded-sm px-3`}>
				<span className={`text-xs ${textSubtle}`}>{isZh ? '输入内容' : 'Input'}</span>
				<span className="font-bold">{fullKeyboardValue || (isZh ? '请输入' : 'Type here')}</span>
			</div>
			<FullKeyboard
				value={fullKeyboardValue}
				onClick={(key) =>
					setFullKeyboardValue((prev) => (key === 'delete' ? prev.slice(0, -1) : key === 'done' || key === 'close' ? prev : prev + key))
				}
				popup={null}
			/>
		</div>
	);

	const pieChartBlock = (
		<div className="break-inside-avoid">
			<div className={`mb-2 text-xs font-medium ${textMuted}`}>
				{isZh ? '环形图' : 'Donut Chart'} <span className="opacity-50">Extend Colors</span>
			</div>
			<Card bg="gray" shadow="none" mx="0" my="0" px="4" py="4">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-2">
						{[0, 1, 2, 3].map((i) =>
							extendList[i] ? (
								<div className="flex items-center gap-2" key={i}>
									<span className="h-2 w-2 rounded-full" style={{ backgroundColor: getExtendColor(i) }}></span>
									<span className="text-xs">
										{extendList[i]?.alias || `C${i + 1}`}: {[1600, 1000, 400, 200][i]}
									</span>
								</div>
							) : null
						)}
					</div>
					<svg className="h-32 w-32 shrink-0" viewBox="0 0 160 160">
						{/* 环形图背景 */}
						<circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="20" />
						{/* 扇区 1: 50% */}
						{extendList[0] ? (
							<circle
								cx="80"
								cy="80"
								r="60"
								fill="none"
								stroke={getExtendColor(0)}
								strokeWidth="20"
								strokeDasharray="188.5 377"
								strokeDashoffset="94.25"
								transform="rotate(-90 80 80)"
							/>
						) : null}
						{/* 扇区 2: 31.25% */}
						{extendList[1] ? (
							<circle
								cx="80"
								cy="80"
								r="60"
								fill="none"
								stroke={getExtendColor(1)}
								strokeWidth="20"
								strokeDasharray="117.8 377"
								strokeDashoffset="-94.25"
								transform="rotate(-90 80 80)"
							/>
						) : null}
						{/* 扇区 3: 12.5% */}
						{extendList[2] ? (
							<circle
								cx="80"
								cy="80"
								r="60"
								fill="none"
								stroke={getExtendColor(2)}
								strokeWidth="20"
								strokeDasharray="47.1 377"
								strokeDashoffset="-212.05"
								transform="rotate(-90 80 80)"
							/>
						) : null}
						{/* 扇区 4: 6.25% */}
						{extendList[3] ? (
							<circle
								cx="80"
								cy="80"
								r="60"
								fill="none"
								stroke={getExtendColor(3)}
								strokeWidth="20"
								strokeDasharray="23.6 377"
								strokeDashoffset="-259.15"
								transform="rotate(-90 80 80)"
							/>
						) : null}
						{/* 中心文字 */}
						<text x="80" y="72" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="10">
							{isZh ? '总量' : 'Total'}
						</text>
						<text x="80" y="92" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold">
							3,200
						</text>
					</svg>
				</div>
			</Card>
		</div>
	);

	const blocks = [
		swiperBlock,
		buttonBlock,
		badgeBlock,
		calendarBlock,
		illustrationBlock,
		stepsBlock,
		loadingBlock,
		progressLoopBlock,
		iconBlock,
		progressBlock,
		rateBlock,
		switchBlock,
		sliderBlock,
		radioBlock,
		inputBlock,
		noticeBarBlock,
		tabsBlock,
		stepperBlock,
		cellBlock,
		skeletonBlock,
		dividerBlock,
		avatarBlock,
		paginationBlock,
		numKeyboardBlock,
		checkboxBlock,
		lineChartBlock,
		pieChartBlock,
		fullKeyboardBlock,
		tagBlock
	];

	return (
		<ConfigProvider locale={isZh ? zh_CN : en_US} builtInIconLibrary={builtInIconLibrary} syncTheme={false}>
			<div
				data-site-component-preview
				className={`generator-preview-columns mx-auto px-6 py-5 [&>div]:mb-6 [&>div]:border-b [&>div]:pb-6 ${
					dark ? 'bg-bg-base-dark text-text-dark [&>div]:border-white/10' : 'bg-bg-base text-text-primary [&>div]:border-black/10'
				}`}
			>
				{componentOrder.map((index) => cloneElement(blocks[index], { key: index }))}
			</div>
		</ConfigProvider>
	);
};

export default GeneratorPreview;
