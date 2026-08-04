## Progress Props

| 名称            | 类型                                                  | 默认值    | 必传 | 说明                                              |
| --------------- | ----------------------------------------------------- | --------- | ---- | ------------------------------------------------- |
| percent         | `number`                                              | `66`      | N    | 百分比。                                          |
| percentPosition | `'inner'\|'right'\|'block'\|null`                     | `'right'` | N    | 百分比位置。                                      |
| height          | `'1'\|'2'\|'3'\|'4'`                                  | `'2'`     | N    | 高度。                                            |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`    | N    | 圆角风格。                                        |
| inactive        | `boolean`                                             | `false`   | N    | 是否置灰。                                        |
| overflowPercent | `number`                                              | `10`      | N    | percentPosition 为 `'inner'` 时，文字溢出的阀值。 |
| duration        | `'150'\|'300'\|'500'\|'700'\|'1000'`                  | `'300'`   | N    | 动画过度时间（ms）。                              |
| injClass        | `string`                                              | `''`      | N    | 激活进度条注入 Class 名称。                       |
| trackInjClass   | `string`                                              | `''`      | N    | 轨道条注入 Class 名称。                           |

## Progress Children

| 名称     | 类型     | 参数 | 说明                 |
| -------- | -------- | ---- | -------------------- |
| children | Vue Slot | -    | 传入时渲染文字内容。 |
