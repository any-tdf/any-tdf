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

| Name   | Type                        | Parameters                     | Description                              |
| ------ | --------------------------- | ------------------------------ | ---------------------------------------- |
| click  | `() => void`                | -                              | Triggered when clicked.                  |
| change | `(active: boolean) => void` | active - Current switch state. | Triggered when the switch state changes. |

## Switch Children

| Name       | Type     | Parameters | Description                                 |
| ---------- | -------- | ---------- | ------------------------------------------- |
| trueChild  | Vue Slot | -          | Switch inner content when the state is on.  |
| falseChild | Vue Slot | -          | Switch inner content when the state is off. |
