<!-- ImagePreview Demo -->
<script lang="ts">
	import { ImagePreview, Button, Icon } from 'stdf';
	import type { ImagePreviewItemProps } from 'stdf/types';

	// 基础图片列表
	const images = [
		'/assets/images/wall_1.jpg',
		'/assets/images/wall_2.jpg',
		'/assets/images/wall_3.jpg',
		'/assets/images/wall_4.jpg'
	];

	// 带描述的图片列表
	const imagesWithDesc: ImagePreviewItemProps[] = [
		{ url: '/assets/images/wall_1.jpg', alt: '风景图片 1' },
		{ url: '/assets/images/wall_2.jpg', alt: '风景图片 2' },
		{ url: '/assets/images/wall_3.jpg', alt: '风景图片 3' },
		{ url: '/assets/images/wall_4.jpg', alt: '风景图片 4' }
	];

	// 基础用法
	let visible1 = $state(false);

	// 指定初始索引
	let visible2 = $state(false);
	let current2 = $state(2);

	// 数字指示器
	let visible3 = $state(false);

	// 圆点指示器
	let visible4 = $state(false);

	// 关闭指示器
	let visible5 = $state(false);

	// 关闭按钮位置
	let visible6 = $state(false);

	// 启用点击蒙层关闭
	let visible8 = $state(false);

	// 禁用循环切换
	let visible10 = $state(false);

	// 隐藏导航图标
	let visible11 = $state(false);

	// 导航图标位置
	let visible12 = $state(false);

	// 图片描述
	let visible13 = $state(false);

	// 自定义缩放范围
	let visible14 = $state(false);

	// 监听事件
	let visible15 = $state(false);
	let currentIndex = $state(0);
	let scaleValue = $state(1);

	// 自定义索引显示
	let visible16 = $state(false);

	// 图片旋转
	let visible17 = $state(false);
	let rotationAngle = $state<0 | 90 | 180 | 270>(0);
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
<div class="mx-4">
	<Button onclick={() => (visible1 = true)}>预览图片</Button>
</div>
<ImagePreview bind:visible={visible1} {images} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">指定初始索引</div>
<div class="mx-4">
	<Button onclick={() => (visible2 = true)}>从第 3 张开始</Button>
</div>
<ImagePreview bind:visible={visible2} {images} bind:current={current2} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">数字指示器</div>
<div class="mx-4">
	<Button onclick={() => (visible3 = true)}>显示 1 / 4</Button>
</div>
<ImagePreview bind:visible={visible3} {images} indicatorType="number" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">圆点指示器</div>
<div class="mx-4">
	<Button onclick={() => (visible4 = true)}>圆点样式</Button>
</div>
<ImagePreview bind:visible={visible4} {images} indicatorType="dot" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">关闭指示器</div>
<div class="mx-4">
	<Button onclick={() => (visible5 = true)}>不显示指示器</Button>
</div>
<ImagePreview bind:visible={visible5} {images} showIndex={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">关闭按钮位置</div>
<div class="mx-4">
	<Button onclick={() => (visible6 = true)}>左上角关闭按钮</Button>
</div>
<ImagePreview bind:visible={visible6} {images} closePosition="tl" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">启用点击蒙层关闭</div>
<p class="mx-4 mb-2 text-xs opacity-60">默认禁用，启用后点击空白区域可关闭</p>
<div class="mx-4">
	<Button onclick={() => (visible8 = true)}>启用点击关闭</Button>
</div>
<ImagePreview bind:visible={visible8} {images} maskClosable={true} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">禁用循环切换</div>
<div class="mx-4">
	<Button onclick={() => (visible10 = true)}>滑动到边界时停止</Button>
</div>
<ImagePreview bind:visible={visible10} {images} loop={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">隐藏导航图标</div>
<div class="mx-4">
	<Button onclick={() => (visible11 = true)}>不显示左右切换图标</Button>
</div>
<ImagePreview bind:visible={visible11} {images} showNavigation={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">导航图标位置</div>
<div class="mx-4">
	<Button onclick={() => (visible12 = true)}>导航图标在底部</Button>
</div>
<ImagePreview bind:visible={visible12} {images} navigationPosition="bottom" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">图片描述</div>
<div class="mx-4">
	<Button onclick={() => (visible13 = true)}>显示图片描述</Button>
</div>
<ImagePreview bind:visible={visible13} images={imagesWithDesc}>
	{#snippet children(item, index)}
		<div class="text-center text-white">
			<p class="text-lg">{item.alt}</p>
			<p class="text-sm opacity-60">第 {index + 1} 张</p>
		</div>
	{/snippet}
</ImagePreview>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义缩放范围</div>
<p class="mx-4 mb-2 text-xs opacity-60">最小缩放 0.3，最大缩放 5</p>
<div class="mx-4">
	<Button onclick={() => (visible14 = true)}>自定义缩放</Button>
</div>
<ImagePreview bind:visible={visible14} {images} minScale={0.3} maxScale={5} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">监听事件</div>
<p class="mx-4 mb-2 text-xs opacity-60">当前索引：{currentIndex}，缩放比例：{scaleValue.toFixed(2)}</p>
<div class="mx-4">
	<Button onclick={() => (visible15 = true)}>监听切换和缩放</Button>
</div>
<ImagePreview
	bind:visible={visible15}
	{images}
	onchange={(index) => (currentIndex = index)}
	onscale={(scale) => (scaleValue = scale)}
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义索引显示</div>
<div class="mx-4">
	<Button onclick={() => (visible16 = true)}>自定义索引样式</Button>
</div>
<ImagePreview bind:visible={visible16} {images}>
	{#snippet indexChild(current, total)}
		<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 dark:bg-dark/80 text-white">
			<Icon name="ri-image-line" size={16} />
			<span>{current} of {total}</span>
		</div>
	{/snippet}
</ImagePreview>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">图片旋转</div>
<p class="mx-4 mb-2 text-xs opacity-60">点击旋转按钮可逆时针旋转图片，当前角度：{rotationAngle}°</p>
<div class="mx-4">
	<Button onclick={() => (visible17 = true)}>支持旋转</Button>
</div>
<ImagePreview
	bind:visible={visible17}
	{images}
	showRotation
	onrotate={(angle) => (rotationAngle = angle)}
/>

<div class="h-20"></div>
