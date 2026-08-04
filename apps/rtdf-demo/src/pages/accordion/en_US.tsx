import { useState } from 'react';
import { Accordion, Slider } from 'rtdf/components';
import type { AccordionItemProps, AccordionProps } from 'rtdf/types';

const basicItems: AccordionItemProps[] = [
	{
		title: 'What is STDF?',
		content:
			'STDF is a mobile UI component library based on Svelte and Tailwind CSS, providing rich components and theme customization capabilities.'
	},
	{
		title: 'How to install?',
		content:
			'You can quickly create a project with bun create any-tdf@alpha my-app -f react, or manually install the rtdf package into an existing project.'
	},
	{
		title: 'Which frameworks are supported?',
		content: 'STDF is developed based on Svelte 5 and can be used in SvelteKit, Vite + Svelte and other projects.'
	}
];

const iconItems: AccordionItemProps[] = [
	{
		title: 'Basic Components',
		content: 'Includes Button, Icon, Mask, Popup and other basic components.',
		icon: { name: 'ri-apps-2-line', size: 18 }
	},
	{
		title: 'Form Components',
		content: 'Includes Input, Picker, Calendar, Switch and other form components.',
		icon: { name: 'ri-edit-line', size: 18 }
	},
	{
		title: 'Feedback Components',
		content: 'Includes Toast, Modal, Dialog, Loading and other feedback components.',
		icon: { name: 'ri-discuss-line', size: 18 }
	}
];

const disabledItems: AccordionItemProps[] = [
	{ title: 'Available Item 1', content: 'This is an available accordion item.' },
	{ title: 'Disabled Item', content: 'This content will not be displayed.', disabled: true },
	{ title: 'Available Item 2', content: 'This is another available accordion item.' }
];

const radiusOptions: AccordionProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

const AccordionEn = () => {
	const [radiusIndex, setRadiusIndex] = useState(2);
	const [activeIndex1, setActiveIndex1] = useState<number | undefined>(0);
	const [activeIndex2, setActiveIndex2] = useState<number[]>([0, 1]);
	const currentRadius = radiusOptions[radiusIndex];

	return (
		<div className="flex flex-col gap-8 px-2 py-4">
			<div>
				<div className="mb-4 font-bold">Basic usage</div>
				<Accordion items={basicItems} activeIndex={activeIndex1} onChange={(next) => setActiveIndex1(next as number | undefined)} />
			</div>

			<div>
				<div className="mb-4 font-bold">Multiple expand</div>
				<Accordion items={basicItems} multiple activeIndex={activeIndex2} onChange={(next) => setActiveIndex2(next as number[])} />
			</div>

			<div>
				<div className="mb-4 font-bold">Default expand second item</div>
				<Accordion items={basicItems} activeIndex={1} />
			</div>

			<div>
				<div className="mb-4 font-bold">Disabled item</div>
				<Accordion items={disabledItems} />
			</div>

			<div>
				<div className="mb-4 font-bold">Different radius</div>
				<div className="mb-4">
					<Slider
						value={radiusIndex}
						minRange={0}
						maxRange={7}
						step={1}
						showSteps
						stepLabels={radiusLabels}
						onChange={(value) => setRadiusIndex(value)}
					/>
				</div>
				<Accordion items={basicItems} radius={currentRadius} />
			</div>

			<div>
				<div className="mb-4 font-bold">Different border</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} border="solid" />
					<Accordion items={basicItems.slice(0, 2)} border="dashed" />
					<Accordion items={basicItems.slice(0, 2)} border="dotted" />
					<Accordion items={basicItems.slice(0, 2)} border="none" />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">Hide divider</div>
				<Accordion items={basicItems} divider={false} />
			</div>

			<div>
				<div className="mb-4 font-bold">Different expand icons</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} expandIcon="arrow" />
					<Accordion items={basicItems.slice(0, 2)} expandIcon="plus" />
					<Accordion items={basicItems.slice(0, 2)} expandIcon={null} />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">Icon position</div>
				<div className="flex flex-col gap-4">
					<Accordion items={basicItems.slice(0, 2)} iconPosition="right" />
					<Accordion items={basicItems.slice(0, 2)} iconPosition="left" />
				</div>
			</div>

			<div>
				<div className="mb-4 font-bold">With title icons</div>
				<Accordion items={iconItems} />
			</div>

			<div>
				<div className="mb-4 font-bold">Custom content</div>
				<Accordion items={basicItems}>
					{(item, index) => (
						<div className="rounded-md bg-black/5 p-3 dark:bg-white/5">
							<div className="mb-2 text-xs text-black/50 dark:text-white/50">Question {index + 1}</div>
							<div>{item.content}</div>
						</div>
					)}
				</Accordion>
			</div>
		</div>
	);
};

export default AccordionEn;
