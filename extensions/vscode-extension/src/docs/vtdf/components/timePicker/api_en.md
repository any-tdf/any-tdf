## TimePicker Props

| Name        | Type                                           | Default                                    | Required | Description                                             |
| ----------- | ---------------------------------------------- | ------------------------------------------ | -------- | ------------------------------------------------------- |
| visible     | `boolean`                                      | `false`                                    | N        | Whether to show the picker.                             |
| type        | `TimePickerType`                               | `'YYYYMMDDhhmmss'`                         | N        | Time type.                                              |
| yearProps   | `TimePickerItem`                               | `{}`                                       | N        | Year column parameters.                                 |
| monthProps  | `TimePickerItem`                               | `{}`                                       | N        | Month column parameters.                                |
| dayProps    | `TimePickerItem`                               | `{}`                                       | N        | Day column parameters.                                  |
| hourProps   | `TimePickerItem`                               | `{}`                                       | N        | Hour column parameters.                                 |
| minuteProps | `TimePickerItem`                               | `{}`                                       | N        | Minute column parameters.                               |
| secondProps | `TimePickerItem`                               | `{}`                                       | N        | Second column parameters.                               |
| initYear    | `string`                                       | `''`                                       | N        | Initial selected year.                                  |
| initMonth   | `string`                                       | `''`                                       | N        | Initial selected month.                                 |
| initDay     | `string`                                       | `''`                                       | N        | Initial selected day.                                   |
| initHour    | `string`                                       | `''`                                       | N        | Initial selected hour.                                  |
| initMinute  | `string`                                       | `''`                                       | N        | Initial selected minute.                                |
| initSecond  | `string`                                       | `''`                                       | N        | Initial selected second.                                |
| minuteStep  | `number`                                       | `1`                                        | N        | Minute step.                                            |
| secondStep  | `number`                                       | `1`                                        | N        | Second step.                                            |
| yearRange   | `[number,number]\|[]`                          | `[]`                                       | N        | Year range.                                             |
| monthRange  | `[number,number]`                              | `[1, 12]`                                  | N        | Month range.                                            |
| hourRange   | `[number,number]`                              | `[0, 23]`                                  | N        | Hour range.                                             |
| minuteRange | `[number,number]`                              | `[0, 59]`                                  | N        | Minute range.                                           |
| secondRange | `[number,number]`                              | `[0, 59]`                                  | N        | Second range.                                           |
| showTips    | `boolean`                                      | `true`                                     | N        | Whether to show tips.                                   |
| cancelText  | `string`                                       | Current language timePicker.defaultCancel  | N        | Cancel button text.                                     |
| confirmText | `string`                                       | Current language timePicker.defaultConfirm | N        | Confirm button text.                                    |
| title       | `string`                                       | Current language timePicker.defaultTitle   | N        | Title text.                                             |
| yearText    | `string`                                       | Current language timePicker.defaultYear    | N        | Year column tip text.                                   |
| monthText   | `string`                                       | Current language timePicker.defaultMonth   | N        | Month column tip text.                                  |
| dayText     | `string`                                       | Current language timePicker.defaultDay     | N        | Day column tip text.                                    |
| hourText    | `string`                                       | Current language timePicker.defaultHour    | N        | Hour column tip text.                                   |
| minuteText  | `string`                                       | Current language timePicker.defaultMinute  | N        | Minute column tip text.                                 |
| secondText  | `string`                                       | Current language timePicker.defaultSecond  | N        | Second column tip text.                                 |
| outFormat   | `string`                                       | `''`                                       | N        | Output data format.                                     |
| height      | `number`                                       | `30`                                       | N        | Height percentage of display area when not using popup. |
| popup       | [`Popup`](/components?nav=popup&tab=1)\|`null` | `{}`                                       | N        | Popup parameters. Pass `null` to display without popup. |

## TimePicker Events

| Name    | Type                                                | Parameters                                                 | Description                             |
| ------- | --------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| close   | `() => void`                                        | -                                                          | Triggered when closing.                 |
| cancel  | `() => void`                                        | -                                                          | Triggered when clicking cancel button.  |
| confirm | `(timeStr: string, timeObj: TimePickerObj) => void` | timeStr - Formatted time string<br />timeObj - Time object | Triggered when clicking confirm button. |

## TimePickerItem Props

| Name    | Type                        | Default    | Required | Description                                                     |
| ------- | --------------------------- | ---------- | -------- | --------------------------------------------------------------- |
| flex    | `number`                    | `1`        | N        | Width ratio of year, month, day, hour, minute, second columns.  |
| showRow | `3\|5\|7`                   | `5`        | N        | Visible rows of year, month, day, hour, minute, second columns. |
| align   | `'left'\|'center'\|'right'` | `'center'` | N        | Alignment of year, month, day, hour, minute, second columns.    |

## TimePickerType

```javascript
type TimePickerType =
	| 'YYYY'
	| 'MM'
	| 'hh'
	| 'mm'
	| 'ss'
	| 'YYYYMM'
	| 'hhmm'
	| 'mmss'
	| 'YYYYMMDD'
	| 'hhmmss'
	| 'YYYYMMDDhh'
	| 'YYYYMMDDhhmm'
	| 'YYYYMMDDhhmmss';
```

## TimePickerObj

```javascript
type TimePickerObj = { YYYY: string; MM: string; DD: string; hh: string; mm: string; ss: string };
```
