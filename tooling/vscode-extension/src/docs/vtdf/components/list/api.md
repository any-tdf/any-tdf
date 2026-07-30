## List Props

| 名称            | 类型                                                      | 默认值         | 必传 | 说明                                     |
| --------------- | --------------------------------------------------------- | -------------- | ---- | ---------------------------------------- |
| data            | `T[]`                                                     | `[]`           | Y    | 列表数据数组。                           |
| keyField        | `string`                                                  | `'id'`         | N    | 数据项唯一标识字段名。                   |
| gap             | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N    | 列表项之间的间距。                       |
| mx              | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N    | 列表左右外边距。                         |
| my              | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N    | 列表上下外边距。                         |
| transition      | `'slideRight'\|'slideUp'\|'fadeScale'\|'stagger'\|null`   | `'slideRight'` | N    | 列表项过渡动画类型，设为 `null` 可关闭。 |
| transitionDelay | `number`                                                  | `50`           | N    | 列表项动画延迟（毫秒）。                 |
| batchMode       | `boolean`                                                 | `false`        | N    | 是否处于批量选择模式（支持双向绑定）。   |
| batchSelected   | `(string\|number)[]`                                      | `[]`           | N    | 批量选择项的 key 数组（支持双向绑定）。  |
| batchSelectable | `boolean`                                                 | `false`        | N    | 是否显示批量选择入口。                   |
| batchActions    | `BatchActionProps[]`                                      | `[]`           | N    | 批量操作按钮配置。                       |
| injClass        | `string`                                                  | `''`           | N    | 注入容器的 CSS 类名。                    |
| itemInjClass    | `string`                                                  | `''`           | N    | 注入列表项的 CSS 类名。                  |
| clickable       | `boolean`                                                 | `true`         | N    | 列表项是否显示为可点击状态。             |
| arrow           | `boolean`                                                 | `false`        | N    | 是否显示右侧箭头指示器。                 |
| divider         | `boolean`                                                 | `true`         | N    | 是否显示分割线。                         |
| itemRadius      | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`           | N    | 列表项圆角大小。                         |
| itemPx          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N    | 列表项水平内间距。                       |
| itemPy          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N    | 列表项垂直内间距。                       |
| swipeActions    | `SwipeActionProps[]`                                      | `[]`           | N    | 滑动操作按钮（左滑显示）。               |
| swipeHint       | `'none'\|'first'\|'all'`                                  | `'first'`      | N    | 滑动提示显示模式。                       |
| swipeThreshold  | `number`                                                  | `30`           | N    | 滑动触发阈值（像素）。                   |

## List Events

| 名称              | 类型                                                                                    | 参数                                                                                               | 描述                     |
| ----------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------ |
| batch-change      | `(selected: (string\|number)[]) => void`                                                | `selected` - 当前选中项 key 数组                                                                   | 批量选择项变化时触发。   |
| batch-mode-change | `(batchMode: boolean) => void`                                                          | `batchMode` - 当前批量选择模式                                                                     | 批量选择模式变化时触发。 |
| batch-action      | `(actionIndex: number, action: BatchActionProps, selected: (string\|number)[]) => void` | `actionIndex` - 操作索引<br />`action` - 操作配置<br />`selected` - 当前选中项 key 数组            | 点击批量操作按钮时触发。 |
| click-item        | `(item: T, index: number) => void`                                                      | `item` - 当前项<br />`index` - 当前索引                                                            | 点击列表项时触发。       |
| swipe-action      | `(actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => void`   | `actionIndex` - 操作索引<br />`action` - 操作配置<br />`item` - 当前项<br />`itemIndex` - 当前索引 | 点击滑动操作按钮时触发。 |

## List Children

| 名称        | 类型     | 参数               | 说明                 |
| ----------- | -------- | ------------------ | -------------------- |
| itemChild   | Vue Slot | `(item: T, index)` | 列表项内容（必传）。 |
| headerChild | Vue Slot | -                  | 自定义列表头部内容。 |
| footerChild | Vue Slot | -                  | 自定义列表底部内容。 |

## SwipeActionProps

滑动操作按钮配置：

| 名称    | 类型                 | 默认值    | 说明         |
| ------- | -------------------- | --------- | ------------ |
| icon    | `string`             | -         | 图标名称。   |
| text    | `string`             | -         | 按钮文字。   |
| bgColor | `SwipeActionBgColor` | `'theme'` | 按钮背景色。 |

bgColor 支持 `theme`、`success`、`warning`、`error`、`info`，`primary` 作为 `theme` 的别名。

## BatchActionProps

批量操作按钮配置：

| 名称   | 类型                                             | 默认值    | 说明           |
| ------ | ------------------------------------------------ | --------- | -------------- |
| text   | `string`                                         | -         | 按钮文字。     |
| status | `'theme'\|'success'\|'warning'\|'error'\|'info'` | `'theme'` | 按钮文字颜色。 |

## 动画类型说明

过渡动画会在列表项进入和移除时生效。

| 类型       | 效果说明                   |
| ---------- | -------------------------- |
| slideRight | 从右侧滑入或滑出。         |
| slideUp    | 从下方滑入或滑出。         |
| fadeScale  | 淡入缩放并淡出缩放。       |
| stagger    | 奇偶项交错滑入并交错滑出。 |
