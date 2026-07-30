<!-- Swiper Demo -->
<script lang="ts">
	import { Swiper } from 'stdf';
	import type { SwiperImgProps } from 'stdf/types';
	import Item from './Item.svelte';

	const data: SwiperImgProps[] = [
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/wall_4.jpg' }
	];

	let indexClick = $state(-1);
	let indexChange = $state(0);
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
<Swiper {data} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">初始索引为 2</div>
<Swiper {data} initActive={2} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">间隔 8 秒</div>
<Swiper {data} interval={8} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">过渡 1500 毫秒</div>
<Swiper {data} duration={1500} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">关闭自动播放</div>
<Swiper {data} autoplay={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">外部指示器</div>
<Swiper {data} indicatePosition="out" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">关闭指示器</div>
<Swiper {data} indicatePosition={null} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">指示器右对齐</div>
<Swiper {data} indicateAlign="right" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">圆点指示器</div>
<Swiper {data} indicateStyle="point" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">线性指示器</div>
<Swiper {data} indicateStyle="line" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">长线指示器</div>
<Swiper {data} indicateStyle="longLine" interval={8} />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="longLine" interval={8} indicatePosition="out" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">方形指示器</div>
<Swiper {data} indicateRadius="none" />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="point" indicateRadius="none" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	指定指示器背景色
	<p class="mb-2 text-xs font-thin">注入 Class</p>
</div>
<Swiper {data} indicateInjClass="from-black/0 to-purple/50" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	指定指示器颜色
	<p class="mb-2 text-xs font-thin">同时去除背景色</p>
</div>
<Swiper {data} indicateInjClass="bg-none" indicateColor="bg-blue" indicateActiveColor="bg-purple" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">指定容器宽高比</div>
<Swiper {data} aspectRatio={[4, 1]} />

<div class="mx-4 mt-10 text-lg font-bold">
	配置容器内边距
	<p class="mb-2 text-xs font-thin">同时指定指示器颜色、去除指示器背景色、配置容器内部圆角</p>
</div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-black/5 dark:bg-white/10"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	interval={8}
	indicateStyle="longLine"
/>
<div class="mt-10"></div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="4xl"
	aspectRatio={[3, 1]}
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	容器内部增加投影
	<p class="mb-2 text-xs font-normal">注入 Class</p>
</div>
<Swiper
	{data}
	px="6"
	py="6"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="4xl"
	aspectRatio={[3, 1]}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器 X、Z 轴偏移</div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
	px="12"
	py="8"
	indicateInjClass="bg-none"
	indicateColor="bg-primary dark:bg-dark"
	indicateActiveColor="bg-primary dark:bg-dark"
	radius="xl"
	translateZ={600}
	innerInjClass="shadow-md shadow-black/20 dark:shadow-white/20"
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器 X、Y、Z 轴旋转</div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">未激活容器注入 Class</div>
<Swiper
	{data}
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
<div class="mt-10"></div>
<Swiper
	{data}
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">指定容器宽度</div>
<div class="flex justify-center">
	<Swiper {data} containerWidth={(document.body.clientWidth / 4) * 3} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">容器内容使用组件</div>
<Swiper
	data={[
		{ type: 'component', component: Item },
		{ type: 'img', url: '/assets/images/wall_1.jpg' }
	]}
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	监听 onchange 事件
	<p class=" mb-2 text-xs font-normal">当前激活索引值：{indexChange}</p>
</div>
<Swiper {data} onchange={(current) => (indexChange = current)} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	监听 onclick 事件
	<p class="mb-2 text-xs font-normal">点击索引值：{indexClick === -1 ? '未点击' : indexClick}</p>
</div>
<Swiper {data} onclick={(current) => (indexClick = current)} />

<!-- Item.svelte -->
<!--
<script lang=""ts>
	import { Button, Avatar } from 'stdf';
</script>

<div class="flex flex-col space-y-4 items-center">
	<div class="text-center">此容器使用单个组件作为内容</div>
	<div><Avatar /></div>
	<div class="w-full"><Button>按钮</Button></div>
</div>
-->
