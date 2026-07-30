<!-- Swiper Demo -->
<script lang="ts">
	import { Swiper } from 'stdf';
	import type { SwiperImgProps } from 'stdf/types';
	import Item from './Item_en.svelte';

	const data: SwiperImgProps[] = [
		{ type: 'img', url: '/assets/images/wall_1.jpg' },
		{ type: 'img', url: '/assets/images/wall_2.jpg' },
		{ type: 'img', url: '/assets/images/wall_3.jpg' },
		{ type: 'img', url: '/assets/images/wall_4.jpg' }
	];

	let indexClick = $state(-1);
	let indexChange = $state(0);
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
<Swiper {data} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Initial Index 2</div>
<Swiper {data} initActive={2} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">8s Interval</div>
<Swiper {data} interval={8} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">1500ms Duration</div>
<Swiper {data} duration={1500} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Disable Autoplay</div>
<Swiper {data} autoplay={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">External Indicator</div>
<Swiper {data} indicatePosition="out" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Hide Indicator</div>
<Swiper {data} indicatePosition={null} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Right Aligned Indicator</div>
<Swiper {data} indicateAlign="right" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Dot Indicator</div>
<Swiper {data} indicateStyle="point" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Line Indicator</div>
<Swiper {data} indicateStyle="line" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Long Line Indicator</div>
<Swiper {data} indicateStyle="longLine" interval={8} />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="longLine" interval={8} indicatePosition="out" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Square Indicator</div>
<Swiper {data} indicateRadius="none" />
<div class="mt-10"></div>
<Swiper {data} indicateStyle="point" indicateRadius="none" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	Custom Indicator Background
	<p class="mb-2 text-xs font-thin">Inject Class</p>
</div>
<Swiper {data} indicateInjClass="from-black/0 to-purple/50" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	Custom Indicator Color
	<p class="mb-2 text-xs font-thin">Remove Background</p>
</div>
<Swiper {data} indicateInjClass="bg-none" indicateColor="bg-blue" indicateActiveColor="bg-purple" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Aspect Ratio</div>
<Swiper {data} aspectRatio={[4, 1]} />

<div class="mx-4 mt-10 text-lg font-bold">
	Container Padding
	<p class="mb-2 text-xs font-thin">With Custom Colors and Radius</p>
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
	Inner Shadow
	<p class="mb-2 text-xs font-normal">Inject Class</p>
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Inactive Item X, Z Translation</div>
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Inactive Item X, Y, Z Rotation</div>
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Inactive Item Style</div>
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Container Width</div>
<div class="flex justify-center">
	<Swiper {data} containerWidth={(document.body.clientWidth / 4) * 3} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Component as Content</div>
<Swiper
	data={[
		{ type: 'component', component: Item },
		{ type: 'img', url: '/assets/images/wall_1.jpg' }
	]}
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	onchange Event
	<p class=" mb-2 text-xs font-normal">Current Index: {indexChange}</p>
</div>
<Swiper {data} onchange={(current) => (indexChange = current)} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">
	onclick Event
	<p class="mb-2 text-xs font-normal">Clicked Index: {indexClick === -1 ? 'None' : indexClick}</p>
</div>
<Swiper {data} onclick={(current) => (indexClick = current)} />

<!-- Item_en.svelte -->
<!--
<script lang="ts">
	import { Button, Avatar } from 'stdf';
</script>

<div class="flex flex-col space-y-4 items-center">
	<div class="text-center">This container uses a single component as its content</div>
	<div><Avatar /></div>
	<div class="w-full"><Button>button</Button></div>
</div>
-->
