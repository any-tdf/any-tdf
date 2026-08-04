## PullRefresh Props

| 名称              | 类型                                                 | 默认值                                                  | 必传 | 说明                                              |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------- | ---- | ------------------------------------------------- |
| refreshing        | `boolean`                                            | `false`                                                 | N    | 是否正在刷新，受控状态。                          |
| disabled          | `boolean`                                            | `false`                                                 | N    | 是否禁用下拉刷新。                                |
| headHeight        | `number`                                             | `50`                                                    | N    | 头部区域高度，单位为像素。                        |
| threshold         | `number`                                             | `60`                                                    | N    | 释放触发刷新需要达到的距离，单位为像素。          |
| pullFactor        | `number`                                             | `1`                                                     | N    | 手势距离到下拉距离的换算系数。                    |
| successDuration   | `number`                                             | `500`                                                   | N    | 成功状态展示时长，单位为毫秒。                    |
| animationDuration | `number`                                             | `300`                                                   | N    | 回弹和状态切换动画时长，单位为毫秒。              |
| pullingText       | `string`                                             | `'下拉刷新'`                                            | N    | 下拉中默认文案。                                  |
| canReleaseText    | `string`                                             | `'释放立即刷新'`                                        | N    | 可释放默认文案。                                  |
| refreshingText    | `string`                                             | `'刷新中...'`                                           | N    | 刷新中默认文案。                                  |
| successText       | `string`                                             | `'刷新成功'`                                            | N    | 刷新完成默认文案。                                |
| loadingIcon       | [`Loading`](/components?nav=loading&tab=1) \| `null` | `{ type: '1_0', width: '4', height: '4', theme: true }` | N    | 刷新中 Loading 图标配置，传 `null` 时不展示图标。 |
| scrollTarget      | `HTMLElement \| Window \| string \| null`            | `null`                                                  | N    | 指定滚动容器。                                    |
| injClass          | `string`                                             | `''`                                                    | N    | 注入根节点的 CSS 类名。                           |
| headClass         | `string`                                             | `''`                                                    | N    | 注入头部区域的 CSS 类名。                         |
| contentClass      | `string`                                             | `''`                                                    | N    | 注入内容容器的 CSS 类名。                         |

## PullRefresh Events

| 名称    | 类型                                        | 参数                    | 描述                         |
| ------- | ------------------------------------------- | ----------------------- | ---------------------------- |
| refresh | `() => void`                                | -                       | 释放并达到阈值时触发。       |
| change  | `(detail: PullRefreshChangeDetail) => void` | `detail` - 当前状态信息 | 状态、距离或进度变化时触发。 |

## PullRefresh Slots

| 名称            | 参数     | 说明             |
| --------------- | -------- | ---------------- |
| default         | -        | 默认内容。       |
| normalChild     | `detail` | 初始状态内容。   |
| pullingChild    | `detail` | 下拉中状态内容。 |
| canReleaseChild | `detail` | 可释放状态内容。 |
| refreshingChild | `detail` | 刷新中状态内容。 |
| successChild    | `detail` | 成功状态内容。   |

## PullRefreshChangeDetail

| 名称     | 类型                                                                 | 说明                               |
| -------- | -------------------------------------------------------------------- | ---------------------------------- |
| status   | `'normal' \| 'pulling' \| 'canRelease' \| 'refreshing' \| 'success'` | 当前状态。                         |
| distance | `number`                                                             | 当前下拉距离，单位为像素。         |
| progress | `number`                                                             | 当前进度，`distance / threshold`。 |
