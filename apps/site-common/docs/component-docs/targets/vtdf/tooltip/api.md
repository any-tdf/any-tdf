## Tooltip Props

| 名称         | 类型                                                      | 默认值    | 必传 | 说明                     |
| ------------ | --------------------------------------------------------- | --------- | ---- | ------------------------ |
| content      | `string`                                                  | `''`      | N    | 提示内容文本。           |
| position     | `'top'\|'bottom'\|'left'\|'right'`                        | `'top'`   | N    | 显示位置。               |
| visible      | `boolean`                                                 | `false`   | N    | 是否显示，支持受控状态。 |
| delay        | `number`                                                  | `0`       | N    | 显示延迟，单位毫秒。     |
| hideDelay    | `number`                                                  | `0`       | N    | 隐藏延迟，单位毫秒。     |
| arrow        | `boolean`                                                 | `true`    | N    | 是否显示箭头。           |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N    | 圆角风格。               |
| state        | `'theme'\|'success'\|'warning'\|'error'\|'info'\|'black'` | `'black'` | N    | 配色方案。               |
| maxWidth     | `number`                                                  | `200`     | N    | 最大宽度，单位像素。     |
| zIndex       | `number`                                                  | `800`     | N    | z-index 层级。           |
| disabled     | `boolean`                                                 | `false`   | N    | 是否禁用。               |
| injClass     | `string`                                                  | `''`      | N    | 注入 CSS 名称。          |
| contentClass | `string`                                                  | `''`      | N    | 内容区域 CSS 名称。      |

## Tooltip Children

| 名称           | 类型             | 参数 | 说明                                |
| -------------- | ---------------- | ---- | ----------------------------------- |
| default        | `Vue Slot`       | -    | 触发元素。                          |
| content        | `Vue Slot`       | -    | 自定义内容（优先于 content 属性）。 |
| contentRender  | `() => Vue Slot` | -    | 自定义内容渲染函数，兼容别名。      |
| contentSnippet | `() => Vue Slot` | -    | 兼容旧命名的自定义内容渲染函数。    |

## Tooltip Events

| 名称 | 类型         | 参数 | 说明               |
| ---- | ------------ | ---- | ------------------ |
| show | `() => void` | -    | 显示时触发的回调。 |
| hide | `() => void` | -    | 隐藏时触发的回调。 |
