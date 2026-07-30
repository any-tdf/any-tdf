## ActionPopover Props

| 名称            | 类型                                               | 默认值                            | 必传 | 说明                                                               |
| --------------- | -------------------------------------------------- | --------------------------------- | ---- | ------------------------------------------------------------------ |
| visible         | `boolean`                                          | `false`                           | N    | 是否显示。                                                         |
| title           | `string`                                           | `''`                              | N    | 标题。                                                             |
| titleAlign      | `'left'\|'center'\|'right'`                        | `'center'`                        | N    | 标题对齐方式。                                                     |
| actions         | `Action[]`                                         | `[]`                              | Y    | 菜单选项， Action Props 组成的数组。                               |
| showCancel      | `boolean`                                          | `false`                           | N    | 是否显示取消选项。                                                 |
| cancelText      | `string`                                           | 当前语言的 actionSheet.cancelText | N    | 取消选项文本。                                                     |
| actionClosable  | `boolean`                                          | `true`                            | N    | 点击选项是否关闭。                                                 |
| align           | `'left'\|'center'\|'right'`                        | `'center'`                        | N    | 对齐方式。                                                         |
| inverse         | `boolean`                                          | `false`                           | N    | 是否启用反转色，亮暗模式对调。                                     |
| layout          | `'v'\|'h'\|'grid'\|'ring'`                         | `'v'`                             | N    | 操作项布局方式， v 为纵向， h 为横向， grid 为宫格， ring 为环形。 |
| gridColumns     | `2\|3\|4`                                          | `3`                               | N    | 宫格列数，支持 2、3、4，仅在 layout 为 grid 时生效。               |
| triggerRef      | `HTMLElement\|null`                                | `null`                            | N    | 触发元素引用。                                                     |
| inlineAlign     | `'left'\|'center'\|'right'`                        | `'center'`                        | N    | 水平对齐方式。                                                     |
| inlineDirection | `'auto'\|'up'\|'down'`                             | `'auto'`                          | N    | 弹出方向， auto 会根据触发元素在视口中的位置自动判断。             |
| inlineOffset    | `number`                                           | `8`                               | N    | 弹出面板与触发元素的间距。                                         |
| inlineShadow    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`      | `'md'`                            | N    | 弹出面板的阴影大小。                                               |
| inlineRadius    | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|''` | `''`                              | N    | 弹出面板的圆角大小，空字符串表示使用默认圆角。                     |
| ringActions     | `RingAction[]`                                     | `[]`                              | N    | 环形布局操作项，仅在 layout 为 ring 时生效。                       |
| ringRadius      | `number`                                           | `0`                               | N    | 环形半径，0 表示自动计算。                                         |
| ringItemSize    | `number`                                           | `44`                              | N    | 环形操作项尺寸（宽高）。                                           |
| ringShape       | `'auto'\|'full'\|'half'\|'quarter'`                | `'auto'`                          | N    | 环形形状， auto 根据操作项数量自动判断。                           |

## ActionPopover Events

| 名称          | 类型                                      | 参数                                          | 描述                                         |
| ------------- | ----------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| onclose       | `() => void`                              | -                                             | 关闭时触发。                                 |
| oncancel      | `() => void`                              | -                                             | 点击取消时触发。                             |
| onclickAction | `(index: number, action: Action) => void` | index - 点击索引值<br />action - 点击选项数据 | 点击选项时触发，即使点击选项不关闭也会触发。 |

## Action Props

| 名称      | 类型                                                       | 默认值     | 必传 | 说明                                                                             |
| --------- | ---------------------------------------------------------- | ---------- | ---- | -------------------------------------------------------------------------------- |
| content   | `string`                                                   | `''`       | Y    | 选项内容。                                                                       |
| style     | `'normal'\|'theme'\|'success'\|'warning'\|'error'\|'info'` | `'normal'` | N    | 选项样式，支持 normal、theme、success、warning、error、info， theme 适配亮暗色。 |
| disabled  | `boolean`                                                  | `false`    | N    | 是否禁用，可与 style 组合。                                                      |
| desc      | `string`                                                   | `''`       | N    | 选项描述。                                                                       |
| icon      | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `null`     | N    | 选项图标，优先级高于图片。                                                       |
| showImg   | `boolean`                                                  | `false`    | N    | 是否显示图片。                                                                   |
| imgRadius | `'none'\|'sm'\|'full'\|'lg'`                               | `'full'`   | N    | 图片圆角。                                                                       |
| imgSrc    | `string`                                                   | `''`       | N    | 图片地址。                                                                       |

## RingAction Props

| 名称     | 类型                                                       | 默认值     | 必传 | 说明         |
| -------- | ---------------------------------------------------------- | ---------- | ---- | ------------ |
| icon     | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | -          | Y    | 操作项图标。 |
| style    | `'normal'\|'theme'\|'success'\|'warning'\|'error'\|'info'` | `'normal'` | N    | 操作项样式。 |
| disabled | `boolean`                                                  | `false`    | N    | 是否禁用。   |
