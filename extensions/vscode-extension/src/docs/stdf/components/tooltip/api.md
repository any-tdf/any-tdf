## Tooltip Props

| 名称         | 类型                                                      | 默认值    | 必传 | 说明                         |
| ------------ | --------------------------------------------------------- | --------- | ---- | ---------------------------- |
| content      | `string`                                                  | `''`      | N    | 提示内容文本。               |
| position     | `'top'\|'bottom'\|'left'\|'right'`                        | `'top'`   | N    | 显示位置。                   |
| visible      | `boolean`                                                 | `false`   | N    | 是否显示，支持 `$bindable`。 |
| delay        | `number`                                                  | `0`       | N    | 显示延迟，单位毫秒。         |
| hideDelay    | `number`                                                  | `0`       | N    | 隐藏延迟，单位毫秒。         |
| arrow        | `boolean`                                                 | `true`    | N    | 是否显示箭头。               |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N    | 圆角风格。                   |
| state        | `'theme'\|'success'\|'warning'\|'error'\|'info'\|'black'` | `'black'` | N    | 配色方案。                   |
| maxWidth     | `number`                                                  | `200`     | N    | 最大宽度，单位像素。         |
| zIndex       | `number`                                                  | `800`     | N    | z-index 层级。               |
| disabled     | `boolean`                                                 | `false`   | N    | 是否禁用。                   |
| injClass     | `string`                                                  | `''`      | N    | 注入 CSS 名称。              |
| contentClass | `string`                                                  | `''`      | N    | 内容区域 CSS 名称。          |

## Tooltip Snippets

| 名称           | 类型                                                                | 参数 | 说明                           |
| -------------- | ------------------------------------------------------------------- | ---- | ------------------------------ |
| children       | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 触发元素。                     |
| contentSnippet | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 自定义内容（优先于 content）。 |

## Tooltip Events

| 名称   | 类型         | 参数 | 说明               |
| ------ | ------------ | ---- | ------------------ |
| onshow | `() => void` | -    | 显示时触发的回调。 |
| onhide | `() => void` | -    | 隐藏时触发的回调。 |
