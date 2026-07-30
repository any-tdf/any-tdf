import { useEffect, useState } from 'react';
import { Cell, Dialog, Loading, Toast } from 'rtdf/components';

const DialogEn = () => {
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
	const [visible16, setVisible16] = useState(false);
	const [visible17, setVisible17] = useState(false);
	const [visible18, setVisible18] = useState(false);
	const [visible19, setVisible19] = useState(false);

	const [toastVisible, setToastVisible] = useState(false);
	const [toastVisible2, setToastVisible2] = useState(false);
	const [toastVisible3, setToastVisible3] = useState(false);
	const [toastVisible4, setToastVisible4] = useState(false);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (visible8) {
			const timer = setTimeout(() => {
				setVisible8(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [visible8]);

	const somethingFnc = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setVisible18(false);
			setToastVisible4(true);
		}, 3000);
	};

	const aphorism = (
		<div className="px-4 py-2 text-sm text-justify">
			Life is not about waiting for the storm to pass, but learning to dance in the rain.
			<div className="mt-1 text-right italic">- Vivian Greene</div>
		</div>
	);

	const aphorismList = (
		<div className="max-h-56 overflow-auto px-4 py-2">
			<div className="border-b border-black/5 py-2 text-sm text-justify dark:border-white/5">
				Life is not about waiting for the storm to pass, but learning to dance in the rain.
				<div className="mt-1 text-right italic">- Vivian Greene</div>
			</div>
			<div className="border-b border-black/5 py-2 text-sm text-justify dark:border-white/5">
				Do not dwell on years gone by. Face the time that is slipping away.
				<div className="mt-1 text-right">- Bertolt Brecht</div>
			</div>
			<div className="border-b border-black/5 py-2 text-sm text-justify dark:border-white/5">
				We cannot direct the wind, but we can adjust the sails.
				<div className="mt-1 text-right italic">- Aristotle</div>
			</div>
			<div className="border-b border-black/5 py-2 text-sm text-justify dark:border-white/5">
				Life is like riding a bicycle. To keep your balance, you must keep moving.
				<div className="mt-1 text-right italic">- Albert Einstein</div>
			</div>
			<div className="border-b border-black/5 py-2 text-sm text-justify dark:border-white/5">
				Success is not final, failure is not fatal. It is the courage to continue that counts.
				<div className="mt-1 text-right italic">- Winston Churchill</div>
			</div>
			<div className="py-2 text-sm text-justify">
				The hardest time is often not far from success.
				<div className="mt-1 text-right italic">- Napoleon</div>
			</div>
		</div>
	);

	return (
		<div className="py-4">
			<Cell title="Basic Usage" onClick={() => setVisible1(true)} />
			<Dialog visible={visible1} title="Li Xiaoyao" content="Go to Fairy Island?" onClose={() => setVisible1(false)} />

			<Cell title="Content with contentChild" onClick={() => setVisible2(true)} />
			<Dialog visible={visible2} contentChild={aphorism} onClose={() => setVisible2(false)} />

			<Cell title="No Title" onClick={() => setVisible3(true)} />
			<Dialog visible={visible3} title="" onClose={() => setVisible3(false)} />

			<Cell title="Close on Mask Click" onClick={() => setVisible5(true)} />
			<Dialog visible={visible5} popup={{ maskClosable: true }} onClose={() => setVisible5(false)} />

			<Cell title="Custom Icon" onClick={() => setVisible6(true)} />
			<Dialog
				visible={visible6}
				content="Please wear a mask!"
				showIcon
				icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-info' }}
				secondaryText="No mask"
				primaryText="OK"
				onClose={() => setVisible6(false)}
			/>

			<Cell title="Scrollable Content" onClick={() => setVisible4(true)} />
			<Dialog visible={visible4} contentChild={aphorismList} onClose={() => setVisible4(false)} />

			<Cell title="Bounce Animation" onClick={() => setVisible11(true)} />
			<Dialog visible={visible11} content="Bounce transition" popup={{ easeType: 'backOut' }} onClose={() => setVisible11(false)} />

			<Cell title="Left Title" onClick={() => setVisible7(true)} />
			<Dialog visible={visible7} title="Left Title" titleAlign="left" onClose={() => setVisible7(false)} />

			<Cell title="Auto Close" onClick={() => setVisible8(true)} />
			<Dialog visible={visible8} content="Do not move! Closing in 3 seconds!" onClose={() => setVisible8(false)} />

			<Cell title="Primary Button Ratio" onClick={() => setVisible9(true)} />
			<Dialog visible={visible9} btnRatio={[3, 2]} onClose={() => setVisible9(false)} />

			<Cell title="Reverse Button Order" onClick={() => setVisible10(true)} />
			<Dialog visible={visible10} btnReverse onClose={() => setVisible10(false)} />

			<Cell title="Larger Button Gap" onClick={() => setVisible19(true)} />
			<Dialog visible={visible19} btnGap="16" onClose={() => setVisible19(false)} />

			<Cell title="Text Buttons" onClick={() => setVisible12(true)} />
			<Dialog visible={visible12} btnStyle="text" onClose={() => setVisible12(false)} />

			<Cell title="Text Buttons with Line" onClick={() => setVisible13(true)} />
			<Dialog visible={visible13} btnStyle="textLine" onClose={() => setVisible13(false)} />

			<Cell title="Rounded Buttons" onClick={() => setVisible15(true)} />
			<Dialog
				visible={visible15}
				primaryButton={{ radius: 'full' }}
				secondaryButton={{ radius: 'full' }}
				onClose={() => setVisible15(false)}
			/>

			<Cell title="Secondary Event" onClick={() => setVisible14(true)} />
			<Dialog visible={visible14} onSecondary={() => setToastVisible(true)} onClose={() => setVisible14(false)} />
			<Toast visible={toastVisible} message="Cancelled!" onClose={() => setToastVisible(false)} />

			<Cell title="Close Event" onClick={() => setVisible16(true)} />
			<Dialog
				visible={visible16}
				onClose={() => {
					setVisible16(false);
					setToastVisible2(true);
				}}
			/>
			<Toast visible={toastVisible2} message="Dialog closed!" onClose={() => setToastVisible2(false)} />

			<Cell title="Primary Event" onClick={() => setVisible17(true)} />
			<Dialog visible={visible17} onPrimary={() => setToastVisible3(true)} onClose={() => setVisible17(false)} />
			<Toast visible={toastVisible3} message="Confirmed!" onClose={() => setToastVisible3(false)} />

			<Cell title="Async Primary Event" onClick={() => setVisible18(true)} />
			<Dialog
				visible={visible18}
				onPrimary={somethingFnc}
				title="Ghost"
				content="Enter the Demon Tower?"
				primaryChild={<span>{loading ? <Loading inverse width="12" height="6" type="1_17" /> : 'Enter'}</span>}
				onClose={() => setVisible18(false)}
			/>
			<Toast visible={toastVisible4} message="Entered the tower!" onClose={() => setToastVisible4(false)} />
		</div>
	);
};

export default DialogEn;
