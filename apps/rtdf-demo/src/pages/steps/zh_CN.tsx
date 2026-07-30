import { useState } from 'react';
import { Steps, Button, ButtonGroup, Divider, Icon, Avatar } from 'rtdf/components';
import type { ButtonGroupItemProps, StepsItemProps } from 'rtdf/types';

function StepsZh() {
	const steps: StepsItemProps[] = [
		{ step: { title: '起床' } },
		{ step: { title: '吃饭' } },
		{ step: { title: '喝水' } },
		{ step: { title: '打豆豆' } },
		{ step: { title: '睡觉' } }
	];
	const steps1: StepsItemProps[] = [
		{ step: { title: '起床', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{ step: { title: '吃饭', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: '喝水', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{ step: { title: '打豆豆', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } } },
		{ step: { title: '睡觉', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];
	const steps2: StepsItemProps[] = [
		{ step: { title: '起床' }, finishStep: { title: '已起床' } },
		{ step: { title: '吃饭' }, finishStep: { title: '吃饱了' } },
		{ step: { title: '喝水' }, finishStep: { title: '喝足了' } },
		{ step: { title: '打豆豆' }, finishStep: { title: '打爽了' } },
		{ step: { title: '睡觉' }, finishStep: { title: '睡着了' } }
	];
	const steps3: StepsItemProps[] = [
		{
			step: { title: '起床', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
			finishStep: { title: '已起床', bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } } }
		},
		{
			step: { title: '吃饭', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
			finishStep: { title: '吃饱了', bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } } }
		},
		{
			step: { title: '喝水', bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
			finishStep: { title: '喝足了', bar: { type: 'icon', content: { name: 'ri-cup-fill' } } }
		},
		{
			step: { title: '打豆豆', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
			finishStep: { title: '打爽了', bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } } }
		},
		{
			step: { title: '睡觉', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
			finishStep: { title: '睡着了', bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
		}
	];
	const steps4: StepsItemProps[] = [
		{ step: { title: '起床', desc: '起床搬砖了！' } },
		{ step: { title: '吃饭', desc: '吃吃吃，肥死你。' } },
		{ step: { title: '喝水', desc: '慢慢走路，多多喝水。' } },
		{
			step: {
				title: '打豆豆',
				desc: '吃饭睡觉，打豆豆很爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽。顺便验证进度条高度自适应步骤文字高度。'
			}
		},
		{ step: { title: '睡觉', desc: '吃太饱，睡不着。' } }
	];
	const steps5: StepsItemProps[] = [
		{ step: { title: '起床', desc: '起床搬砖了！', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{ step: { title: '吃饭', desc: '吃吃吃，肥死你。', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: '喝水', desc: '慢慢走路，多多喝水。', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{
			step: {
				title: '打豆豆',
				desc: '吃饭睡觉，打豆豆很爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽爽。顺便验证进度条高度自适应步骤文字高度。',
				bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } }
			}
		},
		{ step: { title: '睡觉', desc: '吃太饱，睡不着。', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];
	const steps6: StepsItemProps[] = [
		{
			step: { title: '起床', desc: '起床搬砖了！', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
			finishStep: { title: '已起床', desc: '砖已经搬完了！', bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } } }
		},
		{
			step: { title: '吃饭', desc: '吃吃吃，肥死你。', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
			finishStep: { title: '吃饱了', desc: '饭已经全部被吃完了！', bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } } }
		},
		{
			step: { title: '喝水', desc: '慢慢走路，多多喝水。', bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
			finishStep: { title: '喝足了', desc: '水喝太多，从眼睛里溢出来了！', bar: { type: 'icon', content: { name: 'ri-cup-fill' } } }
		},
		{
			step: { title: '打豆豆', desc: '吃饭睡觉，打豆豆。', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
			finishStep: { title: '打爽了', desc: '豆豆已经被打趴下了。', bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } } }
		},
		{
			step: { title: '睡觉', desc: '吃太饱，睡不着。', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
			finishStep: { title: '睡着了', desc: '睡着了正在做梦呢！', bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
		}
	];
	const steps7: StepsItemProps[] = [
		{ step: { title: '起床', desc: '起床搬砖了！', bar: { type: 'string', content: '1' } } },
		{ step: { title: '吃饭', desc: '吃吃吃，肥死你。', bar: { type: 'string', content: '吃' } } },
		{ step: { title: '喝水', desc: '慢慢走路，多多喝水。', bar: { type: 'string', content: '3' } } },
		{ step: { title: '打豆豆', desc: '吃饭睡觉，打豆豆。', bar: { type: 'string', content: '5' } } },
		{ step: { title: '睡觉', desc: '吃太饱，睡不着。', bar: { type: 'string', content: '😴' } } }
	];
	const steps8: StepsItemProps[] = [
		{ step: { title: '起床', bar: { type: 'image', content: '/assets/images/avatar_2.png' } } },
		{ step: { title: '吃饭', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: '喝水', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{ step: { title: '打豆豆', bar: { type: 'image', content: '/assets/images/avatar_1.jpg' } } },
		{ step: { title: '睡觉', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];

	const InjCom1 = () => (
		<div className="text-sm text-primary dark:text-dark">
			<div>此处以组件形式注入一张图片</div>
			<div className="h-20 w-20 overflow-hidden rounded-full">
				<img src="/assets/images/avatar_1.jpg" alt="" />
			</div>
		</div>
	);

	const InjCom2 = () => (
		<>
			<div className="text-sm text-primary dark:text-dark">此处以组件形式注入一些内容</div>
			<div className="flex items-center space-x-4">
				<Button size="full" heightIn="2" injClass="px-4">
					按钮
				</Button>
				<Avatar image="/assets/images/avatar_1.jpg" size="sm" />
				<Icon name="ri-money-cny-circle-line" theme />
				<Icon name="ri-fingerprint-line" theme />
			</div>
		</>
	);

	const steps9: StepsItemProps[] = [
		{ step: { title: '起床', desc: '起床搬砖了！', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{
			step: {
				title: '吃饭',
				desc: '吃吃吃，肥死你。',
				bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } },
				injComponent: InjCom1
			}
		},
		{ step: { title: '喝水', desc: '慢慢走路，多多喝水。', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{
			step: {
				title: '打豆豆',
				desc: '吃饭睡觉，打豆豆。',
				bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } },
				injComponent: InjCom2
			}
		},
		{ step: { title: '睡觉', desc: '吃太饱，睡不着。', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];

	const [current, setCurrent] = useState(1);
	const stepButtons: ButtonGroupItemProps[] = [
		{ text: '上一步', icon: { name: 'ri-arrow-left-s-line', size: 18 }, onClick: () => current > 1 && setCurrent(current - 1) },
		{
			text: '下一步',
			icon: { name: 'ri-arrow-right-s-line', size: 18 },
			iconPosition: 'right',
			onClick: () => current < steps.length + 1 && setCurrent(current + 1)
		}
	];

	return (
		<>
			<div className="mb-4 mt-8 px-4 text-2xl font-bold">横向排列</div>
			<div className="mb-4 mt-8 px-4 text-lg font-bold">简单用法</div>
			<Steps steps={steps} current={current} />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">不同圆角</div>
			<Steps steps={steps} current={current} radius="none" />
			<Steps steps={steps} current={current} radius="full" />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">带图标</div>
			<Steps steps={steps1} current={current} />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">图标不同边框</div>
			<Steps steps={steps1} current={current} barBorder={false} />
			<Steps steps={steps1} current={current} barBorder={false} radius="full" />
			<Steps steps={steps1} current={current} radius="none" />
			<Steps steps={steps1} current={current} radius="xl" />
			<Steps steps={steps1} current={current} radius="full" />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">带完成步骤</div>
			<Steps steps={steps2} current={current} />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">带图标 && 完成步骤</div>
			<Steps steps={steps3} current={current} />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">步骤栏区域使用文字</div>
			<Steps steps={steps7} current={current} />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">步骤栏区域使用图片</div>
			<Steps steps={steps8} current={current} />
			<Steps steps={steps8} radius="full" current={current} />
			<Divider />

			<div className="mb-4 mt-4 px-4 text-2xl font-bold">纵向排列</div>
			<div className="mb-4 mt-8 px-4 text-lg font-bold">不同圆角</div>
			<div className="flex justify-around">
				<Steps steps={steps} current={current} vertical />
				<Steps steps={steps} current={current} radius="none" vertical />
				<Steps steps={steps} current={current} radius="full" vertical />
			</div>

			<div className="mb-4 mt-8 px-4 text-lg font-bold">图标不同边框</div>
			<div className="flex justify-around">
				<Steps steps={steps1} current={current} vertical />
				<Steps steps={steps1} current={current} vertical radius="full" barBorder={false} />
			</div>
			<Divider px="8" />
			<div className="flex justify-around">
				<Steps steps={steps1} current={current} vertical barBorder={false} radius="none" />
				<Steps steps={steps1} current={current} vertical radius="none" />
			</div>
			<Divider px="8" />
			<div className="flex justify-around">
				<Steps steps={steps1} current={current} vertical radius="xl" />
				<Steps steps={steps1} current={current} vertical radius="full" />
			</div>

			<div className="mb-4 mt-8 px-4 text-lg font-bold">带描述信息</div>
			<Steps steps={steps4} current={current} vertical />
			<Divider px="8" />
			<Steps steps={steps5} current={current} vertical />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">带完成步骤</div>
			<Steps steps={steps6} current={current} vertical />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">步骤栏区域使用文字</div>
			<Steps steps={steps7} current={current} vertical />

			<div className="mb-4 mt-8 px-4 text-lg font-bold">步骤栏区域使用图片</div>
			<div className="flex justify-around">
				<Steps steps={steps8} current={current} vertical />
				<Steps steps={steps8} current={current} radius="full" vertical />
			</div>

			<div className="mb-4 mt-8 px-4 text-lg font-bold">内容区域注入元素</div>
			<Steps steps={steps9} current={current} vertical />

			<div className="sticky bottom-0 z-10 bg-white/50 backdrop-blur-sm dark:bg-black/50">
				<ButtonGroup items={stepButtons} fill="lineState" size="full" />
			</div>
		</>
	);
}

export default StepsZh;
