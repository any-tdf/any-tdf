## Switch Props

| Name     | Type                                                  | Default | Required | Description                                                              |
| -------- | ----------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------ |
| active   | `boolean`                                             | `false` | N        | Switch state.                                                            |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'md'`  | N        | Border radius style.                                                     |
| inside   | `'state'\|'loading'\|[string,string]\|null`           | `null`  | N        | Switch inner content.                                                    |
| injClass | `string`                                              | `''`    | N        | Injected CSS class name.                                                 |
| disabled | `boolean`                                             | `false` | N        | Whether the switch is disabled.                                          |
| async    | `boolean`                                             | `false` | N        | Whether the switch is asynchronous.                                      |
| loading  | [`Loading`](/components?nav=loading&tab=1)            | `{}`    | N        | Loading component parameters, only effective when inside is `'loading'`. |

## Switch Events

| Name     | Type                        | Parameters                     | Description                                                                          |
| -------- | --------------------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| onClick  | `() => void`                | -                              | Triggered when clicked.                                                              |
| onclick  | `() => void`                | -                              | Triggered when clicked. Lowercase event alias compatible with STDF.                  |
| onChange | `(active: boolean) => void` | active - Current switch state. | Triggered when the switch state changes.                                             |
| onchange | `(active: boolean) => void` | active - Current switch state. | Triggered when the switch state changes. Lowercase event alias compatible with STDF. |

## Switch Children

| Name       | Type      | Parameters | Description                                 |
| ---------- | --------- | ---------- | ------------------------------------------- |
| trueChild  | ReactNode | -          | Switch inner content when the state is on.  |
| falseChild | ReactNode | -          | Switch inner content when the state is off. |
