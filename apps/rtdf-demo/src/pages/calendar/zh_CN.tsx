import { useState } from 'react';
import { Cell, Calendar } from 'rtdf/components';
import type { InfoDateProps } from 'rtdf/types';

/**
 * Calendar 日历组件示例页面
 * Calendar component demo page
 */
export default function CalendarDemo() {
	// 基础用法 / Basic usage
	const [visible1, setVisible1] = useState(false);

	// 多选 / Multiple selection
	const [visible2, setVisible2] = useState(false);

	// 范围选择 / Range selection
	const [visible3, setVisible3] = useState(false);

	// 从周日开始 / Start from Sunday
	const [visible4, setVisible4] = useState(false);

	// 周末文字标红 / Weekend text in red
	const [visible5, setVisible5] = useState(false);

	// 不使用卡片样式且加水印 / No card style and with watermark
	const [visible6, setVisible6] = useState(false);

	// 高一点 / Higher
	const [visible7, setVisible7] = useState(false);

	// 自定义显示信息的日期 / Custom dates with display info
	const [visible8, setVisible8] = useState(false);

	// 自定义不可选日期 / Custom disabled dates
	const [visible9, setVisible9] = useState(false);

	// 自定义初始显示月份 / Custom initial month
	const [visible10, setVisible10] = useState(false);

	// 展示一些快速选择项 / Show quick select options
	const [visible11, setVisible11] = useState(false);

	// 自定义返回的日期格式 / Custom return date format
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

	// 随机取出当前日期后的 6 天，组成 infoDates 数组，其中 date 格式为 YYYYMMDD，月和日补足 2 位
	// Randomly take 6 days after the current date to form an infoDates array, where the date format is YYYYMMDD, and the month and day are padded to 2 digits
	const now = new Date();
	const infoDates: InfoDateProps[] = [];
	for (let i = 0; i < 6; i++) {
		const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
		infoDates.push({
			text: `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`,
			info: ['出发', '入住', '购物', '拍照', '离店', '回程'][i]
		});
	}

	// 获取当前日期的前 7 天和后 7 天共 14 天，组成数组 disabledDates，其中 date 格式为 YYYYMMDD，月和日补足 2 位
	// Get 14 days from 7 days before to 7 days after the current date to form an array disabledDates, where the date format is YYYYMMDD, and the month and day are padded to 2 digits
	const disabledDates: string[] = [];
	const before7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	for (let i = 0; i < 14; i++) {
		const date = new Date(before7.getTime() + i * 24 * 60 * 60 * 1000);
		disabledDates.push(
			`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
		);
	}

	// 传入数字 n，返回当前月份往前推第 n 个月的月份，格式为 YYYYMM，月份补足 2 位
	// Pass in a number n and return the month n months before the current month, in the format YYYYMM, with the month padded to 2 digits
	const getInitMonth = (n: number) => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const newMonth = month - n;
		if (newMonth > 0) {
			return `${year}${newMonth.toString().padStart(2, '0')}`;
		} else {
			return `${year - 1}${(12 + newMonth).toString().padStart(2, '0')}`;
		}
	};

	const initMonth = getInitMonth(3);
	const quickSelectsDay = [-5, -2, 3, 7];

	// 选中的日期 / Selected dates
	const [selectedDates, setSelectedDates] = useState<string[]>([]);
	const getSelectedDatesFunc = (dates: string[]) => {
		setSelectedDates(dates);
	};

	// 格式化的选中日期 / Formatted selected dates
	const [selectedFormatDates, setSelectedFormatDates] = useState<string[]>([]);
	const getSelectedFormatDatesFunc = (dates: string[]) => {
		setSelectedFormatDates(dates);
	};

	const [noPopupDates, setNoPopupDates] = useState<string[]>([]);
	const getNoPopupDatesFunc = (dates: string[]) => {
		setNoPopupDates(dates);
	};

	return (
		<div className="py-4">
			<Cell title="基础用法" onClick={() => setVisible1(true)} />
			<Calendar visible={visible1} onClose={() => setVisible1(false)} />

			<Cell title="多选" onClick={() => setVisible7(true)} />
			<Calendar visible={visible7} mode="multiple" onClose={() => setVisible7(false)} />

			<Cell title="范围选择" onClick={() => setVisible8(true)} />
			<Calendar visible={visible8} mode="range" onClose={() => setVisible8(false)} />

			<Cell title="从周日开始" onClick={() => setVisible2(true)} />
			<Calendar visible={visible2} startSunday onClose={() => setVisible2(false)} />

			<Cell title="周末文字标红" onClick={() => setVisible3(true)} />
			<Calendar visible={visible3} weekendRed onClose={() => setVisible3(false)} />

			<Cell title="不使用卡片样式且加水印" onClick={() => setVisible4(true)} />
			<Calendar visible={visible4} monthCard={false} monthMark onClose={() => setVisible4(false)} />

			<Cell title="高一点" onClick={() => setVisible5(true)} />
			<Calendar visible={visible5} height={60} onClose={() => setVisible5(false)} />

			<Cell title="自定义显示信息的日期" onClick={() => setVisible6(true)} />
			<Calendar visible={visible6} infoDates={infoDates} onClose={() => setVisible6(false)} />

			<Cell title="不要圆角" onClick={() => setVisible9(true)} />
			<Calendar visible={visible9} mode="range" radius="none" onClose={() => setVisible9(false)} />

			<Cell title="加大圆角" onClick={() => setVisible10(true)} />
			<Calendar visible={visible10} mode="range" radius="2xl" onClose={() => setVisible10(false)} />

			<Cell title="滚动时关闭动画" onClick={() => setVisible18(true)} />
			<Calendar visible={visible18} useAnimation={false} onClose={() => setVisible18(false)} />

			<Cell title="配置确认按钮样式" onClick={() => setVisible11(true)} />
			<Calendar visible={visible11} button={{ radius: 'full' }} onClose={() => setVisible11(false)} />

			<Cell title="顶部来点圆角" onClick={() => setVisible19(true)} />
			<Calendar visible={visible19} popup={{ radius: 'xl' }} onClose={() => setVisible19(false)} />

			<Cell title="定义开始与结束月" onClick={() => setVisible12(true)} />
			<Calendar visible={visible12} startMonth="202101" endMonth="202106" onClose={() => setVisible12(false)} />

			<Cell title="自定义不可选日期" onClick={() => setVisible13(true)} />
			<Calendar visible={visible13} disabledDates={disabledDates} mode="range" onClose={() => setVisible13(false)} />

			<Cell title="多选或范围选择时不显示已选天数" onClick={() => setVisible14(true)} />
			<Calendar visible={visible14} mode="range" showSelectedDay={false} onClose={() => setVisible14(false)} />

			<Cell title="自定义初始显示月份" subTitle="开始月份为当前月份前第三个月" onClick={() => setVisible15(true)} />
			<Calendar visible={visible15} initMonth={initMonth} onClose={() => setVisible15(false)} />

			<Cell title="展示一些快速选择项" onClick={() => setVisible16(true)} />
			<Calendar
				visible={visible16}
				mode="range"
				quickSelects={['week', 'month', 'quarter', -3, -7, -30, 3, 7, 30]}
				onClose={() => setVisible16(false)}
			/>

			<Cell title="快速选择天数时包含当天" onClick={() => setVisible23(true)} />
			<Calendar visible={visible23} mode="range" quickSelects={quickSelectsDay} includeToday onClose={() => setVisible23(false)} />

			<Cell title="从周日开始快速选择本周" onClick={() => setVisible17(true)} />
			<Calendar visible={visible17} mode="range" startSunday quickSelects={['week']} onClose={() => setVisible17(false)} />

			<div className="px-4">
				{selectedDates.length > 0 ? <div>当前选定了以下共 {selectedDates.length} 天：</div> : <div>请选定日期</div>}
			</div>
			<div className="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
				{selectedDates.map((item, index) => (
					<div key={index} className="text-center">
						{item}
					</div>
				))}
			</div>
			<Cell title="获取返回的选定日期" onClick={() => setVisible20(true)} />
			<Calendar visible={visible20} mode="range" onConfirm={getSelectedDatesFunc} onClose={() => setVisible20(false)} />

			<div className="px-4">
				{selectedFormatDates.length > 0 ? <div>当前选定了以下共 {selectedFormatDates.length} 天：</div> : <div>请选定日期</div>}
			</div>
			<div className="grid grid-cols-3 gap-2 p-2 text-sm text-primary dark:text-dark">
				{selectedFormatDates.map((item, index) => (
					<div key={index} className="text-center">
						{item}
					</div>
				))}
			</div>
			<Cell title="自定义返回的日期格式" onClick={() => setVisible21(true)} />
			<Calendar
				visible={visible21}
				mode="range"
				outFormat="YYYY年MM月DD日"
				onConfirm={getSelectedFormatDatesFunc}
				onClose={() => setVisible21(false)}
			/>

			<Cell title="今日日期关闭高亮显示" onClick={() => setVisible22(true)} />
			<Calendar visible={visible22} highlightToday={false} onClose={() => setVisible22(false)} />

			<Cell title="关闭时不清空已选日期" onClick={() => setVisible24(true)} />
			<Calendar visible={visible24} mode="range" clear={false} onClose={() => setVisible24(false)} />

			<Cell title="自定义月份卡片样式" onClick={() => setVisible25(true)} />
			<Calendar visible={visible25} card={{ bg: 'theme' }} onClose={() => setVisible25(false)} />

			<div className="px-4 py-2">不使用弹出层</div>
			{noPopupDates.length > 0 && (
				<>
					<div className="px-4">当前选定了以下共 {noPopupDates.length} 天：</div>
					<div className="grid grid-cols-4 gap-2 p-2 text-primary dark:text-dark">
						{noPopupDates.map((item, index) => (
							<div key={index} className="text-center">
								{item}
							</div>
						))}
					</div>
				</>
			)}
			<Calendar popup={null} mode="range" onConfirm={getNoPopupDatesFunc} />
		</div>
	);
}
