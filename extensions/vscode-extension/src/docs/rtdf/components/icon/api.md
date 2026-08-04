## Icon Props

| 名称      | 类型                                             | 默认值               | 必传 | 说明                                                  |
| --------- | ------------------------------------------------ | -------------------- | ---- | ----------------------------------------------------- |
| type      | `'iconify'\|'iconify-color'\|'symbol'`           | `'symbol'`           | N    | 图标类型。                                            |
| name      | `string`                                         | `''`                 | N    | 图标名称。                                            |
| size      | `number`                                         | `24`                 | N    | 图标大小。                                            |
| width     | `number`                                         | `0`                  | N    | 图标宽度。                                            |
| height    | `number`                                         | `0`                  | N    | 图标高度。                                            |
| state     | `'theme'\|'success'\|'warning'\|'error'\|'info'` | -                    | N    | 图标状态颜色，type 为 `iconify-color` 时无效。        |
| theme     | `boolean`                                        | `false`              | N    | 是否使用主题色，state 为空时有效。                    |
| opacity   | `number`                                         | `1`                  | N    | 图标透明度。                                          |
| alpha     | `number`                                         | -                    | N    | 图标透明度别名。                                      |
| y         | `number`                                         | `0`                  | N    | 上下偏移量。                                          |
| top       | `number`                                         | -                    | N    | 上下偏移量别名。                                      |
| injClass  | `string`                                         | `''`                 | N    | 注入 CSS 名称。                                       |
| className | `string`                                         | `''`                 | N    | React 常规 CSS 类名，会与 injClass 合并。             |
| path      | `string`                                         | `'fonts/symbol.svg'` | N    | 项目存放 symbol.svg 的路径，type 为 `symbol` 时有效。 |
| ariaLabel | `string`                                         | -                    | N    | 图标的无障碍标签。                                    |

## Icon Children

| 名称     | 类型      | 参数 | 说明                                      |
| -------- | --------- | ---- | ----------------------------------------- |
| children | ReactNode | -    | 自定义内容，一般是 Icon 组件或 SVG 元素。 |

## Icon Events

| 名称    | 类型         | 参数 | 说明                                    |
| ------- | ------------ | ---- | --------------------------------------- |
| onClick | `() => void` | -    | 点击时触发。                            |
| onclick | `() => void` | -    | 点击时触发。 兼容 STDF 的小写事件别名。 |
