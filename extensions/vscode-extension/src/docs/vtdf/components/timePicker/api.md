## TimePicker Props

| 名称        | 类型                                           | 默认值                               | 必传 | 说明                                           |
| ----------- | ---------------------------------------------- | ------------------------------------ | ---- | ---------------------------------------------- |
| visible     | `boolean`                                      | `false`                              | N    | 是否显示。                                     |
| type        | `TimePickerType`                               | `'YYYYMMDDhhmmss'`                   | N    | 时间类型。                                     |
| yearProps   | `TimePickerItem`                               | `{}`                                 | N    | 年份列参数。                                   |
| monthProps  | `TimePickerItem`                               | `{}`                                 | N    | 月份列参数。                                   |
| dayProps    | `TimePickerItem`                               | `{}`                                 | N    | 日期列参数。                                   |
| hourProps   | `TimePickerItem`                               | `{}`                                 | N    | 小时列参数。                                   |
| minuteProps | `TimePickerItem`                               | `{}`                                 | N    | 分钟列参数。                                   |
| secondProps | `TimePickerItem`                               | `{}`                                 | N    | 秒钟列参数。                                   |
| initYear    | `string`                                       | `''`                                 | N    | 初始选定的年份。                               |
| initMonth   | `string`                                       | `''`                                 | N    | 初始选定的月份。                               |
| initDay     | `string`                                       | `''`                                 | N    | 初始选定的日期。                               |
| initHour    | `string`                                       | `''`                                 | N    | 初始选定的小时。                               |
| initMinute  | `string`                                       | `''`                                 | N    | 初始选定的分钟。                               |
| initSecond  | `string`                                       | `''`                                 | N    | 初始选定的秒钟。                               |
| minuteStep  | `number`                                       | `1`                                  | N    | 分钟步长。                                     |
| secondStep  | `number`                                       | `1`                                  | N    | 秒钟步长。                                     |
| yearRange   | `[number,number]\|[]`                          | `[]`                                 | N    | 年份范围。                                     |
| monthRange  | `[number,number]`                              | `[1, 12]`                            | N    | 月份范围。                                     |
| hourRange   | `[number,number]`                              | `[0, 23]`                            | N    | 小时范围。                                     |
| minuteRange | `[number,number]`                              | `[0, 59]`                            | N    | 分钟范围。                                     |
| secondRange | `[number,number]`                              | `[0, 59]`                            | N    | 秒钟范围。                                     |
| showTips    | `boolean`                                      | `true`                               | N    | 是否显示提示信息。                             |
| cancelText  | `string`                                       | 当前语言的 timePicker.defaultCancel  | N    | 取消选项文本。                                 |
| confirmText | `string`                                       | 当前语言的 timePicker.defaultConfirm | N    | 确定选项文本。                                 |
| title       | `string`                                       | 当前语言的 timePicker.defaultTitle   | N    | 中间标题文本。                                 |
| yearText    | `string`                                       | 当前语言的 timePicker.defaultYear    | N    | 年份列提示文本。                               |
| monthText   | `string`                                       | 当前语言的 timePicker.defaultMonth   | N    | 月份列提示文本。                               |
| dayText     | `string`                                       | 当前语言的 timePicker.defaultDay     | N    | 日期列提示文本。                               |
| hourText    | `string`                                       | 当前语言的 timePicker.defaultHour    | N    | 小时列提示文本。                               |
| minuteText  | `string`                                       | 当前语言的 timePicker.defaultMinute  | N    | 分钟列提示文本。                               |
| secondText  | `string`                                       | 当前语言的 timePicker.defaultSecond  | N    | 秒钟列提示文本。                               |
| outFormat   | `string`                                       | `''`                                 | N    | 返回数据格式。                                 |
| height      | `number`                                       | `30`                                 | N    | 不使用弹出层时，展示区域高度占页面百分比。     |
| popup       | [`Popup`](/components?nav=popup&tab=1)\|`null` | `{}`                                 | N    | 弹出层参数，传 `null` 时不使用弹出层直接展示。 |

## TimePicker Events

| 名称    | 类型                                                | 参数                                                   | 描述                 |
| ------- | --------------------------------------------------- | ------------------------------------------------------ | -------------------- |
| close   | `() => void`                                        | -                                                      | 关闭时触发。         |
| cancel  | `() => void`                                        | -                                                      | 点击左侧取消时触发。 |
| confirm | `(timeStr: string, timeObj: TimePickerObj) => void` | timeStr - 格式化后的时间字符串<br />timeObj - 时间对象 | 点击右侧确定时触发。 |

## TimePickerItem Props

| 名称    | 类型                        | 默认值     | 必传 | 说明                                         |
| ------- | --------------------------- | ---------- | ---- | -------------------------------------------- |
| flex    | `number`                    | `1`        | N    | 年、月、日、时、分、秒数据列所占的宽度比例。 |
| showRow | `3\|5\|7`                   | `5`        | N    | 年、月、日、时、分、秒数据列可见行数。       |
| align   | `'left'\|'center'\|'right'` | `'center'` | N    | 年、月、日、时、分、秒数据列对齐方式。       |

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
