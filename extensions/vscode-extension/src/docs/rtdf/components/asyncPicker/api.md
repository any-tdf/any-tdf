## AsyncPicker Props

| 名称         | 类型                                           | 默认值                            | 必传 | 说明                                           |
| ------------ | ---------------------------------------------- | --------------------------------- | ---- | ---------------------------------------------- |
| visible      | `boolean`                                      | `false`                           | N    | 是否显示。                                     |
| data         | `array`                                        | `[]`                              | Y    | 列数据，具体使用请参考示例。                   |
| lastLevel    | `boolean`                                      | `false`                           | N    | 是否是最后一级。                               |
| firstLevel   | `boolean`                                      | `false`                           | N    | 是否是第一级。                                 |
| showRow      | `3\|5\|7`                                      | `5`                               | N    | 列显示行数。                                   |
| labelKey     | `string`                                       | `'label'`                         | N    | 自定义 label 的 key。                          |
| align        | `'left'\|'center'\|'right'`                    | `'center'`                        | N    | 对齐方式。                                     |
| cancelText   | `string`                                       | 当前语言的 picker.defaultCancel   | N    | 取消选项文本。                                 |
| confirmText  | `string`                                       | 当前语言的 picker.defaultConfirm  | N    | 确定选项文本。                                 |
| title        | `string`                                       | 当前语言的 picker.defaultTitle    | N    | 中间标题文本。                                 |
| nextText     | `string`                                       | 当前语言的 picker.defaultNext     | N    | 下一级文本。                                   |
| prevText     | `string`                                       | 当前语言的 picker.defaultPrev     | N    | 上一级文本。                                   |
| showSelected | `boolean`                                      | `false`                           | N    | 是否显示已选项。                               |
| selectedText | `string`                                       | 当前语言的 picker.defaultSelected | N    | 已选文本。                                     |
| height       | `number`                                       | `30`                              | N    | 不使用弹出层时，展示区域高度占页面百分比。     |
| popup        | [`Popup`](/components?nav=popup&tab=1)\|`null` | `{}`                              | N    | 弹出层参数，传 `null` 时不使用弹出层直接展示。 |
| loading      | [`Loading`](/components?nav=loading&tab=1)     | `{}`                              | N    | 加载数据时 Loading 参数。                      |

## AsyncPicker Events

| 名称      | 类型                                       | 参数                                                                    | 描述                                              |
| --------- | ------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------- |
| onClose   | `() => void`                               | -                                                                       | 关闭时触发。                                      |
| onclose   | `() => void`                               | -                                                                       | 关闭时触发。 兼容 STDF 的小写事件别名。           |
| onCancel  | `() => void`                               | -                                                                       | 点击左侧取消时触发。                              |
| oncancel  | `() => void`                               | -                                                                       | 点击左侧取消时触发。 兼容 STDF 的小写事件别名。   |
| onPrev    | `() => void`                               | -                                                                       | 点击左侧上一级时触发。                            |
| onprev    | `() => void`                               | -                                                                       | 点击左侧上一级时触发。 兼容 STDF 的小写事件别名。 |
| onNext    | `(index: number) => void`                  | index - 当前选定项在所在列的索引                                        | 点击右侧下一级时触发。                            |
| onnext    | `(index: number) => void`                  | index - 当前选定项在所在列的索引                                        | 点击右侧下一级时触发。 兼容 STDF 的小写事件别名。 |
| onConfirm | `(items: any[], indexs: number[]) => void` | items - 选定多列数据组成的数组<br />indexs - 选定多列数据索引组成的数组 | 点击右侧确定时触发。                              |
| onconfirm | `(items: any[], indexs: number[]) => void` | items - 选定多列数据组成的数组<br />indexs - 选定多列数据索引组成的数组 | 点击右侧确定时触发。 兼容 STDF 的小写事件别名。   |
