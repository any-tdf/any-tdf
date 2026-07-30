## Tabs Props

| 名称       | 类型                               | 默认值   | 必传 | 说明                 |
| ---------- | ---------------------------------- | -------- | ---- | -------------------- |
| tab        | `Tab`                              | `{}`     | Y    | 内部 Tab 组件。      |
| active     | `number`                           | `0`      | N    | 激活的选项卡索引值。 |
| duration   | `'fast'\|'base'\|'slow'\|'slower'` | `'base'` | N    | 过渡动画快慢。       |
| position   | `'t'\|'b'\|'l'\|'r'`               | `'t'`    | N    | 选项卡位置。         |
| transition | `boolean`                          | `true`   | N    | 是否使用过渡动画。   |

## Tabs Events

| 名称   | 类型                       | 参数                        | 描述                         |
| ------ | -------------------------- | --------------------------- | ---------------------------- |
| change | `(active: number) => void` | active - 激活的选项卡索引值 | 激活的选项卡发生变化时触发。 |

## Tabs Children

| 名称     | 类型                                                      | 参数                        | 说明            |
| -------- | --------------------------------------------------------- | --------------------------- | --------------- |
| children | `Vue Slot \| ((payload: { active: number }) => Vue Slot)` | active - 激活的选项卡索引值 | Tabs 主体内容。 |

## Tab Props

| 名称              | 类型                                                      | 默认值   | 必传 | 说明                               |
| ----------------- | --------------------------------------------------------- | -------- | ---- | ---------------------------------- |
| labels            | `TabLabel[]`                                              | `[]`     | Y    | 选项卡内容组。                     |
| active            | `number`                                                  | `0`      | N    | 激活的选项卡索引值。               |
| lineType          | `boolean`                                                 | `false`  | N    | 是否使用线性风格。                 |
| radius            | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`   | N    | 圆角风格。                         |
| mx                | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'\|'12'\|'16'\|'20'`     | `'2'`    | N    | 左右间距。                         |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                        | `'base'` | N    | 过渡动画快慢。                     |
| layout            | `'h'\|'v'`                                                | `'h'`    | N    | 水平或垂直布局。                   |
| love              | `boolean`                                                 | `false`  | N    | 是否开启关爱版。                   |
| injClass          | `string`                                                  | `''`     | N    | Tab 外层注入 CSS。                 |
| tabInjClass       | `string`                                                  | `''`     | N    | 单项 Tab 注入 CSS。                |
| activeTabInjClass | `string`                                                  | `''`     | N    | 激活的 Tab 注入 CSS。              |
| activeInjClass    | `string`                                                  | `''`     | N    | 指示器注入 CSS。                   |
| overflow          | `boolean`                                                 | `false`  | N    | 是否开启溢出模式。                 |
| showNum           | `number`                                                  | `3`      | N    | 开启溢出模式时，完整显示 Tab 数。  |
| autoScroll        | `boolean`                                                 | `true`   | N    | 开启溢出模式时，是否开启自动滚动。 |
| labelChild        | `Vue Slot \| ((props: { active: boolean }) => Vue Slot)`  | -        | N    | 自定义 Tab 标签补充内容。          |

## Tab Events

| 名称      | 类型                       | 参数                          | 描述               |
| --------- | -------------------------- | ----------------------------- | ------------------ |
| click-tab | `(active: number) => void` | active - 激活的选项卡索引值。 | 点击选项卡时触发。 |

## TabLabel Props

| 名称 | 类型                                 | 默认值 | 必传 | 说明       |
| ---- | ------------------------------------ | ------ | ---- | ---------- |
| text | `string`                             | `''`   | N    | 标签文本。 |
| icon | [`Icon`](/components?nav=icon&tab=1) | `{}`   | N    | 标签图标。 |

## TabContent Props

| 名称 | 类型      | 默认值 | 必传 | 说明       |
| ---- | --------- | ------ | ---- | ---------- |
| show | `boolean` | `true` | N    | 是否显示。 |

## TabContent Children

| 名称     | 类型     | 参数 | 说明              |
| -------- | -------- | ---- | ----------------- |
| children | Vue Slot | -    | TabContent 内容。 |
