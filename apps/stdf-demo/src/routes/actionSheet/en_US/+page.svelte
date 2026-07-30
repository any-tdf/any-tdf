<!-- ActionSheet Demo -->
<script lang="ts">
	import { Cell, ActionSheet, Toast } from 'stdf';
	import { type ActionProps } from 'stdf/types';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);

	const actions = [{ content: 'Option one' }, { content: 'Option two' }, { content: 'Option three' }];

	const actions1: ActionProps[] = [
		{ content: 'Normal option' },
		{ content: 'Theme option', style: 'theme' },
		{ content: 'Success option', style: 'success' },
		{ content: 'Warning option', style: 'warning' },
		{ content: 'Error option', style: 'error' },
		{ content: 'Info option', style: 'info' },
		{ content: 'Disabled option', style: 'warning', disabled: true }
	];
	const actions2: ActionProps[] = [
		{ content: 'Option one' },
		{ content: 'Option two', desc: 'Here is the description information' },
		{ content: 'Option three', style: 'error', desc: 'Here is the description information' }
	];
	const actions3: ActionProps[] = [
		{ content: 'Lina', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'sm' },
		{ content: 'SB', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'sm' },
		{ content: 'Morph', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'sm' }
	];
	const actions4: ActionProps[] = [
		{ content: 'Apple', showImg: true, imgSrc: '/assets/logos/apple.png', imgRadius: 'none' },
		{ content: 'Google', showImg: true, imgSrc: '/assets/logos/google.png', imgRadius: 'none' },
		{ content: 'Microsoft', showImg: true, imgSrc: '/assets/logos/microsoft.png', imgRadius: 'none' },
		{ content: 'Adobe', showImg: true, imgSrc: '/assets/logos/adobe.png', imgRadius: 'none' },
		{ content: 'Figma', showImg: true, imgSrc: '/assets/logos/figma.png', imgRadius: 'none' }
	];

	let toastVisible1 = $state(false);
	let toastVisible2 = $state(false);
	let toastVisible3 = $state(false);
	let index = $state(0);
	let item = $state({ content: '' });
	const clickActionFunc = (i: number, action: ActionProps) => {
		index = i;
		item = action;
		toastVisible3 = true;
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<ActionSheet bind:visible={visible1} {actions} />

	<Cell title="With cancel operation and click mask not closable" onclick={() => (visible2 = true)} />
	<ActionSheet bind:visible={visible2} {actions} showCancel popup={{ maskClosable: false }} />

	<Cell title="Different styles" onclick={() => (visible3 = true)} />
	<ActionSheet bind:visible={visible3} actions={actions1} />

	<Cell title="With title and description information" onclick={() => (visible4 = true)} />
	<ActionSheet bind:visible={visible4} actions={actions2} title="Here is the title, which can briefly explain the following operations." />

	<Cell title="Top corner rounded" onclick={() => (visible5 = true)} />
	<ActionSheet bind:visible={visible5} {actions} popup={{ radius: 'xl' }} />

	<Cell title="With spacing on both sides" onclick={() => (visible6 = true)} />
	<ActionSheet bind:visible={visible6} {actions} popup={{ radius: 'xl', px: '2' }} />

	<Cell title="Listen to close event" onclick={() => (visible7 = true)} />
	<ActionSheet bind:visible={visible7} {actions} onclose={() => (toastVisible1 = true)} />
	<Toast bind:visible={toastVisible1} message="Closed ActionSheet!" />

	<Cell title="Listen to cancel event" onclick={() => (visible8 = true)} />
	<ActionSheet bind:visible={visible8} {actions} showCancel oncancel={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="Clicked cancel!" />

	<Cell title="Listen to action click event" onclick={() => (visible9 = true)} />
	<ActionSheet bind:visible={visible9} {actions} onclickAction={clickActionFunc} />
	<Toast bind:visible={toastVisible3} message={`Clicked item ${index + 1}, ${item.content}!`} />

	<Cell title="Do not close on click" onclick={() => (visible10 = true)} />
	<ActionSheet bind:visible={visible10} {actions} actionClosable={false} />

	<Cell title="Options with images" onclick={() => (visible11 = true)} />
	<ActionSheet bind:visible={visible11} actions={actions3} />

	<Cell title="Left aligned options" onclick={() => (visible12 = true)} />
	<ActionSheet bind:visible={visible12} actions={actions4} align="left" />
</div>
