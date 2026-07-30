<!-- ImagePreview Demo -->
<script lang="ts">
	import { ImagePreview, Button, Icon } from 'stdf';
	import type { ImagePreviewItemProps } from 'stdf/types';

	// Basic image list
	const images = [
		'/assets/images/wall_1.jpg',
		'/assets/images/wall_2.jpg',
		'/assets/images/wall_3.jpg',
		'/assets/images/wall_4.jpg'
	];

	// Image list with descriptions
	const imagesWithDesc: ImagePreviewItemProps[] = [
		{ url: '/assets/images/wall_1.jpg', alt: 'Landscape 1' },
		{ url: '/assets/images/wall_2.jpg', alt: 'Landscape 2' },
		{ url: '/assets/images/wall_3.jpg', alt: 'Landscape 3' },
		{ url: '/assets/images/wall_4.jpg', alt: 'Landscape 4' }
	];

	// Basic usage
	let visible1 = $state(false);

	// Specify initial index
	let visible2 = $state(false);
	let current2 = $state(2);

	// Number indicator
	let visible3 = $state(false);

	// Dot indicator
	let visible4 = $state(false);

	// Hide indicator
	let visible5 = $state(false);

	// Close button position
	let visible6 = $state(false);

	// Enable mask close
	let visible8 = $state(false);

	// Disable loop
	let visible10 = $state(false);

	// Hide navigation
	let visible11 = $state(false);

	// Navigation position
	let visible12 = $state(false);

	// Image description
	let visible13 = $state(false);

	// Custom scale range
	let visible14 = $state(false);

	// Listen events
	let visible15 = $state(false);
	let currentIndex = $state(0);
	let scaleValue = $state(1);

	// Custom index display
	let visible16 = $state(false);

	// Image rotation
	let visible17 = $state(false);
	let rotationAngle = $state<0 | 90 | 180 | 270>(0);
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
<div class="mx-4">
	<Button onclick={() => (visible1 = true)}>Preview Images</Button>
</div>
<ImagePreview bind:visible={visible1} {images} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Initial Index</div>
<div class="mx-4">
	<Button onclick={() => (visible2 = true)}>Start from 3rd image</Button>
</div>
<ImagePreview bind:visible={visible2} {images} bind:current={current2} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Number Indicator</div>
<div class="mx-4">
	<Button onclick={() => (visible3 = true)}>Show 1 / 4</Button>
</div>
<ImagePreview bind:visible={visible3} {images} indicatorType="number" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Dot Indicator</div>
<div class="mx-4">
	<Button onclick={() => (visible4 = true)}>Dot style</Button>
</div>
<ImagePreview bind:visible={visible4} {images} indicatorType="dot" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Hide Indicator</div>
<div class="mx-4">
	<Button onclick={() => (visible5 = true)}>No indicator</Button>
</div>
<ImagePreview bind:visible={visible5} {images} showIndex={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Close Button Position</div>
<div class="mx-4">
	<Button onclick={() => (visible6 = true)}>Top left close button</Button>
</div>
<ImagePreview bind:visible={visible6} {images} closePosition="tl" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Enable Mask Close</div>
<p class="mx-4 mb-2 text-xs opacity-60">Disabled by default, can close by clicking blank area when enabled</p>
<div class="mx-4">
	<Button onclick={() => (visible8 = true)}>Enable tap close</Button>
</div>
<ImagePreview bind:visible={visible8} {images} maskClosable={true} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Disable Loop</div>
<div class="mx-4">
	<Button onclick={() => (visible10 = true)}>Stop at boundary</Button>
</div>
<ImagePreview bind:visible={visible10} {images} loop={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Hide Navigation</div>
<div class="mx-4">
	<Button onclick={() => (visible11 = true)}>Hide prev/next icons</Button>
</div>
<ImagePreview bind:visible={visible11} {images} showNavigation={false} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Navigation Position</div>
<div class="mx-4">
	<Button onclick={() => (visible12 = true)}>Navigation at bottom</Button>
</div>
<ImagePreview bind:visible={visible12} {images} navigationPosition="bottom" />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Image Description</div>
<div class="mx-4">
	<Button onclick={() => (visible13 = true)}>Show description</Button>
</div>
<ImagePreview bind:visible={visible13} images={imagesWithDesc}>
	{#snippet children(item, index)}
		<div class="text-center text-white">
			<p class="text-lg">{item.alt}</p>
			<p class="text-sm opacity-60">Image {index + 1}</p>
		</div>
	{/snippet}
</ImagePreview>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Scale Range</div>
<p class="mx-4 mb-2 text-xs opacity-60">Min scale 0.3, max scale 5</p>
<div class="mx-4">
	<Button onclick={() => (visible14 = true)}>Custom scale</Button>
</div>
<ImagePreview bind:visible={visible14} {images} minScale={0.3} maxScale={5} />

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Listen Events</div>
<p class="mx-4 mb-2 text-xs opacity-60">Current index: {currentIndex}, Scale: {scaleValue.toFixed(2)}</p>
<div class="mx-4">
	<Button onclick={() => (visible15 = true)}>Listen change and scale</Button>
</div>
<ImagePreview
	bind:visible={visible15}
	{images}
	onchange={(index) => (currentIndex = index)}
	onscale={(scale) => (scaleValue = scale)}
/>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Index Display</div>
<div class="mx-4">
	<Button onclick={() => (visible16 = true)}>Custom index style</Button>
</div>
<ImagePreview bind:visible={visible16} {images}>
	{#snippet indexChild(current, total)}
		<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 dark:bg-dark/80 text-white">
			<Icon name="ri-image-line" size={16} />
			<span>{current} of {total}</span>
		</div>
	{/snippet}
</ImagePreview>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Image Rotation</div>
<p class="mx-4 mb-2 text-xs opacity-60">Click rotation button to rotate image counterclockwise. Current angle: {rotationAngle}°</p>
<div class="mx-4">
	<Button onclick={() => (visible17 = true)}>Support Rotation</Button>
</div>
<ImagePreview
	bind:visible={visible17}
	{images}
	showRotation
	onrotate={(angle) => (rotationAngle = angle)}
/>

<div class="h-20"></div>
