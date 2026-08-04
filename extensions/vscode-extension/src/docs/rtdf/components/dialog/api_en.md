## Dialog Props

| Name            | Type                                     | Default                               | Required | Description                                  |
| --------------- | ---------------------------------------- | ------------------------------------- | -------- | -------------------------------------------- |
| visible         | `boolean`                                | `false`                               | N        | Whether to show the dialog.                  |
| title           | `string`                                 | Current language dialog.title         | N        | Title.                                       |
| titleAlign      | `'left'\|'center'\|'right'`              | `'center'`                            | N        | Title alignment.                             |
| content         | `string`                                 | Current language dialog.content       | N        | Content.                                     |
| popup           | [`Popup`](/components?nav=popup&tab=1)   | `{}`                                  | N        | Popup parameters.                            |
| showIcon        | `boolean`                                | `false`                               | N        | Whether to show icon.                        |
| icon            | [`Icon`](/components?nav=icon&tab=1)     | `{}`                                  | N        | Icon parameters.                             |
| btnStyle        | `'button'\|'text'\|'textLine'`           | `'button'`                            | N        | Button style.                                |
| primaryText     | `string`                                 | Current language dialog.primaryText   | N        | Primary button text.                         |
| primaryButton   | [`Button`](/components?nav=button&tab=1) | `{}`                                  | N        | Primary button parameters.                   |
| secondaryText   | `string`                                 | Current language dialog.secondaryText | N        | Secondary button text.                       |
| secondaryButton | [`Button`](/components?nav=button&tab=1) | `{}`                                  | N        | Secondary button parameters.                 |
| btnRatio        | `[number,number]`                        | `[1, 1]`                              | N        | Size ratio of primary and secondary buttons. |
| btnReverse      | `boolean`                                | `false`                               | N        | Whether to reverse button positions.         |
| secondaryClose  | `boolean`                                | `true`                                | N        | Whether secondary button closes dialog.      |
| btnGap          | `'0'\|'1'\|'2'\|'4'\|'8'\|'12'\|'16'`    | `'2'`                                 | N        | Gap between buttons.                         |
| injClass        | `string`                                 | `''`                                  | N        | Injected CSS class name.                     |

## Dialog Events

| Name        | Type         | Parameters | Description                                                                             |
| ----------- | ------------ | ---------- | --------------------------------------------------------------------------------------- |
| onClose     | `() => void` | -          | Triggered when dialog closes.                                                           |
| onclose     | `() => void` | -          | Triggered when dialog closes. Lowercase event alias compatible with STDF.               |
| onPrimary   | `() => void` | -          | Triggered when primary button is clicked.                                               |
| onprimary   | `() => void` | -          | Triggered when primary button is clicked. Lowercase event alias compatible with STDF.   |
| onSecondary | `() => void` | -          | Triggered when secondary button is clicked.                                             |
| onsecondary | `() => void` | -          | Triggered when secondary button is clicked. Lowercase event alias compatible with STDF. |

## Dialog Children

| Name         | Type      | Parameters | Description                                  |
| ------------ | --------- | ---------- | -------------------------------------------- |
| contentChild | ReactNode | -          | Render the content when it is passed in.     |
| primaryChild | ReactNode | -          | Render the primaryText when it is passed in. |
