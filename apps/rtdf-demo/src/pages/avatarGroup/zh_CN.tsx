import { useState } from 'react';
import { AvatarGroup, Icon, Slider } from 'rtdf/components';
import type { AvatarGroupProps } from 'rtdf/types';

const imgNames = [
	'dota_火女.png',
	'dota_火枪.png',
	'dota_小牛.png',
	'wall_1.jpg',
	'dota_斯温.png',
	'dota_水人.png',
	'wall_2.jpg',
	'wall_3.jpg',
	'wall_4.jpg',
	'avatar_1.jpg',
	'dota_火枪.png',
	'dota_小牛.png',
	'dota_斯温.png'
];

const data = imgNames.map((name) => ({ image: `/assets/images/${name}` }));

function AvatarGroupZh() {
	const radiusOptions: AvatarGroupProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const [radiusIndex, setRadiusIndex] = useState(1);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="px-4 py-8">
			<div className="font-bold">默认</div>
			<div className="mt-4">
				<AvatarGroup data={data} />
			</div>

			<div className="mb-2 mt-8 font-bold">不同圆角</div>
			<div className="py-4">
				<Slider
					value={radiusIndex}
					minRange={0}
					maxRange={6}
					step={1}
					showSteps
					stepLabels={radiusLabels}
					onChange={(value: number) => setRadiusIndex(value)}
				/>
			</div>
			<AvatarGroup data={data} radius={currentRadius} />

			<div className="mb-2 mt-8 font-bold">小点</div>
			<AvatarGroup data={data} size="sm" lineWidth="1" />

			<div className="mb-2 mt-8 font-bold">紧凑一点</div>
			<AvatarGroup data={data} compact={5} />

			<div className="mb-2 mt-8 font-bold">边框粗点</div>
			<AvatarGroup data={data} lineWidth="8" />

			<div className="mb-2 mt-8 font-bold">反向</div>
			<AvatarGroup data={data} reverse />

			<div className="mb-2 mt-8 font-bold">最多显示 6 个</div>
			<AvatarGroup data={data} max={6} />

			<div className="mb-2 mt-8 font-bold">顶层显示增加</div>
			<AvatarGroup data={data} top="add" />

			<div className="mb-2 mt-8 font-bold">不显示顶层</div>
			<AvatarGroup data={data} top={null} />

			<div className="mb-2 mt-8 font-bold">自定义顶层</div>
			<AvatarGroup
				data={data}
				top={() => (
					<button className="bg-primary-200 dark:bg-dark-200 relative flex h-12 w-12 justify-center overflow-hidden rounded-full">
						<div className="text-primary-950 dark:text-dark-950 flex h-full w-full items-center justify-center">
							<Icon name="ri-reactjs-line" />
						</div>
					</button>
				)}
			/>
		</div>
	);
}

export default AvatarGroupZh;
