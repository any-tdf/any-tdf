import { useMemo, useState } from 'react';
import { Cell, TimePicker } from 'rtdf/components';
import type { TimePickerObjProps } from 'rtdf/types';

export default function TimePickerEn() {
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
	const [visible6, setVisible6] = useState(false);
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

	const [defaultTimeStr, setDefaultTimeStr] = useState('');
	const [customFormatStr, setCustomFormatStr] = useState('');
	const [monthFirstStr, setMonthFirstStr] = useState('');
	const [timeObj, setTimeObj] = useState<TimePickerObjProps | Record<string, never>>({});
	const timeObjStr = useMemo(() => JSON.stringify(timeObj), [timeObj]);

	return (
		<div className="py-4">
			<div className="px-4">
				{defaultTimeStr !== '' ? (
					<>
						Currently selected:
						<span className="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
					</>
				) : (
					<div>Please select a time</div>
				)}
			</div>
			<Cell
				title="Basic Usage"
				subTitle="Default to current time, can select 10 years before and after"
				onClick={() => setVisible1(true)}
			/>
			<TimePicker visible={visible1} onClose={() => setVisible1(false)} onConfirm={(time) => setDefaultTimeStr(time)} />

			<Cell title="Year Month Day only" onClick={() => setVisible2(true)} />
			<TimePicker visible={visible2} type="YYYYMMDD" onClose={() => setVisible2(false)} />

			<Cell title="Hour Minute Second only" onClick={() => setVisible3(true)} />
			<TimePicker visible={visible3} type="hhmmss" onClose={() => setVisible3(false)} />

			<Cell title="Year Month Day Hour only" onClick={() => setVisible4(true)} />
			<TimePicker visible={visible4} type="YYYYMMDDhh" onClose={() => setVisible4(false)} />

			<Cell title="Hide Tips" onClick={() => setVisible5(true)} />
			<TimePicker visible={visible5} showTips={false} onClose={() => setVisible5(false)} />

			<Cell title="Different visible rows for each column" onClick={() => setVisible6(true)} />
			<TimePicker
				visible={visible6}
				yearProps={{ showRow: 3 }}
				hourProps={{ showRow: 7 }}
				minuteProps={{ showRow: 7 }}
				secondProps={{ showRow: 7 }}
				onClose={() => setVisible6(false)}
			/>

			<Cell title="Different widths for each column" onClick={() => setVisible8(true)} />
			<TimePicker visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} onClose={() => setVisible8(false)} />

			<Cell title="Year data right-aligned, day data left-aligned" onClick={() => setVisible22(true)} />
			<TimePicker
				visible={visible22}
				type="YYYYMMDD"
				yearProps={{ align: 'right' }}
				dayProps={{ align: 'left' }}
				onClose={() => setVisible22(false)}
			/>

			<Cell title="Limit year range" onClick={() => setVisible9(true)} />
			<TimePicker visible={visible9} yearRange={[2022, 2025]} onClose={() => setVisible9(false)} />

			<Cell title="Limit month range" onClick={() => setVisible10(true)} />
			<TimePicker visible={visible10} monthRange={[2, 5]} onClose={() => setVisible10(false)} />

			<Cell title="Limit hour, minute, second range" onClick={() => setVisible11(true)} />
			<TimePicker visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} onClose={() => setVisible11(false)} />

			<Cell title="Minute step of 5" onClick={() => setVisible12(true)} />
			<TimePicker visible={visible12} minuteStep={5} onClose={() => setVisible12(false)} />

			<Cell title="Second step of 10" onClick={() => setVisible13(true)} />
			<TimePicker visible={visible13} secondStep={10} onClose={() => setVisible13(false)} />

			<div className="px-4">
				{customFormatStr !== '' ? (
					<>
						Currently selected:
						<span className="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
					</>
				) : (
					<div>Please select a time</div>
				)}
			</div>
			<Cell
				title="Custom return time format"
				subTitle="Output format: X year X month X day X hour X minute X second"
				onClick={() => setVisible15(true)}
			/>
			<TimePicker
				visible={visible15}
				outFormat="YYYY year MM month DD day hh hour mm minute ss second"
				onConfirm={(timeStr) => setCustomFormatStr(timeStr)}
				onClose={() => setVisible15(false)}
			/>

			<div className="px-4">
				{monthFirstStr !== '' ? (
					<>
						Currently selected:
						<span className="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
					</>
				) : (
					<div>Please select a time</div>
				)}
			</div>
			<Cell title="Return time with month first" onClick={() => setVisible16(true)} />
			<TimePicker
				visible={visible16}
				type="YYYYMMDD"
				outFormat="MM/DD/YYYY"
				onConfirm={(timeStr) => setMonthFirstStr(timeStr)}
				onClose={() => setVisible16(false)}
			/>

			<div className="px-4 text-xs">
				Currently selected:
				<br />
				<span className="mr-2 break-words text-primary dark:text-dark">{timeObjStr}</span>
			</div>
			<Cell title="Return time object" onClick={() => setVisible17(true)} />
			<TimePicker visible={visible17} onConfirm={(_, obj) => setTimeObj(obj)} onClose={() => setVisible17(false)} />

			<Cell title="Rounded corners at the top" onClick={() => setVisible14(true)} />
			<TimePicker visible={visible14} popup={{ radius: 'xl' }} onClose={() => setVisible14(false)} />

			<Cell title="Custom title" onClick={() => setVisible18(true)} />
			<TimePicker visible={visible18} title="Please select a time" onClose={() => setVisible18(false)} />

			<Cell title="Specify initial selected year" onClick={() => setVisible19(true)} />
			<TimePicker visible={visible19} initYear="2020" onClose={() => setVisible19(false)} />

			<Cell title="Specify initial selected month" onClick={() => setVisible20(true)} />
			<TimePicker visible={visible20} initMonth="05" onClose={() => setVisible20(false)} />

			<Cell title="Specify initial selected hour, minute, second" onClick={() => setVisible21(true)} />
			<TimePicker visible={visible21} initHour="05" initMinute="05" initSecond="05" onClose={() => setVisible21(false)} />

			<div className="px-4 py-2">Without Popup</div>
			<TimePicker popup={null} type="YYYYMMDD" height={30} />
		</div>
	);
}
