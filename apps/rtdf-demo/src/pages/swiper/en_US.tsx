import { useState } from 'react';
import { Avatar, Button, Swiper } from 'rtdf/components';
import type { SwiperImgProps, SwiperReactNodeProps } from 'rtdf/types';

const SwiperItem = () => (
	<div className="flex flex-col items-center space-y-4">
		<div className="text-center">This container uses a single component as its content</div>
		<div>
			<Avatar />
		</div>
		<div className="w-full">
			<Button>Button</Button>
		</div>
	</div>
);

function SwiperEn() {
	const data: SwiperImgProps[] = [
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/wall_4.jpg' }
	];

	const [indexClick, setIndexClick] = useState(-1);
	const [indexChange, setIndexChange] = useState(0);

	return (
		<div>
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
			<Swiper data={data} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Initial Index 2</div>
			<Swiper data={data} initActive={2} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">8s Interval</div>
			<Swiper data={data} interval={8} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">1500ms Duration</div>
			<Swiper data={data} duration={1500} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Disable Autoplay</div>
			<Swiper data={data} autoplay={false} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">External Indicator</div>
			<Swiper data={data} indicatePosition="out" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Hide Indicator</div>
			<Swiper data={data} indicatePosition={null} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Right Aligned Indicator</div>
			<Swiper data={data} indicateAlign="right" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Dot Indicator</div>
			<Swiper data={data} indicateStyle="point" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Line Indicator</div>
			<Swiper data={data} indicateStyle="line" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Long Line Indicator</div>
			<Swiper data={data} indicateStyle="longLine" interval={8} />
			<div className="mt-10" />
			<Swiper data={data} indicateStyle="longLine" interval={8} indicatePosition="out" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Square Indicator</div>
			<Swiper data={data} indicateRadius="none" />
			<div className="mt-10" />
			<Swiper data={data} indicateStyle="point" indicateRadius="none" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				Custom Indicator Background
				<p className="mb-2 text-xs font-thin">Inject Class</p>
			</div>
			<Swiper data={data} indicateInjClass="from-black/0 to-purple/50" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				Custom Indicator Color
				<p className="mb-2 text-xs font-thin">Remove Background</p>
			</div>
			<Swiper data={data} indicateInjClass="bg-none" indicateColor="bg-blue" indicateActiveColor="bg-purple" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Aspect Ratio</div>
			<Swiper data={data} aspectRatio={[4, 1]} />

			<div className="mx-4 mt-10 text-lg font-bold">
				Container Padding
				<p className="mb-2 text-xs font-thin">With Custom Colors and Radius</p>
			</div>
			<Swiper
				data={data}
				px="6"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-black/5 dark:bg-white/10"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				interval={8}
				indicateStyle="longLine"
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="6"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="4xl"
				aspectRatio={[3, 1]}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				Inner Shadow
				<p className="mb-2 text-xs font-normal">Inject Class</p>
			</div>
			<Swiper
				data={data}
				px="6"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="4xl"
				aspectRatio={[3, 1]}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Inactive Item X, Z Translation</div>
			<Swiper
				data={data}
				px="16"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				aspectRatio={[3, 1]}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				translateX={100}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				translateZ={400}
				translateX={-200}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="12"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				translateZ={600}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Inactive Item X, Y, Z Rotation</div>
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateX={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateY={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateZ={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateX={90}
				rotateY={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateX={90}
				rotateZ={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="4"
				py="8"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				radius="xl"
				rotateY={90}
				rotateZ={90}
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				duration={2000}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Inactive Item Style</div>
			<Swiper
				data={data}
				px="24"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				radius="xl"
				aspectRatio={[3, 1]}
				translateX={160}
				duration={2000}
				notActiveInjClass="grayscale"
			/>
			<div className="mt-10" />
			<Swiper
				data={data}
				px="24"
				py="6"
				indicateInjClass="bg-none"
				indicateColor="bg-primary dark:bg-dark"
				indicateActiveColor="bg-primary dark:bg-dark"
				innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
				radius="xl"
				aspectRatio={[3, 1]}
				translateX={160}
				duration={2000}
				notActiveInjClass="blur"
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Container Width</div>
			<div className="flex justify-center">
				<Swiper data={data} containerWidth={(document.body.clientWidth / 4) * 3} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Component as Content</div>
			<Swiper
				data={[{ type: 'ReactNode', ReactNode: <SwiperItem /> } as SwiperReactNodeProps, { type: 'img', url: '/assets/images/wall_1.jpg' }]}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				onChange Event
				<p className="mb-2 text-xs font-normal">Current Index: {indexChange}</p>
			</div>
			<Swiper data={data} onChange={(current) => setIndexChange(current)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				onClick Event
				<p className="mb-2 text-xs font-normal">Clicked Index: {indexClick === -1 ? 'None' : indexClick}</p>
			</div>
			<Swiper data={data} onClick={(current) => setIndexClick(current)} />
		</div>
	);
}

export default SwiperEn;
