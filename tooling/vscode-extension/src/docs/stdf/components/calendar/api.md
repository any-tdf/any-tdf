## Calendar Props

| 名称              | 类型                                                             | 默认值                               | 必传 | 说明                                         |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------ | ---- | -------------------------------------------- |
| visible           | `boolean`                                                        | `false`                              | N    | 是否显示。                                   |
| startMonth        | `string`                                                         | 当前月份前第 6 个月                  | N    | 开始月份，格式为 YYYYMM。                    |
| endMonth          | `string`                                                         | 当前月份后第 6 个月                  | N    | 结束月份，格式为 YYYYMM。                    |
| initMonth         | `string`                                                         | 当前月份                             | N    | 初始化时显示月份，格式为 YYYYMM。            |
| mode              | `'single'\|'multiple'\|'range'`                                  | `'single'`                           | N    | 选择模式。                                   |
| startSunday       | `boolean`                                                        | `false`                              | N    | 是否从周日开始。                             |
| weekendRed        | `boolean`                                                        | `false`                              | N    | 是否周末红色。                               |
| monthCard         | `boolean`                                                        | `true`                               | N    | 月数据是否使用卡片样式。                     |
| monthMark         | `boolean`                                                        | `false`                              | N    | 是否显示月份水印。                           |
| monthMarkSize     | `'3xl'\|'4xl'\|'5xl'\|'6xl'\|'7xl'\|'8xl'\|'9xl'`                | `'7xl'`                              | N    | 月份水印文字大小。                           |
| height            | `number`                                                         | `50`                                 | N    | 显示高度占页面高度百分比。                   |
| infoDates         | `InfoDate[]`                                                     | `[]`                                 | N    | 需要显示信息的日期。                         |
| disabledDates     | `string[]`                                                       | `[]`                                 | N    | 不可选的日期。                               |
| radius            | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`        | `'sm'`                               | N    | 选定日期的圆角风格。                         |
| showSelectedDay   | `boolean`                                                        | `true`                               | N    | 多选和范围选择时确定按钮是否显示已选天数。   |
| confirmText       | `string`                                                         | 当前语言的 calendarLang.confirmText  | N    | 确定按钮文案。                               |
| selectedText      | `string`                                                         | 当前语言的 calendarLang.selectedText | N    | showSelectedDay 为 true 时确定按钮部分文案。 |
| dayText           | `string`                                                         | 当前语言的 calendarLang.dayText      | N    | showSelectedDay 为 true 时确定按钮部分文案。 |
| quickSelects      | `('week'\|'month'\|'quarter'\|number)[]`                         | `[]`                                 | N    | 快捷选择配置参数。                           |
| includeToday      | `boolean`                                                        | `false`                              | N    | 快速选择天数时是否包含今天。                 |
| highlightToday    | `boolean`                                                        | `true`                               | N    | 是否高亮今天。                               |
| useAnimation      | `boolean`                                                        | `true`                               | N    | 自动滚动到指定月份时是否使用动画。           |
| outFormat         | `string`                                                         | `'YMD'`                              | N    | 返回日期数据格式。                           |
| popup             | [`Popup`](https://stdf.dev/components?nav=popup&tab=1) \| `null` | `{}`                                 | N    | 弹出层参数，传 null 时不使用弹出层。         |
| button            | [`Button`](https://stdf.dev/components?nav=button&tab=1)         | `{}`                                 | N    | 确定按钮参数。                               |
| card              | [`Card`](https://stdf.dev/components?nav=card&tab=1)             | `{}`                                 | N    | 月份卡片参数，monthCard 为 true 时生效。     |
| clear             | `boolean`                                                        | `true`                               | N    | 关闭时是否清空已选日期。                     |
| initSelectedDates | `string[]`                                                       | `[]`                                 | N    | 初始化时已选日期，格式为 YYYYMMDD。          |

## Calendar Events

| 名称      | 类型                        | 参数                                           | 描述                 |
| --------- | --------------------------- | ---------------------------------------------- | -------------------- |
| onclose   | `() => void`                | -                                              | 关闭时触发。         |
| onconfirm | `(dates: string[]) => void` | dates - 所有选定日期格式化后字符串组成的数组。 | 点击确定按钮时触发。 |

## InfoDate Props

| 名称 | 类型     | 默认值 | 必传 | 说明                               |
| ---- | -------- | ------ | ---- | ---------------------------------- |
| date | `string` | -      | Y    | 由年月日 YYYYMMDD 格式组成的数组。 |
| info | `string` | -      | Y    | 信息内容，长度尽量短。             |
