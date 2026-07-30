<!--Steps Demo -->
<script lang="ts">
	import { Steps, ButtonGroup, Divider, Icon } from 'stdf';
	import type { ButtonGroupItemProps } from 'stdf/types';
	import type { StepsItemProps } from 'stdf/types';
	import injCom1 from './injCom1_en.svelte';
	import injCom2 from './injCom2_en.svelte';

	const steps: StepsItemProps[] = [
		{ step: { title: 'Get up' } },
		{ step: { title: 'Eat' } },
		{ step: { title: 'Drink' } },
		{ step: { title: 'Beat beans' } },
		{ step: { title: 'sleep' } }
	];
	const steps1: StepsItemProps[] = [
		{ step: { title: 'Get up', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{ step: { title: 'Eat', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: 'Drink', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{ step: { title: 'Beat beans', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } } },
		{ step: { title: 'sleep', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];
	const steps2: StepsItemProps[] = [
		{ step: { title: 'Get up' }, finishStep: { title: 'Have got up' } },
		{ step: { title: 'Eat' }, finishStep: { title: 'Have had enough' } },
		{ step: { title: 'Drink' }, finishStep: { title: 'Drink up' } },
		{ step: { title: 'Beat beans' }, finishStep: { title: 'Have a good time' } },
		{ step: { title: 'sleep' }, finishStep: { title: 'Fall asleep' } }
	];
	const steps3: StepsItemProps[] = [
		{
			step: { title: 'Get up', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
			finishStep: { title: 'Have got up', bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } } }
		},
		{
			step: { title: 'Eat', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
			finishStep: { title: 'Have had enough', bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } } }
		},
		{
			step: { title: 'Drink', bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
			finishStep: { title: 'Drink up', bar: { type: 'icon', content: { name: 'ri-cup-fill' } } }
		},
		{
			step: { title: 'Beat beans', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
			finishStep: { title: 'Have a good time', bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } } }
		},
		{
			step: { title: 'sleep', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
			finishStep: { title: 'Fall asleep', bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
		}
	];
	const steps4: StepsItemProps[] = [
		{ step: { title: 'Get up', desc: 'Get up and move bricks!' } },
		{ step: { title: 'Eat', desc: 'Eat, eat, eat, eat, fat you.' } },
		{ step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.' } },
		{
			step: {
				title: 'Beat beans',
				desc: "Eat, sleep, play peas it's cool, it's cool, it's cool, it's cool. By the way to verify the progress bar height adaptive step text height."
			}
		},
		{ step: { title: 'sleep', desc: 'Too full to sleep.' } }
	];
	const steps5: StepsItemProps[] = [
		{ step: { title: 'Get up', desc: 'Get up and move bricks!', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{ step: { title: 'Eat', desc: 'Eat, eat, eat, eat, fat you.', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{
			step: {
				title: 'Beat beans',
				desc: "Eat, sleep, play peas It's cool, it's cool, it's cool, it's cool, it's cool. By the way to verify the progress bar height adaptive step text height.",
				bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } }
			}
		},
		{ step: { title: 'sleep', desc: 'Too full to sleep.', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];
	const steps6: StepsItemProps[] = [
		{
			step: { title: 'Get up', desc: 'Get up and move bricks!', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } },
			finishStep: { title: 'Have got up', desc: 'The bricks are gone!', bar: { type: 'icon', content: { name: 'ri-hotel-bed-fill' } } }
		},
		{
			step: { title: 'Eat', desc: 'Eat, eat, eat, eat, fat you.', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } },
			finishStep: {
				title: 'Have had enough',
				desc: 'The meal has been eaten up!',
				bar: { type: 'icon', content: { name: 'ri-restaurant-2-fill' } }
			}
		},
		{
			step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.', bar: { type: 'icon', content: { name: 'ri-cup-line' } } },
			finishStep: {
				title: 'Drink up',
				desc: 'I drink too much water and it spills out of my eyes!',
				bar: { type: 'icon', content: { name: 'ri-cup-fill' } }
			}
		},
		{
			step: { title: 'Beat beans', desc: 'Eat, sleep, play beans.', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } },
			finishStep: {
				title: 'Have a good time',
				desc: 'Doudou has been beaten to the ground.',
				bar: { type: 'icon', content: { name: 'ri-emotion-sad-fill' } }
			}
		},
		{
			step: { title: 'sleep', desc: 'Too full to sleep.', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } },
			finishStep: { title: 'Fall asleep', desc: 'Asleep and dreaming!', bar: { type: 'icon', content: { name: 'ri-zzz-fill' } } }
		}
	];
	const steps7: StepsItemProps[] = [
		{ step: { title: 'Get up', desc: 'Get up and move bricks!', bar: { type: 'string', content: '1' } } },
		{ step: { title: 'Eat', desc: 'Eat, eat, eat, eat, fat you.', bar: { type: 'string', content: 'eat' } } },
		{ step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.', bar: { type: 'string', content: '3' } } },
		{ step: { title: 'Beat beans', desc: 'Eat, sleep, play beans.', bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } } } },
		{ step: { title: 'sleep', desc: 'Too full to sleep.', bar: { type: 'string', content: '😴' } } }
	];
	const steps8: StepsItemProps[] = [
		{ step: { title: 'Get up', bar: { type: 'image', content: '/assets/images/avatar_2.png' } } },
		{ step: { title: 'Eat', bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } } } },
		{ step: { title: 'Drink', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{ step: { title: 'Beat beans', bar: { type: 'image', content: '/assets/images/avatar_1.jpg' } } },
		{ step: { title: 'sleep', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];
	const steps9: StepsItemProps[] = [
		{ step: { title: 'Get up', desc: 'Get up and move bricks!', bar: { type: 'icon', content: { name: 'ri-hotel-bed-line' } } } },
		{
			step: {
				title: 'Eat',
				desc: 'Eat, eat, eat, eat, fat you.',
				bar: { type: 'icon', content: { name: 'ri-restaurant-2-line' } },
				injComponent: injCom1
			}
		},
		{ step: { title: 'Drink', desc: 'Walk slowly and drink lots of water.', bar: { type: 'icon', content: { name: 'ri-cup-line' } } } },
		{
			step: {
				title: 'Beat beans',
				desc: 'Eat, sleep, play beans.',
				bar: { type: 'icon', content: { name: 'ri-emotion-sad-line' } },
				injComponent: injCom2
			}
		},
		{ step: { title: 'sleep', desc: 'Too full to sleep.', bar: { type: 'icon', content: { name: 'ri-zzz-line' } } } }
	];

	let current = $state(1);

	const stepButtons: ButtonGroupItemProps[] = [
		{ text: 'Previous', icon: { name: 'ri-arrow-left-s-line', size: 18 }, onclick: () => current > 1 && current-- },
		{ text: 'Next', icon: { name: 'ri-arrow-right-s-line', size: 18 }, iconPosition: 'right', onclick: () => current < steps.length + 1 && current++ }
	];
</script>

<div class="mb-4 mt-8 px-4 text-2xl font-bold">Horizontal arrangement</div>
<div class="mb-4 mt-8 px-4 text-lg font-bold">Simple usage</div>
<Steps {steps} {current} />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Different fillet</div>
<Steps {steps} {current} radius="none" />
<Steps {steps} {current} radius="full" />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Tape icon</div>
<Steps steps={steps1} {current} />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Different icon border</div>
<Steps steps={steps1} {current} barBorder={false} />
<Steps steps={steps1} {current} barBorder={false} radius="full" />
<Steps steps={steps1} {current} radius="none" />
<Steps steps={steps1} {current} radius="xl" />
<Steps steps={steps1} {current} radius="full" />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Tape completion step</div>
<Steps steps={steps2} {current} />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Tape icon && Complete steps</div>
<Steps steps={steps3} {current} />

<div class="mb-4 mt-8 px-4 text-lg font-bold">The step bar area uses text</div>
<Steps steps={steps7} {current} />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Use images for the step bar area</div>
<Steps steps={steps8} {current} />
<Steps steps={steps8} radius="full" {current} />
<Divider />

<div class="mb-4 mt-4 px-4 text-2xl font-bold">Longitudinal arrangement</div>
<div class="mb-4 mt-8 px-4 text-lg font-bold">Different fillet</div>
<div class="flex justify-around">
	<Steps {steps} {current} vertical />
	<Steps {steps} {current} radius="none" vertical />
	<Steps {steps} {current} radius="full" vertical />
</div>

<div class="mb-4 mt-8 px-4 text-lg font-bold">Different icon border</div>
<div class="flex justify-around">
	<Steps steps={steps1} {current} vertical />
	<Steps steps={steps1} {current} vertical radius="full" barBorder={false} />
</div>
<Divider px="8" />
<div class="flex justify-around">
	<Steps steps={steps1} {current} vertical barBorder={false} radius="none" />
	<Steps steps={steps1} {current} vertical radius="none" />
</div>
<Divider px="8" />
<div class="flex justify-around">
	<Steps steps={steps1} {current} vertical radius="xl" />
	<Steps steps={steps1} {current} vertical radius="full" />
</div>

<div class="mb-4 mt-8 px-4 text-lg font-bold">Tape description information</div>
<Steps steps={steps4} {current} vertical />
<Divider px="8" />
<Steps steps={steps5} {current} vertical />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Tape completion step</div>
<Steps steps={steps6} {current} vertical />

<div class="mb-4 mt-8 px-4 text-lg font-bold">The step bar area uses text</div>
<Steps steps={steps7} {current} vertical />

<div class="mb-4 mt-8 px-4 text-lg font-bold">Use images for the step bar area</div>
<div class="flex justify-around">
	<Steps steps={steps8} {current} vertical />
	<Steps steps={steps8} {current} radius="full" vertical />
</div>

<div class="mb-4 mt-8 px-4 text-lg font-bold">The content area injects elements</div>
<Steps steps={steps9} {current} vertical />

<div class="sticky bottom-0 z-10 bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<ButtonGroup items={stepButtons} fill="lineState" size="full" />
</div>

<!-- injCom1.svelte -->
<!--
<div class="text-primary dark:text-dark text-sm">
    <div>Here you inject a picture as a component</div>
    <div class="rounded-full overflow-hidden h-20 w-20">
        <img src="/assets/images/avatar_1.jpg" alt="" />
    </div>
</div>
-->

<!-- injCom2.svelte -->
<!--
<script lang="ts">
    import { Button, Icon, Avatar } from 'stdf';
</script>

<div class="text-primary dark:text-dark text-sm">Here you inject something in the form of a component</div>
<div class="flex items-center space-x-4">
    <Button size="full" heightIn="2" injClass="px-4">button</Button>
    <Avatar image="/assets/images/avatar_1.jpg" size="sm" />
    <Icon name="ri-money-cny-circle-line" state="theme" />
    <Icon name="ri-fingerprint-line" state="theme" />
</div>
-->
