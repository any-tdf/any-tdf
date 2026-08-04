## Stepper Props

| Name            | Type                                                  | Default | Required | Description                                        |
| --------------- | ----------------------------------------------------- | ------- | -------- | -------------------------------------------------- |
| value           | `number`                                              | `10`    | N        | Current value.                                     |
| min             | `number`                                              | `0`     | N        | Minimum value.                                     |
| max             | `number`                                              | `100`   | N        | Maximum value.                                     |
| step            | `number`                                              | `1`     | N        | Step increment.                                    |
| vertical        | `boolean`                                             | `false` | N        | Whether to display vertically.                     |
| numberHighlight | `boolean`                                             | `false` | N        | Whether to highlight the number area.              |
| theme           | `boolean`                                             | `true`  | N        | Whether the highlighted area uses the theme color. |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`  | N        | Border radius style.                               |
| decimal         | `number`                                              | `0`     | N        | Number of decimal places for displayed value.      |
| async           | `boolean`                                             | `false` | N        | Whether in async state.                            |
| asyncLoading    | `boolean`                                             | `false` | N        | Whether to show internal Loading in async state.   |
| loading         | [`Loading`](/components?nav=loading&tab=1)            | `{}`    | N        | Loading parameters in async state.                 |
| padding         | `boolean`                                             | `true`  | N        | Whether to have external padding.                  |
| width           | `number`                                              | `0`     | N        | Fixed width for the number area.                   |
| injClassOut     | `string`                                              | `''`    | N        | Injected class for the outer container.            |
| injClassBtn     | `string`                                              | `''`    | N        | Injected class for the button area.                |
| injClassNum     | `string`                                              | `''`    | N        | Injected class for the number area.                |

## Stepper Events

| Name       | Type                | Parameters            | Description                                                                            |
| ---------- | ------------------- | --------------------- | -------------------------------------------------------------------------------------- |
| onChange   | `{ value: number }` | value - current value | Triggered when the value changes.                                                      |
| onchange   | `{ value: number }` | value - current value | Triggered when the value changes. Lowercase event alias compatible with STDF.          |
| onDecrease | `() => void`        | -                     | Triggered when decrease button is clicked.                                             |
| ondecrease | `() => void`        | -                     | Triggered when decrease button is clicked. Lowercase event alias compatible with STDF. |
| onIncrease | `() => void`        | -                     | Triggered when increase button is clicked.                                             |
| onincrease | `() => void`        | -                     | Triggered when increase button is clicked. Lowercase event alias compatible with STDF. |
