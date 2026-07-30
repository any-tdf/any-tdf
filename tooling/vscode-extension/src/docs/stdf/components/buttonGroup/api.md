## ButtonGroup Props

| 名称          | 类型                                                                          | 默认值    | 必传 | 说明                                         |
| ------------- | ----------------------------------------------------------------------------- | --------- | ---- | -------------------------------------------- |
| items         | `ButtonGroupItemProps[]`                                                      | `[]`      | N    | 按钮项数组。                                 |
| fill          | `'base'\|'line'\|'lineLight'\|'lineState'\|'text'\|'textState'\|'colorLight'` | `'base'`  | N    | 填充模式。                                   |
| state         | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N    | 状态色。                                     |
| radius        | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                     | `'sm'`    | N    | 圆角风格。                                   |
| size          | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N    | 尺寸。                                       |
| border        | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N    | 边框风格。                                   |
| dividerHeight | `'full'\|'mid'\|'short'`                                                      | `'mid'`   | N    | 分割线高度。full(100%)/mid(60%)/short(30%)。 |
| heightOut     | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N    | 按钮外部高度。                               |
| heightIn      | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N    | 按钮高度。                                   |
| injClass      | `string`                                                                      | `''`      | N    | 注入 CSS 名称。                              |

## ButtonGroupItemProps

| 名称         | 类型                                                 | 默认值   | 必传 | 说明           |
| ------------ | ---------------------------------------------------- | -------- | ---- | -------------- |
| text         | `string`                                             | -        | N    | 按钮文本。     |
| icon         | [`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `null`   | N    | 图标参数。     |
| iconPosition | `'left'\|'right'`                                    | `'left'` | N    | 图标位置。     |
| disabled     | `boolean`                                            | `false`  | N    | 是否禁用。     |
| onclick      | `() => void`                                         | -        | N    | 点击回调函数。 |

## ButtonGroup Snippets

| 名称     | 类型                                                                | 参数 | 说明                                |
| -------- | ------------------------------------------------------------------- | ---- | ----------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 自定义内容（替代 items 数组模式）。 |
