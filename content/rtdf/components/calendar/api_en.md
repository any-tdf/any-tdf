## Calendar Props

| Name              | Type                                                      | Default                                    | Required | Description                                                                    |
| ----------------- | --------------------------------------------------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| visible           | `boolean`                                                 | `false`                                    | N        | Whether to show the calendar.                                                  |
| startMonth        | `string`                                                  | 6 months before current month              | N        | Start month in YYYYMM format.                                                  |
| endMonth          | `string`                                                  | 6 months after current month               | N        | End month in YYYYMM format.                                                    |
| initMonth         | `string`                                                  | Current month                              | N        | Initial display month in YYYYMM format.                                        |
| mode              | `'single'\|'multiple'\|'range'`                           | `'single'`                                 | N        | Selection mode.                                                                |
| startSunday       | `boolean`                                                 | `false`                                    | N        | Whether week starts from Sunday.                                               |
| weekendRed        | `boolean`                                                 | `false`                                    | N        | Whether weekend dates are in red.                                              |
| monthCard         | `boolean`                                                 | `true`                                     | N        | Whether to use card style for month data.                                      |
| monthMark         | `boolean`                                                 | `false`                                    | N        | Whether to show month watermark.                                               |
| monthMarkSize     | `'3xl'\|'4xl'\|'5xl'\|'6xl'\|'7xl'\|'8xl'\|'9xl'`         | `'7xl'`                                    | N        | Month watermark text size.                                                     |
| height            | `number`                                                  | `50`                                       | N        | Display height as percentage of page height.                                   |
| infoDates         | `InfoDate[]`                                              | `[]`                                       | N        | Dates that need to display information.                                        |
| disabledDates     | `string[]`                                                | `[]`                                       | N        | Disabled dates.                                                                |
| radius            | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`                                     | N        | Border radius style for selected dates.                                        |
| showSelectedDay   | `boolean`                                                 | `true`                                     | N        | Whether to show selected days count in confirm button for multiple/range mode. |
| confirmText       | `string`                                                  | Current language calendarLang.confirmText  | N        | Confirm button text.                                                           |
| selectedText      | `string`                                                  | Current language calendarLang.selectedText | N        | Part of confirm button text when showSelectedDay is true.                      |
| dayText           | `string`                                                  | Current language calendarLang.dayText      | N        | Part of confirm button text when showSelectedDay is true.                      |
| quickSelects      | `('week'\|'month'\|'quarter'\|number)[]`                  | `[]`                                       | N        | Quick selection configuration parameters.                                      |
| includeToday      | `boolean`                                                 | `false`                                    | N        | Whether to include today when using quick select days.                         |
| highlightToday    | `boolean`                                                 | `true`                                     | N        | Whether to highlight today.                                                    |
| useAnimation      | `boolean`                                                 | `true`                                     | N        | Whether to use animation when auto-scrolling to specified month.               |
| outFormat         | `string`                                                  | `'YMD'`                                    | N        | Output date format.                                                            |
| popup             | [`Popup`](/components?nav=popup&tab=1) \| `null`          | `{}`                                       | N        | Popup parameters, pass null to disable popup.                                  |
| button            | [`Button`](/components?nav=button&tab=1)                  | `{}`                                       | N        | Confirm button parameters.                                                     |
| card              | [`Card`](/components?nav=card&tab=1)                      | `{}`                                       | N        | Month card parameters, effective when monthCard is true.                       |
| clear             | `boolean`                                                 | `true`                                     | N        | Whether to clear selected dates when closing.                                  |
| initSelectedDates | `string[]`                                                | `[]`                                       | N        | Initially selected dates in YYYYMMDD format.                                   |

## Calendar Events

| Name      | Type                        | Parameters                                        | Description                                                             |
| --------- | --------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| onClose   | `() => void`                | -                                                 | Triggered when closing.                                                 |
| onclose   | `() => void`                | -                                                 | Triggered when closing. Lowercase event alias compatible with STDF.     |
| onConfirm | `(dates: string[]) => void` | dates - Array of formatted selected date strings. | Triggered on confirm click.                                             |
| onconfirm | `(dates: string[]) => void` | dates - Array of formatted selected date strings. | Triggered on confirm click. Lowercase event alias compatible with STDF. |

## InfoDate Props

| Name | Type     | Default | Required | Description                           |
| ---- | -------- | ------- | -------- | ------------------------------------- |
| date | `string` | -       | Y        | Date in YYYYMMDD format.              |
| info | `string` | -       | Y        | Information content, keep it concise. |
