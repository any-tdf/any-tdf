import { useState } from 'react';
import { Avatar, Slider } from 'rtdf/components';
import type { AvatarProps, IconProps } from 'rtdf/types';

const AvatarEn = () => {
	const icons: IconProps[] = [
		{ name: 'ri-aliens-fill', theme: true, y: -1, size: 16 },
		{ name: 'ri-user-smile-line', y: -1 },
		{ name: 'ri-shield-user-line', theme: true, y: 0, size: 32 },
		{ name: 'ri-emotion-line', theme: true, y: -1, size: 46 }
	];

	const radiusOptions: AvatarProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const [radiusIndex, setRadiusIndex] = useState(1);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="px-4 py-8">
			<div className="font-bold">Different rounded corners</div>
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
			<div className="mb-8 mt-4 flex justify-between">
				<Avatar radius={currentRadius} />
				<Avatar radius={currentRadius} image="/assets/images/avatar_1.jpg" />
				<Avatar radius={currentRadius} image="/assets/images/avatar_2.png" imgSize="m" />
				<Avatar radius={currentRadius} alt="A" />
				<Avatar radius={currentRadius} icon={{ name: 'ri-bear-smile-line', theme: true }} />
			</div>

			<div className="font-bold">Different picture types and size</div>
			<div className="mb-8 mt-4 flex justify-between">
				<Avatar image="/assets/images/avatar_2.png" imgSize="s" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" />
				<Avatar image="/assets/images/avatar_2.png" />
				<Avatar image="/assets/images/avatar_1.jpg" />
			</div>

			<div className="font-bold">Custom background color</div>
			<div className="mb-8 mt-4 flex justify-between">
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="rtdf-demo-avatar-bg" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="rtdf-demo-gradient-primary !text-white" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-transparent" />
			</div>

			<div className="font-bold">Different border</div>
			<div className="mb-8 mt-4 flex justify-between">
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dashed" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dotted" />
				<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" injClass="rtdf-demo-border-red-purple" />
			</div>

			<div className="font-bold">Replace text</div>
			<div className="mb-8 mt-4 flex justify-between">
				<Avatar alt="A" altSize="xs" />
				<Avatar alt="A" altSize="sm" />
				<Avatar alt="A" />
				<Avatar alt="A" altSize="lg" />
			</div>

			<div className="font-bold">Replace Icon</div>
			<div className="mb-8 mt-4 flex justify-between">
				{icons.map((icon) => (
					<Avatar key={icon.name} icon={icon} />
				))}
			</div>

			<div className="font-bold">Different size</div>
			<div className="flex justify-between">
				<div className="mb-8 mt-4 flex flex-col items-center space-y-4">
					<Avatar size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
					<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
					<Avatar line="solid" />
					<Avatar size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
					<Avatar size="xl" alt="A" altSize="xl" />
				</div>
				<div className="mb-8 mt-4 flex flex-col items-center space-y-4">
					<Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', size: 16, theme: true }} />
					<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
					<Avatar radius="full" line="solid" />
					<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
					<Avatar radius="full" size="xl" alt="A" altSize="xl" />
				</div>
			</div>
		</div>
	);
};

export default AvatarEn;
