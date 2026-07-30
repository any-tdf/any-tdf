import { useState } from 'react';
import { Cell, BottomSheet, Toast, Button } from 'rtdf/components';
import Aphorism from '../components/aphorism';

function BottomSheetEn() {
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

	const [toastBackVisible, setToastBackVisible] = useState(false);
	const [toastCloseVisible, setToastCloseVisible] = useState(false);

	const stayHeightList = [40, 60, 80];
	const [currentHeight, setCurrentHeight] = useState(60);
	const heightChangeFunc = (height: number) => setCurrentHeight(height);

	return (
		<div className="py-4">
			<Cell title="Basic Usage" onClick={() => setVisible1(true)} />
			<BottomSheet visible={visible1} title="This area supports sliding" onClose={() => setVisible1(false)}>
				<div className="flex h-full flex-col justify-center text-center">
					<div>This is the content area</div>
				</div>
			</BottomSheet>

			<Cell title="Content area scrolling" onClick={() => setVisible8(true)} />
			<BottomSheet visible={visible8} onClose={() => setVisible8(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="With back button" onClick={() => setVisible2(true)} />
			<BottomSheet
				visible={visible2}
				showBackIcon
				title="Click back and close to trigger events"
				onBack={() => setToastBackVisible(true)}
				onClose={() => {
					setToastCloseVisible(true);
					setVisible2(false);
				}}
			>
				<Aphorism num={12} />
			</BottomSheet>
			<Toast visible={toastBackVisible} message="Triggered BottomSheet return event!" onClose={() => setToastBackVisible(false)} />
			<Toast visible={toastCloseVisible} message="Triggered BottomSheet close event!" onClose={() => setToastCloseVisible(false)} />

			<Cell title="Initial height is 90" onClick={() => setVisible3(true)} />
			<BottomSheet visible={visible3} stayHeightIndex={2} onClose={() => setVisible3(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="Fixed height is 40/60/80" onClick={() => setVisible4(true)} />
			<BottomSheet
				visible={visible4}
				stayHeightList={stayHeightList}
				onHeightChange={heightChangeFunc}
				title={`Current fixed height is ${currentHeight}`}
				onClose={() => setVisible4(false)}
			>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="Click mask to close" onClick={() => setVisible5(true)} />
			<BottomSheet visible={visible5} maskClosable onClose={() => setVisible5(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Transition time is 1 second" onClick={() => setVisible6(true)} />
			<BottomSheet visible={visible6} duration={1000} onClose={() => setVisible6(false)}>
				<Aphorism num={12} />
			</BottomSheet>

			<Cell title="Mask completely transparent and blurry" onClick={() => setVisible7(true)} />
			<BottomSheet visible={visible7} mask={{ opacity: '0', backdropBlur: 'sm' }} onClose={() => setVisible7(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Header does not display any content" onClick={() => setVisible9(true)} />
			<BottomSheet visible={visible9} showDivider={false} closeContent="" title="" onClose={() => setVisible9(false)}>
				<div className="flex h-full flex-col justify-around px-4 py-8 text-center">
					<div>Header area</div>
					<div>Title</div>
					<div>Back and close icon</div>
					<div>Divider</div>
					<div>None</div>
					<div>Position still reserved as a sliding touch area</div>
					<div className="mb-8">
						<Button onClick={() => setVisible9(false)}>Close</Button>
					</div>
				</div>
			</BottomSheet>

			<Cell title="Hide close icon and center title" onClick={() => setVisible10(true)} />
			<BottomSheet
				visible={visible10}
				closeContent=""
				titleAlign="center"
				maskClosable
				title="Click mask to close"
				onClose={() => setVisible10(false)}
			>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Another close icon" onClick={() => setVisible13(true)} />
			<BottomSheet visible={visible13} closeContent="closeIcon" onClose={() => setVisible13(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Custom close text" onClick={() => setVisible14(true)} />
			<BottomSheet visible={visible14} closeContent="Complete" onClose={() => setVisible14(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Different rounded style" onClick={() => setVisible12(true)} />
			<BottomSheet visible={visible12} radius="md" showBackIcon onClose={() => setVisible12(false)}>
				<Aphorism num={2} />
			</BottomSheet>

			<Cell title="Slide to bottom to close" onClick={() => setVisible11(true)} />
			<BottomSheet visible={visible11} closeHeight={10} closeContent="" onClose={() => setVisible11(false)}>
				<div className="p-4">
					Set closeHeight to 10. If the position distance is less than 10% of the page height when sliding ends, it will be automatically
					closed.
				</div>
			</BottomSheet>
		</div>
	);
}

export default BottomSheetEn;
