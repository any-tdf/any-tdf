# RTDF 新增组件文档

## Calendar 日历组件

支持单选、多选、范围选择的日历组件，提供丰富的自定义选项。

### 功能特性

- 支持单选、多选、范围选择三种模式
- 支持从周日或周一开始
- 支持周末文字标红
- 支持卡片样式和月份水印
- 支持自定义显示信息的日期
- 支持自定义不可选日期
- 支持快速选择（周、月、季度、自定义天数）
- 支持自定义初始显示月份
- 支持自定义返回日期格式
- 支持暗黑模式

### 使用示例

```tsx
import { Calendar } from 'rtdf';

function App() {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<button onClick={() => setVisible(true)}>选择日期</button>
			<Calendar visible={visible} mode="range" onClose={() => setVisible(false)} onConfirm={(dates) => console.log(dates)} />
		</div>
	);
}
```

## NumKeyboard 数字键盘组件

支持数字输入、金额输入、小数点、删除等功能的数字键盘组件。

### 功能特性

- 支持按钮式和块式两种布局
- 支持自定义键盘高度和圆角
- 支持显示/隐藏小数点和删除按钮
- 支持完成按钮和关闭按钮
- 支持反转数字顺序
- 支持关闭时清空数据
- 支持自定义样式类
- 支持暗黑模式

### 使用示例

```tsx
import { NumKeyboard } from 'rtdf';

function App() {
	const [visible, setVisible] = useState(false);
	const [value, setValue] = useState('');

	return (
		<div>
			<button onClick={() => setVisible(true)}>输入数字</button>
			<NumKeyboard
				visible={visible}
				value={value}
				done={true}
				onClick={(key) => {
					if (key === 'delete') {
						setValue((prev) => prev.slice(0, -1));
					} else if (key !== 'close' && key !== 'done') {
						setValue((prev) => prev + key);
					}
				}}
				onClose={() => setVisible(false)}
			/>
		</div>
	);
}
```

## TimePicker 时间选择器组件

支持时间选择、日期时间选择等多种模式的时间选择器组件。

### 功能特性

- 支持 13 种时间格式组合
- 支持自定义年份范围
- 支持自定义分钟和秒的间隔
- 支持自定义初始值
- 支持自定义返回格式
- 支持自定义显示文字
- 支持自动计算月份天数
- 支持暗黑模式

### 使用示例

```tsx
import { TimePicker } from 'rtdf';

function App() {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<button onClick={() => setVisible(true)}>选择时间</button>
			<TimePicker
				visible={visible}
				type="YYYYMMDDhhmm"
				onClose={() => setVisible(false)}
				onConfirm={(timeStr, timeObj) => {
					console.log('选择的时间:', timeStr);
					console.log('时间对象:', timeObj);
				}}
			/>
		</div>
	);
}
```

## 类型定义

所有组件都包含完整的 TypeScript 类型定义，提供良好的开发体验。

### CalendarProps

```tsx
interface CalendarProps {
	visible?: boolean;
	startMonth?: string;
	endMonth?: string;
	initMonth?: string;
	mode?: 'single' | 'multiple' | 'range';
	startSunday?: boolean;
	weekendRed?: boolean;
	monthCard?: boolean;
	monthMark?: boolean;
	monthMarkSize?: '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
	height?: number;
	infoDates?: InfoDateProps[];
	disabledDates?: string[];
	radius?: 'none' | 'sm' | 'xl' | '2xl';
	showSelectedDay?: boolean;
	confirmText?: string;
	selectedText?: string;
	dayText?: string;
	quickSelects?: ('week' | 'month' | 'quarter' | number)[];
	includeToday?: boolean;
	useAnimation?: boolean;
	highlightToday?: boolean;
	outFormat?: string;
	popup?: PopupProps;
	button?: ButtonProps;
	clear?: boolean;
	onConfirm?: (dates: string[]) => void;
	onClose?: () => void;
}
```

### NumKeyboardProps

```tsx
interface NumKeyboardProps {
	value?: string;
	type?: 'button' | 'block';
	visible?: boolean;
	height?: '8' | '10' | '12' | '14' | '16' | '20';
	space?: '0' | '1' | '2' | '3' | '4';
	p?: '0' | '1' | '2' | '3' | '4';
	reverse?: boolean;
	done?: boolean;
	dot?: boolean;
	close?: boolean;
	doneText?: string;
	doneDisabled?: boolean;
	radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
	clear?: boolean;
	panelClass?: string;
	keyClass?: string;
	doneClass?: string;
	popup?: PopupProps;
	onClick?: (key: string) => void;
	onOpen?: (height: number) => void;
	onClose?: () => void;
}
```

### TimePickerProps

```tsx
interface TimePickerProps {
	visible?: boolean;
	type?: TimePickerTypeProps;
	yearProps?: TimePickerItemProps;
	monthProps?: TimePickerItemProps;
	dayProps?: TimePickerItemProps;
	hourProps?: TimePickerItemProps;
	minuteProps?: TimePickerItemProps;
	secondProps?: TimePickerItemProps;
	initYear?: string;
	initMonth?: string;
	initDay?: string;
	initHour?: string;
	initMinute?: string;
	initSecond?: string;
	minuteStep?: number;
	secondStep?: number;
	yearRange?: [number, number] | [];
	monthRange?: [number, number];
	hourRange?: [number, number];
	minuteRange?: [number, number];
	secondRange?: [number, number];
	showTips?: boolean;
	cancelText?: string;
	confirmText?: string;
	title?: string;
	yearText?: string;
	monthText?: string;
	dayText?: string;
	hourText?: string;
	minuteText?: string;
	secondText?: string;
	outFormat?: string;
	popup?: PopupProps;
	onCancel?: () => void;
	onConfirm?: (timeStr: string, timeObj: TimePickerObjProps) => void;
	onClose?: () => void;
}
```

## 示例页面

每个组件都包含完整的中文示例页面，展示了组件的各种功能和用法：

- `/apps/rtdf-demo/src/pages/calendar/zh_CN.tsx` - Calendar 组件示例
- `/apps/rtdf-demo/src/pages/numKeyboard/zh_CN.tsx` - NumKeyboard 组件示例
- `/apps/rtdf-demo/src/pages/timePicker/zh_CN.tsx` - TimePicker 组件示例
- `/apps/rtdf-demo/src/App.tsx` - 组件示例页面入口

所有组件都遵循 RTDF 组件库的设计规范，支持完整的 TypeScript 类型检查，并保持与现有组件 API 的一致性。
