## BottomSheet Props

| 名称            | 类型                                                      | 默认值                       | 必传 | 说明                               |
| --------------- | --------------------------------------------------------- | ---------------------------- | ---- | ---------------------------------- |
| visible         | `boolean`                                                 | `false`                      | N    | 是否显示。                         |
| title           | `string`                                                  | 当前语言的 bottomSheet.title | N    | 标题。                             |
| titleAlign      | `'left'\|'center'\|'right'`                               | `'left'`                     | N    | 标题对齐方式。                     |
| showBackIcon    | `boolean`                                                 | `false`                      | N    | 是否显示返回图标。                 |
| closeContent    | `'downIcon'\|'closeIcon'\|''\|string`                     | `'downIcon'`                 | N    | 关闭区域内容。                     |
| showDivider     | `boolean`                                                 | `true`                       | N    | 是否显示分割线。                   |
| duration        | `number`                                                  | `450`                        | N    | 过渡动画出现时间，单位：ms。       |
| outDuration     | `number`                                                  | `240`                        | N    | 过渡动画退出时间，单位：ms。       |
| mask            | [`Mask`](/components?nav=mask&tab=1)                      | `{}`                         | N    | 遮罩层参数。                       |
| maskClosable    | `boolean`                                                 | `false`                      | N    | 点击遮罩层是否关闭。               |
| zIndex          | `number`                                                  | `600`                        | N    | z-index。                          |
| stayHeightList  | `number[]`                                                | `[10, 50, 90]`               | N    | 固定高度列表。                     |
| stayHeightIndex | `number`                                                  | `1`                          | N    | 初始固定高度索引。                 |
| closeHeight     | `number`                                                  | `0`                          | N    | 滑动结束时位置低于此高度自动关闭。 |
| radius          | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`                         | N    | 圆角风格。                         |
| iconRadius      | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `''`                         | N    | 返回和关闭图标按钮的圆角风格。     |

## BottomSheet Events

| 名称          | 类型                       | 参数                | 描述                                                      |
| ------------- | -------------------------- | ------------------- | --------------------------------------------------------- |
| close         | `() => void`               | -                   | 浮窗关闭时触发。                                          |
| click-mask    | `() => void`               | -                   | 点击浮窗遮罩时触发，即使 maskClosable 为 false 也会触发。 |
| back          | `() => void`               | -                   | 点击左侧返回图标时触发。                                  |
| height-change | `(height: number) => void` | height - 当前高度。 | 滑动结束时触发。                                          |

## BottomSheet Children

| 名称     | 类型     | 参数 | 说明   |
| -------- | -------- | ---- | ------ |
| children | Vue Slot | -    | 内容。 |
