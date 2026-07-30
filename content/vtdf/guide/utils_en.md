# Utility Functions

VTDF provides a set of useful utility functions that can be imported on demand.

## Import

```javascript
import { debounce, throttle, rgbToOklch } from 'vtdf/utils';
```

## Function List

### Performance Optimization

| Function        | Description                             |
| --------------- | --------------------------------------- |
| debounce        | Debounce function                       |
| throttle        | Throttle function                       |
| throttleWithRAF | Throttle based on requestAnimationFrame |

### Numeric Calculations

| Function      | Description                         |
| ------------- | ----------------------------------- |
| stepNumberFun | Round number by step                |
| getDomWidth   | Get rendered width of string in DOM |

### Date Utilities

| Function                 | Description                             |
| ------------------------ | --------------------------------------- |
| getDayNum                | Get number of days in a month           |
| isLeapYear               | Check if year is a leap year            |
| getWeekRange             | Get start and end date of current week  |
| getMonthRange            | Get start and end date of current month |
| getStartDay              | Get weekday of first day in a month     |
| getNowBeforeOrAfterMonth | Get year-month n months before/after    |
| getCalendarData          | Generate calendar data array            |
| getMonthListRange        | Get all months between two months       |
| getDateRange             | Get all dates between two dates         |
| getCurrentWeek           | Get all dates in current week           |
| getCurrentMonth          | Get all dates in current month          |
| getCurrentQuarter        | Get all dates in current quarter        |
| getDaysRangeWithToday    | Get n days before/after today           |

### Style Mapping

| Function  | Description                    |
| --------- | ------------------------------ |
| radiusObj | Tailwind radius mapping object |

### Color Conversion

| Function         | Description                            |
| ---------------- | -------------------------------------- |
| srgbToLinear     | sRGB to Linear RGB                     |
| linearToSrgb     | Linear RGB to sRGB                     |
| linearRgbToXyz   | Linear RGB to XYZ                      |
| xyzToLinearRgb   | XYZ to Linear RGB                      |
| xyzToOklab       | XYZ to Oklab                           |
| oklabToXyz       | Oklab to XYZ                           |
| oklabToOklch     | Oklab to OKLCH                         |
| oklchToOklab     | OKLCH to Oklab                         |
| rgbToOklch       | RGB to OKLCH                           |
| oklchToRgb       | OKLCH to RGB                           |
| rgbToHex         | RGB to HEX                             |
| hexToRgb         | HEX to RGB                             |
| hslToRgb         | HSL to RGB                             |
| rgbToHsl         | RGB to HSL                             |
| formatOklch      | Format OKLCH string                    |
| formatRgb        | Format RGB string                      |
| parseOklch       | Parse OKLCH string                     |
| oklchObjToHex    | OKLCH object to HEX                    |
| oklchObjToRgbStr | OKLCH object to RGB string             |
| oklchStrToHex    | OKLCH string to HEX                    |
| hexToOklch       | HEX to OKLCH object                    |
| hexToOklchStr    | HEX to OKLCH string                    |
| rgbStrToOklch    | RGB string to OKLCH object             |
| oklchArrayToHex  | Batch convert OKLCH array to HEX array |

### Color Operations

| Function         | Description                                    |
| ---------------- | ---------------------------------------------- |
| isDisplayable    | Check if color is within sRGB gamut            |
| getMaxChroma     | Get maximum chroma for given lightness and hue |
| clampToGamut     | Clamp color to sRGB gamut                      |
| oklchToCss       | Generate CSS oklch() color value               |
| mixOklch         | Mix two OKLCH colors                           |
| adjustLightness  | Adjust color lightness                         |
| adjustChroma     | Adjust color chroma                            |
| adjustHue        | Adjust color hue                               |
| getContrastRatio | Calculate contrast ratio between two colors    |
| getTextColorType | Determine if text should be light or dark      |

---

## Function Details

### debounce

Debounce function that only executes the last call within a time period.

**Parameters**

| Parameter | Type     | Default | Description                |
| --------- | -------- | ------- | -------------------------- |
| fn        | Function | -       | Function to debounce       |
| delay     | number   | 10      | Delay time in milliseconds |

**Example**

```javascript
import { debounce } from 'vtdf/utils';

const fn = () => console.log('hello');
const debouncedFn = debounce(fn, 1000);

// Multiple rapid calls, only the last one executes after 1 second
debouncedFn();
debouncedFn();
debouncedFn(); // Only this one executes
```

### throttle

Throttle function that executes at most once within a time period.

**Parameters**

| Parameter | Type     | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| fn        | Function | -       | Function to throttle          |
| delay     | number   | 50      | Interval time in milliseconds |

**Example**

```javascript
import { throttle } from 'vtdf/utils';

const fn = () => console.log('hello');
const throttledFn = throttle(fn, 1000);

// Executes at most once per second
window.addEventListener('scroll', throttledFn);
```

### throttleWithRAF

Throttle function based on requestAnimationFrame, suitable for animations.

**Parameters**

| Parameter | Type     | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| fn        | Function | -       | Function to throttle          |
| delay     | number   | 16      | Interval time in milliseconds |

**Example**

```javascript
import { throttleWithRAF } from 'vtdf/utils';

const onMove = (e) => console.log(e.clientX, e.clientY);
const throttledMove = throttleWithRAF(onMove, 16);

element.addEventListener('pointermove', throttledMove);

// Clear throttle
throttledMove.clear();
```

### stepNumberFun

Round a number according to step.

**Parameters**

| Parameter | Type   | Default | Description       |
| --------- | ------ | ------- | ----------------- |
| num       | number | -       | Number to process |
| step      | number | 1       | Step value        |

**Example**

```javascript
import { stepNumberFun } from 'vtdf/utils';

stepNumberFun(18, 5); // 20
stepNumberFun(12, 5); // 10
stepNumberFun(3.7, 0.5); // 3.5
```

### getDomWidth

Calculate the rendered width of a string in the DOM.

**Parameters**

| Parameter | Type        | Default | Description        |
| --------- | ----------- | ------- | ------------------ |
| dom       | HTMLElement | -       | Parent DOM element |
| str       | string      | -       | String to measure  |

**Example**

```javascript
import { getDomWidth } from 'vtdf/utils';

const width = getDomWidth(document.body, 'Hello World');
console.log(width); // e.g.: 85.5
```

### getDayNum

Get the number of days in a specific month.

**Parameters**

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| year      | string | Year, e.g. "2024"          |
| month     | string | Two-digit month, e.g. "02" |

**Example**

```javascript
import { getDayNum } from 'vtdf/utils';

getDayNum('2024', '02'); // 29 (leap year)
getDayNum('2023', '02'); // 28
getDayNum('2024', '04'); // 30
```

### isLeapYear

Check if a year is a leap year.

**Example**

```javascript
import { isLeapYear } from 'vtdf/utils';

isLeapYear(2024); // true
isLeapYear(2023); // false
isLeapYear(2000); // true
isLeapYear(1900); // false
```

### rgbToOklch

Convert RGB color to OKLCH color space.

**Parameters**

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| r         | number | Red channel (0-255)   |
| g         | number | Green channel (0-255) |
| b         | number | Blue channel (0-255)  |

**Return Value**

`{ l: number, c: number, h: number }` - OKLCH color object

- l: Lightness (0-1)
- c: Chroma (0-0.4)
- h: Hue (0-360)

**Example**

```javascript
import { rgbToOklch } from 'vtdf/utils';

const oklch = rgbToOklch(255, 85, 0);
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchToRgb

Convert OKLCH color to RGB.

**Example**

```javascript
import { oklchToRgb } from 'vtdf/utils';

const [r, g, b] = oklchToRgb(0.7, 0.15, 30);
// [232, 162, 102]
```

### hexToOklch

Convert HEX color to OKLCH object.

**Example**

```javascript
import { hexToOklch } from 'vtdf/utils';

const oklch = hexToOklch('#ff5500');
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchObjToHex

Convert OKLCH object to HEX string.

**Example**

```javascript
import { oklchObjToHex } from 'vtdf/utils';

const hex = oklchObjToHex({ l: 0.7, c: 0.15, h: 30 });
// "#e8a266"
```

### mixOklch

Mix two colors in OKLCH color space.

**Parameters**

| Parameter | Type          | Default | Description     |
| --------- | ------------- | ------- | --------------- |
| color1    | OklchColorObj | -       | First color     |
| color2    | OklchColorObj | -       | Second color    |
| ratio     | number        | 0.5     | Mix ratio (0-1) |

**Example**

```javascript
import { mixOklch, oklchObjToHex } from 'vtdf/utils';

const red = { l: 0.6, c: 0.25, h: 30 };
const blue = { l: 0.5, c: 0.2, h: 260 };
const mixed = mixOklch(red, blue, 0.5);
const hex = oklchObjToHex(mixed);
```

### getContrastRatio

Calculate contrast ratio between two colors for accessibility testing.

**Example**

```javascript
import { getContrastRatio } from 'vtdf/utils';

const white = { l: 1, c: 0, h: 0 };
const black = { l: 0, c: 0, h: 0 };
const ratio = getContrastRatio(white, black);
// approximately 21 (maximum contrast)
```

### getTextColorType

Determine if text should be light or dark based on background color.

**Example**

```javascript
import { getTextColorType } from 'vtdf/utils';

getTextColorType({ l: 0.9, c: 0, h: 0 }); // 'dark'
getTextColorType({ l: 0.3, c: 0, h: 0 }); // 'light'
```

### radiusObj

Tailwind radius mapping object for converting radius names to Tailwind classes.

**Example**

```javascript
import { radiusObj } from 'vtdf/utils';

radiusObj.sm; // 'rounded-sm'
radiusObj.md; // 'rounded-md'
radiusObj.lg; // 'rounded-lg'
radiusObj.full; // 'rounded-full'
```

### getWeekRange

Returns the start and end dates of the current week.

**Return Value**

`string[]` - Array containing start and end dates, format YYYYMMDD

**Example**

```javascript
import { getWeekRange } from 'vtdf/utils';

getWeekRange(); // ['20240520', '20240526']
```

### getMonthRange

Returns the start and end dates of the current month.

**Return Value**

`string[]` - Array containing start and end dates, format YYYYMMDD

**Example**

```javascript
import { getMonthRange } from 'vtdf/utils';

getMonthRange(); // ['20240501', '20240531']
```

### getStartDay

Get the weekday of the 1st day of a specific month.

**Parameters**

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| yearMonth | string | Year-month string, e.g. "202405" |

**Return Value**

`number` - 0-6, where 0 represents Sunday

**Example**

```javascript
import { getStartDay } from 'vtdf/utils';

getStartDay('202405'); // 3 (Wednesday)
```

### getNowBeforeOrAfterMonth

Get year-month data n months before or after the current month.

**Parameters**

| Parameter | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| n         | number | Positive for future, negative for past |

**Return Value**

`string` - Year-month string, format YYYYMM

**Example**

```javascript
import { getNowBeforeOrAfterMonth } from 'vtdf/utils';

getNowBeforeOrAfterMonth(1); // Next month, e.g. '202406'
getNowBeforeOrAfterMonth(-1); // Previous month, e.g. '202404'
```

### getCalendarData

Generate calendar data array for a specific month.

**Parameters**

| Parameter   | Type    | Default | Description                      |
| ----------- | ------- | ------- | -------------------------------- |
| yearMonth   | string  | -       | Year-month string, e.g. "202405" |
| startSunday | boolean | false   | Whether to start from Sunday     |

**Return Value**

`string[]` - Calendar data array, empty cells are empty strings

**Example**

```javascript
import { getCalendarData } from 'vtdf/utils';

getCalendarData('202405');
// ['', '', '01', '02', '03', ..., '31']
```

### getMonthListRange

Get all months between two months.

**Parameters**

| Parameter     | Type   | Description                |
| ------------- | ------ | -------------------------- |
| startMonthStr | string | Start month, format YYYYMM |
| endMonthStr   | string | End month, format YYYYMM   |

**Return Value**

`string[]` - Array of months

**Example**

```javascript
import { getMonthListRange } from 'vtdf/utils';

getMonthListRange('202403', '202406');
// ['202403', '202404', '202405', '202406']
```

### getDateRange

Get all dates between two dates.

**Parameters**

| Parameter     | Type     | Description                 |
| ------------- | -------- | --------------------------- |
| startDate     | string   | Start date, format YYYYMMDD |
| endDate       | string   | End date, format YYYYMMDD   |
| disabledDates | string[] | Dates to exclude            |

**Return Value**

`string[]` - Array of dates

**Example**

```javascript
import { getDateRange } from 'vtdf/utils';

getDateRange('20240501', '20240505', []);
// ['20240501', '20240502', '20240503', '20240504', '20240505']
```

### getCurrentWeek

Get all dates of the current week.

**Parameters**

| Parameter   | Type    | Description                  |
| ----------- | ------- | ---------------------------- |
| startSunday | boolean | Whether to start from Sunday |

**Return Value**

`string[]` - All dates of current week, format YYYYMMDD

**Example**

```javascript
import { getCurrentWeek } from 'vtdf/utils';

getCurrentWeek(false); // Start from Monday
// ['20240520', '20240521', ..., '20240526']
```

### getCurrentMonth

Get all dates of the current month.

**Return Value**

`string[]` - All dates of current month, format YYYYMMDD

**Example**

```javascript
import { getCurrentMonth } from 'vtdf/utils';

getCurrentMonth();
// ['20240501', '20240502', ..., '20240531']
```

### getCurrentQuarter

Get all dates of the current quarter.

**Return Value**

`string[]` - All dates of current quarter, format YYYYMMDD

**Example**

```javascript
import { getCurrentQuarter } from 'vtdf/utils';

getCurrentQuarter();
// ['20240401', '20240402', ..., '20240630']
```

### getDaysRangeWithToday

Get date array n days before or after today.

**Parameters**

| Parameter | Type    | Default | Description                            |
| --------- | ------- | ------- | -------------------------------------- |
| n         | number  | 0       | Positive for future, negative for past |
| today     | boolean | true    | Whether to include today               |

**Return Value**

`string[]` - Array of dates, format YYYYMMDD

**Example**

```javascript
import { getDaysRangeWithToday } from 'vtdf/utils';

getDaysRangeWithToday(3, true); // 3 days from today
getDaysRangeWithToday(-3, false); // 3 days before yesterday
```

### clampToGamut

Clamp an OKLCH color to the sRGB gamut.

**Parameters**

| Parameter | Type          | Description        |
| --------- | ------------- | ------------------ |
| color     | OklchColorObj | OKLCH color object |

**Return Value**

`OklchColorObj` - Clamped color object

**Example**

```javascript
import { clampToGamut } from 'vtdf/utils';

// Colors outside gamut will be clamped
clampToGamut({ l: 0.9, c: 0.4, h: 30 });
// { l: 0.9, c: 0.087, h: 30 }
```

### oklchToCss

Generate CSS oklch() color value.

**Parameters**

| Parameter | Type          | Description           |
| --------- | ------------- | --------------------- |
| color     | OklchColorObj | OKLCH color object    |
| alpha     | number        | Optional, opacity 0-1 |

**Return Value**

`string` - CSS color value

**Example**

```javascript
import { oklchToCss } from 'vtdf/utils';

oklchToCss({ l: 0.7, c: 0.15, h: 30 });
// "oklch(0.7 0.15 30)"

oklchToCss({ l: 0.7, c: 0.15, h: 30 }, 0.5);
// "oklch(0.7 0.15 30 / 0.5)"
```

### adjustLightness

Adjust the lightness of an OKLCH color.

**Parameters**

| Parameter | Type          | Description                                       |
| --------- | ------------- | ------------------------------------------------- |
| color     | OklchColorObj | OKLCH color object                                |
| delta     | number        | Lightness adjustment, can be positive or negative |

**Return Value**

`OklchColorObj` - Adjusted color object

**Example**

```javascript
import { adjustLightness } from 'vtdf/utils';

adjustLightness({ l: 0.5, c: 0.2, h: 30 }, 0.2);
// { l: 0.7, c: 0.2, h: 30 }
```

### adjustChroma

Adjust the chroma of an OKLCH color.

**Example**

```javascript
import { adjustChroma } from 'vtdf/utils';

adjustChroma({ l: 0.5, c: 0.2, h: 30 }, -0.1);
// { l: 0.5, c: 0.1, h: 30 }
```

### adjustHue

Adjust the hue of an OKLCH color.

**Example**

```javascript
import { adjustHue } from 'vtdf/utils';

adjustHue({ l: 0.5, c: 0.2, h: 30 }, 90);
// { l: 0.5, c: 0.2, h: 120 }
```

### srgbToLinear

Convert sRGB component value to linear RGB value.

**Parameters**

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| c         | number | sRGB component value (0-1) |

**Return Value**

`number` - Linear RGB value

**Example**

```javascript
import { srgbToLinear } from 'vtdf/utils';

srgbToLinear(0.5); // 0.214
srgbToLinear(1); // 1
srgbToLinear(0); // 0
```

### linearToSrgb

Convert linear RGB value to sRGB component value.

**Example**

```javascript
import { linearToSrgb } from 'vtdf/utils';

linearToSrgb(0.214); // 0.5
```

### rgbToHex

Convert RGB color to HEX string.

**Parameters**

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| r         | number | Red channel (0-255)   |
| g         | number | Green channel (0-255) |
| b         | number | Blue channel (0-255)  |

**Return Value**

`string` - HEX color string

**Example**

```javascript
import { rgbToHex } from 'vtdf/utils';

rgbToHex(255, 85, 0); // "#ff5500"
rgbToHex(0, 0, 0); // "#000000"
```

### hexToRgb

Convert HEX color string to RGB array.

**Parameters**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| hex       | string | HEX color string |

**Return Value**

`[number, number, number]` - RGB array

**Example**

```javascript
import { hexToRgb } from 'vtdf/utils';

hexToRgb('#ff5500'); // [255, 85, 0]
hexToRgb('#000'); // [0, 0, 0]
```

### hslToRgb

Convert HSL color to RGB.

**Parameters**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| h         | number | Hue (0-360)      |
| s         | number | Saturation (0-1) |
| l         | number | Lightness (0-1)  |

**Return Value**

`[number, number, number]` - RGB array

**Example**

```javascript
import { hslToRgb } from 'vtdf/utils';

hslToRgb(0, 1, 0.5); // [255, 0, 0] red
hslToRgb(120, 1, 0.5); // [0, 255, 0] green
```

### rgbToHsl

Convert RGB color to HSL.

**Return Value**

`[number, number, number]` - [hue, saturation, lightness]

**Example**

```javascript
import { rgbToHsl } from 'vtdf/utils';

rgbToHsl(255, 0, 0); // [0, 1, 0.5] red
rgbToHsl(0, 255, 0); // [120, 1, 0.5] green
```

### formatOklch

Format OKLCH to CSS string.

**Parameters**

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| l         | number | Lightness (0-1) |
| c         | number | Chroma (0-0.4)  |
| h         | number | Hue (0-360)     |

**Return Value**

`string` - Formatted string

**Example**

```javascript
import { formatOklch } from 'vtdf/utils';

formatOklch(0.7, 0.15, 30);
// "oklch(0.700 0.150 30.0)"
```

### formatRgb

Format RGB to CSS string.

**Example**

```javascript
import { formatRgb } from 'vtdf/utils';

formatRgb(255, 85, 0);
// "rgb(255, 85, 0)"
```

### parseOklch

Parse OKLCH string to object.

**Parameters**

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| str       | string | OKLCH string |

**Return Value**

`OklchColorObj | null` - Parsed object or null

**Example**

```javascript
import { parseOklch } from 'vtdf/utils';

parseOklch('oklch(0.7 0.15 30)');
// { l: 0.7, c: 0.15, h: 30 }
```

### oklchObjToRgbStr

Convert OKLCH object to RGB string.

**Example**

```javascript
import { oklchObjToRgbStr } from 'vtdf/utils';

oklchObjToRgbStr({ l: 0.7, c: 0.15, h: 30 });
// "rgb(232, 162, 102)"
```

### oklchStrToHex

Convert OKLCH string to HEX.

**Example**

```javascript
import { oklchStrToHex } from 'vtdf/utils';

oklchStrToHex('oklch(0.7 0.15 30)');
// "#e8a266"
```

### hexToOklchStr

Convert HEX to OKLCH string.

**Example**

```javascript
import { hexToOklchStr } from 'vtdf/utils';

hexToOklchStr('#ff5500');
// "oklch(0.658 0.203 43.817)"
```

### rgbStrToOklch

Convert RGB string to OKLCH object.

**Example**

```javascript
import { rgbStrToOklch } from 'vtdf/utils';

rgbStrToOklch('rgb(255, 85, 0)');
// { l: 0.658, c: 0.203, h: 43.817 }
```

### oklchArrayToHex

Batch convert OKLCH array to HEX array.

**Parameters**

| Parameter | Type            | Description            |
| --------- | --------------- | ---------------------- |
| colors    | OklchColorObj[] | Array of OKLCH objects |

**Return Value**

`string[]` - Array of HEX strings

**Example**

```javascript
import { oklchArrayToHex } from 'vtdf/utils';

oklchArrayToHex([
	{ l: 0.7, c: 0.15, h: 30 },
	{ l: 0.5, c: 0.2, h: 260 }
]);
// ["#e8a266", "#3b5998"]
```

### isDisplayable

Check if OKLCH color is displayable within sRGB gamut.

**Parameters**

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| l         | number | Lightness   |
| c         | number | Chroma      |
| h         | number | Hue         |

**Return Value**

`boolean` - Whether displayable

**Example**

```javascript
import { isDisplayable } from 'vtdf/utils';

isDisplayable(0.7, 0.15, 30); // true
isDisplayable(0.9, 0.4, 30); // false (out of gamut)
```

### getMaxChroma

Get maximum chroma for given lightness and hue.

**Parameters**

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| l         | number | Lightness (0-1) |
| h         | number | Hue (0-360)     |

**Return Value**

`number` - Maximum chroma value

**Example**

```javascript
import { getMaxChroma } from 'vtdf/utils';

getMaxChroma(0.7, 30); // approx 0.18
getMaxChroma(0.5, 260); // approx 0.31
```
