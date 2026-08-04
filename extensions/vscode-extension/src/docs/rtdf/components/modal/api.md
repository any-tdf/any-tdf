## Modal Props

| 名称       | 类型                                     | 默认值                   | 必传 | 说明            |
| ---------- | ---------------------------------------- | ------------------------ | ---- | --------------- |
| visible    | `boolean`                                | `false`                  | N    | 是否显示。      |
| title      | `string`                                 | 当前语言的 modal.title   | N    | 标题。          |
| titleAlign | `'left'\|'center'\|'right'`              | `'center'`               | N    | 标题对齐方式。  |
| content    | `string`                                 | 当前语言的 modal.content | N    | 内容。          |
| showIcon   | `boolean`                                | `false`                  | N    | 是否显示图标。  |
| icon       | [`Icon`](/components?nav=dialog&tab=1)   | `{}`                     | N    | 图标参数。      |
| showBtn    | `boolean`                                | `true`                   | N    | 是否显示按钮。  |
| btnText    | `string`                                 | 当前语言的 modal.btnText | N    | 按钮文字。      |
| button     | [`Button`](/components?nav=dialog&tab=1) | `{}`                     | N    | 按钮参数。      |
| popup      | [`Popup`](/components?nav=dialog&tab=1)  | `{}`                     | N    | 弹出层参数。    |
| injClass   | `string`                                 | `''`                     | N    | 注入 CSS 名称。 |

## Modal Events

| 名称    | 类型         | 参数 | 描述                                        |
| ------- | ------------ | ---- | ------------------------------------------- |
| onClose | `() => void` | -    | 弹框关闭时触发。                            |
| onclose | `() => void` | -    | 弹框关闭时触发。 兼容 STDF 的小写事件别名。 |

## Modal Children

| 名称         | 类型      | 参数 | 描述                      |
| ------------ | --------- | ---- | ------------------------- |
| contentChild | ReactNode | -    | 传入时渲染 content 内容。 |
