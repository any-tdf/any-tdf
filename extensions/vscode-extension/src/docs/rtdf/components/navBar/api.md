## NavBar Props

| 名称       | 类型                                                 | 默认值                  | 必传 | 说明                                                       |
| ---------- | ---------------------------------------------------- | ----------------------- | ---- | ---------------------------------------------------------- |
| title      | `string`                                             | 当前语言的 navBar.title | N    | 标题。                                                     |
| titleAlign | `'left'\|'center'\|'right'`                          | `'left'`                | N    | 标题对齐方式。                                             |
| left       | `'back'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'back'`                | N    | 左侧内容，`'back'` 返回图标，`null` 无内容，否则渲染图标。 |
| rights     | [`Icon[]`](/components?nav=icon&tab=1)               | `[]`                    | N    | 右侧内容，Icon Props 组成的数组，建议不超过三个。          |
| line       | `boolean`                                            | `true`                  | N    | 是否显示底部分割线。                                       |
| injClass   | `string`                                             | `''`                    | N    | 注入 CSS 名称。                                            |
| love       | `boolean`                                            | `false`                 | N    | 是否开启关爱版。                                           |

## NavBar Events

| 名称         | 类型                      | 参数                   | 说明                                          |
| ------------ | ------------------------- | ---------------------- | --------------------------------------------- |
| onClickLeft  | `() => void`              | -                      | 点击左侧图标触发。                            |
| onclickLeft  | `() => void`              | -                      | 点击左侧图标触发。 兼容 STDF 的小写事件别名。 |
| onClickRight | `(index: number) => void` | index - 点击图标索引值 | 点击右侧图标触发。                            |
| onclickRight | `(index: number) => void` | index - 点击图标索引值 | 点击右侧图标触发。 兼容 STDF 的小写事件别名。 |

## NavBar Children

| 名称       | 类型      | 参数 | 说明                 |
| ---------- | --------- | ---- | -------------------- |
| titleChild | ReactNode | -    | 传入时渲染标题区域。 |
| leftChild  | ReactNode | -    | 传入时渲染左侧区域。 |
| rightChild | ReactNode | -    | 传入时渲染右侧区域。 |
