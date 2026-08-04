## AvatarGroup Props

| 名称      | 类型                                                      | 默认值    | 必传 | 说明                             |
| --------- | --------------------------------------------------------- | --------- | ---- | -------------------------------- |
| data      | `Avatar[]`                                                | `[]`      | N    | 由 Avatar Props 组成的头像数据。 |
| radius    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N    | 圆角风格。                       |
| size      | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`    | N    | 头像框大小。                     |
| compact   | `number`                                                  | `5`       | N    | 紧凑程度，越大越紧凑。           |
| lineWidth | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                            | `'3'`     | N    | 边框粗细。                       |
| reverse   | `boolean`                                                 | `false`   | N    | 是否反向。                       |
| max       | `number`                                                  | `10`      | N    | 最大显示数量。                   |
| top       | `'totle'\|'add'\|null`\|Vue Slot                          | `'totle'` | N    | 顶层内容。                       |
| injClass  | `string`                                                  | `''`      | N    | 注入 CSS 名称。                  |

## AvatarGroup Events

| 名称  | 类型         | 参数 | 描述             |
| ----- | ------------ | ---- | ---------------- |
| click | `() => void` | -    | 点击头像组触发。 |
