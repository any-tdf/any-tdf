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

	// Radius configuration
	const radiusOptions: AvatarGroupProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(1);
	let currentRadius: AvatarGroupProps['radius'] = $derived(radiusOptions[radiusIndex]);
</script>

<div class="px-4 py-8">
	<div class="font-bold">Default</div>
	<div class="mt-4">
		<AvatarGroup {data} />
	</div>

	<div class="mb-2 mt-8 font-bold">Different radius</div>
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

	<div class="mb-2 mt-8 font-bold">Smaller</div>
	<AvatarGroup {data} size="sm" lineWidth="1" />

	<div class="mb-2 mt-8 font-bold">Compact</div>
	<AvatarGroup {data} compact={5} />

	<div class="mb-2 mt-8 font-bold">Border thick</div>
	<AvatarGroup {data} lineWidth="8" />

	<div class="mb-2 mt-8 font-bold">Reverse</div>
	<AvatarGroup {data} reverse />

	<div class="mb-2 mt-8 font-bold">Maximum 6 displayed</div>
	<AvatarGroup {data} max={6} />

	<div class="mb-2 mt-8 font-bold">Top layer display add</div>
	<AvatarGroup {data} top="add" />

	<div class="mb-2 mt-8 font-bold">Do not show top layer</div>
	<AvatarGroup {data} top={null} />

	<div class="mb-2 mt-8 font-bold">Custom top layer</div>
	<AvatarGroup {data}>
		{#snippet top()}
			<button class="relative flex h-12 w-12 justify-center overflow-hidden rounded-full bg-primary-200 dark:bg-dark-200">
				<div class="flex h-full w-full items-center justify-center text-primary-950 dark:text-dark-950">
					<Icon name="ri-svelte-line" />
				</div>
			</button>
		{/snippet}
	</AvatarGroup>
</div>
