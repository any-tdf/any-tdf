## CodeInput Props

| 名称            | 类型                                                                        | 默认值     | 必传 | 说明                                                                              |
| --------------- | --------------------------------------------------------------------------- | ---------- | ---- | --------------------------------------------------------------------------------- |
| value           | `string`                                                                    | `''`       | N    | 输入值（bindable）。                                                              |
| length          | `number`                                                                    | `6`        | N    | 输入框长度。                                                                      |
| mask            | `boolean\|string`                                                           | `false`    | N    | 掩码，true 显示圆点，字符串显示该字符。                                           |
| gutter          | `'0'\|'1'\|'2'\|'3'\|'4'`                                                   | `'2'`      | N    | 格子间距。                                                                        |
| focused         | `boolean`                                                                   | `false`    | N    | 是否聚焦（bindable）。                                                            |
| type            | `'number'\|'text'`                                                          | `'number'` | N    | 输入类型。                                                                        |
| inputMode       | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''` | `''`       | N    | 原生键盘类型，为空时根据 type 自动选择。                                          |
| native          | `boolean`                                                                   | `false`    | N    | 是否使用原生键盘。                                                                |
| info            | `string`                                                                    | `''`       | N    | 提示信息。                                                                        |
| errorInfo       | `string`                                                                    | `''`       | N    | 错误提示。                                                                        |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                   | `''`       | N    | 圆角。                                                                            |
| cellSize        | `'sm'\|'md'\|'lg'`                                                          | `'md'`     | N    | 单元格大小。                                                                      |
| cellStyle       | `'box'\|'line'`                                                             | `'box'`    | N    | 单元格样式。                                                                      |
| cellBg          | `'surface'\|'gray'\|'theme'`                                                | `'gray'`   | N    | 单元格背景。                                                                      |
| cellBorder      | `'none'\|'solid'\|'dashed'\|'dotted'`                                       | `'solid'`  | N    | 单元格边框样式。                                                                  |
| cursorStyle     | `'line'\|'underline'`                                                       | `'line'`   | N    | 光标样式。                                                                        |
| cursorAnimation | `'pulse'\|'blink'`                                                          | `'blink'`  | N    | 光标动画。                                                                        |
| keyboardVisible | `boolean`                                                                   | `false`    | N    | 键盘是否可见（bindable），控制光标是否闪烁。                                      |
| autoClose       | `boolean`                                                                   | `false`    | N    | 输入完成后是否自动关闭键盘。                                                      |
| autoScroll      | `boolean\|number`                                                           | `true`     | N    | 键盘弹出时自动滚动页面避免遮挡，true 使用默认高度（视口 40%），数值则使用该高度。 |
| bold            | `boolean`                                                                   | `false`    | N    | 输入内容是否加大加粗显示。                                                        |
| injClass        | `string`                                                                    | `''`       | N    | 注入 CSS。                                                                        |

## CodeInput Events

| 名称            | 类型                         | 参数              | 说明                                                                |
| --------------- | ---------------------------- | ----------------- | ------------------------------------------------------------------- |
| onChange        | `(value: string) => void`    | value: 当前输入值 | 输入值变化时触发。                                                  |
| onchange        | `(value: string) => void`    | value: 当前输入值 | 输入值变化时触发。 兼容 STDF 的小写事件别名。                       |
| onFinish        | `(value: string) => void`    | value: 当前输入值 | 输入完成时触发。                                                    |
| onfinish        | `(value: string) => void`    | value: 当前输入值 | 输入完成时触发。 兼容 STDF 的小写事件别名。                         |
| onClose         | `() => void`                 | -                 | 键盘关闭时触发（autoClose 为 true 时）。                            |
| onclose         | `() => void`                 | -                 | 键盘关闭时触发（autoClose 为 true 时）。 兼容 STDF 的小写事件别名。 |
| onFocus         | `() => void`                 | -                 | 聚焦时触发。                                                        |
| onfocus         | `() => void`                 | -                 | 聚焦时触发。 兼容 STDF 的小写事件别名。                             |
| onFocusedChange | `(focused: boolean) => void` | focused: 是否聚焦 | 聚焦状态变化时触发。                                                |
