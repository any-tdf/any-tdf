import { useState } from 'react';
import { Swiper, Button, Avatar } from 'rtdf/components';
import type { SwiperImgProps, SwiperReactNodeProps } from 'rtdf/types';

// 示例组件
const SwiperItem = () => (
	<div className="flex flex-col items-center space-y-4">
		<div className="text-center">此容器使用单个组件作为内容</div>
		<div>
			<Avatar />
		</div>
		<div className="w-full">
			<Button>按钮</Button>
		</div>
	</div>
);

function SwiperZh() {
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
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
			<Swiper data={data} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">初始索引为 2</div>
			<Swiper data={data} initActive={2} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">间隔 8 秒</div>
			<Swiper data={data} interval={8} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">过渡 1500 毫秒</div>
			<Swiper data={data} duration={1500} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">关闭自动播放</div>
			<Swiper data={data} autoplay={false} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">外部指示器</div>
			<Swiper data={data} indicatePosition="out" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">关闭指示器</div>
			<Swiper data={data} indicatePosition={null} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">指示器右对齐</div>
			<Swiper data={data} indicateAlign="right" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">圆点指示器</div>
			<Swiper data={data} indicateStyle="point" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">线性指示器</div>
			<Swiper data={data} indicateStyle="line" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">长线指示器</div>
			<Swiper data={data} indicateStyle="longLine" interval={8} />
			<div className="mt-10" />
			<Swiper data={data} indicateStyle="longLine" interval={8} indicatePosition="out" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">方形指示器</div>
			<Swiper data={data} indicateRadius="none" />
			<div className="mt-10" />
			<Swiper data={data} indicateStyle="point" indicateRadius="none" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				指定指示器背景色
				<p className="mb-2 text-xs font-thin">注入 Class</p>
			</div>
			<Swiper data={data} indicateInjClass="from-black/0 to-purple/50" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				指定指示器颜色
				<p className="mb-2 text-xs font-thin">同时去除背景色</p>
			</div>
			<Swiper data={data} indicateInjClass="bg-none" indicateColor="bg-blue" indicateActiveColor="bg-purple" />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">指定容器宽高比</div>
			<Swiper data={data} aspectRatio={[4, 1]} />

			<div className="mx-4 mt-10 text-lg font-bold">
				配置容器内边距
				<p className="mb-2 text-xs font-thin">同时指定指示器颜色、去除指示器背景色、配置容器内部圆角</p>
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
				容器内部增加投影
				<p className="mb-2 text-xs font-normal">注入 Class</p>
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

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器 X、Z 轴偏移</div>
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

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器 X、Y、Z 轴旋转</div>
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

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器注入 Class</div>
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

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">指定容器宽度</div>
			<div className="flex justify-center">
				<Swiper data={data} containerWidth={(document.body.clientWidth / 4) * 3} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">容器内容使用组件</div>
			<Swiper
				data={[{ type: 'ReactNode', ReactNode: <SwiperItem /> } as SwiperReactNodeProps, { type: 'img', url: '/assets/images/wall_1.jpg' }]}
			/>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				监听 onChange 事件
				<p className="mb-2 text-xs font-normal">当前激活索引值：{indexChange}</p>
			</div>
			<Swiper data={data} onChange={(current) => setIndexChange(current)} />

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">
				监听 onClick 事件
				<p className="mb-2 text-xs font-normal">点击索引值：{indexClick === -1 ? '未点击' : indexClick}</p>
			</div>
			<Swiper data={data} onClick={(current) => setIndexClick(current)} />
		</div>
	);
}

export default SwiperZh;
