## Steps Props

| 名称      | 类型                                                      | 默认值  | 必传 | 说明                                        |
| --------- | --------------------------------------------------------- | ------- | ---- | ------------------------------------------- |
| steps     | `StepsItem[]`                                             | `[]`    | Y    | step Props 或 finishStep Props 组成的数组。 |
| current   | `number`                                                  | `1`     | N    | 当前进行的步骤序号。                        |
| radius    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`  | N    | 圆角风格。                                  |
| barBorder | `boolean`                                                 | `true`  | N    | 图标是否带边框。                            |
| vertical  | `boolean`                                                 | `false` | N    | 是否纵向布局。                              |
| injClass  | `string`                                                  | `''`    | N    | 注入 CSS 名称。                             |

## StepsItem Props

| 名称       | 类型              | 默认值 | 必传 | 说明                                                 |
| ---------- | ----------------- | ------ | ---- | ---------------------------------------------------- |
| step       | `StepsStep`       | `{}`   | Y    | 步骤参数。                                           |
| finishStep | `StepsFinishStep` | `{}`   | N    | 已完成步骤参数。                                     |
| height     | `number`          | `0`    | N    | 步骤高度，用于纵向布局，一般不设置，由组件自动计算。 |

## step Props && StepsFinishStep Props

| 名称         | 类型                                                          | 默认值 | 必传 | 说明                           |
| ------------ | ------------------------------------------------------------- | ------ | ---- | ------------------------------ |
| title        | `string`                                                      | `''`   | Y    | 步骤标题。                     |
| bar          | `StepsStepBarIcon \| StepsStepBarImage \| StepsStepBarString` | `{}`   | N    | 步骤区域内容。                 |
| desc         | `string`                                                      | `''`   | N    | 步骤描述内容。                 |
| injReactNode | `ReactNode`                                                   | -      | N    | 向步骤区域注入 ReactNode。     |
| injComponent | `ReactNode \| (() => ReactNode)`                              | -      | N    | 兼容旧命名的步骤区域注入内容。 |

## StepsStepBarIcon Props

| 名称    | 类型                                 | 默认值 | 必传 | 说明                       |
| ------- | ------------------------------------ | ------ | ---- | -------------------------- |
| type    | `'icon'`                             | `{}`   | Y    | 步骤区域内容为图标时使用。 |
| content | [`Icon`](/components?nav=icon&tab=1) | `-`    | Y    | 图标参数。                 |

## StepsStepBarImage Props

| 名称    | 类型      | 默认值 | 必传 | 说明                       |
| ------- | --------- | ------ | ---- | -------------------------- |
| type    | `'image'` | `{}`   | Y    | 步骤区域内容为图片时使用。 |
| content | `string`  | `-`    | Y    | 图片路径。                 |

## StepsStepBarString Props

| 名称    | 类型       | 默认值 | 必传 | 说明                         |
| ------- | ---------- | ------ | ---- | ---------------------------- |
| type    | `'string'` | `{}`   | Y    | 步骤区域内容为字符串时使用。 |
| content | `string`   | `-`    | Y    | 字符串内容。                 |
