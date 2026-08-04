## Input Props

| Name              | Type                                                                                                      | Default   | Required | Description                        |
| ----------------- | --------------------------------------------------------------------------------------------------------- | --------- | -------- | ---------------------------------- |
| title             | `string`                                                                                                  | `''`      | N        | Title content.                     |
| titlePosition     | `'in'\|'out'\|null`                                                                                       | `'out'`   | N        | Title position.                    |
| inputPosition     | `'left'\|'right'`                                                                                         | `'left'`  | N        | Input text position.               |
| placeholder       | `string`                                                                                                  | `''`      | N        | Input placeholder text.            |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`                                                 | `''`      | N        | Border radius style.               |
| inputStyle        | `'block'\|'line'`                                                                                         | `'block'` | N        | Input box style.                   |
| lineTransition    | `'left'\|'center'\|null`                                                                                  | `null`    | N        | Linear transition position.        |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                                                                        | `'base'`  | N        | Transition duration.               |
| autocomplete      | `boolean`                                                                                                 | `true`    | N        | Whether to enable autocomplete.    |
| py                | `'0'\|'0.5'\|'1'\|'2'\|'3'\|'4'\|'6'`                                                                     | `'2'`     | N        | Vertical padding.                  |
| disabled          | `boolean`                                                                                                 | `false`   | N        | Whether disabled.                  |
| state             | `'theme'\|'success'\|'warning'\|'error'\|'info'`                                                          | `'theme'` | N        | State.                             |
| type              | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|'password'\|'number'\|'textarea'` | `'text'`  | N        | Input type.                        |
| inputmode         | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''`                               | `''`      | N        | Specify input data type.           |
| readonly          | `boolean`                                                                                                 | `false`   | N        | Whether readonly.                  |
| select            | `boolean`                                                                                                 | `false`   | N        | Select mode, shows dropdown arrow. |
| required          | `boolean`                                                                                                 | `false`   | N        | Whether required.                  |
| maxlength         | `number`                                                                                                  | `24`      | N        | Maximum input text length.         |
| textareaMaxlength | `number`                                                                                                  | `200`     | N        | Maximum text length for textarea.  |
| rows              | `number`                                                                                                  | `2`       | N        | Number of rows for textarea.       |
| autosize          | `boolean`                                                                                                 | `false`   | N        | Auto adjust height for textarea.   |
| negative          | `boolean`                                                                                                 | `false`   | N        | Whether to allow negative numbers. |
| label1            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N        | Label 1 content.                   |
| label2            | `string\|null`                                                                                            | `null`    | N        | Label 2 content.                   |
| label3            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N        | Label 3 content.                   |
| label4            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N        | Label 4 content.                   |
| label5            | `string\|null`                                                                                            | `null`    | N        | Label 5 content.                   |
| label6            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                                              | `null`    | N        | Label 6 content.                   |
| tip               | `string\|null`                                                                                            | `null`    | N        | Tip message content.               |
| data1             | `string\|null`                                                                                            | `null`    | N        | Data item 1 content.               |
| data2             | `string\|null`                                                                                            | `null`    | N        | Data item 2 content.               |
| data3             | `string\|null`                                                                                            | `null`    | N        | Data item 3 content.               |
| value             | `string`                                                                                                  | `''`      | N        | Input value.                       |
| clear             | `boolean`                                                                                                 | `false`   | N        | Whether clearable.                 |

## Input Events

| Name        | Type                      | Parameters                        | Description                             |
| ----------- | ------------------------- | --------------------------------- | --------------------------------------- |
| focus       | `(value: string) => void` | value - current value             | Triggered when input gets focus.        |
| blur        | `(value: string) => void` | value - current value             | Triggered when input loses focus.       |
| change      | `(value: string) => void` | value - current value             | Triggered when input value changes.     |
| clear       | `() => void`              | -                                 | Triggered when clear button is clicked. |
| click-label | `(index: number) => void` | index - label number, from 1 to 6 | Triggered when a label area is clicked. |
| keydown     | `(key: string) => void`   | key - pressed key                 | Triggered when keyboard key is pressed. |

## Input Children

| Name        | Type     | Parameters | Description                   |
| ----------- | -------- | ---------- | ----------------------------- |
| titleChild  | Vue Slot | -          | Title Vue Slot content.       |
| data1Child  | Vue Slot | -          | Data item 1 Vue Slot content. |
| data2Child  | Vue Slot | -          | Data item 2 Vue Slot content. |
| data3Child  | Vue Slot | -          | Data item 3 Vue Slot content. |
| label1Child | Vue Slot | -          | Label 1 Vue Slot content.     |
| label2Child | Vue Slot | -          | Label 2 Vue Slot content.     |
| label3Child | Vue Slot | -          | Label 3 Vue Slot content.     |
| label4Child | Vue Slot | -          | Label 4 Vue Slot content.     |
| label5Child | Vue Slot | -          | Label 5 Vue Slot content.     |
| label6Child | Vue Slot | -          | Label 6 Vue Slot content.     |
| tipChild    | Vue Slot | -          | Tip message Vue Slot content. |
| inputChild  | Vue Slot | -          | Custom input area content.    |
