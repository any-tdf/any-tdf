## Modal Props

| Name       | Type                                     | Default                        | Required | Description                |
| ---------- | ---------------------------------------- | ------------------------------ | -------- | -------------------------- |
| visible    | `boolean`                                | `false`                        | N        | Whether to show the modal. |
| title      | `string`                                 | Current language modal.title   | N        | Title text.                |
| titleAlign | `'left'\|'center'\|'right'`              | `'center'`                     | N        | Title alignment.           |
| content    | `string`                                 | Current language modal.content | N        | Content text.              |
| showIcon   | `boolean`                                | `false`                        | N        | Whether to show icon.      |
| icon       | [`Icon`](/components?nav=dialog&tab=1)   | `{}`                           | N        | Icon props.                |
| showBtn    | `boolean`                                | `true`                         | N        | Whether to show button.    |
| btnText    | `string`                                 | Current language modal.btnText | N        | Button text.               |
| button     | [`Button`](/components?nav=dialog&tab=1) | `{}`                           | N        | Button props.              |
| popup      | [`Popup`](/components?nav=dialog&tab=1)  | `{}`                           | N        | Popup props.               |
| injClass   | `string`                                 | `''`                           | N        | Injected CSS class name.   |

## Modal Events

| Name    | Type         | Parameters | Description                                                              |
| ------- | ------------ | ---------- | ------------------------------------------------------------------------ |
| onClose | `() => void` | -          | Triggered when modal closes.                                             |
| onclose | `() => void` | -          | Triggered when modal closes. Lowercase event alias compatible with STDF. |

## Modal Children

| Name         | Type      | Parameters | Description                              |
| ------------ | --------- | ---------- | ---------------------------------------- |
| contentChild | ReactNode | -          | Render the content when it is passed in. |
