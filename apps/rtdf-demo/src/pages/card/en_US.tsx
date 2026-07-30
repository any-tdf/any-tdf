import { useMemo, useRef, useState } from 'react';
import { ActionPopover, Button, Card, Icon, Slider, Steps, Toast } from 'rtdf/components';
import type { ActionProps, LargeAreaRadius, StepsItemProps } from 'rtdf/types';

const radiusValues: LargeAreaRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

const logisticsSteps: StepsItemProps[] = [
	{ step: { title: 'Arrived at [New York Distribution Center]', desc: '2024-01-15 14:30' } },
	{ step: { title: 'Departed from [Los Angeles Hub]', desc: '2024-01-14 22:15' } },
	{ step: { title: 'Seller shipped your order', desc: '2024-01-14 18:00' } }
];

const userActions: ActionProps[] = [
	{ content: 'Edit', icon: { name: 'ri-edit-line', size: 18 } },
	{ content: 'Share', icon: { name: 'ri-share-forward-line', size: 18 } },
	{ content: 'Delete', style: 'error', icon: { name: 'ri-delete-bin-line', size: 18, state: 'error' } }
];

function CardEn() {
	const [radiusIndex, setRadiusIndex] = useState(4);
	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [userActionVisible, setUserActionVisible] = useState(false);
	const userActionTrigger = useRef<HTMLButtonElement | null>(null);

	const currentRadius = useMemo(() => radiusValues[radiusIndex], [radiusIndex]);

	const showToast = (message: string) => {
		setToastMessage(message);
		setToastVisible(true);
	};

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
			<Card>
				<div className="text-center">This is a basic card</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Background Type</div>
			<Card bg="surface">
				<div className="text-sm">Surface background bg="surface" (default)</div>
			</Card>
			<Card bg="gray" shadow="none">
				<div className="text-sm">Gray transparent background bg="gray"</div>
			</Card>
			<Card bg="theme" shadow="none">
				<div className="text-sm">Theme transparent background bg="theme"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Different Radius</div>
			<Card radius={currentRadius}>
				<div className="text-center text-sm">radius="{currentRadius}"</div>
			</Card>
			<div className="px-4">
				<Slider
					value={radiusIndex}
					maxRange={7}
					step={1}
					showSteps
					stepsStyle="break"
					stepLabels={radiusValues}
					onChange={(value: number) => setRadiusIndex(value)}
				/>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Different Shadow</div>
			<Card shadow="none">
				<div className="text-sm">No shadow shadow="none"</div>
			</Card>
			<Card shadow="xs">
				<div className="text-sm">Extra small shadow shadow="xs"</div>
			</Card>
			<Card shadow="sm">
				<div className="text-sm">Small shadow shadow="sm" (default)</div>
			</Card>
			<Card shadow="md">
				<div className="text-sm">Medium shadow shadow="md"</div>
			</Card>
			<Card shadow="lg">
				<div className="text-sm">Large shadow shadow="lg"</div>
			</Card>
			<Card shadow="xl">
				<div className="text-sm">Extra large shadow shadow="xl"</div>
			</Card>
			<Card shadow="2xl">
				<div className="text-sm">2xl shadow shadow="2xl"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Different Padding</div>
			<Card p="0">
				<div className="bg-primary/10 p-2 text-sm dark:bg-dark/10">p="0"</div>
			</Card>
			<Card p="2">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="2"</div>
			</Card>
			<Card p="4">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="4" (default)</div>
			</Card>
			<Card p="8">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">p="8"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Separate Padding</div>
			<Card px="8" py="2">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">px="8" py="2"</div>
			</Card>
			<Card px="2" py="8">
				<div className="bg-primary/10 text-sm dark:bg-dark/10">px="2" py="8"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Border Style</div>
			<Card border="solid" shadow="none">
				<div className="text-sm">Solid border border="solid"</div>
			</Card>
			<Card border="dashed" shadow="none">
				<div className="text-sm">Dashed border border="dashed"</div>
			</Card>
			<Card border="dotted" shadow="none">
				<div className="text-sm">Dotted border border="dotted"</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Border Width</div>
			<Card border="solid" borderWidth="1" shadow="none">
				<div className="text-sm">Border width 1</div>
			</Card>
			<Card border="solid" borderWidth="2" shadow="none">
				<div className="text-sm">Border width 2</div>
			</Card>
			<Card border="solid" borderWidth="4" shadow="none">
				<div className="text-sm">Border width 4</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">With Header</div>
			<Card header={<div className="font-bold">Card Title</div>}>
				<div className="text-sm">This is the card content area</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">With Footer</div>
			<Card
				footer={
					<div className="flex justify-end gap-2">
						<Button size="sm" fill="text">
							Cancel
						</Button>
						<Button size="sm">Confirm</Button>
					</div>
				}
			>
				<div className="text-sm">This is the card content area</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Complete Card</div>
			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="font-bold">User Info</div>
						<button
							type="button"
							ref={userActionTrigger}
							className="cursor-pointer border-0 bg-transparent p-0"
							onClick={() => setUserActionVisible((prev) => !prev)}
							aria-label="More actions"
						>
							<Icon name="ri-more-line" size={20} />
						</button>
						<ActionPopover
							visible={userActionVisible}
							triggerRef={userActionTrigger}
							actions={userActions}
							inlineAlign="right"
							align="left"
							onClose={() => setUserActionVisible(false)}
						/>
					</div>
				}
				footer={
					<div className="flex justify-between text-sm text-gray-500">
						<span>3 years of experience</span>
						<span>New York</span>
					</div>
				}
			>
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
						<Icon name="ri-user-fill" size={24} />
					</div>
					<div>
						<div className="font-bold">John Doe</div>
						<div className="text-sm text-gray-500">Frontend Developer</div>
					</div>
				</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Without Divider Lines</div>
			<Card
				headerLine={false}
				footerLine={false}
				header={<div className="font-bold">Card Title</div>}
				footer={<div className="text-sm text-gray-500">Footer info</div>}
			>
				<div className="text-sm">This is the card content area without header and footer divider lines</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Clickable Card</div>
			<Card onClick={() => showToast('Card clicked')}>
				<div className="text-sm">Click me</div>
			</Card>
			<Toast visible={toastVisible} message={toastMessage} onClose={() => setToastVisible(false)} />

			<div className="mx-4 mt-8 text-lg font-bold">Custom Style</div>
			<Card injClass="!bg-primary/10 dark:!bg-dark/10">
				<div className="text-sm">Custom background color</div>
			</Card>
			<Card injClass="ring-2 ring-primary dark:ring-dark">
				<div className="text-sm">Custom ring border</div>
			</Card>
			<Card headerClass="!bg-primary/10 dark:!bg-dark/10" header={<div className="font-bold">Custom header style</div>}>
				<div className="text-sm">Content area</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Complex Content</div>
			<Card
				header={
					<div className="flex items-center gap-2">
						<Icon name="ri-article-line" size={20} />
						<span className="font-bold">Article Title</span>
					</div>
				}
				footer={
					<div className="flex items-center justify-between text-sm text-gray-500">
						<span>2024-01-01</span>
						<div className="flex gap-4">
							<span className="flex items-center gap-1">
								<Icon name="ri-eye-line" size={16} />
								1234
							</span>
							<span className="flex items-center gap-1">
								<Icon name="ri-heart-line" size={16} />
								56
							</span>
						</div>
					</div>
				}
			>
				<div className="space-y-2">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						This is an article summary that can contain multiple lines of text. The Card component provides flexible layout options,
						allowing you to customize the header, content, and footer areas as needed.
					</p>
					<div className="flex gap-2">
						<span className="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">Tag One</span>
						<span className="rounded bg-primary/10 px-2 py-1 text-xs dark:bg-dark/10">Tag Two</span>
					</div>
				</div>
			</Card>

			<div className="mx-4 mt-8 text-lg font-bold">Business Scenarios</div>

			<Card p="0" onClick={() => showToast('View product details')}>
				<div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
					<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" className="h-3/4 object-contain" />
				</div>
				<div className="p-3">
					<div className="line-clamp-2 text-sm">Apple AirPods Pro 2 Wireless Earbuds Active Noise Cancelling MagSafe Case</div>
					<div className="mt-2 flex items-baseline gap-1">
						<span className="text-lg font-bold text-red-500">$ 229</span>
						<span className="text-xs text-gray-400 line-through">$ 249</span>
					</div>
					<div className="mt-2 flex items-center justify-between text-xs text-gray-500">
						<span>12K+ sold</span>
						<span className="flex items-center gap-0.5">
							<Icon name="ri-star-fill" size={12} state="theme" />
							4.9
						</span>
					</div>
				</div>
			</Card>

			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon name="ri-store-2-line" size={18} />
							<span className="font-medium">Apple Official Store</span>
						</div>
						<span className="text-sm text-primary dark:text-dark">Pending Shipment</span>
					</div>
				}
				footer={
					<div className="flex justify-end gap-2">
						<Button size="sm" fill="lineState">
							Contact
						</Button>
						<Button size="sm">Remind</Button>
					</div>
				}
			>
				<div className="flex gap-3">
					<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
						<img src="/assets/images/airpods-pro2.png" alt="AirPods Pro" className="h-3/4 object-contain" />
					</div>
					<div className="flex flex-1 flex-col justify-between">
						<div className="line-clamp-2 text-sm">Apple AirPods Pro 2 Wireless Earbuds</div>
						<div className="flex items-center justify-between">
							<span className="text-xs text-gray-500">White × 1</span>
							<span className="font-medium">$ 229</span>
						</div>
					</div>
				</div>
			</Card>

			<Card onClick={() => showToast('View notification details')}>
				<div className="flex gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-dark/10">
						<Icon name="ri-notification-3-line" size={20} state="theme" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<span className="font-medium">System Notification</span>
							<span className="text-xs text-gray-400">10 min ago</span>
						</div>
						<p className="mt-1 line-clamp-2 text-sm text-gray-500">
							Your order has been shipped. Tracking number: SF1234567890. Please check it.
						</p>
					</div>
				</div>
			</Card>

			<Card p="0" border="dashed" shadow="none">
				<div className="flex">
					<div className="flex w-24 shrink-0 flex-col items-center justify-center bg-primary/10 p-3 dark:bg-dark/10">
						<div className="flex items-baseline">
							<span className="text-xs text-primary dark:text-dark">$</span>
							<span className="text-3xl font-bold text-primary dark:text-dark">50</span>
						</div>
						<div className="text-xs text-gray-500">Min. spend $ 200</div>
					</div>
					<div className="flex flex-1 flex-col justify-between p-3">
						<div>
							<div className="font-medium">New User Coupon</div>
							<div className="mt-1 text-xs text-gray-500">Valid for all categories, some exclusions apply</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-xs text-gray-400">Expires 2024.12.31</span>
							<Button size="sm">Use Now</Button>
						</div>
					</div>
				</div>
			</Card>

			<Card
				header={
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon name="ri-truck-line" size={18} state="theme" />
							<span className="font-medium text-primary dark:text-dark">In Transit</span>
						</div>
						<span className="text-xs text-gray-500">FedEx</span>
					</div>
				}
			>
				<Steps steps={logisticsSteps} current={1} vertical />
			</Card>

			<Card injClass="!bg-linear-to-br !from-primary !to-primary/70 dark:!from-dark dark:!to-dark/70 !text-white">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon name="ri-bank-card-line" size={24} />
						<span className="font-medium">Chase Bank</span>
					</div>
					<span className="text-sm opacity-80">Debit Card</span>
				</div>
				<div className="mt-6 text-2xl tracking-widest">**** **** **** 8888</div>
				<div className="mt-4 flex items-center justify-between text-sm opacity-80">
					<span>John Doe</span>
					<span>Valid thru 12/28</span>
				</div>
			</Card>

			<div className="h-8" />
		</div>
	);
}

export default CardEn;
