## Modal Props

| 名称       | 类型                                                     | 默认值                   | 必传 | 说明           |
| ---------- | -------------------------------------------------------- | ------------------------ | ---- | -------------- |
| visible    | `boolean`                                                | `false`                  | N    | 是否显示。     |
| title      | `string`                                                 | 当前语言的 modal.title   | N    | 标题。         |
| titleAlign | `'left'\|'center'\|'right'`                              | `'center'`               | N    | 标题对齐方式。 |
| content    | `string`                                                 | 当前语言的 modal.content | N    | 内容。         |
| showIcon   | `boolean`                                                | `false`                  | N    | 是否显示图标。 |
| icon       | [`Icon`](https://stdf.dev/components?nav=dialog&tab=1)   | `{}`                     | N    | 图标参数。     |
| showBtn    | `boolean`                                                | `true`                   | N    | 是否显示按钮。 |
| btnText    | `string`                                                 | 当前语言的 modal.btnText | N    | 按钮文字。     |
| button     | [`Button`](https://stdf.dev/components?nav=dialog&tab=1) | `{}`                     | N    | 按钮参数。     |
| popup      | [`Popup`](https://stdf.dev/components?nav=dialog&tab=1)  | `{}`                     | N    | 弹出层参数。   |

## Modal Events

| 名称    | 类型         | 参数 | 描述             |
| ------- | ------------ | ---- | ---------------- |
| onclose | `() => void` | -    | 弹框关闭时触发。 |

## Modal Snippets

| 名称         | 类型                                                                | 参数 | 描述                      |
| ------------ | ------------------------------------------------------------------- | ---- | ------------------------- |
| contentChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入时渲染 content 内容。 |
