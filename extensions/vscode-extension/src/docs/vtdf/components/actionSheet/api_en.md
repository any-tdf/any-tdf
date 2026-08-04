## ActionSheet Props

| Name           | Type                                   | Default                                 | Required | Description                                  |
| -------------- | -------------------------------------- | --------------------------------------- | -------- | -------------------------------------------- |
| visible        | `boolean`                              | `false`                                 | N        | Whether to show the action sheet.            |
| title          | `string`                               | `''`                                    | N        | Title text.                                  |
| titleAlign     | `'left'\|'center'\|'right'`            | `'center'`                              | N        | Title alignment.                             |
| actions        | `Action[]`                             | `[]`                                    | Y        | Menu options array composed of Action Props. |
| popup          | [`Popup`](/components?nav=popup&tab=1) | `{}`                                    | N        | Popup layer parameters.                      |
| showCancel     | `boolean`                              | `false`                                 | N        | Whether to show cancel button.               |
| cancelText     | `string`                               | Current language actionSheet.cancelText | N        | Cancel button text.                          |
| actionClosable | `boolean`                              | `true`                                  | N        | Whether to close when clicking an option.    |
| align          | `'left'\|'center'\|'right'`            | `'center'`                              | N        | Content alignment.                           |

## ActionSheet Events

| Name         | Type                                      | Parameters                                      | Description                                                           |
| ------------ | ----------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| close        | `() => void`                              | -                                               | Triggered when closing.                                               |
| cancel       | `() => void`                              | -                                               | Triggered when clicking cancel button.                                |
| click-action | `(index: number, action: Action) => void` | index - Click index; action - Click option data | Triggered when clicking an option, even if the option does not close. |

## Action Props

| Name      | Type                                                       | Default    | Required | Description                                                                                          |
| --------- | ---------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------- |
| content   | `string`                                                   | `''`       | Y        | Option content.                                                                                      |
| style     | `'normal'\|'theme'\|'success'\|'warning'\|'error'\|'info'` | `'normal'` | N        | Option style, supports normal, theme, success, warning, error, info. theme adapts to light and dark. |
| disabled  | `boolean`                                                  | `false`    | N        | Whether to disable the option, can be used with style.                                               |
| desc      | `string`                                                   | `''`       | N        | Option description.                                                                                  |
| icon      | [`Icon`](/components?nav=icon&tab=1)                       | `null`     | N        | Option icon, takes priority over image.                                                              |
| showImg   | `boolean`                                                  | `false`    | N        | Whether to show image.                                                                               |
| imgRadius | `'none'\|'sm'\|'full'\|'lg'`                               | `'full'`   | N        | Image border radius.                                                                                 |
| imgSrc    | `string`                                                   | `''`       | N        | Image source URL.                                                                                    |
