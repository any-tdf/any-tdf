## Checkbox Props

| Name         | Type                                                    | Default     | Required | Description                            |
| ------------ | ------------------------------------------------------- | ----------- | -------- | -------------------------------------- |
| data         | `CheckboxItemProps[]`                                   | `[]`        | Y        | Option data.                           |
| layout       | `'h'\|'v'\|'inline'`                                    | `'v'`       | N        | Layout mode.                           |
| checkeds     | `string[]`                                              | `[]`        | N        | Array of selected option identifiers.  |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N        | Position of option text area.          |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area. |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.   |

## Checkbox Events

| Name     | Type                           | Parameters                                | Description                                                                |
| -------- | ------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------- |
| onChange | `(checkeds: string[]) => void` | checkeds - Array of selected identifiers. | Triggered when option clicked.                                             |
| onchange | `(checkeds: string[]) => void` | checkeds - Array of selected identifiers. | Triggered when option clicked. Lowercase event alias compatible with STDF. |

## Checkbox Children

| Name          | Type                                                  | Parameters          | Description                        |
| ------------- | ----------------------------------------------------- | ------------------- | ---------------------------------- |
| checkboxChild | `(payload: { item: CheckboxItemProps }) => ReactNode` | item - Option data. | Used when customizing option area. |

## CheckboxItem Props

| Name         | Type                                                    | Default     | Required | Description                            |
| ------------ | ------------------------------------------------------- | ----------- | -------- | -------------------------------------- |
| name         | `string`                                                | `''`        | Y        | Identifier.                            |
| label        | `string`                                                | `''`        | N        | Option text, mainly for display.       |
| layout       | `'h'\|'v'\|'inline'`                                    | `'v'`       | N        | Layout mode.                           |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                    | `'r'`       | N        | Position of option text area.          |
| icon         | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area. |
| iconChecked  | `'default'\|null`\|[`Icon`](/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.   |
| checked      | `boolean`                                               | `false`     | N        | Whether checked.                       |

## CheckboxItem Events

| Name    | Type                     | Parameters         | Description                                                                |
| ------- | ------------------------ | ------------------ | -------------------------------------------------------------------------- |
| onClick | `(name: string) => void` | name - Identifier. | Triggered when option clicked.                                             |
| onclick | `(name: string) => void` | name - Identifier. | Triggered when option clicked. Lowercase event alias compatible with STDF. |

## CheckboxItem Children

| Name     | Type      | Parameters | Description                  |
| -------- | --------- | ---------- | ---------------------------- |
| children | ReactNode | -          | Content of option text area. |
