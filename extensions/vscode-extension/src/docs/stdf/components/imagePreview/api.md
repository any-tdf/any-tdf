## ImagePreview Props

| 名称               | 类型                                                 | 默认值     | 必传 | 说明                                         |
| ------------------ | ---------------------------------------------------- | ---------- | ---- | -------------------------------------------- |
| visible            | `boolean`                                            | `false`    | N    | 是否显示，支持双向绑定。                     |
| images             | `string[] \| ImagePreviewItemProps[]`                | `[]`       | N    | 图片列表，可传入图片地址数组或图片对象数组。 |
| current            | `number`                                             | `0`        | N    | 当前图片索引，支持双向绑定。                 |
| loop               | `boolean`                                            | `true`     | N    | 是否循环切换。                               |
| swipeDuration      | `number`                                             | `300`      | N    | 切换动画时长，单位：ms。                     |
| minScale           | `number`                                             | `0.5`      | N    | 最小缩放比例。                               |
| maxScale           | `number`                                             | `3`        | N    | 最大缩放比例。                               |
| closePosition      | `'tl'\|'tr'\|'bl'\|'br'`                             | `'tr'`     | N    | 关闭按钮位置。                               |
| showNavigation     | `boolean`                                            | `true`     | N    | 是否显示左右切换图标。                       |
| navigationPosition | `'center' \| 'bottom'`                               | `'center'` | N    | 导航图标垂直位置。                           |
| maskClosable       | `boolean`                                            | `false`    | N    | 点击蒙层是否关闭。                           |
| showIndex          | `boolean`                                            | `true`     | N    | 是否显示索引。                               |
| indicatorType      | `'dot' \| 'number' \| null`                          | `'number'` | N    | 指示器类型。                                 |
| zIndex             | `number`                                             | `1000`     | N    | z-index 层级。                               |
| duration           | `number`                                             | `300`      | N    | 进入动画时长，单位：ms。                     |
| outDuration        | `number`                                             | `200`      | N    | 退出动画时长，单位：ms。                     |
| mask               | [`Mask`](https://stdf.dev/components?nav=mask&tab=1) | `{}`       | N    | 遮罩层参数。                                 |
| icon               | [`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `{}`       | N    | 关闭图标参数。                               |

## ImagePreviewItemProps

| 名称      | 类型     | 默认值 | 必传 | 说明         |
| --------- | -------- | ------ | ---- | ------------ |
| url       | `string` | -      | Y    | 图片地址。   |
| thumbnail | `string` | -      | N    | 缩略图地址。 |
| alt       | `string` | -      | N    | 图片描述。   |

## ImagePreview Events

| 名称     | 类型                      | 参数            | 描述             |
| -------- | ------------------------- | --------------- | ---------------- |
| onchange | `(index: number) => void` | index: 当前索引 | 切换图片时触发。 |
| onclose  | `() => void`              | -               | 关闭时触发。     |
| onscale  | `(scale: number) => void` | scale: 缩放比例 | 缩放时触发。     |

## ImagePreview Snippets

| 名称         | 类型                                                                | 参数           | 说明             |
| ------------ | ------------------------------------------------------------------- | -------------- | ---------------- |
| children     | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item, index    | 自定义内容。     |
| loadingChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -              | 自定义加载中。   |
| errorChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -              | 自定义加载失败。 |
| indexChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | current, total | 自定义索引显示。 |
