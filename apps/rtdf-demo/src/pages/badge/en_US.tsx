import { useState } from 'react';
import { Avatar, Badge, Button, Cell, Icon, Input, Slider } from 'rtdf/components';
import type { BadgeProps } from 'rtdf/types';

const BadgeEn = () => {
	const [isShow, setIsShow] = useState(true);

	const radiusOptions: BadgeProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'leaf'];
	const [radiusIndex, setRadiusIndex] = useState(6);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">Basic usage</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">Different rounded corners</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">Located on the left</div>
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
				<Badge isLeft text="sharp">
					<Avatar />
				</Badge>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Match other components</div>
			<div className="flex justify-around p-4">
				<Badge text="Cool" radius="leaf" offsetX={-6}>
					<Icon name="ri-spy-fill" />
				</Badge>
				<Badge text="Great" radius="leaf" offsetX={-10}>
					<Icon name="ri-medal-fill" />
				</Badge>
				<Badge text="Happy" radius="leaf" offsetX={-12}>
					<Icon name="ri-cake-2-fill" />
				</Badge>
			</div>
			<Badge text="Hot" offsetX={18} offsetY={8}>
				<Button>Match Button</Button>
			</Badge>
			<Badge text="Required" offsetX={30} offsetY={26}>
				<Input title="Match Input" />
			</Badge>
			<Cell title="Match Cell" detailChild={<Badge isInner />} />
			<Cell title="Match Cell" line={false} detailChild={<Badge text="99+" isInner />} />
			<Cell title="Match no radius corner Cell" radius="none" detailChild={<Badge text="new version" radius="lg" isInner />} />
			<Cell title="Match full radius Cell" radius="4xl" detailChild={<Badge isInner />} />

			<div className="mx-4 mt-8 text-lg font-bold">Badge animation</div>
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
			<Cell title={!isShow ? 'Hidden' : 'Show'} detailChild={<Badge isInner isShow={isShow} />} />
			<Button onClick={() => setIsShow(!isShow)}>Click {isShow ? 'Hidden' : 'Show'} Badge</Button>

			<div className="mx-4 mt-8 text-lg font-bold">Custom background color and border</div>
			<div className="flex justify-around p-4">
				<Badge text="Theme" injClass="!bg-primary dark:!bg-dark text-white dark:text-black">
					<Avatar />
				</Badge>
				<Badge text="New" injClass="rtdf-demo-gradient-primary">
					<Avatar />
				</Badge>
				<Badge radius="lg" injClass="rtdf-demo-ring-neutral">
					<Avatar image="/assets/images/avatar_1.jpg" />
				</Badge>
				<Badge offsetX={9} offsetY={9} injClass="rtdf-demo-ring-neutral">
					<Avatar radius="full" image="/assets/images/avatar_1.jpg" />
				</Badge>
			</div>
		</div>
	);
};

export default BadgeEn;
