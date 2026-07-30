<script lang="ts">
	import { Card, Icon, Button, Slider, Toast, Steps, ActionPopover } from 'stdf';
	import type { StepsItemProps, ActionProps, LargeAreaRadius } from 'stdf/types';

	// Radius options
	const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	let radiusIndex = $state(4);
	let currentRadius = $derived<LargeAreaRadius>(radiusValues[radiusIndex]);

	// Toast state
	let toastVisible = $state(false);
	let toastMessage = $state('');
	const showToast = (msg: string) => {
		toastMessage = msg;
		toastVisible = true;
	};

	// Logistics steps
	const logisticsSteps: StepsItemProps[] = [
		{ step: { title: 'Arrived at [New York Distribution Center]', desc: '2024-01-15 14:30' } },
		{ step: { title: 'Departed from [Los Angeles Hub]', desc: '2024-01-14 22:15' } },
		{ step: { title: 'Seller shipped your order', desc: '2024-01-14 18:00' } }
	];

	// User info ActionPopover
	let userActionVisible = $state(false);
	let userActionTrigger = $state<HTMLElement | null>(null);
	const userActions: ActionProps[] = [
		{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
		{ content: 'Share', icon: { name: 'ri-share-forward-line', size: 18 } },
		{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
	];
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<Card>
		<div class="text-center">This is a basic card</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Background Type</div>
	<Card bg="surface">
		<div class="text-sm">Surface background bg="surface" (default)</div>
	</Card>
	<Card bg="gray" shadow="none">
		<div class="text-sm">Gray transparent background bg="gray"</div>
	</Card>
	<Card bg="theme" shadow="none">
		<div class="text-sm">Theme transparent background bg="theme"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Different Radius</div>
	<Card radius={currentRadius}>
		<div class="text-sm text-center">radius="{currentRadius}"</div>
	</Card>
	<div class="px-4">
		<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Different Shadow</div>
	<Card shadow="none">
		<div class="text-sm">No shadow shadow="none"</div>
	</Card>
	<Card shadow="xs">
		<div class="text-sm">Extra small shadow shadow="xs"</div>
	</Card>
	<Card shadow="sm">
		<div class="text-sm">Small shadow shadow="sm" (default)</div>
	</Card>
	<Card shadow="md">
		<div class="text-sm">Medium shadow shadow="md"</div>
	</Card>
	<Card shadow="lg">
		<div class="text-sm">Large shadow shadow="lg"</div>
	</Card>
	<Card shadow="xl">
		<div class="text-sm">Extra large shadow shadow="xl"</div>
	</Card>
	<Card shadow="2xl">
		<div class="text-sm">2xl shadow shadow="2xl"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Different Padding</div>
	<Card p="0">
		<div class="bg-primary/10 p-2 text-sm dark:bg-dark/10">p="0"</div>
	</Card>
	<Card p="2">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="2"</div>
	</Card>
	<Card p="4">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="4" (default)</div>
	</Card>
	<Card p="8">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">p="8"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Separate Padding</div>
	<Card px="8" py="2">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">px="8" py="2"</div>
	</Card>
	<Card px="2" py="8">
		<div class="bg-primary/10 text-sm dark:bg-dark/10">px="2" py="8"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Border Style</div>
	<Card border="solid" shadow="none">
		<div class="text-sm">Solid border border="solid"</div>
	</Card>
	<Card border="dashed" shadow="none">
		<div class="text-sm">Dashed border border="dashed"</div>
	</Card>
	<Card border="dotted" shadow="none">
		<div class="text-sm">Dotted border border="dotted"</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Border Width</div>
	<Card border="solid" borderWidth="1" shadow="none">
		<div class="text-sm">Border width 1</div>
	</Card>
	<Card border="solid" borderWidth="2" shadow="none">
		<div class="text-sm">Border width 2</div>
	</Card>
	<Card border="solid" borderWidth="4" shadow="none">
		<div class="text-sm">Border width 4</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">With Header</div>
	<Card>
		{#snippet header()}
			<div class="font-bold">Card Title</div>
		{/snippet}
		<div class="text-sm">This is the card content area</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">With Footer</div>
	<Card>
		<div class="text-sm">This is the card content area</div>
		{#snippet footer()}
			<div class="flex justify-end gap-2">
				<Button size="sm" fill="text">Cancel</Button>
				<Button size="sm">Confirm</Button>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Complete Card</div>
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="font-bold">User Info</div>
				<button
					type="button"
					bind:this={userActionTrigger}
					class="cursor-pointer bg-transparent p-0 border-0"
					onclick={() => (userActionVisible = !userActionVisible)}
					aria-label="More actions"
				>
					<Icon name="ri-more-line" size={20} />
				</button>
				<ActionPopover
					bind:visible={userActionVisible}
					triggerRef={userActionTrigger}
					actions={userActions}
					inlineAlign="right"
					align="left"
				/>
			</div>
		{/snippet}
		<div class="flex items-center gap-4">
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
				<Icon name="ri-user-fill" size={24} />
			</div>
			<div>
				<div class="font-bold">John Doe</div>
				<div class="text-sm text-gray-500">Frontend Developer</div>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex justify-between text-sm text-gray-500">
				<span>3 years of experience</span>
				<span>New York</span>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Without Divider Lines</div>
	<Card headerLine={false} footerLine={false}>
		{#snippet header()}
			<div class="font-bold">Card Title</div>
		{/snippet}
		<div class="text-sm">This is the card content area without header and footer divider lines</div>
		{#snippet footer()}
			<div class="text-sm text-gray-500">Footer info</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Clickable Card</div>
	<Card onclick={() => showToast('Card clicked')}>
		<div class="text-sm">Click me</div>
	</Card>
	<Toast bind:visible={toastVisible} message={toastMessage} />

	<div class="mx-4 mt-8 text-lg font-bold">Custom Style</div>
	<Card injClass="!bg-primary/10 dark:!bg-dark/10">
		<div class="text-sm">Custom background color</div>
	</Card>
	<Card injClass="ring-2 ring-primary dark:ring-dark">
		<div class="text-sm">Custom ring border</div>
	</Card>
	<Card headerClass="!bg-primary/10 dark:!bg-dark/10">
		{#snippet header()}
			<div class="font-bold">Custom header style</div>
		{/snippet}
		<div class="text-sm">Content area</div>
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Complex Content</div>
	<Card>
		{#snippet header()}
			<div class="flex items-center gap-2">
				<Icon name="ri-article-line" size={20} />
				<span class="font-bold">Article Title</span>
			</div>
		{/snippet}
		<div class="space-y-2">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				This is an article summary that can contain multiple lines of text. The Card component provides flexible layout options, allowing you to customize the header, content, and footer areas as needed.
			</p>
			<div class="flex gap-2">
				<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">Tag One</span>
				<span class="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">Tag Two</span>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex items-center justify-between text-sm text-gray-500">
				<span>2024-01-01</span>
				<div class="flex gap-4">
					<span class="flex items-center gap-1">
						<Icon name="ri-eye-line" size={16} />
						1234
					</span>
					<span class="flex items-center gap-1">
						<Icon name="ri-heart-line" size={16} />
						56
					</span>
				</div>
			</div>
		{/snippet}
	</Card>

	<div class="mx-4 mt-8 text-lg font-bold">Business Scenarios</div>

	<!-- Product Card -->
	<Card p="0" onclick={() => showToast('View product details')}>
		<div class="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
			<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
		</div>
		<div class="p-3">
			<div class="line-clamp-2 text-sm">Apple AirPods Pro 2 Wireless Earbuds Active Noise Cancelling MagSafe Case</div>
			<div class="mt-2 flex items-baseline gap-1">
				<span class="text-lg font-bold text-red-500">$229</span>
				<span class="text-xs text-gray-400 line-through">$249</span>
			</div>
			<div class="mt-2 flex items-center justify-between text-xs text-gray-500">
				<span>12K+ sold</span>
				<span class="flex items-center gap-0.5">
					<Icon name="ri-star-fill" size={12} state="theme" />
					4.9
				</span>
			</div>
		</div>
	</Card>

	<!-- Order Card -->
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Icon name="ri-store-2-line" size={18} />
					<span class="font-medium">Apple Official Store</span>
				</div>
				<span class="text-sm text-primary dark:text-dark">Pending Shipment</span>
			</div>
		{/snippet}
		<div class="flex gap-3">
			<div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
				<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" class="h-3/4 object-contain" />
			</div>
			<div class="flex flex-1 flex-col justify-between">
				<div class="line-clamp-2 text-sm">Apple AirPods Pro 2 Wireless Earbuds</div>
				<div class="flex items-center justify-between">
					<span class="text-xs text-gray-500">White × 1</span>
					<span class="font-medium">$229</span>
				</div>
			</div>
		</div>
		{#snippet footer()}
			<div class="flex justify-end gap-2">
				<Button size="sm" fill="lineState">Contact</Button>
				<Button size="sm">Remind</Button>
			</div>
		{/snippet}
	</Card>

	<!-- Notification Card -->
	<Card onclick={() => showToast('View notification details')}>
		<div class="flex gap-3">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
				<Icon name="ri-notification-3-line" size={20} state="theme" />
			</div>
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<span class="font-medium">System Notification</span>
					<span class="text-xs text-gray-400">10 min ago</span>
				</div>
				<p class="mt-1 line-clamp-2 text-sm text-gray-500">
					Your order has been shipped. Tracking number: SF1234567890. Please check it.
				</p>
			</div>
		</div>
	</Card>

	<!-- Coupon Card -->
	<Card p="0" border="dashed" shadow="none">
		<div class="flex">
			<div class="flex w-24 shrink-0 flex-col items-center justify-center bg-primary/10 p-3 dark:bg-dark/10">
				<div class="flex items-baseline">
					<span class="text-xs text-primary dark:text-dark">$</span>
					<span class="text-3xl font-bold text-primary dark:text-dark">50</span>
				</div>
				<div class="text-xs text-gray-500">Min. spend $200</div>
			</div>
			<div class="flex flex-1 flex-col justify-between p-3">
				<div>
					<div class="font-medium">New User Coupon</div>
					<div class="mt-1 text-xs text-gray-500">Valid for all categories, some exclusions apply</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-xs text-gray-400">Expires 2024.12.31</span>
					<Button size="sm">Use Now</Button>
				</div>
			</div>
		</div>
	</Card>

	<!-- Shipping Card -->
	<Card>
		{#snippet header()}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Icon name="ri-truck-line" size={18} state="theme" />
					<span class="font-medium text-primary dark:text-dark">In Transit</span>
				</div>
				<span class="text-xs text-gray-500">FedEx</span>
			</div>
		{/snippet}
		<Steps steps={logisticsSteps} current={1} vertical />
	</Card>

	<!-- Bank Card -->
	<Card injClass="!bg-linear-to-br !from-primary !to-primary/70 dark:!from-dark dark:!to-dark/70 !text-white">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Icon name="ri-bank-card-line" size={24} />
				<span class="font-medium">Chase Bank</span>
			</div>
			<span class="text-sm opacity-80">Debit Card</span>
		</div>
		<div class="mt-6 text-2xl tracking-widest">**** **** **** 8888</div>
		<div class="mt-4 flex items-center justify-between text-sm opacity-80">
			<span>John Doe</span>
			<span>Valid thru 12/28</span>
		</div>
	</Card>

	<div class="h-8"></div>
</div>
