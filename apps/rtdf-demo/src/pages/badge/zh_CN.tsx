import { useState } from 'react';
import { Badge, Avatar, Button, Icon, Input, Cell, Slider } from 'rtdf/components';
import type { BadgeProps } from 'rtdf/types';

function BadgeZh() {
	const [isShow, setIsShow] = useState(true);

	const radiusOptions: BadgeProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	const [radiusIndex, setRadiusIndex] = useState(6);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">基础用法</div>
			<div className="flex justify-around p-4">
				<Badge>
					<Avatar />
				</Badge>
				<Badge text="24">
					<Avatar />
				</Badge>
				<Badge text="99+">
					<Avatar />
				</Badge>
				<Badge text="New">
					<Avatar />
				</Badge>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">不同圆角</div>
			<div className="px-4 py-2">
				<Slider
					value={radiusIndex}
					minRange={0}
					maxRange={7}
					step={1}
					showSteps
					stepLabels={radiusLabels}
					onChange={(value: number) => setRadiusIndex(value)}
				/>
			</div>
			<div className="flex justify-around p-4">
				<Badge radius={currentRadius}>
					<Avatar />
				</Badge>
				<Badge text="24" radius={currentRadius}>
					<Avatar />
				</Badge>
				<Badge text="99+" radius={currentRadius}>
					<Avatar />
				</Badge>
				<Badge text="Hot" radius={currentRadius}>
					<Avatar />
				</Badge>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">位于左侧</div>
			<div className="flex justify-around p-4">
				<Badge isLeft>
					<Avatar />
				</Badge>
				<Badge isLeft text="24">
					<Avatar />
				</Badge>
				<Badge isLeft text="24" radius="leaf">
					<Avatar />
				</Badge>
				<Badge isLeft text="厉害">
					<Avatar />
				</Badge>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">搭配其他组件</div>
			<div className="flex justify-around p-4">
				<Badge text="帅" radius="leaf">
					<Icon name="ri-spy-fill" />
				</Badge>
				<Badge text="棒" radius="leaf">
					<Icon name="ri-medal-fill" />
				</Badge>
				<Badge text="Happy" radius="leaf" offsetX={-12}>
					<Icon name="ri-cake-2-fill" />
				</Badge>
			</div>
			<Badge text="Hot" offsetX={18} offsetY={8}>
				<Button>搭配 Button</Button>
			</Badge>
			<Badge text="必填" offsetX={18} offsetY={26}>
				<Input title="搭配 Input" />
			</Badge>
			<Cell title="搭配 Cell" detailChild={<Badge isInner />} />
			<Cell title="搭配 Cell" line={false} detailChild={<Badge text="99+" isInner />} />
			<Cell title="搭配无圆角 Cell" radius="none" detailChild={<Badge text="新版本" radius="lg" isInner />} />
			<Cell title="搭配全圆角 Cell" radius="4xl" detailChild={<Badge isInner />} />

			<div className="mx-4 mt-8 text-lg font-bold">徽标动画</div>
			<div className="flex justify-around p-4">
				<Badge isShow={isShow}>
					<Avatar />
				</Badge>
				<Badge text="24" isShow={isShow}>
					<Avatar />
				</Badge>
				<Badge text="24" radius="lg" isShow={isShow}>
					<Avatar />
				</Badge>
				<Badge text="Hot" radius="leaf" isShow={isShow}>
					<Avatar />
				</Badge>
			</div>
			<Cell title={!isShow ? '隐藏' : '显示'} detailChild={<Badge isInner isShow={isShow} />} />
			<Button onClick={() => setIsShow(!isShow)}>点击{isShow ? '隐藏' : '显示'}徽标</Button>

			<div className="mx-4 mt-8 text-lg font-bold">自定义背景色与边框</div>
			<div className="flex justify-around p-4">
				<Badge text="Theme" injClass="!bg-primary dark:!bg-dark text-white dark:text-black">
					<Avatar />
				</Badge>
				<Badge text="New" injClass="bg-linear-to-r from-primary to-info dark:from-dark dark:to-info">
					<Avatar />
				</Badge>
				<Badge radius="lg" injClass="ring-2 ring-black/10 dark:ring-white/20">
					<Avatar image="/assets/images/avatar_1.jpg" />
				</Badge>
				<Badge offsetX={9} offsetY={9} injClass="ring-2 ring-black/10 dark:ring-white/20">
					<Avatar radius="full" image="/assets/images/avatar_1.jpg" />
				</Badge>
			</div>
		</div>
	);
}

export default BadgeZh;
