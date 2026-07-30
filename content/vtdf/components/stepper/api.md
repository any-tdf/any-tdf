## Stepper Props

| 名称            | 类型                                                  | 默认值  | 必传 | 说明                               |
| --------------- | ----------------------------------------------------- | ------- | ---- | ---------------------------------- |
| value           | `number`                                              | `10`    | N    | 当前值。                           |
| min             | `number`                                              | `0`     | N    | 最小值。                           |
| max             | `number`                                              | `100`   | N    | 最大值。                           |
| step            | `number`                                              | `1`     | N    | 步长。                             |
| vertical        | `boolean`                                             | `false` | N    | 是否纵向。                         |
| numberHighlight | `boolean`                                             | `false` | N    | 是否强调数字区域。                 |
| theme           | `boolean`                                             | `true`  | N    | 强调区域是否是主题色。             |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`  | N    | 圆角风格。                         |
| decimal         | `number`                                              | `0`     | N    | 对内部显示数字保留小数位数。       |
| async           | `boolean`                                             | `false` | N    | 是否异步状态。                     |
| asyncLoading    | `boolean`                                             | `false` | N    | 异步状态时，是否显示内部 Loading。 |
| loading         | [`Loading`](/components?nav=loading&tab=1)            | `{}`    | N    | 异步状态时，Loading 参数。         |
| padding         | `boolean`                                             | `true`  | N    | 外部有无 padding。                 |
| width           | `number`                                              | `0`     | N    | 数字区域固定宽度。                 |
| injClassOut     | `string`                                              | `''`    | N    | 外部注入的类。                     |
| injClassBtn     | `string`                                              | `''`    | N    | 按钮区域注入的类。                 |
| injClassNum     | `string`                                              | `''`    | N    | 数字区域注入的类。                 |

## Stepper Events

| 名称     | 类型                | 参数           | 描述             |
| -------- | ------------------- | -------------- | ---------------- |
| change   | `{ value: number }` | value - 当前值 | 当前值。         |
| decrease | `() => void`        | -              | 点击减少时触发。 |
| increase | `() => void`        | -              | 点击增加时触发。 |
