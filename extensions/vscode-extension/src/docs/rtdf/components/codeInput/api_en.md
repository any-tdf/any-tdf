## CodeInput Props

| Prop            | Type                                                                        | Default    | Description                                                                                                              |
| --------------- | --------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| value           | `string`                                                                    | `''`       | Input value (bindable)                                                                                                   |
| length          | `number`                                                                    | `6`        | Input length                                                                                                             |
| mask            | `boolean\|string`                                                           | `false`    | Mask mode, true shows dot, string shows that character                                                                   |
| gutter          | `'0'\|'1'\|'2'\|'3'\|'4'`                                                   | `'2'`      | Cell gutter                                                                                                              |
| focused         | `boolean`                                                                   | `false`    | Whether focused (bindable)                                                                                               |
| type            | `'number'\|'text'`                                                          | `'number'` | Input type                                                                                                               |
| inputMode       | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''` | `''`       | Native keyboard type, auto-select based on type when empty                                                               |
| native          | `boolean`                                                                   | `false`    | Use native keyboard                                                                                                      |
| info            | `string`                                                                    | `''`       | Info message                                                                                                             |
| errorInfo       | `string`                                                                    | `''`       | Error message                                                                                                            |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                   | `''`       | Border radius                                                                                                            |
| cellSize        | `'sm'\|'md'\|'lg'`                                                          | `'md'`     | Cell size                                                                                                                |
| cellStyle       | `'box'\|'line'`                                                             | `'box'`    | Cell style                                                                                                               |
| cellBg          | `'surface'\|'gray'\|'theme'`                                                | `'gray'`   | Cell background                                                                                                          |
| cellBorder      | `'none'\|'solid'\|'dashed'\|'dotted'`                                       | `'solid'`  | Cell border style                                                                                                        |
| cursorStyle     | `'line'\|'underline'`                                                       | `'line'`   | Cursor style                                                                                                             |
| cursorAnimation | `'pulse'\|'blink'`                                                          | `'blink'`  | Cursor animation                                                                                                         |
| keyboardVisible | `boolean`                                                                   | `false`    | Whether keyboard is visible (bindable), controls cursor blinking                                                         |
| autoClose       | `boolean`                                                                   | `false`    | Auto close keyboard after input complete                                                                                 |
| autoScroll      | `boolean\|number`                                                           | `true`     | Auto scroll page when keyboard opens to avoid covering, true uses default height (40% viewport), number uses that height |
| bold            | `boolean`                                                                   | `false`    | Whether to display input content in larger and bolder style                                                              |
| injClass        | `string`                                                                    | `''`       | Inject CSS class                                                                                                         |

## CodeInput Events

| Event           | Parameters                   | Description                                                                                |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| onChange        | `(value: string) => void`    | Triggered when input value changes                                                         |
| onchange        | `(value: string) => void`    | Triggered when input value changes. Lowercase event alias compatible with STDF.            |
| onFinish        | `(value: string) => void`    | Triggered when input is complete                                                           |
| onfinish        | `(value: string) => void`    | Triggered when input is complete. Lowercase event alias compatible with STDF.              |
| onClose         | `() => void`                 | Triggered when keyboard closes (if autoClose)                                              |
| onclose         | `() => void`                 | Triggered when keyboard closes (if autoClose). Lowercase event alias compatible with STDF. |
| onFocus         | `() => void`                 | Triggered when focused                                                                     |
| onfocus         | `() => void`                 | Triggered when focused. Lowercase event alias compatible with STDF.                        |
| onFocusedChange | `(focused: boolean) => void` | Triggered when focused state changes                                                       |
