## Radio Props

| Name         | Type                                                    | Default     | Required | Description                            |
| ------------ | ------------------------------------------------------- | ----------- | -------- | -------------------------------------- |
| data         | `RadioItemProps[]`                                      | `[]`        | Y        | Option data.                           |
| layout       | `'v'\|'h'\|'inline'`                                    | `'v'`       | N        | Layout mode.                           |
| value        | `string`                                                | `''`        | N        | Selected value.                        |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N        | Position of option content area.       |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area. |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.   |

## Radio Events

| Name   | Type                      | Parameters                        | Description                                                |
| ------ | ------------------------- | --------------------------------- | ---------------------------------------------------------- |
| change | `(value: string) => void` | value - Selected Radio identifier | Triggered when RadioItem is clicked (Radio value changes). |

## Radio Children

| Name       | Type                                              | Parameters         | Description                            |
| ---------- | ------------------------------------------------- | ------------------ | -------------------------------------- |
| radioChild | `(payload: { item: RadioItemProps }) => Vue Slot` | item - Option data | Used when customizing the option area. |

## RadioItem Props

| Name         | Type                                                    | Default     | Required | Description                                   |
| ------------ | ------------------------------------------------------- | ----------- | -------- | --------------------------------------------- |
| name         | `string`                                                | `''`        | Y        | Identifier, corresponds to Radio Props value. |
| label        | `string`                                                | `''`        | N        | Option content.                               |
| layout       | `'v'\|'h'\|'inline'`                                    | `'v'`       | N        | Layout mode.                                  |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N        | Position of option content area.              |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area.        |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.          |
| checked      | `boolean`                                               | `false`     | N        | Whether checked.                              |

## RadioItem Events

| Name  | Type                     | Parameters                     | Description             |
| ----- | ------------------------ | ------------------------------ | ----------------------- |
| click | `(name: string) => void` | name - Clicked item identifier | Triggered when clicked. |

## RadioItem Children

| Name     | Type     | Parameters | Description          |
| -------- | -------- | ---------- | -------------------- |
| children | Vue Slot | -          | Option area content. |
