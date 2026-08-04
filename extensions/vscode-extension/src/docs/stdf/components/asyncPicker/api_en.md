## AsyncPicker Props

| Name         | Type                                                           | Default                                 | Required | Description                                               |
| ------------ | -------------------------------------------------------------- | --------------------------------------- | -------- | --------------------------------------------------------- |
| visible      | `boolean`                                                      | `false`                                 | N        | Whether to show the picker.                               |
| data         | `array`                                                        | `[]`                                    | Y        | Column data. Please refer to examples for specific usage. |
| lastLevel    | `boolean`                                                      | `false`                                 | N        | Whether it is the last level.                             |
| firstLevel   | `boolean`                                                      | `false`                                 | N        | Whether it is the first level.                            |
| showRow      | `3\|5\|7`                                                      | `5`                                     | N        | Number of rows to display in the column.                  |
| labelKey     | `string`                                                       | `'label'`                               | N        | Custom key for label.                                     |
| align        | `'left' \| 'center' \| 'right'`                                | `'center'`                              | N        | Text alignment.                                           |
| cancelText   | `string`                                                       | Current language picker.defaultCancel   | N        | Cancel button text.                                       |
| confirmText  | `string`                                                       | Current language picker.defaultConfirm  | N        | Confirm button text.                                      |
| title        | `string`                                                       | Current language picker.defaultTitle    | N        | Title text.                                               |
| nextText     | `string`                                                       | Current language picker.defaultNext     | N        | Next level text.                                          |
| prevText     | `string`                                                       | Current language picker.defaultPrev     | N        | Previous level text.                                      |
| showSelected | `boolean`                                                      | `false`                                 | N        | Whether to show selected items.                           |
| selectedText | `string`                                                       | Current language picker.defaultSelected | N        | Selected text.                                            |
| height       | `number`                                                       | `30`                                    | N        | Height percentage of display area when not using popup.   |
| popup        | [`Popup`](https://stdf.dev/components?nav=popup&tab=1)\|`null` | `{}`                                    | N        | Popup parameters. Pass `null` to display without popup.   |
| loading      | [`Loading`](https://stdf.dev/components?nav=loading&tab=1)     | `{}`                                    | N        | Loading parameters when loading data.                     |

## AsyncPicker Events

| Name      | Type                                       | Parameters                                                                    | Description                             |
| --------- | ------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------- |
| onclose   | `() => void`                               | -                                                                             | Triggered when closing.                 |
| oncancel  | `() => void`                               | -                                                                             | Triggered when clicking cancel.         |
| onprev    | `() => void`                               | -                                                                             | Triggered when clicking previous level. |
| onnext    | `(index: number) => void`                  | index - Index of selected item in current column                              | Triggered when clicking next level.     |
| onconfirm | `(items: any[], indexs: number[]) => void` | items - Array of selected column data<br />indexs - Array of selected indexes | Triggered when clicking confirm.        |
