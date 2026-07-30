import {
	getDocument,
	getPerformanceNow,
	safeCancelAnimationFrame,
	safeRequestAnimationFrame,
	type SafeAnimationFrameHandle
} from './platform.js';

export * from './platform.js';

/**
 * 防抖
 * debounce
 * @example
 * const fn = () => console.log('hello world');
 * const debounceFn = debounce(fn, 1000);
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay = 10): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};
};

/**
 * 节流
 * throttle
 * @example
 * const fn = () => console.log('hello world');
 * const throttleFn = throttle(fn, 1000);
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(fn: T, delay = 50): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};
};

/**
 * 节流
 * throttle With requestAnimationFrame
 * @example
 * const fn = () => console.log('hello world');
 * const throttleWithRAFFn = throttleWithRAF(fn, 1000);
 */
export type RAFThrottledFunction<T extends (...args: any[]) => void> = ((...args: Parameters<T>) => void) & {
	clear: () => void;
};

export const throttleWithRAF = <T extends (...args: any[]) => void>(fn: T, delay = 16): RAFThrottledFunction<T> => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
	let rafId: SafeAnimationFrameHandle | undefined = undefined;
	let lastExec = 0;
	const throttledFn = function (this: unknown, ...args: Parameters<T>) {
		const now = getPerformanceNow();
		const remainingTime = delay - (now - lastExec);
		if (rafId === undefined && timeoutId === undefined) {
			// 如果没有 rafId 和 timeoutId，说明没有正在进行的动画帧或定时器
			// If there is no rafId and timeoutId, it means there is no animation frame or timer in progress.
			rafId = safeRequestAnimationFrame(() => {
				// 在动画帧开始时执行函数
				// Executes a function at the beginning of an animation frame
				fn.apply(this, args);
				lastExec = getPerformanceNow();
				rafId = undefined;
			});
		} else if (remainingTime <= 0) {
			// 如果超过了延迟时间，取消当前的定时器，然后在下一个动画帧执行
			// If the delay time is exceeded, cancel the current timer and execute it in the next animation frame.
			clearTimeout(timeoutId);
			timeoutId = undefined;
			rafId = safeRequestAnimationFrame(() => {
				fn.apply(this, args);
				lastExec = getPerformanceNow();
				rafId = undefined;
			});
		} else {
			// 如果还有剩余时间，设置定时器
			// If there is time left, set the timer
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				rafId = safeRequestAnimationFrame(() => {
					fn.apply(this, args);
					lastExec = getPerformanceNow();
					rafId = undefined;
				});
			}, remainingTime);
		}
	} as RAFThrottledFunction<T>;
	throttledFn.clear = () => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		if (rafId !== undefined) {
			safeCancelAnimationFrame(rafId);
			rafId = undefined;
		}
	};
	return throttledFn;
};

/**
 * 将数字按照步长进行四舍五入
 *  Round the number according to the step length
 * @example
 * stepNumberFun(18, 5) // 20
 */
export const stepNumberFun: (num: number, step?: number) => number = (num, step = 1) => {
	//将 step 乘 10，转换为整数，避免小数计算精度问题
	// Multiply step by 10, convert to integer, avoid decimal calculation precision problem
	const stepNum = step * 10;
	return (Math.round((num * 10) / stepNum) * stepNum) / 10;
};

/**
 * 传入 Dom 和一段字符串，返回占页面的宽度
 * Pass in Dom and a string, return the width occupied by the page
 * @example
 * getDomWidth(document.body, 'hello world') // 100
 */
export const getDomWidth: (dom: HTMLElement, str: string) => number = (dom, str) => {
	const ownerDocument = dom.ownerDocument ?? getDocument();
	if (!ownerDocument) return 0;

	const span: HTMLSpanElement = ownerDocument.createElement('span');
	span.innerHTML = str;
	span.style.visibility = 'hidden';
	dom.appendChild(span);
	const width = span.getBoundingClientRect().width;
	dom.removeChild(span);
	return width;
};

/**
 * 根据年份和月份获取对应的天数
 * Get the number of days corresponding to the year and month according to the year and month
 * @example
 * getDayNum('2020', '02') // 29
 */
export const getDayNum: (year: string, month: string) => number = (year, month) => {
	if (month === '02') {
		return isLeapYear(Number(year)) ? 29 : 28;
	} else if (month === '04' || month === '06' || month === '09' || month === '11') {
		return 30;
	} else {
		return 31;
	}
};

/**
 * 是否是闰年
 * Is it a leap year
 * @example
 * isLeapYear(2020) // true
 */
export const isLeapYear: (year: number) => boolean = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * 返回当前日期所处周的开始与结束日期组成的数组，日期格式为 YYYYMMDD
 * return an array of start and end date of current week, date format is YYYYMMDD
 * @example
 * getWeekRange() // ['20200518', '20200524']
 */
export const getWeekRange: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const day = now.getDate();
	const week = now.getDay();
	const start = new Date(year, month, day - week + 1);
	const end = new Date(year, month, day + (7 - week));
	return [start, end].map((date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
	});
};

/**
 * 返回当前日期所处月的开始与结束日期组成的数组，日期格式为 YYYYMMDD
 * return an array of start and end date of current month, date format is YYYYMMDD
 * @returns {Array}
 * @example
 * getMonthRange() // ['20200501', '20200531']
 */
export const getMonthRange: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const start = new Date(year, month, 1);
	const end = new Date(year, month + 1, 0);
	return [start, end].map((date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
	});
};

/**
 * 传入年月数据 YYYYMM，返回开始日是周几
 * Pass in year and month data YYYYMM, return the start day of the week
 * @example
 * getStartDay('202005') // 6
 */
export const getStartDay: (yearMonth: string) => number = (yearMonth) => {
	const year = yearMonth.slice(0, 4);
	const month = yearMonth.slice(4);
	return new Date(`${year}-${month}-01`).getDay();
};

/**
 * 传入正数或者负数 n，返回当前月往前或者往后的 n 个月的年月数据，格式为 YYYYMM，不足两位的月份前面补 0
 * Pass in a positive or negative number n, return the year and month data of the current month forward or backward n months, the format is YYYYMM, and the month less than two digits is filled with 0
 * @example
 * getYearMonth(1) // '202006'
 */
export const getNowBeforeOrAfterMonth: (n: number) => string = (n) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const newMonth = month + n;
	if (newMonth > 12) {
		return `${year + 1}${newMonth - 12 < 10 ? `0${newMonth - 12}` : newMonth - 12}`;
	} else if (newMonth < 1) {
		return `${year - 1}${newMonth + 12 < 10 ? `0${newMonth + 12}` : newMonth + 12}`;
	} else {
		return `${year}${newMonth < 10 ? `0${newMonth}` : newMonth}`;
	}
};

/**
 * 传入年月数据 YYYYMM，根据当月 1 日的周几，返回当月的日历数据数组。如果 startSunday 为 true 从周日开始，否则从周一开始，1 日之前的数据为空字符串，之后的数据为空字符串并去除
 * Pass in year and month data YYYYMM, return the calendar data array according to the week of the first day of the month. If startSunday is true, start from Sunday, otherwise start from Monday. The data before 1 day is an empty string, and the data after 1 day is an empty string and is removed
 * @example
 * getCalendarData('202005') // ['','','','','','','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','']
 */
export const getCalendarData: (yearMonth: string, startSunday?: boolean) => string[] = (yearMonth, startSunday) => {
	const year = yearMonth.slice(0, 4);
	const month = yearMonth.slice(4);
	const startDay = getStartDay(yearMonth);
	const dayNum = getDayNum(year, month);
	const data: { day: string; [key: string]: unknown }[] = [];
	for (let i = 0; i < (startDay > 0 ? startDay - (startSunday ? 0 : 1) : 7 - (startSunday ? 0 : 1)); i++) {
		data.push({ day: '' });
	}
	for (let i = 1; i <= dayNum; i++) {
		data.push({ day: i.toString().padStart(2, '0') });
	}
	for (let i = 0; i < 42 - startDay - (startSunday ? 0 : 1) - dayNum; i++) {
		data.push({ day: '' });
	}
	// 去除结尾的所有空字符
	// Remove all empty characters at the end
	while (data[data.length - 1].day === '') {
		data.pop();
	}
	// 如果 day 是 00 或 0 的替换为空字
	// If day is 00, replace it with an empty character
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day === '00' || item.day === '0') {
			item.day = '';
		}
	});
	// 循环 data，如果 day 不为 ''，则计算出 day 是周几，放在 week
	// Loop data, if day is not '', then calculate that day is what day of the week, put it in week
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day !== '') {
			item.week = new Date(`${year}-${month}-${item.day}`).getDay();
		}
	});
	// 循环 data，如果当天是月末，endDay 为 true，否则为 false
	// Loop data, if today is the end of the month, endDay is true, otherwise it is false
	data.forEach((item: { day: string; [key: string]: unknown }, index: number) => {
		if (item.day !== '') {
			item.endDay = index === data.length - 1;
			item.startDay = item.day === '01';
		}
	});
	// 根据从周一开始还是周末开始，循环 data，如果 day 不为 ''，判断每天是 周第一天 还是 周最后一天，分别放在 weekStartDay 和 weekEndDay
	// According to whether it starts from Monday or Sunday, loop data, if day is not '', judge whether each day is the first day of the week or the last day of the week, and put it in weekStartDay and weekEndDay respectively
	if (!startSunday) {
		data.forEach((item: { day: string; [key: string]: unknown }) => {
			if (item.day !== '') {
				item.weekStartDay = item.week === 1;
				item.weekEndDay = item.week === 0;
			}
		});
	} else {
		data.forEach((item: { day: string; [key: string]: unknown }) => {
			if (item.day !== '') {
				item.weekStartDay = item.week === 0;
				item.weekEndDay = item.week === 6;
			}
		});
	}
	// 根据每一天的 startDay 和 weekStartDay，endDay 和 weekEndDay，只要有一项是 true，就是月第一天或周第一天，放在 start 和 end 中
	// According to the startDay and weekStartDay of each day, endDay and weekEndDay, as long as one item is true, it is the first day of the month or the first day of the week, put it in start and end
	data.forEach((item: { day: string; [key: string]: unknown }) => {
		if (item.day !== '') {
			item.start = item.startDay || item.weekStartDay;
			item.end = item.endDay || item.weekEndDay;
		}
	});
	return data.map((item: { day: string; [key: string]: unknown }) => item.day);
};

/**
 * 传入格式为 YYYYMM 的开始与结束月份字符串，返回这两月份之间的所有月份数据数组，格式为 YYYYMM，不足两位的月份前面补 0
 * Pass in the start and end month strings in the format of YYYYMM, return the data array of all months between these two months, the format is YYYYMM, and the month less than two digits is filled with 0
 * @example
 * getMonthListRange('202005', '202007') // ['202005', '202006', '202007']
 */
export const getMonthListRange: (startMonthStr: string, endMonthStr: string) => string[] = (startMonthStr, endMonthStr) => {
	const startYear = startMonthStr.slice(0, 4);
	const startMonth = startMonthStr.slice(4);
	const endYear = endMonthStr.slice(0, 4);
	const endMonth = endMonthStr.slice(4);
	const data = [];
	if (startYear === endYear) {
		for (let i = Number(startMonth); i <= Number(endMonth); i++) {
			data.push(`${startYear}${i < 10 ? `0${i}` : i}`);
		}
	} else {
		for (let i = Number(startMonth); i <= 12; i++) {
			data.push(`${startYear}${i < 10 ? `0${i}` : i}`);
		}
		for (let i = 1; i <= Number(endMonth); i++) {
			data.push(`${endYear}${i < 10 ? `0${i}` : i}`);
		}
	}
	return data;
};

/**
 * 传入开始与结束日期 YYYYMMDD，需要剔除的日期组成的数组 disabledDates。返回中间的所有日期数组，包含开始与结束日期，月与日不足两位的前面补 0，格式为 YYYYMMDD
 * Pass in the start and end date YYYYMMDD, the array of disabled dates to be removed. Return the array of all dates in the middle, including the start and end dates, and the month and day less than two digits are filled with 0, in the format of YYYYMMDD
 * @example
 * getDateRange('20200501', '20200503') // ['20200501', '20200502', '20200503']
 */
export const getDateRange: (startDate: string, endDate: string, disabledDates: string[]) => string[] = (
	startDate,
	endDate,
	disabledDates
) => {
	// 将 startDate 与 endDate 转化为 YYYY-MM-DD 格式
	// Convert startDate and endDate to YYYY-MM-DD format
	const startYear = startDate.slice(0, 4);
	const startMonth = startDate.slice(4, 6);
	const startDay = startDate.slice(6);
	const endYear = endDate.slice(0, 4);
	const endMonth = endDate.slice(4, 6);
	const endDay = endDate.slice(6);
	const startTimeStr = new Date(`${startYear}-${startMonth}-${startDay}`).getTime();
	const endTimeStr = new Date(`${endYear}-${endMonth}-${endDay}`).getTime();
	const startTime = new Date(startTimeStr).getTime();
	const endTime = new Date(endTimeStr).getTime();
	const data: string[] = [];
	for (let i = startTime; i <= endTime; i += 24 * 60 * 60 * 1000) {
		const date = new Date(i);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		data.push(`${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`);
	}
	// 剔除 disabledDates 中的日期
	// Remove dates in disabledDates
	if (disabledDates && disabledDates.length) {
		disabledDates.forEach((item) => {
			const index = data.indexOf(item);
			if (index > -1) {
				data.splice(index, 1);
			}
		});
	}

	return data;
};

/**
 * 传入 startSunday，返回当天所处周的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in startSunday, return the array of all dates in the week of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getWeekRange(true) // ['20200531', '20200601', '20200602', '20200603', '20200604', '20200605', '20200606']
 */
export const getCurrentWeek: (startSunday: boolean) => string[] = (startSunday) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const day = now.getDay();
	const weekDates: string[] = [];
	if (startSunday) {
		for (let i = 0; i < 7; i++) {
			const newDate = new Date(year, month - 1, date - day + i);
			const newYear = newDate.getFullYear();
			const newMonth = newDate.getMonth() + 1;
			const newDateNum = newDate.getDate();

			weekDates.push(`${newYear}${newMonth.toString().padStart(2, '0')}${newDateNum.toString().padStart(2, '0')}`);
		}
	} else {
		for (let i = 1; i < 8; i++) {
			const newDate = new Date(year, month - 1, date - day + i);
			const newYear = newDate.getFullYear();
			const newMonth = newDate.getMonth() + 1;
			const newDateNum = newDate.getDate();

			weekDates.push(`${newYear}${newMonth.toString().padStart(2, '0')}${newDateNum.toString().padStart(2, '0')}`);
		}
	}
	return weekDates;
};

/**
 * 返回当天所处月份的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Return the array of all dates in the month of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getCurrentMonth() // ['20200501', '20200502', '20200503', ...]
 */
export const getCurrentMonth: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const days = new Date(year, month, 0).getDate();
	const dates: string[] = [];
	for (let i = 1; i <= days; i++) {
		dates.push(`${year}${month.toString().padStart(2, '0')}${i.toString().padStart(2, '0')}`);
	}
	return dates;
};

/**
 * 返回当天所处季度的所有日期数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in the date, return the array of all dates in the quarter of the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getCurrentQuarter() // ['20200401', '20200402', '20200403', ...]
 */
export const getCurrentQuarter: () => string[] = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const quarter = Math.floor((month - 1) / 3) + 1;
	const startMonth = (quarter - 1) * 3 + 1;
	const endMonth = quarter * 3;
	const days: string[] = [];
	for (let i = startMonth; i <= endMonth; i++) {
		const daysInMonth = new Date(year, i, 0).getDate();
		for (let j = 1; j <= daysInMonth; j++) {
			days.push(`${year}${i.toString().padStart(2, '0')}${j.toString().padStart(2, '0')}`);
		}
	}
	return days;
};

/**
 * 传入正数或负数天数 n 和是否从今天开始计算 today，返回对应的前后日期组成的数组，日期格式为 YYYYMMDD，月与日不足两位的前面补 0
 * Pass in a positive or negative number of days n, whether to include today hasToday, return the array of dates before and after the current day, the date format is YYYYMMDD, and the month and day less than two digits are filled with 0
 * @example
 * getDaysRangeWithToday(3) // ['20200501', '20200502', '20200503']
 */
export const getDaysRangeWithToday: (n?: number, today?: boolean) => string[] = (n = 0, today = true) => {
	const now = new Date();
	let fakeToday = now;
	if (today) {
		fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	} else {
		if (n < 0) {
			fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
		} else if (n > 0) {
			fakeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		} else {
			fakeToday = now;
		}
	}
	const dates: string[] = [];
	for (let i = 0; i < Math.abs(n); i++) {
		const date = new Date(fakeToday.getTime() + (n > 0 ? i : -i) * 24 * 60 * 60 * 1000);
		dates.push(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`);
	}
	// 对日期排序
	// Sort dates
	dates.sort((a, b) => Number(a) - Number(b));
	return dates;
};

// 圆角映射（包含所有 Tailwind 圆角值）
// Radius mapping (includes all Tailwind radius values)
export const radiusObj = {
	none: 'rounded-none',
	xs: 'rounded-xs',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	'4xl': 'rounded-4xl',
	full: 'rounded-full'
} as const;

// 背景样式映射
// Background style mapping
export const bgObj: Record<string, string> = {
	none: '',
	white: 'bg-white dark:bg-gray-800',
	surface: 'bg-bg-surface dark:bg-bg-surface-dark',
	gray: 'bg-black/5 dark:bg-white/5',
	theme: 'bg-primary/5 dark:bg-dark/5'
} as const;

// ==================== 颜色转换工具函数 ====================
// Color conversion utility functions

/**
 * sRGB 转 Linear RGB（去除 gamma 校正）
 * sRGB to Linear RGB (remove gamma correction)
 */
export const srgbToLinear = (c: number): number => {
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/**
 * Linear RGB 转 sRGB（应用 gamma 校正）
 * Linear RGB to sRGB (apply gamma correction)
 */
export const linearToSrgb = (c: number): number => {
	return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
};

/**
 * Linear RGB 转 XYZ (D65 白点)
 * Linear RGB to XYZ (D65 white point)
 */
export const linearRgbToXyz = (r: number, g: number, b: number): [number, number, number] => {
	const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
	const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
	const z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
	return [x, y, z];
};

/**
 * XYZ 转 Linear RGB (D65 白点)
 * XYZ to Linear RGB (D65 white point)
 */
export const xyzToLinearRgb = (x: number, y: number, z: number): [number, number, number] => {
	const r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
	const g = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
	const b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
	return [r, g, b];
};

/**
 * XYZ 转 Oklab
 * XYZ to Oklab
 */
export const xyzToOklab = (x: number, y: number, z: number): [number, number, number] => {
	const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
	const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
	const s = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	return [L, a, b_];
};

/**
 * Oklab 转 XYZ
 * Oklab to XYZ
 */
export const oklabToXyz = (L: number, a: number, b: number): [number, number, number] => {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;

	const x = 1.2270138511 * l - 0.5577999807 * m + 0.281256149 * s;
	const y = -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s;
	const z = -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s;

	return [x, y, z];
};

/**
 * Oklab 转 OKLCH（直角坐标转极坐标）
 * Oklab to OKLCH (Cartesian to polar)
 */
export const oklabToOklch = (L: number, a: number, b: number): [number, number, number] => {
	const c = Math.sqrt(a * a + b * b);
	let h = (Math.atan2(b, a) * 180) / Math.PI;
	if (h < 0) h += 360;
	return [L, c, h];
};

/**
 * OKLCH 转 Oklab（极坐标转直角坐标）
 * OKLCH to Oklab (polar to Cartesian)
 */
export const oklchToOklab = (L: number, c: number, h: number): [number, number, number] => {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);
	return [L, a, b];
};

/**
 * RGB (0-255) 转 OKLCH
 * RGB (0-255) to OKLCH
 */
export const rgbToOklch = (r: number, g: number, b: number): { l: number; c: number; h: number } => {
	const lr = srgbToLinear(r / 255);
	const lg = srgbToLinear(g / 255);
	const lb = srgbToLinear(b / 255);

	const [x, y, z] = linearRgbToXyz(lr, lg, lb);
	const [L, a, ob] = xyzToOklab(x, y, z);
	const [l, c, h] = oklabToOklch(L, a, ob);

	return { l, c, h: isNaN(h) ? 0 : h };
};

/**
 * OKLCH 转 RGB (0-255)
 * OKLCH to RGB (0-255)
 */
export const oklchToRgb = (l: number, c: number, h: number): [number, number, number] => {
	const [L, a, b] = oklchToOklab(l, c, h);
	const [x, y, z] = oklabToXyz(L, a, b);
	const [lr, lg, lb] = xyzToLinearRgb(x, y, z);

	const r = Math.round(Math.max(0, Math.min(255, linearToSrgb(lr) * 255)));
	const g = Math.round(Math.max(0, Math.min(255, linearToSrgb(lg) * 255)));
	const bOut = Math.round(Math.max(0, Math.min(255, linearToSrgb(lb) * 255)));

	return [r, g, bOut];
};

/**
 * RGB 转 HEX
 * RGB to HEX
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
	return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
};

/**
 * HEX 转 RGB
 * HEX to RGB
 */
export const hexToRgb = (hex: string): [number, number, number] => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

/**
 * 检测 OKLCH 颜色是否在 sRGB 色域内
 * Check if OKLCH color is within sRGB gamut
 */
export const isDisplayable = (l: number, c: number, h: number): boolean => {
	const [L, a, b] = oklchToOklab(l, c, h);
	const [x, y, z] = oklabToXyz(L, a, b);
	const [lr, lg, lb] = xyzToLinearRgb(x, y, z);

	const r = linearToSrgb(lr);
	const g = linearToSrgb(lg);
	const bVal = linearToSrgb(lb);

	// 允许微小的浮点误差
	// Allow small floating point errors
	const eps = 0.001;
	return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && bVal >= -eps && bVal <= 1 + eps;
};

/**
 * 二分查找指定 L 和 H 下的最大可用彩度
 * Binary search for maximum displayable chroma at given L and H
 */
export const getMaxChroma = (l: number, h: number): number => {
	let low = 0;
	let high = 0.4;
	while (high - low > 0.001) {
		const mid = (low + high) / 2;
		if (isDisplayable(l, mid, h)) {
			low = mid;
		} else {
			high = mid;
		}
	}
	return low;
};

/**
 * HSL 转 RGB (用于 RGB 模式的圆形色轮)
 * HSL to RGB (for RGB mode color wheel)
 */
export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	let r = 0,
		g = 0,
		b = 0;

	if (h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}

	return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

/**
 * RGB 转 HSL
 * RGB to HSL
 */
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h = 0,
		s = 0;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
		else if (max === g) h = ((b - r) / d + 2) * 60;
		else h = ((r - g) / d + 4) * 60;
	}

	return [h, s, l];
};

/**
 * 格式化 OKLCH 字符串
 * Format OKLCH string
 */
export const formatOklch = (l: number, c: number, h: number): string => {
	return `oklch(${+l.toFixed(3)} ${+c.toFixed(3)} ${+h.toFixed(3)})`;
};

/**
 * 格式化 RGB 字符串
 * Format RGB string
 */
export const formatRgb = (r: number, g: number, b: number): string => {
	return `rgb(${r}, ${g}, ${b})`;
};

// ==================== 颜色字符串解析与转换 ====================
// Color string parsing and conversion

/**
 * OKLCH 颜色对象类型
 * OKLCH color object type
 */
export type OklchColorObj = {
	l: number; // 亮度 Lightness 0-1
	c: number; // 彩度 Chroma 0-0.4
	h: number; // 色相 Hue 0-360
};

/**
 * 解析 OKLCH 字符串为对象
 * Parse OKLCH string to object
 * @param str - oklch 格式字符串，如 "oklch(0.5 0.15 250)" 或 "oklch(0.5 0.15 250 / 0.8)"
 * @returns OklchColorObj 对象，解析失败返回 null
 * @example
 * parseOklch('oklch(0.5 0.15 250)') // { l: 0.5, c: 0.15, h: 250 }
 * parseOklch('oklch(0.5 0.15 250 / 0.8)') // { l: 0.5, c: 0.15, h: 250 }
 */
export const parseOklch = (str: string): OklchColorObj | null => {
	// 匹配 oklch(l c h) 或 oklch(l c h / alpha)
	const match = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)/i);
	if (!match) return null;
	const l = parseFloat(match[1]);
	const c = parseFloat(match[2]);
	const h = parseFloat(match[3]);
	if (isNaN(l) || isNaN(c) || isNaN(h)) return null;
	return { l, c, h };
};

/**
 * OKLCH 对象转 HEX 字符串
 * Convert OKLCH object to HEX string
 * @param color - OklchColorObj 对象
 * @returns HEX 颜色字符串，如 "#ff5500"
 * @example
 * oklchObjToHex({ l: 0.7, c: 0.15, h: 30 }) // "#e8a266"
 */
export const oklchObjToHex = (color: OklchColorObj): string => {
	const [r, g, b] = oklchToRgb(color.l, color.c, color.h);
	return rgbToHex(r, g, b);
};

/**
 * OKLCH 对象转 RGB 字符串
 * Convert OKLCH object to RGB string
 * @param color - OklchColorObj 对象
 * @returns RGB 颜色字符串，如 "rgb(255, 85, 0)"
 * @example
 * oklchObjToRgbStr({ l: 0.7, c: 0.15, h: 30 }) // "rgb(232, 162, 102)"
 */
export const oklchObjToRgbStr = (color: OklchColorObj): string => {
	const [r, g, b] = oklchToRgb(color.l, color.c, color.h);
	return formatRgb(r, g, b);
};

/**
 * OKLCH 字符串转 HEX 字符串
 * Convert OKLCH string to HEX string
 * @param str - oklch 格式字符串
 * @returns HEX 颜色字符串，解析失败返回 "#000000"
 * @example
 * oklchStrToHex('oklch(0.7 0.15 30)') // "#e8a266"
 */
export const oklchStrToHex = (str: string): string => {
	const color = parseOklch(str);
	if (!color) return '#000000';
	return oklchObjToHex(color);
};

/**
 * OKLCH 字符串转 RGB 字符串
 * Convert OKLCH string to RGB string
 * @param str - oklch 格式字符串
 * @returns RGB 颜色字符串，解析失败返回 "rgb(0, 0, 0)"
 * @example
 * oklchStrToRgbStr('oklch(0.7 0.15 30)') // "rgb(232, 162, 102)"
 */
export const oklchStrToRgbStr = (str: string): string => {
	const color = parseOklch(str);
	if (!color) return 'rgb(0, 0, 0)';
	return oklchObjToRgbStr(color);
};

/**
 * HEX 字符串转 OKLCH 对象
 * Convert HEX string to OKLCH object
 * @param hex - HEX 颜色字符串，如 "#ff5500" 或 "ff5500"
 * @returns OklchColorObj 对象
 * @example
 * hexToOklch('#ff5500') // { l: 0.658, c: 0.203, h: 43.817 }
 */
export const hexToOklch = (hex: string): OklchColorObj => {
	const [r, g, b] = hexToRgb(hex);
	return rgbToOklch(r, g, b);
};

/**
 * HEX 字符串转 OKLCH 字符串
 * Convert HEX string to OKLCH string
 * @param hex - HEX 颜色字符串
 * @returns oklch 格式字符串
 * @example
 * hexToOklchStr('#ff5500') // "oklch(0.658 0.203 43.817)"
 */
export const hexToOklchStr = (hex: string): string => {
	const oklch = hexToOklch(hex);
	return formatOklch(oklch.l, oklch.c, oklch.h);
};

/**
 * RGB 字符串转 OKLCH 对象
 * Convert RGB string to OKLCH object
 * @param str - RGB 格式字符串，如 "rgb(255, 85, 0)" 或 "255, 85, 0"
 * @returns OklchColorObj 对象，解析失败返回 { l: 0, c: 0, h: 0 }
 * @example
 * rgbStrToOklch('rgb(255, 85, 0)') // { l: 0.658, c: 0.203, h: 43.817 }
 */
export const rgbStrToOklch = (str: string): OklchColorObj => {
	// 匹配 rgb(r, g, b) 或 r, g, b
	const match = str.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
	if (!match) return { l: 0, c: 0, h: 0 };
	const r = parseInt(match[1]);
	const g = parseInt(match[2]);
	const b = parseInt(match[3]);
	return rgbToOklch(r, g, b);
};

/**
 * 将 OKLCH 颜色钳制到 sRGB 色域内
 * Clamp OKLCH color to sRGB gamut
 * @param color - OklchColorObj 对象
 * @returns 钳制后的 OklchColorObj 对象
 * @description 如果颜色超出 sRGB 色域，通过减少彩度 C 使其回到色域内
 * @example
 * clampToGamut({ l: 0.9, c: 0.4, h: 30 }) // { l: 0.9, c: 0.087, h: 30 }
 */
export const clampToGamut = (color: OklchColorObj): OklchColorObj => {
	if (isDisplayable(color.l, color.c, color.h)) {
		return color;
	}
	const maxC = getMaxChroma(color.l, color.h);
	return { l: color.l, c: maxC, h: color.h };
};

/**
 * 生成 OKLCH 颜色的 CSS 变量值
 * Generate CSS variable value for OKLCH color
 * @param color - OklchColorObj 对象
 * @param alpha - 可选的透明度，0-1
 * @returns CSS oklch 颜色值
 * @example
 * oklchToCss({ l: 0.7, c: 0.15, h: 30 }) // "oklch(0.7 0.15 30)"
 * oklchToCss({ l: 0.7, c: 0.15, h: 30 }, 0.5) // "oklch(0.7 0.15 30 / 0.5)"
 */
export const oklchToCss = (color: OklchColorObj, alpha?: number): string => {
	const base = `oklch(${+color.l.toFixed(3)} ${+color.c.toFixed(3)} ${+color.h.toFixed(3)}`;
	return alpha !== undefined ? `${base} / ${alpha})` : `${base})`;
};

/**
 * 批量转换 OKLCH 对象数组为 HEX 字符串数组
 * Convert array of OKLCH objects to array of HEX strings
 * @param colors - OklchColorObj 对象数组
 * @returns HEX 颜色字符串数组
 */
export const oklchArrayToHex = (colors: OklchColorObj[]): string[] => {
	return colors.map(oklchObjToHex);
};

/**
 * 混合两个 OKLCH 颜色
 * Mix two OKLCH colors
 * @param color1 - 第一个颜色
 * @param color2 - 第二个颜色
 * @param ratio - 混合比例，0 表示完全使用 color1，1 表示完全使用 color2，默认 0.5
 * @returns 混合后的 OklchColorObj 对象
 * @example
 * mixOklch({ l: 0.5, c: 0.2, h: 30 }, { l: 0.8, c: 0.1, h: 200 }, 0.5)
 */
export const mixOklch = (color1: OklchColorObj, color2: OklchColorObj, ratio: number = 0.5): OklchColorObj => {
	const r = Math.max(0, Math.min(1, ratio));
	// 处理色相的循环混合
	let h1 = color1.h;
	let h2 = color2.h;
	// 确保色相差不超过 180 度
	if (Math.abs(h2 - h1) > 180) {
		if (h1 < h2) {
			h1 += 360;
		} else {
			h2 += 360;
		}
	}
	const mixedH = (((h1 * (1 - r) + h2 * r) % 360) + 360) % 360;
	return {
		l: color1.l * (1 - r) + color2.l * r,
		c: color1.c * (1 - r) + color2.c * r,
		h: mixedH
	};
};

/**
 * 调整 OKLCH 颜色的亮度
 * Adjust lightness of OKLCH color
 * @param color - OklchColorObj 对象
 * @param delta - 亮度调整值，可为正负数
 * @returns 调整后的 OklchColorObj 对象
 * @example
 * adjustLightness({ l: 0.5, c: 0.2, h: 30 }, 0.2) // { l: 0.7, c: 0.2, h: 30 }
 */
export const adjustLightness = (color: OklchColorObj, delta: number): OklchColorObj => {
	return {
		l: Math.max(0, Math.min(1, color.l + delta)),
		c: color.c,
		h: color.h
	};
};

/**
 * 调整 OKLCH 颜色的彩度
 * Adjust chroma of OKLCH color
 * @param color - OklchColorObj 对象
 * @param delta - 彩度调整值，可为正负数
 * @returns 调整后的 OklchColorObj 对象
 * @example
 * adjustChroma({ l: 0.5, c: 0.2, h: 30 }, -0.1) // { l: 0.5, c: 0.1, h: 30 }
 */
export const adjustChroma = (color: OklchColorObj, delta: number): OklchColorObj => {
	return {
		l: color.l,
		c: Math.max(0, Math.min(0.4, color.c + delta)),
		h: color.h
	};
};

/**
 * 调整 OKLCH 颜色的色相
 * Adjust hue of OKLCH color
 * @param color - OklchColorObj 对象
 * @param delta - 色相调整值，可为正负数
 * @returns 调整后的 OklchColorObj 对象
 * @example
 * adjustHue({ l: 0.5, c: 0.2, h: 30 }, 90) // { l: 0.5, c: 0.2, h: 120 }
 */
export const adjustHue = (color: OklchColorObj, delta: number): OklchColorObj => {
	return {
		l: color.l,
		c: color.c,
		h: (((color.h + delta) % 360) + 360) % 360
	};
};

/**
 * 计算两个颜色之间的感知亮度对比度
 * Calculate perceptual luminance contrast between two colors
 * @param color1 - 第一个颜色（OKLCH 对象）
 * @param color2 - 第二个颜色（OKLCH 对象）
 * @returns 对比度比值，范围约 1:1 到 21:1
 * @description 使用 WCAG 2.1 相对亮度算法计算对比度
 * @example
 * getContrastRatio({ l: 0.9, c: 0, h: 0 }, { l: 0.1, c: 0, h: 0 }) // ~15.3
 */
export const getContrastRatio = (color1: OklchColorObj, color2: OklchColorObj): number => {
	// 转换为 RGB 计算相对亮度
	const rgb1 = oklchToRgb(color1.l, color1.c, color1.h);
	const rgb2 = oklchToRgb(color2.l, color2.c, color2.h);

	// sRGB 转线性 RGB
	const toLinear = (c: number) => {
		const v = c / 255;
		return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	};

	// 计算相对亮度
	const getLuminance = (rgb: [number, number, number]) => {
		const [r, g, b] = rgb.map(toLinear);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	const lum1 = getLuminance(rgb1);
	const lum2 = getLuminance(rgb2);
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);

	return (lighter + 0.05) / (darker + 0.05);
};

/**
 * 判断文字颜色应该用浅色还是深色
 * Determine if text color should be light or dark
 * @param bgColor - 背景色（OKLCH 对象）
 * @returns 'light' 或 'dark'
 * @description 根据背景色亮度决定文字颜色，亮度 > 0.6 用深色文字，否则用浅色文字
 * @example
 * getTextColorType({ l: 0.9, c: 0, h: 0 }) // 'dark'
 * getTextColorType({ l: 0.3, c: 0, h: 0 }) // 'light'
 */
export const getTextColorType = (bgColor: OklchColorObj): 'light' | 'dark' => {
	return bgColor.l > 0.6 ? 'dark' : 'light';
};
