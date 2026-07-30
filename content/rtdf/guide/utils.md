# 工具方法

RTDF 提供了一系列实用的工具方法，可按需导入使用。

## 导入方式

```javascript
import { debounce, throttle, rgbToOklch } from 'rtdf/utils';
```

## 方法列表

### 性能优化

| 方法名          | 描述                                  |
| --------------- | ------------------------------------- |
| debounce        | 防抖函数                              |
| throttle        | 节流函数                              |
| throttleWithRAF | 基于 requestAnimationFrame 的节流函数 |

### 数值计算

| 方法名        | 描述                          |
| ------------- | ----------------------------- |
| stepNumberFun | 按步长四舍五入                |
| getDomWidth   | 获取字符串在 DOM 中的渲染宽度 |

### 日期工具

| 方法名                   | 描述                       |
| ------------------------ | -------------------------- |
| getDayNum                | 获取指定年月的天数         |
| isLeapYear               | 判断是否为闰年             |
| getWeekRange             | 获取当前周的开始与结束日期 |
| getMonthRange            | 获取当前月的开始与结束日期 |
| getStartDay              | 获取指定年月 1 日是周几    |
| getNowBeforeOrAfterMonth | 获取前/后 n 个月的年月数据 |
| getCalendarData          | 生成日历数据数组           |
| getMonthListRange        | 获取两个月份之间的所有月份 |
| getDateRange             | 获取两个日期之间的所有日期 |
| getCurrentWeek           | 获取当前周所有日期         |
| getCurrentMonth          | 获取当前月所有日期         |
| getCurrentQuarter        | 获取当前季度所有日期       |
| getDaysRangeWithToday    | 获取前后 n 天日期          |

### 样式映射

| 方法名    | 描述                  |
| --------- | --------------------- |
| radiusObj | Tailwind 圆角映射对象 |

### 颜色转换

| 方法名           | 描述                           |
| ---------------- | ------------------------------ |
| srgbToLinear     | sRGB 转 Linear RGB             |
| linearToSrgb     | Linear RGB 转 sRGB             |
| linearRgbToXyz   | Linear RGB 转 XYZ              |
| xyzToLinearRgb   | XYZ 转 Linear RGB              |
| xyzToOklab       | XYZ 转 Oklab                   |
| oklabToXyz       | Oklab 转 XYZ                   |
| oklabToOklch     | Oklab 转 OKLCH                 |
| oklchToOklab     | OKLCH 转 Oklab                 |
| rgbToOklch       | RGB 转 OKLCH                   |
| oklchToRgb       | OKLCH 转 RGB                   |
| rgbToHex         | RGB 转 HEX                     |
| hexToRgb         | HEX 转 RGB                     |
| hslToRgb         | HSL 转 RGB                     |
| rgbToHsl         | RGB 转 HSL                     |
| formatOklch      | 格式化 OKLCH 字符串            |
| formatRgb        | 格式化 RGB 字符串              |
| parseOklch       | 解析 OKLCH 字符串              |
| oklchObjToHex    | OKLCH 对象转 HEX               |
| oklchObjToRgbStr | OKLCH 对象转 RGB 字符串        |
| oklchStrToHex    | OKLCH 字符串转 HEX             |
| hexToOklch       | HEX 转 OKLCH 对象              |
| hexToOklchStr    | HEX 转 OKLCH 字符串            |
| rgbStrToOklch    | RGB 字符串转 OKLCH 对象        |
| oklchArrayToHex  | 批量转换 OKLCH 数组为 HEX 数组 |

### 颜色操作

| 方法名           | 描述                               |
| ---------------- | ---------------------------------- |
| isDisplayable    | 检测颜色是否在 sRGB 色域内         |
| getMaxChroma     | 获取指定亮度和色相下的最大可用彩度 |
| clampToGamut     | 将颜色钳制到 sRGB 色域内           |
| oklchToCss       | 生成 CSS oklch() 颜色值            |
| mixOklch         | 混合两个 OKLCH 颜色                |
| adjustLightness  | 调整颜色亮度                       |
| adjustChroma     | 调整颜色彩度                       |
| adjustHue        | 调整颜色色相                       |
| getContrastRatio | 计算两个颜色的对比度               |
| getTextColorType | 判断文字应使用浅色还是深色         |

---

## 方法详解

### debounce

防抖函数，在一定时间内多次调用只执行最后一次。

**参数**

| 参数  | 类型     | 默认值 | 说明             |
| ----- | -------- | ------ | ---------------- |
| fn    | Function | -      | 需要防抖的函数   |
| delay | number   | 10     | 延迟时间（毫秒） |

**示例**

```javascript
import { debounce } from 'rtdf/utils';

const fn = () => console.log('hello');
const debouncedFn = debounce(fn, 1000);

// 快速连续调用多次，只会在最后一次调用后 1 秒执行
debouncedFn();
debouncedFn();
debouncedFn(); // 只有这次会执行
```

### throttle

节流函数，在一定时间内只执行一次。

**参数**

| 参数  | 类型     | 默认值 | 说明             |
| ----- | -------- | ------ | ---------------- |
| fn    | Function | -      | 需要节流的函数   |
| delay | number   | 50     | 间隔时间（毫秒） |

**示例**

```javascript
import { throttle } from 'rtdf/utils';

const fn = () => console.log('hello');
const throttledFn = throttle(fn, 1000);

// 1 秒内只会执行一次
window.addEventListener('scroll', throttledFn);
```

### throttleWithRAF

基于 requestAnimationFrame 的节流函数，适用于动画场景。

**参数**

| 参数  | 类型     | 默认值 | 说明             |
| ----- | -------- | ------ | ---------------- |
| fn    | Function | -      | 需要节流的函数   |
| delay | number   | 16     | 间隔时间（毫秒） |

**示例**

```javascript
import { throttleWithRAF } from 'rtdf/utils';

const onMove = (e) => console.log(e.clientX, e.clientY);
const throttledMove = throttleWithRAF(onMove, 16);

element.addEventListener('pointermove', throttledMove);

// 清除节流
throttledMove.clear();
```

### stepNumberFun

将数字按照步长进行四舍五入。

**参数**

| 参数 | 类型   | 默认值 | 说明           |
| ---- | ------ | ------ | -------------- |
| num  | number | -      | 需要处理的数字 |
| step | number | 1      | 步长           |

**示例**

```javascript
import { stepNumberFun } from 'rtdf/utils';

stepNumberFun(18, 5); // 20
stepNumberFun(12, 5); // 10
stepNumberFun(3.7, 0.5); // 3.5
```

### getDomWidth

计算字符串在 DOM 中的渲染宽度。

**参数**

| 参数 | 类型        | 默认值 | 说明           |
| ---- | ----------- | ------ | -------------- |
| dom  | HTMLElement | -      | 父 DOM 元素    |
| str  | string      | -      | 要测量的字符串 |

**示例**

```javascript
import { getDomWidth } from 'rtdf/utils';

const width = getDomWidth(document.body, 'Hello World');
console.log(width); // 例如: 85.5
```

### getDayNum

获取指定年月的天数。

**参数**

| 参数  | 类型   | 说明                  |
| ----- | ------ | --------------------- |
| year  | string | 年份，如 "2024"       |
| month | string | 月份，两位数，如 "02" |

**示例**

```javascript
import { getDayNum } from 'rtdf/utils';

getDayNum('2024', '02'); // 29 (闰年)
getDayNum('2023', '02'); // 28
getDayNum('2024', '04'); // 30
```

### isLeapYear

判断是否为闰年。

**示例**

```javascript
import { isLeapYear } from 'rtdf/utils';

isLeapYear(2024); // true
isLeapYear(2023); // false
isLeapYear(2000); // true
isLeapYear(1900); // false
```

### rgbToOklch

将 RGB 颜色转换为 OKLCH 颜色空间。

**参数**

| 参数 | 类型   | 说明             |
| ---- | ------ | ---------------- |
| r    | number | 红色通道 (0-255) |
| g    | number | 绿色通道 (0-255) |
| b    | number | 蓝色通道 (0-255) |

**返回值**

`{ l: number, c: number, h: number }` - OKLCH 颜色对象

- l: 亮度 (0-1)
- c: 彩度 (0-0.4)
- h: 色相 (0-360)

**示例**

```javascript
import { rgbToOklch } from 'rtdf/utils';

const oklch = rgbToOklch(255, 85, 0);
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchToRgb

将 OKLCH 颜色转换为 RGB。

**示例**

```javascript
import { oklchToRgb } from 'rtdf/utils';

const [r, g, b] = oklchToRgb(0.7, 0.15, 30);
// [232, 162, 102]
```

### hexToOklch

将 HEX 颜色转换为 OKLCH 对象。

**示例**

```javascript
import { hexToOklch } from 'rtdf/utils';

const oklch = hexToOklch('#ff5500');
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchObjToHex

将 OKLCH 对象转换为 HEX 字符串。

**示例**

```javascript
import { oklchObjToHex } from 'rtdf/utils';

const hex = oklchObjToHex({ l: 0.7, c: 0.15, h: 30 });
// "#e8a266"
```

### mixOklch

在 OKLCH 颜色空间中混合两个颜色。

**参数**

| 参数   | 类型          | 默认值 | 说明           |
| ------ | ------------- | ------ | -------------- |
| color1 | OklchColorObj | -      | 第一个颜色     |
| color2 | OklchColorObj | -      | 第二个颜色     |
| ratio  | number        | 0.5    | 混合比例 (0-1) |

**示例**

```javascript
import { mixOklch, oklchObjToHex } from 'rtdf/utils';

const red = { l: 0.6, c: 0.25, h: 30 };
const blue = { l: 0.5, c: 0.2, h: 260 };
const mixed = mixOklch(red, blue, 0.5);
const hex = oklchObjToHex(mixed);
```

### getContrastRatio

计算两个颜色之间的对比度，用于判断可访问性。

**示例**

```javascript
import { getContrastRatio } from 'rtdf/utils';

const white = { l: 1, c: 0, h: 0 };
const black = { l: 0, c: 0, h: 0 };
const ratio = getContrastRatio(white, black);
// 约 21 (最大对比度)
```

### getTextColorType

根据背景色判断文字应该使用浅色还是深色。

**示例**

```javascript
import { getTextColorType } from 'rtdf/utils';

getTextColorType({ l: 0.9, c: 0, h: 0 }); // 'dark'
getTextColorType({ l: 0.3, c: 0, h: 0 }); // 'light'
```

### radiusObj

Tailwind 圆角的映射对象，用于将圆角名称转换为 Tailwind 类名。

**示例**

```javascript
import { radiusObj } from 'rtdf/utils';

radiusObj.sm; // 'rounded-sm'
radiusObj.md; // 'rounded-md'
radiusObj.lg; // 'rounded-lg'
radiusObj.full; // 'rounded-full'
```

### getWeekRange

返回当前日期所处周的开始与结束日期。

**返回值**

`string[]` - 包含开始和结束日期的数组，格式为 YYYYMMDD

**示例**

```javascript
import { getWeekRange } from 'rtdf/utils';

getWeekRange(); // ['20240520', '20240526']
```

### getMonthRange

返回当前日期所处月的开始与结束日期。

**返回值**

`string[]` - 包含开始和结束日期的数组，格式为 YYYYMMDD

**示例**

```javascript
import { getMonthRange } from 'rtdf/utils';

getMonthRange(); // ['20240501', '20240531']
```

### getStartDay

获取指定年月第 1 日是周几。

**参数**

| 参数      | 类型   | 说明                    |
| --------- | ------ | ----------------------- |
| yearMonth | string | 年月字符串，如 "202405" |

**返回值**

`number` - 0-6，0 表示周日

**示例**

```javascript
import { getStartDay } from 'rtdf/utils';

getStartDay('202405'); // 3 (周三)
```

### getNowBeforeOrAfterMonth

获取当前月往前或往后 n 个月的年月数据。

**参数**

| 参数 | 类型   | 说明                   |
| ---- | ------ | ---------------------- |
| n    | number | 正数为往后，负数为往前 |

**返回值**

`string` - 年月字符串，格式为 YYYYMM

**示例**

```javascript
import { getNowBeforeOrAfterMonth } from 'rtdf/utils';

getNowBeforeOrAfterMonth(1); // 下个月，如 '202406'
getNowBeforeOrAfterMonth(-1); // 上个月，如 '202404'
```

### getCalendarData

生成指定年月的日历数据数组。

**参数**

| 参数        | 类型    | 默认值 | 说明                    |
| ----------- | ------- | ------ | ----------------------- |
| yearMonth   | string  | -      | 年月字符串，如 "202405" |
| startSunday | boolean | false  | 是否从周日开始          |

**返回值**

`string[]` - 日历数据数组，空格子为空字符串

**示例**

```javascript
import { getCalendarData } from 'rtdf/utils';

getCalendarData('202405');
// ['', '', '01', '02', '03', ..., '31']
```

### getMonthListRange

获取两个月份之间的所有月份。

**参数**

| 参数          | 类型   | 说明                  |
| ------------- | ------ | --------------------- |
| startMonthStr | string | 开始月份，格式 YYYYMM |
| endMonthStr   | string | 结束月份，格式 YYYYMM |

**返回值**

`string[]` - 月份数组

**示例**

```javascript
import { getMonthListRange } from 'rtdf/utils';

getMonthListRange('202403', '202406');
// ['202403', '202404', '202405', '202406']
```

### getDateRange

获取两个日期之间的所有日期。

**参数**

| 参数          | 类型     | 说明                    |
| ------------- | -------- | ----------------------- |
| startDate     | string   | 开始日期，格式 YYYYMMDD |
| endDate       | string   | 结束日期，格式 YYYYMMDD |
| disabledDates | string[] | 需要剔除的日期数组      |

**返回值**

`string[]` - 日期数组

**示例**

```javascript
import { getDateRange } from 'rtdf/utils';

getDateRange('20240501', '20240505', []);
// ['20240501', '20240502', '20240503', '20240504', '20240505']
```

### getCurrentWeek

获取当前周的所有日期。

**参数**

| 参数        | 类型    | 说明           |
| ----------- | ------- | -------------- |
| startSunday | boolean | 是否从周日开始 |

**返回值**

`string[]` - 当前周所有日期，格式 YYYYMMDD

**示例**

```javascript
import { getCurrentWeek } from 'rtdf/utils';

getCurrentWeek(false); // 从周一开始
// ['20240520', '20240521', ..., '20240526']
```

### getCurrentMonth

获取当前月的所有日期。

**返回值**

`string[]` - 当前月所有日期，格式 YYYYMMDD

**示例**

```javascript
import { getCurrentMonth } from 'rtdf/utils';

getCurrentMonth();
// ['20240501', '20240502', ..., '20240531']
```

### getCurrentQuarter

获取当前季度的所有日期。

**返回值**

`string[]` - 当前季度所有日期，格式 YYYYMMDD

**示例**

```javascript
import { getCurrentQuarter } from 'rtdf/utils';

getCurrentQuarter();
// ['20240401', '20240402', ..., '20240630']
```

### getDaysRangeWithToday

获取前后 n 天的日期数组。

**参数**

| 参数  | 类型    | 默认值 | 说明               |
| ----- | ------- | ------ | ------------------ |
| n     | number  | 0      | 正数往后，负数往前 |
| today | boolean | true   | 是否包含今天       |

**返回值**

`string[]` - 日期数组，格式 YYYYMMDD

**示例**

```javascript
import { getDaysRangeWithToday } from 'rtdf/utils';

getDaysRangeWithToday(3, true); // 从今天开始往后 3 天
getDaysRangeWithToday(-3, false); // 从昨天开始往前 3 天
```

### clampToGamut

将 OKLCH 颜色钳制到 sRGB 色域内。

**参数**

| 参数  | 类型          | 说明           |
| ----- | ------------- | -------------- |
| color | OklchColorObj | OKLCH 颜色对象 |

**返回值**

`OklchColorObj` - 钳制后的颜色对象

**示例**

```javascript
import { clampToGamut } from 'rtdf/utils';

// 超出色域的颜色会被钳制
clampToGamut({ l: 0.9, c: 0.4, h: 30 });
// { l: 0.9, c: 0.087, h: 30 }
```

### oklchToCss

生成 CSS oklch() 颜色值。

**参数**

| 参数  | 类型          | 说明             |
| ----- | ------------- | ---------------- |
| color | OklchColorObj | OKLCH 颜色对象   |
| alpha | number        | 可选，透明度 0-1 |

**返回值**

`string` - CSS 颜色值

**示例**

```javascript
import { oklchToCss } from 'rtdf/utils';

oklchToCss({ l: 0.7, c: 0.15, h: 30 });
// "oklch(0.7 0.15 30)"

oklchToCss({ l: 0.7, c: 0.15, h: 30 }, 0.5);
// "oklch(0.7 0.15 30 / 0.5)"
```

### adjustLightness

调整 OKLCH 颜色的亮度。

**参数**

| 参数  | 类型          | 说明                   |
| ----- | ------------- | ---------------------- |
| color | OklchColorObj | OKLCH 颜色对象         |
| delta | number        | 亮度调整值，可为正负数 |

**返回值**

`OklchColorObj` - 调整后的颜色对象

**示例**

```javascript
import { adjustLightness } from 'rtdf/utils';

adjustLightness({ l: 0.5, c: 0.2, h: 30 }, 0.2);
// { l: 0.7, c: 0.2, h: 30 }
```

### adjustChroma

调整 OKLCH 颜色的彩度。

**示例**

```javascript
import { adjustChroma } from 'rtdf/utils';

adjustChroma({ l: 0.5, c: 0.2, h: 30 }, -0.1);
// { l: 0.5, c: 0.1, h: 30 }
```

### adjustHue

调整 OKLCH 颜色的色相。

**示例**

```javascript
import { adjustHue } from 'rtdf/utils';

adjustHue({ l: 0.5, c: 0.2, h: 30 }, 90);
// { l: 0.5, c: 0.2, h: 120 }
```

### srgbToLinear

将 sRGB 分量值转换为线性 RGB 值。

**参数**

| 参数 | 类型   | 说明              |
| ---- | ------ | ----------------- |
| c    | number | sRGB 分量值 (0-1) |

**返回值**

`number` - 线性 RGB 值

**示例**

```javascript
import { srgbToLinear } from 'rtdf/utils';

srgbToLinear(0.5); // 0.214
srgbToLinear(1); // 1
srgbToLinear(0); // 0
```

### linearToSrgb

将线性 RGB 值转换为 sRGB 分量值。

**示例**

```javascript
import { linearToSrgb } from 'rtdf/utils';

linearToSrgb(0.214); // 0.5
```

### rgbToHex

将 RGB 颜色转换为 HEX 字符串。

**参数**

| 参数 | 类型   | 说明             |
| ---- | ------ | ---------------- |
| r    | number | 红色通道 (0-255) |
| g    | number | 绿色通道 (0-255) |
| b    | number | 蓝色通道 (0-255) |

**返回值**

`string` - HEX 颜色字符串

**示例**

```javascript
import { rgbToHex } from 'rtdf/utils';

rgbToHex(255, 85, 0); // "#ff5500"
rgbToHex(0, 0, 0); // "#000000"
```

### hexToRgb

将 HEX 颜色字符串转换为 RGB 数组。

**参数**

| 参数 | 类型   | 说明           |
| ---- | ------ | -------------- |
| hex  | string | HEX 颜色字符串 |

**返回值**

`[number, number, number]` - RGB 数组

**示例**

```javascript
import { hexToRgb } from 'rtdf/utils';

hexToRgb('#ff5500'); // [255, 85, 0]
hexToRgb('#000'); // [0, 0, 0]
```

### hslToRgb

将 HSL 颜色转换为 RGB。

**参数**

| 参数 | 类型   | 说明         |
| ---- | ------ | ------------ |
| h    | number | 色相 (0-360) |
| s    | number | 饱和度 (0-1) |
| l    | number | 亮度 (0-1)   |

**返回值**

`[number, number, number]` - RGB 数组

**示例**

```javascript
import { hslToRgb } from 'rtdf/utils';

hslToRgb(0, 1, 0.5); // [255, 0, 0] 红色
hslToRgb(120, 1, 0.5); // [0, 255, 0] 绿色
```

### rgbToHsl

将 RGB 颜色转换为 HSL。

**返回值**

`[number, number, number]` - [色相, 饱和度, 亮度]

**示例**

```javascript
import { rgbToHsl } from 'rtdf/utils';

rgbToHsl(255, 0, 0); // [0, 1, 0.5] 红色
rgbToHsl(0, 255, 0); // [120, 1, 0.5] 绿色
```

### formatOklch

格式化 OKLCH 为 CSS 字符串。

**参数**

| 参数 | 类型   | 说明         |
| ---- | ------ | ------------ |
| l    | number | 亮度 (0-1)   |
| c    | number | 彩度 (0-0.4) |
| h    | number | 色相 (0-360) |

**返回值**

`string` - 格式化后的字符串

**示例**

```javascript
import { formatOklch } from 'rtdf/utils';

formatOklch(0.7, 0.15, 30);
// "oklch(0.700 0.150 30.0)"
```

### formatRgb

格式化 RGB 为 CSS 字符串。

**示例**

```javascript
import { formatRgb } from 'rtdf/utils';

formatRgb(255, 85, 0);
// "rgb(255, 85, 0)"
```

### parseOklch

解析 OKLCH 字符串为对象。

**参数**

| 参数 | 类型   | 说明         |
| ---- | ------ | ------------ |
| str  | string | OKLCH 字符串 |

**返回值**

`OklchColorObj | null` - 解析后的对象或 null

**示例**

```javascript
import { parseOklch } from 'rtdf/utils';

parseOklch('oklch(0.7 0.15 30)');
// { l: 0.7, c: 0.15, h: 30 }
```

### oklchObjToRgbStr

将 OKLCH 对象转换为 RGB 字符串。

**示例**

```javascript
import { oklchObjToRgbStr } from 'rtdf/utils';

oklchObjToRgbStr({ l: 0.7, c: 0.15, h: 30 });
// "rgb(232, 162, 102)"
```

### oklchStrToHex

将 OKLCH 字符串转换为 HEX。

**示例**

```javascript
import { oklchStrToHex } from 'rtdf/utils';

oklchStrToHex('oklch(0.7 0.15 30)');
// "#e8a266"
```

### hexToOklchStr

将 HEX 转换为 OKLCH 字符串。

**示例**

```javascript
import { hexToOklchStr } from 'rtdf/utils';

hexToOklchStr('#ff5500');
// "oklch(0.658 0.203 43.817)"
```

### rgbStrToOklch

将 RGB 字符串转换为 OKLCH 对象。

**示例**

```javascript
import { rgbStrToOklch } from 'rtdf/utils';

rgbStrToOklch('rgb(255, 85, 0)');
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchArrayToHex

批量转换 OKLCH 数组为 HEX 数组。

**参数**

| 参数   | 类型            | 说明           |
| ------ | --------------- | -------------- |
| colors | OklchColorObj[] | OKLCH 对象数组 |

**返回值**

`string[]` - HEX 字符串数组

**示例**

```javascript
import { oklchArrayToHex } from 'rtdf/utils';

oklchArrayToHex([
	{ l: 0.7, c: 0.15, h: 30 },
	{ l: 0.5, c: 0.2, h: 260 }
]);
// ["#e8a266", "#3b5998"]
```

### isDisplayable

检测 OKLCH 颜色是否在 sRGB 色域内可显示。

**参数**

| 参数 | 类型   | 说明 |
| ---- | ------ | ---- |
| l    | number | 亮度 |
| c    | number | 彩度 |
| h    | number | 色相 |

**返回值**

`boolean` - 是否可显示

**示例**

```javascript
import { isDisplayable } from 'rtdf/utils';

isDisplayable(0.7, 0.15, 30); // true
isDisplayable(0.9, 0.4, 30); // false (超出色域)
```

### getMaxChroma

获取指定亮度和色相下的最大可用彩度。

**参数**

| 参数 | 类型   | 说明         |
| ---- | ------ | ------------ |
| l    | number | 亮度 (0-1)   |
| h    | number | 色相 (0-360) |

**返回值**

`number` - 最大彩度值

**示例**

```javascript
import { getMaxChroma } from 'rtdf/utils';

getMaxChroma(0.7, 30); // 约 0.18
getMaxChroma(0.5, 260); // 约 0.31
```
