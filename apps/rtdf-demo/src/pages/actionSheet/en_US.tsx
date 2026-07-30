import { useState } from 'react';
import { Cell, ActionSheet, Toast } from 'rtdf/components';
import type { ActionProps } from 'rtdf/types';

function ActionSheetEn() {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
	const [visible7, setVisible7] = useState(false);
	const [visible8, setVisible8] = useState(false);
	const [visible9, setVisible9] = useState(false);
	const [visible10, setVisible10] = useState(false);
	const [visible11, setVisible11] = useState(false);
	const [visible12, setVisible12] = useState(false);

	const actions: ActionProps[] = [{ content: 'Option one' }, { content: 'Option two' }, { content: 'Option three' }];

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

	const [toastVisible1, setToastVisible1] = useState(false);
	const [toastVisible2, setToastVisible2] = useState(false);
	const [toastVisible3, setToastVisible3] = useState(false);
	const [index, setIndex] = useState(0);
	const [item, setItem] = useState<ActionProps>({ content: '' });

	const clickActionFunc = (i: number, action: ActionProps) => {
		setIndex(i);
		setItem(action);
		setToastVisible3(true);
	};

	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<ActionSheet visible={visible1} actions={actions} onClose={() => setVisible1(false)} />

			<Cell title="With cancel operation and click mask not closable" onClick={() => setVisible2(true)} />
			<ActionSheet visible={visible2} actions={actions} showCancel popup={{ maskClosable: false }} onClose={() => setVisible2(false)} />

			<Cell title="Different styles" onClick={() => setVisible3(true)} />
			<ActionSheet visible={visible3} actions={actions1} onClose={() => setVisible3(false)} />

			<Cell title="With title and description information" onClick={() => setVisible4(true)} />
			<ActionSheet
				visible={visible4}
				actions={actions2}
				title="Here is the title, which can briefly explain the following operations."
				onClose={() => setVisible4(false)}
			/>

			<Cell title="Top corner rounded" onClick={() => setVisible5(true)} />
			<ActionSheet visible={visible5} actions={actions} popup={{ radius: 'xl' }} onClose={() => setVisible5(false)} />

			<Cell title="With spacing on both sides" onClick={() => setVisible6(true)} />
			<ActionSheet visible={visible6} actions={actions} popup={{ radius: 'xl', px: '2' }} onClose={() => setVisible6(false)} />

			<Cell title="Listen to close event" onClick={() => setVisible7(true)} />
			<ActionSheet
				visible={visible7}
				actions={actions}
				onClose={() => {
					setVisible7(false);
					setToastVisible1(true);
				}}
			/>
			<Toast visible={toastVisible1} message="Closed ActionSheet!" onClose={() => setToastVisible1(false)} />

			<Cell title="Listen to cancel event" onClick={() => setVisible8(true)} />
			<ActionSheet
				visible={visible8}
				actions={actions}
				showCancel
				onCancel={() => setToastVisible2(true)}
				onClose={() => setVisible8(false)}
			/>
			<Toast visible={toastVisible2} message="Clicked cancel!" onClose={() => setToastVisible2(false)} />

			<Cell title="Listen to action click event" onClick={() => setVisible9(true)} />
			<ActionSheet visible={visible9} actions={actions} onClickAction={clickActionFunc} onClose={() => setVisible9(false)} />
			<Toast visible={toastVisible3} message={`Clicked item ${index + 1}, ${item.content}!`} onClose={() => setToastVisible3(false)} />

			<Cell title="Do not close on click" onClick={() => setVisible10(true)} />
			<ActionSheet visible={visible10} actions={actions} actionClosable={false} onClose={() => setVisible10(false)} />

			<Cell title="Options with images" onClick={() => setVisible11(true)} />
			<ActionSheet visible={visible11} actions={actions3} onClose={() => setVisible11(false)} />

			<Cell title="Left aligned options" onClick={() => setVisible12(true)} />
			<ActionSheet visible={visible12} actions={actions4} align="left" onClose={() => setVisible12(false)} />
		</div>
	);
}

export default ActionSheetEn;
