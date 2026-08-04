## Tag Props

| 名称     | 类型                                                        | 默认值    | 必传 | 说明                                        |
| -------- | ----------------------------------------------------------- | --------- | ---- | ------------------------------------------- |
| text     | `string`                                                    | `''`      | N    | 标签文本。                                  |
| state    | `'theme'\|'success'\|'warning'\|'error'\|'info'\|'neutral'` | `'theme'` | N    | 状态类型， neutral 为黑白透明，透明度更弱。 |
| fill     | `'base'\|'line'\|'light'`                                   | `'base'`  | N    | 填充样式。                                  |
| size     | `'xs'\|'sm'\|'md'\|'lg'`                                    | `'md'`    | N    | 尺寸。                                      |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`   | `'sm'`    | N    | 圆角风格。                                  |
| mark     | `boolean`                                                   | `false`   | N    | 是否为标记样式。                            |
| closable | `boolean`                                                   | `false`   | N    | 是否可关闭。                                |
| disabled | `boolean`                                                   | `false`   | N    | 是否禁用。                                  |
| injClass | `string`                                                    | `''`      | N    | 注入 CSS 名称。                             |

## Tag Events

| 名称  | 类型         | 参数 | 说明               |
| ----- | ------------ | ---- | ------------------ |
| click | `() => void` | -    | 点击标签时触发。   |
| close | `() => void` | -    | 点击关闭按钮触发。 |

## Tag Children

| 名称     | 类型     | 参数 | 说明             |
| -------- | -------- | ---- | ---------------- |
| children | Vue Slot | -    | 自定义标签内容。 |
