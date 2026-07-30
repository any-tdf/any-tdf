## Usage Scenarios

The TimePicker component is used for time selection, supporting both single-column and multi-column selection. By default, it allows selection of time within 10 years before and after the current year, and initially selects the current time.

## Time Types

The TimePicker component determines the time type through the type parameter, which is composed of YYYY MM DD hh mm ss. Currently, it supports the following 13 types. Any type not listed here will use the default 'YYYYMMDDhhmmss' type.

- YYYY: Year
- MM: Month
- DD: Day
- hh: Hour
- mm: Minute
- ss: Second
- YYYYMM: Year and Month
- hhmm: Hour and Minute
- mmss: Minute and Second
- YYYYMMDD: Year, Month and Day
- hhmmss: Hour, Minute and Second
- YYYYMMDDhh: Year, Month, Day and Hour
- YYYYMMDDhhmm: Year, Month, Day, Hour and Minute
- YYYYMMDDhhmmss: Year, Month, Day, Hour, Minute and Second

## Single Column Style

For all column data (year, month, day, hour, minute, second), you can customize three styles by passing corresponding Props: flex, showRow, and align. Please refer to the examples for specific usage.

## Selection Range Limitation

Since the number of days in each month updates dynamically based on the current year and month, all column data except days can have their selection range limited by passing in the corresponding Range, which is an array of corresponding data. However, please ensure that the range array has two items, **each item being of Number type**, and the first item is less than the second item, otherwise the default range will be used. Please refer to the examples for specific usage.

## Initial Selected Value

By default, each column data initially selects the current time, but you can also pass in corresponding initial values to customize the initially selected value. Note that the initial value type should be string type, and **ensure that month, day, hour, minute, and second initial values are padded to two digits if less than two digits**. Please refer to the examples for specific usage.

## Minute and Second Step

Considering practical use, the component supports step settings for minute and second data. The default step is 1, meaning each selection increases by 1 minute or 1 second. Please refer to the examples for specific usage.

## outFormat

By default, the TimePicker component's outFormat is generated from the input type following the rule [years, months, and days are connected by -, hours, minutes, and seconds are connected by :, and the two parts are connected by space]. For example, `'YYYYMMDD'` corresponds to `YYYY-MM-DD`, `'YYYYMMDDhh'` corresponds to `YYYY-MM-DD hh`, `'hhmmss'` corresponds to `hh:mm:ss`, etc. Of course, you can also customize the output format. Please refer to the examples for specific usage.

Note that the second parameter returned by onconfirm is the selected time object, making it convenient for developers to handle themselves.

## Note

TimePicker is encapsulated based on Popup by pre-defining some Popup Props, so different effects can be achieved by passing in Popup properties. For example, in the example, the radius style is changed by setting the popup's radius.

If you don't need to use a popup, you can set `popup` to `null`, and the TimePicker will be displayed directly on the page. You can set the display area height percentage with the `height` property.
