import { useEffect, useState } from 'react';
import { Cell, Modal, Toast } from 'rtdf/components';
import Aphorism from '../components/aphorism';

function ModalEn() {
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
	const [visible13, setVisible13] = useState(false);
	const [visible14, setVisible14] = useState(false);
	const [visible15, setVisible15] = useState(false);
	const [toastVisible, setToastVisible] = useState(false);

	useEffect(() => {
		if (visible15) {
			const timer = setTimeout(() => {
				setVisible15(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [visible15]);

	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<Modal
				visible={visible1}
				title="Do you understand?"
				content="Those who stay will suffer the most"
				btnText="I see"
				onClose={() => setVisible1(false)}
			/>

			<Cell title="Content usage Snippet" onClick={() => setVisible2(true)} />
			<Modal visible={visible2} onClose={() => setVisible2(false)} contentChild={<Aphorism num={1} compact />} />

			<Cell title="Do not show the title" onClick={() => setVisible3(true)} />
			<Modal visible={visible3} title="" onClose={() => setVisible3(false)} />

			<Cell title="Do not show button" onClick={() => setVisible4(true)} />
			<Modal visible={visible4} showBtn={false} onClose={() => setVisible4(false)} contentChild={<Aphorism num={1} compact />} />

			<Cell title="Click the mask to close" onClick={() => setVisible5(true)} />
			<Modal visible={visible5} popup={{ maskClosable: true }} onClose={() => setVisible5(false)} />

			<Cell title="Custom icon" onClick={() => setVisible6(true)} />
			<Modal
				visible={visible6}
				content="Please wear a mask!"
				showIcon
				icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'rtdf-demo-text-teal' }}
				onClose={() => setVisible6(false)}
			/>

			<Cell title="Error status button" onClick={() => setVisible8(true)} />
			<Modal visible={visible8} btnText="I was wrong." button={{ state: 'error' }} onClose={() => setVisible8(false)} />

			<Cell title="Full rounded corner button" onClick={() => setVisible9(true)} />
			<Modal visible={visible9} button={{ radius: 'full' }} onClose={() => setVisible9(false)} />

			<Cell title="Theme color plain text button" onClick={() => setVisible12(true)} />
			<Modal visible={visible12} button={{ fill: 'textState' }} onClose={() => setVisible12(false)} />

			<Cell title="Content uses Snippet and scrolls" onClick={() => setVisible10(true)} />
			<Modal
				visible={visible10}
				onClose={() => setVisible10(false)}
				contentChild={
					<div className="h-56 overflow-auto">
						<Aphorism num={6} compact />
					</div>
				}
			/>

			<Cell title="Show narrow" onClick={() => setVisible7(true)} />
			<Modal visible={visible7} popup={{ px: '20' }} onClose={() => setVisible7(false)} />

			<Cell title="Another animation effect" onClick={() => setVisible11(true)} />
			<Modal visible={visible11} content="Rebound transition" popup={{ easeType: 'backOut' }} onClose={() => setVisible11(false)} />

			<Cell title="Listening shutdown event" onClick={() => setVisible13(true)} />
			<Modal
				visible={visible13}
				onClose={() => {
					setVisible13(false);
					setToastVisible(true);
				}}
			/>
			<Toast visible={toastVisible} message="Shut down Modal！" onClose={() => setToastVisible(false)} />

			<Cell title="Heading left" onClick={() => setVisible14(true)} />
			<Modal visible={visible14} title="Heading left" titleAlign="left" onClose={() => setVisible14(false)} />

			<Cell title="Automatic shutdown" onClick={() => setVisible15(true)} />
			<Modal visible={visible15} content="Don't move! I'll be gone in three seconds!" onClose={() => setVisible15(false)} />
		</div>
	);
}

export default ModalEn;
