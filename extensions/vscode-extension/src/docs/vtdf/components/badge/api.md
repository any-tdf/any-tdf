## Badge Props

| 名称     | 类型                                                              | 默认值  | 必传 | 说明                                         |
| -------- | ----------------------------------------------------------------- | ------- | ---- | -------------------------------------------- |
| text     | `string`                                                          | `''`    | N    | 徽标文案。                                   |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''\|'leaf'` | `'sm'`  | N    | 圆角风格。                                   |
| isLeft   | `boolean`                                                         | `false` | N    | 是否位于左侧（仅 isInner 为 false 时生效）。 |
| isShow   | `boolean`                                                         | `true`  | N    | 是否显示。                                   |
| offsetY  | `number`                                                          | `0`     | N    | 上下偏移量（仅 isInner 为 false 时生效）。   |
| offsetX  | `number`                                                          | `0`     | N    | 左右偏移量（仅 isInner 为 false 时生效）。   |
| isInner  | `boolean`                                                         | `false` | N    | 是否位于内部。                               |
| injClass | `string`                                                          | `''`    | N    | 注入 CSS 名称。                              |

## Badge Children

| 名称     | 类型     | 参数 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| children | Vue Slot | -    | `isInner` 为 false 时作为 Badge 相对位置的内容。 |
