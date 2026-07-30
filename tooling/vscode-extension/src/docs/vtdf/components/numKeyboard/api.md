## NumKeyboard Props

| 名称         | 类型                                                  | 默认值                 | 必传 | 说明                                           |
| ------------ | ----------------------------------------------------- | ---------------------- | ---- | ---------------------------------------------- |
| value        | `string`                                              | `''`                   | N    | 输入内容。                                     |
| type         | `'button'\|'block'`                                   | `'button'`             | N    | 键盘样式类型。                                 |
| visible      | `boolean`                                             | `false`                | N    | 是否显示键盘。                                 |
| height       | `'8'\|'10'\|'12'\|'14'\|'16'\|'20'`                   | `'12'`                 | N    | 按键高度。                                     |
| space        | `'0'\|'1'\|'2'\|'3'\|'4'`                             | `'2'`                  | N    | 按键间距。                                     |
| p            | `'0'\|'1'\|'2'\|'3'\|'4'`                             | `'2'`                  | N    | 键盘内边距。                                   |
| reverse      | `boolean`                                             | `false`                | N    | 数字是否上下反向。                             |
| done         | `boolean`                                             | `true`                 | N    | 是否显示完成按钮。                             |
| dot          | `boolean`                                             | `true`                 | N    | 是否显示小数点。                               |
| close        | `boolean`                                             | `false`                | N    | 是否显示关闭按钮。                             |
| doneText     | `string`                                              | 当前语言的 common.done | N    | 完成按钮文案。                                 |
| doneDisabled | `boolean`                                             | `false`                | N    | 完成按钮是否禁用。                             |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`                 | N    | 按键圆角。                                     |
| clear        | `boolean`                                             | `false`                | N    | 打开时是否清空内容。                           |
| preview      | `boolean`                                             | `false`                | N    | 是否显示输入预览。                             |
| previewMask  | `boolean`                                             | `false`                | N    | 是否显示预览遮罩。                             |
| panelClass   | `string`                                              | `''`                   | N    | 键盘面板注入 Class。                           |
| keyClass     | `string`                                              | `''`                   | N    | 按键注入 Class。                               |
| doneClass    | `string`                                              | `''`                   | N    | 完成按键注入 Class。                           |
| popup        | [`Popup`](/components?nav=popup&tab=1)\|`null`        | `{}`                   | N    | 弹出层参数，传 `null` 时不使用弹出层直接展示。 |

## NumKeyboard Events

| 名称  | 类型                                                                                              | 参数                     | 描述                   |
| ----- | ------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------- |
| click | `(key: '0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'7'\|'8'\|'9'\|'.'\|'delete'\|'close'\|'done') => void` | key - 本次点击的键盘 key | 每次点击任意按键触发。 |
| open  | `(height: number) => void`                                                                        | height - 键盘高度        | 键盘打开时触发。       |
| close | `() => void`                                                                                      | -                        | 键盘关闭时触发。       |
