## Input Props

| 名称              | 类型                                                                                                      | 默认值    | 必传 | 说明                            |
| ----------------- | --------------------------------------------------------------------------------------------------------- | --------- | ---- | ------------------------------- |
| title             | `string`                                                                                                  | `''`      | N    | 标题内容。                      |
| titlePosition     | `'in'\|'out'\|null`                                                                                       | `'out'`   | N    | 标题位置。                      |
| inputPosition     | `'left'\|'right'`                                                                                         | `'left'`  | N    | 输入框文字位置。                |
| placeholder       | `string`                                                                                                  | `''`      | N    | 输入框提示文本。                |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`                                                 | `''`      | N    | 圆角风格。                      |
| inputStyle        | `'block'\|'line'`                                                                                         | `'block'` | N    | 输入框风格。                    |
| lineTransition    | `'left'\|'center'\|null`                                                                                  | `null`    | N    | 线性过渡位置。                  |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                                                                        | `'base'`  | N    | 过渡时间。                      |
| autocomplete      | `boolean`                                                                                                 | `true`    | N    | 是否开启自动填充功能。          |
| py                | `'0'\|'0.5'\|'1'\|'2'\|'3'\|'4'\|'6'`                                                                     | `'2'`     | N    | 垂直间距。                      |
| disabled          | `boolean`                                                                                                 | `false`   | N    | 是否禁用。                      |
| state             | `'theme'\|'success'\|'warning'\|'error'\|'info'`                                                          | `'theme'` | N    | 状态。                          |
| type              | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|'password'\|'number'\|'textarea'` | `'text'`  | N    | 输入框类型。                    |
| inputmode         | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''`                               | `''`      | N    | 指定输入的数据类型。            |
| readonly          | `boolean`                                                                                                 | `false`   | N    | 是否只读。                      |
| select            | `boolean`                                                                                                 | `false`   | N    | 选择模式，开启后显示下拉箭头。  |
| required          | `boolean`                                                                                                 | `false`   | N    | 是否必填。                      |
| maxlength         | `number`                                                                                                  | `24`      | N    | 最多可输入文本长度。            |
| textareaMaxlength | `number`                                                                                                  | `200`     | N    | textarea 时最多可输入文本长度。 |
| rows              | `number`                                                                                                  | `2`       | N    | textarea 时行数。               |
| autosize          | `boolean`                                                                                                 | `false`   | N    | textarea 时是否自动调整高度。   |
| negative          | `boolean`                                                                                                 | `false`   | N    | 是否允许输入负数。              |
| label1            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N    | 标签 1 内容。                   |
| label2            | `string\|null`                                                                                            | `null`    | N    | 标签 2 内容。                   |
| label3            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N    | 标签 3 内容。                   |
| label4            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N    | 标签 4 内容。                   |
| label5            | `string\|null`                                                                                            | `null`    | N    | 标签 5 内容。                   |
| label6            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N    | 标签 6 内容。                   |
| tip               | `string\|null`                                                                                            | `null`    | N    | 提示信息内容。                  |
| data1             | `string\|null`                                                                                            | `null`    | N    | 数据项 1 内容。                 |
| data2             | `string\|null`                                                                                            | `null`    | N    | 数据项 2 内容。                 |
| data3             | `string\|null`                                                                                            | `null`    | N    | 数据项 3 内容。                 |
| value             | `string`                                                                                                  | `''`      | N    | 输入框值。                      |
| clear             | `boolean`                                                                                                 | `false`   | N    | 是否可清空。                    |

## Input Events

| 名称        | 类型                      | 参数                       | 说明                     |
| ----------- | ------------------------- | -------------------------- | ------------------------ |
| focus       | `(value: string) => void` | value - 当前 value         | 获得焦点时触发。         |
| blur        | `(value: string) => void` | value - 当前 value         | 失去焦点时触发。         |
| change      | `(value: string) => void` | value - 当前 value         | 输入框值发生变化时触发。 |
| clear       | `() => void`              | -                          | 清空按钮点击时触发。     |
| click-label | `(index: number) => void` | index - 标签序号，范围 1-6 | 点击标签区域时触发。     |
| keydown     | `(key: string) => void`   | key - 按下的按键 key       | 按下键盘时触发。         |

## Input Children

| 名称        | 类型     | 参数 | 说明                     |
| ----------- | -------- | ---- | ------------------------ |
| titleChild  | Vue Slot | -    | 标题 Vue Slot 内容。     |
| data1Child  | Vue Slot | -    | 数据项 1 Vue Slot 内容。 |
| data2Child  | Vue Slot | -    | 数据项 2 Vue Slot 内容。 |
| data3Child  | Vue Slot | -    | 数据项 3 Vue Slot 内容。 |
| label1Child | Vue Slot | -    | 标签 1 Vue Slot 内容。   |
| label2Child | Vue Slot | -    | 标签 2 Vue Slot 内容。   |
| label3Child | Vue Slot | -    | 标签 3 Vue Slot 内容。   |
| label4Child | Vue Slot | -    | 标签 4 Vue Slot 内容。   |
| label5Child | Vue Slot | -    | 标签 5 Vue Slot 内容。   |
| label6Child | Vue Slot | -    | 标签 6 Vue Slot 内容。   |
| tipChild    | Vue Slot | -    | 提示信息 Vue Slot 内容。 |
| inputChild  | Vue Slot | -    | 自定义输入区域内容。     |
