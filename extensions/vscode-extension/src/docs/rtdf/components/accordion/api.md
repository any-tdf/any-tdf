## AccordionItem Props

| 名称     | 类型                                 | 默认值      | 必传 | 说明           |
| -------- | ------------------------------------ | ----------- | ---- | -------------- |
| title    | `string`                             | -           | Y    | 标题。         |
| content  | `string`                             | `''`        | N    | 内容文本。     |
| disabled | `boolean`                            | `false`     | N    | 是否禁用。     |
| icon     | [`Icon`](/components?nav=icon&tab=1) | `undefined` | N    | 标题左侧图标。 |

## Accordion Props

| 名称               | 类型                                                      | 默认值    | 必传 | 说明                                    |
| ------------------ | --------------------------------------------------------- | --------- | ---- | --------------------------------------- |
| items              | `AccordionItemProps[]`                                    | `[]`      | N    | 手风琴项数据。                          |
| activeIndex        | `number \| number[]`                                      | -         | N    | 激活项索引，单选为 number，多选为数组。 |
| multiple           | `boolean`                                                 | `false`   | N    | 是否允许多项同时展开。                  |
| radius             | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `'md'`    | N    | 圆角风格。                              |
| border             | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'solid'` | N    | 边框风格。                              |
| divider            | `boolean`                                                 | `true`    | N    | 是否显示分割线。                        |
| expandIcon         | `'arrow'\|'plus'\|null`                                   | `'arrow'` | N    | 展开图标类型。                          |
| iconPosition       | `'left'\|'right'`                                         | `'right'` | N    | 展开图标位置。                          |
| transitionDuration | `number`                                                  | `300`     | N    | 动画时长（ms）。                        |
| injClass           | `string`                                                  | `''`      | N    | 注入 CSS 名称。                         |
| titleClass         | `string`                                                  | `''`      | N    | 标题区域注入 CSS。                      |
| contentClass       | `string`                                                  | `''`      | N    | 内容区域注入 CSS。                      |

## Accordion Events

| 名称     | 类型                                               | 参数                      | 描述                                                 |
| -------- | -------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| onChange | `(index: number \| number[] \| undefined) => void` | 当前激活索引（单选/多选） | 展开/折叠状态变化时触发。                            |
| onchange | `(index: number \| number[] \| undefined) => void` | 当前激活索引（单选/多选） | 展开/折叠状态变化时触发。 兼容 STDF 的小写事件别名。 |

## Accordion Children

| 名称     | 类型                                                   | 参数             | 说明             |
| -------- | ------------------------------------------------------ | ---------------- | ---------------- |
| children | `ReactNode<[item: AccordionItemProps, index: number]>` | 当前项数据和索引 | 自定义内容区域。 |
