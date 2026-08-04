## Radio Props

| 名称         | 类型                                                    | 默认值      | 必传 | 说明                     |
| ------------ | ------------------------------------------------------- | ----------- | ---- | ------------------------ |
| data         | `RadioItemProps[]`                                      | `[]`        | Y    | 选项数据。               |
| layout       | `'v'\|'h'\|'inline'`                                    | `'v'`       | N    | 排列方式。               |
| value        | `string`                                                | `''`        | N    | 选中的 value。           |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N    | 选项内容区域位置。       |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 未选中选项图标区域内容。 |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 选中选项图标区域内容。   |

## Radio Events

| 名称     | 类型                      | 参数                        | 描述                                                                        |
| -------- | ------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| onChange | `(value: string) => void` | value - 选中的 Radio 标识符 | 点击 RadioItem（即 Radio 的 value 变化）时触发。                            |
| onchange | `(value: string) => void` | value - 选中的 Radio 标识符 | 点击 RadioItem（即 Radio 的 value 变化）时触发。 兼容 STDF 的小写事件别名。 |

## Radio Children

| 名称       | 类型                                               | 参数            | 说明                     |
| ---------- | -------------------------------------------------- | --------------- | ------------------------ |
| radioChild | `(payload: { item: RadioItemProps }) => ReactNode` | item - 选项数据 | 当选项区域自定义时使用。 |

## RadioItem Props

| 名称         | 类型                                                    | 默认值      | 必传 | 说明                                |
| ------------ | ------------------------------------------------------- | ----------- | ---- | ----------------------------------- |
| name         | `string`                                                | `''`        | Y    | 标识符，对应 Radio Props 的 value。 |
| label        | `string`                                                | `''`        | N    | 选项内容。                          |
| layout       | `'v'\|'h'\|'inline'`                                    | `'v'`       | N    | 排列方式。                          |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N    | 选项内容区域位置。                  |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 未选中选项图标区域内容。            |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 选中选项图标区域内容。              |
| checked      | `boolean`                                               | `false`     | N    | 是否选中。                          |

## RadioItem Events

| 名称    | 类型                     | 参数                | 说明                                    |
| ------- | ------------------------ | ------------------- | --------------------------------------- |
| onClick | `(name: string) => void` | name - 点击项标识符 | 点击时触发。                            |
| onclick | `(name: string) => void` | name - 点击项标识符 | 点击时触发。 兼容 STDF 的小写事件别名。 |

## RadioItem Children

| 名称     | 类型      | 参数 | 说明           |
| -------- | --------- | ---- | -------------- |
| children | ReactNode | -    | 选项区域内容。 |
