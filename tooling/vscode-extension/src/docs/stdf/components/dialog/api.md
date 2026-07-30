## Dialog Props

| 名称            | 类型                                                     | 默认值                          | 必传 | 说明                   |
| --------------- | -------------------------------------------------------- | ------------------------------- | ---- | ---------------------- |
| visible         | `boolean`                                                | `false`                         | N    | 是否显示。             |
| title           | `string`                                                 | 当前语言的 dialog.title         | N    | 标题。                 |
| titleAlign      | `'left'\|'center'\|'right'`                              | `'center'`                      | N    | 标题对齐方式。         |
| content         | `string`                                                 | 当前语言的 dialog.content       | N    | 内容。                 |
| popup           | [`Popup`](https://stdf.dev/components?nav=popup&tab=1)   | `{}`                            | N    | 弹出层参数。           |
| showIcon        | `boolean`                                                | `false`                         | N    | 是否显示图标。         |
| icon            | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)     | `{}`                            | N    | 图标参数。             |
| btnStyle        | `'button'\|'text'\|'textLine'`                           | `'button'`                      | N    | 按钮样式。             |
| primaryText     | `string`                                                 | 当前语言的 dialog.primaryText   | N    | 主按钮文字。           |
| primaryButton   | [`Button`](https://stdf.dev/components?nav=button&tab=1) | `{}`                            | N    | 主按钮参数。           |
| secondaryText   | `string`                                                 | 当前语言的 dialog.secondaryText | N    | 次按钮文字。           |
| secondaryButton | [`Button`](https://stdf.dev/components?nav=button&tab=1) | `{}`                            | N    | 次按钮参数。           |
| btnRatio        | `[number,number]`                                        | `[1, 1]`                        | N    | 主次按钮大小比例。     |
| btnReverse      | `boolean`                                                | `false`                         | N    | 主次按钮位置是否反转。 |
| secondaryClose  | `boolean`                                                | `true`                          | N    | 次按钮是否关闭弹窗。   |
| btnGap          | `'0'\|'1'\|'2'\|'4'\|'8'\|'12'\|'16'`                    | `'2'`                           | N    | 按钮间距。             |

## Dialog Events

| 名称        | 类型         | 参数 | 描述               |
| ----------- | ------------ | ---- | ------------------ |
| onclose     | `() => void` | -    | 对话框关闭时触发。 |
| onprimary   | `() => void` | -    | 点击主按钮时触发。 |
| onsecondary | `() => void` | -    | 点击次按钮时触发。 |

## Dialog Snippets

| 名称         | 类型                                                                | 参数 | 描述                          |
| ------------ | ------------------------------------------------------------------- | ---- | ----------------------------- |
| contentChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入时渲染 content 内容。     |
| primaryChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入时渲染 primaryText 内容。 |
