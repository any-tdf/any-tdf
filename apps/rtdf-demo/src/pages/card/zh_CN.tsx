import { useMemo, useRef, useState } from 'react';
import { ActionPopover, Button, Card, Icon, Slider, Steps, Toast } from 'rtdf/components';
import type { ActionProps, LargeAreaRadius, StepsItemProps } from 'rtdf/types';

const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

const logisticsSteps: StepsItemProps[] = [
	{ step: { title: '快件已到达【北京朝阳区营业点】', desc: '2024-01-15 14:30' } },
	{ step: { title: '快件已从【上海转运中心】发出', desc: '2024-01-14 22:15' } },
	{ step: { title: '商家已发货', desc: '2024-01-14 18:00' } }
];

const userActions: ActionProps[] = [
	{ content: '编辑', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: '分享', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: '删除', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
];

function CardZh() {
	const [radiusIndex, setRadiusIndex] = useState(4);
	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [userActionVisible, setUserActionVisible] = useState(false);
	const userActionTrigger = useRef<HTMLButtonElement | null>(null);

	const currentRadius = useMemo(() => radiusValues[radiusIndex], [radiusIndex]);

	const showToast = (message: string) => {
		setToastMessage(message);
		setToastVisible(true);
	};

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">基础用法</div>
			<Card>
				<div className="text-center">这是一个基础卡片</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">背景类型</div>
			<Card bg="surface">
				<div className="text-sm">表面背景 bg="surface"（默认）</div>
			</Card>
			<Card bg="gray" shadow="none">
				<div className="text-sm">灰色透明背景 bg="gray"</div>
			</Card>
			<Card bg="theme" shadow="none">
				<div className="text-sm">主题色透明背景 bg="theme"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">不同圆角</div>
			<Card radius={currentRadius}>
				<div className="text-center text-sm">radius="{currentRadius}"</div>
			</Card>
			<div className="px-4">
				<Slider
					value={radiusIndex}
					maxRange={7}
					step={1}
					showSteps
					stepsStyle="break"
					stepLabels={radiusValues}
					onChange={(value: number) => setRadiusIndex(value)}
				/>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">不同阴影</div>
			<Card shadow="none">
				<div className="text-sm">无阴影 shadow="none"</div>
			</Card>
			<Card shadow="xs">
				<div className="text-sm">超小阴影 shadow="xs"</div>
			</Card>
			<Card shadow="sm">
				<div className="text-sm">小阴影 shadow="sm"（默认）</div>
			</Card>
			<Card shadow="md">
				<div className="text-sm">中等阴影 shadow="md"</div>
			</Card>
			<Card shadow="lg">
				<div className="text-sm">大阴影 shadow="lg"</div>
			</Card>
			<Card shadow="xl">
				<div className="text-sm">超大阴影 shadow="xl"</div>
			</Card>
			<Card shadow="2xl">
				<div className="text-sm">特大阴影 shadow="2xl"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">不同内边距</div>
			<Card p="0">
				<div className="bg-primary/10 p-2 text-sm dark:bg-dark/10">p="0"</div>
			</Card>
			<Card p="2">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="2"</div>
			</Card>
			<Card p="4">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="4"（默认）</div>
			</Card>
			<Card p="8">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="8"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">分别设置内边距</div>
			<Card px="8" py="2">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">px="8" py="2"</div>
			</Card>
			<Card px="2" py="8">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">px="2" py="8"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">边框样式</div>
			<Card border="solid" shadow="none">
				<div className="text-sm">实线边框 border="solid"</div>
			</Card>
			<Card border="dashed" shadow="none">
				<div className="text-sm">虚线边框 border="dashed"</div>
			</Card>
			<Card border="dotted" shadow="none">
				<div className="text-sm">点线边框 border="dotted"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">边框粗细</div>
			<Card border="solid" borderWidth="1" shadow="none">
				<div className="text-sm">边框粗细 1</div>
			</Card>
			<Card border="solid" borderWidth="2" shadow="none">
				<div className="text-sm">边框粗细 2</div>
			</Card>
			<Card border="solid" borderWidth="4" shadow="none">
				<div className="text-sm">边框粗细 4</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">带头部区域</div>
			<Card header={<div className="font-bold">卡片标题</div>}>
				<div className="text-sm">这是卡片的内容区域</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">带底部区域</div>
			<Card
				footer={
					<div className="flex justify-end gap-2">
						<Button size="sm" fill="text">
							取消
						</Button>
						<Button size="sm">确认</Button>
					</div>
				}
			>
				<div className="text-sm">这是卡片的内容区域</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">完整卡片</div>
			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="font-bold">用户信息</div>
						<button
							type="button"
							ref={userActionTrigger}
							className="cursor-pointer border-0 bg-transparent p-0"
							onClick={() => setUserActionVisible((prev) => !prev)}
							aria-label="更多操作"
						>
							<Icon name="ri-more-line" size={20} />
						</button>
						<ActionPopover
							visible={userActionVisible}
							triggerRef={userActionTrigger}
							actions={userActions}
							inlineAlign="right"
							align="left"
							onClose={() => setUserActionVisible(false)}
						/>
					</div>
				}
				footer={
					<div className="flex justify-between text-sm text-gray-500">
						<span>已工作 3 年</span>
						<span>北京</span>
					</div>
				}
			>
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
						<Icon name="ri-user-fill" size={24} />
					</div>
					<div>
						<div className="font-bold">张三</div>
						<div className="text-sm text-gray-500">前端开发工程师</div>
					</div>
				</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">无分隔线</div>
			<Card
				headerLine={false}
				footerLine={false}
				header={<div className="font-bold">卡片标题</div>}
				footer={<div className="text-sm text-gray-500">底部信息</div>}
			>
				<div className="text-sm">这是卡片的内容区域，头部和底部没有分隔线</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">可点击卡片</div>
			<Card onClick={() => showToast('点击了卡片')}>
				<div className="text-sm">这是一个可点击的卡片，点击试试</div>
			</Card>
			<Toast visible={toastVisible} message={toastMessage} onClose={() => setToastVisible(false)} />

			<div className="mx-4 mt-8 text-lg font-bold">自定义样式</div>
			<Card injClass="!bg-primary/10 dark:!bg-dark/10">
				<div className="text-sm">自定义背景颜色</div>
			</Card>
			<Card injClass="ring-2 ring-primary dark:ring-dark">
				<div className="text-sm">自定义环形边框</div>
			</Card>
			<Card headerClass="!bg-primary/10 dark:!bg-dark/10" header={<div className="font-bold">自定义头部样式</div>}>
				<div className="text-sm">内容区域</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">复杂内容</div>
			<Card
				header={
					<div className="flex items-center gap-2">
						<Icon name="ri-article-line" size={20} />
						<span className="font-bold">文章标题</span>
					</div>
				}
				footer={
					<div className="flex items-center justify-between text-sm text-gray-500">
						<span>2024-01-01</span>
						<div className="flex gap-4">
							<span className="flex items-center gap-1">
								<Icon name="ri-eye-line" size={16} />
								1234
							</span>
							<span className="flex items-center gap-1">
								<Icon name="ri-heart-line" size={16} />
								56
							</span>
						</div>
					</div>
				}
			>
				<div className="space-y-2">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						这是一段文章摘要，可以包含多行文本。Card 组件提供了灵活的布局选项，允许您根据需要自定义头部、内容和底部区域。
					</p>
					<div className="flex gap-2">
						<span className="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">标签一</span>
						<span className="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">标签二</span>
					</div>
				</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">业务场景</div>

			<Card p="0" onClick={() => showToast('查看商品详情')}>
				<div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
					<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" className="h-3/4 object-contain" />
				</div>
				<div className="p-3">
					<div className="line-clamp-2 text-sm">Apple AirPods Pro 2 无线蓝牙耳机 主动降噪 MagSafe 充电盒</div>
					<div className="mt-2 flex items-baseline gap-1">
						<span className="text-lg font-bold text-red-500">¥ 1899</span>
						<span className="text-xs text-gray-400 line-through">¥ 1999</span>
					</div>
					<div className="mt-2 flex items-center justify-between text-xs text-gray-500">
						<span>已售 1.2 万</span>
						<span className="flex items-center gap-0.5">
							<Icon name="ri-star-fill" size={12} state="theme" />
							4.9
						</span>
					</div>
				</div>
			</Card>

			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon name="ri-store-2-line" size={18} />
							<span className="font-medium">Apple 官方旗舰店</span>
						</div>
						<span className="text-sm text-primary dark:text-dark">待发货</span>
					</div>
				}
				footer={
					<div className="flex justify-end gap-2">
						<Button size="sm" fill="lineState">
							联系客服
						</Button>
						<Button size="sm">提醒发货</Button>
					</div>
				}
			>
				<div className="flex gap-3">
					<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
						<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" className="h-3/4 object-contain" />
					</div>
					<div className="flex flex-1 flex-col justify-between">
						<div className="line-clamp-2 text-sm">Apple AirPods Pro 2 无线蓝牙耳机</div>
						<div className="flex items-center justify-between">
							<span className="text-xs text-gray-500">白色 × 1</span>
							<span className="font-medium">¥ 1899</span>
						</div>
					</div>
				</div>
			</Card>

			<Card onClick={() => showToast('查看消息详情')}>
				<div className="flex gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
						<Icon name="ri-notification-3-line" size={20} state="theme" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<span className="font-medium">系统通知</span>
							<span className="text-xs text-gray-400">10 分钟前</span>
						</div>
						<p className="mt-1 line-clamp-2 text-sm text-gray-500">您的订单已发货，快递单号： SF1234567890，请注意查收。</p>
					</div>
				</div>
			</Card>

			<Card p="0" border="dashed" shadow="none">
				<div className="flex">
					<div className="flex w-24 shrink-0 flex-col items-center justify-center bg-primary/10 p-3 dark:bg-dark/10">
						<div className="flex items-baseline">
							<span className="text-xs text-primary dark:text-dark">¥</span>
							<span className="text-3xl font-bold text-primary dark:text-dark">50</span>
						</div>
						<div className="text-xs text-gray-500">满 200 可用</div>
					</div>
					<div className="flex flex-1 flex-col justify-between p-3">
						<div>
							<div className="font-medium">新人专享券</div>
							<div className="mt-1 text-xs text-gray-500">全品类通用，部分商品除外</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-xs text-gray-400">2024.12.31 到期</span>
							<Button size="sm">立即使用</Button>
						</div>
					</div>
				</div>
			</Card>

			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon name="ri-truck-line" size={18} state="theme" />
							<span className="font-medium text-primary dark:text-dark">运输中</span>
						</div>
						<span className="text-xs text-gray-500">顺丰快递</span>
					</div>
				}
			>
				<Steps steps={logisticsSteps} current={1} vertical />
			</Card>

			<Card injClass="!bg-linear-to-br !from-primary !to-primary/70 dark:!from-dark dark:!to-dark/70 !text-white">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="ri-bank-card-line" size={24} />
						<span className="font-medium">招商银行</span>
					</div>
					<span className="text-sm opacity-80">储蓄卡</span>
				</div>
				<div className="mt-6 text-2xl tracking-widest">**** **** **** 8888</div>
				<div className="mt-4 flex items-center justify-between text-sm opacity-80">
					<span>张三</span>
					<span>有效期 12/28</span>
				</div>
			</Card>

			<div className="h-8" />
		</div>
	);
}

export default CardZh;
