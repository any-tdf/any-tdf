<!-- Avatar Demo -->
<script lang="ts">
	import { Avatar, Slider } from 'stdf';
	import type { IconProps, AvatarProps } from 'stdf/types';

	const icons: IconProps[] = [
		{ name: 'ri-aliens-fill', theme: true, y: -1, size: 16 },
		{ name: 'ri-emotion-line', theme: true, y: -1, size: 46 },
		{ name: 'ri-shield-user-line', theme: true, y: 0, size: 32 },
		{ type: 'iconify', name: 'solar--user-hands-line-duotone', theme: true, size: 28 }
	];

	// 圆角配置
	const radiusOptions: AvatarProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(1); // 默认 sm
	let currentRadius: AvatarProps['radius'] = $derived(radiusOptions[radiusIndex]);
</script>

<div class="px-4 py-8">
	<div class="font-bold">不同圆角</div>
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
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar radius={currentRadius} />
		<Avatar radius={currentRadius} image="/assets/images/avatar_1.jpg" />
		<Avatar radius={currentRadius} image="/assets/images/avatar_2.png" imgSize="m" />
		<Avatar radius={currentRadius} alt="张" />
		<Avatar radius={currentRadius} icon={{ name: 'ri-bear-smile-line', theme: true }} />
	</div>

	<div class="font-bold">不同图片类型与大小</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="s" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" />
		<Avatar image="/assets/images/avatar_2.png" />
		<Avatar image="/assets/images/avatar_1.jpg" />
	</div>

	<div class="font-bold">自定义背景色</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-success" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="stdf-demo-avatar-bg" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="stdf-demo-gradient-primary !text-white" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" injClass="!bg-transparent" />
	</div>

	<div class="font-bold">不同边框</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dashed" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="dotted" />
		<Avatar image="/assets/images/avatar_2.png" imgSize="m" line="solid" injClass="stdf-demo-border-red-purple" />
	</div>

	<div class="font-bold">替换文本</div>
	<div class="mb-8 mt-4 flex justify-between">
		<Avatar alt="张" altSize="xs" />
		<Avatar alt="张" altSize="sm" />
		<Avatar alt="张" />
		<Avatar alt="张" altSize="lg" />
	</div>

	<div class="font-bold">替换 Icon</div>
	<div class="mb-8 mt-4 flex justify-between">
		{#each icons as icon (icon.name)}
			<Avatar {icon} />
		{/each}
	</div>

	<div class="font-bold">不同大小</div>
	<div class="flex justify-between">
		<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
			<Avatar size="xs" icon={{ name: 'ri-bear-smile-line', theme: true }} />
			<Avatar size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar line="solid" />
			<Avatar size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar size="xl" alt="张" altSize="xl" />
		</div>
		<div class="mb-8 mt-4 flex flex-col items-center space-y-4">
			<Avatar radius="full" size="xs" icon={{ name: 'ri-bear-smile-line', theme: true }} />
			<Avatar radius="full" size="sm" image="/assets/images/avatar_1.jpg" />
			<Avatar radius="full" line="solid" />
			<Avatar radius="full" size="lg" image="/assets/images/avatar_2.png" imgSize="m" />
			<Avatar radius="full" size="xl" alt="张" altSize="xl" />
		</div>
	</div>
</div>
