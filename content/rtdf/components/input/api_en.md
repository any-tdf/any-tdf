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

| Name          | Type                      | Parameters            | Description                                                                         |
| ------------- | ------------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| onFocus       | `(value: string) => void` | value - current value | Triggered when input gets focus.                                                    |
| onfocus       | `(value: string) => void` | value - current value | Triggered when input gets focus. Lowercase event alias compatible with STDF.        |
| onBlur        | `(value: string) => void` | value - current value | Triggered when input loses focus.                                                   |
| onblur        | `(value: string) => void` | value - current value | Triggered when input loses focus. Lowercase event alias compatible with STDF.       |
| onChange      | `(value: string) => void` | value - current value | Triggered when input value changes.                                                 |
| onchange      | `(value: string) => void` | value - current value | Triggered when input value changes. Lowercase event alias compatible with STDF.     |
| onClear       | `() => void`              | -                     | Triggered when clear button is clicked.                                             |
| onclear       | `() => void`              | -                     | Triggered when clear button is clicked. Lowercase event alias compatible with STDF. |
| onClickLabel1 | `() => void`              | -                     | Triggered when Label 1 is clicked.                                                  |
| onclickLabel1 | `() => void`              | -                     | Triggered when Label 1 is clicked. Lowercase event alias compatible with STDF.      |
| onClickLabel2 | `() => void`              | -                     | Triggered when Label 2 is clicked.                                                  |
| onclickLabel2 | `() => void`              | -                     | Triggered when Label 2 is clicked. Lowercase event alias compatible with STDF.      |
| onClickLabel3 | `() => void`              | -                     | Triggered when Label 3 is clicked.                                                  |
| onclickLabel3 | `() => void`              | -                     | Triggered when Label 3 is clicked. Lowercase event alias compatible with STDF.      |
| onClickLabel4 | `() => void`              | -                     | Triggered when Label 4 is clicked.                                                  |
| onclickLabel4 | `() => void`              | -                     | Triggered when Label 4 is clicked. Lowercase event alias compatible with STDF.      |
| onClickLabel5 | `() => void`              | -                     | Triggered when Label 5 is clicked.                                                  |
| onclickLabel5 | `() => void`              | -                     | Triggered when Label 5 is clicked. Lowercase event alias compatible with STDF.      |
| onClickLabel6 | `() => void`              | -                     | Triggered when Label 6 is clicked.                                                  |
| onclickLabel6 | `() => void`              | -                     | Triggered when Label 6 is clicked. Lowercase event alias compatible with STDF.      |
| onKeyDown     | `(key: string) => void`   | key - pressed key     | Triggered when keyboard key is pressed.                                             |
| onkeydown     | `(key: string) => void`   | key - pressed key     | Triggered when keyboard key is pressed. Lowercase event alias compatible with STDF. |

## Input Children

| Name        | Type      | Parameters | Description                    |
| ----------- | --------- | ---------- | ------------------------------ |
| titleChild  | ReactNode | -          | Title ReactNode content.       |
| data1Child  | ReactNode | -          | Data item 1 ReactNode content. |
| data2Child  | ReactNode | -          | Data item 2 ReactNode content. |
| data3Child  | ReactNode | -          | Data item 3 ReactNode content. |
| label1Child | ReactNode | -          | Label 1 ReactNode content.     |
| label2Child | ReactNode | -          | Label 2 ReactNode content.     |
| label3Child | ReactNode | -          | Label 3 ReactNode content.     |
| label4Child | ReactNode | -          | Label 4 ReactNode content.     |
| label5Child | ReactNode | -          | Label 5 ReactNode content.     |
| label6Child | ReactNode | -          | Label 6 ReactNode content.     |
| tipChild    | ReactNode | -          | Tip message ReactNode content. |
| inputChild  | ReactNode | -          | Custom input area content.     |
