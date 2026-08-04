## Button Props

| 名称            | 类型                                                                          | 默认值    | 必传 | 说明                                                                                   |
| --------------- | ----------------------------------------------------------------------------- | --------- | ---- | -------------------------------------------------------------------------------------- |
| fill            | `'base'\|'line'\|'lineLight'\|'lineState'\|'text'\|'textState'\|'colorLight'` | `'base'`  | N    | 填充模式。base/lineState/textState/colorLight 跟随 state，line/lineLight/text 为无色。 |
| state           | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N    | 状态色，theme 表示跟随主题色。                                                         |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                     | `'sm'`    | N    | 圆角风格。                                                                             |
| size            | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N    | 尺寸。                                                                                 |
| border          | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N    | 边框风格。                                                                             |
| line            | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N    | 边框风格别名。                                                                         |
| heightOut       | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N    | 按钮外部高度。                                                                         |
| heightIn        | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N    | 按钮高度。                                                                             |
| injClass        | `string`                                                                      | `''`      | N    | 注入 CSS 名称。                                                                        |
| love            | `boolean`                                                                     | `false`   | N    | 是否开启关爱版。                                                                       |
| group           | `boolean`                                                                     | `false`   | N    | 是否作为按钮组内部按钮使用，开启后禁用默认点击透明度反馈。                             |
| disabled        | `boolean`                                                                     | `false`   | N    | 是否禁用。                                                                             |
| customSize      | `boolean`                                                                     | `false`   | N    | 是否自定义大小。                                                                       |
| customWidth     | `number`                                                                      | `0`       | N    | 自定义宽度。                                                                           |
| customHeight    | `number`                                                                      | `0`       | N    | 自定义高度。                                                                           |
| icon            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                  | `null`    | N    | 图标参数。                                                                             |
| iconPosition    | `'left'\|'right'`                                                             | `'left'`  | N    | 图标位置。                                                                             |
| loading         | [`Loading`](/components?nav=loading&tab=1)\|`null`                            | `null`    | N    | 加载参数。                                                                             |
| disabledLoading | `boolean`                                                                     | `false`   | N    | 加载时是否禁用。                                                                       |
| type            | `'button'\|'reset'\|'submit'`                                                 | `button`  | N    | button 的类型。                                                                        |

## Button Events

| 名称  | 类型         | 参数 | 描述       |
| ----- | ------------ | ---- | ---------- |
| click | `() => void` | -    | 点击触发。 |

## Button Children

| 名称     | 类型     | 参数 | 说明       |
| -------- | -------- | ---- | ---------- |
| children | Vue Slot | -    | 按钮内容。 |
