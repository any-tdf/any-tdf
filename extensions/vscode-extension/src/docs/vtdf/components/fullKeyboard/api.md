## FullKeyboard Props

| 名称         | 类型                                                      | 默认值                 | 必传 | 说明                                           |
| ------------ | --------------------------------------------------------- | ---------------------- | ---- | ---------------------------------------------- |
| value        | `string`                                                  | `''`                   | N    | 输入内容。                                     |
| visible      | `boolean`                                                 | `true`                 | N    | 是否显示键盘。                                 |
| type         | `'button'\|'block'`                                       | `'button'`             | N    | 键盘样式类型。                                 |
| mode         | `'letter'\|'letterNumber'\|'full'`                        | `'full'`               | N    | 键盘模式。                                     |
| done         | `boolean`                                                 | `true`                 | N    | 是否显示完成按钮。                             |
| doneText     | `string`                                                  | 当前语言的 common.done | N    | 完成按钮文案。                                 |
| doneDisabled | `boolean`                                                 | `false`                | N    | 完成按钮是否禁用。                             |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `''`                   | N    | 按键圆角。                                     |
| preview      | `boolean`                                                 | `false`                | N    | 是否显示输入预览。                             |
| previewMask  | `boolean`                                                 | `false`                | N    | 预览是否掩码显示。                             |
| panelClass   | `string`                                                  | `''`                   | N    | 键盘面板注入 Class。                           |
| keyClass     | `string`                                                  | `''`                   | N    | 按键注入 Class。                               |
| doneClass    | `string`                                                  | `''`                   | N    | 完成按键注入 Class。                           |
| popup        | [`Popup`](/components?nav=popup&tab=1)\|`null`            | `{}`                   | N    | 弹出层参数，传 `null` 时不使用弹出层直接展示。 |

## FullKeyboard Events

| 名称  | 类型                       | 参数                     | 描述             |
| ----- | -------------------------- | ------------------------ | ---------------- |
| click | `(key: string) => void`    | key - 本次点击的键盘 key | 点击按键时触发。 |
| open  | `(height: number) => void` | height - 键盘高度        | 键盘打开时触发。 |
| close | `() => void`               | -                        | 键盘关闭时触发。 |
