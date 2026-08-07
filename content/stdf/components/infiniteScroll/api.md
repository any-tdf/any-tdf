## InfiniteScroll Props

| 名称           | 类型                                                                 | 默认值                                                  | 必传 | 说明                                              |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | ---- | ------------------------------------------------- |
| loading        | `boolean`                                                            | `false`                                                 | N    | 是否正在加载，支持受控绑定。                      |
| finished       | `boolean`                                                            | `false`                                                 | N    | 是否没有更多数据。                                |
| error          | `boolean`                                                            | `false`                                                 | N    | 是否加载失败。                                    |
| disabled       | `boolean`                                                            | `false`                                                 | N    | 是否禁用滚动加载。                                |
| offset         | `number`                                                             | `300`                                                   | N    | 触发加载的边界距离，单位为像素。                  |
| direction      | `'up' \| 'down'`                                                     | `'down'`                                                | N    | 检测顶部或底部。                                  |
| immediateCheck | `boolean`                                                            | `true`                                                  | N    | 挂载后是否立即检测。                              |
| loadingText    | `string`                                                             | `'加载中...'`                                           | N    | 加载中默认文案。                                  |
| finishedText   | `string`                                                             | `'没有更多了'`                                          | N    | 加载完成默认文案。                                |
| errorText      | `string`                                                             | `'加载失败，点击重试'`                                  | N    | 加载失败默认文案。                                |
| loadingIcon    | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) \| `null` | `{ type: '1_0', width: '4', height: '4', theme: true }` | N    | 加载中 Loading 图标配置，传 `null` 时不展示图标。 |
| scrollTarget   | `HTMLElement \| Window \| string \| null`                            | `null`                                                  | N    | 指定滚动容器。                                    |
| injClass       | `string`                                                             | `''`                                                    | N    | 注入根节点的 CSS 类名。                           |
| textClass      | `string`                                                             | `''`                                                    | N    | 注入状态文本的 CSS 类名。                         |

## InfiniteScroll Events

| 名称   | 类型                         | 参数                       | 描述                 |
| ------ | ---------------------------- | -------------------------- | -------------------- |
| onload | `(isRetry: boolean) => void` | `isRetry` - 是否为失败重试 | 达到触发距离时调用。 |

## InfiniteScroll Snippets

| 名称          | 类型                | 参数     | 说明                 |
| ------------- | ------------------- | -------- | -------------------- |
| children      | `Snippet<[detail]>` | `detail` | 完全自定义状态内容。 |
| loadingChild  | `Snippet<[detail]>` | `detail` | 加载中内容。         |
| finishedChild | `Snippet<[detail]>` | `detail` | 加载完成内容。       |
| errorChild    | `Snippet<[detail]>` | `detail` | 加载失败内容。       |

## InfiniteScrollSlotDetail

| 名称   | 类型                                           | 说明                                    |
| ------ | ---------------------------------------------- | --------------------------------------- |
| status | `'idle' \| 'loading' \| 'finished' \| 'error'` | 当前状态。                              |
| retry  | `() => void`                                   | 以 `isRetry = true` 重新触发 `onload`。 |

## 方法

| 名称  | 类型         | 说明                           |
| ----- | ------------ | ------------------------------ |
| check | `() => void` | 主动检测当前位置是否需要加载。 |
