## FullKeyboard Props

| Name         | Type                                                      | Default                        | Required | Description                                        |
| ------------ | --------------------------------------------------------- | ------------------------------ | -------- | -------------------------------------------------- |
| value        | `string`                                                  | `''`                           | N        | Input content.                                     |
| visible      | `boolean`                                                 | `true`                         | N        | Whether to show keyboard.                          |
| type         | `'button'\|'block'`                                       | `'button'`                     | N        | Keyboard style type.                               |
| mode         | `'letter'\|'letterNumber'\|'full'`                        | `'full'`                       | N        | Keyboard mode.                                     |
| done         | `boolean`                                                 | `true`                         | N        | Whether to show done button.                       |
| doneText     | `string`                                                  | Current language's common.done | N        | Done button text.                                  |
| doneDisabled | `boolean`                                                 | `false`                        | N        | Whether to disable done button.                    |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `''`                           | N        | Key border radius.                                 |
| preview      | `boolean`                                                 | `false`                        | N        | Whether to show input preview.                     |
| previewMask  | `boolean`                                                 | `false`                        | N        | Whether to mask preview content.                   |
| panelClass   | `string`                                                  | `''`                           | N        | Inject class for keyboard panel.                   |
| keyClass     | `string`                                                  | `''`                           | N        | Inject class for keys.                             |
| doneClass    | `string`                                                  | `''`                           | N        | Inject class for done button.                      |
| popup        | [`Popup`](/components?nav=popup&tab=1)\|`null`            | `{}`                           | N        | Popup parameters. Pass `null` to display directly. |

## FullKeyboard Events

| Name    | Type                       | Parameters                 | Description                                                                 |
| ------- | -------------------------- | -------------------------- | --------------------------------------------------------------------------- |
| onClick | `(key: string) => void`    | key - Clicked keyboard key | Triggered when key is clicked.                                              |
| onclick | `(key: string) => void`    | key - Clicked keyboard key | Triggered when key is clicked. Lowercase event alias compatible with STDF.  |
| onOpen  | `(height: number) => void` | height - Keyboard height   | Triggered when keyboard opens.                                              |
| onopen  | `(height: number) => void` | height - Keyboard height   | Triggered when keyboard opens. Lowercase event alias compatible with STDF.  |
| onClose | `() => void`               | -                          | Triggered when keyboard closes.                                             |
| onclose | `() => void`               | -                          | Triggered when keyboard closes. Lowercase event alias compatible with STDF. |
