import { useState } from 'react';
import { Calendar, Cell } from 'rtdf/components';
import type { InfoDateProps } from 'rtdf/types';

export default function CalendarEn() {
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
	const [visible20, setVisible20] = useState(false);
	const [visible21, setVisible21] = useState(false);
	const [visible22, setVisible22] = useState(false);
	const [visible23, setVisible23] = useState(false);
	const [visible24, setVisible24] = useState(false);
	const [visible25, setVisible25] = useState(false);

	const now = new Date();
	const infoDates: InfoDateProps[] = [];
	for (let i = 0; i < 6; i++) {
		const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
		infoDates.push({
			text: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
			info: ['Set off', 'Stay', 'Shopping', 'Photo', 'Leave', 'Return'][i]
		});
	}

	const disabledDates: string[] = [];
	const before7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	for (let i = 0; i < 14; i++) {
		const date = new Date(before7.getTime() + i * 24 * 60 * 60 * 1000);
		disabledDates.push(
			`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
		);
	}

	const getInitMonth = (n: number) => {
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const newMonth = month - n;
		if (newMonth > 0) {
			return `${year}${newMonth.toString().padStart(2, '0')}`;
		}
		return `${year - 1}${(12 + newMonth).toString().padStart(2, '0')}`;
	};

	const initMonth = getInitMonth(3);
	const quickSelectsDay = [-5, -2, 3, 7];

	const [selectedDates, setSelectedDates] = useState<string[]>([]);
	const [selectedFormatDates, setSelectedFormatDates] = useState<string[]>([]);
	const [noPopupDates, setNoPopupDates] = useState<string[]>([]);

	return (
		<div className="py-4">
			<Cell title="Basic usage" onClick={() => setVisible1(true)} />
			<Calendar visible={visible1} onClose={() => setVisible1(false)} />

			<Cell title="Choice" onClick={() => setVisible2(true)} />
			<Calendar visible={visible2} mode="multiple" onClose={() => setVisible2(false)} />

			<Cell title="Range selection" onClick={() => setVisible3(true)} />
			<Calendar visible={visible3} mode="range" onClose={() => setVisible3(false)} />

			<Cell title="Starting from Sunday" onClick={() => setVisible4(true)} />
			<Calendar visible={visible4} startSunday onClose={() => setVisible4(false)} />

			<Cell title="Weekend text marking red" onClick={() => setVisible5(true)} />
			<Calendar visible={visible5} weekendRed onClose={() => setVisible5(false)} />

			<Cell title="No card style but add watermark" onClick={() => setVisible6(true)} />
			<Calendar visible={visible6} monthCard={false} monthMark onClose={() => setVisible6(false)} />

			<Cell title="Higher" onClick={() => setVisible7(true)} />
			<Calendar visible={visible7} height={60} onClose={() => setVisible7(false)} />

			<Cell title="Customize the date of display information" onClick={() => setVisible8(true)} />
			<Calendar visible={visible8} infoDates={infoDates} onClose={() => setVisible8(false)} />

			<Cell title="Do not round the corner" onClick={() => setVisible13(true)} />
			<Calendar visible={visible13} mode="range" radius="none" onClose={() => setVisible13(false)} />

			<Cell title="Increase the corner" onClick={() => setVisible14(true)} />
			<Calendar visible={visible14} mode="range" radius="2xl" onClose={() => setVisible14(false)} />

			<Cell title="Turn off the animation when rolling" onClick={() => setVisible15(true)} />
			<Calendar visible={visible15} useAnimation={false} onClose={() => setVisible15(false)} />

			<Cell title="Configure confirmation button style" onClick={() => setVisible16(true)} />
			<Calendar visible={visible16} button={{ radius: 'full' }} onClose={() => setVisible16(false)} />

			<Cell title="Top rounded corner" onClick={() => setVisible17(true)} />
			<Calendar visible={visible17} popup={{ radius: 'xl' }} onClose={() => setVisible17(false)} />

			<Cell title="Definition start and end month" onClick={() => setVisible18(true)} />
			<Calendar visible={visible18} startMonth="202101" endMonth="202106" onClose={() => setVisible18(false)} />

			<Cell title="Customize the unsalented date" onClick={() => setVisible9(true)} />
			<Calendar visible={visible9} disabledDates={disabledDates} mode="range" onClose={() => setVisible9(false)} />

			<Cell title="No showed days have been displayed" onClick={() => setVisible19(true)} />
			<Calendar visible={visible19} mode="range" showSelectedDay={false} onClose={() => setVisible19(false)} />

			<Cell title="Customized initial display month" subTitle="Third month before the current month" onClick={() => setVisible10(true)} />
			<Calendar visible={visible10} initMonth={initMonth} onClose={() => setVisible10(false)} />

			<Cell title="Show some fast selection items" onClick={() => setVisible11(true)} />
			<Calendar
				visible={visible11}
				mode="range"
				quickSelects={['week', 'month', 'quarter', -3, -7, -30, 3, 7, 30]}
				onClose={() => setVisible11(false)}
			/>

			<Cell title="Quickly choose to include that day" onClick={() => setVisible20(true)} />
			<Calendar visible={visible20} mode="range" quickSelects={quickSelectsDay} includeToday onClose={() => setVisible20(false)} />

			<Cell title="Select this week from Sunday" onClick={() => setVisible21(true)} />
			<Calendar visible={visible21} mode="range" startSunday quickSelects={['week']} onClose={() => setVisible21(false)} />

			<div className="px-4">
				{selectedDates.length > 0 ? (
					<div>The following is the following total {selectedDates.length} day:</div>
				) : (
					<div>Please select the date</div>
				)}
			</div>
			<div className="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
				{selectedDates.map((item, index) => (
					<div key={index} className="text-center">
						{item}
					</div>
				))}
			</div>
			<Cell title="Get the selection date of returning" onClick={() => setVisible12(true)} />
			<Calendar visible={visible12} mode="range" onConfirm={setSelectedDates} onClose={() => setVisible12(false)} />

			<div className="px-4">
				{selectedFormatDates.length > 0 ? (
					<div>The following is the following total {selectedFormatDates.length} day:</div>
				) : (
					<div>Please select the date</div>
				)}
			</div>
			<div className="grid grid-cols-3 gap-2 p-2 text-sm text-primary dark:text-dark">
				{selectedFormatDates.map((item, index) => (
					<div key={index} className="text-center">
						{item}
					</div>
				))}
			</div>
			<Cell title="Customized date format" onClick={() => setVisible22(true)} />
			<Calendar visible={visible22} mode="range" outFormat="M/D/Y" onConfirm={setSelectedFormatDates} onClose={() => setVisible22(false)} />

			<Cell title="Turn off today's highlight display" onClick={() => setVisible23(true)} />
			<Calendar visible={visible23} highlightToday={false} onClose={() => setVisible23(false)} />

			<Cell title="Do not clear the selected date when closing" onClick={() => setVisible24(true)} />
			<Calendar visible={visible24} mode="range" clear={false} onClose={() => setVisible24(false)} />

			<Cell title="Custom month card style" onClick={() => setVisible25(true)} />
			<Calendar visible={visible25} card={{ bg: 'theme' }} onClose={() => setVisible25(false)} />

			<div className="px-4 py-2">Without Popup</div>
			{noPopupDates.length > 0 && (
				<>
					<div className="px-4">The following is the following total {noPopupDates.length} day:</div>
					<div className="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
						{noPopupDates.map((item, index) => (
							<div key={index} className="text-center">
								{item}
							</div>
						))}
					</div>
				</>
			)}
			<Calendar popup={null} mode="range" onConfirm={setNoPopupDates} />
		</div>
	);
}
