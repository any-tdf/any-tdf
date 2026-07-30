import { useMemo, useState } from 'react';
import { Cell, TimePicker } from 'rtdf/components';
import type { TimePickerObjProps } from 'rtdf/types';

export default function TimePickerDemo() {
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
						当前选定了：
						<span className="mr-2 text-primary dark:text-dark">{defaultTimeStr}</span>
					</>
				) : (
					<div>请选定时间</div>
				)}
			</div>
			<Cell title="基础用法" subTitle="默认选定当前时间，可选前后十年" onClick={() => setVisible1(true)} />
			<TimePicker visible={visible1} onClose={() => setVisible1(false)} onConfirm={(time) => setDefaultTimeStr(time)} />

			<Cell title="只用年月日" onClick={() => setVisible2(true)} />
			<TimePicker visible={visible2} type="YYYYMMDD" onClose={() => setVisible2(false)} />

			<Cell title="只用时分秒" onClick={() => setVisible3(true)} />
			<TimePicker visible={visible3} type="hhmmss" onClose={() => setVisible3(false)} />

			<Cell title="只用年月日时" onClick={() => setVisible4(true)} />
			<TimePicker visible={visible4} type="YYYYMMDDhh" onClose={() => setVisible4(false)} />

			<Cell title="不显示提示" onClick={() => setVisible5(true)} />
			<TimePicker visible={visible5} showTips={false} onClose={() => setVisible5(false)} />

			<Cell title="不同列不同可见行" onClick={() => setVisible6(true)} />
			<TimePicker
				visible={visible6}
				yearProps={{ showRow: 3 }}
				hourProps={{ showRow: 7 }}
				minuteProps={{ showRow: 7 }}
				secondProps={{ showRow: 7 }}
				onClose={() => setVisible6(false)}
			/>

			<Cell title="不同列不同宽度" onClick={() => setVisible8(true)} />
			<TimePicker visible={visible8} yearProps={{ flex: 3 }} dayProps={{ flex: 2 }} onClose={() => setVisible8(false)} />

			<Cell title="年数据右对齐，日数据左对齐" onClick={() => setVisible22(true)} />
			<TimePicker
				visible={visible22}
				type="YYYYMMDD"
				yearProps={{ align: 'right' }}
				dayProps={{ align: 'left' }}
				onClose={() => setVisible22(false)}
			/>

			<Cell title="限定年份区间" onClick={() => setVisible9(true)} />
			<TimePicker visible={visible9} yearRange={[2022, 2025]} onClose={() => setVisible9(false)} />

			<Cell title="限定月份区间" onClick={() => setVisible10(true)} />
			<TimePicker visible={visible10} monthRange={[2, 5]} onClose={() => setVisible10(false)} />

			<Cell title="限定时分秒区间" onClick={() => setVisible11(true)} />
			<TimePicker visible={visible11} hourRange={[2, 5]} minuteRange={[25, 45]} secondRange={[5, 10]} onClose={() => setVisible11(false)} />

			<Cell title="分钟步长为 5" onClick={() => setVisible12(true)} />
			<TimePicker visible={visible12} minuteStep={5} onClose={() => setVisible12(false)} />

			<Cell title="秒步长为 10" onClick={() => setVisible13(true)} />
			<TimePicker visible={visible13} secondStep={10} onClose={() => setVisible13(false)} />

			<div className="px-4">
				{customFormatStr !== '' ? (
					<>
						当前选定了：
						<span className="mr-2 text-primary dark:text-dark">{customFormatStr}</span>
					</>
				) : (
					<div>请选定时间</div>
				)}
			</div>
			<Cell title="自定义返回时间格式" subTitle="输出格式为 X 年 X 月 X 日 X 时 X 分 X 秒" onClick={() => setVisible15(true)} />
			<TimePicker
				visible={visible15}
				outFormat="YYYY 年 MM 月 DD 日 hh 时 mm 分 ss 秒"
				onConfirm={(timeStr) => setCustomFormatStr(timeStr)}
				onClose={() => setVisible15(false)}
			/>

			<div className="px-4">
				{monthFirstStr !== '' ? (
					<>
						当前选定了：
						<span className="mr-2 text-primary dark:text-dark">{monthFirstStr}</span>
					</>
				) : (
					<div>请选定时间</div>
				)}
			</div>
			<Cell title="返回时间月份在前" onClick={() => setVisible16(true)} />
			<TimePicker
				visible={visible16}
				type="YYYYMMDD"
				outFormat="MM/DD/YYYY"
				onConfirm={(timeStr) => setMonthFirstStr(timeStr)}
				onClose={() => setVisible16(false)}
			/>

			<div className="px-4 text-xs">
				当前选定了：
				<br />
				<span className="mr-2 break-words text-primary dark:text-dark">{timeObjStr}</span>
			</div>
			<Cell title="返回时间对象" onClick={() => setVisible17(true)} />
			<TimePicker visible={visible17} onConfirm={(_, obj) => setTimeObj(obj)} onClose={() => setVisible17(false)} />

			<Cell title="顶部来点圆角" onClick={() => setVisible14(true)} />
			<TimePicker visible={visible14} popup={{ radius: 'xl' }} onClose={() => setVisible14(false)} />

			<Cell title="自定义标题" onClick={() => setVisible18(true)} />
			<TimePicker visible={visible18} title="请选择时间" onClose={() => setVisible18(false)} />

			<Cell title="指定初始选定年份" onClick={() => setVisible19(true)} />
			<TimePicker visible={visible19} initYear="2020" onClose={() => setVisible19(false)} />

			<Cell title="指定初始选定月份" onClick={() => setVisible20(true)} />
			<TimePicker visible={visible20} initMonth="05" onClose={() => setVisible20(false)} />

			<Cell title="指定初始选定时分秒" onClick={() => setVisible21(true)} />
			<TimePicker visible={visible21} initHour="05" initMinute="05" initSecond="05" onClose={() => setVisible21(false)} />

			<div className="px-4 py-2">不使用弹出层</div>
			<TimePicker popup={null} type="YYYYMMDD" height={30} />
		</div>
	);
}
