## Checkbox Props

| 名称         | 类型                                                    | 默认值      | 必传 | 说明                         |
| ------------ | ------------------------------------------------------- | ----------- | ---- | ---------------------------- |
| data         | `CheckboxItemProps[]`                                   | `[]`        | Y    | 选项数据。                   |
| layout       | `'h'\|'v'\|'inline'`                                    | `'v'`       | N    | 排列方式。                   |
| checkeds     | `string[]`                                              | `[]`        | N    | 选中的选项标识符组成的数组。 |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N    | 选项文本区域位置。           |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 未选中选项图标区域内容。     |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 选中选项图标区域内容。       |

## Checkbox Events

| 名称     | 类型                           | 参数                                | 描述                                        |
| -------- | ------------------------------ | ----------------------------------- | ------------------------------------------- |
| onChange | `(checkeds: string[]) => void` | checkeds - 选定项标识符组成的数组。 | 点击选项时触发。                            |
| onchange | `(checkeds: string[]) => void` | checkeds - 选定项标识符组成的数组。 | 点击选项时触发。 兼容 STDF 的小写事件别名。 |

## Checkbox Children

| 名称          | 类型                                                  | 参数              | 说明                     |
| ------------- | ----------------------------------------------------- | ----------------- | ------------------------ |
| checkboxChild | `(payload: { item: CheckboxItemProps }) => ReactNode` | item - 选项数据。 | 当选项区域自定义时使用。 |

## CheckboxItem Props

| 名称         | 类型                                                    | 默认值      | 必传 | 说明                     |
| ------------ | ------------------------------------------------------- | ----------- | ---- | ------------------------ |
| name         | `string`                                                | `''`        | Y    | 标识符。                 |
| label        | `string`                                                | `''`        | N    | 选项文本，主要用于显示。 |
| layout       | `'h'\|'v'\|'inline'`                                    | `'v'`       | N    | 排列方式。               |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N    | 选项文本区域位置。       |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 未选中选项图标区域内容。 |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N    | 选中选项图标区域内容。   |
| checked      | `boolean`                                               | `false`     | N    | 是否选中。               |

## CheckboxItem Events

| 名称    | 类型                     | 参数            | 描述                                        |
| ------- | ------------------------ | --------------- | ------------------------------------------- |
| onClick | `(name: string) => void` | name - 标识符。 | 点击选项时触发。                            |
| onclick | `(name: string) => void` | name - 标识符。 | 点击选项时触发。 兼容 STDF 的小写事件别名。 |

## CheckboxItem Children

| 名称     | 类型      | 参数 | 说明               |
| -------- | --------- | ---- | ------------------ |
| children | ReactNode | -    | 选项文本区域内容。 |
