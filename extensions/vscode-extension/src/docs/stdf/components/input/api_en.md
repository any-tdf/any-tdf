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
| label1            | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)\|`null`                                              | `null`    | N        | Label 1 content.                   |
| label2            | `string\|null`                                                                                            | `null`    | N        | Label 2 content.                   |
| label3            | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)\|`null`                                              | `null`    | N        | Label 3 content.                   |
| label4            | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)\|`null`                                              | `null`    | N        | Label 4 content.                   |
| label5            | `string\|null`                                                                                            | `null`    | N        | Label 5 content.                   |
| label6            | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)\|`null`                                              | `null`    | N        | Label 6 content.                   |
| tip               | `string\|null`                                                                                            | `null`    | N        | Tip message content.               |
| data1             | `string\|null`                                                                                            | `null`    | N        | Data item 1 content.               |
| data2             | `string\|null`                                                                                            | `null`    | N        | Data item 2 content.               |
| data3             | `string\|null`                                                                                            | `null`    | N        | Data item 3 content.               |
| value             | `string`                                                                                                  | `''`      | N        | Input value.                       |
| clear             | `boolean`                                                                                                 | `false`   | N        | Whether clearable.                 |

## Input Events

| Name          | Type                      | Parameters            | Description                             |
| ------------- | ------------------------- | --------------------- | --------------------------------------- |
| onfocus       | `(value: string) => void` | value - current value | Triggered when input gets focus.        |
| onblur        | `(value: string) => void` | value - current value | Triggered when input loses focus.       |
| onchange      | `(value: string) => void` | value - current value | Triggered when input value changes.     |
| onclear       | `() => void`              | -                     | Triggered when clear button is clicked. |
| onclickLabel1 | `() => void`              | -                     | Triggered when Label 1 is clicked.      |
| onclickLabel2 | `() => void`              | -                     | Triggered when Label 2 is clicked.      |
| onclickLabel3 | `() => void`              | -                     | Triggered when Label 3 is clicked.      |
| onclickLabel4 | `() => void`              | -                     | Triggered when Label 4 is clicked.      |
| onclickLabel5 | `() => void`              | -                     | Triggered when Label 5 is clicked.      |
| onclickLabel6 | `() => void`              | -                     | Triggered when Label 6 is clicked.      |
| onkeydown     | `(key: string) => void`   | key - pressed key     | Triggered when keyboard key is pressed. |

## Input Snippets

| Name        | Type                                                                | Parameters | Description                  |
| ----------- | ------------------------------------------------------------------- | ---------- | ---------------------------- |
| titleChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Title Snippet content.       |
| data1Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 1 Snippet content. |
| data2Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 2 Snippet content. |
| data3Child  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Data item 3 Snippet content. |
| label1Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 1 Snippet content.     |
| label2Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 2 Snippet content.     |
| label3Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 3 Snippet content.     |
| label4Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 4 Snippet content.     |
| label5Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 5 Snippet content.     |
| label6Child | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Label 6 Snippet content.     |
| tipChild    | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Tip message Snippet content. |
