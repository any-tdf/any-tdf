## NumKeyboard Props

| Name         | Type                                                           | Default                        | Required | Description                                             |
| ------------ | -------------------------------------------------------------- | ------------------------------ | -------- | ------------------------------------------------------- |
| value        | `string`                                                       | `''`                           | N        | Input content.                                          |
| type         | `'button'\|'block'`                                            | `'button'`                     | N        | Keyboard style type.                                    |
| visible      | `boolean`                                                      | `false`                        | N        | Whether to show keyboard.                               |
| height       | `'8'\|'10'\|'12'\|'14'\|'16'\|'20'`                            | `'12'`                         | N        | Key height.                                             |
| space        | `'0'\|'1'\|'2'\|'3'\|'4'`                                      | `'2'`                          | N        | Key spacing.                                            |
| p            | `'0'\|'1'\|'2'\|'3'\|'4'`                                      | `'2'`                          | N        | Keyboard padding.                                       |
| reverse      | `boolean`                                                      | `false`                        | N        | Whether to reverse number order.                        |
| done         | `boolean`                                                      | `true`                         | N        | Whether to show done button.                            |
| dot          | `boolean`                                                      | `true`                         | N        | Whether to show decimal point.                          |
| close        | `boolean`                                                      | `false`                        | N        | Whether to show close button.                           |
| doneText     | `string`                                                       | Current language's common.done | N        | Done button text.                                       |
| doneDisabled | `boolean`                                                      | `false`                        | N        | Whether to disable done button.                         |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'`          | `'sm'`                         | N        | Key border radius.                                      |
| clear        | `boolean`                                                      | `false`                        | N        | Whether to clear content when open.                     |
| panelClass   | `string`                                                       | `''`                           | N        | Inject class for keyboard panel.                        |
| keyClass     | `string`                                                       | `''`                           | N        | Inject class for keys.                                  |
| doneClass    | `string`                                                       | `''`                           | N        | Inject class for done button.                           |
| popup        | [`Popup`](https://stdf.dev/components?nav=popup&tab=1)\|`null` | `{}`                           | N        | Popup parameters. Pass `null` to display without popup. |

## NumKeyboard Events

| Name    | Type                                                                                              | Parameters                 | Description                        |
| ------- | ------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------- |
| onclick | `(key: '0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'7'\|'8'\|'9'\|'.'\|'delete'\|'close'\|'done') => void` | key - Clicked keyboard key | Triggered when any key is clicked. |
| onopen  | `(height: number) => void`                                                                        | height - Keyboard height   | Triggered when keyboard opens.     |
| onclose | `() => void`                                                                                      | -                          | Triggered when keyboard closes.    |
