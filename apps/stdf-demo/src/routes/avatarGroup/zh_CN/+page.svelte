<!-- AvatarGroup Demo -->
<script lang="ts">
	import { AvatarGroup, Icon, Slider } from 'stdf';
	import type { AvatarGroupProps } from 'stdf/types';

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

	// 圆角配置
	const radiusOptions: AvatarGroupProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(1);
	let currentRadius: AvatarGroupProps['radius'] = $derived(radiusOptions[radiusIndex]);
</script>

<div class="px-4 py-8">
	<div class="font-bold">默认</div>
	<div class="mt-4">
		<AvatarGroup {data} />
	</div>

	<div class="mb-2 mt-8 font-bold">不同圆角</div>
	<div class="py-4">
		<Slider
			value={radiusIndex}
			minRange={0}
			maxRange={6}
			step={1}
			showSteps
			stepLabels={radiusLabels}
			onchange={(v) => (radiusIndex = v)}
		/>
	</div>
	<AvatarGroup {data} radius={currentRadius} />

	<div class="mb-2 mt-8 font-bold">小点</div>
	<AvatarGroup {data} size="sm" lineWidth="1" />

	<div class="mb-2 mt-8 font-bold">紧凑一点</div>
	<AvatarGroup {data} compact={5} />

	<div class="mb-2 mt-8 font-bold">边框粗点</div>
	<AvatarGroup {data} lineWidth="8" />

	<div class="mb-2 mt-8 font-bold">反向</div>
	<AvatarGroup {data} reverse />

	<div class="mb-2 mt-8 font-bold">最多显示 6 个</div>
	<AvatarGroup {data} max={6} />

	<div class="mb-2 mt-8 font-bold">顶层显示增加</div>
	<AvatarGroup {data} top="add" />

	<div class="mb-2 mt-8 font-bold">不显示顶层</div>
	<AvatarGroup {data} top={null} />

	<div class="mb-2 mt-8 font-bold">自定义顶层</div>
	<AvatarGroup {data}>
		{#snippet top()}
			<button class="bg-primary-200 dark:bg-dark-200 relative flex h-12 w-12 justify-center overflow-hidden rounded-full">
				<div class="text-primary-950 dark:text-dark-950 flex h-full w-full items-center justify-center">
					<Icon name="ri-svelte-line" />
				</div>
			</button>
		{/snippet}
	</AvatarGroup>
</div>
