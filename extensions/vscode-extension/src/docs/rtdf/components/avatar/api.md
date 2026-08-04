## Avatar Props

| 名称     | 类型                                                      | 默认值   | 必传 | 说明                 |
| -------- | --------------------------------------------------------- | -------- | ---- | -------------------- |
| image    | `string`                                                  | `''`     | N    | 图片路径。           |
| alt      | `string`                                                  | `''`     | N    | 替换文本，建议单字。 |
| icon     | [`Icon`](/components?nav=icon&tab=1)                      | `{}`     | N    | 替换图标。           |
| altSize  | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                            | `'md'`   | N    | 替换文本大小。       |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`   | N    | 圆角风格。           |
| size     | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`   | N    | 头像框大小。         |
| imgSize  | `'s'\|'m'\|'l'`                                           | `'l'`    | N    | 头像图片大小。       |
| line     | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'none'` | N    | 边框风格。           |
| injClass | `string`                                                  | `''`     | N    | 注入 CSS 名称。      |

## Avatar Events

| 名称    | 类型         | 参数 | 描述                                  |
| ------- | ------------ | ---- | ------------------------------------- |
| onClick | `() => void` | -    | 点击触发。                            |
| onclick | `() => void` | -    | 点击触发。 兼容 STDF 的小写事件别名。 |
